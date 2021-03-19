import { IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcDoughnutChartComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent } from 'igniteui-webcomponents-charts';
import { IgcItemLegendModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDoughnutChartModule,
    IgcItemLegendModule
);

export class DoughnutChartLegend {

    private series: IgcRingSeriesComponent;

    constructor() {

        this.series = document.getElementById('ringSeries') as IgcRingSeriesComponent;
        this.series.dataSource = this.getData();
        this.series.legend = document.getElementById('legend') as IgcItemLegendComponent;
    }

    public getData(): any[] {
        return[
            { MarketShare: 37, Company: "Space Cooling", Summary: "Space Cooling 37%" },
            { MarketShare: 25, Company: "Residential Appliance", Summary: "Residential Appliance 25%"  },
            { MarketShare: 12, Company: "Heating", Summary: "Heating 12%" },
            { MarketShare: 8, Company: "Lighting", Summary: "Lighting 8%" },
            { MarketShare: 18, Company: "Other Services", Summary: "Other Services 18%" }

        ];
    }
}

new DoughnutChartLegend();
