/**
 * Vercel Serverless Function: GET /api/porsche/vehicle/[vin]/capabilities
 * Returns vehicle capabilities
 */

let tokenStore;
try {
  tokenStore = (await import('../../login.js')).tokenStore;
} catch {
  tokenStore = new Map();
}

const CONFIG = {
  API_BASE_URL: 'https://api.ppa.porsche.com/app',
  X_CLIENT_ID: '41843fb4-691d-4970-85c7-2673e8ecef40',
  USER_AGENT: 'porsche-ev-insights/1.0'
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-session-id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sessionId = req.headers['x-session-id'];
  const session = tokenStore.get(sessionId);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (Date.now() > session.expiresAt - 60000) {
    return res.status(401).json({ error: 'Token expired', needsRefresh: true });
  }

  const { vin } = req.query;

  if (!vin) {
    return res.status(400).json({ error: 'VIN required' });
  }

  try {
    const response = await fetch(
      `${CONFIG.API_BASE_URL}/connect/v1/vehicles/${vin}/capabilities`,
      {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'User-Agent': CONFIG.USER_AGENT,
          'x-client-id': CONFIG.X_CLIENT_ID
        }
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Capabilities not available' });
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Capabilities error:', error);
    res.status(500).json({ error: 'Failed to fetch capabilities' });
  }
}
