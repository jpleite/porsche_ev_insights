import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';

// Constants
import { UNIT_SYSTEMS, CURRENCIES, FUEL_CONSUMPTION_FORMATS, ELECTRIC_CONSUMPTION_FORMATS, MI_TO_KM, L_TO_US_GAL } from './constants/units';
import { SAMPLE_DATA } from './constants/sampleData';
import { TAYCAN_SPECS } from './constants/taycanSpecs';
import { STORAGE_KEYS } from './constants/storageKeys';
import { PORSCHE_EV_MODELS, getVehicleById, guessVehicleFromString, DEFAULT_VEHICLE_ID } from './constants/porscheEvModels';

// Utilities
import { precise } from './utils/precise';
import { unitConvert } from './utils/unitConvert';
import { safeStorage } from './utils/storage';
import { downloadFile } from './utils/download';
import { parseCSV, parseAudiCSV, isAudiFormat } from './utils/csvParser';
import JSZip from 'jszip';

// i18n
import { useTranslation } from './i18n';

// Services
import { processUploadedData, extractVehicleModel } from './services/dataProcessor';
import { mergeRawData, reconstructRawDataFromTrips } from './utils/dataMerger';

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
import { MyCarTab } from './components/tabs/MyCarTab';
import { UploadModal } from './components/modals/UploadModal';
import { ConfirmModal } from './components/modals/ConfirmModal';
import { PorscheConnectModal } from './components/modals/PorscheConnectModal';
import { WelcomeScreen, SettingsPage } from './pages';
import { mapModelToVehicleId, getStoredSession, fetchAllData, getVehicles, getVehicleOverview, getVehiclePictures, getVehicleStatus } from './services/porscheConnect';

// ========== MAIN COMPONENT ==========
export default function App() {
  const { language, setLanguage, t } = useTranslation();
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
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [uploadMode, setUploadMode] = useState('replace'); // 'replace' or 'merge'
  const [rawData, setRawData] = useState({ start: [], charge: [] }); // Raw CSV rows for merging
  const [showPorscheConnect, setShowPorscheConnect] = useState(false); // Porsche Connect modal
  const [autoSyncStatus, setAutoSyncStatus] = useState(null); // 'checking', 'syncing', 'done', 'new_data', null
  const [liveVehicleData, setLiveVehicleData] = useState(null); // Live vehicle data from Porsche Connect API
  const [availableVehicles, setAvailableVehicles] = useState([]); // List of vehicles from Porsche Connect
  const [selectedConnectVin, setSelectedConnectVin] = useState(() => {
    return safeStorage.get(STORAGE_KEYS.PORSCHE_CONNECT_VIN) || null;
  }); // Selected VIN for multi-vehicle accounts
  const [pressureUnit, setPressureUnit] = useState('bar'); // Pressure unit: 'bar' or 'psi'
  // Theme mode: 'light', 'dark', 'auto'
  const [themeMode, setThemeMode] = useState(() => {
    const saved = safeStorage.get('taycan_theme_mode');
    return saved || 'auto';
  });

  // Compute actual dark mode based on theme mode
  const darkMode = themeMode === 'auto'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : themeMode === 'dark';

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    if (themeMode !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      // Force re-render when system theme changes
      setThemeMode(prev => prev); // This triggers a re-render
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [themeMode]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    safeStorage.set('taycan_theme_mode', themeMode);
  }, [darkMode, themeMode]);

  useEffect(() => {
    let savedData = safeStorage.get(STORAGE_KEYS.DATA);
    const savedSettings = safeStorage.get(STORAGE_KEYS.SETTINGS);
    const savedModel = safeStorage.get(STORAGE_KEYS.VEHICLE_MODEL);
    let savedRawData = safeStorage.get(STORAGE_KEYS.RAW_DATA);

    // One-time migration: deduplicate charge data that was corrupted by duplicate concatenation
    // This migration can be removed after v2.0.0
    const migrationKey = 'taycan_charge_dedupe_v1';
    if (savedRawData?.charge?.length > 0 && !safeStorage.get(migrationKey)) {
      const seen = new Set();
      const deduped = savedRawData.charge.filter(cycle => {
        const date = cycle.date instanceof Date ? cycle.date : new Date(cycle.date || cycle['arrival time']);
        const fingerprint = `${date.toISOString().slice(0, 10)}|${cycle.distance}|${cycle.consumption}`;
        if (seen.has(fingerprint)) return false;
        seen.add(fingerprint);
        return true;
      });
      if (deduped.length < savedRawData.charge.length) {
        console.log(`[Migration] Deduplicated charge data: ${savedRawData.charge.length} → ${deduped.length}`);
        savedRawData = { ...savedRawData, charge: deduped };
        safeStorage.set(STORAGE_KEYS.RAW_DATA, savedRawData);
        // Reprocess data with corrected charge count
        if (savedRawData.start?.length > 0) {
          savedData = processUploadedData(savedRawData.start, savedRawData.charge);
          safeStorage.set(STORAGE_KEYS.DATA, savedData);
        }
      }
      safeStorage.set(migrationKey, true);
    }

    if (savedData) setAppData(savedData);
    if (savedModel) setVehicleModel(savedModel);
    if (savedRawData) setRawData(savedRawData);
    if (savedSettings) {
      setElectricityPrice(savedSettings.electricityPrice ?? 0.25);
      setPetrolPrice(savedSettings.petrolPrice ?? 1.80);
      setPetrolConsumption(savedSettings.petrolConsumption ?? 8.0);
      setBatteryCapacity(savedSettings.batteryCapacity ?? 83.7);
      setUnitSystem(savedSettings.unitSystem ?? 'metric');
      setCurrency(savedSettings.currency ?? 'EUR');
      setFuelConsFormat(savedSettings.fuelConsFormat ?? 'L/100km');
      setElecConsFormat(savedSettings.elecConsFormat ?? 'kWh/100km');
      if (savedSettings.selectedVehicleId) setSelectedVehicleId(savedSettings.selectedVehicleId);
      if (savedSettings.pressureUnit) setPressureUnit(savedSettings.pressureUnit);
    }
  }, []);

  useEffect(() => {
    safeStorage.set(STORAGE_KEYS.SETTINGS, { electricityPrice, petrolPrice, petrolConsumption, batteryCapacity, unitSystem, currency, fuelConsFormat, elecConsFormat, selectedVehicleId, pressureUnit });
  }, [electricityPrice, petrolPrice, petrolConsumption, batteryCapacity, unitSystem, currency, fuelConsFormat, elecConsFormat, selectedVehicleId, pressureUnit]);

  // Save selected Porsche Connect VIN to localStorage
  useEffect(() => {
    if (selectedConnectVin) {
      safeStorage.set(STORAGE_KEYS.PORSCHE_CONNECT_VIN, selectedConnectVin);
    }
  }, [selectedConnectVin]);

  // Auto-sync with Porsche Connect on page load (background)
  useEffect(() => {
    const autoSync = async () => {
      // Only sync if user has an active session and existing data
      const session = getStoredSession();
      if (!session || rawData.start.length === 0) return;

      try {
        setAutoSyncStatus('checking');

        // Get vehicles to find the VIN
        const vehicles = await getVehicles();
        if (!vehicles || vehicles.length === 0) {
          setAutoSyncStatus(null);
          return;
        }

        const vin = vehicles[0].vin;
        setAutoSyncStatus('syncing');

        // Fetch latest data
        const { trips, chargeData } = await fetchAllData(vin, () => {});

        if (trips.length === 0) {
          setAutoSyncStatus(null);
          return;
        }

        // Check for new trips using fingerprint comparison
        const existingFingerprints = new Set(
          rawData.start.map(trip => {
            const date = trip.date instanceof Date ? trip.date : new Date(trip.date);
            return `${date.toISOString().slice(0, 10)}|${trip.distance}|${trip.consumption}`;
          })
        );

        const newTrips = trips.filter(trip => {
          const date = trip.date instanceof Date ? trip.date : new Date(trip.date);
          const fingerprint = `${date.toISOString().slice(0, 10)}|${trip.distance}|${trip.consumption}`;
          return !existingFingerprints.has(fingerprint);
        });

        if (newTrips.length > 0) {
          // Merge new trips with existing data
          const mergedTrips = [...rawData.start, ...newTrips];

          // Deduplicate charge data using fingerprint (same logic as trips)
          let mergedChargeData = rawData.charge;
          if (chargeData.length > 0) {
            const existingChargeFingerprints = new Set(
              rawData.charge.map(cycle => {
                const date = cycle.date instanceof Date ? cycle.date : new Date(cycle.date || cycle['arrival time']);
                return `${date.toISOString().slice(0, 10)}|${cycle.distance}|${cycle.consumption}`;
              })
            );
            const newChargeCycles = chargeData.filter(cycle => {
              const date = cycle.date instanceof Date ? cycle.date : new Date(cycle.date || cycle['arrival time']);
              const fingerprint = `${date.toISOString().slice(0, 10)}|${cycle.distance}|${cycle.consumption}`;
              return !existingChargeFingerprints.has(fingerprint);
            });
            mergedChargeData = [...rawData.charge, ...newChargeCycles];
          }

          // Update state and storage
          const newRawData = { start: mergedTrips, charge: mergedChargeData };
          setRawData(newRawData);
          safeStorage.set(STORAGE_KEYS.RAW_DATA, newRawData);

          const processed = processUploadedData(mergedTrips, mergedChargeData);
          setAppData(processed);
          safeStorage.set(STORAGE_KEYS.DATA, processed);

          setAutoSyncStatus('new_data');
          // Show notification briefly, then hide
          setTimeout(() => setAutoSyncStatus(null), 5000);
        } else {
          setAutoSyncStatus(null);
        }
      } catch (error) {
        console.warn('Auto-sync failed:', error);
        setAutoSyncStatus(null);
      }
    };

    // Delay auto-sync to not block initial render
    const timer = setTimeout(autoSync, 2000);
    return () => clearTimeout(timer);
  }, []); // Only run once on mount

  // Fetch live vehicle data for My Car tab when session exists
  useEffect(() => {
    const fetchLiveVehicleData = async () => {
      const session = getStoredSession();
      if (!session) {
        setLiveVehicleData(null);
        setAvailableVehicles([]);
        return;
      }

      try {
        const vehicles = await getVehicles();
        if (!vehicles || vehicles.length === 0) {
          setLiveVehicleData(null);
          setAvailableVehicles([]);
          return;
        }

        // Store available vehicles for selector
        setAvailableVehicles(vehicles);

        // Use selected VIN or fall back to first vehicle
        const vehicle = selectedConnectVin
          ? vehicles.find(v => v.vin === selectedConnectVin) || vehicles[0]
          : vehicles[0];
        const vin = vehicle.vin;

        // Auto-select first vehicle if none selected
        if (!selectedConnectVin && vehicles.length > 0) {
          setSelectedConnectVin(vehicles[0].vin);
        }

        // Fetch overview, full status, and pictures in parallel
        const [overview, fullStatus, pictures] = await Promise.all([
          getVehicleOverview(vin).catch(() => null),
          getVehicleStatus(vin).catch(() => null),
          getVehiclePictures(vin).catch(() => null)
        ]);

        // Extract status measurements from both overview and full status
        // Full status may contain additional data like tire pressure
        const overviewMeasurements = overview?.measurements || [];
        const statusMeasurements = fullStatus?.measurements || [];
        const allMeasurements = [...overviewMeasurements, ...statusMeasurements];
        const getMeasurement = (key) => allMeasurements.find(m => m.key === key);

        // Get tire pressure data (single measurement with all 4 tires)
        const tirePressureData = getMeasurement('TIRE_PRESSURE')?.value;
        console.log('[My Car] Tire pressure data:', tirePressureData);

        const status = {
          batteryLevel: getMeasurement('BATTERY_LEVEL')?.value,
          range: {
            kilometers: getMeasurement('E_RANGE')?.value?.valueInKilometers ||
                       getMeasurement('E_RANGE')?.value?.kilometers
          },
          mileage: {
            kilometers: getMeasurement('MILEAGE')?.value?.valueInKilometers ||
                       getMeasurement('MILEAGE')?.value?.kilometers
          },
          lockState: getMeasurement('LOCK_STATE_VEHICLE')?.value,
          gpsLocation: getMeasurement('GPS_LOCATION')?.value,
          chargingSummary: getMeasurement('CHARGING_SUMMARY')?.value,
          chargingRate: getMeasurement('CHARGING_RATE')?.value,
          tirePressure: tirePressureData ? {
            frontLeft: tirePressureData.frontLeftTire?.actualPressureBar,
            frontRight: tirePressureData.frontRightTire?.actualPressureBar,
            rearLeft: tirePressureData.rearLeftTire?.actualPressureBar,
            rearRight: tirePressureData.rearRightTire?.actualPressureBar
          } : null
        };

        // Extract picture URLs - log the structure to help debug
        console.log('[My Car] Pictures API response:', pictures);
        const pictureData = {};

        // Handle array format (API returns array of picture objects)
        if (Array.isArray(pictures)) {
          for (const pic of pictures) {
            const view = pic.view || pic.perspective || '';
            const url = pic.url;
            if (!url) continue;

            // Match various view naming conventions
            if (view.includes('front') || view === 'ext-low-front-left') {
              pictureData.frontView = url;
            } else if (view.includes('side') || view === 'ext-low-side-left') {
              pictureData.sideView = url;
            } else if (view.includes('rear') || view === 'ext-low-rear-left') {
              pictureData.rearView = url;
            } else if (view.includes('top') || view === 'ext-top-right') {
              pictureData.topView = url;
            }
          }
        }

        // Try gallery format
        if (pictures?.gallery && Array.isArray(pictures.gallery)) {
          for (const pic of pictures.gallery) {
            if (pic.view === 'exterieur' && pic.angle === 'front') {
              pictureData.frontView = pic.url;
            } else if (pic.view === 'exterieur' && pic.angle === 'side') {
              pictureData.sideView = pic.url;
            } else if (pic.view === 'exterieur' && pic.angle === 'rear') {
              pictureData.rearView = pic.url;
            } else if (pic.view === 'exterieur' && pic.angle === 'top') {
              pictureData.topView = pic.url;
            }
          }
        }

        // Try direct URL fields (e.g., pictures.frontView, pictures.sideView)
        if (pictures?.frontView) pictureData.frontView = pictures.frontView;
        if (pictures?.sideView) pictureData.sideView = pictures.sideView;
        if (pictures?.rearView) pictureData.rearView = pictures.rearView;
        if (pictures?.topView) pictureData.topView = pictures.topView;

        // Try nested format (e.g., pictures.pictures.frontView)
        if (pictures?.pictures) {
          if (pictures.pictures.frontView) pictureData.frontView = pictures.pictures.frontView;
          if (pictures.pictures.sideView) pictureData.sideView = pictures.pictures.sideView;
          if (pictures.pictures.rearView) pictureData.rearView = pictures.pictures.rearView;
          if (pictures.pictures.topView) pictureData.topView = pictures.pictures.topView;
        }

        // Try exteriorViews format
        if (pictures?.exteriorViews) {
          const views = pictures.exteriorViews;
          if (views.front) pictureData.frontView = views.front;
          if (views.side) pictureData.sideView = views.side;
          if (views.rear) pictureData.rearView = views.rear;
          if (views.top) pictureData.topView = views.top;
        }

        console.log('[My Car] Extracted picture data:', pictureData);

        setLiveVehicleData({
          vehicle,
          status,
          pictures: pictureData
        });
      } catch (error) {
        console.warn('Failed to fetch live vehicle data:', error);
        setLiveVehicleData(null);
      }
    };

    fetchLiveVehicleData();
  }, [showPorscheConnect, selectedConnectVin]); // Re-fetch when modal closes or vehicle changes

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
      if (!['MPGe', 'mi/kWh', 'kWh/mi', 'kWh/100mi'].includes(elecConsFormat)) {
        setElecConsFormat('MPGe');
      }
    }
  }, [unitSystem]);

  const data = useMemo(() => appData || (useSampleData ? SAMPLE_DATA : null), [appData, useSampleData]);

  // Get selected vehicle specs (falls back to default if not set)
  const selectedVehicle = useMemo(() => {
    return selectedVehicleId ? getVehicleById(selectedVehicleId) : null;
  }, [selectedVehicleId]);

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
        case 'MPGe': return unitConvert.kwh100kmToMpge(kwh100km);
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
      currSymbol: curr.symbol,
      pressure: pressureUnit
    };
  }, [unitSystem, currency, elecConsFormat, fuelConsFormat, pressureUnit]);

  // Personalized vehicle name for UI display
  const vehicleDisplayName = useMemo(() => {
    const model = vehicleModel || 'Porsche';
    const baseModel = model.split(' ')[0];
    // Use translation keys for proper localization
    const yourLabel = baseModel === 'Taycan' ? t('benchmark.yourTaycan') :
                      baseModel === 'Porsche' ? t('benchmark.yourPorsche') :
                      `${t('benchmark.yourVehicle').split(' ')[0]} ${baseModel}`;
    return {
      full: yourLabel,
      short: yourLabel,
      modelFull: model,
      modelShort: baseModel,
      avgLabel: `${baseModel} ${t('benchmark.avg')}`
    };
  }, [vehicleModel, t]);

  // Trip type labels with converted distances
  const tripTypeLabels = useMemo(() => {
    const isImperial = unitSystem.startsWith('imperial');
    const distUnit = UNIT_SYSTEMS[unitSystem].distance;

    if (isImperial) {
      return {
        'Micro (<5km)': `${t('tripTypes.micro')} (<3${distUnit})`,
        'Short (5-10km)': `${t('tripTypes.short')} (3-6${distUnit})`,
        'Medium (10-20km)': `${t('tripTypes.medium')} (6-12${distUnit})`,
        'Long (20-50km)': `${t('tripTypes.long')} (12-31${distUnit})`,
        'Very Long (>50km)': `${t('tripTypes.veryLong')} (>31${distUnit})`
      };
    }
    return {
      'Micro (<5km)': `${t('tripTypes.micro')} (<5${distUnit})`,
      'Short (5-10km)': `${t('tripTypes.short')} (5-10${distUnit})`,
      'Medium (10-20km)': `${t('tripTypes.medium')} (10-20${distUnit})`,
      'Long (20-50km)': `${t('tripTypes.long')} (20-50${distUnit})`,
      'Very Long (>50km)': `${t('tripTypes.veryLong')} (>50${distUnit})`
    };
  }, [unitSystem, t]);

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

  // Converted day data for charts (with translated day names)
  const convertedDayData = useMemo(() => {
    if (!data?.dayData) return [];
    return data.dayData.map(d => ({
      ...d,
      dayKey: d.day, // Keep original key for weekend detection
      day: t(`days.${d.day?.toLowerCase?.() || d.day}`),
      distance: units.dist(d.distance).value,
      avgDist: units.dist(d.avgDist).value,
      consumption: units.elecCons(d.consumption).value
    }));
  }, [data, units, t]);

  // Time-based aggregated data based on timeView selection (with translated month names)
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
      label: t(`months.${m.month?.toLowerCase?.() || m.month}`),
      trips: m.trips,
      distance: units.dist(m.distance).value,
      avgConsumption: units.elecCons(m.consumption).value,
      energy: precise.div(precise.mul(m.distance, m.consumption), 100)
    }));
  }, [data, timeView, units, t]);

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
    // UK uses price per litre, US uses price per gallon
    let petrolPricePerL;
    if (unitSystem === 'imperial_us') {
      // US price is per gallon, convert to per liter
      petrolPricePerL = precise.mul(petrolPrice, L_TO_US_GAL);
    } else {
      petrolPricePerL = petrolPrice; // Metric and UK are already per liter
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

    // Use EPA values for imperial_us, WLTP for metric/imperial_uk
    const useEpa = unitSystem === 'imperial_us';

    // Get official range and consumption based on unit system
    // For EPA: range is in miles, consumption will be converted to user's format
    // For WLTP: range is in km, consumption is kWh/100km
    const officialRangeKm = useEpa
      ? (selectedVehicle?.epaRange ? precise.mul(selectedVehicle.epaRange, MI_TO_KM) : TAYCAN_SPECS.officialRange)
      : (selectedVehicle?.wltpRange || TAYCAN_SPECS.officialRange);

    // For consumption comparison, we need kWh/100km internally
    // EPA MPGe can be converted: kWh/100km = 3370 / (MPGe * 1.60934)
    const officialConsumption = useEpa
      ? (selectedVehicle?.epaMpge ? unitConvert.mpgeToKwh100km(selectedVehicle.epaMpge) : TAYCAN_SPECS.officialConsumption)
      : (selectedVehicle?.wltpConsumption || TAYCAN_SPECS.officialConsumption);

    // Store the display values (in user's preferred units)
    const officialRangeMiles = useEpa
      ? (selectedVehicle?.epaRange || Math.round(unitConvert.kmToMi(TAYCAN_SPECS.officialRange)))
      : null;
    const officialMpge = useEpa ? (selectedVehicle?.epaMpge || 80) : null;

    const usableBattery = batteryCapacity; // Use user-configurable battery capacity

    const realWorldRange = data.summary.avgConsumption > 0
      ? precise.div(precise.mul(usableBattery, 100), data.summary.avgConsumption)
      : 0;
    const rangeEfficiency = officialRangeKm > 0 ? Math.round((realWorldRange / officialRangeKm) * 100) : 0;
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
      officialRange: officialRangeKm, // Always in km internally
      officialRangeMiles, // EPA range in miles (null if not using EPA)
      officialConsumption, // Always in kWh/100km internally
      officialMpge, // EPA MPGe (null if not using EPA)
      useEpa, // Flag to indicate which standard is being used
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
  }, [data, batteryCapacity, selectedVehicle, unitSystem]);

  // ========== PREDICTIVE ANALYTICS ==========
  const predictions = useMemo(() => {
    if (!data || data.monthlyData.length < 1) return null;

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
    const summerMonths = data.monthlyData.filter(m => ['jun', 'jul', 'aug'].includes(m.month));
    const winterMonths = data.monthlyData.filter(m => ['dec', 'jan', 'feb'].includes(m.month));
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
    const useEpa = unitSystem === 'imperial_us';

    // Use selected vehicle's EPA/WLTP consumption for comparison based on unit system
    const officialConsumption = useEpa
      ? (selectedVehicle?.epaMpge ? unitConvert.mpgeToKwh100km(selectedVehicle.epaMpge) : taycanBenchmark.avgConsumption)
      : (selectedVehicle?.wltpConsumption || taycanBenchmark.avgConsumption);

    // % above official (WLTP/EPA): negative = better, 0 = at official, positive = worse
    const pctAboveOfficial = data.summary.avgConsumption > 0 && officialConsumption > 0
      ? Math.round(((data.summary.avgConsumption / officialConsumption) - 1) * 100)
      : 0;

    // 1–5 star rating: performance vs vehicle's WLTP/EPA (better = 5, within 10% = 4, 20% = 3, 30% = 2, >30% = 1)
    let efficiencyRating;
    if (pctAboveOfficial < 0) efficiencyRating = 5;
    else if (pctAboveOfficial <= 10) efficiencyRating = 4;
    else if (pctAboveOfficial <= 20) efficiencyRating = 3;
    else if (pctAboveOfficial <= 30) efficiencyRating = 2;
    else efficiencyRating = 1;
    const shortTripPenalty = data.summary.shortTripsPct > 50 ? 'High' : data.summary.shortTripsPct > 30 ? 'Moderate' : 'Low';
    const microTripPct = data.tripTypes.find(t => t.type === 'Micro (<5km)')?.count || 0;
    const microTripRatio = data.summary.totalTrips > 0 ? precise.round(precise.div(microTripPct, data.summary.totalTrips) * 100, 1) : 0;

    // Build vehicle names for comparison chart
    // Extract short model name and translation key from selected vehicle
    const getVehicleTranslationKey = (vehicleName) => {
      if (!vehicleName) return { key: 'yourPorsche', shortName: 'Porsche' };
      const nameLower = vehicleName.toLowerCase();
      if (nameLower.includes('audi') || nameLower.includes('e-tron gt')) return { key: 'yourEtronGT', shortName: 'e-tron GT' };
      if (nameLower.includes('cross turismo')) return { key: 'yourTaycanCT', shortName: 'Taycan Cross Turismo' };
      if (nameLower.includes('sport turismo')) return { key: 'yourTaycanST', shortName: 'Taycan Sport Turismo' };
      if (nameLower.includes('macan')) return { key: 'yourMacan', shortName: 'Macan Electric' };
      if (nameLower.includes('cayenne')) return { key: 'yourCayenne', shortName: 'Cayenne Electric' };
      if (nameLower.includes('taycan')) return { key: 'yourTaycan', shortName: 'Taycan' };
      return { key: 'yourPorsche', shortName: 'Porsche' };
    };

    const { key: translationKey, shortName: shortModelName } = selectedVehicle
      ? getVehicleTranslationKey(selectedVehicle.name)
      : { key: 'yourPorsche', shortName: vehicleDisplayName?.modelShort || 'Porsche' };
    const yourVehicleName = t(`benchmark.${translationKey}`);

    // Use EPA or WLTP label based on unit system
    const officialLabel = useEpa ? 'EPA' : 'WLTP';
    const benchmarkLabel = selectedVehicle ? `${shortModelName} ${officialLabel}` : (vehicleDisplayName?.avgLabel || 'Porsche Avg');

    // Build competitors list: Your real-world data vs official rating + other EVs for context
    // Use EPA values for US, WLTP for others
    const officialBenchmarkConsumption = useEpa
      ? (selectedVehicle?.epaMpge ? unitConvert.mpgeToKwh100km(selectedVehicle.epaMpge) : 24.8)
      : (selectedVehicle?.wltpConsumption || 24.8);
    const officialBenchmarkRange = useEpa
      ? (selectedVehicle?.epaRange ? precise.mul(selectedVehicle.epaRange, MI_TO_KM) : TAYCAN_SPECS.officialRange)
      : (selectedVehicle?.wltpRange || TAYCAN_SPECS.officialRange);

    // Competitor EVs - use EPA values for US, WLTP for others
    // EPA: Model S ~120 MPGe, 405 mi; EQS ~97 MPGe, 350 mi; i7 ~85 MPGe, 318 mi
    // WLTP: Model S ~18.5 kWh/100km, 652 km; EQS ~20.5 kWh/100km, 640 km; i7 ~22 kWh/100km, 610 km
    const modelSConsumption = useEpa ? unitConvert.mpgeToKwh100km(120) : 18.5;
    const modelSRange = useEpa ? precise.mul(405, MI_TO_KM) : 652;
    const eqsConsumption = useEpa ? unitConvert.mpgeToKwh100km(97) : 20.5;
    const eqsRange = useEpa ? precise.mul(350, MI_TO_KM) : 640;
    const i7Consumption = useEpa ? unitConvert.mpgeToKwh100km(85) : 22.0;
    const i7Range = useEpa ? precise.mul(318, MI_TO_KM) : 610;

    const competitors = [
      { name: yourVehicleName, consumption: data.summary.avgConsumption, range: batteryAnalysis?.realWorldRange || 0 },
      { name: benchmarkLabel, consumption: officialBenchmarkConsumption, range: officialBenchmarkRange },
      { name: 'Model S', consumption: modelSConsumption, range: modelSRange },
      { name: 'EQS', consumption: eqsConsumption, range: eqsRange },
      { name: 'BMW i7', consumption: i7Consumption, range: i7Range }
    ];

    return {
      pctAboveOfficial,
      efficiencyRating,
      shortTripPenalty,
      microTripRatio,
      competitors,
      useEpa,
      officialLabel,
      benchmarkLabel,
      officialConsumption: officialBenchmarkConsumption,
      officialMpge: useEpa ? (selectedVehicle?.epaMpge || 80) : null,
      drivingProfile: data.summary.avgTripDistance < 15 ? t('drivingProfiles.urbanCommuter')
        : data.summary.avgTripDistance < 30 ? t('drivingProfiles.mixedUse')
        : t('drivingProfiles.highwayCruiser')
    };
  }, [data, batteryAnalysis, vehicleDisplayName, selectedVehicle, unitSystem, t]);

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
        title: t('insights.dailyCommuter'),
        description: t('insights.dailyCommuterDesc', { pct: commutePct }),
        severity: 'info'
      });
    }

    const shortTripThreshold = isImperial ? 6 : 10;
    if (data.summary.shortTripsPct > 40) {
      insights.push({
        type: 'efficiency',
        iconName: 'warning',
        title: t('insights.shortTripsHighUsage'),
        description: t('insights.shortTripsDesc', {
          pct: data.summary.shortTripsPct,
          dist: `${shortTripThreshold}${distUnit}`,
          diff: Math.round((30.4 / 23.7 - 1) * 100),
          unit: distUnit
        }),
        severity: 'warning'
      });
    }

    const saturdayData = data.dayData.find(d => d.day === 'sat');
    const weekdayAvgDist = data.dayData.filter(d => !['sat', 'sun'].includes(d.day)).reduce((s, d) => s + d.avgDist, 0) / 5;
    if (saturdayData && saturdayData.avgDist > weekdayAvgDist * 2) {
      const satDist = isImperial ? Math.round(unitConvert.kmToMi(saturdayData.avgDist)) : saturdayData.avgDist;
      const weekdayDist = isImperial ? Math.round(unitConvert.kmToMi(weekdayAvgDist)) : Math.round(weekdayAvgDist);
      insights.push({
        type: 'pattern',
        iconName: 'patterns',
        title: t('insights.weekendTripperTitle'),
        description: t('insights.weekendTripperDesc', {
          satDist: `${satDist}${distUnit}`,
          weekdayDist: `${weekdayDist}${distUnit}`
        }),
        severity: 'success'
      });
    }

    const winterData = data.monthlyData.filter(m => ['dec', 'jan', 'feb'].includes(m.month));
    const summerData = data.monthlyData.filter(m => ['jun', 'jul', 'aug'].includes(m.month));
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
          title: t('insights.winterDrop'),
          description: t('insights.winterDropDesc', {
            pct: winterImpact,
            winter: winterConsFormatted,
            summer: summerConsFormatted
          }),
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
      title: t('insights.sweetSpot'),
      description: t('insights.sweetSpotDesc', {
        speed: speedRangeConverted,
        cons: optimalConsFormatted,
        pct: efficiencyGain
      }),
      severity: 'success'
    });

    if (data.summary.avgTripsPerCharge > 6) {
      insights.push({
        type: 'charging',
        iconName: 'battery',
        title: t('insights.optimalCharging'),
        description: t('insights.optimalChargingDesc', { trips: data.summary.avgTripsPerCharge }),
        severity: 'success'
      });
    } else if (data.summary.avgTripsPerCharge < 3) {
      insights.push({
        type: 'charging',
        iconName: 'plug',
        title: t('insights.frequentCharging'),
        description: t('insights.frequentChargingDesc', { trips: data.summary.avgTripsPerCharge }),
        severity: 'info'
      });
    }

    return {
      insights,
      commutePct,
      morningTrips,
      eveningTrips
    };
  }, [data, unitSystem, units, speedRangeLabels, t]);

  const handleFileUpload = useCallback(async (file, type) => {
    // Handle Audi ZIP files
    if (type === 'audi' && file.name.endsWith('.zip')) {
      try {
        const zip = await JSZip.loadAsync(file);
        const files = Object.keys(zip.files);

        // Look for Short-term memory.csv or Long-term memory.csv
        const shortTermFile = files.find(f => f.toLowerCase().includes('short-term') || f.toLowerCase().includes('short term'));
        const longTermFile = files.find(f => f.toLowerCase().includes('long-term') || f.toLowerCase().includes('long term'));

        // Prefer short-term (individual trips), fall back to long-term
        const dataFile = shortTermFile || longTermFile;
        if (!dataFile) {
          setModalConfig({ title: 'Error', message: t('upload.audiNoDataFile'), variant: 'danger' });
          return;
        }

        const content = await zip.files[dataFile].async('string');
        const { rows, vin } = parseAudiCSV(content);

        if (rows.length === 0) {
          setModalConfig({ title: 'Error', message: t('upload.audiParseError'), variant: 'danger' });
          return;
        }

        // Reset both start and charge, set start with Audi data
        setUploadStatus({
          start: {
            name: file.name,
            rows: rows.length,
            data: rows,
            model: 'Audi e-tron GT',
            isAudi: true,
            vin
          },
          charge: null
        });
      } catch (err) {
        setModalConfig({ title: 'Error', message: 'Error parsing ZIP file: ' + err.message, variant: 'danger' });
      }
      return;
    }

    // Handle regular CSV files (Porsche format)
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;

        // Check if this is actually an Audi CSV (in case user picked wrong upload area)
        if (isAudiFormat(text)) {
          const { rows, vin } = parseAudiCSV(text);
          if (rows.length > 0) {
            setUploadStatus({
              start: {
                name: file.name,
                rows: rows.length,
                data: rows,
                model: 'Audi e-tron GT',
                isAudi: true,
                vin
              },
              charge: null
            });
            return;
          }
        }

        const parsed = parseCSV(text);
        const model = extractVehicleModel(file.name);
        setUploadStatus(prev => ({ ...prev, [type]: { name: file.name, rows: parsed.length, data: parsed, model, isAudi: false } }));
      } catch (err) {
        setModalConfig({ title: 'Error', message: 'Error parsing file: ' + err.message, variant: 'danger' });
      }
    };
    reader.readAsText(file);
  }, [t]);

  const processUploadedFiles = useCallback(() => {
    if (!uploadStatus.start?.data) {
      setModalConfig({ title: t('upload.missingFile'), message: t('upload.missingFileDesc'), variant: 'danger' });
      return;
    }

    let finalStartData = uploadStatus.start.data;
    let finalChargeData = uploadStatus.charge?.data || [];
    let mergeStats = null;

    // Handle merge mode
    if (uploadMode === 'merge') {
      if (rawData.start.length > 0) {
        // We have raw data to merge with
        const startMerge = mergeRawData(rawData.start, uploadStatus.start.data);
        finalStartData = startMerge.merged;
        mergeStats = { start: startMerge.stats };

        if (uploadStatus.charge?.data && rawData.charge.length > 0) {
          const chargeMerge = mergeRawData(rawData.charge, uploadStatus.charge.data);
          finalChargeData = chargeMerge.merged;
          mergeStats.charge = chargeMerge.stats;
        } else if (uploadStatus.charge?.data) {
          finalChargeData = uploadStatus.charge.data;
        } else {
          finalChargeData = rawData.charge;
        }
      } else if (appData !== null) {
        // User has data but no raw data (old backup) - show warning and proceed as replace
        setModalConfig({
          title: t('upload.mergeUnavailable'),
          message: t('upload.mergeUnavailableDesc'),
          variant: 'warning'
        });
        // Still proceed with the upload as replace mode
      }
    }

    // Store raw data for future merges
    const newRawData = { start: finalStartData, charge: finalChargeData };
    setRawData(newRawData);
    safeStorage.set(STORAGE_KEYS.RAW_DATA, newRawData);

    // Process and store the computed data
    const processed = processUploadedData(finalStartData, finalChargeData);
    setAppData(processed);
    safeStorage.set(STORAGE_KEYS.DATA, processed);

    const model = uploadStatus.start?.model || uploadStatus.charge?.model || null;
    if (model) {
      setVehicleModel(model);
      safeStorage.set(STORAGE_KEYS.VEHICLE_MODEL, model);

      // Try to auto-detect vehicle from the model name and set battery capacity
      const guessedVehicle = guessVehicleFromString(model);
      if (guessedVehicle) {
        setSelectedVehicleId(guessedVehicle.id);
        setBatteryCapacity(guessedVehicle.usableBattery);
      }
    }

    // Show merge results
    if (mergeStats) {
      const newTrips = mergeStats.start.new;
      const duplicates = mergeStats.start.duplicates;
      const total = mergeStats.start.total;
      setModalConfig({
        title: t('upload.mergeComplete'),
        message: t('upload.mergeStats', { new: newTrips, duplicates, total }),
        variant: 'success'
      });
    }

    setShowUpload(false);
    setUploadStatus({ start: null, charge: null });
    setUploadMode('replace'); // Reset mode
  }, [uploadStatus, uploadMode, rawData, t]);

  const handleBackup = useCallback(() => {
    try {
      const backup = { version: 5, timestamp: new Date().toISOString(), data: appData, rawData, vehicleModel, settings: { electricityPrice, petrolPrice, petrolConsumption, batteryCapacity, unitSystem, currency, fuelConsFormat, elecConsFormat, language, selectedVehicleId, pressureUnit } };
      const modelSlug = vehicleModel ? vehicleModel.toLowerCase().replace(/\s+/g, '-') : 'porsche';
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const filename = `${modelSlug}-backup-${timestamp}.json`;
      downloadFile(JSON.stringify(backup, null, 2), filename);
    } catch (err) {
      setModalConfig({ title: 'Export Error', message: 'Failed to create backup: ' + err.message, variant: 'danger' });
    }
  }, [appData, rawData, vehicleModel, electricityPrice, petrolPrice, petrolConsumption, batteryCapacity, unitSystem, currency, fuelConsFormat, elecConsFormat, language, selectedVehicleId, pressureUnit]);

  const handleRestore = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        if (backup.data) { setAppData(backup.data); safeStorage.set(STORAGE_KEYS.DATA, backup.data); }
        if (backup.vehicleModel) { setVehicleModel(backup.vehicleModel); safeStorage.set(STORAGE_KEYS.VEHICLE_MODEL, backup.vehicleModel); }
        // Restore raw data if present (v4+ backups)
        if (backup.rawData) {
          setRawData(backup.rawData);
          safeStorage.set(STORAGE_KEYS.RAW_DATA, backup.rawData);
        } else if (backup.data?.rawTrips) {
          // Reconstruct raw data from older backups that have rawTrips
          const reconstructedRawData = {
            start: reconstructRawDataFromTrips(backup.data.rawTrips),
            charge: [] // Charge data not available in old backups
          };
          setRawData(reconstructedRawData);
          safeStorage.set(STORAGE_KEYS.RAW_DATA, reconstructedRawData);
        }
        if (backup.settings) {
          setElectricityPrice(backup.settings.electricityPrice ?? 0.25);
          setPetrolPrice(backup.settings.petrolPrice ?? 1.80);
          setPetrolConsumption(backup.settings.petrolConsumption ?? 8.0);
          setBatteryCapacity(backup.settings.batteryCapacity ?? 83.7);
          setUnitSystem(backup.settings.unitSystem ?? 'metric');
          setCurrency(backup.settings.currency ?? 'EUR');
          setFuelConsFormat(backup.settings.fuelConsFormat ?? 'L/100km');
          setElecConsFormat(backup.settings.elecConsFormat ?? 'kWh/100km');
          // Restore language setting if present (v2+ backups)
          if (backup.settings.language) {
            setLanguage(backup.settings.language);
          }
          // Restore selected vehicle ID if present (v3+ backups)
          if (backup.settings.selectedVehicleId) {
            setSelectedVehicleId(backup.settings.selectedVehicleId);
          }
          // Restore pressure unit if present (v5+ backups)
          if (backup.settings.pressureUnit) {
            setPressureUnit(backup.settings.pressureUnit);
          }
        }
        setModalConfig({ title: 'Success', message: 'Backup restored successfully!', variant: 'success' });
      } catch (err) {
        setModalConfig({ title: 'Error', message: 'Failed to restore: ' + err.message, variant: 'danger' });
      }
    };
    reader.readAsText(file);
  }, [setLanguage]);

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
        setRawData({ start: [], charge: [] });
        safeStorage.remove(STORAGE_KEYS.DATA);
        safeStorage.remove(STORAGE_KEYS.RAW_DATA);
        safeStorage.remove(STORAGE_KEYS.VEHICLE_MODEL);
        setShowSettings(false);
      }
    });
  }, []);

  // Handle Porsche Connect data import
  const handlePorscheConnectData = useCallback(({ trips, chargeData = [], vehicleInfo }) => {
    let finalData = trips;
    let finalChargeData = chargeData;
    let mergeStats = null;

    // Check if we should merge with existing data
    if (rawData.start.length > 0) {
      const existingFingerprints = new Set(
        rawData.start.map(trip => {
          const date = trip.date instanceof Date ? trip.date : new Date(trip.date);
          return `${date.toISOString().slice(0, 10)}|${trip.distance}|${trip.consumption}`;
        })
      );

      const newTrips = [];
      let duplicates = 0;

      for (const trip of trips) {
        const date = trip.date instanceof Date ? trip.date : new Date(trip.date);
        const fingerprint = `${date.toISOString().slice(0, 10)}|${trip.distance}|${trip.consumption}`;

        if (existingFingerprints.has(fingerprint)) {
          duplicates++;
        } else {
          newTrips.push(trip);
          existingFingerprints.add(fingerprint);
        }
      }

      finalData = [...rawData.start, ...newTrips];
      mergeStats = { new: newTrips.length, duplicates, total: finalData.length };

      // Deduplicate charge data using fingerprint (same logic as trips)
      if (rawData.charge.length > 0 && chargeData.length > 0) {
        const existingChargeFingerprints = new Set(
          rawData.charge.map(cycle => {
            const date = cycle.date instanceof Date ? cycle.date : new Date(cycle.date || cycle['arrival time']);
            return `${date.toISOString().slice(0, 10)}|${cycle.distance}|${cycle.consumption}`;
          })
        );
        const newChargeCycles = chargeData.filter(cycle => {
          const date = cycle.date instanceof Date ? cycle.date : new Date(cycle.date || cycle['arrival time']);
          const fingerprint = `${date.toISOString().slice(0, 10)}|${cycle.distance}|${cycle.consumption}`;
          return !existingChargeFingerprints.has(fingerprint);
        });
        finalChargeData = [...rawData.charge, ...newChargeCycles];
      } else if (rawData.charge.length > 0) {
        finalChargeData = rawData.charge;
      }
    }

    // Store raw data for future merges
    const newRawData = { start: finalData, charge: finalChargeData };
    setRawData(newRawData);
    safeStorage.set(STORAGE_KEYS.RAW_DATA, newRawData);

    // Process and store the computed data
    const processed = processUploadedData(finalData, finalChargeData);
    setAppData(processed);
    safeStorage.set(STORAGE_KEYS.DATA, processed);

    // Set vehicle model from API data
    const model = vehicleInfo.modelName || 'Porsche';
    setVehicleModel(model);
    safeStorage.set(STORAGE_KEYS.VEHICLE_MODEL, model);

    // Auto-detect vehicle from API info
    // Pass modelYear and batteryCapacity for more accurate matching
    const vehicleId = mapModelToVehicleId(
      vehicleInfo.modelName,
      vehicleInfo.engineType,
      vehicleInfo.modelYear,
      vehicleInfo.batteryCapacity  // Gross battery capacity from API
    );
    if (vehicleId) {
      setSelectedVehicleId(vehicleId);
      safeStorage.set(STORAGE_KEYS.VEHICLE_ID, vehicleId);
      const vehicle = getVehicleById(vehicleId);
      if (vehicle) {
        setBatteryCapacity(vehicle.usableBattery);
        safeStorage.set(STORAGE_KEYS.BATTERY_CAPACITY, vehicle.usableBattery);
      }
    }

    // Show results
    if (mergeStats) {
      setModalConfig({
        title: t('porscheConnect.syncComplete'),
        message: t('porscheConnect.syncMergeStats', {
          new: mergeStats.new,
          duplicates: mergeStats.duplicates,
          total: mergeStats.total
        }),
        variant: 'success'
      });
    } else {
      setModalConfig({
        title: t('porscheConnect.syncComplete'),
        message: t('porscheConnect.syncStats', {
          new: trips.length,
          model: vehicleInfo.modelName || 'Porsche'
        }),
        variant: 'success'
      });
    }
  }, [rawData, t]);

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

      {/* Auto-sync Status Indicator */}
      {autoSyncStatus && (
        <div className={`fixed top-16 right-4 z-50 px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm transition-all ${
          autoSyncStatus === 'new_data'
            ? (darkMode ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border border-emerald-200')
            : (darkMode ? 'bg-zinc-800 text-zinc-300 border border-zinc-700' : 'bg-white text-zinc-600 border border-zinc-200')
        }`}>
          {autoSyncStatus === 'checking' && (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{t('porscheConnect.checkingForUpdates')}</span>
            </>
          )}
          {autoSyncStatus === 'syncing' && (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{t('porscheConnect.syncing')}</span>
            </>
          )}
          {autoSyncStatus === 'new_data' && (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('porscheConnect.newDataSynced')}</span>
            </>
          )}
        </div>
      )}

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
          hasExistingData={rawData.start.length > 0 || appData !== null}
          uploadMode={uploadMode}
          setUploadMode={setUploadMode}
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

      {/* Porsche Connect Modal */}
      <PorscheConnectModal
        darkMode={darkMode}
        show={showPorscheConnect}
        onClose={() => setShowPorscheConnect(false)}
        onDataLoaded={handlePorscheConnectData}
        onError={(error) => setModalConfig({ title: t('common.error'), message: error, variant: 'danger' })}
      />

      {/* Main Layout Container */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar
          darkMode={darkMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />

        {/* Main Content */}
        <main className="flex-1 px-4 py-6">
          {/* Settings Page */}
          {showSettings && (
            <SettingsPage
              darkMode={darkMode}
              themeMode={themeMode}
              setThemeMode={setThemeMode}
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
              selectedVehicleId={selectedVehicleId}
              setSelectedVehicleId={setSelectedVehicleId}
              pressureUnit={pressureUnit}
              setPressureUnit={setPressureUnit}
              setShowUpload={setShowUpload}
              setShowPorscheConnect={setShowPorscheConnect}
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
              setShowPorscheConnect={setShowPorscheConnect}
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

              {activeTab === 'myCar' && (
                <MyCarTab
                  darkMode={darkMode}
                  units={units}
                  vehicleData={liveVehicleData}
                  onConnect={() => setShowPorscheConnect(true)}
                  availableVehicles={availableVehicles}
                  selectedVin={selectedConnectVin}
                  onVehicleChange={setSelectedConnectVin}
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
