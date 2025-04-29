import 'igniteui-webcomponents-grids/grids/combined';
import { IgcBooleanFilteringOperand, IgcColumnComponent, IgcFilteringOperation, IgcStringFilteringOperand, IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { OrdersDataItem, OrdersData } from './OrdersData';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



export class Sample {

    private treeGrid: IgcTreeGridComponent;
    public caseSensitiveFilteringOperand = CaseSensitiveFilteringOperand.instance();
    public booleanFilteringOperand = BooleanFilteringOperand.instance();
    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var name = document.getElementById('name') as IgcColumnComponent;
        var delivered = document.getElementById('delivered') as IgcColumnComponent;
        treeGrid.data = this.ordersData;
        name.filters = this.caseSensitiveFilteringOperand;
        delivered.filters = this.booleanFilteringOperand;
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

export class CaseSensitiveFilteringOperand extends IgcStringFilteringOperand {
    private constructor() {
        super();
        const customOperations: IgcFilteringOperation[] = [
            {
                iconName: 'contains',
                isUnary: false,
                logic: (target: string, searchVal: string, ignoreCase?: boolean) => {
                    ignoreCase = false;
                    const search = IgcStringFilteringOperand.applyIgnoreCase(searchVal, ignoreCase);
                    target = IgcStringFilteringOperand.applyIgnoreCase(target, ignoreCase);
                    return target.indexOf(search) !== -1;
                },
                name: 'Contains (case sensitive)'
            },
            {
                iconName: 'does_not_contain',
                isUnary: false,
                logic: (target: string, searchVal: string, ignoreCase?: boolean) => {
                    ignoreCase = false;
                    const search = IgcStringFilteringOperand.applyIgnoreCase(searchVal, ignoreCase);
                    target = IgcStringFilteringOperand.applyIgnoreCase(target, ignoreCase);
                    return target.indexOf(search) === -1;
                },
                name: 'Does Not Contain (case sensitive)'
            }
        ];

        const emptyOperators = [
            // 'Empty'
            this.operations[6],
            // 'Not Empty'
            this.operations[7]
        ];

        this.operations = customOperations.concat(emptyOperators);
    }
}

export class BooleanFilteringOperand extends IgcBooleanFilteringOperand {
    private constructor() {
        super();
        this.operations = [
            // 'All'
            this.operations[0],
            // 'TRUE'
            this.operations[1],
            // 'FALSE'
            this.operations[2]
        ];
    }
}

new Sample();
