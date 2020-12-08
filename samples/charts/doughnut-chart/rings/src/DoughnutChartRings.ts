import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcDoughnutChartComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcSliceClickEventArgs } from 'igniteui-webcomponents-charts';
import { LabelsPosition } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDoughnutChartModule,
    IgcRingSeriesModule
);

export class DoughnutChartRings {

    private chart: IgcDoughnutChartComponent;
    public Months: any[] = [];
    public Seasons: any[] = [];

    constructor() {

        this.initData();

        let ringSeries1 = document.getElementById('ringSeries1') as IgcRingSeriesComponent;
        let ringSeries2 = document.getElementById('ringSeries2') as IgcRingSeriesComponent;

        // let ringSeries1 = new IgcRingSeriesComponent();
        // ringSeries1.labelMemberPath = 'Label';
        // ringSeries1.valueMemberPath = 'Value';
        // ringSeries1.labelsPosition = LabelsPosition.Center;
        // ringSeries1.othersCategoryThreshold = 0;
        // ringSeries1.radiusFactor = 1.0;
        // ringSeries1.outlines = ['white'];
        // ringSeries1.brushes = ['#3cbdc9', '#9fb328', '#f96232', '#8a58d6'];
        ringSeries1.dataSource = this.Seasons; // with 4 items

        // let ringSeries2 = new IgcRingSeriesComponent();
        // ringSeries2.labelMemberPath = 'Label';
        // ringSeries2.valueMemberPath = 'Value';
        // ringSeries2.labelsPosition = LabelsPosition.Center;
        // ringSeries2.othersCategoryThreshold = 0;
        // ringSeries2.radiusFactor = 1.0;
        // ringSeries2.outlines = ['white'];
        // ringSeries2.brushes = [
        //     '#3cbdc9', '#3cbdc9', '#3cbdc9',  // same colors for 3 months of winter
        //     '#9fb328', '#9fb328', '#9fb328',  // same colors for 3 months of spring
        //     '#f96232', '#f96232', '#f96232',  // same colors for 3 months of summer
        //     '#8a58d6', '#8a58d6', '#8a58d6']; // same colors for 3 months of fall

        ringSeries2.dataSource = this.Months; // with 12 items

        this.chart = document.getElementById('chart') as IgcDoughnutChartComponent;
        // this.chart.series.add(ringSeries1);
        // this.chart.series.add(ringSeries2);
        // this.chart.allowSliceSelection = true;
    }

    public initData() {

        this.Months = [
            { Value: 1, Label: 'December' },
            { Value: 1, Label: 'January' },
            { Value: 1, Label: 'February' },
            { Value: 1, Label: 'March' },
            { Value: 1, Label: 'April' },
            { Value: 1, Label: 'May' },
            { Value: 1, Label: 'June' },
            { Value: 1, Label: 'July' },
            { Value: 1, Label: 'August' },
            { Value: 1, Label: 'September' },
            { Value: 1, Label: 'October' },
            { Value: 1, Label: 'November' },
        ];
        this.Seasons = [
            { Value: 4, Label: 'Winter' },
            { Value: 4, Label: 'Spring' },
            { Value: 4, Label: 'Summer' },
            { Value: 4, Label: 'Fall' },
        ];
    }
}

new DoughnutChartRings();
