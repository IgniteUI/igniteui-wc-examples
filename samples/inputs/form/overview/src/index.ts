import {defineComponents, IgcFormComponent, IgcInputComponent, IgcCheckboxComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcFormComponent, IgcInputComponent, IgcCheckboxComponent, IgcButtonComponent);
export class FormOverview {
    constructor() {
        document.addEventListener('igcSubmit', function (event) {
            const customEvent = event as CustomEvent<FormData>;
            const formData = customEvent.detail;
            const formKeys = formData.keys();
            const formEntries = formData.entries();
            let result = '';
            do {
                const pair = formEntries.next().value;
                if (pair) {
                    result += pair[0] + '=' + pair[1] + ';';
                }
              } while (!formKeys.next().done)
            console.log(result);
            alert(result);
        });
    }
}

new FormOverview();
