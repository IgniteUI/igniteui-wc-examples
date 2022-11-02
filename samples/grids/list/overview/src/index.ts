import {defineComponents, IgcAvatarComponent, IgcButtonComponent, IgcListComponent, IgcRadioComponent, IgcRadioGroupComponent} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcAvatarComponent, IgcButtonComponent, IgcListComponent, IgcRadioComponent, IgcRadioGroupComponent);
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
