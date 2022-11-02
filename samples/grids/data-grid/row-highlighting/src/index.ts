import { DataGridSharedData } from './DataGridSharedData';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule
);

export class DataGridRowHighlighting {

    private grid: IgcDataGridComponent;

    constructor() {

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees(50);

        let dropDown = document.getElementById("highlightDropBox");
        dropDown!.addEventListener("change", this.dropDownValueChanged);

        let rowHighlightingCheckbox = document.getElementById("rowHighlightingCheckbox") as any ;
        rowHighlightingCheckbox.addEventListener('change', this.onRowHighlightingCheckbox);
        rowHighlightingCheckbox.checked = true;
    }

    public dropDownValueChanged = (e: any) => {
        let dropDown = document.getElementById("highlightDropBox") as any;
        if (dropDown.value === "default") {
            this.grid.rowHoverBackground = "";
        } else {
            this.grid.rowHoverBackground = dropDown.value;
        }
    }

    public onRowHighlightingCheckbox = (e: any) => {
        let isHighlighting = e.target.checked;
        if (isHighlighting) {
            this.grid.isRowHoverEnabled = true;
        }
        else {
            this.grid.isRowHoverEnabled = false;
        }
    }
}

new DataGridRowHighlighting();
