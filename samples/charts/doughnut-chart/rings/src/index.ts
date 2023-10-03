import { IgcLegendModule, IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcDoughnutChartComponent, IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { CalendarSeasonsItem, CalendarSeasons } from './CalendarSeasons';
import { CalendarMonthsItem, CalendarMonths } from './CalendarMonths';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcLegendModule,
    IgcDoughnutChartModule
);

export class Sample {

    private chart: IgcDoughnutChartComponent
    private series1: IgcRingSeriesComponent
    private series2: IgcRingSeriesComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDoughnutChartComponent;
        var series1 = this.series1 = document.getElementById('series1') as IgcRingSeriesComponent;
        var series2 = this.series2 = document.getElementById('series2') as IgcRingSeriesComponent;

        this._bind = () => {
            series1.dataSource = this.calendarSeasons;
            series2.dataSource = this.calendarMonths;
        }
        this._bind();

    }

    private _calendarSeasons: CalendarSeasons = null;
    public get calendarSeasons(): CalendarSeasons {
        if (this._calendarSeasons == null)
        {
            this._calendarSeasons = new CalendarSeasons();
        }
        return this._calendarSeasons;
    }

    private _calendarMonths: CalendarMonths = null;
    public get calendarMonths(): CalendarMonths {
        if (this._calendarMonths == null)
        {
            this._calendarMonths = new CalendarMonths();
        }
        return this._calendarMonths;
    }

}

new Sample();
