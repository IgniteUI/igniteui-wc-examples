import { defineComponents, IgcIconComponent, IgcDateTimeInputComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcIconComponent, IgcDateTimeInputComponent);

const upIcon =
'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5z"/></svg>';

const downIcon =
'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>';

const clearIcon =
'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';

export class DateTimeInputInputFormatDisplayFormat {
    constructor() {
        registerIconFromText("up", upIcon);
        registerIconFromText("down", downIcon);
        registerIconFromText("clear", clearIcon);
    }
}

new DateTimeInputInputFormatDisplayFormat();
