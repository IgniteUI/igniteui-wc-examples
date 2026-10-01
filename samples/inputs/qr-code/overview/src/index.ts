import {
    defineComponents,
    IgcQrCodeComponent,
    IgcRadioComponent,
    IgcRadioGroupComponent,
    IgcSwitchComponent,
    type IgcCheckboxChangeEventArgs,
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import "./index.css";

defineComponents(
    IgcQrCodeComponent,
    IgcRadioComponent,
    IgcRadioGroupComponent,
    IgcSwitchComponent
);

export class QrCodeOverview {
    constructor() {
        const qrCode = document.querySelector('igc-qr-code') as IgcQrCodeComponent;
        const shapeGroup = document.querySelector('#shapeGroup') as IgcRadioGroupComponent;
        const sizeGroup = document.querySelector('#sizeGroup') as IgcRadioGroupComponent;
        const logoSwitch = document.querySelector('igc-switch') as IgcSwitchComponent;

        const logoSrc = qrCode.logoSrc;

        shapeGroup.addEventListener('igcChange', (e) => {
            const shape = (e as CustomEvent<IgcRadioComponent>).detail.value as
                | 'square'
                | 'circle'
                | 'rounded';
            qrCode.dotStyle = shape;
            qrCode.squareStyle = shape;
        });

        sizeGroup.addEventListener('igcChange', (e) => {
            const size = (e as CustomEvent<IgcRadioComponent>).detail.value;
            qrCode.size = Number(size);
        });

        logoSwitch.addEventListener('igcChange', (e) => {
            const checked = (e as CustomEvent<IgcCheckboxChangeEventArgs>).detail.checked;
            qrCode.logoSrc = checked ? logoSrc : undefined;
        });
    }
}

new QrCodeOverview();

