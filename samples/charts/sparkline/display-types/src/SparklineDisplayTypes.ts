

import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcSparklineModule);


export class SparklineDisplayTypes {






    private chart1: IgcSparklineComponent;
    private chart2: IgcSparklineComponent;
    private chart3: IgcSparklineComponent;
    private chart4: IgcSparklineComponent;
    public data: any[] = [];

    constructor() {

        this.data = this.createData(360 * 1.5);



        this.chart1 = document.getElementById('chart1') as IgcSparklineComponent;
        this.chart2 = document.getElementById('chart2') as IgcSparklineComponent;
        this.chart3 = document.getElementById('chart3') as IgcSparklineComponent;
        this.chart4 = document.getElementById('chart4') as IgcSparklineComponent;

        this.chart1.dataSource =  this.data;
        this.chart2.dataSource =  this.data;
        this.chart3.dataSource =  this.data;
        this.chart4.dataSource  = this.data;
    }

    public createData(itemsCount: number): any[] {
        const data: any[] = [];
        let index = 0;
        let min = 1000;
        let max = -1000
        for (let angle = 0; angle <= itemsCount; angle += 10) {
            const v1 = Math.sin(angle * Math.PI / 180);
            const v2 = Math.sin(3 * angle * Math.PI / 180) / 3;
            data.push({
                'Index': index++,
                'Angle': angle,
                'Value': v1 + v2
            });
            min = Math.min(min, v1 + v2);
            max = Math.max(max, v1 + v2);
        }

        console.log(min);
        console.log(max);
        return data;
    }
}

let sample = new SparklineDisplayTypes();