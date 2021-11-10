import 'igniteui-webcomponents/themes/material.css';
import { defineComponents, IgcButtonComponent, IgcRadioComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';
import './ButtonSizingStyle.css';

export class ButtonSizing {
    radioGroup: IgcRadioGroupComponent;
    outlinedButton: IgcButtonComponent;
    flatButton: IgcButtonComponent;
    containedButton: IgcButtonComponent;
    fabButton: IgcButtonComponent;

    constructor() {
        defineComponents(IgcButtonComponent, IgcRadioComponent, IgcRadioGroupComponent);
        this.radioGroup = document.getElementById('radio-group') as IgcRadioGroupComponent;
        this.outlinedButton = document.getElementById('outlined-btn') as IgcButtonComponent;
        this.flatButton = document.getElementById('flat-btn') as IgcButtonComponent;
        this.containedButton = document.getElementById('contained-btn') as IgcButtonComponent;
        this.fabButton = document.getElementById('fab-btn') as IgcButtonComponent;

        this.radioGroup.addEventListener('click', (radio: any) => {
            this.outlinedButton.size = radio.target.value;
            this.flatButton.size = radio.target.value;
            this.containedButton.size = radio.target.value;
            this.fabButton.size = radio.target.value;
        });        
    }
}

new ButtonSizing();
