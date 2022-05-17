import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { DataGridSharedData } from './DataGridSharedData';
import { Localization } from 'igniteui-webcomponents-core';
import { CustomDataGridLocaleJa } from './Localization/CustomDataGridLocaleJa';
import { CustomCalendarLocaleJa } from './Localization/CustomCalendarLocaleJa';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule
);

export class DataGridLocalization {

    private grid: IgcDataGridComponent;

    constructor() {
        //enable localization for column options in the DataGrid
        Localization.register("DataGrid-en", new CustomDataGridLocaleJa());

        //enable localization for date-time column
        Localization.register("Calendar-en", new CustomCalendarLocaleJa());

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getSales();
    }
}

new DataGridLocalization();
