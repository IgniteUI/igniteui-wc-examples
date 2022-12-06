// import 'igniteui-webcomponents-grids/grids/combined';
import { IgcPivotGridComponent, IgcPivotDimensionStrategy, IgcPivotDateDimension, IgcPivotDimension, IgcPivotKeys, IgcPivotValue, NoopPivotDimensionsStrategy } from '@infragistics/igniteui-webcomponents-grids/grids';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { PivotNoopData } from './PivotNoopData';

export class Sample {
    private _pivotConfiguration: any | null = null;
    public get pivotConfiguration(): any {
        if (this._pivotConfiguration == null) {
            const pivotConfiguration: any = {
                columnStrategy:NoopPivotDimensionsStrategy.instance(),
                rowStrategy: NoopPivotDimensionsStrategy.instance(),
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
                        formatter: (value:any) => value ? value : 0
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
            grid.data = this.pivotSalesData;

        }
        this._bind();

    }

    private _pivotSalesData: PivotNoopData = null;
    public get pivotSalesData(): PivotNoopData {
        if (this._pivotSalesData == null) {
            // PivotNoopData.getData().then((value: PivotNoopData) => {
            //     this._pivotSalesData = value;
            // });
            this._pivotSalesData = [{
                'AllProducts': 'All', 'USA': 1159, 'Uruguay': 1274, 'Bulgaria': 1012, 'France': 1301, 'Germany': 570, 'Austria': 990,
                'AllSeller_records': [
                    {
                        'AllSeller': 'All Sellers',
                        'USA': 1159, 'Uruguay': 1274, 'Bulgaria': 1012, 'France': 1301, 'Germany': 570, 'Austria': 990,
                        'AllSeller_records': [
                            { 'SellerName': 'David', 'USA': 293, 'France': 240, 'Austria': 270, 'Uruguay': 130, 'Bulgaria': 110 },
                            { 'SellerName': 'Lydia', 'Germany': 120, 'Uruguay': 68, 'Austria': 250, 'France': 170, 'Bulgaria': 220 },
                            { 'SellerName': 'Stanley', 'Austria': 400, 'Germany': 240, 'Bulgaria': 282, ' USA': 330 },
                            { 'SellerName': 'Elisa', 'USA': 296, 'Uruguay': 530, 'France': 430, 'Germany': 230 },
                            { 'SellerName': 'John', 'France': 361, 'USA': 240, 'Bulgaria': 190, 'Uruguay': 90 },
                            { 'SellerName': 'Larry', 'Uruguay': 456, 'France': 100, 'Austria': 70, 'Bulgaria': 210 }
                        ]
                    }
                ],
                'AllProducts_records': [
                    {
                        'ProductCategory': 'Accessories',
                        'USA': 623,
                        'France': 100,
                        'Austria': 400,
                        'Bulgaria': 210,
                        'AllSeller_records': [
                            {
                                'AllSeller': 'All Sellers', 'USA': 623, 'France': 100, 'Austria': 400, 'Bulgaria': 210,
                                'AllSeller_records': [
                                    { 'SellerName': 'David', 'USA': 293 },
                                    { 'SellerName': 'Stanley', 'USA': 330, 'Austria': 400 },
                                    { 'SellerName': 'Larry', 'France': 100, 'Bulgaria': 210 }
                                ]
                            }
                        ]
                    },
                    {
                        'ProductCategory': 'Bikes',
                        'Uruguay': 198,
                        'France': 531,
                        'Germany': 120,
                        'Austria': 270,
                        'Bulgaria': 190,
                        'AllSeller_records': [
                            {
                                'AllSeller': 'All Sellers',
                                'Uruguay': 198,
                                'France': 531,
                                'Germany': 120,
                                'Austria': 270,
                                'Bulgaria': 190,
                                'AllSeller_records': [
                                    { 'SellerName': 'Lydia', 'Uruguay': 68, 'Germany': 120, 'France': 170 },
                                    { 'SellerName': 'John', 'France': 361, 'Bulgaria': 190 },
                                    { 'SellerName': 'David', 'Austria': 270, 'Uruguay': 130 }
                                ]
                            }
                        ]
                    },
                    {
                        'ProductCategory': 'Clothing',
                        'USA': 296,
                        'Uruguay': 986,
                        'Bulgaria': 502,
                        'Germany': 470,
                        'France': 430,
                        'Austria': 70,
                        'AllSeller_records': [
                            {
                                'AllSeller': 'All Sellers', 'USA': 296, 'Uruguay': 986, 'Bulgaria': 502, 'Germany': 470, 'France': 430, 'Austria': 70,
                                'AllSeller_records': [
                                    { 'SellerName': 'Elisa', 'USA': 296, 'Uruguay': 530, 'France': 430, 'Germany': 230 },
                                    { 'SellerName': 'Lydia', 'Bulgaria': 220 },
                                    { 'SellerName': 'Larry', 'Uruguay': 456, 'Austria': 70 },
                                    { 'SellerName': 'Stanley', 'Germany': 240, 'Bulgaria': 282 }
                                ]
                            }
                        ]
                    },
                    {
                        'ProductCategory': 'Components',
                        'USA': 240,
                        'France': 240,
                        'Austria': 250,
                        'Bulgaria': 110,
                        'Uruguay': 90,
                        'AllSeller_records': [
                            {
                                'AllSeller': 'All Sellers',
                                'USA': 240,
                                'France': 240,
                                'Austria': 250,
                                'Bulgaria': 110,
                                'Uruguay': 90,
                                'AllSeller_records': [
                                    { 'SellerName': 'John', 'USA': 240, 'Uruguay': 90 },
                                    { 'SellerName': 'David', 'France': 240, 'Bulgaria': 110 },
                                    { 'SellerName': 'Lydia', 'Austria': 250 }
                                ]
                            }
                        ]
                    }
                ]
            }]
        }
        return this._pivotSalesData;
    }



}

new Sample();