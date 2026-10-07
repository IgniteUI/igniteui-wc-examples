import { defineComponents, IgcButtonComponent, IgcChipComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcButtonComponent, IgcChipComponent);

export class ChipRemove {
    constructor() {
        const chip = document.getElementById('chip') as IgcChipComponent;
        const restore = document.getElementById('restore') as IgcButtonComponent;

        // The control the user activated is gone, so move focus to the one that replaced it.
        chip.addEventListener('igcRemove', () => {
            chip.hidden = true;
            restore.hidden = false;
            restore.focus();
        });

        restore.addEventListener('click', () => {
            restore.hidden = true;
            chip.hidden = false;
            // The chip doesn't delegate focus yet, so focus its remove control directly.
            chip.shadowRoot?.querySelector<HTMLElement>('[part="remove"] igc-icon')?.focus();
        });
    }
}

new ChipRemove();
