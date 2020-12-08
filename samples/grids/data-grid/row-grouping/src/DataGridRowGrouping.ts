import { DataGridSharedData } from './DataGridSharedData';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcColumnGroupDescription } from 'igniteui-webcomponents-grids';
import { DataSourceSectionHeaderDisplayMode } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

export class DataGridRowGrouping {

    private grid: IgcDataGridComponent;

    constructor() {

        this.onSectionHeaderDisplayModeChanging = this.onSectionHeaderDisplayModeChanging.bind(this);
        this.onGroupHeaderCollapsible = this.onGroupHeaderCollapsible.bind(this);

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees(50);

        this.grid.groupHeaderDisplayMode = DataSourceSectionHeaderDisplayMode.Split;
        this.grid.isGroupCollapsable = true;

        let displayModeSelector = document.getElementById('displayModeSelector') as any ;
        displayModeSelector!.addEventListener('change', this.onSectionHeaderDisplayModeChanging);

        let groupCollapsibleCheckbox = document.getElementById('groupCollapsibleCheckbox') as any ;
        groupCollapsibleCheckbox!.addEventListener('change', this.onGroupHeaderCollapsible);
        groupCollapsibleCheckbox.checked = true;

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

    public onGroupHeaderCollapsible = (e: any) => {
        const isCollapsible = e.target.checked;

        if (isCollapsible) {
            this.grid.isGroupCollapsable = true;
        }
        else {
            this.grid.isGroupCollapsable = false ;
        }
    }
}

new DataGridRowGrouping();
