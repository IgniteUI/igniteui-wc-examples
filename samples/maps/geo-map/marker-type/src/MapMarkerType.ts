
import { WorldLocations } from './WorldLocations';
import { IgcGeographicMapModule, IgcGeographicSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);


export class MapMarkerType {






    private geoMap: IgcGeographicMapComponent;
    private symbolSeries: IgcGeographicSymbolSeriesComponent;

    constructor() {

        this.onMarkerTypeSelected = this.onMarkerTypeSelected.bind(this);
        this.onMarkerBrushSelected = this.onMarkerBrushSelected.bind(this);
        this.onMarkerOutlineSelected = this.onMarkerOutlineSelected.bind(this);



        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.zoomable = true;

        this.symbolSeries = new IgcGeographicSymbolSeriesComponent();
        this.symbolSeries.dataSource = WorldLocations.getCapitals();
        this.symbolSeries.latitudeMemberPath = 'lat';
        this.symbolSeries.longitudeMemberPath = 'lon';
        this.symbolSeries.thickness = 1;
        this.symbolSeries.markerBrush = 'White';
        this.symbolSeries.markerOutline = 'DodgerBlue';
        this.geoMap.series.add(this.symbolSeries);

        let MarkerTypeSelect = document.getElementById('MarkerTypeSelect');
        MarkerTypeSelect!.addEventListener('change', this.onMarkerTypeSelected);

        let MarkerBrushSelect = document.getElementById('MarkerBrushSelect');
        MarkerBrushSelect!.addEventListener('change', this.onMarkerBrushSelected);

        let MarkerOutlineSelect = document.getElementById('MarkerOutlineSelect');
        MarkerOutlineSelect!.addEventListener('change', this.onMarkerOutlineSelected);

    }

    public onMarkerTypeSelected = (e: any) => {
        const markerTypeMode = e.target.value.toString();
        this.symbolSeries.markerType = markerTypeMode;
    }

    public onMarkerBrushSelected = (e: any) => {
        const markerBrushMode = e.target.value.toString();
        this.symbolSeries.markerBrush = markerBrushMode;
    }
    public onMarkerOutlineSelected = (e: any) => {
        const markerOutlineMode = e.target.value.toString();
        this.symbolSeries.markerOutline = markerOutlineMode;
    }

}



let sample = new MapMarkerType();