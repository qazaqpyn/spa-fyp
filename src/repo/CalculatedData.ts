export class KDVData {
    private data: (string | number)[][];
    private middle: number[];

    constructor(middle: number[], data: (string | number)[][]) {
        this.middle = middle;
        this.data = data;
    }

    public getData() {
        return {
            middle: this.middle,
            data: this.data,
        };
    }
}

export class STKDVData{
    private middle: number[];
    private data: Record<string | number, (string | number)[][]>;
    private timeFrames:( string | number)[];

    constructor(middle: number[], data: Record<string | number, (string | number)[][]>) {
        this.middle = middle;
        this.data = data;
        this.timeFrames = Object.keys(data);
    }

    public getData(key?: string | number) {
        return {
            middle: this.middle,
            data: this.data[key ?? this.timeFrames[0]],
        };
    }

    public getTimeFrames(): (string | number)[] {
        return this.timeFrames;
    }
}