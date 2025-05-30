import { defineComponents, IgcIconComponent, IgcDateTimeInputComponent, registerIconFromText, DatePartDeltas, DatePart } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './DateTimeInputStyle.css'

defineComponents(IgcIconComponent, IgcDateTimeInputComponent);

const upIcon =
'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5z"/></svg>';

const downIcon =
'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>';

const clearIcon =
'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';

export class DateTimeInputStyling {
    constructor() {
        const input = document.getElementById('dateTimeInput') as IgcDateTimeInputComponent;

        const spinDelta: DatePartDeltas = {
            date: 2,
            month: 3,
            year: 10,
        };

        input.spinDelta = spinDelta;

        const up = document.getElementById('up');
        const down = document.getElementById('down');

        up!.addEventListener('click', () => {
            input.stepUp("month" as DatePart);
        });

        down!.addEventListener('click', () => {
            input.stepDown("date" as DatePart);
        });

        registerIconFromText("up", upIcon);
        registerIconFromText("down", downIcon);
        registerIconFromText("clear", clearIcon);
    }
}

new DateTimeInputStyling();
