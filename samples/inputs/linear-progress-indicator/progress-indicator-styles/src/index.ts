import { defineComponents, IgcLinearProgressComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcLinearProgressComponent);

export class ProgressIndicatorStyles {
    private customLabelLinear: IgcLinearProgressComponent;
    private hideLabelLinear: IgcLinearProgressComponent;
    constructor() {
        this.customLabelLinear = document.getElementById("customLabelLinear") as IgcLinearProgressComponent;
        this.hideLabelLinear = document.getElementById("hideLabelLinear") as IgcLinearProgressComponent;
        requestAnimationFrame(() => {
            this.customLabelLinear.labelAlign = "bottom-end";
            this.customLabelLinear.labelFormat = "Custom text";
            this.hideLabelLinear.hideLabel = true;
        });
    }
}

new ProgressIndicatorStyles();
