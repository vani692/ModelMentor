import { Brain, Sparkles } from 'lucide-react';

export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <Brain className="w-24 h-24 text-blue-600 relative" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-4 tracking-tight">
          ModelMentor
        </h1>

        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Your guided machine learning companion. Upload your data, and let our
          intelligent system automatically analyze, train, and explain results
          with crystal clarity.
        </p>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={onStart}
            className="group relative px-8 py-4 bg-blue-600 text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-blue-700 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Start Analysis
            </span>
            <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </button>

          <p className="text-sm text-gray-500">
            No configuration needed. Just upload and go.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Simple</h3>
            <p className="text-sm text-gray-600">
              One robust model that adapts automatically to your data
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast</h3>
            <p className="text-sm text-gray-600">
              Quick analysis with real-time progress tracking
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Clear</h3>
            <p className="text-sm text-gray-600">
              Explainable results you can trust and understand
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
