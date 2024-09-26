import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


export class RemotePagingService {
  public remoteData: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public dataLength: BehaviorSubject<number> = new BehaviorSubject(0);
  public url = 'https://www.igniteui.com/api/products';

  constructor() {}

  public async getData(index?: number, perPage?: number): Promise<any> {
    let qS = '';

    if (index !== undefined && perPage !== undefined) {
        qS = `?$skip=${index}&$top=${perPage}&$count=true`;
    }

    try {
        const response = await fetch(`${this.url + qS}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propagate the error further
    }
}

public async getDataLength(): Promise<number> {
    try {
        const response = await fetch(this.url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.length; // Assuming the length is directly accessible in the JSON response
    } catch (error) {
        console.error('Error fetching data length:', error);
        throw error; // Propagate the error further
    }
}


}


