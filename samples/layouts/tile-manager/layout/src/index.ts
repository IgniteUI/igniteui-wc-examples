import { defineComponents, IgcTileManagerComponent, IgcButtonComponent, IgcButtonGroupComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'

defineComponents(IgcTileManagerComponent, IgcButtonComponent, IgcButtonGroupComponent);

export class TileManagerLayout {

  constructor() {
    let serializedData: string;
    let index = 4;
    var tileManager = document.querySelector<IgcTileManagerComponent>('#tile-manager1')!;

    document.querySelector('#saveL')?.addEventListener('click', () => {
      const tileManager =
        document.querySelector<IgcTileManagerComponent>('#tile-manager1')!;

      serializedData = tileManager.saveLayout();
    })

    document.querySelector('#loadL')?.addEventListener('click', () => {
      const tileManager =
        document.querySelector<IgcTileManagerComponent>('#tile-manager1')!;

      tileManager.loadLayout(serializedData);
    })

    document.querySelector('#addT')?.addEventListener('click', () => {
      const tiles = tileManager.querySelectorAll('igc-tile');
      const newTile = document.createElement('igc-tile');
      const contentHeader = document.createElement('span');
      const content = document.createElement('p');
      index++;
      contentHeader.textContent = `Tile ${index} header`;
      content.textContent = `Content for Tile ${index}`;
      contentHeader.setAttribute('slot', 'title');
      newTile.position = 0;
      newTile.append(contentHeader);
      newTile.append(content);
      tileManager.insertBefore(newTile, tiles[3]);
    })

    document.querySelector('#remT')?.addEventListener('click', () => {
      const firstTile = tileManager.querySelector('igc-tile:first-of-type');

      if (firstTile) {
        firstTile.remove();
      }
    })
  }
}

new TileManagerLayout();
