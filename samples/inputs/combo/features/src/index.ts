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
}

new ComboFeatures();
