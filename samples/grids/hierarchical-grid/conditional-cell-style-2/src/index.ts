import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcPropertyEditorPropertyDescriptionButtonClickEventArgs } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent, IgcRowType } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid1: IgcHierarchicalGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private column4: IgcColumnComponent
    private column5: IgcColumnComponent
    private column6: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid1 = this.hierarchicalGrid1 = document.getElementById('hierarchicalGrid1') as IgcHierarchicalGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;
        var column4 = this.column4 = document.getElementById('column4') as IgcColumnComponent;
        var column5 = this.column5 = document.getElementById('column5') as IgcColumnComponent;
        var column6 = this.column6 = document.getElementById('column6') as IgcColumnComponent;

        this._bind = () => {
            hierarchicalGrid1.data = this.singersData;
            column1.cellStyles = this.webHierarchicalGridCellStylesHandler;
            column2.cellStyles = this.webHierarchicalGridCellStylesHandler;
            column3.cellStyles = this.webHierarchicalGridCellStylesHandler;
            column4.cellStyles = this.webHierarchicalGridCellStylesHandler;
            column5.cellStyles = this.webHierarchicalGridCellStylesHandler;
            column6.cellStyles = this.webHierarchicalGridCellStylesHandler;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }


    public webHierarchicalGridCellStylesHandler = {
        background: (rowData: any, columnKey: any, cellValue: any, rowIndex: any) => rowIndex % 2 === 0 ? "#EFF4FD" : null,
        color: (rowData: any, columnKey: any, cellValue: any, rowIndex: any) => {
            if (columnKey === "Debut") {
                return cellValue > 2000 ? "#28a745" : "#dc3545";
            }
            return undefined;
        }
    };

}

new Sample();
