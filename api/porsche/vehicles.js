/**
 * Vercel Serverless Function: GET /api/porsche/vehicles
 * Returns list of vehicles for authenticated user
 * STATELESS: Session decoded from client header
 */

import { setCorsHeaders, getSession, porscheApiRequest } from './_utils.js';

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

  try {
    const result = await porscheApiRequest(session, '/connect/v1/vehicles');
    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    res.json(result.data);
  } catch (error) {
    console.error('Vehicles error:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
}
