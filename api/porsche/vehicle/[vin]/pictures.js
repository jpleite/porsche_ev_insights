/**
 * Vercel Serverless Function: GET /api/porsche/vehicle/[vin]/pictures
 * Returns vehicle pictures
 * STATELESS: Session decoded from client header
 */

import { setCorsHeaders, getSession, CONFIG } from '../../_utils.js';

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
    const response = await fetch(
      `${CONFIG.API_BASE_URL}/connect/v1/vehicles/${vin}/pictures`,
      {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'User-Agent': CONFIG.USER_AGENT,
          'x-client-id': CONFIG.X_CLIENT_ID
        }
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch pictures' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Pictures error:', error);
    res.status(500).json({ error: 'Failed to fetch pictures' });
  }
}
