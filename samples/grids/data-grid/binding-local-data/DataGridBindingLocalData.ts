import { SampleBase } from "../../sample-base";

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcImageColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcTextColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcNumericColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcDateTimeColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcColumnGroupDescription } from 'igniteui-webcomponents-grids';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<div class="sample-container">
    <igc-data-grid
    id="grid"
    height="100%"
    width="100%"
    auto-generate-columns="false"
    is-column-options-enabled="true">
        <igc-text-column property-path="ProductID" header-text="ID" width="*>95"></igc-text-column>
        <igc-text-column property-path="ProductName" header-text="Product" width="*>160"></igc-text-column>
        <igc-image-column property-path="CountryFlag" header-text="Country" width="*>120" contentOpacity="1"
                          padding-top="5" padding-bottom="5"></igc-image-column>
        <igc-numeric-column property-path="ProductPrice" header-text="Price" width="*>95" positive-prefix="$" show-grouping-separator="true" min-fraction-digits="2"></igc-numeric-column>
        <igc-numeric-column property-path="OrderItems" header-text="Orders" width="*>105"></igc-numeric-column>
        <igc-numeric-column property-path="OrderValue" header-text="Order Value" width="*>140" positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>
        <igc-date-time-column property-path="OrderDate" header-text="Order Date" width="*>135" dateTimeFormat="DateShort" ></igc-date-time-column>
        <igc-numeric-column property-path="Margin" header-text="Margin" width="*>115" positive-suffix="%"></igc-numeric-column>
        <igc-numeric-column property-path="Profit" header-text="Profit" width="*>105" positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>
        <igc-text-column property-path="Status" header-text="Status" width="*>100"></igc-text-column>
    </igc-data-grid>
</div>
`;

export class DataGridBindingLocalData extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridBindingLocalData");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridBindingLocalData); return this;
    }

    private grid: IgcDataGridComponent;
    private data: any[];

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.initData();
        this.grid.dataSource = this.data;

        const state = new IgcColumnGroupDescription();
        state.propertyPath = "Status";
        state.displayName = "Status";
        this.grid.groupDescriptions.add(state);
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

    // public getCountryFlag(country: string): string {
    //     return require('./flags/' + country + '.png');
    // }
}
