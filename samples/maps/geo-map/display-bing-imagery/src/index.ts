import {
    defineComponents,
    IgcDialogComponent,
    IgcButtonComponent,
    IgcInputComponent
} from "igniteui-webcomponents";

import {
    IgcGeographicMapModule,
    IgcGeographicMapComponent,
    IgcBingMapsMapImagery,
    BingMapsImageryStyle
} from "igniteui-webcomponents-maps";
import {
    IgcOpenStreetMapImagery
} from "igniteui-webcomponents-maps";
import { MapUtils, MapRegion } from "./MapUtils";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { ModuleManager } from "igniteui-webcomponents-core";

defineComponents(
    IgcDialogComponent,
    IgcButtonComponent,
    IgcInputComponent
);

ModuleManager.register(IgcGeographicMapModule);

export class MapDisplayImageryBingTiles {

    private map!: IgcGeographicMapComponent;
    private dialog!: IgcDialogComponent;
    private keyInput!: IgcInputComponent;

    private imagery!: IgcBingMapsMapImagery;
    private enterpriseKey = "";

    constructor() {

        // element refs
        this.map = document.getElementById("bingMap") as IgcGeographicMapComponent;
        this.dialog = document.getElementById("bingDialog") as IgcDialogComponent;
        this.keyInput = document.getElementById("bingKeyInput") as IgcInputComponent;

        const btnOpen = document.getElementById("enterKeyBtn") as IgcButtonComponent;
        const btnCancel = document.getElementById("cancelBtn") as IgcButtonComponent;
        const btnApply = document.getElementById("applyBtn") as IgcButtonComponent;

        // map setup
        this.imagery = new IgcBingMapsMapImagery();
        this.imagery.imageryStyle = BingMapsImageryStyle.AerialWithLabels;
        this.map.backgroundContent = this.imagery;

        // initial zoom
        MapUtils.navigateTo(this.map, MapRegion.Caribbean);

        // show dialog automatically on startup
        requestAnimationFrame(() => {
            this.dialog.open = true;
        });

        // manual open
        btnOpen.addEventListener("click", () => {
            this.dialog.open = true;
        });

        // cancel dialog
        btnCancel.addEventListener("click", () => {
            this.dialog.open = false;
        });

        // apply key
        btnApply.addEventListener("click", () => {
            const key = (this.keyInput.value || "").trim();
            if (key.length > 0) {
                this.enterpriseKey = key;
                this.applyKey();
            }
            this.dialog.open = false;
        });
    }

    private applyKey() {
        this.imagery.apiKey = this.enterpriseKey;

        // protocol correction like Angular/React
        const uri = this.imagery.actualBingImageryRestUri;

        if (location.protocol === "https:") {
            this.imagery.bingImageryRestUri = uri.replace("http:", "https:");
        } else {
            this.imagery.bingImageryRestUri = uri.replace("https:", "http:");
        }

        this.map.backgroundContent = this.imagery;
    }
}

new MapDisplayImageryBingTiles();
