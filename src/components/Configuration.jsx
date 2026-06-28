import { useState } from 'react';
import { Settings, Play } from 'lucide-react';

export default function Configuration({ targetColumn, onRun, onBack }) {
  const [trainTestSplit, setTrainTestSplit] = useState(0.8);

  const handleRun = () => {
    onRun(trainTestSplit);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Configuration
              </h2>
              <p className="text-gray-600">
                Set up your analysis parameters
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Analysis Summary
            </h3>
            <div className="p-6 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Mode:</span>
                <span className="font-medium text-gray-900">
                  {targetColumn ? 'Supervised Learning' : 'Unsupervised Learning'}
                </span>
              </div>
              {targetColumn && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Column:</span>
                  <span className="font-medium text-gray-900">
                    {targetColumn}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Model:</span>
                <span className="font-medium text-gray-900">
                  {targetColumn
                    ? 'Auto-detected (Regression/Classification)'
                    : 'Clustering'}
                </span>
              </div>
            </div>
          </div>

          {targetColumn && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Train-Test Split
              </h3>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Training Data</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {(trainTestSplit * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Testing Data</p>
                    <p className="text-2xl font-bold text-green-600">
                      {((1 - trainTestSplit) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>

                <input
                  type="range"
                  min="0.5"
                  max="0.9"
                  step="0.05"
                  value={trainTestSplit}
                  onChange={(e) => setTrainTestSplit(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />

                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>50%</span>
                  <span>90%</span>
                </div>

                <p className="text-sm text-gray-600 mt-4">
                  The dataset will be split into training and testing sets. The
                  model learns from the training data and is evaluated on the
                  testing data.
                </p>
              </div>
            </div>
          )}

          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              What happens next?
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>1. Data preprocessing and cleaning</li>
              <li>2. Feature engineering and transformation</li>
              <li>3. Model training and optimization</li>
              <li>4. Performance evaluation and metrics</li>
              <li>5. Error analysis and insights</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleRun}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5" />
              Run Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
