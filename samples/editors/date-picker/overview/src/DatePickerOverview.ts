import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDatePickerModule } from 'igniteui-webcomponents-inputs';
import { IgcDatePickerComponent } from 'igniteui-webcomponents-inputs';

ModuleManager.register(IgcDatePickerModule);

export class DatePickerOverview {

    private datePicker: IgcDatePickerComponent;

    constructor() {
        this.datePicker = document.getElementById("datePicker") as IgcDatePickerComponent;        
        this.datePicker.value = new Date(Date.now());
    }
}

new DatePickerOverview();
