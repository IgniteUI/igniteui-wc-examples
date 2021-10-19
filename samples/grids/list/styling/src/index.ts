import IgcListComponent from 'igniteui-webcomponents/src/components/list/list';
import IgcListItemComponent from 'igniteui-webcomponents/src/components/list/list-item';
import IgcListHeaderComponent from 'igniteui-webcomponents/src/components/list/list-header';
import IgcAvatarComponent from 'igniteui-webcomponents/src/components/avatar/avatar';
import IgcButtonComponent from 'igniteui-webcomponents/src/components/button/button';
import './ListStyling.css';

export class ListStyling{
    constructor() {}
}

customElements.get('igc-list') || customElements.define('igc-list', IgcListComponent);
customElements.get('igc-list-item') || customElements.define('igc-list-item', IgcListItemComponent);
customElements.get('igc-list-header') || customElements.define('igc-list-header', IgcListHeaderComponent);
customElements.get('igc-avatar') ||customElements.define('igc-avatar', IgcAvatarComponent);
customElements.get('igc-button') || customElements.define('igc-button', IgcButtonComponent);

new ListStyling();
