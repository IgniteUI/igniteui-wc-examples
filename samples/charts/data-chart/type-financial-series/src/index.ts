import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcMedianPriceIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcBollingerBandsOverlayModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcMedianPriceIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IndicatorDisplayType } from 'igniteui-webcomponents-charts';
import { PriceDisplayType } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SampleFinancialData } from './SampleFinancialData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcFinancialPriceSeriesModule,
    IgcMedianPriceIndicatorModule,
    IgcBollingerBandsOverlayModule
);

export class DataChartTypeFinancialSeries {

    private chart: IgcDataChartComponent;
    private priceSeries: IgcFinancialPriceSeriesComponent;
    private medianPriceIndicator: IgcMedianPriceIndicatorComponent;
    public displayTypeSeries: PriceDisplayType = PriceDisplayType.Candlestick;
    public displayTypeIndicator: IndicatorDisplayType = IndicatorDisplayType.Line;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = SampleFinancialData.create();

        this.priceSeries = document.getElementById('series2') as IgcFinancialPriceSeriesComponent;
        this.priceSeries.displayType = this.displayTypeSeries;

        this.medianPriceIndicator = document.getElementById('series3') as IgcMedianPriceIndicatorComponent;
        this.medianPriceIndicator.displayType = this.displayTypeIndicator;

        const seriesSelect = document.getElementById('seriesSelect') as HTMLSelectElement;
        seriesSelect!.addEventListener('change', this.onDisplayTypeSeriesChanged);

        const indicatorSelect = document.getElementById('indicatorSelect') as HTMLSelectElement;
        indicatorSelect!.addEventListener('change', this.onDisplayTypeIndicatorChanged);
    }

    public onDisplayTypeSeriesChanged = (e: any) =>{
        const type = e.target.value.toString();
        switch (type) {
            case 'Candlestick':
                this.displayTypeSeries = PriceDisplayType.Candlestick;
                break;
            case 'OHLC':
                this.displayTypeSeries = PriceDisplayType.OHLC;
                break;
        }
        this.priceSeries.displayType = this.displayTypeSeries;
    }

    public onDisplayTypeIndicatorChanged = (e: any) =>{
        const type = e.target.value.toString();
        switch (type) {
            case 'Line':
                this.displayTypeIndicator = IndicatorDisplayType.Line;
                break;
            case 'Area':
                this.displayTypeIndicator = IndicatorDisplayType.Area;
                break;
            case 'Column':
                this.displayTypeIndicator = IndicatorDisplayType.Column;
                break;
        }
        this.medianPriceIndicator.displayType = this.displayTypeIndicator;
    }
}

export function initialize() {
  return new DataChartTypeFinancialSeries();
}