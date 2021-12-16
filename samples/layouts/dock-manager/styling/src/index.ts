import "./DockManagerStyles.css";
import { MenuComponent } from "./menu-component";
import { defineCustomElements } from "igniteui-dockmanager/loader";
import { IgcContentPane, IgcDockManagerComponent, IgcDockManagerLayout, IgcDockManagerPaneType, IgcSplitPaneOrientation } from "igniteui-dockmanager";

defineCustomElements();
window.customElements.define("menu-component", MenuComponent);

import {
    defineComponents,
    IgcAvatarComponent,
    IgcButtonComponent,
    IgcListComponent,
    IgcListHeaderComponent,
    IgcListItemComponent,
    IgcRadioComponent,
    IgcRadioGroupComponent,
    IgcCardComponent,
    IgcCardHeaderComponent,
    IgcCardContentComponent,
    IgcCardMediaComponent,
    IgcCardActionsComponent,
    IgcRippleComponent,
    registerIconFromText,
    IgcIconButtonComponent,
    IgcIconComponent
} from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/bootstrap.css";

defineComponents(
    IgcAvatarComponent,
    IgcButtonComponent,
    IgcListComponent,
    IgcListHeaderComponent,
    IgcListItemComponent,
    IgcRadioComponent,
    IgcRadioGroupComponent,
    IgcCardComponent,
    IgcCardHeaderComponent,
    IgcCardContentComponent,
    IgcCardMediaComponent,
    IgcCardActionsComponent,
    IgcRippleComponent,
    IgcIconButtonComponent,
    IgcIconComponent
);

export class DockManagerStylePanes {
    private dockManager: IgcDockManagerComponent;
    private arrowDown = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>';
    private arrowUp = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 14l5-5 5 5H7z"/></svg>';
    private maxWidth = 1200;
    private minWidth = 800;

    private accountPane: IgcContentPane = {
        type: IgcDockManagerPaneType.contentPane,
        header: "ACCOUNTS",
        contentId: "content1",
        headerId: "accountHeader",
        floatingHeaderId: "accountFloatingHeader",
        isPinned: true,
        allowMaximize: false,
        allowClose: false,
        allowPinning: false
    };

    private cardsPane: IgcContentPane = {
        type: IgcDockManagerPaneType.contentPane,
        header: "PHYSICAL CARDS",
        contentId: "content5",
        headerId: "cardsHeader",
        floatingHeaderId: "cardsFloatingHeader",
        isPinned: true,
        allowMaximize: false,
        allowPinning: false,
        allowClose: false
    };

    private transactionsPane: IgcContentPane = {
        type: IgcDockManagerPaneType.contentPane,
        header: "TRANSACTIONS",
        contentId: "content3",
        headerId: "transactionsHeader",
        floatingHeaderId: "transactionsFloatingHeader",
        isPinned: true,
        allowMaximize: false,
        allowClose: false,
        allowPinning: false
    };

    private popularStocksPane: IgcContentPane = {
        type: IgcDockManagerPaneType.contentPane,
        header: "POPULAR STOCKS",
        contentId: "content4",
        floatingHeaderId: "popularStocksFloatingHeader",
        headerId: "popularStocksHeader",
        isPinned: true,
        allowMaximize: false,
        allowPinning: false,
        allowClose: false
    };

    private topMoversPane: IgcContentPane = {
        type: IgcDockManagerPaneType.contentPane,
        header: "TODAY'S TOP MOVERS",
        contentId: "content2",
        headerId: "todayTopMovers",
        floatingHeaderId: "todayTopMoversFloatingHeader",
        isPinned: true,
        allowMaximize: false,
        allowClose: false,
        allowPinning: false
    };

    layout: IgcDockManagerLayout = {
        rootPane: {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.horizontal,
            panes: [
                {
                    type: IgcDockManagerPaneType.splitPane,
                    orientation: IgcSplitPaneOrientation.vertical,
                    size: 300,
                    panes: [
                        {
                            type: IgcDockManagerPaneType.splitPane,
                            orientation: IgcSplitPaneOrientation.horizontal,
                            size: 300,
                            panes: [
                                {
                                    type: IgcDockManagerPaneType.splitPane,
                                    orientation: IgcSplitPaneOrientation.vertical,
                                    size: 300,
                                    panes: [this.accountPane, this.cardsPane]
                                },
                                {
                                    type: IgcDockManagerPaneType.splitPane,
                                    orientation: IgcSplitPaneOrientation.vertical,
                                    size: 300,
                                    panes: [this.transactionsPane]
                                }
                            ]
                        },
                        {
                            type: IgcDockManagerPaneType.splitPane,
                            orientation: IgcSplitPaneOrientation.horizontal,
                            size: 130,
                            panes: [this.topMoversPane]
                        }
                    ]
                },
                {
                    type: IgcDockManagerPaneType.splitPane,
                    orientation: IgcSplitPaneOrientation.vertical,
                    size: 200,
                    panes: [this.popularStocksPane]
                }
            ]
        }
    };

    layout1: IgcDockManagerLayout = {
        rootPane: {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.horizontal,
            panes: [
                {
                    type: IgcDockManagerPaneType.splitPane,
                    orientation: IgcSplitPaneOrientation.vertical,
                    size: 300,
                    panes: [
                        {
                            type: IgcDockManagerPaneType.splitPane,
                            orientation: IgcSplitPaneOrientation.horizontal,
                            size: 300,
                            panes: [
                                {
                                    type: IgcDockManagerPaneType.splitPane,
                                    orientation: IgcSplitPaneOrientation.vertical,
                                    size: 300,
                                    panes: [
                                        {
                                            type: IgcDockManagerPaneType.tabGroupPane,
                                            size: 100,
                                            panes: [this.accountPane, this.cardsPane]
                                        },
                                        this.transactionsPane
                                    ]
                                },
                                {
                                    type: IgcDockManagerPaneType.splitPane,
                                    orientation: IgcSplitPaneOrientation.vertical,
                                    size: 300,
                                    panes: [this.popularStocksPane]
                                }
                            ]
                        },
                        {
                            type: IgcDockManagerPaneType.splitPane,
                            orientation: IgcSplitPaneOrientation.horizontal,
                            size: 130,
                            panes: [this.topMoversPane]
                        }
                    ]
                }
            ]
        }
    };

    layout2: IgcDockManagerLayout = {
        rootPane: {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            panes: [
                {
                    type: IgcDockManagerPaneType.tabGroupPane,
                    size: 200,
                    panes: [this.accountPane, this.cardsPane, this.transactionsPane]
                },
                {
                    type: IgcDockManagerPaneType.tabGroupPane,
                    size: 300,
                    panes: [this.popularStocksPane, this.topMoversPane]
                }
            ]
        }
    };
    
    layouts:IgcDockManagerLayout[] = [];
    index = 0;
    newIndex = -1;

    constructor() {
        this.layouts = [this.layout, this.layout1, this.layout2];
        
        this.dockManager = document.getElementById("dockManager") as IgcDockManagerComponent;
        this.handleLayoutViews(document.body.clientWidth);

        this.dockManager.addEventListener("closePane", () => this.handleClosePane());
        this.dockManager.addEventListener("pinPane", () => this.handlePinPane());

        document.getElementById("close")!.addEventListener("click", () => this.handleClosePane());

        const cards = document.querySelectorAll("igc-card");
        cards.forEach((card) => {
            (card as IgcCardComponent).outlined = false;
        });

        registerIconFromText("arrow-down", this.arrowDown, "material");
        registerIconFromText("arrow-up", this.arrowUp, "material");

        document.defaultView!.addEventListener("resize", () => this.handleLayoutViews(this.dockManager.offsetWidth));

        document.querySelectorAll(".closeButton").forEach((closeBtn) => {
            closeBtn.addEventListener("click", () => this.handleClosePane());
        });
    }

    handleClosePane() {
        this.dockManager.activePane.hidden = true;
        this.dockManager.layout = { ...this.dockManager.layout };
    }

    handlePinPane() {
        this.dockManager.activePane.isPinned = !this.dockManager.activePane.isPinned;
        this.dockManager.layout = { ...this.dockManager.layout };
    }

    handleLayoutViews(width: number) {
        if (width > this.maxWidth) {
            this.index = 0;
        }
        if (width <= this.maxWidth) {
            this.index = 1;
        }
        if (width <= this.minWidth) {
            this.index = 2;
        }

        this.setLayoutView(this.layouts[this.index]);

        this.newIndex = this.index;
    }

    setLayoutView(layout: IgcDockManagerLayout) {
        if (this.index !== this.newIndex) {
            if (this.dockManager.activePane) {
                this.dockManager.focus();
            }

            this.dockManager.layout = JSON.parse(JSON.stringify(layout));
        }
    }
}

new DockManagerStylePanes();
