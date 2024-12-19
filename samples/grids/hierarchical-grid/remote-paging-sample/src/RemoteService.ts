import { BehaviorSubject } from 'rxjs';
const URL = `https://data-northwind.indigo.design/`;

function buildUrl(dataState: any, index?: number, perPage?: number): string {
    let qS = "";
    if (dataState) {
        if (dataState.rootLevel) {
            qS += `${dataState.key}`;
        } else {
            qS += `${dataState.parentKey}/${dataState.parentID}/${dataState.key}`;
        }
    }

    // Add index and perPage to the query string if they are defined
    if (index !== undefined) {
        qS += `?index=${index}`;
        if (perPage !== undefined) {
            qS += `&perPage=${perPage}`;
        }
    } else if (perPage !== undefined) {
        qS += `?perPage=${perPage}`;
    }

    return `${URL}${qS}`;
}

export class RemotePagingService {
    public remoteData: BehaviorSubject<any[]> = new BehaviorSubject([]);
    public dataLength: BehaviorSubject<number> = new BehaviorSubject(0);
    public url = 'https://www.igniteui.com/api/products';
  
    constructor() {}

    public async getData(dataState?: any, index?: number, perPage?: number): Promise<any> {
        try {
            const response = await fetch(buildUrl(dataState, index, perPage));
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; 
        }
    }

    public async getDataLength(dataState: any): Promise<number> {
        try {
            const response = await fetch(buildUrl(dataState));
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                return data.length;
            } else {
                console.error('Data is not an array:', data);
                return 0;
            }
        } catch (error) {
            console.error('Error fetching data length:', error);
            return 0; 
        }
    }
}