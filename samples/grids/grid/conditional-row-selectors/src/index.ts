import 'igniteui-webcomponents-grids/grids/combined';
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
            grid.data = this.customersData
            // grid.addEventListener("rowSelectionChanging", this.webGridRowSelectionConditional)
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




    public webGridRowSelectionConditional(event: IgcRowSelectionEventArgs): void {
        console.log(event);
        if (!event.added.length && event.removed.length) {
            // ignore deselect
            return;
        }
        var grid = this.grid;
        const originalAddedLength = event.added.length;

        // only allow selection of items that contain 'A'
        event.newSelection = event.newSelection.filter(x => x.indexOf('A') !== -1);

        // cleanup selection if all conditionally selectable rows are already selected
        if (event.newSelection.length
            && !event.newSelection.filter(x => event.oldSelection.indexOf(x) === -1).length
            && originalAddedLength > 1) {
                // all selected from header, deselect instead
                event.newSelection = [];
        }
        grid.markForCheck();
    }

}

new Sample();
