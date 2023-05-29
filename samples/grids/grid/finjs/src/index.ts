import 'igniteui-webcomponents-grids/grids/combined';
import { IgcCellTemplateContext, IgcColumnComponent, IgcGridComponent, SortingDirection } from 'igniteui-webcomponents-grids/grids';
import { defineAllComponents, IgcIconComponent, registerIconFromText } from "igniteui-webcomponents";
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { FinancialData } from './FinancialData';
import { html, nothing } from 'lit-html';
import "./index.css";
defineAllComponents();
export class Sample {

    private grid1: IgcGridComponent;


    constructor() {
        var trendUp = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m123-240-43-43 292-291 167 167 241-241H653v-60h227v227h-59v-123L538-321 371-488 123-240Z"/></svg>`;
        var trendDown = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M653-240v-60h127L539-541 372-374 80-665l43-43 248 248 167-167 283 283v-123h59v227H653Z"/></svg>`;
        registerIconFromText("trending_up", trendUp, "material");
        registerIconFromText("trending_down", trendDown, "material");
        var grid1 = this.grid1 = document.getElementById('grid1') as IgcGridComponent;
        var price = document.getElementById('price') as IgcColumnComponent;
        var change = document.getElementById('change') as IgcColumnComponent;
        var changeP = document.getElementById('changeP') as IgcColumnComponent;
        grid1.data = FinancialData.generateData(1000);
        grid1.groupingExpressions = [
            {
                dir: SortingDirection.Desc,
                fieldName: 'category',
                ignoreCase: false
            },
            {
                dir: SortingDirection.Desc,
                fieldName: 'type',
                ignoreCase: false
            },
            {
                dir: SortingDirection.Desc,
                fieldName: 'contract',
                ignoreCase: false
            }
        ];

        price.bodyTemplate = this.priceTemplate;
        price.cellClasses = this.trends;
        changeP.cellClasses = this.trendsChange;
        change.cellClasses = this.trendsChange;
    }


    public priceTemplate = (ctx: IgcCellTemplateContext) => {
        const cell = ctx.cell;
        const rowData = this.grid1.getRowData(cell.id.rowID);
        const icon = this.trends.positive(rowData) ? "trending_up" : "trending_down";
        const value = cell.value.toFixed(4);
        return html`
        <div class="finjs-icons">
        <span>$${value}</span>
        <igc-icon name="${icon}" collection="material"></igc-icon>
        </div>
        `;
    }

    private negative = (rowData: any): boolean => rowData['changeP'] < 0;
    private positive = (rowData: any): boolean => rowData['changeP'] > 0;
    private changeNegative = (rowData: any): boolean => rowData['changeP'] < 0 && rowData['changeP'] > -1;
    private changePositive = (rowData: any): boolean => rowData['changeP'] > 0 && rowData['changeP'] < 1;
    private strongPositive = (rowData: any): boolean => rowData['changeP'] >= 1;
    private strongNegative = (rowData: any): boolean => rowData['changeP'] <= -1;
    public trends = {
        changeNeg: this.changeNegative,
        changePos: this.changePositive,
        negative: this.negative,
        positive: this.positive,
        strongNegative: this.strongNegative,
        strongPositive: this.strongPositive
    };

    public trendsChange = {
        changeNeg2: this.changeNegative,
        changePos2: this.changePositive,
        strongNegative2: this.strongNegative,
        strongPositive2: this.strongPositive
    };

}

new Sample();
