import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import NwindData from './NwindData.json';
import { IgcSummaryResult, IgcSummaryOperand } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        this.webGridSummaryFormatter = this.webGridSummaryFormatter.bind(this);

        this._bind = () => {
            grid.data = this.nwindData;
            column1.summaryFormatter = this.webGridSummaryFormatter;
        }
        this._bind();

    }

    private _nwindData: any[] = NwindData;
    public get nwindData(): any[] {
        return this._nwindData;
    }


    public webGridSummaryFormatter(summary: IgcSummaryResult, summaryOperand: IgcSummaryOperand): string {
        const result = summary.summaryResult;
        if (summary.key !== "count" && result !== null && result !== undefined) {
            const format = new Intl.DateTimeFormat("en", { year: "numeric" });
            return format.format(new Date(result));
        }
        return result;
    }

}

export function initialize() {
  return new Sample();
}