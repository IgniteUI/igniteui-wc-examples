import { SampleBase } from "../../sample-base";
import { WorldLocations } from "../../../utilities/WorldLocations";

import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicProportionalSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcValueBrushScaleComponent } from 'igniteui-webcomponents-charts';
import { IgcSizeScaleComponent } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

let templateHTML = `
<div class="sample-container">
    <igc-geographic-map id="geoMap" width="100%" height="100%">

    </igc-geographic-map>
</div>
`;

export class MapTypeScatterBubbleSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("MapTypeScatterBubbleSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, MapTypeScatterBubbleSeries); return this;
    }

    private geoMap: IgcGeographicMapComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.geoMap = document.getElementById("geoMap") as IgcGeographicMapComponent;
        this.geoMap.windowRect = { left: 0.2, top: 0.1, width: 0.6, height: 0.6 };

        this.addSeriesWith(WorldLocations.getAll());
    }

    public addSeriesWith(locations: any[])
    {
        const sizeScale = new IgcSizeScaleComponent();
        sizeScale.minimumValue = 4;
        sizeScale.maximumValue = 60;

        const brushes = [
            "rgba(14, 194, 14, 0.4)",  // semi-transparent green
            "rgba(252, 170, 32, 0.4)", // semi-transparent orange
            "rgba(252, 32, 32, 0.4)",  // semi-transparent red
        ];

        const brushScale = new IgcValueBrushScaleComponent();
        brushScale.brushes = brushes;
        brushScale.minimumValue = 0;
        brushScale.maximumValue = 30;

        const symbolSeries = new IgcGeographicProportionalSymbolSeriesComponent ();
        symbolSeries.dataSource = locations;
        symbolSeries.markerType = MarkerType.Circle;
        symbolSeries.radiusScale = sizeScale;
        symbolSeries.fillScale = brushScale;
        symbolSeries.fillMemberPath = "pop";
        symbolSeries.radiusMemberPath = "pop";
        symbolSeries.latitudeMemberPath = "lat";
        symbolSeries.longitudeMemberPath = "lon";
        symbolSeries.markerOutline = "rgba(0,0,0,0.3)";
        //symbolSeries.tooltipTemplate = this.createTooltip;

        this.geoMap.series.add(symbolSeries);
    }
}