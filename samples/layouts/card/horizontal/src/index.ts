import { defineComponents, IgcCardComponent, IgcCardHeaderComponent, IgcCardContentComponent, IgcCardMediaComponent, IgcCardActionsComponent} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';
import './CardHorizontal.css';

export class CardHorizontal {
    constructor() {
        defineComponents(IgcCardComponent, IgcCardHeaderComponent, IgcCardContentComponent, IgcCardMediaComponent, IgcCardActionsComponent);
    }
}

new CardHorizontal();
