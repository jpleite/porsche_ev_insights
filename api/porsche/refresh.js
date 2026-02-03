/**
 * Vercel Serverless Function: POST /api/porsche/refresh
 * Refreshes the access token
 */

// Import shared token store
// Note: In serverless, we use a simple approach - tokens may be lost on cold starts
// For production, consider using Vercel KV or external database
let tokenStore;
try {
  tokenStore = (await import('./login.js')).tokenStore;
} catch {
  tokenStore = new Map();
}

const CONFIG = {
  AUTHORIZATION_SERVER: 'identity.porsche.com',
  CLIENT_ID: 'XhygisuebbrqQ80byOuU5VncxLIm8E6H',
  USER_AGENT: 'porsche-ev-insights/1.0'
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-session-id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId } = req.body;
  const session = tokenStore.get(sessionId);

  if (!session?.refreshToken) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  try {
    const tokenUrl = `https://${CONFIG.AUTHORIZATION_SERVER}/oauth/token`;
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': CONFIG.USER_AGENT
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: CONFIG.CLIENT_ID,
        refresh_token: session.refreshToken
      }).toString()
    });

    if (!tokenResponse.ok) {
      tokenStore.delete(sessionId);
      return res.status(401).json({ error: 'Token refresh failed' });
    }

    const tokens = await tokenResponse.json();

    session.accessToken = tokens.access_token;
    session.refreshToken = tokens.refresh_token || session.refreshToken;
    session.expiresAt = Date.now() + (tokens.expires_in * 1000);
    tokenStore.set(sessionId, session);

    res.json({ expiresIn: tokens.expires_in });

  } catch (error) {
    console.error('Refresh error:', error);
    res.status(500).json({ error: 'Token refresh failed' });
  }
}
