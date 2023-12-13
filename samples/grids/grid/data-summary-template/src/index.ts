import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';
import { IgcPropertyEditorPropertyDescriptionChangedEventArgs } from 'igniteui-webcomponents-layouts';
import { IgcSummaryResult, IgcSummaryTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private summaryRowHeightEditor: IgcPropertyEditorPropertyDescriptionComponent
    private toggleSummariesEditor: IgcPropertyEditorPropertyDescriptionComponent
    private displayDensityEditor: IgcPropertyEditorPropertyDescriptionComponent
    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var summaryRowHeightEditor = this.summaryRowHeightEditor = document.getElementById('SummaryRowHeightEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var toggleSummariesEditor = this.toggleSummariesEditor = document.getElementById('ToggleSummariesEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridHasSummariesChange = this.webGridHasSummariesChange.bind(this);
        var displayDensityEditor = this.displayDensityEditor = document.getElementById('DisplayDensityEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.grid;
            toggleSummariesEditor.changed = this.webGridHasSummariesChange;
            grid.data = this.nwindData;
            column1.summaries = this.discontinuedSummary;
            column2.summaryTemplate = this.webGridOrderDateSummaryTemplate;
        }
        this._bind();

    }

    private _nwindData: NwindData = null;
    public get nwindData(): NwindData {
        if (this._nwindData == null)
        {
            this._nwindData = new NwindData();
        }
        return this._nwindData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            WebGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridHasSummariesChange(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        let newValue = sender.primitiveValue as boolean;
        const grid = this.grid;
        var column1 = grid.getColumnByName("UnitsInStock");
        var column2 = grid.getColumnByName("OrderDate");

        column1.hasSummary = newValue;
        column2.hasSummary = newValue;
    }

    public webGridOrderDateSummaryTemplate = (ctx: IgcSummaryTemplateContext) => {
        const summaryResults = ctx.implicit as IgcSummaryResult[];
        return html`<div class="summary-temp">
            <span><strong>${ summaryResults[0].label }</strong><span>${ summaryResults[0].summaryResult }</span></span>
            <span><strong>${ summaryResults[1].label }</strong><span>${ summaryResults[1].summaryResult }</span></span>
        </div>`;
    }

    private discontinuedSummary = {
        sum(data: any[] = []): number {
            return data.length && data.filter((el) => el === 0 || Boolean(el)).length ? data.filter((el) => el === 0 || Boolean(el)).reduce((a, b) => +a + +b) : 0;
        },
        operate(data?: any[], allData: any[] = [], fieldName = ''): any[] {
            const result = [] as any[];
            result.push({
                key: 'products',
                label: 'Producs',
                summaryResult: data?.length
            });
            result.push({
                key: 'total',
                label: 'Total Items',
                summaryResult: this.sum(data)
            });
            result.push({
                key: 'discontinued',
                label: 'Discontinued Producs',
                summaryResult: allData.map(r => r['Discontinued']).filter((rec) => rec).length
            } );
            result.push({
                key: 'totalDiscontinued',
                label: 'Total Discontinued Items',
                summaryResult: this.sum(allData.filter((rec) => rec['Discontinued']).map(r => r[fieldName]))
            } );
            return result;
        }
    }
}

new Sample();
