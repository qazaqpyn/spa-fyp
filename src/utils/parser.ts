import Papa from 'papaparse';

export const readCSVFile = (file: File): Promise<number[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const csvData = event.target.result.toString();
        const parsedData = parseCSVData(csvData);
        resolve(parsedData);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = (event) => {
      reject(new Error('Error reading file'));
    };
    reader.readAsText(file);
  });
};

const parseCSVData = (csvData: string): number[][] => {
  const results: number[][] = [];

  const parsedData = Papa.parse(csvData, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
    transform: (value) => value.trim(),
    step: (row) => {
      if (row.errors.length === 0) {
        const rowData: number[] = [row.data.lon, row.data.lat];
        results.push(rowData);
      }
    },
    complete: () => {
      console.log(results); // Do something with the parsed CSV data
    },
    error: (error) => {
      console.error('Error parsing CSV data:', error);
    }
  });

  return results;
};