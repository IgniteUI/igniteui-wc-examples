import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcColumnComponent, IgcRowIslandComponent, IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcButtonGroupComponent, IgcToggleButtonComponent } from 'igniteui-webcomponents';
import { SingersData } from './SingersData';
import { html } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/material.css";
import "./index.css";

defineComponents(IgcButtonGroupComponent, IgcToggleButtonComponent);

export class Sample {

    private hierarchicalGrid: IgcHierarchicalGridComponent;
    private photoColumn: IgcColumnComponent;
    private debutColumn: IgcColumnComponent;
    private themeSwitcher: IgcButtonGroupComponent;
    private activeTheme = 'theme-studio';
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid = this.hierarchicalGrid = document.getElementById('hierarchicalGrid') as IgcHierarchicalGridComponent;
        var photoColumn = this.photoColumn = document.getElementById('photoColumn') as IgcColumnComponent;
        var debutColumn = this.debutColumn = document.getElementById('debutColumn') as IgcColumnComponent;
        var themeSwitcher = this.themeSwitcher = document.getElementById('themeSwitcher') as IgcButtonGroupComponent;
        var rowIslands = ['albumsIsland', 'songsIsland', 'toursIsland']
            .map(id => document.getElementById(id) as IgcRowIslandComponent);

        this._bind = () => {
            hierarchicalGrid.data = this.singersData;
            photoColumn.bodyTemplate = this.photoCellTemplate;
            debutColumn.formatter = (value: number) => value;
            rowIslands.forEach(island => island.height = null);
            themeSwitcher.addEventListener('igcSelect', (e: CustomEvent<string>) => this.selectTheme(e.detail));
        }
        this._bind();
    }

    private _singersData: SingersData = null;
    public get singersData(): SingersData {
        if (this._singersData == null)
        {
            this._singersData = new SingersData();
        }
        return this._singersData;
    }

    public selectTheme(theme: string): void {
        this.hierarchicalGrid.classList.replace(this.activeTheme, theme);
        this.activeTheme = theme;
    }

    public photoCellTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<div class="cell__inner_2">
            <img src="${ctx.cell.value}" class="photo" />
        </div>`;
    };
}

new Sample();
