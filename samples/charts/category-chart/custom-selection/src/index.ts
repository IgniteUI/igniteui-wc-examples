import { IgcDataLegendModule, IgcCategoryChartModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcDataLegendComponent, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { SelectableDataItem, SelectableData } from './SelectableData';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcDataLegendModule,
    IgcCategoryChartModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private legend: IgcDataLegendComponent
    private chart: IgcCategoryChartComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcDataLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.categoryChartCustomSelectionPointerDown = this.categoryChartCustomSelectionPointerDown.bind(this);

        this._bind = () => {
            legend.target = this.chart;
            chart.dataSource = this.selectableData;
            chart.seriesPointerDown = this.categoryChartCustomSelectionPointerDown;
        }
        this._bind();

    }

    private _selectableData: SelectableData = null;
    public get selectableData(): SelectableData {
        if (this._selectableData == null)
        {
            this._selectableData = new SelectableData();
        }
        return this._selectableData;
    }


    public categoryChartCustomSelectionPointerDown(o: any, e: any): void {
    let oldItem = e.item as SelectableDataItem;

        if (oldItem === null) return;

        let newItem: SelectableDataItem = new SelectableDataItem({
            category: oldItem.category,
            dataValue: oldItem.dataValue,
            selectedValue: oldItem.selectedValue
        });

        var selectedIndex = -1;
        for (var i = 0; i < this.selectableData.length; i++) {
            if (oldItem.category === this.selectableData[i].category) {
                selectedIndex = i;
                break;
            }
        }

        if (oldItem.selectedValue === oldItem.dataValue)
            newItem.selectedValue = null;
        else
            newItem.selectedValue = newItem.dataValue;

        this.chart.notifySetItem(this.selectableData, selectedIndex, oldItem, newItem);
    }

}

new Sample();
