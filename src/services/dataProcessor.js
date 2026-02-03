import { precise } from '../utils/precise';

export function processUploadedData(sinceStartData, sinceChargeData) {
  // Helper to get week number from date
  const getWeekNumber = (d) => {
    const startOfYear = new Date(d.getFullYear(), 0, 1);
    const weekNum = Math.ceil(((d - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
    return `${d.getFullYear()}-W${weekNum.toString().padStart(2, '0')}`;
  };

  // Helper to get season from month (returns lowercase key for translation)
  const getSeason = (month) => {
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  };

  // Helper to parse numeric values that may be strings (CSV) or numbers (API)
  const parseNumeric = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value.replace(',', '.')) || 0;
    return 0;
  };

  const trips = sinceStartData.map(row => {
    // Support multiple header formats (Portuguese and English) and API format
    const rawDate = row['arrival time'] || row['data de chegada'] || row['arrival date'] || row.date || '';
    const distance = parseNumeric(row['distance (km)'] || row['distância'] || row['distance'] || 0);
    const consumption = parseNumeric(row['avg. consumption (kwh/100 km)'] || row['consumo'] || row['consumption'] || 0);
    const speed = parseNumeric(row['average speed (km/h)'] || row['velocidade média'] || row['average speed'] || row['avgSpeed'] || 0);

    let hour = 12;
    let parsedDate = null;
    let dateKey = '';
    let weekKey = '';
    let monthKey = '';
    let season = '';
    let dateStr = '';

    // Handle Date objects from API
    if (rawDate instanceof Date) {
      parsedDate = rawDate;
      hour = rawDate.getHours();
      const year = rawDate.getFullYear();
      const month = String(rawDate.getMonth() + 1).padStart(2, '0');
      const day = String(rawDate.getDate()).padStart(2, '0');
      dateKey = `${year}-${month}-${day}`;
      monthKey = `${year}-${month}`;
      weekKey = getWeekNumber(rawDate);
      season = getSeason(rawDate.getMonth() + 1);
      dateStr = rawDate.toISOString();
    } else {
      dateStr = rawDate;
      // Handle ISO format: 2025-11-09T13:22:52Z
      const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):/);
      if (isoMatch) {
        hour = parseInt(isoMatch[4]);
        parsedDate = new Date(isoMatch[1], parseInt(isoMatch[2]) - 1, isoMatch[3]);
        dateKey = `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
        monthKey = `${isoMatch[1]}-${isoMatch[2]}`;
        weekKey = getWeekNumber(parsedDate);
        season = getSeason(parseInt(isoMatch[2]));
      } else {
        // Handle Portuguese format: dd/mm/yyyy HH:MM
        const timeMatch = dateStr.match(/(\d{1,2}):\d{2}/);
        if (timeMatch) hour = parseInt(timeMatch[1]);
        const dateMatch = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        if (dateMatch) {
          parsedDate = new Date(dateMatch[3], parseInt(dateMatch[2]) - 1, dateMatch[1]);
          dateKey = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
          monthKey = `${dateMatch[3]}-${dateMatch[2]}`;
          weekKey = getWeekNumber(parsedDate);
          season = getSeason(parseInt(dateMatch[2]));
        }
      }
    }

    let tripType = 'Medium (10-20km)';
    if (distance < 5) tripType = 'Micro (<5km)';
    else if (distance < 10) tripType = 'Short (5-10km)';
    else if (distance < 20) tripType = 'Medium (10-20km)';
    else if (distance < 50) tripType = 'Long (20-50km)';
    else tripType = 'Very Long (>50km)';

    const energy = precise.div(precise.mul(distance, consumption), 100);

    return {
      date: dateStr,
      dateKey,
      weekKey,
      monthKey,
      season,
      parsedDate,
      distance,
      consumption,
      speed,
      hour,
      tripType,
      energy
    };
  }).filter(t => t.distance > 0);

  const totalTrips = trips.length;
  const totalDistance = trips.reduce((sum, t) => precise.add(sum, t.distance), 0);
  const totalEnergy = trips.reduce((sum, t) => precise.add(sum, precise.mul(t.distance, t.consumption) / 100), 0);
  const avgConsumption = totalDistance > 0 ? precise.round(precise.div(totalEnergy, totalDistance) * 100, 1) : 0;
  const shortTrips = trips.filter(t => t.distance < 10).length;

  const hourMap = {};
  // Initialize all 24 hours so chart shows complete x-axis
  for (let i = 0; i < 24; i++) {
    const h = String(i).padStart(2, '0');
    hourMap[h] = { hour: h, trips: 0, distance: 0 };
  }
  trips.forEach(t => {
    const h = String(t.hour).padStart(2, '0');
    hourMap[h].trips++;
    hourMap[h].distance = precise.add(hourMap[h].distance, t.distance);
  });
  const hourData = Object.values(hourMap).sort((a, b) => a.hour.localeCompare(b.hour));

  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const dayMap = {};
  trips.forEach(t => {
    // Use the already-parsed date
    if (t.parsedDate) {
      const dayName = dayNames[t.parsedDate.getDay()];
      if (!dayMap[dayName]) dayMap[dayName] = { day: dayName, trips: 0, distance: 0, totalConsumption: 0 };
      dayMap[dayName].trips++;
      dayMap[dayName].distance = precise.add(dayMap[dayName].distance, t.distance);
      dayMap[dayName].totalConsumption = precise.add(dayMap[dayName].totalConsumption, t.consumption);
    }
  });
  const dayOrder = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const dayData = dayOrder.map(d => dayMap[d] || { day: d, trips: 0, distance: 0, totalConsumption: 0 })
    .map(d => ({
      ...d,
      avgDist: d.trips > 0 ? precise.round(precise.div(d.distance, d.trips), 1) : 0,
      consumption: d.trips > 0 ? precise.round(precise.div(d.totalConsumption, d.trips), 1) : 0
    }));

  const typeMap = {};
  trips.forEach(t => {
    if (!typeMap[t.tripType]) typeMap[t.tripType] = { type: t.tripType, count: 0, totalConsumption: 0 };
    typeMap[t.tripType].count++;
    typeMap[t.tripType].totalConsumption = precise.add(typeMap[t.tripType].totalConsumption, t.consumption);
  });
  const typeColors = {
    'Micro (<5km)': '#ef4444', 'Short (5-10km)': '#f97316', 'Medium (10-20km)': '#eab308',
    'Long (20-50km)': '#22c55e', 'Very Long (>50km)': '#3b82f6'
  };
  const typeOrder = ['Micro (<5km)', 'Short (5-10km)', 'Medium (10-20km)', 'Long (20-50km)', 'Very Long (>50km)'];
  const tripTypes = typeOrder.map(t => ({
    type: t, count: typeMap[t]?.count || 0,
    consumption: typeMap[t]?.count > 0 ? precise.round(precise.div(typeMap[t].totalConsumption, typeMap[t].count), 1) : 0,
    color: typeColors[t]
  }));

  const monthMap = {};
  // Use lowercase keys for translation lookup
  const monthKeys = ['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  const getMonthInfo = (dateInput) => {
    // Handle Date objects
    if (dateInput instanceof Date) {
      const year = dateInput.getFullYear();
      const month = String(dateInput.getMonth() + 1).padStart(2, '0');
      const monthNum = dateInput.getMonth() + 1;
      return { key: `${year}-${month}`, name: monthKeys[monthNum] };
    }
    // Handle strings
    const dateStr = dateInput || '';
    // Try ISO format: 2025-11-09T13:22:52Z
    const isoMatch = dateStr.match?.(/^(\d{4})-(\d{2})-\d{2}T/);
    if (isoMatch) {
      const monthNum = parseInt(isoMatch[2]);
      return { key: `${isoMatch[1]}-${isoMatch[2]}`, name: monthKeys[monthNum] };
    }
    // Try Portuguese format: dd/mm/yyyy
    const dateMatch = dateStr.match?.(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (dateMatch) {
      const monthNum = parseInt(dateMatch[2]);
      return { key: `${dateMatch[3]}-${dateMatch[2]}`, name: monthKeys[monthNum] };
    }
    return null;
  };

  trips.forEach(t => {
    // Use already-computed monthKey and month name from season
    if (t.monthKey) {
      const monthNum = parseInt(t.monthKey.split('-')[1]);
      const monthName = monthKeys[monthNum];
      if (!monthMap[t.monthKey]) monthMap[t.monthKey] = { key: t.monthKey, month: monthName, trips: 0, distance: 0, totalConsumption: 0 };
      monthMap[t.monthKey].trips++;
      monthMap[t.monthKey].distance = precise.add(monthMap[t.monthKey].distance, t.distance);
      monthMap[t.monthKey].totalConsumption = precise.add(monthMap[t.monthKey].totalConsumption, t.consumption);
    }
  });

  const chargeCycles = sinceChargeData.length;
  const chargeMonthMap = {};
  sinceChargeData.forEach(row => {
    // Handle both Date objects (from API) and strings (from CSV)
    const dateValue = row.date || row['arrival time'] || row['data de chegada'] || row['arrival date'] || '';
    const monthInfo = getMonthInfo(dateValue);
    if (monthInfo) {
      chargeMonthMap[monthInfo.key] = (chargeMonthMap[monthInfo.key] || 0) + 1;
    }
  });

  const monthlyData = Object.values(monthMap).sort((a, b) => a.key.localeCompare(b.key)).map(m => ({
    month: m.month, trips: m.trips, cycles: chargeMonthMap[m.key] || 0,
    distance: Math.round(m.distance),
    consumption: m.trips > 0 ? precise.round(precise.div(m.totalConsumption, m.trips), 1) : 0
  }));

  const speedRanges = [
    { range: '0-20', min: 0, max: 20, label: '0-20 km/h' },
    { range: '20-40', min: 20, max: 40, label: '20-40 km/h' },
    { range: '40-60', min: 40, max: 60, label: '40-60 km/h' },
    { range: '60-80', min: 60, max: 80, label: '60-80 km/h' },
    { range: '80+', min: 80, max: 999, label: '80+ km/h' }
  ];
  const speedEfficiency = speedRanges.map(sr => {
    const matching = trips.filter(t => t.speed >= sr.min && t.speed < sr.max);
    const avgCons = matching.length > 0 ? precise.round(matching.reduce((s, t) => s + t.consumption, 0) / matching.length, 1) : 0;
    return { range: sr.label, consumption: avgCons, trips: matching.length };
  });

  // Seasonal efficiency data (lowercase keys for translation)
  const seasonColors = { spring: '#84cc16', summer: '#f59e0b', autumn: '#ea580c', winter: '#3b82f6' };
  const seasonOrder = ['spring', 'summer', 'autumn', 'winter'];
  const seasonMap = {};
  trips.forEach(t => {
    if (t.season) {
      if (!seasonMap[t.season]) seasonMap[t.season] = { season: t.season, trips: 0, totalConsumption: 0, totalDistance: 0 };
      seasonMap[t.season].trips++;
      seasonMap[t.season].totalConsumption = precise.add(seasonMap[t.season].totalConsumption, t.consumption);
      seasonMap[t.season].totalDistance = precise.add(seasonMap[t.season].totalDistance, t.distance);
    }
  });
  const seasonalData = seasonOrder.map(s => ({
    season: s,
    consumption: seasonMap[s]?.trips > 0 ? precise.round(precise.div(seasonMap[s].totalConsumption, seasonMap[s].trips), 1) : 0,
    trips: seasonMap[s]?.trips || 0,
    distance: Math.round(seasonMap[s]?.totalDistance || 0),
    color: seasonColors[s]
  }));

  // Best and worst trips (filtering out very short trips for meaningful comparison)
  const significantTrips = trips.filter(t => t.distance >= 10);
  const bestTrip = significantTrips.length > 0
    ? significantTrips.reduce((best, t) => t.consumption < best.consumption ? t : best)
    : trips.length > 0 ? trips.reduce((best, t) => t.consumption < best.consumption ? t : best) : null;
  const worstTrip = significantTrips.length > 0
    ? significantTrips.reduce((worst, t) => t.consumption > worst.consumption ? t : worst)
    : trips.length > 0 ? trips.reduce((worst, t) => t.consumption > worst.consumption ? t : worst) : null;

  // Daily aggregated data for time view
  const dailyMap = {};
  trips.forEach(t => {
    if (t.dateKey) {
      if (!dailyMap[t.dateKey]) dailyMap[t.dateKey] = { period: t.dateKey, trips: 0, distance: 0, totalConsumption: 0, energy: 0 };
      dailyMap[t.dateKey].trips++;
      dailyMap[t.dateKey].distance = precise.add(dailyMap[t.dateKey].distance, t.distance);
      dailyMap[t.dateKey].totalConsumption = precise.add(dailyMap[t.dateKey].totalConsumption, t.consumption);
      dailyMap[t.dateKey].energy = precise.add(dailyMap[t.dateKey].energy, t.energy);
    }
  });
  const dailyData = Object.values(dailyMap)
    .map(d => ({
      ...d,
      avgConsumption: d.trips > 0 ? precise.round(precise.div(d.totalConsumption, d.trips), 1) : 0,
      label: d.period.slice(5) // MM-DD format
    }))
    .sort((a, b) => a.period.localeCompare(b.period));

  // Weekly aggregated data for time view
  const weeklyMap = {};
  trips.forEach(t => {
    if (t.weekKey) {
      if (!weeklyMap[t.weekKey]) weeklyMap[t.weekKey] = { period: t.weekKey, trips: 0, distance: 0, totalConsumption: 0, energy: 0 };
      weeklyMap[t.weekKey].trips++;
      weeklyMap[t.weekKey].distance = precise.add(weeklyMap[t.weekKey].distance, t.distance);
      weeklyMap[t.weekKey].totalConsumption = precise.add(weeklyMap[t.weekKey].totalConsumption, t.consumption);
      weeklyMap[t.weekKey].energy = precise.add(weeklyMap[t.weekKey].energy, t.energy);
    }
  });
  const weeklyData = Object.values(weeklyMap)
    .map(w => ({
      ...w,
      avgConsumption: w.trips > 0 ? precise.round(precise.div(w.totalConsumption, w.trips), 1) : 0,
      label: w.period.slice(5) // W## format
    }))
    .sort((a, b) => a.period.localeCompare(b.period));

  const months = monthlyData.length;

  return {
    summary: {
      totalTrips, totalChargeCycles: chargeCycles, totalDistance: Math.round(totalDistance),
      totalEnergy: precise.round(totalEnergy, 1),
      avgTripDistance: totalTrips > 0 ? precise.round(precise.div(totalDistance, totalTrips), 1) : 0,
      avgConsumption,
      avgTripsPerCharge: chargeCycles > 0 ? precise.round(precise.div(totalTrips, chargeCycles), 1) : 0,
      shortTripsPct: totalTrips > 0 ? precise.round(precise.div(shortTrips, totalTrips) * 100, 1) : 0,
      avgTripsPerMonth: months > 0 ? Math.round(totalTrips / months) : 0,
      avgKmPerMonth: months > 0 ? Math.round(totalDistance / months) : 0
    },
    hourData,
    dayData,
    tripTypes,
    monthlyData,
    speedEfficiency,
    seasonalData,
    dailyData,
    weeklyData,
    bestTrip: bestTrip ? {
      date: bestTrip.dateKey || bestTrip.date,
      distance: bestTrip.distance,
      consumption: bestTrip.consumption,
      speed: bestTrip.speed
    } : null,
    worstTrip: worstTrip ? {
      date: worstTrip.dateKey || worstTrip.date,
      distance: worstTrip.distance,
      consumption: worstTrip.consumption,
      speed: worstTrip.speed
    } : null,
    rawTrips: trips
  };
}

// Extract Porsche model from CSV filename
// Format: "Model Name-<language specific text>-YYYY-MM-DD_HH-MM.csv"
// Examples: "Taycan 4 Cross Turismo-Since start-2026-01-30_08-45.csv"
//           "Macan Electric-Desde o arranque-2026-01-29_14-54.csv"
export function extractVehicleModel(filename) {
  // Match: Model name (first segment before dash), then anything, then date pattern at end
  // The model is everything before the first dash that's followed by more content and a date
  const match = filename.match(/^(.+?)-[^-]+-\d{4}-\d{2}-\d{2}/);
  if (match) {
    return match[1].trim();
  }
  return null;
}
