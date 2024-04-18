import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcRowIslandComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { html } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid1: IgcHierarchicalGridComponent
    private rowIsland1: IgcRowIslandComponent
    private rowIsland2: IgcRowIslandComponent
    private rowIsland3: IgcRowIslandComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid1 = this.hierarchicalGrid1 = document.getElementById('hierarchicalGrid1') as IgcHierarchicalGridComponent;
        var rowIsland1 = this.rowIsland1 = document.getElementById('rowIsland1') as IgcRowIslandComponent;
        var rowIsland2 = this.rowIsland2 = document.getElementById('rowIsland2') as IgcRowIslandComponent;
        var rowIsland3 = this.rowIsland3 = document.getElementById('rowIsland3') as IgcRowIslandComponent;

        this._bind = () => {
            hierarchicalGrid1.data = this.singersData;
            rowIsland1.toolbarTemplate = this.webHierarchicalGridToolbarTemplate;
            rowIsland2.toolbarTemplate = this.webHierarchicalGridToolbarTemplate;
            rowIsland3.toolbarTemplate = this.webHierarchicalGridToolbarTemplate;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }


    public webHierarchicalGridToolbarTemplate = () => {
        return html`<igc-grid-toolbar>
            <igc-grid-toolbar-actions>
                <igc-grid-toolbar-advanced-filtering></igc-grid-toolbar-advanced-filtering>
                <igc-grid-toolbar-hiding></igc-grid-toolbar-hiding>
                <igc-grid-toolbar-pinning></igc-grid-toolbar-pinning>
                <igc-grid-toolbar-exporter></igc-grid-toolbar-exporter>
            </igc-grid-toolbar-actions>
        </igc-grid-toolbar>`
    }

}

new Sample();
