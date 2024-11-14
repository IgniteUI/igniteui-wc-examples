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
    public static BASE_URL = 'https://data-northwind.indigo.design/';
    public static CUSTOMERS_URL = `${RemotePagingService.BASE_URL}Customers/GetCustomersWithPage`;
  
    constructor() {}

    public static getDataWithPaging(pageIndex?: number, pageSize?: number) {
        return fetch(RemotePagingService.buildUrl(RemotePagingService.CUSTOMERS_URL, pageIndex, pageSize))
        .then((result) => result.json())
        .catch((error) => console.error(error.message));
    }
    
    public static getHierarchyDataById(parentEntityName: string, parentId: string, childEntityName: string) {
        return fetch(`${RemotePagingService.BASE_URL}${parentEntityName}/${parentId}/${childEntityName}`)
        .then((result) => result.json());
    }

    private static buildUrl(baseUrl: string, pageIndex?: number, pageSize?: number) {
        let qS = "";
        if (baseUrl) {
                qS += `${baseUrl}`;
        }

        // Add pageIndex and size to the query string if they are defined
        if (pageIndex !== undefined) {
            qS += `?pageIndex=${pageIndex}`;
            if (pageSize !== undefined) {
                qS += `&size=${pageSize}`;
            }
        } else if (pageSize !== undefined) {
            qS += `?perPage=${pageSize}`;
        }

        return `${qS}`;
    }
}