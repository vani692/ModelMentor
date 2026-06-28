export function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map((h) => h.trim());

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    headers.forEach((header, idx) => {
      const value = values[idx]?.trim();
      if (value === '' || value === undefined) {
        row[header] = null;
      } else if (!isNaN(Number(value))) {
        row[header] = Number(value);
      } else {
        row[header] = value;
      }
    });
    rows.push(row);
  }

  const columns = headers.map((name) => {
    const values = rows.map((row) => row[name]);
    const nonNullValues = values.filter((v) => v !== null && v !== undefined);
    const missingCount = values.length - nonNullValues.length;

    let type = 'unknown';
    if (nonNullValues.length > 0) {
      const firstNonNull = nonNullValues[0];
      if (typeof firstNonNull === 'number') {
        const uniqueValues = new Set(nonNullValues);
        if (uniqueValues.size <= 10) {
          type = 'categorical';
        } else {
          type = 'numeric';
        }
      } else {
        const uniqueValues = new Set(nonNullValues);
        if (uniqueValues.size <= 20) {
          type = 'categorical';
        } else {
          type = 'text';
        }
      }
    }

    return {
      name,
      type,
      missingCount,
      missingPercentage: (missingCount / values.length) * 100,
    };
  });

  return {
    columns,
    preview: {
      rows,
      totalRows: rows.length,
    },
  };
}
