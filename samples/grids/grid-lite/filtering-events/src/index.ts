import "igniteui-webcomponents/themes/light/bootstrap.css";
import { IgcGridLite, IgcFilteredEvent, IgcFilteringEvent } from "igc-grid-lite";
import { css, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { User } from "./mock-data";
import { Base } from "./base";

IgcGridLite.register();

@customElement("filter-config-events")
export class extends Base {
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

  get #time() {
    return `[${new Date().toLocaleTimeString()}]`;
  }

  #updateLog(message: string) {
    if (this.log.length > 10) {
      this.log.shift();
    }
    this.log = [...this.log, message];
  }

  async #scrollLog() {
    await this.updateComplete;
    this.logRef.scrollTo({ top: this.logRef.scrollHeight, behavior: "smooth" });
  }

  @query("#log")
  protected logRef!: HTMLDivElement;

  @state()
  protected log: string[] = [];

  protected async handleFiltering(
    event: CustomEvent<IgcFilteringEvent<User>>
  ) {
    const { expressions, type } = event.detail;
    this.#updateLog(
      `${this.#time} :: Event \`${
        event.type
      }\` :: Filter operation of type '${type}' for column '${
        expressions[0].key
      }'`
    );

    await this.#scrollLog();
  }

  protected async handleFiltered(event: CustomEvent<IgcFilteredEvent<User>>) {
    this.#updateLog(
      `${this.#time} :: Event \`${event.type}\` for column '${
        event.detail.key
      }'`
    );
    await this.#scrollLog();
  }

  protected render() {
    return html`<igc-grid-lite
        @filtering=${this.handleFiltering}
        @filtered=${this.handleFiltered}
        .columns=${this.columns}
        .data=${this.data}
      ></igc-grid-lite>
      <div id="log">
        ${this.log.map((each) => html`<p><code>${each}</code></p>`)}
      </div>`;
  }
}
