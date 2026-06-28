import { TrendingUp, BarChart3, Award } from 'lucide-react';

export default function ResultsDashboard({ results, onNext }) {
  const metricsArray = Object.entries(results.metrics);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Results Dashboard
              </h2>
              <p className="text-gray-600">
                Model: {results.modelType.charAt(0).toUpperCase() + results.modelType.slice(1)}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {metricsArray.map(([key, value]) => (
                <div
                  key={key}
                  className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200"
                >
                  <p className="text-sm text-gray-600 mb-1">
                    {key
                      .replace(/_/g, ' ')
                      .split(' ')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </p>
                  <p className="text-3xl font-bold text-blue-900">
                    {typeof value === 'number' ? value.toFixed(4) : value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {results.featureImportance && results.featureImportance.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Feature Importance
              </h3>
              <div className="space-y-3">
                {results.featureImportance
                  .sort((a, b) => b.importance - a.importance)
                  .slice(0, 10)
                  .map((feature, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-900">
                          {feature.feature}
                        </span>
                        <span className="text-gray-600">
                          {(feature.importance * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${feature.importance * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {results.modelType === 'classification' &&
            results.charts?.confusionMatrix && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Confusion Matrix
                </h3>
                <div className="inline-block p-6 bg-gray-50 rounded-lg">
                  <div className="grid gap-2">
                    {results.charts.confusionMatrix.map((row, i) => (
                      <div key={i} className="flex gap-2">
                        {row.map((value, j) => (
                          <div
                            key={j}
                            className="w-20 h-20 flex items-center justify-center rounded-lg text-white font-bold text-lg"
                            style={{
                              backgroundColor: `rgba(37, 99, 235, ${
                                0.3 + (value / Math.max(...row)) * 0.7
                              })`,
                            }}
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-xs text-gray-600 text-center">
                    <p>Rows: Actual | Columns: Predicted</p>
                  </div>
                </div>
              </div>
            )}

          {results.modelType === 'regression' &&
            results.charts?.predictions &&
            results.charts.predictions.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Actual vs Predicted
                </h3>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="relative h-64 flex items-end gap-1">
                    {results.charts.predictions.slice(0, 50).map((pred, idx) => {
                      const maxValue = Math.max(
                        ...results.charts.predictions.flatMap((p) => [
                          p.actual,
                          p.predicted,
                        ])
                      );
                      return (
                        <div key={idx} className="flex-1 flex gap-0.5 items-end">
                          <div
                            className="flex-1 bg-blue-600 rounded-t"
                            style={{
                              height: `${(pred.actual / maxValue) * 100}%`,
                            }}
                            title={`Actual: ${pred.actual}`}
                          ></div>
                          <div
                            className="flex-1 bg-green-600 rounded-t"
                            style={{
                              height: `${(pred.predicted / maxValue) * 100}%`,
                            }}
                            title={`Predicted: ${pred.predicted}`}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                      <span className="text-gray-600">Actual</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                      <span className="text-gray-600">Predicted</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          {results.modelType === 'clustering' &&
            results.charts?.clusters &&
            results.charts.clusters.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Cluster Visualization
                </h3>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="relative w-full h-96 bg-white rounded-lg border border-gray-200">
                    {results.charts.clusters.map((point, idx) => {
                      const colors = [
                        '#3B82F6',
                        '#10B981',
                        '#F59E0B',
                        '#EF4444',
                        '#8B5CF6',
                        '#EC4899',
                      ];
                      const xPercent =
                        ((point.x -
                          Math.min(...results.charts.clusters.map((p) => p.x))) /
                          (Math.max(...results.charts.clusters.map((p) => p.x)) -
                            Math.min(
                              ...results.charts.clusters.map((p) => p.x)
                            ))) *
                        90;
                      const yPercent =
                        ((point.y -
                          Math.min(...results.charts.clusters.map((p) => p.y))) /
                          (Math.max(...results.charts.clusters.map((p) => p.y)) -
                            Math.min(
                              ...results.charts.clusters.map((p) => p.y)
                            ))) *
                        90;
                      return (
                        <div
                          key={idx}
                          className="absolute w-3 h-3 rounded-full"
                          style={{
                            left: `${5 + xPercent}%`,
                            bottom: `${5 + yPercent}%`,
                            backgroundColor: colors[point.cluster % colors.length],
                          }}
                          title={`Cluster ${point.cluster}`}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          <div className="flex justify-end">
            <button
              onClick={onNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View Error Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
