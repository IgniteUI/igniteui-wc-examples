import {
    defineComponents,
    IgcCheckboxChangeEventArgs,
    IgcRadioChangeEventArgs,
    IgcRadioComponent,
    IgcRadioGroupComponent,
    IgcSwitchComponent,
    IgcTooltipComponent,
    PopoverPlacement
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcRadioComponent, IgcRadioGroupComponent, IgcSwitchComponent, IgcTooltipComponent);

export class TooltipOverview {
    constructor() {
        const tooltip = document.getElementById('tooltip') as IgcTooltipComponent;
        const closeButton = document.getElementById('close-button') as IgcSwitchComponent;
        const arrow = document.getElementById('arrow') as IgcSwitchComponent;

        document.querySelectorAll<IgcRadioComponent>('igc-radio[name="placement"]').forEach((radio) => {
            radio.addEventListener('igcChange', (e: CustomEvent<IgcRadioChangeEventArgs>) => {
                if (e.detail.checked) {
                    tooltip.placement = e.detail.value as PopoverPlacement;
                }
            });
        });

        closeButton.addEventListener('igcChange', (e: CustomEvent<IgcCheckboxChangeEventArgs>) => {
            tooltip.sticky = e.detail.checked;
        });

        arrow.addEventListener('igcChange', (e: CustomEvent<IgcCheckboxChangeEventArgs>) => {
            tooltip.withArrow = e.detail.checked;
        });
    }
}

new TooltipOverview();
