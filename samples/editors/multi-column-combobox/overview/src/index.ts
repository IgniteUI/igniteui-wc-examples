import { IgcMultiColumnComboBoxModule } from 'igniteui-webcomponents-data-grids';
import { IgcMultiColumnComboBoxComponent } from 'igniteui-webcomponents-data-grids';
import { IgcColumnWidth } from 'igniteui-webcomponents-data-grids';
import { SortMode } from 'igniteui-webcomponents-data-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SampleComboData } from './SampleComboData';

ModuleManager.register(IgcMultiColumnComboBoxModule);

export class MultiColumnComboBoxOverview {

    private multiColumnComboBox: IgcMultiColumnComboBoxComponent;

    constructor() {

        this.multiColumnComboBox = document.getElementById("comboBox") as IgcMultiColumnComboBoxComponent;
        this.multiColumnComboBox.dataSource = SampleComboData.getPopulation();
        this.multiColumnComboBox.fields = [ "Country", "Pop", "Continent" ];
        this.multiColumnComboBox.textField = "Country";
        this.multiColumnComboBox.sortMode = SortMode.SortByOneColumnOnly;
        this.multiColumnComboBox.placeholder = "Choose a country";
    }
}

export function initialize() {
  return new MultiColumnComboBoxOverview();
}