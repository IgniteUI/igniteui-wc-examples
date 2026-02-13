import {
  defineComponents,
  IgcNavDrawerComponent,
  IgcIconComponent,
  IgcButtonComponent,
  IgcRippleComponent,
  IgcCardComponent,
  IgcSnackbarComponent,
  IgcIconButtonComponent,
  IgcAvatarComponent,
  registerIconFromText
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './styles.css';

defineComponents(IgcButtonComponent, IgcRippleComponent, IgcCardComponent, IgcIconButtonComponent, IgcIconComponent, IgcAvatarComponent, IgcNavDrawerComponent, IgcSnackbarComponent);

const logout =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M14.08 15.59L16.67 13H7v-2h9.67l-2.59-2.59L15.5 7l5 5l-5 5l-1.42-1.41M19 3a2 2 0 0 1 2 2v4.67l-2-2V5H5v14h14v-2.67l2-2V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.11.89-2 2-2h14Z"/></svg>';

const list =
  '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3,8H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,8Zm18,8H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0-5H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>';

const dashboard =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M13 9V3h8v6ZM3 13V3h8v10Zm10 8V11h8v10ZM3 21v-6h8v6Z"/></svg>';

const imgSearch =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21V3h7v2H5v14h14v-5.35l2 2V21Zm18.55-7.6l-3.1-3.1q-.525.35-1.125.525q-.6.175-1.275.175q-1.85 0-3.15-1.312q-1.3-1.313-1.3-3.188q0-1.875 1.313-3.188Q14.225 2 16.1 2q1.875 0 3.188 1.312Q20.6 4.625 20.6 6.5q0 .675-.2 1.3t-.5 1.15L22.95 12ZM16.1 9q1.05 0 1.775-.725q.725-.725.725-1.775q0-1.05-.725-1.775Q17.15 4 16.1 4q-1.05 0-1.775.725Q13.6 5.45 13.6 6.5q0 1.05.725 1.775Q15.05 9 16.1 9ZM6 17l3-4l2.25 3l3-4L18 17Z"/></svg>';

const checkedList =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3 16v-2h8v2Zm0-4v-2h12v2Zm0-4V6h12v2Zm13.35 11l-3.55-3.55l1.4-1.4l2.15 2.1l4.25-4.25l1.4 1.45Z"/></svg>';

const readerMode =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h16q.825 0 1.413.588Q22 5.175 22 6v12q0 .825-.587 1.413Q20.825 20 20 20Zm9-2h7V6h-7Zm1-3h5v-1.5h-5Zm0-2.5h5V11h-5Zm0-2.5h5V8.5h-5Z"/></svg>';

const questionAnswer =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/></svg>';

const settings =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.612-.3q-.288-.175-.563-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7q.075-.375.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337L2.65 9.9q-.3-.225-.375-.6q-.075-.375.125-.7l1.85-3.225q.175-.35.537-.438q.363-.087.713.038l2.175.9q.275-.2.575-.375q.3-.175.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3q.287.175.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7q-.075.375-.375.6l-1.875 1.425q.025.175.025.337v.675q0 .163-.05.338l1.875 1.425q.3.225.375.6q.075.375-.125.7l-1.85 3.2q-.2.325-.562.438q-.363.112-.713-.013l-2.125-.9q-.275.2-.575.375q-.3.175-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025Q15.55 13.45 15.55 12q0-1.45-1.025-2.475Q13.5 8.5 12.05 8.5q-1.475 0-2.488 1.025Q8.55 10.55 8.55 12q0 1.45 1.012 2.475Q10.575 15.5 12.05 15.5Z"/></svg>';

export class CardIntegrationComponent {
  constructor() {
    const btn = document.getElementById('drawerToggle');
    const navDrawer = document.querySelector('igc-nav-drawer') as IgcNavDrawerComponent;

    btn!.addEventListener('click', () => {
      navDrawer.toggle();
    });

    registerIconFromText('logout', logout);
    registerIconFromText('list', list);
    registerIconFromText('dashboard', dashboard);
    registerIconFromText('imgSearch', imgSearch);
    registerIconFromText('checkedList', checkedList);
    registerIconFromText('readerMode', readerMode);
    registerIconFromText('questionAnswer', questionAnswer);
    registerIconFromText('settings', settings);
  }
}

export function initialize() {
  return new CardIntegrationComponent();
}