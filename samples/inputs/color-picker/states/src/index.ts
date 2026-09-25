import { defineComponents, IgcColorPickerComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import "./index.css";

defineComponents(IgcColorPickerComponent);

export class ColorPickerStates {
}

document.querySelector('#defaultPicker')?.toggle();

document.querySelector('#invalidPicker')?.addEventListener('igcInput', (event) => {
    document.querySelector('#invalidPicker')?.removeAttribute('invalid');
});

new ColorPickerStates();
