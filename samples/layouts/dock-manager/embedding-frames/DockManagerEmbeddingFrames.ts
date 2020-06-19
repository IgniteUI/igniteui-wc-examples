import './DockManagerStyles.css'
import { SampleBase } from "../../sample-base";

import { defineCustomElements } from 'igniteui-dockmanager/loader';
import { IgcDockManagerPaneType } from 'igniteui-dockmanager';
import { IgcSplitPaneOrientation } from 'igniteui-dockmanager';
import { IgcDockManagerComponent, IgcContentPane } from 'igniteui-dockmanager';

defineCustomElements();

let templateHTML = `
<div class="sample-container">
    <igc-dockmanager id="dockManager">
        <div class="dockManagerFull" slot="doughnutChartContainer"  >
            <iframe class="dockManagerFrame" seamless frameBorder="0"
            src='https://infragistics.com/webcomponents-demos/charts/doughnut-chart-overview' ></iframe>
        </div>
        <div class="dockManagerFull" slot="gaugeContainer" >
            <iframe class="dockManagerFrame" seamless frameBorder="0"
            src='https://infragistics.com/webcomponents-demos/gauges/radial-gauge-needle' ></iframe>
        </div>
        <div class="dockManagerFull" slot="geoMapContainer"  >
            <iframe class="dockManagerFrame" seamless frameBorder="0"
            src='https://infragistics.com/react-demos/maps/geo-map-binding-data-csv'  ></iframe>
        </div>
    </igc-dockmanager>
</div>
`;

// <div class="dockManagerFull" slot="financialChartContainer"  >
// <iframe class="dockManagerFrame" seamless frameBorder="0"
// src='https://staging.infragistics.com/react-demos/grids/data-grid-type-heatmap-table/'  ></iframe>
// </div>

export class DockManagerEmbeddingFrames extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DockManagerEmbeddingFrames");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DockManagerEmbeddingFrames); return this;
    }

    private dockManager: IgcDockManagerComponent;
    private geoMapPane: IgcContentPane;
    private gaugePane: IgcContentPane;
    private doughnutChartPane: IgcContentPane;
    private financialChartPane: IgcContentPane;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

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

        this.dockManager = document.getElementById("dockManager") as IgcDockManagerComponent;
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

                ]
            },

        };
    }
}