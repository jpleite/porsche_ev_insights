import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { ChartCard } from '../common/ChartCard';
import { TimeViewSelector } from '../common/TimeViewSelector';
import { getXAxisConfig } from '../../utils/chartHelpers';
import { useTranslation } from '../../i18n';

export function EfficiencyTab({
  data,
  units,
  darkMode,
  chartColors,
  timeView,
  setTimeView,
  timeViewData,
  convertedTripTypes,
  convertedSpeedEfficiency,
  elecConsDomain,
  unitSystem
}) {
  const { t } = useTranslation();
  const xAxisConfig = getXAxisConfig(timeView, timeViewData.length);

  return (
    <div className="space-y-5">
      {/* Best/Worst Trip Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
          <p className={`text-3xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            {data.bestTrip ? units.elecCons(data.bestTrip.consumption).value : '—'}
          </p>
          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{t('efficiency.bestEfficiency')} {units.elecConsUnit}</p>
          {data.bestTrip && (
            <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              {data.bestTrip.date} • {units.dist(data.bestTrip.distance).formatted} @ {units.speed(data.bestTrip.speed).formatted}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-zinc-800/50 border border-zinc-700' : 'bg-zinc-100 border border-zinc-200'}`}>
          <p className={`text-3xl font-bold ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
            {units.elecCons(data.summary.avgConsumption).value}
          </p>
          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{t('efficiency.avgEfficiency')} {units.elecConsUnit}</p>
        </div>
        <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
          <p className={`text-3xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            {data.worstTrip ? units.elecCons(data.worstTrip.consumption).value : '—'}
          </p>
          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{t('efficiency.worstEfficiency')} {units.elecConsUnit}</p>
          {data.worstTrip && (
            <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              {data.worstTrip.date} • {units.dist(data.worstTrip.distance).formatted} @ {units.speed(data.worstTrip.speed).formatted}
            </p>
          )}
        </div>
      </div>

      {/* Time View Selector */}
      <TimeViewSelector timeView={timeView} setTimeView={setTimeView} darkMode={darkMode} />

      {/* Consumption Trend - Full Width */}
      <ChartCard darkMode={darkMode} title={t('efficiency.consumptionTrend')}>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={timeViewData} margin={{ bottom: xAxisConfig.height - 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis
              dataKey="label"
              stroke={chartColors.axis}
              fontSize={10}
              interval={xAxisConfig.interval}
              angle={xAxisConfig.angle}
              textAnchor={xAxisConfig.textAnchor}
              height={xAxisConfig.height}
              dy={xAxisConfig.dy}
            />
            <YAxis stroke={chartColors.axis} fontSize={11} width={40} domain={elecConsDomain} />
            <Tooltip
              contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }}
              itemStyle={{ color: chartColors.tooltipText }}
              labelStyle={{ color: chartColors.tooltipText }}
            />
            <Legend />
            <Line type="monotone" dataKey="avgConsumption" name={units.elecConsUnit} stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Efficiency by Speed Range */}
        <ChartCard darkMode={darkMode} title={t('efficiency.consumptionBySpeed')}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={convertedSpeedEfficiency}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="range" stroke={chartColors.axis} fontSize={10} />
              <YAxis stroke={chartColors.axis} fontSize={11} width={40} domain={elecConsDomain} />
              <Tooltip
                contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }}
                itemStyle={{ color: chartColors.tooltipText }}
                labelStyle={{ color: chartColors.tooltipText }}
                formatter={(value, name) => name === 'consumption' ? [`${value} ${units.elecConsUnit}`, t('charts.consumption')] : [`${value} ${t('common.trips')}`, t('charts.trips')]}
              />
              <Bar dataKey="consumption" name="consumption" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className={`text-sm mt-2 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
            {t('efficiency.optimalSpeed')}: {unitSystem === 'metric' ? '40-80 km/h' : '25-50 mph'}
          </p>
        </ChartCard>

        {/* Seasonal Efficiency */}
        {data.seasonalData && data.seasonalData.length > 0 && (
          <ChartCard darkMode={darkMode} title={t('battery.seasonalVariation')}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data.seasonalData.map(s => ({ ...s, season: t(`seasons.${s.season?.toLowerCase?.() || s.season}`), consumption: units.elecCons(s.consumption).value }))}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="season" stroke={chartColors.axis} fontSize={11} />
                <YAxis stroke={chartColors.axis} fontSize={11} width={40} domain={elecConsDomain} />
                <Tooltip
                  contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }}
                  itemStyle={{ color: chartColors.tooltipText }}
                  labelStyle={{ color: chartColors.tooltipText }}
                  formatter={(value, name) => name === 'consumption' ? [`${value} ${units.elecConsUnit}`, t('charts.consumption')] : [`${value}`, name]}
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
      <ChartCard darkMode={darkMode} title={t('efficiency.consumptionByTripType')}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={convertedTripTypes}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="type" stroke={chartColors.axis} fontSize={9} />
            <YAxis stroke={chartColors.axis} fontSize={11} width={40} domain={elecConsDomain} />
            <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
            <Bar dataKey="consumption" name={units.elecConsUnit} radius={[4, 4, 0, 0]}>
              {convertedTripTypes.map((entry, i) => <Cell key={`cell-${i}`} fill={entry.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
