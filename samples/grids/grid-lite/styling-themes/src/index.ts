import 'igniteui-webcomponents-grids/grids/combined';
import { defineComponents, IgcRatingComponent, IgcSelectComponent, IgcSelectItemComponent } from 'igniteui-webcomponents';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, render } from 'lit-html';
import { createProductInfo, ProductInfo } from './mock-data';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcRatingComponent, IgcSelectComponent, IgcSelectItemComponent);

const themes = ["Bootstrap", "Material", "Fluent", "Indigo"];

export class Sample {

    private grid: IgcGridComponent;
    private ratingColumn: IgcColumnComponent;
    private controls: HTMLElement;
    private currentTheme: string = "Bootstrap";
    private _bind: () => void;

    constructor() {
        this.grid = document.getElementById('grid') as IgcGridComponent;
        this.ratingColumn = document.getElementById('ratingColumn') as IgcColumnComponent;
        this.controls = document.getElementById('controls') as HTMLElement;

        this._bind = () => {
            this.grid.data = this.data;
            this.ratingColumn.bodyTemplate = this.ratingTemplate;
            this.renderControls();
        }
        this._bind();

    }

    private data: ProductInfo[] = Array.from({ length: 50 }, () => createProductInfo());

    public ratingTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<igc-rating readonly .value=${ctx.cell.value}></igc-rating>`;
    }

    private renderControls() {
        const controlsContent = html`
            <igc-select
                flip
                .value=${this.currentTheme}
                label="Select a theme:"
                @igcChange=${(e: CustomEvent) => this.updateTheme(e.detail.value)}>
                ${themes.map(
                    (theme) => html`<igc-select-item .value=${theme}>${theme}</igc-select-item>`
                )}
            </igc-select>
        `;
        render(controlsContent, this.controls);
    }

    private updateTheme(theme: string) {
        this.currentTheme = theme;
        // Theme switching would require dynamic CSS loading
        // For this sample, we're using the bootstrap theme
    }

}

new Sample();
