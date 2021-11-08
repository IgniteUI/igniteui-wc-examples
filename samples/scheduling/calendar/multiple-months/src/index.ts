import { defineComponents, IgcCalendarComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class CalendarMultipleMonths {
    constructor() {
        defineComponents(IgcCalendarComponent);
    }
}

new CalendarMultipleMonths();
