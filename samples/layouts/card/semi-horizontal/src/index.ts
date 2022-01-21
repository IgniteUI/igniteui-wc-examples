import { defineComponents, IgcCardComponent, IgcCardHeaderComponent, IgcCardContentComponent, IgcCardMediaComponent, IgcCardActionsComponent,
    IgcAvatarComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SemiHorizontal.css';

defineComponents(IgcCardComponent, IgcCardHeaderComponent, IgcCardContentComponent, IgcCardMediaComponent, IgcCardActionsComponent,
    IgcAvatarComponent, IgcButtonComponent);
export class CardSemiHorizontal {
    constructor() {
    }
}

new CardSemiHorizontal();
