import './odatajs-4.0.0';
import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { MergedCellMode } from 'igniteui-webcomponents-data-grids';
import { IgcColumnSortDescription } from 'igniteui-webcomponents-data-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { ODataVirtualDataSource } from 'igniteui-webcomponents-datasources';
import { ListSortDirection } from 'igniteui-webcomponents-core';
import { HeaderClickAction } from 'igniteui-webcomponents-data-grids';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule
);

export class DataGridCellMerging {

    private grid: IgcDataGridComponent;

    constructor() {

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.dropDownValueChanged = this.dropDownValueChanged.bind(this);

        const vds = new ODataVirtualDataSource();
        vds.baseUri = 'https://services.odata.org/V4/Northwind/Northwind.svc';
        vds.entitySet = 'Orders';
        vds.pageSizeRequested = 200;

        this.grid.dataSource = vds;
        this.grid.mergedCellMode = MergedCellMode.Always;
        this.grid.headerClickAction = HeaderClickAction.SortByMultipleColumnsTriState;

        let dropDown = document.getElementById('selectionDropBox');
        dropDown!.addEventListener('change', this.dropDownValueChanged);

        let g = new IgcColumnSortDescription();
        g.field = 'ShipName';
        g.sortDirection = ListSortDirection.Ascending;
        this.grid.sortDescriptions.add(g);
    }

    dropDownValueChanged() {

        let dropDown = document.getElementById('selectionDropBox') as any;
        let grid = document.getElementById('grid') as IgcDataGridComponent;

        switch (dropDown.value) {
            case 'Always': {
                grid.mergedCellMode = MergedCellMode.Always;
                break;
            }
            case 'Never': {
                grid.mergedCellMode = MergedCellMode.Never;
                break;
            }
            case 'OnlyWhenSorted': {
                grid.mergedCellMode = MergedCellMode.OnlyWhenSorted;
                break;
            }
        }
    }

}

new DataGridCellMerging();
