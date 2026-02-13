import './DockManagerStyles.css'
import {
    IgcDockManagerPaneType,
    IgcSplitPaneOrientation,
    IgcDockManagerComponent,
    IgcContentPane,
    defineComponents
} from 'igniteui-dockmanager';

defineComponents(IgcDockManagerComponent);

// <div class='dockManagerFull' slot='financialChartContainer'  >
// <iframe class='dockManagerFrame' seamless frameBorder='0'
// src='https://staging.infragistics.com/react-demos/grids/data-grid-type-heatmap-table/'  ></iframe>
// </div>

export class DockManagerEmbeddingFrames {

    private dockManager: IgcDockManagerComponent;
    private geoMapPane: IgcContentPane;
    private gaugePane: IgcContentPane;
    private doughnutChartPane: IgcContentPane;

    constructor() {

        this.gaugePane = {
            // size: 150,
            header: 'ANGULAR RADIAL GAUGE',
            type: IgcDockManagerPaneType.contentPane,
            contentId: 'gaugeContainer'
        };

        this.doughnutChartPane = {
            // size: 150,
            header: 'WEB COMPONENT DOUGHNUT CHART',
            type: IgcDockManagerPaneType.contentPane,
            contentId: 'doughnutChartContainer'
        };

        // this.financialChartPane = {
        //     // size: 300,
        //     header: 'REACT DATA GRID',
        //     type: IgcDockManagerPaneType.contentPane,
        //     contentId: 'financialChartContainer'
        // };

        this.geoMapPane = {
            // size: 200,
            header: 'REACT GEOGRAPHIC MAP',
            type: IgcDockManagerPaneType.contentPane,
            contentId: 'geoMapContainer'
        };

        this.dockManager = document.getElementById('dockManager') as IgcDockManagerComponent;
        this.dockManager.layout = {
            rootPane: {
                type: IgcDockManagerPaneType.splitPane,
                orientation: IgcSplitPaneOrientation.vertical,
                panes: [
                    {
                        type: IgcDockManagerPaneType.splitPane,
                        orientation: IgcSplitPaneOrientation.horizontal,
                        // size: 250,
                        panes: [  this.gaugePane, this.doughnutChartPane]
                    },
                    {
                        type: IgcDockManagerPaneType.splitPane,
                        orientation: IgcSplitPaneOrientation.vertical,
                        // size: 200,
                        panes: [
                            // this.financialChartPane,
                            this.geoMapPane ]
                    },

                ],
            },
            floatingPanes: []
        };
    }
}

export function initialize() {
  return new DockManagerEmbeddingFrames();
}