import 'igniteui-webcomponents-grids/grids/combined';
import { defineComponents, IgcCheckboxComponent } from 'igniteui-webcomponents';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, render } from 'lit-html';
import { createUser, User } from './mock-data';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcCheckboxComponent);

export class Sample {

    private grid: IgcGridComponent;
    private activeColumn: IgcColumnComponent;
    private logRef: HTMLElement;
    private log: string[] = [];
    private _bind: () => void;

    constructor() {
        this.grid = document.getElementById('grid') as IgcGridComponent;
        this.activeColumn = document.getElementById('activeColumn') as IgcColumnComponent;
        this.logRef = document.getElementById('log') as HTMLElement;

        this._bind = () => {
            this.grid.data = this.data;
            this.activeColumn.bodyTemplate = this.activeTemplate;
            
            this.grid.addEventListener('filteringExpressionsTreeChange', (event: any) => {
                this.handleFiltering(event);
            });
        }
        this._bind();

    }

    private data: User[] = Array.from({ length: 50 }, () => createUser());

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

    private handleFiltering(event: any) {
        const filteringTree = event.detail;
        if (filteringTree && filteringTree.filteringOperands && filteringTree.filteringOperands.length > 0) {
            const expression = filteringTree.filteringOperands[0];
            this.updateLog(
                `${this.time} :: Filtering event :: Filter operation for column '${expression.fieldName}'`
            );
        }
    }

    public activeTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<igc-checkbox .checked=${ctx.cell.value}></igc-checkbox>`;
    }

}

new Sample();
