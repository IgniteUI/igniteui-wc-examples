import { defineComponents, IgcTreeComponent, IgcTreeItemComponent, IgcVirtualScrollComponent, registerIconFromText } from "igniteui-webcomponents";
import type { VirtualScrollItemContext } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { DataService } from "./DataService";
import { DATA, RemoteItem, SelectableItemData } from "./TreeLoadOnDemandVirtualizedData";
import "./TreeLoadOnDemandVirtualized.css";
import { ICONS } from "./SvgIcons";
import { html, nothing, render, TemplateResult } from "lit";

defineComponents(IgcTreeComponent, IgcVirtualScrollComponent);

export class TreeLoadOnDemandVirtualized {
    public data = DATA;
    private remoteData: SelectableItemData[] = [];
    private remoteParentData = RemoteItem;
    private dataService = new DataService();
    private dataLoaded = false;
    private dataLoading = false;

    private get tree() {
        return document.querySelector("igc-tree")!;
    }

    private get remoteNode() {
        return this.tree.querySelector("[data-remote]") as IgcTreeItemComponent;
    }

    constructor() {
        for (const icon of ICONS) {
            registerIconFromText(icon.name, icon.value, "material");
        }

        this.tree.addEventListener("igcItemExpanded", this.remoteItemExpanded.bind(this));
        this.tree.addEventListener("igcItemCollapsed", this.remoteItemCollapsed.bind(this));

        this.render();
    }

    private remoteItemExpanded(event: CustomEvent<IgcTreeItemComponent>) {
        if (event.detail.isSameNode(this.remoteNode) && !this.dataLoaded) {
            this.loadData();
        } else {
            this.render();
        }
    }

    private remoteItemCollapsed(event: CustomEvent<IgcTreeItemComponent>) {
        if (event.detail.isSameNode(this.remoteNode)) {
            this.render();
        }
    }

    private async loadData() {
        this.dataLoading = true;
        this.render();

        this.remoteData = (await this.dataService.getChildren(this.remoteParentData)).Data;
        this.dataLoaded = true;
        this.dataLoading = false;
        this.render();
    }

    private clearRemoteData() {
        this.remoteData = [];
        this.dataLoaded = false;
        this.render();
    }

    private refreshData() {
        this.clearRemoteData();
        this.loadData();
        this.render();
    }

    private renderRefreshIcon() {
        const isShowing = !this.dataLoading && this.dataLoaded;
        return isShowing
            ? html`<igc-icon
                  class="tree-item-"
                  collection="material"
                  name="refresh"
                  @click=${this.refreshData}
              ></igc-icon> `
            : nothing;
    }

    private renderTreeItem(data: SelectableItemData[]): TemplateResult[] {
        return data.map(
            (item) => html`
                <igc-tree-item ?expanded=${item.Name === "Computer"} .value=${item}>
                    <div slot="label" class="item">
                        <igc-icon class="tree-item-icon" collection="material" name=${item.Icon}></igc-icon>
                        <span class="item-title">${item.Name}</span>
                    </div>
                    ${this.renderTreeItem(item.Files! ?? [])}
                </igc-tree-item>
            `
        );
    }

    private renderRemoteTreeItem() {
        return html` <igc-tree-item
            data-remote
            ?disabled=${this.dataLoading}
            ?loading=${this.dataLoading}
            .value=${this.remoteParentData}
        >
            <div slot="label" class="item">
                <igc-icon class="tree-item-icon" collection="material" name=${this.remoteParentData.Icon}></igc-icon>
                <span class="item-title">${this.remoteParentData.Name}</span>
                ${this.renderRefreshIcon()}
            </div>

            <igc-tree-item style="display: none"></igc-tree-item>

            ${this.renderRemoteChildren()}
        </igc-tree-item>`;
    }

    // Virtualized children of the remote node. Omitted while empty, so the fixed-height viewport does not show.
    private renderRemoteChildren() {
        const isShowing = this.remoteNode?.expanded && this.remoteData.length > 0;
        return isShowing
            ? html`<igc-virtual-scroll
                  .data=${this.remoteData}
                  .itemTemplate=${(ctx: VirtualScrollItemContext<SelectableItemData>) => this.renderTreeItem([ctx.value])}
              ></igc-virtual-scroll>`
            : nothing;
    }

    private render() {
        render([this.renderTreeItem(this.data), this.renderRemoteTreeItem()], this.tree, { host: this });
    }
}

new TreeLoadOnDemandVirtualized();
