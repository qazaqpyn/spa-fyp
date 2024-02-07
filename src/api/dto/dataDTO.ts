export interface DataResponse {
  middle: number[];
  data: (string | number)[][];
}

export interface STDataResponse {
  middle: number[];
  data: Record<string | number, (string | number)[][]>;
}

export interface IKDVparameters {
  bandwidthS: number;
  rowP: number;
  colP: number;
  nThreads: number;
}

export interface ISTKDVparameters {
  bandwidthS: number;
  rowP: number;
  colP: number;
  bandwidthT: number;
  tPixel: number;
  nThreads: number;
}
