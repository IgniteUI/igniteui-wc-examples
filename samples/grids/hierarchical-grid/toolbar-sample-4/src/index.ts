import { IgcGridToolbarTemplateContext, IgcHierarchicalGridComponent, IgcRowIslandComponent } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcButtonComponent, IgcIconComponent, registerIconFromText } from 'igniteui-webcomponents';
import { SingersData } from './SingersData';
import { html } from 'lit-html';
import 'igniteui-webcomponents-grids/grids/combined';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';


defineComponents(IgcButtonComponent, IgcIconComponent);

const icon = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>`;

export class Sample {
    private hGrid1: IgcHierarchicalGridComponent;

    constructor() {
        registerIconFromText('clear', icon, 'material');

        var hGrid1 = this.hGrid1 = document.getElementById('hGrid1') as IgcHierarchicalGridComponent;
        hGrid1.data = this.singersData;

        var rowIsland1 = document.getElementById('rowIsland1') as IgcRowIslandComponent;
        rowIsland1.toolbarTemplate = this.rowIslandToolbarTemplate;

        var button = document.getElementById('clearSort') as IgcButtonComponent;
        button.addEventListener("click", () => {
            hGrid1.clearSort();
        });
    }

    public rowIslandToolbarTemplate = (ctx: IgcGridToolbarTemplateContext) => {
        return html`<igc-grid-toolbar>
            <igc-grid-toolbar-title>Albums</igc-grid-toolbar-title>
            <igc-button @click="${() => ctx.implicit.clearSort()}">
                <igc-icon name="clear" collection="material"></igc-icon>Clear Sort
            </igc-button>
            <igc-grid-toolbar-actions>
                <igc-grid-toolbar-hiding></igc-grid-toolbar-hiding>
            </igc-grid-toolbar-actions>
        </igc-grid-toolbar>`;
    }

    private _singersData: SingersData = null;
    public get singersData(): SingersData {
        if (this._singersData == null)
        {
            this._singersData = new SingersData();
        }
        return this._singersData;
    }
}

new Sample();
