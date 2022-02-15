import { defineComponents, IgcTreeComponent, IgcTreeItemComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { DATA } from "./AnimationsData";
import "./TreeBasic.css";

defineComponents(IgcTreeComponent, IgcTreeItemComponent);
export class TreeBasic {
    public data = DATA;
    private tree: IgcTreeComponent;

    constructor() {
        this.tree = document.getElementById("tree") as IgcTreeComponent;
        this.renderItems(this.data);
    }

    private createTreeItem(name: string, parent: HTMLElement): IgcTreeItemComponent {
        const item = document.createElement("igc-tree-item") as IgcTreeItemComponent;
        item.label = name;
        parent.appendChild(item);
        return item;
    }

    private renderItems(items: typeof DATA, parent: HTMLElement = this.tree) {
        if (items === undefined) {
            return;
        }

        items.forEach((i) => {
            const item = this.createTreeItem(i.Name, parent);
            this.renderItems(i.Children, item);
        });
    }
}

new TreeBasic();
