import 'igniteui-webcomponents-grids/grids/combined';
import { IgcTreeGridComponent, IgcActionStripComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDetailsItem, EmployeesFlatDetails } from './EmployeesFlatDetails';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private actionStrip: IgcActionStripComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var actionStrip = this.actionStrip = document.getElementById('actionStrip') as IgcActionStripComponent;

        this._bind = () => {
            treeGrid.data = this.employeesFlatDetails
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

}

new Sample();
