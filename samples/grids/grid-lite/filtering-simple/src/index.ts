import { IgcGridLite } from "igc-grid-lite";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Base } from "./base";

IgcGridLite.register();

@customElement("filter-config-simple")
export class extends Base {
  protected render() {
    return html`<igc-grid-lite
      .data=${this.data}
      .columns=${this.columns}
    ></igc-grid-lite>`;
  }
}
