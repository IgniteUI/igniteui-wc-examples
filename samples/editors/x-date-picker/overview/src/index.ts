import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcXDatePickerModule } from 'igniteui-webcomponents-inputs';
import { IgcXDatePickerComponent } from 'igniteui-webcomponents-inputs';

ModuleManager.register(IgcXDatePickerModule);

export class DatePickerOverview {

    private datePicker: IgcXDatePickerComponent;

    constructor() {
        this.datePicker = document.getElementById("datePicker") as IgcXDatePickerComponent;
        this.datePicker.value = new Date(Date.now());
    }
}

export function initialize() {
  return new DatePickerOverview();
}