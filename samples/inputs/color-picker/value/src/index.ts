import { defineComponents, IgcColorPickerComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import "./index.css";

defineComponents(IgcColorPickerComponent);

export class ColorPickerValue {
}

document.querySelector('igc-color-picker')?.toggle();

new ColorPickerValue();
