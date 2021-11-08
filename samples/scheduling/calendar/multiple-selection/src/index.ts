import { defineComponents, IgcCalendarComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class CalendarMultipleSelection {
    constructor() {
        defineComponents(IgcCalendarComponent);
    }
}

new CalendarMultipleSelection();
