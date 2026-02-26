import { EmployeesNestedTreeData, EmployeesNestedTreeDataItem } from './EmployeesNestedTreeData';
import { EmployeesWithPageResponseModel } from './EmployeesWithPageResponseModel';

export class RemotePagingService {
    private static allData: EmployeesNestedTreeDataItem[] = [...new EmployeesNestedTreeData()];

    public static getDataWithPaging(pageIndex: number = 0, pageSize: number = 5): Promise<EmployeesWithPageResponseModel> {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                // Get root level items (ParentID === -1)
                const rootItems = this.allData.filter(item => item.ParentID === -1);
                const totalRootRecords = rootItems.length;

                // Paginate root items
                const startIndex = pageIndex * pageSize;
                const endIndex = Math.min(startIndex + pageSize, totalRootRecords);
                const pagedRootItems = rootItems.slice(startIndex, endIndex);

                // Get all children for the paged root items
                const pagedRootIds = pagedRootItems.map(item => item.ID);
                const childItems = this.getAllDescendants(pagedRootIds);

                // Combine root items and their children
                const items = [...pagedRootItems, ...childItems];

                resolve({
                    items: items,
                    totalRecordsCount: totalRootRecords,
                    pageSize: pageSize,
                    pageNumber: pageIndex,
                    totalPages: Math.ceil(totalRootRecords / pageSize)
                });
            }, 300);
        });
    }

    private static getAllDescendants(parentIds: number[]): EmployeesNestedTreeDataItem[] {
        const descendants: EmployeesNestedTreeDataItem[] = [];
        const childrenToProcess = this.allData.filter(item => parentIds.includes(item.ParentID));

        if (childrenToProcess.length > 0) {
            descendants.push(...childrenToProcess);
            const childIds = childrenToProcess.map(item => item.ID);
            descendants.push(...this.getAllDescendants(childIds));
        }

        return descendants;
    }
}
