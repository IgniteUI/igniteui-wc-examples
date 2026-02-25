import { IgcGridToolbarComponent, IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcButtonComponent } from 'igniteui-webcomponents';
import { OrdersTreeData } from './OrdersData';
import 'igniteui-webcomponents-grids/grids/combined';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';


defineComponents(IgcButtonComponent);

export class Sample {

    constructor() {
        const localData: any[] = [];
        let idOffset = 0;
        for (let i = 0; i < 10000; i += 3) {
            for (let c = 0; c < this.ordersTreeData.length; c++) {
                const item = this.ordersTreeData[c];
                const newItem = {
                    ...item,
                    ID: item.ID + idOffset,
                    ParentID: item.ParentID === -1 ? -1 : item.ParentID + idOffset
                };
                localData.push(newItem);
            }
            idOffset += 10000;
        }

        var treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        treeGrid.data = localData;

        var toolbar = document.getElementById('toolbar') as IgcGridToolbarComponent;
        var button = document.getElementById('simulate') as IgcButtonComponent;
        button.addEventListener('click', () => {
            toolbar.showProgress = true;
            setTimeout(() => {
                toolbar.showProgress = false;
            }, 5000);
        });
    }

    private _ordersTreeData: OrdersTreeData | null = null;
    public get ordersTreeData(): OrdersTreeData {
        if (this._ordersTreeData == null)
        {
            this._ordersTreeData = new OrdersTreeData();
        }
        return this._ordersTreeData;
    }
}

new Sample();
