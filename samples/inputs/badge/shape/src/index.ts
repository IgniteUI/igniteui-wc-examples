import { defineComponents, IgcBadgeComponent, IgcIconComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/material.css';
import './index.css';

defineComponents(IgcBadgeComponent, IgcIconComponent);

const checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';

registerIconFromText('check', checkIcon, 'material');

export class BadgeShape {
    constructor() {
    }
}

new BadgeShape();
