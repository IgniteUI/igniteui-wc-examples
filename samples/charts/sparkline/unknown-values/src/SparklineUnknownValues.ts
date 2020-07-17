

import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SparklineSharedData } from './SparklineSharedData';
import { UnknownValuePlotting } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcSparklineModule);


export class SparklineUnknownValues {


    
    
        

    private sparkline: IgcSparklineComponent;
    public data: any[];
    constructor() {
        
        this.onRangeVisibilityChanged = this.onRangeVisibilityChanged.bind(this);
        this.data = SparklineSharedData.getSparklineSharedDataWithNullValues();
    
        

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
}


let sample = new SparklineUnknownValues();