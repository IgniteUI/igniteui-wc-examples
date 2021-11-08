import {defineComponents, IgcRadioComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class RadioGroup {
  constructor() {
    defineComponents(IgcRadioComponent, IgcRadioGroupComponent);
  }
}

new RadioGroup();
