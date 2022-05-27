import { IgcTreeItemComponent } from "igniteui-webcomponents";
import { REMOTE_DATA, SelectableItemData } from "./LoadOnDemandData";

export class DataService {
    /**
     * As we are simulating remote data operations,
     * this set is used to store the selection state of the records before reloading.
     */
    private _selected: Set<string> = new Set<string>();

    public getChildren(parent: SelectableItemData): Promise<SelectableItemData[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const passed = REMOTE_DATA.map((item) => {
                    const selectionState: Partial<SelectableItemData> = {};
                    // If the record persists in the set it is marked as selected
                    if (this._selected.has(item.Name)) {
                        selectionState.Selected = true;
                    } else {
                        selectionState.Selected = parent.Selected;
                    }
                    return Object.assign({}, item, selectionState);
                });
                return resolve(passed);
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
