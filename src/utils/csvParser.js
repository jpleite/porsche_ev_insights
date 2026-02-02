// ========== CSV PARSER ==========
export function parseCSV(text) {
  const lines = text.trim().split('\n');
  // Detect delimiter (comma or semicolon)
  const firstLine = lines[0];
  const delimiter = firstLine.includes(';') ? ';' : ',';

  // Parse with quotes handling
  const parseLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === delimiter && !inQuotes) {
        result.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim().replace(/^"|"$/g, ''));
    return result;
  };

  const headers = parseLine(lines[0]).map(h => h.toLowerCase());

  return lines.slice(1).map(line => {
    const values = parseLine(line);
    const row = {};
    headers.forEach((h, i) => { row[h] = values[i] || ''; });
    return row;
  }).filter(row => Object.values(row).some(v => v !== ''));
}

// ========== AUDI CSV PARSER ==========
// Audi e-tron GT exports have a different format:
// - First 2 lines are metadata (VIN, route info, export date)
// - Third line is "Electric motor" header
// - Fourth line is column headers
// - Data uses semicolon delimiter
// - Units are in miles/mph (imperial) or km (metric)
// - Consumption format: "⌀ 31.54" (with average symbol)
export function parseAudiCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 5) return { rows: [], vin: null, isMetric: false };

  // Extract VIN from first line
  const vinMatch = lines[0].match(/^([A-Z0-9]{17})/);
  const vin = vinMatch ? vinMatch[1] : null;

  // Find the header line (contains "End of journey" or similar)
  let headerLineIndex = -1;
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    if (lines[i].toLowerCase().includes('end of journey') ||
        lines[i].toLowerCase().includes('fim da viagem') ||
        lines[i].toLowerCase().includes('fin del viaje')) {
      headerLineIndex = i;
      break;
    }
  }

  if (headerLineIndex === -1) return { rows: [], vin, isMetric: false };

  const delimiter = ';';
  const parseLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === delimiter && !inQuotes) {
        result.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim().replace(/^"|"$/g, ''));
    return result;
  };

  // Parse header line to determine units
  const headerLine = lines[headerLineIndex].toLowerCase();
  const isMetric = headerLine.includes(' km') || headerLine.includes('km/h');

  // Map Audi headers to our standard format
  const rows = [];
  for (let i = headerLineIndex + 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    if (values.length < 5 || !values[0]) continue;

    // Parse date: "31/01/2026, 19:13" or "01/31/2026, 19:13"
    const dateStr = values[0];

    // Parse distance (with thousand separator: "1,314.2" for miles or "1.314,2" for km)
    let distance = values[1] || '0';
    // Handle thousand separators for miles (1,314.2 -> 1314.2)
    if (!isMetric && distance.includes(',') && distance.includes('.')) {
      distance = distance.replace(/,/g, '');
    }
    // Handle thousand separators for km (1.314,2 -> 1314.2)
    if (isMetric && distance.includes('.') && distance.includes(',')) {
      distance = distance.replace(/\./g, '').replace(',', '.');
    }
    // Simple comma->dot replacement for decimal
    distance = parseFloat(distance.replace(',', '.')) || 0;

    // Convert miles to km if needed
    if (!isMetric) {
      distance = distance * 1.60934;
    }

    // Parse speed (avg)
    let speed = values[3] || '0';
    speed = parseFloat(speed.replace(',', '.')) || 0;
    if (!isMetric) {
      speed = speed * 1.60934;
    }

    // Parse consumption (format: "⌀ 31.54" - remove avg symbol)
    let consumption = values[4] || '0';
    consumption = consumption.replace(/[⌀\s]/g, '').replace(',', '.');
    consumption = parseFloat(consumption) || 0;
    // Convert kWh/100mi to kWh/100km if needed
    if (!isMetric) {
      consumption = consumption / 1.60934;
    }

    rows.push({
      'arrival time': dateStr,
      'distance (km)': distance.toString(),
      'average speed (km/h)': speed.toString(),
      'avg. consumption (kwh/100 km)': consumption.toString()
    });
  }

  return { rows, vin, isMetric };
}

// Check if file content is Audi format
export function isAudiFormat(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 3) return false;

  // Audi files start with VIN (17 alphanumeric chars) followed by semicolons
  const firstLine = lines[0];
  const vinMatch = firstLine.match(/^[A-Z0-9]{17};/);

  // Also check for "Route:" or "Electric motor" which are Audi-specific
  const hasAudiMarkers = lines.some(l =>
    l.includes('Route:') ||
    l.includes('Electric motor') ||
    l.includes('Elektromotor') ||
    l.includes('Motor elétrico')
  );

  return vinMatch !== null || hasAudiMarkers;
}
