import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule, WebActionStripDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent, IgcPinningConfig, RowPinningPosition, IgcActionStripComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesNestedTreeDataItem, EmployeesNestedTreeData } from './EmployeesNestedTreeData';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private _pinningConfig1: IgcPinningConfig | null = null;
    public get pinningConfig1(): IgcPinningConfig {
        if (this._pinningConfig1 == null)
        {
            var pinningConfig1: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig1.rows = RowPinningPosition.Top;

            this._pinningConfig1 = pinningConfig1;
        }
        return this._pinningConfig1;
    }
    private actionStrip: IgcActionStripComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        this.webTreeGridPinRowOnRendered = this.webTreeGridPinRowOnRendered.bind(this);
        var actionStrip = this.actionStrip = document.getElementById('actionStrip') as IgcActionStripComponent;

        this._bind = () => {
            treeGrid.data = this.employeesNestedTreeData;
            treeGrid.addEventListener("rendered", this.webTreeGridPinRowOnRendered);
            treeGrid.pinning = this.pinningConfig1;
        }
        this._bind();

    }

    private _employeesNestedTreeData: EmployeesNestedTreeData = null;
    public get employeesNestedTreeData(): EmployeesNestedTreeData {
        if (this._employeesNestedTreeData == null)
        {
            this._employeesNestedTreeData = new EmployeesNestedTreeData();
        }
        return this._employeesNestedTreeData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebTreeGridDescriptionModule.register(context);
            WebActionStripDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webTreeGridPinRowOnRendered(args:any): void {
        const treeGrid = document.getElementById("treeGrid") as IgcTreeGridComponent || document.getElementById("grid") as IgcTreeGridComponent;
        treeGrid.data = [...treeGrid.data];
        treeGrid.pinRow(1);
        treeGrid.pinRow(11);
    }

}

new Sample();
