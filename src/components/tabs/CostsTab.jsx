import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StatCard } from '../common/StatCard';
import { ChartCard } from '../common/ChartCard';
import { precise } from '../../utils/precise';
import { unitConvert } from '../../utils/unitConvert';
import { L_TO_US_GAL } from '../../constants/units';
import { useTranslation } from '../../i18n';

export function CostsTab({
  data,
  units,
  darkMode,
  chartColors,
  costs,
  electricityPrice,
  petrolPrice,
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

  // Convert petrol price to $/L for internal calculations
  // UK uses price per litre, US uses price per gallon
  let petrolPricePerL;
  if (unitSystem === 'imperial_us') {
    // US price is per gallon, convert to per liter
    petrolPricePerL = precise.mul(petrolPrice, L_TO_US_GAL);
  } else {
    petrolPricePerL = petrolPrice; // Metric and UK are already per liter
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard darkMode={darkMode} label={t('costs.electricCost')} value={units.money(costs.electricCost)} subtitle={`${units.money(costs.costPerDistElectric)}/${units.distUnit}`} color="emerald" />
        <StatCard darkMode={darkMode} label={t('costs.petrolEquivalent')} value={units.money(costs.petrolCost)} subtitle={`${units.money(costs.costPerDistPetrol)}/${units.distUnit}`} color="red" />
        <StatCard darkMode={darkMode} label={t('costs.savings')} value={units.money(costs.savings)} subtitle={t('insights.vsPetrol')} color="sky" />
        <StatCard darkMode={darkMode} label={t('costs.savingsRate')} value={`${costs.savingsRate}%`} subtitle={t('costs.electricVsPetrol')} color="blue" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard darkMode={darkMode} title={t('costs.monthlyCost')}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.monthlyData.map(m => ({
              ...m,
              month: t(`months.${m.month?.toLowerCase?.() || m.month}`),
              electricCost: Math.round(precise.mul(precise.mul(precise.div(m.distance, 100), m.consumption), electricityPrice)),
              petrolCost: Math.round(precise.mul(precise.mul(precise.div(m.distance, 100), petrolConsL100km), petrolPricePerL))
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="month" stroke={chartColors.axis} fontSize={11} />
              <YAxis stroke={chartColors.axis} fontSize={11} width={40} />
              <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} formatter={(v) => units.money(v)} />
              <Legend />
              <Bar dataKey="electricCost" name={`${t('costs.electricCost')} (${units.currSymbol})`} fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="petrolCost" name={`${t('costs.petrolCost')} (${units.currSymbol})`} fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard darkMode={darkMode} title={t('costs.savingsOverTime')}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data.monthlyData.reduce((acc, m, i) => {
              const elec = precise.mul(precise.mul(precise.div(m.distance, 100), m.consumption), electricityPrice);
              const pet = precise.mul(precise.mul(precise.div(m.distance, 100), petrolConsL100km), petrolPricePerL);
              const sav = precise.sub(pet, elec);
              const prev = i > 0 ? acc[i - 1].cumRaw : 0;
              const cumRaw = precise.add(prev, sav);
              return [...acc, { ...m, month: t(`months.${m.month?.toLowerCase?.() || m.month}`), cumulative: Math.round(cumRaw), cumRaw }];
            }, [])}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="month" stroke={chartColors.axis} fontSize={11} />
              <YAxis stroke={chartColors.axis} fontSize={11} width={40} />
              <Tooltip contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '8px' }} itemStyle={{ color: chartColors.tooltipText }} labelStyle={{ color: chartColors.tooltipText }} formatter={(v) => units.money(v)} />
              <Area type="monotone" dataKey="cumulative" name={`${t('charts.savings')} (${units.currSymbol})`} stroke="#f59e0b" fill="#f59e0b44" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
