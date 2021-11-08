import {defineComponents, IgcListComponent, IgcListHeaderComponent, IgcListItemComponent, IgcAvatarComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';
import './ListStyling.css';

export class ListStyling{
    constructor() {
        defineComponents(IgcListComponent, IgcListHeaderComponent, IgcListItemComponent, IgcAvatarComponent, IgcButtonComponent);
    }
}

new ListStyling();
