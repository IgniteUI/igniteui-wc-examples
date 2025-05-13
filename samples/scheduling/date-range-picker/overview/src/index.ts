import { defineComponents, IgcDateRangePickerComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css'

defineComponents(IgcDateRangePickerComponent);

export class DateRangePickerOverview {
  constructor() {
    let dateRange = document.querySelector('igc-date-range-picker') as IgcDateRangePickerComponent;
    const today: Date = new Date();
    let tomorrow: Date = new Date();
    tomorrow.setDate(today.getDate() + 3);
    dateRange.value = { start: today, end: tomorrow }
  }
}

new DateRangePickerOverview();
