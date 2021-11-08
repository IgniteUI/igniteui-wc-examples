import {defineComponents, IgcRadioComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';
export class RadioLabel {
  constructor() {
    defineComponents(IgcRadioComponent, IgcRadioGroupComponent);
  }
}

new RadioLabel();
