import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcColumnComponent, IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDataItem, EmployeesFlatData } from './EmployeesFlatData';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



class PtoSummary {
    count(data: any[]): number {
        return data.length;
    };
    operate(data?: any[], allData: any[] = [], fieldName = ''): any[] {
        const result = [] as any[];
        result.push({
            key: 'totalOnPTO',
            label: 'Employees On PTO',
            summaryResult: this.count(allData.filter((rec) => rec['OnPTO']).map(r => r[fieldName]))
        });
        result.push({
            key: 'devs',
            label: 'Developers',
            summaryResult: this.count(allData.filter((rec) => rec[fieldName].includes('Developer') && rec['OnPTO']).map(r => r[fieldName]))
        });
        result.push({
            key: 'tl',
            label: 'Team Leads',
            summaryResult: this.count(allData.filter((rec) => rec[fieldName].includes('Team Lead') && rec['OnPTO']).map(r => r[fieldName]))
        });
        result.push({
            key: 'managers',
            label: 'Managers/Directors',
            summaryResult: this.count(allData.filter((rec) => (rec[fieldName].includes('Manager') || rec[fieldName].includes('Director')) && rec['OnPTO']).map(r => r[fieldName]))
        });
        result.push({
            key: 'ceo',
            label: 'CEO/President',
            summaryResult: this.count(allData.filter((rec) => (rec[fieldName].includes('CEO') || rec[fieldName].includes('President')) && rec['OnPTO']).map(r => r[fieldName]))
        });
        return result;
    }
}

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private column1: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;

        this._bind = () => {
            treeGrid.data = this.employeesFlatData;
            column1.summaries = PtoSummary;
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

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebTreeGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

export function initialize() {
  return new Sample();
}