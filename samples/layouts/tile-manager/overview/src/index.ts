import { defineComponents, IgcTileManagerComponent, IgcTileComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'

defineComponents(IgcTileManagerComponent, IgcTileComponent);

export class TileManagerOverview {
  constructor() {
  }
}

new TileManagerOverview();
