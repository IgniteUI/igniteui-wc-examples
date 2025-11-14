import { IgcGridLite } from "igc-grid-lite";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { css, html, LitElement } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import {
  createProductInfo,
  createUserSimple,
  ProductInfo,
  UserSimple,
} from "./mock-data";

IgcGridLite.register();

type DataSources = ProductInfo & UserSimple;

@customElement("data-binding-dynamic")
export class extends LitElement {
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

  protected dataType: "products" | "users" = "products";
  protected generators = {
    products: createProductInfo,
    users: createUserSimple,
  };

  #switchData() {
    this.dataType = this.dataType === "products" ? "users" : "products";
    const generator = this.generators[this.dataType];
    this.grid.columns = [];
    this.grid.data = Array.from({ length: 50 }, () =>
      generator()
    ) as DataSources[];
  }

  @query(IgcGridLite.is)
  protected grid!: IgcGridLite<DataSources>;

  @state()
  protected data: DataSources[] = Array.from({ length: 50 }, () =>
    createProductInfo()
  ) as DataSources[];

  protected render() {
    return html`<section>
      <igc-button @click=${this.#switchData}>Switch data</igc-button>
      <igc-grid-lite auto-generate .data=${this.data}></igc-grid-lite>;
    </section>`;
  }
}
