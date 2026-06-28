import { Lightbulb, BookOpen, CheckCircle2 } from 'lucide-react';

export default function Explainability({ explainability, onNext, onBack }) {
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
            <Lightbulb className="w-8 h-8 text-yellow-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Model Explainability
              </h2>
              <p className="text-gray-600">
                Understanding how the model works and its decisions
              </p>
            </div>
          </div>

          <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Model Used
            </h3>
            <p className="text-lg font-medium text-gray-900 mb-4">
              {explainability.modelUsed}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {explainability.reasoning}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              How to Interpret Results
            </h3>
            <div className="space-y-3">
              {explainability.interpretation.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 flex-1 pt-1">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Recommendations
            </h3>
            <div className="space-y-3">
              {explainability.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-green-50 rounded-lg border border-green-200 flex gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 flex-1">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg mb-8">
            <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Key Insights
            </h3>
            <ul className="text-sm text-yellow-900 space-y-2">
              <li>
                • The model's performance metrics indicate how well it learned
                from your data
              </li>
              <li>
                • Feature importance shows which variables had the most
                influence on predictions
              </li>
              <li>
                • Error analysis highlights areas where the model struggles and
                needs improvement
              </li>
              <li>
                • Consider the context of your problem when evaluating whether
                the results are satisfactory
              </li>
            </ul>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Download & Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
