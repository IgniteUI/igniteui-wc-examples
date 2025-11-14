import {
  defineComponents,
  IgcSelectComponent,
  IgcSelectItemComponent
} from "igniteui-webcomponents";
import { css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Base } from "./base";
import { IgcGridLite, ColumnConfiguration } from "igc-grid-lite";
import type { ProductInfo } from "./mock-data";
import darkBootstrap from "igniteui-webcomponents/themes/dark/bootstrap.css?inline";
import darkFluent from "igniteui-webcomponents/themes/dark/fluent.css?inline";
import darkMaterial from "igniteui-webcomponents/themes/dark/material.css?inline";
import darkIndigo from "igniteui-webcomponents/themes/dark/indigo.css?inline";
import Bootstrap from "igniteui-webcomponents/themes/light/bootstrap.css?inline"
import Fluent from "igniteui-webcomponents/themes/light/fluent.css?inline";
import Material from "igniteui-webcomponents/themes/light/material.css?inline";
import Indigo from "igniteui-webcomponents/themes/light/indigo.css?inline";

IgcGridLite.register();
defineComponents(IgcSelectItemComponent, IgcSelectComponent);

const themeMap = {
  "Bootstrap Dark": darkBootstrap,
  "Fluent Dark": darkFluent,
  "Material Dark": darkMaterial,
  "Indigo Dark": darkIndigo,
  Bootstrap: Bootstrap,
  Fluent: Fluent,
  Material: Material,
  Indigo: Indigo
};

type Theme = keyof typeof themeMap;

@customElement("styling-config-themes")
export class Sample extends Base {
  static styles = [
    css`
      :host {
        contain: content;
        --ig-size: 2;
      }
      igc-grid-lite {
        min-height: 400px;
      }
      section {
        display: flex;
        margin-bottom: 2rem;
        gap: 2rem;
      }
    `
  ];

  @state()
  protected theme: Theme = "Bootstrap";

  @state()
  protected columns: ColumnConfiguration<ProductInfo>[] = [
    { key: "name", headerText: "Product", sort: true, filter: true },
    {
      key: "price",
      headerText: "Price per item",
      sort: true,
      filter: true,
      type: "number"
    },
    {
      key: "sold",
      headerText: "Items sold",
      sort: true,
      filter: true,
      type: "number"
    },
    {
      key: "total",
      headerText: "Total",
      sort: true,
      filter: true,
      type: "number"
    },
    {
      key: "rating",
      headerText: "User rating",
      type: "number",
      sort: true,
      filter: true,
      cellTemplate: ({ value }) =>
        html`<igc-rating readonly .value=${value}></igc-rating>`
    }
  ];

  #updateTheme({ detail }: CustomEvent<IgcSelectItemComponent>) {
    this.theme = detail.value as Theme;
  }

  protected get activeTheme() {
    const styles = themeMap[this.theme];
    return styles.replaceAll(":root", "igc-grid-lite");
  }

  protected render() {
    const themes = Object.keys(themeMap).sort();

    return html`<style>
        ${this.activeTheme}
      </style>
      <section>
        <igc-select
          flip
          .value=${this.theme}
          label="Select a theme:"
          @igcChange=${this.#updateTheme}
        >
          ${themes.map(
            (theme) =>
              html`<igc-select-item .value=${theme}>${theme}</igc-select-item>`
          )}
        </igc-select>
      </section>
      <igc-grid-lite .columns=${this.columns} .data=${this.data}></igc-grid-lite>`;
  }
}
