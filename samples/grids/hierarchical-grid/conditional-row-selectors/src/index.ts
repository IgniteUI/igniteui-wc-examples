import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebHierarchicalGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcHierarchicalGridComponent, IgcPaginatorComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcRowSelectionEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid: IgcHierarchicalGridComponent
    private paginator: IgcPaginatorComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid = this.hierarchicalGrid = document.getElementById('hierarchicalGrid') as IgcHierarchicalGridComponent;
        this.webHierarchicalGridRowSelectionConditional = this.webHierarchicalGridRowSelectionConditional.bind(this);
        var paginator = this.paginator = document.getElementById('paginator') as IgcPaginatorComponent;

        this._bind = () => {
            hierarchicalGrid.data = this.singersData;
            hierarchicalGrid.addEventListener("rowSelectionChanging", this.webHierarchicalGridRowSelectionConditional);
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebHierarchicalGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webHierarchicalGridRowSelectionConditional(eventArgs: CustomEvent<IgcRowSelectionEventArgs>): void {
        const event = eventArgs.detail;
        if (!event.added.length && event.removed.length) {
            // ignore de-select
            return;
        }
        var grid = this.hierarchicalGrid;
        const originalAddedLength = event.added.length;

        // only allow selection of items that has grammy award
        event.newSelection = event.newSelection.filter((x: any) => x.HasGrammyAward);

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
