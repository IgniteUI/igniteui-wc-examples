import 'igniteui-webcomponents-grids/grids/combined';
import { defineAllComponents, IgcButtonComponent } from 'igniteui-webcomponents';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
defineAllComponents();

export class Sample {
    constructor() {
        var backBtn = document.getElementById("backBtn") as IgcButtonComponent;
        backBtn.addEventListener("click", () => { window.location.replace("./grids/pivot-grid/state-persistence-main");});
    }
}

export function initialize() {
  return new Sample();
}