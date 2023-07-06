import 'igniteui-webcomponents-grids/grids/combined';
import { IgcActiveNodeChangeEventArgs, IgcCellType, IgcColumnComponent, IgcColumnGroupComponent, IgcGridComponent, IgcGridMasterDetailContext, IgcTreeGridComponent, SortingDirection } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDetails } from './EmployeesFlatDetails';
import { html } from 'igniteui-webcomponents-core';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";
import { Item, ItemAction, GridSection } from './Item';
import { defineComponents, IgcListComponent, IgcCheckboxComponent } from 'igniteui-webcomponents';

defineComponents(IgcListComponent, IgcCheckboxComponent);

const theadKeyCombinations = [
    new Item('space key', 'select column', false, ItemAction.Selectable),
    new Item('ctrl + arrow up/down', 'sorts the column asc/desc', false, ItemAction.Sortable),
    new Item('shift + alt + arrow left/right', 'group/ungroup the active column', false, ItemAction.Groupable),
    new Item('alt + arrow left/right/up/down', 'expand/collapse active multi column header',
        false, ItemAction.Collapsible),
    new Item('ctrl + shift + l', 'opens the excel style filtering', false, ItemAction.Filterable),
    new Item('alt + l', 'opens the advanced filtering', false, ItemAction.Filterable)
];

const tbodyKeyCombinations: Item[] = [
    new Item('enter', 'enter in edit mode', false, ItemAction.Editable),
    new Item('alt + arrow left/up', 'collapse master details row', false, ItemAction.Collapsible),
    new Item('alt + arrow right/down', 'expand master details row', false, ItemAction.Collapsible),
    new Item('alt + arrow right/left', 'expand/collapse the group row', false, ItemAction.Expandable),
    new Item('ctrl + Home/End', 'navigates to the upper-left/bottom-right cell', false, ItemAction.Always)
];

const summaryCombinations: Item[] = [
    new Item('ArrowLeft', 'navigates one summary cell left', false, ItemAction.Always),
    new Item('ArrowRight', 'navigates one summary cell right', false, ItemAction.Always),
    new Item('Home', 'navigates to the first summary cell', false, ItemAction.Always),
    new Item('End', 'navigates to the last summary cell', false, ItemAction.Always)
];


export class Sample {

    private grid: IgcTreeGridComponent;
    private list: IgcListComponent;
    private activeCollection: Item[];
    private gridSection: GridSection;
    private activeNode: any;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcTreeGridComponent;
        var list = this.list = document.getElementById('list') as IgcListComponent;
        this.onActiveNodeChange = this.onActiveNodeChange.bind(this);
        this.gridKeydown = this.gridKeydown.bind(this);
        this.keydown = this.keydown.bind(this);
        grid.data = this.data;
        grid.addEventListener("activeNodeChange", this.onActiveNodeChange);
        grid.addEventListener("gridKeydown", this.gridKeydown);
        grid.addEventListener("keydown", this.keydown);
    }
    public changeCombinationsCollection(gridSection: GridSection, evt: any) {
        switch (gridSection) {
            case GridSection.THEAD:
                this.activeCollection = theadKeyCombinations;
                this.toggleHeaderCombinations(evt);

                break;
            case GridSection.TBODY:
                this.activeCollection = tbodyKeyCombinations;
                this.toggleBodyCombinations(evt);
                break;
            case GridSection.FOOTER:
                this.activeCollection = summaryCombinations;
                break;
            default:
                this.activeCollection = [];
                return;
        }
        this.updateList();
    }

    public updateList() {
        this.list.innerHTML = this.listTemplate();
    }

    public toggleHeaderCombinations(activeNode: any) {
        const currColumn = this.grid.columns
            .find(c => c.visibleIndex === activeNode.column && c.level === activeNode.level);
        this.activeCollection.forEach(x => x.active = true);
        const actions = this.extractColumnActions(currColumn);
        this.activeCollection.filter(x => actions.indexOf(x.action) === -1 && x.action !== ItemAction.Always)?.forEach(x => x.active = false);
    }

    public toggleBodyCombinations(activeNode: any) {
        const rowRef = this.grid.getRowByIndex(activeNode.row);

        if (rowRef.isGroupByRow) {
            this.activeCollection.forEach(x => x.active = false);
            this.activeCollection.filter(x => x.action === ItemAction.Expandable || x.action === ItemAction.Always)?.forEach(x => x.active = true);
        } else {
            const currColumn = this.grid.columns.filter(x => !x.columnGroup)
            .find(c => c.visibleIndex === activeNode.column);
            const cell = this.grid.getCellByColumn(activeNode.row, currColumn.field);
            this.toggleCellCombinations(cell);
        }
    }

    public toggleCellCombinations(cell?: IgcCellType) {
        this.activeCollection.forEach(x => x.active = true);
        const actions = this.extractCellActions(cell);
        this.activeCollection.filter(x => actions.indexOf(x.action) === -1 && x.action !== ItemAction.Always)?.forEach(x => x.active = false);
    }

    public extractCellActions(cell: IgcCellType) {
        const res: any[] = [];
        if(!cell) return res;
        if (cell?.editable) {
            res.push(ItemAction.Editable);
        }

        res.push(ItemAction.Collapsible);
        return res;
    }

    public extractColumnActions(col: IgcColumnComponent & IgcColumnGroupComponent) {
        const res = [];
        if (col.sortable) {
            res.push(ItemAction.Sortable);
        }

        if (col.filterable && !col.columnGroup) {
            res.push(ItemAction.Filterable);
        }

        if (col.collapsible) {
            res.push(ItemAction.Collapsible);
        }

        if (col.groupable) {
            res.push(ItemAction.Groupable);
        }

        if (col.selectable) {
            res.push(ItemAction.Selectable);
        }

        return res;
    }

    public onActiveNodeChange(event: any) {
        const evt = (event as any).detail;
        this.activeNode = evt;
        const row = this.grid.getRowByIndex(evt.row);
        this.gridSection = evt.row < 0 ? GridSection.THEAD : row === undefined || row.isSummaryRow ?
        GridSection.FOOTER : GridSection.TBODY;
        this.changeCombinationsCollection(this.gridSection, evt);
    }

    public keydown(event: any) {
        const key = event.key.toLowerCase();
        if (key === 'tab') { return; }
        if (this.gridSection === GridSection.FOOTER) {
            switch (key) {
                case 'end':
                    this.activeCollection.at(3).completed = true;
                    break;
                case 'home':
                    this.activeCollection.at(2).completed = true;
                    break;
                case 'arrowleft':
                    this.activeCollection.at(0).completed = true;
                    break;
                case 'arrowright':
                    this.activeCollection.at(1).completed = true;
                    break;
                default:
                    break;
            }
            return;
        }

        const activeNode = this.activeNode;
        if (this.gridSection === GridSection.THEAD) {
            if (key === 'l' && event.altKey) {
                this.activeCollection.at(5).completed = true;
            }
            const col = this.grid.columns
            .find(c => c.visibleIndex === activeNode.column && c.level === activeNode.level);
            if (key === 'l' && event.ctrlKey && event.shiftKey && col && !col.columnGroup && col.filterable) {
                this.activeCollection.at(4).completed = true;
            }

            if ((key === 'arrowleft' || key === 'arrowright') && event.altKey && event.shiftKey &&
                col && !col.columnGroup && col.groupable) {
                this.activeCollection.at(2).completed = true;
            }

            if ((key === 'arrowup' || key === 'arrowdown') && event.ctrlKey) {
                if (col && !col.columnGroup && col.sortable) {
                    this.activeCollection.at(1).completed = true;
                }
            }

            if (key === " ") {
                this.activeCollection.at(0).completed = true;
            }

            if (col && col.columnGroup && (key === 'arrowup' || key === 'arrowdown' || key === 'arrowleft' || key === 'arrowright') && event.altKey) {
                this.activeCollection.at(3).completed = true;
            }
        }

        if (this.gridSection === GridSection.TBODY) {
            if (key === 'enter') {
                const currColumn = this.grid.columns.filter(x => !x.columnGroup)
                .find(c => c.visibleIndex === activeNode.column);
                const cell = this.grid.getCellByColumn(activeNode.row, currColumn.field);
                if (cell && cell.column.editable) {
                    this.activeCollection.at(0).completed = true;
                }
            }
            if ((key === 'end' || key === 'home') && event.ctrlKey) {
                this.activeCollection.at(4).completed = true;
            }
            const rowRef = this.grid.getRowByIndex(activeNode.row);
            const isGroupByRow = rowRef.isGroupByRow;
            if (!isGroupByRow && (key === 'arrowdown' || key === 'arrowright') && event.altKey) {
                this.activeCollection.at(2).completed = true;
            }

            if (!isGroupByRow && (key === 'arrowup' || key === 'arrowleft') && event.altKey) {
                this.activeCollection.at(1).completed = true;
            }

            if (isGroupByRow &&  (key === 'arrowright' || key === 'arrowleft') && event.altKey ) {
                this.activeCollection.at(3).completed = true;
            }
        }
        this.updateList();
    }

    public gridKeydown(event: any) {
        const evt = event.detail.event;
       this.keydown(evt);
    }


    public listTemplate = () => {
        let htmlContent = "";
        (window as any).onChangeHandler = (i: number) => {
            this.activeCollection.at(i).completed = (event.currentTarget as any).checked;
        }
        let i = 0;
        const headerText = this.gridSection === GridSection.THEAD ? "HEADER COMBINATIONS" : this.gridSection === GridSection.TBODY ? "BODY COMBINATIONS" : "SUMMARY COMBINATIONS";
        const header = "<igc-list-header><h1>"+ headerText +"</h1></igc-list-header>";
        htmlContent += header;
        for (const elem of this.activeCollection) {
            const checkbox = elem.completed ? "<input type='checkbox' slot='end' checked onchange='onChangeHandler("+i+")'></input>" : "<input type='checkbox' onchange='onChangeHandler("+i+")' slot='end'></input>";
            const disabledClass = !elem.active ? "disabled" : "";
            htmlContent += "<igc-list-item class='" + disabledClass +
             "'> <h2 slot='title'>" + elem.title + "</h2>" +
             "<span slot='subtitle'>" +  elem.subTitle +"</span>" +
             checkbox +
             "</igc-list-item>";
             i++;
        }
        return htmlContent;
    }

    private _data: EmployeesFlatDetails = null;
    public get data(): EmployeesFlatDetails {
        if (this._data == null)
        {
            this._data = new EmployeesFlatDetails();
        }
        return this._data;
    }

}

new Sample();
