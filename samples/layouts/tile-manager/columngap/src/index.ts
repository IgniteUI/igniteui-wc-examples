import { defineComponents, IgcTileManagerComponent, IgcInputComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'

defineComponents(IgcTileManagerComponent, IgcInputComponent);

export class TileManagerColumn {

  constructor() {
    const tileManager = document.querySelector("igc-tile-manager");
    document.addEventListener('igcChange', (e) => {
      const fieldInput = e.target as IgcInputComponent;
      if (tileManager) {
        switch (fieldInput.label) {
          case 'Columns Number': tileManager.columnCount = parseInt(fieldInput.value);
            break;
          case 'Gap Size': tileManager.gap = fieldInput.value;
            break;
        }
      }
    })
  }
}

export function initialize() {
  return new TileManagerColumn();
}