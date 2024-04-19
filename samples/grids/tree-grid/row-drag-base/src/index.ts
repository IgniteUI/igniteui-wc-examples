import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebTreeGridDescriptionModule, WebPaginatorDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent, IgcGridToolbarTitleComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesNestedDataItem, EmployeesNestedDataItem_EmployeesItem, EmployeesNestedData } from './EmployeesNestedData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private treeGrid2: IgcTreeGridComponent
    private employees: IgcGridToolbarTitleComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var treeGrid2 = this.treeGrid2 = document.getElementById('treeGrid2') as IgcTreeGridComponent;
        var employees = this.employees = document.getElementById('Employees') as IgcGridToolbarTitleComponent;

        this._bind = () => {
            treeGrid.data = this.employeesNestedData;
            treeGrid2.data = [];
            treeGrid2.emptyGridMessage = "Drag and Drop a row from the left grid to this grid";            
            treeGrid.addEventListener("rowDragEnd", this.onGridRowDragEnd.bind(this));            
        }
        this._bind();

    }

    public onGridRowDragEnd(args: any): void {
        const ghostElement = args.detail.dragDirective.ghostElement;

        if (ghostElement != null) {

            const dragElementPos = ghostElement.getBoundingClientRect();            

            const gridPosition = this.treeGrid2.getBoundingClientRect();            
            const withinXBounds = dragElementPos.x >= gridPosition.x && dragElementPos.x <= gridPosition.x + gridPosition.width;
            const withinYBounds = dragElementPos.y >= gridPosition.y && dragElementPos.y <= gridPosition.y + gridPosition.height;
            if (withinXBounds && withinYBounds) {                
                this.treeGrid2.addRow(args.detail.dragData.data);
            }
        }
    }

    private _employeesNestedData: EmployeesNestedData = null;
    public get employeesNestedData(): EmployeesNestedData {
        if (this._employeesNestedData == null)
        {
            this._employeesNestedData = new EmployeesNestedData();
        }
        return this._employeesNestedData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            WebTreeGridDescriptionModule.register(context);
            WebPaginatorDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
