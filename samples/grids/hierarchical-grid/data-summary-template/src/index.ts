import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebHierarchicalGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcHierarchicalGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
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
    private hierarchicalGrid: IgcHierarchicalGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private column4: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var summaryRowHeightEditor = this.summaryRowHeightEditor = document.getElementById('SummaryRowHeightEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var toggleSummariesEditor = this.toggleSummariesEditor = document.getElementById('ToggleSummariesEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webHierarchicalGridHasSummariesChange = this.webHierarchicalGridHasSummariesChange.bind(this);
        var displayDensityEditor = this.displayDensityEditor = document.getElementById('DisplayDensityEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var hierarchicalGrid = this.hierarchicalGrid = document.getElementById('hierarchicalGrid') as IgcHierarchicalGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;
        var column4 = this.column4 = document.getElementById('column4') as IgcColumnComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.hierarchicalGrid;
            toggleSummariesEditor.changed = this.webHierarchicalGridHasSummariesChange;
            hierarchicalGrid.data = this.singersData;
            column1.summaries = this.singerSummary;
            column2.summaryTemplate = this.webHierarchicalGridSummaryTemplateStyle;
            column3.summaryTemplate = this.webHierarchicalGridSummaryTemplate;
            column4.summaryTemplate = this.webRowIslandGridSummaryTemplateStyle;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            WebHierarchicalGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webHierarchicalGridHasSummariesChange(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        let newValue = sender.primitiveValue as boolean;
        const grid = this.hierarchicalGrid;
        var column1 = grid.getColumnByName("Photo");
        var column2 = grid.getColumnByName("GrammyNominations");
        var column3 = grid.getColumnByName("GrammyAwards");

        column1.hasSummary = newValue;
        column2.hasSummary = newValue;
        column3.hasSummary = newValue;
    }

    public webHierarchicalGridSummaryTemplateStyle = (ctx: IgcSummaryTemplateContext) => {
        const summaryResults = ctx.implicit as IgcSummaryResult[];
        return html`<div class="summary-temp">
            <span><strong>${ summaryResults[0].label }</strong><span>${ summaryResults[0].summaryResult }</span></span>
            <span><strong>${ summaryResults[1].label }</strong><span>${ summaryResults[1].summaryResult }</span></span>
            <span><strong>${ summaryResults[2].label }</strong><span>${ summaryResults[2].summaryResult }</span></span>
        </div>`;
    }

    public webHierarchicalGridSummaryTemplate = (ctx: IgcSummaryTemplateContext) => {
        const summaryResults = ctx.implicit as IgcSummaryResult[];
        return html`<div class="summary-temp">
            <span>${ summaryResults[0].label }<span>${ summaryResults[0].summaryResult }</span></span>
            <span>${ summaryResults[1].label }<span>${ summaryResults[1].summaryResult }</span></span>
            <span>${ summaryResults[2].label }<span>${ summaryResults[2].summaryResult }</span></span>
        </div>`;
    }

    public webRowIslandGridSummaryTemplateStyle = (ctx: IgcSummaryTemplateContext) => {
        const summaryResults = ctx.implicit as IgcSummaryResult[];
        return html`<div class="summary-temp">
            <span><strong>${ summaryResults[0].label }</strong><span>${ summaryResults[0].summaryResult }</span></span>
            <span><strong>${ summaryResults[1].label }</strong><span>${ new Date(summaryResults[1].summaryResult) }</span></span>
        </div>`;
    }

    private singerSummary = {
        sum(data: any[] = []): number {
            return data.length && data.filter((el) => el === 0 || Boolean(el)).length ? data.filter((el) => el === 0 || Boolean(el)).reduce((a, b) => +a + +b) : 0;
        },
        operate(data?: any[], allData: any[] = [], fieldName = ''): any[] {
            const result = [] as any[];
            result.push({
                key: 'nominatedSingers',
                label: 'Nominated Singers',
                summaryResult: allData.filter((rec) => rec['GrammyNominations'] > 0).length
            });
            result.push({
                key: 'singersWithAwards',
                label: 'Singers with Awards',
                summaryResult: allData.filter((rec) => rec['GrammyAwards'] > 0).length
            });
            result.push({
                key: 'nominations',
                label: 'Total Nominations',
                summaryResult: this.sum(allData.map(r => r['GrammyNominations']))
            } );
            result.push({
                key: 'awards',
                label: 'Total Awards',
                summaryResult: this.sum(allData.map(r => r['GrammyAwards']))
            });
            return result;
        }
    }
}

new Sample();
