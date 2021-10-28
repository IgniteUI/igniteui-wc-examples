import 'igniteui-webcomponents';

export class FormOverview {
    constructor() {
        document.addEventListener('igcSubmit', function (event) {
            const customEvent = event as CustomEvent<FormData>;
            const formData = customEvent.detail;
            let result = '';
            for (const pair of formData.entries()) {
                result += pair[0] + '=' + pair[1] + ';';
            }
            console.log(result);
            alert(result);
        });
    }
}


new FormOverview();
