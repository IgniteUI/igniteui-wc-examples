import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid1: IgcHierarchicalGridComponent
    private column1: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid1 = this.hierarchicalGrid1 = document.getElementById('hierarchicalGrid1') as IgcHierarchicalGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;

        this._bind = () => {
            hierarchicalGrid1.data = this.singersData;
            column1.cellClasses = this.webGridGrammyNominationsCellClassesHandler;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }


    public webGridGrammyNominationsCellClassesHandler = {
        downFont: (rowData: any, columnKey: any): boolean => rowData[columnKey] < 5,
        upFont: (rowData: any, columnKey: any): boolean => rowData[columnKey] >= 6
    };

}

new Sample();
