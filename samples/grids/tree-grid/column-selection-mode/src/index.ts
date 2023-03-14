import 'igniteui-webcomponents-grids/grids/combined';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { FoodsDataItem, FoodsData } from './FoodsData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
defineAllComponents();

export class Sample {

    private propertyEditor: IgcPropertyEditorPanelComponent
    private columnSelectionEditor: IgcPropertyEditorPropertyDescriptionComponent
    private treeGrid: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var columnSelectionEditor = this.columnSelectionEditor = document.getElementById('columnSelectionEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer
            propertyEditor.target = this.treeGrid
            treeGrid.data = this.foodsData
        }
        this._bind();

    }

    private _foodsData: FoodsData = null;
    public get foodsData(): FoodsData {
        if (this._foodsData == null)
        {
            this._foodsData = new FoodsData();
        }
        return this._foodsData;
    }

}

new Sample();
