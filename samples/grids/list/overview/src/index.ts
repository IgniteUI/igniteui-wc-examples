import IgcListComponent  from 'igniteui-webcomponents/src/components/list/list';
import IgcListItemComponent  from 'igniteui-webcomponents/src/components/list/list-item';
import IgcListHeaderComponent from 'igniteui-webcomponents/src/components/list/list-header';
import IgcAvatarComponent from 'igniteui-webcomponents/src/components/avatar/avatar';
import IgcButtonComponent from 'igniteui-webcomponents/src/components/button/button';
import IgcRadioGroupComponent from 'igniteui-webcomponents/src/components/radio-group/radio-group';
import IgcRadioComponent from 'igniteui-webcomponents/src/components/radio/radio';

export class ListOverview {
    list: IgcListComponent;
    radioGroup: IgcRadioGroupComponent;

    constructor() {
        this.list = document.getElementById('list') as IgcListComponent;
        this.radioGroup = document.getElementById('radio-group') as IgcRadioGroupComponent;

        this.radioGroup.addEventListener('click', (radio: any) => {
            this.list.size = radio.target.value
        });        
    }
}

customElements.get('igc-list') || customElements.define('igc-list', IgcListComponent);
customElements.get('igc-list-item') || customElements.define('igc-list-item', IgcListItemComponent);
customElements.get('igc-list-header') || customElements.define('igc-list-header', IgcListHeaderComponent);
customElements.get('igc-avatar') || customElements.define('igc-avatar', IgcAvatarComponent);
customElements.get('igc-button') || customElements.define('igc-button', IgcButtonComponent);
customElements.get('igc-radio-group') || customElements.define('igc-radio-group', IgcRadioGroupComponent);
customElements.get('igc-radio') || customElements.define('igc-radio', IgcRadioComponent);

new ListOverview();
