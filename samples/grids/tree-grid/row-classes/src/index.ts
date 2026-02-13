import 'igniteui-webcomponents-grids/grids/combined';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDataItem, EmployeesFlatData } from './EmployeesFlatData';
import { IgcRowType } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private treeGrid1: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var treeGrid1 = this.treeGrid1 = document.getElementById('treeGrid1') as IgcTreeGridComponent;

        this._bind = () => {
            treeGrid1.data = this.employeesFlatData;
            treeGrid1.rowClasses = this.webGridRowClassesHandler;
        }
        this._bind();

    }

    private _employeesFlatData: EmployeesFlatData = null;
    public get employeesFlatData(): EmployeesFlatData {
        if (this._employeesFlatData == null)
        {
            this._employeesFlatData = new EmployeesFlatData();
        }
        return this._employeesFlatData;
    }


    public webGridRowClassesHandler = {
      activeRow: (row: IgcRowType) => row.index % 2 === 0
    };

}

export function initialize() {
  return new Sample();
}