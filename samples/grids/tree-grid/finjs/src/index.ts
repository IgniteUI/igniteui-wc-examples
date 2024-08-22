import 'igniteui-webcomponents-grids/grids/combined';
import { IgcCellTemplateContext, IgcColumnComponent, IgcTreeGridComponent, IgcGridToolbarComponent, SortingDirection } from 'igniteui-webcomponents-grids/grids';
import { defineAllComponents, IgcButtonComponent, IgcDialogComponent, IgcIconComponent, IgcSliderComponent, IgcSwitchComponent, IgcToastComponent, registerIconFromText } from "igniteui-webcomponents";
import { IgcLegendModule, IgcCategoryChartModule, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { FinancialData } from './FinancialData';
import { html, nothing } from 'lit-html';
import "./index.css";
defineAllComponents();
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcCategoryChartModule
);

export class Sample {


    private grid1: IgcTreeGridComponent;
    private chart: IgcCategoryChartComponent;
    private _timer: ReturnType<typeof setInterval>;
    private data = FinancialData.generateData(1000);
    constructor() {
        const chart = this.chart = document.getElementById('chart1') as IgcCategoryChartComponent;
        var trendUp = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m123-240-43-43 292-291 167 167 241-241H653v-60h227v227h-59v-123L538-321 371-488 123-240Z"/></svg>`;
        var trendDown = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M653-240v-60h127L539-541 372-374 80-665l43-43 248 248 167-167 283 283v-123h59v227H653Z"/></svg>`;
        var chartIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M284-277h60v-275h-60v275Zm166 0h60v-406h-60v406Zm166 0h60v-148h-60v148ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z"/></svg>`;
        var stopIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M300-660v360-360Zm-60 420v-480h480v480H240Zm60-60h360v-360H300v360Z"/></svg>`;
        var updateIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M483-120q-75 0-141-28.5T226.5-226q-49.5-49-78-115T120-482q0-75 28.5-140t78-113.5Q276-784 342-812t141-28q80 0 151.5 35T758-709v-106h60v208H609v-60h105q-44-51-103.5-82T483-780q-125 0-214 85.5T180-485q0 127 88 216t215 89q125 0 211-88t86-213h60q0 150-104 255.5T483-120Zm122-197L451-469v-214h60v189l137 134-43 43Z"/></svg>`;
        registerIconFromText("trending_up", trendUp, "material");
        registerIconFromText("trending_down", trendDown, "material");
        registerIconFromText("insert_chart", chartIcon, "material");
        registerIconFromText("stop", stopIcon, "material");
        registerIconFromText("update", updateIcon, "material");
        var grid1 = this.grid1 = document.getElementById('grid1') as IgcTreeGridComponent;
        var price = document.getElementById('price') as IgcColumnComponent;
        var change = document.getElementById('change') as IgcColumnComponent;
        var changeP = document.getElementById('changeP') as IgcColumnComponent;
        var chartColumn = document.getElementById('chart') as IgcColumnComponent;
        grid1.data = this.data;
        price.bodyTemplate = this.priceTemplate;
        price.cellClasses = this.trends;
        changeP.cellClasses = this.trendsChange;
        change.cellClasses = this.trendsChange;
        chartColumn.bodyTemplate = this.chartBtnTemplate;

        this.openDialogForSelected = this.openDialogForSelected.bind(this);
        document.getElementById('chartButton').addEventListener("click", this.openDialogForSelected);
        this.startUpdate = this.startUpdate.bind(this);
        document.getElementById('startButton').addEventListener("click", this.startUpdate);
        this.stopUpdate = this.stopUpdate.bind(this);
        document.getElementById('stopButton').addEventListener("click", this.stopUpdate);


        const sliderRecValueSpan = document.getElementById('slider-rec-value') as HTMLElement;
        const recordsSlider = document.getElementById('records') as IgcSliderComponent;
        recordsSlider.value = 1000;
        recordsSlider.addEventListener('igcInput', (ev: CustomEvent) => {
            sliderRecValueSpan.innerHTML = ev.detail;
            this.data = FinancialData.generateData(ev.detail);
            this.grid1.data = this.data;
        });


        const sliderFreqValueSpan = document.getElementById('slider-freq-value') as HTMLElement;
        const freqSlider = document.getElementById('frequency') as IgcSliderComponent;
        freqSlider.value = 500;
        freqSlider.addEventListener('igcInput', (ev: CustomEvent) => {
            sliderFreqValueSpan.innerHTML = ev.detail;
        });

        const toolbar = document.getElementById('toolbar') as IgcGridToolbarComponent;
        const toolbarSwitch = document.getElementById('toolbarSwitch') as IgcSwitchComponent;
        toolbarSwitch.addEventListener('igcChange', (ev: CustomEvent) => {
            toolbar.hidden = !ev.detail;
        });
    }

    public startUpdate() {
        const frequency = (document.getElementById('frequency') as IgcSliderComponent).value;
        this._timer = setInterval(() => {
            this.grid1.data = FinancialData.updateAllPrices(this.data);
        }, frequency);
        (document.getElementById('startButton') as IgcButtonComponent).disabled = true;
        (document.getElementById('stopButton') as IgcButtonComponent).disabled = false;
        (document.getElementById('chartButton') as IgcButtonComponent).disabled = true;
    }

    public stopUpdate() {
        clearInterval(this._timer);
        (document.getElementById('startButton') as IgcButtonComponent).disabled = false;
        (document.getElementById('chartButton') as IgcButtonComponent).disabled = false;
        (document.getElementById('stopButton') as IgcButtonComponent).disabled = true;
    }

    public chartBtnTemplate = (ctx: IgcCellTemplateContext) => {
        const cell = ctx.cell;
        const rowData = this.grid1.getRowData(cell.id.rowID);
        return html`
        <igc-icon-button class="size-small" name="insert_chart" @click=${(e: any) => this.openDialogForRow(e, rowData)} collection="material" variant="contained"></igc-icon-button>
        `;
    };

    public openDialogForSelected() {
        const chart = document.getElementById('chart1') as IgcCategoryChartComponent;
        const chartData = this.grid1.selectedRows.map(x => this.grid1.getRowData(x));
        if (chartData && chartData.length > 0) {
            chart.dataSource = chartData;
            chart.includedProperties = ['price', 'country'];
            this.setLabelIntervalAndAngle();
            this.setChartConfig('Countries', 'Prices (USD)', 'Data Chart with prices by Category and Country');
            const chartDialog = document.getElementById('dialog') as IgcDialogComponent;
            chartDialog.show();
        } else {
            const toast = document.getElementById('toast') as IgcToastComponent;
            toast.show();
        }
    }

    public setChartConfig(xAsis: string, yAxis: string, title: string): void {
        // update label interval and angle based on data
        this.setLabelIntervalAndAngle();
        this.chart.xAxisTitle = xAsis;
        this.chart.yAxisTitle = yAxis;
        this.chart.chartTitle = title;
    }

    public setLabelIntervalAndAngle(): void {
        const intervalSet = this.chart.dataSource.length;
        if (intervalSet < 10) {
            this.chart.xAxisLabelAngle = 0;
            this.chart.xAxisInterval = 1;
        } else if (intervalSet < 15) {
            this.chart.xAxisLabelAngle = 30;
            this.chart.xAxisInterval = 1;
        } else if (intervalSet < 40) {
            this.chart.xAxisLabelAngle = 90;
            this.chart.xAxisInterval = 1;
        } else if (intervalSet < 100) {
            this.chart.xAxisLabelAngle = 90;
            this.chart.xAxisInterval = 3;
        } else if (intervalSet < 200) {
            this.chart.xAxisLabelAngle = 90;
            this.chart.xAxisInterval = 5;
        } else if (intervalSet < 400) {
            this.chart.xAxisLabelAngle = 90;
            this.chart.xAxisInterval = 7;
        } else if (intervalSet > 400) {
            this.chart.xAxisLabelAngle = 90;
            this.chart.xAxisInterval = 10;
        }
        this.chart.yAxisAbbreviateLargeNumbers = true;
    }


    public openDialogForRow(e: any, rowData: any) {
        const chart = document.getElementById('chart1') as IgcCategoryChartComponent;
        const chartData = this.grid1.data.filter(item => item.region === rowData.region &&
            item.category === rowData.category);
        chart.chartTitle = 'Data Chart with prices of ' + rowData.category + ' in ' + rowData.region + ' Region';

        chart.dataSource = chartData;
        chart.includedProperties = ['price', 'country'];
        this.setLabelIntervalAndAngle();
        this.setChartConfig('Countries', 'Prices (USD)', 'Data Chart with prices of ' + rowData.category + ' in ' + rowData.region + ' Region');
        const chartDialog = document.getElementById('dialog') as IgcDialogComponent;
        chartDialog.show();
    }


    public priceTemplate = (ctx: IgcCellTemplateContext) => {
        const cell = ctx.cell;
        const rowData = this.grid1.getRowData(cell.id.rowID);
        const icon = this.trends.positive(rowData) ? "trending_up" : "trending_down";
        const value = cell.value.toFixed(4);
        return html`
        <div class="finjs-icons">
        <span>$${value}</span>
        <igc-icon name="${icon}" collection="material"></igc-icon>
        </div>
        `;
    }

    private negative = (rowData: any): boolean => rowData['changeP'] < 0;
    private positive = (rowData: any): boolean => rowData['changeP'] > 0;
    private changeNegative = (rowData: any): boolean => rowData['changeP'] < 0 && rowData['changeP'] > -1;
    private changePositive = (rowData: any): boolean => rowData['changeP'] > 0 && rowData['changeP'] < 1;
    private strongPositive = (rowData: any): boolean => rowData['changeP'] >= 1;
    private strongNegative = (rowData: any): boolean => rowData['changeP'] <= -1;
    public trends = {
        changeNeg: this.changeNegative,
        changePos: this.changePositive,
        negative: this.negative,
        positive: this.positive,
        strongNegative: this.strongNegative,
        strongPositive: this.strongPositive
    };

    public trendsChange = {
        changeNeg2: this.changeNegative,
        changePos2: this.changePositive,
        strongNegative2: this.strongNegative,
        strongPositive2: this.strongPositive
    };

}

new Sample();
