import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebHierarchicalGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcHierarchicalGridComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcPropertyEditorPropertyDescriptionChangedEventArgs } from 'igniteui-webcomponents-layouts';

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
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var summaryRowHeightEditor = this.summaryRowHeightEditor = document.getElementById('SummaryRowHeightEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var toggleSummariesEditor = this.toggleSummariesEditor = document.getElementById('ToggleSummariesEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webHierarchicalGridHasSummariesChange = this.webHierarchicalGridHasSummariesChange.bind(this);
        var displayDensityEditor = this.displayDensityEditor = document.getElementById('DisplayDensityEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var hierarchicalGrid = this.hierarchicalGrid = document.getElementById('hierarchicalGrid') as IgcHierarchicalGridComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.hierarchicalGrid;
            toggleSummariesEditor.changed = this.webHierarchicalGridHasSummariesChange;
            hierarchicalGrid.data = this.singersData;
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

}

new Sample();
