import { defineComponents, IgcTreeComponent, IgcTreeItemComponent, registerIconFromText } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { DataService } from "./DataService";
import { DATA, DataServiceResult, ItemData, RemoteItem, SelectableItemData } from "./TreeLoadOnDemandVirtualizedData";
import "./TreeLoadOnDemandVirtualized.css";
import { ICONS } from "./SvgIcons";
import { html, render } from "lit";
import { map } from "lit/directives/map.js";
import "@lit-labs/virtualizer";

defineComponents(IgcTreeComponent);

export class TreeLoadOnDemandVirtualized {
    private tree: IgcTreeComponent;
    private remoteItem!: IgcTreeItemComponent;
    public data = DATA;
    private remoteParentData = RemoteItem;
    private dataService = new DataService();
    private remoteItemsData: SelectableItemData[] = [];
    private remoteDataLoadedAtLeastOnce = false;

    constructor() {
        this.createIcons();
        
        const container = document.getElementsByClassName("container")[0] as HTMLElement;
        if (container !== undefined) {
            render(this.renderTree(), container);
        }
        this.tree = document.getElementById("tree") as IgcTreeComponent;
    }

    private createIcons() {
        ICONS.forEach((icon) => {
            registerIconFromText(icon.name, icon.value, "material");
        });
    }

    private handleExpanded(ev: CustomEvent) {
        if(this.tree && !this.remoteItem) {
            this.remoteItem = this.tree.items.find(i => i.id === "remote-item") as IgcTreeItemComponent;
        }
        if (ev.detail === this.remoteItem && !this.remoteDataLoadedAtLeastOnce) {
            this.loadRemoteItems();
            const labelSlot = this.remoteItem.querySelector('div[slot="label"]') as HTMLElement;
            if (labelSlot) {
                render(this.renderRefreshIcon(), labelSlot);
            }
        }
    }

    private refreshRemoteData() {
        // Do not retrigger refresh while already loading
        if (!this.remoteItem.loading) {
            this.loadRemoteItems();
        }
    }

    private async loadRemoteItems() {
        this.remoteItem.loading = true;
        this.remoteItem.disabled = true;
        const expansionState = this.remoteItem.expanded;
        this.remoteItem.expanded = false;

        await this.dataService.getChildren(this.remoteParentData).then((result: DataServiceResult) => {
            this.remoteItemsData = result.Data;
            this.remoteItem.loading = false;
            this.remoteItem.disabled = false;
            this.remoteParentData.Files = result.Data;
            if (!this.remoteDataLoadedAtLeastOnce) {
                this.remoteDataLoadedAtLeastOnce = true;
            }
            render(this.renderRemoteTreeItemsVirtualized(this.remoteItemsData), this.remoteItem);
            this.remoteItem.expanded = expansionState;
        });
    }

    private handleSelection(ev: CustomEvent) {
        if (this.remoteItemsData.length === 0) {
            return;
        }
        const selectionSet = new Set<IgcTreeItemComponent>(ev.detail.newSelection);

        this.remoteItem.getChildren({ flatten: true }).forEach((item: IgcTreeItemComponent) => {
            if (selectionSet.has(item)) {
                item.value.Selected = true;
            } else {
                item.value.Selected = false;
            }
            // As the data is not stored on a real server, save the item selection state in the data service
            this.dataService.setSelected(item);
        });
    }

    renderRemoteTreeItemsVirtualized(items: SelectableItemData[]) {
        return html`
                    <lit-virtualizer
                        .items=${items}
                        .renderItem=${(i: SelectableItemData) =>
                        html`
                            <igc-tree-item .selected=${i.Selected} expanded style="width: 100%;" .value=${i}>
                                ${this.renderTreeItems(i.Files as SelectableItemData[])} 
                                ${this.createLabelSlot(i)}
                            </igc-tree-item>
                        `}
                    >
                    </lit-virtualizer>
                `;
    }

    renderRefreshIcon() {
        return html`
                    <igc-icon class="tree-item-icon" collection="material" name="refresh" @click=${this.refreshRemoteData.bind(this)}>
                    </igc-icon>
                `;
    }

    renderRemoteItem() {
        return html`
                    <igc-tree-item id="remote-item" .value=${this.remoteParentData}>
                        <div slot="label" class="item">
                            <igc-icon class="tree-item-icon" collection="material" name="${this.remoteParentData.Icon}"></igc-icon>
                            <span class="item-title">${this.remoteParentData.Name}</span>
                        </div>
                        <igc-tree-item label="Loading" .value=${{ Name: "Loading" }} style="visibility: collapse; height: 0px;">
                        </igc-tree-item>
                    </igc-tree-item>
                `;
    }

    createLabelSlot(item: SelectableItemData) {
        return html`
                    <div slot="label" class="item">
                        <igc-icon class="tree-item-icon" collection="material" name="${item.Icon}"></igc-icon>
                        <span class="item-title">${item.Name}</span>
                    </div>
                `;
    }

    renderTreeItems(items: SelectableItemData[]): any {
        return html`
            ${map(
            items,
            (i) =>
                html`
                    <igc-tree-item .expanded=${i.Name === "Computer"} .value=${i} .selected=${i.Selected}>
                        ${this.renderTreeItems(i.Files as ItemData[])} ${this.createLabelSlot(i)}
                    </igc-tree-item>
                `
        )}
            `;
    }

    renderTree() {
        return html`
                    <igc-tree id="tree" @igcItemExpanded=${this.handleExpanded.bind(this)} @igcSelection=${this.handleSelection.bind(this)}
                              selection="multiple">
                        ${this.renderTreeItems(this.data)} 
                        ${this.renderRemoteItem.bind(this)()}
                    </igc-tree>
                `;
    }
}

new TreeLoadOnDemandVirtualized();
