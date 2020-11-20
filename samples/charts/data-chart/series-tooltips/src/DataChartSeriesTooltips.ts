

import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcCategoryToolTipLayerModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { IgcItemToolTipLayerModule } from 'igniteui-webcomponents-charts';
import { IgcItemToolTipLayerComponent } from 'igniteui-webcomponents-charts';

import { html } from 'lit-html';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcColumnSeriesModule,
    IgcItemToolTipLayerModule,
    IgcCategoryToolTipLayerModule
);


export class DataChartSeriesTooltips {






    private chart: IgcDataChartComponent;
    public itemTooltipLayer: IgcItemToolTipLayerComponent;
    public categoryTooltipLayer: IgcCategoryToolTipLayerComponent;

    private seriesSolar: IgcColumnSeriesComponent;
    private seriesHydro: IgcColumnSeriesComponent;
    private seriesWind: IgcColumnSeriesComponent;

    constructor() {




        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        this.seriesSolar = document.getElementById('seriesSolar') as IgcColumnSeriesComponent;
        this.seriesHydro = document.getElementById('seriesHydro') as IgcColumnSeriesComponent;
        this.seriesWind  = document.getElementById('seriesWind')  as IgcColumnSeriesComponent;

        this.itemTooltipLayer = new IgcItemToolTipLayerComponent();
        this.categoryTooltipLayer = new IgcCategoryToolTipLayerComponent();

        const tooltipSelect = document.getElementById('tooltipSelect') as HTMLSelectElement;
        tooltipSelect.addEventListener('change', this.onToolTipTypeChanged);
    }

    public onToolTipTypeChanged = (e: any) => {
        switch (e.target.value) {
            case 'Default': {
                // this.seriesHydro.tooltipTemplate = null;
                // this.seriesSolar.tooltipTemplate = null;
                // this.seriesWind.tooltipTemplate  = null;

                this.chart.series.remove(this.itemTooltipLayer);
                this.chart.series.remove(this.categoryTooltipLayer);
                break;
            }
            case 'Item': {
                // this.seriesHydro.tooltipTemplate = null;
                // this.seriesSolar.tooltipTemplate = null;
                // this.seriesWind.tooltipTemplate  = null;

                this.chart.series.remove(this.categoryTooltipLayer);
                this.chart.series.add(this.itemTooltipLayer);
                break;
            }
            case 'Category': {
                // this.seriesHydro.tooltipTemplate = null;
                // this.seriesSolar.tooltipTemplate = null;
                // this.seriesWind.tooltipTemplate  = null;

                this.chart.series.remove(this.itemTooltipLayer);
                this.chart.series.add(this.categoryTooltipLayer);
                break;
            }
            case 'Custom': {
                this.chart.series.remove(this.itemTooltipLayer);
                this.chart.series.remove(this.categoryTooltipLayer);

                this.seriesHydro.tooltipTemplate = this.getCustomTooltipHydro;
                this.seriesSolar.tooltipTemplate = this.getCustomTooltipSolar;
                this.seriesWind.tooltipTemplate  = this.getCustomTooltipWind;
                break;
            }
        }
    }

    getCustomTooltipHydro(context: any) {
        let ratio = Math.round((context.item.Hydro / context.item.Total) * 100);
        return html`<div>
                <div style='color: black'> Country: ${context.item.Country}</div>
                <div style='color: ${context.series.actualBrush}'> Hydro: ${context.item.Hydro}</div>
                <div style='color: ${context.series.actualBrush}'> Ratio: ${ratio} %</div>`;
    }

    getCustomTooltipSolar(context: any) {
        let ratio = Math.round((context.item.Solar / context.item.Total) * 100);
        return html`<div>
                <div style='color: black'> Country: ${context.item.Country}</div>
                <div style='color: ${context.series.actualBrush}'> Solar: ${context.item.Solar}</div>
                <div style='color: ${context.series.actualBrush}'> Ratio: ${ratio} %</div>`;
    }

    getCustomTooltipWind(context: any) {
        let ratio = Math.round((context.item.Wind / context.item.Total) * 100);
        return html`<div>
                <div style='color: black'> Country: ${context.item.Country}</div>
                <div style='color: ${context.series.actualBrush}'> Wind: ${context.item.Wind}</div>
                <div style='color: ${context.series.actualBrush}'> Ratio: ${ratio} %</div>`;
    }

    getData(): any[] {
        const data: any[] = [
            { Country: 'Canada',    Solar: 250, Wind: 400, Hydro: 350 },
            { Country: 'China',     Solar: 950, Wind: 200, Hydro: 625 },
            { Country: 'Russia',    Solar: 150, Wind: 200, Hydro: 425 },
            { Country: 'Australia', Solar: 450, Wind: 100, Hydro: 350 },
            { Country: 'USA',       Solar: 800, Wind: 250, Hydro: 750 },
            { Country: 'France',    Solar: 350, Wind: 150, Hydro: 325 }
        ];

        for (const item of data) {
            item.Total = item.Solar + item.Wind + item.Hydro;
        }
        return data;
    }
}

let sample = new DataChartSeriesTooltips();