import { IgcGridLite } from "igc-grid-lite";
import { html } from "lit";
import { PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import type { ProductInfo } from "./mock-data";
import { Base } from "./base";

IgcGridLite.register();

@customElement("sort-config-simple")
export class SortConfigSimple extends Base {
  protected grid!: IgcGridLite<ProductInfo>;

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.grid = this.renderRoot.querySelector(IgcGridLite.tagName) as IgcGridLite<ProductInfo>;
    
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
