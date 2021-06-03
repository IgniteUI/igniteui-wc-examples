import { DataGridSharedData } from './DataGridSharedData';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcGridCellValueChangingEventArgs } from 'igniteui-webcomponents-grids';
import { IgcTemplateColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellUpdatingEventArgs } from 'igniteui-webcomponents-grids';
import { GridActivationMode, GridSelectionMode, EditModeType } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

export class DataGridCellEditing {

    public grid: IgcDataGridComponent;
    public data: any[];
    public commitButton: HTMLButtonElement;
    public undoButton: HTMLButtonElement;
    public redoButton: HTMLButtonElement;

    constructor() {

        this.data = DataGridSharedData.getEmployees();

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        if (this.grid !== null){
            this.grid.dataSource = this.data;
            this.grid.activationMode = GridActivationMode.Cell;
            this.grid.selectionMode = GridSelectionMode.SingleCell;
            this.grid.editMode = EditModeType.Cell;
            this.grid.cellValueChanging = this.onCellValueChanging;
        }

        let dropDown = document.getElementById('editModeDropBox');
        if (dropDown !== null){
            dropDown.onchange = this.editModeChanged;
        }

        let dropDown2 = document.getElementById('editModeClickActionDropBox');
        if (dropDown2 !== null){
            dropDown2.onchange = this.editModeClickActionChanged;
        }

        this.commitButton = document.getElementById('commitClick') as HTMLButtonElement;
        if (this.commitButton !== null){
            this.commitButton.onclick = this.onCommitClick;
        }

        this.undoButton = document.getElementById('undoClick') as HTMLButtonElement;
        if (this.undoButton !== null){
            this.undoButton.onclick = this.onUndoClick;
        }

        this.redoButton = document.getElementById('redoClick') as HTMLButtonElement;
        if (this.redoButton !== null){
            this.redoButton.onclick = this.onRedoClick;
        }

        let deleteRowColumn = document.getElementById('deleteRowColumn') as IgcTemplateColumnComponent;
        if (deleteRowColumn !== null){
            deleteRowColumn.cellUpdating = this.onDeleteCellUpdating;
        }
    }

    public onCommitClick = () =>{
        this.grid.commitEdits();
        this.commitButton.disabled = true;
        this.undoButton.disabled = !this.grid.canUndo;
    }

    public onUndoClick = () =>{
        this.grid.undo();
        this.undoButton.disabled = !this.grid.canUndo;
        if (!this.grid.canUndo) {
            this.commitButton.disabled = this.grid.canCommit;
        }
        else {
            this.commitButton.disabled = !this.grid.canCommit;
        }

        this.redoButton.disabled = !this.grid.canRedo;
    }

    public onRedoClick = () =>{
        this.grid.redo();

        if (this.grid.editMode === EditModeType.Cell || this.grid.editMode === EditModeType.None) {
            this.commitButton.disabled = !this.grid.canCommit;
        }
        if (this.grid.editMode === EditModeType.CellBatch || this.grid.editMode === EditModeType.Row) {
            this.redoButton.disabled = !this.grid.canRedo;
            this.undoButton.disabled = !this.grid.canUndo;
            if(!this.grid.canUndo) {
                this.commitButton.disabled = this.grid.canCommit;
            }
            else{
                this.commitButton.disabled = !this.grid.canCommit;
            }
        }
    }

    public editModeChanged = (event: any) => {

        this.grid.cancelEdits();
        this.grid.editMode = event.target.value;
        if (this.grid.editMode === EditModeType.None || this.grid.editMode === EditModeType.Cell) {
            this.commitButton.disabled = true;
            this.undoButton.disabled = !this.grid.canUndo;
            this.redoButton.disabled = !this.grid.canRedo;
        }
    }

    public editModeClickActionChanged = (event: any) => {

        this.grid.editModeClickAction = event.target.value;
       
    }

    public onDeleteRowClick = (e: MouseEvent) => {

        const button = e.srcElement as HTMLButtonElement;
        const viewIndex = parseInt(button.id);
        const rowItem = this.grid.actualDataSource.getItemAtIndex(viewIndex);

        if(this.grid.editMode === EditModeType.CellBatch || this.grid.editMode === EditModeType.Row){
            this.grid.removeItem(rowItem);
            this.commitButton.disabled = !this.grid.canCommit;
            this.redoButton.disabled = !this.grid.canRedo;
            this.undoButton.disabled = !this.grid.canUndo;
        }
        else if(this.grid.editMode === EditModeType.Cell) {
            //delete grid row immediately
            this.grid.removeItem(rowItem);
        }
    }

    public onCellValueChanging = (s: IgcDataGridComponent, e: IgcGridCellValueChangingEventArgs) => {
        if(s.editMode === EditModeType.CellBatch || this.grid.editMode === EditModeType.Row)
        {
            this.commitButton.disabled = !this.grid.canCommit;
            this.undoButton.disabled = false;
        }
        else if(this.grid.editMode === EditModeType.Cell || this.grid.editMode === EditModeType.None) {
            this.commitButton.disabled = this.grid.canCommit;
        }
        if(e.newValue === "") {
            this.commitButton.disabled = true;
            s.setEditError(e.editID, "Error, cell is empty");
        }
    }

    public onDeleteCellUpdating = (s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) => {
        const content = e.content as HTMLDivElement;
        if (content.childElementCount === 0) {
            const button = document.createElement("button") as HTMLButtonElement;
            button.innerText = "Delete";
            button.onclick = this.onDeleteRowClick;
            content.appendChild(button);
        }

        const button = content.children[0] as HTMLButtonElement;
        button.disabled = e.cellInfo.isDeleted;
        button.id = e.cellInfo.dataRow.toString();
    }
}

new DataGridCellEditing();
