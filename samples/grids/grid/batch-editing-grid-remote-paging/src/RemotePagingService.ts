export class RemotePagingService {
    public static CUSTOMERS_URL = `https://data-northwind.indigo.design/Customers/GetCustomersWithPage`;
    constructor() {}

    public static getDataWithPaging(pageIndex?: number, pageSize?: number) {
        return fetch(RemotePagingService.buildUrl(RemotePagingService.CUSTOMERS_URL, pageIndex, pageSize))
        .then((result) => result.json())
        .catch((error) => console.error(error.message));
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


