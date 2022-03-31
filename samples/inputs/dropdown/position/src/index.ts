import { defineComponents, IgcButtonComponent, IgcDropDownComponent, IgcDropDownItemComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './DropDownPositionStyles.css';

defineComponents(IgcButtonComponent, IgcDropDownComponent, IgcDropDownItemComponent);

export class DropDownPosition {
    private dropdown: IgcDropDownComponent;

    constructor() {
        this.dropdown = document.getElementById('dropdown') as IgcDropDownComponent;
        this.dropdown.addEventListener('igcChange', (event: CustomEvent) => {
            this.dropdown.placement = event.detail.value;
        });
    }
}

new DropDownPosition();
