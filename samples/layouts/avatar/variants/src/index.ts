import {
    defineComponents,
    IgcAvatarComponent,
    IgcBadgeComponent,
    IgcIconComponent,
    registerIconFromText
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/material.css';
import './index.css';

defineComponents(IgcAvatarComponent, IgcBadgeComponent, IgcIconComponent);

const mailIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"/></svg>';

const checkIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m9 16.17-4.17-4.17-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z"/></svg>';

export class AvatarVariants {
    constructor() {
        registerIconFromText('mail', mailIcon, 'material');
        registerIconFromText('check', checkIcon, 'material');
    }
}

new AvatarVariants();
