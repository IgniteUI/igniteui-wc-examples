import { defineComponents, IgcLinearProgressComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcLinearProgressComponent);
export class SimpleLinearProgress {
    constructor() {
    }
}

export function initialize() {
  return new SimpleLinearProgress();
}