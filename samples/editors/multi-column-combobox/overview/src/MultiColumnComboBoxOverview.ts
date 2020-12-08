import { IgcMultiColumnComboBoxModule } from 'igniteui-webcomponents-grids';
import { IgcMultiColumnComboBoxComponent } from 'igniteui-webcomponents-grids';
import { SortMode } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SampleComboData } from './SampleComboData';

ModuleManager.register(IgcMultiColumnComboBoxModule);

export class MultiColumnComboBoxOverview {

    private multiColumnComboBox: IgcMultiColumnComboBoxComponent;

    constructor() {

        this.multiColumnComboBox = document.getElementById("comboBox") as IgcMultiColumnComboBoxComponent;
        this.multiColumnComboBox.dataSource = SampleComboData.getPopulation();
        this.multiColumnComboBox.textField = "country";
        // this.multiColumnComboBox.sortMode = SortMode.SortByOneColumnOnly;
        this.multiColumnComboBox.placeholder = "Choose a country";
    }

}

new MultiColumnComboBoxOverview();
