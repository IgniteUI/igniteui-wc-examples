import { DataGridSharedData } from './DataGridSharedData';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcTemplateColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellInfo } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellUpdatingEventArgs } from 'igniteui-webcomponents-grids';
import { IgcImageColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { SparklineDisplayType } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule,
    IgcSparklineModule
);

export class DataGridColumnTypes {

    private grid: IgcDataGridComponent;
    public data: any[];
    public cityList: any[];
    public cityLookup = new Map<string, any>();

    constructor() {

        this.onUpdatingAddressColumn = this.onUpdatingAddressColumn.bind(this);
        this.onUpdatingSalesColumn = this.onUpdatingSalesColumn.bind(this);
        this.onUpdatingProductivityColumn = this.onUpdatingProductivityColumn.bind(this);
		this.onCellValueChanging = this.onCellValueChanging.bind(this);

        const salesColumn = document.getElementById('salesColumn') as IgcTemplateColumnComponent;
        if (salesColumn)
            salesColumn.cellUpdating = this.onUpdatingSalesColumn;

        const addressColumn = document.getElementById('addressColumn') as IgcTemplateColumnComponent;
        if (addressColumn)
            addressColumn.cellUpdating = this.onUpdatingAddressColumn;

        const productivityColumn = document.getElementById('productivityColumn') as IgcTemplateColumnComponent;
        if (productivityColumn)
            productivityColumn.cellUpdating = this.onUpdatingProductivityColumn;

        this.data = DataGridSharedData.getEmployees();
        this.cityList = [];

         // iterate all employees and generate a list of cities
        this.data.forEach(employee => {
            if (!this.cityLookup.has(employee.City)) {
                this.cityLookup.set(employee.City, employee);
                this.cityList.push(employee);
            }
        });
        //bind list of cities to city column
        const cityComboColumn = document.getElementById('cityColumn') as IgcComboBoxColumnComponent;
        if (cityComboColumn)
            cityComboColumn.dataSource = this.cityList;
            cityComboColumn.textField = "City";
            cityComboColumn.valueField = ["City"];

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = this.data;
        this.grid.cellValueChanging = this.onCellValueChanging;
    }

    public onUpdatingAddressColumn(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        let span1: HTMLSpanElement | null = null;
        let span2: HTMLSpanElement | null = null;
        const info = e.cellInfo as IgcTemplateCellInfo;
        const item = info.rowItem;

        if (content.childElementCount === 0) {

            span1 = document.createElement('span');
            span2 = document.createElement('span');

            content.style.fontFamily = 'Verdana';
            content.style.fontSize = '13px';
            content.style.verticalAlign = 'center';
            content.style.lineHeight = 'normal';
            content.style.display = 'flex';
            content.style.flexDirection = 'column';
            content.style.justifyContent = 'center';
            content.style.height = '100%';
            content.style.width = '100%';

            content.appendChild(span1);
            content.appendChild(span2);
        }
        else {
            span1 = content.children[0] as HTMLSpanElement;
            span2 = content.children[1] as HTMLSpanElement;
        }

        if (span1 && span2) {
            span1.textContent = item.Street;
            span2.textContent = item.City + ', ' + item.Country;
        }
    }

    public onUpdatingSalesColumn(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        const info = e.cellInfo as IgcTemplateCellInfo;
        const sales = info.rowItem.Sales;
        let gaugeValue: HTMLSpanElement | null = null;
        let gaugeBar: HTMLDivElement | null = null;

        if (content.childElementCount === 0) {
            gaugeValue = document.createElement('span');
            gaugeValue.style.margin = '0px';
            gaugeValue.style.marginTop = '2px';
            gaugeValue.style.padding = '0px';
            gaugeValue.style.fontFamily = 'Verdana';
            gaugeValue.style.fontSize = '13px';
            gaugeValue.style.textAlign = 'center';

            gaugeBar = document.createElement('div');
            gaugeBar.style.background = '#7f7f7f';
            gaugeBar.style.padding = '0px';
            gaugeBar.style.margin = '0px';
            gaugeBar.style.height = '6px';
            gaugeBar.style.left = '0px';
            gaugeBar.style.top = '0px';
            gaugeBar.style.position = 'relative';

            const gauge = document.createElement('div');
            gauge.style.background = '#dddddd';
            gauge.style.padding = '0px';
            gauge.style.margin = '0px';
            gauge.style.height = '6px';
            gauge.style.marginTop = '8px';
            gauge.style.width = '100%';
            gauge.appendChild(gaugeBar);

            content.style.verticalAlign = 'center';
            content.style.lineHeight = 'normal';
            content.style.display = 'flex';
            content.style.flexDirection = 'column';
            content.style.justifyContent = 'center';
            content.style.height = '100%';
            content.style.width = 'calc(100% - 2rem)';
            content.style.marginRight = '1rem';
            content.style.marginLeft = '1rem';

            content.appendChild(gauge);
            content.appendChild(gaugeValue);
        } else {
            const gauge = content.children[0];
            gaugeBar = gauge.children[0] as HTMLDivElement;
            gaugeValue = content.children[1] as HTMLSpanElement;
        }

        // conditional formatting:
        if (sales < 400000) {
            gaugeValue.style.color = 'rgb(211, 17, 3)';
            gaugeBar.style.background = 'rgb(211, 17, 3)';
        }
        else if (sales < 650000) {
            gaugeValue.style.color = 'Orange';
            gaugeBar.style.background = 'Orange';
        }
        else {
            gaugeValue.style.color = 'rgb(21, 190, 6)';
            gaugeBar.style.background = 'rgb(21, 190, 6)';
        }
        let gaugeWidth = (sales / 990000) * 100;
        gaugeWidth = Math.min(100, gaugeWidth);
        gaugeBar.style.width = gaugeWidth + '%';

        gaugeValue.textContent = '$' + sales / 1000 + ',000';
    }

    public onUpdatingProductivityColumn(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        let chart: IgcSparklineComponent | null = null;
        let info = e.cellInfo as IgcTemplateCellInfo;

        if (content.childElementCount === 0) {
            chart = new IgcSparklineComponent();
            chart.valueMemberPath = 'Value';
            chart.labelMemberPath = 'Week';
            chart.displayType = SparklineDisplayType.Column;
            chart.lineThickness = 2;
            chart.brush = 'rgb(21, 190, 6)';
            chart.negativeBrush = 'rgb(211, 17, 3)';
            chart.width = '100%';
            chart.height = '100%';

            content.style.width = '100%';
            content.style.height = 'calc(100% - 10px)';
            content.style.margin = '0px';
            content.style.marginTop = '5px';
            content.appendChild(chart);
        }
        else {
            chart = content.children[0] as IgcSparklineComponent;
        }

        if (chart) {
            chart.dataSource = info.rowItem.Productivity;
        }
    }

    public onCellValueChanging(s: IgcDataGridComponent, e: IgcGridCellValueChangingEventArgs) {

        let row = e.cellInfo.rowItem;
        if (e.column.field === "City") {
            let employee = this.cityLookup.get(e.newValue);

            if (employee !== undefined) {
                row.City = employee.City;
                row.Country = employee.Country;
                row.Street = employee.Street;
                row.CountryFlag = employee.CountryFlag;
                row.Address = employee.Address;
                //required for pushing changes to the grid
                s.notifySetItem(e.cellInfo.dataRow, row, row);
            }

        }
    }
}

let sample = new DataGridColumnTypes();
