

import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { UnknownValuePlotting } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcSparklineModule);


export class SparklineUnknownValues {






    private sparkline: IgcSparklineComponent;
    public data: any[];
    constructor() {

        this.data = this.getData();

        this.onRangeVisibilityChanged = this.onRangeVisibilityChanged.bind(this);
        this.sparkline = document.getElementById('sparkline') as IgcSparklineComponent;
        this.sparkline.dataSource = this.data;

        let plotUnknownValue = document.getElementById('plotUnknownValue');
        plotUnknownValue.addEventListener('change', this.onRangeVisibilityChanged);
    }

    public onRangeVisibilityChanged(e: any) {
        const selection = e.target.checked as boolean;

        if (selection) {
            this.sparkline.unknownValuePlotting = UnknownValuePlotting.LinearInterpolate;
        }
        else {
            this.sparkline.unknownValuePlotting = UnknownValuePlotting.DontPlot;
        }
    }

    public getData(): any[] {
        const data: any[] = [
            { "Label": 4,  "Value": 4 },
            { "Label": 5,  "Value": 5 },
            { "Label": 2,  "Value": null },
            { "Label": 7,  "Value": 7 },
            { "Label": -1, "Value": -1 },
            { "Label": 3,  "Value": 3 },
            { "Label": -2, "Value": -2 },
            { "Label": 5,  "Value": null },
            { "Label": 2,  "Value": 2 },
            { "Label": 6,  "Value": 6 },
        ];
        return data;
    }
}


let sample = new SparklineUnknownValues();