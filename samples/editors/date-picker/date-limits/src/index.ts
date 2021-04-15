import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDatePickerModule } from 'igniteui-webcomponents-inputs';
import { IgcDatePickerComponent } from 'igniteui-webcomponents-inputs';

ModuleManager.register(IgcDatePickerModule);

export class DatePickerDateLimits {

    private datePicker: IgcDatePickerComponent;

    constructor() {
        this.datePicker = document.getElementById("datePicker") as IgcDatePickerComponent;
        this.datePicker.value = new Date(Date.now());
        let year = this.datePicker.value.getFullYear();
        let month = this.datePicker.value.getMonth();
        let lastDayOfMonth = new Date(year, month + 1, 0);
        this.datePicker.minDate = new Date(year, month, 1);
        this.datePicker.maxDate = lastDayOfMonth;
        this.datePicker.allowTextInput = false;
    }
}

new DatePickerDateLimits();
