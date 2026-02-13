import {defineComponents, IgcRadioComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcRadioComponent, IgcRadioGroupComponent);
export class RadioGroupAlignment {
  constructor() {
  }
}

export function initialize() {
  return new RadioGroupAlignment();
}