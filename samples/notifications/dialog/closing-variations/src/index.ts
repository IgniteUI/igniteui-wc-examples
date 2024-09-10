import {defineComponents, IgcDialogComponent, IgcSwitchComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcDialogComponent, IgcButtonComponent, IgcSwitchComponent);
export class DialogClosingVariations {
    constructor() {
        const dialog = document.getElementById('dialog') as IgcDialogComponent;
        const keepOpenOnEscSwitch = document.getElementById('keepOpenOnEscSwitch') as IgcSwitchComponent;
        const closeOnOutsideClickSwitch = document.getElementById('closeOnOutsideClickSwitch') as IgcSwitchComponent;

        closeOnOutsideClickSwitch!.addEventListener("igcChange", (ev: CustomEvent) => {
            dialog.closeOnOutsideClick = ev.detail.checked;
        });

        keepOpenOnEscSwitch!.addEventListener("igcChange", (ev: CustomEvent) => {
            dialog.keepOpenOnEscape = ev.detail.checked;
        });
    }
}

new DialogClosingVariations();
