import 'igniteui-webcomponents-grids/grids/combined';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, render } from 'lit-html';
import { createProductInfo, ProductInfo } from './mock-data';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcRatingComponent);

export class Sample {

    private grid: IgcGridComponent;
    private ratingColumn: IgcColumnComponent;
    private logRef: HTMLElement;
    private log: string[] = [];
    private _bind: () => void;

    constructor() {
        this.grid = document.getElementById('grid') as IgcGridComponent;
        this.ratingColumn = document.getElementById('ratingColumn') as IgcColumnComponent;
        this.logRef = document.getElementById('log') as HTMLElement;

        this._bind = () => {
            this.grid.data = this.data;
            this.ratingColumn.bodyTemplate = this.ratingTemplate;
            
            this.grid.addEventListener('sorting', (event: any) => {
                this.handleSorting(event);
            });
            
            this.grid.addEventListener('sortingDone', (event: any) => {
                this.handleSorted(event);
            });
        }
        this._bind();

    }

    private data: ProductInfo[] = Array.from({ length: 100 }, () => createProductInfo());

    private get time() {
        return `[${new Date().toLocaleTimeString()}]`;
    }

    private updateLog(message: string) {
        if (this.log.length > 10) {
            this.log.shift();
        }
        this.log = [...this.log, message];
        this.renderLog();
    }

    private renderLog() {
        const logContent = this.log.map((each) => html`<p><code>${each}</code></p>`);
        render(html`${logContent}`, this.logRef);
        this.logRef.scrollTo({ top: this.logRef.scrollHeight, behavior: "smooth" });
    }

    private handleSorting(event: any) {
        const column = event.detail?.expressions?.[0]?.fieldName || 'unknown';
        
        // Prevent sorting for non-numeric columns
        if (!['price', 'total', 'sold'].includes(column)) {
            event.preventDefault();
            this.updateLog(
                `${this.time} :: Sorting event :: Sort operation was prevented for column '${column}'`
            );
        } else {
            this.updateLog(
                `${this.time} :: Sorting event :: Column '${column}' is being sorted`
            );
        }
    }

    private handleSorted(event: any) {
        const column = event.detail?.expressions?.[0]?.fieldName || 'unknown';
        this.updateLog(
            `${this.time} :: Sorted event :: Column '${column}' was sorted`
        );
    }

    public ratingTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<igc-rating
            readonly
            step="0.01"
            value=${ctx.cell.value}>
        </igc-rating>`;
    }

}

new Sample();
