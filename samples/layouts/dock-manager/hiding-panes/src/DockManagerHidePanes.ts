import "./DockManagerStyles.css";
import { defineCustomElements } from "igniteui-dockmanager/loader";
import { IgcContentPane, IgcDockManagerLayout, IgcDockManagerPaneType } from "igniteui-dockmanager";
import { IgcSplitPaneOrientation } from "igniteui-dockmanager";
import { IgcDockManagerComponent } from "igniteui-dockmanager";

defineCustomElements();

export class DockManagerHidePanes {
    private dockManager: IgcDockManagerComponent;

    private panesSelect: HTMLSelectElement;
    private hideOnCloseCheckbox: HTMLInputElement;

    private hiddenPanes: IgcContentPane[] = [];
    private savedHiddenPanes: IgcContentPane[] = [];

    private savedLayout: string;

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
        this.panesSelect = document.getElementById("panes") as HTMLSelectElement;
        this.hideOnCloseCheckbox = document.getElementById("hideOnCloseCheckbox") as HTMLInputElement;
        this.dockManager = document.getElementById("dockManager") as IgcDockManagerComponent;
        this.dockManager.layout = { ...this.layout };
        this.savedLayout = "";

        this.handlePaneClose();
        this.showPane();
        this.showAllPanes();
        this.saveLayout();
        this.loadLayout();
    }

    public handlePaneClose() {
        this.dockManager.addEventListener("paneClose", (ev) => {
            if (this.hideOnCloseCheckbox.checked) {
                for (const pane of ev.detail.panes) {
                    pane.hidden = true;
                    this.setHiddenPane(pane);
                }
                ev.preventDefault();
            }
        });
    }

    private setHiddenPane(pane: IgcContentPane) {
        let option = document.createElement("option");
        option.textContent = pane.header;
        option.value = pane.id!;
        this.panesSelect.appendChild(option);

        this.hiddenPanes.push(pane);
    }

    private showPane() {
        document.getElementById("showPane")?.addEventListener("click", () => {
            const paneId = this.panesSelect.value;
            const pane = this.hiddenPanes.find((hiddenPane) => hiddenPane.id === paneId);

            if (pane) {
                pane.hidden = false;
            }
            const index = this.hiddenPanes.indexOf(pane as IgcContentPane);
            this.hiddenPanes.splice(index, 1);

            this.panesSelect.removeChild(this.panesSelect.options[index]);

            this.dockManager.layout = { ...this.dockManager.layout };
        });
    }

    private showAllPanes() {
        document.getElementById("showAllPanes")?.addEventListener("click", () => {
            if (this.hiddenPanes.length > 0) {
                for (const pane of this.hiddenPanes) {
                    pane.hidden = false;
                }
                this.hiddenPanes = [];

                this.dockManager.layout = { ...this.dockManager.layout };
                this.removeAllOptions();
            }
        });
    }

    private saveLayout() {
        document.getElementById("saveLayout")?.addEventListener("click", () => {
            this.savedHiddenPanes = [...this.hiddenPanes];
            this.savedLayout = JSON.stringify(this.dockManager.layout);
        });
    }

    private loadLayout() {
        document.getElementById("loadLayout")?.addEventListener("click", () => {
            this.hiddenPanes = [...this.savedHiddenPanes];
            this.clearNotSavedPanes();
            this.dockManager.layout = JSON.parse(this.savedLayout);
        });
    }

    private clearNotSavedPanes() {
        this.removeAllOptions();

        this.hiddenPanes.map((hiddenPane) => {
            let option = document.createElement("option");
            option.textContent = hiddenPane.header;
            option.value = hiddenPane.id!;
            this.panesSelect.appendChild(option);
        });
    }

    private removeAllOptions() {
        this.panesSelect.options.length = 0;
    }
}

new DockManagerHidePanes();
