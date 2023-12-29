export interface DataResponse {
  middle: number[];
  data: (string | number)[][];
}

export interface Iparameters {
  kdvType: 'KDV' | 'SRKDV';
  gps: boolean;
  bandwidthS: number;
  rowP: number;
  colP: number;
  bandwidthT: number;
  tPixel: number;
  nThreads: number;
}


export interface DataRequest {
  params: Iparameters | {};
  data: number[][];
}
