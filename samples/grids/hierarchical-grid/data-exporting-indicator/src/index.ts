import { IgcGridToolbarComponent, IgcHierarchicalGridComponent } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcButtonComponent } from 'igniteui-webcomponents';
import { SingersData } from './SingersData';
import 'igniteui-webcomponents-grids/grids/combined';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';


defineComponents(IgcButtonComponent);

export class Sample {
    private hGrid1: IgcHierarchicalGridComponent;

    constructor() {
        var hGrid1 = this.hGrid1 = document.getElementById('hGrid1') as IgcHierarchicalGridComponent;
        hGrid1.data = this.singersData;

        var toolbar = document.getElementById('toolbar') as IgcGridToolbarComponent;
        var button = document.getElementById('simulate') as IgcButtonComponent;
        button.addEventListener('click', () => {
            toolbar.showProgress = true;
            setTimeout(() => {
                toolbar.showProgress = false;
            }, 5000);
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

export function initialize() {
  return new Sample();
}