import { defineComponents, IgcButtonComponent, IgcDateRangePickerComponent, IgcDialogComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css'

defineComponents(IgcDateRangePickerComponent, IgcButtonComponent, IgcDialogComponent);

export class DateRangePickerForm {
  constructor() {

    document.getElementById('DateForm')?.addEventListener('submit', (event: SubmitEvent) => {
      event.preventDefault();
      showDialog(event.target as HTMLFormElement);
    })

    function showDialog(data: HTMLFormElement) {
      var dateRange = data.DateRange.value;
      const dialog = document.createElement('igc-dialog') as IgcDialogComponent;
      dialog.addEventListener('igcClosed', () => dialog.remove());

      const dump = document.createElement('pre');
      dump.innerHTML = `<b>Start</b>: ${dateRange.start} \n<b>End</b>: ${dateRange.end}`;

      dialog.appendChild(dump);
      document.body.appendChild(dialog);

      dialog.show();
    }

  }
}

export function initialize() {
  return new DateRangePickerForm();
}