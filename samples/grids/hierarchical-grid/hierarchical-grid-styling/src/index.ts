import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent } from 'igniteui-webcomponents-grids/grids';
import { SingersDataItem, SingersDataItem_ToursItem, SingersDataItem_AlbumsItem, SingersDataItem_AlbumsItem_SongsItem, SingersData } from './SingersData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hGrid: IgcHierarchicalGridComponent
    private _bind: () => void;

    constructor() {
        var hGrid = this.hGrid = document.getElementById('hGrid') as IgcHierarchicalGridComponent;

        this._bind = () => {
            hGrid.data = this.singersData;
        }
        this._bind();

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
