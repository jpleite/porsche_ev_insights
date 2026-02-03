/**
 * Vercel Serverless Function: POST /api/porsche/logout
 * Clears the user session
 * STATELESS: Just returns success, client clears local storage
 */

import { setCorsHeaders } from './_utils.js';

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // In stateless mode, logout just acknowledges the request
  // The client will clear localStorage
  res.json({ success: true });
}
