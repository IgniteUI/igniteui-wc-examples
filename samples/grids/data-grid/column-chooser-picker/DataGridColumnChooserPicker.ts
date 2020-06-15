import { SampleBase } from "../../sample-base";
import "./DataGridStyles.css";

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { IgcColumnChooserModule } from 'igniteui-webcomponents-grids';
import { IgcColumnChooserComponent } from 'igniteui-webcomponents-grids';


ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcColumnChooserModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<div class="sample-container-horizontal">
 <div class="columnChooserContainer">
   <div class="columnsOrderOptionsContainer">
    <igc-column-chooser
        id="columnUI"
        height="100%"
        width="200px"
        title="Column Chooser"
        show-all-text="Show All"
        hide-all-text="Hide All">
    </igc-column-chooser>
   </div>
</div>
    <div class="gridContainer">
    <igc-data-grid
        id="grid"
        height="100%"
        width="100%"
        is-column-options-enabled="true"
        auto-generate-columns="false">
            <igc-text-column property-path="ProductID" header-text="Product ID" width="*>125" horizontal-alignment="center" is-hidden="true"></igc-text-column>
            <igc-image-column property-path="CountryFlag" header-text="Country" width="*>115" content-opacity="1" horizontal-alignment="center"
                              padding-top="5" padding-bottom="5"></igc-image-column>
            <igc-text-column property-path="ProductName" header-text="Product" is-hidden="true" width="*>160"></igc-text-column>
            <igc-numeric-column property-path="ProductPrice" header-text="Price" width="*>90" positive-prefix="$" show-grouping-separator="true" min-fraction-digits="2" is-hidden="true"></igc-numeric-column>
            <igc-numeric-column property-path="OrderItems" header-text="Orders" width="*>110"></igc-numeric-column>
            <igc-numeric-column property-path="OrderValue" header-text="Order Value" width="*>140" positive-prefix="$" show-grouping-separator="true" ></igc-numeric-column>
            <igc-date-time-column property-path="OrderDate" header-text="Order Date" width="*>135" horizontal-alignment="right" date-time-format="DateShort" ></igc-date-time-column>
            <igc-numeric-column property-path="Margin" header-text="Margin" width="*>110" positive-suffix="%" horizontal-alignment="center" is-hidden="true" ></igc-numeric-column>
            <igc-numeric-column property-path="Profit" header-text="Profit" width="*>90" positive-prefix="$" show-grouping-separator="true" is-hidden="true"></igc-numeric-column>
            <igc-text-column property-path="Status" header-text="Status" width="*>110" horizontal-alignment="center"></igc-text-column>
    </igc-data-grid>
    </div>
</div>
`;

export class DataGridColumnChooserPicker extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridColumnChooserPicker");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridColumnChooserPicker); return this;
    }

    private grid: IgcDataGridComponent;
    private columnChooser: IgcColumnChooserComponent;
    private data: any[];

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.columnChooser = document.getElementById("columnUI") as IgcColumnChooserComponent;
        this.initData();
        this.grid.dataSource = this.data;
        this.columnChooser.targetGrid = this.grid;
    }

    public initData() {

        const names: string[] = [
            "Intel CPU", "AMD CPU",
            "Intel Motherboard", "AMD Motherboard", "Nvidia Motherboard",
            "Nvidia GPU", "Gigabyte GPU", "Asus GPU", "AMD GPU", "MSI GPU",
            "Corsair Memory", "Patriot Memory", "Skill Memory",
            "Samsung HDD", "WD HDD", "Seagate HDD", "Intel HDD", "Asus HDD",
            "Samsung SSD", "WD SSD", "Seagate SSD", "Intel SSD", "Asus SSD",
            "Samsung Monitor", "Asus Monitor", "LG Monitor", "HP Monitor" ];

        const countries: string[] = ["USA", "UK", "France", "Canada", "Poland",
            "Denmark", "Croatia", "Australia", "Seychelles",
            "Sweden", "Germany", "Japan", "Ireland",
            "Barbados", "Jamaica", "Cuba", "Spain"];
        const status: string[] = [ "Packing", "Shipped", "Delivered"]
        const sales: any[] = [];

        for (let i = 0; i < 200; i++) {
            const price = this.getRandomNumber(10000, 90000) / 100;
            const items = this.getRandomNumber(4, 30);
            const value = Math.round(price * items);
            const margin = this.getRandomNumber(2, 5);
            const profit = Math.round((price * margin / 100) * items);
            const country = this.getRandomItem(countries);
            sales.push({
                Country: country,
                CountryFlag: this.getFlagImage(country),
                Margin: margin,
                OrderDate: this.getRandomDate(),
                OrderItems: items,
                OrderValue: value,
                ProductID: 1001 + i,
                ProductName: this.getRandomItem(names),
                ProductPrice: price,
                Profit: Math.round(profit),
                Status: this.getRandomItem(status),
            });
        }

        this.data = sales;
    }

    // gets path to image file with specified country name (without file extension)
    public getFlagImage(countryName: string): string {
        return "https://static.infragistics.com/xplatform/images/flags/" + countryName + ".png";
    }

    // gets path to image file with specified gender type  (without file extension)
    public getGenderImage(gender: string): string {
        return "https://static.infragistics.com/xplatform/images/genders/" + gender.toLowerCase() + ".png";
    }

    // gets path to image file with specified person ID (without file extension)
    public getPersonImage(personID: string): string {
        return "https://static.infragistics.com/xplatform/people/" + personID + ".png";
    }

    public getRandomDate(): Date {
        const today: Date = new Date();
        const year: number = today.getFullYear();
        const month: number = this.getRandomNumber(0, 8);
        const day: number = this.getRandomNumber(10, 27);
        return new Date(year, month, day);
    }

    public getRandomNumber(min: number, max: number): number {
        return Math.round(min + Math.random() * (max - min));
    }

    public getRandomItem(array: any[]): any {
        const index = Math.round(this.getRandomNumber(0, array.length - 1));
        return array[index];
    }

}
