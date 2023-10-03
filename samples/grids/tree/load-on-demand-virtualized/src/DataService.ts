import { DataServiceResult, ItemData, SelectableItemData } from "./TreeLoadOnDemandVirtualizedData";

export class DataService {
    /**
     * As we are simulating remote data operations,
     * this set is used to store the selection state of the records before reloading.
     */
    private REMOTE_DATA: ItemData[];

    public constructor() {
        this.REMOTE_DATA = Array.from({ length: 2000 }, (_, idx) => ({ Name: `DESKTOP-${idx}`, Icon: "desktop" }));
    }

    public getChildren(parent: SelectableItemData): Promise<DataServiceResult> {
        return new Promise((resolve) => setTimeout(() => resolve({ Data: this.REMOTE_DATA, TotalCount: 2000 }), 2000));
    }
}
