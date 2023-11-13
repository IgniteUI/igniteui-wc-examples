import {
    defineComponents,
    IgcButtonGroupComponent,
    IgcIconComponent,
    IgcRippleComponent,
    registerIcon
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/material.css';
import './index.css';

defineComponents(IgcButtonGroupComponent, IgcRippleComponent, IgcIconComponent);

const icons = [
    {
        name: 'format_align_left',
        url: 'https://unpkg.com/material-design-icons@3.0.1/editor/svg/production/ic_format_align_left_24px.svg',
    },
    {
        name: 'format_align_center',
        url: 'https://unpkg.com/material-design-icons@3.0.1/editor/svg/production/ic_format_align_center_24px.svg',
    },
    {
        name: 'format_align_right',
        url: 'https://unpkg.com/material-design-icons@3.0.1/editor/svg/production/ic_format_align_right_24px.svg',
    },
    {
        name: 'format_align_justify',
        url: 'https://unpkg.com/material-design-icons@3.0.1/editor/svg/production/ic_format_align_justify_24px.svg',
    },
];

export class ButtonGroupOverview {
    constructor() {
        icons.forEach((icon) => {
            registerIcon(icon.name, icon.url, 'material');
        });
    }
}

new ButtonGroupOverview();