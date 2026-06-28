import { Download, FileText, RefreshCw, CheckCircle } from 'lucide-react';

export default function DownloadActions({ analysis, onRestart, onBack }) {
  const handleDownloadModel = () => {
    const modelData = {
      id: analysis.id,
      dataset_name: analysis.dataset_name,
      target_column: analysis.target_column,
      train_test_split: analysis.train_test_split,
      results: analysis.results,
      created_at: analysis.created_at,
    };
    const blob = new Blob([JSON.stringify(modelData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `model_${analysis.id.slice(0, 8)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadReport = () => {
    let report = `ModelMentor Analysis Report\n`;
    report += `${'='.repeat(50)}\n\n`;
    report += `Dataset: ${analysis.dataset_name}\n`;
    report += `Analysis ID: ${analysis.id}\n`;
    report += `Created: ${new Date(analysis.created_at).toLocaleString()}\n\n`;

    if (analysis.target_column) {
      report += `Target Column: ${analysis.target_column}\n`;
      report += `Train-Test Split: ${(analysis.train_test_split * 100).toFixed(0)}% / ${((1 - analysis.train_test_split) * 100).toFixed(0)}%\n\n`;
    }

    if (analysis.results) {
      report += `Model Type: ${analysis.results.modelType}\n\n`;
      report += `Performance Metrics:\n`;
      report += `${'-'.repeat(50)}\n`;
      Object.entries(analysis.results.metrics).forEach(([key, value]) => {
        report += `${key}: ${typeof value === 'number' ? value.toFixed(4) : value}\n`;
      });
      report += `\n`;

      if (analysis.results.featureImportance.length > 0) {
        report += `Feature Importance:\n`;
        report += `${'-'.repeat(50)}\n`;
        analysis.results.featureImportance
          .sort((a, b) => b.importance - a.importance)
          .slice(0, 10)
          .forEach((feature, idx) => {
            report += `${idx + 1}. ${feature.feature}: ${(feature.importance * 100).toFixed(2)}%\n`;
          });
        report += `\n`;
      }
    }

    if (analysis.error_analysis) {
      report += `Error Analysis:\n`;
      report += `${'-'.repeat(50)}\n`;
      report += `Difficult Segments:\n`;
      analysis.error_analysis.difficultSegments.forEach((segment) => {
        report += `  - ${segment.segment}: ${(segment.errorRate * 100).toFixed(2)}% error rate (${segment.count} samples)\n`;
      });
      report += `\n`;
    }

    if (analysis.explainability) {
      report += `Model Explanation:\n`;
      report += `${'-'.repeat(50)}\n`;
      report += `Model Used: ${analysis.explainability.modelUsed}\n`;
      report += `Reasoning: ${analysis.explainability.reasoning}\n\n`;
      report += `Recommendations:\n`;
      analysis.explainability.recommendations.forEach((rec, idx) => {
        report += `${idx + 1}. ${rec}\n`;
      });
    }

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${analysis.id.slice(0, 8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Analysis Complete
              </h2>
              <p className="text-gray-600">
                Download your results or start a new analysis
              </p>
            </div>
          </div>

          <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">
              Analysis Summary
            </h3>
            <div className="space-y-2 text-sm text-green-800">
              <div className="flex justify-between">
                <span>Dataset:</span>
                <span className="font-medium">{analysis.dataset_name}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Columns:</span>
                <span className="font-medium">
                  {analysis.dataset_columns.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Rows:</span>
                <span className="font-medium">
                  {analysis.dataset_preview.totalRows.toLocaleString()}
                </span>
              </div>
              {analysis.target_column && (
                <div className="flex justify-between">
                  <span>Target Column:</span>
                  <span className="font-medium">{analysis.target_column}</span>
                </div>
              )}
              {analysis.results && (
                <div className="flex justify-between">
                  <span>Model Type:</span>
                  <span className="font-medium capitalize">
                    {analysis.results.modelType}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Download Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleDownloadModel}
                className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Download className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Download Model
                    </h4>
                    <p className="text-sm text-gray-600">
                      Export the trained model configuration and results as JSON
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={handleDownloadReport}
                className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Download Report
                    </h4>
                    <p className="text-sm text-gray-600">
                      Get a comprehensive text report of the analysis
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What's Next?
            </h3>
            <div className="mb-6">
              <button
                onClick={onRestart}
                className="w-full p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl group"
              >
                <div className="flex items-center justify-center gap-3">
                  <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">
                      Start New Analysis
                    </h4>
                    <p className="text-sm text-blue-100">
                      Analyze another dataset with ModelMentor
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">
                Tips for Future Analyses
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use larger datasets for more reliable results</li>
                <li>• Clean your data before uploading for best performance</li>
                <li>
                  • Try different target columns to explore various predictions
                </li>
                <li>
                  • Review error analysis to understand model limitations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
