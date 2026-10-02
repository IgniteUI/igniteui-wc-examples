import { defineComponents, IgcButtonComponent, IgcIconComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

const addIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>';

defineComponents(IgcButtonComponent, IgcIconComponent);

export class ButtonLayout {
    constructor() {
        registerIconFromText('add', addIcon, 'material');
    }
}

new ButtonLayout();
