import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';

// Constants
import { UNIT_SYSTEMS, CURRENCIES, FUEL_CONSUMPTION_FORMATS, ELECTRIC_CONSUMPTION_FORMATS, MI_TO_KM, L_TO_UK_GAL, L_TO_US_GAL } from './constants/units';
import { SAMPLE_DATA } from './constants/sampleData';
import { TAYCAN_SPECS } from './constants/taycanSpecs';
import { STORAGE_KEYS } from './constants/storageKeys';

// Utilities
import { precise } from './utils/precise';
import { unitConvert } from './utils/unitConvert';
import { safeStorage } from './utils/storage';
import { downloadFile } from './utils/download';
import { parseCSV } from './utils/csvParser';

// Services
import { processUploadedData, extractVehicleModel } from './services/dataProcessor';

// Components
import { StatCard, ChartCard, TimeViewSelector } from './components/common';
import { icons, Icon } from './components/icons/Icons';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { tabs } from './constants/tabs';
import { MobileSidebar } from './components/layout/MobileSidebar';
import { Footer } from './components/layout/Footer';
import { OverviewTab } from './components/tabs/OverviewTab';
import { PatternsTab } from './components/tabs/PatternsTab';
import { EfficiencyTab } from './components/tabs/EfficiencyTab';
import { CostsTab } from './components/tabs/CostsTab';
import { EnvironmentalTab } from './components/tabs/EnvironmentalTab';
import { BatteryTab } from './components/tabs/BatteryTab';
import { InsightsTab } from './components/tabs/InsightsTab';
import { UploadModal } from './components/modals/UploadModal';
import { ConfirmModal } from './components/modals/ConfirmModal';
import { WelcomeScreen, SettingsPage } from './pages';

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
  const [batteryCapacity, setBatteryCapacity] = useState(83.7);
  const [unitSystem, setUnitSystem] = useState('metric');
  const [currency, setCurrency] = useState('EUR');
  const [fuelConsFormat, setFuelConsFormat] = useState('L/100km');
  const [elecConsFormat, setElecConsFormat] = useState('kWh/100km');

  const [modalConfig, setModalConfig] = useState(null);
  const [timeView, setTimeView] = useState('month');
  const [menuOpen, setMenuOpen] = useState(false);
  const [vehicleModel, setVehicleModel] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = safeStorage.get('taycan_theme');
    return saved !== null ? saved : true;
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    safeStorage.set('taycan_theme', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const savedData = safeStorage.get(STORAGE_KEYS.DATA);
    const savedSettings = safeStorage.get(STORAGE_KEYS.SETTINGS);
    const savedModel = safeStorage.get(STORAGE_KEYS.VEHICLE_MODEL);
    if (savedData) setAppData(savedData);
    if (savedModel) setVehicleModel(savedModel);
    if (savedSettings) {
      setElectricityPrice(savedSettings.electricityPrice ?? 0.25);
      setPetrolPrice(savedSettings.petrolPrice ?? 1.80);
      setPetrolConsumption(savedSettings.petrolConsumption ?? 8.0);
      setBatteryCapacity(savedSettings.batteryCapacity ?? 83.7);
      setUnitSystem(savedSettings.unitSystem ?? 'metric');
      setCurrency(savedSettings.currency ?? 'EUR');
      setFuelConsFormat(savedSettings.fuelConsFormat ?? 'L/100km');
      setElecConsFormat(savedSettings.elecConsFormat ?? 'kWh/100km');
    }
  }, []);

  useEffect(() => {
    safeStorage.set(STORAGE_KEYS.SETTINGS, { electricityPrice, petrolPrice, petrolConsumption, batteryCapacity, unitSystem, currency, fuelConsFormat, elecConsFormat });
  }, [electricityPrice, petrolPrice, petrolConsumption, batteryCapacity, unitSystem, currency, fuelConsFormat, elecConsFormat]);

  // Reset consumption formats and currency when unit system changes
  useEffect(() => {
    if (unitSystem === 'metric') {
      setCurrency('EUR');
      if (!['L/100km', 'km/L'].includes(fuelConsFormat)) {
        setFuelConsFormat('L/100km');
      }
      if (!['kWh/100km', 'km/kWh'].includes(elecConsFormat)) {
        setElecConsFormat('kWh/100km');
      }
    } else if (unitSystem === 'imperial_uk') {
      setCurrency('GBP');
      setFuelConsFormat('mpg');
      if (!['mi/kWh', 'kWh/mi', 'kWh/100mi'].includes(elecConsFormat)) {
        setElecConsFormat('mi/kWh');
      }
    } else if (unitSystem === 'imperial_us') {
      setCurrency('USD');
      setFuelConsFormat('mpg');
      if (!['mi/kWh', 'kWh/mi', 'kWh/100mi'].includes(elecConsFormat)) {
        setElecConsFormat('mi/kWh');
      }
    }
  }, [unitSystem]);

  const data = useMemo(() => appData || (useSampleData ? SAMPLE_DATA : null), [appData, useSampleData]);

  // ========== UNIT FORMATTING HELPERS ==========
  const units = useMemo(() => {
    const isImperial = unitSystem.startsWith('imperial');
    const isUK = unitSystem === 'imperial_uk';
    const sys = UNIT_SYSTEMS[unitSystem];
    const curr = CURRENCIES[currency];

    // Electric consumption conversion based on selected format (from kWh/100km)
    const convertElecCons = (kwh100km) => {
      if (kwh100km <= 0) return 0;
      switch (elecConsFormat) {
        case 'kWh/100km': return kwh100km;
        case 'km/kWh': return unitConvert.kwh100kmToKmKwh(kwh100km);
        case 'mi/kWh': return unitConvert.kwh100kmToMiKwh(kwh100km);
        case 'kWh/mi': return unitConvert.kwh100kmToKwhMi(kwh100km);
        case 'kWh/100mi': return unitConvert.kwh100kmToKwh100mi(kwh100km);
        default: return kwh100km;
      }
    };

    // Fuel consumption conversion based on selected format (from L/100km)
    const convertFuelCons = (l100km) => {
      if (l100km <= 0) return 0;
      switch (fuelConsFormat) {
        case 'L/100km': return l100km;
        case 'km/L': return unitConvert.l100kmToKmL(l100km);
        case 'mpg': return isUK ? unitConvert.l100kmToMpgUk(l100km) : unitConvert.l100kmToMpgUs(l100km);
        default: return l100km;
      }
    };

    return {
      dist: (km, decimals = 0) => {
        const val = isImperial ? unitConvert.kmToMi(km) : km;
        return { value: precise.round(val, decimals), unit: sys.distance, formatted: `${precise.round(val, decimals).toLocaleString()} ${sys.distance}` };
      },
      speed: (kmh, decimals = 0) => {
        const val = isImperial ? unitConvert.kmhToMph(kmh) : kmh;
        return { value: precise.round(val, decimals), unit: sys.speed, formatted: `${precise.round(val, decimals)} ${sys.speed}` };
      },
      elecCons: (kwh100km, decimals = 1) => {
        const val = convertElecCons(kwh100km);
        return { value: precise.round(val, decimals), unit: elecConsFormat, formatted: `${precise.round(val, decimals)} ${elecConsFormat}` };
      },
      fuelCons: (l100km, decimals = 1) => {
        const val = convertFuelCons(l100km);
        return { value: precise.round(val, decimals), unit: fuelConsFormat, formatted: `${precise.round(val, decimals)} ${fuelConsFormat}` };
      },
      vol: (liters, decimals = 1) => {
        const val = isImperial ? (isUK ? unitConvert.lToUkGal(liters) : unitConvert.lToUsGal(liters)) : liters;
        return { value: precise.round(val, decimals), unit: sys.volume, formatted: `${precise.round(val, decimals)} ${sys.volume}` };
      },
      money: (amount, decimals = 2) => {
        const val = precise.round(amount, decimals);
        return curr.position === 'before' ? `${curr.symbol}${val}` : `${val} ${curr.symbol}`;
      },
      distUnit: sys.distance,
      speedUnit: sys.speed,
      elecConsUnit: elecConsFormat,
      fuelConsUnit: fuelConsFormat,
      volUnit: sys.volume,
      currSymbol: curr.symbol
    };
  }, [unitSystem, currency, elecConsFormat, fuelConsFormat]);

  // Personalized vehicle name for UI display
  const vehicleDisplayName = useMemo(() => {
    const model = vehicleModel || 'Porsche';
    const baseModel = model.split(' ')[0];
    return {
      full: `Your ${model}`,
      short: `Your ${baseModel}`,
      modelFull: model,
      modelShort: baseModel,
      avgLabel: `${baseModel} Avg`
    };
  }, [vehicleModel]);

  // Trip type labels with converted distances
  const tripTypeLabels = useMemo(() => {
    const isImperial = unitSystem.startsWith('imperial');
    const distUnit = UNIT_SYSTEMS[unitSystem].distance;

    if (isImperial) {
      return {
        'Micro (<5km)': `Micro (<3${distUnit})`,
        'Short (5-10km)': `Short (3-6${distUnit})`,
        'Medium (10-20km)': `Medium (6-12${distUnit})`,
        'Long (20-50km)': `Long (12-31${distUnit})`,
        'Very Long (>50km)': `Very Long (>31${distUnit})`
      };
    }
    return {
      'Micro (<5km)': `Micro (<5${distUnit})`,
      'Short (5-10km)': `Short (5-10${distUnit})`,
      'Medium (10-20km)': `Medium (10-20${distUnit})`,
      'Long (20-50km)': `Long (20-50${distUnit})`,
      'Very Long (>50km)': `Very Long (>50${distUnit})`
    };
  }, [unitSystem]);

  // Speed range labels with conversions
  const speedRangeLabels = useMemo(() => {
    const isImperial = unitSystem.startsWith('imperial');
    const speedUnit = UNIT_SYSTEMS[unitSystem].speed;

    if (isImperial) {
      return {
        '0-20 km/h': `0-12 ${speedUnit}`,
        '20-40 km/h': `12-25 ${speedUnit}`,
        '40-60 km/h': `25-37 ${speedUnit}`,
        '60-80 km/h': `37-50 ${speedUnit}`,
        '80+ km/h': `50+ ${speedUnit}`
      };
    }
    return {
      '0-20 km/h': `0-20 ${speedUnit}`,
      '20-40 km/h': `20-40 ${speedUnit}`,
      '40-60 km/h': `40-60 ${speedUnit}`,
      '60-80 km/h': `60-80 ${speedUnit}`,
      '80+ km/h': `80+ ${speedUnit}`
    };
  }, [unitSystem]);

  // Chart domain helper based on electric consumption format
  const elecConsDomain = useMemo(() => {
    switch (elecConsFormat) {
      case 'kWh/100km': return [15, 40];
      case 'km/kWh': return [2, 7];
      case 'mi/kWh': return [1.5, 5];
      case 'kWh/mi': return [0.2, 0.8];
      case 'kWh/100mi': return [25, 65];
      default: return [15, 40];
    }
  }, [elecConsFormat]);

  // Converted trip types data for charts
  const convertedTripTypes = useMemo(() => {
    if (!data?.tripTypes) return [];
    return data.tripTypes.map(t => ({
      ...t,
      type: tripTypeLabels[t.type] || t.type,
      consumption: units.elecCons(t.consumption).value
    }));
  }, [data, tripTypeLabels, units]);

  // Converted speed efficiency data for charts
  const convertedSpeedEfficiency = useMemo(() => {
    if (!data?.speedEfficiency) return [];
    return data.speedEfficiency.map(s => ({
      ...s,
      range: speedRangeLabels[s.range] || s.range,
      consumption: units.elecCons(s.consumption).value
    }));
  }, [data, speedRangeLabels, units]);

  // Converted day data for charts
  const convertedDayData = useMemo(() => {
    if (!data?.dayData) return [];
    return data.dayData.map(d => ({
      ...d,
      distance: units.dist(d.distance).value,
      avgDist: units.dist(d.avgDist).value,
      consumption: units.elecCons(d.consumption).value
    }));
  }, [data, units]);

  // Time-based aggregated data based on timeView selection
  const timeViewData = useMemo(() => {
    if (!data) return [];

    const transformData = (items) => items.map(item => ({
      ...item,
      distance: units.dist(item.distance).value,
      avgConsumption: units.elecCons(item.avgConsumption || item.consumption).value,
      avgDist: item.avgDist ? units.dist(item.avgDist).value : undefined
    }));

    if (timeView === 'day') return transformData(data.dailyData || []);
    if (timeView === 'week') return transformData(data.weeklyData || []);
    return (data.monthlyData || []).map(m => ({
      period: m.month,
      label: m.month,
      trips: m.trips,
      distance: units.dist(m.distance).value,
      avgConsumption: units.elecCons(m.consumption).value,
      energy: precise.div(precise.mul(m.distance, m.consumption), 100)
    }));
  }, [data, timeView, units]);

  const costs = useMemo(() => {
    if (!data) return null;
    const isImperial = unitSystem.startsWith('imperial');
    const isUK = unitSystem === 'imperial_uk';

    // Convert petrol consumption to L/100km for internal calculations
    let petrolConsL100km;
    if (fuelConsFormat === 'mpg') {
      petrolConsL100km = isUK
        ? unitConvert.mpgUkToL100km(petrolConsumption)
        : unitConvert.mpgUsToL100km(petrolConsumption);
    } else if (fuelConsFormat === 'km/L') {
      petrolConsL100km = unitConvert.kmLToL100km(petrolConsumption);
    } else {
      petrolConsL100km = petrolConsumption; // Already L/100km
    }

    // Convert petrol price to $/L for internal calculations
    let petrolPricePerL;
    if (isImperial) {
      // Price is per gallon, convert to per liter
      petrolPricePerL = isUK
        ? precise.mul(petrolPrice, L_TO_UK_GAL)
        : precise.mul(petrolPrice, L_TO_US_GAL);
    } else {
      petrolPricePerL = petrolPrice; // Already per liter
    }

    const electricCostRaw = precise.mul(data.summary.totalEnergy, electricityPrice);
    const petrolCostRaw = precise.mul(precise.mul(precise.div(data.summary.totalDistance, 100), petrolConsL100km), petrolPricePerL);
    const savingsRaw = precise.sub(petrolCostRaw, electricCostRaw);
    const costPerKmElectric = precise.mul(precise.div(data.summary.avgConsumption, 100), electricityPrice);
    const costPerKmPetrol = precise.mul(precise.div(petrolConsL100km, 100), petrolPricePerL);
    const costPerDistElectric = isImperial ? precise.mul(costPerKmElectric, MI_TO_KM) : costPerKmElectric;
    const costPerDistPetrol = isImperial ? precise.mul(costPerKmPetrol, MI_TO_KM) : costPerKmPetrol;
    return {
      electricCost: precise.round(electricCostRaw, 2),
      petrolCost: precise.round(petrolCostRaw, 2),
      savings: precise.round(savingsRaw, 2),
      costPerDistElectric: precise.round(costPerDistElectric, 3),
      costPerDistPetrol: precise.round(costPerDistPetrol, 3),
      savingsRate: petrolCostRaw > 0 ? Math.round((1 - electricCostRaw / petrolCostRaw) * 100) : 0
    };
  }, [data, electricityPrice, petrolPrice, petrolConsumption, unitSystem, fuelConsFormat]);

  // ========== ENVIRONMENTAL IMPACT CALCULATIONS ==========
  const environmental = useMemo(() => {
    if (!data) return null;
    const isUK = unitSystem === 'imperial_uk';

    // Convert petrol consumption to L/100km for internal calculations
    let petrolConsL100km;
    if (fuelConsFormat === 'mpg') {
      petrolConsL100km = isUK
        ? unitConvert.mpgUkToL100km(petrolConsumption)
        : unitConvert.mpgUsToL100km(petrolConsumption);
    } else if (fuelConsFormat === 'km/L') {
      petrolConsL100km = unitConvert.kmLToL100km(petrolConsumption);
    } else {
      petrolConsL100km = petrolConsumption; // Already L/100km
    }

    const co2Electric = precise.mul(data.summary.totalEnergy, TAYCAN_SPECS.co2PerKwhPortugal);
    const litersUsed = precise.mul(precise.div(data.summary.totalDistance, 100), petrolConsL100km);
    const co2Petrol = precise.mul(litersUsed, TAYCAN_SPECS.co2PerLiterPetrol);
    const co2Saved = precise.sub(co2Petrol, co2Electric);
    const co2SavedKg = precise.div(co2Saved, 1000);
    const co2SavedTons = precise.div(co2SavedKg, 1000);
    const treesEquivalent = precise.div(co2Saved, TAYCAN_SPECS.treeCo2PerYear);
    const co2PerKmElectric = data.summary.totalDistance > 0 ? precise.div(co2Electric, data.summary.totalDistance) : 0;
    const co2PerKmPetrol = data.summary.totalDistance > 0 ? precise.div(co2Petrol, data.summary.totalDistance) : 0;
    const reductionPct = co2Petrol > 0 ? Math.round((1 - co2Electric / co2Petrol) * 100) : 0;

    return {
      co2Electric: precise.round(precise.div(co2Electric, 1000), 1),
      co2Petrol: precise.round(precise.div(co2Petrol, 1000), 1),
      co2SavedKg: precise.round(co2SavedKg, 1),
      co2SavedTons: precise.round(co2SavedTons, 2),
      treesEquivalent: precise.round(treesEquivalent, 1),
      co2PerKmElectric: precise.round(co2PerKmElectric, 1),
      co2PerKmPetrol: precise.round(co2PerKmPetrol, 1),
      reductionPct,
      litersAvoided: precise.round(litersUsed, 1)
    };
  }, [data, petrolConsumption, unitSystem, fuelConsFormat]);

  // ========== BATTERY & RANGE ANALYSIS ==========
  const batteryAnalysis = useMemo(() => {
    if (!data) return null;

    const { officialRange, officialConsumption } = TAYCAN_SPECS;
    const usableBattery = batteryCapacity; // Use user-configurable battery capacity

    const realWorldRange = data.summary.avgConsumption > 0
      ? precise.div(precise.mul(usableBattery, 100), data.summary.avgConsumption)
      : 0;
    const rangeEfficiency = officialRange > 0 ? Math.round((realWorldRange / officialRange) * 100) : 0;
    const energyPerTrip = data.summary.totalTrips > 0 ? precise.div(data.summary.totalEnergy, data.summary.totalTrips) : 0;
    const tripsPerFullCharge = energyPerTrip > 0 ? Math.floor(usableBattery / energyPerTrip) : 0;
    const distancePerCharge = data.summary.totalChargeCycles > 0 ? precise.div(data.summary.totalDistance, data.summary.totalChargeCycles) : 0;
    const batteryPerTrip = usableBattery > 0 ? precise.round(precise.div(energyPerTrip, usableBattery) * 100, 1) : 0;
    const consumptionVsOfficial = officialConsumption > 0 ? Math.round(((data.summary.avgConsumption / officialConsumption) - 1) * 100) : 0;
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
  }, [data, batteryCapacity]);

  // ========== PREDICTIVE ANALYTICS ==========
  const predictions = useMemo(() => {
    if (!data || data.monthlyData.length < 2) return null;

    const months = data.monthlyData.length;
    const avgMonthlyDistance = data.summary.avgKmPerMonth;
    const avgMonthlyTrips = data.summary.avgTripsPerMonth;
    const avgMonthlyEnergy = months > 0 ? precise.div(data.summary.totalEnergy, months) : 0;
    const avgMonthlyCost = costs ? precise.div(costs.electricCost, months) : 0;
    const avgMonthlySavings = costs ? precise.div(costs.savings, months) : 0;
    const annualDistance = precise.mul(avgMonthlyDistance, 12);
    const annualTrips = precise.mul(avgMonthlyTrips, 12);
    const annualEnergy = precise.mul(avgMonthlyEnergy, 12);
    const annualElectricCost = precise.mul(avgMonthlyCost, 12);
    const annualSavings = precise.mul(avgMonthlySavings, 12);
    const annualCharges = data.summary.totalChargeCycles > 0 ? Math.round((data.summary.totalChargeCycles / months) * 12) : 0;
    const fiveYearSavings = precise.mul(annualSavings, 5);
    const fiveYearDistance = precise.mul(annualDistance, 5);
    const summerMonths = data.monthlyData.filter(m => ['Jun', 'Jul', 'Aug'].includes(m.month));
    const winterMonths = data.monthlyData.filter(m => ['Dec', 'Jan', 'Feb'].includes(m.month));
    const avgSummerConsumption = summerMonths.length > 0 ? precise.div(summerMonths.reduce((s, m) => s + m.consumption, 0), summerMonths.length) : data.summary.avgConsumption;
    const avgWinterConsumption = winterMonths.length > 0 ? precise.div(winterMonths.reduce((s, m) => s + m.consumption, 0), winterMonths.length) : data.summary.avgConsumption;
    const recentMonths = data.monthlyData.slice(-3);
    const nextMonthDistance = recentMonths.length > 0 ? Math.round(recentMonths.reduce((s, m) => s + m.distance, 0) / recentMonths.length) : avgMonthlyDistance;
    const nextMonthTrips = recentMonths.length > 0 ? Math.round(recentMonths.reduce((s, m) => s + m.trips, 0) / recentMonths.length) : avgMonthlyTrips;

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

    const usableBattery = batteryCapacity; // Use user-configurable battery capacity
    const daysOfData = data.monthlyData.length * 30;
    const chargesPerWeek = daysOfData > 0 ? precise.round(precise.div(data.summary.totalChargeCycles * 7, daysOfData), 1) : 0;
    const energyPerCharge = data.summary.totalChargeCycles > 0 ? precise.div(data.summary.totalEnergy, data.summary.totalChargeCycles) : 0;
    const socUsedPerCycle = usableBattery > 0 ? Math.round((energyPerCharge / usableBattery) * 100) : 0;
    const optimalChargeRange = 60;
    const optimalEnergyPerCharge = precise.mul(usableBattery, optimalChargeRange / 100);
    const optimalDistancePerCharge = data.summary.avgConsumption > 0 ? precise.div(precise.mul(optimalEnergyPerCharge, 100), data.summary.avgConsumption) : 0;
    const chargingEfficiency = 0.90;
    const actualEnergyFromGrid = precise.div(data.summary.totalEnergy, chargingEfficiency);
    const chargingLosses = precise.sub(actualEnergyFromGrid, data.summary.totalEnergy);
    const offPeakDiscount = 0.30;
    const potentialOffPeakSavings = costs ? precise.mul(costs.electricCost, offPeakDiscount) : 0;
    const batteryFullCycles = usableBattery > 0 ? precise.round(precise.div(data.summary.totalEnergy, usableBattery), 1) : 0;

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
  }, [data, costs, batteryCapacity]);

  // ========== BENCHMARK COMPARISON ==========
  const benchmarks = useMemo(() => {
    if (!data) return null;

    const { taycanBenchmark } = TAYCAN_SPECS;
    const vsAvgTaycan = data.summary.avgConsumption > 0 ? Math.round(((data.summary.avgConsumption / taycanBenchmark.avgConsumption) - 1) * 100) : 0;
    let efficiencyRating = 3;
    if (data.summary.avgConsumption <= 24) efficiencyRating = 5;
    else if (data.summary.avgConsumption <= 26) efficiencyRating = 4;
    else if (data.summary.avgConsumption <= 28) efficiencyRating = 3;
    else if (data.summary.avgConsumption <= 30) efficiencyRating = 2;
    else efficiencyRating = 1;
    const shortTripPenalty = data.summary.shortTripsPct > 50 ? 'High' : data.summary.shortTripsPct > 30 ? 'Moderate' : 'Low';
    const microTripPct = data.tripTypes.find(t => t.type === 'Micro (<5km)')?.count || 0;
    const microTripRatio = data.summary.totalTrips > 0 ? precise.round(precise.div(microTripPct, data.summary.totalTrips) * 100, 1) : 0;
    const yourVehicleName = vehicleDisplayName?.short || 'Your Porsche';
    const avgVehicleName = vehicleDisplayName?.avgLabel || 'Porsche Avg';

    const competitors = [
      { name: yourVehicleName, consumption: data.summary.avgConsumption, range: batteryAnalysis?.realWorldRange || 0 },
      { name: avgVehicleName, consumption: 26.5, range: 316 },
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
      avgVehicleName,
      drivingProfile: data.summary.avgTripDistance < 15 ? 'Urban Commuter'
        : data.summary.avgTripDistance < 30 ? 'Mixed Use'
        : 'Highway Cruiser'
    };
  }, [data, batteryAnalysis, vehicleDisplayName]);

  // ========== DRIVING INSIGHTS ==========
  const drivingInsights = useMemo(() => {
    if (!data) return null;

    const insights = [];
    const isImperial = unitSystem.startsWith('imperial');
    const distUnit = UNIT_SYSTEMS[unitSystem].distance;

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

    const shortTripThreshold = isImperial ? 6 : 10;
    if (data.summary.shortTripsPct > 40) {
      insights.push({
        type: 'efficiency',
        iconName: 'warning',
        title: 'High Short-Trip Usage',
        description: `${data.summary.shortTripsPct}% of trips are under ${shortTripThreshold}${distUnit}. Short trips use ${Math.round((30.4 / 23.7 - 1) * 100)}% more energy per ${distUnit}. Consider combining errands.`,
        severity: 'warning'
      });
    }

    const saturdayData = data.dayData.find(d => d.day === 'Sat');
    const weekdayAvgDist = data.dayData.filter(d => !['Sat', 'Sun'].includes(d.day)).reduce((s, d) => s + d.avgDist, 0) / 5;
    if (saturdayData && saturdayData.avgDist > weekdayAvgDist * 2) {
      const satDist = isImperial ? Math.round(unitConvert.kmToMi(saturdayData.avgDist)) : saturdayData.avgDist;
      const weekdayDist = isImperial ? Math.round(unitConvert.kmToMi(weekdayAvgDist)) : Math.round(weekdayAvgDist);
      insights.push({
        type: 'pattern',
        iconName: 'patterns',
        title: 'Weekend Road-Tripper',
        description: `Saturday trips average ${satDist}${distUnit} vs ${weekdayDist}${distUnit} on weekdays. Longer trips are more efficient!`,
        severity: 'success'
      });
    }

    const winterData = data.monthlyData.filter(m => ['Dec', 'Jan', 'Feb'].includes(m.month));
    const summerData = data.monthlyData.filter(m => ['Jun', 'Jul', 'Aug'].includes(m.month));
    if (winterData.length > 0 && summerData.length > 0) {
      const winterAvg = winterData.reduce((s, m) => s + m.consumption, 0) / winterData.length;
      const summerAvg = summerData.reduce((s, m) => s + m.consumption, 0) / summerData.length;
      const winterImpact = Math.round(((winterAvg / summerAvg) - 1) * 100);
      if (winterImpact > 10) {
        const winterConsFormatted = units.elecCons(winterAvg).formatted;
        const summerConsFormatted = units.elecCons(summerAvg).formatted;
        insights.push({
          type: 'seasonal',
          iconName: 'snowflake',
          title: 'Winter Efficiency Drop',
          description: `Winter consumption is ${winterImpact}% higher than summer (${winterConsFormatted} vs ${summerConsFormatted}). Use seat heating over cabin heating.`,
          severity: 'warning'
        });
      }
    }

    const optimalSpeed = data.speedEfficiency.reduce((best, curr) =>
      curr.consumption < best.consumption && curr.trips > 5 ? curr : best
    , data.speedEfficiency[0]);
    const speedRangeConverted = speedRangeLabels[optimalSpeed.range] || optimalSpeed.range;
    const optimalConsFormatted = units.elecCons(optimalSpeed.consumption).formatted;
    const efficiencyGain = Math.round((1 - optimalSpeed.consumption / data.summary.avgConsumption) * 100);

    insights.push({
      type: 'tip',
      iconName: 'lightbulb',
      title: 'Your Efficiency Sweet Spot',
      description: `Best efficiency at ${speedRangeConverted} (${optimalConsFormatted}). This is ${efficiencyGain}% better than your average.`,
      severity: 'success'
    });

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
  }, [data, unitSystem, units, speedRangeLabels]);

  const handleFileUpload = useCallback((file, type) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = parseCSV(e.target.result);
        const model = extractVehicleModel(file.name);
        setUploadStatus(prev => ({ ...prev, [type]: { name: file.name, rows: parsed.length, data: parsed, model } }));
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
    const model = uploadStatus.start?.model || uploadStatus.charge?.model || null;
    if (model) {
      setVehicleModel(model);
      safeStorage.set(STORAGE_KEYS.VEHICLE_MODEL, model);
    }
    setShowUpload(false);
    setUploadStatus({ start: null, charge: null });
  }, [uploadStatus]);

  const handleBackup = useCallback(() => {
    try {
      const backup = { version: 1, timestamp: new Date().toISOString(), data: appData, vehicleModel, settings: { electricityPrice, petrolPrice, petrolConsumption, batteryCapacity, unitSystem, currency, fuelConsFormat, elecConsFormat } };
      const modelSlug = vehicleModel ? vehicleModel.toLowerCase().replace(/\s+/g, '-') : 'porsche';
      const filename = `${modelSlug}-backup-${new Date().toISOString().split('T')[0]}.json`;
      downloadFile(JSON.stringify(backup, null, 2), filename);
    } catch (err) {
      setModalConfig({ title: 'Export Error', message: 'Failed to create backup: ' + err.message, variant: 'danger' });
    }
  }, [appData, vehicleModel, electricityPrice, petrolPrice, petrolConsumption, batteryCapacity, unitSystem, currency, fuelConsFormat, elecConsFormat]);

  const handleRestore = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        if (backup.data) { setAppData(backup.data); safeStorage.set(STORAGE_KEYS.DATA, backup.data); }
        if (backup.vehicleModel) { setVehicleModel(backup.vehicleModel); safeStorage.set(STORAGE_KEYS.VEHICLE_MODEL, backup.vehicleModel); }
        if (backup.settings) {
          setElectricityPrice(backup.settings.electricityPrice ?? 0.25);
          setPetrolPrice(backup.settings.petrolPrice ?? 1.80);
          setPetrolConsumption(backup.settings.petrolConsumption ?? 8.0);
          setBatteryCapacity(backup.settings.batteryCapacity ?? 83.7);
          setUnitSystem(backup.settings.unitSystem ?? 'metric');
          setCurrency(backup.settings.currency ?? 'EUR');
          setFuelConsFormat(backup.settings.fuelConsFormat ?? 'L/100km');
          setElecConsFormat(backup.settings.elecConsFormat ?? 'kWh/100km');
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
        setVehicleModel(null);
        safeStorage.remove(STORAGE_KEYS.DATA);
        safeStorage.remove(STORAGE_KEYS.VEHICLE_MODEL);
        setShowSettings(false);
      }
    });
  }, []);

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
      <Header
        darkMode={darkMode}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <MobileSidebar
        darkMode={darkMode}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        setDarkMode={setDarkMode}
        icons={icons}
        tabs={tabs}
      />

      {/* Upload Modal */}
      {showUpload && (
        <UploadModal
          darkMode={darkMode}
          showUpload={showUpload}
          setShowUpload={setShowUpload}
          uploadStatus={uploadStatus}
          handleFileUpload={handleFileUpload}
          processUploadedFiles={processUploadedFiles}
        />
      )}

      {/* Modal Dialog */}
      {modalConfig && (
        <ConfirmModal
          darkMode={darkMode}
          modalConfig={modalConfig}
          setModalConfig={setModalConfig}
        />
      )}

      {/* Main Layout Container */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar
          darkMode={darkMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          setDarkMode={setDarkMode}
          icons={icons}
          tabs={tabs}
        />

        {/* Main Content */}
        <main className="flex-1 px-4 py-6">
          {/* Settings Page */}
          {showSettings && (
            <SettingsPage
              darkMode={darkMode}
              appData={appData}
              unitSystem={unitSystem}
              setUnitSystem={setUnitSystem}
              currency={currency}
              setCurrency={setCurrency}
              fuelConsFormat={fuelConsFormat}
              setFuelConsFormat={setFuelConsFormat}
              elecConsFormat={elecConsFormat}
              setElecConsFormat={setElecConsFormat}
              electricityPrice={electricityPrice}
              setElectricityPrice={setElectricityPrice}
              petrolPrice={petrolPrice}
              setPetrolPrice={setPetrolPrice}
              petrolConsumption={petrolConsumption}
              setPetrolConsumption={setPetrolConsumption}
              batteryCapacity={batteryCapacity}
              setBatteryCapacity={setBatteryCapacity}
              setShowUpload={setShowUpload}
              handleClearData={handleClearData}
              handleBackup={handleBackup}
              handleRestore={handleRestore}
            />
          )}

          {/* Welcome Screen (no data) */}
          {!data && !showSettings && (
            <WelcomeScreen
              setShowUpload={setShowUpload}
              setUseSampleData={setUseSampleData}
              darkMode={darkMode}
            />
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
                <OverviewTab
                  data={data}
                  units={units}
                  darkMode={darkMode}
                  timeView={timeView}
                  setTimeView={setTimeView}
                  timeViewData={timeViewData}
                  convertedTripTypes={convertedTripTypes}
                  chartColors={chartColors}
                />
              )}

              {activeTab === 'patterns' && (
                <PatternsTab
                  data={data}
                  units={units}
                  darkMode={darkMode}
                  timeView={timeView}
                  setTimeView={setTimeView}
                  timeViewData={timeViewData}
                  convertedDayData={convertedDayData}
                  chartColors={chartColors}
                />
              )}

              {activeTab === 'efficiency' && (
                <EfficiencyTab
                  data={data}
                  units={units}
                  darkMode={darkMode}
                  timeView={timeView}
                  setTimeView={setTimeView}
                  timeViewData={timeViewData}
                  convertedTripTypes={convertedTripTypes}
                  convertedSpeedEfficiency={convertedSpeedEfficiency}
                  elecConsDomain={elecConsDomain}
                  chartColors={chartColors}
                  unitSystem={unitSystem}
                />
              )}

              {activeTab === 'costs' && costs && (
                <CostsTab
                  data={data}
                  units={units}
                  darkMode={darkMode}
                  costs={costs}
                  predictions={predictions}
                  chartColors={chartColors}
                  electricityPrice={electricityPrice}
                  petrolPrice={petrolPrice}
                  petrolConsumption={petrolConsumption}
                  unitSystem={unitSystem}
                  fuelConsFormat={fuelConsFormat}
                />
              )}

              {activeTab === 'environmental' && environmental && (
                <EnvironmentalTab
                  data={data}
                  units={units}
                  darkMode={darkMode}
                  environmental={environmental}
                  chartColors={chartColors}
                  petrolConsumption={petrolConsumption}
                  unitSystem={unitSystem}
                  fuelConsFormat={fuelConsFormat}
                />
              )}

              {activeTab === 'battery' && batteryAnalysis && (
                <BatteryTab
                  data={data}
                  units={units}
                  darkMode={darkMode}
                  batteryAnalysis={batteryAnalysis}
                  chargingOptimization={chargingOptimization}
                  benchmarks={benchmarks}
                  chartColors={chartColors}
                />
              )}

              {activeTab === 'insights' && drivingInsights && (
                <InsightsTab
                  data={data}
                  units={units}
                  darkMode={darkMode}
                  drivingInsights={drivingInsights}
                  predictions={predictions}
                  benchmarks={benchmarks}
                  chargingOptimization={chargingOptimization}
                  unitSystem={unitSystem}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
}
