import { defineComponents, IgcTileManagerComponent, IgcRadioGroupComponent, IgcRadioComponent, IgcInputComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'

defineComponents(IgcTileManagerComponent, IgcRadioGroupComponent, IgcRadioComponent, IgcInputComponent);

export class TileManagerResize {
  constructor() {
    const tileManager = document.querySelector("igc-tile-manager");
    document.addEventListener('igcChange', (e) => {
      const radio = e.target as IgcRadioComponent;
      const fieldInput = e.target as IgcInputComponent;
      if (tileManager) {
        switch (radio.value) {
          case 'Hover': tileManager.setAttribute("resize-mode", "hover");
            break;
          case 'Always': tileManager.setAttribute("resize-mode", "always");
            break;
          case 'None': tileManager.setAttribute("resize-mode", "none");
            break;
        }

        switch (fieldInput.label) {
          case 'Minimum Column Width': tileManager.minColumnWidth = fieldInput.value;;
            break;
          case 'Minimum Row Height': tileManager.minRowHeight = fieldInput.value;;
            break;
        }
      }
    })
  }
}

new TileManagerResize();
