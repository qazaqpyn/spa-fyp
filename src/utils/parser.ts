import Papa from 'papaparse';

export const readCSVFile = (file: File) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    if (event.target && event.target.result) {
      const csvData = event.target.result.toString();
      parseCSVData(csvData);
    }
  };
  reader.readAsText(file);
};

const parseCSVData = (csvData: string) => {
  const results: number[][] = [];

  const parsedData = Papa.parse(csvData, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
    transform: (value) => value.trim(),
    step: (row) => {
      if (row.errors.length === 0) {
        const rowData:  number[] = [row.data.lon, row.data.lat];
        results.push(rowData);
      }
    }
  });

  if (parsedData.errors.length > 0) {
    console.error('Error parsing CSV data:', parsedData.errors);
    return;
  }

  console.log(results); // Do something with the parsed CSV data
};