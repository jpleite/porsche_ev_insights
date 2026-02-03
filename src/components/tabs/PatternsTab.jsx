import { BarChart, Bar, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { ChartCard } from '../common/ChartCard';
import { TimeViewSelector } from '../common/TimeViewSelector';
import { getXAxisConfig } from '../../utils/chartHelpers';
import { useTranslation } from '../../i18n';

export function PatternsTab({
  data,
  units,
  darkMode,
  chartColors,
  timeView,
  setTimeView,
  timeViewData,
  convertedDayData
}) {
  const { t } = useTranslation();
  const xAxisConfig = getXAxisConfig(timeView, timeViewData.length);

  return (
    <div className="space-y-5">
      {/* Time View Selector */}
      <TimeViewSelector timeView={timeView} setTimeView={setTimeView} darkMode={darkMode} />

      {/* Distance Over Time */}
      <ChartCard darkMode={darkMode} title={`${t('patterns.distanceOverTime')} (${t(`timeView.${timeView}`)})`}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={timeViewData} margin={{ bottom: xAxisConfig.height - 30 }}>
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
            <YAxis stroke={chartColors.axis} fontSize={11} width={40} />
            <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
            <Area type="monotone" dataKey="distance" name={`${t('charts.distance')} (${units.distUnit})`} stroke="#f59e0b" fill="#f59e0b44" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard darkMode={darkMode} title={t('patterns.tripsPerHour')}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data.hourData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="hour" stroke={chartColors.axis} fontSize={11} />
              <YAxis stroke={chartColors.axis} fontSize={11} width={40} />
              <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
              <Area type="monotone" dataKey="trips" name={t('charts.trips')} stroke="#3b82f6" fill="#3b82f644" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard darkMode={darkMode} title={t('patterns.tripsAndDistance')}>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={convertedDayData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="day" stroke={chartColors.axis} fontSize={11} />
              <YAxis yAxisId="left" stroke={chartColors.axis} fontSize={11} width={35} />
              <YAxis yAxisId="right" orientation="right" stroke={chartColors.axis} fontSize={11} width={35} />
              <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
              <Legend />
              <Bar yAxisId="left" dataKey="trips" name={t('charts.trips')} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="avgDist" name={`${t('charts.average')} ${units.distUnit}`} stroke="#f59e0b" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Day of Week Average Distance */}
      <ChartCard darkMode={darkMode} title={t('patterns.avgDistancePerDay')}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={convertedDayData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="day" stroke={chartColors.axis} fontSize={11} />
            <YAxis stroke={chartColors.axis} fontSize={11} width={40} />
            <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
            <Bar dataKey="avgDist" name={`${t('charts.average')} ${units.distUnit}/${t('common.trip')}`} fill="#3b82f6" radius={[4, 4, 0, 0]}>
              {convertedDayData.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={entry.dayKey === 'sat' ? '#f59e0b' : '#3b82f6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className={`text-sm mt-2 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
          {t('patterns.weekdayVsWeekend')}
        </p>
      </ChartCard>
    </div>
  );
}
