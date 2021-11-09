import { defineComponents, IgcAvatarComponent, IgcIconComponent, registerIcon } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

defineComponents(IgcAvatarComponent, IgcIconComponent);
export class InitialsAvatar {
    constructor() {
        registerIcon(
            "home",
            "https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_home_24px.svg",
            "material"
        );
    }
}

new InitialsAvatar();
