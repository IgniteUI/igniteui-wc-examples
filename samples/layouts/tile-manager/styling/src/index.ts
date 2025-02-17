import { defineComponents, IgcTileManagerComponent, IgcTileComponent, IgcTileHeaderComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'
import './styles.css'

defineComponents(IgcTileManagerComponent, IgcTileComponent, IgcTileHeaderComponent,);

export class TileManagerStyling {
  constructor() {
  }
}

new TileManagerStyling();
