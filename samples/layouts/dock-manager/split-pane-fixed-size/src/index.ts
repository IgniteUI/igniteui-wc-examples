import './DockManagerStyles.css'
import { 
    IgcDockManagerPaneType,
    IgcSplitPaneOrientation,
    IgcDockManagerComponent,
    defineComponents
} from 'igniteui-dockmanager';

defineComponents(IgcDockManagerComponent);
export class DockManagerSplitPaneFixedSize {
    private dockManager: IgcDockManagerComponent;

    constructor() {
        this.dockManager = document.getElementById('dockManager') as IgcDockManagerComponent;
        this.dockManager.dir = 'ltr';

        this.dockManager.layout = {
            rootPane: {
                type: IgcDockManagerPaneType.splitPane,
                orientation: IgcSplitPaneOrientation.vertical,
                useFixedSize: true,
                panes: [
                    {
                        type: IgcDockManagerPaneType.splitPane,
                        orientation: IgcSplitPaneOrientation.horizontal,
                        size: 300, // Size will be applied in pixels
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
                        size: 200, // Size will be applied in pixels
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
                    floatingLocation: { x: 250, y: 100 },
                    floatingWidth: 250,
                    floatingHeight: 150,
                    panes: [
                    {
                        type: IgcDockManagerPaneType.contentPane,
                        contentId: "content5",
                        header: "Pane 5"
                    }
                    ]
                }
            ]
        };
    }
}

export function initialize() {
  return new DockManagerSplitPaneFixedSize();
}