import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcRectChangedEventArgs } from 'igniteui-webcomponents-core'
import { IgcSeriesViewerComponent } from 'igniteui-webcomponents-charts'
import { ModuleManager } from 'igniteui-webcomponents-core';
import { MapUtils } from './MapUtils';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

export class MapNavigation {

    private geoMap: IgcGeographicMapComponent;

    constructor() {
        this.lblGeoTop = document.getElementById('lblGeoTop') as HTMLLabelElement;
        this.lblGeoLeft = document.getElementById('lblGeoLeft') as HTMLLabelElement;
        this.lblGeoHeight = document.getElementById('lblGeoHeight') as HTMLLabelElement;
        this.lblGeoWidth = document.getElementById('lblGeoWidth') as HTMLLabelElement;
        this.lblGeoLongitude = document.getElementById('lblGeoLongitude') as HTMLLabelElement;
        this.lblGeoLatitudes = document.getElementById('lblGeoLatitudes') as HTMLLabelElement;

        this.lblWindowTop = document.getElementById('lblWindowTop') as HTMLLabelElement;
        this.lblWindowLeft = document.getElementById('lblWindowLeft') as HTMLLabelElement;
        this.lblWindowHeight = document.getElementById('lblWindowHeight') as HTMLLabelElement;
        this.lblWindowWidth = document.getElementById('lblWindowWidth') as HTMLLabelElement;
        this.lblWindowScale = document.getElementById('lblWindowScale') as HTMLLabelElement;
        this.lblWindowPositionX = document.getElementById('lblWindowPositionX') as HTMLLabelElement;
        this.lblWindowPositionY = document.getElementById('lblWindowPositionY') as HTMLLabelElement;
        this.lblWindowHoverX = document.getElementById('lblWindowHoverX') as HTMLLabelElement;
        this.lblWindowHoverY = document.getElementById('lblWindowHoverY') as HTMLLabelElement;

        this.lblPixelX = document.getElementById('lblPixelX') as HTMLLabelElement;
        this.lblPixelY = document.getElementById('lblPixelY') as HTMLLabelElement;

        const selectMapRegion = document.getElementById("selectMapRegion") as HTMLSelectElement;
        selectMapRegion!.addEventListener("change", this.onMapRegionChanged );

        this.onMapWindowChanged = this.onMapWindowChanged.bind(this);
        this.onMapMouseMove = this.onMapMouseMove.bind(this);
        this.onMapRegionChanged = this.onMapRegionChanged.bind(this);

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.actualWindowRectChanged = this.onMapWindowChanged;
        this.geoMap.zoomable = true;
        this.geoMap.addEventListener('mousemove', this.onMapMouseMove, false);
        const usaRegion = { left: -134.5, top: 16.0, width: 70.0, height: 37.0 };
        this.geoMap.zoomToGeographic(usaRegion);
    }

    public onMapRegionChanged = (e: any) => {
        let name = e.target.value as String;
        const regions =  MapUtils.getRegions();
        for (const key in regions) {
            if (key === name && regions.hasOwnProperty(key)) {
                const region = regions[key];
                this.geoMap.zoomToGeographic(region);
                break;
            }
        }
    }

    public onMapWindowChanged(map: IgcSeriesViewerComponent, e: IgcRectChangedEventArgs) {
        // storing window location and size (values between 0.0 and 1.0)
        const windowRect = e.newRect;

        // converting window rect to geographic rect/region:
        const geoRect: any = this.geoMap.getGeographicFromZoom(windowRect);
        geoRect.bottom = geoRect.top  + geoRect.height;
        geoRect.right  = geoRect.left + geoRect.width;
        // calculating center of geographic region
        geoRect.latitude  = geoRect.top  + (geoRect.height / 2);
        geoRect.longitude = geoRect.left + (geoRect.width / 2);

        //console.log("onWindowRectChange " + windowRect.left.toString());
        this.lblGeoTop.innerText    = "T: " + MapUtils.toLat(geoRect.top);
        this.lblGeoLeft.innerText   = "L: " + MapUtils.toLng(geoRect.left);
        this.lblGeoHeight.innerText = "H: " + MapUtils.toLng(geoRect.height);
        this.lblGeoWidth.innerText  = "W: " + MapUtils.toLng(geoRect.width);

        this.lblWindowTop.innerText    = "T: " + windowRect.top.toFixed(4);
        this.lblWindowLeft.innerText   = "L: " + windowRect.left.toFixed(4);
        this.lblWindowHeight.innerText = "H: " + windowRect.height.toFixed(4);
        this.lblWindowWidth.innerText  = "W: " + windowRect.width.toFixed(4);
        this.lblWindowScale.innerText = this.geoMap.actualWindowScale.toFixed(4);
        this.lblWindowPositionX.innerText = windowRect.left.toFixed(4);
        this.lblWindowPositionY.innerText = windowRect.top.toFixed(4);
    }

    public onMapMouseMove(e: any) {
        const bounds = e.target.getBoundingClientRect();
        const relativeCoordinate = {
            x: e.clientX - bounds.left,
            y: e.clientY - bounds.top
        };

        this.lblPixelX.innerText = MapUtils.toPixel(relativeCoordinate.x);
        this.lblPixelY.innerText = MapUtils.toPixel(relativeCoordinate.y);

        // converting mouse pixel coordinate to geographic coordinate:
        const geoCoordinate: any = this.geoMap.getGeographicPoint(relativeCoordinate);
        this.lblGeoLongitude.innerText = MapUtils.toLng(geoCoordinate.x);
        this.lblGeoLatitudes.innerText = MapUtils.toLat(geoCoordinate.y);

        // converting mouse pixel coordinate to window coordinate:
        const windowCoordinateX = (e.clientX - bounds.left) / bounds.width;
        const windowCoordinateY = (e.clientY - bounds.top) / bounds.height;
        this.lblWindowHoverX.innerText = windowCoordinateX.toFixed(4);
        this.lblWindowHoverY.innerText = windowCoordinateY.toFixed(4);
    }

    private lblGeoTop: HTMLLabelElement;
    private lblGeoLeft: HTMLLabelElement;
    private lblGeoHeight: HTMLLabelElement;
    private lblGeoWidth: HTMLLabelElement;
    private lblGeoLongitude: HTMLLabelElement;
    private lblGeoLatitudes: HTMLLabelElement;

    private lblWindowTop: HTMLLabelElement;
    private lblWindowLeft: HTMLLabelElement;
    private lblWindowHeight: HTMLLabelElement;
    private lblWindowWidth: HTMLLabelElement;
    private lblWindowScale: HTMLLabelElement;
    private lblWindowHoverX: HTMLLabelElement;
    private lblWindowHoverY: HTMLLabelElement;
    private lblWindowPositionX: HTMLLabelElement;
    private lblWindowPositionY: HTMLLabelElement;

    private lblPixelX: HTMLLabelElement;
    private lblPixelY: HTMLLabelElement;
}

new MapNavigation();
