import 'igniteui-webcomponents/themes/material.css';
import { defineComponents, IgcButtonComponent } from 'igniteui-webcomponents';
import './ButtonOverviewStyle.css';

export class ButtonOverview {
    constructor() {
        defineComponents(IgcButtonComponent);
    }
}

new ButtonOverview();
