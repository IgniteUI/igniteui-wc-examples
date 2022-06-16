import { defineComponents, IgcToastComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './ToastStyling.css';

defineComponents(IgcToastComponent, IgcButtonComponent);
export class ToastStyling {
    constructor() {
        const toast = document.querySelector('igc-toast') as IgcToastComponent;
    }
}

new ToastStyling();
