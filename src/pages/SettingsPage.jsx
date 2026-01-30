import { UNIT_SYSTEMS, CURRENCIES, FUEL_CONSUMPTION_FORMATS, ELECTRIC_CONSUMPTION_FORMATS } from '../constants/units';

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
  setShowUpload,
  handleClearData,
  handleBackup,
  handleRestore
}) {
  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Units & Currency */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Units & Currency</h3>
          <div className="space-y-3">
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Unit System</label>
              <select value={unitSystem} onChange={(e) => setUnitSystem(e.target.value)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`}>
                {Object.entries(UNIT_SYSTEMS).map(([key, sys]) => (
                  <option key={key} value={key}>{sys.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`}>
                {Object.entries(CURRENCIES).map(([key, curr]) => (
                  <option key={key} value={key}>{curr.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Fuel Consumption</label>
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
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Electric Consumption</label>
              <select
                value={elecConsFormat}
                onChange={(e) => setElecConsFormat(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`}
              >
                {(unitSystem.startsWith('imperial') ? ELECTRIC_CONSUMPTION_FORMATS.imperial : ELECTRIC_CONSUMPTION_FORMATS.metric).map(fmt => (
                  <option key={fmt.id} value={fmt.id}>{fmt.label}</option>
                ))}
              </select>
            </div>
            <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Distance: {UNIT_SYSTEMS[unitSystem].distance} | Speed: {UNIT_SYSTEMS[unitSystem].speed}
            </p>
          </div>
        </div>

        {/* Cost Settings */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Cost Settings</h3>
          <div className="space-y-3">
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Electricity ({CURRENCIES[currency].symbol}/kWh)</label>
              <input type="number" step="0.01" value={electricityPrice} onChange={(e) => setElectricityPrice(parseFloat(e.target.value) || 0)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`} />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Petrol ({CURRENCIES[currency].symbol}/{unitSystem === 'metric' ? 'L' : 'gal'})</label>
              <input type="number" step="0.01" value={petrolPrice} onChange={(e) => setPetrolPrice(parseFloat(e.target.value) || 0)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`} />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Petrol Consumption ({fuelConsFormat})</label>
              <input type="number" step="0.1" value={petrolConsumption} onChange={(e) => setPetrolConsumption(parseFloat(e.target.value) || 0)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`} />
            </div>
          </div>
        </div>

        {/* Vehicle Settings */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Vehicle Settings</h3>
          <div className="space-y-3">
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Usable Battery Capacity (kWh)</label>
              <input type="number" step="0.1" value={batteryCapacity} onChange={(e) => setBatteryCapacity(parseFloat(e.target.value) || 83.7)} className={`w-full px-3 py-2 rounded-lg text-sm focus:border-sky-500 outline-none ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'} border`} />
            </div>
            <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Used for range calculations. Common values: 71 kWh (base), 83.7 kWh (Performance Battery Plus)
            </p>
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
  );
}
