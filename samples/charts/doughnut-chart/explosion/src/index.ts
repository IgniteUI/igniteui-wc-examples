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
        let data: any[] = [
            { MarketShare: 37, Company: "Space Cooling", Summary: "Space Cooling 37%" , },
            { MarketShare: 25, Company: "Residential Appliance", Summary: "Residential Appliance 25%" , },
            { MarketShare: 12, Company: "Heating", Summary: "Heating 12%" ,},
            { MarketShare: 8, Company: "Lighting", Summary: "Lighting 8%" ,},
            { MarketShare: 18, Company: "Other Services", Summary: "Other Services 18%" ,} ,
        ];

        return data;
    }

}

new DoughnutChartExplosion();
