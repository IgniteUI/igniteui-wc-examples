import { IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcDoughnutChartComponent } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent } from 'igniteui-webcomponents-charts';
import { IgcItemLegendModule } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcIndexCollection } from 'igniteui-webcomponents-charts';
import { IgcSliceClickEventArgs } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDoughnutChartModule,
    IgcRingSeriesModule,
    IgcItemLegendModule
);

export class DoughnutChartExplosion {

    private chart: IgcDoughnutChartComponent;

    constructor() {
        let ringSeries = document.getElementById('ringSeries') as IgcRingSeriesComponent;
        ringSeries.dataSource = this.getData();
        ringSeries.explodedSlices.add(3);
        ringSeries.explodedSlices.add(4);
        ringSeries.legend = document.getElementById('legend') as IgcItemLegendComponent;

        this.chart = document.getElementById('chart') as IgcDoughnutChartComponent;
        this.chart.sliceClick = this.onSliceClick;
    }

    public onSliceClick = (s: IgcDoughnutChartComponent, e: IgcSliceClickEventArgs) => {
        e.isExploded = !e.isExploded;
        e.isSelected = false;
    }

    public getData(): any[] {
        return [
            { MarketShare: 37,  Category: "Cooling",        Summary: "Cooling 37%" , },
            { MarketShare: 25,  Category: "Residential",    Summary: "Residential 25%" , },
            { MarketShare: 12,  Category: "Heating",        Summary: "Heating 12%" ,},
            { MarketShare: 8,   Category: "Lighting",       Summary: "Lighting 8%" ,},
            { MarketShare: 18,  Category: "Other",          Summary: "Other 18%" ,} ,
        ];
    }
}

new DoughnutChartExplosion();
