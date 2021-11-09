import 'igniteui-webcomponents/themes/material.css';
import { defineComponents, IgcButtonComponent } from 'igniteui-webcomponents';

export class FlatButton {
    constructor() {
        defineComponents(IgcButtonComponent);
    }
}

new FlatButton();
