import { defineComponents, IgcChipComponent, IgcIconComponent, registerIconFromText } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';
import { icons } from './icons';

defineComponents(IgcChipComponent, IgcIconComponent);

interface Activity {
    label: string;
    icon: string;
}

const activities: Activity[] = [
    { label: 'Yoga', icon: 'self_improvement' },
    { label: 'Swimming', icon: 'pool' },
    { label: 'Hiking', icon: 'hiking' },
    { label: 'Lifting', icon: 'fitness_center' },
    { label: 'Cycling', icon: 'directions_bike' },
    { label: 'Tennis', icon: 'sports_tennis' },
    { label: 'Soccer', icon: 'sports_soccer' },
    { label: 'Baseball', icon: 'sports_baseball' }
];

const chipLabel = 'text-sm font-medium leading-5 tracking-[0.25px]';

// `flex` keeps the chip host's line box from adding height around the chip.
const selectedChip =
    'flex [--ig-chip-border-radius:0.5rem] ' +
    '[--ig-chip-background:var(--color-activity-primary)] [--ig-chip-text-color:white] ' +
    '[--ig-chip-hover-background:var(--color-activity-primary-strong)] [--ig-chip-hover-text-color:white] ' +
    '[--ig-chip-focus-background:var(--color-activity-primary-strong)] [--ig-chip-focus-text-color:white] ' +
    '[--ig-chip-remove-icon-color:white] [--ig-chip-remove-icon-color-focus:white]';

const availableChip =
    'flex [--ig-chip-border-radius:0.5rem] [--ig-chip-border-color:var(--color-activity-primary)] ' +
    '[--ig-chip-outlined-background:var(--color-activity-tint)] [--ig-chip-outlined-text-color:var(--color-activity-primary)] ' +
    '[--ig-chip-hover-outlined-background:var(--color-activity-tint-strong)] [--ig-chip-hover-outlined-text-color:var(--color-activity-primary)] [--ig-chip-hover-border-color:var(--color-activity-primary)] ' +
    '[--ig-chip-focus-outlined-background:var(--color-activity-tint-strong)] [--ig-chip-focus-outlined-text-color:var(--color-activity-primary)] [--ig-chip-focus-border-color:var(--color-activity-primary)]';

export class ChipTailwindStyling {
    private selected: Activity[] = activities.slice(0, 2);
    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        Object.keys(icons).forEach((name) => registerIconFromText(name, icons[name], 'material'));
        this.renderSample();
    }

    private get available() {
        return activities.filter((activity) => this.selected.indexOf(activity) === -1);
    }

    private addActivity(activity: Activity) {
        const available = this.available;
        const rest = available.filter((item) => item !== activity);
        const next = rest[Math.min(available.indexOf(activity), rest.length - 1)];
        this.selected = [...this.selected, activity];
        this.renderSample();
        this.focusChip(next ? 'available' : 'selected', next ? next.label : activity.label);
    }

    private removeActivity(activity: Activity) {
        const rest = this.selected.filter((item) => item !== activity);
        const next = rest[Math.min(this.selected.indexOf(activity), rest.length - 1)];
        this.selected = rest;
        this.renderSample();
        this.focusChip(next ? 'selected' : 'available', next ? next.label : activity.label);
    }

    // The chip that had focus is gone, so focus a chip in the same list, or the moved chip when that list is empty.
    private focusChip(list: 'selected' | 'available', label: string) {
        const chip = this.root.querySelector<IgcChipComponent>(`[data-activity="${label}"]`);
        // A moved chip renders after this call, and chips don't delegate focus yet, so wait and focus the control directly.
        chip?.updateComplete.then(() => {
            const control = list === 'selected'
                ? chip.querySelector<HTMLElement>('[slot="remove"]')
                : chip.shadowRoot?.querySelector<HTMLElement>('[part="action"]');
            control?.focus();
        });
    }

    private renderSample() {
        const template = html`
            <div
                role="group"
                aria-labelledby="activity-title"
                class="box-border flex w-full max-w-[517px] flex-col gap-4 rounded-2xl bg-activity-surface p-4 font-[aktiv-grotesk,sans-serif] [--ig-font-family:aktiv-grotesk,sans-serif] [--ig-size:var(--ig-size-large)]"
            >
                <!-- Not a heading: the theme's heading styles sit outside any CSS layer and would override these utilities. -->
                <span id="activity-title" class="flex h-8 items-center text-xl font-medium leading-6 text-activity-ink">Preferred Activity</span>
                <div role="group" aria-label="Selected activities" class="box-border flex min-h-[72px] flex-wrap items-center gap-4 rounded-2xl bg-white px-6 py-5">
                    ${repeat(
                        this.selected,
                        (activity) => activity.label,
                        (activity) => html`
                            <igc-chip data-activity=${activity.label} class=${selectedChip} removable @igcRemove=${() => this.removeActivity(activity)}>
                                <igc-icon slot="prefix" name=${activity.icon} collection="material"></igc-icon>
                                <span class=${chipLabel}>${activity.label}</span>
                                <igc-icon
                                    slot="remove"
                                    class="[--ig-icon-size:1.125rem]"
                                    name="close"
                                    collection="material"
                                    role="button"
                                    tabindex="0"
                                    aria-label=${`Remove ${activity.label}`}
                                ></igc-icon>
                            </igc-chip>
                        `
                    )}
                    <igc-icon class="ms-auto text-activity-primary [--ig-icon-size:1.125rem]" name="add" collection="material" aria-hidden="true"></igc-icon>
                </div>
                <div role="group" aria-label="Add an activity" class="flex flex-wrap gap-4 rounded-2xl bg-white p-5">
                    ${repeat(
                        this.available,
                        (activity) => activity.label,
                        (activity) => html`
                            <igc-chip data-activity=${activity.label} class=${availableChip} outlined @click=${() => this.addActivity(activity)}>
                                <igc-icon slot="prefix" name=${activity.icon} collection="material"></igc-icon>
                                <span class=${chipLabel}>${activity.label}</span>
                            </igc-chip>
                        `
                    )}
                </div>
            </div>
        `;

        render(template, this.root);
    }
}

new ChipTailwindStyling();
