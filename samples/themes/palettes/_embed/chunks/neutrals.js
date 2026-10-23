import { c as e, l as t, p as n, u as r } from "./variants.js";
import { t as i } from "./state.js";
import "./elements.js";
import { t as a } from "./model.js";
import { n as o, t as s } from "./strip.js";
//#region src/sections/color/neutrals.ts
var c = (e) => n`
  <ig-palette-scope class="mock" .vars=${e.fittedVars}>
    <div class="mock-bar"><span class="mock-title"></span><span class="mock-pill"></span></div>
    <div class="mock-well"><span>sunken, a well cut into the page</span></div>
    <div class="mock-card">
      <strong>raised</strong><span>a card resting on the page</span>
      <div class="mock-line"></div>
      <div class="mock-line is-short"></div>
    </div>
    <div class="mock-pop">
      <strong>overlay</strong><span>a menu floating above everything</span>
    </div>
  </ig-palette-scope>
`, l = (e, t) => n`
  <div class="role">
    <span class="role-swatch" style=${`background:${e.bg}`}>
      <span style=${`background:var(--ig-surface-${t.key})`}></span>
    </span>
    <div>
      <code>${t.key}</code>
      <span class="role-distance">
        ${t.collapsed ? "same as the page" : `${t.away.toFixed(2)}:1 from the page`}
      </span>
    </div>
  </div>
`, u = class extends t {
	static properties = {
		store: { attribute: !1 },
		embedded: { type: Boolean }
	};
	state = new i(this);
	constructor() {
		super(), this.embedded = !1;
	}
	prose(e) {
		return this.embedded ? r : e;
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
	render() {
		let e = a(this.state.value), t = e.surface, r = n`
      <article>
        <header>
          <span class="dot" style=${`background:${t.bg}`}></span>
          <h3>${e.label} ${e.theme}</h3>
          <code>${t.bg}</code>
        </header>
        <div class="two-up">
          ${c(t)}
          <div>
            <div class="stack">${o(t.legacySurface, this.probe)}</div>
            ${this.prose(n`<p class="note">
              Ten numbered shades, with nothing to say what each one is for. On a very
              light or very dark page most of them end up the same color as the
              background, because there is simply no room left to go lighter or darker.
            </p>`)}
            <ig-palette-scope class="roles" .vars=${t.fittedVars}>
              ${t.roles.map((e) => l(t, e))}
            </ig-palette-scope>
            ${this.prose(n`<p class="note">
              Five roles, each named after its job. When a role has no room left it
              deliberately settles onto the background, and a shadow carries the sense
              of depth instead. The mock page on the left is built entirely from these
              five roles, text included.
            </p>`)}
          </div>
        </div>
      </article>
    `, i = n`
      <h3 class="group">Grayscale</h3>
      ${this.prose(n`<p class="sub">
        The grays are anchored to the page rather than to white, so shade 50 is always
        the one closest to the background, in a light theme and a dark one alike. This
        palette seeds them with <code>${t.seed}</code>.
      </p>`)}
      <article>
        <div class="stack">${t.grays.map((e) => o(e, this.probe))}</div>
        ${this.prose(n`<p class="note">
          Both rows fail the same two pairs, and that is deliberate. The gray family uses
          the <code>material</code> scale by default, which keeps the rhythm our grayscale
          has always had at the cost of two AA pairs. The Scales demo below is where that
          trade is made, and where you can undo it.
        </p>`)}
      </article>
    `, u = s(this.probe, {
			against: n`the page, <code>${t.bg.toLowerCase()}</code>`,
			rows: [t.legacySurface, ...t.grays]
		});
		return this.embedded ? n`${u}${i}<h3 class="group">Surface</h3>${r}` : n`${r}${u}${i}`;
	}
};
e("ig-view-neutrals", u);
//#endregion
export { u as ViewNeutrals };
