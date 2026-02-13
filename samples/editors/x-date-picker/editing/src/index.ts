import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcXDatePickerModule } from 'igniteui-webcomponents-inputs';
import { IgcXDatePickerComponent } from 'igniteui-webcomponents-inputs';

ModuleManager.register(IgcXDatePickerModule);

export class DatePickerEditing {

    private datePicker: IgcXDatePickerComponent;

    constructor() {
        this.datePicker = document.getElementById("datePicker") as IgcXDatePickerComponent;
        this.datePicker.value = new Date(Date.now());
        this.datePicker.allowTextInput = true;
    }
}

export function initialize() {
  return new DatePickerEditing();
}