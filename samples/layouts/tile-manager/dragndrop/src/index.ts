import { defineComponents, IgcTileManagerComponent, IgcTileComponent, IgcRadioGroupComponent, IgcRadioComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'

defineComponents(IgcTileManagerComponent, IgcTileComponent, IgcRadioGroupComponent, IgcRadioComponent);

export class TileManagerDragnDrop {
  constructor() {
    document.addEventListener('igcChange', (e) => {
      const radio = e.target as IgcRadioComponent;
      switch (radio.value) {
        case 'TileHeader': document.querySelector("igc-tile-manager")?.setAttribute("drag-mode", "tile-header");
          break;
        case 'Tile': document.querySelector("igc-tile-manager")?.setAttribute("drag-mode", "tile");
          break;
        case 'Slide': document.querySelector("igc-tile-manager")?.setAttribute("drag-action", "slide");
          break;
        case 'Swap': document.querySelector("igc-tile-manager")?.setAttribute("drag-action", "swap");
          break;
      }
    })
  }
}

new TileManagerDragnDrop();
