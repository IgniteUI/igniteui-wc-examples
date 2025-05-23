import './odatajs-4.0.0';
import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { ODataVirtualDataSource } from 'igniteui-webcomponents-datasources';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule
);

export class DataGridBindingRemoteData {

    private grid: IgcDataGridComponent;

    constructor() {

        this.grid = document.getElementById('grid') as IgcDataGridComponent;

        const vds = new ODataVirtualDataSource();
        vds.baseUri = 'https://services.odata.org/V4/Northwind/Northwind.svc';
        vds.entitySet = 'Orders';
        vds.pageSizeRequested = 200;

        this.grid.dataSource = vds;
    }

}

new DataGridBindingRemoteData();
