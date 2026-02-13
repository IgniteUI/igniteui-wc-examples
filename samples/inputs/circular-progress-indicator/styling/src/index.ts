import { defineComponents, IgcCircularProgressComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './CircularProgressStyling.css'

defineComponents(IgcCircularProgressComponent);

export class CircularProgressStyling {
    constructor() {
    }
}

export function initialize() {
  return new CircularProgressStyling();
}