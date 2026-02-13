import { defineComponents, IgcCardComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './CardHorizontal.css';

defineComponents(IgcCardComponent);
export class CardHorizontal {
    constructor() {
    }
}

export function initialize() {
  return new CardHorizontal();
}