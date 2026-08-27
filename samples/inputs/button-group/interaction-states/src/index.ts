import {
    defineComponents,
    IgcButtonGroupComponent,
    IgcIconComponent,
    IgcRippleComponent,
    IgcToggleButtonComponent,
    registerIconFromText
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/material.css';
import './index.css';

defineComponents(IgcButtonGroupComponent, IgcIconComponent, IgcRippleComponent, IgcToggleButtonComponent);

registerIconFromText(
    'notifications',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6v-5a7 7 0 0 0-5.5-6.84V3a1.5 1.5 0 0 0-3 0v1.16A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z"/></svg>',
    'material'
);
