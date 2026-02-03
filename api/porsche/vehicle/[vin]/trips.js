/**
 * Vercel Serverless Function: GET /api/porsche/vehicle/[vin]/trips
 * Returns trip statistics
 * STATELESS: Session decoded from client header
 */

import { setCorsHeaders, getSession, CONFIG } from '../../_utils.js';

const TRIP_STATISTICS = [
  'TRIP_STATISTICS_CYCLIC',
  'TRIP_STATISTICS_LONG_TERM',
  'TRIP_STATISTICS_LONG_TERM_HISTORY',
  'TRIP_STATISTICS_SHORT_TERM_HISTORY',
  'TRIP_STATISTICS_CYCLIC_HISTORY',
  'TRIP_STATISTICS_SHORT_TERM'
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
    const measurements = TRIP_STATISTICS.map(m => `mf=${m}`).join('&');
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
      return res.status(response.status).json({ error: 'Failed to fetch trips' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Trips error:', error);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
}
