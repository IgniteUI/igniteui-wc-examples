import { defineComponents, IgcRatingComponent } from "igniteui-webcomponents";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { IgcGridLite, ColumnConfiguration } from "igc-grid-lite";
import { createProductInfo, ProductInfo } from "./mock-data";
import "igniteui-webcomponents/themes/light/bootstrap.css";

IgcGridLite.register();
defineComponents(IgcRatingComponent);

const formatter = new Intl.NumberFormat("en-EN", {
  style: "currency",
  currency: "EUR",
});

abstract class Base extends LitElement {
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

  protected format = (params: any) => formatter.format(params.value);

  @state()
  protected data: ProductInfo[] = Array.from({ length: 50 }, () =>
    createProductInfo()
  );

  @state()
  protected columns: ColumnConfiguration<ProductInfo>[] = [
    { key: "name", headerText: "Product Name" },
    {
      key: "price",
      headerText: "Price",
      type: "number",
      cellTemplate: this.format,
    },
    { key: "sold", type: "number", headerText: "Units sold" },
    { key: "total", headerText: "Total sold", cellTemplate: this.format },
    {
      key: "rating",
      type: "number",
      headerText: "Customer rating",
      cellTemplate: ({ value }) => html` <igc-rating
        readonly
        step="0.01"
        value=${value}
      ></igc-rating>`,
    },
  ];
}

@customElement("column-config-basic")
export class ColumnConfigurationBasic extends Base {
  protected render() {
    return html`<igc-grid-lite
      .columns=${this.columns}
      .data=${this.data}
    ></igc-grid-lite>`;
  }
}
