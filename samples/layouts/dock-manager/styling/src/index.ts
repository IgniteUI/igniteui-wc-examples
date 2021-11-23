import "./DockManagerStyles.css";
import { MenuComponent } from "./menu-component";
import { defineCustomElements } from "igniteui-dockmanager/loader";
import { IgcDockManagerComponent, IgcDockManagerLayout, IgcDockManagerPaneType, IgcSplitPaneOrientation, IgcUnpinnedLocation } from "igniteui-dockmanager";

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
    registerIcon,
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
                                    panes: [
                                        {
                                            type: IgcDockManagerPaneType.contentPane,
                                            header: "ACCOUNTS",
                                            contentId: "content1",
                                            headerId: "accountHeader",
                                            unpinnedLocation: IgcUnpinnedLocation.top,
                                            isPinned: true,
                                            allowMaximize: false,
                                            allowClose: false,
                                            allowPinning: false
                                        },
                                        {
                                            type: IgcDockManagerPaneType.contentPane,
                                            header: "PHYSICAL CARDS",
                                            contentId: "content5",
                                            headerId: "cardsHeader",
                                            unpinnedLocation: IgcUnpinnedLocation.right,
                                            isPinned: true,
                                            allowMaximize: false,
                                            allowPinning: false,
                                            allowClose: false
                                        }
                                    ]
                                },
                                {
                                  type: IgcDockManagerPaneType.splitPane,
                                  orientation: IgcSplitPaneOrientation.vertical,
                                  size: 300,
                                  panes: [
                                      {
                                          type: IgcDockManagerPaneType.contentPane,
                                          header: "TRANSACTIONS",
                                          contentId: "content3",
                                          headerId: "transactionsHeader",
                                          unpinnedLocation: IgcUnpinnedLocation.bottom,
                                          isPinned: true,
                                          allowMaximize: false,
                                          allowClose: false,
                                          allowPinning: false
                                      }
                                  ]
                                }
                            ]
                        },
                        {
                          type: IgcDockManagerPaneType.splitPane,
                          orientation: IgcSplitPaneOrientation.horizontal,
                          size: 130,
                          panes: [
                              {
                                  type: IgcDockManagerPaneType.contentPane,
                                  header: "TODAY'S TOP MOVERS",
                                  contentId: "content2",
                                  headerId: "todayTopMovers",
                                  unpinnedLocation: IgcUnpinnedLocation.top,
                                  isPinned: true,
                                  allowMaximize: false,
                                  allowClose: false,
                                  allowPinning: false
                              }
                          ]
                      }
                    ]
                },
                {
                    type: IgcDockManagerPaneType.splitPane,
                    orientation: IgcSplitPaneOrientation.vertical,
                    size: 200,
                    panes: [
                      {
                          type: IgcDockManagerPaneType.contentPane,
                          header: "POPULAR STOCKS",
                          contentId: "content4",
                          headerId: "popularStocksHeader",
                          unpinnedLocation: IgcUnpinnedLocation.top,
                          isPinned: true,
                          allowMaximize: false,
                          allowPinning: false,
                          allowClose: false
                      }
                    ]
                }
            ]
        }
    };

    constructor() {
        this.dockManager = document.getElementById("dockManager") as IgcDockManagerComponent;
        this.dockManager.layout = { ...this.layout };

        this.dockManager.addEventListener("closePane", () => this.handleClosePane());
        this.dockManager.addEventListener("pinPane", () => this.handlePinPane());

        registerIcon("arrow-down", "https://fonts.gstatic.com/s/i/materialiconsoutlined/arrow_drop_down/v15/24px.svg", "material");
        registerIcon("arrow-up", "https://fonts.gstatic.com/s/i/materialiconsoutlined/arrow_drop_up/v12/24px.svg", "material");
    }

    handleClosePane() {
        this.dockManager.activePane.hidden = true;
        this.dockManager.layout = { ...this.layout };
    }

    handlePinPane() {
        this.dockManager.activePane.isPinned = !this.dockManager.activePane.isPinned;
        this.dockManager.layout = { ...this.layout };
    }
}

new DockManagerStylePanes();
