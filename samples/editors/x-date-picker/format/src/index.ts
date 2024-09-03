import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcXDatePickerModule } from 'igniteui-webcomponents-inputs';
import { IgcXDatePickerComponent } from 'igniteui-webcomponents-inputs';

ModuleManager.register(IgcXDatePickerModule);

export class DatePickerFormat {

    private datePicker: IgcXDatePickerComponent;

    constructor() {
        this.datePicker = document.getElementById("datePicker") as IgcXDatePickerComponent;
        this.datePicker.value = new Date(Date.now());
        this.datePicker.allowTextInput = false;
        let dateFormat1 = document.getElementById('dateFormat');
        dateFormat1!.addEventListener('change', this.onDateFormatChanged);
    }

    public onDateFormatChanged = (e: any) => {
        const dateFormatMode = e.target.value.toString();
        this.datePicker.dateFormat = dateFormatMode;
    }

    public onDatePickerRef(datePicker: IgcXDatePickerComponent) {
        this.datePicker = datePicker;
    }
}

new DatePickerFormat();
