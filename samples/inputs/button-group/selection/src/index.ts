import {
    defineComponents,
    IgcButtonGroupComponent,
    IgcIconComponent,
    IgcRadioComponent,
    IgcRadioGroupComponent,
    IgcRippleComponent,
    registerIcon
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/material.css';
import './index.css';

defineComponents(IgcButtonGroupComponent, IgcRippleComponent, IgcIconComponent, IgcRadioGroupComponent);

const icons = [
    {
        name: 'bold',
        url: 'https://unpkg.com/material-design-icons@3.0.1/editor/svg/production/ic_format_bold_24px.svg',
    },
    {
        name: 'italic',
        url: 'https://unpkg.com/material-design-icons@3.0.1/editor/svg/production/ic_format_italic_24px.svg',
    },
    {
        name: 'underline',
        url: 'https://unpkg.com/material-design-icons@3.0.1/editor/svg/production/ic_format_underlined_24px.svg',
    },
];

export class ButtonGroupSelection {
    private buttonGroup: IgcButtonGroupComponent;

    constructor() {
        icons.forEach((icon) => {
            registerIcon(icon.name, icon.url, 'material');
        });

        this.buttonGroup = document.querySelector('igc-button-group') as IgcButtonGroupComponent;

        document.addEventListener("igcChange", (e) => {
            const radio = e.target as IgcRadioComponent;

            this.buttonGroup.selection = radio.value as 'single' | 'single-required' | 'multiple';
        });
    }
}

new ButtonGroupSelection();