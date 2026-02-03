/**
 * Vercel Serverless Function: GET /api/porsche/vehicle/[vin]/overview
 * Returns vehicle overview (battery, range, location, etc.)
 * STATELESS: Session decoded from client header
 */

import { setCorsHeaders, getSession, CONFIG } from '../../_utils.js';

const MEASUREMENTS = [
  'BATTERY_LEVEL', 'E_RANGE', 'MILEAGE', 'GPS_LOCATION',
  'CHARGING_SUMMARY', 'CHARGING_RATE', 'LOCK_STATE_VEHICLE'
];

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { session, error, status, needsRefresh } = getSession(req);
  if (error) {
    return res.status(status).json({ error, needsRefresh });
  }

  const { vin } = req.query;
  if (!vin) {
    return res.status(400).json({ error: 'VIN required' });
  }

  try {
    const measurements = MEASUREMENTS.map(m => `mf=${m}`).join('&');
    const response = await fetch(
      `${CONFIG.API_BASE_URL}/connect/v1/vehicles/${vin}?${measurements}`,
      {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'User-Agent': CONFIG.USER_AGENT,
          'x-client-id': CONFIG.X_CLIENT_ID
        }
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch vehicle overview' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Overview error:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle overview' });
  }
}
