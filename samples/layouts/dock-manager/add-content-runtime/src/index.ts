import './DockManagerStyles.css'
import { defineCustomElements } from 'igniteui-dockmanager/loader';
import { IgcContentPane, IgcDockManagerPaneType, IgcDocumentHost, IgcSplitPane, IgcTabGroupPane } from 'igniteui-dockmanager';
import { IgcSplitPaneOrientation } from 'igniteui-dockmanager';
import { IgcDockManagerComponent } from 'igniteui-dockmanager';
import 'igniteui-webcomponents/themes/bootstrap.css';

defineCustomElements();

export class DockManagerAddContentRuntime {
    private dockManager: IgcDockManagerComponent;
    private _counter: number = 1;

    constructor() {
        this.dockManager = document.getElementById('dockManager') as IgcDockManagerComponent;
        const addContentPaneBtn = document.getElementById('contentPaneBtn');
        const addTabGroupPaneBtn = document.getElementById('tabGroupPaneBtn');
        const addFloatingPaneBtn = document.getElementById('floatingPaneBtn');
       
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
                            header: 'Floating Pane'
                        },
                    ]
                },
            ]
        };

        addContentPaneBtn!.addEventListener('click', () => {
            const cp: IgcContentPane = {
              type: IgcDockManagerPaneType.contentPane,
              contentId: `newContent${this._counter}`,
              header: `New Pane ${this._counter}`,
            };

            this.dockManager.layout.rootPane.panes.push(cp);
        
            this.attachPane();
        })

        addTabGroupPaneBtn!.addEventListener('click', () => {
            const cp: IgcContentPane = {
              type: IgcDockManagerPaneType.contentPane,
              contentId: `newContent${this._counter}`,
              header: `New Document ${this._counter}`,
            };

            const splitPanes = this.dockManager.layout.rootPane.panes.filter(p => p.type === 'splitPane') as IgcSplitPane[];
            let parentDocumentHost = splitPanes.find(sp => sp.panes.some(spp => spp.type === 'documentHost'));

            if (parentDocumentHost === undefined) {
                parentDocumentHost = {
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
                                panes: []
                            }
                        }
                    ]
                }

                this.dockManager.layout.rootPane.panes.push(parentDocumentHost);
            }

            const childDocumentHost = parentDocumentHost!.panes.find(p => p.type === 'documentHost') as IgcDocumentHost;
            let tabGroup = childDocumentHost.rootPane.panes[0];
    
            if (tabGroup) {
                if (tabGroup.type !== 'tabGroupPane') {
                    tabGroup = (tabGroup as IgcSplitPane).panes.find(p => p.type === 'tabGroupPane') as IgcTabGroupPane;
                }

                tabGroup.panes.push(cp);
            } else {
                const contentPanes = childDocumentHost.rootPane.panes.filter(p => p.type === 'contentPane') as IgcContentPane[];

                const tg: IgcTabGroupPane = {
                    type: IgcDockManagerPaneType.tabGroupPane,
                    panes: [cp]
                };

                if (childDocumentHost.rootPane.panes.length === contentPanes.length) {
                    childDocumentHost.rootPane.panes = [];
                    contentPanes.forEach(cp => tg.panes.push(cp));
                }

                childDocumentHost.rootPane.panes.push(tg)
            }
            

            this.attachPane();
        })

        addFloatingPaneBtn!.addEventListener('click', () => {
            const sp: IgcSplitPane = {
                type: IgcDockManagerPaneType.splitPane,
                orientation: IgcSplitPaneOrientation.horizontal,
                floatingHeight: 150,
                floatingWidth: 250,
                floatingLocation: { x: 900, y: 300 },
                panes: [
                    {
                        type: IgcDockManagerPaneType.contentPane,
                        contentId: `newContent${this._counter}`,
                        header: `New Floating Pane ${this._counter}`
                    },
                ]
            }

            this.dockManager.layout.floatingPanes!.push(sp);
        
            this.attachPane();
        })
    }

    private attachPane() {
        const content = document.createElement('DIV');
        content.slot = `newContent${this._counter}`;
        content.innerHTML = 'This pane is added at runtime';

        this.dockManager.appendChild(content);
    
        this.dockManager.layout = { ...this.dockManager.layout };
        this._counter++;
    }
}

new DockManagerAddContentRuntime();
