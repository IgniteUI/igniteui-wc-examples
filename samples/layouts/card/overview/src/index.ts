import { defineComponents, IgcCardComponent, IgcCardHeaderComponent, IgcCardContentComponent, IgcCardMediaComponent, IgcCardActionsComponent, 
        IgcButtonComponent, IgcIconButtonComponent, IgcRippleComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/material.css';
import { all } from '@igniteui/material-icons-extended';
import './CardOverview.css';


export class CardOverview {
    constructor() {
        defineComponents(IgcCardComponent, IgcCardHeaderComponent, IgcCardContentComponent, IgcCardMediaComponent, IgcCardActionsComponent, 
            IgcButtonComponent, IgcIconButtonComponent, IgcRippleComponent, registerIconFromText);
        all.forEach((icon: any) => {
            registerIconFromText(icon.name, icon.value);
        });
    }
}

new CardOverview();
