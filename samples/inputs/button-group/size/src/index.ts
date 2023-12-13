import { defineComponents, IgcButtonGroupComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/material.css';

defineComponents(IgcButtonGroupComponent);
export class ButtonGroupSize {
  private buttonGroup: IgcButtonGroupComponent;

  constructor() {
    this.buttonGroup = document.querySelector('igc-button-group') as IgcButtonGroupComponent;

    this.buttonGroup.addEventListener("igcSelect", (e) => {
      this.buttonGroup.style.setProperty('--ig-size', `var(--ig-size-${e.detail})`);
    });
  }
}

new ButtonGroupSize();