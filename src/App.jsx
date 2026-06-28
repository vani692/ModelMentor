import { useState } from 'react';
import { parseCSV } from './utils/csvParser';
import { generateMockResults } from './utils/mockAnalysis';
import { supabase } from './lib/supabase';

import LandingPage from './components/LandingPage';
import DatasetUpload from './components/DatasetUpload';
import DatasetPreview from './components/DatasetPreview';
import TargetSelection from './components/TargetSelection';
import Configuration from './components/Configuration';
import ProcessingScreen from './components/ProcessingScreen';
import ResultsDashboard from './components/ResultsDashboard';
import ErrorAnalysis from './components/ErrorAnalysis';
import Explainability from './components/Explainability';
import DownloadActions from './components/DownloadActions';

function App() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [analysis, setAnalysis] = useState({});
  const [datasetName, setDatasetName] = useState('');
  const [columns, setColumns] = useState([]);
  const [preview, setPreview] = useState({
    rows: [],
    totalRows: 0,
  });

  const handleStart = () => {
    setCurrentStep('upload');
  };

  const handleUpload = async (file, csvText) => {
    const { columns: parsedColumns, preview: parsedPreview } =
      parseCSV(csvText);
    setDatasetName(file.name);
    setColumns(parsedColumns);
    setPreview(parsedPreview);

    setAnalysis({
      dataset_name: file.name,
      dataset_columns: parsedColumns,
      dataset_preview: parsedPreview,
      status: 'pending',
    });

    setCurrentStep('preview');
  };

  const handleTargetSelect = (targetColumn) => {
    setAnalysis((prev) => ({
      ...prev,
      target_column: targetColumn,
    }));
    setCurrentStep('config');
  };

  const handleRunAnalysis = async (trainTestSplit) => {
    setAnalysis((prev) => ({
      ...prev,
      train_test_split: trainTestSplit,
      status: 'processing',
    }));

    const { data: savedAnalysis } = await supabase
      .from('analyses')
      .insert({
        dataset_name: datasetName,
        dataset_columns: columns,
        dataset_preview: preview,
        target_column: analysis.target_column,
        train_test_split: trainTestSplit,
        status: 'processing',
      })
      .select()
      .maybeSingle();

    if (savedAnalysis) {
      setAnalysis((prev) => ({
        ...prev,
        id: savedAnalysis.id,
        created_at: savedAnalysis.created_at,
        updated_at: savedAnalysis.updated_at,
      }));
    }

    setCurrentStep('processing');
  };

  const handleProcessingComplete = async () => {
    const { results, errorAnalysis, explainability } = generateMockResults(
      columns,
      analysis.target_column || null
    );

    setAnalysis((prev) => ({
      ...prev,
      status: 'completed',
      results,
      error_analysis: errorAnalysis,
      explainability,
    }));

    if (analysis.id) {
      await supabase
        .from('analyses')
        .update({
          status: 'completed',
          results,
          error_analysis: errorAnalysis,
          explainability,
          updated_at: new Date().toISOString(),
        })
        .eq('id', analysis.id);
    }

    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('landing');
    setAnalysis({});
    setDatasetName('');
    setColumns([]);
    setPreview({ rows: [], totalRows: 0 });
  };

  return (
    <>
      {currentStep === 'landing' && <LandingPage onStart={handleStart} />}

      {currentStep === 'upload' && (
        <DatasetUpload
          onUpload={handleUpload}
          onBack={() => setCurrentStep('landing')}
        />
      )}

      {currentStep === 'preview' && (
        <DatasetPreview
          datasetName={datasetName}
          columns={columns}
          preview={preview}
          onNext={() => setCurrentStep('target')}
          onBack={() => setCurrentStep('upload')}
        />
      )}

      {currentStep === 'target' && (
        <TargetSelection
          columns={columns}
          onSelect={handleTargetSelect}
          onBack={() => setCurrentStep('preview')}
        />
      )}

      {currentStep === 'config' && (
        <Configuration
          targetColumn={analysis.target_column || null}
          onRun={handleRunAnalysis}
          onBack={() => setCurrentStep('target')}
        />
      )}

      {currentStep === 'processing' && (
        <ProcessingScreen onComplete={handleProcessingComplete} />
      )}

      {currentStep === 'results' && analysis.results && (
        <ResultsDashboard
          results={analysis.results}
          onNext={() => setCurrentStep('error')}
        />
      )}

      {currentStep === 'error' && analysis.error_analysis && (
        <ErrorAnalysis
          errorAnalysis={analysis.error_analysis}
          onNext={() => setCurrentStep('explainability')}
          onBack={() => setCurrentStep('results')}
        />
      )}

      {currentStep === 'explainability' && analysis.explainability && (
        <Explainability
          explainability={analysis.explainability}
          onNext={() => setCurrentStep('download')}
          onBack={() => setCurrentStep('error')}
        />
      )}

      {currentStep === 'download' && (
        <DownloadActions
          analysis={analysis}
          onRestart={handleRestart}
          onBack={() => setCurrentStep('explainability')}
        />
      )}
    </>
  );
}

export default App;
