import { defineComponents, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './ButtonOverviewStyle.css';

defineComponents(IgcButtonComponent);
export class ButtonOverview {
    constructor() {
    }
}

export function initialize() {
  return new ButtonOverview();
}