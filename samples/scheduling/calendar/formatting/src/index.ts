import IgcCalendarComponent from 'igniteui-webcomponents/components/calendar/calendar';
import IgcRadioComponent from 'igniteui-webcomponents/components/radio/radio';
import 'igniteui-webcomponents/components/radio-group/radio-group';
import 'igniteui-webcomponents/components/radio/radio';
import 'igniteui-webcomponents/components/calendar/calendar';
import 'igniteui-webcomponents/themes/material.css';

export class CalendarFormatting {

    private calendar: IgcCalendarComponent;
    private radios: NodeListOf<IgcRadioComponent>;

    constructor() {
        this.calendar = document.getElementById('calendar1') as IgcCalendarComponent;
        this.calendar.formatOptions = {
            month: 'short',
            weekday: 'short'
        };
        this.calendar.value = new Date();

        this.radios = document.querySelectorAll('igc-radio') as NodeListOf<IgcRadioComponent>;
        this.radios.forEach(radio => {
            radio.addEventListener('igcChange', () => {
                if (radio.checked) {
                    this.calendar.locale = radio.value;
                }
            });
        })
    }
}

new CalendarFormatting();