import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hGrid: IgcHierarchicalGridComponent
    private _bind: () => void;

    constructor() {
        var hGrid = this.hGrid = document.getElementById('hGrid') as IgcHierarchicalGridComponent;

        this._bind = () => {
            hGrid.data = this.singersData;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }

}

new Sample();
