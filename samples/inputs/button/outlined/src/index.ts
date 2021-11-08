import 'igniteui-webcomponents/themes/material.css';
import { defineComponents, IgcButtonComponent } from 'igniteui-webcomponents';

export class OutlinedButton {
    constructor() {
        defineComponents(IgcButtonComponent);
    }
}

new OutlinedButton();
