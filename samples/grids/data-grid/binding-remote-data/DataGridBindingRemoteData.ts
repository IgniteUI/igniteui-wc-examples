import './odatajs-4.0.0';

import { SampleBase } from "../../sample-base";

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { ODataVirtualDataSource } from 'igniteui-webcomponents-datasources';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<igc-data-grid id="grid" width="100%" height="100%"
    auto-generate-columns="false"
    is-column-options-enabled="true">
    <igc-text-column property-path="OrderID" header-text="ID" width="*>90" horizontal-alignment="center">
    </igc-text-column>
    <igc-date-time-column property-path="OrderDate" header-text="Order Date" width="*>130">
    </igc-date-time-column>
    <igc-text-column property-path="ShipName" header-text="Name"  width="*>185">
    </igc-text-column>
    <igc-numeric-column property-path="Freight" header-text="Freight" width="*>115"
        positive-prefix="$" min-fraction-digits="2">
    </igc-numeric-column>
    <igc-date-time-column property-path="ShippedDate" header-text="Ship Date" width="*>125"
        horizontal-alignment="right">
    </igc-date-time-column>
    <igc-text-column property-path="ShipAddress" header-text="Shipping Address" width="*>250">
    </igc-text-column>
    <igc-text-column property-path="ShipCity" header-text="City" width="*>130">
    </igc-text-column>
    <igc-text-column property-path="ShipCountry" header-text="Country" width="*>110">
    </igc-text-column>
</igc-data-grid>
`;

export class DataGridBindingRemoteData extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridBindingRemoteData");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridBindingRemoteData); return this;
    }

    private grid: IgcDataGridComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;

        const vds = new ODataVirtualDataSource();
        vds.baseUri = "https://services.odata.org/V4/Northwind/Northwind.svc";
        vds.entitySet = "Orders";
        vds.pageSizeRequested = 200;

        this.grid.dataSource = vds;
    }

}