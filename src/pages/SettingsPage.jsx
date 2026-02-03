import { useState, useEffect } from 'react';
import { UNIT_SYSTEMS, CURRENCIES, FUEL_CONSUMPTION_FORMATS, ELECTRIC_CONSUMPTION_FORMATS } from '../constants/units';
import { PORSCHE_EV_MODELS, getVehicleById, getVehiclesGrouped } from '../constants/porscheEvModels';
import { useTranslation, SUPPORTED_LANGUAGES } from '../i18n';
import { getStoredSession, logout } from '../services/porscheConnect';

export function SettingsPage({
  darkMode,
  appData,
  unitSystem,
  setUnitSystem,
  currency,
  setCurrency,
  fuelConsFormat,
  setFuelConsFormat,
  elecConsFormat,
  setElecConsFormat,
  electricityPrice,
  setElectricityPrice,
  petrolPrice,
  setPetrolPrice,
  petrolConsumption,
  setPetrolConsumption,
  batteryCapacity,
  setBatteryCapacity,
  selectedVehicleId,
  setSelectedVehicleId,
  setShowUpload,
  setShowPorscheConnect,
  handleClearData,
  handleBackup,
  handleRestore
}) {
  const { t, language, setLanguage } = useTranslation();
  const [porscheConnected, setPorscheConnected] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Check Porsche Connect session status
  useEffect(() => {
    setPorscheConnected(!!getStoredSession());
  }, []);

  // Handle Porsche Connect logout
  const handlePorscheLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      setPorscheConnected(false);
    } finally {
      setLoggingOut(false);
    }
  };

  // Get grouped vehicles for the dropdown
  const vehicleGroups = getVehiclesGrouped();

  // Handle vehicle selection change
  const handleVehicleChange = (e) => {
    const vehicleId = e.target.value;
    setSelectedVehicleId(vehicleId || null);

    // Auto-fill battery capacity when vehicle is selected
    if (vehicleId) {
      const vehicle = getVehicleById(vehicleId);
      if (vehicle) {
        setBatteryCapacity(vehicle.usableBattery);
      }
    }
  };

  // Get selected vehicle for displaying WLTP info
  const selectedVehicle = selectedVehicleId ? getVehicleById(selectedVehicleId) : null;

  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{t('settings.title')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Vehicle Settings */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{t('settings.vehicleSettings')}</h3>
          <div className="space-y-3">
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{t('settings.vehicleModel')}</label>
              <select
                value={selectedVehicleId || ''}
                onChange={handleVehicleChange}
                className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`}
              >
                <option value="">{t('settings.selectVehicle')}</option>
                {Object.entries(vehicleGroups).map(([groupName, vehicles]) => (
                  vehicles.length > 0 && (
                    <optgroup key={groupName} label={groupName}>
                      {vehicles.map(v => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                      ))}
                    </optgroup>
                  )
                ))}
              </select>
            </div>
            {selectedVehicle && (
              <div className={`p-2 rounded-lg text-xs ${darkMode ? 'bg-zinc-800/50 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}>
                <div className="flex justify-between mb-1">
                  <span>{t('settings.grossBattery')}:</span>
                  <span className="font-medium">{selectedVehicle.grossBattery} kWh</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>{t('settings.usableBatterySpec')}:</span>
                  <span className="font-medium">{selectedVehicle.usableBattery} kWh</span>
                </div>
                {unitSystem === 'imperial_us' ? (
                  <>
                    <div className="flex justify-between mb-1">
                      <span>{t('settings.epaRange')}:</span>
                      <span className="font-medium">{selectedVehicle.epaRange} mi</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('settings.epaMpge')}:</span>
                      <span className="font-medium">{selectedVehicle.epaMpge} MPGe</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between mb-1">
                      <span>{t('settings.wltpRange')}:</span>
                      <span className="font-medium">{selectedVehicle.wltpRange} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('settings.wltpConsumption')}:</span>
                      <span className="font-medium">{selectedVehicle.wltpConsumption} kWh/100km</span>
                    </div>
                  </>
                )}
              </div>
            )}
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{t('settings.batteryCapacity')}</label>
              <input type="number" step="0.1" value={batteryCapacity} onChange={(e) => setBatteryCapacity(parseFloat(e.target.value) || 83.7)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`} />
            </div>
            <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              {t('settings.batteryCapacityHelp')}
            </p>
          </div>
        </div>

        {/* Language & Units */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{t('settings.languageAndUnits')}</h3>
          <div className="space-y-3">
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{t('settings.languageLabel')}</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`}
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.nativeName} ({lang.name})</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{t('settings.unitSystem')}</label>
              <select value={unitSystem} onChange={(e) => setUnitSystem(e.target.value)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`}>
                {Object.entries(UNIT_SYSTEMS).map(([key]) => (
                  <option key={key} value={key}>{t(`unitSystems.${key}`)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{t('settings.currency')}</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`}>
                {Object.entries(CURRENCIES).map(([key, curr]) => (
                  <option key={key} value={key}>{curr.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{t('settings.fuelConsumption')}</label>
              <select
                value={fuelConsFormat}
                onChange={(e) => setFuelConsFormat(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`}
                disabled={unitSystem.startsWith('imperial')}
              >
                {(unitSystem.startsWith('imperial') ? FUEL_CONSUMPTION_FORMATS.imperial : FUEL_CONSUMPTION_FORMATS.metric).map(fmt => (
                  <option key={fmt.id} value={fmt.id}>{fmt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{t('settings.electricConsumption')}</label>
              <select
                value={elecConsFormat}
                onChange={(e) => setElecConsFormat(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`}
              >
                {(unitSystem === 'imperial_us'
                  ? ELECTRIC_CONSUMPTION_FORMATS.imperial_us
                  : unitSystem === 'imperial_uk'
                    ? ELECTRIC_CONSUMPTION_FORMATS.imperial
                    : ELECTRIC_CONSUMPTION_FORMATS.metric
                ).map(fmt => (
                  <option key={fmt.id} value={fmt.id}>{fmt.label}</option>
                ))}
              </select>
            </div>
            <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              {t('settings.distanceUnit')}: {UNIT_SYSTEMS[unitSystem].distance} | {t('settings.speedUnit')}: {UNIT_SYSTEMS[unitSystem].speed}
            </p>
          </div>
        </div>

        {/* Cost Settings */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{t('settings.costSettings')}</h3>
          <div className="space-y-3">
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{t('settings.electricityPrice')} ({CURRENCIES[currency].symbol}/kWh)</label>
              <input type="number" step="0.01" value={electricityPrice} onChange={(e) => setElectricityPrice(parseFloat(e.target.value) || 0)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`} />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{t('settings.petrolPrice')} ({CURRENCIES[currency].symbol}/{unitSystem === 'imperial_us' ? 'gal' : 'L'})</label>
              <input type="number" step="0.01" value={petrolPrice} onChange={(e) => setPetrolPrice(parseFloat(e.target.value) || 0)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`} />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{t('settings.petrolConsumption')} ({fuelConsFormat})</label>
              <input type="number" step="0.1" value={petrolConsumption} onChange={(e) => setPetrolConsumption(parseFloat(e.target.value) || 0)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`} />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{t('settings.dataManagement')}</h3>
          <div className="space-y-3">
            <button onClick={() => setShowUpload(true)} className="w-full px-3 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-colors"><span className="inline-flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>{t('settings.uploadCsvFiles')}</span></button>
            {appData && (
              <button onClick={handleClearData} className="w-full px-3 py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-medium border border-red-500/20 transition-colors">{t('settings.clearAllData')}</button>
            )}
          </div>
        </div>

        {/* Porsche Connect */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{t('settings.porscheConnect')}</h3>
          <div className="space-y-3">
            {porscheConnected ? (
              <>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{t('settings.porscheConnected')}</span>
                </div>
                <button
                  onClick={() => setShowPorscheConnect(true)}
                  className={`w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900'}`}
                >
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    {t('settings.syncData')}
                  </span>
                </button>
                <button
                  onClick={handlePorscheLogout}
                  disabled={loggingOut}
                  className="w-full px-3 py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-medium border border-red-500/20 transition-colors disabled:opacity-50"
                >
                  {loggingOut ? t('common.loading') : t('settings.porscheLogout')}
                </button>
              </>
            ) : (
              <>
                <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {t('settings.porscheConnectDesc')}
                </p>
                <button
                  onClick={() => setShowPorscheConnect(true)}
                  className="w-full px-3 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                    {t('settings.connectToPorsche')}
                  </span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Backup & Restore */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{t('settings.backupRestore')}</h3>
          <div className="space-y-3">
            <button onClick={handleBackup} disabled={!appData} className={`w-full px-3 py-2.5 rounded-lg disabled:opacity-50 text-sm font-medium transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900'}`}><span className="inline-flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>{t('settings.downloadBackup')}</span></button>
            <label className={`w-full px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center cursor-pointer transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900'}`}>
              <span className="inline-flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>{t('settings.restoreBackup')}</span>
              <input type="file" accept=".json" className="hidden" onChange={(e) => e.target.files[0] && handleRestore(e.target.files[0])} />
            </label>
          </div>
        </div>
      </div>

      {/* Vehicle Specs Notes */}
      <div className={`p-4 rounded-xl ${darkMode ? 'bg-sky-500/5 border-sky-500/20' : 'bg-sky-500/10 border-sky-500/30'} border`}>
        <div className="flex items-start gap-3">
          <span className={`${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </span>
          <div>
            <h4 className={`font-semibold text-sm mb-2 ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>{t('settings.vehicleNotesTitle')}</h4>
            <ul className={`text-xs space-y-1 ${darkMode ? 'text-sky-400/80' : 'text-sky-600'}`}>
              {unitSystem === 'imperial_us' ? (
                <>
                  <li><span className="font-medium">EPA</span>: {t('settings.noteEpa')}</li>
                  <li><span className="font-medium">MPGe</span>: {t('settings.noteMpge')}</li>
                </>
              ) : (
                <li><span className="font-medium">WLTP</span>: {t('settings.noteWltp')}</li>
              )}
              <li><span className="font-medium">PB</span>: {t('settings.notePb')}</li>
              <li><span className="font-medium">PB+</span>: {t('settings.notePbPlus')}</li>
              <li><span className="font-medium">J1.1</span>: {t('settings.noteJ11')}</li>
              <li><span className="font-medium">J1.2</span>: {t('settings.noteJ12')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className={`p-4 rounded-xl ${darkMode ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-500/10 border-emerald-500/30'} border`}>
        <div className="flex items-start gap-3">
          <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg></span>
          <div>
            <h4 className={`font-semibold text-sm mb-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>{t('settings.privacyNoticeTitle')}</h4>
            <p className={`text-xs ${darkMode ? 'text-emerald-400/80' : 'text-emerald-600'}`}>{t('settings.privacyNoticeText')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
