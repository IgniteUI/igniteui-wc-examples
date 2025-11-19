import { IgcGridLite } from "igc-grid-lite";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { css, html, LitElement } from "lit";
import { PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import {
  createProductInfo,
  createUserSimple,
  ProductInfo,
  UserSimple,
} from "./mock-data";

IgcGridLite.register();

type DataSources = ProductInfo & UserSimple;

@customElement("data-binding-dynamic")
export class Sample extends LitElement {
  static styles = [
    css`
      :host {
        contain: content;
        --ig-size: 1;
      }
      igc-grid-lite {
        margin-top: 1rem;
        min-height: 65vh;
      }
    `,
  ];

  protected grid!: IgcGridLite<DataSources>;
  protected dataType: "products" | "users" = "products";
  protected generators = {
    products: createProductInfo,
    users: createUserSimple,
  };
  protected data: DataSources[] = Array.from({ length: 50 }, () =>
    createProductInfo()
  ) as DataSources[];

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.grid = this.renderRoot.querySelector(IgcGridLite.tagName) as IgcGridLite<DataSources>;
  }

  private switchData() {
    this.dataType = this.dataType === "products" ? "users" : "products";
    const generator = this.generators[this.dataType];
    this.grid.columns = [];
    this.grid.data = Array.from({ length: 50 }, () =>
      generator()
    ) as DataSources[];
  }

  protected render() {
    return html`<section>
      <igc-button @click=${this.switchData}>Switch data</igc-button>
      <igc-grid-lite auto-generate .data=${this.data}></igc-grid-lite>;
    </section>`;
  }
}
