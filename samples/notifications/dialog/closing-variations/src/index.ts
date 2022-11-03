import {defineComponents, IgcDialogComponent, IgcSwitchComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcDialogComponent, IgcButtonComponent, IgcSwitchComponent);
export class DialogClosingVariations {
    constructor() {
        const dialog = document.getElementById('dialog') as IgcDialogComponent;
        const closeOnEscSwitch = document.getElementById('closeOnEscSwitch') as IgcSwitchComponent;
        const closeOnOutsideClickSwitch = document.getElementById('closeOnOutsideClickSwitch') as IgcSwitchComponent;

        closeOnOutsideClickSwitch!.addEventListener("igcChange", (ev: CustomEvent) => {
            dialog.closeOnOutsideClick = ev.detail;
        });

        closeOnEscSwitch!.addEventListener("igcChange", (ev: CustomEvent) => {
            dialog.closeOnEscape = ev.detail;
        });
    }
}

new DialogClosingVariations();
