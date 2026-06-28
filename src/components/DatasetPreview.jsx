import { Database, AlertTriangle } from 'lucide-react';

export default function DatasetPreview({ datasetName, columns, preview, onNext, onBack }) {
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
            <Database className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Dataset Preview
              </h2>
              <p className="text-gray-600">{datasetName}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Dataset Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-600 font-medium">Total Rows</p>
                <p className="text-2xl font-bold text-blue-900">
                  {preview.totalRows.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-600 font-medium">
                  Total Columns
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {columns.length}
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-600 font-medium">
                  Columns with Missing Values
                </p>
                <p className="text-2xl font-bold text-orange-900">
                  {columns.filter((col) => col.missingCount > 0).length}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Column Information
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Column Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Data Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Missing Values
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {columns.map((col, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        {col.name}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {col.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {col.missingCount > 0 ? (
                          <span className="flex items-center gap-1 text-orange-600">
                            <AlertTriangle className="w-4 h-4" />
                            {col.missingCount} ({col.missingPercentage.toFixed(1)}
                            %)
                          </span>
                        ) : (
                          <span className="text-green-600">None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sample Rows (First 5)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {columns.map((col, idx) => (
                      <th
                        key={idx}
                        className="text-left py-2 px-3 font-semibold text-gray-700"
                      >
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.rows.slice(0, 5).map((row, rowIdx) => (
                    <tr key={rowIdx} className="border-b border-gray-100">
                      {columns.map((col, colIdx) => (
                        <td key={colIdx} className="py-2 px-3 text-gray-600">
                          {row[col.name] !== null &&
                          row[col.name] !== undefined &&
                          row[col.name] !== ''
                            ? String(row[col.name])
                            : <span className="text-gray-400 italic">null</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Continue to Target Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
