import 'igniteui-webcomponents-grids/grids/combined';
import { IgcTreeGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { OrdersTreeDataItem, OrdersTreeData } from './OrdersTreeData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private column4: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;
        var column4 = this.column4 = document.getElementById('column4') as IgcColumnComponent;

        this._bind = () => {
            treeGrid.data = this.ordersTreeData;
            column1.cellStyles = this.webTreeGridCellStylesHandler;
            column2.cellStyles = this.webTreeGridCellStylesHandler;
            column3.cellStyles = this.webTreeGridCellStylesHandler;
            column4.cellStyles = this.webTreeGridCellStylesHandler;
        }
        this._bind();

    }

    private _ordersTreeData: OrdersTreeData = null;
    public get ordersTreeData(): OrdersTreeData {
        if (this._ordersTreeData == null)
        {
            this._ordersTreeData = new OrdersTreeData();
        }
        return this._ordersTreeData;
    }


    public webTreeGridCellStylesHandler = {
        background: (rowData: any, columnKey: any, cellValue: any, rowIndex: any) => rowIndex % 2 === 0 ? "#EFF4FD" : null,
        color: (rowData: any, columnKey: any, cellValue: any, rowIndex: any) => {
            if (columnKey === "UnitPrice") {
                if (cellValue > 10) return "#dc3545";
                if (cellValue < 5) return "#28a745";
                if (cellValue >= 5 && cellValue <= 10) return "#17a2b8";
            }
            return undefined;
        }
    };

}

new Sample();
