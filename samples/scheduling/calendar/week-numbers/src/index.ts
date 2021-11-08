import { defineComponents, IgcCalendarComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class CalendarWeekNumbers {
    constructor() {
        defineComponents(IgcCalendarComponent);
    }
}

new CalendarWeekNumbers();
