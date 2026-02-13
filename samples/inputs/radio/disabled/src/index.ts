import {defineComponents, IgcRadioComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcRadioComponent, IgcRadioGroupComponent);
export class RadioDisabled {
  constructor() {
  }
}

export function initialize() {
  return new RadioDisabled();
}