import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule, WebGridToolbarDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent, IgcGridToolbarExporterComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDetailsItem, EmployeesFlatDetails } from './EmployeesFlatDetails';
import { IgcGridComponent, IgcExporterEventEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private gridToolbarExporter1: IgcGridToolbarExporterComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var gridToolbarExporter1 = this.gridToolbarExporter1 = document.getElementById('gridToolbarExporter1') as IgcGridToolbarExporterComponent;
        this.webGridExportEventMultiColumnHeaders = this.webGridExportEventMultiColumnHeaders.bind(this);

        this._bind = () => {
            treeGrid.data = this.employeesFlatDetails;
            gridToolbarExporter1.addEventListener("exportStarted", this.webGridExportEventMultiColumnHeaders);
        }
        this._bind();

    }

    private _employeesFlatDetails: EmployeesFlatDetails = null;
    public get employeesFlatDetails(): EmployeesFlatDetails {
        if (this._employeesFlatDetails == null)
        {
            this._employeesFlatDetails = new EmployeesFlatDetails();
        }
        return this._employeesFlatDetails;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebGridDescriptionModule.register(context);
            WebGridToolbarDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridExportEventMultiColumnHeaders(args: CustomEvent<IgcExporterEventEventArgs>): void {
        if (args.detail.options) {
            args.detail.options.ignoreMultiColumnHeaders = false;
        }
    }

}

new Sample();
