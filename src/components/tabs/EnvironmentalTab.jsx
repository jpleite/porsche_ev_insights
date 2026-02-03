import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StatCard } from '../common/StatCard';
import { ChartCard } from '../common/ChartCard';
import { precise } from '../../utils/precise';
import { unitConvert } from '../../utils/unitConvert';
import { TAYCAN_SPECS } from '../../constants/taycanSpecs';
import { MI_TO_KM } from '../../constants/units';
import { useTranslation } from '../../i18n';

export function EnvironmentalTab({
  data,
  units,
  darkMode,
  chartColors,
  environmental,
  petrolConsumption,
  unitSystem,
  fuelConsFormat
}) {
  const { t } = useTranslation();
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
    petrolConsL100km = petrolConsumption;
  }
  return (
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
              {environmental.co2SavedKg} kg {t('environmental.co2SavedLabel')}
            </h2>
            <p className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {t('environmental.treesEquivalent')}: {environmental.treesEquivalent} {t('environmental.treesPerYear')}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
            <p className="text-xs text-zinc-500">{t('environmental.youProduced')}</p>
            <p className={`text-lg font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{environmental.co2Electric} kg</p>
            <p className="text-xs text-zinc-500">{unitSystem === 'metric' ? environmental.co2PerKmElectric : precise.round(environmental.co2PerKmElectric * MI_TO_KM, 1)} g/{units.distUnit}</p>
          </div>
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
            <p className="text-xs text-zinc-500">{t('environmental.petrolWouldProduce')}</p>
            <p className={`text-lg font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{environmental.co2Petrol} kg</p>
            <p className="text-xs text-zinc-500">{unitSystem === 'metric' ? environmental.co2PerKmPetrol : precise.round(environmental.co2PerKmPetrol * MI_TO_KM, 1)} g/{units.distUnit}</p>
          </div>
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
            <p className="text-xs text-zinc-500">{t('environmental.reductionPercentage')}</p>
            <p className={`text-lg font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{environmental.reductionPct}%</p>
            <p className="text-xs text-zinc-500">{t('environmental.vsElectric')}</p>
          </div>
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
            <p className="text-xs text-zinc-500">{t('environmental.litersAvoided')}</p>
            <p className={`text-lg font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>{units.vol(environmental.litersAvoided).formatted}</p>
            <p className="text-xs text-zinc-500">petrol</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard darkMode={darkMode} label={t('environmental.co2Saved')} value={`${environmental.co2SavedKg} kg`} subtitle={`${environmental.co2SavedTons} ${t('environmental.tonsCo2')}`} color="emerald" />
        <StatCard darkMode={darkMode} label={t('environmental.treesEquivalent')} value={environmental.treesEquivalent} subtitle={t('environmental.treesPerYear')} color="teal" />
        <StatCard darkMode={darkMode} label={t('environmental.co2Electric')} value={`${unitSystem === 'metric' ? environmental.co2PerKmElectric : precise.round(environmental.co2PerKmElectric * MI_TO_KM, 1)} g/${units.distUnit}`} subtitle={t('environmental.electricGrid')} color="blue" />
        <StatCard darkMode={darkMode} label={t('environmental.co2Petrol')} value={`${unitSystem === 'metric' ? environmental.co2PerKmPetrol : precise.round(environmental.co2PerKmPetrol * MI_TO_KM, 1)} g/${units.distUnit}`} subtitle={t('environmental.ifPetrol')} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard darkMode={darkMode} title={t('environmental.emissionsComparison')}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.monthlyData.map(m => {
              const energy = precise.mul(precise.div(m.distance, 100), m.consumption);
              const co2Elec = precise.round(precise.div(precise.mul(energy, TAYCAN_SPECS.co2PerKwhPortugal), 1000), 1);
              const liters = precise.mul(precise.div(m.distance, 100), petrolConsL100km);
              const co2Pet = precise.round(precise.div(precise.mul(liters, TAYCAN_SPECS.co2PerLiterPetrol), 1000), 1);
              return { ...m, month: t(`months.${m.month?.toLowerCase?.() || m.month}`), co2Electric: co2Elec, co2Petrol: co2Pet };
            })}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="month" stroke={chartColors.axis} fontSize={11} />
              <YAxis stroke={chartColors.axis} fontSize={11} width={40} />
              <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} formatter={(v) => `${v} kg`} />
              <Legend />
              <Bar dataKey="co2Electric" name={`${t('environmental.co2Electric')} (kg)`} fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="co2Petrol" name={`${t('environmental.co2Petrol')} (kg)`} fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard darkMode={darkMode} title={`${t('environmental.co2Saved')} (${t('charts.total')})`}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data.monthlyData.reduce((acc, m, i) => {
              const energy = precise.mul(precise.div(m.distance, 100), m.consumption);
              const co2Elec = precise.mul(energy, TAYCAN_SPECS.co2PerKwhPortugal);
              const liters = precise.mul(precise.div(m.distance, 100), petrolConsL100km);
              const co2Pet = precise.mul(liters, TAYCAN_SPECS.co2PerLiterPetrol);
              const saved = precise.sub(co2Pet, co2Elec);
              const prev = i > 0 ? acc[i - 1].cumRaw : 0;
              const cumRaw = precise.add(prev, saved);
              return [...acc, { ...m, month: t(`months.${m.month?.toLowerCase?.() || m.month}`), cumulative: Math.round(cumRaw / 1000), cumRaw }];
            }, [])}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="month" stroke={chartColors.axis} fontSize={11} />
              <YAxis stroke={chartColors.axis} fontSize={11} width={40} />
              <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} formatter={(v) => `${v} kg`} />
              <Area type="monotone" dataKey="cumulative" name={`${t('environmental.co2Saved')} (kg)`} stroke="#22c55e" fill="#22c55e44" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Environmental Context */}
      <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <h3 className={`font-medium mb-3 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{t('environmental.carbonFootprint')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <p className="mb-2"><strong className={darkMode ? 'text-emerald-400' : 'text-emerald-600'}>Grid emissions:</strong> ~164g CO₂/kWh</p>
            <p><strong className={darkMode ? 'text-amber-400' : 'text-amber-600'}>Petrol baseline:</strong> {units.fuelCons(petrolConsumption).formatted}, ~2.31kg CO₂/L</p>
          </div>
          <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <p className="mb-2"><strong className={darkMode ? 'text-blue-400' : 'text-blue-600'}>{t('environmental.treesEquivalent')}:</strong> {environmental.treesEquivalent} {t('environmental.treesPerYear')}</p>
            <p><strong className={darkMode ? 'text-teal-400' : 'text-teal-600'}>{t('environmental.litersAvoided')}:</strong> {units.vol(environmental.litersAvoided).formatted}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
