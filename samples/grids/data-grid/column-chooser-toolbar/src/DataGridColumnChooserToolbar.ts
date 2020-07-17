

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcTextColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcDataGridToolbarModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridToolbarComponent } from 'igniteui-webcomponents-grids';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcDataGridToolbarModule);
ModuleManager.register(IgcGridColumnOptionsModule);


export class DataGridColumnChooserToolbarUI {


    ('DataGridColumnChooserToolbarUI');
    
        

    private grid: IgcDataGridComponent;
    private toolbar: IgcDataGridToolbarComponent;
    private data: any[];

    constructor() {
        
    
        

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.toolbar = document.getElementById('toolbar') as IgcDataGridToolbarComponent;
        this.initData();
        this.grid.dataSource = this.data;
        this.toolbar.targetGrid = this.grid;
    }


    public initData() {

        const names: string[] = [
            'Intel CPU', 'AMD CPU',
            'Intel Motherboard', 'AMD Motherboard', 'Nvidia Motherboard',
            'Nvidia GPU', 'Gigabyte GPU', 'Asus GPU', 'AMD GPU', 'MSI GPU',
            'Corsair Memory', 'Patriot Memory', 'Skill Memory',
            'Samsung HDD', 'WD HDD', 'Seagate HDD', 'Intel HDD', 'Asus HDD',
            'Samsung SSD', 'WD SSD', 'Seagate SSD', 'Intel SSD', 'Asus SSD',
            'Samsung Monitor', 'Asus Monitor', 'LG Monitor', 'HP Monitor' ];

        const countries: string[] = ['USA', 'UK', 'France', 'Canada', 'Poland',
            'Denmark', 'Croatia', 'Australia', 'Seychelles',
            'Sweden', 'Germany', 'Japan', 'Ireland',
            'Barbados', 'Jamaica', 'Cuba', 'Spain'];
        const status: string[] = [ 'Packing', 'Shipped', 'Delivered']
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
        return 'https://static.infragistics.com/xplatform/images/flags/' + countryName + '.png';
    }

    // gets path to image file with specified gender type  (without file extension)
    public getGenderImage(gender: string): string {
        return 'https://static.infragistics.com/xplatform/images/genders/' + gender.toLowerCase() + '.png';
    }

    // gets path to image file with specified person ID (without file extension)
    public getPersonImage(personID: string): string {
        return 'https://static.infragistics.com/xplatform/people/' + personID + '.png';
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


let sample = new DataGridColumnChooserToolbar();