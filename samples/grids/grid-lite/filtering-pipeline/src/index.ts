import {
  IgcGridLite,
  DataPipelineConfiguration,
  FilterExpression,
  FilterOperation
} from "igc-grid-lite";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { User } from "./mock-data";
import { Base } from "./base";

IgcGridLite.register();

function groupBy<T extends object>(arr: T[], key: keyof T) {
  const out: Record<string, T[]> = {};
  for (const each of arr) {
    const slot = each[key] as string;
    if (!out[slot]) {
      out[slot] = [];
    }
    out[slot].push(each);
  }
  return out;
}

@customElement("filter-config-remote")
export class FilterConfigRemote extends Base {
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

  protected inOperation = false;
  protected qs: string = "";

  protected config: DataPipelineConfiguration<User> = {
    filter: async ({ data, grid }) => {
      this.inOperation = true;
      this.buildUri(grid.filterExpressions);
      await new Promise((resolve) => setTimeout(resolve, 250));
      this.inOperation = false;
      this.requestUpdate();
      return data;
    }
  };

  protected mapExpressions(arr: FilterExpression<User>[]) {
    return arr
      .map(({ searchTerm, criteria, condition }, idx) => {
        const c = (condition as unknown) as FilterOperation<User>;
        return idx < 1
          ? `${c.name}("${searchTerm}")`
          : `${criteria?.toUpperCase()} ${c.name}("${searchTerm}")`;
      })
      .join(" ");
  }

  protected buildUri(state: FilterExpression<User>[]) {
    const out: string[] = [];
    const qs = groupBy(state, "key");
    for (const [key, exprs] of Object.entries(qs)) {
      out.push(`${key}(${this.mapExpressions(exprs)})`);
    }
    this.qs = `GET: /data?filter=${out.join("&")}`;
    this.requestUpdate();
  }

  protected render() {
    return html`<div>
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
      </section>`;
  }
}
