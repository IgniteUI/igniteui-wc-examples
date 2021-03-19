import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcCategoryChartModule);

export class CategoryChartMarkers {

    private chart: IgcCategoryChartComponent;
    public data: any[] = [];

    constructor() {

        this.onChartTypeChanged = this.onChartTypeChanged.bind(this);
        this.onMarkerTypeChanged = this.onMarkerTypeChanged.bind(this);
        this.initData();

        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.dataSource = this.data;

        let chartType1 = document.getElementById('chartType');
        chartType1!.addEventListener('change', this.onChartTypeChanged);

        let markersTypes1 = document.getElementById('markersTypes');
        markersTypes1!.addEventListener('change', this.onMarkerTypeChanged);
    }

    public onChartTypeChanged = (e: any) => {
        const chartMode = e.target.value.toString();
        this.chart.chartType = chartMode;
    }

    public onMarkerTypeChanged = (e: any) => {
        const markers = e.target.value.toString();
        this.chart.markerTypes = markers;
    }

    public initData() {
        const USA: any = [
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
            { Year: "2019", USA: 38 }
        ];
        const China: any = [
            { Year: "2009", China: 21 },
            { Year: "2010", China: 26 },
            { Year: "2011", China: 29 },
            { Year: "2012", China: 32 },
            { Year: "2013", China: 47 },
            { Year: "2014", China: 46 },
            { Year: "2015", China: 50 },
            { Year: "2016", China: 90 },
            { Year: "2017", China: 132 },
            { Year: "2018", China: 134 },
            { Year: "2019", China: 96 },
        ];
        const Europe: any = [
            { Year: "2009", Europe: 31 },
            { Year: "2010", Europe: 43 },
            { Year: "2011", Europe: 66 },
            { Year: "2012", Europe: 69 },
            { Year: "2013", Europe: 58 },
            { Year: "2014", Europe: 40 },
            { Year: "2015", Europe: 78 },
            { Year: "2016", Europe: 13 },
            { Year: "2017", Europe: 78 },
            { Year: "2018", Europe: 40 },
            { Year: "2019", Europe: 80 },
        ];
        this.data = [ Europe, China, USA ];
    }
}

new CategoryChartMarkers();
