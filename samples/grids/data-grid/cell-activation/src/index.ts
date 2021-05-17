import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { EnterKeyBehaviors } from 'igniteui-webcomponents-grids';
import { EnterKeyBehaviorAfterEdit } from 'igniteui-webcomponents-grids';
import { DataGridSharedData } from './DataGridSharedData';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

export class DataGridCellActivation {

    private grid: IgcDataGridComponent;
    public enterBehaviorButton: any;
    public enterKeyAfterEditButton: any;

    constructor() {

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();
        this.grid.enterBehaviorAfterEdit = EnterKeyBehaviorAfterEdit.MoveDown;

        this.enterBehaviorButton = document.getElementById('enterModeDropBox');
        if (this.enterBehaviorButton !== null){
            this.enterBehaviorButton.onchange = this.enterModeChanged;
        }

        this.enterKeyAfterEditButton = document.getElementById('enterAfterEditMode');
        if (this.enterKeyAfterEditButton !== null){
            this.enterKeyAfterEditButton.onchange = this.enterAfterChanged;
        }

    }

    public enterModeChanged = (event: any) => {

        this.grid.enterBehavior = event.target.value;
        if (this.grid.enterBehavior === EnterKeyBehaviors.Edit) {
            this.enterKeyAfterEditButton.disabled = false;
        }
        else {
            this.enterKeyAfterEditButton.disabled = true;
        }
    }

    public enterAfterChanged = (event: any) => {
        this.grid.enterBehaviorAfterEdit = event.target.value;
    }
}

new DataGridCellActivation();
