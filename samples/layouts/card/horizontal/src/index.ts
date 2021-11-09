import { defineComponents, IgcCardComponent, IgcCardHeaderComponent, IgcCardContentComponent, IgcCardMediaComponent, IgcCardActionsComponent} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';
import './CardHorizontal.css';

defineComponents(IgcCardComponent, IgcCardHeaderComponent, IgcCardContentComponent, IgcCardMediaComponent, IgcCardActionsComponent);
export class CardHorizontal {
    constructor() {
    }
}

new CardHorizontal();
