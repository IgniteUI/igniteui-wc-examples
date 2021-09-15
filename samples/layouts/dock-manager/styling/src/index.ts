import "./DockManagerStyles.css";
import { MenuComponent } from './menu-component';
import { defineCustomElements } from "igniteui-dockmanager/loader";
import {
    IgcDockManagerComponent,
    IgcDockManagerLayout,
    IgcDockManagerPaneType,
    IgcSplitPaneOrientation,
    IgcUnpinnedLocation} from "igniteui-dockmanager";

defineCustomElements();
window.customElements.define('menu-component', MenuComponent);

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
                        type: IgcDockManagerPaneType.contentPane,
                        header: "DATA",
                        contentId: "content1",
                        headerId: 'dataHeader',
                        unpinnedLocation: IgcUnpinnedLocation.left,
                        isPinned: true,
                        allowDocking: false,
                        allowFloating: false,
                        allowMaximize: false,
                        allowClose: false,
                        allowPinning: false
                      },
                      {
                        type: IgcDockManagerPaneType.contentPane,
                        header: "Radial Gauge",
                        contentId: "content2",
                        headerId: 'renewableElectricityHeader',
                        unpinnedLocation: IgcUnpinnedLocation.top,
                        isPinned: true,
                        allowDocking: false,
                        allowFloating: false,
                        allowMaximize: false,
                        allowClose: false,
                        allowPinning: false
                      },
                    ],
                  },
                  {
                    type: IgcDockManagerPaneType.splitPane,
                    orientation: IgcSplitPaneOrientation.horizontal,
                    size: 300,
                    panes: [
                      {
                        type: IgcDockManagerPaneType.contentPane,
                        header: "Geo Map",
                        contentId: "content3",
                        headerId: "geoMapHeader",
                        unpinnedLocation: IgcUnpinnedLocation.bottom,
                        isPinned: true,
                        allowDocking: false,
                        allowFloating: false,
                        allowMaximize: false,
                        allowClose: false,
                        allowPinning: false,
                      }
                    ],
                  },
                ],
              },
              {
                type: IgcDockManagerPaneType.splitPane,
                orientation: IgcSplitPaneOrientation.vertical,
                panes: [{
                    type: IgcDockManagerPaneType.tabGroupPane,
                    size: 200,
                    panes: [
                        {
                          type: IgcDockManagerPaneType.contentPane,
                          header: "Global Electricity Demand",
                          contentId: "content4",
                          headerId: "electricityDemandHeader",
                          unpinnedLocation: IgcUnpinnedLocation.top,
                          isPinned: true,
                          allowDocking: false,
                          allowFloating: false,
                          allowMaximize: false,
                          allowPinning: false,
                          allowClose: false
                        },
                        {
                            type: IgcDockManagerPaneType.contentPane,
                            header: "Doughnut Chart",
                            contentId: "content5",
                            headerId: "doughnutChartHeader",
                            unpinnedLocation: IgcUnpinnedLocation.right,
                            isPinned: true,
                            allowDocking: false,
                            allowFloating: false,
                            allowMaximize: false,
                            allowPinning: false,
                            allowClose: false
                          },
                      ],
                }]
              },
            ],
          }
    };

    constructor() {
        this.dockManager = document.getElementById("dockManager") as IgcDockManagerComponent;
        this.dockManager.layout = { ...this.layout };

        this.dockManager.addEventListener("closePane", () => this.handleClosePane());
        this.dockManager.addEventListener("pinPane", () => this.handlePinPane());
    }

    handleClosePane() {
        this.dockManager.activePane.hidden = true;
        this.dockManager.layout = {...this.layout};
    }

    handlePinPane() {
        this.dockManager.activePane.isPinned = !this.dockManager.activePane.isPinned;
        this.dockManager.layout = {...this.layout};
    }
}

new DockManagerStylePanes();
