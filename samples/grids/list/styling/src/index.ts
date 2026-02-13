import {defineComponents, IgcListComponent, IgcAvatarComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './ListStyling.css';

defineComponents(IgcListComponent, IgcAvatarComponent, IgcButtonComponent);
export class ListStyling{
    constructor() {
    }
}

export function initialize() {
  return new ListStyling();
}