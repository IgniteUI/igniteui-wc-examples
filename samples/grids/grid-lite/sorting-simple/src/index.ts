import { IgcGridLite } from "igc-grid-lite";
import { html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { ProductInfo } from "./mock-data";
import { Base } from "./base";

IgcGridLite.register();

@customElement("sort-config-simple")
export class extends Base {
  @query(IgcGridLite.is)
  protected grid!: IgcGridLite<ProductInfo>;

  firstUpdated() {
    this.grid.updateColumns({
      key: "name",
      sort: { comparer: (a, b) => a.length - b.length }
    });
  }

  protected render() {
    return html`<igc-grid-lite
      .columns=${this.columns}
      .data=${this.data}
    ></igc-grid-lite>`;
  }
}
