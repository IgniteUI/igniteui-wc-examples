import 'igniteui-webcomponents-grids/grids/combined';
import { IgcTreeGridComponent, IgcGridComponent, IgcPaginatorComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents, IgcButtonComponent, IgcDialogComponent } from 'igniteui-webcomponents';
defineAllComponents();

import "./index.css";
import { RemotePagingService } from './RemotePagingService';
import { EmployeesWithPageResponseModel } from './EmployeesWithPageResponseModel';

export class Sample {

  public data: any[] = [];
  public page: number = 0;
  public totalCount: number = 0;
  private grid: IgcTreeGridComponent;
  private _bind: () => void;
  private _perPage: number = 15;
  private pager: IgcPaginatorComponent;
  private _recordsOnServer: number = 0;
  private _totalPagesOnServer: number = 0;

  private actionsColumn: IgcColumnComponent;
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

  public get perPage(): number {
      return this._perPage;
  }

  public set perPage(val: number) {
    this._perPage = val;
    this._totalPagesOnServer = Math.floor(this._recordsOnServer / this.perPage);
    this.paginate(0);
  }

  constructor() {
      this.grid = document.getElementById('grid') as IgcTreeGridComponent;
      this.pager = document.getElementById('paginator') as IgcPaginatorComponent;
      this.actionsColumn = document.getElementById('actionsColumn') as IgcColumnComponent;
      this.addRowBtn = document.getElementById('addRowBtn') as IgcButtonComponent;
      this.undoBtn = document.getElementById('undoBtn') as IgcButtonComponent;
      this.redoBtn = document.getElementById('redoBtn') as IgcButtonComponent;
      this.commitBtn = document.getElementById('commitBtn') as IgcButtonComponent;
      this.discardBtn = document.getElementById('discardBtn') as IgcButtonComponent;
      this.dialog = document.getElementById('dialog') as IgcDialogComponent;
      this.transactionGrid = document.getElementById('transactionGrid') as IgcGridComponent;
      this.typeColumn = document.getElementById('typeColumn') as IgcColumnComponent;
      this.valueColumn = document.getElementById('valueColumn') as IgcColumnComponent;

      this._bind = () => {
        window.addEventListener("load", () => {
          this.loadInitialData();
        });

        this.pager.addEventListener("perPageChange", ((args: CustomEvent<any>) => {
          this.perPage = args.detail;
        }) as EventListener);

        this.pager.addEventListener("pageChange", ((args: CustomEvent<any>) => {
          this.paginate(args.detail);
        }) as EventListener);

        this.actionsColumn.bodyTemplate = this.deleteRowColumnTemplate;
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

        (this.grid as any).transactions.onStateUpdate.subscribe(() => {
          this.undoBtn.disabled = !(this.grid as any).transactions.canUndo;
          this.redoBtn.disabled = !(this.grid as any).transactions.canRedo;
          const hasChanges = (this.grid as any).transactions.getAggregatedChanges(false).length > 0;
          this.commitBtn.disabled = !hasChanges;
          this.discardBtn.disabled = !hasChanges;
        });
      }

      this._bind();
  }

  public deleteRowColumnTemplate = (ctx: IgcCellTemplateContext) => {
    return html`<igc-button variant="contained" @click=${() => this.onDeleteRowClick(ctx.cell.id?.rowID)}>Delete</igc-button>`;
  }

  public typeColumnTemplate = (ctx: IgcCellTemplateContext) => {
    const type = ctx.cell.value as string;
    return html`<span class="transaction--${type.toLowerCase()}">${type.toUpperCase()}</span>`;
  }

  public valueColumnTemplate = (ctx: IgcCellTemplateContext) => {
    return html`<span>${JSON.stringify(ctx.cell.value)}</span>`;
  }

  public onAddRowClick = () => {
    this.totalCount++;
    this.updatePaginatorTotalRecords();
    this.grid.addRow({
      ID: this.addId++,
      ParentID: -1,
      Name: 'New Employee ' + this.randomInt(1, 100),
      Title: 'Employee',
      Age: this.randomInt(20, 60),
      HireDate: new Date(this.randomInt(2000, 2025),
          this.randomInt(0, 11), this.randomInt(1, 25))
          .toISOString().slice(0, 10),
      Phone: '555-' + this.randomInt(1000, 9999),
      OnPTO: this.randomInt(0, 1) === 1
    });
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public onUndoClick = () => {
    this.grid.endEdit(true);
    (this.grid as any).transactions.undo();
    this.computeTotalCount();
    this.preventDisplayingEmptyPages();
  }

  public onRedoClick = () => {
    this.grid.endEdit(true);
    (this.grid as any).transactions.redo();
    this.computeTotalCount();
    this.preventDisplayingEmptyPages();
  }

  public onOpenCommitDialog = () => {
    this.transactionGrid.data = (this.grid as any).transactions.getAggregatedChanges(true);
    this.dialog.show();
  }

  public onCommitClick = () => {
    (this.grid as any).transactions.commit(this.grid.data);
    this._recordsOnServer = this.totalCount;
    this._totalPagesOnServer = Math.floor(this._recordsOnServer / this.perPage);
    this.preventDisplayingEmptyPages();
    this.dialog.hide();
  }

  public onDiscardClick = () => {
    (this.grid as any).transactions.clear();
    this.totalCount = this._recordsOnServer;
    this.updatePaginatorTotalRecords();
    this.preventDisplayingEmptyPages();
    this.dialog.hide();
  }

  public onCancelClick = () => {
    this.dialog.hide();
  }

  public onDeleteRowClick = (rowId: any) => {
    const isAddedRow = !this.grid.data.some((d: any) => d.ID === rowId);
    if (isAddedRow) {
      this.totalCount--;
      this.updatePaginatorTotalRecords();
    }
    this.grid.deleteRow(rowId);
    if (isAddedRow && (this.grid as any).dataView.length === 1) {
      this.paginate(this.page - 1);
    }
  }

  private paginate(page: number): void {
    this.grid.isLoading = true;
    this.grid.endEdit(true);

    // If page is beyond server pages (virtual page for added rows)
    if (page > this._totalPagesOnServer) {
      if (this.page !== this._totalPagesOnServer) {
        const skip = this._totalPagesOnServer * this.perPage;
        this.loadPageData(skip, this.perPage);
      }
      this.grid.isLoading = false;
      this.pager.page = page - this._totalPagesOnServer;
      this.page = page;
      return;
    } else if (this.pager) {
      const newPage = page - this._totalPagesOnServer > -1 ? page - this._totalPagesOnServer : 0;
      this.pager.page = newPage;
    }

    const skip = page * this.perPage;
    this.loadPageData(skip, this.perPage);
    this.page = page;
  }

  private loadInitialData(): void {
    this.grid.isLoading = true;

    RemotePagingService.getDataWithPaging(0, this._perPage)
    .then((response: EmployeesWithPageResponseModel) => {
      this._recordsOnServer = response.totalRecordsCount;
      this.totalCount = response.totalRecordsCount;
      this._totalPagesOnServer = Math.floor(this._recordsOnServer / this._perPage);
      this.pager.perPage = this._perPage;
      this.updatePaginatorTotalRecords();
      this.page = response.pageNumber;
      this.data = response.items;
      this.grid.data = this.data;
      this.grid.isLoading = false;
    })
    .catch((error) => {
      console.error(error.message);
      this.grid.isLoading = false;
    });
  }

  private loadPageData(skip: number, take: number): void {
    const pageIndex = Math.floor(skip / take);

    RemotePagingService.getDataWithPaging(pageIndex, take)
    .then((response: EmployeesWithPageResponseModel) => {
      this.data = response.items;
      this.grid.data = this.data;
      this.grid.isLoading = false;
    })
    .catch((error) => {
      console.error(error.message);
      this.grid.isLoading = false;
    });
  }

  private computeTotalCount(): void {
    const addedRows = (this.grid as any).transactions.getAggregatedChanges(true)
      .filter((rec: any) => rec.type === 'add').length;
    this.totalCount = this._recordsOnServer + addedRows;
    this.updatePaginatorTotalRecords();
  }

  private preventDisplayingEmptyPages(): void {
    this._totalPagesOnServer = Math.floor(this._recordsOnServer / this.perPage);

    const totalPages = Math.floor(this.totalCount / this.perPage);
    if (this.page > 0 &&
        (this.page > totalPages ||
            (this.page === totalPages &&
                this.totalCount % this.perPage === 0))) {
      this.paginate(totalPages - 1);
    }
  }

  private updatePaginatorTotalRecords(): void {
    this.pager.totalRecords = this.totalCount;
    this.grid.totalRecords = this.totalCount;
  }

}

new Sample();
