import { SampleBase } from "../../sample-base";
import { ExcelUtility } from '../../../utilities/ExcelUtility';

// import { IgcExcelXlsxModule } from 'igniteui-webcomponents-excel';
// import { IgcExcelCoreModule } from 'igniteui-webcomponents-excel';
import { IgcExcelModule } from 'igniteui-webcomponents-excel';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { Workbook } from 'igniteui-webcomponents-excel';
import { WorkbookFormat, WorksheetRegion } from 'igniteui-webcomponents-excel';
import { ChartType } from 'igniteui-webcomponents-excel';
import { AxisType } from 'igniteui-webcomponents-excel';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    // IgcExcelXlsxModule,
    // IgcExcelCoreModule,
    IgcExcelModule,
    IgcDataGridModule,
    IgcCategoryChartModule
);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <button class="option-item" id="export">Export</button>
    </div>
    <div style="height: calc(100% - 45px)">
        <igc-category-chart id="chart"
            height="50%" width="100%"
            y-axis-minimum-value="0"
            x-axis-tnterval="1"
            chart-type="column"
            brushes="#4f81bd, #c0504d, #9bbb59, #8064a2"
            outlines="#4f81bd, #c0504d, #9bbb59, #8064a2"
            thickness="0">
        </igc-category-chart>
        <igc-data-grid id="grid"
            height="50%"
            width="100%"
            auto-generate-columns="false">
            <igc-text-column property-path="Expense"></igc-text-column>
            <igc-numeric-column property-path="Jan"></igc-numeric-column>
            <igc-numeric-column property-path="Feb"></igc-numeric-column>
            <igc-numeric-column property-path="Mar"></igc-numeric-column>
            <igc-numeric-column property-path="Apr"></igc-numeric-column>
            <igc-numeric-column property-path="May"></igc-numeric-column>
            <igc-numeric-column property-path="Jun"></igc-numeric-column>
            <igc-numeric-column property-path="Jul"></igc-numeric-column>
            <igc-numeric-column property-path="Aug"></igc-numeric-column>
            <igc-numeric-column property-path="Sep"></igc-numeric-column>
            <igc-numeric-column property-path="Oct"></igc-numeric-column>
            <igc-numeric-column property-path="Nov"></igc-numeric-column>
            <igc-numeric-column property-path="Dec"></igc-numeric-column>
        </igc-data-grid>
    </div>
</div>
`;

export class ExcelLibraryCharts extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("ExcelLibraryCharts");
    public static register(): any {
        window.customElements.define(this.htmlTagName, ExcelLibraryCharts); return this;
    }

    public excelData: any[];
    public chartData: any[];

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.initData();

        const chart = document.getElementById("chart") as IgcCategoryChartComponent;
        chart.dataSource = this.chartData;

        const grid = document.getElementById("grid") as IgcDataGridComponent;
        grid.dataSource = this.excelData;

        const button = document.getElementById("export") as HTMLButtonElement;
        button.addEventListener("click", this.exportData);
    }

    public initData() {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const groups = ["Heating", "Electricity", "Water", "Taxes"];

        const expanseKey = "Expense";
        const monthKey = "Month";
        const data = new Array<any>();
        // generating excel data source
        for (const group of groups) {
            const r = {};
            r[expanseKey] = group;
            let index = 0;
            for (const month of months) {
                const x = index * 15 * Math.PI / 180;
                const rand = this.getRandom(50, 100);
                const heat = Math.abs(Math.cos(x)) * 300 + rand;
                const ac = Math.abs(Math.sin(x)) * 500 + rand;
                if (group === "Heating") {
                    r[month] = Math.round(heat);
                } else if (group === "Electricity") {
                    r[month] = Math.round(ac);
                } else if (group === "Water") {
                    r[month] = this.getRandom(100, 150);
                } else if (group === "Taxes") {
                    r[month] = this.getRandom(700, 800);
                }
                index = index + 1;
            }
            data.push(r);
        }
        this.excelData = data;
        // since we will export the data transposed (plotByRows will be true)
        // if we want to show the data that way in the ui then we need a transposed
        // version of the data for the category chart to bind to
        const chartData = new Array<any>();
        for (const month of months) {
            const r = {};
            r[monthKey] = month;
            for (const item of data) {
                r[item[expanseKey]] = item[month];
            }
            chartData.push(r);
        }
        this.chartData = chartData;
    }

    public getRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public exportData = (e: any) => {
        const headers = Object.keys(this.excelData[0]);
        headers.pop();

        const wb = new Workbook(WorkbookFormat.Excel2007);
        const ws = wb.worksheets().add("Sheet1");
        ws.defaultColumnWidth = 200 * 20;

        // reserving the [0] row where we will place the chart shape
        // the [1] will be the headers. so data will start on [2]
        const firstDataRow = 2;
        const headerRow = ws.rows(firstDataRow - 1);
        for (let c = 0; c < headers.length; c++) {
            headerRow.setCellValue(c, headers[c]);
        }

        for (let r = 0; r < this.excelData.length; r++) {
            const xlRow = ws.rows(r + firstDataRow);
            const dataRow = this.excelData[r];
            for (let c = 0; c < headers.length; c++) {
                xlRow.setCellValue(c, dataRow[headers[c]]);
            }
        }
        const indexRow = firstDataRow - 1;
        const indexData = firstDataRow + this.excelData.length - 1;
        const indexHeader = headers.length - 1;

        const tableRegion = new WorksheetRegion(ws, indexRow, 0, indexData, indexHeader);
        const table = ws.tables().add(tableRegion.toString(), true);

        // set some extra height for the row where the chart will be
        ws.rows(0).height = 5000;
        const chart = ws.shapes().addChart(ChartType.ColumnClustered,
            ws.rows(0).cells(0), { x: 0, y: 0 },
            ws.rows(0).cells(headers.length - 1), { x: 100, y: 100 });
        chart.setSourceData(table.wholeTableRegion.toString(), true);

        chart.axisCollection(AxisType.Category).axisBetweenCategories = true;

        ExcelUtility.save(wb, "chartSample");
    }
}
