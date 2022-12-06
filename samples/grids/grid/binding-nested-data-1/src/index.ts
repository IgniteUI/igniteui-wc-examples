import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesNestedDataItem, EmployeesNestedDataItem_EmployeesItem, EmployeesNestedData } from './EmployeesNestedData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";


export class Sample {

    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = (this.grid = document.getElementById('grid') as any) as IgcGridComponent;
        // var column1 = (this.column1 = document.getElementById('column1') as any) as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.employeesNestedData
            // column1.bodyTemplate = this.webGridNestedDataCellTemplate
        }
        this._bind();

    }

    private _employeesNestedData: EmployeesNestedData = null;
    public get employeesNestedData(): EmployeesNestedData {
        if (this._employeesNestedData == null)
        {
            this._employeesNestedData = new EmployeesNestedData();
        }
        return this._employeesNestedData;
    }




}

new Sample();
