import { IgcForOfState } from "igniteui-webcomponents-grids/grids";
import { NwindData, NwindDataItem } from "./NwindData";
import { BehaviorSubject, Observable } from 'rxjs';

const DATA_URL: string = 'https://services.odata.org/northwind/northwind.svc/Products';

export class RemoteNwindService {
    // public remoteData: NwindDataItem[];

    // constructor() {
    //     this.remoteData = new NwindData();
    // }

    // public getData(index?: number, perPage?: number): Promise<NwindDataItem[]> {
    //     const data = this.remoteData.slice(index * perPage, index * perPage + perPage);
    //     return new Promise((resolve, reject) => {
    //         setTimeout(resolve, 500, data);
    //     });
    // }

    // public getDataLength(): Promise<number> {
    //     return Promise.resolve(this.remoteData.length);
    // }`


    public data: Observable<any[]>;
    private _data: BehaviorSubject<any[]>;
    private _cachedData = <any>[];
    private _prevRequestChunk: number;

    constructor() {
        this._data = new BehaviorSubject([]);
        this.data = this._data.asObservable();
    }

    public get cachedData() {
        return this._cachedData;
    }

    public async loadDataForPage(page: number, pageSize: number, callback?: (arg: any) => void) {
        const url = this._buildDataUrl(page, pageSize)
        const response = await fetch(url);
        const data = await response.json();
        const startIndex = (page - 1) * pageSize;
        this._updateData(data, startIndex);
        this._data.next(data);
        callback({ data });
    }

    public getCachedData(virtualizationArgs: IgcForOfState) {
        const virtArgsEndIndex = virtualizationArgs.startIndex + virtualizationArgs.chunkSize;
        let data = [];
        if (virtArgsEndIndex > this._cachedData.length) {
            data = this._cachedData.slice(this._cachedData.length - this._prevRequestChunk + 1);
        } else {
            data = this._cachedData.slice(virtualizationArgs.startIndex, virtArgsEndIndex);
            this._prevRequestChunk = virtualizationArgs.chunkSize;
        }
        return data;
    }

    private _updateData(data: any, startIndex: number) {
        for (let i = 0; i < data.value.length; i++) {
            this._cachedData[i + startIndex] = data.value[i];
        }
    }

    private _buildDataUrl(page: number, pageSize: number): string {
        let baseQueryString = `${DATA_URL}?$count=true&`;
        const skip = (page - 1) * pageSize;
        const pageQuery = `$skip=${skip}&$top=${pageSize}`;
        baseQueryString += pageQuery;
        return baseQueryString;
    }
}