import IgcListComponent from 'igniteui-webcomponents/src/components/list/list';
import IgcListItemComponent from 'igniteui-webcomponents/src/components/list/list-item';
import IgcListHeaderComponent from 'igniteui-webcomponents/src/components/list/list-header';

export class ListItemContent {
    constructor() {}
}

customElements.get('igc-list') || customElements.define('igc-list', IgcListComponent);
customElements.get('igc-list-item') || customElements.define('igc-list-item', IgcListItemComponent);
customElements.get('igc-list-header') || customElements.define('igc-list-header', IgcListHeaderComponent);

new ListItemContent();
