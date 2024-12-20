import "igniteui-webcomponents-grids/grids/combined";
import { ComponentRenderer, WebGridDescriptionModule, html, render } from "igniteui-webcomponents-core";
import { IgcGridComponent } from "igniteui-webcomponents-grids/grids";
import { AthletesDataItem, AthletesData } from "./AthletesData";

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {
    private grid: IgcGridComponent;
    private _bind: () => void;
    public _advancedFiltering: boolean = true;
    public _hiding: boolean = true;
    public _pinning: boolean = true;
    public _exporter: boolean = true;
    private advancedFilteringCheckbox: HTMLInputElement;
    private hidingCheckbox: HTMLInputElement;
    private pinningCheckbox: HTMLInputElement;
    private exporterCheckbox: HTMLInputElement;

    constructor() {
        var grid1 = (this.grid = document.getElementById("grid1") as IgcGridComponent);

        this.advancedFilteringCheckbox = document.getElementById("toggleAdvancedFiltering") as HTMLInputElement;
        this.hidingCheckbox = document.getElementById("toggleHiding") as HTMLInputElement;
        this.pinningCheckbox = document.getElementById("togglePinning") as HTMLInputElement;
        this.exporterCheckbox = document.getElementById("toggleExporter") as HTMLInputElement;

        this.advancedFilteringCheckbox.value = this._advancedFiltering.toString();
        this.advancedFilteringCheckbox.checked = this._advancedFiltering;
        this.hidingCheckbox.value = this._hiding.toString();
        this.hidingCheckbox.checked = this._hiding;
        this.pinningCheckbox.value = this._pinning.toString();
        this.pinningCheckbox.checked = this._pinning;
        this.exporterCheckbox.value = this._exporter.toString();
        this.exporterCheckbox.checked = this._exporter;

        this.advancedFilteringCheckbox.addEventListener("change", (e) => {
            this._advancedFiltering = (e.target as HTMLInputElement).checked;
            this.renderToolbar();
        });

        this.hidingCheckbox.addEventListener("change", (e) => {
            this._hiding = (e.target as HTMLInputElement).checked;
            this.renderToolbar();
        });

        this.pinningCheckbox.addEventListener("change", (e) => {
            this._pinning = (e.target as HTMLInputElement).checked;
            this.renderToolbar();
        });

        this.exporterCheckbox.addEventListener("change", (e) => {
            this._exporter = (e.target as HTMLInputElement).checked;
            this.renderToolbar();
        });

        this.grid.addEventListener("rendered", (e) => {
            this.renderToolbar();
        });

        this._bind = () => {
            grid1.data = this.athletesData;
        };
        this._bind();
    }

    private renderToolbar() {
        const toolbarTemplate = html`
            <igc-grid-toolbar>
                <igc-grid-toolbar-actions>
                    ${this._advancedFiltering ? html`<igc-grid-toolbar-advanced-filtering></igc-grid-toolbar-advanced-filtering>` : ""} ${this._hiding ? html`<igc-grid-toolbar-hiding></igc-grid-toolbar-hiding>` : ""}
                    ${this._pinning ? html`<igc-grid-toolbar-pinning></igc-grid-toolbar-pinning>` : ""} ${this._exporter ? html`<igc-grid-toolbar-exporter></igc-grid-toolbar-exporter>` : ""}
                </igc-grid-toolbar-actions>
            </igc-grid-toolbar>
        `;
        render(toolbarTemplate, this.grid);
    }

    private _athletesData: AthletesData = null;
    public get athletesData(): AthletesData {
        if (this._athletesData == null) {
            this._athletesData = new AthletesData();
        }
        return this._athletesData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }
}

new Sample();
