import './CalendarStyling.css'
import { defineComponents, IgcCalendarComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class CalendarStyling {
    constructor() {
        defineComponents(IgcCalendarComponent);
    }
}

new CalendarStyling();
