import { defineComponents, IgcTileManagerComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'
import './styles.css'

defineComponents(IgcTileManagerComponent);

export class TileManagerOverview {
  constructor() {
    const indicatorIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M3.993 12.508V.765h-.979v11.743h.979ZM1.54 10.06V3.21H.56v6.85h.98Z" fill="#09F"/></svg>';

    registerIconFromText('indicator', indicatorIcon);
  }
}

new TileManagerOverview();
