import { defineComponents, IgcAvatarComponent, IgcCardComponent, IgcListComponent, IgcTileManagerComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'
import './styles.css'

defineComponents(IgcTileManagerComponent, IgcListComponent, IgcAvatarComponent, IgcCardComponent);

export class TileManagerStyling {
  constructor() {
  }
}

new TileManagerStyling();
