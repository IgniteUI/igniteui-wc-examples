import { defineComponents, IgcCheckboxComponent, IgcIconComponent, IgcTreeComponent, IgcTreeItemComponent, IgcCircularProgressComponent, registerIconFromText } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { DataService } from "./DataService";
import { DATA, ItemData, REMOTE_ROOT, SelectableItemData } from "./LoadOnDemandData";
import { icons } from "./SvgIcons";
import "./TreeLoadOnDemand.css";

defineComponents(IgcTreeComponent, IgcTreeItemComponent, IgcCheckboxComponent, IgcIconComponent, IgcCircularProgressComponent);
export class TreeLoadOnDemand {
    public data = DATA;
    private tree: IgcTreeComponent;
    private remoteItem: IgcTreeItemComponent | undefined;
    private dataService: DataService;

    constructor() {
        this.createIcons();
        this.tree = document.getElementById("tree") as IgcTreeComponent;
        this.dataService = new DataService();
        this.renderItems(this.data);
        this.renderRemoteItem();

        this.tree.addEventListener("igcItemExpanded", this.handleExpanded.bind(this));
        this.tree.addEventListener("igcSelection", this.handleSelection.bind(this));
    }

    private handleSelection(ev: CustomEvent) {
        const selectionSet = new Set<IgcTreeItemComponent>(ev.detail.newSelection);
        if (!this.remoteItem) {
            return;
        }
        this.remoteItem.getChildren({ flatten: true }).forEach((item: IgcTreeItemComponent) => {
            if (selectionSet.has(item)) {
                item.value.Selected = true;
            } else {
                item.value.Selected = false;
            }
            this.dataService.setSelected(item);
        });
    }

    private async handleExpanded(ev: CustomEvent) {
        const item = ev.detail as IgcTreeItemComponent;
        if (item === this.remoteItem && !item.hasChildren) {
            item.loading = true;
            item.disabled = true;
            await this.loadRemoteData(item);
            item.loading = false;
            item.disabled = false;
        }
    }

    private renderItems(items: SelectableItemData[], parent: HTMLElement = this.tree) {
        if (items === undefined) {
            return;
        }

        items.forEach((i) => {
            const item = this.createTreeItem(i, parent);
            item.value = i;
            this.renderItems(i.Files!, item);
        });
    }

    private renderRemoteItem() {
        this.renderItems([REMOTE_ROOT]);

        this.remoteItem = this.tree.children[this.tree.children.length - 1] as IgcTreeItemComponent;

        const icon = document.createElement("igc-icon");
        icon.setAttribute("name", "keyboard_arrow_right");
        icon.setAttribute("collection", "internal");

        const div = document.createElement("div");
        div.setAttribute("slot", "indicator");
        div.appendChild(icon);

        this.remoteItem.appendChild(div);
    }

    private async loadRemoteData(item: IgcTreeItemComponent) {
        this.dataService.clearData();

        await this.dataService.getData().then((data) => {
            if (item.selected) {
                data.forEach((e) => {
                    e.Selected = true;
                });
            }
            this.renderItems(data, item);
        });

        const indicatorSlot = item.querySelector('div[slot="indicator"]') as Node;
        if (indicatorSlot) {
            item.removeChild(indicatorSlot);
        }

        const label = item.querySelector('div[slot="label"]');

        if (label && !label.querySelector('igc-icon[name="refresh"]')) {
            this.appendRefreshIcon();
            this.setRemoteItemsSelection();
        }
    }

    private createTreeItem(itemData: SelectableItemData, parent: HTMLElement): IgcTreeItemComponent {
        const item = document.createElement("igc-tree-item") as IgcTreeItemComponent;

        if (itemData.Name === "Computer") {
            item.expanded = true;
        }

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

    private appendRefreshIcon() {
        if (!this.remoteItem) {
            return;
        }

        const label = this.remoteItem.querySelector('div[slot="label"]');

        const refreshIcon = document.createElement("igc-icon");
        refreshIcon.setAttribute("name", "refresh");
        refreshIcon.setAttribute("collection", "material");
        refreshIcon.classList.add("tree-item-icon");

        if (label) {
            label.appendChild(refreshIcon);
        }

        refreshIcon.addEventListener("click", this.refreshItems.bind(this));
    }

    private async refreshItems() {
        if (!this.remoteItem) {
            return;
        }

        const selecitonState = this.remoteItem.selected ? true : false;
        const expansionState =  this.remoteItem.expanded;
        this.remoteItem.loading = true;
        this.remoteItem.disabled = true;

        Array.from(this.remoteItem.children)
        .filter((c) => c.tagName === "IGC-TREE-ITEM")
        .forEach((c) => this.remoteItem!.removeChild(c));
        
        this.remoteItem.selected = selecitonState;

        await this.loadRemoteData(this.remoteItem);

        this.setRemoteItemsSelection();

        this.remoteItem.expanded = expansionState;
        this.remoteItem.loading = false;
        this.remoteItem.disabled = false;
    }

    private setRemoteItemsSelection() {
        if (!this.remoteItem) {
            return;
        }

        this.remoteItem.getChildren().forEach((item) => {
            item.selected = item.value.Selected;
        });
    }

    private createIcons() {
        icons.forEach((icon) => {
            registerIconFromText(icon.name, icon.value, "material");
        });
    }
}

new TreeLoadOnDemand();
