import {defineComponents, IgcListComponent} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcListComponent);
export class AddListItems {
    constructor() {
    }
}

export function initialize() {
  return new AddListItems();
}