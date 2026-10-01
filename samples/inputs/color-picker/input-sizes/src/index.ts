import { defineComponents, IgcColorPickerComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import "./index.css";

defineComponents(IgcColorPickerComponent);

export class ColorPickerInputSizes {
}

document.querySelector('.smallPicker')?.toggle();

new ColorPickerInputSizes();
    