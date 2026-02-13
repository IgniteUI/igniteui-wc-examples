import { defineComponents, IgcCalendarComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcCalendarComponent);
export class CalendarOverview {
    constructor() {
    }
}

export function initialize() {
  return new CalendarOverview();
}