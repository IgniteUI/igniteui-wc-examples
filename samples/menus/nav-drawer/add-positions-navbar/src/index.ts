import { defineComponents, IgcNavbarComponent, IgcNavDrawerComponent, IgcNavDrawerItemComponent,
  IgcIconComponent, IgcRadioComponent, IgcRadioGroupComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcNavbarComponent, IgcNavDrawerComponent, IgcIconComponent, IgcRadioComponent, IgcRadioGroupComponent);

const searchIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>';

const homeIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>';

const menuIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
export class NavDrawerAddPositionsNavbar {
    constructor() {
      const menu = document.getElementById('menu');
      const navDrawer = document.querySelector('igc-nav-drawer') as IgcNavDrawerComponent;
      const navbarHeader = document.getElementById('navbar-header');

      menu!.addEventListener('click', () => {
        navDrawer.show();
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
          drawerItem.active = true;
          const span = drawerItem.querySelector('span');
          navbarHeader!.innerHTML = span!.innerText;

          const drawerItems = Array.from<IgcNavDrawerItemComponent>(
            navDrawer.querySelectorAll('igc-nav-drawer-item')
          ).filter((item) => item !== drawerItem);

          drawerItems.forEach((item) => {
            item.active = false;
          });
        }
      }

      const radioGroup = document.getElementById('radio-group') as IgcRadioGroupComponent;

      radioGroup.addEventListener('click', (radio: any) => {
          navDrawer.position = radio.target.value;
      });

      registerIconFromText('home', homeIcon);
      registerIconFromText('menu', menuIcon);
      registerIconFromText('search', searchIcon);
    }
}

new NavDrawerAddPositionsNavbar();
