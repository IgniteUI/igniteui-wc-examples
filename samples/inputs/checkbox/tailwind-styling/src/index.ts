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
            <div
                class="flex w-[218px] flex-col rounded-2xl border border-filter-primary bg-white p-[7px] [--ig-font-family:aktiv-grotesk,sans-serif]"
            >
                <igc-accordion class="flex flex-col divide-y divide-filter-divider pb-2">
                    ${this.sections.map(
                        (section) => html`
                            <igc-expansion-panel
                                class="my-0 [--ig-expansion-panel-body-background:transparent] [--ig-expansion-panel-header-background:transparent] [--ig-expansion-panel-header-icon-color:var(--color-filter-ink)]"
                                indicator-position="end"
                                .open=${section.open}
                                @igcOpened=${() => this.toggleSection(section, true)}
                                @igcClosed=${() => this.toggleSection(section, false)}
                            >
                                <span class="pb-2 text-base font-bold leading-5 text-filter-title" slot="title">
                                    ${section.title}
                                </span>
                                <div class="-mx-2 -my-4 flex flex-col">
                                    ${section.options.map(
                                        (option) => html`
                                            <igc-checkbox
                                                class="filter-option [--ig-checkbox-border-radius:0.125rem] [--ig-checkbox-empty-color-hover:var(--color-filter-primary)] [--ig-checkbox-empty-color:var(--color-filter-empty)] [--ig-checkbox-fill-color-hover:var(--color-filter-primary)] [--ig-checkbox-fill-color:var(--color-filter-primary)] [--ig-checkbox-label-color-hover:var(--color-filter-ink)] [--ig-checkbox-label-color:var(--color-filter-ink)] [--ig-checkbox-tick-color-hover:#fff] [--ig-checkbox-tick-color:#fff]"
                                                .checked=${option.checked}
                                                @igcChange=${(e: CustomEvent<{ checked: boolean }>) =>
                                                    this.toggleOption(option, e.detail.checked)}
                                            >
                                                <span class="text-sm font-medium leading-6 tracking-[0.1px]">
                                                    ${option.label}
                                                </span>
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
