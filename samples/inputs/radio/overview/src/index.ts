import { defineComponents, IgcButtonComponent, IgcRadioComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcButtonComponent, IgcRadioComponent, IgcRadioGroupComponent);

export class RadioOverview {
    constructor() {
        document.getElementById('feedback-form')!.addEventListener('submit', (e) => e.preventDefault());
    }
}

new RadioOverview();
