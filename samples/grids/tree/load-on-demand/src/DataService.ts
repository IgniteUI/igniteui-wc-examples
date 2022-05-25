import { IgcTreeItemComponent } from "igniteui-webcomponents";
import { REMOTE_DATA, SelectableItemData } from "./LoadOnDemandData";

export class DataService {
    private _data: SelectableItemData[] = [];
    private _selected: Set<string> = new Set<string>();

    public getData(): Promise<SelectableItemData[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this._data = REMOTE_DATA;
                const passed = this._data.map((e) => {
                    const selectionState: Partial<SelectableItemData> = {};
                    if (this._selected.has(e.Name)) {
                        selectionState.Selected = true;
                    } else {
                        selectionState.Selected = false;
                    }
                    return Object.assign({}, e, selectionState);
                });
                return resolve(passed);
            }, 2000);
        });
    }

    public clearData() {
        this._data = [];
    }

    public clearSelect() {
        this._selected = new Set<string>();
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
