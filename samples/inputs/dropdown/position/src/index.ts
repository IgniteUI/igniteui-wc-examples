import { defineComponents, IgcButtonComponent, IgcDropdownComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './DropDownPositionStyles.css';

defineComponents(IgcButtonComponent, IgcDropdownComponent);

export class DropDownPosition {
    private dropdown: IgcDropdownComponent;

    constructor() {
        this.dropdown = document.getElementById('dropdown') as IgcDropdownComponent;
        this.dropdown.addEventListener('igcChange', (event: CustomEvent) => {
            this.dropdown.placement = event.detail.value;
        });
    }
}

new DropDownPosition();
