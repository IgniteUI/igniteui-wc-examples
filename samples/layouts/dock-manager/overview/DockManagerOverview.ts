import './DockManagerStyles.css'
import { SampleBase } from "../../sample-base";

import { defineCustomElements } from 'igniteui-dockmanager/loader';
import { IgcDockManagerPaneType } from 'igniteui-dockmanager';
import { IgcSplitPaneOrientation } from 'igniteui-dockmanager';
import { IgcDockManagerComponent } from 'igniteui-dockmanager';

defineCustomElements();

let templateHTML = `
<div class="sample-container">
    <igc-dockmanager id="dockManager">
        <div slot="content1" class="dockManagerContent">Content 1</div>
        <div slot="content2" class="dockManagerContent">Content 2</div>
        <div slot="content3" class="dockManagerContent">Content 3</div>
        <div slot="content4" class="dockManagerContent">Content 4</div>
        <div slot="content5" class="dockManagerContent">Content 5</div>
        <div slot="content6" class="dockManagerContent">Content 6</div>
        <div slot="content7" class="dockManagerContent">Content 7</div>
        <div slot="content8" class="dockManagerContent">Content 8</div>
        <div slot="content9" class="dockManagerContent">Content 9</div>
    </igc-dockmanager>
</div>
`;

export class DockManagerOverview extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DockManagerOverview");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DockManagerOverview); return this;
    }

    private dockManager: IgcDockManagerComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.dockManager = document.getElementById("dockManager") as IgcDockManagerComponent;
        this.dockManager.layout = {
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
                                contentId: 'content1',
                                header: 'Content Pane 1'
                            },
                            {
                                type: IgcDockManagerPaneType.contentPane,
                                contentId: 'content2',
                                header: 'Unpinned Pane 1',
                                isPinned: false
                            }
                        ]
                    },
                    {
                        type: IgcDockManagerPaneType.splitPane,
                        orientation: IgcSplitPaneOrientation.vertical,
                        size: 200,
                        panes: [
                            {
                                type: IgcDockManagerPaneType.documentHost,
                                size: 200,
                                rootPane: {
                                    type: IgcDockManagerPaneType.splitPane,
                                    orientation: IgcSplitPaneOrientation.horizontal,
                                    panes: [
                                        {
                                            type: IgcDockManagerPaneType.tabGroupPane,
                                            panes: [
                                                {
                                                    type: IgcDockManagerPaneType.contentPane,
                                                    header: 'Document 1',
                                                    contentId: 'content3'
                                                },
                                                {
                                                    type: IgcDockManagerPaneType.contentPane,
                                                    header: 'Document 2',
                                                    contentId: 'content4'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                type: IgcDockManagerPaneType.contentPane,
                                contentId: 'content5',
                                header: 'Unpinned Pane 2',
                                isPinned: false
                            }
                        ]
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
                                        contentId: 'content6',
                                        header: 'Tab 1'
                                    },
                                    {
                                        type: IgcDockManagerPaneType.contentPane,
                                        contentId: 'content7',
                                        header: 'Tab 2'
                                    }
                                ]
                            },
                            {
                                type: IgcDockManagerPaneType.contentPane,
                                contentId: 'content8',
                                header: 'Content Pane 2'
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
                            contentId: 'content9',
                            header: 'Floating Pane'
                        }
                    ]
                }
            ]
        };
    }
}