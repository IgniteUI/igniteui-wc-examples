import 'igniteui-webcomponents-grids/grids/combined';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDataItem, EmployeesFlatData } from './EmployeesFlatData';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

export class Sample {

    constructor() {
        var treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        treeGrid.expansionDepth = 0;
        const rootData = [...this.employeesFlatData].filter(x => x.ParentID == -1);
        treeGrid.data = rootData;
        (treeGrid as any).loadChildrenOnDemand = (parentID: any, done: (children: any[]) => void) => {
            this.getData(parentID, (children) => done(children));
     };
    }

    public getData(parentID: any, done: (children: any[]) => void) {
        setTimeout(() => {
            const data = [...this.employeesFlatData];
            const children = data.filter((r) => r.ParentID === parentID);
            children.forEach((r) => r.hasEmployees = data.some((c) => c.ParentID === r.ID));
            done(children);
        }, 1000);
    }

    private _employeesFlatData: EmployeesFlatData = null;
    public get employeesFlatData(): EmployeesFlatData {
        if (this._employeesFlatData == null)
        {
            this._employeesFlatData = new EmployeesFlatData();
        }
        return this._employeesFlatData;
    }

}

export function initialize() {
  return new Sample();
}