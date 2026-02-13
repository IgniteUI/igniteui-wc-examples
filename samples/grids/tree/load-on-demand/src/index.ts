import { defineComponents, IgcTreeComponent, IgcTreeItemComponent, registerIconFromText } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { DataService } from "./DataService";
import { DATA, ItemData, SelectableItemData } from "./LoadOnDemandData";
import { ICONS } from "./SvgIcons";
import "./TreeLoadOnDemand.css";

defineComponents(IgcTreeComponent);
export class TreeLoadOnDemand {
    public data = DATA;
    private tree: IgcTreeComponent;
    private dataService = new DataService();

    constructor() {
        this.createIcons();
        this.tree = (document.getElementById("tree") as any) as IgcTreeComponent;
        this.renderItems(this.data);
        this.tree.items[0].expanded = true;

        this.tree.addEventListener("igcItemExpanded", this.handleExpanded.bind(this));
        this.tree.addEventListener("igcSelection", this.handleSelection.bind(this));
    }

    private handleSelection(ev: CustomEvent) {
        const selectionSet = new Set<IgcTreeItemComponent>(ev.detail.newSelection);

        this.tree.items.forEach((item: IgcTreeItemComponent) => {
            if (selectionSet.has(item)) {
                item.value.Selected = true;
            } else {
                item.value.Selected = false;
            }
            // As the data is not stored on a real server, save the item selection state in the data service
            this.dataService.setSelected(item);
        });
    }

    private async handleExpanded(ev: CustomEvent) {
        const item = ev.detail as IgcTreeItemComponent;
        // The parent record of remote items initially has an empty Files array
        if (this.isRemoteItemsParent(item.value.Files)) {
            await this.loadRemoteItems(item);
            this.appendRefreshIcon(item);
        }
    }

    private async loadRemoteItems(item: IgcTreeItemComponent) {
        // Save current selection state
        const selecitonState = item.selected;

        // Removing child items one by one modifies their parent selection state
        Array.from(item.children)
        .filter((c) => c.tagName === "IGC-TREE-ITEM")
        .forEach((c) => item!.removeChild(c));

        // Restoring selection state of the parent as before
        item.selected = selecitonState;

        item.loading = true;
        item.disabled = true;

        await this.dataService.getChildren(item.value).then((data) => {
            this.renderItems(data, item);
            item.value.Files = data;
        });

        item.loading = false;
        item.disabled = false;
    }

    private renderItems(items: SelectableItemData[], parent: HTMLElement = this.tree) {
        if (items === undefined) {
            return;
        }

        if (this.isRemoteItemsParent(items)) {
            this.createTreeItem({Name: 'Loading', Icon: 'network'}, parent);
        }

        items.forEach((i) => {
            const item = this.createTreeItem(i, parent);
            this.renderItems(i.Files!, item);
        });
    }

    private createTreeItem(itemData: SelectableItemData, parent: HTMLElement): IgcTreeItemComponent {
        const item = document.createElement("igc-tree-item") as IgcTreeItemComponent;

        item.value = itemData;
        item.selected = !!itemData.Selected;

        const itemSlot = this.createLabelSlot(itemData);
        item.appendChild(itemSlot);
        parent.appendChild(item);

        return item;
    }

    private createLabelSlot(data: ItemData): HTMLElement {
        const icon = document.createElement("igc-icon");
        icon.setAttribute("name", data.Icon);
        icon.setAttribute("collection", "material");
        icon.classList.add("tree-item-icon");

        const span = document.createElement("span");
        span.innerText = data.Name;
        span.classList.add("item-title");

        const div = document.createElement("div");
        div.setAttribute("slot", "label");
        div.classList.add("item");
        div.appendChild(icon);
        div.appendChild(span);

        return div;
    }

    private appendRefreshIcon(item: IgcTreeItemComponent) {
        const label = item.querySelector('div[slot="label"]');

        if (!label) {
            return;
        }

        const refreshIcon = document.createElement("igc-icon");
        refreshIcon.setAttribute("name", "refresh");
        refreshIcon.setAttribute("collection", "material");
        refreshIcon.classList.add("tree-item-icon");

        label.appendChild(refreshIcon);

        refreshIcon.addEventListener("click", this.loadRemoteItems.bind(this, item));
    }

    private isRemoteItemsParent(items: SelectableItemData[]){
        // Parent records of remote items initially have no child items, i.e. their Files array is empty
        return Array.isArray(items) && !items.length;
    }

    private createIcons() {
        ICONS.forEach((icon) => {
            registerIconFromText(icon.name, icon.value, "material");
        });
    }
}

export function initialize() {
  return new TreeLoadOnDemand();
}