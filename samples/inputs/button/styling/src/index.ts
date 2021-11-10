import 'igniteui-webcomponents/themes/material.css';
import { defineComponents, IgcButtonComponent } from 'igniteui-webcomponents';
import './ButtonStyle.css';

export class ButtonStyling {
    constructor() {
        defineComponents(IgcButtonComponent);
    }
}

new ButtonStyling();
