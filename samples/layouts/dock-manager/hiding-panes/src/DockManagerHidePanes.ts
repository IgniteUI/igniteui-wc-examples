import "./DockManagerStyles.css";
import { defineCustomElements } from "igniteui-dockmanager/loader";
import { IgcContentPane, IgcDockManagerLayout, IgcDockManagerPaneType } from "igniteui-dockmanager";
import { IgcSplitPaneOrientation } from "igniteui-dockmanager";
import { IgcDockManagerComponent } from "igniteui-dockmanager";

defineCustomElements();

export class DockManagerHidePanes {
    private dockManager: IgcDockManagerComponent;

    private panes: HTMLSelectElement;
    private hiddenPanes: IgcContentPane[] = [];

    layout: IgcDockManagerLayout = {
        rootPane: {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.horizontal,
            panes: [
                {
                    type: IgcDockManagerPaneType.splitPane,
                    orientation: IgcSplitPaneOrientation.vertical,
                    panes: [
                        {
                            type: IgcDockManagerPaneType.contentPane,
                            contentId: "content1",
                            header: "Content Pane 1"
                        },
                        {
                            type: IgcDockManagerPaneType.contentPane,
                            contentId: "content2",
                            header: "Unpinned Pane 1",
                            isPinned: false
                        }
                    ]
                }
            ]
        },
        floatingPanes: [
            {
                type: IgcDockManagerPaneType.splitPane,
                orientation: IgcSplitPaneOrientation.horizontal,
                floatingHeight: 150,
                floatingWidth: 250,
                floatingLocation: { x: 300, y: 200 },
                panes: [
                    {
                        type: IgcDockManagerPaneType.contentPane,
                        contentId: "content12",
                        header: "Floating Pane"
                    }
                ]
            }
        ]
    };

    constructor() {
        this.panes = document.getElementById("panes") as HTMLSelectElement;
        this.dockManager = document.getElementById("dockManager") as IgcDockManagerComponent;

        this.dockManager.layout = { ...this.layout };

        this.handlePaneClose();
        this.showPane();
    }

    public handlePaneClose() {
        this.dockManager.addEventListener("paneClose", (ev) => {
            for (const pane of ev.detail.panes) {
                pane.hidden = true;
                this.setHiddenPane(pane);
            }
            ev.preventDefault();
        });
    }

    private setHiddenPane(pane: IgcContentPane) {
        var option = document.createElement("option");
        option.textContent = pane.header;
        option.value = pane.id!;
        this.panes.appendChild(option);

        this.hiddenPanes.push(pane);
    }

    private showPane() {
        document.getElementById("showPane")?.addEventListener("click", () => {
            const paneId = this.panes.value;
            const pane = this.hiddenPanes.find((hiddenPane) => hiddenPane.id === paneId);

            if (pane) {
                pane.hidden = false;
            }

            const index = this.hiddenPanes.indexOf(pane as IgcContentPane);
            this.hiddenPanes.splice(index, 1);
            this.panes.removeChild(this.panes.options[index]);

            this.dockManager.layout = { ...this.dockManager.layout };
        });
    }

}

new DockManagerHidePanes();
