import {
    defineComponents,
    IgcAvatarComponent,
    IgcButtonComponent,
    IgcCardActionsComponent,
    IgcCardComponent,
    IgcCardContentComponent,
    IgcCardHeaderComponent,
    IgcCardMediaComponent,
    IgcIconButtonComponent,
    IgcSwitchComponent,
    registerIconFromText
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(
    IgcAvatarComponent,
    IgcButtonComponent,
    IgcCardActionsComponent,
    IgcCardComponent,
    IgcCardContentComponent,
    IgcCardHeaderComponent,
    IgcCardMediaComponent,
    IgcIconButtonComponent,
    IgcSwitchComponent
);

const addIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>';

export class CardOverview {
    constructor() {
        registerIconFromText('add', addIcon, 'material');

        for (const section of ['media', 'header', 'content', 'actions']) {
            const toggle = document.getElementById(section) as IgcSwitchComponent;
            const element = document.getElementById(`${section}-section`) as HTMLElement;

            toggle.addEventListener('igcChange', () => {
                element.classList.toggle('hidden', !toggle.checked);
            });
        }
    }
}

new CardOverview();
