import { defineComponents, IgcIconComponent, IgcMaskInputComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcIconComponent, IgcMaskInputComponent);

const textIcon =
'<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="textIconTitle" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" color="#000000"> <title id="textIconTitle">Text</title> <path d="M2 18L4.08333 13M12 18L9.91667 13M4.08333 13L7 6L9.91667 13M4.08333 13H9.91667"/> <circle cx="18" cy="14" r="4"/> <line x1="22" y1="10" x2="22" y2="18"/> </svg>';

export class MaskInputOverview {
    constructor() {
        registerIconFromText("text", textIcon);
    }
}

new MaskInputOverview();
