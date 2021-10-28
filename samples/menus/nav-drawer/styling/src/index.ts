import 'igniteui-webcomponents';
import './drawer-styling.css';
import 'igniteui-webcomponents/src/styles/themes/material.css';
import { registerIcon } from 'igniteui-webcomponents/src/components/icon/icon.registry';
export class NavDrawerStyling {
    constructor() {}
}

registerIcon(
  'search',
  'https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_search_24px.svg'
);

registerIcon(
  'home',
  'https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_home_24px.svg'
);

new NavDrawerStyling();