import {
    defineComponents,
    IgcBreadcrumbComponent,
    IgcBreadcrumbsComponent,
    IgcIconComponent,
    IgcBadgeComponent,
    registerIconFromText
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcBreadcrumbsComponent, IgcBreadcrumbComponent, IgcIconComponent, IgcBadgeComponent);

const homeIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>';

registerIconFromText('home', homeIcon);

export class BreadcrumbsStyling {
    constructor() {
    }
}

new BreadcrumbsStyling();
