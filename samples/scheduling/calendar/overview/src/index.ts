import { defineComponents, IgcCalendarComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class CalendarOverview {
    constructor() {
        defineComponents(IgcCalendarComponent);
    }
}

new CalendarOverview();
