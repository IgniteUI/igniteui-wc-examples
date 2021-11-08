import { defineComponents, IgcCardComponent, IgcCardHeaderComponent, IgcCardContentComponent, IgcCardMediaComponent, IgcCardActionsComponent, 
    IgcAvatarComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/material.css';
import './SemiHorizontal.css';

export class CardSemiHorizontal {
    constructor() {
        defineComponents(IgcCardComponent, IgcCardHeaderComponent, IgcCardContentComponent, IgcCardMediaComponent, IgcCardActionsComponent, 
            IgcAvatarComponent, IgcButtonComponent);
    }
}

new CardSemiHorizontal();
