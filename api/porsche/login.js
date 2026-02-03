/**
 * Vercel Serverless Function: POST /api/porsche/login
 * Handles Porsche Connect OAuth2 authentication
 *
 * STATELESS APPROACH: All session data is encoded and sent to the client.
 * Client sends it back with each request. No server-side storage needed.
 */

import { JSDOM } from 'jsdom';

// Porsche Connect API configuration
const CONFIG = {
  AUTHORIZATION_SERVER: 'identity.porsche.com',
  CLIENT_ID: 'XhygisuebbrqQ80byOuU5VncxLIm8E6H',
  REDIRECT_URI: 'my-porsche-app://auth0/callback',
  USER_AGENT: 'porsche-ev-insights/1.0',
  SCOPES: [
    'openid', 'profile', 'email', 'offline_access', 'mbb', 'ssodb',
    'badge', 'vin', 'dealers', 'cars', 'charging', 'manageCharging',
    'pid:user_profile.porscheid:read', 'pid:user_profile.vehicles:read'
  ]
};

function generateState() {
  return Math.random().toString(36).substring(2, 15);
}

function extractCookies(response) {
  const cookies = response.headers.getSetCookie?.() || [];
  return cookies.map(c => c.split(';')[0]).join('; ');
}

function resolveUrl(location, baseUrl) {
  if (!location) return null;
  if (location.startsWith('http://') || location.startsWith('https://')) {
    return location;
  }
  try {
    return new URL(location, baseUrl).toString();
  } catch {
    return null;
  }
}

// Encode session data to send to client (stateless tokens)
export function encodeSessionData(data) {
  return Buffer.from(JSON.stringify(data)).toString('base64');
}

// Decode session data from client
export function decodeSessionData(encoded) {
  try {
    return JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-session-id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, captchaCode, captchaSession } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  console.log(`[Auth] Starting login for ${email}${captchaCode ? ' (with captcha)' : ''}`);

  try {
    const authBaseUrl = `https://${CONFIG.AUTHORIZATION_SERVER}`;
    let cookies = '';
    let loginState = '';

    // Check if this is a captcha retry - restore session from client
    if (captchaCode && captchaSession) {
      const sessionData = decodeSessionData(captchaSession);
      if (sessionData) {
        console.log('[Auth] Resuming captcha session from client data');
        cookies = sessionData.cookies;
        loginState = sessionData.state;
      } else {
        return res.status(400).json({ error: 'Invalid captcha session' });
      }
    }

    // Only do step 1 if we don't have cookies from a captcha session
    if (!cookies) {
      const state = generateState();
      const scope = CONFIG.SCOPES.join(' ');

      const authUrl = new URL(`https://${CONFIG.AUTHORIZATION_SERVER}/authorize`);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('client_id', CONFIG.CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', CONFIG.REDIRECT_URI);
      authUrl.searchParams.set('scope', scope);
      authUrl.searchParams.set('state', state);
      authUrl.searchParams.set('audience', 'https://api.porsche.com');

      console.log(`[Auth] Step 1: Initiating OAuth`);
      const authResponse = await fetch(authUrl.toString(), {
        method: 'GET',
        headers: { 'User-Agent': CONFIG.USER_AGENT },
        redirect: 'manual'
      });

      cookies = extractCookies(authResponse);

      let location = resolveUrl(authResponse.headers.get('location'), authBaseUrl);
      let loginPageHtml = '';

      if (location) {
        const loginPageResponse = await fetch(location, {
          headers: {
            'User-Agent': CONFIG.USER_AGENT,
            'Cookie': cookies
          },
          redirect: 'manual'
        });
        cookies += '; ' + extractCookies(loginPageResponse);
        loginPageHtml = await loginPageResponse.text();
      } else {
        loginPageHtml = await authResponse.text();
      }

      const dom = new JSDOM(loginPageHtml);
      const stateInput = dom.window.document.querySelector('input[name="state"]');
      loginState = stateInput?.value || state;
    }

    // Step 2: Submit email
    const identifierUrl = `https://${CONFIG.AUTHORIZATION_SERVER}/u/login/identifier`;

    const identifierBody = {
      state: loginState,
      username: email,
      'js-available': 'true',
      'webauthn-available': 'false',
      'is-brave': 'false',
      'webauthn-platform-available': 'false',
      action: 'default'
    };

    if (captchaCode) {
      identifierBody.captcha = captchaCode;
    }

    const identifierResponse = await fetch(identifierUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': CONFIG.USER_AGENT,
        'Cookie': cookies
      },
      body: new URLSearchParams(identifierBody).toString(),
      redirect: 'manual'
    });

    cookies += '; ' + extractCookies(identifierResponse);

    if (identifierResponse.status === 400) {
      const errorHtml = await identifierResponse.text();

      if (errorHtml.includes('captcha')) {
        const dom = new JSDOM(errorHtml);
        const captchaImg = dom.window.document.querySelector('img[alt="captcha"]');

        if (captchaImg) {
          const captchaSrc = captchaImg.getAttribute('src');

          // Encode session data to send to client (stateless approach)
          const sessionData = encodeSessionData({
            cookies,
            state: loginState,
            email
          });

          return res.status(400).json({
            error: 'Captcha required',
            captchaRequired: true,
            captchaImage: captchaSrc,
            captchaSession: sessionData
          });
        }
        return res.status(400).json({ error: 'Captcha required but could not extract image' });
      }
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Step 3: Submit password
    const passwordUrl = `https://${CONFIG.AUTHORIZATION_SERVER}/u/login/password`;
    const passwordResponse = await fetch(passwordUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': CONFIG.USER_AGENT,
        'Cookie': cookies
      },
      body: new URLSearchParams({
        state: loginState,
        username: email,
        password: password,
        action: 'default'
      }).toString(),
      redirect: 'manual'
    });

    cookies += '; ' + extractCookies(passwordResponse);

    if (passwordResponse.status === 400) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Step 4: Follow redirects to get authorization code (no wait needed)
    let codeLocation = resolveUrl(passwordResponse.headers.get('location'), authBaseUrl);
    let authCode = null;

    for (let i = 0; i < 10 && codeLocation && !authCode; i++) {
      if (codeLocation.includes('code=')) {
        try {
          const codeUrl = new URL(codeLocation);
          authCode = codeUrl.searchParams.get('code');
        } catch {
          const codeMatch = codeLocation.match(/[?&]code=([^&]+)/);
          if (codeMatch) {
            authCode = codeMatch[1];
          }
        }
        break;
      }

      const redirectResponse = await fetch(codeLocation, {
        headers: {
          'User-Agent': CONFIG.USER_AGENT,
          'Cookie': cookies
        },
        redirect: 'manual'
      });

      cookies += '; ' + extractCookies(redirectResponse);
      codeLocation = resolveUrl(redirectResponse.headers.get('location'), authBaseUrl);
    }

    if (!authCode) {
      return res.status(401).json({ error: 'Failed to obtain authorization code' });
    }

    // Step 5: Exchange code for tokens
    const tokenUrl = `https://${CONFIG.AUTHORIZATION_SERVER}/oauth/token`;
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': CONFIG.USER_AGENT
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: CONFIG.CLIENT_ID,
        code: authCode,
        redirect_uri: CONFIG.REDIRECT_URI
      }).toString()
    });

    if (!tokenResponse.ok) {
      return res.status(401).json({ error: 'Failed to exchange token' });
    }

    const tokens = await tokenResponse.json();

    // STATELESS: Encode tokens and send to client
    // Client will send this back with each request
    const sessionData = encodeSessionData({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: Date.now() + (tokens.expires_in * 1000),
      email
    });

    res.json({
      sessionId: sessionData,  // This is now the encoded token data
      expiresIn: tokens.expires_in
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Authentication failed: ' + error.message });
  }
}
