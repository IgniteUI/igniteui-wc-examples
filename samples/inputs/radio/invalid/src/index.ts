import {defineComponents, IgcRadioComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcRadioComponent);
export class RadioInvalid {
  constructor() {
  }
}

export function initialize() {
  return new RadioInvalid();
}