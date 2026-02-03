/**
 * Vercel Serverless Function: POST /api/porsche/logout
 * Clears the user session
 */

let tokenStore;
try {
  tokenStore = (await import('./login.js')).tokenStore;
} catch {
  tokenStore = new Map();
}

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

  if (sessionId) {
    const session = tokenStore.get(sessionId);
    if (session) {
      console.log(`[Auth] Logging out ${session.email}`);
    }
    tokenStore.delete(sessionId);
  }

  res.json({ success: true });
}
