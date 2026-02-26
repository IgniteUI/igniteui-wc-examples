import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents, IgcButtonComponent, IgcDialogComponent } from 'igniteui-webcomponents';
defineAllComponents();

import "./index.css";

export class HierarchicalGridBatchEditingSample {

    private grid: IgcHierarchicalGridComponent;
    private deleteRowColumn: IgcColumnComponent;
    private addRowBtn: IgcButtonComponent;
    private undoBtn: IgcButtonComponent;
    private redoBtn: IgcButtonComponent;
    private commitBtn: IgcButtonComponent;
    private discardBtn: IgcButtonComponent;
    private dialog: IgcDialogComponent;
    private transactionGrid: IgcGridComponent;
    private typeColumn: IgcColumnComponent;
    private valueColumn: IgcColumnComponent;
    private addId: number = 1000;

    constructor() {
        this.grid = document.getElementById('grid') as IgcHierarchicalGridComponent;
        this.deleteRowColumn = document.getElementById('actionsColumn') as IgcColumnComponent;
        this.addRowBtn = document.getElementById('addRowBtn') as IgcButtonComponent;
        this.undoBtn = document.getElementById('undoBtn') as IgcButtonComponent;
        this.redoBtn = document.getElementById('redoBtn') as IgcButtonComponent;
        this.commitBtn = document.getElementById('commitBtn') as IgcButtonComponent;
        this.discardBtn = document.getElementById('discardBtn') as IgcButtonComponent;
        this.dialog = document.getElementById('dialog') as IgcDialogComponent;
        this.transactionGrid = document.getElementById('transactionGrid') as IgcGridComponent;
        this.typeColumn = document.getElementById('typeColumn') as IgcColumnComponent;
        this.valueColumn = document.getElementById('valueColumn') as IgcColumnComponent;

        this.grid.batchEditing = true;
        this.grid.data = this.singersData;
        this.deleteRowColumn.bodyTemplate = this.deleteRowColumnTemplate;
        this.typeColumn.bodyTemplate = this.typeColumnTemplate;
        this.valueColumn.bodyTemplate = this.valueColumnTemplate;

        this.addRowBtn.addEventListener('click', this.onAddRowClick);
        this.undoBtn.addEventListener('click', this.onUndoClick);
        this.redoBtn.addEventListener('click', this.onRedoClick);
        this.commitBtn.addEventListener('click', this.onOpenCommitDialog);
        this.discardBtn.addEventListener('click', this.onDiscardClick);

        document.getElementById('dialogCommitBtn')!.addEventListener('click', this.onCommitClick);
        document.getElementById('dialogDiscardBtn')!.addEventListener('click', this.onDiscardClick);
        document.getElementById('dialogCancelBtn')!.addEventListener('click', this.onCancelClick);

        this.grid.transactions.onStateUpdate.subscribe(() => {
            this.undoBtn.disabled = !this.grid.transactions.canUndo;
            this.redoBtn.disabled = !this.grid.transactions.canRedo;
            const hasChanges = this.grid.transactions.getAggregatedChanges(false).length > 0;
            this.commitBtn.disabled = !hasChanges;
            this.discardBtn.disabled = !hasChanges;
        });
    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }

    public deleteRowColumnTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<igc-button variant="contained" @click=${() => this.onDeleteRowClick(ctx.cell.id.rowID)}>Delete</igc-button>`;
    }

    public typeColumnTemplate = (ctx: IgcCellTemplateContext) => {
        const type = ctx.cell.value as string;
        return html`<span class="transaction--${type.toLowerCase()}">${type.toUpperCase()}</span>`;
    }

    public valueColumnTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<span>${JSON.stringify(ctx.cell.value)}</span>`;
    }

    public onAddRowClick = () => {
        this.grid.addRow({
            ID: this.addId++,
            Artist: 'New Artist ' + this.randomInt(1, 100),
            Debut: this.randomInt(1990, 2025),
            GrammyNominations: this.randomInt(0, 20),
            GrammyAwards: this.randomInt(0, 10),
            HasGrammyAward: this.randomInt(0, 1) === 1,
            Albums: [],
            Tours: []
        });
    }

    private randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public onUndoClick = () => {
        this.grid.endEdit(true);
        this.grid.transactions.undo();
    }

    public onRedoClick = () => {
        this.grid.endEdit(true);
        this.grid.transactions.redo();
    }

    public onOpenCommitDialog = () => {
        this.transactionGrid.data = this.grid.transactions.getAggregatedChanges(true);
        this.dialog.show();
    }

    public onCommitClick = () => {
        this.grid.transactions.commit(this.grid.data);
        this.dialog.hide();
    }

    public onDiscardClick = () => {
        this.grid.transactions.clear();
        this.dialog.hide();
    }

    public onCancelClick = () => {
        this.dialog.hide();
    }

    public onDeleteRowClick = (rowId: any) => {
        this.grid.deleteRow(rowId);
    }

}

new HierarchicalGridBatchEditingSample();
