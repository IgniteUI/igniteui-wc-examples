import {defineComponents, IgcListComponent, IgcListHeaderComponent, IgcListItemComponent} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

defineComponents(IgcListComponent, IgcListHeaderComponent, IgcListItemComponent);
export class ListItemContent {
    constructor() {
    }
}

new ListItemContent();
