import { defineComponents, IgcDatePickerComponent, IgcInputComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './DatePickerStyling.css';

defineComponents(IgcDatePickerComponent, IgcInputComponent);

export class DatePickerDialogMode {
    constructor() {
    }
}

new DatePickerDialogMode();
