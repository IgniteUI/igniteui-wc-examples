import { defineComponents, IgcTileManagerComponent, IgcTileComponent, IgcTileHeaderComponent, IgcRadioGroupComponent, IgcRadioComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'

defineComponents(IgcTileManagerComponent, IgcTileComponent, IgcTileHeaderComponent, IgcRadioGroupComponent, IgcRadioComponent);

export class TileManagerResize {
  constructor() {
    document.addEventListener('igcChange', (e) => {
      const radio = e.target as IgcRadioComponent;
      if (radio.value === "Hover") {
        document.querySelector("igc-tile-manager")?.setAttribute("resize-mode", "hover");
      }
      else {
        document.querySelector("igc-tile-manager")?.setAttribute("resize-mode", "always");
      }
    })
  }
}

new TileManagerResize();
