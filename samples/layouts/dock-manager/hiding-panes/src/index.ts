import "./DockManagerStyles.css";
import {
    defineComponents,
    IgcContentPane,
    IgcDockManagerComponent,
    IgcDockManagerLayout,
    IgcDockManagerPaneType,
    IgcPaneCloseEventArgs,
    IgcSplitPaneOrientation } from "igniteui-dockmanager";

defineComponents(IgcDockManagerComponent);

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
                            contentId: "content10",
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

        this.dockManager.addEventListener("paneClose", (ev: CustomEvent<IgcPaneCloseEventArgs>) => {
            this.handlePaneClose(ev);
        });

        let showOnePane = document.getElementById("showOnePane");
        if (showOnePane) {
            showOnePane.addEventListener("click", () => {this.onClickShowOnePane(); });
        }

        let showAllPanes = document.getElementById("showAllPanes");
        if (showAllPanes) {
            showAllPanes.addEventListener("click", () => {this.onClickShowAllPanes(); });
        }
    }

    private handlePaneClose(ev: CustomEvent<IgcPaneCloseEventArgs>) {
        for (const pane of ev.detail.panes) {
            pane.hidden = true;
            this.setHiddenPane(pane);

            if (this.dockManager.maximizedPane)
            {
                if (this.dockManager.maximizedPane === pane ||
                    (this.dockManager.maximizedPane.type === IgcDockManagerPaneType.tabGroupPane &&
                        this.dockManager.maximizedPane.panes.findIndex(() => pane as IgcContentPane) > -1)) {
                    this.dockManager.maximizedPane.isMaximized = false;
                    this.dockManager.maximizedPane = null;
                }
            }
        }
        ev.preventDefault();
    }

    private setHiddenPane(pane: IgcContentPane) {
        let option = document.createElement("option");
        option.textContent = pane.header;
        this.paneSelect.appendChild(option);

        this.hiddenPanes.push(pane);
    }

    private onClickShowOnePane() {
        const index = this.paneSelect.selectedIndex;

        if (index >= 0) {
            this.hiddenPanes[index].hidden = false;
            this.hiddenPanes.splice(index, 1);
            this.paneSelect.removeChild(this.paneSelect.options[index]);
            this.dockManager.layout = { ...this.dockManager.layout };
        }
    }

    private onClickShowAllPanes() {
        if (this.hiddenPanes.length > 0) {
            for (const pane of this.hiddenPanes) {
                pane.hidden = false;
            }
            this.hiddenPanes = [];
            this.dockManager.layout = { ...this.dockManager.layout };
            this.clearOptions();
        }
    }

    private clearOptions() {
        this.paneSelect.options.length = 0;
    }
}

export function initialize() {
  return new DockManagerHidePanes();
}