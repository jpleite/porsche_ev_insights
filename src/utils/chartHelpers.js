// ========== CHART HELPERS ==========

/**
 * Get Y-axis width configuration
 * Returns narrower width for mobile screens to prevent chart stretching
 */
export function getYAxisWidth(isMobile = false) {
  return isMobile ? 35 : 45;
}

/**
 * Get X-axis configuration for time-based charts
 * Returns interval and angle settings based on timeView
 */
export function getXAxisConfig(timeView, dataLength = 0) {
  switch (timeView) {
    case 'day':
      // For daily data, show every 7th label (weekly) and angle them
      return {
        interval: Math.max(0, Math.floor(dataLength / 10)), // Show ~10 labels max
        angle: -45,
        textAnchor: 'end',
        height: 60,
        dy: 10
      };
    case 'week':
      // For weekly data, show every 2nd or 4th label depending on data size
      return {
        interval: dataLength > 20 ? 3 : dataLength > 10 ? 1 : 0,
        angle: -45,
        textAnchor: 'end',
        height: 60,
        dy: 10
      };
    case 'month':
    default:
      // Monthly data usually fits, but angle if too many
      return {
        interval: dataLength > 12 ? 1 : 0,
        angle: dataLength > 12 ? -45 : 0,
        textAnchor: dataLength > 12 ? 'end' : 'middle',
        height: dataLength > 12 ? 60 : 30,
        dy: dataLength > 12 ? 10 : 0
      };
  }
}

/**
 * Format tick label for time-based X-axis
 * Shortens labels for better display
 */
export function formatTimeLabel(label, timeView) {
  if (!label) return '';

  if (timeView === 'day') {
    // For daily view, try to show shorter date format
    // Assumes label is like "Jan 15" or "2024-01-15"
    return label;
  }

  if (timeView === 'week') {
    // For weekly view, labels are typically "W1", "W2", etc. or dates
    return label;
  }

  // For monthly, keep as is
  return label;
}
