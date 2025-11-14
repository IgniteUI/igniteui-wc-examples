import {
  defineComponents,
  IgcCircularProgressComponent
} from "igniteui-webcomponents";
import { IgcGridLite, DataPipelineConfiguration, SortExpression } from "igc-grid-lite";
import { css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import type { ProductInfo } from "./mock-data";
import { Base } from "./base";

IgcGridLite.register();
defineComponents(IgcCircularProgressComponent);

@customElement("sort-config-pipeline")
export class extends Base {
  static styles = [
    ...Base.styles,
    css`
      section {
        position: relative;
      }
      igc-circular-progress {
        visibility: hidden;
        --diameter: 4rem;
        background-color: rgba(255, 255, 255, 0.5);
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .in-operation {
        visibility: visible;
        pointer-events: all;
        user-select: contain;
      }
      p {
        border: 1px solid var(--border);
        padding: 1rem;
        min-height: 1rem;
        font-size: 0.75rem;
      }
    `
  ];

  @state()
  protected inOperation = false;

  @state()
  protected qs = "";

  protected buildUri(state: SortExpression<ProductInfo>[]) {
    const uri: string[] = [];
    for (const expr of state) {
      if (expr.direction === "none") {
        continue;
      }
      uri.push(
        expr.direction === "ascending"
          ? `asc(${expr.key})`
          : `desc(${expr.key})`
      );
    }
    return `GET: /data?sort_by=${uri.join(",")}`;
  }

  protected config: DataPipelineConfiguration<ProductInfo> = {
    sort: async ({ data, grid }) => {
      this.inOperation = true;
      this.qs = grid.sortExpressions.length
        ? this.buildUri(grid.sortExpressions)
        : "";
      await new Promise((resolve) => setTimeout(resolve, 250));
      this.inOperation = false;
      return data;
    }
  };

  protected render() {
    return html`
      <div>
        <h5>Generated request</h5>
        <p>
          <code>${this.qs}</code>
        </p>
      </div>
      <section>
        <igc-circular-progress
          class=${classMap({ "in-operation": this.inOperation })}
          indeterminate
        ></igc-circular-progress>
        <igc-grid-lite
          .data=${this.data}
          .columns=${this.columns}
          .dataPipelineConfiguration=${this.config}
        ></igc-grid-lite>
      </section>
    `;
  }
}
