import './ButtonSizingStyle.css';
import 'igniteui-webcomponents';
import { IgcButtonComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';

export class ButtonSizing {
    radioGroup: IgcRadioGroupComponent;
    outlinedButton: IgcButtonComponent;
    flatButton: IgcButtonComponent;
    containedButton: IgcButtonComponent;
    fabButton: IgcButtonComponent;

    constructor() {
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
