import { defineComponents, IgcTreeComponent, IgcTreeItemComponent, registerIconFromText } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { DataService } from "./DataService";
import { DATA, DataServiceResult, ItemData, RemoteItem, SelectableItemData } from "./TreeLoadOnDemandVirtualizedData";
import { ICONS } from "./SvgIcons";
import { html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

import { when } from "lit/directives/when.js";
import { treeStyles } from "./TreeLoadOnDemandVirtualizedStyles";
import "@lit-labs/virtualizer";

defineComponents(IgcTreeComponent);

@customElement("tree-lod-virtualized")
export class TreeLoadOnDemandVirtualized extends LitElement {
    static styles = [treeStyles];
    @query("#remote-item")
    private remoteItem!: IgcTreeItemComponent;
    public data = DATA;
    private remoteParentData = RemoteItem;
    private dataService = new DataService();
    private remoteItemsData!: SelectableItemData[];
    private remoteDataLoadedAtLeastOnce = false;
    private remoteDataLoaded = false;

    constructor() {
        super();
        this.createIcons();
    }

    private createIcons() {
        ICONS.forEach((icon) => {
            registerIconFromText(icon.name, icon.value, "material");
        });
    }

    private handleExpanded(ev: CustomEvent) {
        if (ev.detail === this.remoteItem && !this.remoteDataLoadedAtLeastOnce) {
            this.loadRemoteItems();
        }
    }

    private refreshRemoteData() {
        // Do not retrigger refresh while already loading
        if (!this.remoteItem.loading) {
            this.requestUpdate();
            this.loadRemoteItems();
        }
    }

    private async loadRemoteItems() {
        this.remoteDataLoaded = false;

        this.remoteItem.loading = true;
        this.remoteItem.disabled = true;

        await this.dataService.getChildren(this.remoteParentData).then((result: DataServiceResult) => {
            this.remoteItemsData = result.Data;
            this.remoteDataLoaded = true;
            this.remoteItem.loading = false;
            this.remoteItem.disabled = false;
            this.remoteParentData.Files = result.Data;
            if (!this.remoteDataLoadedAtLeastOnce) {
                this.remoteDataLoadedAtLeastOnce = true;
            }
            this.requestUpdate();
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

    renderRemoteItem() {
        return html`
            <igc-tree-item id="remote-item" .value=${this.remoteParentData}>
                <div slot="label" class="item">
                    <igc-icon class="tree-item-icon" collection="material" name="${this.remoteParentData.Icon}"></igc-icon>
                    <span class="item-title">${this.remoteParentData.Name}</span>
                    ${when(this.remoteDataLoadedAtLeastOnce, () => html` <igc-icon class="tree-item-icon" collection="material" name="refresh" @click=${this.refreshRemoteData}></igc-icon> `)}
                </div>
                <igc-tree-item label="Loading" id="remote-dummy-child" .value=${{ Name: "Loading" }}> </igc-tree-item>
                ${when(this.remoteDataLoaded, () => this.renderRemoteTreeItemsVirtualized(this.remoteItemsData))}
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

    render() {
        return html`<igc-tree @igcItemExpanded=${this.handleExpanded} @igcSelection=${this.handleSelection} selection="multiple">
            ${this.renderTreeItems(this.data)} 
            ${this.renderRemoteItem()}
        </igc-tree> `;
    }
}

new TreeLoadOnDemandVirtualized();
