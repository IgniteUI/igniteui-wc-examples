import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, SparklineDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { SparklineMixedDataItem, SparklineMixedData } from './SparklineMixedData';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcSparklineModule
);

export class Sample {

    private chart: IgcSparklineComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcSparklineComponent;

        this._bind = () => {
            chart.dataSource = this.sparklineMixedData
        }
        this._bind();

    }

    private _sparklineMixedData: SparklineMixedData = null;
    public get sparklineMixedData(): SparklineMixedData {
        if (this._sparklineMixedData == null)
        {
            this._sparklineMixedData = new SparklineMixedData();
        }
        return this._sparklineMixedData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            SparklineDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
