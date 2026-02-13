import { defineComponents, IgcTextareaComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcTextareaComponent);

export class TextareaResize {
    constructor() {}
}

export function initialize() {
  return new TextareaResize();
}