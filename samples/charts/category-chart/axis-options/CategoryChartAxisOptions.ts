import { SampleBase } from "../../sample-base";

import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcCategoryChartModule);

let templateHTML = `
<div class="sample-container">
    <igc-category-chart id="chart"
        width="100%"
        height="100%"
        chart-type="Line"
        marker-types="Circle"
        chart-title="Olympic Medals By Country"
        thickness="3"

        x-axis-label-text-style="10pt Verdana"
        x-axis-label-top-margin="5"
        x-axis-label-text-color="gray"
        x-axis-label-location="OutsideBottom"
        y-axis-label-text-style="10pt Verdana"
        y-axis-label-right-margin="5"
        y-axis-label-text-color="gray"
        y-axis-label-location="OutsideRight"
        y-axis-label-horizontal-alignment="left"

        x-axis-title="Olympic Games"
        x-axis-title-text-color="gray"
        x-axis-title-text-style="10pt Verdana"
        x-axis-title-angle="0"
        y-axis-title="Total Medals"
        y-axis-title-text-style="10pt Verdana"
        y-axis-title-text-color="gray"
        y-axis-title-angle="90"
        y-axis-title-left-margin="5"

        x-axis-tick-length="10"
        x-axis-tick-stroke-thickness="0.5"
        x-axis-tick-stroke="black"
        y-axis-tick-length="10"
        y-axis-tick-stroke-thickness="0.5"
        y-axis-tick-stroke="black"

        x-axis-major-stroke="gray"
        x-axis-major-stroke-thickness="0.5"
        y-axis-major-stroke="black"
        y-axis-major-stroke-thickness="1"
        y-axis-minor-interval="5"
        y-axis-minor-stroke="gray"
        y-axis-minor-stroke-thickness="0.5"
        x-axis-stroke="gray"
        x-axis-stroke-thickness="1"
        y-axis-stroke="gray"
        y-axis-stroke-thickness="1"

        y-axis-minimum-value="50"
        y-axis-maximum-value="150"
        x-axis-interval="1"
        y-axis-interval="25"
        x-axis-gap="0.125"
        x-axis-overlap="0" >
    </igc-category-chart>
</div>
`;

export class CategoryChartAxisOptions extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("CategoryChartAxisOptions");
    public static register(): any {
        window.customElements.define(this.htmlTagName, CategoryChartAxisOptions); return this;
    }

    private chart: IgcCategoryChartComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcCategoryChartComponent;
        this.chart.dataSource = this.getData();
    }

    public getData(): any[] {
        const usaMedals: any = [
            { Year: "1996", UnitedStates: 148 },
            { Year: "2000", UnitedStates: 142 },
            { Year: "2004", UnitedStates: 134 },
            { Year: "2008", UnitedStates: 131 },
            { Year: "2012", UnitedStates: 135 },
            { Year: "2016", UnitedStates: 146 },
        ];
        const chinaMedals: any = [
            { Year: "1996", China: 110 },
            { Year: "2000", China: 115 },
            { Year: "2004", China: 121 },
            { Year: "2008", China: 129 },
            { Year: "2012", China: 115 },
            { Year: "2016", China: 112 },
        ];
        const russiaMedals: any = [
            { Year: "1996", Russia: 95 },
            { Year: "2000", Russia: 91 },
            { Year: "2004", Russia: 86 },
            { Year: "2008", Russia: 65 },
            { Year: "2012", Russia: 77 },
            { Year: "2016", Russia: 88 },
        ];
        return [usaMedals, chinaMedals, russiaMedals];
    }
}