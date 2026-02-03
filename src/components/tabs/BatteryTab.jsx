import { BarChart, Bar, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { StatCard } from '../common/StatCard';
import { ChartCard } from '../common/ChartCard';
import { useTranslation } from '../../i18n';

export function BatteryTab({
  data,
  units,
  darkMode,
  chartColors,
  batteryAnalysis,
  chargingOptimization,
  benchmarks,
  elecConsDomain
}) {
  const { t } = useTranslation();

  // Determine the official standard label (EPA for US, WLTP otherwise)
  const officialLabel = batteryAnalysis?.useEpa ? 'EPA' : 'WLTP';

  return (
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
              {units.dist(batteryAnalysis.realWorldRange).formatted} {t('battery.realWorldRange')}
            </h2>
            <p className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {batteryAnalysis.rangeEfficiency}% {t('battery.vsOfficialRange')} {units.dist(batteryAnalysis.officialRange).formatted}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
            <p className="text-xs text-zinc-500">{t('battery.energyPerTrip')}</p>
            <p className={`text-lg font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{batteryAnalysis.energyPerTrip} kWh</p>
            <p className="text-xs text-zinc-500">{batteryAnalysis.batteryPerTrip}% {t('battery.batteryPerTrip')}</p>
          </div>
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
            <p className="text-xs text-zinc-500">{t('battery.tripsPerCharge')}</p>
            <p className={`text-lg font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{batteryAnalysis.tripsPerFullCharge}</p>
            <p className="text-xs text-zinc-500">max</p>
          </div>
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
            <p className="text-xs text-zinc-500">{t('battery.distancePerCharge')}</p>
            <p className={`text-lg font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{units.dist(batteryAnalysis.distancePerCharge).value} {units.distUnit}</p>
            <p className="text-xs text-zinc-500">{t('charts.average')}</p>
          </div>
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-900/50' : 'bg-white/70'}`}>
            <p className="text-xs text-zinc-500">{t('battery.consumptionVsOfficial')}</p>
            <p className={`text-lg font-bold ${batteryAnalysis.consumptionVsOfficial > 0 ? (darkMode ? 'text-amber-400' : 'text-amber-600') : (darkMode ? 'text-emerald-400' : 'text-emerald-600')}`}>
              {batteryAnalysis.consumptionVsOfficial > 0 ? '+' : ''}{batteryAnalysis.consumptionVsOfficial}%
            </p>
            <p className="text-xs text-zinc-500">{t('charts.consumption')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard darkMode={darkMode} label={t('charts.best')} value={units.elecCons(batteryAnalysis.bestMonth).formatted} subtitle={t('charts.consumption')} color="emerald" />
        <StatCard darkMode={darkMode} label={t('charts.worst')} value={units.elecCons(batteryAnalysis.worstMonth).formatted} subtitle={t('charts.consumption')} color="red" />
        <StatCard darkMode={darkMode} label={t('battery.seasonalVariation')} value={`+${batteryAnalysis.seasonalVariation}%`} subtitle={`${t('battery.winterRange')} vs ${t('battery.summerRange')}`} color="sky" />
        <StatCard darkMode={darkMode} label={t('battery.fullCycles')} value={chargingOptimization?.batteryFullCycles || 0} subtitle={t('battery.batteryHealth')} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard darkMode={darkMode} title={t('efficiency.consumptionTrend')}>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={data.monthlyData.map(m => ({ ...m, month: t(`months.${m.month?.toLowerCase?.() || m.month}`), consumption: units.elecCons(m.consumption).value }))}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="month" stroke={chartColors.axis} fontSize={11} />
              <YAxis stroke={chartColors.axis} fontSize={11} width={40} domain={elecConsDomain} />
              <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
              <Legend />
              <Area type="monotone" dataKey="consumption" name={units.elecConsUnit} stroke="#8b5cf6" fill="#8b5cf644" strokeWidth={2} />
              <Line type="monotone" dataKey={() => units.elecCons(batteryAnalysis.officialConsumption).value} name={officialLabel} stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        {benchmarks && (
          <ChartCard darkMode={darkMode} title={t('insights.competitorComparison')}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={benchmarks.competitors.map(c => ({ ...c, consumption: units.elecCons(c.consumption).value }))} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis type="number" stroke={chartColors.axis} fontSize={11} domain={elecConsDomain} />
                <YAxis dataKey="name" type="category" stroke={chartColors.axis} fontSize={10} width={80} />
                <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} formatter={(v) => `${v} ${units.elecConsUnit}`} />
                <Bar dataKey="consumption" name={t('charts.consumption')} radius={[0, 4, 4, 0]}>
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
          <h3 className={`font-medium mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{t('battery.chargingOptimization')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
              <p className="text-xs text-zinc-500">{t('battery.chargesPerWeek')}</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{chargingOptimization.chargesPerWeek}</p>
            </div>
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
              <p className="text-xs text-zinc-500">{t('battery.energyPerCharge')}</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{chargingOptimization.energyPerCharge} kWh</p>
            </div>
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
              <p className="text-xs text-zinc-500">{t('battery.socUsedPerCycle')}</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{chargingOptimization.socUsedPerCycle}%</p>
            </div>
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
              <p className="text-xs text-zinc-500">{t('battery.chargingLosses')}</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>~{chargingOptimization.chargingLosses} kWh</p>
            </div>
          </div>
          <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'} border`}>
            <p className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
              <span className="inline-flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg><strong>{t('battery.offPeakSavings')}:</strong></span> {t('battery.potentialSavings')}: <strong>{units.money(chargingOptimization.potentialOffPeakSavings)}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
