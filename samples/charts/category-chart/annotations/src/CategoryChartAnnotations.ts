

import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcMarkerTypeCollection } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';
import { CrosshairsDisplayMode } from 'igniteui-webcomponents-charts';

ModuleManager.register(IgcCategoryChartModule);


export class CategoryChartAnnotations {






    private chart: IgcCategoryChartComponent;
    public categoryProperties: string[] = ['month', 'temperature'];
    public categoryData: any[] = [];

    constructor() {

        this.onCrosshairsVisible = this.onCrosshairsVisible.bind(this);
        this.onCalloutsVisible = this.onCalloutsVisible.bind(this);
        this.onFinalValuesVisible = this.onFinalValuesVisible.bind(this);
        this.onMarkersVisible = this.onMarkersVisible.bind(this);



        this.initData();
        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.dataSource = this.categoryData;

        this.chart.includedProperties = this.categoryProperties;

        this.chart.xAxisFormatLabel = this.formatDateLabel;

        let checkbox1 = document.getElementById('checkbox1');
        checkbox1?.addEventListener('change', this.onCrosshairsVisible);

        let checkbox2 = document.getElementById('checkbox2');
        checkbox2?.addEventListener('change', this.onCalloutsVisible);

        let checkbox3 = document.getElementById('checkbox3');
        checkbox3?.addEventListener('change', this.onFinalValuesVisible);

        let checkbox4 = document.getElementById('checkbox4');
        checkbox4?.addEventListener('change', this.onMarkersVisible);
    }

    public onCrosshairsVisible = (e: any) => {
        const isVisible = e.target.checked;
        this.chart.crosshairsAnnotationEnabled = isVisible;

        if (isVisible) {
            this.chart.crosshairsDisplayMode = CrosshairsDisplayMode.Both;
        }
        else {
            this.chart.crosshairsDisplayMode = CrosshairsDisplayMode.None;
        }
    }

    public onCalloutsVisible = (e: any) => {

        let value = e.target.checked;
        this.chart.calloutsVisible = value;
    }
    public onFinalValuesVisible = (e: any) => {

        let value = e.target.checked;
        this.chart.finalValueAnnotationsVisible = value;

    }
    public onMarkersVisible = (e: any) => {
        const visible = e.target.checked;
        const markers = e.target.checked ? 'Circle' : 'None';

        switch (markers) {
            case 'Circle': {
                let collection: IgcMarkerTypeCollection = new IgcMarkerTypeCollection();
                collection.add(MarkerType.Circle);
                this.chart.markerTypes = collection;
                break;
            }
            case 'None': {
                let collection: IgcMarkerTypeCollection = new IgcMarkerTypeCollection();
                collection.add(MarkerType.None);
                this.chart.markerTypes = collection;
                break;
            }
        }

    }
    public formatDateLabel(item: any): string {
        const months = [
            'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
            'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
        ];
        return months[item.date.getMonth()];
    }

    public initData() {

        const year: number = new Date().getFullYear();
        this.categoryData = [
            { temperature: 74, date: new Date(year, 0, 1) },
            { temperature: 74, date: new Date(year, 1, 1) },
            { temperature: 76, date: new Date(year, 2, 1) },
            { temperature: 78, date: new Date(year, 3, 1) },
            { temperature: 83, date: new Date(year, 4, 1) },
            { temperature: 87, date: new Date(year, 5, 1) },
            { temperature: 94, date: new Date(year, 6, 1) },
            { temperature: 97, date: new Date(year, 7, 1) },
            { temperature: 93, date: new Date(year, 8, 1) },
            { temperature: 86, date: new Date(year, 9, 1) },
            { temperature: 81, date: new Date(year, 10, 1) },
            { temperature: 79, date: new Date(year, 11, 1) },
        ];

        let minVal: number = Number.MAX_VALUE;
        let maxVal: number = Number.MIN_VALUE;

        let minIndex: number = 0;
        let maxIndex: number = 0;
        let idx: number = 0;

        for (const item of this.categoryData) {

            if (minVal > item.temperature) {
                minVal = item.temperature;
                minIndex = idx;
            }
            if (maxVal < item.temperature) {
                maxVal = item.temperature;
                maxIndex = idx;
            }

            item.index = idx;
            item.value = item.temperature;

            const month = item.date.getMonth();
            if (month >= 11 || month < 3) {
                item.info = 'WINTER';
            }
            else if (month >= 3 && month < 5) {
                item.info = 'SPRING';
            }
            else if (month >= 5 && month < 8) {
                item.info = 'SUMMER';
            }
            else if (month >= 8 && month < 11) {
                item.info = 'FALL';
            }
            idx++;
        }

        this.categoryData[minIndex].info = 'MIN';
        this.categoryData[maxIndex].info = 'MAX';
    }
}

let sample = new CategoryChartAnnotations();