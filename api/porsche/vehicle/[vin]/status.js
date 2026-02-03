/**
 * Vercel Serverless Function: GET /api/porsche/vehicle/[vin]/status
 * Returns full vehicle status (all measurements)
 * STATELESS: Session decoded from client header
 */

import { setCorsHeaders, getSession, CONFIG } from '../../_utils.js';

const ALL_MEASUREMENTS = [
  'BATTERY_LEVEL', 'BATTERY_CHARGING_STATE', 'E_RANGE', 'RANGE',
  'CHARGING_SUMMARY', 'CHARGING_RATE', 'CHARGING_PROFILES', 'CHARGING_SETTINGS',
  'MILEAGE', 'GPS_LOCATION', 'LOCK_STATE_VEHICLE', 'PARKING_BRAKE', 'PARKING_LIGHT',
  'OPEN_STATE_DOOR_FRONT_LEFT', 'OPEN_STATE_DOOR_FRONT_RIGHT',
  'OPEN_STATE_DOOR_REAR_LEFT', 'OPEN_STATE_DOOR_REAR_RIGHT',
  'OPEN_STATE_LID_FRONT', 'OPEN_STATE_LID_REAR',
  'OPEN_STATE_WINDOW_FRONT_LEFT', 'OPEN_STATE_WINDOW_FRONT_RIGHT',
  'OPEN_STATE_WINDOW_REAR_LEFT', 'OPEN_STATE_WINDOW_REAR_RIGHT',
  'OPEN_STATE_SUNROOF', 'OPEN_STATE_SUNROOF_REAR', 'OPEN_STATE_TOP', 'OPEN_STATE_SPOILER',
  'OPEN_STATE_CHARGE_FLAP_LEFT', 'OPEN_STATE_CHARGE_FLAP_RIGHT', 'OPEN_STATE_SERVICE_FLAP',
  'TIRE_PRESSURE',
  'CLIMATIZER_STATE', 'HEATING_STATE', 'HVAC_STATE',
  'MAIN_SERVICE_RANGE', 'MAIN_SERVICE_TIME',
  'INTERMEDIATE_SERVICE_RANGE', 'INTERMEDIATE_SERVICE_TIME',
  'OIL_SERVICE_RANGE', 'OIL_SERVICE_TIME',
  'OIL_LEVEL_CURRENT', 'OIL_LEVEL_MAX', 'OIL_LEVEL_MIN_WARNING',
  'SERVICE_PREDICTIONS',
  'FUEL_LEVEL', 'FUEL_RESERVE',
  'ALARM_STATE', 'THEFT_STATE', 'GLOBAL_PRIVACY_MODE',
  'DEPARTURES', 'TIMERS', 'BLEID_DDADATA', 'PAIRING_CODE',
  'REMOTE_ACCESS_AUTHORIZATION', 'VTS_MODES', 'ACV_STATE',
  'PRED_PRECON_LOCATION_EXCEPTIONS', 'PRED_PRECON_USER_SETTINGS'
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
    const measurements = ALL_MEASUREMENTS.map(m => `mf=${m}`).join('&');
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
      return res.status(response.status).json({ error: 'Failed to fetch vehicle status' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Status error:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle status' });
  }
}
