import {
    defineComponents,
    IgcButtonComponent,
    IgcCheckboxComponent,
    IgcIconButtonComponent,
    IgcIconComponent,
    IgcListComponent,
    IgcListHeaderComponent,
    IgcListItemComponent,
    registerIconFromText
} from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(
    IgcButtonComponent,
    IgcCheckboxComponent,
    IgcIconButtonComponent,
    IgcIconComponent,
    IgcListComponent,
    IgcListHeaderComponent,
    IgcListItemComponent
);

const icons = [
    { name: 'more_vert', text: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>' },
    { name: 'add', text: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>' }
];

interface ShoppingItem {
    label: string;
    checked: boolean;
}

interface ShoppingGroup {
    title: string;
    items: ShoppingItem[];
}

export class CheckboxOverview {
    private groups: ShoppingGroup[] = [
        {
            title: 'Grocery store',
            items: [
                { label: 'Bread', checked: false },
                { label: 'Milk 4l', checked: false },
                { label: 'Eggs 1 pack', checked: true }
            ]
        },
        {
            title: 'Fruit and vegetable shop',
            items: [
                { label: 'Strawberries', checked: false },
                { label: 'Lemons', checked: false },
                { label: 'Single Line Item', checked: true }
            ]
        }
    ];

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        icons.forEach((icon) => registerIconFromText(icon.name, icon.text, 'material'));
        this.renderSample();
    }

    private toggleItem(item: ShoppingItem, checked: boolean) {
        item.checked = checked;
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <div class="shopping-list">
                <igc-list class="list">
                    ${this.groups.map(
                        (group) => html`
                            <igc-list-header class="group-header">
                                <span class="group-title">${group.title}</span>
                            </igc-list-header>
                            ${group.items.map(
                                (item) => html`
                                    <igc-list-item
                                        class=${item.checked
                                            ? 'shopping-item shopping-item-checked'
                                            : 'shopping-item'}
                                    >
                                        <igc-checkbox
                                            slot="start"
                                            .checked=${item.checked}
                                            @igcChange=${(e: CustomEvent<{ checked: boolean }>) =>
                                                this.toggleItem(item, e.detail.checked)}
                                        >
                                            <span>${item.label}</span>
                                        </igc-checkbox>
                                        <igc-icon-button slot="end" variant="flat" class="item-menu">
                                            <igc-icon name="more_vert" collection="material"></igc-icon>
                                        </igc-icon-button>
                                    </igc-list-item>
                                `
                            )}
                        `
                    )}
                </igc-list>
                <igc-button variant="fab" class="add-item">
                    <igc-icon name="add" collection="material"></igc-icon>
                </igc-button>
            </div>
        `;

        render(template, this.root);
    }
}

new CheckboxOverview();
