import { IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent } from 'igniteui-webcomponents-charts';
import { IgcItemLegendModule } from 'igniteui-webcomponents-charts';
import { IgcDoughnutChartComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcSliceClickEventArgs } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDoughnutChartModule,
    IgcRingSeriesModule,
    IgcItemLegendModule
);

export class DoughnutChartSelection {

    private chart: IgcDoughnutChartComponent;
  
    constructor() {

        let ringSeries = document.getElementById('ringSeries') as IgcRingSeriesComponent;
        
        ringSeries.dataSource = this.getData();       
        ringSeries.legend = document.getElementById('legend') as IgcItemLegendComponent

        this.chart = document.getElementById('chart') as IgcDoughnutChartComponent;
        // this.chart.series.add(ringSeries);
        this.chart.sliceClick = this.onSliceClick;
        this.chart.selectedSliceOpacity = 0.85;
        this.chart.selectedSliceStrokeThickness = 4;
        this.chart.selectedSliceStroke = 'rgba(0, 0, 0, 0.5)';       
    }

    public onSliceClick = (s: IgcDoughnutChartComponent, e: IgcSliceClickEventArgs) => {
       
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

new DoughnutChartSelection();
