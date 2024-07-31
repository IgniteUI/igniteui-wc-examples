import { defineComponents, IgcDatePickerComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcDatePickerComponent);

export class DatePickerDialogMode {
    constructor() {
        let datePicker = document.getElementById('date-picker') as IgcDatePickerComponent;
        const date = new Date();
        datePicker.value = date;
    }   
}

new DatePickerDialogMode();
