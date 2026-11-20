import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent, IgcRowSelectorTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcCheckboxComponent } from 'igniteui-webcomponents';
import { html } from 'lit-html';
import { EmployeesFlatDataItem, EmployeesFlatData } from './EmployeesFlatData';
import { IgcRowSelectionEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

defineComponents(IgcCheckboxComponent);

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        this.webTreeGridRowSelectionConditional = this.webTreeGridRowSelectionConditional.bind(this);

        this._bind = () => {
            treeGrid.data = this.employeesFlatData;
            treeGrid.rowSelectorTemplate = this.webTreeGridRowSelectorTemplate;
            treeGrid.addEventListener("rowSelectionChanging", this.webTreeGridRowSelectionConditional);
        }
        this._bind();

    }

    private _employeesFlatData: EmployeesFlatData = null;
    public get employeesFlatData(): EmployeesFlatData {
        if (this._employeesFlatData == null)
        {
            this._employeesFlatData = new EmployeesFlatData();
        }
        return this._employeesFlatData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebTreeGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webTreeGridRowSelectorTemplate = (ctx: IgcRowSelectorTemplateContext) => {
        const employee = this.employeesFlatData.find(item => item.ID === ctx.implicit.key);
        return html`<div class="igx-grid__cbx-padding">
            <igc-checkbox
                class="row-selector"
                aria-label=${ctx.implicit.selected ? 'Deselect row' : 'Select row'}
                tabindex="-1"
                ?checked=${ctx.implicit.selected}
                ?disabled=${employee?.OnPTO !== true}></igc-checkbox>
        </div>`;
    };

    public webTreeGridRowSelectionConditional(eventArgs: CustomEvent<IgcRowSelectionEventArgs>): void {
        const event = eventArgs.detail;
        if (!event.added.length && event.removed.length) {
            // ignore de-select
            return;
        }
        const originalAddedLength = event.added.length;

        // Only allow selection for employees on PTO.
        event.newSelection = event.newSelection.filter(x => x.OnPTO === true);

        // cleanup selection if all conditionally selectable rows are already selected
        if (event.newSelection.length
            && !event.newSelection.filter((x: any) => event.oldSelection.indexOf(x) === -1).length
            && originalAddedLength > 1) {
                // all selected from header, de-select instead
                event.newSelection = [];
        }
    }

}

new Sample();
