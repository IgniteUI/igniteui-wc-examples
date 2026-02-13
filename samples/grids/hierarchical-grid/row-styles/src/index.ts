import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcRowIslandComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcPropertyEditorPropertyDescriptionButtonClickEventArgs } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent, IgcRowType } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid1: IgcHierarchicalGridComponent
    private rowIsland1: IgcRowIslandComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid1 = this.hierarchicalGrid1 = document.getElementById('hierarchicalGrid1') as IgcHierarchicalGridComponent;
        var rowIsland1 = this.rowIsland1 = document.getElementById('rowIsland1') as IgcRowIslandComponent;

        this._bind = () => {
            hierarchicalGrid1.data = this.singersData;
            hierarchicalGrid1.rowStyles = this.webHierarchicalGridRowStylesHandler;
            rowIsland1.rowStyles = this.webHierarchicalGridChildRowStylesHandler;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }


    public webHierarchicalGridRowStylesHandler = {
        background:(row: IgcRowType) => row.data['HasGrammyAward'] ? '#eeddd3' : '#f0efeb',
        'border-left': (row: IgcRowType) => row.data['HasGrammyAward'] ? '2px solid #dda15e' : null
    };

    public webHierarchicalGridChildRowStylesHandler = {
        'border-left': (row: IgcRowType) => row.data['BillboardReview'] > 70 ? '3.5px solid #dda15e' : null
    };

}

export function initialize() {
  return new Sample();
}