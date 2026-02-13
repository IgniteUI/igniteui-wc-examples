import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcMarkerTypeCollection } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';
import { CrosshairsDisplayMode } from 'igniteui-webcomponents-charts';

ModuleManager.register(IgcCategoryChartModule);

export class Sample {

    private chart: IgcCategoryChartComponent;
    public includedProperties: string[] = ["Year", "USA"];
    public data: any[] = [];

    constructor() {

        this.onCrosshairsVisible = this.onCrosshairsVisible.bind(this);
        this.onCalloutsVisible = this.onCalloutsVisible.bind(this);
        this.onFinalValuesVisible = this.onFinalValuesVisible.bind(this);
        this.onMarkersVisible = this.onMarkersVisible.bind(this);

        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.initData();
        this.chart.dataSource = this.data;

        this.chart.includedProperties = this.includedProperties;

        let checkbox1 = document.getElementById('checkbox1');
        checkbox1!.addEventListener('change', this.onCrosshairsVisible);

        let checkbox2 = document.getElementById('checkbox2');
        checkbox2!.addEventListener('change', this.onCalloutsVisible);

        let checkbox3 = document.getElementById('checkbox3');
        checkbox3!.addEventListener('change', this.onFinalValuesVisible);

        let checkbox4 = document.getElementById('checkbox4');
        checkbox4!.addEventListener('change', this.onMarkersVisible);
    }

    public initData() {
        this.data = [
            { Year: "2009", USA: 19 },
            { Year: "2010", USA: 24 },
            { Year: "2011", USA: 28 },
            { Year: "2012", USA: 26 },
            { Year: "2013", USA: 38 },
            { Year: "2014", USA: 31 },
            { Year: "2015", USA: 19 },
            { Year: "2016", USA: 52 },
            { Year: "2017", USA: 50 },
            { Year: "2018", USA: 34 },
            { Year: "2019", USA: 38 },
        ];

        let idx: number = 0;

        for (const item of this.data) {
            item.index = idx;
            item.value = item.USA;
            item.label = item.USA + " " + "TWh";
            idx++;
        }
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
}

export function initialize() {
  return new Sample();
}