import { c as e, l as t, p as n, u as r } from "./variants.js";
import { t as i } from "./state.js";
import "./elements.js";
import { t as a } from "./model.js";
import { n as o, t as s } from "./strip.js";
import { o as c, s as l, t as u } from "./sass-code.js";
//#region src/sections/color/shades.ts
var d = (e, t, i = !0) => n`
  <article>
    <header>
      <span class="dot" style=${`background:${e.seed}`}></span>
      <h3>${e.label}</h3>
      <code>${e.seed}</code>
    </header>
    <div class="stack">${e.shades.map((e) => o(e, t))}</div>
    ${i ? n`<div class="stack">${e.accents.map((e) => o(e, t))}</div>` : r}
  </article>
`, f = class extends t {
	static properties = {
		store: { attribute: !1 },
		embedded: { type: Boolean },
		family: { state: !0 }
	};
	state = new i(this);
	constructor() {
		super(), this.embedded = !1, this.family = "primary";
	}
	get probe() {
		return {
			pinned: this.state.value.pinned,
			pin: (e) => this.state.set({ pinned: e })
		};
	}
	createRenderRoot() {
		return this;
	}
	shownFamily(e) {
		return e.find((e) => e.key === this.family) ?? e[0];
	}
	oneFamily(e) {
		let t = this.shownFamily(e);
		return n`
      <div class="picker family-picker">
        <span class="picker-label" id="shades-family">Family</span>
        <igc-button-group
          selection="single"
          aria-labelledby="shades-family"
          @igcSelect=${({ detail: e }) => {
			e && (this.family = e);
		}}
        >
          ${e.map((e) => n`
              <igc-toggle-button value=${e.key} ?selected=${e === t}>
                ${e.label}
              </igc-toggle-button>
            `)}
        </igc-button-group>
      </div>
      ${d(t, this.probe, !1)}
    `;
	}
	render() {
		let e = a(this.state.value), t = [
			...e.families.map((e) => [`$${e.key}`, c(e.seed.toLowerCase())]),
			["$gray", c(e.surface.seed.toLowerCase())],
			["$surface", c(e.bg.toLowerCase())]
		];
		return n`
      ${this.embedded ? r : n`<p class="sub">
        The promise is simple: any two shades that are 500 apart, like 100 and 600, have
        enough contrast to pass the WCAG AA standard for text. The <code>fitted</code>
        generator is built to keep that promise. The <code>legacy</code> generator keeps
        it only by luck, and often not at all. Hover over any swatch to see its token,
        its measured contrast, and anything that went wrong with it.
      </p>`}

      ${s(this.probe, {
			against: "white",
			rows: this.embedded ? this.shownFamily(e.families).shades : e.families.flatMap((e) => [...e.shades, ...e.accents])
		})}

      ${this.embedded ? this.oneFamily(e.families) : e.families.map((e) => d(e, this.probe))}

      ${this.embedded ? r : n`<ig-code-block
              label=${`${e.label} ${e.theme} as Sass`}
              .code=${l("palette", u("palette", t))}
            ></ig-code-block>`}
    `;
	}
};
e("ig-view-shades", f);
//#endregion
export { f as ViewShades };
