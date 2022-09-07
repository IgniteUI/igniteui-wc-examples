import { defineComponents, IgcCircularProgressComponent, IgcIconButtonComponent, registerIconFromText} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './DynamicCircularProgressStyle.css';

defineComponents(IgcCircularProgressComponent, IgcIconButtonComponent);
const addIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>';
const removeIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13H5v-2h14v2z"/></svg>';

export class DynamicCircularProgress {
    private circularProgress: IgcCircularProgressComponent;
    private addIcon: IgcIconButtonComponent;
    private removeIcon: IgcIconButtonComponent;

    constructor() {
        registerIconFromText("remove", removeIcon, "material");
        registerIconFromText("add", addIcon, "material");
        this.circularProgress = document.getElementById("circularProgress") as IgcCircularProgressComponent;
        this.circularProgress.value = 0;
        this.removeIcon = document.getElementById("removeIcon") as IgcIconButtonComponent;
        this.addIcon = document.getElementById("addIcon") as IgcIconButtonComponent;

        this.removeIcon.addEventListener('click', () => {
            if(this.circularProgress.value > 0) {
                this.circularProgress.value = this.circularProgress.value - 10;
            }
            else {
                this.circularProgress.value = 0;
            }
        });

        this.addIcon.addEventListener('click', () => {
            this.circularProgress.value = this.circularProgress.value + 10;
        });
    }
}

new DynamicCircularProgress();
