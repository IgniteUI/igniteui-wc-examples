import './DockManagerStyles.css'
import { defineCustomElements } from 'igniteui-dockmanager/loader';
import { IgcDockManagerPaneType } from 'igniteui-dockmanager';
import { IgcSplitPaneOrientation } from 'igniteui-dockmanager';
import { IgcDockManagerComponent } from 'igniteui-dockmanager';

defineCustomElements();

export class DockManagerButtonsCustomization {

    private dockManager: IgcDockManagerComponent;

    constructor() {

        this.dockManager = document.getElementById('dockManager') as IgcDockManagerComponent;
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
                                    allowEmpty: true,
                                    panes: [
                                        {
                                            type: IgcDockManagerPaneType.tabGroupPane,
                                            panes: [
                                                {
                                                    type: IgcDockManagerPaneType.contentPane,
                                                    header: 'Document 1',
                                                    contentId: 'content3',
                                                    documentOnly: true
                                                },
                                                {
                                                    type: IgcDockManagerPaneType.contentPane,
                                                    header: 'Document 2',
                                                    contentId: 'content4',
                                                    documentOnly: true
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
                                    },
                                    {
                                        type: IgcDockManagerPaneType.contentPane,
                                        contentId: 'content8',
                                        header: 'Tab 3'
                                    },
                                    {
                                        type: IgcDockManagerPaneType.contentPane,
                                        contentId: 'content9',
                                        header: 'Tab 4'
                                    },
                                    {
                                        type: IgcDockManagerPaneType.contentPane,
                                        contentId: 'content10',
                                        header: 'Tab 5'
                                    }
                                ]
                            },
                            {
                                type: IgcDockManagerPaneType.contentPane,
                                contentId: 'content11',
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
                            contentId: 'content12',
                            header: 'Floating Pane'
                        }
                    ]
                }
            ]
        };
    }
}

new DockManagerButtonsCustomization();