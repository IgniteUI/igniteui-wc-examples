import {defineComponents, IgcSnackbarComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcSnackbarComponent, IgcButtonComponent);
export class SnackbarActionText {
    constructor() {
        const snackbar = document.querySelector('igc-snackbar') as IgcSnackbarComponent;

        document.addEventListener('igcAction', () => {
            snackbar.hide();
        });
    }
}

new SnackbarActionText();
