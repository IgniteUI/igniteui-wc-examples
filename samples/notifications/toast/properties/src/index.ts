import { defineComponents, IgcToastComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './ButtonOverviewStyle.css';

defineComponents(IgcToastComponent, IgcButtonComponent);
export class ToastProperties {
    constructor() {
        const toast = document.querySelector('igc-toast') as IgcToastComponent;
    }
}

export function initialize() {
  return new ToastProperties();
}