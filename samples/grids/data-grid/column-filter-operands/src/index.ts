import { IgcDataGridModule, IgcGridColumnsChangedEventArgs } from 'igniteui-webcomponents-data-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { IgcGridCustomFilterRequestedEventArgs } from 'igniteui-webcomponents-data-grids';
import { IgcFilterOperand } from 'igniteui-webcomponents-data-grids';
import { FilterUIType } from 'igniteui-webcomponents-data-grids';
import { EditorType } from 'igniteui-webcomponents-data-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { DataGridSharedData } from './DataGridSharedData';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule
);

export class DataGridColumnFilterOperands {

    private grid: IgcDataGridComponent;

    constructor() {
        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.filterUIType = FilterUIType.FilterRow;
        this.grid.dataSource = DataGridSharedData.getEmployees(4000);

        this.grid.actualColumnsChanged = this.onActualColumnsChanged.bind(this);
    }

    onActualColumnsChanged() {

        const filterOperand = new IgcFilterOperand();
        filterOperand.editorType = EditorType.Text;
        filterOperand.displayName = "Show Only France";
        filterOperand.filterRequested = this.onFilter1;
        let column = this.grid.actualColumns.item(0);
        if (column !== null && column !== undefined)
        column.filterOperands.add(filterOperand);

        const filterOperand2 = new IgcFilterOperand();
        filterOperand2.editorType = EditorType.Numeric;
        filterOperand2.displayName = "Less Than Age 30";
        filterOperand2.filterRequested = this.onFilter2;
        let column2 = this.grid.actualColumns.item(1);
        if (column2 !== null && column2 !== undefined)
        column2.filterOperands.add(filterOperand2);

        const filterOperand3 = new IgcFilterOperand();
        filterOperand3.editorType = EditorType.Numeric;
        filterOperand3.displayName = "Greater Than $500k";
        filterOperand3.filterRequested = this.onFilter3;
        let column3 = this.grid.actualColumns.item(2);
        if (column3 !== null && column3 !== undefined)
        column3.filterOperands.add(filterOperand3);
    }

    onFilter1(s: IgcFilterOperand, e: IgcGridCustomFilterRequestedEventArgs)
    {
        let prop = e.filterFactory.property(e.column.field);
        //Filter-in only records with France
        e.expression = prop.isEqualTo("France");
    }

    onFilter2(s: IgcFilterOperand, e: IgcGridCustomFilterRequestedEventArgs)
    {
        let prop = e.filterFactory.property(e.column.field);
        //Filter-in only records with LessThan or Equal to 30
        e.expression = prop.isLessThanOrEqualTo(30);
    }

    onFilter3(s: IgcFilterOperand, e: IgcGridCustomFilterRequestedEventArgs)
    {
        let prop = e.filterFactory.property(e.column.field);
        //Filter-in only records with GreaterThan $500,000.00
        e.expression = prop.isGreaterThan(500000);
    }

}

export function initialize() {
  return new DataGridColumnFilterOperands();
}