import { defineComponents, IgcButtonComponent, IgcDropDownComponent, IgcDropDownItemComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcButtonComponent, IgcDropDownComponent, IgcDropDownItemComponent);

export class DropDownTarget {
    private dropdown: IgcDropDownComponent;

    constructor() {
        this.dropdown = document.getElementById('dropdown') as IgcDropDownComponent;
        const target1 = document.getElementById('target1');
        const target2 = document.getElementById('target2');

        target1?.addEventListener('click', this.handleClick);
        target2?.addEventListener('click', this.handleClick);
    }

    private handleClick = (event: MouseEvent) => {
        this.dropdown.toggle(event.target);
    };
}

new DropDownTarget();
