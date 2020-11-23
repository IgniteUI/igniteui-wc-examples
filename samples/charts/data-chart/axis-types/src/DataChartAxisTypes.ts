

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcBarSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryYAxisModule } from 'igniteui-webcomponents-charts';
import { IgcTimeXAxisModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcBarSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcScatterSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';

import { IgcNumericYAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcNumericXAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcTimeXAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcCategoryXAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcCategoryYAxisComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { SampleCategoryData } from './SampleCategoryData';
import { SampleFinancialData } from './SampleFinancialData';
import { SampleScatterData } from './SampleScatterData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcColumnSeriesModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcBarSeriesModule,
    IgcFinancialPriceSeriesModule,
    IgcCategoryYAxisModule,
    IgcTimeXAxisModule
);


export class DataChartAxisTypes {






    private chart: IgcDataChartComponent;

    public categoryData: any[];
    public financialData: any[];
    public scatterData: any[];

    public numericXAxis: IgcNumericXAxisComponent;
    public numericYAxis: IgcNumericYAxisComponent;

    public categoryXAxis: IgcCategoryXAxisComponent;
    public categoryYAxis: IgcCategoryYAxisComponent;

    public timeXAxis: IgcTimeXAxisComponent;

    public columnSeries1: IgcColumnSeriesComponent;
    public columnSeries2: IgcColumnSeriesComponent;

    public barSeries1: IgcBarSeriesComponent;
    public barSeries2: IgcBarSeriesComponent;

    public scatterSeries1: IgcScatterSeriesComponent;
    public scatterSeries2: IgcScatterSeriesComponent;

    public financialSeries: IgcFinancialPriceSeriesComponent;

    constructor() {




        this.chart = document.getElementById('chart') as IgcDataChartComponent;

        this.initData();

        this.initAxes();
        this.initCategorySeries();
        this.initScatterSeries();
        this.initFinancialSeries();

        const axisSelect = document.getElementById('axisSelect') as HTMLSelectElement;
        axisSelect.addEventListener('change', this.onAxisTypeChange);

        this.chart.axes.add(this.categoryXAxis);
        this.chart.axes.add(this.numericYAxis);

        this.chart.series.add(this.columnSeries1);
        this.chart.series.add(this.columnSeries2);
    }

    public initCategorySeries() {
        this.columnSeries1 = new IgcColumnSeriesComponent();
        this.columnSeries1.name = 'colSeries1';
        this.columnSeries1.dataSource = this.categoryData;
        this.columnSeries1.xAxis = this.categoryXAxis;
        this.columnSeries1.yAxis = this.numericYAxis;
        this.columnSeries1.xAxisName = 'categoryXAxis';
        this.columnSeries1.yAxisName = 'numericYAxis';
        this.columnSeries1.valueMemberPath = 'USA';

        this.columnSeries2 = new IgcColumnSeriesComponent();
        this.columnSeries2.name = 'colSeries2';
        this.columnSeries2.dataSource = this.categoryData;
        this.columnSeries2.xAxis = this.categoryXAxis;
        this.columnSeries2.yAxis = this.numericYAxis;
        this.columnSeries2.xAxisName = 'categoryXAxis';
        this.columnSeries2.yAxisName = 'numericYAxis';
        this.columnSeries2.valueMemberPath = 'RUS';

        this.barSeries1 = new IgcBarSeriesComponent();
        this.barSeries1.name = 'barSeries1';
        this.barSeries1.dataSource = this.categoryData;
        this.barSeries1.xAxis = this.numericXAxis;
        this.barSeries1.yAxis = this.categoryYAxis;
        this.barSeries1.xAxisName = 'numericXAxis';
        this.barSeries1.yAxisName = 'categoryYAxis';
        this.barSeries1.valueMemberPath = 'USA';

        this.barSeries2 = new IgcBarSeriesComponent();
        this.barSeries2.name = 'barSeries2';
        this.barSeries2.dataSource = this.categoryData;
        this.barSeries2.xAxis = this.numericXAxis;
        this.barSeries2.yAxis = this.categoryYAxis;
        this.barSeries2.xAxisName = 'numericXAxis';
        this.barSeries2.yAxisName = 'categoryYAxis';
        this.barSeries2.valueMemberPath = 'RUS';
    }

    public initAxes() {
        this.categoryXAxis = new IgcCategoryXAxisComponent();
        this.categoryXAxis.name = 'categoryXAxis';
        this.categoryXAxis.title = 'Category X Axis';
        this.categoryXAxis.dataSource = this.categoryData;
        this.categoryXAxis.label = 'Year';

        this.categoryYAxis = new IgcCategoryYAxisComponent();
        this.categoryYAxis.name = 'categoryYAxis';
        this.categoryYAxis.title = 'Category Y Axis';
        this.categoryYAxis.dataSource = this.categoryData;
        this.categoryYAxis.label = 'Year';

        this.numericXAxis = new IgcNumericXAxisComponent();
        this.numericXAxis.name = 'numericXAxis';
        this.numericXAxis.title = 'Numeric X Axis';

        this.numericYAxis = new IgcNumericYAxisComponent();
        this.numericYAxis.name = 'numericYAxis'
        this.numericYAxis.title = 'Numeric Y Axis';

        this.timeXAxis = new IgcTimeXAxisComponent();
        this.timeXAxis.name = 'timeXAxis';
        this.timeXAxis.title = 'Time X Axis';
        this.timeXAxis.dataSource = this.financialData;
        this.timeXAxis.dateTimeMemberPath = 'Time';
        this.timeXAxis.label = 'Date';
    }

    public initFinancialSeries() {
        this.financialSeries = new IgcFinancialPriceSeriesComponent();
        this.financialSeries.name = 'financialSeries';
        this.financialSeries.dataSource = this.financialData;
        this.financialSeries.xAxis = this.timeXAxis;
        this.financialSeries.yAxis = this.numericYAxis;
        this.financialSeries.xAxisName = 'timeXAxis';
        this.financialSeries.yAxisName = 'numericYAxis';
        this.financialSeries.highMemberPath = 'High'
        this.financialSeries.lowMemberPath = 'Low'
        this.financialSeries.closeMemberPath = 'Close'
        this.financialSeries.openMemberPath = 'Open'
        this.financialSeries.volumeMemberPath = 'Volume'
    }

    public initScatterSeries() {
        this.scatterSeries1 = new IgcScatterSeriesComponent();
        this.scatterSeries1.name = 'scatterSeries';
        this.scatterSeries1.dataSource = this.scatterData;
        this.scatterSeries1.xAxis = this.numericXAxis;
        this.scatterSeries1.yAxis = this.numericYAxis;
        this.scatterSeries1.xAxisName = 'numericXAxis';
        this.scatterSeries1.yAxisName = 'numericYAxis';
        this.scatterSeries1.xMemberPath = 'Index';
        this.scatterSeries1.yMemberPath = 'SinValue';

        this.scatterSeries2 = new IgcScatterSeriesComponent();
        this.scatterSeries2.name = 'scatterSeries2';
        this.scatterSeries2.dataSource = this.scatterData;
        this.scatterSeries2.xAxis = this.numericXAxis;
        this.scatterSeries2.yAxis = this.numericYAxis;
        this.scatterSeries2.xAxisName = 'numericXAxis';
        this.scatterSeries2.yAxisName = 'numericYAxis';
        this.scatterSeries2.xMemberPath = 'Index';
        this.scatterSeries2.yMemberPath = 'CosValue';
    }

    public initData() {
        this.categoryData = SampleCategoryData.create();
        this.scatterData = SampleScatterData.createWaveData();
        this.financialData = SampleFinancialData.create();
    }

    public onAxisTypeChange = (e: any) => {
        this.chart.axes.clear();
        this.chart.series.clear();

        const value: string = e.target.value;

        if (value.includes('Column')) {
            this.chart.axes.add(this.categoryXAxis);
            this.chart.axes.add(this.numericYAxis);

            this.chart.series.add(this.columnSeries1);
            this.chart.series.add(this.columnSeries2);
        }
        else if (value.includes('Bar')) {
            this.chart.axes.add(this.categoryYAxis);
            this.chart.axes.add(this.numericXAxis);

            this.chart.series.add(this.barSeries1);
            this.chart.series.add(this.barSeries2);
        }
        else if (value.includes('Scatter')) {
            this.chart.axes.add(this.numericXAxis);
            this.chart.axes.add(this.numericYAxis);

            this.chart.series.add(this.scatterSeries1);
            this.chart.series.add(this.scatterSeries2);
        }
        else {
            this.chart.axes.add(this.timeXAxis);
            this.chart.axes.add(this.numericYAxis);

            this.chart.series.add(this.financialSeries);
        }
    }
}

let sample = new DataChartAxisTypes();