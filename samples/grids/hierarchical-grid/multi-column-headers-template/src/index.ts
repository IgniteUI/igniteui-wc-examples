import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebHierarchicalGridDescriptionModule, WebColumnGroupDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcHierarchicalGridComponent, IgcColumnGroupComponent } from 'igniteui-webcomponents-grids/grids';
import HierarchicalCustomers from './HierarchicalCustomers.json';
import { IgcGridComponent, IgcColumnTemplateContext, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



export class Sample {

    private hierarchicalGrid: IgcHierarchicalGridComponent
    private columnGroup1: IgcColumnGroupComponent
    private columnGroup2: IgcColumnGroupComponent
    private columnGroup3: IgcColumnGroupComponent
    private columnGroup4: IgcColumnGroupComponent
    private columnGroup5: IgcColumnGroupComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid = this.hierarchicalGrid = document.getElementById('hierarchicalGrid') as IgcHierarchicalGridComponent;
        var columnGroup1 = this.columnGroup1 = document.getElementById('columnGroup1') as IgcColumnGroupComponent;
        var columnGroup2 = this.columnGroup2 = document.getElementById('columnGroup2') as IgcColumnGroupComponent;
        var columnGroup3 = this.columnGroup3 = document.getElementById('columnGroup3') as IgcColumnGroupComponent;
        var columnGroup4 = this.columnGroup4 = document.getElementById('columnGroup4') as IgcColumnGroupComponent;
        var columnGroup5 = this.columnGroup5 = document.getElementById('columnGroup5') as IgcColumnGroupComponent;

        this._bind = () => {
            hierarchicalGrid.data = this.hierarchicalCustomers;
            columnGroup1.headerTemplate = this.webHierarchicalGridColumnGroupHeaderTemplate;
            columnGroup2.headerTemplate = this.webHierarchicalGridColumnGroupHeaderTemplate;
            columnGroup3.headerTemplate = this.webHierarchicalGridColumnGroupHeaderTemplate;
            columnGroup4.headerTemplate = this.webHierarchicalGridColumnGroupHeaderTemplate;
            columnGroup5.headerTemplate = this.webHierarchicalGridColumnGroupHeaderTemplate;
        }
        this._bind();
    }

    private _hierarchicalCustomers: any[] = HierarchicalCustomers;
    public get hierarchicalCustomers(): any[] {
        return this._hierarchicalCustomers;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebHierarchicalGridDescriptionModule.register(context);
            WebColumnGroupDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webHierarchicalGridColumnGroupHeaderTemplate = (ctx: IgcColumnTemplateContext) => {
        const column = (ctx as any).column;
        return html`<div style="display:flex;align-items:center;gap:5px;">
                    <span draggable="false"  @click=${(e: any) => this.toggleColumnGroup(column)}>
                ${this.columnGroupStates.get(column) ? "🔽" : "🔼"}
                    </span>
                        <span>${column.header}</span>
                    </div>`;
    };

    public columnGroupStates = new Map<IgcColumnGroupComponent, boolean>();
    public toggleColumnGroup(columnGroup: IgcColumnGroupComponent) {
        const columns = columnGroup.childColumns;
        if (columnGroup.header === 'General Information') {
            const column = columns[1] as IgcColumnComponent;
            column.hidden = !column.hidden;
        } else if (columnGroup.header === 'Address Information') {
            for (const column of columns) {
                const col = column as IgcColumnComponent;
                if (col.header === "Location"){
                    for (const cl of col.childColumns) {
                        const c = cl as IgcColumnComponent;
                        if (c.field !== "Address"){
                            c.hidden = !c.hidden;
                        }
                    }
                }
                else if (col.header === "Contact Information"){
                    const c = col.childColumns[1] as IgcColumnComponent;
                    c.hidden = !c.hidden;
                }
            }
        } else {
            for (let i = 1; i < columns.length; i++) {
                const c = columns[i] as IgcColumnComponent;
                c.hidden = !c.hidden;
            }
        }
        this.columnGroupStates.set(columnGroup, !this.columnGroupStates.get(columnGroup));
    }
}

new Sample();
