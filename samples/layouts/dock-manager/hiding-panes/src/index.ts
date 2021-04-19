import "./DockManagerStyles.css";
import { defineCustomElements } from "igniteui-dockmanager/loader";
import { IgcContentPane, IgcDockManagerLayout, IgcDockManagerPaneType, IgcPaneCloseEventArgs } from "igniteui-dockmanager";
import { IgcSplitPaneOrientation } from "igniteui-dockmanager";
import { IgcDockManagerComponent } from "igniteui-dockmanager";

defineCustomElements();

export class DockManagerHidePanes {
    private dockManager: IgcDockManagerComponent;

    private paneSelect: HTMLSelectElement;

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
                },
                {
                    type: IgcDockManagerPaneType.documentHost,
                    size: 300,
                    rootPane: {
                        type: IgcDockManagerPaneType.splitPane,
                        orientation: IgcSplitPaneOrientation.horizontal,
                        panes: [
                            {
                                type: IgcDockManagerPaneType.tabGroupPane,
                                panes: [
                                    {
                                        type: IgcDockManagerPaneType.contentPane,
                                        header: "MainWindow.xaml",
                                        contentId: "content3"
                                    },
                                    {
                                        type: IgcDockManagerPaneType.contentPane,
                                        header: "MainWindow.xaml.cs",
                                        contentId: "content4"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    type: IgcDockManagerPaneType.splitPane,
                    orientation: IgcSplitPaneOrientation.vertical,
                    panes: [
                        {
                            type: IgcDockManagerPaneType.tabGroupPane,
                            size: 200,
                            panes: [
                                {
                                    type: IgcDockManagerPaneType.contentPane,
                                    contentId: "content5",
                                    header: "Tab 1"
                                },
                                {
                                    type: IgcDockManagerPaneType.contentPane,
                                    contentId: "content6",
                                    header: "Tab 2"
                                },
                                {
                                    type: IgcDockManagerPaneType.contentPane,
                                    contentId: "content7",
                                    header: "Tab 3"
                                },
                                {
                                    type: IgcDockManagerPaneType.contentPane,
                                    contentId: "content8",
                                    header: "Tab 4"
                                },
                                {
                                    type: IgcDockManagerPaneType.contentPane,
                                    contentId: "content9",
                                    header: "Tab 5"
                                }
                            ]
                        },
                        {
                            type: IgcDockManagerPaneType.contentPane,
                            contentId: "content20",
                            header: "Content Pane 2"
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
                        contentId: "content11",
                        header: "Floating Pane"
                    }
                ]
            }
        ]
    };

    constructor() {
        this.paneSelect = document.getElementById("panes") as HTMLSelectElement;
        this.dockManager = document.getElementById("dockManager") as IgcDockManagerComponent;
        this.dockManager.layout = { ...this.layout };

        this.handlePaneClose();
        this.showAllPanes();
        document.getElementById("showPane")?.addEventListener("click", () => {
            this.showPane();
        });
    }

    public handlePaneClose() {
        this.dockManager.addEventListener("paneClose", (ev: CustomEvent<IgcPaneCloseEventArgs>) => {
            for (const pane of ev.detail.panes) {
                pane.hidden = true;
                this.setHiddenPane(pane);
            }
            ev.preventDefault();
        });
    }

    private setHiddenPane(pane: IgcContentPane) {
        let option = document.createElement("option");
        option.textContent = pane.header;
        this.paneSelect.appendChild(option);

        this.hiddenPanes.push(pane);
    }

    private showPane() {
        const index = this.paneSelect.selectedIndex;

        if (index >= 0) {
            this.hiddenPanes[index].hidden = false;
            this.hiddenPanes.splice(index, 1);
            this.paneSelect.removeChild(this.paneSelect.options[index]);
            this.dockManager.layout = { ...this.dockManager.layout };
        }
    }

    private showAllPanes() {
        document.getElementById("showAllPanes")?.addEventListener("click", () => {
            if (this.hiddenPanes.length > 0) {
                for (const pane of this.hiddenPanes) {
                    pane.hidden = false;
                }
                this.hiddenPanes = [];
                this.dockManager.layout = { ...this.dockManager.layout };
                this.clearOptions();
            }
        });
    }

    private clearOptions() {
        this.paneSelect.options.length = 0;
    }
}

new DockManagerHidePanes();
