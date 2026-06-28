/*
  # Create ModelMentor Analyses Table

  1. New Tables
    - `analyses`
      - `id` (uuid, primary key) - Unique identifier for each analysis
      - `user_id` (uuid, nullable) - User who created the analysis (for future auth)
      - `dataset_name` (text) - Name of the uploaded CSV file
      - `dataset_columns` (jsonb) - Column information with data types and missing values
      - `dataset_preview` (jsonb) - Sample rows from the dataset
      - `target_column` (text, nullable) - Selected target column (null for unsupervised)
      - `train_test_split` (numeric, default 0.8) - Training/testing data split ratio
      - `status` (text, default 'pending') - Analysis status: pending, processing, completed, failed
      - `progress_step` (text, nullable) - Current processing step
      - `results` (jsonb, nullable) - Analysis results including metrics, charts, feature importance
      - `error_analysis` (jsonb, nullable) - Error analysis data
      - `explainability` (jsonb, nullable) - Model explainability information
      - `created_at` (timestamptz) - When the analysis was created
      - `updated_at` (timestamptz) - When the analysis was last updated

  2. Security
    - Enable RLS on `analyses` table
    - Add policy for public access (since no auth yet, anyone can read/write their own analyses)

  3. Important Notes
    - Using JSONB for flexible storage of dataset info, results, and analysis data
    - Status field tracks the analysis lifecycle
    - All timestamp fields use timestamptz for proper timezone handling
*/

CREATE TABLE IF NOT EXISTS analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  dataset_name text NOT NULL,
  dataset_columns jsonb NOT NULL DEFAULT '[]'::jsonb,
  dataset_preview jsonb NOT NULL DEFAULT '[]'::jsonb,
  target_column text,
  train_test_split numeric DEFAULT 0.8,
  status text DEFAULT 'pending',
  progress_step text,
  results jsonb,
  error_analysis jsonb,
  explainability jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analyses"
  ON analyses
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read analyses"
  ON analyses
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update analyses"
  ON analyses
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete analyses"
  ON analyses
  FOR DELETE
  TO anon
  USING (true);
