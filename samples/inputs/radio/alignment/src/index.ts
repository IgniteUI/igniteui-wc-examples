import {defineComponents, IgcRadioComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class RadioGroupAlignment {
  constructor() {
    defineComponents(IgcRadioComponent, IgcRadioGroupComponent);
  }
}

new RadioGroupAlignment();
