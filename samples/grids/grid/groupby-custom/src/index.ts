import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent, SortingDirection, IgcGroupByRowTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { InvoicesDataItem, InvoicesData } from './InvoicesData';
import { defineComponents, IgcButtonComponent, IgcDropdownComponent, IgcBadgeComponent } from 'igniteui-webcomponents';
defineComponents(IgcButtonComponent, IgcDropdownComponent, IgcBadgeComponent);
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { html, ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    public groupByMode = "Month";
    public getParsedDate(date: any) {
        return {
            day: date.getDay(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        };
    }

    public getWeekOfDate(date:any) {
        const onejan = new Date(date.getFullYear(), 0, 1);
        const week = Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
        return week;
    }

    private grid: IgcGridComponent;
    private _bind: () => void;
    private groupExpression = [
        { fieldName: 'OrderDate', dir: SortingDirection.Desc,
        groupingComparer: (a:any, b: any) => {
                const dateA = this.getParsedDate(a);
                const dateB = this.getParsedDate(b);
                if (this.groupByMode === 'Month') {
                    return dateA.month === dateB.month ? 0 : -1;
                } else if (this.groupByMode === "Year") {
                    return dateA.year === dateB.year ? 0 : -1;
                } else if (this.groupByMode === 'Week') {
                    return this.getWeekOfDate(a) === this.getWeekOfDate(b) ? 0 : -1;
                 }
                return dateA.day === dateB.day && dateA.month === dateB.month ? 0 : -1;
            }
        }
    ];

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        this._bind = () => {
            grid.data = this.invoicesData;
            grid.groupingExpressions = this.groupExpression;
            grid.groupRowTemplate = this.groupByRowTemplate;
        }
        this._bind();

        var day = document.getElementById('day');
        var week = document.getElementById('week');
        var month = document.getElementById('month');
        var year = document.getElementById('year');

        day!.addEventListener('click', this.handleClick);
        week!.addEventListener('click', this.handleClick);
        month!.addEventListener('click', this.handleClick);
        year!.addEventListener('click', this.handleClick);
    }

    private handleClick = (event: MouseEvent) => {
       this.groupByMode = (event.target as any).value;
       this.grid.groupingExpressions = this.groupExpression;
    };

    private _invoicesData: InvoicesData = null;
    public get invoicesData(): InvoicesData {
        if (this._invoicesData == null)
        {
            this._invoicesData = new InvoicesData();
        }
        return this._invoicesData;
    }

    public groupByRowTemplate = (ctx: IgcGroupByRowTemplateContext) => {
        const groupRow: any = (ctx as any)["$implicit"];

        const dateTypes = {
            "Day":  groupRow.value.toLocaleDateString(),
            "Month": this.getMonthName(groupRow.value),
            "Year": groupRow.value.getFullYear(),
            "Week": this.getWeekOfDate(groupRow.value)
          };

        const value = (dateTypes as any)[this.groupByMode];
        return html`<div>
    <span style="color:#09f;">${groupRow.expression.fieldName} :</span>
    <span>${value}</span>
    <igc-badge>${groupRow.records.length}</igc-badge>
    </div>`;
    }

    private getMonthName(date: Date) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
       return monthNames[date.getMonth()];
    }

}

new Sample();
