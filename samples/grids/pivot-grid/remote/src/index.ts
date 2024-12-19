import 'igniteui-webcomponents-grids/grids/combined';
import { IgcPivotGridComponent, IgcNoopPivotDimensionsStrategy } from 'igniteui-webcomponents-grids/grids';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { PivotNoopData } from './PivotNoopData';

export class Sample {
    private _pivotConfiguration: any | null = null;
    public get pivotConfiguration(): any {
        if (this._pivotConfiguration == null) {
            const pivotConfiguration: any = {
                columnStrategy: IgcNoopPivotDimensionsStrategy.instance(),
                rowStrategy: IgcNoopPivotDimensionsStrategy.instance(),
                columns: [
                    {
                        memberName: 'Country',
                        enabled: true
                    }
                ],
                rows: [
                    {
                        memberFunction: () => 'All',
                        memberName: 'AllProducts',
                        enabled: true,
                        childLevel: {
                            memberFunction: (data: any) => data.ProductCategory,
                            memberName: 'ProductCategory',
                            enabled: true
                        }
                    },
                    {
                        memberName: 'AllSeller',
                        memberFunction: () => 'All Sellers',
                        enabled: true,
                        childLevel: {
                            enabled: true,
                            memberName: 'SellerName'
                        }
                    }
                ],
                values: [
                    {
                        member: 'UnitsSold',
                        aggregate: {
                            aggregatorName: 'SUM',
                            key: 'sum',
                            label: 'Sum'
                        },
                        enabled: true,
                        formatter: (value: any) => value ? value : 0
                    }
                ],
                filters: null
            };

            this._pivotConfiguration = pivotConfiguration;
        }
        return this._pivotConfiguration;
    }

    private _bind: () => void;

    constructor() {
        var grid = document.getElementById('grid') as IgcPivotGridComponent;

        this._bind = () => {
            grid.pivotConfiguration = this.pivotConfiguration;
            PivotNoopData.getData().then(value => {
                grid.data = value;
            });
        }
        this._bind();
    }
}

new Sample();
