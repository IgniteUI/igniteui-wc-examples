import { IgcFunnelChartModule } from 'igniteui-webcomponents-charts';
import { IgcFunnelChartComponent } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent } from 'igniteui-webcomponents-charts';
import { IgcItemLegendModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcFunnelSliceClickedEventArgs } from 'igniteui-webcomponents-charts';

ModuleManager.register(IgcFunnelChartModule,IgcItemLegendModule);

export class FunnelChartSelection {

    private chart: IgcFunnelChartComponent;

    constructor() {

        this.onSliceClick= this.onSliceClick.bind(this);

        this.chart = document.getElementById('chart') as IgcFunnelChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.sliceClicked = this.onSliceClick;
        this.chart.selectedSliceOpacity = 0.85;
        this.chart.selectedSliceStrokeThickness = 4;
        this.chart.selectedSliceStroke = 'rgba(0, 0, 0, 0.5)';
        this.chart.legend = document.getElementById('legend') as IgcItemLegendComponent;
    }

    onSliceClick(s: IgcFunnelChartComponent, e: IgcFunnelSliceClickedEventArgs) {

        this.chart.selectedSliceFill = "purple";
        this.chart.selectedSliceOpacity = 0.50;
        this.chart.selectedSliceStroke = "green";
    }

    public getData(): any[] {
        let data = [
            { MarketShare: 37, Company: "Cooling", Summary: "Cooling 37%" },
            { MarketShare: 25, Company: "Residential", Summary: "Residential 25%"  },
            { MarketShare: 12, Company: "Heating", Summary: "Heating 12%" },
            { MarketShare: 8, Company: "Lighting", Summary: "Lighting 8%" },
            { MarketShare: 18, Company: "Other", Summary: "Other 18%" }
        ];

        return data;
    }
}

new FunnelChartSelection();
