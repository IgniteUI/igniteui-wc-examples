import { defineComponents, IgcInputComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcInputComponent);
export class InputOverview {
    constructor() {
    }
}

export function initialize() {
  return new InputOverview();
}