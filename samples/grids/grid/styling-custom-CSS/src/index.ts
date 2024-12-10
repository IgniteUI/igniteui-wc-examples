import { LocalDataItem, LocalData } from './SampleData';
import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



export class Sample {

    private grid: IgcGridComponent
    private category: IgcColumnComponent
    private marketShare: IgcColumnComponent
    private summary: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var category = this.category = document.getElementById('Category') as IgcColumnComponent;
        var marketShare = this.marketShare = document.getElementById('MarketShare') as IgcColumnComponent;
        var summary = this.summary = document.getElementById('Summary') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.localData;
        }
        this._bind();
    }

    private _localData: LocalData = null;
    public get localData(): LocalData {
        if (this._localData == null)
        {
            this._localData = new LocalData();
        }
        return this._localData;
    }

}

new Sample();
