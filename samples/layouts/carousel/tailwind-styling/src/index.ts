import {
  defineComponents,
  IgcButtonComponent,
  IgcCarouselComponent,
  IgcIconComponent,
  registerIconFromText,
} from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcButtonComponent, IgcCarouselComponent, IgcIconComponent);

registerIconFromText(
  "chevron-left",
  '<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>'
);
registerIconFromText(
  "chevron-right",
  '<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>'
);
