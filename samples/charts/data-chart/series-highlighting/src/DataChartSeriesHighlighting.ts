import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryHighlightLayerModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryItemHighlightLayerModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcCategoryHighlightLayerComponent } from 'igniteui-webcomponents-charts';
import { IgcCategoryItemHighlightLayerComponent } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcColumnSeriesModule,
    IgcCategoryHighlightLayerModule,
    IgcCategoryItemHighlightLayerModule
);

export class DataChartSeriesHighlighting {

    private chart: IgcDataChartComponent;
    private series1: IgcColumnSeriesComponent;
    private series2: IgcColumnSeriesComponent;
    private series3: IgcColumnSeriesComponent;
    private series4: IgcColumnSeriesComponent;
    private series5: IgcColumnSeriesComponent;

    public categoryHighlightLayer: IgcCategoryHighlightLayerComponent;
    public itemHighlightLayer: IgcCategoryItemHighlightLayerComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        this.series1 = document.getElementById('series1') as IgcColumnSeriesComponent;
        this.series2 = document.getElementById('series2') as IgcColumnSeriesComponent;
        this.series3 = document.getElementById('series3') as IgcColumnSeriesComponent;
        this.series4 = document.getElementById('series4') as IgcColumnSeriesComponent;
        this.series5 = document.getElementById('series5') as IgcColumnSeriesComponent;

        this.categoryHighlightLayer = new IgcCategoryHighlightLayerComponent();
        this.itemHighlightLayer = new IgcCategoryItemHighlightLayerComponent();

        this.toggleSeriesHighlighting(true);
        this.toggleItemHighlighting(true);
        this.toggleCategoryHighlighting(false);

        const seriesInput = document.getElementById('seriesInput') as HTMLInputElement;
        seriesInput.checked = true;
        seriesInput!.addEventListener('change', this.onSeriesHighlightingChanged);

        const itemInput = document.getElementById('itemInput') as HTMLInputElement;
        itemInput.checked = true;
        itemInput!.addEventListener('change', this.onItemHighlightingChanged);

        const categoryInput = document.getElementById('categoryInput') as HTMLInputElement;
        categoryInput.checked = false;
        categoryInput!.addEventListener('change', this.onCategoryHighlightingChanged);
    }

    public onSeriesHighlightingChanged = (e: any) => {
        const isChecked: boolean = e.target.checked;
        this.toggleSeriesHighlighting(isChecked);
    }

    public onItemHighlightingChanged = (e: any) => {
        const isChecked: boolean = e.target.checked;
        this.toggleItemHighlighting(isChecked);
    }

    public onCategoryHighlightingChanged = (e: any) => {
        const isChecked: boolean = e.target.checked;
        this.toggleCategoryHighlighting(isChecked);
    }

    public toggleCategoryHighlighting(isChecked: boolean) {
        this.toggleSeries(this.categoryHighlightLayer, isChecked);
    }

    public toggleItemHighlighting(isChecked: boolean) {
        this.toggleSeries(this.itemHighlightLayer, isChecked);
    }

    public toggleSeriesHighlighting(isChecked: boolean) {
        this.series1.isHighlightingEnabled = isChecked;
        this.series2.isHighlightingEnabled = isChecked;
        this.series3.isHighlightingEnabled = isChecked;
        this.series4.isHighlightingEnabled = isChecked;
        this.series5.isHighlightingEnabled = isChecked;
    }

    public toggleSeries(series: IgcSeriesComponent, isChecked: boolean) {
        if (isChecked) {
            this.chart.series.add(series);
        }
        else {
            this.chart.series.remove(series);
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

let sample = new DataChartSeriesHighlighting();
