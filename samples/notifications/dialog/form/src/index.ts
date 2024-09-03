import { defineComponents, IgcDialogComponent, IgcButtonComponent, IgcInputComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcDialogComponent, IgcButtonComponent, IgcInputComponent);

const userIcon =
'<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"/></svg>';

const passwordIcon =
'<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0151 13.6556C14.8093 14.3587 16.9279 13.9853 18.3777 12.5355C20.3304 10.5829 20.3304 7.41709 18.3777 5.46447C16.4251 3.51184 13.2593 3.51184 11.3067 5.46447C9.85687 6.91426 9.48353 9.03288 10.1866 10.8271M12.9964 13.6742L6.82843 19.8422L4.2357 19.6065L4 17.0138L10.168 10.8458M15.5493 8.31568V8.29289" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export class DialogForm {
    constructor() {
        registerIconFromText("username", userIcon);
        registerIconFromText("password", passwordIcon);
    }
}

new DialogForm();
