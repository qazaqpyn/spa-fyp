export interface IKDVParams {
    bandwidthS: number;
    rowP: number;
    colP: number;
    nThreads: number;
}

export interface ISTKDVParams {
    bandwidthS: number;
    rowP: number;
    colP: number;
    bandwidthT: number;
    tPixel: number;
    nThreads: number;
}

export class KDVParamater {
    private bandwidthS: number = 1000;
    private rowP: number = 800;
    private colP: number = 640;
    private nThreads: number = 8;
    
    constructor(params: IKDVParams) {
        this.setParams(params);
    }

    private setParams(params: IKDVParams): void {
        this.bandwidthS = params.bandwidthS;
        this.rowP = params.rowP;
        this.colP = params.colP;
        this.nThreads = params.nThreads;
    }

    public getParams() {
        return {
            kdvType: 'KDV',
            bandwidthS: this.bandwidthS,
            rowP: this.rowP,
            colP: this.colP,
            nThreads: this.nThreads,
        };
    }
}

export class STKDVParamater {
    private bandwidthS: number = 1000;
    private rowP: number = 800;
    private colP: number = 640;
    private bandwidthT: number = 6;
    private tPixel: number = 32;
    private nThreads: number = 8;
    
    constructor(params: ISTKDVParams) {
        this.setParams(params);
    }

    private setParams(params: ISTKDVParams): void {
        this.bandwidthS = params.bandwidthS;
        this.rowP = params.rowP;
        this.colP = params.colP;
        this.bandwidthT = params.bandwidthT;
        this.tPixel = params.tPixel;
        this.nThreads = params.nThreads;
    }

    public getParams() {
        return {
            kdvType: 'STKDV',
            bandwidthS: this.bandwidthS,
            rowP: this.rowP,
            colP: this.colP,
            bandwidthT: this.bandwidthT,
            tPixel: this.tPixel,
            nThreads: this.nThreads,
        };
    }
}