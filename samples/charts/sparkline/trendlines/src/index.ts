import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcSparklineModule);

export class SparklineTrendlines {
    private sparkline: IgcSparklineComponent;

    constructor() {
        this.onTrendlineChanged = this.onTrendlineChanged.bind(this);

        this.sparkline = document.getElementById('sparkline') as IgcSparklineComponent;
        this.sparkline.dataSource = this.getData();

        let trendlineType = document.getElementById('trendlineType') as HTMLSelectElement;
        trendlineType!.value = "ExponentialFit";
        trendlineType!.addEventListener('change', this.onTrendlineChanged);
    }

    public onTrendlineChanged(e: any) {
        const selection = e.target.value.toString();
        this.sparkline.trendLineType = selection;
    }

    public getData(): any[] {
        const data: any[] = [];
        let index = 0;
        let min = 1000;
        let max = -1000;

        for (let angle = 0; angle <= 360 * 4; angle += 5) {
            const v1 = Math.sin(angle * Math.PI / 180);
            const v2 = Math.sin(3 * angle * Math.PI / 180) / 3;
            let revenue = v1 + v2;
            data.push({
                Label: index++,
                Angle: angle,
                Value: revenue
            });
            min = Math.min(min, revenue);
            max = Math.max(max, revenue);
        }
        return data;
    }
}

new SparklineTrendlines();
