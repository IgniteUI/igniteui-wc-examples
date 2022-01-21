import {defineComponents, IgcListComponent, IgcListHeaderComponent, IgcListItemComponent} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcListComponent, IgcListHeaderComponent, IgcListItemComponent);
export class ListItemContent {
    constructor() {
    }
}

new ListItemContent();
