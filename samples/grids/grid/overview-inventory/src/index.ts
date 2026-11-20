import 'igniteui-webcomponents-grids/grids/combined';
import {
    ColumnPinningPosition,
    IgcCellTemplateContext,
    IgcColumnComponent,
    IgcGridComponent,
    SortingDirection
} from 'igniteui-webcomponents-grids/grids';
import {
    defineComponents,
    IgcBadgeComponent,
    IgcChipComponent,
    IgcIconButtonComponent,
    IgcIconComponent,
    IgcLinearProgressComponent,
    registerIconFromText
} from 'igniteui-webcomponents';
import { html } from 'lit-html';
import { OrganicFood, OrganicFoodsData, StockStatus, StorageType } from './OrganicFoodsData';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcBadgeComponent, IgcChipComponent, IgcIconButtonComponent, IgcIconComponent, IgcLinearProgressComponent);

const storageChips: Record<StorageType, { icon: string; variant: string }> = {
    'Chilled': { icon: 'ac_unit', variant: 'info' },
    'Dry': { icon: 'format_color_reset', variant: 'warning' },
    'Ambient': { icon: 'thermostat', variant: 'success' }
};

const statusVariants: Record<StockStatus, string> = {
    'In stock': 'success',
    'Low': 'warning',
    'Out of stock': 'danger'
};

export class Sample {
    private grid: IgcGridComponent;

    constructor() {
        this.registerIcons();

        const grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        const product = document.getElementById('product') as IgcColumnComponent;
        const storage = document.getElementById('storage') as IgcColumnComponent;
        const stockLevel = document.getElementById('stockLevel') as IgcColumnComponent;
        const status = document.getElementById('status') as IgcColumnComponent;
        const unitPrice = document.getElementById('unitPrice') as IgcColumnComponent;
        const retailPrice = document.getElementById('retailPrice') as IgcColumnComponent;
        const actions = document.getElementById('actions') as IgcColumnComponent;

        product.bodyTemplate = this.productTemplate;
        storage.bodyTemplate = this.storageTemplate;
        stockLevel.bodyTemplate = this.stockLevelTemplate;
        status.bodyTemplate = this.statusTemplate;
        actions.bodyTemplate = this.actionsTemplate;

        unitPrice.pipeArgs = { currencyCode: 'EUR', digitsInfo: '1.2-2' };
        retailPrice.pipeArgs = { currencyCode: 'EUR', digitsInfo: '1.2-2' };

        // Pinned to the end, so columns pinned from the toolbar still go to the start.
        actions.pinningPosition = ColumnPinningPosition.End;
        actions.pinned = true;

        grid.data = OrganicFoodsData;
        grid.sortingExpressions = [{ fieldName: 'ProductName', dir: SortingDirection.Asc, ignoreCase: true }];
        grid.groupingExpressions = [{ fieldName: 'Category', dir: SortingDirection.Asc, ignoreCase: true }];
    }

    public productTemplate = (ctx: IgcCellTemplateContext) => {
        const item: OrganicFood = ctx.cell.row.data;
        return html`
            <div class="product">
                <img class="product__photo" src=${item.Image} alt="" />
                <span class="product__name ig-typography__subtitle-2">${item.ProductName}</span>
            </div>
        `;
    };

    public storageTemplate = (ctx: IgcCellTemplateContext) => {
        const item: OrganicFood = ctx.cell.row.data;
        const chip = storageChips[item.Storage];
        return html`
            <igc-chip class="storage" outlined variant=${chip.variant} tabindex="-1">
                <igc-icon slot="prefix" name=${chip.icon} collection="material" aria-hidden="true"></igc-icon>
                ${item.Storage}
            </igc-chip>
        `;
    };

    public stockLevelTemplate = (ctx: IgcCellTemplateContext) => {
        const item: OrganicFood = ctx.cell.row.data;
        return html`
            <igc-linear-progress
                class="stock-level"
                value=${item.StockLevel}
                max="100"
                variant=${item.Status === 'Low' ? 'warning' : 'success'}
                animation-duration="0"
                hide-label
                aria-label=${`Stock level ${item.StockLevel}%`}>
            </igc-linear-progress>
        `;
    };

    public statusTemplate = (ctx: IgcCellTemplateContext) => {
        const item: OrganicFood = ctx.cell.row.data;
        return html`
            <div class="status">
                <igc-badge class="status__dot" dot variant=${statusVariants[item.Status]} aria-hidden="true"></igc-badge>
                <span class="status__text">${item.Status}</span>
            </div>
        `;
    };

    public actionsTemplate = (ctx: IgcCellTemplateContext) => {
        const item: OrganicFood = ctx.cell.row.data;
        return html`
            <div class="actions" @click=${this.keepFromGrid} @keydown=${this.keepFromGrid}>
                <igc-icon-button
                    variant="flat"
                    name="edit"
                    collection="material"
                    aria-label=${`Edit ${item.ProductName}`}
                    @click=${() => this.editRow(item)}>
                </igc-icon-button>
                <igc-icon-button
                    variant="flat"
                    name="delete"
                    collection="material"
                    aria-label=${`Delete ${item.ProductName}`}
                    @click=${() => this.deleteRow(item)}>
                </igc-icon-button>
            </div>
        `;
    };

    /** Clicks and Space/Enter belong to the buttons; the grid would also select the row or edit a cell. */
    private keepFromGrid = (event: Event) => {
        if (!(event instanceof KeyboardEvent) || event.key === ' ' || event.key === 'Enter') {
            event.stopPropagation();
        }
    };

    private editRow(item: OrganicFood): void {
        const firstEditable = this.grid.visibleColumns
            .filter(column => column.editable)
            .sort((a, b) => a.visibleIndex - b.visibleIndex)[0];
        if (!firstEditable) {
            return;
        }
        const cell = this.grid.getCellByKey(item.SKU, firstEditable.field);
        // Make the cell the active one first; otherwise Tab and Escape act on the Actions cell.
        this.grid.navigateTo(cell.row.index, cell.column.visibleIndex, (args: { target: { activate(): void } }) => {
            args.target.activate();
            cell.editMode = true;
        });
    }

    private deleteRow(item: OrganicFood): void {
        this.grid.deleteRow(item.SKU);
    }

    private registerIcons(): void {
        // Material icons as SVG, so the templates need no icon font.
        registerIconFromText('ac_unit', '<svg viewBox="0 0 20 20"><path d="M18.3333 9.16667H14.8583L17.5583 6.46667L16.3833 5.28333L12.5 9.16667H10.8333V7.5L14.7167 3.61667L13.5333 2.44167L10.8333 5.14167V1.66667H9.16667V5.14167L6.46667 2.44167L5.28333 3.61667L9.16667 7.5V9.16667H7.5L3.61667 5.28333L2.44167 6.46667L5.14167 9.16667H1.66667V10.8333H5.14167L2.44167 13.5333L3.61667 14.7167L7.5 10.8333H9.16667V12.5L5.28333 16.3833L6.46667 17.5583L9.16667 14.8583V18.3333H10.8333V14.8583L13.5333 17.5583L14.7167 16.3833L10.8333 12.5V10.8333H12.5L16.3833 14.7167L17.5583 13.5333L14.8583 10.8333H18.3333V9.16667Z"/></svg>', 'material');
        registerIconFromText('format_color_reset', '<svg viewBox="0 0 20 20"><path d="M15 11.6667C15 8.33333 10 2.66667 10 2.66667C10 2.66667 8.89167 3.925 7.725 5.6L14.8833 12.7583C14.9583 12.4083 15 12.0417 15 11.6667ZM14.2667 14.2667L10.4167 10.4167L4.39167 4.39167L3.33333 5.45833L6.1 8.225C5.45833 9.43333 5 10.6583 5 11.6667C5 14.425 7.24167 16.6667 10 16.6667C11.2667 16.6667 12.4167 16.1917 13.3 15.4167L15.4917 17.6083L16.55 16.55L14.2667 14.2667Z"/></svg>', 'material');
        registerIconFromText('thermostat', '<svg viewBox="0 0 20 20"><path d="M12.5 10.8333V4.16667C12.5 2.78333 11.3833 1.66667 10 1.66667C8.61667 1.66667 7.5 2.78333 7.5 4.16667V10.8333C6.49167 11.5917 5.83333 12.8083 5.83333 14.1667C5.83333 16.4667 7.7 18.3333 10 18.3333C12.3 18.3333 14.1667 16.4667 14.1667 14.1667C14.1667 12.8083 13.5083 11.5917 12.5 10.8333ZM9.16667 9.16667V4.16667C9.16667 3.70833 9.54167 3.33333 10 3.33333C10.4583 3.33333 10.8333 3.70833 10.8333 4.16667V5H10V5.83333H10.8333V7.5H10V8.33333H10.8333V9.16667H9.16667Z"/></svg>', 'material');
        registerIconFromText('edit', '<svg viewBox="0 0 18 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 12.9372V15.7497H5.0625L13.3575 7.45468L10.545 4.64218L2.25 12.9372ZM15.5325 5.27968C15.825 4.98718 15.825 4.51468 15.5325 4.22218L13.7775 2.46718C13.485 2.17468 13.0125 2.17468 12.72 2.46718L11.3475 3.83968L14.16 6.65218L15.5325 5.27968Z"/></svg>', 'material');
        registerIconFromText('delete', '<svg viewBox="0 0 18 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25ZM14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3Z"/></svg>', 'material');
    }
}

new Sample();
