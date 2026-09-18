import {
    defineComponents,
    IgcAccordionComponent,
    IgcCheckboxComponent,
    IgcExpansionPanelComponent
} from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcAccordionComponent, IgcCheckboxComponent, IgcExpansionPanelComponent);

interface FilterOption {
    label: string;
    checked: boolean;
}

interface FilterSection {
    title: string;
    open: boolean;
    options: FilterOption[];
}

export class CheckboxTailwindStyling {
    private sections: FilterSection[] = [
        {
            title: 'Brand',
            open: true,
            options: [
                { label: 'Nike', checked: true },
                { label: 'Roxy', checked: false },
                { label: 'Guess', checked: false }
            ]
        },
        {
            title: 'Color',
            open: true,
            options: [
                { label: 'Black', checked: false },
                { label: 'White', checked: true },
                { label: 'Gray', checked: false }
            ]
        },
        {
            title: 'Size',
            open: true,
            options: [
                { label: 'Small', checked: false },
                { label: 'Medium', checked: true },
                { label: 'Large', checked: false },
                { label: 'Extra large', checked: false }
            ]
        }
    ];

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private toggleOption(option: FilterOption, checked: boolean) {
        option.checked = checked;
        this.renderSample();
    }

    private toggleSection(section: FilterSection, open: boolean) {
        section.open = open;
    }

    private renderSample() {
        const template = html`
            <div class="filter-panel flex flex-col rounded-2xl border border-[var(--ig-primary-500)] bg-white p-2">
                <igc-accordion>
                    ${this.sections.map(
                        (section) => html`
                            <igc-expansion-panel
                                class="filter-section"
                                indicator-position="end"
                                .open=${section.open}
                                @igcOpened=${() => this.toggleSection(section, true)}
                                @igcClosed=${() => this.toggleSection(section, false)}
                            >
                                <span class="panel-title" slot="title">${section.title}</span>
                                <div class="section-options flex flex-col">
                                    ${section.options.map(
                                        (option) => html`
                                            <igc-checkbox
                                                class="filter-option"
                                                .checked=${option.checked}
                                                @igcChange=${(e: CustomEvent<{ checked: boolean }>) =>
                                                    this.toggleOption(option, e.detail.checked)}
                                            >
                                                <span>${option.label}</span>
                                            </igc-checkbox>
                                        `
                                    )}
                                </div>
                            </igc-expansion-panel>
                        `
                    )}
                </igc-accordion>
            </div>
        `;

        render(template, this.root);
    }
}

new CheckboxTailwindStyling();
