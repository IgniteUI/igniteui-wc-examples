import './DockManagerStyles.css'
import {
    IgcDockManagerPaneType,
    IgcSplitPane,
    IgcSplitPaneOrientation,
    IgcDockManagerComponent,
    defineComponents
} from 'igniteui-dockmanager';

defineComponents(IgcDockManagerComponent);

export class DockManagerAddContentRuntime {
    private dockManager: IgcDockManagerComponent;
    private docHostRootPane: IgcSplitPane = {
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
    };

    constructor() {
        this.dockManager = document.getElementById('dockManager') as IgcDockManagerComponent;
        const focusFloatingPaneBtn = document.getElementById('focusFloating');
        const focusUnpinnedPaneBtn = document.getElementById('focusUnpinned');
        const focusRegularPaneBtn = document.getElementById('focusRegular');

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
                                rootPane: this.docHostRootPane
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
                            header: 'Floating Pane 1'
                        },
                    ]
                },
                {
                    type: IgcDockManagerPaneType.splitPane,
                    orientation: IgcSplitPaneOrientation.horizontal,
                    floatingLocation: { x: 250, y: 200 },
                    floatingWidth: 250,
                    floatingHeight: 150,
                    panes: [
                      {
                        type: IgcDockManagerPaneType.contentPane,
                        contentId: 'content10',
                        header: 'Floating Pane 2'
                      }
                    ],
                  },
            ]
        };

        focusFloatingPaneBtn!.addEventListener('click', () => {
            this.dockManager.focusPane('content9');
        })

        focusUnpinnedPaneBtn!.addEventListener('click', () => {
            this.dockManager.focusPane('content2');
        })

        focusRegularPaneBtn!.addEventListener('click', () => {
            this.dockManager.focusPane('content1');
        })
    }
}

export function initialize() {
  return new DockManagerAddContentRuntime();
}