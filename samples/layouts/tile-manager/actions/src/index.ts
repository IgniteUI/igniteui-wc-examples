import { defineComponents, IgcTileManagerComponent, IgcIconButtonComponent, IgcIconComponent, IgcButtonComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'

defineComponents(IgcTileManagerComponent, IgcIconButtonComponent, IgcIconComponent, IgcButtonComponent);

export class TileManagerActions {

  constructor() {
    const northEast =
      '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z"/></svg>';
    registerIconFromText('north_east', northEast, 'material');
    const southWest =
      '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-200v-400h80v264l464-464 56 56-464 464h264v80H200Z"/></svg>';
    registerIconFromText('south_west', southWest, 'material');
    const more =
      '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>';
    registerIconFromText('more', more, 'material');
    const chart =
      '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z"/></svg>';
    registerIconFromText('chart', chart, 'material');

    document.querySelector('#customOne')?.addEventListener('click', (event: Event) => {

      const tile = (event.target as HTMLElement).closest('igc-tile');

      if (tile) {
        tile.maximized = !tile.maximized;

        const actionsSlot = tile.querySelector('[slot="actions"]') as HTMLElement;
        const currentBtn = event.target as HTMLElement;

        if (currentBtn) {
          if (tile.maximized) {
            currentBtn.setAttribute('name', 'south_west');
            currentBtn.setAttribute('aria-label', 'collapse');

            const chartBtn = document.createElement('igc-icon-button');
            chartBtn.classList.add('additional-action');
            chartBtn.setAttribute('slot', 'actions');
            chartBtn.setAttribute('variant', 'flat');
            chartBtn.setAttribute('collection', 'material');
            chartBtn.setAttribute('name', 'chart');
            chartBtn.setAttribute('aria-label', 'chart');

            const moreBtn = document.createElement('igc-icon-button');
            moreBtn.classList.add('additional-action');
            moreBtn.setAttribute('slot', 'actions');
            moreBtn.setAttribute('variant', 'flat');
            moreBtn.setAttribute('collection', 'material');
            moreBtn.setAttribute('name', 'more');
            moreBtn.setAttribute('aria-label', 'more');

            tile.append(chartBtn);
            tile.append(moreBtn);
          } else {
            currentBtn.setAttribute('name', 'north_east');
            currentBtn.setAttribute('aria-label', 'expand');

            const additionalButtons =
              actionsSlot.parentElement?.querySelectorAll('.additional-action');
            additionalButtons?.forEach((btn) => btn.remove());
          }
        }
      }
    })



    document.querySelector('#customTwo')?.addEventListener('click', (event: Event) => {
      const tile = (event.target as HTMLElement).closest('igc-tile');

      if (tile) {
        tile.maximized = !tile.maximized;

        const currentBtn = event.target as HTMLElement;

        if (currentBtn) {
          if (tile.maximized) {
            currentBtn.setAttribute('name', 'south_west');
            currentBtn.setAttribute('aria-label', 'collapse');
          }
          else {
            currentBtn.setAttribute('name', 'north_east');
            currentBtn.setAttribute('aria-label', 'expand');
          }
        }
      }
    })

    
  }
}

export function initialize() {
  return new TileManagerActions();
}