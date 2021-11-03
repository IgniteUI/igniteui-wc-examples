import 'igniteui-webcomponents';
import 'igniteui-webcomponents/src/styles/themes/material.css'

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
