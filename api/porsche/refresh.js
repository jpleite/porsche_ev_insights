/**
 * Vercel Serverless Function: POST /api/porsche/refresh
 * Refreshes the access token
 * STATELESS: Session decoded from client, new session returned
 */

import { setCorsHeaders, decodeSessionData, encodeSessionData, CONFIG } from './_utils.js';

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId } = req.body;
  const session = decodeSessionData(sessionId);

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
      return res.status(401).json({ error: 'Token refresh failed' });
    }

    const tokens = await tokenResponse.json();

    // Create new session data and return to client
    const newSession = encodeSessionData({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || session.refreshToken,
      expiresAt: Date.now() + (tokens.expires_in * 1000),
      email: session.email
    });

    res.json({
      sessionId: newSession,
      expiresIn: tokens.expires_in
    });

  } catch (error) {
    console.error('Refresh error:', error);
    res.status(500).json({ error: 'Token refresh failed' });
  }
}
