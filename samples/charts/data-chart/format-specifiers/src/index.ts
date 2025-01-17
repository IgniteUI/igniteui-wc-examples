import { IgcDataLegendModule, IgcDataChartCoreModule, IgcDataChartCategoryCoreModule, IgcDataChartCategoryModule, IgcDataChartInteractivityModule, IgcDataChartVerticalCategoryModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcDataLegendComponent, IgcDataChartComponent, IgcCategoryYAxisComponent, IgcNumericXAxisComponent, IgcBarSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { IgcNumberFormatSpecifier } from 'igniteui-webcomponents-core';
import { HighestGrossingMoviesItem, HighestGrossingMovies } from './HighestGrossingMovies';
import { ModuleManager } from 'igniteui-webcomponents-core';
import "./index.css";


ModuleManager.register(
    IgcDataLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcDataChartVerticalCategoryModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private legend: IgcDataLegendComponent
    private _numberFormatSpecifier1: IgcNumberFormatSpecifier[] | null = null;
    public get numberFormatSpecifier1(): IgcNumberFormatSpecifier[] {
        if (this._numberFormatSpecifier1 == null)
        {
            let numberFormatSpecifier1: IgcNumberFormatSpecifier[] = [];
            var numberFormatSpecifier2 = new IgcNumberFormatSpecifier();
            numberFormatSpecifier2.style = "currency";
            numberFormatSpecifier2.currency = "USD";
            numberFormatSpecifier2.currencyDisplay = "symbol";
            numberFormatSpecifier2.minimumFractionDigits = 2;
            numberFormatSpecifier2.maximumFractionDigits = 2;

            numberFormatSpecifier1.push(numberFormatSpecifier2)
            this._numberFormatSpecifier1 = numberFormatSpecifier1;
        }
        return this._numberFormatSpecifier1;
    }

    private chart: IgcDataChartComponent
    private yAxis: IgcCategoryYAxisComponent
    private xAxis: IgcNumericXAxisComponent
    private _numberFormatSpecifier3: IgcNumberFormatSpecifier[] | null = null;
    public get numberFormatSpecifier3(): IgcNumberFormatSpecifier[] {
        if (this._numberFormatSpecifier3 == null)
        {
            let numberFormatSpecifier3: IgcNumberFormatSpecifier[] = [];
            var numberFormatSpecifier4 = new IgcNumberFormatSpecifier();
            numberFormatSpecifier4.style = "currency";
            numberFormatSpecifier4.currency = "USD";
            numberFormatSpecifier4.currencyDisplay = "symbol";
            numberFormatSpecifier4.minimumFractionDigits = 0;

            numberFormatSpecifier3.push(numberFormatSpecifier4)
            this._numberFormatSpecifier3 = numberFormatSpecifier3;
        }
        return this._numberFormatSpecifier3;
    }

    private barSeries1: IgcBarSeriesComponent
    private barSeries2: IgcBarSeriesComponent
    private tooltips: IgcDataToolTipLayerComponent
    private _numberFormatSpecifier5: IgcNumberFormatSpecifier[] | null = null;
    public get numberFormatSpecifier5(): IgcNumberFormatSpecifier[] {
        if (this._numberFormatSpecifier5 == null)
        {
            let numberFormatSpecifier5: IgcNumberFormatSpecifier[] = [];
            var numberFormatSpecifier6 = new IgcNumberFormatSpecifier();
            numberFormatSpecifier6.style = "currency";
            numberFormatSpecifier6.currency = "USD";
            numberFormatSpecifier6.currencyDisplay = "symbol";
            numberFormatSpecifier6.minimumFractionDigits = 2;
            numberFormatSpecifier6.maximumFractionDigits = 2;

            numberFormatSpecifier5.push(numberFormatSpecifier6)
            this._numberFormatSpecifier5 = numberFormatSpecifier5;
        }
        return this._numberFormatSpecifier5;
    }

    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcDataLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcCategoryYAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var barSeries1 = this.barSeries1 = document.getElementById('BarSeries1') as IgcBarSeriesComponent;
        var barSeries2 = this.barSeries2 = document.getElementById('BarSeries2') as IgcBarSeriesComponent;
        var tooltips = this.tooltips = document.getElementById('Tooltips') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            legend.target = this.chart;
            legend.valueFormatSpecifiers = this.numberFormatSpecifier1;
            yAxis.dataSource = this.highestGrossingMovies;
            xAxis.labelFormatSpecifiers = this.numberFormatSpecifier3;
            barSeries1.xAxis = this.xAxis;
            barSeries1.yAxis = this.yAxis;
            barSeries1.dataSource = this.highestGrossingMovies;
            barSeries2.xAxis = this.xAxis;
            barSeries2.yAxis = this.yAxis;
            barSeries2.dataSource = this.highestGrossingMovies;
            tooltips.valueFormatSpecifiers = this.numberFormatSpecifier5;
        }
        this._bind();
    }

    private _highestGrossingMovies: HighestGrossingMovies = null;
    public get highestGrossingMovies(): HighestGrossingMovies {
        if (this._highestGrossingMovies == null)
        {
            this._highestGrossingMovies = new HighestGrossingMovies();
        }
        return this._highestGrossingMovies;
    }

}

new Sample();
