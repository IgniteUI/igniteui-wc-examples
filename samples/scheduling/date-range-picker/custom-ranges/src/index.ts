import { defineComponents, IgcDateRangePickerComponent } from 'igniteui-webcomponents';
import { CustomDateRange } from 'igniteui-webcomponents/components/date-range-picker/date-range-picker.js';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcDateRangePickerComponent);

export class DateRangePickerCustomRanges {
  constructor() {

    const dateRange = document.querySelector('igc-date-range-picker') as IgcDateRangePickerComponent;
    const today: Date = new Date();

    const previousWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );

    const nextWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7
    );

    const customRanges: CustomDateRange[] = [
      {
        label: 'Previous 7 days',
        dateRange: {
          start: previousWeek,
          end: today,
        },
      },
      {
        label: 'Next 7 days',
        dateRange: {
          start: today,
          end: nextWeek,
        },
      },
    ]

    dateRange.customRanges = customRanges

  }
}

new DateRangePickerCustomRanges();
