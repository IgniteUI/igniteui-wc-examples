import { defineComponents, IgcColorPickerComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import "./index.css";

defineComponents(IgcColorPickerComponent);

export class ColorPickerSwatches {
    constructor() {
        document.querySelector('igc-color-picker')!.swatches = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#4caf50'];
    }
}

document.querySelector('igc-color-picker')?.toggle();

new ColorPickerSwatches();
