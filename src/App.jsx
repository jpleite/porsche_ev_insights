import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';

// ========== PRECISION HELPERS (replaces decimal.js) ==========
const precise = {
  add: (a, b) => Math.round((a + b) * 1000000) / 1000000,
  sub: (a, b) => Math.round((a - b) * 1000000) / 1000000,
  mul: (a, b) => Math.round((a * b) * 1000000) / 1000000,
  div: (a, b) => b !== 0 ? Math.round((a / b) * 1000000) / 1000000 : 0,
  round: (n, dp = 2) => Math.round(n * Math.pow(10, dp)) / Math.pow(10, dp)
};

// ========== DOWNLOAD HELPER (works reliably across all browsers including Chrome) ==========
const downloadFile = async (content, filename) => {
  // Use File System Access API for Chrome - gives native "Save As" dialog
  if ('showSaveFilePicker' in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [{
          description: 'JSON File',
          accept: { 'application/json': ['.json'] }
        }]
      });
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
      return;
    } catch (err) {
      if (err.name === 'AbortError') return; // User cancelled
      // Fall through to legacy method on other errors
    }
  }

  // Fallback for Safari/Firefox
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ========== SAFE STORAGE (handles localStorage restrictions) ==========
const safeStorage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }
};

// ========== SAMPLE DATA (minimal demo set) ==========
const SAMPLE_DATA = {
  summary: {
    totalTrips: 14,
    totalChargeCycles: 14,
    totalDistance: 231,
    totalEnergy: 59.8,
    avgTripDistance: 16.5,
    avgConsumption: 25.9,
    avgTripsPerCharge: 1.0,
    shortTripsPct: 50.0,
    avgTripsPerMonth: 1.6,
    avgKmPerMonth: 26.0
  },
  hourData: [
    { hour: '08', trips: 3, distance: 36 },
    { hour: '13', trips: 2, distance: 34 },
    { hour: '15', trips: 2, distance: 19 },
    { hour: '18', trips: 3, distance: 46 },
    { hour: '20', trips: 4, distance: 96 }
  ],
  dayData: [
    { day: 'Sat', trips: 4, distance: 70, avgDist: 17.5, consumption: 24.5 },
    { day: 'Sun', trips: 3, distance: 37, avgDist: 12.3, consumption: 27.8 },
    { day: 'Mon', trips: 2, distance: 35, avgDist: 17.5, consumption: 25.2 },
    { day: 'Thu', trips: 3, distance: 50, avgDist: 16.7, consumption: 26.1 },
    { day: 'Fri', trips: 2, distance: 39, avgDist: 19.5, consumption: 25.4 }
  ],
  tripTypes: [
    { type: 'Short (5-10km)', count: 7, consumption: 28.2, color: '#f97316' },
    { type: 'Medium (10-20km)', count: 3, consumption: 24.1, color: '#eab308' },
    { type: 'Long (20-50km)', count: 4, consumption: 23.8, color: '#22c55e' }
  ],
  monthlyData: [
    { month: 'Apr', trips: 2, cycles: 1, distance: 39, consumption: 21.9 },
    { month: 'May', trips: 1, cycles: 2, distance: 8, consumption: 26.7 },
    { month: 'Jun', trips: 3, cycles: 1, distance: 44, consumption: 27.3 },
    { month: 'Jul', trips: 1, cycles: 1, distance: 22, consumption: 23.6 },
    { month: 'Aug', trips: 1, cycles: 2, distance: 13, consumption: 23.1 },
    { month: 'Oct', trips: 1, cycles: 1, distance: 33, consumption: 22.8 },
    { month: 'Nov', trips: 2, cycles: 2, distance: 14, consumption: 28.6 },
    { month: 'Dec', trips: 2, cycles: 2, distance: 31, consumption: 27.9 },
    { month: 'Jan', trips: 1, cycles: 2, distance: 28, consumption: 24.2 }
  ],
  speedEfficiency: [
    { range: '0-20 km/h', consumption: 29.0, trips: 4 },
    { range: '20-40 km/h', consumption: 25.5, trips: 7 },
    { range: '40-60 km/h', consumption: 23.8, trips: 3 }
  ],
  seasonalData: [
    { season: 'Spring', consumption: 23.5, trips: 3, distance: 47, color: '#84cc16' },
    { season: 'Summer', consumption: 25.5, trips: 5, distance: 79, color: '#f59e0b' },
    { season: 'Autumn', consumption: 26.4, trips: 3, distance: 47, color: '#ea580c' },
    { season: 'Winter', consumption: 26.6, trips: 3, distance: 59, color: '#3b82f6' }
  ],
  dailyData: [
    { period: '2025-04-12', label: '04-12', trips: 1, distance: 33, avgConsumption: 20.0, energy: 6.6 },
    { period: '2025-04-13', label: '04-13', trips: 1, distance: 6, avgConsumption: 23.8, energy: 1.4 },
    { period: '2025-06-21', label: '06-21', trips: 2, distance: 29, avgConsumption: 27.0, energy: 7.8 },
    { period: '2025-11-09', label: '11-09', trips: 1, distance: 8, avgConsumption: 26.7, energy: 2.1 }
  ],
  weeklyData: [
    { period: '2025-W15', label: 'W15', trips: 2, distance: 39, avgConsumption: 21.9, energy: 8.5 },
    { period: '2025-W25', label: 'W25', trips: 2, distance: 29, avgConsumption: 27.0, energy: 7.8 },
    { period: '2025-W45', label: 'W45', trips: 2, distance: 14, avgConsumption: 28.6, energy: 4.0 }
  ],
  bestTrip: {
    date: '2025-04-12',
    distance: 33,
    consumption: 20.0,
    speed: 36
  },
  worstTrip: {
    date: '2025-06-21',
    distance: 6,
    consumption: 31.4,
    speed: 31
  },
  rawTrips: []
};

// ========== CSV PARSER ==========
function parseCSV(text) {
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

function processUploadedData(sinceStartData, sinceChargeData) {
  // Helper to get week number from date
  const getWeekNumber = (d) => {
    const startOfYear = new Date(d.getFullYear(), 0, 1);
    const weekNum = Math.ceil(((d - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
    return `${d.getFullYear()}-W${weekNum.toString().padStart(2, '0')}`;
  };

  // Helper to get season from month
  const getSeason = (month) => {
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Autumn';
    return 'Winter';
  };

  const trips = sinceStartData.map(row => {
    // Support multiple header formats (Portuguese and English)
    const dateStr = row['arrival time'] || row['data de chegada'] || row['arrival date'] || '';
    const distance = parseFloat((row['distance (km)'] || row['distância'] || row['distance'] || '0').replace(',', '.')) || 0;
    const consumption = parseFloat((row['avg. consumption (kwh/100 km)'] || row['consumo'] || row['consumption'] || '0').replace(',', '.')) || 0;
    const speed = parseFloat((row['average speed (km/h)'] || row['velocidade média'] || row['average speed'] || '0').replace(',', '.')) || 0;

    let hour = 12;
    let parsedDate = null;
    let dateKey = '';
    let weekKey = '';
    let monthKey = '';
    let season = '';

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
  trips.forEach(t => {
    const h = String(t.hour).padStart(2, '0');
    if (!hourMap[h]) hourMap[h] = { hour: h, trips: 0, distance: 0 };
    hourMap[h].trips++;
    hourMap[h].distance = precise.add(hourMap[h].distance, t.distance);
  });
  const hourData = Object.values(hourMap).sort((a, b) => a.hour.localeCompare(b.hour));

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayMap = {};
  trips.forEach(t => {
    let d = null;
    // Try ISO format first: 2025-11-09T13:22:52Z
    const isoMatch = t.date.match(/^(\d{4})-(\d{2})-(\d{2})T/);
    if (isoMatch) {
      d = new Date(isoMatch[1], parseInt(isoMatch[2]) - 1, isoMatch[3]);
    } else {
      // Try Portuguese format: dd/mm/yyyy
      const dateMatch = t.date.match(/(\d{2})\/(\d{2})\/(\d{4})/);
      if (dateMatch) {
        d = new Date(dateMatch[3], parseInt(dateMatch[2]) - 1, dateMatch[1]);
      }
    }
    if (d) {
      const dayName = dayNames[d.getDay()];
      if (!dayMap[dayName]) dayMap[dayName] = { day: dayName, trips: 0, distance: 0, totalConsumption: 0 };
      dayMap[dayName].trips++;
      dayMap[dayName].distance = precise.add(dayMap[dayName].distance, t.distance);
      dayMap[dayName].totalConsumption = precise.add(dayMap[dayName].totalConsumption, t.consumption);
    }
  });
  const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
  const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getMonthInfo = (dateStr) => {
    // Try ISO format: 2025-11-09T13:22:52Z
    const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-\d{2}T/);
    if (isoMatch) {
      const monthNum = parseInt(isoMatch[2]);
      return { key: `${isoMatch[1]}-${isoMatch[2]}`, name: monthNames[monthNum] };
    }
    // Try Portuguese format: dd/mm/yyyy
    const dateMatch = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (dateMatch) {
      const monthNum = parseInt(dateMatch[2]);
      return { key: `${dateMatch[3]}-${dateMatch[2]}`, name: monthNames[monthNum] };
    }
    return null;
  };

  trips.forEach(t => {
    const monthInfo = getMonthInfo(t.date);
    if (monthInfo) {
      if (!monthMap[monthInfo.key]) monthMap[monthInfo.key] = { key: monthInfo.key, month: monthInfo.name, trips: 0, distance: 0, totalConsumption: 0 };
      monthMap[monthInfo.key].trips++;
      monthMap[monthInfo.key].distance = precise.add(monthMap[monthInfo.key].distance, t.distance);
      monthMap[monthInfo.key].totalConsumption = precise.add(monthMap[monthInfo.key].totalConsumption, t.consumption);
    }
  });

  const chargeCycles = sinceChargeData.length;
  const chargeMonthMap = {};
  sinceChargeData.forEach(row => {
    const dateStr = row['arrival time'] || row['data de chegada'] || row['arrival date'] || '';
    const monthInfo = getMonthInfo(dateStr);
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

  // Seasonal efficiency data
  const seasonColors = { Spring: '#84cc16', Summer: '#f59e0b', Autumn: '#ea580c', Winter: '#3b82f6' };
  const seasonOrder = ['Spring', 'Summer', 'Autumn', 'Winter'];
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

// ========== TAYCAN SPECIFICATIONS ==========
const TAYCAN_SPECS = {
  batteryCapacity: 93.4,      // Gross battery capacity in kWh
  usableBattery: 83.7,        // Usable battery capacity in kWh
  officialRange: 416,         // WLTP range in km (Taycan 4 Cross Turismo)
  officialConsumption: 24.8,  // WLTP consumption kWh/100km
  co2PerKwhPortugal: 164,     // gCO2/kWh for Portugal electricity grid (2024)
  co2PerLiterPetrol: 2310,    // gCO2/L for petrol
  treeCo2PerYear: 21000,      // gCO2 absorbed per tree per year
  taycanBenchmark: {          // Typical Taycan 4 Cross Turismo owner stats
    avgConsumption: 26.5,
    winterConsumption: 30.0,
    summerConsumption: 24.0,
    highwayConsumption: 28.5,
    cityConsumption: 22.0
  }
};

// ========== STORAGE KEYS ==========
const STORAGE_KEYS = { DATA: 'taycan_data', SETTINGS: 'taycan_settings' };

// ========== MAIN COMPONENT ==========
export default function App() {
  const [appData, setAppData] = useState(null);
  const [useSampleData, setUseSampleData] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showSettings, setShowSettings] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ start: null, charge: null });
  const [electricityPrice, setElectricityPrice] = useState(0.25);
  const [petrolPrice, setPetrolPrice] = useState(1.80);
  const [petrolConsumption, setPetrolConsumption] = useState(8.0);

  const [modalConfig, setModalConfig] = useState(null);
  const [timeView, setTimeView] = useState('month'); // 'day', 'week', 'month'
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = safeStorage.get('taycan_theme');
    return saved !== null ? saved : true; // Default to dark mode
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    safeStorage.set('taycan_theme', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const savedData = safeStorage.get(STORAGE_KEYS.DATA);
    const savedSettings = safeStorage.get(STORAGE_KEYS.SETTINGS);
    if (savedData) setAppData(savedData);
    if (savedSettings) {
      setElectricityPrice(savedSettings.electricityPrice ?? 0.25);
      setPetrolPrice(savedSettings.petrolPrice ?? 1.80);
      setPetrolConsumption(savedSettings.petrolConsumption ?? 8.0);
    }
  }, []);

  useEffect(() => {
    safeStorage.set(STORAGE_KEYS.SETTINGS, { electricityPrice, petrolPrice, petrolConsumption });
  }, [electricityPrice, petrolPrice, petrolConsumption]);

  const data = useMemo(() => appData || (useSampleData ? SAMPLE_DATA : null), [appData, useSampleData]);

  // Time-based aggregated data based on timeView selection
  const timeViewData = useMemo(() => {
    if (!data) return [];
    if (timeView === 'day') return data.dailyData || [];
    if (timeView === 'week') return data.weeklyData || [];
    // Default to monthly - transform monthlyData to match the same structure
    return (data.monthlyData || []).map(m => ({
      period: m.month,
      label: m.month,
      trips: m.trips,
      distance: m.distance,
      avgConsumption: m.consumption,
      energy: precise.div(precise.mul(m.distance, m.consumption), 100)
    }));
  }, [data, timeView]);

  const costs = useMemo(() => {
    if (!data) return null;
    const electricCostRaw = precise.mul(data.summary.totalEnergy, electricityPrice);
    const petrolCostRaw = precise.mul(precise.mul(precise.div(data.summary.totalDistance, 100), petrolConsumption), petrolPrice);
    const savingsRaw = precise.sub(petrolCostRaw, electricCostRaw);
    const costPerKmElectric = precise.mul(precise.div(data.summary.avgConsumption, 100), electricityPrice);
    const costPerKmPetrol = precise.mul(precise.div(petrolConsumption, 100), petrolPrice);
    return {
      electricCost: precise.round(electricCostRaw, 2),
      petrolCost: precise.round(petrolCostRaw, 2),
      savings: precise.round(savingsRaw, 2),
      costPerKmElectric: precise.round(costPerKmElectric, 3),
      costPerKmPetrol: precise.round(costPerKmPetrol, 3),
      savingsRate: petrolCostRaw > 0 ? Math.round((1 - electricCostRaw / petrolCostRaw) * 100) : 0
    };
  }, [data, electricityPrice, petrolPrice, petrolConsumption]);

  // ========== ENVIRONMENTAL IMPACT CALCULATIONS ==========
  const environmental = useMemo(() => {
    if (!data) return null;

    // CO2 from electric driving (grid emissions)
    const co2Electric = precise.mul(data.summary.totalEnergy, TAYCAN_SPECS.co2PerKwhPortugal); // grams

    // CO2 that would have been emitted by petrol car
    const litersUsed = precise.mul(precise.div(data.summary.totalDistance, 100), petrolConsumption);
    const co2Petrol = precise.mul(litersUsed, TAYCAN_SPECS.co2PerLiterPetrol); // grams

    // CO2 saved
    const co2Saved = precise.sub(co2Petrol, co2Electric); // grams
    const co2SavedKg = precise.div(co2Saved, 1000);
    const co2SavedTons = precise.div(co2SavedKg, 1000);

    // Trees equivalent (how many trees would absorb this CO2 in a year)
    const treesEquivalent = precise.div(co2Saved, TAYCAN_SPECS.treeCo2PerYear);

    // Emissions per km
    const co2PerKmElectric = data.summary.totalDistance > 0
      ? precise.div(co2Electric, data.summary.totalDistance)
      : 0;
    const co2PerKmPetrol = data.summary.totalDistance > 0
      ? precise.div(co2Petrol, data.summary.totalDistance)
      : 0;

    // Reduction percentage
    const reductionPct = co2Petrol > 0
      ? Math.round((1 - co2Electric / co2Petrol) * 100)
      : 0;

    return {
      co2Electric: precise.round(precise.div(co2Electric, 1000), 1), // kg
      co2Petrol: precise.round(precise.div(co2Petrol, 1000), 1), // kg
      co2SavedKg: precise.round(co2SavedKg, 1),
      co2SavedTons: precise.round(co2SavedTons, 2),
      treesEquivalent: precise.round(treesEquivalent, 1),
      co2PerKmElectric: precise.round(co2PerKmElectric, 1), // g/km
      co2PerKmPetrol: precise.round(co2PerKmPetrol, 1), // g/km
      reductionPct,
      litersAvoided: precise.round(litersUsed, 1)
    };
  }, [data, petrolConsumption]);

  // ========== BATTERY & RANGE ANALYSIS ==========
  const batteryAnalysis = useMemo(() => {
    if (!data) return null;

    const { usableBattery, officialRange, officialConsumption } = TAYCAN_SPECS;

    // Real-world range based on actual consumption
    const realWorldRange = data.summary.avgConsumption > 0
      ? precise.div(precise.mul(usableBattery, 100), data.summary.avgConsumption)
      : 0;

    // Range efficiency vs WLTP
    const rangeEfficiency = officialRange > 0
      ? Math.round((realWorldRange / officialRange) * 100)
      : 0;

    // Energy per trip
    const energyPerTrip = data.summary.totalTrips > 0
      ? precise.div(data.summary.totalEnergy, data.summary.totalTrips)
      : 0;

    // Trips possible on full charge
    const tripsPerFullCharge = energyPerTrip > 0
      ? Math.floor(usableBattery / energyPerTrip)
      : 0;

    // Distance per full charge (based on actual consumption)
    const distancePerCharge = data.summary.totalChargeCycles > 0
      ? precise.div(data.summary.totalDistance, data.summary.totalChargeCycles)
      : 0;

    // % of battery used per average trip
    const batteryPerTrip = usableBattery > 0
      ? precise.round(precise.div(energyPerTrip, usableBattery) * 100, 1)
      : 0;

    // Long trips threshold calculation (using >50% battery)
    // This threshold represents the distance at which a trip uses 50% of battery
    const _longTripThreshold = usableBattery * 0.5;
    const _longTripDistance = precise.div(precise.mul(_longTripThreshold, 100), data.summary.avgConsumption || 27);

    // Consumption vs official
    const consumptionVsOfficial = officialConsumption > 0
      ? Math.round(((data.summary.avgConsumption / officialConsumption) - 1) * 100)
      : 0;

    // Best and worst monthly consumption
    const monthlyConsumptions = data.monthlyData.filter(m => m.consumption > 0).map(m => m.consumption);
    const bestMonth = monthlyConsumptions.length > 0 ? Math.min(...monthlyConsumptions) : 0;
    const worstMonth = monthlyConsumptions.length > 0 ? Math.max(...monthlyConsumptions) : 0;
    const seasonalVariation = bestMonth > 0 ? Math.round(((worstMonth / bestMonth) - 1) * 100) : 0;

    return {
      realWorldRange: Math.round(realWorldRange),
      officialRange,
      rangeEfficiency,
      energyPerTrip: precise.round(energyPerTrip, 2),
      tripsPerFullCharge,
      distancePerCharge: Math.round(distancePerCharge),
      batteryPerTrip,
      consumptionVsOfficial,
      bestMonth,
      worstMonth,
      seasonalVariation
    };
  }, [data]);

  // ========== PREDICTIVE ANALYTICS ==========
  const predictions = useMemo(() => {
    if (!data || data.monthlyData.length < 2) return null;

    const months = data.monthlyData.length;

    // Average monthly metrics
    const avgMonthlyDistance = data.summary.avgKmPerMonth;
    const avgMonthlyTrips = data.summary.avgTripsPerMonth;
    const avgMonthlyEnergy = months > 0 ? precise.div(data.summary.totalEnergy, months) : 0;
    const avgMonthlyCost = costs ? precise.div(costs.electricCost, months) : 0;
    const avgMonthlySavings = costs ? precise.div(costs.savings, months) : 0;

    // Annual projections
    const annualDistance = precise.mul(avgMonthlyDistance, 12);
    const annualTrips = precise.mul(avgMonthlyTrips, 12);
    const annualEnergy = precise.mul(avgMonthlyEnergy, 12);
    const annualElectricCost = precise.mul(avgMonthlyCost, 12);
    const annualSavings = precise.mul(avgMonthlySavings, 12);
    const annualCharges = data.summary.totalChargeCycles > 0
      ? Math.round((data.summary.totalChargeCycles / months) * 12)
      : 0;

    // 5-year projection
    const fiveYearSavings = precise.mul(annualSavings, 5);
    const fiveYearDistance = precise.mul(annualDistance, 5);

    // Seasonal consumption prediction (based on existing data patterns)
    const summerMonths = data.monthlyData.filter(m => ['Jun', 'Jul', 'Aug'].includes(m.month));
    const winterMonths = data.monthlyData.filter(m => ['Dec', 'Jan', 'Feb'].includes(m.month));

    const avgSummerConsumption = summerMonths.length > 0
      ? precise.div(summerMonths.reduce((s, m) => s + m.consumption, 0), summerMonths.length)
      : data.summary.avgConsumption;
    const avgWinterConsumption = winterMonths.length > 0
      ? precise.div(winterMonths.reduce((s, m) => s + m.consumption, 0), winterMonths.length)
      : data.summary.avgConsumption;

    // Next month prediction (simple moving average of last 3 months)
    const recentMonths = data.monthlyData.slice(-3);
    const nextMonthDistance = recentMonths.length > 0
      ? Math.round(recentMonths.reduce((s, m) => s + m.distance, 0) / recentMonths.length)
      : avgMonthlyDistance;
    const nextMonthTrips = recentMonths.length > 0
      ? Math.round(recentMonths.reduce((s, m) => s + m.trips, 0) / recentMonths.length)
      : avgMonthlyTrips;

    return {
      avgMonthlyDistance: Math.round(avgMonthlyDistance),
      avgMonthlyTrips: Math.round(avgMonthlyTrips),
      avgMonthlyEnergy: precise.round(avgMonthlyEnergy, 1),
      avgMonthlyCost: precise.round(avgMonthlyCost, 2),
      avgMonthlySavings: precise.round(avgMonthlySavings, 2),
      annualDistance: Math.round(annualDistance),
      annualTrips: Math.round(annualTrips),
      annualEnergy: Math.round(annualEnergy),
      annualElectricCost: Math.round(annualElectricCost),
      annualSavings: Math.round(annualSavings),
      annualCharges,
      fiveYearSavings: Math.round(fiveYearSavings),
      fiveYearDistance: Math.round(fiveYearDistance),
      avgSummerConsumption: precise.round(avgSummerConsumption, 1),
      avgWinterConsumption: precise.round(avgWinterConsumption, 1),
      nextMonthDistance,
      nextMonthTrips
    };
  }, [data, costs]);

  // ========== CHARGING OPTIMIZATION ==========
  const chargingOptimization = useMemo(() => {
    if (!data) return null;

    const { usableBattery } = TAYCAN_SPECS;

    // Current charging frequency
    const daysOfData = data.monthlyData.length * 30; // Approximate
    const chargesPerWeek = daysOfData > 0
      ? precise.round(precise.div(data.summary.totalChargeCycles * 7, daysOfData), 1)
      : 0;

    // Energy per charge cycle
    const energyPerCharge = data.summary.totalChargeCycles > 0
      ? precise.div(data.summary.totalEnergy, data.summary.totalChargeCycles)
      : 0;

    // Average SOC used per cycle (assuming full charges)
    const socUsedPerCycle = usableBattery > 0
      ? Math.round((energyPerCharge / usableBattery) * 100)
      : 0;

    // Optimal charging recommendation (80-20 rule for battery health)
    const optimalChargeRange = 60; // 80% - 20% = 60% usable range
    const optimalEnergyPerCharge = precise.mul(usableBattery, optimalChargeRange / 100);
    const optimalDistancePerCharge = data.summary.avgConsumption > 0
      ? precise.div(precise.mul(optimalEnergyPerCharge, 100), data.summary.avgConsumption)
      : 0;

    // Charging efficiency estimate (assuming 90% charging efficiency)
    const chargingEfficiency = 0.90;
    const actualEnergyFromGrid = precise.div(data.summary.totalEnergy, chargingEfficiency);
    const chargingLosses = precise.sub(actualEnergyFromGrid, data.summary.totalEnergy);

    // Time-of-use optimization potential (assuming 30% cheaper off-peak)
    const offPeakDiscount = 0.30;
    const potentialOffPeakSavings = costs
      ? precise.mul(costs.electricCost, offPeakDiscount)
      : 0;

    // Battery cycles estimate (one cycle = full battery discharged)
    const batteryFullCycles = usableBattery > 0
      ? precise.round(precise.div(data.summary.totalEnergy, usableBattery), 1)
      : 0;

    return {
      chargesPerWeek,
      energyPerCharge: precise.round(energyPerCharge, 1),
      socUsedPerCycle,
      optimalDistancePerCharge: Math.round(optimalDistancePerCharge),
      chargingLosses: precise.round(chargingLosses, 1),
      potentialOffPeakSavings: precise.round(potentialOffPeakSavings, 2),
      batteryFullCycles,
      tripsPerCharge: data.summary.avgTripsPerCharge
    };
  }, [data, costs]);

  // ========== BENCHMARK COMPARISON ==========
  const benchmarks = useMemo(() => {
    if (!data) return null;

    const { taycanBenchmark } = TAYCAN_SPECS;

    // Compare to typical Taycan owner
    const vsAvgTaycan = data.summary.avgConsumption > 0
      ? Math.round(((data.summary.avgConsumption / taycanBenchmark.avgConsumption) - 1) * 100)
      : 0;

    // Efficiency rating (1-5 scale)
    let efficiencyRating = 3;
    if (data.summary.avgConsumption <= 24) efficiencyRating = 5;
    else if (data.summary.avgConsumption <= 26) efficiencyRating = 4;
    else if (data.summary.avgConsumption <= 28) efficiencyRating = 3;
    else if (data.summary.avgConsumption <= 30) efficiencyRating = 2;
    else efficiencyRating = 1;

    // Driving style indicators
    const shortTripPenalty = data.summary.shortTripsPct > 50 ? 'High' : data.summary.shortTripsPct > 30 ? 'Moderate' : 'Low';

    // Compare trip distribution to typical
    const microTripPct = data.tripTypes.find(t => t.type === 'Micro (<5km)')?.count || 0;
    const microTripRatio = data.summary.totalTrips > 0
      ? precise.round(precise.div(microTripPct, data.summary.totalTrips) * 100, 1)
      : 0;

    // EV comparison (approximate competitors)
    const competitors = [
      { name: 'Your Taycan', consumption: data.summary.avgConsumption, range: batteryAnalysis?.realWorldRange || 0 },
      { name: 'Taycan Avg', consumption: 26.5, range: 316 },
      { name: 'Model S', consumption: 18.5, range: 420 },
      { name: 'EQS', consumption: 20.5, range: 400 },
      { name: 'BMW i7', consumption: 22.0, range: 380 }
    ];

    return {
      vsAvgTaycan,
      efficiencyRating,
      shortTripPenalty,
      microTripRatio,
      competitors,
      drivingProfile: data.summary.avgTripDistance < 15 ? 'Urban Commuter'
        : data.summary.avgTripDistance < 30 ? 'Mixed Use'
        : 'Highway Cruiser'
    };
  }, [data, batteryAnalysis]);

  // ========== DRIVING INSIGHTS ==========
  const drivingInsights = useMemo(() => {
    if (!data) return null;

    const insights = [];

    // Commute detection
    const morningTrips = data.hourData.filter(h => ['07', '08'].includes(h.hour)).reduce((s, h) => s + h.trips, 0);
    const eveningTrips = data.hourData.filter(h => ['17', '18', '19'].includes(h.hour)).reduce((s, h) => s + h.trips, 0);
    const commuteTrips = morningTrips + eveningTrips;
    const commutePct = data.summary.totalTrips > 0 ? Math.round((commuteTrips / data.summary.totalTrips) * 100) : 0;

    if (commutePct > 30) {
      insights.push({
        type: 'commute',
        iconName: 'car',
        title: 'Daily Commuter',
        description: `${commutePct}% of your trips are during typical commute hours (7-8am, 5-7pm). Consider pre-conditioning while plugged in to save energy.`,
        severity: 'info'
      });
    }

    // Short trip warning
    if (data.summary.shortTripsPct > 40) {
      insights.push({
        type: 'efficiency',
        iconName: 'warning',
        title: 'High Short-Trip Usage',
        description: `${data.summary.shortTripsPct}% of trips are under 10km. Short trips use ${Math.round((30.4 / 23.7 - 1) * 100)}% more energy per km. Consider combining errands.`,
        severity: 'warning'
      });
    }

    // Weekend warrior
    const saturdayData = data.dayData.find(d => d.day === 'Sat');
    const weekdayAvgDist = data.dayData.filter(d => !['Sat', 'Sun'].includes(d.day)).reduce((s, d) => s + d.avgDist, 0) / 5;
    if (saturdayData && saturdayData.avgDist > weekdayAvgDist * 2) {
      insights.push({
        type: 'pattern',
        iconName: 'patterns',
        title: 'Weekend Road-Tripper',
        description: `Saturday trips average ${saturdayData.avgDist}km vs ${Math.round(weekdayAvgDist)}km on weekdays. Longer trips are more efficient!`,
        severity: 'success'
      });
    }

    // Winter impact
    const winterData = data.monthlyData.filter(m => ['Dec', 'Jan', 'Feb'].includes(m.month));
    const summerData = data.monthlyData.filter(m => ['Jun', 'Jul', 'Aug'].includes(m.month));
    if (winterData.length > 0 && summerData.length > 0) {
      const winterAvg = winterData.reduce((s, m) => s + m.consumption, 0) / winterData.length;
      const summerAvg = summerData.reduce((s, m) => s + m.consumption, 0) / summerData.length;
      const winterImpact = Math.round(((winterAvg / summerAvg) - 1) * 100);
      if (winterImpact > 10) {
        insights.push({
          type: 'seasonal',
          iconName: 'snowflake',
          title: 'Winter Efficiency Drop',
          description: `Winter consumption is ${winterImpact}% higher than summer (${precise.round(winterAvg, 1)} vs ${precise.round(summerAvg, 1)} kWh/100km). Use seat heating over cabin heating.`,
          severity: 'warning'
        });
      }
    }

    // Efficiency sweet spot
    const optimalSpeed = data.speedEfficiency.reduce((best, curr) =>
      curr.consumption < best.consumption && curr.trips > 5 ? curr : best
    , data.speedEfficiency[0]);

    insights.push({
      type: 'tip',
      iconName: 'lightbulb',
      title: 'Your Efficiency Sweet Spot',
      description: `Best efficiency at ${optimalSpeed.range} km/h (${optimalSpeed.consumption} kWh/100km). This is ${Math.round((1 - optimalSpeed.consumption / data.summary.avgConsumption) * 100)}% better than your average.`,
      severity: 'success'
    });

    // Charging pattern
    if (data.summary.avgTripsPerCharge > 6) {
      insights.push({
        type: 'charging',
        iconName: 'battery',
        title: 'Optimal Charging Frequency',
        description: `Averaging ${data.summary.avgTripsPerCharge} trips per charge is healthy for battery longevity. Keep it up!`,
        severity: 'success'
      });
    } else if (data.summary.avgTripsPerCharge < 3) {
      insights.push({
        type: 'charging',
        iconName: 'plug',
        title: 'Frequent Charging',
        description: `You charge after ${data.summary.avgTripsPerCharge} trips on average. Consider charging less frequently for battery health.`,
        severity: 'info'
      });
    }

    return {
      insights,
      commutePct,
      morningTrips,
      eveningTrips
    };
  }, [data]);

  const handleFileUpload = useCallback((file, type) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = parseCSV(e.target.result);
        setUploadStatus(prev => ({ ...prev, [type]: { name: file.name, rows: parsed.length, data: parsed } }));
      } catch (err) {
        setModalConfig({ title: 'Error', message: 'Error parsing file: ' + err.message, variant: 'danger' });
      }
    };
    reader.readAsText(file);
  }, []);

  const processUploadedFiles = useCallback(() => {
    if (!uploadStatus.start?.data) {
      setModalConfig({ title: 'Missing File', message: 'Please upload the "Since Start" file to proceed.', variant: 'danger' });
      return;
    }
    const processed = processUploadedData(uploadStatus.start.data, uploadStatus.charge?.data || []);
    setAppData(processed);
    safeStorage.set(STORAGE_KEYS.DATA, processed);
    setShowUpload(false);
    setUploadStatus({ start: null, charge: null });
  }, [uploadStatus]);

  const handleBackup = useCallback(() => {
    try {
      const backup = { version: 1, timestamp: new Date().toISOString(), data: appData, settings: { electricityPrice, petrolPrice, petrolConsumption } };

      const filename = `taycan-backup-${new Date().toISOString().split('T')[0]}.json`;
      downloadFile(JSON.stringify(backup, null, 2), filename);
    } catch (err) {
      setModalConfig({ title: 'Export Error', message: 'Failed to create backup: ' + err.message, variant: 'danger' });
    }
  }, [appData, electricityPrice, petrolPrice, petrolConsumption]);

  const handleRestore = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        if (backup.data) { setAppData(backup.data); safeStorage.set(STORAGE_KEYS.DATA, backup.data); }
        if (backup.settings) {
          setElectricityPrice(backup.settings.electricityPrice ?? 0.25);
          setPetrolPrice(backup.settings.petrolPrice ?? 1.80);
          setPetrolConsumption(backup.settings.petrolConsumption ?? 8.0);
        }
        setModalConfig({ title: 'Success', message: 'Backup restored successfully!', variant: 'success' });
      } catch (err) {
        setModalConfig({ title: 'Error', message: 'Failed to restore: ' + err.message, variant: 'danger' });
      }
    };
    reader.readAsText(file);
  }, []);

  const handleClearData = useCallback(() => {
    setModalConfig({
      title: 'Clear All Data?',
      message: 'This action cannot be undone. All your trip data and settings will be permanently removed from this device.',
      variant: 'danger',
      onCancel: () => setModalConfig(null),
      cancelText: 'Cancel',
      confirmText: 'Yes, Clear Data',
      onConfirm: () => {
        setAppData(null);
        setUseSampleData(false);
        safeStorage.remove(STORAGE_KEYS.DATA);
        setShowSettings(false);
      }
    });
  }, []);

  // Modern SVG icons for navigation
  const icons = {
    overview: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    patterns: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    efficiency: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    costs: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    environmental: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    battery: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
      </svg>
    ),
    insights: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    settings: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    sun: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    moon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
    upload: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
    download: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    lock: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    car: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    lightbulb: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    snowflake: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l-3 3m3-3l3 3m-3 15l-3-3m3 3l3-3M3 12h18M3 12l3-3m-3 3l3 3m15-3l-3-3m3 3l-3 3" />
      </svg>
    ),
    chartBar: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    globe: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    target: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-9 0a9 9 0 1018 0 9 9 0 10-18 0M12 12m-5 0a5 5 0 1010 0 5 5 0 10-10 0M12 12m-1 0a1 1 0 102 0 1 1 0 10-2 0" />
      </svg>
    ),
    trendingUp: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    bolt: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    plug: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
      </svg>
    ),
    check: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
    close: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  };

  // Icon component helper for different sizes
  const Icon = ({ name, size = 'md', className = '' }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
      '2xl': 'w-10 h-10'
    };
    const icon = icons[name];
    if (!icon) return null;
    return React.cloneElement(icon, {
      className: `${sizeClasses[size]} ${className}`.trim()
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'patterns', label: 'Patterns' },
    { id: 'efficiency', label: 'Efficiency' },
    { id: 'costs', label: 'Costs' },
    { id: 'environmental', label: 'Environmental' },
    { id: 'battery', label: 'Battery' },
    { id: 'insights', label: 'Insights' }
  ];

  // Chart theme colors
  const chartColors = {
    grid: darkMode ? '#3f3f46' : '#e4e4e7',
    axis: darkMode ? '#a1a1aa' : '#71717a',
    tooltipBg: darkMode ? '#18181b' : '#ffffff',
    tooltipBorder: darkMode ? '#3f3f46' : '#e4e4e7',
    tooltipText: darkMode ? '#fff' : '#18181b'
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100' : 'bg-gradient-to-br from-zinc-100 via-zinc-50 to-white text-zinc-900'}`}>
      {/* Header */}
      <header className={`border-b backdrop-blur-sm sticky top-0 z-50 ${darkMode ? 'border-zinc-800 bg-zinc-950/80' : 'border-zinc-200 bg-white/80'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div>
                <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Taycan Trip Analyzer</h1>
                <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Porsche EV Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-500/20 border-emerald-500/30'} border`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className={`text-xs font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>LOCAL-FIRST</span>
              </div>
              <div className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full ${darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-500/20 border-blue-500/30'} border`}>
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className={`text-xs font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>PRIVACY-FIRST</span>
              </div>
              {/* Menu toggle button - visible on mobile/tablet */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'}`}
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <svg className={`w-5 h-5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className={`w-5 h-5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu - slides in from left on mobile/tablet */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } w-72 ${
          darkMode ? 'bg-zinc-900 border-r border-zinc-800' : 'bg-white border-r border-zinc-200'
        } overflow-y-auto`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Mobile header */}
          <div className={`flex items-center justify-between mb-6 pb-4 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Menu</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}
            >
              <svg className={`w-5 h-5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Menu Items */}
          <nav className="flex-1 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMenuOpen(false);
                  setShowSettings(false);
                }}
                className={`w-full px-3 py-2.5 rounded-xl font-medium transition-all flex items-center gap-3 text-sm ${
                  activeTab === tab.id && !showSettings
                    ? 'bg-sky-500 text-white'
                    : darkMode
                      ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                {icons[tab.id]}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Divider */}
          <div className={`my-4 border-t ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`} />

          {/* Settings Section */}
          <div className="space-y-1">
            <button
              onClick={() => {
                setShowSettings(!showSettings);
                setMenuOpen(false);
              }}
              className={`w-full px-3 py-2.5 rounded-xl font-medium transition-all flex items-center gap-3 text-sm ${
                showSettings
                  ? 'bg-sky-500 text-white'
                  : darkMode
                    ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              {icons.settings}
              <span>Settings</span>
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full px-3 py-2.5 rounded-xl font-medium transition-all flex items-center gap-3 text-sm ${
                darkMode
                  ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              {darkMode ? icons.moon : icons.sun}
              <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>

          {/* Privacy badges */}
          <div className="mt-4 pt-4 border-t border-zinc-700 space-y-2">
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-500/20 border-emerald-500/30'} border`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className={`text-xs font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>LOCAL-FIRST</span>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full ${darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-500/20 border-blue-500/30'} border`}>
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className={`text-xs font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>PRIVACY-FIRST</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Upload Modal */}
      {showUpload && (
        <div className={`fixed inset-0 ${darkMode ? 'bg-black/70' : 'bg-black/50'} backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
          <div className={`rounded-2xl border max-w-md w-full p-5 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            <div className="flex items-center justify-between mb-5">
              <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Upload Porsche Data</h2>
              <button onClick={() => setShowUpload(false)} className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <label className={`block p-4 rounded-xl border-2 border-dashed cursor-pointer text-center ${darkMode ? 'border-zinc-700 hover:border-sky-500/50' : 'border-zinc-300 hover:border-sky-500'}`}>
                <input type="file" accept=".csv" className="hidden" onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'start')} />
                <div className={`text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Since Start <span className="text-sky-500">*Required</span></div>
                <div className="text-xs text-zinc-500">Individual trips</div>
                {uploadStatus.start && <div className="mt-2 text-xs text-emerald-500"><span className="inline-flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>{uploadStatus.start.name}</span> ({uploadStatus.start.rows} trips)</div>}
              </label>
              <label className={`block p-4 rounded-xl border-2 border-dashed cursor-pointer text-center ${darkMode ? 'border-zinc-700 hover:border-blue-500/50' : 'border-zinc-300 hover:border-blue-500'}`}>
                <input type="file" accept=".csv" className="hidden" onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'charge')} />
                <div className={`text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Since Charge <span className="text-zinc-500">Optional</span></div>
                <div className="text-xs text-zinc-500">Charge cycles</div>
                {uploadStatus.charge && <div className="mt-2 text-xs text-emerald-500"><span className="inline-flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>{uploadStatus.charge.name}</span> ({uploadStatus.charge.rows} cycles)</div>}
              </label>
              <button onClick={processUploadedFiles} disabled={!uploadStatus.start} className={`w-full py-2.5 rounded-xl bg-sky-500 text-white font-bold ${!uploadStatus.start ? 'opacity-50' : ''}`}>Process Data</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Dialog */}
      {modalConfig && (
        <div className={`fixed inset-0 ${darkMode ? 'bg-black/70' : 'bg-black/50'} backdrop-blur-sm z-[60] flex items-center justify-center p-4`}>
          <div className={`rounded-2xl border max-w-sm w-full p-5 shadow-2xl transform transition-all scale-100 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{modalConfig.title || 'Notification'}</h3>
            <p className={`text-sm mb-5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{modalConfig.message}</p>
            <div className="flex gap-3 justify-end">
              {modalConfig.onCancel && (
                <button
                  onClick={() => setModalConfig(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900'}`}
                >
                  {modalConfig.cancelText || 'Cancel'}
                </button>
              )}
              <button
                onClick={() => {
                  if (modalConfig.onConfirm) modalConfig.onConfirm();
                  setModalConfig(null);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${modalConfig.variant === 'danger' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-sky-500 hover:bg-sky-600 text-white'}`}
              >
                {modalConfig.confirmText || 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout Container */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* Desktop Sidebar - hidden on mobile/tablet, shown on lg+ */}
        <aside className="hidden lg:block w-56 flex-shrink-0 py-6 pl-4">
          <div className={`sticky top-20 p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
            {/* Navigation Menu Items */}
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowSettings(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl font-medium transition-all flex items-center gap-3 text-sm ${
                    activeTab === tab.id && !showSettings
                      ? 'bg-sky-500 text-white'
                      : darkMode
                        ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  {icons[tab.id]}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Divider */}
            <div className={`my-4 border-t ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`} />

            {/* Settings */}
            <div className="space-y-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`w-full px-3 py-2.5 rounded-xl font-medium transition-all flex items-center gap-3 text-sm ${
                  showSettings
                    ? 'bg-sky-500 text-white'
                    : darkMode
                      ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                {icons.settings}
                <span>Settings</span>
              </button>

              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-full px-3 py-2.5 rounded-xl font-medium transition-all flex items-center gap-3 text-sm ${
                  darkMode
                    ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                {darkMode ? icons.moon : icons.sun}
                <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 py-6">
          {/* Settings Page */}
          {showSettings && (
            <div className="space-y-6">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Settings</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Cost Settings */}
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
                  <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Cost Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Electricity (€/kWh)</label>
                      <input type="number" step="0.01" value={electricityPrice} onChange={(e) => setElectricityPrice(parseFloat(e.target.value) || 0)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`} />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Petrol (€/L)</label>
                      <input type="number" step="0.01" value={petrolPrice} onChange={(e) => setPetrolPrice(parseFloat(e.target.value) || 0)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`} />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Petrol Consumption (L/100km)</label>
                      <input type="number" step="0.1" value={petrolConsumption} onChange={(e) => setPetrolConsumption(parseFloat(e.target.value) || 0)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`} />
                    </div>
                  </div>
                </div>

                {/* Data Management */}
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
                  <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Data Management</h3>
                  <div className="space-y-3">
                    <button onClick={() => setShowUpload(true)} className="w-full px-3 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-colors"><span className="inline-flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>Upload CSV Files</span></button>
                    {appData && (
                      <button onClick={handleClearData} className="w-full px-3 py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-medium border border-red-500/20 transition-colors">Clear All Data</button>
                    )}
                  </div>
                </div>

                {/* Backup & Restore */}
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
                  <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Backup & Restore</h3>
                  <div className="space-y-3">
                    <button onClick={handleBackup} disabled={!appData} className={`w-full px-3 py-2.5 rounded-lg disabled:opacity-50 text-sm font-medium transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900'}`}><span className="inline-flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>Download Backup</span></button>
                    <label className={`w-full px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center cursor-pointer transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900'}`}>
                      <span className="inline-flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>Restore Backup</span>
                      <input type="file" accept=".json" className="hidden" onChange={(e) => e.target.files[0] && handleRestore(e.target.files[0])} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-500/10 border-emerald-500/30'} border`}>
                <div className="flex items-start gap-3">
                  <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg></span>
                  <div>
                    <h4 className={`font-semibold text-sm mb-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>All Data Stored Locally</h4>
                    <p className={`text-xs ${darkMode ? 'text-emerald-400/80' : 'text-emerald-600'}`}>Your trip data never leaves your device. No servers, no tracking, no data collection. Everything is processed and stored locally in your browser.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Welcome Screen (no data) */}
          {!data && !showSettings && (
            <div className="text-center py-16">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${darkMode ? 'bg-zinc-800 text-sky-400' : 'bg-zinc-200 text-sky-600'}`}>
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
                  {/* Sports car silhouette */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 14.5h1.5M20.5 14.5H22M5.5 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 14.5h16M7 14.5V13c0-.5.5-1.5 1-2l2-2.5c.5-.5 1.5-1 2.5-1h3c1 0 1.8.3 2.2.7l1.8 1.8c.5.5 1 1.5 1 2.5v2M7 14.5c0-1-.5-2-1.5-2H4c-.5 0-1 .5-1 1v1.5" />
                </svg>
              </div>
              <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Welcome to Taycan Trip Analyzer</h2>
              <p className={`mb-6 max-w-md mx-auto text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Upload your Porsche Connect CSV exports to analyze your driving patterns.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => setShowUpload(true)} className="px-5 py-2.5 rounded-xl bg-sky-500 text-white font-bold"><span className="inline-flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>Upload Your Data</span></button>
                <button onClick={() => setUseSampleData(true)} className={`px-5 py-2.5 rounded-xl font-medium ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900'}`}><span className="inline-flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>Try Sample Data</span></button>
              </div>
              <div className={`mt-10 max-w-sm mx-auto p-3 rounded-xl border ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`}>
                <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}><span className="inline-flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg><strong className={darkMode ? 'text-white' : 'text-zinc-900'}>Privacy Protected</strong></span> — All data processed locally in your browser.</p>
              </div>
            </div>
          )}

          {/* Data Views */}
          {data && !showSettings && (
            <>
              {useSampleData && !appData && (
                <div className={`mb-5 p-3 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-500/20 border-amber-500/30'}`}>
                  <span className={`text-sm ${darkMode ? 'text-amber-200' : 'text-amber-700'}`}><span className="inline-flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>Viewing sample data</span></span>
                  <button onClick={() => setUseSampleData(false)} className={`text-xs font-medium ${darkMode ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'}`}>Hide</button>
                </div>
              )}

              {activeTab === 'overview' && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <StatCard darkMode={darkMode} label="Total Trips" value={data.summary.totalTrips} color="sky" />
                  <StatCard darkMode={darkMode} label="Total Distance" value={`${data.summary.totalDistance.toLocaleString()} km`} color="blue" />
                  <StatCard darkMode={darkMode} label="Energy Used" value={`${data.summary.totalEnergy.toLocaleString()} kWh`} color="emerald" />
                  <StatCard darkMode={darkMode} label="Avg Consumption" value={`${data.summary.avgConsumption} kWh/100km`} color="purple" />
                  <StatCard darkMode={darkMode} label="Charge Cycles" value={data.summary.totalChargeCycles} color="cyan" />
                  <StatCard darkMode={darkMode} label="Trips/Charge" value={data.summary.avgTripsPerCharge} color="pink" />
                  <StatCard darkMode={darkMode} label="Short Trips" value={`${data.summary.shortTripsPct}%`} color="orange" />
                  <StatCard darkMode={darkMode} label="Avg/Month" value={`${data.summary.avgKmPerMonth} km`} color="teal" />
                </div>

                {/* Time View Selector */}
                <div className="flex gap-2">
                  {['day', 'week', 'month'].map(v => (
                    <button
                      key={v}
                      onClick={() => setTimeView(v)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        timeView === v
                          ? 'bg-sky-500 text-white'
                          : darkMode
                            ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                            : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 hover:text-zinc-900'
                      }`}
                    >
                      By {v}
                    </button>
                  ))}
                </div>

                {/* Distance & Trips - Full Width */}
                <ChartCard darkMode={darkMode} title={`Distance & Trips (by ${timeView})`}>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={timeViewData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                      <XAxis dataKey="label" stroke={chartColors.axis} fontSize={10} interval={timeView === 'day' ? 6 : 0} />
                      <YAxis yAxisId="left" stroke={chartColors.axis} fontSize={11} />
                      <YAxis yAxisId="right" orientation="right" stroke={chartColors.axis} fontSize={11} />
                      <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="distance" name="Distance (km)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="trips" name="Trips" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 3 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </ChartCard>

                {/* Trip Type Distribution - Second Row */}
                <ChartCard darkMode={darkMode} title="Trip Type Distribution">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart margin={{ top: 30, right: 30, bottom: 10, left: 30 }}>
                      <Pie data={data.tripTypes} dataKey="count" nameKey="type" cx="50%" cy="45%" outerRadius={90} label={({ count }) => count > 0 ? count : ''}>
                        {data.tripTypes.map((entry, i) => <Cell key={`cell-${i}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            )}

            {activeTab === 'patterns' && (
              <div className="space-y-5">
                {/* Time View Selector */}
                <div className="flex gap-2">
                  {['day', 'week', 'month'].map(v => (
                    <button
                      key={v}
                      onClick={() => setTimeView(v)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        timeView === v
                          ? 'bg-sky-500 text-white'
                          : darkMode
                            ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                            : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 hover:text-zinc-900'
                      }`}
                    >
                      By {v}
                    </button>
                  ))}
                </div>

                {/* Distance Over Time */}
                <ChartCard darkMode={darkMode} title={`Distance Over Time (by ${timeView})`}>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={timeViewData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                      <XAxis dataKey="label" stroke={chartColors.axis} fontSize={10} interval={timeView === 'day' ? 6 : 0} />
                      <YAxis stroke={chartColors.axis} fontSize={11} />
                      <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
                      <Area type="monotone" dataKey="distance" name="Distance (km)" stroke="#f59e0b" fill="#f59e0b44" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartCard>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <ChartCard darkMode={darkMode} title="Trips by Hour">
                    <ResponsiveContainer width="100%" height={260}>
                      <AreaChart data={data.hourData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                        <XAxis dataKey="hour" stroke={chartColors.axis} fontSize={11} />
                        <YAxis stroke={chartColors.axis} fontSize={11} />
                        <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
                        <Area type="monotone" dataKey="trips" stroke="#3b82f6" fill="#3b82f644" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartCard>
                  <ChartCard darkMode={darkMode} title="Activity by Day of Week">
                    <ResponsiveContainer width="100%" height={260}>
                      <ComposedChart data={data.dayData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                        <XAxis dataKey="day" stroke={chartColors.axis} fontSize={11} />
                        <YAxis yAxisId="left" stroke={chartColors.axis} fontSize={11} />
                        <YAxis yAxisId="right" orientation="right" stroke={chartColors.axis} fontSize={11} />
                        <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="trips" name="Trips" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        <Line yAxisId="right" type="monotone" dataKey="avgDist" name="Avg km" stroke="#f59e0b" strokeWidth={2} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>

                {/* Day of Week Average Distance */}
                <ChartCard darkMode={darkMode} title="Average Trip Distance by Day of Week">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data.dayData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                      <XAxis dataKey="day" stroke={chartColors.axis} fontSize={11} />
                      <YAxis stroke={chartColors.axis} fontSize={11} />
                      <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
                      <Bar dataKey="avgDist" name="Avg km/trip" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                        {data.dayData.map((entry, i) => (
                          <Cell key={`cell-${i}`} fill={entry.day === 'Sat' ? '#f59e0b' : '#3b82f6'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <p className={`text-sm mt-2 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    Longest average trips on weekends - more efficient for longer journeys!
                  </p>
                </ChartCard>
              </div>
            )}

            {activeTab === 'efficiency' && (
              <div className="space-y-5">
                {/* Best/Worst Trip Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
                    <p className={`text-3xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {data.bestTrip?.consumption || '—'}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Best kWh/100km</p>
                    {data.bestTrip && (
                      <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                        {data.bestTrip.date} • {data.bestTrip.distance}km @ {data.bestTrip.speed}km/h
                      </p>
                    )}
                  </div>
                  <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-zinc-800/50 border border-zinc-700' : 'bg-zinc-100 border border-zinc-200'}`}>
                    <p className={`text-3xl font-bold ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                      {data.summary.avgConsumption}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Average kWh/100km</p>
                  </div>
                  <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
                    <p className={`text-3xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                      {data.worstTrip?.consumption || '—'}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Worst kWh/100km</p>
                    {data.worstTrip && (
                      <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                        {data.worstTrip.date} • {data.worstTrip.distance}km @ {data.worstTrip.speed}km/h
                      </p>
                    )}
                  </div>
                </div>

                {/* Time View Selector */}
                <div className="flex gap-2">
                  {['day', 'week', 'month'].map(v => (
                    <button
                      key={v}
                      onClick={() => setTimeView(v)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        timeView === v
                          ? 'bg-sky-500 text-white'
                          : darkMode
                            ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                            : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 hover:text-zinc-900'
                      }`}
                    >
                      By {v}
                    </button>
                  ))}
                </div>

                {/* Consumption Trend - Full Width */}
                <ChartCard darkMode={darkMode} title="Consumption Trend">
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={timeViewData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                      <XAxis dataKey="label" stroke={chartColors.axis} fontSize={10} interval={timeView === 'day' ? 6 : 0} />
                      <YAxis stroke={chartColors.axis} fontSize={11} domain={[20, 35]} />
                      <Tooltip
                        contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }}
                        itemStyle={{ color: chartColors.tooltipText }}
                        labelStyle={{ color: chartColors.tooltipText }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="avgConsumption" name="kWh/100km" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 3 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </ChartCard>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Efficiency by Speed Range */}
                  <ChartCard darkMode={darkMode} title="Efficiency by Speed Range">
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={data.speedEfficiency}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                        <XAxis dataKey="range" stroke={chartColors.axis} fontSize={10} />
                        <YAxis stroke={chartColors.axis} fontSize={11} domain={[15, 35]} />
                        <Tooltip
                          contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }}
                          itemStyle={{ color: chartColors.tooltipText }}
                          labelStyle={{ color: chartColors.tooltipText }}
                          formatter={(value, name) => name === 'consumption' ? [`${value} kWh/100km`, 'Avg Consumption'] : [`${value} trips`, 'Trips']}
                        />
                        <Bar dataKey="consumption" name="consumption" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                    <p className={`text-sm mt-2 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                      Sweet spot: 40-80 km/h for best efficiency
                    </p>
                  </ChartCard>

                  {/* Seasonal Efficiency */}
                  {data.seasonalData && data.seasonalData.length > 0 && (
                    <ChartCard darkMode={darkMode} title="Seasonal Efficiency">
                      <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={data.seasonalData}>
                          <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                          <XAxis dataKey="season" stroke={chartColors.axis} fontSize={11} />
                          <YAxis stroke={chartColors.axis} fontSize={11} domain={[20, 32]} />
                          <Tooltip
                            contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }}
                            itemStyle={{ color: chartColors.tooltipText }}
                            labelStyle={{ color: chartColors.tooltipText }}
                            formatter={(value, name) => name === 'consumption' ? [`${value} kWh/100km`, 'Consumption'] : [`${value}`, name]}
                          />
                          <Bar dataKey="consumption" name="consumption" radius={[4, 4, 0, 0]}>
                            {data.seasonalData.map((entry, i) => (
                              <Cell key={`cell-${i}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartCard>
                  )}
                </div>

                {/* Trip Type Efficiency */}
                <ChartCard darkMode={darkMode} title="Efficiency by Trip Type">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data.tripTypes}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                      <XAxis dataKey="type" stroke={chartColors.axis} fontSize={9} />
                      <YAxis stroke={chartColors.axis} fontSize={11} domain={[20, 36]} />
                      <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
                      <Bar dataKey="consumption" name="kWh/100km" radius={[4, 4, 0, 0]}>
                        {data.tripTypes.map((entry, i) => <Cell key={`cell-${i}`} fill={entry.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            )}

            {activeTab === 'costs' && costs && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <StatCard darkMode={darkMode} label="Electric Cost" value={`€${costs.electricCost}`} subtitle={`€${costs.costPerKmElectric}/km`} color="emerald" />
                  <StatCard darkMode={darkMode} label="Petrol Equivalent" value={`€${costs.petrolCost}`} subtitle={`€${costs.costPerKmPetrol}/km`} color="red" />
                  <StatCard darkMode={darkMode} label="Total Savings" value={`€${costs.savings}`} subtitle="vs petrol" color="sky" />
                  <StatCard darkMode={darkMode} label="Savings Rate" value={`${costs.savingsRate}%`} subtitle="cheaper" color="blue" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <ChartCard darkMode={darkMode} title="Monthly Costs">
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={data.monthlyData.map(m => ({
                        ...m,
                        electricCost: Math.round(precise.mul(precise.mul(precise.div(m.distance, 100), m.consumption), electricityPrice)),
                        petrolCost: Math.round(precise.mul(precise.mul(precise.div(m.distance, 100), petrolConsumption), petrolPrice))
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                        <XAxis dataKey="month" stroke={chartColors.axis} fontSize={11} />
                        <YAxis stroke={chartColors.axis} fontSize={11} />
                        <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} formatter={(v) => `€${v}`} />
                        <Legend />
                        <Bar dataKey="electricCost" name="Electric (€)" fill="#22c55e" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="petrolCost" name="Petrol (€)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                  <ChartCard darkMode={darkMode} title="Cumulative Savings">
                    <ResponsiveContainer width="100%" height={260}>
                      <AreaChart data={data.monthlyData.reduce((acc, m, i) => {
                        const elec = precise.mul(precise.mul(precise.div(m.distance, 100), m.consumption), electricityPrice);
                        const pet = precise.mul(precise.mul(precise.div(m.distance, 100), petrolConsumption), petrolPrice);
                        const sav = precise.sub(pet, elec);
                        const prev = i > 0 ? acc[i - 1].cumRaw : 0;
                        const cumRaw = precise.add(prev, sav);
                        return [...acc, { ...m, cumulative: Math.round(cumRaw), cumRaw }];
                      }, [])}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                        <XAxis dataKey="month" stroke={chartColors.axis} fontSize={11} />
                        <YAxis stroke={chartColors.axis} fontSize={11} />
                        <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} formatter={(v) => `€${v}`} />
                        <Area type="monotone" dataKey="cumulative" name="Saved (€)" stroke="#f59e0b" fill="#f59e0b44" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>
              </div>
            )}

            {/* ENVIRONMENTAL TAB */}
            {activeTab === 'environmental' && environmental && (
              <div className="space-y-5">
                {/* Environmental Hero Card */}
                <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20' : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        {environmental.co2SavedKg} kg CO₂ Saved
                      </h2>
                      <p className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        That's equivalent to {environmental.treesEquivalent} trees absorbing CO₂ for a year!
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
                      <p className="text-xs text-zinc-500">Your Emissions</p>
                      <p className={`text-lg font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{environmental.co2Electric} kg</p>
                      <p className="text-xs text-zinc-500">{environmental.co2PerKmElectric} g/km</p>
                    </div>
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
                      <p className="text-xs text-zinc-500">Petrol Would Be</p>
                      <p className={`text-lg font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{environmental.co2Petrol} kg</p>
                      <p className="text-xs text-zinc-500">{environmental.co2PerKmPetrol} g/km</p>
                    </div>
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
                      <p className="text-xs text-zinc-500">Reduction</p>
                      <p className={`text-lg font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{environmental.reductionPct}%</p>
                      <p className="text-xs text-zinc-500">vs petrol</p>
                    </div>
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
                      <p className="text-xs text-zinc-500">Fuel Avoided</p>
                      <p className={`text-lg font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>{environmental.litersAvoided} L</p>
                      <p className="text-xs text-zinc-500">of petrol</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <StatCard darkMode={darkMode} label="CO₂ Saved" value={`${environmental.co2SavedKg} kg`} subtitle={`${environmental.co2SavedTons} tons`} color="emerald" />
                  <StatCard darkMode={darkMode} label="Trees Equivalent" value={environmental.treesEquivalent} subtitle="trees/year" color="teal" />
                  <StatCard darkMode={darkMode} label="Your Emissions" value={`${environmental.co2PerKmElectric} g/km`} subtitle="electric grid" color="blue" />
                  <StatCard darkMode={darkMode} label="Avoided" value={`${environmental.co2PerKmPetrol} g/km`} subtitle="if petrol" color="red" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <ChartCard darkMode={darkMode} title="Monthly CO₂ Comparison">
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={data.monthlyData.map(m => {
                        const energy = precise.mul(precise.div(m.distance, 100), m.consumption);
                        const co2Elec = precise.round(precise.div(precise.mul(energy, TAYCAN_SPECS.co2PerKwhPortugal), 1000), 1);
                        const liters = precise.mul(precise.div(m.distance, 100), petrolConsumption);
                        const co2Pet = precise.round(precise.div(precise.mul(liters, TAYCAN_SPECS.co2PerLiterPetrol), 1000), 1);
                        return { ...m, co2Electric: co2Elec, co2Petrol: co2Pet };
                      })}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                        <XAxis dataKey="month" stroke={chartColors.axis} fontSize={11} />
                        <YAxis stroke={chartColors.axis} fontSize={11} />
                        <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} formatter={(v) => `${v} kg`} />
                        <Legend />
                        <Bar dataKey="co2Electric" name="Your CO₂ (kg)" fill="#22c55e" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="co2Petrol" name="Petrol CO₂ (kg)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                  <ChartCard darkMode={darkMode} title="Cumulative CO₂ Savings">
                    <ResponsiveContainer width="100%" height={260}>
                      <AreaChart data={data.monthlyData.reduce((acc, m, i) => {
                        const energy = precise.mul(precise.div(m.distance, 100), m.consumption);
                        const co2Elec = precise.mul(energy, TAYCAN_SPECS.co2PerKwhPortugal);
                        const liters = precise.mul(precise.div(m.distance, 100), petrolConsumption);
                        const co2Pet = precise.mul(liters, TAYCAN_SPECS.co2PerLiterPetrol);
                        const saved = precise.sub(co2Pet, co2Elec);
                        const prev = i > 0 ? acc[i - 1].cumRaw : 0;
                        const cumRaw = precise.add(prev, saved);
                        return [...acc, { ...m, cumulative: Math.round(cumRaw / 1000), cumRaw }];
                      }, [])}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                        <XAxis dataKey="month" stroke={chartColors.axis} fontSize={11} />
                        <YAxis stroke={chartColors.axis} fontSize={11} />
                        <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} formatter={(v) => `${v} kg`} />
                        <Area type="monotone" dataKey="cumulative" name="CO₂ Saved (kg)" stroke="#22c55e" fill="#22c55e44" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>

                {/* Environmental Context */}
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                  <h3 className={`font-medium mb-3 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Understanding Your Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      <p className="mb-2"><strong className={darkMode ? 'text-emerald-400' : 'text-emerald-600'}>Grid emissions:</strong> Portugal's electricity grid produces ~164g CO₂/kWh, one of the cleaner grids in Europe thanks to renewables.</p>
                      <p><strong className={darkMode ? 'text-amber-400' : 'text-amber-600'}>Petrol baseline:</strong> We compare against a typical premium car consuming {petrolConsumption}L/100km, producing ~2.31kg CO₂ per liter burned.</p>
                    </div>
                    <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      <p className="mb-2"><strong className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Tree absorption:</strong> A mature tree absorbs about 21kg of CO₂ per year. Your savings equal {environmental.treesEquivalent} trees working for a full year!</p>
                      <p><strong className={darkMode ? 'text-teal-400' : 'text-teal-600'}>Real impact:</strong> By driving electric, you've prevented {environmental.litersAvoided}L of petrol from being burned.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BATTERY & RANGE TAB */}
            {activeTab === 'battery' && batteryAnalysis && (
              <div className="space-y-5">
                {/* Range Hero Card */}
                <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {batteryAnalysis.realWorldRange} km Real-World Range
                      </h2>
                      <p className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {batteryAnalysis.rangeEfficiency}% of WLTP rated {batteryAnalysis.officialRange} km
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
                      <p className="text-xs text-zinc-500">Energy/Trip</p>
                      <p className={`text-lg font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{batteryAnalysis.energyPerTrip} kWh</p>
                      <p className="text-xs text-zinc-500">{batteryAnalysis.batteryPerTrip}% of battery</p>
                    </div>
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
                      <p className="text-xs text-zinc-500">Trips/Full Charge</p>
                      <p className={`text-lg font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{batteryAnalysis.tripsPerFullCharge}</p>
                      <p className="text-xs text-zinc-500">theoretical max</p>
                    </div>
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
                      <p className="text-xs text-zinc-500">Km/Charge Cycle</p>
                      <p className={`text-lg font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{batteryAnalysis.distancePerCharge}</p>
                      <p className="text-xs text-zinc-500">actual average</p>
                    </div>
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
                      <p className="text-xs text-zinc-500">vs WLTP</p>
                      <p className={`text-lg font-bold ${batteryAnalysis.consumptionVsOfficial > 0 ? (darkMode ? 'text-amber-400' : 'text-amber-600') : (darkMode ? 'text-emerald-400' : 'text-emerald-600')}`}>
                        {batteryAnalysis.consumptionVsOfficial > 0 ? '+' : ''}{batteryAnalysis.consumptionVsOfficial}%
                      </p>
                      <p className="text-xs text-zinc-500">consumption</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <StatCard darkMode={darkMode} label="Best Month" value={`${batteryAnalysis.bestMonth} kWh`} subtitle="lowest consumption" color="emerald" />
                  <StatCard darkMode={darkMode} label="Worst Month" value={`${batteryAnalysis.worstMonth} kWh`} subtitle="highest consumption" color="red" />
                  <StatCard darkMode={darkMode} label="Seasonal Swing" value={`+${batteryAnalysis.seasonalVariation}%`} subtitle="winter vs summer" color="sky" />
                  <StatCard darkMode={darkMode} label="Battery Cycles" value={chargingOptimization?.batteryFullCycles || 0} subtitle="equivalent full" color="purple" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <ChartCard darkMode={darkMode} title="Monthly Consumption Trend">
                    <ResponsiveContainer width="100%" height={260}>
                      <ComposedChart data={data.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                        <XAxis dataKey="month" stroke={chartColors.axis} fontSize={11} />
                        <YAxis stroke={chartColors.axis} fontSize={11} domain={[20, 32]} />
                        <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
                        <Legend />
                        <Area type="monotone" dataKey="consumption" name="kWh/100km" stroke="#8b5cf6" fill="#8b5cf644" strokeWidth={2} />
                        <Line type="monotone" dataKey={() => TAYCAN_SPECS.officialConsumption} name="WLTP" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ChartCard>

                  {benchmarks && (
                    <ChartCard darkMode={darkMode} title="EV Comparison">
                      <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={benchmarks.competitors} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                          <XAxis type="number" stroke={chartColors.axis} fontSize={11} domain={[15, 30]} />
                          <YAxis dataKey="name" type="category" stroke={chartColors.axis} fontSize={10} width={80} />
                          <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} formatter={(v) => `${v} kWh/100km`} />
                          <Bar dataKey="consumption" name="Consumption" radius={[0, 4, 4, 0]}>
                            {benchmarks.competitors.map((entry, i) => (
                              <Cell key={`cell-${i}`} fill={i === 0 ? '#f59e0b' : '#3b82f644'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartCard>
                  )}
                </div>

                {/* Charging Optimization Section */}
                {chargingOptimization && (
                  <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <h3 className={`font-medium mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Charging Analysis</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                        <p className="text-xs text-zinc-500">Charges/Week</p>
                        <p className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{chargingOptimization.chargesPerWeek}</p>
                      </div>
                      <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                        <p className="text-xs text-zinc-500">Energy/Charge</p>
                        <p className={`text-xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{chargingOptimization.energyPerCharge} kWh</p>
                      </div>
                      <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                        <p className="text-xs text-zinc-500">Avg SOC Used</p>
                        <p className={`text-xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{chargingOptimization.socUsedPerCycle}%</p>
                      </div>
                      <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                        <p className="text-xs text-zinc-500">Charging Losses</p>
                        <p className={`text-xl font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>~{chargingOptimization.chargingLosses} kWh</p>
                      </div>
                    </div>
                    <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'} border`}>
                      <p className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        <span className="inline-flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg><strong>Off-peak charging tip:</strong></span> If you charge during off-peak hours (typically 30% cheaper), you could save an additional <strong>€{chargingOptimization.potentialOffPeakSavings}</strong> on your electricity bill.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* INSIGHTS TAB */}
            {activeTab === 'insights' && drivingInsights && predictions && benchmarks && (
              <div className="space-y-5">
                {/* Driving Profile Banner */}
                <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gradient-to-br from-sky-500/10 to-blue-500/10 border-sky-500/20' : 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200'}`}>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-sky-500/20 flex items-center justify-center ${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                        </svg>
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>
                          {benchmarks.drivingProfile}
                        </h2>
                        <p className={`flex items-center gap-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          Efficiency Rating:
                          <span className="inline-flex">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < benchmarks.efficiencyRating ? 'text-sky-500' : (darkMode ? 'text-zinc-600' : 'text-zinc-300')}`} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full ${benchmarks.vsAvgTaycan <= 0 ? (darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700') : (darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700')}`}>
                      {benchmarks.vsAvgTaycan <= 0 ? `${Math.abs(benchmarks.vsAvgTaycan)}% better` : `${benchmarks.vsAvgTaycan}% higher`} than avg Taycan
                    </div>
                  </div>
                </div>

                {/* Dynamic Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drivingInsights.insights.map((insight, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${
                      insight.severity === 'success' ? (darkMode ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200') :
                      insight.severity === 'warning' ? (darkMode ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-50 border-amber-200') :
                      (darkMode ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-200')
                    }`}>
                      <div className="flex items-start gap-3">
                        <span className={`flex-shrink-0 ${
                          insight.severity === 'success' ? (darkMode ? 'text-emerald-400' : 'text-emerald-600') :
                          insight.severity === 'warning' ? (darkMode ? 'text-amber-400' : 'text-amber-600') :
                          (darkMode ? 'text-blue-400' : 'text-blue-600')
                        }`}>
                          {icons[insight.iconName] && React.cloneElement(icons[insight.iconName], { className: 'w-6 h-6' })}
                        </span>
                        <div>
                          <h4 className={`font-medium ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{insight.title}</h4>
                          <p className={`text-sm mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{insight.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Predictions Section */}
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                  <h3 className={`font-medium mb-4 flex items-center gap-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg> Projections & Forecasts
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                      <p className="text-xs text-zinc-500">Annual Distance</p>
                      <p className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{predictions.annualDistance.toLocaleString()} km</p>
                      <p className="text-xs text-zinc-500">projected</p>
                    </div>
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                      <p className="text-xs text-zinc-500">Annual Trips</p>
                      <p className={`text-xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{predictions.annualTrips}</p>
                      <p className="text-xs text-zinc-500">projected</p>
                    </div>
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                      <p className="text-xs text-zinc-500">Annual Energy</p>
                      <p className={`text-xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{predictions.annualEnergy} kWh</p>
                      <p className="text-xs text-zinc-500">projected</p>
                    </div>
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                      <p className="text-xs text-zinc-500">Annual Savings</p>
                      <p className={`text-xl font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>€{predictions.annualSavings}</p>
                      <p className="text-xs text-zinc-500">vs petrol</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/20' : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'}`}>
                      <p className={`text-sm font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>5-Year Savings</p>
                      <p className={`text-3xl font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>€{predictions.fiveYearSavings.toLocaleString()}</p>
                      <p className="text-xs text-zinc-500">{predictions.fiveYearDistance.toLocaleString()} km over 5 years</p>
                    </div>
                    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'}`}>
                      <p className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Next Month Forecast</p>
                      <p className={`text-3xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>{predictions.nextMonthDistance} km</p>
                      <p className="text-xs text-zinc-500">~{predictions.nextMonthTrips} trips expected</p>
                    </div>
                    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-gradient-to-br from-sky-500/5 to-blue-500/5 border-sky-500/20' : 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200'}`}>
                      <p className={`text-sm font-medium ${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>Seasonal Prediction</p>
                      <p className={`text-lg font-bold ${darkMode ? 'text-sky-300' : 'text-sky-700'}`}>
                        Summer: {predictions.avgSummerConsumption} kWh
                      </p>
                      <p className={`text-lg font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                        Winter: {predictions.avgWinterConsumption} kWh
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                  <h3 className={`font-medium mb-4 flex items-center gap-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg> Personalized Recommendations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                      <h4 className={`font-medium mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}><span className="inline-flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" /></svg>Optimize Charging</span></h4>
                      <ul className={`text-sm space-y-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        <li>• Charge to 80% for daily use, 100% only for long trips</li>
                        <li>• Pre-condition while plugged in to save battery</li>
                        <li>• Use off-peak hours to save ~€{chargingOptimization?.potentialOffPeakSavings || 0}</li>
                      </ul>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                      <h4 className={`font-medium mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}><span className="inline-flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2 14.5h1.5M20.5 14.5H22M5.5 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 14.5h16M7 14.5V13c0-.5.5-1.5 1-2l2-2.5c.5-.5 1.5-1 2.5-1h3c1 0 1.8.3 2.2.7l1.8 1.8c.5.5 1 1.5 1 2.5v2M7 14.5c0-1-.5-2-1.5-2H4c-.5 0-1 .5-1 1v1.5" /></svg>Improve Efficiency</span></h4>
                      <ul className={`text-sm space-y-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        <li>• Combine short trips when possible</li>
                        <li>• Optimal speed: 50-70 km/h for best efficiency</li>
                        <li>• Use eco mode in city, normal on highway</li>
                      </ul>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                      <h4 className={`font-medium mb-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}><span className="inline-flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l-3 3m3-3l3 3m-3 15l-3-3m3 3l3-3M3 12h18M3 12l3-3m-3 3l3 3m15-3l-3-3m3 3l-3 3" /></svg>Winter Tips</span></h4>
                      <ul className={`text-sm space-y-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        <li>• Use seat/steering heating over cabin heat</li>
                        <li>• Park in garage when possible</li>
                        <li>• Schedule departure to pre-heat while charging</li>
                      </ul>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                      <h4 className={`font-medium mb-2 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}><span className="inline-flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>Track Progress</span></h4>
                      <ul className={`text-sm space-y-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        <li>• Target: {Math.round(data.summary.avgConsumption * 0.95)} kWh/100km (5% improvement)</li>
                        <li>• Review monthly to spot trends</li>
                        <li>• Compare seasons for context</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      </div>

      <footer className={`border-t mt-8 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
          <p className={`text-xs text-center ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Taycan Trip Analyzer • Local-first • Privacy-first • No data leaves your device</p>
          <p className={`text-xs text-center ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
            Developed by <a href="https://github.com/jpleite/porsche_ev_insights" target="_blank" rel="noopener noreferrer" className={`underline hover:${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>jpleite</a> • 2026 v1.0 Beta
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ label, value, subtitle, color, darkMode }) {
  const darkColors = {
    sky: 'border-sky-500/30 bg-sky-500/5',
    blue: 'border-blue-500/30 bg-blue-500/5',
    emerald: 'border-emerald-500/30 bg-emerald-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
    cyan: 'border-cyan-500/30 bg-cyan-500/5',
    pink: 'border-pink-500/30 bg-pink-500/5',
    orange: 'border-orange-500/30 bg-orange-500/5',
    teal: 'border-teal-500/30 bg-teal-500/5',
    red: 'border-red-500/30 bg-red-500/5'
  };
  const lightColors = {
    sky: 'border-sky-500/40 bg-sky-500/10',
    blue: 'border-blue-500/40 bg-blue-500/10',
    emerald: 'border-emerald-500/40 bg-emerald-500/10',
    purple: 'border-purple-500/40 bg-purple-500/10',
    cyan: 'border-cyan-500/40 bg-cyan-500/10',
    pink: 'border-pink-500/40 bg-pink-500/10',
    orange: 'border-orange-500/40 bg-orange-500/10',
    teal: 'border-teal-500/40 bg-teal-500/10',
    red: 'border-red-500/40 bg-red-500/10'
  };
  const textColors = {
    sky: darkMode ? 'text-sky-400' : 'text-sky-600',
    blue: darkMode ? 'text-blue-400' : 'text-blue-600',
    emerald: darkMode ? 'text-emerald-400' : 'text-emerald-600',
    purple: darkMode ? 'text-purple-400' : 'text-purple-600',
    cyan: darkMode ? 'text-cyan-400' : 'text-cyan-600',
    pink: darkMode ? 'text-pink-400' : 'text-pink-600',
    orange: darkMode ? 'text-orange-400' : 'text-orange-600',
    teal: darkMode ? 'text-teal-400' : 'text-teal-600',
    red: darkMode ? 'text-red-400' : 'text-red-600'
  };
  const borderBg = darkMode ? (darkColors[color] || darkColors.sky) : (lightColors[color] || lightColors.sky);
  const textColor = textColors[color] || textColors.sky;
  return (
    <div className={`p-3 rounded-xl border ${borderBg}`}>
      <p className={`text-xs mb-0.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{label}</p>
      <p className={`text-lg font-bold ${textColor}`}>{value}</p>
      {subtitle && <p className={`text-xs ${darkMode ? 'text-zinc-600' : 'text-zinc-500'}`}>{subtitle}</p>}
    </div>
  );
}

function ChartCard({ title, children, darkMode }) {
  return (
    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
      <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{title}</h3>
      {children}
    </div>
  );
}
