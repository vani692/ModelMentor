export function generateMockResults(columns, targetColumn) {
  const isClustering = !targetColumn;
  const targetInfo = targetColumn
    ? columns.find((col) => col.name === targetColumn)
    : null;
  const isClassification = targetInfo?.type === 'categorical';

  let modelType;
  if (isClustering) {
    modelType = 'clustering';
  } else if (isClassification) {
    modelType = 'classification';
  } else {
    modelType = 'regression';
  }

  const featureColumns = columns.filter((col) => col.name !== targetColumn);
  const featureImportance = featureColumns.map((col) => ({
    feature: col.name,
    importance: Math.random(),
  }));

  const totalImportance = featureImportance.reduce(
    (sum, f) => sum + f.importance,
    0
  );
  featureImportance.forEach((f) => {
    f.importance = f.importance / totalImportance;
  });

  let metrics = {};
  let charts = {};

  if (modelType === 'regression') {
    metrics = {
      r2_score: 0.85 + Math.random() * 0.1,
      mean_absolute_error: Math.random() * 10,
      mean_squared_error: Math.random() * 20,
      root_mean_squared_error: Math.random() * 15,
    };

    const predictions = Array.from({ length: 100 }, () => ({
      actual: Math.random() * 100,
      predicted: Math.random() * 100,
    }));
    charts.predictions = predictions;
  } else if (modelType === 'classification') {
    metrics = {
      accuracy: 0.8 + Math.random() * 0.15,
      precision: 0.75 + Math.random() * 0.2,
      recall: 0.7 + Math.random() * 0.25,
      f1_score: 0.75 + Math.random() * 0.2,
    };

    const size = Math.floor(Math.random() * 2) + 2;
    const confusionMatrix = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Math.floor(Math.random() * 50) + 10)
    );
    charts.confusionMatrix = confusionMatrix;
  } else {
    metrics = {
      silhouette_score: 0.4 + Math.random() * 0.4,
      davies_bouldin_index: Math.random() * 2,
      n_clusters: Math.floor(Math.random() * 4) + 2,
    };

    const clusters = Array.from({ length: 200 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      cluster: Math.floor(Math.random() * metrics.n_clusters),
    }));
    charts.clusters = clusters;
  }

  const results = {
    modelType,
    metrics,
    featureImportance,
    charts,
  };

  const difficultSegments = Array.from(
    { length: Math.floor(Math.random() * 3) + 2 },
    (_, i) => ({
      segment: `Segment ${String.fromCharCode(65 + i)}`,
      errorRate: 0.1 + Math.random() * 0.3,
      count: Math.floor(Math.random() * 50) + 20,
    })
  );

  const incorrectPredictions = Array.from(
    { length: Math.floor(Math.random() * 20) + 10 },
    (_, i) => ({
      index: i,
      actual: modelType === 'classification' ? `Class ${Math.floor(Math.random() * 3)}` : Math.random() * 100,
      predicted: modelType === 'classification' ? `Class ${Math.floor(Math.random() * 3)}` : Math.random() * 100,
      confidence: Math.random(),
    })
  );

  const errorAnalysis = {
    difficultSegments,
    incorrectPredictions,
  };

  let modelUsed;
  let reasoning;
  let interpretation;
  let recommendations;

  if (modelType === 'regression') {
    modelUsed = 'Random Forest Regressor';
    reasoning =
      'A Random Forest was selected because it handles non-linear relationships well and provides robust predictions for continuous target variables. It is less prone to overfitting and works well with features of varying importance.';
    interpretation = [
      'The R² score indicates how well the model explains variance in the target variable. Values closer to 1.0 indicate better fit.',
      'Mean Absolute Error (MAE) shows the average magnitude of prediction errors in the same units as your target variable.',
      'Feature importance reveals which variables have the most influence on predictions, helping you understand key drivers.',
    ];
    recommendations = [
      'Consider collecting more data to improve model accuracy',
      'Review features with low importance - they might be removed to simplify the model',
      'Monitor predictions on new data to ensure model performance remains stable',
      'Consider feature engineering to capture additional patterns',
    ];
  } else if (modelType === 'classification') {
    modelUsed = 'Gradient Boosting Classifier';
    reasoning =
      'Gradient Boosting was chosen for its excellent performance on classification tasks. It builds trees sequentially to correct errors of previous trees, resulting in highly accurate predictions.';
    interpretation = [
      'Accuracy shows the overall percentage of correct predictions across all classes.',
      'Precision indicates what proportion of positive predictions were actually correct.',
      'Recall measures what proportion of actual positives were correctly identified.',
      'The confusion matrix shows detailed breakdown of correct and incorrect predictions for each class.',
    ];
    recommendations = [
      'If precision and recall differ significantly, consider adjusting the classification threshold',
      'Review misclassified examples to identify patterns in errors',
      'Consider class balancing techniques if some classes are underrepresented',
      'Collect more examples of minority classes if needed',
    ];
  } else {
    modelUsed = 'K-Means Clustering';
    reasoning =
      'K-Means clustering was applied to discover natural groupings in your data. It partitions data into distinct clusters based on feature similarity, helping identify patterns without predefined labels.';
    interpretation = [
      'The Silhouette Score measures how well-separated clusters are. Values closer to 1 indicate better-defined clusters.',
      'Davies-Bouldin Index measures cluster separation. Lower values indicate better clustering.',
      'The visualization shows how data points are grouped into distinct clusters.',
    ];
    recommendations = [
      'Examine the characteristics of each cluster to understand what makes them distinct',
      'Consider testing different numbers of clusters to find the optimal grouping',
      'Use domain knowledge to interpret and name each cluster meaningfully',
      'Profile each cluster to inform business decisions or further analysis',
    ];
  }

  const explainability = {
    modelUsed,
    reasoning,
    interpretation,
    recommendations,
  };

  return { results, errorAnalysis, explainability };
}
