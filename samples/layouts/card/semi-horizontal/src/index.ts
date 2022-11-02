import { defineComponents, IgcCardComponent, IgcAvatarComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SemiHorizontal.css';

defineComponents(IgcCardComponent, IgcAvatarComponent, IgcButtonComponent);
export class CardSemiHorizontal {
    constructor() {
    }
}

new CardSemiHorizontal();
