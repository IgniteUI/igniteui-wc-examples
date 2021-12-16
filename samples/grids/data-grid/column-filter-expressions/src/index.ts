import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { FilterExpression } from 'igniteui-webcomponents-core';
import { FilterFactory } from 'igniteui-webcomponents-core';
import { DataGridSharedData } from './DataGridSharedData';
import { FilterUIType } from 'igniteui-webcomponents-grids';
 
ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

export class DataGridColumnFilterExpressions {

    private grid: IgcDataGridComponent;
    private filterText: string = '';
    private filterMode: string = 'Contains';
    private filterColumn: string = 'Name';
    private filterFactory: FilterFactory;

    constructor() {

        this.onFilterColumnDropDownValueChanged = this.onFilterColumnDropDownValueChanged.bind(this);
        this.onFilterModeDropDownValueChanged = this.onFilterModeDropDownValueChanged.bind(this);
        this.onFilterTextBoxTextChanged = this.onFilterTextBoxTextChanged.bind(this);
        this.applyFilter = this.applyFilter.bind(this);

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.filterUIType = FilterUIType.ColumnOptions;
        document.getElementById('filterColumnDropDown')!.addEventListener('change', this.onFilterColumnDropDownValueChanged);
        document.getElementById('filterModeDropDown')!.addEventListener('change', this.onFilterModeDropDownValueChanged);
        document.getElementById('filterTextBox')!.addEventListener('change', this.onFilterTextBoxTextChanged);

        this.grid.dataSource = DataGridSharedData.getEmployees(4000);
    }

    public onFilterColumnDropDownValueChanged() {
        let dropDown = document.getElementById('filterColumnDropDown') as any;
        this.filterColumn = dropDown.value;
        this.applyFilter();
    }

    public onFilterModeDropDownValueChanged() {
        let dropDown = document.getElementById('filterModeDropDown') as any;
        this.filterMode = dropDown.value;
        this.applyFilter();
    }

    public onFilterTextBoxTextChanged() {
        let textBox = document.getElementById('filterTextBox') as any;
        this.filterText = textBox.value;
        this.applyFilter();
    }

    public applyFilter() {
        this.grid.filterExpressions.clear();
        if (this.filterText === '' || this.filterText === null) {
            return;
        }

        this.filterFactory = new FilterFactory();
        const expression = this.filterText.toUpperCase();
        const column = this.filterFactory.property(this.filterColumn).toUpper();

        let filter: FilterExpression;
        if (this.filterMode === 'Contains') {
            filter = column.contains(expression)
        }
        else if (this.filterMode === 'StartsWith') {
            filter = column.startsWith(expression);
        }
        else { // if (this.filterMode === 'EndsWith') {
            filter = column.endsWith(expression);
        }

        this.grid.filterExpressions.add(filter);
    }
}

new DataGridColumnFilterExpressions();
