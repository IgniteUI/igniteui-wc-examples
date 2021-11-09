import 'igniteui-webcomponents/themes/material.css';
import "igniteui-webcomponents";
import { IgcListComponent, IgcRadioGroupComponent } from "igniteui-webcomponents";

export class ListOverview {
    list: IgcListComponent;
    radioGroup: IgcRadioGroupComponent;

    constructor() {
        this.list = document.getElementById("list") as IgcListComponent;
        this.radioGroup = document.getElementById("radio-group") as IgcRadioGroupComponent;

        this.radioGroup.addEventListener("click", (radio: any) => {
            this.list.size = radio.target.value;
        });
    }
}

new ListOverview();
