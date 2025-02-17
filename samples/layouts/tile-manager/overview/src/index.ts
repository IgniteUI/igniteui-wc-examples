import { defineComponents, IgcTileManagerComponent, IgcTileComponent, IgcTileHeaderComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'

defineComponents(IgcTileManagerComponent, IgcTileComponent, IgcTileHeaderComponent);

export class TileManagerOverview {
  constructor() {
  }
}

new TileManagerOverview();
