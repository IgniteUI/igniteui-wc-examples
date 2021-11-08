import {defineComponents, IgcRadioComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class RadioDisabled {
  constructor() {
    defineComponents(IgcRadioComponent, IgcRadioGroupComponent);
  }
}

new RadioDisabled();
