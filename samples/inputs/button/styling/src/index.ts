import { defineComponents, IgcButtonComponent, IgcIconButtonComponent, IgcIconComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

const icons = [
    { name: 'send', text: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/></svg>' },
    { name: 'add', text: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>' },
];

defineComponents(IgcButtonComponent, IgcIconButtonComponent, IgcIconComponent);
export class ButtonStyling {
    constructor() { icons.forEach((icon) => registerIconFromText(icon.name, icon.text, 'material')); }
}
new ButtonStyling();
