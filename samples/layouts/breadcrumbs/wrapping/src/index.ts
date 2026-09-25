import {
    defineComponents,
    IgcBreadcrumbComponent,
    IgcBreadcrumbsComponent,
    registerIconFromText
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcBreadcrumbComponent, IgcBreadcrumbsComponent);

export class BreadcrumbsWrapping {
    constructor() {
    }
}

new BreadcrumbsWrapping();
