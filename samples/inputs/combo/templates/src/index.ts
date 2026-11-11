import {
    defineComponents,
    registerIconFromText,
    IgcBadgeComponent,
    IgcButtonComponent,
    IgcComboComponent,
    IgcIconComponent,
    IgcSwitchComponent,
    ComboItemTemplate,
    IgcComboChangeEventArgs,
    IgcCheckboxChangeEventArgs
} from 'igniteui-webcomponents';
import { html, nothing, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcComboComponent, IgcSwitchComponent, IgcButtonComponent, IgcBadgeComponent, IgcIconComponent);

interface Destination {
    id: string;
    name: string;
    country: string;
    countryCode: string;
    region: string;
    offset: string;
}

type TemplateName = 'item' | 'groupHeader' | 'header' | 'footer' | 'empty' | 'toggleIcon' | 'clearIcon' | 'input';

interface TemplateSwitch {
    name: TemplateName;
    label: string;
}

const icons: Record<string, string> = {
    place: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
    public: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
    flight: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z"/></svg>',
    close: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    location_searching: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>'
};

export class ComboTemplates {
    private destinations: Destination[] = [
        { id: 'SOF', name: 'Sofia', country: 'Bulgaria', countryCode: 'BG', region: 'Europe', offset: 'UTC+2' },
        { id: 'LON', name: 'London', country: 'United Kingdom', countryCode: 'GB', region: 'Europe', offset: 'UTC+0' },
        { id: 'PAR', name: 'Paris', country: 'France', countryCode: 'FR', region: 'Europe', offset: 'UTC+1' },
        { id: 'BER', name: 'Berlin', country: 'Germany', countryCode: 'DE', region: 'Europe', offset: 'UTC+1' },
        { id: 'MAD', name: 'Madrid', country: 'Spain', countryCode: 'ES', region: 'Europe', offset: 'UTC+1' },
        { id: 'ROM', name: 'Rome', country: 'Italy', countryCode: 'IT', region: 'Europe', offset: 'UTC+1' },
        { id: 'CPT', name: 'Cape Town', country: 'South Africa', countryCode: 'ZA', region: 'Africa', offset: 'UTC+2' },
        { id: 'NBO', name: 'Nairobi', country: 'Kenya', countryCode: 'KE', region: 'Africa', offset: 'UTC+3' },
        { id: 'CAI', name: 'Cairo', country: 'Egypt', countryCode: 'EG', region: 'Africa', offset: 'UTC+2' },
        { id: 'RAK', name: 'Marrakesh', country: 'Morocco', countryCode: 'MA', region: 'Africa', offset: 'UTC+1' },
        { id: 'TYO', name: 'Tokyo', country: 'Japan', countryCode: 'JP', region: 'Asia', offset: 'UTC+9' },
        { id: 'SIN', name: 'Singapore', country: 'Singapore', countryCode: 'SG', region: 'Asia', offset: 'UTC+8' },
        { id: 'BKK', name: 'Bangkok', country: 'Thailand', countryCode: 'TH', region: 'Asia', offset: 'UTC+7' },
        { id: 'DXB', name: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', region: 'Asia', offset: 'UTC+4' },
        { id: 'NYC', name: 'New York', country: 'United States', countryCode: 'US', region: 'Americas', offset: 'UTC-5' },
        { id: 'YTO', name: 'Toronto', country: 'Canada', countryCode: 'CA', region: 'Americas', offset: 'UTC-5' },
        { id: 'MEX', name: 'Mexico City', country: 'Mexico', countryCode: 'MX', region: 'Americas', offset: 'UTC-6' },
        { id: 'SAO', name: 'São Paulo', country: 'Brazil', countryCode: 'BR', region: 'Americas', offset: 'UTC-3' },
        { id: 'BUE', name: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', region: 'Americas', offset: 'UTC-3' }
    ];

    private templateSwitches: TemplateSwitch[] = [
        { name: 'item', label: 'Item template' },
        { name: 'groupHeader', label: 'Header Item template' },
        { name: 'header', label: 'Header template' },
        { name: 'footer', label: 'Footer template' },
        { name: 'empty', label: 'Empty template' },
        { name: 'toggleIcon', label: 'Toggle Icon template' },
        { name: 'clearIcon', label: 'Clear Icon template' },
        { name: 'input', label: 'Templated input' }
    ];

    // which templates the switches have turned on
    private templates: Record<TemplateName, boolean> = {
        item: false,
        groupHeader: false,
        header: false,
        footer: false,
        empty: false,
        toggleIcon: false,
        clearIcon: false,
        input: false
    };

    // the `id` values of the selected destinations
    private selected: string[] = [];

    private root = document.getElementById('sample') as HTMLElement;

    // the default templates show the display text of an item and the value of a group
    private defaultItemTemplate: ComboItemTemplate<Destination> = ({ item }) => html`${item.name}`;

    private defaultGroupHeaderTemplate: ComboItemTemplate<Destination> = ({ item }) => html`${item.region}`;

    // the templates render inside the shadow DOM of the combo, where the styles of the page don't
    // reach, so the group header lays out its content with inline styles; each root element of a
    // template is laid out as a block, so the item content is wrapped in one element
    private itemTemplate: ComboItemTemplate<Destination> = ({ item }) => html`
        <span>
            <img
                src="https://dl.infragistics.com/x/img/flags/${item.countryCode}.png"
                alt=""
                style="width: 1.25rem; vertical-align: -0.125rem; margin-inline-end: 0.5rem;"
            />
            ${item.name} — ${item.country} · ${item.id} · ${item.offset}
        </span>
    `;

    // the group header template receives a header record, whose `groupKey` field holds the group value
    private groupHeaderTemplate: ComboItemTemplate<Destination> = ({ item }) => html`
        <span style="display: flex; align-items: center; gap: 0.5rem; width: 100%;">
            <igc-icon name="public" collection="material" style="--size: 1.125rem;"></igc-icon>
            <strong>${item.region}</strong>
            <span style="margin-inline-start: auto; font-weight: 400;">${this.citiesIn(item.region)} cities</span>
        </span>
    `;

    constructor() {
        for (const [name, svg] of Object.entries(icons)) {
            registerIconFromText(name, svg, 'material');
        }

        this.renderSample();
    }

    private get combo() {
        return this.root.querySelector('igc-combo') as IgcComboComponent<Destination>;
    }

    private get selectedNames() {
        return this.destinations.filter((d) => this.selected.includes(d.id)).map((d) => d.name);
    }

    private citiesIn(region: string) {
        return this.destinations.filter((d) => d.region === region).length;
    }

    // `igcChange` is emitted before the selection changes, with the new value in its detail; the search
    // input of the combo emits its own `igcChange` that bubbles out of the combo, so only the events of
    // the combo itself change the selection
    private onChange = (e: CustomEvent<IgcComboChangeEventArgs<Destination>>) => {
        if (e.composedPath()[0] !== e.currentTarget) {
            return;
        }

        this.selected = e.detail.newValue as string[];
        this.renderSample();
    };

    // `select` and `deselect` don't emit `igcChange`, so the sample reads the value after them
    private selectAll = () => {
        this.combo.select();
        this.selected = this.combo.value as string[];
        this.renderSample();
    };

    private clearSelection = () => {
        this.combo.deselect();
        this.selected = [];
        this.renderSample();
    };

    private toggleTemplate(name: TemplateName, e: CustomEvent<IgcCheckboxChangeEventArgs>) {
        this.templates[name] = e.detail.checked;
        this.renderSample();
    }

    private renderSample() {
        const { templates, selected, destinations } = this;
        const names = this.selectedNames;

        const template = html`
            <div class="destinations-area">
                <igc-combo
                    class="destinations"
                    outlined
                    value-key="id"
                    display-key="name"
                    group-key="region"
                    group-sorting="none"
                    placeholder="Pick one or more cities"
                    placeholder-search="Search cities..."
                    open
                    label=${templates.input ? 'Destinations' : nothing}
                    .data=${destinations}
                    .itemTemplate=${templates.item ? this.itemTemplate : this.defaultItemTemplate}
                    .groupHeaderTemplate=${templates.groupHeader ? this.groupHeaderTemplate : this.defaultGroupHeaderTemplate}
                    @igcChange=${this.onChange}
                >
                    ${templates.header
                        ? html`
                              <header slot="header" class="list-header">
                                  <span class="ig-typography__subtitle-2">Destinations by region</span>
                                  <igc-button variant="flat" @click=${this.selectAll}>Select all</igc-button>
                              </header>
                          `
                        : nothing}
                    ${templates.footer
                        ? html`
                              <footer slot="footer" class="list-footer">
                                  <span class="ig-typography__body-2">${selected.length} selected</span>
                                  <igc-button variant="flat" @click=${this.clearSelection}>Clear</igc-button>
                              </footer>
                          `
                        : nothing}
                    ${templates.empty
                        ? html`
                              <span slot="empty" class="empty-list">
                                  <igc-icon name="location_searching" collection="material"></igc-icon>
                                  No city matches your search. Try another spelling.
                              </span>
                          `
                        : nothing}
                    ${templates.toggleIcon
                        ? html`<igc-icon slot="toggle-icon" name="flight" collection="material"></igc-icon>`
                        : nothing}
                    ${templates.clearIcon
                        ? html`<igc-icon slot="clear-icon" name="close" collection="material"></igc-icon>`
                        : nothing}
                    ${templates.input
                        ? html`
                              <igc-icon slot="prefix" name="place" collection="material"></igc-icon>
                              <igc-badge slot="suffix">${selected.length}</igc-badge>
                              <span slot="helper-text">${selected.length} of ${destinations.length} destinations selected</span>
                          `
                        : nothing}
                </igc-combo>

                <div class="selection ig-typography__body-2">
                    <span class="ig-typography__subtitle-2">Selection</span>
                    <span>${names.length ? names.join(', ') : 'No items selected'}</span>
                </div>
            </div>

            <div class="templates">
                ${this.templateSwitches.map(
                    (s) => html`
                        <igc-switch
                            .checked=${templates[s.name]}
                            @igcChange=${(e: CustomEvent<IgcCheckboxChangeEventArgs>) => this.toggleTemplate(s.name, e)}
                        >
                            ${s.label}
                        </igc-switch>
                    `
                )}
            </div>
        `;

        render(template, this.root);
    }
}

new ComboTemplates();
