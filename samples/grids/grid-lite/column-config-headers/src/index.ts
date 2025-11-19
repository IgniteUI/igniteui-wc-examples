import {
  defineComponents,
  IgcSelectComponent,
  IgcSelectItemComponent,
  IgcRatingComponent
} from "igniteui-webcomponents";
import { css, html } from "lit";
import { PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import { IgcGridLite, ColumnConfiguration } from "igc-grid-lite";
import type { ProductInfo } from "./mock-data";
import { ColumnConfigurationBasic } from "./simple";
import "igniteui-webcomponents/themes/light/bootstrap.css";

IgcGridLite.register();
defineComponents(
  IgcSelectComponent,
  IgcSelectItemComponent,
  IgcRatingComponent
);

@customElement("column-config-headers")
export class HeadersDynamic extends ColumnConfigurationBasic {
  static styles = [
    ...ColumnConfigurationBasic.styles,
    css`
      section {
        display: flex;
        flex-flow: row nowrap;
        justify-content: start;
        align-items: baseline;
        margin-bottom: 2rem;
        gap: 1rem;
      }
    `
  ];

  protected grid!: IgcGridLite<ProductInfo>;
  protected select!: IgcSelectComponent;
  protected currentColumn!: keyof ProductInfo;
  protected columns: ColumnConfiguration<ProductInfo>[] = [
    { key: "name", headerText: "Product Name" },
    {
      key: "price",
      headerText: "Price per item",
      type: "number",
      cellTemplate: this.format
    },
    { key: "sold", type: "number", headerText: "Units sold" },
    { key: "total", headerText: "Total sold", cellTemplate: this.format },
    {
      key: "rating",
      type: "number",
      headerText: "Customer rating",
      headerTemplate: () => html`<h3>⭐ Rating ⭐</h3>`,
      cellTemplate: ({ value }) => html` <igc-rating
        readonly
        step="0.01"
        value=${value}
      ></igc-rating>`
    }
  ];

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.grid = this.renderRoot.querySelector(IgcGridLite.tagName) as IgcGridLite<ProductInfo>;
    this.select = this.renderRoot.querySelector(IgcSelectComponent.tagName) as IgcSelectComponent;
  }

  private get currentColumnText() {
    return this.grid?.getColumn(this.currentColumn)?.headerText ?? "";
  }

  private handleSelection({ detail }: CustomEvent<IgcSelectItemComponent>) {
    this.currentColumn = detail.value as keyof ProductInfo;
  }

  private handleInput({ detail }: CustomEvent<string>) {
    this.grid.updateColumns({
      key: this.currentColumn,
      headerText: detail || undefined
    });

    this.columns = [...this.grid.columns];
    this.select.requestUpdate();
  }

  private renderPanel() {
    return html`<section>
      <igc-select
        @igcChange=${this.handleSelection}
        label="Select a column to edit:"
        flip
      >
        ${this.columns.map(
          (column) => html`
            <igc-select-item .value=${column.key}
              >${column.headerText ?? column.key}</igc-select-item
            >
          `
        )}
      </igc-select>
      <igc-input
        @igcChange=${this.handleInput}
        label="Change the header text value to see it reflected in the grid
          below"
        .value=${this.currentColumnText}
      >
      </igc-input>
    </section>`;
  }

  protected render() {
    return html` ${this.renderPanel()}
      <igc-grid-lite .columns=${this.columns} .data=${this.data}></igc-grid-lite>`;
  }
}
