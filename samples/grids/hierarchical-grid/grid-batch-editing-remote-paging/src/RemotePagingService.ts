import SingersData from './SingersData.json';
import { SingersWithPageResponseModel } from './SingersWithPageResponseModel';

export class RemotePagingService {
    private static allData: any[] = SingersData;

    public static getDataWithPaging(pageIndex: number = 0, pageSize: number = 5): Promise<SingersWithPageResponseModel> {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                const totalRecords = this.allData.length;

                // Paginate data
                const startIndex = pageIndex * pageSize;
                const endIndex = Math.min(startIndex + pageSize, totalRecords);
                const items = this.allData.slice(startIndex, endIndex);

                resolve({
                    items: items,
                    totalRecordsCount: totalRecords,
                    pageSize: pageSize,
                    pageNumber: pageIndex,
                    totalPages: Math.ceil(totalRecords / pageSize)
                });
            }, 300);
        });
    }
}
