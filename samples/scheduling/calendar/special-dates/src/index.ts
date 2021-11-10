import { defineComponents, IgcCalendarComponent, DateRangeType } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

defineComponents(IgcCalendarComponent);
export class CalendarSpecialDates {

    private calendar: IgcCalendarComponent;

    constructor() {
        this.calendar = document.getElementById('calendar1') as IgcCalendarComponent;

        const today = new Date();
        const range = [
            new Date(today.getFullYear(), today.getMonth(), 3),
            new Date(today.getFullYear(), today.getMonth(), 8)
        ];
        this.calendar.specialDates = [{ type: DateRangeType.Between, dateRange: range }];
    }
}

new CalendarSpecialDates();
