import { defineComponents, IgcButtonComponent, IgcDropdownComponent, IgcDropdownItemComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcButtonComponent, IgcDropdownComponent, IgcDropdownItemComponent);

export class DropDownTarget {
    private dropdown: IgcDropdownComponent;

    constructor() {
        this.dropdown = document.getElementById('dropdown') as IgcDropdownComponent;
        const target1 = document.getElementById('target1');
        const target2 = document.getElementById('target2');

        target1!.addEventListener('click', this.handleClick);
        target2!.addEventListener('click', this.handleClick);
    }

    private handleClick = (event: MouseEvent) => {
        this.dropdown.toggle(event.target as HTMLElement);
    };
}

new DropDownTarget();
