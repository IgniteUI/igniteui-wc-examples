import { IgcGridToolbarComponent, IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcButtonComponent } from 'igniteui-webcomponents';
import { OrdersTreeData, OrdersTreeDataItem } from './OrdersData';
import 'igniteui-webcomponents-grids/grids/combined';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';


defineComponents(IgcButtonComponent);

export class Sample {

    constructor() {
        var treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        treeGrid.data = this.generateData();

        var toolbar = document.getElementById('toolbar') as IgcGridToolbarComponent;
        var button = document.getElementById('simulate') as IgcButtonComponent;
        button.addEventListener('click', () => {
            toolbar.showProgress = true;
            setTimeout(() => {
                toolbar.showProgress = false;
            }, 5000);
        });
    }

    private _ordersTreeData: OrdersTreeData = null;
    public get ordersTreeData(): OrdersTreeData {
        if (this._ordersTreeData == null)
        {
            this._ordersTreeData = new OrdersTreeData();
        }
        return this._ordersTreeData;
    }

    
    generateData() {
        const localData: OrdersTreeDataItem[] = [];
        for (let i = 1; i < 10000; i += 1) {

            const randomId = 1 + Math.floor(Math.random() * 3);
            let childRows: OrdersTreeDataItem[] = [];
            let childIndex = 0;
            for (let c = 0; c < this.ordersTreeData.length; c ++) {
                const item = this.ordersTreeData[c];
                if (item.ParentID == -1 || !item.ID.toString().startsWith(randomId.toString())) {
                    continue;
                }
                childRows.push({
                    ...item,
                    ID: parseInt(`${i}0${childIndex}`),
                    ParentID: i,
                });
                childIndex++;
            }

            localData.push({
                ID: i,
                ParentID: -1,
                Name: `Oder ${i}`,
                Category: '',
                Units: childRows.map(row => row.Units).reduce((prev, curr) => prev + curr, 0),
                Price: childRows.map(row => row.UnitPrice).reduce((prev, curr) => prev + curr, 0),
                UnitPrice: Math.random() * 1000,
                OrderDate: '',
                Delivered: Math.floor(Math.random()) ? true : false,
                
            });
            localData.push(...childRows);
        }

        return localData;
    }
}

new Sample();
