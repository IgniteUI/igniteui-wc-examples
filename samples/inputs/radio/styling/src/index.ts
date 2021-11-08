import {defineComponents, IgcRadioComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';
import "./index.css";

export class RadioStyling {
  constructor() {
    defineComponents(IgcRadioComponent, IgcRadioGroupComponent);
  }
}

new RadioStyling();
