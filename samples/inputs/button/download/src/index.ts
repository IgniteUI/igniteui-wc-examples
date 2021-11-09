import 'igniteui-webcomponents/themes/material.css';
import { defineComponents, IgcButtonComponent } from 'igniteui-webcomponents';

export class DownloadButton {
    constructor() {
        defineComponents(IgcButtonComponent);
    }
}

new DownloadButton();
