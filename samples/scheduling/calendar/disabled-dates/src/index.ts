import IgcCalendarComponent from 'igniteui-webcomponents/components/calendar/calendar';
import 'igniteui-webcomponents/components/calendar/calendar';
import 'igniteui-webcomponents/themes/material.css';
import { DateRangeType } from 'igniteui-webcomponents/components/calendar/common/calendar.model';

export class CalendarDisabledDates {

    private calendar: IgcCalendarComponent;

    constructor() {
        this.calendar = document.getElementById('calendar1') as IgcCalendarComponent;

        const today = new Date();
        const range = [
            new Date(today.getFullYear(), today.getMonth(), 3),
            new Date(today.getFullYear(), today.getMonth(), 8)
        ];

        this.calendar.disabledDates = [{ type: DateRangeType.Between, dateRange: range }];
    }
}

new CalendarDisabledDates();