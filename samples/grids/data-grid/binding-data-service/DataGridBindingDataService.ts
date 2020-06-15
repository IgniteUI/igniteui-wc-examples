import { SampleBase } from "../../sample-base";

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { FinancialData} from "./FinancialData";

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<div class="sample-container">
    <igc-data-grid
    id="grid"
    height="100%"
    width="100%"
    auto-generate-columns="false"
    default-column-min-width="110">

        <igc-text-column width="120" property-path="Category" ></igc-text-column>
        <igc-text-column width="140" property-path="Type" ></igc-text-column>
        <igc-text-column width="120" property-path="Contract" ></igc-text-column>
        <igc-text-column width="135"  property-path="Settlement" ></igc-text-column>
        <igc-text-column width="130" property-path="Region" ></igc-text-column>
        <igc-text-column width="140" property-path="Country" ></igc-text-column>

        <igc-numeric-column width="120" property-path="Open Price" header-text="Open" show-grouping-separator="true" positive-prefix="$" min-fraction-digits="2" max-fraction-digits="2" ></igc-numeric-column>
        <igc-numeric-column width="120" property-path="Price" header-text="Close" show-grouping-separator="true" positive-prefix="$" min-fraction-digits="2" max-fraction-digits="2"></igc-numeric-column>
        <igc-numeric-column width="110" property-path="Change"  min-fraction-digits="2" max-fraction-digits="2"></igc-numeric-column>
        <igc-numeric-column width="135" property-path="Change(%)" negative-suffix="%" positive-suffix="%" min-fraction-digits="2" max-fraction-digits="2"></igc-numeric-column>
        <igc-numeric-column width="90"  property-path="Buy" show-grouping-separator="true" positive-prefix="$"  min-fraction-digits="2" max-fraction-digits="2"></igc-numeric-column>
        <igc-numeric-column width="90"  property-path="Sell" show-grouping-separator="true" positive-prefix="$" min-fraction-digits="2" max-fraction-digits="2"></igc-numeric-column>
        <igc-numeric-column width="110" property-path="Spread" show-grouping-separator="true"  min-fraction-digits="2" max-fraction-digits="2"></igc-numeric-column>
        <igc-numeric-column width="110" property-path="Volume" show-grouping-separator="true"  min-fraction-digits="0" max-fraction-digits="0"></igc-numeric-column>
        <igc-numeric-column width="110" property-path="High(D)" show-grouping-separator="true" min-fraction-digits="2" max-fraction-digits="2" positive-prefix="$"></igc-numeric-column>
        <igc-numeric-column width="110" property-path="Low(D)" show-grouping-separator="true" min-fraction-digits="2" max-fraction-digits="2" positive-prefix="$"></igc-numeric-column>
        <igc-numeric-column width="110" property-path="High(Y)" show-grouping-separator="true" min-fraction-digits="2" max-fraction-digits="2" positive-prefix="$"></igc-numeric-column>
        <igc-numeric-column width="110" property-path="Low(Y)" show-grouping-separator="true" min-fraction-digits="2" max-fraction-digits="2" positive-prefix="$"></igc-numeric-column>
        <igc-numeric-column width="110" property-path="Start(Y)" show-grouping-separator="true" min-fraction-digits="2" max-fraction-digits="2" positive-prefix="$"></igc-numeric-column>

        <igc-date-time-column width="120" property-path="Maturity" horizontalAlignment="right" ></igc-date-time-column>
        <igc-text-column width="125" property-path="Currency" ></igc-text-column>
        <igc-text-column width="90" property-path="Risk" ></igc-text-column>
        <igc-text-column width="110" property-path="Sector" ></igc-text-column>
        <igc-text-column width="110" property-path="Security" ></igc-text-column>
        <igc-text-column width="150" property-path="Issuer" ></igc-text-column>

    </igc-data-grid>
</div>
`;

export class DataGridBindingDataService extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridBindingDataService");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridBindingDataService); return this;
    }

    private grid: IgcDataGridComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = FinancialData.generateData(200);
    }
}
