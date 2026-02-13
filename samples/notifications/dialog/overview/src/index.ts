import {defineComponents, IgcDialogComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcDialogComponent, IgcButtonComponent);
export class DialogOverview {
    constructor() {
    }
}

export function initialize() {
  return new DialogOverview();
}