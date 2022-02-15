import { defineComponents, IgcCheckboxComponent, IgcIconComponent, IgcTreeComponent, IgcTreeItemComponent, registerIconFromText } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { DATA, NodeData, REMOTE_ROOT, DataService } from "./LoadOnDemandData";
import { icons } from "./SvgIcons";
import "./TreeLoadOnDemand.css";

defineComponents(IgcTreeComponent, IgcTreeItemComponent, IgcCheckboxComponent, IgcIconComponent);
export class TreeLoadOnDemand {
    public data = DATA;
    private tree: IgcTreeComponent;
    private remoteItem: IgcTreeItemComponent | undefined;

    constructor() {
        this.createIcons();
        this.tree = document.getElementById("tree") as IgcTreeComponent;
        this.renderItems(this.data);
        this.renderRemoteItem();

        this.tree.addEventListener("igcItemExpanded", this.handleExpanded.bind(this));
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

    private async handleExpanded(ev: CustomEvent) {
        const item = ev.detail as IgcTreeItemComponent;
        if (item === this.remoteItem && !item.hasChildren) {
            item.loading = true;
            await this.loadNestedData(item);
            item.loading = false;
        }
    }

    private async loadNestedData(item: IgcTreeItemComponent) {
        const itemSelectionState = item.selected;

        await DataService.getData().then((data) => {
            this.renderItems(data, item);
        });

        item.selected = itemSelectionState;

        const indicatorSlot = item.querySelector('div[slot="indicator"]') as Node;
        if (indicatorSlot) {
            item.removeChild(indicatorSlot);
        }

        const label = item.querySelector('div[slot="label"]');

        if(label && !label.querySelector('igc-icon[name="refresh"]')) {
            this.appendRefreshIcon(item);
        }
    }

    private createTreeItem(nodeData: NodeData, parent: HTMLElement): IgcTreeItemComponent {
        const item = document.createElement("igc-tree-item") as IgcTreeItemComponent;

        if (nodeData.Name === "Computer") {
            item.expanded = true;
        }

        const itemSlot = this.createLabelSlot(nodeData);
        item.appendChild(itemSlot);
        parent.appendChild(item);

        return item;
    }

    private renderItems(items: NodeData[], parent: HTMLElement = this.tree) {
        if (items === undefined) {
            return;
        }

        items.forEach((i) => {
            const item = this.createTreeItem(i, parent);
            this.renderItems(i.Files!, item);
        });
    }

    private createLabelSlot(data: NodeData): HTMLElement {
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

        const refreshIcon = document.createElement("igc-icon");
        refreshIcon.setAttribute("name", "refresh");
        refreshIcon.setAttribute("collection", "material");
        refreshIcon.classList.add("tree-item-icon");

        if (label) {
            label.appendChild(refreshIcon);
        }

        refreshIcon.addEventListener("click", async () => {
            item.loading = true;
            Array.from(item.children).filter(c => c.tagName === "IGC-TREE-ITEM").forEach(c => item.removeChild(c));
            await this.loadNestedData(item);
            item.expanded = true;
            item.loading = false;
        });
    }

    private createIcons() {
        icons.forEach((icon) => {
            registerIconFromText(icon.name, icon.value, "material");
        });
    }
}

new TreeLoadOnDemand();
