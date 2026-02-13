import { defineComponents, IgcButtonComponent, IgcDatePickerComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcDatePickerComponent, IgcButtonComponent);
export class DatePickerOverview {
    constructor() {
        let form = document.getElementById('form') as HTMLFormElement;
        let datePickerValue = document.getElementById('datePickerValue') as HTMLElement;
        let formStatus = document.getElementById('formStatus') as HTMLElement;
        let datePicker = document.getElementById('datePicker') as IgcDatePickerComponent;
        let resetButton = document.getElementById('resetButton') as IgcButtonComponent;

        const date = new Date(2024, 4, 15);
        const minDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 10);
        const maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 15);
        datePicker.value = date;
        datePicker.max = maxDate;
        datePicker.min = minDate;

        datePickerValue.innerHTML = `Date picker value: ${datePicker.value ? datePicker.value.toLocaleString() : null}`;
        formStatus.innerHTML = `Form valid: ${form.checkValidity()}`;
        resetButton.addEventListener('click', this.reset);
        datePicker.addEventListener("igcChange", () => {
            datePickerValue.innerHTML = `Date picker value: ${datePicker.value ? datePicker.value.toLocaleString() : null}`;
            formStatus.innerHTML = `Form valid: ${form.checkValidity()}`;
        });
    }

    public reset(){
        let form = document.getElementById('form') as HTMLFormElement;
        let datePickerValue = document.getElementById('datePickerValue') as HTMLElement;
        let formStatus = document.getElementById('formStatus') as HTMLElement;

        datePickerValue.innerHTML = "Date picker value: ";
        formStatus.innerHTML = "Form valid: ";
        form.reset();
    }
}

export function initialize() {
  return new DatePickerOverview();
}