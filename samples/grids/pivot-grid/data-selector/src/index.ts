// import 'igniteui-webcomponents-grids/grids/combined';
import { IgcPivotGridComponent, IgcPivotConfiguration, IgcPivotDataSelector, IgcPivotDateDimension } from 'igniteui-webcomponents-grids/grids';
import { PivotSalesData } from './PivotSalesData';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";


export class Sample {
    private _pivotConfiguration: any | null = null;
    public get pivotConfiguration(): any {
        if (this._pivotConfiguration == null)
        {
            const dateDim = new IgcPivotDateDimension({
                memberName: "date",
                enabled: true
            },
            {
                months: false
            } );
            const pivotConfiguration: any = {
                columns: [
                    {
                        memberName: "country",
                        enabled: true
                    },
                    {
                        memberName: "product",
                        enabled: true
                    }
                ],
                rows: [
                    dateDim
                ],
                filters:[
                    {
                        memberName: "monthName",
                        enabled: false
                    }
                ],
                values: [
                    {
                        member: "salePrice",
                        enabled:false,
                        dataType: 'currency',
                        aggregate: {
                            key: "SUM",
                            aggregatorName: 'SUM',
                            label: "Sum"
                        }
                    },
                    {
                        member: "profit",
                        enabled:true,
                        dataType: 'currency',
                        aggregate: {
                            key: "SUM",
                            aggregatorName: 'SUM',
                            label: "Sum"
                        }
                    }
                ]
            };

            this._pivotConfiguration = pivotConfiguration;
        }
        return this._pivotConfiguration;
    }
    private _bind: () => void;

    constructor() {
        var grid = document.getElementById('grid') as IgcPivotGridComponent;
        var selector = document.getElementById('selector') as unknown as IgcPivotDataSelector;
        this._bind = () => {
            grid.pivotConfiguration = this.pivotConfiguration;
            grid.data = this.pivotSalesData;
            selector.grid = grid;
        }
        this._bind();

    }

    private _pivotSalesData: PivotSalesData = null;
    public get pivotSalesData(): PivotSalesData {
        if (this._pivotSalesData == null)
        {
            this._pivotSalesData = new PivotSalesData();
        }
        return this._pivotSalesData;
    }



}

new Sample();
