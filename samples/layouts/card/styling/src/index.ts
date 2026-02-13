import { defineComponents, IgcCardComponent, IgcIconButtonComponent, IgcRippleComponent, registerIconFromText } from 'igniteui-webcomponents';
import { all } from '@igniteui/material-icons-extended';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './CardStyling.css';
import './layout.css'

defineComponents(IgcCardComponent, IgcIconButtonComponent, IgcRippleComponent);
export class CardStyling {
    constructor() {
        all.forEach((icon: any) => {
            registerIconFromText(icon.name, icon.value);
        });
    }
}

export function initialize() {
  return new CardStyling();
}