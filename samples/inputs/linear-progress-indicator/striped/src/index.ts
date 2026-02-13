import { defineComponents, IgcLinearProgressComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './LinearProgressStyles.css'

defineComponents(IgcLinearProgressComponent);

export class ProgressIndicatorStyles {
    constructor() {
    }
}

export function initialize() {
  return new ProgressIndicatorStyles();
}