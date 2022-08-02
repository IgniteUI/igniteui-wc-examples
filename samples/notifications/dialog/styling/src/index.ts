import {defineComponents, IgcDialogComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './DialogStyling.css';

defineComponents(IgcDialogComponent, IgcButtonComponent);
export class DialogStyling {
    constructor() {
    }
}

new DialogStyling();
