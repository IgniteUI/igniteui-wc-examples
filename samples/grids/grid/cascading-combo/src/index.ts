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

    private grid1: IgcGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid1 = this.grid1 = document.getElementById('grid1') as IgcGridComponent;
        this.webGridWithComboRendered = this.webGridWithComboRendered.bind(this);
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;

        this._bind = () => {
            grid1.data = this.worldCitiesAbove500K;
            grid1.addEventListener("rendered", this.webGridWithComboRendered);
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
        const grid = document.getElementsByTagName("igc-grid")[0] as IgcGridComponent;
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

        setTimeout(() => {
            for (let index = 0; index < grid.data.length; index++) {
                const rowId = grid.data[index].ID;
                this.bindEventsCountryCombo(rowId, grid.getCellByKey(rowId , "Country"));
                this.bindEventsRegionCombo(rowId, grid.getCellByKey(rowId , "Region"));
                this.bindEventsCityCombo(rowId, grid.getCellByKey(rowId , "City"));
            }
        }, 100);
    }

    public bindEventsCountryCombo(rowId: any, cell: any) {
        const comboId = "country_" + rowId;
        var combo = document.getElementById(comboId) as IgcComboComponent<any>;
        combo?.addEventListener("igcChange", (e:any) => {
            const value = e.detail.newValue[0];
            cell.update(value);
            const nextCombo = document.getElementById("region_" + cell.id.rowID) as IgcComboComponent<any>;
            const nextProgress = document.getElementById("progress_region_" + cell.id.rowID) as IgcLinearProgressComponent;
            if (value === "") {
                nextCombo.deselect(nextCombo.value);
                nextCombo.disabled = true;
                nextCombo.data = [];
            } else {
                nextProgress.style.display = "block";
                setTimeout(() => {
                    nextProgress.style.display = "none";
                    nextCombo.disabled = false;
                    nextCombo.data = this.regions.filter(x => x.Country === value);
                }, 2000);

            }
        });
        combo?.addEventListener("igcOpening", (e:any) => {
            var currCombo = e.target;
            if (currCombo.data.length === 0) {
                combo.data = this.countries;
            };
        });
    }

    public bindEventsRegionCombo(rowId: any, cell: any) {
        const comboId = "region_" + rowId;
        var combo = document.getElementById(comboId) as IgcComboComponent<any>;
        combo?.addEventListener("igcChange", (e:any) => {
            const value = e.detail.newValue[0];
            cell.update(value);
            const nextCombo = document.getElementById("city_" + cell.id.rowID) as IgcComboComponent<any>;
            const nextProgress = document.getElementById("progress_city_" + cell.id.rowID) as IgcLinearProgressComponent;
            if (value === "") {
                nextCombo.deselect(nextCombo.value);
                nextCombo.disabled = true;
                nextCombo.data = [];
            } else {
                nextProgress.style.display = "block";
                setTimeout(() => {
                    nextProgress.style.display = "none";
                    nextCombo.disabled = false;
                    nextCombo.data = this.cities.filter(x => x.Region === value);
                }, 2000);
            }
        });
    }

    public bindEventsCityCombo(rowId: any, cell: any) {
        const comboId = "city_" + rowId;
        var combo = document.getElementById(comboId) as IgcComboComponent<any>;
        combo?.addEventListener("igcChange", (e:any) => {
            const value = e.detail.newValue[0];
            cell.update(value);
        });
    }

    public webGridCountryDropDownTemplate: IgcRenderFunction<IgcCellTemplateContext> = (ctx: IgcCellTemplateContext) => {
        const id = ctx.cell.id.rowID;
        const comboId = "country_" + id;
        return html`<igc-combo placeholder="Choose Country..." value-key="Country" display-key="Country" id="${comboId}" single-select></igc-combo>`;
    }

    public webGridRegionDropDownTemplate: IgcRenderFunction<IgcCellTemplateContext> = (ctx: IgcCellTemplateContext) => {
        const id = ctx.cell.id.rowID;
        const comboId = "region_" + id;
        const progressId = "progress_region_" + id;
        return html`<div style="display:flex; flex-direction: column;"><igc-combo placeholder="Choose Region..." disabled value-key="Region"  display-key="Region" id="${comboId}" single-select></igc-combo><igc-linear-progress style="display:none;" indeterminate id="${progressId}"></<igc-linear-progress><div>`;
    }

    public webGridCityDropDownTemplate: IgcRenderFunction<IgcCellTemplateContext> = (ctx: IgcCellTemplateContext) => {
        const id = ctx.cell.id.rowID;
        const comboId = "city_" + id;
        const progressId = "progress_city_" + id;
        return html`<div style="display:flex; flex-direction: column;"><igc-combo placeholder="Choose City..." disabled value-key="Name"  display-key="Name" id="${comboId}" single-select></igc-combo><igc-linear-progress style="display:none;" indeterminate id="${progressId}"></<igc-linear-progress></div>`;
    }

}

new Sample();
