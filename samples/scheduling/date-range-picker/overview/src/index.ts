import { defineComponents, IgcDateRangePickerComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcDateRangePickerComponent);

export class DateRangePickerOverview {
  constructor() {
    let dateRange = document.querySelector('igc-date-range-picker') as IgcDateRangePickerComponent;
    const today: Date = new Date();
    let endDate: Date = new Date();
    endDate.setDate(today.getDate() + 3);
    dateRange.value = { start: today, end: endDate }
  }
}

export function initialize() {
  return new DateRangePickerOverview();
}