import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcTreemapModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, TreemapDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcTreemapComponent } from 'igniteui-webcomponents-charts';
import { CountyHierarchicalDataItem, CountyHierarchicalData } from './CountyHierarchicalData';

import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcTreemapModule
);

export class Sample {

    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private layoutTypeEditor: IgcPropertyEditorPropertyDescriptionComponent
    private layoutOrientationEditor: IgcPropertyEditorPropertyDescriptionComponent
    private headerDisplayModeEditor: IgcPropertyEditorPropertyDescriptionComponent
    private labelVerticalAlignmentEditor: IgcPropertyEditorPropertyDescriptionComponent
    private treemap: IgcTreemapComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var layoutTypeEditor = this.layoutTypeEditor = document.getElementById('LayoutTypeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var layoutOrientationEditor = this.layoutOrientationEditor = document.getElementById('LayoutOrientationEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var headerDisplayModeEditor = this.headerDisplayModeEditor = document.getElementById('HeaderDisplayModeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var labelVerticalAlignmentEditor = this.labelVerticalAlignmentEditor = document.getElementById('LabelVerticalAlignmentEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var treemap = this.treemap = document.getElementById('treemap') as IgcTreemapComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.treemap;
            treemap.dataSource = this.countyHierarchicalData;
        }
        this._bind();

    }

    private _countyHierarchicalData: CountyHierarchicalData = null;
    public get countyHierarchicalData(): CountyHierarchicalData {
        if (this._countyHierarchicalData == null)
        {
            this._countyHierarchicalData = new CountyHierarchicalData();
        }
        return this._countyHierarchicalData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            TreemapDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
