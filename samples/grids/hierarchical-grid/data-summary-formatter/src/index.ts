import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcSummaryResult, IgcSummaryOperand } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid: IgcHierarchicalGridComponent
    private debutColumn: IgcColumnComponent
    private column1: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid = this.hierarchicalGrid = document.getElementById('hierarchicalGrid') as IgcHierarchicalGridComponent;
        this.webHierarchicalGridRenderedExpand = this.webHierarchicalGridRenderedExpand.bind(this);
        var debutColumn = this.debutColumn = document.getElementById('debutColumn') as IgcColumnComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        this.webHierarchicalGridSummaryFormatter = this.webHierarchicalGridSummaryFormatter.bind(this);

        this._bind = () => {
            hierarchicalGrid.data = this.singersData;
            hierarchicalGrid.addEventListener("rendered", this.webHierarchicalGridRenderedExpand);
            column1.summaryFormatter = this.webHierarchicalGridSummaryFormatter;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }


    public webHierarchicalGridRenderedExpand(args:any): void {
        this.debutColumn.formatter = (value: number) => Math.floor(value / 10) * 10 + 's';
        this.hierarchicalGrid.expandAll();
    }

    public webHierarchicalGridSummaryFormatter(summary: IgcSummaryResult, summaryOperand: IgcSummaryOperand): string {
        const result = summary.summaryResult;
        if (summary.key !== "count" && result !== null && result !== undefined) {
            const format = new Intl.DateTimeFormat("en", { year: "numeric" });
            return format.format(new Date(result));
        }
        return result;
    }

}

new Sample();
