import 'igniteui-webcomponents-grids/grids/combined';
import { defineAllComponents, IgcButtonComponent } from 'igniteui-webcomponents';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

defineAllComponents();

export class About {

    private _bind: () => void;

    constructor() {
        var backBtn = document.getElementById("backBtn") as IgcButtonComponent;
        
        this._bind = () => {
            backBtn.addEventListener("click", () => { window.location.replace("./index.html");});
        }
        this._bind();
    }
}

new About();
