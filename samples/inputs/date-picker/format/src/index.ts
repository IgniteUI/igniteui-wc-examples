import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDatePickerModule } from 'igniteui-webcomponents-inputs';
import { IgcDatePickerComponent } from 'igniteui-webcomponents-inputs';

ModuleManager.register(IgcDatePickerModule);

export class DatePickerFormat {

    private datePicker: IgcDatePickerComponent;

    constructor() {
        this.datePicker = document.getElementById("datePicker") as IgcDatePickerComponent;
        this.datePicker.value = new Date(Date.now());
        this.datePicker.allowTextInput = false;
        let dateFormat1 = document.getElementById('dateFormat');
        dateFormat1!.addEventListener('change', this.onDateFormatChanged);
    }

    public onDateFormatChanged = (e: any) => {
        const dateFormatMode = e.target.value.toString();
        this.datePicker.dateFormat = dateFormatMode;
    }

    public onDatePickerRef(datePicker: IgcDatePickerComponent) {
        this.datePicker = datePicker;
    }
}

new DatePickerFormat();
