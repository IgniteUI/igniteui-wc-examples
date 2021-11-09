import 'igniteui-webcomponents/themes/material.css';
import { defineComponents, IgcButtonComponent } from 'igniteui-webcomponents';
export class FloatingActionButton {
    constructor() {
        defineComponents(IgcButtonComponent);
    }
}

new FloatingActionButton();
