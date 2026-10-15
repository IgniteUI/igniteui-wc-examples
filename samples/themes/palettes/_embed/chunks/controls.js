import { a as e, c as t, l as n, n as r, o as i, p as a, s as o, u as s } from "./variants.js";
import { t as c } from "./state.js";
import "./elements.js";
//#region src/sections/color/controls.ts
var l = class extends n {
	static properties = {
		store: { attribute: !1 },
		themes: { type: Boolean }
	};
	constructor() {
		super(), this.themes = !0;
	}
	state = new c(this);
	createRenderRoot() {
		return this;
	}
	render() {
		let { preset: t, theme: n } = this.state.value;
		return a`
      <div class="picker">
        <span class="picker-label" id="picker-palette">Palette</span>
        <igc-button-group
          selection="single"
          aria-labelledby="picker-palette"
          @igcSelect=${({ detail: e }) => {
			i(e) && this.state.set({ preset: e });
		}}
        >
          ${r.map((e) => a`
              <igc-toggle-button value=${e.key} ?selected=${e.key === t}>
                ${e.label}
              </igc-toggle-button>
            `)}
        </igc-button-group>
      </div>

      ${this.themes ? a`
      <div class="picker">
        <span class="picker-label" id="picker-theme">Theme</span>
        <igc-button-group
          selection="single"
          aria-labelledby="picker-theme"
          @igcSelect=${({ detail: e }) => {
			o(e) && this.state.set({ theme: e });
		}}
        >
          ${e.map((e) => a`
              <igc-toggle-button value=${e} ?selected=${e === n}>
                ${e === "light" ? "Light" : "Dark"}
              </igc-toggle-button>
            `)}
        </igc-button-group>
      </div>
          ` : s}
    `;
	}
};
t("ig-color-controls", l);
//#endregion
export { l as ColorControls };
