import 'igniteui-webcomponents-grids/grids/combined';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { OrdersDataItem, OrdersData } from './OrdersData';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



export class Sample {

    private treeGrid: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;

        this._bind = () => {
            treeGrid.data = this.ordersData;
        }
        this._bind();
    }

    private _ordersData: OrdersData = null;
    public get ordersData(): OrdersData {
        if (this._ordersData == null)
        {
            this._ordersData = new OrdersData();
        }
        return this._ordersData;
    }

}

new Sample();
