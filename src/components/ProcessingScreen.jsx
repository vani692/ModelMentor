import { useEffect, useState } from 'react';
import { Loader2, Check } from 'lucide-react';

const STEPS = [
  {
    id: 'preprocessing',
    label: 'Data Preprocessing',
    description: 'Cleaning data and handling missing values',
  },
  {
    id: 'training',
    label: 'Model Training',
    description: 'Training the machine learning model',
  },
  {
    id: 'evaluation',
    label: 'Model Evaluation',
    description: 'Evaluating model performance',
  },
  {
    id: 'error_analysis',
    label: 'Error Analysis',
    description: 'Analyzing predictions and errors',
  },
];

export default function ProcessingScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  useEffect(() => {
    const stepDuration = 2000;
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) {
          setCompletedSteps((completed) => new Set([...completed, prev]));
          return prev + 1;
        } else {
          setCompletedSteps((completed) => new Set([...completed, prev]));
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 1000);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Processing Analysis
            </h2>
            <p className="text-gray-600">
              Please wait while we analyze your data
            </p>
          </div>

          <div className="space-y-6">
            {STEPS.map((step, index) => {
              const isCompleted = completedSteps.has(index);
              const isCurrent = currentStep === index;
              const isPending = index > currentStep;

              return (
                <div
                  key={step.id}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-300
                    ${isCompleted
                      ? 'border-green-200 bg-green-50'
                      : isCurrent
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                        ${isCompleted
                          ? 'bg-green-500'
                          : isCurrent
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : isCurrent ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      ) : (
                        <span className="text-white font-semibold">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3
                        className={`
                          font-semibold
                          ${isCompleted
                            ? 'text-green-900'
                            : isCurrent
                            ? 'text-blue-900'
                            : 'text-gray-600'
                          }
                        `}
                      >
                        {step.label}
                      </h3>
                      <p
                        className={`
                          text-sm
                          ${isCompleted
                            ? 'text-green-700'
                            : isCurrent
                            ? 'text-blue-700'
                            : 'text-gray-500'
                          }
                        `}
                      >
                        {step.description}
                      </p>
                    </div>

                    {isCompleted && (
                      <span className="text-xs text-green-600 font-medium">
                        Completed
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-xs text-blue-600 font-medium">
                        In Progress
                      </span>
                    )}
                    {isPending && (
                      <span className="text-xs text-gray-400 font-medium">
                        Pending
                      </span>
                    )}
                  </div>

                  {isCurrent && (
                    <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 animate-pulse rounded-full w-2/3"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            This may take a few moments depending on your dataset size
          </div>
        </div>
      </div>
    </div>
  );
}
