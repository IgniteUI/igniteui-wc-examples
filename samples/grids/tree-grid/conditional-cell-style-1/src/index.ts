import 'igniteui-webcomponents-grids/grids/combined';
import { IgcTreeGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { OrdersTreeDataItem, OrdersTreeData } from './OrdersTreeData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;

        this._bind = () => {
            treeGrid.data = this.ordersTreeData;
            column1.cellClasses = this.webTreeGridAllergensCellClassesHandler;
            column2.cellClasses = this.webTreeGridUnitPriceCellClassesHandler;
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


    public allergenItems = ['Frozen Shrimps', 'Wild Salmon Fillets', 'Fresh Cheese', 'Skimmed Milk 1L', 'Butter'];

    public webTreeGridAllergensCellClassesHandler = {
        allergensFont: (rowData: any, columnKey: any): boolean => this.allergenItems.indexOf(rowData[columnKey]) >= 0,
    }

    public webTreeGridUnitPriceCellClassesHandler = {
        downPrice: (rowData: any, columnKey: any): boolean => rowData[columnKey] <= 5,
        upPrice: (rowData: any, columnKey: any): boolean => rowData[columnKey] > 5,
    }

}

new Sample();
