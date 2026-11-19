export class RemotePagingService {
    public static BASE_URL = 'https://data-northwind.indigo.design/';
    public static CUSTOMERS_URL = `${RemotePagingService.BASE_URL}Customers/GetCustomersWithPage`;
  
    constructor() {}

    public static getDataWithPaging(pageIndex?: number, pageSize?: number) {
        return fetch(RemotePagingService.buildUrl(RemotePagingService.CUSTOMERS_URL, pageIndex, pageSize))
        .then(RemotePagingService.readResponse);
    }
    
    public static getHierarchyDataById(parentEntityName: string, parentId: string, childEntityName: string) {
        return fetch(`${RemotePagingService.BASE_URL}${parentEntityName}/${parentId}/${childEntityName}`)
        .then(RemotePagingService.readResponse);
    }

    private static readResponse(response: Response) {
        if (!response.ok) {
            throw new Error(`Northwind request failed (${response.status}): ${response.url}`);
        }
        return response.json();
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