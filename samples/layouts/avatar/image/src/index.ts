import { defineComponents, IgcAvatarComponent, IgcIconComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcAvatarComponent, IgcIconComponent);
const homeIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>';

export class ImageAvatar {
    constructor() {
        registerIconFromText("home", homeIcon, "material");
    }
}

new ImageAvatar();
