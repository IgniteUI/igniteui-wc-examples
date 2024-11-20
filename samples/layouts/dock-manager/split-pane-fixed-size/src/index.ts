import './DockManagerStyles.css'
import { defineCustomElements } from 'igniteui-dockmanager/loader';
import { 
    IgcDockManagerPaneType,
    IgcSplitPaneOrientation,
    IgcDockManagerComponent
} from 'igniteui-dockmanager';

defineCustomElements();

export class DockManagerSplitPaneFixedSize {
    private dockManager: IgcDockManagerComponent;

    constructor() {
        this.dockManager = document.getElementById('dockManager') as IgcDockManagerComponent;
        this.dockManager.dir = 'ltr';

        this.dockManager.layout = {
            rootPane: {
                type: IgcDockManagerPaneType.splitPane,
                orientation: IgcSplitPaneOrientation.vertical,
                panes: [
                    {
                        type: IgcDockManagerPaneType.splitPane,
                        orientation: IgcSplitPaneOrientation.horizontal,
                        panes: [
                            {
                                type: IgcDockManagerPaneType.contentPane,
                                contentId: 'content1',
                                header: 'Pane 1',
                                size: 400 // Size will be relative to siblings
                            },
                            {
                                type: IgcDockManagerPaneType.contentPane,
                                contentId: 'content2',
                                header: 'Pane 2',
                                size: 200 // Size will be relative to siblings
                            }
                        ]
                    },
                    {
                        type: IgcDockManagerPaneType.splitPane,
                        orientation: IgcSplitPaneOrientation.horizontal,
                        useFixedSize: true,
                        panes: [
                            {
                                type: IgcDockManagerPaneType.contentPane,
                                contentId: 'content3',
                                header: 'Pane 3',
                                size: 400 // Size will be applied in pixels
                            },
                            {
                                type: IgcDockManagerPaneType.contentPane,
                                contentId: 'content4',
                                header: 'Pane 4',
                                size: 200 // Size will be applied in pixels
                            }
                        ]
                    }
                ]
            },
            floatingPanes: [
                {
                    type: IgcDockManagerPaneType.splitPane,
                    orientation: IgcSplitPaneOrientation.horizontal,
                    floatingLocation: { x: 700, y: 350 },
                    floatingWidth: 250,
                    floatingHeight: 150,
                    panes: [
                    {
                        type: IgcDockManagerPaneType.contentPane,
                        contentId: "content5",
                        header: "Content Pane 5",
                        size: 800
                    }
                    ]
                }
            ]
        };
    }
}

new DockManagerSplitPaneFixedSize();
