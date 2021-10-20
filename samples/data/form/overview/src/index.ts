
import IgcButtonComponent from 'igniteui-webcomponents/src/components/button/button';
import IgcCheckboxComponent from 'igniteui-webcomponents/src/components/checkbox/checkbox';
import IgcFormComponent from 'igniteui-webcomponents/src/components/form/form';
import IgcInputComponent from 'igniteui-webcomponents/src/components/input/input';

export class FormOverview {
    private form: IgcFormComponent;

    constructor() {
        this.form = document.getElementById("form") as unknown as IgcFormComponent;
        this.form.addEventListener('igcSubmit', function (event) {
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

customElements.get('igc-button') || customElements.define('igc-button', IgcButtonComponent);
customElements.get('igc-checkbox') || customElements.define('igc-checkbox', IgcCheckboxComponent);
customElements.get('igc-form') || customElements.define('igc-form', IgcFormComponent);
customElements.get('igc-input') || customElements.define('igc-input', IgcInputComponent);

new FormOverview();
