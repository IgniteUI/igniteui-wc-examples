import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicScatterAreaSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { ColorScaleInterpolationMode } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcCustomPaletteColorScaleComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

export class MapTriangulatingData {

    private geoMap: IgcGeographicMapComponent;

    constructor() {

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;

        const brushes = [
            "green",
            "yellow",
            "orange",
            "red"
        ];

        let colorScale: IgcCustomPaletteColorScaleComponent = new IgcCustomPaletteColorScaleComponent();
        colorScale.palette = brushes;
        colorScale.minimumValue = 0.15;
        colorScale.interpolationMode = ColorScaleInterpolationMode.InterpolateRGB;

        let geoSeries: IgcGeographicScatterAreaSeriesComponent = new IgcGeographicScatterAreaSeriesComponent();
        geoSeries.colorScale = colorScale;
        geoSeries.opacity = 0.75;
        geoSeries.triangulationDataSource = "https://static.infragistics.com/xplatform/shapes/weather/nws_precip_2011091820.itf";

        this.geoMap.series.add(geoSeries);

        const geoBounds = {
            left: -115,
            top: 25,
            width: 40,
            height: 20
        };

        this.geoMap.zoomToGeographic(geoBounds);
    }
}

new MapTriangulatingData();
