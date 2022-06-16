import { defineComponents, IgcToastComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcToastComponent, IgcButtonComponent);
export class ToastOverview {
    constructor() {
        const toast = document.querySelector('igc-toast') as IgcToastComponent;
    }
}

new ToastOverview();
