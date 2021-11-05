import 'igniteui-webcomponents';
import { registerIcon } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/material.css';

export class AvatarSize {
    constructor() {
        registerIcon(
            "home",
            "https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_home_24px.svg",
            "material"
        );
    }
}

new AvatarSize();
