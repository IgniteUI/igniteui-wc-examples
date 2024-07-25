import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { FinancialDataAllItem, FinancialDataAll } from './FinancialDataAll';
import { IgcPropertyEditorPropertyDescriptionButtonClickEventArgs } from 'igniteui-webcomponents-layouts';
import { IgcRowType } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
defineAllComponents();

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;

        this._bind = () => {
            grid.data = this.financialDataAll;
            grid.rowStyles = this.webGridRowStylesHandler;
        }
        this._bind();

    }

    private _financialDataAll: FinancialDataAll = null;
    public get financialDataAll(): FinancialDataAll {
        if (this._financialDataAll == null)
        {
            this._financialDataAll = new FinancialDataAll();
        }
        return this._financialDataAll;
    }


    public webGridRowStylesHandler = {
        'background': (row: IgcRowType) => (+row.data['Change'] < 0 && +row.data['YearlyChange'] < 0) ? '#FF000088' : '#00000000',
        'border': (row: IgcRowType) => (+row.data['Change'] < 0 && +row.data['YearlyChange'] < 0) ? '2px solid' : '1px solid',
        'border-color': (row: IgcRowType) => (+row.data['Change'] < 0 && +row.data['YearlyChange'] < 0) ? '#FF000099' : '#E9E9E9'
    };

}

new Sample();
