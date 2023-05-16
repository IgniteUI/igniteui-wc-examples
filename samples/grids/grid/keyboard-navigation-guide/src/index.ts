import 'igniteui-webcomponents-grids/grids/combined';
import { IgcActiveNodeChangeEventArgs, IgcCellType, IgcColumnComponent, IgcColumnGroupComponent, IgcGridComponent, IgcGridMasterDetailContext, SortingDirection } from 'igniteui-webcomponents-grids/grids';
import { InvoicesDataItem, InvoicesData } from './InvoicesData';
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

    private grid: IgcGridComponent
    private list: IgcListComponent
    private _bind: () => void;
    private activeCollection: Item[];

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var list = this.list = document.getElementById('list') as IgcListComponent;
        this.onActiveNodeChange = this.onActiveNodeChange.bind(this);
        this._bind = () => {
            grid.groupingExpressions = [
                {
                    dir: SortingDirection.Asc,
                    fieldName: "City"
                }
            ];
            grid.data = this.invoicesData;
            grid.detailTemplate = this.masterDetailTemplate;
            grid.addEventListener("activeNodeChange", this.onActiveNodeChange)
        }
        this._bind();

    }

    public masterDetailTemplate = (ctx: IgcGridMasterDetailContext) => {
        var data = (ctx as any)["$implicit"];
        return html` <div class="contact-container">
        <span><strong>First Name:</strong> ${data.CustomerFirstName}</span>
        <br />
        <span><strong>Last Name:</strong> ${data.CustomerLastName}</span>
        <br />
        <span><strong>Address:</strong> ${data.CustomerAddress}</span>
        <br />
    </div>`;
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
        this.list.innerHTML = this.listTemplate().values.toString();
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
            const cell = this.grid.getCellByColumnVisibleIndex(activeNode.row, activeNode.column);
            this.toggleCellCombinations(cell);
        }
    }

    public toggleCellCombinations(cell?: IgcCellType) {
        this.activeCollection.forEach(x => x.active = true);
        const actions = this.extractCellActions(cell);
        this.activeCollection.filter(x => actions.indexOf(x.action) === -1 && x.action !== ItemAction.Always)?.forEach(x => x.active = false);
    }

    public extractCellActions(cell: IgcCellType) {
        const res = [];
        if(!cell) return res;
        if (cell?.editable) {
            res.push(ItemAction.Editable);
        }

        res.push(ItemAction.Collapsible);
        return res;
    }

    public extractColumnActions(col: IgcColumnComponent | IgcColumnGroupComponent) {
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

    public onActiveNodeChange(event: IgcActiveNodeChangeEventArgs) {
        const evt = event.detail;
        const gridSection = evt.row < 0 ? GridSection.THEAD : evt.row >= this.grid.data.length ?
        GridSection.FOOTER : GridSection.TBODY;
        this.changeCombinationsCollection(gridSection, evt);
    }

    public listTemplate = () => {
        let htmlContent = "";
        for (const elem of this.activeCollection) {
            const checkbox = elem.completed ? "<igc-checkbox slot='end' checked></igx-checkbox>" : "<igc-checkbox  slot='end'></igx-checkbox>";
            const disabledClass = !elem.active ? "disabled" : "";
            htmlContent += "<igc-list-item class='" + disabledClass +
             "'> <h2 slot='title'>" + elem.title + "</h2>" +
             "<span slot='subtitle'>" +  elem.subTitle +"</span>" +
             checkbox +
             "</igc-list-item>";
        }
        return html`${htmlContent}`;
    }

    private _invoicesData: InvoicesData = null;
    public get invoicesData(): InvoicesData {
        if (this._invoicesData == null)
        {
            this._invoicesData = new InvoicesData();
        }
        return this._invoicesData;
    }

}

new Sample();
