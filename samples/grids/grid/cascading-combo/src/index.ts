import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { WorldCitiesAbove500KItem, WorldCitiesAbove500K } from './WorldCitiesAbove500K';
import { IgcComboComponent, IgcLinearProgressComponent } from 'igniteui-webcomponents';
import { IgcCellTemplateContext, IgcRenderFunction } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
defineAllComponents();

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        this.webGridWithComboRendered = this.webGridWithComboRendered.bind(this);
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.worldCitiesAbove500K;
            grid.addEventListener("rendered", this.webGridWithComboRendered);
            column1.bodyTemplate = this.webGridCountryDropDownTemplate;
            column2.bodyTemplate = this.webGridRegionDropDownTemplate;
            column3.bodyTemplate = this.webGridCityDropDownTemplate;
        }
        this._bind();

    }

    private _worldCitiesAbove500K: WorldCitiesAbove500K = null;
    public get worldCitiesAbove500K(): WorldCitiesAbove500K {
        if (this._worldCitiesAbove500K == null)
        {
            this._worldCitiesAbove500K = new WorldCitiesAbove500K();
        }
        return this._worldCitiesAbove500K;
    }


    public countryNames = [
        'United States',
        'Japan',
        'United Kingdom'
    ];
    public countries = [...this.worldCitiesAbove500K].filter(x => this.countryNames.indexOf(x.Country) !== -1).filter((value, index, array) => array.findIndex(x => x.Country === value.Country) === index);
    public regions = [...this.worldCitiesAbove500K].filter((value, index, array) => array.findIndex(x => x.Region === value.Region) === index);
    public cities = [...this.worldCitiesAbove500K].filter((value, index, array) => array.findIndex(x => x.Name === value.Name) === index);
    public webGridWithComboRendered(args:any): void {
        const grid = this.grid;
        grid.data = [
            {
              ID: 1,
              Country: '',
              Region: '',
              City: ''
            },
            {
              ID: 2,
              Country: '',
              Region: '',
              City: ''
            },
            {
              ID: 3,
              Country: '',
              Region: '',
              City: ''
            }
        ];
    }

    public onCountryChange(rowId: string, e: CustomEvent) {
        const newValue = e.detail.newValue[0];
        const regionComboId = "region_" + rowId;
        const cityComboId = "city_" + rowId;
        const regionCombo = document.getElementById(regionComboId) as IgcComboComponent<any>;
        const cityCombo = document.getElementById(cityComboId) as IgcComboComponent;

        if (!regionCombo || !cityCombo) return;

        if (newValue === undefined || newValue === '') {
            // Deselect, disable and clear region combo
            regionCombo.deselect(regionCombo.value);
            regionCombo.disabled = true;
            regionCombo.data = [];

            // Deselect, disable and clear city combo
            cityCombo.deselect(cityCombo.value);
            cityCombo.disabled = true;
            cityCombo.data = [];
        } else {
            // Populate and enable region combo based on selected country
            regionCombo.disabled = false;
            regionCombo.data = this.regions.filter(region => region.Country === newValue);

            // Ensure city combo is reset when changing country
            cityCombo.deselect(cityCombo.value);
            cityCombo.disabled = true;
            cityCombo.data = [];
        }
    }

    public onRegionChange(rowId: string, e: CustomEvent) {
        const newValue = e.detail.newValue[0];
        const cityComboId = "city_" + rowId;
        const cityCombo = document.getElementById(cityComboId) as IgcComboComponent;

        if (!cityCombo) return;

        if (newValue === undefined || newValue === '') {
            // Deselect, disable and clear city combo
            cityCombo.deselect(cityCombo.value);
            cityCombo.disabled = true;
            cityCombo.data = [];
        } else {
            // Populate and enable city combo based on selected country
            cityCombo.disabled = false;
            cityCombo.data = this.cities.filter(city => city.Region === newValue);
        }
    }

    public webGridCountryDropDownTemplate: IgcRenderFunction<IgcCellTemplateContext> = (ctx: IgcCellTemplateContext) => {
        if (!ctx || !ctx.cell) {
            return nothing;
        }

        const id = ctx.cell.id.rowID;
        const comboId = "country_" + id;

        return html`
            <igc-combo
                id="${comboId}"
                placeholder="Choose Country..."
                value-key="Country"
                display-key="Country"
                single-select
                .data="${this.countries}"
                @igcChange="${(e: CustomEvent) => this.onCountryChange(id, e)}"
            ></igc-combo>
        `;
    }

    public webGridRegionDropDownTemplate: IgcRenderFunction<IgcCellTemplateContext> = (ctx: IgcCellTemplateContext) => {
        if (!ctx || !ctx.cell) {
            return nothing;
        }

        const id = ctx.cell.id.rowID;
        const comboId = "region_" + id;

        return html`
            <div style="display: flex; flex-direction: column;">
                <igc-combo
                    id="${comboId}"
                    placeholder="Choose Region..."
                    value-key="Region"
                    display-key="Region"
                    single-select
                    disabled
                    @igcChange="${(e: CustomEvent) => this.onRegionChange(id, e)}"
                ></igc-combo>
            </div>
        `;
    }

    public webGridCityDropDownTemplate: IgcRenderFunction<IgcCellTemplateContext> = (ctx: IgcCellTemplateContext) => {
        if (!ctx || !ctx.cell) {
            return nothing;
        }

        const id = ctx.cell.id.rowID;
        const comboId = "city_" + id;

        return html`
            <div style="display: flex; flex-direction: column;">
                <igc-combo
                    id="${comboId}"
                    placeholder="Choose City..."
                    value-key="Name"
                    display-key="Name"
                    single-select
                    disabled
                ></igc-combo>
            </div>
        `;
    }

}

new Sample();
