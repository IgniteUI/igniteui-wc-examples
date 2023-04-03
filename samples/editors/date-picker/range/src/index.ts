import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDatePickerModule } from 'igniteui-webcomponents-inputs';
import { IgcDatePickerComponent } from 'igniteui-webcomponents-inputs';
import { IgcSelectedValueChangedEventArgs } from 'igniteui-webcomponents-inputs';

ModuleManager.register(IgcDatePickerModule);

export class DatePickerRange {

    private fromDatePicker: IgcDatePickerComponent;
    private toDatePicker: IgcDatePickerComponent;

    constructor() {

        this.onFromValueChanged = this.onFromValueChanged.bind(this);
        this.onToValueChanged = this.onToValueChanged.bind(this);

        this.fromDatePicker = document.getElementById("fromPicker") as IgcDatePickerComponent;
        this.toDatePicker = document.getElementById("toPicker") as IgcDatePickerComponent;

        let today = new Date(Date.now());

        this.fromDatePicker.value = today;
        this.fromDatePicker.allowTextInput = false;
        this.toDatePicker.value = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        this.toDatePicker.allowTextInput = false;

        this.fromDatePicker.selectedValueChanged = this.onFromValueChanged;
        this.toDatePicker.selectedValueChanged = this.onToValueChanged;
    }

    public onFromValueChanged(s: IgcDatePickerComponent, e: IgcSelectedValueChangedEventArgs) {
        if (e.newValue > this.toDatePicker.value) {
            let newDate: Date = e.newValue;
            this.toDatePicker.value = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1);
        }
    }

    public onToValueChanged(s: IgcDatePickerComponent, e: IgcSelectedValueChangedEventArgs) {
        if (e.newValue < this.fromDatePicker.value) {
            let newDate: Date = e.newValue;
            this.fromDatePicker.value = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 1);
        }
    }
}

new DatePickerRange();
