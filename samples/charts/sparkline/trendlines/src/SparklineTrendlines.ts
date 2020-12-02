import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SparklineSharedData } from './SparklineSharedData';

ModuleManager.register(IgcSparklineModule);

export class SparklineTrendlines {

    private sparkline: IgcSparklineComponent;
    public data: any [];

    constructor() {

        this.onTrendlineChanged = this.onTrendlineChanged.bind(this);

        this.data = SparklineSharedData.getSharedData();

        this.sparkline = document.getElementById('sparkline') as IgcSparklineComponent;
        this.sparkline.dataSource = this.data;

        let trendlineType = document.getElementById('trendlineType');
        trendlineType!.addEventListener('change', this.onTrendlineChanged);
    }

    public onTrendlineChanged(e: any) {
        const selection = e.target.value.toString();
        this.sparkline.trendLineType = selection;
    }
}

let sample = new SparklineTrendlines();
