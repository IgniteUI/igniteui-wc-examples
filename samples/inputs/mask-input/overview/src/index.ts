import { defineComponents, IgcIconComponent, IgcMaskInputComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcIconComponent, IgcMaskInputComponent);

const locationIcon =
'<svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="locationIconTitle" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"> <title id="locationIconTitle">Location</title> <path d="M12,21 C16,16.8 18,12.8 18,9 C18,5.6862915 15.3137085,3 12,3 C8.6862915,3 6,5.6862915 6,9 C6,12.8 8,16.8 12,21 Z"/> <circle cx="12" cy="9" r="1"/> </svg>';
export class MaskInputOverview {
    constructor() {
        registerIconFromText("location", locationIcon);
    }
}

export function initialize() {
  return new MaskInputOverview();
}