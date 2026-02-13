import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartStackedModule } from 'igniteui-webcomponents-charts';
// import { IgcColumnFragmentModule } from 'igniteui-webcomponents-charts';
import { IgcStackedFragmentSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcStackedFragmentSeriesComponent } from 'igniteui-webcomponents-charts';
// stacked-value series modules:
import { IgcStackedAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcStackedAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcStackedBarSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcStackedBarSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcStackedColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcStackedColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcStackedLineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcStackedLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcStackedSplineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcStackedSplineSeriesComponent } from 'igniteui-webcomponents-charts';
// stacked-100% series modules:
import { IgcStacked100AreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcStacked100AreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcStacked100BarSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcStacked100BarSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcStacked100ColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcStacked100ColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcStacked100LineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcStacked100LineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcStacked100SplineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcStacked100SplineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcCategoryXAxisModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryXAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcCategoryYAxisModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryYAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcNumericYAxisModule } from 'igniteui-webcomponents-charts';
import { IgcNumericYAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcNumericXAxisModule } from 'igniteui-webcomponents-charts';
import { IgcNumericXAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartStackedModule,
    // IgcColumnFragmentModule,
    IgcLegendModule,
    IgcNumericYAxisModule,
    IgcNumericXAxisModule,
    IgcCategoryXAxisModule,
    IgcCategoryYAxisModule,
    IgcStackedFragmentSeriesModule,
    // stacked-value series modules:
    IgcStackedAreaSeriesModule,
    IgcStackedBarSeriesModule,
    IgcStackedColumnSeriesModule,
    IgcStackedLineSeriesModule,
    IgcStackedSplineSeriesModule,
    // stacked-100% series modules:
    IgcStacked100AreaSeriesModule,
    IgcStacked100BarSeriesModule,
    IgcStacked100ColumnSeriesModule,
    IgcStacked100LineSeriesModule,
    IgcStacked100SplineSeriesModule,
);

export class DataChartTypeStackedSeries {

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    public catXAxis: IgcCategoryXAxisComponent;
    public catYAxis: IgcCategoryYAxisComponent;

    public numXAxis: IgcNumericXAxisComponent;
    public numYAxis: IgcNumericYAxisComponent;

    constructor() {

        this.catXAxis = new IgcCategoryXAxisComponent();
        this.catXAxis.name = 'catXAxis';
        this.catXAxis.label = 'Country';

        this.catYAxis = new IgcCategoryYAxisComponent();
        this.catYAxis.name = 'catYAxis';
        this.catYAxis.label = 'Country';

        this.numXAxis = new IgcNumericXAxisComponent();
        this.numXAxis.name = 'numXAxis';
        this.numYAxis = new IgcNumericYAxisComponent();
        this.numYAxis.name = 'numYAxis';

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();
        this.setSeries('Stacked Column Series');

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;

        const seriesTypeSelect = document.getElementById('seriesTypeSelect') as HTMLSelectElement;
        seriesTypeSelect.value = 'Stacked Column Series';
        seriesTypeSelect!.addEventListener('change', this.onSeriesTypeChanged);
    }

    public getFragments(): IgcStackedFragmentSeriesComponent[] {
        let fragments: IgcStackedFragmentSeriesComponent[];

        fragments = [];

        const fragment1 = new IgcStackedFragmentSeriesComponent();
        fragment1.valueMemberPath = 'Coal';
        fragment1.title = 'Coal';

        const fragment2 = new IgcStackedFragmentSeriesComponent();
        fragment2.valueMemberPath = 'Hydro';
        fragment2.title = 'Hydro';

        const fragment3 = new IgcStackedFragmentSeriesComponent();
        fragment3.valueMemberPath = 'Nuclear';
        fragment3.title = 'Nuclear';

        const fragment4 = new IgcStackedFragmentSeriesComponent();
        fragment4.valueMemberPath = 'Gas';
        fragment4.title = 'Gas';

        const fragment5 = new IgcStackedFragmentSeriesComponent();
        fragment5.valueMemberPath = 'Oil';
        fragment5.title = 'Oil';

        fragments.push(fragment1);
        fragments.push(fragment2);
        fragments.push(fragment3);
        fragments.push(fragment4);
        fragments.push(fragment5);

        return fragments;
    }

    public onSeriesTypeChanged = (e: any) => {
        const selectedSeries = e.target.value.toString();
        this.chart.series.clear();
        this.setSeries(selectedSeries);
    }

    public setSeries(seriesType: string) {

        this.chart.axes.clear();
        this.chart.series.clear();

        const fragments = this.getFragments();

        if (seriesType === 'Stacked Column Series') {

            const stack = new IgcStackedColumnSeriesComponent();

            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            stack.yAxisName = 'numYAxis';
            stack.xAxisName = 'catXAxis';

            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);

            for (const frag of fragments) {
                stack.series.add(frag);
            }

            this.chart.series.add(stack);
        }
        else if (seriesType === 'Stacked 100 Column Series') {

            const stack = new IgcStacked100ColumnSeriesComponent();

            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            stack.yAxisName = 'numYAxis';
            stack.xAxisName = 'catXAxis';

            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);

            for (const frag of fragments) {
                stack.series.add(frag);
            }

            this.chart.series.add(stack);
        }
        else if (seriesType === 'Stacked Area Series') {
            const stack = new IgcStackedAreaSeriesComponent();

            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            stack.yAxisName = 'numYAxis';
            stack.xAxisName = 'catXAxis';

            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);

            for (const frag of fragments) {
                stack.series.add(frag);
            }

            this.chart.series.add(stack);
        }
        else if (seriesType === 'Stacked 100 Area Series') {
            const stack = new IgcStacked100AreaSeriesComponent();

            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            stack.yAxisName = 'numYAxis';
            stack.xAxisName = 'catXAxis';

            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);

            for (const frag of fragments) {
                stack.series.add(frag);
            }

            this.chart.series.add(stack);
        }
        else if (seriesType === 'Stacked Line Series') {
            const stack = new IgcStackedLineSeriesComponent();

            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            stack.yAxisName = 'numYAxis';
            stack.xAxisName = 'catXAxis';

            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);

            for (const frag of fragments) {
                stack.series.add(frag);
            }

            this.chart.series.add(stack);
        }
        else if (seriesType === 'Stacked 100 Line Series') {
            const stack = new IgcStacked100LineSeriesComponent();

            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            stack.yAxisName = 'numYAxis';
            stack.xAxisName = 'catXAxis';

            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);

            for (const frag of fragments) {
                stack.series.add(frag);
            }

            this.chart.series.add(stack);
        }
        else if (seriesType === 'Stacked Spline Series') {
            const stack = new IgcStackedSplineSeriesComponent();

            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            stack.yAxisName = 'numYAxis';
            stack.xAxisName = 'catXAxis';

            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);

            for (const frag of fragments) {
                stack.series.add(frag);
            }

            this.chart.series.add(stack);
        }
        else if (seriesType === 'Stacked 100 Spline Series') {
            const stack = new IgcStacked100SplineSeriesComponent();

            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            stack.yAxisName = 'numYAxis';
            stack.xAxisName = 'catXAxis';

            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);

            for (const frag of fragments) {
                stack.series.add(frag);
            }

            this.chart.series.add(stack);
        }
        else if (seriesType === 'Stacked Bar Series') {
            const stack = new IgcStackedBarSeriesComponent();

            stack.xAxis = this.numXAxis;
            stack.yAxis = this.catYAxis;
            stack.xAxisName = 'numXAxis';
            stack.yAxisName = 'catYAxis';

            this.chart.axes.add(this.numXAxis);
            this.chart.axes.add(this.catYAxis);

            for (const frag of fragments) {
                stack.series.add(frag);
            }

            this.chart.series.add(stack);
        }
        else if (seriesType === 'Stacked 100 Bar Series') {
            const stack = new IgcStacked100BarSeriesComponent();

            stack.xAxis = this.numXAxis;
            stack.yAxis = this.catYAxis;
            stack.xAxisName = 'numXAxis';
            stack.yAxisName = 'catYAxis';

            this.chart.axes.add(this.numXAxis);
            this.chart.axes.add(this.catYAxis);

            for (const frag of fragments) {
                stack.series.add(frag);
            }

            this.chart.series.add(stack);
        }
    }

    getData(): any[] {
        const data = [
            { Country: 'Canada', Coal: 400, Oil: 100, Gas: 175, Nuclear: 225, Hydro: 350 },
            { Country: 'China', Coal: 925, Oil: 200, Gas: 350, Nuclear: 400, Hydro: 625 },
            { Country: 'Russia', Coal: 550, Oil: 200, Gas: 250, Nuclear: 475, Hydro: 425 },
            { Country: 'Australia', Coal: 450, Oil: 100, Gas: 150, Nuclear: 175, Hydro: 350 },
            { Country: 'United States', Coal: 800, Oil: 250, Gas: 475, Nuclear: 575, Hydro: 750 },
            { Country: 'France', Coal: 375, Oil: 150, Gas: 350, Nuclear: 275, Hydro: 325 }
        ];

        return data;
    }
}

export function initialize() {
  return new DataChartTypeStackedSeries();
}