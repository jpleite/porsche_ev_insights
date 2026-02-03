import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { StatCard } from '../common/StatCard';
import { ChartCard } from '../common/ChartCard';
import { TimeViewSelector } from '../common/TimeViewSelector';
import { getXAxisConfig } from '../../utils/chartHelpers';
import { useTranslation } from '../../i18n';

export function OverviewTab({
  data,
  units,
  darkMode,
  chartColors,
  timeView,
  setTimeView,
  timeViewData,
  convertedTripTypes
}) {
  const { t } = useTranslation();
  const xAxisConfig = getXAxisConfig(timeView, timeViewData.length);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard darkMode={darkMode} label={t('overview.totalTrips')} value={data.summary.totalTrips} color="sky" />
        <StatCard darkMode={darkMode} label={t('overview.totalDistance')} value={units.dist(data.summary.totalDistance).formatted} color="blue" />
        <StatCard darkMode={darkMode} label={t('overview.totalEnergy')} value={`${data.summary.totalEnergy.toLocaleString()} kWh`} color="emerald" />
        <StatCard darkMode={darkMode} label={t('overview.avgConsumption')} value={units.elecCons(data.summary.avgConsumption).formatted} color="purple" />
        <StatCard darkMode={darkMode} label={t('overview.totalChargeCycles')} value={data.summary.totalChargeCycles} color="cyan" />
        <StatCard darkMode={darkMode} label={t('overview.tripsPerCharge')} value={data.summary.avgTripsPerCharge} color="pink" />
        <StatCard darkMode={darkMode} label={t('overview.shortTrips')} value={`${data.summary.shortTripsPct}%`} color="orange" />
        <StatCard darkMode={darkMode} label={t('overview.avgPerMonth')} value={units.dist(data.summary.avgKmPerMonth).formatted} color="teal" />
      </div>

      {/* Time View Selector */}
      <TimeViewSelector timeView={timeView} setTimeView={setTimeView} darkMode={darkMode} />

      {/* Distance & Trips - Full Width */}
      <ChartCard darkMode={darkMode} title={`${t('overview.distanceAndTrips')} (${t(`timeView.${timeView}`)})`}>
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
            <YAxis yAxisId="left" stroke={chartColors.axis} fontSize={11} width={35} />
            <YAxis yAxisId="right" orientation="right" stroke={chartColors.axis} fontSize={11} width={35} />
            <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
            <Legend />
            <Bar yAxisId="left" dataKey="distance" name={`${t('charts.distance')} (${units.distUnit})`} fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="trips" name={t('charts.trips')} stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Trip Type Distribution - Second Row */}
      <ChartCard darkMode={darkMode} title={t('overview.tripTypeDistribution')}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart margin={{ top: 30, right: 30, bottom: 10, left: 30 }}>
            <Pie data={convertedTripTypes} dataKey="count" nameKey="type" cx="50%" cy="45%" outerRadius={90} label={({ count }) => count > 0 ? count : ''}>
              {convertedTripTypes.map((entry, i) => <Cell key={`cell-${i}`} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
