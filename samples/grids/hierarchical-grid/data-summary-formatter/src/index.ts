import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid: IgcHierarchicalGridComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid = this.hierarchicalGrid = document.getElementById('hierarchicalGrid') as IgcHierarchicalGridComponent;
        this.webHierarchicalGridRenderedExpand = this.webHierarchicalGridRenderedExpand.bind(this);

        this._bind = () => {
            hierarchicalGrid.data = this.singersData;
            hierarchicalGrid.addEventListener("rendered", this.webHierarchicalGridRenderedExpand);
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }


    public webHierarchicalGridRenderedExpand(args:any): void {
        let debutColumn = this.debutColumn;
        let hierarchicalGrid = this.hierarchicalGrid;
        debutColumn.formatter = (value: number) => Math.floor(value / 10) * 10 + 's';
        hierarchicalGrid.expandAll();
    }

}

new Sample();
