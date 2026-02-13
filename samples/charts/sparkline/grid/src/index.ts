import { Products } from './Products';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { IgcTemplateColumnComponent } from 'igniteui-webcomponents-data-grids';
import { IgcTemplateCellInfo } from 'igniteui-webcomponents-data-grids';
import { IgcTemplateCellUpdatingEventArgs } from 'igniteui-webcomponents-data-grids';
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

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = this.data;

        const historyColumn = document.getElementById('historyColumn') as IgcTemplateColumnComponent;
        historyColumn.cellUpdating = this.onUpdatingHistoryColumn;
    }

    public onUpdatingHistoryColumn(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        let chart: IgcSparklineComponent | null = null;
        let info = e.cellInfo as IgcTemplateCellInfo;

        if (content.childElementCount === 0) {
            chart = new IgcSparklineComponent();
            chart.width = '100%';
            chart.height = '100%';
            chart.valueMemberPath = 'Sold';
            chart.labelMemberPath = 'Week';
            chart.displayType = SparklineDisplayType.Line;
            chart.brush = 'rgb(21, 190, 6)';

            let container = document.createElement("div") as HTMLDivElement;
            container.style.width = "100%";
            container.style.height = "70px";
            container.style.background = "transparent";
            container.append(chart);

            content.appendChild(container);
        }
        else {
            let container = content.children[0] as HTMLDivElement;
            chart = container.children[0] as IgcSparklineComponent;
        }

        if (chart) {
            chart.dataSource = info.rowItem.OrderHistory;
        }
    }
}

export function initialize() {
  return new SparklineGrid();
}