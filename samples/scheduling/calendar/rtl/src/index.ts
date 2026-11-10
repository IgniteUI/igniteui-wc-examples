import { defineComponents, IgcButtonComponent, IgcCalendarComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcButtonComponent, IgcCalendarComponent);

export class CalendarRtl {
    constructor() {
        const button = document.getElementById('toggle-direction') as IgcButtonComponent;
        const container = document.getElementById('calendar-container') as HTMLDivElement;

        button.addEventListener('click', () => {
            container.dir = container.dir === 'rtl' ? 'ltr' : 'rtl';
        });
    }
}

new CalendarRtl();
