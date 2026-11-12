import { defineComponents, IgcTooltipComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcTooltipComponent);

export class TooltipArrowPosition {
    constructor() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.stopImmediatePropagation();
            }
        }, true);
    }
}

new TooltipArrowPosition();
