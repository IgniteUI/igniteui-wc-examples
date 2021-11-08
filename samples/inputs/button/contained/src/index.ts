import 'igniteui-webcomponents/themes/material.css';
import { defineComponents, IgcButtonComponent } from 'igniteui-webcomponents';

export class ContainedButton {
    constructor() {
        defineComponents(IgcButtonComponent);
    }
}

new ContainedButton();
