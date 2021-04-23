import { Products } from './Products';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcTemplateColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellInfo } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellUpdatingEventArgs } from 'igniteui-webcomponents-grids';
import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { SparklineDisplayType } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcSparklineModule,
    IgcDataGridModule
);

export class SparklineGrid {

    private grid: IgcDataGridComponent;

    public data: any[] = [];

    constructor() {

        this.data = Products.getData();

        this.onUpdatingHistoryColumn = this.onUpdatingHistoryColumn.bind(this);
        this.onUpdatingReturnsColumn = this.onUpdatingReturnsColumn.bind(this);

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = this.data;

        const historyColumn = document.getElementById('historyColumn') as IgcTemplateColumnComponent;
        historyColumn.cellUpdating = this.onUpdatingHistoryColumn;

        const returnsColumn = document.getElementById('returnsColumn') as IgcTemplateColumnComponent;
        returnsColumn.cellUpdating = this.onUpdatingReturnsColumn;
    }

    public onUpdatingHistoryColumn(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        let chart: IgcSparklineComponent | null = null;
        let info = e.cellInfo as IgcTemplateCellInfo;

        if (content.childElementCount === 0) {
            chart = new IgcSparklineComponent();
            chart.valueMemberPath = 'Sold';
            chart.labelMemberPath = 'Week';
            chart.displayType = SparklineDisplayType.Line;
            chart.lineThickness = 2;
            chart.brush = 'rgb(21, 190, 6)';
            chart.negativeBrush = 'rgb(211, 17, 3)';
            chart.width = '100%';
            chart.height = '100%';

            content.style.width = 'calc(100% - 0.5rem)';
            content.style.height = 'calc(100% - 0.5rem)';
            content.style.padding = '0.25rem';
            content.style.margin = '0px';
            content.style.display = 'inline-grid';
            content.appendChild(chart);
        }
        else {
            chart = content.children[0] as IgcSparklineComponent;
        }

        if (chart) {
            chart.dataSource = info.rowItem.OrderHistory;
        }
    }

    public onUpdatingReturnsColumn(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        let chart: IgcSparklineComponent | null = null;
        let info = e.cellInfo as IgcTemplateCellInfo;

        if (content.childElementCount === 0) {
            chart = new IgcSparklineComponent();
            chart.valueMemberPath = 'Balance';
            chart.labelMemberPath = 'Week';
            chart.displayType = SparklineDisplayType.Column;
            chart.lineThickness = 2;
            chart.brush = 'rgb(21, 190, 6)';
            chart.negativeBrush = 'rgb(211, 17, 3)';
            chart.width = '100%';
            chart.height = '100%';

            content.style.width = 'calc(100% - 0.5rem)';
            content.style.height = 'calc(100% - 0.5rem)';
            content.style.padding = '0.25rem';
            content.style.margin = '0px';
            content.style.display = 'inline-grid';
            content.appendChild(chart);
        }
        else {
            chart = content.children[0] as IgcSparklineComponent;
        }

        if (chart) {
            chart.dataSource = info.rowItem.ReturnRate;
        }
    }

}

new SparklineGrid();
