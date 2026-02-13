import { defineComponents, IgcCircularProgressComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './IndeterminateCircularProgressStyle.css'

defineComponents(IgcCircularProgressComponent);

export class IndeterminateCircularProgress {
    constructor() {
    }
}

export function initialize() {
  return new IndeterminateCircularProgress();
}