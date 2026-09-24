import { defineComponents, IgcColorPickerComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import "./index.css";

defineComponents(IgcColorPickerComponent);

export class ColorPickerSwatches {
    constructor() {
        document.querySelector('#one-line')!.swatches = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#4caf50'];
        document.querySelector('#multi-line')!.swatches = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800', '#795548', '#607d8b', '#ffffff', '#000000', '#0000ff', '#00ff00', '#ff00ff', '#00ffff', '#ff0000', '#ffff00', '#ff00ff', '#00ffff', '#c0c0c0', '#808080', '#800000', '#808000'];
    }
}

document.querySelectorAll('igc-color-picker')?.forEach(picker => picker.toggle());

new ColorPickerSwatches();
h