import { defineComponents, IgcTileManagerComponent, IgcTileComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'
import './styles.css'

defineComponents(IgcTileManagerComponent, IgcTileComponent);

export class TileManagerStyling {
  constructor() {
  }
}

new TileManagerStyling();
