import React from 'react';
import { icons } from '../icons/Icons';
import { useTranslation } from '../../i18n';

export function InsightsTab({
  data,
  units,
  darkMode,
  drivingInsights,
  predictions,
  benchmarks,
  chargingOptimization,
  unitSystem
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      {/* Driving Profile Banner */}
      <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gradient-to-br from-sky-500/10 to-blue-500/10 border-sky-500/20' : 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200'}`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-sky-500/20 flex items-center justify-center ${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
              </svg>
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>
                {benchmarks.drivingProfile}
              </h2>
              <p className={`flex items-center gap-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t('insights.efficiencyRating')}:
                <span className="inline-flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < benchmarks.efficiencyRating ? 'text-sky-500' : (darkMode ? 'text-zinc-600' : 'text-zinc-300')}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </span>
              </p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full ${benchmarks.pctAboveOfficial <= 0 ? (darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700') : (darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700')}`}>
            {benchmarks.pctAboveOfficial <= 0 ? `${Math.abs(benchmarks.pctAboveOfficial)}% ${t('benchmark.betterThan')}` : `${benchmarks.pctAboveOfficial}% ${t('benchmark.worseThan')}`} {t('benchmark.avg')} {benchmarks.officialLabel}
          </div>
        </div>
      </div>

      {/* Dynamic Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {drivingInsights.insights.map((insight, i) => (
          <div key={i} className={`p-4 rounded-xl border ${
            insight.severity === 'success' ? (darkMode ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200') :
            insight.severity === 'warning' ? (darkMode ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-50 border-amber-200') :
            (darkMode ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-200')
          }`}>
            <div className="flex items-start gap-3">
              <span className={`flex-shrink-0 ${
                insight.severity === 'success' ? (darkMode ? 'text-emerald-400' : 'text-emerald-600') :
                insight.severity === 'warning' ? (darkMode ? 'text-amber-400' : 'text-amber-600') :
                (darkMode ? 'text-blue-400' : 'text-blue-600')
              }`}>
                {icons[insight.iconName] && React.cloneElement(icons[insight.iconName], { className: 'w-6 h-6' })}
              </span>
              <div>
                <h4 className={`font-medium ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{insight.title}</h4>
                <p className={`text-sm mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Predictions Section */}
      <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <h3 className={`font-medium mb-4 flex items-center gap-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg> {t('insights.predictions')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
            <p className="text-xs text-zinc-500">{t('insights.projectedAnnualDistance')}</p>
            <p className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{units.dist(predictions.annualDistance).formatted}</p>
          </div>
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
            <p className="text-xs text-zinc-500">{t('insights.projectedAnnualTrips')}</p>
            <p className={`text-xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{predictions.annualTrips}</p>
          </div>
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
            <p className="text-xs text-zinc-500">{t('insights.projectedAnnualEnergy')}</p>
            <p className={`text-xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{predictions.annualEnergy} kWh</p>
          </div>
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
            <p className="text-xs text-zinc-500">{t('insights.projectedAnnualCost')}</p>
            <p className={`text-xl font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>{units.money(predictions.annualSavings)}</p>
            <p className="text-xs text-zinc-500">{t('insights.vsPetrol')}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/20' : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'}`}>
            <p className={`text-sm font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{t('costs.fiveYearSavings')}</p>
            <p className={`text-3xl font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{units.money(predictions.fiveYearSavings)}</p>
            <p className="text-xs text-zinc-500">{units.dist(predictions.fiveYearDistance).formatted}</p>
          </div>
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'}`}>
            <p className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{t('costs.yearlyProjection')}</p>
            <p className={`text-3xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>{units.dist(predictions.nextMonthDistance).formatted}</p>
            <p className="text-xs text-zinc-500">~{predictions.nextMonthTrips} {t('common.trips')}</p>
          </div>
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-gradient-to-br from-sky-500/5 to-blue-500/5 border-sky-500/20' : 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200'}`}>
            <p className={`text-sm font-medium ${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>{t('battery.seasonalVariation')}</p>
            <p className={`text-lg font-bold ${darkMode ? 'text-sky-300' : 'text-sky-700'}`}>
              {t('battery.summerRange')}: {units.elecCons(predictions.avgSummerConsumption).formatted}
            </p>
            <p className={`text-lg font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              {t('battery.winterRange')}: {units.elecCons(predictions.avgWinterConsumption).formatted}
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <h3 className={`font-medium mb-4 flex items-center gap-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg> {t('insights.recommendations')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
            <h4 className={`font-medium mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}><span className="inline-flex items-center gap-2">{icons.battery}{t('battery.chargingOptimization')}</span></h4>
            <ul className={`text-sm space-y-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li>• {t('insights.chargingRecDaily')}</li>
              <li>• {t('insights.chargingRecPrecondition')}</li>
              <li>• {t('battery.offPeakSavings')}: ~{units.money(chargingOptimization?.potentialOffPeakSavings || 0)}</li>
            </ul>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
            <h4 className={`font-medium mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}><span className="inline-flex items-center gap-2">{icons.car}{t('charts.efficiency')}</span></h4>
            <ul className={`text-sm space-y-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li>• {t('insights.efficiencyRecCombine')}</li>
              <li>• {t('efficiency.optimalSpeed')}: {unitSystem === 'metric' ? '50-70 km/h' : '30-45 mph'}</li>
              <li>• {t('insights.efficiencyRecEcoMode')}</li>
            </ul>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
            <h4 className={`font-medium mb-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}><span className="inline-flex items-center gap-2">{icons.snowflake}{t('insights.winterDrop')}</span></h4>
            <ul className={`text-sm space-y-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li>• {t('insights.winterRecSeats')}</li>
              <li>• {t('insights.winterRecGarage')}</li>
              <li>• {t('insights.winterRecPreheat')}</li>
            </ul>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
            <h4 className={`font-medium mb-2 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}><span className="inline-flex items-center gap-2">{icons.chartBar}{t('efficiency.efficiencyTrend')}</span></h4>
            <ul className={`text-sm space-y-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li>• {t('insights.efficiencyTarget', { target: units.elecCons(Math.round(data.summary.avgConsumption * 0.95)).formatted })}</li>
              <li>• {t('patterns.monthlyTrends')}</li>
              <li>• {t('battery.seasonalVariation')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
