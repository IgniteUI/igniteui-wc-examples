
export class RouterMaps {

    private static samples = new Map<string, any>();

    public static async get(route: string): Promise<any>  {

        if (this.samples.has(route)) {
            console.log("SB cashed sample: " + route)
            return this.samples.get(route);
        }

        if (route.indexOf("/geo-map-overview") >= 0) {
            let sample = await import("./geo-map/MapOverview");
            this.samples.set(route, sample.MapOverview.register());

        } else if (route.indexOf("/geo-map-marker-type") >= 0) {
            let sample = await import("./geo-map/MapMarkerType");
            this.samples.set(route, sample.MapMarkerType.register());

        }
        else if (route.indexOf("/geo-map-marker-template") >= 0) {
            let sample = await import("./geo-map/MapMarkerTemplete");
            this.samples.set(route, sample.MapMarkerTemplate.register());

        }
        else if (route.indexOf("/geo-map-binding-data-csv") >= 0) {
            let sample = await import("./geo-map/MapBindingDataCSV");
            this.samples.set(route, sample.MapBindingDataCSV.register());

        } else if (route.indexOf("/geo-map-binding-data-json-points") >= 0) {
            let sample = await import("./geo-map/MapBindingDataJsonPoints");
            this.samples.set(route, sample.MapBindingDataJsonPoints.register());

        } else if (route.indexOf("/geo-map-binding-data-model") >= 0) {
            let sample = await import("./geo-map/MapBindingDataModel");
            this.samples.set(route, sample.MapBindingDataModel.register());

        } else if (route.indexOf("/geo-map-binding-multiple-shapes") >= 0) {
            let sample = await import("./geo-map/MapBindingMultipleShapes");
            this.samples.set(route, sample.MapBindingMultipleShapes.register());

        } else if (route.indexOf("/geo-map-binding-multiple-sources") >= 0) {
            let sample = await import("./geo-map/MapBindingMultipleSources");
            this.samples.set(route, sample.MapBindingMultipleSources.register());

        } else if (route.indexOf("/geo-map-binding-shp-points") >= 0) {
            let sample = await import("./geo-map/MapBindingShapefilePoints");
            this.samples.set(route, sample.MapBindingShapefilePoints.register());

        } else if (route.indexOf("/geo-map-binding-shp-polygons") >= 0) {
            let sample = await import("./geo-map/MapBindingShapefilePolygons");
            this.samples.set(route, sample.MapBindingShapefilePolygons.register());

        } else if (route.indexOf("/geo-map-binding-shp-polylines") >= 0) {
            let sample = await import("./geo-map/MapBindingShapefilePolylines");
            this.samples.set(route, sample.MapBindingShapefilePolylines.register());

        } else if (route.indexOf("/geo-map-display-bing-imagery") >= 0) {
            let sample = await import("./geo-map/MapDisplayImageryBingTiles");
            this.samples.set(route, sample.MapDisplayImageryBingTiles.register());

        } else if (route.indexOf("/geo-map-display-esri-imagery") >= 0) {
            let sample = await import("./geo-map/MapDisplayImageryEsriTiles");
            this.samples.set(route, sample.MapDisplayImageryEsriTiles.register());

        } else if (route.indexOf("/geo-map-display-heat-imagery") >= 0) {
            let sample = await import("./geo-map/MapDisplayImageryHeatTiles");
            this.samples.set(route, sample.MapDisplayImageryHeatTiles.register());

        } else if (route.indexOf("/geo-map-display-osm-imagery") >= 0) {
            let sample = await import("./geo-map/MapDisplayImageryOSM");
            this.samples.set(route, sample.MapDisplayImageryOSM.register());

        } else if (route.indexOf("/geo-map-custom-tooltips") >= 0) {
            let sample = await import("./geo-map/MapCustomTooltips");
            this.samples.set(route, sample.MapCustomTooltips.register());

        } else if (route.indexOf("/geo-map-navigation") >= 0) {
            let sample = await import("./geo-map/MapNavigation");
            this.samples.set(route, sample.MapNavigation.register());

        } else if (route.indexOf("/geo-map-synchronization") >= 0) {
            let sample = await import("./geo-map/MapSynchronization");
            this.samples.set(route, sample.MapSynchronization.register());

        // geo-map-types:
        }else if (route.indexOf("/geo-map-shape-styling") >= 0) {
            let sample = await import("./geo-map/MapShapeStyling");
            this.samples.set(route, sample.MapShapeStyling.register());

        } else if (route.indexOf("/geo-map-type-scatter-area-series") >= 0) {
            let sample = await import("./geo-map/MapTypeScatterAreaSeries");
            this.samples.set(route, sample.MapTypeScatterAreaSeries.register());

        } else if (route.indexOf("/geo-map-type-scatter-bubble-series") >= 0) {
            let sample = await import("./geo-map/MapTypeScatterBubbleSeries");
            this.samples.set(route, sample.MapTypeScatterBubbleSeries.register());

        } else if (route.indexOf("/geo-map-type-scatter-contour-series") >= 0) {
            let sample = await import("./geo-map/MapTypeScatterContourSeries");
            this.samples.set(route, sample.MapTypeScatterContourSeries.register());

        } else if (route.indexOf("/geo-map-type-scatter-density-series") >= 0) {
            let sample = await import("./geo-map/MapTypeScatterDensitySeries");
            this.samples.set(route, sample.MapTypeScatterDensitySeries.register());

        } else if (route.indexOf("/geo-map-type-scatter-symbol-series") >= 0) {
            let sample = await import("./geo-map/MapTypeScatterSymbolSeries");
            this.samples.set(route, sample.MapTypeScatterSymbolSeries.register());

        } else if (route.indexOf("/geo-map-type-shape-polygon-series") >= 0) {
            let sample = await import("./geo-map/MapTypeScatterPolygonSeries");
            this.samples.set(route, sample.MapTypeScatterPolygonSeries.register());

        } else if (route.indexOf("/geo-map-type-shape-polyline-series") >= 0) {
            let sample = await import("./geo-map/MapTypeScatterPolylineSeries");
            this.samples.set(route, sample.MapTypeScatterPolylineSeries.register());

        }
        if (this.samples.has(route)) {
            console.log("SB imported sample: " + route)
            return this.samples.get(route);
        } else {
            console.log("SB import missing for sample: " + route)
        }


    }

}