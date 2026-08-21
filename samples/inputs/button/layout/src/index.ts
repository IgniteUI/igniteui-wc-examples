import { defineComponents, IgcButtonComponent, IgcIconComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/material.css';
import './index.css';

const addIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>';

defineComponents(IgcButtonComponent, IgcIconComponent);

export class ButtonLayout {
    private select: HTMLSelectElement;
    private label: HTMLElement;
    private buttons: NodeListOf<IgcButtonComponent>;

    constructor() {
        registerIconFromText('add', addIcon, 'material');

        this.select = document.getElementById('variant-select') as HTMLSelectElement;
        this.label = document.getElementById('variant-label') as HTMLElement;
        this.buttons = document.querySelectorAll<IgcButtonComponent>('.variant-button');

        this.select.addEventListener('change', () => this.onVariantChange());
    }

    public onVariantChange() {
        const variant = this.select.value as IgcButtonComponent['variant'];
        this.label.textContent = variant.charAt(0).toUpperCase() + variant.slice(1);
        this.buttons.forEach((button) => (button.variant = variant));
    }
}

new ButtonLayout();
