import { DataGridSharedData } from './DataGridSharedData';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridToolbarModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridToolbarComponent } from 'igniteui-webcomponents-data-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-data-grids';
import { IgcTemplateColumnComponent } from 'igniteui-webcomponents-data-grids';
import { IgcTemplateCellInfo } from 'igniteui-webcomponents-data-grids';
import { IgcTemplateCellUpdatingEventArgs } from 'igniteui-webcomponents-data-grids';
import { IgcImageColumnComponent } from 'igniteui-webcomponents-data-grids';
import { IgcColumnGroupDescription } from 'igniteui-webcomponents-data-grids';
import { IgcColumnSummaryDescription } from 'igniteui-webcomponents-data-grids'
import { DataSourceSummaryOperand } from 'igniteui-webcomponents-core';
import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { SparklineDisplayType } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDataGridModule,
    IgcDataGridToolbarModule,
    IgcGridColumnOptionsModule,
    IgcSparklineModule
);

export class DataGridLoadSaveLayout {

    private grid: IgcDataGridComponent;
    public toolbar: IgcDataGridToolbarComponent;
    public loadButton: HTMLButtonElement;
    public saveButton: HTMLButtonElement;
    public savedLayout: string;

    public onLoadClick = () =>{
        this.grid.loadLayout(this.savedLayout);
    }

    public onSaveClick = () =>{
        this.grid.saveLayout();
        this.savedLayout = this.grid.saveLayout();
        this.loadButton.disabled = false;
    }

    constructor() {

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees(100);

        this.toolbar = document.getElementById('toolbar') as IgcDataGridToolbarComponent;
        this.toolbar.targetGrid = this.grid;

        const peopleGroup = new IgcColumnGroupDescription();
        peopleGroup.field = 'Country';
        peopleGroup.displayName = 'Country';
        this.grid.groupDescriptions.add(peopleGroup);

        const incomeGroup = new IgcColumnGroupDescription();
        incomeGroup.field = 'Income';
        incomeGroup.displayName = 'Income';
        this.grid.groupDescriptions.add(incomeGroup);

        const peopleCount = new IgcColumnSummaryDescription();
        peopleCount.field = 'Photo';
        peopleCount.operand = DataSourceSummaryOperand.Count;
        this.grid.summaryDescriptions.add(peopleCount);

        const sales = new IgcColumnSummaryDescription();
        sales.field = 'Sales';
        sales.operand = DataSourceSummaryOperand.Max;
        sales.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(sales);

        const salary = new IgcColumnSummaryDescription();
        salary.field = 'Salary';
        salary.operand = DataSourceSummaryOperand.Average;
        salary.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(salary);

        //load & save layout
        this.savedLayout = "";
        this.loadButton = document.getElementById('loadClick') as HTMLButtonElement;
        if (this.loadButton !== null){
            this.loadButton.onclick = this.onLoadClick;
            if(this.savedLayout == "")
            {
                this.loadButton.disabled = true;
            }
        }

        this.saveButton = document.getElementById('saveClick') as HTMLButtonElement;
        if (this.saveButton !== null){
            this.saveButton.onclick = this.onSaveClick;
        }
    }

}

export function initialize() {
  return new DataGridLoadSaveLayout();
}