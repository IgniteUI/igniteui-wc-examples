import {defineComponents, IgcSnackbarComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SnackbarStyling.css';

defineComponents(IgcSnackbarComponent, IgcButtonComponent);
export class SnackbarStyling {
    constructor() {
    }
}

new SnackbarStyling();
