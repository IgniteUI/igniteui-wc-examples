import { defineComponents, IgcCalendarComponent, IgcRadioComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcCalendarComponent, IgcRadioComponent, IgcRadioGroupComponent);
export class CalendarSize {

    private calendar: IgcCalendarComponent;
    private radios: NodeListOf<IgcRadioComponent>;

    constructor() {
        this.calendar = document.getElementById('calendar1') as IgcCalendarComponent;

        this.radios = document.querySelectorAll('igc-radio') as NodeListOf<IgcRadioComponent>;
        this.radios.forEach(radio => {
            radio.addEventListener('igcChange', () => {
                if (radio.checked) {
                    this.calendar.style.setProperty('--ig-size', `var(--ig-size-${radio.value})`);
                }
            });
        })
    }
}

export function initialize() {
  return new CalendarSize();
}