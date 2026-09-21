import {
    defineComponents,
    IgcButtonComponent,
    IgcCardComponent,
    IgcChipComponent,
    IgcColorPickerComponent,
    IgcIconButtonComponent,
    registerIconFromText,
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/material.css';
import './index.css';

defineComponents(
    IgcButtonComponent,
    IgcCardComponent,
    IgcChipComponent,
    IgcColorPickerComponent,
    IgcIconButtonComponent
);

const refreshIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08a5.99 5.99 0 0 1-5.65 4c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>';

const defaults = {
    background: '#1a314a',
    text: '#e5ebf3',
    accent: '#f9592a',
    border: '#00142b',
};

export class ColorPickerTailwindStyling {

    constructor() {
        registerIconFromText('refresh', refreshIcon, 'material');

        this.previewCard = document.querySelector('igc-card') as HTMLElement;

        const bgPicker = document.querySelector('#bgPicker') as IgcColorPickerComponent;
        const textPicker = document.querySelector('#textPicker') as IgcColorPickerComponent;
        const accentPicker = document.querySelector('#accentPicker') as IgcColorPickerComponent;
        const borderPicker = document.querySelector('#borderPicker') as IgcColorPickerComponent;
        const resetButton = document.querySelector('#resetTheme') as HTMLElement;

        bgPicker.addEventListener('igcInput', (e) => this.setPreviewVar('--preview-bg', (e as CustomEvent<string>).detail));
        textPicker.addEventListener('igcInput', (e) => this.setPreviewVar('--preview-text', (e as CustomEvent<string>).detail));
        accentPicker.addEventListener('igcInput', (e) => this.setPreviewVar('--preview-accent', (e as CustomEvent<string>).detail));
        borderPicker.addEventListener('igcInput', (e) => this.setPreviewVar('--preview-border', (e as CustomEvent<string>).detail));

        resetButton.addEventListener('click', () => {
            bgPicker.value = defaults.background;
            textPicker.value = defaults.text;
            accentPicker.value = defaults.accent;
            borderPicker.value = defaults.border;

            this.setPreviewVar('--preview-bg', defaults.background);
            this.setPreviewVar('--preview-text', defaults.text);
            this.setPreviewVar('--preview-accent', defaults.accent);
            this.setPreviewVar('--preview-border', defaults.border);
        });

        this.setPreviewVar('--preview-bg', defaults.background);
        this.setPreviewVar('--preview-text', defaults.text);
        this.setPreviewVar('--preview-accent', defaults.accent);
        this.setPreviewVar('--preview-border', defaults.border);
    }

    private setPreviewVar(name: string, value: string) {
        this.previewCard.style.setProperty(name, value);
    }
}

new ColorPickerTailwindStyling();

