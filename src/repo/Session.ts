import { DataResponse, STDataResponse } from "../api/dto/dataDTO";
import { KDVData, STKDVData } from "./CalculatedData";
import { Dataset } from "./Dataset";
import { IKDVParams, ISTKDVParams, KDVParamater, STKDVParamater } from "./Paramater";
import { postApi } from "../api/requests";
import { readCSVFile } from "../utils/parser";


export class Session {
    readonly type: 'KDV' | 'STKDV';
    private kdvParamater: KDVParamater | null;
    private stKdvParamater: STKDVParamater | null;
    private kdvCalculatedData: KDVData | null;
    private stKdvCalculatedData: STKDVData | null;
    private dataset: Dataset | null;
   
    constructor(type: 'KDV' | 'STKDV') {
        this.type = type;
        this.kdvParamater = null;
        this.stKdvParamater = null;
        this.kdvCalculatedData = null;
        this.stKdvCalculatedData = null;
        this.dataset = null;
    }

    private createKDVData(data: DataResponse): void {
        this.kdvCalculatedData = new KDVData(data.middle, data.data);
    }

    private createSTKDVData(data: STDataResponse): void {
        this.stKdvCalculatedData = new STKDVData(data.middle, data.data);
    }

    public checkParams(): boolean {
        if (this.type === 'KDV') {
            return this.kdvParamater !== null;
        } else {
            return this.stKdvParamater !== null;
        }
    }
    
    private checkCalculatedData(): boolean {
        if (this.type === 'KDV') {
            return this.kdvCalculatedData !== null;
        } else {
            return this.stKdvCalculatedData !== null;
        }
    }

    public async createDataset(file: File): Promise<void> {
        this.dataset = new Dataset(file);

        readCSVFile(file, this.type).then((data) => {
            this.dataset!.setParsedData(data);
        });
    }

    public checkDataset(): boolean {
        return !!this.dataset;
    }

    public async fetchCalculatedData() {
        if (!this.checkCalculatedData() || !this.checkParams()) return;
        
        const isKDV = this.type === 'KDV';
        const params = isKDV ? this.kdvParamater!.getParams() : this.stKdvParamater!.getParams();
        const endpoint = isKDV ? 'generate/kdv' : 'generate/stkdv';
        const createData = isKDV ? this.createKDVData.bind(this) : this.createSTKDVData.bind(this);

        const body = {
            params,
            data: this.dataset!.getParsedData(),
        };

        postApi(endpoint, body).then(createData);
    } 

    public createKDVParmater(params: IKDVParams): void {
        this.kdvParamater = new KDVParamater(params);
    }

    public createSTKDVParmater(params: ISTKDVParams): void {
        this.stKdvParamater = new STKDVParamater(params);
    }
}