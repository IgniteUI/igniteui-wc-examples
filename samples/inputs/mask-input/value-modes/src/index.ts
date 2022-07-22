import { defineComponents, IgcIconComponent, IgcMaskInputComponent, IgcRadioComponent, IgcRadioGroupComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcIconComponent, IgcMaskInputComponent, IgcRadioComponent, IgcRadioGroupComponent);

const fileIcon =
'<svg width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="document"><polyline class="cls-1" points="25 9 25 29 7 29 7 3 16 3"/><line class="cls-1" x1="16" x2="25" y1="3" y2="9"/><line class="cls-1" x1="16" x2="16" y1="3" y2="9"/><line class="cls-1" x1="25" x2="16" y1="9" y2="9"/><line class="cls-1" x1="11" x2="16" y1="17" y2="17"/><line class="cls-1" x1="11" x2="20" y1="21" y2="21"/></g></svg>';

export class MaskInputValueMode {
    private maskInput: IgcMaskInputComponent;
    private span: HTMLElement;

    constructor() {
        this.span = document.getElementById('value-span') as HTMLElement;
        this.maskInput = document.getElementById('mask-input') as IgcMaskInputComponent;
        const radioGroup = document.getElementById('radio-group') as IgcRadioGroupComponent;

        this.maskInput.addEventListener('igcInput', () => this.setSpanValue());

        radioGroup.addEventListener('click', (radio: any) => {
            this.maskInput.valueMode = radio.target.value;
            this.setSpanValue();
        });

        registerIconFromText("file", fileIcon);
    }

    public setSpanValue = () => {
        this.span.innerHTML = `Value: ${this.maskInput.value}`;
    }
}

new MaskInputValueMode();
