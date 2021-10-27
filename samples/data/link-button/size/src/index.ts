import './ButtonSizingStyle.css';
import 'igniteui-webcomponents/src/styles/themes/material.css';
import 'igniteui-webcomponents';
import { IgcLinkButtonComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';

export class LinkButtonSizing {
    radioGroup: IgcRadioGroupComponent;
    outlinedButton: IgcLinkButtonComponent;
    flatButton: IgcLinkButtonComponent;
    containedButton: IgcLinkButtonComponent;
    fabButton: IgcLinkButtonComponent;

    constructor() {
        this.radioGroup = document.getElementById('radio-group') as IgcRadioGroupComponent;
        this.outlinedButton = document.getElementById('outlined-btn') as IgcLinkButtonComponent;
        this.flatButton = document.getElementById('flat-btn') as IgcLinkButtonComponent;
        this.containedButton = document.getElementById('contained-btn') as IgcLinkButtonComponent;
        this.fabButton = document.getElementById('fab-btn') as IgcLinkButtonComponent;

        this.radioGroup.addEventListener('click', (radio: any) => {
            this.outlinedButton.size = radio.target.value;
            this.flatButton.size = radio.target.value;
            this.containedButton.size = radio.target.value;
            this.fabButton.size = radio.target.value;
        });        
    }
}

new LinkButtonSizing();
