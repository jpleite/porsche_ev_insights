# My Car Tab

The My Car tab displays real-time information about your vehicle by connecting to the Porsche Connect API. This tab is only visible when you're connected to Porsche Connect.

## Requirements

To use the My Car tab, you need:

1. **A Porsche Connect account** with an active subscription
2. **The local proxy server running** (for development/self-hosting)
3. **Your Porsche Connect credentials** (email and password)

## Connecting to Porsche Connect

1. Go to **Settings**
2. Find the **Porsche Connect** section
3. Enter your Porsche Connect email and password
4. Click **Connect**
5. Once connected, the **My Car** tab appears in the sidebar

Your credentials are used only to authenticate with Porsche's servers. They are never stored permanently - only the session tokens are kept locally.

## Features

### Vehicle Header

The top banner displays:

- **Model name** - Your vehicle's full name (e.g., "Taycan 4S")
- **Year and generation** - Model year and generation info
- **VIN** - Your vehicle identification number
- **Lock status** - Badge showing if your car is locked or unlocked

### Battery Status Card

Shows your current battery state:

- **Battery percentage** - Current charge level with a visual progress bar
- **Estimated range** - How far you can drive on current charge
- **Color coding** - Green (60%+), amber (30-60%), red (<30%)

### Charging Card

Shows current charging status when the vehicle is plugged in:

- **Status** - "Charging" with the current charge rate (e.g. 8.7 kW), or "Not charging" when idle
- **To X%** - Target charge level: from the charging profile (e.g. 75%) when mode is PROFILE, or "To 100%" when mode is DIRECT
- **Done at [time]** - Estimated time charging will complete in your locale format

The card uses data from the API's `CHARGING_SUMMARY` (status, mode, target time, profile) and `CHARGING_RATE` (charging power in kW). 

### Tire Pressure Card

Displays pressure for all four tires:

- **FL/FR** - Front left and front right
- **RL/RR** - Rear left and rear right
- **Units** - Shown in bar or PSI depending on your settings
- **Color coding** - Green for normal, amber for low, red for critical

### Total Mileage Card

Shows your vehicle's odometer reading in your preferred distance unit (km or miles).

### Vehicle Photos

A carousel displaying official Porsche renders of your vehicle:

- **Front view**
- **Side view**
- **Rear view**
- **Top view**

Use the arrows or thumbnail navigation to browse between views.

### Location Map

An interactive OpenStreetMap showing:

- **Last known position** - Marked with a pin
- **Address** - Reverse geocoded street address
- **Compass** - Shows the direction your car is facing

You can pan and zoom the map to explore the area around your vehicle.

## Data Refresh

Vehicle data is fetched when:

- You first connect to Porsche Connect
- You navigate to the My Car tab
- You manually refresh (via Settings)

Note: Porsche Connect has rate limits, so data may not update in real-time. The "Last Updated" timestamp shows when the data was last retrieved.

## Privacy

When using Porsche Connect:

- Your credentials are sent directly to Porsche's OAuth servers
- Session tokens are stored locally in your browser
- The local proxy server handles API requests to bypass CORS restrictions
- No data is sent to any third-party servers

## Troubleshooting

### "My Car" tab not showing

- Make sure you're connected to Porsche Connect in Settings
- Check that the proxy server is running (`npm run server`)
- Try disconnecting and reconnecting

### Data not loading

- Check your internet connection
- Verify your Porsche Connect subscription is active
- The proxy server logs may show API errors

### Location not available

- Your vehicle may not have reported its location recently
- GPS data requires the vehicle to have been driven recently

### Tire pressure showing blank

- Not all vehicles report tire pressure via the API
- The vehicle may need to be driven for sensors to update

## Technical Notes

The My Car tab requires a local proxy server because:

1. Browser security (CORS) prevents direct API calls to Porsche
2. The OAuth flow requires server-side handling
3. API tokens need secure storage and refresh

For self-hosting, see [Building and Self-Hosting](Building-and-Self-Hosting) for proxy server setup instructions.
