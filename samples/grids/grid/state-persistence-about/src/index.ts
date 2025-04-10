import 'igniteui-webcomponents-grids/grids/combined';
import { defineAllComponents, IgcButtonComponent } from 'igniteui-webcomponents';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
defineAllComponents();

export class Sample {
    private _bind: () => void;

    constructor() {
        var backBtn = document.getElementById("backBtn") as IgcButtonComponent;

        this._bind = () => {
            backBtn.addEventListener("click", () => { window.location.replace("./grids/grid/state-persistence-main");});
        }
        this._bind();
    }
}

new Sample();
