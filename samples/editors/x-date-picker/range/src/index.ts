import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcXDatePickerModule } from 'igniteui-webcomponents-inputs';
import { IgcXDatePickerComponent } from 'igniteui-webcomponents-inputs';
import { IgcSelectedValueChangedEventArgs } from 'igniteui-webcomponents-inputs';

ModuleManager.register(IgcXDatePickerModule);

export class DatePickerRange {

    private fromDatePicker: IgcXDatePickerComponent;
    private toDatePicker: IgcXDatePickerComponent;

    constructor() {

        this.onFromValueChanged = this.onFromValueChanged.bind(this);
        this.onToValueChanged = this.onToValueChanged.bind(this);

        this.fromDatePicker = document.getElementById("fromPicker") as IgcXDatePickerComponent;
        this.toDatePicker = document.getElementById("toPicker") as IgcXDatePickerComponent;

        let today = new Date(Date.now());

        this.fromDatePicker.value = today;
        this.fromDatePicker.allowTextInput = false;
        this.toDatePicker.value = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        this.toDatePicker.allowTextInput = false;

        this.fromDatePicker.selectedValueChanged = this.onFromValueChanged;
        this.toDatePicker.selectedValueChanged = this.onToValueChanged;
    }

    public onFromValueChanged(s: IgcXDatePickerComponent, e: IgcSelectedValueChangedEventArgs) {
        if (e.newValue > this.toDatePicker.value) {
            let newDate: Date = e.newValue;
            this.toDatePicker.value = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1);
        }
    }

    public onToValueChanged(s: IgcXDatePickerComponent, e: IgcSelectedValueChangedEventArgs) {
        if (e.newValue < this.fromDatePicker.value) {
            let newDate: Date = e.newValue;
            this.fromDatePicker.value = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 1);
        }
    }
}

export function initialize() {
  return new DatePickerRange();
}