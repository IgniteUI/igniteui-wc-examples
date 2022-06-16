import './DockManagerStyles.css'
import { defineCustomElements } from 'igniteui-dockmanager/loader';
import { 
    IgcContentPane,
    IgcDockManagerPaneType,
    IgcSplitPane,
    IgcSplitPaneOrientation,
    IgcTabGroupPane,
    IgcDockManagerComponent,
    IgcDockManagerPane
} from 'igniteui-dockmanager';

defineCustomElements();

export class DockManagerAddContentRuntime {
    private dockManager: IgcDockManagerComponent;
    private counter: number = 1;
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
                            header: 'Floating Pane'
                        },
                    ]
                },
            ]
        };

        addContentPaneBtn!.addEventListener('click', () => {
            const cp: IgcContentPane = {
              type: IgcDockManagerPaneType.contentPane,
              contentId: `newContent${this.counter}`,
              header: `New Pane ${this.counter}`,
            };

            this.dockManager.layout.rootPane.panes.push(cp);
        
            this.attachPane();
        })

        addTabGroupPaneBtn!.addEventListener('click', () => {
            const cp: IgcContentPane = {
              type: IgcDockManagerPaneType.contentPane,
              contentId: `newContent${this.counter}`,
              header: `New Document ${this.counter}`,
            };

            let tabGroup = this.docHostRootPane.panes.find((p: IgcDockManagerPane) => 
                p.type === IgcDockManagerPaneType.tabGroupPane) as IgcTabGroupPane;
    
            if (tabGroup) {
                tabGroup.panes.push(cp);
            } else {
                const tg: IgcTabGroupPane = {
                    type: IgcDockManagerPaneType.tabGroupPane,
                    panes: [cp]
                };
                this.docHostRootPane.panes.push(tg);
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
                        contentId: `newContent${this.counter}`,
                        header: `New Floating Pane ${this.counter}`
                    },
                ]
            }

            this.dockManager.layout.floatingPanes!.push(sp);
        
            this.attachPane();
        })
    }

    private attachPane() {
        const content = document.createElement('DIV');
        content.slot = `newContent${this.counter}`;
        content.innerHTML = 'This pane is added at runtime';

        this.dockManager.appendChild(content);
    
        this.dockManager.layout = { ...this.dockManager.layout };
        this.counter++;
    }
}

new DockManagerAddContentRuntime();
