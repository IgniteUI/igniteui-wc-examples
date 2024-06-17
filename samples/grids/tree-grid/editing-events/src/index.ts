import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesNestedTreeDataItem, EmployeesNestedTreeData } from './EmployeesNestedTreeData';
import { IgcGridComponent, IgcGridEditEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        this.webTreeGridCellEdit = this.webTreeGridCellEdit.bind(this);

        this._bind = () => {
            treeGrid.data = this.employeesNestedTreeData;
            treeGrid.addEventListener("cellEdit", this.webTreeGridCellEdit);
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
        }
        return this._componentRenderer;
    }

    public webTreeGridCellEdit(args: CustomEvent<IgcGridEditEventArgs>): void {
        const column = args.detail.column;

        if (column.field === 'Age') {
            if (args.detail.newValue < 18) {
                args.detail.cancel = true;
                alert('Employees must be at least 18 years old!');
            }
        } else if (column.field === 'HireDate') {
            if (args.detail.newValue > new Date().getTime()) {
                args.detail.cancel = true;
                alert('The employee hire date must be in the past!');
            }
        }
    }

}

new Sample();
