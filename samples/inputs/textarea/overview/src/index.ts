import { defineComponents, IgcTextareaComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";

defineComponents(IgcTextareaComponent);

export class TextareaOverview {
    constructor() {}
}

export function initialize() {
  return new TextareaOverview();
}