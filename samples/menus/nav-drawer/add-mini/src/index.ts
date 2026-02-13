import { defineComponents, IgcNavDrawerComponent, IgcNavDrawerItemComponent,
  IgcButtonComponent, IgcIconComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcNavDrawerComponent, IgcButtonComponent, IgcIconComponent);

const searchIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>';

const homeIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>';

export class NavDrawerAddMini {
    constructor() {
      const btn = document.getElementById('toggleBtn');
      const navDrawer = document.querySelector('igc-nav-drawer') as IgcNavDrawerComponent;

      btn!.addEventListener('click', () => {
        navDrawer.toggle();
      })

      document.getElementById('nav-drawer-container')!.onclick = (e) => {
        if(e.target === document.getElementById('content')) {
          navDrawer.hide();
        }
      }

      navDrawer.onclick = (e) => {
        const target = e.target as HTMLElement;
        const drawerItem = target.closest('igc-nav-drawer-item');

        if (drawerItem) {
          const iconName = drawerItem.querySelector('igc-icon')!.name;
          const icons = document.querySelectorAll(`igc-icon`);

          icons.forEach(icon => {
            const parentItem = icon.parentElement! as IgcNavDrawerItemComponent;

            if(icon.name === iconName) {
              parentItem.active = true;
            } else {
              parentItem.active = false;
            }
          })
        }
      }

      registerIconFromText('search', searchIcon);

      registerIconFromText('home', homeIcon);
    }
}

export function initialize() {
  return new NavDrawerAddMini();
}