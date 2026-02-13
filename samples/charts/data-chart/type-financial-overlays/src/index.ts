import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcBollingerBandsOverlayModule } from 'igniteui-webcomponents-charts';
import { IgcPriceChannelOverlayModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcBollingerBandsOverlayComponent } from 'igniteui-webcomponents-charts';
import { IgcPriceChannelOverlayComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SampleFinancialData } from './SampleFinancialData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcFinancialPriceSeriesModule,
    IgcBollingerBandsOverlayModule,
    IgcPriceChannelOverlayModule
);

export class DataChartTypeFinancialOverlays {

    private chart: IgcDataChartComponent;

    private bollingerBands: IgcBollingerBandsOverlayComponent;
    private priceChannel: IgcPriceChannelOverlayComponent;

    constructor() {

        this.bollingerBands = new IgcBollingerBandsOverlayComponent();
        this.bollingerBands.name = 'bollinger';
        this.bollingerBands.xAxisName = 'xAxis';
        this.bollingerBands.yAxisName = 'yAxis';
        this.bollingerBands.highMemberPath = 'High';
        this.bollingerBands.lowMemberPath = 'Low';
        this.bollingerBands.closeMemberPath = 'Close';
        this.bollingerBands.openMemberPath = 'Open';
        this.bollingerBands.volumeMemberPath = 'Volume';
        this.bollingerBands.brush = 'rgba(171, 82, 235, 0.3)';
        this.bollingerBands.outline = 'rgba(171, 82, 235, 0.9)';

        this.priceChannel = new IgcPriceChannelOverlayComponent();
        this.priceChannel.name = 'priceChannel';
        this.priceChannel.xAxisName = 'xAxis';
        this.priceChannel.yAxisName = 'yAxis';
        this.priceChannel.highMemberPath = 'High';
        this.priceChannel.lowMemberPath = 'Low';
        this.priceChannel.closeMemberPath = 'Close';
        this.priceChannel.openMemberPath = 'Open';
        this.priceChannel.volumeMemberPath = 'Volume';
        this.priceChannel.brush = 'rgba(171, 82, 235, 0.3)';
        this.priceChannel.outline = 'rgba(171, 82, 235, 0.9)';

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = SampleFinancialData.create();
        this.chart.series.add(this.bollingerBands);

        const overlaySelect = document.getElementById('overlaySelect') as HTMLSelectElement;
        overlaySelect.value = 'BollingerBands';
        overlaySelect!.addEventListener('change', this.onOverlayChanged);
    }

    public onOverlayChanged = (e: any) => {
        const type = e.target.value.toString();
        switch (type) {
            case 'None': {
                this.chart.series.remove(this.priceChannel);
                this.chart.series.remove(this.bollingerBands);
                break;
            }
            case 'BollingerBands': {
                this.chart.series.remove(this.priceChannel);
                this.chart.series.add(this.bollingerBands);
                break;
            }
            case 'PriceChannel': {
                this.chart.series.remove(this.bollingerBands);
                this.chart.series.add(this.priceChannel);
            }
        }
    }
}

export function initialize() {
  return new DataChartTypeFinancialOverlays();
}