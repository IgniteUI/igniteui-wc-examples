import {defineComponents, IgcListComponent, IgcListHeaderComponent, IgcListItemComponent} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class ListItemContent {
    constructor() {
        defineComponents(IgcListComponent, IgcListHeaderComponent, IgcListItemComponent);
    }
}

new ListItemContent();
