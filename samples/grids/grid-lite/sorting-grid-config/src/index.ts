import 'igniteui-webcomponents-grids/grids/combined';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html } from 'lit-html';
import { createProductInfo, ProductInfo } from './mock-data';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcRatingComponent);

export class Sample {

    private grid: IgcGridComponent;
    private ratingColumn: IgcColumnComponent;
    private _bind: () => void;

    constructor() {
        this.grid = document.getElementById('grid') as IgcGridComponent;
        this.ratingColumn = document.getElementById('ratingColumn') as IgcColumnComponent;

        this._bind = () => {
            this.grid.data = this.data;
            this.ratingColumn.bodyTemplate = this.ratingTemplate;
            
            // Apply custom sorting to name column (sort by length)
            const nameColumn = this.grid.getColumnByName('name');
            if (nameColumn) {
                nameColumn.sortStrategy = {
                    sort: (data: any[]) => {
                        return data.sort((a, b) => {
                            const valueA = a.name || '';
                            const valueB = b.name || '';
                            return valueA.length - valueB.length;
                        });
                    }
                };
            }
        }
        this._bind();

    }

    private data: ProductInfo[] = Array.from({ length: 100 }, () => createProductInfo());

    public ratingTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<igc-rating
            readonly
            step="0.01"
            value=${ctx.cell.value}>
        </igc-rating>`;
    }

}

new Sample();
