import {
  defineComponents,
  IgcSwitchComponent
} from "igniteui-webcomponents";
import { css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from 'lit/directives/class-map.js';
import { IgcGridLite } from "igc-grid-lite";
import styles from './custom.scss?inline';
import { Base } from "./base";

IgcGridLite.register();
defineComponents(IgcSwitchComponent);

@customElement("styling-custom-theme")
export class Sample extends Base {
  static styles = [
    css`
      :host {
        contain: content;
      }
      igc-grid-lite {
        min-height: 400px;
        --ig-size: 2;
      }
      section {
        margin-bottom: 2rem;
      }
    `,
  ];

  @state()
  protected theme: 'dark' | 'light' = 'dark';

  protected render() {
    this.columns.forEach((col) => (col.filter = true));
    const nextTheme = this.theme === 'dark' ? 'light' : 'dark';

    return html`
      <style>
        ${styles}
      </style>
      <section>
        <igc-switch
          @igcChange=${() => (this.theme = nextTheme)}
          label-position="before"
          >Switch to ${nextTheme} theme</igc-switch
        >
      </section>
      <igc-grid-lite
        class=${classMap({
          'custom-light': this.theme === 'light',
          'custom-dark': this.theme === 'dark',
        })}
        .columns=${this.columns}
        .data=${this.data}
      ></igc-grid-lite>`;
  }
}
