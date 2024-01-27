export abstract class Data {
    private middle: number[];
    

    constructor(middle: number[]) {
        this.middle = middle;
        
    }

    public getMiddle(): number[] {
        return this.middle;
    }

    abstract getData(): (string | number)[][] | Record<string | number, (string | number)[][]>;
}

export class KDVData extends Data {
    private data: (string | number)[][];

    constructor(middle: number[], data: (string | number)[][]) {
        super(middle);
        this.data = data;
    }

    public getData(): (string | number)[][] {
        return this.data;
    }
}

export class STKDVData extends Data {
    private data: Record<string | number, (string | number)[][]>;
    private timeFrames:( string | number)[];

    constructor(middle: number[], data: Record<string | number, (string | number)[][]>) {
        super(middle);
        this.data = data;
        this.timeFrames = Object.keys(data);
    }

    public getData(): Record<string | number, (string | number)[][]> {
        return this.data;
    }

    public getTimeFrames(): (string | number)[] {
        return this.timeFrames;
    }
}