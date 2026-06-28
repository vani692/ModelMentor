import { AlertTriangle, TrendingDown } from 'lucide-react';

export default function ErrorAnalysis({ errorAnalysis, onNext, onBack }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Error Analysis
              </h2>
              <p className="text-gray-600">
                Understanding model mistakes and difficult cases
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-orange-600" />
              Difficult Segments
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              These data segments showed higher error rates and may need
              additional attention or feature engineering.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {errorAnalysis.difficultSegments.map((segment, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
                >
                  <h4 className="font-semibold text-orange-900 mb-2">
                    {segment.segment}
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-700">Error Rate:</span>
                      <span className="font-medium text-orange-900">
                        {(segment.errorRate * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-700">Sample Count:</span>
                      <span className="font-medium text-orange-900">
                        {segment.count}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-orange-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-600 rounded-full"
                      style={{ width: `${segment.errorRate * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {errorAnalysis.incorrectPredictions.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Incorrect Predictions (Sample)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Examples of predictions where the model was incorrect. Review
                these to understand patterns in model failures.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Index
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Actual
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Predicted
                      </th>
                      {errorAnalysis.incorrectPredictions[0]?.confidence !==
                        undefined && (
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Confidence
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {errorAnalysis.incorrectPredictions
                      .slice(0, 10)
                      .map((pred, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {pred.index}
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">
                            {String(pred.actual)}
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-red-600">
                            {String(pred.predicted)}
                          </td>
                          {pred.confidence !== undefined && (
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {(pred.confidence * 100).toFixed(2)}%
                            </td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {errorAnalysis.incorrectPredictions.length > 10 && (
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Showing 10 of {errorAnalysis.incorrectPredictions.length}{' '}
                  incorrect predictions
                </p>
              )}
            </div>
          )}

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">
              Recommendations
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • Focus on collecting more data for difficult segments
              </li>
              <li>
                • Consider feature engineering to better represent these cases
              </li>
              <li>
                • Review data quality for samples with high error rates
              </li>
              <li>
                • Investigate if certain patterns consistently lead to errors
              </li>
            </ul>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View Explainability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
