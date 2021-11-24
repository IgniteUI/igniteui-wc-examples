import { defineComponents, IgcCardComponent, IgcCardHeaderComponent, IgcCardContentComponent, IgcCardMediaComponent, IgcCardActionsComponent,
        IgcButtonComponent, IgcIconButtonComponent, IgcRippleComponent, registerIconFromText } from 'igniteui-webcomponents';
import { all } from '@igniteui/material-icons-extended';
import 'igniteui-webcomponents/themes/bootstrap.css';
import './CardOverview.css';

defineComponents(IgcCardComponent, IgcCardHeaderComponent, IgcCardContentComponent, IgcCardMediaComponent, IgcCardActionsComponent,
    IgcButtonComponent, IgcIconButtonComponent, IgcRippleComponent);
export class CardOverview {
    constructor() {
        all.forEach((icon: any) => {
            registerIconFromText(icon.name, icon.value);
        });
    }
}

new CardOverview();
