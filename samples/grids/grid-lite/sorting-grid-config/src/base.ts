import { defineComponents, IgcRatingComponent } from "igniteui-webcomponents";
import { ColumnConfiguration } from "igc-grid-lite";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { createProductInfo, ProductInfo } from "./mock-data";

defineComponents(IgcRatingComponent);

export class Base extends LitElement {
  static styles = [
    css`
      :host {
        contain: content;
        --ig-size: 2;
      }
      igc-grid-lite {
        min-height: 65vh;
      }
    `,
  ];

  // @state()
  protected data: ProductInfo[] = Array.from({ length: 100 }, () =>
    createProductInfo()
  );

  // @state()
  protected columns: ColumnConfiguration<ProductInfo>[] = [
    { key: "name", headerText: "Name", sort: true },
    { key: "price", type: "number", headerText: "Price", sort: true },
    {
      key: "rating",
      type: "number",
      headerText: "Rating",
      sort: true,
      cellTemplate: ({ value }) => html`<igc-rating
        readonly
        step="0.01"
        value=${value}
      ></igc-rating>`,
    },
    { key: "sold", type: "number", headerText: "Sold", sort: true },
    { key: "total", type: "number", headerText: "Total", sort: true },
  ];
}
