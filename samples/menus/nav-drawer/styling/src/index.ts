import { defineComponents, IgcNavDrawerComponent, IgcNavDrawerItemComponent, IgcIconComponent,
         registerIconFromText, IgcIconButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './drawer-styling.css';
import './layout.css'

defineComponents(IgcNavDrawerComponent, IgcIconComponent, IgcIconButtonComponent);

const searchIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>';

const homeIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>';

const menuIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>';

export class NavDrawerStyling {
  private navDrawer: IgcNavDrawerComponent;

  constructor() {
    this.navDrawer = document.querySelector('igc-nav-drawer') as IgcNavDrawerComponent;
    const toggleButton = document.querySelector('igc-icon-button[name="menu"]') as IgcIconButtonComponent;

    this.navDrawer.onclick = this.navDrawerItemClick.bind(this);
    toggleButton.onclick = this.toggleNavDrawer.bind(this);

    registerIconFromText('home', homeIcon);
    registerIconFromText('search', searchIcon);
    registerIconFromText('menu', menuIcon);
  }

  public navDrawerItemClick = (e: any) => {
    const target = e.target as HTMLElement;
    const drawerItem = target.closest('igc-nav-drawer-item');

    if (drawerItem) {
      drawerItem.active = true;

      const drawerItems = Array.from<IgcNavDrawerItemComponent>(
        this.navDrawer.querySelectorAll('igc-nav-drawer-item')
      ).filter((item) => item !== drawerItem);

      drawerItems.forEach((item) => {
        item.active = false;
      });
    }
  }

  public toggleNavDrawer = (e: any) => {
    this.navDrawer?.toggle();
  }
}

export function initialize() {
  return new NavDrawerStyling();
}