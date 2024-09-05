import "igniteui-webcomponents-grids/grids/combined";
import { IgcPivotGridComponent, IgcNoopPivotDimensionsStrategy, IgcPivotConfiguration, IgcGridStateComponent } from "igniteui-webcomponents-grids/grids";
import { defineAllComponents, IgcButtonComponent } from 'igniteui-webcomponents';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { PivotNoopData } from "./PivotNoopData";
import "./index.css";

defineAllComponents();

export class Sample {
    public pivotConfiguration: IgcPivotConfiguration = {
        columnStrategy: IgcNoopPivotDimensionsStrategy.instance(),
        rowStrategy: IgcNoopPivotDimensionsStrategy.instance(),
        columns: [
            {
                memberName: "Country",
                enabled: true
            }
        ],
        rows: [
            {
                memberFunction: () => "All",
                memberName: "AllProducts",
                enabled: true,
                childLevel: {
                    memberFunction: (data: any) => data.ProductCategory,
                    memberName: "ProductCategory",
                    enabled: true
                }
            },
            {
                memberName: "AllSeller",
                memberFunction: () => "All Sellers",
                enabled: true,
                childLevel: {
                    enabled: true,
                    memberName: "SellerName"
                }
            }
        ],
        values: [
            {
                member: "UnitsSold",
                aggregate: {
                    aggregatorName: "SUM",
                    key: "sum",
                    label: "Sum"
                },
                enabled: true,
                formatter: (value: any) => (value ? value : 0)
            }
        ],
        filters: null
    };
    public stateKey = 'pivot-grid-state';
    private _gridState: IgcGridStateComponent;

    public get gridState() {
        if (!this._gridState) {
            this._gridState = document.getElementById('gridState') as IgcGridStateComponent;
        }
        return this._gridState;
    }

    constructor() {
        var grid = document.getElementById("grid") as IgcPivotGridComponent;
        grid.pivotConfiguration = this.pivotConfiguration;
        PivotNoopData.getData().then((value) => {
            grid.data = value;
        });
        var saveStateBtn = document.getElementById("saveState") as IgcButtonComponent;
        var restoreStateBtn = document.getElementById("restoreState") as IgcButtonComponent;
        var clearStorageBtn = document.getElementById("clearStorage") as IgcButtonComponent;

        saveStateBtn.addEventListener('click', (ev: any) => this.saveGridState());
        restoreStateBtn.addEventListener('click', (ev: any) => this.restoreGridState());
        clearStorageBtn.addEventListener('click', (ev: any) => this.clearStorage());

        this.gridState.addEventListener('stateParsed', (ev:any) => this.stateParsedHandler(ev) );
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

    public clearStorage() {
        window.localStorage.removeItem(this.stateKey);
    }
    
    public stateParsedHandler(ev: any) {
        const parsedState = ev.detail;
        parsedState.pivotConfiguration.rowStrategy = IgcNoopPivotDimensionsStrategy.instance();
        parsedState.pivotConfiguration.columnStrategy = IgcNoopPivotDimensionsStrategy.instance();
    }
}

new Sample();
