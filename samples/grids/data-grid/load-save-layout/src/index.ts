import { DataGridSharedData } from './DataGridSharedData';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcDataGridToolbarModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridToolbarComponent } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcTemplateColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellInfo } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellUpdatingEventArgs } from 'igniteui-webcomponents-grids';
import { IgcImageColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcColumnGroupDescription } from 'igniteui-webcomponents-grids';
import { IgcColumnSummaryDescription } from 'igniteui-webcomponents-grids'
import { SummaryOperand } from 'igniteui-webcomponents-core';
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
        peopleCount.operand = SummaryOperand.Count;
        this.grid.summaryDescriptions.add(peopleCount);

        const sales = new IgcColumnSummaryDescription();
        sales.field = 'Sales';
        sales.operand = SummaryOperand.Max;
        sales.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(sales);

        const salary = new IgcColumnSummaryDescription();
        salary.field = 'Salary';
        salary.operand = SummaryOperand.Average;
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

new DataGridLoadSaveLayout();
