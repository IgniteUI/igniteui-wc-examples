import { IgcPieChartModule } from 'igniteui-webcomponents-charts';
import { IgcPieChartComponent } from 'igniteui-webcomponents-charts';
import { IgcItemLegendModule } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPieChartModule,
    IgcItemLegendModule
);

export class PieChartLegend {

    private chart: IgcPieChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcPieChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.legend = document.getElementById('legend') as IgcItemLegendComponent;
    }

    public getData(): any[] {
        let data = [
            { MarketShare: 37, Company: "Space Cooling", Summary: "Space Cooling 37%" },
            { MarketShare: 25, Company: "Residential Appliance", Summary: "Residential Appliance 25%"  },
            { MarketShare: 12, Company: "Heating", Summary: "Heating 12%" },
            { MarketShare: 8, Company: "Lighting", Summary: "Lighting 8%" },                
            { MarketShare: 18, Company: "Other Services", Summary: "Other Services 18%" }    

        ];

        return data;
    }
}

new PieChartLegend();
