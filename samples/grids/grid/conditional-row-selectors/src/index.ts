import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';
import { IgcRowSelectionEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

export class Sample {

    private grid: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        this.webGridRowSelectionConditional = this.webGridRowSelectionConditional.bind(this);

        this._bind = () => {
            grid.data = this.customersData;
            grid.addEventListener("rowSelectionChanging", this.webGridRowSelectionConditional);
        }
        this._bind();

    }

    private _customersData: CustomersData = null;
    public get customersData(): CustomersData {
        if (this._customersData == null)
        {
            this._customersData = new CustomersData();
        }
        return this._customersData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridRowSelectionConditional(event: any): void {
        console.log(event);
        if (!event.added.length && event.removed.length) {
            // ignore de-select
            return;
        }
        var grid = this.grid;
        const originalAddedLength = event.added.length;

        // only allow selection of items that contain 'A'
        event.newSelection = event.newSelection.filter(x => x.ID.indexOf('A') !== -1);

        // cleanup selection if all conditionally selectable rows are already selected
        if (event.newSelection.length
            && !event.newSelection.filter(x => event.oldSelection.indexOf(x) === -1).length
            && originalAddedLength > 1) {
                // all selected from header, de-select instead
                event.newSelection = [];
        }
        grid.markForCheck();
    }

}

new Sample();
