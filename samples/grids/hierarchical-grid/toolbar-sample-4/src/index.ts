import { IgcHierarchicalGridComponent } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcButtonComponent, IgcIconComponent, registerIconFromText } from 'igniteui-webcomponents';
import { SingersData } from './SingersData';

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

        var button = document.getElementById('clearSort') as IgcButtonComponent;
        button.addEventListener("click", () => {
            hGrid1.clearSort();
        });
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
