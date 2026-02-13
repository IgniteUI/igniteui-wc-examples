import {defineComponents, IgcRadioComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcRadioComponent, IgcRadioGroupComponent);
export class RadioGroup {
  constructor() {
  }
}

export function initialize() {
  return new RadioGroup();
}