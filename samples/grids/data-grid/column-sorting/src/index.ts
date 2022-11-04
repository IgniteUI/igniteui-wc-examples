import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { DataGridSharedData } from './DataGridSharedData';
import { HeaderClickAction } from 'igniteui-webcomponents-grids';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule
);

export class DataGridColumnSorting {

    private grid: IgcDataGridComponent;

    constructor() {

        this.onHeaderClickActionValueChanged = this.onHeaderClickActionValueChanged.bind(this);

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getHouses();
        this.grid.headerClickAction = HeaderClickAction.SortByMultipleColumns;

        document.getElementById('headerClickActionDropDown')!.addEventListener('change', this.onHeaderClickActionValueChanged);
    }

    onHeaderClickActionValueChanged(e: any) {
        let value = e.target.value;

        switch (value) {
            case 'SortByMultipleColumns': {
                this.grid.headerClickAction = HeaderClickAction.SortByMultipleColumns;
                break;
            }
            case 'SortByMultipleColumnsTriState': {
                this.grid.headerClickAction = HeaderClickAction.SortByMultipleColumnsTriState;
                break;
            }
            case 'SortByOneColumnOnly': {
                this.grid.headerClickAction = HeaderClickAction.SortByOneColumnOnly;
                break;
            }
            case 'SortByOneColumnOnlyTriState': {
                this.grid.headerClickAction = HeaderClickAction.SortByOneColumnOnlyTriState;
                break;
            }
        }
    }
}

new DataGridColumnSorting();
