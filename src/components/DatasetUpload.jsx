import { useState, useRef } from 'react';
import { Upload, File, AlertCircle } from 'lucide-react';

export default function DatasetUpload({ onUpload, onBack }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const validateFile = (file) => {
    if (!file.name.endsWith('.csv')) {
      return 'Please upload a CSV file';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 10MB';
    }
    return null;
  };

  const handleFile = async (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      onUpload(file, text);
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Upload Dataset
          </h2>
          <p className="text-gray-600 mb-8">
            Upload your CSV file to begin the analysis
          </p>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              border-2 border-dashed rounded-xl p-12 text-center transition-all
              ${isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-gray-50'
              }
              ${selectedFile ? 'border-green-500 bg-green-50' : ''}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
            />

            {!selectedFile ? (
              <>
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Drop your CSV file here
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  or click to browse
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Choose File
                </button>
                <p className="text-xs text-gray-400 mt-4">
                  Maximum file size: 10MB
                </p>
              </>
            ) : (
              <>
                <File className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Choose Different File
                </button>
              </>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              CSV Format Requirements
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• First row should contain column headers</li>
              <li>• Use comma (,) as the delimiter</li>
              <li>• Ensure consistent data types within columns</li>
              <li>• Missing values are acceptable and will be handled</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
