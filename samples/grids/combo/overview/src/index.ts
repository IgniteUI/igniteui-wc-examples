import {defineComponents, IgcComboComponent, IgcComboItemComponent, IgcInputComponent, IgcIconComponent} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcComboComponent, IgcComboItemComponent, IgcInputComponent, IgcIconComponent);
export class ComboOverview {
    private combo: IgcComboComponent<object>;

    constructor() {
        this.combo = document.getElementById('combo') as IgcComboComponent<object>;
        this.combo.data = [{ name: 'London', id: 'UK01' }, { name: 'Sofia', id: 'BG01'}, { name: 'New York', id: 'NY01'}];
    }
}

new ComboOverview();
