import { defineComponents, IgcTileManagerComponent, IgcTileComponent, IgcInputComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'

defineComponents(IgcTileManagerComponent, IgcTileComponent, IgcInputComponent);

export class TileManagerColumn {
  tileManager = document.querySelector("igc-tile-manager");
  constructor() {
    document.addEventListener('igcChange', (e) => {
      const fieldInput = e.target as IgcInputComponent;
      switch (fieldInput.label) {
        case 'Columns Number': this.tileManager?.setAttribute("column-count", fieldInput.value);
          break;
        case 'Gap Size': this.tileManager?.setAttribute("gap", fieldInput.value);
          break;
        case 'Minimum Column Width': this.tileManager?.setAttribute("min-column-width", fieldInput.value);
          break;
        case 'Minimum Row Height': this.tileManager?.setAttribute("min-row-height", fieldInput.value);
          break;
      }
    })
  }
}

new TileManagerColumn();
