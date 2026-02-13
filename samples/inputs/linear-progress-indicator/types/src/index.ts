import { defineComponents,IgcLinearProgressComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcLinearProgressComponent);

export class ProgressIndicatorTypes {
    constructor() {
    }
}

export function initialize() {
  return new ProgressIndicatorTypes();
}