import { useState } from 'react';
import { Target, Info } from 'lucide-react';

export default function TargetSelection({ columns, onSelect, onBack }) {
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [mode, setMode] = useState('supervised');

  const handleContinue = () => {
    onSelect(mode === 'supervised' ? selectedTarget : null);
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
            <Target className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Target Selection
              </h2>
              <p className="text-gray-600">
                Choose your analysis mode and target column
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Analysis Mode
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setMode('supervised')}
                className={`
                  p-6 rounded-xl border-2 transition-all text-left
                  ${mode === 'supervised'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${mode === 'supervised'
                      ? 'border-blue-500'
                      : 'border-gray-300'
                    }
                  `}
                  >
                    {mode === 'supervised' && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    Supervised Learning
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  Predict a specific target column using other features
                  (regression or classification)
                </p>
              </button>

              <button
                onClick={() => setMode('unsupervised')}
                className={`
                  p-6 rounded-xl border-2 transition-all text-left
                  ${mode === 'unsupervised'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${mode === 'unsupervised'
                      ? 'border-blue-500'
                      : 'border-gray-300'
                    }
                  `}
                  >
                    {mode === 'unsupervised' && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    Unsupervised Learning
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  Discover patterns and groupings in the data without a
                  specific target (clustering)
                </p>
              </button>
            </div>
          </div>

          {mode === 'supervised' && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Select Target Column
              </h3>
              <div className="space-y-2">
                {columns.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedTarget(col.name)}
                    className={`
                      w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between
                      ${selectedTarget === col.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                      }
                    `}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{col.name}</p>
                      <p className="text-sm text-gray-600">
                        Type: {col.type} • Missing:{' '}
                        {col.missingPercentage.toFixed(1)}%
                      </p>
                    </div>
                    <div
                      className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${selectedTarget === col.name
                        ? 'border-blue-500'
                        : 'border-gray-300'
                      }
                    `}
                    >
                      {selectedTarget === col.name && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Model Selection</p>
              <p>
                {mode === 'supervised'
                  ? 'The system will automatically detect whether to use regression or classification based on your target column type.'
                  : 'The system will automatically apply clustering to discover natural groupings in your data.'}
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              disabled={mode === 'supervised' && !selectedTarget}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors
                ${mode === 'supervised' && !selectedTarget
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
            >
              Continue to Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
