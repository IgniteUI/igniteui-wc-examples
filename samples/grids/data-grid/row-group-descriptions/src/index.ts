import { DataGridSharedData } from './DataGridSharedData';
import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { IgcColumnGroupDescription } from 'igniteui-webcomponents-data-grids';
import { GroupHeaderDisplayMode } from 'igniteui-webcomponents-data-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcColumnGroupingModule } from 'igniteui-webcomponents-data-grids'

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule,
    IgcColumnGroupingModule
);

export class DataGridRowGrouping {

    private grid: IgcDataGridComponent;

    constructor() {

        this.onSectionHeaderDisplayModeChanging = this.onSectionHeaderDisplayModeChanging.bind(this);

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees(50);

        this.grid.groupHeaderDisplayMode = GroupHeaderDisplayMode.Split;
        this.grid.isGroupCollapsable = true;

        let displayModeSelector = document.getElementById('displayModeSelector') as any ;
        displayModeSelector!.addEventListener('change', this.onSectionHeaderDisplayModeChanging);

        const state = new IgcColumnGroupDescription();
        state.field = 'Country';
        state.displayName = 'Location';
        const city = new IgcColumnGroupDescription();
        city.field = 'City';
        city.displayName = '';
        const income = new IgcColumnGroupDescription();
        income.field = 'Income';
        income.displayName = 'Income';

        this.grid.groupDescriptions.add(state);
        this.grid.groupDescriptions.add(city);
        this.grid.groupDescriptions.add(income);
    }

    public onSectionHeaderDisplayModeChanging = (e: any) => {
        this.grid.groupHeaderDisplayMode = e.target.value;
    }
}

new DataGridRowGrouping();
