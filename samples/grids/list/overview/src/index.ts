import {defineComponents, IgcListComponent, IgcListHeaderComponent, IgcListItemComponent, IgcRadioComponent, IgcRadioGroupComponent} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class ListOverview {
    list: IgcListComponent;
    radioGroup: IgcRadioGroupComponent;

    constructor() {
        defineComponents(IgcListComponent, IgcListHeaderComponent, IgcListItemComponent, IgcRadioComponent, IgcRadioGroupComponent);
        this.list = document.getElementById("list") as IgcListComponent;
        this.radioGroup = document.getElementById("radio-group") as IgcRadioGroupComponent;

        this.radioGroup.addEventListener("click", (radio: any) => {
            this.list.size = radio.target.value;
        });
    }
}

new ListOverview();
