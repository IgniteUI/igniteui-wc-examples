import { defineComponents, IgcCardComponent, IgcCardHeaderComponent, IgcCardContentComponent, IgcCardMediaComponent, IgcCardActionsComponent, 
    IgcIconButtonComponent, IgcRippleComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/material.css';
import { registerIconFromText } from 'igniteui-webcomponents';
import { all } from '@igniteui/material-icons-extended';
import './CardStyling.css';


export class CardStyling {
    constructor() {
        defineComponents(IgcCardComponent, IgcCardHeaderComponent, IgcCardContentComponent, IgcCardMediaComponent, IgcCardActionsComponent, 
            IgcIconButtonComponent, IgcRippleComponent, registerIconFromText);
        all.forEach((icon: any) => {
            registerIconFromText(icon.name, icon.value);
        });
    }
}

new CardStyling();
