import 'igniteui-webcomponents-grids/grids/combined';
import { IgcPivotGridComponent, IgcPivotConfiguration } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcButtonGroupComponent, IgcToggleButtonComponent } from 'igniteui-webcomponents';
import { PivotDataFlat } from './PivotDataFlat';

import "igniteui-webcomponents-grids/grids/themes/light/material.css";
import "./index.css";

defineComponents(IgcButtonGroupComponent, IgcToggleButtonComponent);

export class Sample {

    private pivotGrid: IgcPivotGridComponent;
    private pivotTheme: HTMLElement;
    private themeSwitcher: IgcButtonGroupComponent;
    private activeTheme = 'theme-studio';
    private _bind: () => void;

    public pivotConfigHierarchy: IgcPivotConfiguration = {
        columns: [
            {
                memberName: 'Product',
                memberFunction: (data: any) => data.ProductName,
                enabled: true
            }
        ],
        rows: [
            {
                memberName: 'City',
                memberFunction: (data: any) => data.SellerCity,
                enabled: true,
                childLevel: {
                    memberName: 'Seller',
                    memberFunction: (data: any) => data.SellerName,
                    enabled: true
                }
            }
        ],
        values: [
            {
                member: 'NumberOfUnits',
                aggregate: {
                    aggregatorName: 'SUM',
                    key: 'sum',
                    label: 'Sum'
                },
                enabled: true
            }
        ],
        filters: null
    };

    constructor() {
        var pivotGrid = this.pivotGrid = document.getElementById('pivotGrid') as IgcPivotGridComponent;
        this.pivotTheme = document.getElementById('pivotTheme');
        var themeSwitcher = this.themeSwitcher = document.getElementById('themeSwitcher') as IgcButtonGroupComponent;

        this._bind = () => {
            pivotGrid.pivotConfiguration = this.pivotConfigHierarchy;
            pivotGrid.data = this.pivotDataFlat;
            themeSwitcher.addEventListener('igcSelect', (e: CustomEvent<string>) => this.selectTheme(e.detail));
        }
        this._bind();
    }

    private _pivotDataFlat: PivotDataFlat = null;
    public get pivotDataFlat(): PivotDataFlat {
        if (this._pivotDataFlat == null) {
            this._pivotDataFlat = new PivotDataFlat();
        }
        return this._pivotDataFlat;
    }

    public selectTheme(theme: string): void {
        this.pivotTheme.classList.replace(this.activeTheme, theme);
        this.activeTheme = theme;
    }
}

new Sample();
