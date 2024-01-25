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
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
    fastMode: true,
    step: (row) => {
      if (row.errors.length === 0 && typeof row.data[0] === 'number' && typeof row.data[1] === 'number') {
        const rowData: number[] = [row.data[0], row.data[1]];
        results.push(rowData);
      }
    },
    complete: () => {
      console.log("Parsing completed");
    },
    error: (error) => {
      console.error('Error parsing CSV data:', error);
    }
  });

  return results;
};