import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcSparklineModule);

export class SparklineDisplayLines {

    private chart1: IgcSparklineComponent;
    private chart2: IgcSparklineComponent;
    private chart3: IgcSparklineComponent;

    public data: any[] = [];

    constructor() {

        this.data = this.generateData();

        this.chart1 = document.getElementById('chart1') as IgcSparklineComponent;
        this.chart2 = document.getElementById('chart2') as IgcSparklineComponent;
        this.chart3 = document.getElementById('chart3') as IgcSparklineComponent;

         this.chart1.dataSource = this.data;
         this.chart2.dataSource = this.data;
         this.chart3.dataSource = this.data;
    }

    public createData(itemsCount: number): any[] {
        const data: any[] = [];
        let revenue = 0;
        for (let i = 0; i <= itemsCount; i += 10) {
            const v1 = Math.sin(i * Math.PI / 180);
            const v2 = Math.sin(3 * i * Math.PI / 180) / 3;
            revenue = v1 + v2;
            let expanse = revenue < 0 ? revenue : 0;
            let income = revenue > 0 ? revenue : 0;
            data.push({ Label: i, Income: income, Expanse: expanse, Revenue: revenue });
        }
        return data;
    }

    public generateData()
    {
        const data: any[] = [];
        let index = 0;
        let min = 1000.0;
        let max = -1000.0;

        for (let angle = 0; angle < 360 * 4; angle += 5)
        {
            let v1 = Math.sin(angle * Math.PI / 180);
            let v2 = Math.sin(3 * angle * Math.PI / 180) / 3;
            let revenue = v1 + v2;
            let expanse = revenue < 0 ? revenue : 0;
            let income = revenue > 0 ? revenue : 0;

            data.push({
                "Index": index++,
                "Angle": angle,
                // Value = v1 + v2
                "Value": revenue,
                "Expanse": expanse,
                "Income": income
            });

            min = Math.min(min, v1 + v2);
            max = Math.max(max, v1 + v2);
        }

        return data;
    }
}

new SparklineDisplayLines();
