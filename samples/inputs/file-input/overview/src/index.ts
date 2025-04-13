import { defineComponents, IgcFileInputComponent, IgcInputComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcInputComponent, IgcFileInputComponent);
export class FileInputOverview {
  constructor() {
  }
}

new FileInputOverview();
