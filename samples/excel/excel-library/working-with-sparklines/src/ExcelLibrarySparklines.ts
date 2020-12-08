import { ExcelUtility } from './ExcelUtility';
import { IgcExcelModule } from 'igniteui-webcomponents-excel';
// import { IgcExcelXlsxModule } from 'igniteui-webcomponents-excel';
// import { IgcExcelCoreModule } from 'igniteui-webcomponents-excel';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { SparklineType, WorkbookFormat } from 'igniteui-webcomponents-excel';
import { Workbook } from 'igniteui-webcomponents-excel';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcTemplateColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellUpdatingEventArgs } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellInfo } from 'igniteui-webcomponents-grids';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcCategoryXAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcNumericYAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { Visibility } from 'igniteui-webcomponents-core';
// import { IgcAxisComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    // IgcExcelXlsxModule,
    // IgcExcelCoreModule,
    IgcExcelModule,
    IgcDataGridModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule
);

export class ExcelLibrarySparklines {

    public data: any[] = [];

    constructor() {

        this.initData();

        const grid = document.getElementById('grid') as IgcDataGridComponent;
        grid.dataSource = this.data;

        const exportBtn = document.getElementById('exportBtn');
        exportBtn!.addEventListener('click', this.exportGrid);

        const templateColumn = document.getElementById('templateColumn') as IgcTemplateColumnComponent;
        templateColumn.cellUpdating = this.onOrdersCellUpdating;
    }

    public onOrdersCellUpdating(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        const info = e.cellInfo as IgcTemplateCellInfo;
        let chart: IgcDataChartComponent | null = null;

        if (content.childElementCount === 0) {
            chart = new IgcDataChartComponent();
            chart.height = '40px';
            chart.width = '200px';

            const xAxis = new IgcCategoryXAxisComponent();
            xAxis.name = 'xAxis';
            xAxis.labelVisibility = Visibility.Collapsed;

            const yAxis = new IgcNumericYAxisComponent();
            yAxis.name = 'yAxis';
            yAxis.minimumValue = 0;
            yAxis.labelVisibility = Visibility.Collapsed;

            chart.axes.add(xAxis);
            chart.axes.add(yAxis);

            const series = new IgcColumnSeriesComponent();
            series.name = 'series';
            series.xAxis = xAxis;
            series.yAxis = yAxis;
            series.valueMemberPath = 'Freight';

            chart.series.add(series);

            content.appendChild(chart);
        }
        else {
            chart = content.children[0] as IgcDataChartComponent;
        }

        if (chart) {
            chart.dataSource = info.rowItem.Orders;
        }
    }

    public exportGrid = (e: any) => {
        const headers = ['Orders', 'Company Name', 'Contact Name', 'Contact Title', 'Country'];
        const keys = ['Orders', 'CompanyName', 'ContactName', 'ContactTitle', 'Country'];
        const orderHeaders = ['Customer ID', 'Order ID', 'Freight'];

        const wb = new Workbook(WorkbookFormat.Excel2007);
        const exportSheet = wb.worksheets().add('Sheet1');
        const ordersSheet = wb.worksheets().add('Orders');

        exportSheet.defaultColumnWidth = 300 * 20;
        exportSheet.defaultRowHeight = 50 * 20;

        for (let i = 0; i < headers.length; i++) {
            exportSheet.rows(0).cells(i).value = headers[i];
        }

        for (let i = 0; i < this.data.length; i++) {
            const item = this.data[i];
            const orders = item.Orders;

            for (let j = 0; j < orders.length; j++) {
                ordersSheet.rows(i).cells(j).value = orders[j].Freight;
            }
        }

        for (let i = 0; i < this.data.length; i++) {

            const index = (i + 1).toString();
            const dataItem = this.data[i];

            for (let j = 0; j < headers.length; j++) {
                if (j === 0) {
                    exportSheet.sparklineGroups().add(SparklineType.Column, 'A' + (i + 2).toString(), 'Orders!A' + index + ':F' + index);
                }
                else {
                    exportSheet.rows(i + 1).cells(j).value = dataItem[keys[j]];
                }
            }
        }

        ExcelUtility.save(wb, 'myWorksheet');
    }

    public initData() {
        const companies = ['Amazon', 'Ford', 'Jaguar', 'Tesla', 'IBM', 'Microsoft'];
        const firstNames = ['Andrew', 'Mike', 'Martin', 'Ann', 'Victoria', 'John', 'Brian', 'Jason', 'David'];
        const lastNames = ['Smith', 'Jordan', 'Johnson', 'Anderson', 'Louis', 'Phillips', 'Williams', 'Novak'];
        const cities = ['London', 'Paris', 'Boston', 'Berlin'];
        const countries = ['UK', 'France', 'USA', 'Germany'];
        const titles = ['Sales Rep.', 'Owner', 'Administrator', 'Manager'];
        const streets = ['Main St', 'Madison St', 'Broad Way'];
        const shippings = ['Federal Ex', 'UPS Air', 'UPS Ground'];

        const data = new Array<any>();
        // generating excel data source
        for (let i = 0; i < 10; i++) {
            const companyName = this.getItem(companies);
            const contactTitle = this.getItem(titles);
            const country = this.getItem(countries);
            const city = this.getItem(cities);
            const shipping = this.getItem(shippings);
            const contactName = this.getItem(firstNames) + ' ' + this.getItem(lastNames);
            const employeeName = this.getItem(firstNames) + ' ' + this.getItem(lastNames);
            const address = this.getRandom(10, 60) + ' ' + this.getItem(streets);
            const postalCode = this.getRandom(100, 400) + ' ' + this.getRandom(50, 90);
            const customerID = 'CID-' + this.getRandom(500, 900);
            const phone = this.getRandom(500, 900) + '-' + this.getRandom(200, 900) + '-' + this.getRandom(2000, 9000);
            const fax = this.getRandom(500, 900) + '-' + this.getRandom(200, 900) + '-' + this.getRandom(2000, 9000);

            const companyOrders = new Array<any>();
            for (let o = 0; o < 6; o++) {
                const reqDate = '2020-06-' + this.getRandom(1, 25) + 'T' + this.getRandom(10, 12) + ':00:00';
                const shipDate = '2020-06-' + this.getRandom(1, 25) + 'T' + this.getRandom(10, 12) + ':00:00';
                const orderDate = '2020-05-' + this.getRandom(1, 25) + 'T' + this.getRandom(10, 12) + ':00:00';
                const order = {
                    ContactName: contactName,
                    CustomerID: customerID,
                    EmployeeID: this.getRandom(1000, 8000),
                    EmployeeName: employeeName,
                    Freight: this.getRandom(1, 10),
                    OrderDate: orderDate,
                    OrderID: this.getRandom(3000, 5000),
                    RequiredDate: reqDate,
                    ShipAddress: address,
                    ShipCity: city,
                    ShipCountry: country,
                    ShipName: companyName,
                    ShipPostalCode: postalCode,
                    ShipRegion: '',
                    ShipVia: this.getRandom(1, 10),
                    ShippedDate: shipDate,
                    ShipperID: this.getRandom(1, 10),
                    ShipperName: shipping,
                    TotalItems: this.getRandom(10, 20),
                    TotalPrice: this.getRandom(400, 600)
                };
                companyOrders.push(order);
            }
            const dataItem = {
                Address: address,
                City: city,
                CompanyName: companyName,
                ContactName: contactName,
                ContactTitle: contactTitle,
                Country: country,
                Fax: fax,
                ID: customerID,
                Orders: companyOrders,
                Phone: phone,
                PostalCode: postalCode,
                Region: ''
            };
            data.push(dataItem);
        }
        this.data = data;
    }

    public getRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public getItem(array: string[]): string {
        const i = this.getRandom(0, array.length - 1);
        return array[i];
    }
}

new ExcelLibrarySparklines();
