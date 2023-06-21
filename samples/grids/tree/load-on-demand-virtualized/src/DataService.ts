import { IgcTreeItemComponent } from "igniteui-webcomponents";
import { DataServiceResult, ItemData, SelectableItemData } from "./TreeLoadOnDemandVirtualizedData";

export class DataService {
    /**
     * As we are simulating remote data operations,
     * this set is used to store the selection state of the records before reloading.
     */
    private _selected: Set<string> = new Set<string>();
    private REMOTE_DATA: ItemData[] = [];
    public constructor() {
        for (let index = 0; index < 2000; index++) {
            if (index === 1) {
                this.REMOTE_DATA.push({
                    Name: "DESKTOP-" + index.toString(),
                    Icon: "desktop",
                    Files: [
                        { Name: "DESKTOP-" + index.toString() + " Child 1", Icon: "desktop" },
                        { Name: "DESKTOP-" + index.toString() + " Child 2", Icon: "desktop" }
                    ]
                });
                continue;
            }
            this.REMOTE_DATA.push({ Name: "DESKTOP-" + index.toString(), Icon: "desktop" });
        }
    }

    public getChildren(parent: SelectableItemData): Promise<DataServiceResult> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const passed = this.REMOTE_DATA.map((item) => {
                    const selectionState: Partial<SelectableItemData> = {};
                    // If the record persists in the set it is marked as selected
                    if (this._selected.has(item.Name)) {
                        selectionState.Selected = true;
                    }
                    return Object.assign({}, item, selectionState);
                });
                return resolve({ Data: passed, TotalCount: 2002 });
            }, 2000);
        });
    }

    public setSelected(item: IgcTreeItemComponent) {
        const name = item.value.Name;

        if (item.value.Selected) {
            this._selected.add(name);
        } else {
            this._selected.delete(name);
        }
    }
}
