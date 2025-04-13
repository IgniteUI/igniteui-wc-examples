import { defineComponents, IgcFileInputComponent, IgcInputComponent, IgcDialogComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css'

defineComponents(IgcInputComponent, IgcFileInputComponent, IgcDialogComponent);
export class FileInputForm {
  constructor() {

    window.onload = function () {
      document.getElementById("fInput")?.focus();
    }

    document.getElementById('form1')?.addEventListener('submit', (event: SubmitEvent) => {
      event.preventDefault();
      showDialog(event.target as HTMLFormElement);
    })

    function showDialog(data: HTMLFormElement) {
      var filePath = data.fInput.value
      const dialog = document.createElement('igc-dialog');
      dialog.title = 'Form submission result';
      dialog.addEventListener('igcClosed', () => dialog.remove());

      const dump = document.createElement('pre');
      dump.textContent = filePath.replace("C:\\fakepath\\", "");

      dialog.appendChild(dump);
      document.body.appendChild(dialog);

      dialog.show();
    }

  }
}

new FileInputForm();
