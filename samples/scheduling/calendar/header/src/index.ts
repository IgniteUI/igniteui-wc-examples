import { defineComponents, IgcCalendarComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class CalendarHeader {
    constructor() {
        defineComponents(IgcCalendarComponent);
    }
}

new CalendarHeader();
