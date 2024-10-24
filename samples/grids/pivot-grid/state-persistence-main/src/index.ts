import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridStateComponent, IgcGridStateOptions, IgcPivotConfiguration, IgcPivotDateDimension, IgcPivotDimension, IgcPivotGridComponent, IgcPivotValue } from 'igniteui-webcomponents-grids/grids';
import { defineAllComponents, IgcButtonComponent, IgcCheckboxComponent, registerIconFromText } from 'igniteui-webcomponents';
import { PivotDataFlat } from './PivotDataFlat';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";
defineAllComponents();

const restoreIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"/></svg>';
const saveIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"/></svg>';
const clearIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
const forwardIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>';
const deleteIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';
const refreshIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg>';

export class Sample {
    private gridData;
    private grid: IgcPivotGridComponent;
    private _gridState: IgcGridStateComponent;
    public stateKey = 'pivot-grid-state';

    public options: IgcGridStateOptions = {
        cellSelection: true,
        columnSelection: true,
        filtering: true,
        sorting: true,
        expansion: true,
        pivotConfiguration: true
    };
    private columnsLoaded: Promise<void>;

    public totalSale = (members: any, data: any) =>
        data.reduce((accumulator: any, value: any) => accumulator + value.ProductUnitPrice * value.NumberOfUnits, 0);

    public totalMin = (members: any, data: any) => {
        return data.map((x: any) => x.ProductUnitPrice * x.NumberOfUnits).reduce((a: any, b: any) => Math.min(a, b));
    };
    
    public totalMax = (members: any, data: any) => {
        return data.map((x: any) => x.ProductUnitPrice * x.NumberOfUnits).reduce((a: any, b: any) => Math.max(a,b));
    };

    public get gridState() {
        if (!this._gridState) {
            this._gridState = document.getElementById('gridState') as IgcGridStateComponent;
        }
        return this._gridState;
    }

    private pivotConfiguration: IgcPivotConfiguration = {
        columns: [
            new IgcPivotDateDimension(
                {
                    memberName: 'Date',
                    enabled: true
                },
                {
                    months: false,
                    quarters: true,
                    fullDate: false
                }
            )
        ],
        rows: [
            {
                memberFunction: () => 'All Products',
                memberName: 'AllProducts',
                enabled: true,
                width: "150px",
                childLevel: {
                    memberFunction: (data: any) => data.ProductName,
                    memberName: 'ProductCategory',
                    enabled: true
                }
            },
            {
                memberName: 'SellerCity',
                width: "150px",
                memberFunction: (data: any) => data.SellerCity,
                enabled: true
            }
        ],
        values: [
            {
                member: 'Value',
                aggregate: {
                    key: 'SUM',
                    aggregatorName: "SUM",
                    label: 'Sum'
                },
                aggregateList: [{
                    key: 'SUM',
                    aggregatorName: 'SUM',
                    label: 'Sum'
                }],
                enabled: true,
                styles: {
                    downFontValue: (rowData: any, columnKey: any): boolean => parseFloat(rowData.aggregationValues.get(columnKey.field)) <= 150,
                    upFontValue: (rowData: any, columnKey: any): boolean => parseFloat(rowData.aggregationValues.get(columnKey.field)) > 150
                },
                formatter: (value: any) => value ? '$' + parseFloat(value).toFixed(3) : undefined
            },
            {
                member: 'AmountofSale',
                displayName: 'Amount of Sale',
                aggregate: {
                    key: 'SUM',
                    aggregator: this.totalSale,
                    label: 'Sum of Sale'
                },
                aggregateList: [{
                    key: 'SUM',
                    aggregator: this.totalSale,
                    label: 'Sum of Sale'
                }, {
                    key: 'MIN',
                    aggregator: this.totalMin,
                    label: 'Minimum of Sale'
                }, {
                    key: 'MAX',
                    aggregator: this.totalMax,
                    label: 'Maximum of Sale'
                }],
                enabled: true,
                dataType: 'currency'
            }
        ],
        filters: [
            {
                memberName: 'SellerName',
                memberFunction: (data: any) => data.SellerName,
                enabled: true
            }
        ]
    };

    public onValueInit(event: any) {
        const value: IgcPivotValue = event.detail;
        if (value.member === 'AmountofSale') {
            value.aggregate.aggregator = this.totalSale;
            value.aggregateList?.forEach((aggr: any) => {
                switch (aggr.key) {
                    case 'SUM':
                        aggr.aggregator = this.totalSale;
                        break;
                    case 'MIN':
                        aggr.aggregator = this.totalMin;
                        break;
                    case 'MAX':
                        aggr.aggregator = this.totalMax;
                        break;
                }
            });
        } else if (value.member === 'Value') {
            value.formatter = (value: any) => value ? '$' + parseFloat(value).toFixed(3) : undefined;
            value.styles.upFontValue = (rowData: any, columnKey: any): boolean => parseFloat(rowData.aggregationValues.get(columnKey.field)) > 150
            value.styles.downFontValue = (rowData: any, columnKey: any): boolean => parseFloat(rowData.aggregationValues.get(columnKey.field)) <= 150;
        }
    }

    public onDimensionInit(event: any) {
        const dim: IgcPivotDimension = event.detail;
        switch (dim.memberName) {
            case 'AllProducts':
                dim.memberFunction = () => 'All Products';
                break;
            case 'ProductCategory':
                dim.memberFunction = (data: any) => data.ProductName;
                break;
            case 'City':
                dim.memberFunction = (data: any) => data.City;
                break;
            case 'SellerName':
                dim.memberFunction = (data: any) => data.SellerName;
                break;
        }
    }

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcPivotGridComponent;
        this.gridData = new PivotDataFlat();

        var saveStateBtn = document.getElementById("saveState") as IgcButtonComponent;
        var restoreStateBtn = document.getElementById("restoreState") as IgcButtonComponent;
        var resetStateBtn = document.getElementById("resetState") as IgcButtonComponent;
        var leavePageBtn = document.getElementById("leavePage") as IgcButtonComponent;
        var leaveLink = document.getElementById("leaveLink") as HTMLElement;
        var clearStorageBtn = document.getElementById("clearStorage") as IgcButtonComponent;
        var reloadPageBtn = document.getElementById("reloadPage") as IgcButtonComponent;
        var allCheckboxes = Array.from(document.getElementsByTagName("igc-checkbox"));

        registerIconFromText("restore", restoreIcon, "material");
        registerIconFromText("save", saveIcon, "material");
        registerIconFromText("clear", clearIcon, "material");
        registerIconFromText("forward", forwardIcon, "material");
        registerIconFromText("delete", deleteIcon, "material");
        registerIconFromText("refresh", refreshIcon, "material");

        grid.data = this.gridData;
        grid.pivotConfiguration = this.pivotConfiguration;

        grid.addEventListener("columnInit", (ev: any) => { this.onColumnInit(ev); });
        grid.addEventListener("valueInit", (ev:any) => this.onValueInit(ev));
        grid.addEventListener("dimensionInit", (ev:any) => this.onDimensionInit(ev));
        saveStateBtn.addEventListener('click', (ev: any) => { this.saveGridState(); });
        restoreStateBtn.addEventListener('click', (ev: any) => { this.restoreGridState(); });
        resetStateBtn.addEventListener('click', (ev: any) => { this.resetGridState(); });
        leavePageBtn.addEventListener('click', (ev: any) => { this.leavePage(); });
        leaveLink.addEventListener('click', (ev: any) => { this.saveGridState(); });
        clearStorageBtn.addEventListener('click', (ev: any) => { this.clearStorage(); });
        reloadPageBtn.addEventListener('click', (ev: any) => { this.reloadPage(); });

        allCheckboxes.forEach(cb => {
            cb.addEventListener("igcChange", (ev: CustomEvent) => { this.onChange(ev, cb.id); });
        });

        window.addEventListener("load", async () => { 
            await this.columnsLoaded;
            this.restoreGridState(); 
        });
        window.addEventListener("beforeunload", () => { this.saveGridState(); });
    }

    public saveGridState() {
        const state = this.gridState.getStateAsString();
        window.localStorage.setItem(this.stateKey, state);
    }

    public restoreGridState() {
        const state = window.localStorage.getItem(this.stateKey);
        if (state) {
            this.gridState.applyStateFromString(state);
        }
    }

    public resetGridState() {
        this.grid.allDimensions.forEach(dimension => this.grid.clearFilter(dimension.memberName));
        this.grid.sortingExpressions = [];
        this.grid.deselectAllColumns();
        this.grid.deselectAllRows();
        this.grid.clearCellSelection();
    }

    public onChange(event: CustomEvent, action: string) {
        if (action === 'allFeatures') {
            var allCheckboxes = Array.from(document.getElementsByTagName("igc-checkbox"));
            allCheckboxes.forEach(cb => {
                cb.checked = event.detail.checked;
            });

            for (const key of Object.keys(this.options)) {
                (this.gridState.options as any)[key] = event.detail.checked;
            }        
        } else {
            (this.gridState.options as any)[action] = event.detail.checked;
            var allFeatures = document.getElementById("allFeatures") as IgcCheckboxComponent;
            allFeatures.checked = Object.keys(this.options).every(o => (this.gridState.options as any)[o]);
        }
    }

    public leavePage() {
        this.saveGridState();
        window.location.replace("./grids/pivot-grid/state-persistence-about");
    }

    public clearStorage() {
        window.localStorage.removeItem(this.stateKey);
    }

    public reloadPage() {
        window.location.reload();
    }

    private onColumnInit(event: any) { 
        if(event.detail.index === this.grid.columns.length - 1) {
           this.columnsLoaded = new Promise((resolve) => resolve());
        }
    }
}

new Sample();
