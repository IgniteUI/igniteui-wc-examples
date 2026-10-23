import { defineComponents, IgcButtonComponent, IgcRadioComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcButtonComponent, IgcRadioComponent, IgcRadioGroupComponent);

const formats = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'xls', label: 'XLS Editable spreadsheet' },
    { value: 'csv', label: 'CSV Raw data, no styling' }
];

const radioLabel = 'text-xs font-semibold leading-4 tracking-[0.15px] text-export-ink';

// The base part is styled directly, so the buttons keep the design's look in every theme.
// Without the theme's shadow, the focused button shows an outline instead.
const button =
    '[&::part(base)]:h-[30px] [&::part(base)]:min-w-0 [&::part(base)]:px-3 [&::part(base)]:shadow-none ' +
    '[&::part(base)]:text-sm [&::part(base)]:font-semibold [&::part(base)]:normal-case [&::part(base)]:leading-4 [&::part(base)]:tracking-[0.75px] ' +
    '[&::part(base_focused)]:outline-2 [&::part(base_focused)]:outline-offset-2 [&::part(base_focused)]:outline-export-primary';

const cancelButton =
    button + ' [&::part(base)]:rounded [&::part(base)]:border-transparent [&::part(base)]:bg-transparent ' +
    '[&::part(base)]:text-export-cancel [&::part(base):hover]:bg-export-tint-strong';

const exportButton =
    button + ' [&::part(base)]:rounded-lg [&::part(base)]:border-export-primary [&::part(base)]:bg-export-primary ' +
    '[&::part(base)]:text-white [&::part(base):hover]:border-export-primary-strong [&::part(base):hover]:bg-export-primary-strong';

export class RadioTailwindStyling {
    private format = 'csv';
    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private selectFormat(format: string, checked: boolean) {
        if (checked) {
            this.format = format;
            this.renderSample();
        }
    }

    private renderSample() {
        const template = html`
            <div class="box-border flex w-[280px] flex-col overflow-hidden rounded-2xl border border-export-divider bg-white font-[aktiv-grotesk,sans-serif] [--ig-font-family:aktiv-grotesk,sans-serif] [--ig-radio-empty-color:var(--color-export-empty)] [--ig-radio-fill-color:var(--color-export-primary)]">
                <div class="flex flex-col border-b border-export-divider p-4 font-semibold tracking-[0.15px]">
                    <span id="export-title" class="text-base leading-6 text-export-title">Export report</span>
                    <span class="text-xs leading-4 text-export-muted">Choose a format to export</span>
                </div>
                <igc-radio-group class="gap-0 px-6 py-3.5" name="format" aria-labelledby="export-title">
                    ${formats.map(
                        (option) => html`
                            <igc-radio
                                class="format-option"
                                value=${option.value}
                                .checked=${option.value === this.format}
                                @igcChange=${(e: CustomEvent<{ checked: boolean }>) => this.selectFormat(option.value, e.detail.checked)}
                            >
                                <span class=${radioLabel}>${option.label}</span>
                            </igc-radio>
                        `
                    )}
                </igc-radio-group>
                <div class="flex justify-end gap-4 bg-export-tint p-4">
                    <igc-button variant="flat" class=${cancelButton}>Cancel</igc-button>
                    <igc-button variant="contained" class=${exportButton}>Export as ${this.format.toUpperCase()}</igc-button>
                </div>
            </div>
        `;

        render(template, this.root);
    }
}

new RadioTailwindStyling();
