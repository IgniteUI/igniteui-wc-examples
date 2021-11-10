import { defineComponents, IgcNavDrawerComponent, IgcNavDrawerHeaderItemComponent, IgcNavDrawerItemComponent,
  IgcIconComponent, registerIcon } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';
import './drawer-styling.css';

defineComponents(IgcNavDrawerComponent, IgcNavDrawerHeaderItemComponent, IgcNavDrawerItemComponent, IgcIconComponent);
export class NavDrawerStyling {
  constructor() {
    registerIcon(
      'search',
      'https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_search_24px.svg'
    );
    
    registerIcon(
      'home',
      'https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_home_24px.svg'
    );
  }
}

new NavDrawerStyling();
