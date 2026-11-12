import { defineComponents, IgcComboComponent, IgcSwitchComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { UsState, usStates } from './ComboData';
import './index.css';

defineComponents(IgcComboComponent, IgcSwitchComponent);

export class ComboFeatures {
    constructor() {
        const combo = document.getElementById('combo') as IgcComboComponent<UsState>;
        const disableFiltering = document.getElementById('disable-filtering') as IgcSwitchComponent;
        const caseSensitiveIcon = document.getElementById('case-sensitive-icon') as IgcSwitchComponent;
        const grouping = document.getElementById('grouping') as IgcSwitchComponent;
        const disabled = document.getElementById('disabled') as IgcSwitchComponent;

        combo.data = usStates;

        // igcChange fires before the selection changes, so read the value once the change applies.
        combo.addEventListener('igcChange', () => {
            queueMicrotask(() => this.showSelection(combo.value as string[]));
        });

        disableFiltering.addEventListener('igcChange', () => {
            combo.disableFiltering = disableFiltering.checked;
            // Without filtering the combo hides its search input, and the case-sensitive icon with it.
            caseSensitiveIcon.disabled = disableFiltering.checked;
        });

        caseSensitiveIcon.addEventListener('igcChange', () => {
            combo.caseSensitiveIcon = caseSensitiveIcon.checked;
        });

        grouping.addEventListener('igcChange', () => {
            combo.groupKey = grouping.checked ? 'region' : undefined;
        });

        disabled.addEventListener('igcChange', () => {
            combo.disabled = disabled.checked;
        });
    }

    // Lists the names of the selected states under the combo.
    private showSelection(ids: string[]) {
        const list = document.getElementById('selection-list') as HTMLUListElement;
        const empty = document.getElementById('selection-empty') as HTMLElement;

        list.replaceChildren(...ids.map((id) => {
            const item = document.createElement('li');
            item.textContent = usStates.find((state) => state.id === id)?.name ?? id;
            return item;
        }));
        list.hidden = ids.length === 0;
        empty.hidden = ids.length > 0;
    }
}

new ComboFeatures();
