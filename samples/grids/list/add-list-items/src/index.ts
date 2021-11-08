import {defineComponents, IgcListComponent, IgcListHeaderComponent, IgcListItemComponent} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class AddListItems {
    constructor() {
        defineComponents(IgcListComponent, IgcListHeaderComponent, IgcListItemComponent);
    }
}

new AddListItems();
