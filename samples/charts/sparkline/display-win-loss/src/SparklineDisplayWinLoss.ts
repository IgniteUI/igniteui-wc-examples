

import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcSparklineModule);


export class SparklineDisplayWinLoss {






    private chart1: IgcSparklineComponent;
    private chart2: IgcSparklineComponent;
    private chart3: IgcSparklineComponent;
    public data1: any[] = [];
    public data2: any[] = [];

    constructor() {

        this.data1 = this.createData2(720 * 1);
        this.data2 = this.createData2(720 * 2);



        this.chart1 = document.getElementById('chart1') as IgcSparklineComponent;
        this.chart2 = document.getElementById('chart2') as IgcSparklineComponent;
        this.chart3 = document.getElementById('chart3') as IgcSparklineComponent;

        this.chart1.dataSource = this.data1;
        this.chart2.dataSource = this.data1;
        this.chart3.dataSource = this.data2;
    }

    public createData1(itemsCount: number): any[] {
        const data: any[] = [];
        let v1 = 0;
        let v2 = 5;
        for (let i = 0; i <= itemsCount; i++) {
            v1 += (Math.random() - 0.5) * 4;
            v1 = this.clamp(v1, -10, 10);
            v2 += (Math.random() - 0.5) * 4;
            v2 = this.clamp(v2, -10, 10);
            let l = i.toString();
            data.push({ Label: l, Value1: v1, Value2: v2 });
        }
        return data;
    }

    public createData2(itemsCount: number): any[] {
        const data: any[] = [];
        let index = 0;
        for (let angle = 0; angle <= itemsCount; angle += 10)
        {
            const r1 = Math.random() - 0.1;
            const r2 = Math.random() - 0.2;
            const v1 = Math.sin(angle * r1 * Math.PI / 180);
            const v2 = Math.cos(angle * r2 * Math.PI / 180);
            data.push({
                'Index': index++,
                'Angle': angle,
                'Value1': v1,
                'Value2': v2,
            });
        }
        return data;
    }

    public clamp(v: number, min: number, max: number): number {
        if (v > max) {
            v = max;
        }
        else if (v < min) {
            v = min;
        }
        return v;
    }
}

let sample = new SparklineDisplayWinLoss();