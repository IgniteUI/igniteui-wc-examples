import {defineComponents, IgcRadioComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import "./RadioStyle.css";

defineComponents(IgcRadioComponent, IgcRadioGroupComponent);
export class RadioStyling {
  constructor() {
  }
}

export function initialize() {
  return new RadioStyling();
}