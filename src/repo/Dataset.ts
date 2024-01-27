export class Dataset {
    private parsedData: number[][];
    private fileData: File;
    private uploadedDate: Date;

    constructor(file: File) {
        this.fileData = file;
        this.uploadedDate = new Date();
    }

    public getFileData(): File {
        return this.fileData;
    }

    public getUploadedDate(): Date {
        return this.uploadedDate;
    }

    public getParsedData(): number[][] {
        return this.parsedData;
    }

    public setParsedData(data: number[][]): void {
        this.parsedData = data;
    }

    public getFileName(): string {
        return this.fileData.name;
    }

    public getTitle(): string {
        const year = this.uploadedDate.getFullYear();
        const month = this.uploadedDate.getMonth() + 1;
        const day = this.uploadedDate.getDate();
        return `${this.getFileName()}${year}${month}${day}`;
    }
}