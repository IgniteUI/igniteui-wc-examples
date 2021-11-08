import { defineComponents, IgcCalendarComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class CalendarRangeSelection {
    constructor() {
        defineComponents(IgcCalendarComponent);
    }
}

new CalendarRangeSelection();
