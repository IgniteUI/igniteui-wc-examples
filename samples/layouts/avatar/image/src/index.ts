import 'igniteui-webcomponents/src/components/avatar/avatar';
import 'igniteui-webcomponents/src/components/icon/icon';
import { registerIcon } from 'igniteui-webcomponents/src/components/icon/icon.registry';
import 'igniteui-webcomponents/src/styles/themes/material.css';

export class ImageAvatar {
    constructor() {}
}

registerIcon(
    "home",
    "https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_home_24px.svg",
    "material"
);

new ImageAvatar();
