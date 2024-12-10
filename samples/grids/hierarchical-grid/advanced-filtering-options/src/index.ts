import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



export class Sample {

    private hierarchicalGrid1: IgcHierarchicalGridComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid1 = this.hierarchicalGrid1 = document.getElementById('hierarchicalGrid1') as IgcHierarchicalGridComponent;

        this._bind = () => {
            hierarchicalGrid1.data = this.singersData;
        }
        this._bind();
    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }

}

new Sample();
