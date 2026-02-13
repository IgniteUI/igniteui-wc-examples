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
    private selectedSliceLabel: HTMLLabelElement;
    private selectedSliceValue: HTMLLabelElement;
    private data: any[];

    constructor() {
        this.data = [
            { MarketShare: 37, Category: "Cooling", Summary: "Cooling 37%", },
            { MarketShare: 25, Category: "Residential", Summary: "Residential 25%",  },
            { MarketShare: 12, Category: "Heating", Summary: "Heating 12%", },
            { MarketShare: 8, Category: "Lighting", Summary: "Lighting 8%", },
            { MarketShare: 18, Category: "Other", Summary: "Other 18%", }
        ];

        let ringSeries = document.getElementById('ringSeries') as IgcRingSeriesComponent;
        ringSeries.dataSource = this.data;
        ringSeries.legend = document.getElementById('legend') as IgcItemLegendComponent
        ringSeries.selectedSlices.add(0);

        this.chart = document.getElementById('chart') as IgcDoughnutChartComponent;
        this.chart.sliceClick = this.onSliceClick;

        this.selectedSliceLabel = document.getElementById('selectedSliceLabel') as HTMLLabelElement;
        this.selectedSliceLabel!.innerText = this.data[0].Category;
        this.selectedSliceValue = document.getElementById('selectedSliceValue') as HTMLLabelElement;
        this.selectedSliceValue!.innerText = this.data[0].MarketShare + "%";
    }

    public onSliceClick = (s: IgcDoughnutChartComponent, e: IgcSliceClickEventArgs) => {
        if (e.isSelected) {
            this.selectedSliceLabel.innerText = this.data[e.index].Category;
            this.selectedSliceValue.innerText = this.data[e.index].MarketShare + "%";
        } else {
            this.selectedSliceLabel.innerText = "No Selection";
            this.selectedSliceValue.innerText = "0%";
        }
    }
}

export function initialize() {
  return new DoughnutChartSelection();
}