import {
    defineComponents,
    IgcBreadcrumbComponent,
    IgcBreadcrumbsComponent,
    registerIconFromText
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/material.css';
import './index.css';

defineComponents(IgcBreadcrumbComponent, IgcBreadcrumbsComponent);

export class BreadcrumbsWrapping {
    constructor() {
        document.querySelectorAll('igc-breadcrumb').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
            });
        });
    }
}

new BreadcrumbsWrapping();
