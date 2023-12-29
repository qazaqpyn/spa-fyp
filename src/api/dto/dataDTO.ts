
export interface DataResponse {
  middle: number[];
  data: number[][];
}


export interface DataRequest {
  params: {
    kdvType: 'KDV' | 'SRKDV';
    gps: boolean;
    bandwidthS: number;
    rowP: number;
    colP: number;
    bandwidthT: number;
    tPixel: number;
    nThreads: number;
  }
  data: number[][];
}
