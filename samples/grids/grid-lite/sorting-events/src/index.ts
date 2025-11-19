import { IgcGridLite, SortExpression } from "igc-grid-lite";
import { css, html } from "lit";
import { PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import type { ProductInfo } from "./mock-data";
import { Base } from "./base";

IgcGridLite.register();

@customElement("sort-config-events")
export class SortConfigEvents extends Base {
  static styles = [
    ...Base.styles,
    css`
      #log {
        margin-top: 0.5rem;
        border: 1px solid var(--border);
        padding: 1rem;
        min-height: 1rem;
        font-size: 0.75rem;
        max-height: 5rem;
        overflow-y: auto;
      }
    `
  ];

  protected logRef!: HTMLDivElement;
  protected log: string[] = [];

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.logRef = this.renderRoot.querySelector("#log") as HTMLDivElement;
  }

  private get time() {
    return `[${new Date().toLocaleTimeString()}]`;
  }

  private updateLog(message: string) {
    if (this.log.length > 10) {
      this.log.shift();
    }
    this.log = [...this.log, message];
    this.requestUpdate();
  }

  private async scrollLog() {
    await this.updateComplete;
    this.logRef.scrollTo({ top: this.logRef.scrollHeight, behavior: "smooth" });
  }

  protected async handleSorting(
    event: CustomEvent<SortExpression<ProductInfo>>
  ) {
    const { detail, type } = event;
    if (!["price", "total", "sold"].includes(detail.key)) {
      event.preventDefault();
      this.updateLog(
        `${
          this.time
        } :: Event \`${type}\` :: Sort operation was prevented for column '${
          detail.key
        }'`
      );
    } else {
      this.updateLog(
        `${this.time} :: Event \`${type}\` :: Column '${
          detail.key
        }' is being sorted with expression: ${JSON.stringify(detail)}`
      );
    }
    await this.scrollLog();
  }

  protected async handleSorted(
    event: CustomEvent<SortExpression<ProductInfo>>
  ) {
    const { detail, type } = event;
    this.updateLog(
      `${this.time} :: Event \`${type}\` :: Column '${
        detail.key
      }' was sorted with expression: ${JSON.stringify(detail)}`
    );
    await this.scrollLog();
  }

  protected render() {
    return html`<igc-grid-lite
        @sorting=${this.handleSorting}
        @sorted=${this.handleSorted}
        .columns=${this.columns}
        .data=${this.data}
      ></igc-grid-lite>
      <div id="log">
        ${this.log.map((each) => html`<p><code>${each}</code></p>`)}
      </div>`;
  }
}
