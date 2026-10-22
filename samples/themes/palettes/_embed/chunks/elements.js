import { _ as e, c as t, d as n, g as r, h as i, i as a, l as o, m as s, p as c, u as l, v as u, y as d } from "./variants.js";
//#region ../../node_modules/lit-html/directive.js
var f = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, p = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), m = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, h = class extends m {
	constructor(e) {
		if (super(e), this.it = l, e.type !== f.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
	}
	render(e) {
		if (e === l || e == null) return this._t = void 0, this.it = e;
		if (e === n) return e;
		if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
		if (e === this.it) return this._t;
		this.it = e;
		let t = [e];
		return t.raw = t, this._t = {
			_$litType$: this.constructor.resultType,
			strings: t,
			values: []
		};
	}
};
h.directiveName = "unsafeHTML", h.resultType = 1;
var g = p(h);
t("ig-code-block", class extends o {
	static properties = {
		code: { type: String },
		label: { type: String },
		state: { state: !0 },
		highlighted: { state: !0 }
	};
	static styles = d`
    :host {
      display: block;
    }

    header {
      display: flex;
      align-items: center;
      gap: var(--space-3, 12px);
      margin-block-end: var(--space-2, 8px);
    }

    .label {
      font-family: var(--mono, ui-monospace, monospace);
      font-size: var(--text-xs, 11px);
      font-weight: 500;
      letter-spacing: 0.11em;
      text-transform: uppercase;
      color: var(--muted, currentColor);
    }

    button {
      margin-inline-start: auto;
      font-family: var(--mono, ui-monospace, monospace);
      font-size: var(--text-xs, 11px);
      font-weight: 500;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: inherit;
      background: transparent;
      border: 1px solid var(--line, currentColor);
      border-radius: var(--radius-sm, 3px);
      padding: 5px 11px;
      cursor: pointer;
    }

    button:hover {
      border-color: var(--muted, currentColor);
    }

    button:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    /*
     * The theme paints the text; the block's shape is ours. The background is the
     * theme's own page color, so the plain-text moment before highlighting matches.
     */
    pre {
      margin: 0;
      padding: var(--space-4, 16px);
      background: #0d1117;
      border-radius: var(--radius-sm, 3px);
      overflow-x: auto;
      font-family: var(--mono, ui-monospace, monospace);
      font-size: var(--text-md, 14px);
      line-height: 1.6;
    }

    pre:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  `;
	constructor() {
		super(), this.code = "", this.label = "Sass", this.state = "idle", this.highlighted = null;
	}
	willUpdate(e) {
		if (!e.has("code")) return;
		let t = this.code;
		this.highlighted = null, import("./highlight.js").then(({ highlightSass: e }) => e(t)).then((e) => {
			this.code === t && (this.highlighted = e);
		});
	}
	get shortcut() {
		return navigator.platform?.startsWith("Mac") ? "⌘C" : "Ctrl+C";
	}
	select() {
		let e = this.renderRoot.querySelector("pre"), t = getSelection();
		if (!e || !t) return;
		let n = document.createRange();
		n.selectNodeContents(e), t.removeAllRanges(), t.addRange(n);
	}
	async copy() {
		try {
			await navigator.clipboard.writeText(this.code), this.state = "copied";
		} catch {
			this.select(), this.state = "selected";
		}
		setTimeout(() => {
			this.state = "idle";
		}, 2e3);
	}
	get action() {
		return this.state === "copied" ? "Copied" : this.state === "selected" ? `Press ${this.shortcut}` : "Copy";
	}
	render() {
		return c`
      <header>
        <span class="label">${this.label}</span>
        <button type="button" @click=${this.copy}>${this.action}</button>
      </header>
      <div role="region" aria-label=${this.label}>
        ${this.highlighted === null ? c`<pre tabindex="0"><code>${this.code}</code></pre>` : g(this.highlighted)}
      </div>
    `;
	}
});
//#endregion
//#region src/color.ts
var _ = 4.5, v = (e) => Math.min(255, Math.max(0, e)), y = (e) => e === void 0 ? 1 : Number(e), b = (e, t, n, r = !0) => {
	let i = (t) => ((t + e / 30) % 12 + 12) % 12, a = t * Math.min(n, 1 - n), o = (e) => n - a * Math.max(-1, Math.min(i(e) - 3, 9 - i(e), 1));
	return [
		o(0),
		o(8),
		o(4)
	].map((e) => r ? Math.round(v(e * 255)) : e * 255);
}, x = (e, t) => {
	let n = e.match(/^hsla?\(\s*([-\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%\s*(?:[,/]\s*([\d.]+))?/);
	if (n) {
		let [e, r, i] = n.slice(1, 4).map(Number);
		return [...b(e, r / 100, i / 100, t), y(n[4])];
	}
	let r = e.match(/^rgba?\(\s*([-\d.]+)[,\s]+([-\d.]+)[,\s]+([-\d.]+)\s*(?:[,/]\s*([\d.]+))?/);
	if (r) {
		let [e, n, i] = r.slice(1, 4).map(Number);
		return t ? [
			v(e),
			v(n),
			v(i),
			y(r[4])
		] : [
			e,
			n,
			i,
			y(r[4])
		];
	}
	let i = e.trim().match(/^#([0-9a-f]{3,8})$/i);
	if (i) {
		let e = i[1].length < 6 ? [...i[1]].map((e) => e + e).join("") : i[1], t = [
			0,
			2,
			4,
			6
		].map((t) => Number.parseInt(e.slice(t, t + 2) || "ff", 16));
		return [
			t[0],
			t[1],
			t[2],
			t[3] / 255
		];
	}
	throw Error(`unsupported color literal: ${e}`);
}, S = (e) => x(e, !0), C = (e) => x(e, !1), w = (e) => {
	let [t, n, r] = S(e);
	return [
		t,
		n,
		r
	];
}, T = ([e, t, n, r], i) => [
	e,
	t,
	n
].map((e, t) => Math.round(r * e + (1 - r) * i[t])), ee = (e) => {
	let t = e / 255;
	return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
}, te = ([e, t, n]) => .2126 * ee(e) + .7152 * ee(t) + .0722 * ee(n), ne = (e, t) => {
	let n = te(e) + .05, r = te(t) + .05;
	return Math.max(n, r) / Math.min(n, r);
}, E = (e) => {
	let t = [];
	for (let n = 0; n + 5 < e.length; n++) {
		let r = n + 5;
		t.push({
			i: n,
			j: r,
			contrast: ne(e[n], e[r])
		});
	}
	return t;
}, re = (e) => E(e).filter((e) => e.contrast < _).length, ie = (e) => ne(e, [
	255,
	255,
	255
]) >= ne(e, [
	0,
	0,
	0
]) ? "#fff" : "#111", ae = ([e, t, n]) => `#${[
	e,
	t,
	n
].map((e) => e.toString(16).padStart(2, "0")).join("")}`, oe = (e) => {
	let t = Math.abs(e) / 255, n = t <= .04045 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	return Math.sign(e) * n;
}, se = (e) => {
	let t = e <= 0 ? 0 : e >= 1 ? 1 : e;
	return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * t ** (1 / 2.4) - .055) | 0;
}, ce = ([e, t, n]) => {
	let r = oe(e), i = oe(t), a = oe(n), o = Math.cbrt(.4122214708 * r + .5363325363 * i + .0514459929 * a), s = Math.cbrt(.2119034982 * r + .6806995451 * i + .1073969566 * a), c = Math.cbrt(.0883024619 * r + .2817188376 * i + .6299787005 * a), l = .2104542553 * o + .793617785 * s - .0040720468 * c, u = 1.9779984951 * o - 2.428592205 * s + .4505937099 * c, d = .0259040371 * o + .7827717662 * s - .808675766 * c;
	return [
		l,
		Math.hypot(u, d),
		(Math.atan2(d, u) * 180 / Math.PI + 360) % 360
	];
}, le = (e, t, n) => {
	let r = (e + .3963377774 * t + .2158037573 * n) ** 3, i = (e - .1055613458 * t - .0638541728 * n) ** 3, a = (e - .0894841775 * t - 1.291485548 * n) ** 3;
	return [
		4.0767416621 * r - 3.3077115913 * i + .2309699292 * a,
		-1.2684380046 * r + 2.6097574011 * i - .3413193965 * a,
		-.0041960863 * r - .7034186147 * i + 1.707614701 * a
	];
}, ue = (e, t, n) => {
	let r = n * Math.PI / 180;
	return le(e, t * Math.cos(r), t * Math.sin(r));
}, de = (1.0559999999999998 / 1.055) ** 2.4, fe = ([e, t, n]) => e >= -.255 && e <= 255.255 && t >= -.255 && t <= 255.255 && n >= -.255 && n <= 255.255, pe = ([e, t, n]) => e >= -7739938080495357e-20 && e <= de && t >= -7739938080495357e-20 && t <= de && n >= -7739938080495357e-20 && n <= de, me = .37, he = (e, t, n = me) => {
	let r = 0, i = n;
	for (let n = 0; n < 18; n++) {
		let n = (r + i) / 2;
		pe(ue(e, n, t)) ? r = n : i = n;
	}
	return r;
}, ge = (e) => {
	let t = {
		hue: e,
		L: 0,
		C: 0
	};
	for (let n = 1; n < 100; n++) {
		let r = n / 100, i = he(r, e);
		i > t.C && (t = {
			hue: e,
			L: r,
			C: i
		});
	}
	return t;
}, _e = [
	{
		name: "even",
		range: [1.182, 18.232],
		curve: null,
		why: "Spread as evenly as possible. The default."
	},
	{
		name: "material",
		range: [1.04, 16.1],
		curve: [
			.53,
			0,
			.825,
			.785
		],
		why: "The grayscale we have always shipped, light and dark.",
		anchor: "white"
	},
	{
		name: "tailwind",
		range: [1.04, 17.76],
		curve: [
			.615,
			.07,
			.225,
			.43
		],
		why: "The slate scale from Tailwind v4."
	},
	{
		name: "carbon",
		range: [1.1, 18.1],
		curve: [
			.525,
			.295,
			.655,
			.87
		],
		why: "IBM Carbon's gray, 10 through 100."
	}
], ve = [
	1 / 3,
	1 / 3,
	2 / 3,
	2 / 3
], ye = (e, t, n) => {
	let r = 1 - e;
	return 3 * r * r * e * t + 3 * r * e * e * n + e ** 3;
}, be = (e, t) => {
	if (!t) return e;
	let n = 0, r = 1;
	for (let i = 0; i < 24; i++) {
		let i = (n + r) / 2;
		ye(i, t[0], t[2]) < e ? n = i : r = i;
	}
	return ye((n + r) / 2, t[1], t[3]);
}, xe = (e, t) => e.white && t.anchor === "white" ? {
	table: e.white.table,
	anchor: "#ffffff",
	ceiling: e.white.ceiling,
	flip: te(w(e.surface)) <= .5
} : {
	table: e.table,
	anchor: e.anchor,
	ceiling: e.ceiling,
	flip: !1
}, Se = (e, t = 10) => e / (t - 1), Ce = ([e, t], n) => e * (t / e) ** n, we = ({ range: e, curve: t }, n = 10) => Array.from({ length: n }, (r, i) => Ce(e, be(Se(i, n), t))), Te = (e, t, n) => {
	let { samples: r, span: i, rows: a } = e, o = Math.log(n / i[0]) / Math.log(i[1] / i[0]), s = Math.min(r - 1, Math.max(0, Math.round(o * (r - 1))));
	return a[t].slice(s * 6, s * 6 + 6);
}, Ee = (e, t, n = !1) => {
	let r = we(t), i = r.length - 1;
	return r.map((t, a) => Te(e, a, r[n ? i - a : a]));
}, De = (e, t) => e.range[0] === t.range[0] && e.range[1] === t.range[1] && String(e.curve) === String(t.curve) && (e.anchor ?? "surface") === (t.anchor ?? "surface"), Oe = 900, ke = 16, D = 176, Ae = Oe * .05, je = Oe * .9, O = (e) => Ae + e * je, Me = (e) => D - e * (D - ke), Ne = .4, Pe = 12, Fe = Me(1 + Ne) - Pe, Ie = Me(-Ne) + Pe - Fe, Le = 120, Re = (e, t, n) => Math.min(n, Math.max(t, e));
t("ig-curve-editor", class extends o {
	static properties = {
		curve: { attribute: !1 },
		points: { attribute: !1 },
		low: { type: String },
		high: { type: String },
		from: { type: String },
		to: { type: String }
	};
	static styles = d`
    :host {
      display: block;
      color: var(--plot-ink, currentColor);
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
      touch-action: none;
    }

    /*
     * In viewBox units, which render at about 0.95px each in an article column. 14 keeps
     * the labels near 13px on screen; full opacity keeps them at the ink's contrast.
     */
    .tick {
      font-family: var(--mono, ui-monospace, monospace);
      font-size: 14px;
      fill: currentColor;
    }

    .axis {
      letter-spacing: 0.08em;
    }

    .handle {
      cursor: grab;
    }

    .handle:active {
      cursor: grabbing;
    }

    /* The transparent target takes the pointer; the marks are decoration. */
    .handle circle {
      pointer-events: all;
    }

    .handle rect {
      pointer-events: none;
    }

    .handle rect[tabindex] {
      pointer-events: all;
    }

    .handle rect:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  `;
	dragging = null;
	constructor() {
		super(), this.curve = null, this.points = [], this.low = "", this.high = "", this.from = "50", this.to = "900";
	}
	disconnectedCallback() {
		this.release(), super.disconnectedCallback();
	}
	get handles() {
		return this.curve ?? ve;
	}
	change(e) {
		this.dispatchEvent(new CustomEvent("curve-change", {
			detail: e,
			bubbles: !0
		}));
	}
	move(e, t, n) {
		let r = [...this.handles], i = e === "p1" ? 0 : 2;
		r[i] = Re(t, 0, 1), r[i + 1] = Re(n, -Ne, 1 + Ne), this.change(r);
	}
	grab(e, t) {
		e.preventDefault(), this.dragging = t, addEventListener("pointermove", this.onDrag), addEventListener("pointerup", this.release), addEventListener("pointercancel", this.release), e.currentTarget.querySelector("[tabindex]")?.focus();
	}
	onDrag = (e) => {
		let t = this.dragging, n = this.renderRoot.querySelector("svg");
		if (!t || !n) return;
		e.preventDefault();
		let r = n.getBoundingClientRect(), i = ((e.clientX - r.left) / r.width * Oe - Ae) / je, a = (D - (Fe + (e.clientY - r.top) / r.height * Ie)) / (D - ke);
		this.move(t, i, a);
	};
	release = () => {
		this.dragging = null, removeEventListener("pointermove", this.onDrag), removeEventListener("pointerup", this.release), removeEventListener("pointercancel", this.release);
	};
	nudge(e, t) {
		let n = e.shiftKey ? .1 : .02, r = {
			ArrowLeft: [-n, 0],
			ArrowRight: [n, 0],
			ArrowUp: [0, n],
			ArrowDown: [0, -n]
		}[e.key];
		if (!r) return;
		e.preventDefault();
		let i = t === "p1" ? 0 : 2;
		this.move(t, this.handles[i] + r[0], this.handles[i + 1] + r[1]);
	}
	handle(e) {
		let [t, n] = e === "p1" ? this.handles.slice(0, 2) : this.handles.slice(2), [r, a] = e === "p1" ? [0, 0] : [1, 1], o = O(t), s = Me(n);
		return i`
      <line x1=${O(r)} y1=${Me(a)} x2=${o} y2=${s}
        stroke="currentColor" stroke-width="1" opacity=".4" stroke-dasharray="3 3" />
      <g class="handle" @pointerdown=${(t) => this.grab(t, e)}>
        <!-- A target wider than the mark: ten shade dots share this curve. -->
        <circle cx=${o} cy=${s} r="18" fill="transparent" />
        <!-- A ring in the panel color, so the mark reads against the line and the dots. -->
        <rect x=${o - 7} y=${s - 7} width="14" height="14" rx="2"
          fill="none" stroke="var(--panel)" stroke-width="6" />
        <rect
          tabindex="0" role="slider"
          aria-label=${e === "p1" ? "First control point" : "Second control point"}
          aria-valuenow=${Math.round(n * 100)}
          aria-valuemin=${Math.round(-Ne * 100)}
          aria-valuemax=${Math.round((1 + Ne) * 100)}
          x=${o - 7} y=${s - 7} width="14" height="14" rx="2"
          fill="var(--panel)" stroke="currentColor" stroke-width="2"
          @keydown=${(t) => this.nudge(t, e)}
        />
      </g>
    `;
	}
	path() {
		return Array.from({ length: Le + 1 }, (e, t) => {
			let n = t / Le;
			return `${t ? "L" : "M"}${O(n).toFixed(2)} ${Me(be(n, this.curve)).toFixed(2)}`;
		}).join(" ");
	}
	render() {
		return c`
      <svg viewBox=${`0 ${Fe} ${Oe} ${Ie}`} role="img"
        aria-label="Curve mapping shade position to contrast target">
        <line x1=${Ae} y1=${ke} x2=${Ae} y2=${D} stroke="var(--line)" stroke-width="1" />
        <line x1=${Ae} y1=${D} x2=${O(1)} y2=${D} stroke="var(--line)" stroke-width="1" />
        <!-- Closes the range, so a handle pulled above it reads as overshoot. -->
        <line x1=${Ae} y1=${ke} x2=${O(1)} y2=${ke}
          stroke="var(--line)" stroke-width="1" stroke-dasharray="2 4" />
        <text x=${Ae + 6} y=${ke + 14} class="tick">${this.high}</text>
        <text x=${Ae + 16} y=${D - 8} class="tick">${this.low}</text>
        <text x="16" y=${D} transform=${`rotate(-90 16 ${D})`} class="tick axis">CONTRAST</text>
        ${this.points.map((e) => i`<line x1=${O(e.x)} y1=${Me(e.t)} x2=${O(e.x)} y2=${D}
            stroke="var(--line)" stroke-width="1" />`)}
        <path fill="none" stroke="currentColor" stroke-width="2" opacity=".9" d=${this.path()} />
        ${this.points.map((e) => i`<circle cx=${O(e.x)} cy=${Me(e.t)} r="5"
            fill=${e.hex} stroke="currentColor" stroke-width="1.5" />`)}
        ${this.handle("p1")}
        ${this.handle("p2")}
        <text x=${O(0)} y="202" text-anchor="middle" class="tick">${this.from}</text>
        <text x=${O(1)} y="202" text-anchor="middle" class="tick">${this.to}</text>
      </svg>
    `;
	}
});
//#endregion
//#region src/ramp.ts
var ze = (e, t) => `#${e.hex.slice(t * 6, t * 6 + 6)}`, Be = (e, t) => w(ze(e, t)), Ve = (e) => a.map((t, n) => Be(e, n)), He = (e, t) => (e.mask >> t & 1) == 1, Ue = (e) => a.filter((t, n) => He(e, n)).length, We = (e) => {
	let t = Ve(e);
	return t.length - new Set(t.map(String)).size;
}, Ge = (e) => {
	let t = Ve(e), n = t.length - 5, r = re(t), i = Ue(e), a = We(e), o = [{
		text: r ? `${r} of ${n} pairs fail AA` : `all ${n} pairs pass AA`,
		ok: r === 0
	}];
	return o.push(i ? {
		text: `${i} shade${i > 1 ? "s" : ""} clamped`,
		ok: !1
	} : {
		text: "nothing clamped",
		ok: !0
	}), a && o.push({
		text: `${a} shades share a color`,
		ok: !1
	}), o;
}, k = {
	width: 400,
	height: 300,
	left: 46,
	right: 384,
	top: 16,
	bottom: 260
}, A = (e) => k.left + e / me * (k.right - k.left), Ke = (e) => k.bottom - e * (k.bottom - k.top);
t("ig-gamut-plot", class extends o {
	static properties = {
		seed: { type: String },
		legacy: { attribute: !1 },
		fitted: { attribute: !1 }
	};
	static styles = d`
    :host {
      display: block;
      color: var(--plot-ink, currentColor);
    }

    .plot {
      position: relative;
      aspect-ratio: ${k.width} / ${k.height};
      border: 1px solid var(--line);
      border-radius: var(--radius-sm, 3px);
      background: var(--panel);
      overflow: hidden;
    }

    canvas,
    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .tick {
      font-family: var(--mono, ui-monospace, monospace);
      font-size: 9px;
      fill: currentColor;
    }

    .axis {
      letter-spacing: 0.08em;
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-4, 16px);
      margin-block-start: var(--space-3, 12px);
      font-family: var(--mono, ui-monospace, monospace);
      font-size: var(--text-sm, 13px);
      color: var(--muted);
    }

    .legend span {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2, 8px);
    }

    .mark {
      flex: none;
      width: 9px;
      height: 9px;
      border: 1.5px solid currentColor;
      background: currentColor;
    }

    .mark.is-fitted,
    .mark.is-asked {
      border-radius: 50%;
    }

    .mark.is-asked {
      background: transparent;
    }
  `;
	cusps = /* @__PURE__ */ new Map();
	paintedHue = NaN;
	constructor() {
		super(), this.seed = "#000000", this.legacy = {
			hex: "",
			mask: 0,
			ask: []
		}, this.fitted = {
			hex: "",
			mask: 0,
			ask: []
		};
	}
	get cusp() {
		let e = this.cusps.get(this.seed);
		if (e) return e;
		let t = ge(ce(w(this.seed))[2]);
		return this.cusps.set(this.seed, t), t;
	}
	updated() {
		this.paint();
	}
	paint() {
		let e = this.renderRoot.querySelector("canvas"), t = e?.getContext("2d"), { hue: n } = this.cusp;
		if (!e || !t || n === this.paintedHue) return;
		let { width: r, height: i, left: a, right: o, top: s, bottom: c } = k;
		e.width = r, e.height = i;
		let l = t.createImageData(r, i), u = n * Math.PI / 180, d = Math.cos(u), f = Math.sin(u);
		for (let e = s; e <= c; e++) {
			let t = (c - e) / (c - s);
			for (let n = a; n <= o; n++) {
				let i = (n - a) / (o - a) * me, [s, c, u] = le(t, i * d, i * f);
				if (s < -7739938080495357e-20 || s > de || c < -7739938080495357e-20 || c > de || u < -7739938080495357e-20 || u > de) continue;
				let p = (e * r + n) * 4;
				l.data[p] = se(s), l.data[p + 1] = se(c), l.data[p + 2] = se(u), l.data[p + 3] = 255;
			}
		}
		t.putImageData(l, 0, 0), this.paintedHue = n;
	}
	asked() {
		let e = [], t = 0;
		return a.forEach((n, r) => {
			if (!He(this.legacy, r)) return;
			let a = this.legacy.ask, [o, s] = ce([
				a[t * 3],
				a[t * 3 + 1],
				a[t * 3 + 2]
			]), [c, l] = ce(Be(this.legacy, r)), u = Math.min(A(Math.min(s, me)), k.right), d = Ke(Math.max(0, Math.min(1, o)));
			t++, e.push(i`
        <line x1=${u} y1=${d} x2=${A(l)} y2=${Ke(c)}
          stroke="currentColor" stroke-width=".75" opacity=".5" stroke-dasharray="2 2" />
        <circle cx=${u} cy=${d} r="3.4" fill="none" stroke="currentColor" stroke-width="1.1" opacity=".8" />
      `);
		}), e;
	}
	marks(e, t) {
		return a.map((n, r) => {
			let [a, o] = ce(Be(e, r)), s = ze(e, r);
			return t === "square" ? i`<rect x=${A(o) - 4.7} y=${Ke(a) - 4.7} width="9.4" height="9.4"
            fill=${s} stroke="currentColor" stroke-width="1.5" />` : i`<circle cx=${A(o)} cy=${Ke(a)} r="5.2"
            fill=${s} stroke="currentColor" stroke-width="1.5" />`;
		});
	}
	render() {
		let e = this.cusp, { left: t, right: n, top: r, bottom: a } = k;
		return c`
      <div class="plot">
        <canvas></canvas>
        <svg viewBox=${`0 0 ${k.width} ${k.height}`} role="img"
          aria-label="Lightness against chroma at this hue, showing where each generator places its shades">
          <line x1=${t} y1=${r} x2=${t} y2=${a} stroke="currentColor" stroke-width="1" opacity=".45" />
          <line x1=${t} y1=${a} x2=${n} y2=${a} stroke="currentColor" stroke-width="1" opacity=".45" />
          ${[
			0,
			.25,
			.5,
			.75,
			1
		].map((e) => i`<text x=${t - 7} y=${Ke(e) + 3} text-anchor="end" class="tick">${e.toFixed(2)}</text>`)}
          ${[
			0,
			.1,
			.2,
			.3
		].map((e) => i`<text x=${A(e)} y=${a + 14} text-anchor="middle" class="tick">${e.toFixed(1)}</text>`)}
          <text x=${t} y=${a + 32} class="tick axis">CHROMA</text>
          <text x="11" y=${r + 4} transform=${`rotate(-90 11 ${r + 4})`} text-anchor="end" class="tick axis">LIGHTNESS</text>
          <line x1=${A(e.C)} y1=${Ke(e.L)} x2=${A(e.C) + 14} y2=${Ke(e.L)}
            stroke="currentColor" stroke-width="1" opacity=".55" />
          <text x=${A(e.C) + 18} y=${Ke(e.L) + 3} class="tick">cusp ${e.C.toFixed(2)}</text>
          ${this.asked()}
          ${this.marks(this.legacy, "square")}
          ${this.marks(this.fitted, "circle")}
        </svg>
      </div>
      <p class="legend">
        <span><span class="mark is-legacy"></span>legacy</span>
        <span><span class="mark is-fitted"></span>fitted</span>
        <span><span class="mark is-asked"></span>asked for, then clamped</span>
      </p>
    `;
	}
});
//#endregion
//#region ../../node_modules/@lit/reactive-element/decorators/property.js
var qe = {
	attribute: !0,
	type: String,
	converter: e,
	reflect: !1,
	hasChanged: r
}, Je = (e = qe, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function j(e) {
	return (t, n) => typeof n == "object" ? Je(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region ../../node_modules/@lit/reactive-element/decorators/state.js
function Ye(e) {
	return j({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region ../../node_modules/@lit/reactive-element/decorators/base.js
var Xe = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
//#endregion
//#region ../../node_modules/@lit/reactive-element/decorators/query.js
function Ze(e, t) {
	return (n, r, i) => {
		let a = (t) => t.renderRoot?.querySelector(e) ?? null;
		if (t) {
			let { get: e, set: t } = typeof r == "object" ? n : i ?? (() => {
				let e = Symbol();
				return {
					get() {
						return this[e];
					},
					set(t) {
						this[e] = t;
					}
				};
			})();
			return Xe(n, r, { get() {
				let n = e.call(this);
				return n === void 0 && (n = a(this), (n !== null || this.hasUpdated) && t.call(this, n)), n;
			} });
		}
		return Xe(n, r, { get() {
			return a(this);
		} });
	};
}
//#endregion
//#region ../../node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
function Qe(e) {
	return (t, n) => {
		let { slot: r, selector: i } = e ?? {}, a = "slot" + (r ? `[name=${r}]` : ":not([name])");
		return Xe(t, n, { get() {
			let t = (this.renderRoot?.querySelector(a))?.assignedElements(e) ?? [];
			return i === void 0 ? t : t.filter((e) => e.matches(i));
		} });
	};
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/controllers/internals.js
var $e = /* @__PURE__ */ new WeakMap(), et = class {
	get form() {
		return this._internals.form;
	}
	get validity() {
		return this._internals.validity;
	}
	get validationMessage() {
		return this._internals.validationMessage;
	}
	get willValidate() {
		return this._internals.willValidate;
	}
	get labels() {
		let e = this._internals.labels;
		return e && e.length > 0 ? Array.from(e) : null;
	}
	constructor(e, t) {
		this._reflectedRole = null, this._host = e, this._internals = this._host.attachInternals(), this._aria = t?.aria, this._reflectRole = t?.reflectRole ?? !1, t?.initialARIA && this.setARIA(t.initialARIA), $e.set(e, this), e.addController(this);
	}
	hostConnected() {
		this._reflectRoleAttribute();
	}
	hostUpdate() {
		this._aria && this.setARIA(this._aria.call(this._host));
	}
	_reflectRoleAttribute() {
		let e = this._host;
		if (!(this._reflectRole && e.isConnected)) return;
		let t = this._internals.role, n = e.getAttribute("role");
		n !== null && n !== this._reflectedRole || (t ? e.setAttribute("role", t) : e.removeAttribute("role"), this._reflectedRole = t);
	}
	setARIA(e) {
		Object.assign(this._internals, e), "role" in e && this._reflectRoleAttribute();
	}
	getARIA(e) {
		return this._internals[e];
	}
	setState(e, t) {
		t ? this._internals.states.add(e) : this._internals.states.delete(e);
	}
	setFormValue(e, t) {
		this._internals.setFormValue(e, t);
	}
	setValidity(e, t) {
		this._internals.setValidity(e, t);
	}
	checkValidity() {
		return this._internals.checkValidity();
	}
	reportValidity() {
		return this._internals.reportValidity();
	}
};
function tt(e, t) {
	return new et(e, t);
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/definitions/register.js
function M(e, ...t) {
	for (let e of t) e.register();
	customElements.get(e.tagName) || customElements.define(e.tagName, e);
}
//#endregion
//#region ../../node_modules/@lit/context/lib/context-request-event.js
var nt = class extends Event {
	constructor(e, t, n, r) {
		super("context-request", {
			bubbles: !0,
			composed: !0
		}), this.context = e, this.contextTarget = t, this.callback = n, this.subscribe = r ?? !1;
	}
};
//#endregion
//#region ../../node_modules/@lit/context/lib/create-context.js
function rt(e) {
	return e;
}
//#endregion
//#region ../../node_modules/@lit/context/lib/controllers/context-consumer.js
var it = class {
	constructor(e, t, n, r) {
		if (this.subscribe = !1, this.provided = !1, this.value = void 0, this.t = (e, t) => {
			this.unsubscribe && (this.unsubscribe !== t && (this.provided = !1, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = e, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = !0, this.callback && this.callback(e, t)), this.unsubscribe = t;
		}, this.host = e, t.context !== void 0) {
			let e = t;
			this.context = e.context, this.callback = e.callback, this.subscribe = e.subscribe ?? !1;
		} else this.context = t, this.callback = n, this.subscribe = r ?? !1;
		this.host.addController(this);
	}
	hostConnected() {
		this.dispatchRequest();
	}
	hostDisconnected() {
		this.unsubscribe &&= (this.unsubscribe(), void 0);
	}
	dispatchRequest() {
		this.host.dispatchEvent(new nt(this.context, this.host, this.t, this.subscribe));
	}
}, at = class {
	get value() {
		return this.o;
	}
	set value(e) {
		this.setValue(e);
	}
	setValue(e, t = !1) {
		let n = t || !Object.is(e, this.o);
		this.o = e, n && this.updateObservers();
	}
	constructor(e) {
		this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
			for (let [e, { disposer: t }] of this.subscriptions) e(this.o, t);
		}, e !== void 0 && (this.value = e);
	}
	addCallback(e, t, n) {
		if (!n) return void e(this.value);
		this.subscriptions.has(e) || this.subscriptions.set(e, {
			disposer: () => {
				this.subscriptions.delete(e);
			},
			consumerHost: t
		});
		let { disposer: r } = this.subscriptions.get(e);
		e(this.value, r);
	}
	clearCallbacks() {
		this.subscriptions.clear();
	}
}, ot = class extends Event {
	constructor(e, t) {
		super("context-provider", {
			bubbles: !0,
			composed: !0
		}), this.context = e, this.contextTarget = t;
	}
}, st = class extends at {
	constructor(e, t, n) {
		super(t.context === void 0 ? n : t.initialValue), this.onContextRequest = (e) => {
			if (e.context !== this.context) return;
			let t = e.contextTarget ?? e.composedPath()[0];
			t !== this.host && (e.stopPropagation(), this.addCallback(e.callback, t, e.subscribe));
		}, this.onProviderRequest = (e) => {
			if (e.context !== this.context || (e.contextTarget ?? e.composedPath()[0]) === this.host) return;
			let t = /* @__PURE__ */ new Set();
			for (let [e, { consumerHost: n }] of this.subscriptions) t.has(e) || (t.add(e), n.dispatchEvent(new nt(this.context, n, e, !0)));
			e.stopPropagation();
		}, this.host = e, t.context === void 0 ? this.context = t : this.context = t.context, this.attachListeners(), this.host.addController?.(this);
	}
	attachListeners() {
		this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
	}
	hostConnected() {
		this.host.dispatchEvent(new ot(this.context, this.host));
	}
}, ct = class extends EventTarget {
	constructor() {
		super(), globalThis.addEventListener(lt, this);
	}
	handleEvent() {
		this.dispatchEvent(new CustomEvent(ut));
	}
}, lt = "igc-change-theme", ut = "igc-changed-theme", dt = new ct();
//#endregion
//#region node_modules/igniteui-webcomponents/theming/utils.js
function ft(e) {
	return e.replace(/^--|-./g, (e) => e.startsWith("--") ? "" : e.charAt(1).toUpperCase());
}
function pt() {
	let e = getComputedStyle(document.documentElement), t = {};
	for (let n of Array.from(e)) n.startsWith("--") && (t[ft(n)] = e.getPropertyValue(n).trim());
	return t;
}
function mt() {
	return pt();
}
//#endregion
//#region node_modules/igniteui-webcomponents/theming/config.js
var ht, gt;
function _t(e) {
	globalThis.dispatchEvent(new CustomEvent(lt, { detail: e }));
}
function vt(e) {
	return [
		"bootstrap",
		"material",
		"indigo",
		"fluent"
	].includes(e);
}
function yt(e) {
	return ["light", "dark"].includes(e);
}
function bt() {
	if (!(ht && gt)) {
		let e = mt(), t = e.igTheme, n = e.igThemeVariant;
		ht = vt(t) ? t : "bootstrap", gt = yt(n) ? n : "light";
	}
	return {
		theme: ht,
		themeVariant: gt
	};
}
function xt(e, t) {
	ht = e, gt = t;
}
function St(e, t = "light") {
	vt(e) && yt(t) && (xt(e, t), _t({
		theme: ht,
		themeVariant: gt
	}));
}
//#endregion
//#region node_modules/igniteui-webcomponents/theming/context.js
var Ct = rt("ig-theme-context"), wt = class {
	get theme() {
		return this._theme;
	}
	get variant() {
		return this._variant;
	}
	constructor(e, t, n) {
		this._theme = "bootstrap", this._variant = "light", this._themeSource = "uninitialized", this._host = e, this._themes = t, this._options = n, this._host.addController(this), this._contextConsumer = new it(this._host, {
			context: Ct,
			callback: (e) => {
				e && this._applyContextTheme(e);
			},
			subscribe: !0
		});
	}
	hostConnected() {
		this._applyGlobalTheme();
	}
	hostDisconnected() {
		this._themeSource === "global" && dt.removeEventListener(ut, this), this._themeSource = "uninitialized", this._contextConsumer.value = void 0;
	}
	handleEvent() {
		this._themeSource === "global" && this._applyGlobalTheme();
	}
	_applyContextTheme(e) {
		this._themeSource === "global" && dt.removeEventListener(ut, this), this._themeSource = "context", this._applyTheme(e.theme, e.variant);
	}
	_applyGlobalTheme() {
		this._themeSource === "uninitialized" && dt.addEventListener(ut, this);
		let { theme: e, themeVariant: t } = bt();
		this._themeSource = "global", this._applyTheme(e, t);
	}
	_applyTheme(e, t) {
		this._theme = e, this._variant = t, this._adoptStyles(), this._options?.themeChange?.call(this._host, this._theme), this._host.requestUpdate();
	}
	_adoptStyles() {
		let e = this._host.constructor, t = this._themes[this._variant].shared || d``, n = this._themes[this._variant][this._theme] || d``;
		u(this._host.shadowRoot, [
			...e.elementStyles,
			t,
			n
		]);
	}
};
function Tt(e, t, n) {
	return new wt(e, t, n);
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/abort-handler.js
var Et = class {
	constructor() {
		this._controller = new AbortController();
	}
	get signal() {
		return this._controller.signal;
	}
	abort(e) {
		this._controller.abort(e), this._controller = new AbortController();
	}
	reset() {
		this._controller = new AbortController();
	}
};
function Dt() {
	return new Et();
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/utils/arrays.js
function Ot(e) {
	return e.at(0);
}
function kt(e) {
	return e.at(-1);
}
function At(e) {
	return "length" in e ? e.length < 1 : e.size < 1;
}
function jt(e) {
	return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Mt(e, t) {
	let n = [], r = [];
	for (let i of e) (t(i) ? n : r).push(i);
	return [n, r];
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/utils/math.js
function Nt(e, t) {
	return e / t * 100;
}
function Pt(e, t, n) {
	return Math.max(t, Math.min(e, n));
}
function Ft(e, t = 0) {
	let n = Number.parseFloat(e);
	return Number.isFinite(n) ? n : t;
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/utils/types.js
function It(e) {
	return e !== void 0;
}
function Lt(e) {
	return typeof e == "function";
}
function Rt(e) {
	return typeof e == "string";
}
function zt(e) {
	return typeof e == "object" && !!e;
}
function Bt(e) {
	if (!zt(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === null || t === Object.prototype || Object.getPrototypeOf(t) === null ? Object.prototype.toString.call(e) === "[object Object]" : !1;
}
function Vt(e) {
	return zt(e) && "handleEvent" in e;
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/utils/objects.js
function Ht(e) {
	return e === "__proto__" || e === "constructor" || e === "prototype";
}
function Ut(e, t) {
	let n = Object.keys(t), r = n.length;
	for (let i = 0; i < r; i++) {
		let r = n[i];
		if (Ht(r)) continue;
		let a = t[r], o = e[r];
		Array.isArray(a) ? Array.isArray(o) ? e[r] = Ut(o, a) : e[r] = Ut([], a) : Bt(a) ? Bt(o) ? e[r] = Ut(o, a) : e[r] = Ut({}, a) : (o === void 0 || a !== void 0) && (e[r] = a);
	}
	return e;
}
function Wt(e, t) {
	return Ut(structuredClone(e), t);
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/utils/dom.js
function Gt(e) {
	return e.matches(":dir(ltr)");
}
typeof CSS < "u" && "registerProperty" in CSS;
function* Kt(e) {
	let t = e;
	for (; t;) Yt(t) && (yield t), t = t instanceof ShadowRoot ? t.host : t.parentNode;
}
function qt(e, t) {
	return e.getRootNode(t);
}
function Jt(e, t) {
	return qt(e).getElementById(t);
}
function Yt(e) {
	return e instanceof Node && e.nodeType === Node.ELEMENT_NODE;
}
function Xt(e) {
	return e instanceof Node && e.nodeType === Node.DOCUMENT_NODE;
}
function Zt(e) {
	let t = "";
	for (let n of e) t += n.textContent ?? "";
	return t.trim().replace(/\s+/gu, " ");
}
function Qt(e) {
	let t = globalThis.devicePixelRatio || 1;
	return Math.round(e * t) / t;
}
function $t(e, t) {
	Ut(e.style, t);
}
function en(e) {
	return e?.matches(":popover-open") ?? !1;
}
function tn(e) {
	for (let t of Kt(e)) if (getComputedStyle(t).position === "sticky") return !0;
	return !1;
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/controllers/key-bindings.js
var nn = "ArrowLeft", rn = "ArrowRight", an = "ArrowUp", on = "ArrowDown", sn = "Enter", cn = "Home", ln = "PageUp", un = "PageDown", dn = [
	["alt", "altKey"],
	["control", "ctrlKey"],
	["meta", "metaKey"],
	["shift", "shiftKey"]
], fn = dn.map(([e]) => e), pn = new Set(fn);
Object.fromEntries(dn);
function mn(e) {
	return jt(e).map((e) => e.toLowerCase());
}
function hn(e) {
	return e.type === "keydown";
}
function gn(e) {
	return e.type === "keyup";
}
function _n(e) {
	return fn.filter((t) => e.includes(t));
}
function vn(e) {
	let t = [];
	for (let [n, r] of dn) e[r] && t.push(n);
	return t;
}
function yn(e, t) {
	return t.concat(e.length > 1 ? e.toSorted() : e).join("+");
}
var bn = class e {
	static {
		this._defaultOptions = {
			skip: [
				"input",
				"textarea",
				"select"
			],
			bindingDefaults: { preventDefault: !0 }
		};
	}
	get _element() {
		return this._observedElement ? this._observedElement : this._ref?.value || this._host;
	}
	constructor(t, n) {
		this._abortHandle = Dt(), this._bindings = /* @__PURE__ */ new Map(), this._allowedKeys = /* @__PURE__ */ new Set(), this._pressedKeys = /* @__PURE__ */ new Set(), this._host = t, this._ref = n?.ref, this._options = Wt(e._defaultOptions, n ?? {}), Array.isArray(this._options.skip) && (this._skipSelector = this._options.skip.join(",")), t.addController(this);
	}
	_applyEventModifiers(e, t) {
		e.options?.preventDefault && t.preventDefault(), e.options?.stopPropagation && t.stopPropagation();
	}
	_bindingMatches(e, t) {
		let n = e.options?.triggers ?? ["keydown"];
		return hn(t) && n.includes("keydown") ? !t.repeat || !!e.options?.repeat : !!(gn(t) && n.includes("keyup"));
	}
	_shouldSkip(e, t) {
		if (!this._allowedKeys.has(t)) return !0;
		let n = e.composedPath(), r = this._element;
		if (!n.some((e) => e === r)) return !0;
		let i = this._skipSelector;
		if (i) return n.some((e) => Yt(e) && e.matches(i));
		let a = this._options.skip;
		return Lt(a) ? a.call(this._host, e.target, e) : !1;
	}
	hostConnected() {
		let { signal: e } = this._abortHandle;
		this._host.addEventListener("keyup", this, { signal: e }), this._host.addEventListener("keydown", this, { signal: e }), globalThis.addEventListener("blur", this, { signal: e });
	}
	hostDisconnected() {
		this._abortHandle.abort();
	}
	_handleGlobalBlur() {
		this._pressedKeys.clear();
	}
	_handleKeyEvent(e) {
		let t = e.key.toLowerCase(), n = pn.has(t);
		if (this._shouldSkip(e, t)) {
			!n && gn(e) && this._pressedKeys.delete(t);
			return;
		}
		n || this._pressedKeys.add(t);
		let r = vn(e), i = yn(Array.from(this._pressedKeys), r), a = this._bindings.get(i);
		!a && this._pressedKeys.size > 1 && (a = this._bindings.get(yn([t], r))), a && this._bindingMatches(a, e) && (this._applyEventModifiers(a, e), a.handler.call(this._host, e)), !n && gn(e) && this._pressedKeys.delete(t);
	}
	handleEvent(e) {
		switch (e.type) {
			case "keydown":
			case "keyup":
				this._handleKeyEvent(e);
				break;
			case "blur":
				this._handleGlobalBlur();
				break;
		}
	}
	set(e, t, n) {
		let { keys: r, modifiers: i } = xn(e), a = yn(r, _n(i)), o = Wt(this._options.bindingDefaults, n ?? {});
		for (let e of [...r, ...i]) this._allowedKeys.add(e);
		return this._bindings.set(a, {
			keys: r,
			handler: t,
			options: o,
			modifiers: i
		}), this;
	}
	setActivateHandler(e, t) {
		return this.set(sn, e, t), this.set(" ", e, t), this;
	}
	observeElement(e) {
		return e.addEventListener("keydown", this), e.addEventListener("keyup", this), this._observedElement = e, { unsubscribe: () => {
			e.removeEventListener("keydown", this), e.removeEventListener("keyup", this), this._observedElement === e && (this._observedElement = void 0);
		} };
	}
};
function xn(e) {
	let [t, n] = Mt(mn(e), (e) => pn.has(e));
	return {
		keys: n,
		modifiers: t
	};
}
function Sn(e, t) {
	return new bn(e, t);
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/controllers/slot.js
var Cn = "[default]", wn = class {
	constructor(e, t) {
		this._slotCache = /* @__PURE__ */ new Map(), this._initialized = !1, this._host = e, this._host.addController(this), this._options = { ...t }, this._slots = t?.slots ? new Set(t.slots) : void 0;
	}
	_getSlot(e) {
		let t = this._slotCache.get(e);
		if (t?.isConnected) return t;
		let n = e === "[default]" ? "slot:not([name])" : `slot[name="${e}"]`, r = this._host.renderRoot?.querySelector(n) ?? null;
		return r ? this._slotCache.set(e, r) : this._slotCache.delete(e), r;
	}
	getAssignedNodes(e, t = !1) {
		return this._getSlot(e)?.assignedNodes({ flatten: t }) ?? [];
	}
	getAssignedElements(e, t) {
		let n = this._getSlot(e)?.assignedElements({ flatten: t?.flatten }) ?? [];
		return t?.selector ? n.filter((e) => e.matches(t.selector)) : n;
	}
	getAssignedText(e, t = !1) {
		return Zt(this.getAssignedNodes(e, t));
	}
	hasAssignedNodes(e, t = !1) {
		return !At(this.getAssignedNodes(e, t));
	}
	hasAssignedElements(e, t) {
		return !At(this.getAssignedElements(e, t));
	}
	handleEvent(e) {
		let t = e.target.name, n = t === "", r = n ? Cn : t;
		(!this._slots || this._slots.has(r)) && (this._options.onChange?.call(this._host, {
			slot: t,
			isDefault: n,
			isInitial: !1
		}), this._host.requestUpdate());
	}
	hostConnected() {
		this._host.renderRoot.addEventListener("slotchange", this);
	}
	hostDisconnected() {
		this._host.renderRoot.removeEventListener("slotchange", this);
	}
	hostUpdated() {
		!this._initialized && this._options.initial && (this._initialized = !0, this._options.onChange?.call(this._host, {
			slot: "<initial>",
			isDefault: !1,
			isInitial: !0
		}));
	}
};
function Tn(e, t) {
	return new wn(e, {
		...t,
		slots: t?.slots
	});
}
function En(...e) {
	return [Cn, ...e];
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/utils/events.js
function Dn(e, t) {
	let n = Rt(e) ? (t) => t.matches(e) : (t) => e(t);
	return Iterator.from(t.composedPath()).find((e) => Yt(e) && n(e));
}
function On(e, t, n, r) {
	let i = new WeakRef(n), a = (n) => {
		let o = i.deref();
		if (!o) {
			e.removeEventListener(t, a, r);
			return;
		}
		return Vt(o) ? o.handleEvent(n) : o(n);
	};
	e.addEventListener(t, a, r);
}
function kn(e, t, n, r) {
	e.addEventListener(t, (t) => n.call(e, t), r);
}
//#endregion
//#region ../../node_modules/lit-html/directive-helpers.js
var { I: An } = s, jn = (e) => e.strings === void 0, Mn = (e, t) => {
	let n = e._$AN;
	if (n === void 0) return !1;
	for (let e of n) e._$AO?.(t, !1), Mn(e, t);
	return !0;
}, Nn = (e) => {
	let t, n;
	do {
		if ((t = e._$AM) === void 0) break;
		n = t._$AN, n.delete(e), e = t;
	} while (n?.size === 0);
}, Pn = (e) => {
	for (let t; t = e._$AM; e = t) {
		let n = t._$AN;
		if (n === void 0) t._$AN = n = /* @__PURE__ */ new Set();
		else if (n.has(e)) break;
		n.add(e), Ln(t);
	}
};
function Fn(e) {
	this._$AN === void 0 ? this._$AM = e : (Nn(this), this._$AM = e, Pn(this));
}
function In(e, t = !1, n = 0) {
	let r = this._$AH, i = this._$AN;
	if (i !== void 0 && i.size !== 0) if (t) if (Array.isArray(r)) for (let e = n; e < r.length; e++) Mn(r[e], !1), Nn(r[e]);
	else r != null && (Mn(r, !1), Nn(r));
	else Mn(this, e);
}
var Ln = (e) => {
	e.type == f.CHILD && (e._$AP ??= In, e._$AQ ??= Fn);
}, Rn = class extends m {
	constructor() {
		super(...arguments), this._$AN = void 0;
	}
	_$AT(e, t, n) {
		super._$AT(e, t, n), Pn(this), this.isConnected = e._$AU;
	}
	_$AO(e, t = !0) {
		e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), t && (Mn(this, e), Nn(this));
	}
	setValue(e) {
		if (jn(this._$Ct)) this._$Ct._$AI(e, this);
		else {
			let t = [...this._$Ct._$AH];
			t[this._$Ci] = e, this._$Ct._$AI(t, this, 0);
		}
	}
	disconnected() {}
	reconnected() {}
}, zn = () => new Bn(), Bn = class {}, Vn = /* @__PURE__ */ new WeakMap(), Hn = p(class extends Rn {
	render(e) {
		return l;
	}
	update(e, [t]) {
		let n = t !== this.G;
		return n && this.rt(void 0), (n || this.lt !== this.ct) && (this.G = t, this.ht = e.options?.host, this.rt(this.ct = e.element)), l;
	}
	rt(e) {
		if (this.G !== void 0) if (this.isConnected || (e = void 0), typeof this.G == "function") {
			let t = this.ht ?? globalThis, n = Vn.get(t);
			n === void 0 && (n = /* @__PURE__ */ new WeakMap(), Vn.set(t, n)), n.get(this.G) !== void 0 && this.G.call(this.ht, void 0), n.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
		} else this.G.value = e;
	}
	get lt() {
		return typeof this.G == "function" ? Vn.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
	}
	disconnected() {
		this.lt === this.ct && this.rt(void 0);
	}
	reconnected() {
		this.rt(this.ct);
	}
}), Un = { once: !0 };
function Wn() {
	return globalThis?.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
}
var Gn = class {
	get _target() {
		return Yt(this._ref) ? this._ref : this._ref?.value ?? this._host;
	}
	constructor(e, t) {
		this._host = e, this._ref = t, this._host.addController(this);
	}
	_parseKeyframes(e) {
		let t = this._target;
		return e.map((e) => e.height === "auto" ? {
			...e,
			height: `${t.scrollHeight}px`
		} : e);
	}
	hostConnected() {}
	async playExclusive(e) {
		return this.cancelAll(), (await this.play(e)).type === "finish";
	}
	async play(e) {
		let { steps: t, options: n } = e, r = Wn() ? 0 : n?.duration ?? 0;
		if (!Number.isFinite(r)) throw Error("Promise-based animations must be finite.");
		return new Promise((e) => {
			let i = this._target.animate(this._parseKeyframes(t), {
				...n,
				duration: r
			});
			i.addEventListener("cancel", e, Un), i.addEventListener("finish", e, Un);
		});
	}
	cancelAll() {
		for (let e of this._target.getAnimations()) e.cancel();
	}
};
function Kn(e, t) {
	return new Gn(e, t);
}
//#endregion
//#region node_modules/igniteui-webcomponents/animations/easings.js
var qn;
(function(e) {
	e.Quad = "cubic-bezier(0.550, 0.085, 0.680, 0.530)", e.Cubic = "cubic-bezier(0.550, 0.055, 0.675, 0.190)", e.Quart = "cubic-bezier(0.895, 0.030, 0.685, 0.220)", e.Quint = "cubic-bezier(0.755, 0.050, 0.855, 0.060)", e.Sine = "cubic-bezier(0.470, 0.000, 0.745, 0.715)", e.Expo = "cubic-bezier(0.950, 0.050, 0.795, 0.035)", e.Circ = "cubic-bezier(0.600, 0.040, 0.980, 0.335)", e.Back = "cubic-bezier(0.600, -0.280, 0.735, 0.045)";
})(qn ||= {});
var Jn;
(function(e) {
	e.Quad = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", e.Cubic = "cubic-bezier(0.215, 0.610, 0.355, 1.000)", e.Quart = "cubic-bezier(0.165, 0.840, 0.440, 1.000)", e.Quint = "cubic-bezier(0.230, 1.000, 0.320, 1.000)", e.Sine = "cubic-bezier(0.390, 0.575, 0.565, 1.000)", e.Expo = "cubic-bezier(0.190, 1.000, 0.220, 1.000)", e.Circ = "cubic-bezier(0.075, 0.820, 0.165, 1.000)", e.Back = "cubic-bezier(0.175, 0.885, 0.320, 1.275)";
})(Jn ||= {});
var Yn;
(function(e) {
	e.Quad = "cubic-bezier(0.455, 0.030, 0.515, 0.955)", e.Cubic = "cubic-bezier(0.645, 0.045, 0.355, 1.000)", e.Quart = "cubic-bezier(0.770, 0.000, 0.175, 1.000)", e.Quint = "cubic-bezier(0.860, 0.000, 0.070, 1.000)", e.Sine = "cubic-bezier(0.445, 0.050, 0.550, 0.950)", e.Expo = "cubic-bezier(1.000, 0.000, 0.000, 1.000)", e.Circ = "cubic-bezier(0.785, 0.135, 0.150, 0.860)", e.Back = "cubic-bezier(0.680, -0.550, 0.265, 1.550)";
})(Yn ||= {});
//#endregion
//#region node_modules/igniteui-webcomponents/animations/types.js
function Xn(e, t) {
	return {
		steps: e,
		options: t
	};
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/mixins/event-emitter.js
function Zn(e) {
	class t extends e {
		addEventListener(e, t, n) {
			super.addEventListener(e, t, n);
		}
		removeEventListener(e, t, n) {
			super.removeEventListener(e, t, n);
		}
		emitEvent(e, t) {
			return this.dispatchEvent(new CustomEvent(e, Object.assign({
				bubbles: !0,
				cancelable: !1,
				composed: !0,
				detail: {}
			}, t)));
		}
	}
	return t;
}
//#endregion
//#region ../../node_modules/lit-html/directives/if-defined.js
var N = (e) => e ?? l, Qn = class extends h {};
Qn.directiveName = "unsafeSVG", Qn.resultType = 2;
var $n = p(Qn);
//#endregion
//#region node_modules/igniteui-webcomponents/internals/decorators/blazorInclude.js
function er() {
	return (e, t) => {};
}
//#endregion
//#region node_modules/igniteui-webcomponents/components/icon/icon-references.js
var tr = "internal", nr = new Map(Object.entries({
	expand: {
		default: "keyboard_arrow_down",
		indigo: "indigo_chevron_down"
	},
	attach_file: {
		default: "attach_file",
		indigo: "indigo_attach_file"
	},
	attach_document: { default: "document_filled" },
	attach_image: { default: "document_image" },
	auto_suggest: { default: "auto_suggest" },
	send_message: { default: "send" },
	image_thumbnail: { default: "image" },
	table_thumbnail: { default: "table" },
	layout_thumbnail: { default: "layout" },
	code_thumbnail: { default: "code_circle" },
	document_thumbnail: { default: "document_empty" },
	file_generic: { default: "file_generic" },
	file_css: { default: "file_css" },
	file_csv: { default: "file_csv" },
	file_doc: { default: "file_doc" },
	file_htm: { default: "file_htm" },
	file_html: { default: "file_html" },
	file_js: { default: "file_js" },
	file_json: { default: "file_json" },
	file_pdf: { default: "file_pdf" },
	file_rtf: { default: "file_rtf" },
	file_svg: { default: "file_svg" },
	file_txt: { default: "file_txt" },
	file_xls: { default: "file_xls" },
	file_xml: { default: "file_xml" },
	file_zip: { default: "file_zip" },
	file_link: { default: "file_link" },
	more_horiz: { default: "more_horiz" },
	open_in_new: { default: "open_in_new" },
	thumb_up_active: { default: "thumb_up_filled" },
	thumb_up_inactive: { default: "thumb_up_empty" },
	thumb_down_active: { default: "thumb_down_filled" },
	thumb_down_inactive: { default: "thumb_down_empty" },
	regenerate: { default: "reload" },
	copy_content: { default: "copy" },
	collapse: {
		default: "keyboard_arrow_up",
		indigo: "indigo_chevron_up"
	},
	eye_dropper: { default: "colorize" },
	arrow_prev: {
		default: "navigate_before",
		fluent: "arrow_upward",
		indigo: "indigo_chevron_left"
	},
	arrow_next: {
		default: "navigate_next",
		fluent: "arrow_downward",
		indigo: "indigo_chevron_right"
	},
	selected: { default: "chip_select" },
	remove: {
		default: "chip_cancel",
		indigo: "indigo_cancel"
	},
	input_clear: {
		default: "clear",
		indigo: "indigo_clear"
	},
	input_expand: {
		default: "keyboard_arrow_down",
		indigo: "indigo_chevron_down"
	},
	input_collapse: {
		default: "keyboard_arrow_up",
		indigo: "indigo_chevron_up"
	},
	chevron_right: {
		default: "keyboard_arrow_right",
		indigo: "indigo_chevron_right"
	},
	chevron_left: {
		default: "navigate_before",
		indigo: "indigo_chevron_left"
	},
	case_sensitive: { default: "case_sensitive" },
	today: {
		default: "calendar_today",
		indigo: "indigo_calendar_today"
	},
	clock: {
		default: "access_time",
		indigo: "indigo_access_time"
	},
	star_filled: { default: "star" },
	star_outlined: { default: "star_border" },
	prev: {
		default: "navigate_before",
		indigo: "indigo_chevron_left"
	},
	next: {
		default: "navigate_next",
		indigo: "indigo_chevron_right"
	},
	tree_expand: {
		default: "keyboard_arrow_right",
		indigo: "indigo_chevron_right"
	},
	tree_collapse: {
		default: "keyboard_arrow_down",
		indigo: "indigo_chevron_down"
	},
	carousel_prev: {
		default: "keyboard_arrow_left",
		indigo: "indigo_chevron_left"
	},
	carousel_next: {
		default: "keyboard_arrow_right",
		indigo: "indigo_chevron_right"
	},
	error: {
		default: "error",
		indigo: "indigo_error"
	},
	fullscreen: {
		default: "fullscreen",
		indigo: "indigo_fullscreen"
	},
	fullscreen_exit: {
		default: "fullscreen_exit",
		indigo: "indigo_fullscreen_exit"
	},
	expand_content: {
		default: "expand_content",
		indigo: "indigo_expand_content"
	},
	collapse_content: {
		default: "collapse_content",
		indigo: "indigo_collapse_content"
	},
	resize: { default: "resize" }
}).map(([e, t]) => [e, new Map(Object.entries(t).map(([e, t]) => [e, {
	name: t,
	collection: tr
}]))])), rr;
(function(e) {
	e[e.SyncState = 0] = "SyncState", e[e.RegisterIcon = 1] = "RegisterIcon", e[e.UpdateIconReference = 2] = "UpdateIconReference";
})(rr ||= {});
//#endregion
//#region node_modules/igniteui-webcomponents/components/icon/icon-state.broadcast.js
var ir = class e {
	static {
		this._origin = "igniteui-webcomponents";
	}
	constructor(e, t) {
		this._channel = null, this._iconsCollection = e, this._iconReferences = t, globalThis.addEventListener("pageshow", this), globalThis.addEventListener("pagehide", this), this._create();
	}
	send(e) {
		this._channel?.postMessage(e);
	}
	handleEvent(e) {
		switch (e.type) {
			case "message":
				this._syncState(e);
				break;
			case "pageshow":
				this._create();
				break;
			case "pagehide":
				this._dispose();
				break;
		}
	}
	_syncState({ data: { actionType: t, origin: n } }) {
		t !== rr.SyncState || n === e._origin || this.send({
			actionType: rr.SyncState,
			collections: this._userIcons(),
			references: this._userReferences(),
			origin: e._origin
		});
	}
	_create() {
		this._channel || (this._channel = new BroadcastChannel("ignite-ui-icon-channel"), this._channel.addEventListener("message", this));
	}
	_dispose() {
		this._channel?.removeEventListener("message", this), this._channel?.close(), this._channel = null;
	}
	_userReferences() {
		let e = /* @__PURE__ */ new Map();
		for (let [t, n] of this._iconReferences) {
			let r = new Map([...n].filter(([, e]) => e.external));
			r.size > 0 && e.set(t, r);
		}
		return e;
	}
	_userIcons() {
		let e = /* @__PURE__ */ new Map();
		for (let [t, n] of this._iconsCollection) t !== "internal" && e.set(t, new Map(n));
		return e;
	}
}, ar = new Map(Object.entries({
	attach_file: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 -960 960 960\"><path d=\"M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z\"/></svg>" },
	auto_suggest: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M6.586 4.768c.135-.357.65-.357.785 0L7.93 6.25a.411.411 0 0 0 .247.243l1.508.548a.408.408 0 0 1 0 .771l-1.508.548a.42.42 0 0 0-.247.243l-.558 1.48a.421.421 0 0 1-.785 0l-.558-1.48a.415.415 0 0 0-.247-.243l-1.508-.548a.408.408 0 0 1 0-.77l1.508-.549a.415.415 0 0 0 .247-.243l.558-1.48ZM12.21 8.05c.271-.733 1.309-.733 1.58 0l1.124 3.038c.086.23.268.412.498.498l3.038 1.123c.733.272.733 1.31 0 1.582l-3.038 1.123a.843.843 0 0 0-.498.498l-1.123 3.038c-.272.733-1.31.733-1.582 0l-1.123-3.038a.844.844 0 0 0-.498-.498L7.55 14.291c-.733-.272-.733-1.31 0-1.582l3.038-1.123a.843.843 0 0 0 .498-.498l1.123-3.038ZM6.634 16.755a.39.39 0 0 1 .732 0l.31.838a.39.39 0 0 0 .231.23l.838.31a.39.39 0 0 1 0 .733l-.838.31a.39.39 0 0 0-.23.231l-.31.838a.39.39 0 0 1-.733 0l-.31-.838a.39.39 0 0 0-.231-.23l-.838-.31a.39.39 0 0 1 0-.733l.838-.31a.39.39 0 0 0 .23-.231l.31-.838ZM18.366 5.755a.39.39 0 0 0-.732 0l-.31.838a.39.39 0 0 1-.231.23l-.838.31a.39.39 0 0 0 0 .733l.838.31a.39.39 0 0 1 .23.231l.31.838a.39.39 0 0 0 .733 0l.31-.838a.39.39 0 0 1 .231-.23l.838-.31a.39.39 0 0 0 0-.734l-.838-.31a.39.39 0 0 1-.23-.23l-.31-.838Z\"/></svg>" },
	navigate_before: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z\"/></svg>" },
	navigate_next: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z\"/></svg>" },
	keyboard_arrow_up: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z\"/></svg>" },
	keyboard_arrow_down: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z\"/></svg>" },
	keyboard_arrow_right: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z\"/></svg>" },
	keyboard_arrow_left: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z\"/></svg>" },
	send: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 -960 960 960\"><path d=\"M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z\"/></svg>" },
	close: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 -960 960 960\"><path d=\"m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z\"/></svg>" },
	copy: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 -960 960 960\" width=\"24px\"><path d=\"M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z\"/></svg>" },
	colorize: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 -960 960 960\" width=\"24px\" fill=\"#e3e3e3\"><path d=\"M120-120v-190l358-358-58-56 58-56 76 76 124-124q5-5 12.5-8t15.5-3q8 0 15 3t13 8l94 94q5 6 8 13t3 15q0 8-3 15.5t-8 12.5L705-555l76 78-57 57-56-58-358 358H120Zm80-80h78l332-334-76-76-334 332v78Zm447-410 96-96-37-37-96 96 37 37Zm0 0-37-37 37 37Z\"/></svg>" },
	chip_cancel: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z\"/></svg>" },
	chip_select: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/></svg>" },
	document_empty: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 -960 960 960\"><path d=\"M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z\"/></svg>" },
	document_filled: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18 18\"><path d=\"M4.5 1.5c-.825 0-1.493.675-1.493 1.5L3 15c0 .825.667 1.5 1.492 1.5H13.5c.825 0 1.5-.675 1.5-1.5V6l-4.5-4.5h-6Zm5.25 5.25V2.625l4.125 4.125H9.75Z\"/></svg>" },
	document_image: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18 18\"><path d=\"M6.75 1.5 5.378 3H3c-.825 0-1.5.675-1.5 1.5v9c0 .825.675 1.5 1.5 1.5h12c.825 0 1.5-.675 1.5-1.5v-9c0-.825-.675-1.5-1.5-1.5h-2.377L11.25 1.5h-4.5ZM9 12.75c-2.07 0-3.75-1.68-3.75-3.75 0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.68 3.75 3.75 0 2.07-1.68 3.75-3.75 3.75Z\"/></svg>" },
	image: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 -960 960 960\"><path d=\"M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z\"/></svg>" },
	table: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18 18\"><path d=\"M15 1.5H3A1.511 1.511 0 0 0 1.5 3v12A1.511 1.511 0 0 0 3 16.5h12a1.511 1.511 0 0 0 1.5-1.5V3A1.511 1.511 0 0 0 15 1.5ZM6.75 3h4.5v3h-4.5V3Zm0 4.5h4.5v3h-4.5v-3Zm0 4.5h4.5v3h-4.5v-3ZM3 3h2.25v3H3V3Zm0 4.5h2.25v3H3v-3ZM3 15v-3h2.25v3H3Zm12 0h-2.25v-3H15v3Zm0-4.5h-2.25v-3H15v3ZM15 6h-2.25V3H15v3Z\"/></svg>" },
	layout: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18 18\"><path d=\"M15 3H3c-.825 0-1.492.675-1.492 1.5l-.008 9c0 .825.675 1.5 1.5 1.5h12c.825 0 1.5-.675 1.5-1.5v-9c0-.825-.675-1.5-1.5-1.5Zm-3.75 10.5H3v-3h8.25v3Zm0-3.75H3v-3h8.25v3ZM15 13.5h-3V6.75h3v6.75Z\"/></svg>" },
	code_circle: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18 18\"><path d=\"M9 1.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm-1.5 9.155-.75.75L4.345 9 6.75 6.595l.75.75L5.845 9 7.5 10.655Zm3.75.75-.75-.75L12.155 9 10.5 7.345l.75-.75L13.655 9l-2.405 2.405Z\"/></svg>" },
	file_generic: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><g clip-path=\"url(#a)\"><path fill=\"var(--accent-color)\" d=\"M16.998 14h-16a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path fill=\"#fff\" d=\"M14.937 22h-2.94v-4.901h2.828v.899h-1.723v1.09h1.603v.895h-1.603v1.122h1.835V22ZM11.335 22h-2.92v-4.901H9.52v4.006h1.815V22ZM7.298 22H6.194v-4.901h1.104V22ZM5.384 17.998h-1.73V19.2h1.59v.895h-1.59V22H2.552v-4.901h2.833v.899Z\"/><path d=\"M23.572 0a1 1 0 0 1 .709.294l7.419 7.45a1 1 0 0 1 .293.706V28.3a3.567 3.567 0 0 1-3.405 3.7H10.405a3.565 3.565 0 0 1-3.406-3.7V27h2v1.3a1.6 1.6 0 0 0 1.405 1.7h18.184a1.576 1.576 0 0 0 1.4-1.7V9.45h-6.187a1 1 0 0 1-.999-1V2H10.405a1.576 1.576 0 0 0-1.407 1.7V12H7V3.7A3.567 3.567 0 0 1 10.405 0h13.167ZM24.8 7.45h3.78L24.8 3.656V7.45Z\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M-.002 0h32.004v32H-.002z\"/></clipPath></defs></svg>" },
	file_css: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><path fill=\"var(--accent-color)\" d=\"M17 14H1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path d=\"M23.561 0a1 1 0 0 1 .71.294l7.418 7.45a1 1 0 0 1 .294.706V28.3a3.567 3.567 0 0 1-3.405 3.7H10.394a3.565 3.565 0 0 1-3.405-3.7V28a1 1 0 1 1 2 0v.3a1.6 1.6 0 0 0 1.405 1.7h18.184a1.576 1.576 0 0 0 1.4-1.7V9.45h-6.187a1.001 1.001 0 0 1-1-1V2H10.395a1.576 1.576 0 0 0-1.406 1.7V11l-.006.102A1 1 0 0 1 6.988 11l.001-.02V3.7A3.567 3.567 0 0 1 10.394 0h13.167Zm1.23 7.45h3.78l-3.78-3.794V7.45Z\"/><path fill=\"#fff\" d=\"M6.821 21.826c-.357.173-.825.26-1.401.26-.752 0-1.343-.222-1.774-.664-.43-.442-.646-1.03-.646-1.767 0-.784.242-1.42.725-1.907.485-.488 1.114-.731 1.886-.731.479 0 .882.06 1.21.18v1.064a2.145 2.145 0 0 0-1.12-.294c-.461 0-.833.145-1.115.434-.283.29-.424.681-.424 1.176 0 .474.133.852.4 1.134.267.28.625.42 1.077.42.43 0 .825-.104 1.182-.314v1.009Zm.629-.014v-1.094c.198.167.414.292.646.376a2.1 2.1 0 0 0 .704.123c.14 0 .26-.012.363-.037a.859.859 0 0 0 .26-.103.402.402 0 0 0 .209-.355.425.425 0 0 0-.083-.257.873.873 0 0 0-.226-.208 2.251 2.251 0 0 0-.335-.185c-.13-.059-.27-.12-.42-.18-.383-.16-.669-.355-.858-.585a1.28 1.28 0 0 1-.28-.834c0-.256.051-.474.154-.657.102-.184.241-.336.416-.454.178-.119.383-.205.616-.26a3.09 3.09 0 0 1 .738-.085c.255 0 .48.016.677.047.198.03.38.077.547.14v1.023a1.927 1.927 0 0 0-.567-.256 2.11 2.11 0 0 0-.595-.086c-.126 0-.24.012-.342.037a.844.844 0 0 0-.26.1.495.495 0 0 0-.164.157.396.396 0 0 0 .007.424.785.785 0 0 0 .184.184c.08.057.177.114.29.171.115.055.244.112.387.17.196.083.371.17.526.264.158.091.292.195.404.311.111.116.197.25.256.4.06.148.089.321.089.52 0 .273-.052.503-.157.69a1.266 1.266 0 0 1-.42.451 1.854 1.854 0 0 1-.623.246c-.234.05-.483.075-.745.075-.269 0-.525-.022-.769-.068a2.316 2.316 0 0 1-.629-.205Zm3.924 0v-1.094c.198.167.414.292.646.376a2.1 2.1 0 0 0 .704.123c.14 0 .26-.012.362-.037a.86.86 0 0 0 .26-.103.401.401 0 0 0 .209-.355.426.426 0 0 0-.082-.257.873.873 0 0 0-.226-.208 2.255 2.255 0 0 0-.335-.185c-.13-.059-.27-.12-.42-.18-.383-.16-.67-.355-.858-.585a1.28 1.28 0 0 1-.28-.834c0-.256.05-.474.153-.657.103-.184.242-.336.417-.454.178-.119.383-.205.616-.26a3.09 3.09 0 0 1 .738-.085c.255 0 .48.016.677.047.198.03.38.077.546.14v1.023a1.927 1.927 0 0 0-.567-.256 2.11 2.11 0 0 0-.595-.086c-.125 0-.239.012-.341.037a.843.843 0 0 0-.26.1.496.496 0 0 0-.164.157.396.396 0 0 0 .007.424.785.785 0 0 0 .184.184c.08.057.177.114.29.171.115.055.243.112.387.17.196.083.371.17.526.264.158.091.292.195.404.311.111.116.197.25.256.4.06.148.089.321.089.52 0 .273-.053.503-.157.69a1.268 1.268 0 0 1-.42.451 1.855 1.855 0 0 1-.623.246c-.235.05-.483.075-.745.075-.269 0-.525-.022-.77-.068a2.317 2.317 0 0 1-.628-.205Z\"/></svg>" },
	file_csv: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><g clip-path=\"url(#a)\"><path fill=\"var(--accent-color)\" d=\"M18.012 14h-17a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path fill=\"#fff\" d=\"M6.983 21.826c-.357.173-.824.26-1.401.26-.752 0-1.343-.222-1.774-.664-.43-.442-.646-1.03-.646-1.767 0-.784.242-1.42.725-1.907.485-.488 1.114-.731 1.886-.731.479 0 .882.06 1.21.18v1.064a2.145 2.145 0 0 0-1.12-.294c-.461 0-.832.145-1.115.434-.283.29-.424.681-.424 1.176 0 .474.134.852.4 1.134.267.28.626.42 1.077.42.43 0 .825-.104 1.182-.314v1.009Zm.629-.014v-1.094c.199.167.414.292.646.376a2.1 2.1 0 0 0 .704.123c.14 0 .26-.012.363-.037a.859.859 0 0 0 .26-.103.402.402 0 0 0 .209-.355.425.425 0 0 0-.083-.257.873.873 0 0 0-.226-.208 2.251 2.251 0 0 0-.335-.185c-.13-.059-.27-.12-.42-.18-.383-.16-.669-.355-.858-.585a1.28 1.28 0 0 1-.28-.834c0-.256.051-.474.154-.657.102-.184.241-.336.417-.454.177-.119.382-.205.615-.26a3.09 3.09 0 0 1 .738-.085c.255 0 .48.016.677.047.198.03.38.077.547.14v1.023a1.927 1.927 0 0 0-.567-.256 2.11 2.11 0 0 0-.595-.086c-.126 0-.24.012-.342.037a.844.844 0 0 0-.26.1.495.495 0 0 0-.164.157.396.396 0 0 0 .007.424.785.785 0 0 0 .184.184c.08.057.177.114.291.171.114.055.243.112.386.17.196.083.372.17.527.264.157.091.291.195.403.311.112.116.197.25.256.4.06.148.09.321.09.52 0 .273-.053.503-.158.69a1.267 1.267 0 0 1-.42.451 1.853 1.853 0 0 1-.623.246c-.234.05-.483.075-.745.075-.269 0-.525-.022-.769-.068a2.316 2.316 0 0 1-.629-.205Zm8.231-4.713L14.154 22h-1.25l-1.669-4.901h1.19l1.022 3.41a2.4 2.4 0 0 1 .099.49h.02a2.84 2.84 0 0 1 .106-.503l1.015-3.397h1.156Z\"/><path d=\"M23.573 0a1 1 0 0 1 .71.294l7.418 7.45a1 1 0 0 1 .294.706V28.3A3.567 3.567 0 0 1 28.59 32H10.407A3.565 3.565 0 0 1 7 28.3V28a1 1 0 1 1 2 0v.3a1.6 1.6 0 0 0 1.405 1.7H28.59a1.576 1.576 0 0 0 1.4-1.7V9.45h-6.187a1.001 1.001 0 0 1-.999-1V2H10.407A1.576 1.576 0 0 0 9 3.7V11l-.006.102A1 1 0 0 1 7 11l.001-.02V3.7A3.567 3.567 0 0 1 10.406 0h13.167Zm1.23 7.45h3.78l-3.78-3.794V7.45Z\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M.012 0h32.004v32H.012z\"/></clipPath></defs></svg>" },
	file_doc: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><g clip-path=\"url(#a)\"><path fill=\"var(--accent-color)\" d=\"M19.036 14h-18a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path d=\"M23.598 0a1 1 0 0 1 .709.294l7.419 7.45a1 1 0 0 1 .293.706V28.3a3.566 3.566 0 0 1-3.405 3.7H10.431a3.565 3.565 0 0 1-3.406-3.7V28a1 1 0 1 1 2 0v.3A1.6 1.6 0 0 0 10.43 30h18.183a1.576 1.576 0 0 0 1.4-1.7V9.45h-6.187a1.001 1.001 0 0 1-.999-1V2H10.431a1.576 1.576 0 0 0-1.407 1.7V11l-.006.102A1 1 0 0 1 7.024 11l.001-.02V3.7A3.567 3.567 0 0 1 10.431 0h13.167Zm1.23 7.45h3.778l-3.779-3.794V7.45Z\"/><path fill=\"#fff\" d=\"M3.036 22v-4.901h1.736c1.741 0 2.612.796 2.612 2.389 0 .763-.238 1.373-.715 1.828-.474.456-1.106.684-1.897.684H3.036Zm1.104-4.002v3.107h.547c.479 0 .853-.144 1.125-.431.273-.287.41-.678.41-1.172 0-.468-.136-.834-.407-1.101-.269-.269-.647-.403-1.135-.403h-.54Zm6.129 4.087c-.702 0-1.274-.227-1.716-.683-.442-.458-.663-1.054-.663-1.788 0-.774.224-1.401.673-1.88.449-.478 1.044-.717 1.784-.717.7 0 1.265.229 1.696.687.432.458.649 1.061.649 1.811 0 .77-.225 1.391-.673 1.863-.447.472-1.03.707-1.75.707Zm.047-4.118c-.387 0-.695.146-.922.437-.228.29-.342.674-.342 1.152 0 .485.114.87.342 1.152.227.283.526.424.895.424.38 0 .683-.137.906-.41.223-.276.335-.658.335-1.145 0-.509-.108-.904-.325-1.186-.216-.283-.513-.424-.889-.424Zm6.707 3.859c-.358.173-.825.26-1.402.26-.752 0-1.343-.222-1.774-.664-.43-.442-.646-1.03-.646-1.767 0-.784.242-1.42.725-1.907.485-.488 1.114-.731 1.886-.731.479 0 .882.06 1.21.18v1.064a2.145 2.145 0 0 0-1.12-.294c-.46 0-.832.145-1.115.434-.282.29-.424.681-.424 1.176 0 .474.134.852.4 1.134.267.28.626.42 1.077.42.43 0 .825-.104 1.183-.314v1.009Z\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M.036 0H32.04v32H.036z\"/></clipPath></defs></svg>" },
	file_htm: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><path fill=\"var(--accent-color)\" d=\"M20 14H1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h19a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path d=\"M23.561 0a1 1 0 0 1 .71.294l7.418 7.45a1 1 0 0 1 .294.706V28.3a3.567 3.567 0 0 1-3.405 3.7H10.394a3.565 3.565 0 0 1-3.405-3.7V28a1 1 0 1 1 2 0v.3a1.6 1.6 0 0 0 1.405 1.7h18.184a1.576 1.576 0 0 0 1.4-1.7V9.45h-6.187a1.001 1.001 0 0 1-1-1V2H10.395a1.576 1.576 0 0 0-1.406 1.7V11l-.006.102A1 1 0 0 1 6.988 11l.001-.02V3.7A3.567 3.567 0 0 1 10.394 0h13.167Zm1.23 7.45h3.78l-3.78-3.794V7.45Z\"/><path fill=\"#fff\" d=\"M7.242 22H6.134v-1.996h-2.03V22H3v-4.901h1.104v1.955h2.03v-1.955h1.108V22Zm4.566-4.002H10.41V22H9.303v-4.002H7.912v-.9h3.896v.9ZM18.053 22h-1.09v-2.933c0-.316.013-.666.04-1.049h-.027c-.057.3-.108.517-.154.65L15.674 22h-.902l-1.17-3.298a6.443 6.443 0 0 1-.153-.684h-.031c.03.483.044.907.044 1.272V22h-.994v-4.901h1.617l1 2.905c.08.232.139.466.175.7h.02a7.1 7.1 0 0 1 .196-.707l1.001-2.898h1.576V22Z\"/></svg>" },
	file_html: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><path fill=\"var(--accent-color)\" d=\"M22 14H1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h21a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path d=\"M23.561 0a1 1 0 0 1 .71.294l7.418 7.45a1 1 0 0 1 .294.706V28.3a3.567 3.567 0 0 1-3.405 3.7H10.394a3.565 3.565 0 0 1-3.405-3.7V28a1 1 0 1 1 2 0v.3a1.6 1.6 0 0 0 1.405 1.7h18.184a1.576 1.576 0 0 0 1.4-1.7V9.45h-6.187a1.001 1.001 0 0 1-1-1V2H10.395a1.576 1.576 0 0 0-1.406 1.7V11l-.006.102A1 1 0 0 1 6.988 11l.001-.02V3.7A3.567 3.567 0 0 1 10.394 0h13.167Zm1.23 7.45h3.78l-3.78-3.794V7.45Z\"/><path fill=\"#fff\" d=\"M6.242 22H5.134v-1.996h-2.03V22H2v-4.901h1.104v1.955h2.03v-1.955h1.108V22Zm4.566-4.002H9.41V22H8.303v-4.002H6.912v-.9h3.896v.9ZM17.053 22h-1.09v-2.933c0-.316.013-.666.04-1.049h-.027c-.057.3-.108.517-.154.65L14.674 22h-.902l-1.17-3.298a6.443 6.443 0 0 1-.153-.684h-.031c.03.483.044.907.044 1.272V22h-.994v-4.901h1.617l1 2.905c.08.232.139.466.175.7h.02a7.1 7.1 0 0 1 .196-.707l1.001-2.898h1.576V22Zm3.866 0H18v-4.901h1.104v4.006h1.815V22Z\"/></svg>" },
	file_js: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><path fill=\"var(--accent-color)\" d=\"M15 14H1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path d=\"M23.561 0a1 1 0 0 1 .71.294l7.418 7.45a1 1 0 0 1 .294.706V28.3a3.567 3.567 0 0 1-3.405 3.7H10.394a3.565 3.565 0 0 1-3.405-3.7V28a1 1 0 1 1 2 0v.3a1.6 1.6 0 0 0 1.405 1.7h18.184a1.576 1.576 0 0 0 1.4-1.7V9.45h-6.187a1.001 1.001 0 0 1-1-1V2H10.395a1.576 1.576 0 0 0-1.406 1.7V11l-.006.102A1 1 0 0 1 6.988 11l.001-.02V3.7A3.567 3.567 0 0 1 10.394 0h13.167Zm1.23 7.45h3.78l-3.78-3.794V7.45Z\"/><path fill=\"#fff\" d=\"M7.084 20.055c0 .656-.153 1.159-.458 1.508-.303.348-.743.522-1.32.522a1.88 1.88 0 0 1-.714-.133v-1.036c.19.144.401.216.636.216.504 0 .755-.374.755-1.121v-2.912h1.101v2.956Zm.848 1.757v-1.094c.198.167.413.292.646.376a2.1 2.1 0 0 0 .704.123c.139 0 .26-.012.362-.037a.859.859 0 0 0 .26-.103.401.401 0 0 0 .208-.355.425.425 0 0 0-.082-.257.873.873 0 0 0-.225-.208 2.252 2.252 0 0 0-.335-.185c-.13-.059-.27-.12-.42-.18-.384-.16-.67-.355-.859-.585a1.28 1.28 0 0 1-.28-.834c0-.256.051-.474.154-.657.102-.184.241-.336.417-.454.178-.119.383-.205.615-.26a3.09 3.09 0 0 1 .738-.085c.256 0 .481.016.677.047.198.03.38.077.547.14v1.023a1.928 1.928 0 0 0-.567-.256 2.107 2.107 0 0 0-.595-.086c-.125 0-.24.012-.342.037a.844.844 0 0 0-.26.1.495.495 0 0 0-.164.157.396.396 0 0 0 .007.424.785.785 0 0 0 .185.184c.08.057.176.114.29.171.114.055.243.112.387.17.195.083.37.17.526.264.157.091.292.195.403.311.112.116.197.25.256.4.06.148.09.321.09.52 0 .273-.053.503-.158.69a1.268 1.268 0 0 1-.42.451 1.855 1.855 0 0 1-.622.246c-.235.05-.483.075-.745.075-.27 0-.526-.022-.77-.068a2.316 2.316 0 0 1-.628-.205Z\"/></svg>" },
	file_json: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><g clip-path=\"url(#a)\"><path fill=\"var(--accent-color)\" d=\"M22.998 14h-22a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path fill=\"#fff\" d=\"M4.603 20.055c0 .656-.153 1.159-.458 1.508-.304.348-.743.522-1.32.522a1.88 1.88 0 0 1-.714-.133v-1.036c.189.144.4.216.636.216.503 0 .755-.374.755-1.121v-2.912h1.1v2.956ZM5.45 21.812v-1.094c.198.167.414.292.646.376a2.1 2.1 0 0 0 .704.123c.14 0 .26-.012.363-.037a.859.859 0 0 0 .26-.103.402.402 0 0 0 .208-.355.425.425 0 0 0-.082-.257.873.873 0 0 0-.226-.208 2.251 2.251 0 0 0-.335-.185c-.13-.059-.27-.12-.42-.18-.383-.16-.669-.355-.858-.585a1.28 1.28 0 0 1-.28-.834c0-.256.051-.474.154-.657.102-.184.241-.336.416-.454.178-.119.383-.205.616-.26a3.09 3.09 0 0 1 .738-.085c.255 0 .48.016.677.047.198.03.38.077.547.14v1.023a1.927 1.927 0 0 0-.567-.256 2.107 2.107 0 0 0-.595-.086c-.126 0-.24.012-.342.037a.844.844 0 0 0-.26.1.495.495 0 0 0-.164.157.396.396 0 0 0 .007.424.785.785 0 0 0 .184.184c.08.057.177.114.29.171.115.055.244.112.387.17.196.083.371.17.526.264.158.091.292.195.404.311.111.116.197.25.256.4.06.148.089.321.089.52 0 .273-.052.503-.157.69a1.267 1.267 0 0 1-.42.451 1.854 1.854 0 0 1-.623.246c-.234.05-.483.075-.745.075-.269 0-.525-.022-.769-.068a2.316 2.316 0 0 1-.629-.205ZM11.67 22.085c-.7 0-1.273-.227-1.715-.683-.442-.458-.663-1.054-.663-1.788 0-.774.224-1.401.673-1.88.45-.478 1.044-.717 1.784-.717.7 0 1.265.229 1.696.687.433.458.65 1.061.65 1.811 0 .77-.225 1.391-.674 1.863-.447.472-1.03.707-1.75.707Zm.049-4.118c-.388 0-.695.146-.923.437-.228.29-.342.674-.342 1.152 0 .485.114.87.342 1.152.228.283.526.424.895.424.38 0 .683-.137.906-.41.223-.276.335-.658.335-1.145 0-.509-.108-.904-.325-1.186-.216-.283-.512-.424-.888-.424ZM19.32 22h-1.114l-2.02-3.08c-.119-.18-.2-.315-.246-.406h-.014c.018.173.028.437.028.793V22H14.91v-4.901h1.19l1.944 2.983c.09.135.171.268.246.4h.014a5.223 5.223 0 0 1-.027-.673V17.1h1.042V22Z\"/><path d=\"M23.572 0a1 1 0 0 1 .709.294l7.419 7.45a1 1 0 0 1 .294.706V28.3a3.567 3.567 0 0 1-3.406 3.7H10.405A3.565 3.565 0 0 1 7 28.3V27h1.999v1.3a1.6 1.6 0 0 0 1.406 1.7h18.183a1.576 1.576 0 0 0 1.4-1.7V9.45H23.8a1 1 0 0 1-1-1V2H10.405a1.576 1.576 0 0 0-1.406 1.7V12h-2V3.7A3.567 3.567 0 0 1 10.406 0h13.167Zm1.23 7.45h3.779L24.8 3.656V7.45Z\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M-.002 0h32.004v32H-.002z\"/></clipPath></defs></svg>" },
	file_link: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><g fill=\"var(--accent-color)\"><path d=\"M27.815 17.19a4.056 4.056 0 0 0-5.737 0l-2.865 2.867a1.015 1.015 0 0 0 1.435 1.435l2.866-2.865a2.028 2.028 0 0 1 2.883 2.853l-2.88 2.88a1.014 1.014 0 0 0 1.43 1.434l2.867-2.866a4.06 4.06 0 0 0 0-5.738Z\"/><path d=\"M18.497 26.512a1.014 1.014 0 0 0 1.43 0l3.587-3.585a1.014 1.014 0 1 0-1.435-1.434l-3.585 3.586a1.015 1.015 0 0 0 0 1.433\"/><path d=\"m21.36 26.512-2.866 2.866a2.029 2.029 0 0 1-2.92-2.82l.052-.05 2.865-2.864a1.013 1.013 0 0 0-1.434-1.434l-2.866 2.864a4.057 4.057 0 0 0 5.737 5.738l2.866-2.867a1.013 1.013 0 0 0-1.434-1.434Z\"/></g><path d=\"M28.71 7.744 21.288.294A1 1 0 0 0 20.58 0H6.408a3.566 3.566 0 0 0-3.406 3.7v24.6A3.566 3.566 0 0 0 6.408 32h3.45v-.03a.983.983 0 0 0 0-1.959V30h-.055c-.016 0-.03-.01-.047-.01s-.031.009-.047.01h-3.3a1.6 1.6 0 0 1-1.406-1.7V3.7A1.576 1.576 0 0 1 6.408 2h13.406v6.45a1 1 0 0 0 1 1H27V13a1 1 0 1 0 2 0V8.45a1 1 0 0 0-.291-.706Zm-6.9-.294V3.656l3.78 3.794h-3.78Z\"/></svg>" },
	file_pdf: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><g clip-path=\"url(#a)\"><path fill=\"var(--accent-color)\" d=\"M18.02 14h-17a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path d=\"M23.582 0a1 1 0 0 1 .709.294l7.418 7.45a1 1 0 0 1 .294.706V28.3a3.566 3.566 0 0 1-3.405 3.7H10.415a3.565 3.565 0 0 1-3.406-3.7V28a1 1 0 1 1 2 0v.3a1.6 1.6 0 0 0 1.406 1.7h18.183a1.576 1.576 0 0 0 1.4-1.7V9.45h-6.187a1.001 1.001 0 0 1-.999-1V2H10.415a1.576 1.576 0 0 0-1.407 1.7V11l-.006.102A1 1 0 0 1 7.008 11l.001-.02V3.7A3.567 3.567 0 0 1 10.415 0h13.167Zm1.23 7.45h3.778l-3.779-3.794V7.45Z\"/><path fill=\"#fff\" d=\"M4.474 20.311V22H3.37v-4.901H5.1c1.235 0 1.852.52 1.852 1.562 0 .492-.178.89-.533 1.196-.353.303-.826.454-1.419.454h-.526Zm0-2.365v1.528h.434c.588 0 .882-.257.882-.772 0-.504-.294-.756-.882-.756h-.434ZM7.67 22v-4.901h1.736c1.741 0 2.612.796 2.612 2.389 0 .763-.239 1.373-.715 1.828-.474.456-1.106.684-1.897.684H7.67Zm1.104-4.002v3.107h.547c.478 0 .853-.144 1.124-.431.274-.287.41-.678.41-1.172 0-.468-.135-.834-.406-1.101-.27-.269-.647-.403-1.135-.403h-.54Zm6.891 0h-1.73V19.2h1.59v.895h-1.59V22h-1.104v-4.901h2.834v.899Z\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M.02 0h32.004v32H.02z\"/></clipPath></defs></svg>" },
	file_rtf: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><g clip-path=\"url(#a)\"><path fill=\"var(--accent-color)\" d=\"M17.032 14h-16a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path d=\"M23.594 0a1 1 0 0 1 .709.294l7.419 7.45a1 1 0 0 1 .294.706V28.3A3.566 3.566 0 0 1 28.61 32H10.427a3.565 3.565 0 0 1-3.406-3.7V28a1 1 0 1 1 2 0v.3a1.601 1.601 0 0 0 1.406 1.7H28.61a1.576 1.576 0 0 0 1.4-1.7V9.45h-6.187a1.001 1.001 0 0 1-.999-1V2H10.427A1.576 1.576 0 0 0 9.02 3.7V11l-.005.102A1 1 0 0 1 7.02 11l.001-.02V3.7A3.567 3.567 0 0 1 10.427 0h13.167Zm1.23 7.45h3.778l-3.779-3.794V7.45Z\"/><path fill=\"#fff\" d=\"M7.464 22H6.196l-.762-1.261a4.276 4.276 0 0 0-.164-.257 1.268 1.268 0 0 0-.16-.191.555.555 0 0 0-.168-.123.4.4 0 0 0-.188-.044h-.298V22H3.352v-4.901h1.75c1.19 0 1.784.444 1.784 1.333a1.32 1.32 0 0 1-.65 1.166c-.133.084-.284.15-.45.197v.014c.073.023.143.06.212.113.068.05.134.11.198.178.064.068.124.142.181.222.06.077.113.154.16.229L7.465 22Zm-3.008-4.074v1.364h.479c.237 0 .427-.069.57-.206a.684.684 0 0 0 .22-.516c0-.428-.257-.642-.77-.642h-.499Zm6.768.072H9.826V22H8.718v-4.002h-1.39v-.9h3.896v.9Zm3.493 0h-1.73V19.2h1.59v.895h-1.59V22h-1.104v-4.901h2.834v.899Z\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M.032 0h32.004v32H.032z\"/></clipPath></defs></svg>" },
	file_svg: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><g clip-path=\"url(#a)\"><path fill=\"var(--accent-color)\" d=\"M19.024 14h-18a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path d=\"M23.586 0a1 1 0 0 1 .709.294l7.418 7.45a1 1 0 0 1 .294.706V28.3a3.567 3.567 0 0 1-3.405 3.7H10.42a3.565 3.565 0 0 1-3.406-3.7V28a1 1 0 1 1 2 0v.3A1.6 1.6 0 0 0 10.42 30h18.183a1.576 1.576 0 0 0 1.4-1.7V9.45h-6.187a1 1 0 0 1-.999-1V2H10.42a1.576 1.576 0 0 0-1.407 1.7V11l-.005.102A1 1 0 0 1 7.012 11l.001-.02V3.7A3.567 3.567 0 0 1 10.42 0h13.167Zm1.23 7.45h3.778l-3.779-3.794V7.45Z\"/><path fill=\"#fff\" d=\"M3.646 21.812v-1.094c.198.167.414.292.646.376a2.1 2.1 0 0 0 .704.123c.14 0 .26-.012.363-.037a.859.859 0 0 0 .26-.103.402.402 0 0 0 .208-.355.425.425 0 0 0-.082-.257.873.873 0 0 0-.226-.208 2.252 2.252 0 0 0-.335-.185c-.13-.059-.27-.12-.42-.18-.383-.16-.669-.355-.858-.585a1.28 1.28 0 0 1-.28-.834c0-.256.051-.474.154-.657.102-.184.241-.336.417-.454.177-.119.382-.205.615-.26a3.09 3.09 0 0 1 .738-.085c.255 0 .48.016.677.047.198.03.38.077.547.14v1.023a1.926 1.926 0 0 0-.567-.256 2.107 2.107 0 0 0-.595-.086c-.126 0-.24.012-.342.037a.844.844 0 0 0-.26.1.495.495 0 0 0-.164.157.396.396 0 0 0 .007.424.785.785 0 0 0 .184.184c.08.057.177.114.29.171.115.055.244.112.387.17.196.083.372.17.526.264.158.091.292.195.404.311.111.116.197.25.256.4.06.148.089.321.089.52 0 .273-.052.503-.157.69a1.267 1.267 0 0 1-.42.451 1.854 1.854 0 0 1-.623.246c-.234.05-.483.075-.745.075-.269 0-.525-.022-.769-.068a2.316 2.316 0 0 1-.629-.205Zm8.231-4.713L10.188 22h-1.25l-1.669-4.901h1.19l1.022 3.41c.054.185.087.348.099.49h.02a2.84 2.84 0 0 1 .106-.503l1.015-3.397h1.156Zm4.467 4.573c-.479.276-1.073.413-1.784.413-.789 0-1.41-.217-1.866-.652-.454-.438-.68-1.04-.68-1.805 0-.77.248-1.398.745-1.883.496-.486 1.157-.728 1.982-.728.52 0 .978.071 1.374.215v1.036c-.378-.22-.84-.329-1.388-.329-.458 0-.831.15-1.12.448-.288.296-.431.693-.431 1.19 0 .503.128.893.386 1.169.26.275.61.413 1.05.413.263 0 .473-.037.628-.113v-.957h-.981v-.881h2.085v2.464Z\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M.024 0h32.004v32H.024z\"/></clipPath></defs></svg>" },
	file_txt: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><g clip-path=\"url(#a)\"><path fill=\"var(--accent-color)\" d=\"M18.028 14h-17a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path d=\"M23.59 0a1 1 0 0 1 .709.294l7.419 7.45a1 1 0 0 1 .293.706V28.3a3.567 3.567 0 0 1-3.405 3.7H10.423a3.565 3.565 0 0 1-3.406-3.7V28a1 1 0 1 1 2 0v.3a1.6 1.6 0 0 0 1.406 1.7h18.183a1.576 1.576 0 0 0 1.4-1.7V9.45H23.82a1.001 1.001 0 0 1-.999-1V2H10.423a1.576 1.576 0 0 0-1.407 1.7V11l-.005.102A1 1 0 0 1 7.016 11l.001-.02V3.7A3.567 3.567 0 0 1 10.423 0H23.59Zm1.23 7.45h3.778L24.82 3.656V7.45Z\"/><path fill=\"#fff\" d=\"M7.07 17.998H5.674V22H4.565v-4.002h-1.39v-.9H7.07v.9ZM11.72 22h-1.31l-.844-1.596a1.4 1.4 0 0 1-.1-.328h-.013a2.51 2.51 0 0 1-.113.341L8.493 22H7.177l1.562-2.45-1.43-2.451h1.344l.7 1.47c.056.116.105.253.148.413h.014a4.82 4.82 0 0 1 .153-.427l.78-1.456h1.23l-1.47 2.43L11.72 22Zm4.169-4.002h-1.398V22h-1.107v-4.002h-1.391v-.9h3.896v.9Z\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M.028 0h32.004v32H.028z\"/></clipPath></defs></svg>" },
	file_xls: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><path fill=\"var(--accent-color)\" d=\"M17 14H1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path fill=\"#fff\" d=\"M7.563 22h-1.31l-.843-1.596a1.4 1.4 0 0 1-.1-.328h-.013a2.51 2.51 0 0 1-.113.341L4.336 22H3.021l1.562-2.45-1.43-2.451h1.344l.7 1.47c.055.116.104.253.148.413h.013c.028-.096.079-.238.154-.427l.78-1.456h1.23l-1.47 2.43L7.563 22Zm3.503 0H8.147v-4.901h1.104v4.006h1.815V22Zm.438-.188v-1.094c.198.167.414.292.646.376a2.1 2.1 0 0 0 .704.123c.139 0 .26-.012.362-.037a.86.86 0 0 0 .26-.103.401.401 0 0 0 .208-.355.425.425 0 0 0-.082-.257.871.871 0 0 0-.225-.208 2.255 2.255 0 0 0-.335-.185c-.13-.059-.27-.12-.42-.18-.383-.16-.67-.355-.858-.585a1.28 1.28 0 0 1-.28-.834c0-.256.05-.474.153-.657.103-.184.242-.336.417-.454.178-.119.383-.205.615-.26.233-.057.479-.085.739-.085.255 0 .48.016.677.047.198.03.38.077.546.14v1.023a1.927 1.927 0 0 0-.567-.256 2.108 2.108 0 0 0-.595-.086c-.125 0-.239.012-.342.037a.844.844 0 0 0-.26.1.495.495 0 0 0-.163.157.397.397 0 0 0 .007.424.786.786 0 0 0 .184.184c.08.057.177.114.29.171.114.055.243.112.387.17.196.083.371.17.526.264.157.091.292.195.403.311.112.116.198.25.257.4.06.148.089.321.089.52 0 .273-.053.503-.157.69a1.267 1.267 0 0 1-.421.451 1.853 1.853 0 0 1-.622.246c-.235.05-.483.075-.745.075-.269 0-.525-.022-.77-.068a2.316 2.316 0 0 1-.628-.205Z\"/><path d=\"M23.573 0a1 1 0 0 1 .71.294l7.418 7.45a1 1 0 0 1 .294.706V28.3A3.567 3.567 0 0 1 28.59 32H10.407A3.565 3.565 0 0 1 7 28.3V28a1 1 0 1 1 2 0v.3a1.6 1.6 0 0 0 1.405 1.7H28.59a1.576 1.576 0 0 0 1.4-1.7V9.45h-6.187a1.001 1.001 0 0 1-.999-1V2H10.407A1.576 1.576 0 0 0 9 3.7V11l-.006.102A1 1 0 0 1 7 11l.001-.02V3.7A3.567 3.567 0 0 1 10.406 0h13.167Zm1.23 7.45h3.78l-3.78-3.794V7.45Z\"/></svg>" },
	file_xml: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><g clip-path=\"url(#a)\"><path fill=\"var(--accent-color)\" d=\"M20.04 14h-19a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h19a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path d=\"M23.602 0a1 1 0 0 1 .709.294l7.419 7.45a1 1 0 0 1 .293.706V28.3a3.567 3.567 0 0 1-3.405 3.7H10.435a3.565 3.565 0 0 1-3.406-3.7V28a1 1 0 1 1 2 0v.3a1.6 1.6 0 0 0 1.406 1.7h18.183a1.576 1.576 0 0 0 1.4-1.7V9.45h-6.187a1 1 0 0 1-.999-1V2H10.435a1.576 1.576 0 0 0-1.407 1.7V11l-.006.102A1 1 0 0 1 7.028 11l.001-.02V3.7A3.567 3.567 0 0 1 10.435 0h13.167Zm1.23 7.45h3.778l-3.779-3.794V7.45Z\"/><path fill=\"#fff\" d=\"M7.583 22h-1.31l-.844-1.596a1.4 1.4 0 0 1-.099-.328h-.013a2.51 2.51 0 0 1-.113.341L4.356 22H3.04l1.562-2.45-1.429-2.451h1.344l.7 1.47c.055.116.104.253.147.413h.014a4.99 4.99 0 0 1 .154-.427l.78-1.456h1.23l-1.47 2.43L7.582 22Zm6.169 0h-1.09v-2.933c0-.316.013-.666.04-1.049h-.027a5.17 5.17 0 0 1-.153.65L11.373 22h-.902L9.3 18.702a6.425 6.425 0 0 1-.153-.684h-.03c.029.483.044.907.044 1.272V22h-.995v-4.901h1.617l1.001 2.905c.08.232.138.466.175.7h.02a7.06 7.06 0 0 1 .195-.707l1.001-2.898h1.576V22Zm4.033 0h-2.919v-4.901h1.104v4.006h1.815V22Z\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M.04 0h32.004v32H.04z\"/></clipPath></defs></svg>" },
	file_zip: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 32 32\"><path fill=\"var(--accent-color)\" d=\"M16 14H1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z\"/><path d=\"M23.561 0a1 1 0 0 1 .71.294l7.418 7.45a1 1 0 0 1 .294.706V28.3a3.567 3.567 0 0 1-3.405 3.7H10.394a3.565 3.565 0 0 1-3.405-3.7V28a1 1 0 1 1 2 0v.3a1.6 1.6 0 0 0 1.405 1.7h18.184a1.576 1.576 0 0 0 1.4-1.7V9.45h-6.187a1.001 1.001 0 0 1-1-1V2H10.395a1.576 1.576 0 0 0-1.406 1.7V11l-.006.102A1 1 0 0 1 6.988 11l.001-.02V3.7A3.567 3.567 0 0 1 10.394 0h13.167Zm1.23 7.45h3.78l-3.78-3.794V7.45Z\"/><path fill=\"#fff\" d=\"M7.201 22H3.253v-.636l2.513-3.366H3.435v-.9h3.76v.62l-2.458 3.387H7.2V22Zm1.829 0H7.926v-4.901H9.03V22Zm2.222-1.689V22h-1.104v-4.901h1.729c1.235 0 1.852.52 1.852 1.562 0 .492-.177.89-.533 1.196-.353.303-.826.454-1.418.454h-.527Zm0-2.365v1.528h.433c.588 0 .882-.257.882-.772 0-.504-.294-.756-.882-.756h-.434Z\"/></svg>" },
	more_horiz: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 -960 960 960\"><path d=\"M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z\"/></svg>" },
	open_in_new: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 18 18\"><path d=\"M6.75 1.5 5.378 3H3c-.825 0-1.5.675-1.5 1.5v9c0 .825.675 1.5 1.5 1.5h12c.825 0 1.5-.675 1.5-1.5v-9c0-.825-.675-1.5-1.5-1.5h-2.377L11.25 1.5h-4.5ZM9 12.75c-2.07 0-3.75-1.68-3.75-3.75 0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.68 3.75 3.75 0 2.07-1.68 3.75-3.75 3.75Z\"/></svg>" },
	star: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/></svg>" },
	star_border: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z\"/></svg>" },
	thumb_up_empty: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 -960 960 960\"><path d=\"M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z\"/></svg>" },
	thumb_up_filled: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 18 18\"><path d=\"M.75 16.5h3v-9h-3v9Zm16.5-8.25c0-.825-.675-1.5-1.5-1.5h-4.732l.712-3.428.022-.24c0-.307-.127-.592-.33-.794l-.795-.788-4.935 4.942c-.277.27-.442.646-.442 1.058V15c0 .825.675 1.5 1.5 1.5h6.75a1.49 1.49 0 0 0 1.38-.915l2.265-5.288c.067-.172.105-.352.105-.547v-1.5Z\"/></svg>" },
	thumb_down_empty: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 -960 960 960\"><path d=\"M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z\"/></svg>" },
	thumb_down_filled: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 18 18\"><path d=\"M17.25 1.5h-3v9h3v-9ZM.75 9.75c0 .825.675 1.5 1.5 1.5h4.732l-.712 3.428-.022.24c0 .307.127.592.33.795l.794.787 4.935-4.943c.278-.27.443-.645.443-1.057V3c0-.825-.675-1.5-1.5-1.5H4.5a1.49 1.49 0 0 0-1.38.915L.855 7.702a1.482 1.482 0 0 0-.105.548v1.5Z\"/></svg>" },
	reload: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 -960 960 960\"><path d=\"M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z\"/></svg>" },
	case_sensitive: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" preserveAspectRatio=\"xMidYMid meet\"><path d=\"M21.2 16.5c0-.2-.1-.5-.1-.7v-4.4c0-.4-.1-.8-.3-1.2-.2-.3-.5-.6-.8-.7-.3-.2-.7-.3-1.1-.3-.4-.1-.8-.1-1.2-.1-.5 0-.9 0-1.4.1-.4.1-.8.3-1.2.5-.3.2-.6.5-.8.9s-.3.9-.3 1.3h1.4c0-.5.2-1 .7-1.3.5-.2 1-.4 1.5-.3.2 0 .5 0 .7.1.2 0 .4.1.6.2.2.1.3.2.5.4.1.2.2.5.2.7s-.1.4-.2.6c-.2.2-.4.3-.6.3-.3.1-.6.1-.9.2-.4 0-.7.1-1.1.2-.4.1-.7.1-1.1.2-.3.1-.7.2-1 .4s-.5.5-.7.8c-.2.4-.3.8-.3 1.2s.1.8.2 1.1c.1.3.4.5.6.7.3.2.6.3.9.4.9.2 1.9.2 2.8-.2.5-.2 1-.6 1.4-1 0 .4.1.7.3 1 .2.2.6.3.9.3.4 0 .7-.1 1-.2v-1.1c-.1 0-.3.1-.4.1-.1.1-.2 0-.2-.2zm-1.5-1.7c0 .2-.1.4-.2.6-.1.2-.3.5-.5.6-.2.2-.5.4-.8.5-.4.1-.8.2-1.2.2-.2 0-.4 0-.6-.1-.2 0-.4-.1-.5-.2-.2-.1-.3-.2-.4-.4-.1-.2-.2-.4-.1-.6 0-.3.1-.6.2-.8.2-.2.4-.4.6-.5.3-.1.6-.2.9-.2s.7-.1 1-.1.6-.1.9-.1.5-.1.7-.3v1.4zm-9.6-.4l1.3 3.6h1.8L8.5 6H6.7L2 18h1.7L5 14.4h5.1zm-2.5-7l2.1 5.5H5.5l2.1-5.5z\"></path></svg>" },
	clear: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/></svg>" },
	arrow_drop_up: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M7 14l5-5 5 5z\"/></svg>" },
	arrow_drop_down: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M7 10l5 5 5-5z\"/></svg>" },
	arrow_back: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"/></svg>" },
	arrow_forward: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z\"/></svg>" },
	arrow_downward: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z\"/></svg>" },
	arrow_upward: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z\"/></svg>" },
	calendar: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 -960 960 960\" width=\"24\"><path d=\"M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z\"/></svg>" },
	calendar_today: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z\"/></svg>" },
	expand_content: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 -960 960 960\" width=\"24px\"><path d=\"M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z\"/></svg>" },
	indigo_expand_content: { svg: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M21 9C21 9.82843 20.3284 10.5 19.5 10.5C18.6716 10.5 18 9.82843 18 9V6H15C14.1716 6 13.5 5.32843 13.5 4.5C13.5 3.67157 14.1716 3 15 3L19.5 3C20.3284 3 21 3.67218 21 4.50061V9Z\"/>\n<path d=\"M3 15C3 14.1716 3.67157 13.5 4.5 13.5C5.32843 13.5 6 14.1716 6 15V18H9C9.82843 18 10.5 18.6716 10.5 19.5C10.5 20.3284 9.82843 21 9 21H4.5C3.67157 21 3 20.3278 3 19.4994V15Z\"/>\n</svg>\n" },
	collapse_content: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 -960 960 960\" width=\"24px\"><path d=\"M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z\"/></svg>" },
	indigo_collapse_content: { svg: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M15 3C14.1716 3 13.5 3.67157 13.5 4.5L13.5 8.9994C13.5 9.82782 14.1716 10.5 15 10.5L19.5 10.5C20.3284 10.5 21 9.82843 21 9C21 8.17158 20.3284 7.5 19.5 7.5L16.5 7.5L16.5 4.5C16.5 3.67157 15.8284 3 15 3Z\"/>\n<path d=\"M9 21C9.82842 21 10.5 20.3284 10.5 19.5V15.0006C10.5 14.1722 9.82843 13.5 9 13.5L4.5 13.5C3.67157 13.5 3 14.1716 3 15C3 15.8284 3.67157 16.5 4.5 16.5H7.5V19.5C7.5 20.3284 8.17157 21 9 21Z\"/>\n</svg>\n" },
	fullscreen: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 -960 960 960\" width=\"24px\"><path d=\"M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z\"/></svg>" },
	indigo_fullscreen: { svg: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M6.16606 3H8.66571C9.06363 3 9.44512 3.15818 9.72636 3.43942C10.0076 3.72069 10.1657 4.10213 10.1657 4.5C10.1657 4.89782 10.0077 5.2794 9.72636 5.56071C9.44502 5.84205 9.06349 6 8.66571 6H6.16657C6.12239 6.00015 6.08005 6.01779 6.04883 6.04907C6.01759 6.08036 6 6.12284 6 6.16717V8.66683C6 9.06465 5.84195 9.44623 5.56064 9.72754C5.27931 10.0089 4.89778 10.1668 4.5 10.1668C4.10222 10.1668 3.72069 10.0089 3.43936 9.72754C3.15805 9.44623 3 9.06465 3 8.66683V6.16718C3.00098 5.32785 3.33474 4.52264 3.92812 3.92903C4.5215 3.33542 5.32673 3.00131 6.16606 3Z\"/>\n<path d=\"M14.2715 3.43942C14.5527 3.15818 14.9342 3 15.3321 3H17.8328C18.6724 3.00098 19.4778 3.33492 20.0714 3.92857C20.6651 4.52223 20.999 5.32714 21 6.16667L21 8.66683C21 9.06465 20.842 9.44623 20.5606 9.72754C20.2793 10.0089 19.8978 10.1668 19.5 10.1668C19.1022 10.1668 18.7207 10.0089 18.4394 9.72754C18.158 9.44623 18 9.06465 18 8.66683L18 6.16794C17.9998 6.1236 17.9821 6.08077 17.9507 6.04934C17.9192 6.01785 17.8766 6.00015 17.8323 6H15.3321C14.9343 6 14.5528 5.84205 14.2715 5.56071C13.9902 5.2794 13.8321 4.89782 13.8321 4.5C13.8321 4.10213 13.9902 3.72069 14.2715 3.43942Z\"/>\n<path d=\"M3.43936 14.2736C3.72069 13.9923 4.10222 13.8344 4.5 13.8344C4.89778 13.8344 5.27931 13.9923 5.56064 14.2736C5.84195 14.5549 6 14.9365 6 15.3344V17.8335C6.00015 17.8776 6.01771 17.9198 6.04895 17.9511C6.08014 17.9822 6.12239 17.9998 6.16651 18H8.66571C9.06363 18 9.44512 18.1582 9.72636 18.4394C10.0076 18.7207 10.1657 19.1021 10.1657 19.5C10.1657 19.8978 10.0077 20.2794 9.72636 20.5607C9.44502 20.842 9.06349 21 8.66571 21H6.16606C5.32684 20.999 4.52172 20.6653 3.92825 20.0718C3.3348 19.4784 3.00098 18.6738 3 17.8345V15.3344C3 14.9365 3.15805 14.5549 3.43936 14.2736Z\"/>\n<path d=\"M20.071 20.0719C19.4774 20.6653 18.6726 20.999 17.8333 21L15.3321 21C14.9343 21 14.5528 20.842 14.2715 20.5607C13.9902 20.2794 13.8321 19.8978 13.8321 19.5C13.8321 19.1021 13.9902 18.7207 14.2715 18.4394C14.5527 18.1582 14.9342 18 15.3321 18H17.8328C17.8772 18 17.9196 17.9824 17.9509 17.9512C17.9822 17.9199 17.9998 17.8773 18 17.8332L18 15.3344C18 14.9365 18.158 14.5549 18.4394 14.2736C18.7207 13.9923 19.1022 13.8344 19.5 13.8344C19.8978 13.8344 20.2793 13.9923 20.5606 14.2736C20.842 14.5549 21 14.9365 21 15.3344L21 17.8347C20.9987 18.674 20.6646 19.4785 20.071 20.0719Z\"/>\n</svg>\n" },
	fullscreen_exit: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 -960 960 960\" width=\"24px\"><path d=\"M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z\"/></svg>" },
	indigo_fullscreen_exit: { svg: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.23813 9.23897C8.64442 9.83244 7.83947 10.1662 6.99999 10.1668H4.5C4.10222 10.1668 3.72069 10.0089 3.43936 9.72754C3.15805 9.44623 3 9.06465 3 8.66683C3 8.26901 3.15805 7.88742 3.43936 7.60612C3.72069 7.32478 4.10222 7.16683 4.5 7.16683H6.99965C7.04399 7.16683 7.08646 7.14924 7.11776 7.118C7.14907 7.08674 7.16668 7.04445 7.16683 7.00032V4.5C7.16683 4.10219 7.3248 3.72074 7.60612 3.43942C7.88738 3.15816 8.26894 3 8.66683 3C9.06474 3 9.44623 3.15818 9.72747 3.43942C10.0087 3.72069 10.1668 4.10212 10.1668 4.5V7.00133C10.1658 7.84082 9.83183 8.6455 9.23813 9.23897Z\"/>\n<path d=\"M14.2726 3.43942C14.5538 3.15818 14.9353 3 15.3332 3C15.7312 3 16.1126 3.15818 16.3939 3.43942C16.6752 3.72069 16.8332 4.10212 16.8332 4.5V6.99982C16.8335 7.04404 16.8513 7.08642 16.8826 7.11774C16.914 7.14902 16.9564 7.16668 17.0008 7.16683H19.5C19.8978 7.16683 20.2793 7.32478 20.5606 7.60612C20.842 7.88742 21 8.26901 21 8.66683C21 9.06465 20.842 9.44623 20.5606 9.72754C20.2793 10.0089 19.8978 10.1668 19.5 10.1668H17.0003C16.1609 10.1662 15.3556 9.83243 14.7619 9.23897C14.1682 8.6455 13.8342 7.84082 13.8332 7.00133V4.5C13.8332 4.10212 13.9913 3.72069 14.2726 3.43942Z\"/>\n<path d=\"M3.43936 14.2736C3.72069 13.9923 4.10222 13.8343 4.5 13.8343H6.99965C7.83913 13.835 8.64442 14.1687 9.23813 14.7622C9.83183 15.3557 10.1658 16.1604 10.1668 16.9998V19.5C10.1668 19.8978 10.0088 20.2794 9.72747 20.5607C9.44613 20.842 9.06461 21 8.66683 21C8.26907 21 7.88747 20.8421 7.60612 20.5607C7.32476 20.2794 7.16683 19.8978 7.16683 19.5V17.0009C7.16668 16.9567 7.14907 16.9144 7.11776 16.8832C7.08646 16.8519 7.04399 16.8343 6.99965 16.8343H4.5C4.10222 16.8343 3.72069 16.6764 3.43936 16.3951C3.15805 16.1138 3 15.7322 3 15.3343C3 14.9365 3.15805 14.5549 3.43936 14.2736Z\"/>\n<path d=\"M14.7619 14.7622C15.3556 14.1687 16.1605 13.835 17 13.8343H19.5C19.8978 13.8343 20.2793 13.9923 20.5606 14.2736C20.842 14.5549 21 14.9365 21 15.3343C21 15.7322 20.842 16.1138 20.5606 16.3951C20.2793 16.6764 19.8978 16.8343 19.5 16.8343L17.0011 16.8343C16.9567 16.8345 16.914 16.8522 16.8826 16.8834C16.8513 16.9148 16.8335 16.9571 16.8332 17.0014V19.5C16.8332 19.8978 16.6752 20.2794 16.3939 20.5607C16.1125 20.842 15.731 21 15.3332 21C14.9355 21 14.5539 20.842 14.2726 20.5607C13.9913 20.2794 13.8332 19.8978 13.8332 19.5V17.0003C13.8342 16.1609 14.1682 15.3557 14.7619 14.7622Z\"/>\n</svg>\n" },
	resize: { svg: "<svg width=\"9\" height=\"9\" viewBox=\"0 0 9 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8.30362 0L0 8.30362L0.691969 8.99559L8.99559 0.691968L8.30362 0Z\"/><path d=\"M8.30803 3.46558L3.46425 8.30936L4.15622 9.00132L9 4.15755L8.30803 3.46558Z\"/></svg>" },
	indigo_clear: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\">\n<path d=\"M14.8144 11.9896L18.4171 8.39087C18.7818 8.0135 18.9836 7.50809 18.9791 6.98347C18.9745 6.45885 18.764 5.95699 18.3927 5.58602C18.0215 5.21504 17.5192 5.00464 16.9942 5.00008C16.4692 4.99552 15.9635 5.19718 15.5858 5.56166L11.9896 9.15372L8.39335 5.56166C8.01571 5.19718 7.50992 4.99552 6.98492 5.00008C6.45992 5.00464 5.95769 5.21505 5.58645 5.58602C5.2152 5.95699 5.00464 6.45885 5.00008 6.98347C4.99551 7.50809 5.19733 8.0135 5.56207 8.39087L9.18561 12.0104L5.58291 15.6091C5.21817 15.9865 5.01635 16.4919 5.02091 17.0165C5.02548 17.5412 5.23604 18.043 5.60729 18.414C5.97853 18.785 6.48075 18.9954 7.00576 18.9999C7.53076 19.0045 8.03654 18.8028 8.41419 18.4383L12.0104 14.8463L15.6067 18.4383C15.9843 18.8028 16.4901 19.0045 17.0151 18.9999C17.5401 18.9954 18.0423 18.785 18.4136 18.414C18.7848 18.043 18.9954 17.5412 18.9999 17.0165C19.0045 16.4919 18.8027 15.9865 18.4379 15.6091L14.8144 11.9896Z\"/>\n</svg>" },
	indigo_unfold_more: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\">\n<path d=\"M13.2403 2.52848C12.9114 2.1902 12.4652 2.0001 12 2C11.5348 2.0001 11.0886 2.1902 10.7597 2.52848L6.49245 6.94326C6.17289 7.28344 5.99607 7.73906 6.00007 8.21198C6.00406 8.6849 6.18855 9.13731 6.51381 9.47173C6.83907 9.80615 7.27909 9.99582 7.73907 9.99993C8.19904 10.004 8.64218 9.82225 8.97305 9.49369L12 6.35412L15.0269 9.49369C15.3578 9.82225 15.801 10.004 16.2609 9.99993C16.7209 9.99582 17.1609 9.80615 17.4862 9.47173C17.8115 9.13731 17.9959 8.6849 17.9999 8.21198C18.0039 7.73906 17.8271 7.28344 17.5076 6.94326L13.2403 2.52848Z\"/>\n<path d=\"M10.7597 21.4715C11.0886 21.8098 11.5348 21.9999 12 22C12.4652 21.9999 12.9114 21.8098 13.2403 21.4715L17.5076 17.0567C17.8271 16.7166 18.0039 16.2609 17.9999 15.788C17.9959 15.3151 17.8115 14.8627 17.4862 14.5283C17.1609 14.1939 16.7209 14.0042 16.2609 14.0001C15.801 13.996 15.3578 14.1778 15.0269 14.5063L12 17.6459L8.97305 14.5063C8.64218 14.1778 8.19904 13.996 7.73907 14.0001C7.27909 14.0042 6.83907 14.1939 6.51381 14.5283C6.18855 14.8627 6.00406 15.3151 6.00007 15.788C5.99607 16.2609 6.17289 16.7166 6.49245 17.0567L10.7597 21.4715Z\"/>\n</svg>" },
	indigo_unfold_less: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\">\n<path d=\"M10.7597 9.47152C11.0886 9.8098 11.5348 9.9999 12 10C12.4652 9.9999 12.9114 9.8098 13.2403 9.47152L17.5076 5.05674C17.8271 4.71656 18.0039 4.26094 17.9999 3.78802C17.9959 3.3151 17.8115 2.86269 17.4862 2.52827C17.1609 2.19385 16.7209 2.00418 16.2609 2.00007C15.801 1.99596 15.3578 2.17775 15.0269 2.50631L12 5.64588L8.97305 2.50631C8.64218 2.17775 8.19904 1.99596 7.73907 2.00007C7.27909 2.00418 6.83907 2.19386 6.51381 2.52828C6.18855 2.8627 6.00406 3.3151 6.00007 3.78802C5.99607 4.26095 6.17289 4.71656 6.49245 5.05674L10.7597 9.47152Z\"/>\n<path d=\"M13.2403 14.5285C12.9114 14.1902 12.4652 14.0001 12 14C11.5348 14.0001 11.0886 14.1902 10.7597 14.5285L6.49245 18.9433C6.17289 19.2834 5.99607 19.7391 6.00007 20.212C6.00406 20.6849 6.18855 21.1373 6.51381 21.4717C6.83907 21.8061 7.27909 21.9958 7.73907 21.9999C8.19904 22.004 8.64218 21.8222 8.97305 21.4937L12 18.3541L15.0269 21.4937C15.3578 21.8222 15.801 22.004 16.2609 21.9999C16.7209 21.9958 17.1609 21.8061 17.4862 21.4717C17.8115 21.1373 17.9959 20.6849 17.9999 20.212C18.0039 19.7391 17.8271 19.2834 17.5076 18.9433L13.2403 14.5285Z\"/>\n</svg>" },
	indigo_arrow_forward: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\">\n<path d=\"M4.00085 11.9436C3.99347 12.178 4.034 12.4115 4.12005 12.6303C4.20609 12.849 4.33589 13.0484 4.50174 13.2168C4.66758 13.3851 4.8661 13.519 5.0855 13.6103C5.30489 13.7017 5.54069 13.7487 5.7789 13.7486H14.136L11.6165 16.1733L11.5898 16.1996C11.2817 16.5108 11.1117 16.9297 11.117 17.3643C11.1224 17.7989 11.3026 18.2137 11.6183 18.5175C11.9413 18.8269 12.3741 19 12.8247 19C13.2753 19 13.7081 18.8269 14.0311 18.5175L19.5004 13.2234C19.6586 13.0703 19.7843 12.8878 19.8701 12.6864C19.9559 12.485 20 12.2688 20 12.0504V11.9576C20.0002 11.7387 19.9561 11.5219 19.8703 11.3199C19.7846 11.1179 19.6588 10.9348 19.5004 10.7811L14.0311 5.48876C13.8672 5.32979 13.6726 5.20469 13.4589 5.12081C13.2451 5.03693 13.0165 4.99596 12.7865 5.00031C12.3501 5.01251 11.9346 5.18704 11.6236 5.48876L11.5952 5.51677C11.2855 5.82747 11.1138 6.24653 11.1178 6.68184C11.1218 7.11714 11.3012 7.53307 11.6165 7.83821L14.12 10.2472L5.7789 10.2472C5.31673 10.247 4.87263 10.4239 4.54073 10.7406C4.20882 11.0573 4.01518 11.4888 4.00085 11.9436Z\"/>\n</svg>" },
	indigo_arrow_back: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\">\n<path d=\"M18.229 13.7483H9.87121L12.3839 16.1672L12.4106 16.1952C12.5638 16.3492 12.6846 16.5315 12.7662 16.7316C12.8478 16.9316 12.8885 17.1455 12.8861 17.361C12.8836 17.5766 12.8379 17.7895 12.7518 17.9877C12.6656 18.1859 12.5406 18.3654 12.3839 18.516C12.0608 18.8263 11.6272 19 11.1757 19C10.7242 19 10.2906 18.8263 9.9675 18.516L4.4996 13.2197C4.3412 13.0668 4.21543 12.8843 4.12963 12.683C4.04384 12.4816 3.99978 12.2654 4 12.0471L4 11.9543C3.9998 11.7354 4.04385 11.5187 4.12963 11.3168C4.21542 11.1148 4.34117 10.9317 4.4996 10.7782L9.9675 5.48717C10.2904 5.17494 10.7249 5 11.1775 5C11.6301 5 12.0646 5.17494 12.3874 5.48717L12.4106 5.51163C12.564 5.66543 12.6851 5.84754 12.767 6.04746C12.8489 6.24737 12.8899 6.46121 12.8878 6.67675C12.8857 6.8923 12.8404 7.10529 12.7545 7.30359C12.6687 7.50189 12.5439 7.68161 12.3874 7.83242L9.87832 10.2479L18.2219 10.2479C18.6935 10.2479 19.1458 10.4323 19.4792 10.7605C19.8127 11.0887 20 11.5339 20 11.9981C20 12.4623 19.8127 12.9074 19.4792 13.2356C19.1458 13.5638 18.6935 13.7483 18.2219 13.7483H18.229Z\"/>\n</svg>" },
	indigo_arrow_downward: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\">\n<path d=\"M12.0564 4.00085C11.822 3.99347 11.5885 4.034 11.3697 4.12005C11.151 4.20609 10.9516 4.33589 10.7832 4.50174C10.6149 4.66758 10.481 4.8661 10.3897 5.0855C10.2983 5.30489 10.2513 5.54069 10.2514 5.7789V14.136L7.82669 11.6165L7.80043 11.5898C7.48918 11.2817 7.07026 11.1117 6.63567 11.117C6.20107 11.1224 5.78632 11.3026 5.48249 11.6183C5.17311 11.9413 5 12.3741 5 12.8247C5 13.2753 5.17311 13.7081 5.48249 14.0311L10.7766 19.5004C10.9297 19.6586 11.1122 19.7843 11.3136 19.8701C11.515 19.9559 11.7312 20 11.9496 20H12.0424C12.2613 20.0002 12.4781 19.9561 12.6801 19.8703C12.8821 19.7846 13.0652 19.6588 13.2189 19.5004L18.5112 14.0311C18.6702 13.8672 18.7953 13.6726 18.8792 13.4589C18.9631 13.2451 19.004 13.0165 18.9997 12.7865C18.9875 12.3501 18.813 11.9346 18.5112 11.6236L18.4832 11.5952C18.1725 11.2855 17.7535 11.1138 17.3182 11.1178C16.8829 11.1218 16.4669 11.3012 16.1618 11.6165L13.7528 14.12V5.7789C13.753 5.31673 13.5761 4.87263 13.2594 4.54073C12.9427 4.20882 12.5112 4.01518 12.0564 4.00085Z\"/>\n</svg>" },
	indigo_arrow_upward: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\">\n<path d=\"M10.2517 18.229V9.87121L7.83279 12.3839L7.80481 12.4106C7.65078 12.5638 7.46849 12.6846 7.26845 12.7662C7.0684 12.8478 6.85454 12.8885 6.63899 12.8861C6.42344 12.8836 6.21049 12.8379 6.01231 12.7518C5.81414 12.6656 5.63459 12.5406 5.48402 12.3839C5.17367 12.0608 5 11.6272 5 11.1757C5 10.7242 5.17367 10.2906 5.48402 9.9675L10.7803 4.4996C10.9332 4.3412 11.1157 4.21543 11.317 4.12963C11.5184 4.04384 11.7346 3.99978 11.9529 4H12.0457C12.2646 3.9998 12.4813 4.04385 12.6832 4.12963C12.8852 4.21542 13.0683 4.34117 13.2218 4.4996L18.5128 9.9675C18.8251 10.2904 19 10.7249 19 11.1775C19 11.6301 18.8251 12.0646 18.5128 12.3874L18.4884 12.4106C18.3346 12.564 18.1525 12.6851 17.9525 12.767C17.7526 12.8489 17.5388 12.8899 17.3232 12.8878C17.1077 12.8857 16.8947 12.8404 16.6964 12.7545C16.4981 12.6687 16.3184 12.5439 16.1676 12.3874L13.7521 9.87832V18.2219C13.7521 18.6935 13.5677 19.1458 13.2395 19.4792C12.9113 19.8127 12.4661 20 12.0019 20C11.5377 20 11.0926 19.8127 10.7644 19.4792C10.4362 19.1458 10.2517 18.6935 10.2517 18.2219V18.229Z\"/>\n</svg>" },
	indigo_chevron_down: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\">\n<path d=\"M12 17C11.5348 16.9999 11.0886 16.8098 10.7597 16.4715L5.49245 11.0567C5.17289 10.7166 4.99607 10.2609 5.00007 9.78802C5.00406 9.3151 5.18855 8.86269 5.51381 8.52827C5.83907 8.19385 6.27909 8.00418 6.73907 8.00007C7.19904 7.99596 7.64218 8.17775 7.97305 8.50631L12 12.6459L16.027 8.50631C16.3578 8.17775 16.801 7.99596 17.2609 8.00007C17.7209 8.00418 18.1609 8.19386 18.4862 8.52827C18.8115 8.86269 18.9959 9.3151 18.9999 9.78802C19.0039 10.2609 18.8271 10.7166 18.5076 11.0567L13.2403 16.4715C12.9114 16.8098 12.4652 16.9999 12 17Z\"/>\n</svg>" },
	indigo_chevron_up: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\">\n<path d=\"M12 7.00001C12.4629 7.00011 12.9069 7.18943 13.2342 7.52633L18.467 12.9116C18.6338 13.0773 18.7668 13.2755 18.8583 13.4947C18.9498 13.7138 18.9979 13.9496 18.9999 14.1881C19.0019 14.4266 18.9578 14.6632 18.87 14.8839C18.7822 15.1047 18.6526 15.3052 18.4887 15.4739C18.3247 15.6425 18.1299 15.7759 17.9153 15.8662C17.7008 15.9565 17.4709 16.002 17.2391 15.9999C17.0073 15.9979 16.7783 15.9483 16.5653 15.8542C16.3523 15.76 16.1596 15.6232 15.9986 15.4516L12 11.3363L8.00135 15.4516C7.84032 15.6232 7.64771 15.76 7.43472 15.8542C7.22174 15.9483 6.99265 15.9979 6.76085 15.9999C6.52906 16.002 6.29918 15.9565 6.08463 15.8662C5.87009 15.7759 5.6752 15.6425 5.51129 15.4739C5.34738 15.3052 5.21778 15.1047 5.13 14.8839C5.04223 14.6632 4.99805 14.4266 5.00007 14.1881C5.00208 13.9496 5.05023 13.7138 5.14172 13.4947C5.23321 13.2755 5.36619 13.0773 5.53292 12.9116L10.7658 7.52633C10.9274 7.35895 11.1198 7.22625 11.3316 7.1359C11.5435 7.04556 11.7706 6.99937 12 7.00001Z\"/>\n</svg>" },
	indigo_chevron_right: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\">\n<path d=\"M17 12C16.9999 12.4652 16.8098 12.9114 16.4715 13.2403L11.0567 18.5076C10.7166 18.8271 10.2609 19.0039 9.78802 18.9999C9.3151 18.9959 8.86269 18.8115 8.52827 18.4862C8.19385 18.1609 8.00418 17.7209 8.00007 17.2609C7.99596 16.801 8.17775 16.3578 8.50631 16.027L12.6459 12L8.50631 7.97305C8.17775 7.64218 7.99596 7.19904 8.00007 6.73907C8.00418 6.27909 8.19385 5.83907 8.52827 5.51381C8.86269 5.18855 9.3151 5.00406 9.78802 5.00007C10.2609 4.99607 10.7166 5.17289 11.0567 5.49245L16.4715 10.7597C16.8098 11.0886 16.9999 11.5348 17 12Z\"/>\n</svg>" },
	indigo_chevron_left: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\">\n<path d=\"M7.00001 12C7.00011 11.5371 7.18943 11.0931 7.52633 10.7658L12.9116 5.53297C13.0773 5.36624 13.2755 5.23321 13.4947 5.14172C13.7138 5.05023 13.9496 5.00208 14.1881 5.00007C14.4266 4.99805 14.6632 5.04223 14.8839 5.13C15.1047 5.21778 15.3052 5.34743 15.4739 5.51134C15.6425 5.67525 15.7759 5.87015 15.8662 6.08469C15.9565 6.29923 16.002 6.52911 15.9999 6.7609C15.9979 6.9927 15.9483 7.22174 15.8542 7.43472C15.76 7.64771 15.6232 7.84037 15.4516 8.00141L11.3363 12L15.4516 15.9986C15.6232 16.1597 15.76 16.3523 15.8542 16.5653C15.9483 16.7783 15.9979 17.0074 15.9999 17.2391C16.002 17.4709 15.9565 17.7008 15.8662 17.9154C15.7759 18.1299 15.6425 18.3248 15.4739 18.4887C15.3052 18.6526 15.1047 18.7822 14.8839 18.87C14.6632 18.9578 14.4266 19.0019 14.1881 18.9999C13.9496 18.9979 13.7138 18.9498 13.4947 18.8583C13.2755 18.7668 13.0773 18.6338 12.9116 18.4671L7.52633 13.2342C7.35895 13.0726 7.22625 12.8802 7.1359 12.6684C7.04556 12.4565 6.99937 12.2294 7.00001 12Z\"/>\n</svg>" },
	indigo_check: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\">\n<path d=\"M19.0329 5.00008C18.7694 4.99771 18.5081 5.04833 18.2646 5.14892C18.0211 5.2495 17.8003 5.39801 17.6153 5.5856L9.136 14.1629L6.38271 11.3931C6.19957 11.2083 5.98158 11.0615 5.74134 10.9613C5.5011 10.8612 5.24337 10.8096 4.98307 10.8096C4.72276 10.8096 4.46503 10.8612 4.22479 10.9613C3.98455 11.0615 3.76656 11.2083 3.58343 11.3931C3.2098 11.7677 3 12.2751 3 12.804C3 13.3329 3.2098 13.8402 3.58343 14.2148L7.73836 18.4113C7.92066 18.5977 8.13838 18.7458 8.37874 18.8468C8.61909 18.9479 8.87723 19 9.138 19C9.39876 19 9.6569 18.9479 9.89726 18.8468C10.1376 18.7458 10.3553 18.5977 10.5376 18.4113L20.4166 8.42125C20.7902 8.04667 21 7.53933 21 7.01042C21 6.48151 20.7902 5.97417 20.4166 5.59958C20.2368 5.41354 20.022 5.26481 19.7846 5.16193C19.5471 5.05905 19.2917 5.00405 19.0329 5.00008Z\"/>\n</svg>" },
	error: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 -960 960 960\" width=\"24px\"><path d=\"M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z\"/></svg>" },
	indigo_access_time: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path d=\"M10.5 8a1.5 1.5 0 0 1 3 0v2.5H16a1.5 1.5 0 1 1 0 3h-4a1.5 1.5 0 0 1-1.5-1.5V8Z\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22 12c0 5.523-4.476 10-10 10-5.522 0-10-4.477-10-10S6.479 2 12 2c5.524 0 10 4.477 10 10Zm-3 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z\"/></svg>" },
	indigo_add: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path d=\"M10.2 13.8H5.8a1.8 1.8 0 0 1 0-3.6h4.4V5.8a1.8 1.8 0 1 1 3.6 0v4.4h4.4a1.8 1.8 0 0 1 0 3.6h-4.4v4.4a1.8 1.8 0 1 1-3.6 0v-4.4Z\"/></svg>" },
	indigo_attach_file: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path d=\"m16.496 10.809-7.63 7.365a.965.965 0 0 1-1.31 0 .844.844 0 0 1 0-1.24l6.59-6.382c.601-.601.59-1.55-.032-2.14a1.689 1.689 0 0 0-2.261-.03l-.033.03-6.558 6.351c-1.629 1.542-1.629 4.04 0 5.581 1.629 1.541 4.27 1.541 5.899 0l7.63-7.365c2.533-2.397 2.533-6.284 0-8.681-2.535-2.397-6.642-2.397-9.176 0L4.008 9.749l-.033.031a1.477 1.477 0 0 0 0 2.17 1.688 1.688 0 0 0 2.326-.03l5.608-5.452c1.267-1.198 3.32-1.198 4.587 0a2.954 2.954 0 0 1 0 4.34Z\"/></svg>" },
	indigo_block: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path d=\"M19.248 4.787c-.006-.007-.008-.014-.014-.02-.007-.007-.014-.009-.02-.015A10.232 10.232 0 0 0 4.751 19.213c.006.007.008.016.014.02.006.006.014.009.02.015A10.232 10.232 0 0 0 19.249 4.787ZM12 4.327c1.592 0 3.145.498 4.44 1.425L5.751 16.44A7.66 7.66 0 0 1 12 4.326Zm0 15.347a7.623 7.623 0 0 1-4.44-1.426L18.249 7.56A7.661 7.661 0 0 1 12 19.674Z\"/></svg>" },
	indigo_calendar_today: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path d=\"M18.299 4H17v-.5a1.5 1.5 0 1 0-3 0V4h-4v-.5a1.5 1.5 0 1 0-3 0V4H5.703A3.707 3.707 0 0 0 2 7.702v10.595A3.707 3.707 0 0 0 5.703 22h12.596A3.706 3.706 0 0 0 22 18.297V7.702A3.707 3.707 0 0 0 18.299 4ZM5.703 7H7v.5a1.5 1.5 0 0 0 3 0V7h4v.5a1.5 1.5 0 0 0 3 0V7h1.298a.704.704 0 0 1 .702.702v2.655H5V7.703A.703.703 0 0 1 5.703 7Zm12.596 12H5.703A.704.704 0 0 1 5 18.297v-4.94h14v4.94a.704.704 0 0 1-.702.703Z\"/></svg>" },
	indigo_cancel: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 22c5.524 0 10-4.477 10-10 0-5.522-4.476-10-10-10C6.479 2 2 6.478 2 12c0 5.523 4.478 10 10 10ZM7.438 9.543a1.49 1.49 0 0 1 2.106-2.106l2.458 2.457 2.457-2.457a1.489 1.489 0 1 1 2.106 2.106L14.107 12l2.457 2.457a1.49 1.49 0 0 1-2.106 2.107l-2.457-2.458-2.458 2.458a1.489 1.489 0 1 1-2.106-2.107L9.894 12 7.437 9.543Z\"/></svg>" },
	indigo_check_circle: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.445 3.685a10 10 0 1 1 11.111 16.63A10 10 0 0 1 6.445 3.685Zm10.22 3.923a1.294 1.294 0 0 0-.523-.108 1.294 1.294 0 0 0-.947.424l-4.761 5.131-1.626-1.703a1.297 1.297 0 0 0-1.911 0c-.254.27-.396.632-.396 1.009 0 .376.142.738.396 1.008l2.59 2.712c.124.133.272.238.436.31a1.29 1.29 0 0 0 1.473-.31l3.547-3.815 2.162-2.33c.254-.27.396-.632.396-1.008 0-.377-.142-.738-.396-1.01a1.325 1.325 0 0 0-.44-.31Z\"/></svg>" },
	indigo_error: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.685 17.556a10 10 0 1 1 16.63-11.112 10 10 0 0 1-16.63 11.112ZM10.5 11.5v-4a1.5 1.5 0 1 1 3 0v4a1.5 1.5 0 1 1-3 0Zm.253 5.833a1.5 1.5 0 1 1 2.495-1.667 1.5 1.5 0 0 1-2.495 1.667Z\"/></svg>" },
	indigo_file_download: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path d=\"M10.41 11.21V3.616c0-.43.167-.84.466-1.144A1.578 1.578 0 0 1 12 2c.422 0 .826.17 1.125.473.298.304.466.715.466 1.144v7.586l2.195-2.282a1.49 1.49 0 0 1 1.05-.455 1.47 1.47 0 0 1 1.06.434l.022.021c.284.294.443.689.443 1.1 0 .412-.16.807-.443 1.1l-4.81 4.972a1.496 1.496 0 0 1-1.069.454h-.084a1.47 1.47 0 0 1-1.066-.454L6.076 11.12a1.586 1.586 0 0 1-.44-1.098c0-.41.158-.805.44-1.098a1.49 1.49 0 0 1 1.05-.457 1.47 1.47 0 0 1 1.06.432l.025.025 2.199 2.284Z\"/><path d=\"M20.41 14.729a1.59 1.59 0 0 0-1.592 1.591v1.613a.886.886 0 0 1-.884.884H6.07a.892.892 0 0 1-.89-.884V16.32a1.591 1.591 0 0 0-3.181 0v1.618A4.087 4.087 0 0 0 6.066 22h11.868A4.07 4.07 0 0 0 22 17.931V16.32a1.59 1.59 0 0 0-1.59-1.591Z\"/></svg>" },
	indigo_file_upload: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path d=\"M13.59 14.927v-7.59L15.79 9.62l.026.024a1.489 1.489 0 0 0 1.06.432 1.473 1.473 0 0 0 1.05-.456c.281-.294.439-.688.439-1.098 0-.41-.158-.805-.44-1.099l-4.814-4.97A1.49 1.49 0 0 0 12.044 2h-.085a1.479 1.479 0 0 0-1.069.454l-4.81 4.97a1.582 1.582 0 0 0-.442 1.1c0 .412.16.806.443 1.1l.022.02a1.489 1.489 0 0 0 1.06.435 1.47 1.47 0 0 0 1.05-.455l2.195-2.28v7.583c0 .429.168.84.466 1.143.299.303.703.474 1.125.474.422 0 .827-.17 1.125-.474a1.63 1.63 0 0 0 .466-1.143Z\"/><path d=\"M19.284 15.197A1.59 1.59 0 0 1 22 16.32v1.611A4.071 4.071 0 0 1 17.934 22H6.066A4.085 4.085 0 0 1 2 17.939V16.32a1.59 1.59 0 0 1 3.182 0v1.613a.892.892 0 0 0 .89.884h11.862a.886.886 0 0 0 .884-.884v-1.613c0-.422.168-.826.466-1.124Z\"/></svg>" },
	indigo_filter_list: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path d=\"M4.616 7.682h14.768c.428 0 .84-.168 1.143-.466.303-.298.473-.703.473-1.125 0-.422-.17-.827-.473-1.125a1.63 1.63 0 0 0-1.143-.466H4.616c-.428 0-.84.168-1.143.466A1.579 1.579 0 0 0 3 6.091c0 .422.17.827.473 1.125a1.63 1.63 0 0 0 1.143.466ZM7.344 13.591h9.312c.429 0 .84-.168 1.143-.466.303-.299.474-.703.474-1.125 0-.422-.17-.827-.474-1.125a1.63 1.63 0 0 0-1.143-.466H7.344c-.429 0-.84.167-1.143.466A1.579 1.579 0 0 0 5.727 12c0 .422.17.827.474 1.125a1.63 1.63 0 0 0 1.143.466ZM13.929 19.5h-3.858a1.63 1.63 0 0 1-1.143-.466 1.578 1.578 0 0 1-.473-1.125c0-.422.17-.826.473-1.125a1.63 1.63 0 0 1 1.143-.466h3.858c.429 0 .84.167 1.143.466.303.298.474.703.474 1.125 0 .422-.17.827-.474 1.125a1.63 1.63 0 0 1-1.143.466Z\"/></svg>" },
	indigo_horizontal_rule: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path d=\"M5.778 13.5h12.444c.471 0 .924-.184 1.257-.512.334-.329.521-.774.521-1.238 0-.464-.187-.91-.52-1.237A1.793 1.793 0 0 0 18.221 10H5.778c-.471 0-.924.184-1.257.513-.334.328-.521.773-.521 1.237 0 .464.187.91.52 1.238.334.328.787.512 1.258.512Z\"/></svg>" },
	indigo_info: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.686 6.944a10 10 0 1 0 16.63 11.112A10 10 0 0 0 3.685 6.944Zm6.815 5.556V17a1.5 1.5 0 0 0 3 0v-4.5a1.5 1.5 0 1 0-3 0Zm.253-5.333a1.5 1.5 0 1 0 2.494 1.666 1.5 1.5 0 0 0-2.494-1.666Z\"/></svg>" },
	indigo_menu: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path d=\"M4.616 7.682h14.768c.428 0 .84-.168 1.143-.466.303-.299.473-.703.473-1.125 0-.422-.17-.827-.473-1.125a1.63 1.63 0 0 0-1.143-.466H4.616c-.428 0-.84.168-1.143.466A1.578 1.578 0 0 0 3 6.09c0 .422.17.826.473 1.125a1.63 1.63 0 0 0 1.143.466ZM4.616 13.59h14.768c.428 0 .84-.167 1.143-.465.303-.299.473-.703.473-1.125 0-.422-.17-.827-.473-1.125a1.63 1.63 0 0 0-1.143-.466H4.616c-.428 0-.84.167-1.143.466A1.578 1.578 0 0 0 3 12c0 .422.17.826.473 1.125a1.63 1.63 0 0 0 1.143.466ZM19.384 19.5H4.616a1.63 1.63 0 0 1-1.143-.466A1.578 1.578 0 0 1 3 17.909c0-.422.17-.826.473-1.125a1.63 1.63 0 0 1 1.143-.466h14.768c.428 0 .84.168 1.143.466.303.299.473.703.473 1.125 0 .422-.17.827-.473 1.125a1.63 1.63 0 0 1-1.143.466Z\"/></svg>" },
	indigo_pin: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M18.12 2.516A1.572 1.572 0 0 0 16.966 2H7.034c-.435 0-.85.187-1.154.516a1.814 1.814 0 0 0-.472 1.23c0 .46.168.902.472 1.23.304.33.72.516 1.154.516h.169v3.023a6.54 6.54 0 0 0-1.977 2.382c-.535 1.083-.782 2.444-.715 3.669.006.45.174.882.472 1.204.304.329.719.516 1.153.516h4.238v3.825c-.01.073-.015.147-.015.222 0 .92.735 1.667 1.641 1.667s1.64-.746 1.64-1.667c0-.075-.004-.15-.014-.222v-3.825h4.238c.434 0 .849-.187 1.153-.516.298-.322.466-.754.473-1.204.066-1.225-.181-2.586-.716-3.67a6.54 6.54 0 0 0-1.977-2.38V5.491h.17c.434 0 .849-.186 1.153-.515.304-.329.472-.772.472-1.23 0-.46-.168-.903-.472-1.231ZM8.005 12.114c-.114.169-.288.708-.288 1.076h8.566c0-.368-.174-.907-.289-1.076a2.738 2.738 0 0 0-1.051-.925 1.645 1.645 0 0 1-.764-.624 1.836 1.836 0 0 1-.304-1.016V5.095h-3.75V9.55c0 .364-.106.719-.304 1.016-.19.285-.456.503-.764.624-.417.205-.779.523-1.052.925Z\"/></svg>" },
	indigo_refresh: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path d=\"M14.068 3.247a9.05 9.05 0 0 0-8.98 2.925c-1.08 1.263-1.79 2.35-2.054 3.991a1.58 1.58 0 0 0-.034.315v.003A1.519 1.519 0 0 0 4.504 12a1.458 1.458 0 0 0 1.515-1.184l.002-.012.002-.012c.148-1.107.602-1.702 1.312-2.565a5.999 5.999 0 0 1 8.533-.75l-1.314 1.308a1.396 1.396 0 0 0-.314.445.761.761 0 0 0-.015.582.756.756 0 0 0 .418.406c.163.07.347.095.531.095H20.03A.985.985 0 0 0 21 9.348v-4.84c0-.323-.09-.772-.5-.94-.407-.17-.79.084-1.022.315l-1.45 1.444a9.05 9.05 0 0 0-3.96-2.08ZM3.977 13.687H3.97A.984.984 0 0 0 3 14.65v4.84c0 .324.09.773.499.942.408.17.79-.084 1.023-.315l1.45-1.444a9.049 9.049 0 0 0 12.94-.845c1.08-1.263 1.79-2.35 2.054-3.991.022-.104.033-.209.034-.315v-.003A1.518 1.518 0 0 0 19.496 12a1.458 1.458 0 0 0-1.513 1.184l-.002.012-.002.012c-.148 1.108-.602 1.702-1.312 2.565a6 6 0 0 1-8.535.75l1.314-1.308c.133-.132.246-.281.314-.445a.76.76 0 0 0 .015-.582.756.756 0 0 0-.418-.406 1.364 1.364 0 0 0-.531-.095h-4.85Z\"/></svg>" },
	indigo_search: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.393 3a7.393 7.393 0 1 0 4.068 13.567l3.996 3.997a1.49 1.49 0 1 0 2.107-2.107l-3.997-3.996A7.393 7.393 0 0 0 10.393 3ZM6 10.393a4.393 4.393 0 1 1 8.786 0 4.393 4.393 0 0 1-8.786 0Z\"/></svg>" },
	indigo_send: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M20.302 10.84S5.5 2.591 4.352 2.13C3.207 1.666 3 2.59 3 2.59v17.791c0 .277.077.549.223.79.146.242.356.444.611.589a1.871 1.871 0 0 0 1.708.064l14.5-8.216c.29-.136.533-.343.702-.6.17-.256.258-.551.256-.851a1.528 1.528 0 0 0-.267-.85 1.672 1.672 0 0 0-.431-.433v-.035ZM6.5 10.021V6.803l9.5 5.385-9.5 5.555v-3.146l3.583-.645.036-.01a1.76 1.76 0 0 0 .913-.572 1.54 1.54 0 0 0 .361-.964 1.535 1.535 0 0 0-.336-.972 1.753 1.753 0 0 0-.898-.593l-.034-.01-3.625-.81Z\"/></svg>" },
	indigo_unpin: { svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M2.474 19.223a1.633 1.633 0 0 0 0 2.3 1.614 1.614 0 0 0 2.29 0l5.11-5.105v3.693c-.01.073-.015.147-.015.222 0 .92.735 1.667 1.641 1.667s1.64-.746 1.64-1.667a1.77 1.77 0 0 0-.014-.222v-3.825h4.237c.435 0 .85-.187 1.154-.516.298-.322.466-.754.472-1.204.067-1.225-.18-2.586-.715-3.67A6.66 6.66 0 0 0 17.09 9.21l4.436-4.432a1.633 1.633 0 0 0 0-2.3 1.614 1.614 0 0 0-2.29 0L2.474 19.223Zm12.381-7.781-1.75 1.748h2.678c0-.368-.174-.907-.288-1.076a2.798 2.798 0 0 0-.64-.672Z\"/><path d=\"M12.614 5.095h-2.99v2.986l-5.609 5.605c.061-.969.302-1.96.71-2.79a6.54 6.54 0 0 1 1.978-2.38V5.491h-.17c-.434 0-.849-.186-1.153-.515a1.814 1.814 0 0 1-.472-1.23c0-.46.168-.903.472-1.231A1.572 1.572 0 0 1 6.534 2h9.178l-3.098 3.095Z\"/></svg>" }
})), or = ["aria-labelledby", "aria-describedby"], sr = class {
	parse(e, t = !1) {
		this._parser ??= new DOMParser();
		let n = this._parser.parseFromString(e, "image/svg+xml"), r = n.querySelector("svg");
		if (n.querySelector("parsererror") || !r) throw Error("SVG element not found or malformed SVG string.");
		let i = r.querySelector(":scope > title")?.textContent ?? void 0;
		return t && this._stripMetaElements(r), {
			svg: r.outerHTML,
			title: i
		};
	}
	_stripMetaElements(e) {
		let t = /* @__PURE__ */ new Set();
		for (let n of e.querySelectorAll("title, desc")) n.id && t.add(n.id), n.remove();
		if (t.size !== 0) for (let n of or) {
			let r = e.getAttribute(n);
			if (!r) continue;
			let i = r.trim().split(/\s+/).filter((e) => !t.has(e)).join(" ");
			i ? e.setAttribute(n, i) : e.removeAttribute(n);
		}
	}
};
//#endregion
//#region node_modules/igniteui-webcomponents/components/icon/icon.registry.js
function cr(e) {
	return typeof e == "string" ? {
		collection: e,
		stripMeta: !1
	} : {
		collection: e?.collection ?? "default",
		stripMeta: e?.stripMeta ?? !1
	};
}
function lr(e, t) {
	let n = e.get(t);
	return n || (n = /* @__PURE__ */ new Map(), e.set(t, n)), n;
}
var ur = class {
	constructor() {
		this._listeners = /* @__PURE__ */ new Set(), this._references = /* @__PURE__ */ new Map(), this._collections = new Map([["internal", ar]]), this._svgIconParser = new sr(), this._broadcast = new ir(this._collections, this._references), this._notificationScheduled = !1;
	}
	register(e, t, n = "default", r = !1) {
		let i = this._svgIconParser.parse(t, r);
		lr(this._collections, n).set(e, i), this._broadcast.send({
			actionType: rr.RegisterIcon,
			collections: new Map([[n, new Map([[e, i]])]])
		}), this._notify();
	}
	subscribe(e) {
		this._listeners.add(e);
	}
	unsubscribe(e) {
		this._listeners.delete(e);
	}
	setIconRef(e) {
		let { alias: t, target: n, overwrite: r } = e;
		if (r && (lr(this._references, t.collection).set(t.name, {
			name: n.name,
			collection: n.collection,
			external: n.external
		}), this._notify()), n.external) {
			let e = {
				name: n.name,
				collection: n.collection
			};
			this._broadcast.send({
				actionType: rr.UpdateIconReference,
				references: new Map([[t.collection, new Map([[t.name, e]])]])
			});
		}
	}
	getIconRef(e, t, n) {
		let r = this._references.get(t)?.get(e);
		if (r) return {
			name: r.name,
			collection: r.collection
		};
		if (t === "default" && n) {
			let t = nr.get(e), r = t?.get(n) ?? t?.get("default");
			if (r) return r;
		}
		return {
			name: e,
			collection: t
		};
	}
	get(e, t = "default") {
		return this._collections.get(t)?.get(e);
	}
	_notify() {
		this._notificationScheduled || (this._notificationScheduled = !0, queueMicrotask(() => {
			this._notificationScheduled = !1;
			for (let e of this._listeners) e();
		}));
	}
}, dr = Symbol.for("igc.icons-registry.instance");
function fr() {
	let e = globalThis;
	return e[dr] ??= new ur(), e[dr];
}
async function pr(e, t, n) {
	let { collection: r, stripMeta: i } = cr(n), a = await fetch(t);
	if (a.ok) {
		let t = await a.text();
		fr().register(e, t, r, i);
	} else throw Error(`Icon request failed. Status: ${a.status}.`);
}
function mr(e, t, n) {
	let { collection: r, stripMeta: i } = cr(n);
	fr().register(e, t, r, i);
}
function hr(e, t, n) {
	fr().setIconRef({
		alias: {
			name: e,
			collection: t
		},
		target: {
			name: n.name,
			collection: n.collection,
			external: !0
		},
		overwrite: !0
	});
}
//#endregion
//#region node_modules/igniteui-webcomponents/components/icon/themes/icon.base.css.js
var gr = d`:host{--is-large: clamp(0, (var(--component-size, 1) + 1) - var(--ig-size-large, 3), 1);--is-medium: min( clamp(0, (var(--component-size, 1) + 1) - var(--ig-size-medium, 2), 1), clamp(0, var(--ig-size-large, 3) - var(--component-size, 1), 1) );--is-small: clamp(0, var(--ig-size-medium) - var(--component-size, 1), 1);position:relative;box-sizing:border-box;scrollbar-width:var(--ig-scrollbar-size, var(--sb-size));scrollbar-color:var(--ig-scrollbar-thumb-background, var(--sb-thumb-bg-color)) var(--ig-scrollbar-track-background, var(--sb-track-bg-color))}:host ::-webkit-scrollbar{width:var(--ig-scrollbar-size, var(--sb-size));height:var(--ig-scrollbar-size, var(--sb-size));background:var(--ig-scrollbar-track-background, var(--sb-track-bg-color))}:host ::-webkit-scrollbar-thumb{background:var(--ig-scrollbar-thumb-background, var(--sb-thumb-bg-color))}:host *,:host *::before,:host *::after{box-sizing:border-box}:host([hidden]),[hidden]{display:none !important}:host{display:inline-flex;align-items:center;justify-content:center}svg{width:1em;height:1em}:host([mirrored]){transform:scaleX(-1)}`, _r = d`:host{--component-size: var(--ig-size, var(--default-size));color:var(--color)}svg{fill:currentcolor;font-size:var(--size)}`, vr = d`:host{--ig-theme: bootstrap;--ig-theme-variant: dark}`, yr = d`:host{--disabled-color: var(--ig-icon-disabled-color, var(--ig-gray-500));--ig-theme: fluent;--ig-theme-variant: dark}`, br = d`:host{--disabled-color: var(--ig-icon-disabled-color, var(--ig-gray-400));--size: var(--ig-icon-size, max(var(--is-large, 1) * max(1.5rem, -1 * 1.5rem), var(--is-medium, 1) * max(1rem, -1 * 1rem), var(--is-small, 1) * max(0.875rem, -1 * 0.875rem)));--ig-theme: indigo;--ig-theme-variant: dark}`, xr = d`:host{--ig-theme: material;--ig-theme-variant: dark}`, Sr = d`:host{--ig-theme: bootstrap;--ig-theme-variant: light}`, Cr = d`:host{--ig-theme: fluent;--ig-theme-variant: light}`, wr = d`:host{--disabled-color: var(--ig-icon-disabled-color, var(--ig-gray-400));--size: var(--ig-icon-size, max(var(--is-large, 1) * max(1.5rem, -1 * 1.5rem), var(--is-medium, 1) * max(1rem, -1 * 1rem), var(--is-small, 1) * max(0.875rem, -1 * 0.875rem)));--ig-theme: indigo;--ig-theme-variant: light}`, Tr = d`:host{--ig-theme: material;--ig-theme-variant: light}`, Er = d`:host{--color: var(--ig-icon-color, 'currentColor');--disabled-color: var(--ig-icon-disabled-color, 'currentColor');--size: var(--ig-icon-size, max(var(--is-large, 1) * max(1.5rem, -1 * 1.5rem), var(--is-medium, 1) * max(1.25rem, -1 * 1.25rem), var(--is-small, 1) * max(1.125rem, -1 * 1.125rem)));--default-size: var(--ig-icon-default-size, 3);--ig-theme-variant: light}`, Dr = d`:host{--component-size: var(--ig-size, var(--default-size))}`, Or = d`:host{--component-size: var(--ig-size, var(--default-size))}`, kr = d`:host{--component-size: var(--ig-size, var(--default-size))}`, Ar = {
	light: {
		shared: d`
    ${Er}
  `,
		bootstrap: d`
    ${Dr} ${Sr}
  `,
		material: d`
    ${Tr}
  `,
		fluent: d`
    ${Or} ${Cr}
  `,
		indigo: d`
    ${kr} ${wr}
  `
	},
	dark: {
		shared: d`
    ${Er}
  `,
		bootstrap: d`
    ${Dr} ${vr}
  `,
		material: d`
    ${xr}
  `,
		fluent: d`
    ${Or} ${yr}
  `,
		indigo: d`
    ${kr} ${br}
  `
	}
}, jr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, P = class e extends o {
	constructor() {
		super(...arguments), this._internals = tt(this), this._theming = Tt(this, Ar, { themeChange: this._getIcon }), this._onRegistryChange = () => this._getIcon(), this._hydrating = !1, this._svg = "", this.name = "", this.collection = "default", this.mirrored = !1;
	}
	static {
		this.tagName = "igc-icon";
	}
	static {
		this.styles = [gr, _r];
	}
	static register() {
		M(e);
	}
	connectedCallback() {
		super.connectedCallback(), fr().subscribe(this._onRegistryChange);
	}
	disconnectedCallback() {
		fr().unsubscribe(this._onRegistryChange), super.disconnectedCallback();
	}
	createRenderRoot() {
		return this._hydrating = this.shadowRoot !== null, super.createRenderRoot();
	}
	update(e) {
		(e.has("name") || e.has("collection")) && this._getIcon(), super.update(e);
	}
	firstUpdated() {
		this._hydrating && (this._hydrating = !1, this._svg && queueMicrotask(() => this.requestUpdate()));
	}
	_getIcon() {
		let e = fr(), { name: t, collection: n } = e.getIconRef(this.name, this.collection, this._theming.theme), { svg: r = "", title: i } = e.get(t, n) ?? {}, a = !!i || this.hasAttribute("aria-label") || this.hasAttribute("aria-labelledby");
		this._svg = r, this._internals.setARIA({
			role: a ? "img" : null,
			ariaLabel: i ?? null
		});
	}
	render() {
		return this._hydrating ? l : c`${$n(this._svg)}`;
	}
	async registerIcon(e, t, n = "default", r = !1) {
		await pr(e, t, {
			collection: n,
			stripMeta: r
		});
	}
	registerIconFromText(e, t, n = "default", r = !1) {
		mr(e, t, {
			collection: n,
			stripMeta: r
		});
	}
	setIconRef(e, t, n) {
		hr(e, t, n);
	}
};
jr([Ye()], P.prototype, "_svg", void 0), jr([j()], P.prototype, "name", void 0), jr([j()], P.prototype, "collection", void 0), jr([j({
	type: Boolean,
	reflect: !0
})], P.prototype, "mirrored", void 0), jr([er()], P.prototype, "registerIcon", null), jr([er()], P.prototype, "registerIconFromText", null), jr([er()], P.prototype, "setIconRef", null);
//#endregion
//#region node_modules/igniteui-webcomponents/internals/utils/lit.js
function Mr(e, t) {
	return e ? t ?? l : l;
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/utils/strings.js
function Nr(e, ...t) {
	let n = t.length;
	return e.replace(/{(\d+)}/g, (e, r) => r >= n ? e : `${t[r]}`);
}
function Pr(e) {
	let t = e.replaceAll(/[^a-zA-Z0-9\s-_]/g, "");
	return /[\s-_]+/.test(t) ? t.split(/[\s-_]+/) : t.split(/(?=[A-Z])+/);
}
function Fr(e) {
	return Pr(e.trim()).join("-").toLowerCase();
}
function Ir(e) {
	let t = 0;
	return () => `${e}-${++t}`;
}
var Lr = p(class extends m {
	constructor(e) {
		if (super(e), e.type !== f.ATTRIBUTE || e.name !== "part" || e.strings?.length > 0) throw Error("`partMap() can only be used in the `part` attribute and must be the only part in the attribute.");
	}
	render(e) {
		return Object.keys(e).filter((t) => e[t]).join(" ");
	}
	update(e, [t]) {
		let r = e.element.part;
		if (this._previousParts === void 0) {
			this._previousParts = /* @__PURE__ */ new Set();
			for (let e in t) t[e] && (r.add(e), this._previousParts.add(e));
			return this.render(t);
		}
		for (let e of this._previousParts) (!(e in t) || !t[e]) && (r.remove(e), this._previousParts.delete(e));
		for (let e in t) t[e] && !this._previousParts.has(e) && (r.add(e), this._previousParts.add(e));
		return n;
	}
}), Rr = class e {
	static {
		this._events = [
			"keyup",
			"focusout",
			"pointerup"
		];
	}
	get focused() {
		return this._isKeyboardFocused;
	}
	constructor(e) {
		this._abortHandle = Dt(), this._isKeyboardFocused = !1, this._host = e, e.addController(this);
	}
	hostConnected() {
		let { signal: t } = this._abortHandle;
		for (let n of e._events) this._host.addEventListener(n, this, {
			passive: !0,
			signal: t
		});
	}
	hostDisconnected() {
		this._abortHandle.abort();
	}
	handleEvent(e) {
		let t = e.type === "keyup";
		t !== this._isKeyboardFocused && (this._isKeyboardFocused = t, this._host.requestUpdate());
	}
};
function zr(e) {
	return new Rr(e);
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/controllers/id-resolver.js
var Br = /* @__PURE__ */ new WeakMap(), Vr = "id-refs-change";
function Hr(e) {
	let t = Br.get(e);
	return t || (t = new Gr(e), Br.set(e, t)), t;
}
function Ur(e, t) {
	for (let n of e) if (Yt(n)) {
		n.id && t.add(n.id);
		for (let e of n.querySelectorAll("[id]")) e.id && t.add(e.id);
	}
}
function Wr(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let t of e) if (t.type === "attributes") {
		if (!Yt(t.target)) continue;
		let e = t.oldValue, r = t.target.id;
		e && n.add(e), r && n.add(r);
	} else Ur(t.addedNodes, n), Ur(t.removedNodes, n);
	n.size > 0 && t.dispatchEvent(new CustomEvent(Vr, { detail: n }));
}
var Gr = class extends EventTarget {
	constructor(e) {
		super(), this._refCount = 0, this._root = e, this._observer = new MutationObserver((e) => Wr(e, this));
	}
	retain() {
		if (this._refCount++ === 0) {
			let e = Xt(this._root) ? this._root.body : this._root;
			this._observer?.observe(e, {
				attributeFilter: ["id"],
				attributeOldValue: !0,
				subtree: !0,
				childList: !0
			});
		}
	}
	release() {
		this._refCount > 0 && --this._refCount === 0 && this._observer?.disconnect();
	}
}, Kr = class {
	constructor(e, t) {
		this._active = !1, this._connected = !1, this._emitter = null, this._host = e, this._host.addController(this), this._callback = t;
	}
	_observe() {
		this._emitter = Hr(this._host.getRootNode()), this._emitter.retain(), this._emitter.addEventListener(Vr, this);
	}
	_unobserve() {
		this._emitter &&= (this._emitter.removeEventListener(Vr, this), this._emitter.release(), null);
	}
	handleEvent(e) {
		this._callback.call(this._host, e.detail);
	}
	hostConnected() {
		this._connected = !0, this._active && this._observe();
	}
	hostDisconnected() {
		this._active && this._unobserve(), this._connected = !1;
	}
	observe() {
		this._active || (this._active = !0, this._connected && this._observe());
	}
	unobserve() {
		this._active && (this._active = !1, this._connected && this._unobserve());
	}
};
function qr(e, t) {
	return new Kr(e, t);
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/decorators/blazorDeepImport.js
function Jr(e) {}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/decorators/shadow-options.js
function Yr(e) {
	return (t) => {
		t.shadowRootOptions = {
			...o.shadowRootOptions,
			...e
		};
	};
}
//#endregion
//#region node_modules/igniteui-webcomponents/components/button/button-base.js
var F = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, I = class extends Zn(o) {
	constructor() {
		super(...arguments), this._focusRingManager = zr(this), this._internals = tt(this), this._resolver = qr(this, this._resolveCommandForElement), this._disabled = !1, this._commandfor = null, this._commandForElement = null, this.type = "button";
	}
	static {
		this.formAssociated = !0;
	}
	set disabled(e) {
		this._disabled = e, this.toggleAttribute("disabled", !!this._disabled);
	}
	get disabled() {
		return this._disabled;
	}
	set commandfor(e) {
		this._commandfor = e, e ? (this._resolver.observe(), this._commandForElement = Jt(this, e)) : (this._commandForElement = null, this._resolver.unobserve());
	}
	get commandfor() {
		return this._commandfor;
	}
	get commandForElement() {
		return this._commandForElement;
	}
	set commandForElement(e) {
		this._commandForElement = e, this.requestUpdate();
	}
	get form() {
		return this._internals.form;
	}
	firstUpdated() {
		this.updateComplete.then(() => {
			this._commandfor && (this._commandForElement = Jt(this, this._commandfor), this.requestUpdate());
		});
	}
	_handleClick() {
		switch (this.type) {
			case "submit":
				this.form?.requestSubmit();
				break;
			case "reset":
				this.form?.reset();
				break;
		}
	}
	formDisabledCallback(e) {
		this._disabled = e, this.requestUpdate();
	}
	_resolveCommandForElement(e) {
		this._commandfor && e.has(this._commandfor) && (this._commandForElement = Jt(this, this._commandfor), this.requestUpdate());
	}
	click() {
		this._nativeButton?.click();
	}
	_renderButton() {
		return c`
      <button
        command=${N(this.command)}
        .commandForElement=${this._commandForElement}
        part=${Lr({
			base: !0,
			focused: this._focusRingManager.focused
		})}
        aria-label=${Mr(this.ariaLabel, this.ariaLabel)}
        ?disabled=${this.disabled}
        type=${N(this.type)}
        @click=${this._handleClick}
      >
        ${this._renderContent()}
      </button>
    `;
	}
	_renderLinkButton() {
		return c`
      <a
        part=${Lr({
			base: !0,
			focused: this._focusRingManager.focused
		})}
        role="button"
        aria-label=${Mr(this.ariaLabel, this.ariaLabel)}
        aria-disabled=${this.disabled}
        href=${N(this.href)}
        target=${N(this.target)}
        download=${N(this.download)}
        rel=${N(this.rel)}
      >
        ${this._renderContent()}
      </a>
    `;
	}
	render() {
		return this.href == null ? this._renderButton() : this._renderLinkButton();
	}
};
F([Ze("[part=\"base\"]", !0)], I.prototype, "_nativeButton", void 0), F([j({ reflect: !0 })], I.prototype, "type", void 0), F([j()], I.prototype, "href", void 0), F([j()], I.prototype, "download", void 0), F([j()], I.prototype, "target", void 0), F([j()], I.prototype, "rel", void 0), F([j({
	type: Boolean,
	reflect: !0
})], I.prototype, "disabled", null), F([j({ reflect: !0 })], I.prototype, "command", void 0), F([j({ attribute: "commandfor" })], I.prototype, "commandfor", null), I = F([Jr, Yr({ delegatesFocus: !0 })], I);
//#endregion
//#region node_modules/igniteui-webcomponents/components/button/themes/button/button.base.css.js
var Xr = d`:host{--is-large: clamp(0, (var(--component-size, 1) + 1) - var(--ig-size-large, 3), 1);--is-medium: min( clamp(0, (var(--component-size, 1) + 1) - var(--ig-size-medium, 2), 1), clamp(0, var(--ig-size-large, 3) - var(--component-size, 1), 1) );--is-small: clamp(0, var(--ig-size-medium) - var(--component-size, 1), 1);position:relative;box-sizing:border-box;scrollbar-width:var(--ig-scrollbar-size, var(--sb-size));scrollbar-color:var(--ig-scrollbar-thumb-background, var(--sb-thumb-bg-color)) var(--ig-scrollbar-track-background, var(--sb-track-bg-color))}:host ::-webkit-scrollbar{width:var(--ig-scrollbar-size, var(--sb-size));height:var(--ig-scrollbar-size, var(--sb-size));background:var(--ig-scrollbar-track-background, var(--sb-track-bg-color))}:host ::-webkit-scrollbar-thumb{background:var(--ig-scrollbar-thumb-background, var(--sb-thumb-bg-color))}:host *,:host *::before,:host *::after{box-sizing:border-box}:host([hidden]),[hidden]{display:none !important}:host{--gap: max(var(--is-large, 1) * max(0.75rem, -1 * 0.75rem), var(--is-medium, 1) * max(0.5rem, -1 * 0.5rem), var(--is-small, 1) * max(0.25rem, -1 * 0.25rem));display:inline-flex;vertical-align:middle}:host ::slotted(*){display:inline-flex;align-items:center;font-size:inherit !important}:host ::slotted(igc-icon){--component-size: var(--ig-size-small) !important}[part~=base]{font-family:var(--ig-button-font-family, var(--ig-font-family));font-size:var(--ig-button-font-size);font-weight:var(--ig-button-font-weight);font-style:var(--ig-button-font-style);line-height:var(--ig-button-line-height);letter-spacing:var(--ig-button-letter-spacing);text-transform:var(--ig-button-text-transform);margin-top:var(--ig-button-margin-top);margin-bottom:var(--ig-button-margin-bottom);position:relative;display:inline-flex;align-items:center;justify-content:center;flex:1;border:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;outline-style:none;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden;white-space:nowrap;text-decoration:none;z-index:0;padding:0 max(var(--is-large, 1)*max(16px, -1 * 16px)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(12px, -1 * 12px)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(8px, -1 * 8px)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))));gap:var(--gap);min-width:5.5rem}:host(:not([disabled])) [part~=base]:hover,:host(:not(:disabled)) [part~=base]:hover{cursor:pointer}:host(:disabled),:host([disabled]){pointer-events:none}`, Zr = d`:host([variant=flat]) [part~=base]{border-radius:var(--border-radius);height:var(--size);border:.0625rem solid var(--border-color)}:host([variant=outlined]) [part~=base]{border-radius:var(--border-radius);height:var(--size);border:.0625rem solid var(--border-color)}:host([variant=contained]) [part~=base]{border-radius:var(--border-radius);height:var(--size);border:.0625rem solid var(--border-color)}:host([variant=fab]) [part~=base]{border:.0625rem solid var(--border-color);border-radius:var(--border-radius);min-height:var(--size);min-width:var(--size);padding:0 max(var(--is-large, 1)*max(14px, -1 * 14px)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(10px, -1 * 10px)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(6px, -1 * 6px)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))))}[part~=base]{transition:all .15s ease-in-out}[part~=base] ::slotted(igc-icon){color:var(--icon-color);transition:all .15s ease-in-out}:host(:not([disabled])[variant=flat]) [part~=base],:host(:not(:disabled)[variant=flat]) [part~=base]{color:var(--foreground);background:var(--background)}:host(:not([disabled])[variant=flat]) [part~=base] ::slotted(igc-icon),:host(:not(:disabled)[variant=flat]) [part~=base] ::slotted(igc-icon){color:var(--icon-color)}:host(:not([disabled])[variant=flat]) [part~=base]:hover,:host(:not(:disabled)[variant=flat]) [part~=base]:hover{color:var(--hover-foreground);background:var(--hover-background);border-color:var(--hover-border-color)}:host(:not([disabled])[variant=flat]) [part~=base]:hover ::slotted(igc-icon),:host(:not(:disabled)[variant=flat]) [part~=base]:hover ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=flat]) [part~=base]:active,:host(:not(:disabled)[variant=flat]) [part~=base]:active{color:var(--active-foreground);background:var(--active-background);border-color:var(--active-border-color)}:host(:not([disabled])[variant=flat]) [part~=base]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=flat]) [part~=base]:active ::slotted(igc-icon){color:var(--active-foreground)}:host(:not([disabled])[variant=flat]) [part="base focused"],:host(:not(:disabled)[variant=flat]) [part="base focused"]{color:var(--focus-visible-foreground);background:var(--focus-visible-background);border-color:var(--focus-visible-border-color)}:host(:not([disabled])[variant=flat]) [part="base focused"]:hover,:host(:not(:disabled)[variant=flat]) [part="base focused"]:hover{color:var(--focus-hover-foreground);background:var(--focus-hover-background);border-color:var(--focus-visible-border-color)}:host(:not([disabled])[variant=flat]) [part="base focused"]:active,:host(:not(:disabled)[variant=flat]) [part="base focused"]:active{color:var(--focus-foreground);background:var(--focus-background);border-color:var(--focus-border-color)}:host(:not([disabled])[variant=flat]) [part="base focused"]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=flat]) [part="base focused"]:active ::slotted(igc-icon){color:var(--focus-foreground)}:host(:not([disabled])[variant=outlined]) [part~=base],:host(:not(:disabled)[variant=outlined]) [part~=base]{color:var(--foreground);background:var(--background)}:host(:not([disabled])[variant=outlined]) [part~=base] ::slotted(igc-icon),:host(:not(:disabled)[variant=outlined]) [part~=base] ::slotted(igc-icon){color:var(--icon-color)}:host(:not([disabled])[variant=outlined]) [part~=base]:hover,:host(:not(:disabled)[variant=outlined]) [part~=base]:hover{color:var(--hover-foreground);background:var(--hover-background);border-color:var(--hover-border-color)}:host(:not([disabled])[variant=outlined]) [part~=base]:hover ::slotted(igc-icon),:host(:not(:disabled)[variant=outlined]) [part~=base]:hover ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=outlined]) [part~=base]:active,:host(:not(:disabled)[variant=outlined]) [part~=base]:active{color:var(--active-foreground);background:var(--active-background);border-color:var(--active-border-color)}:host(:not([disabled])[variant=outlined]) [part~=base]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=outlined]) [part~=base]:active ::slotted(igc-icon){color:var(--active-foreground)}:host(:not([disabled])[variant=outlined]) [part="base focused"],:host(:not(:disabled)[variant=outlined]) [part="base focused"]{color:var(--focus-visible-foreground);background:var(--focus-visible-background);border-color:var(--focus-visible-border-color)}:host(:not([disabled])[variant=outlined]) [part="base focused"]:hover,:host(:not(:disabled)[variant=outlined]) [part="base focused"]:hover{color:var(--focus-hover-foreground);background:var(--focus-hover-background)}:host(:not([disabled])[variant=outlined]) [part="base focused"]:active,:host(:not(:disabled)[variant=outlined]) [part="base focused"]:active{color:var(--focus-foreground);background:var(--focus-background);border-color:var(--focus-border-color)}:host(:not([disabled])[variant=outlined]) [part="base focused"]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=outlined]) [part="base focused"]:active ::slotted(igc-icon){color:var(--focus-foreground)}:host(:not([disabled])[variant=contained]) [part~=base],:host(:not(:disabled)[variant=contained]) [part~=base]{color:var(--foreground);background:var(--background)}:host(:not([disabled])[variant=contained]) [part~=base] ::slotted(igc-icon),:host(:not(:disabled)[variant=contained]) [part~=base] ::slotted(igc-icon){color:var(--icon-color)}:host(:not([disabled])[variant=contained]) [part~=base]:hover,:host(:not(:disabled)[variant=contained]) [part~=base]:hover{color:var(--hover-foreground);background:var(--hover-background);border-color:var(--hover-border-color)}:host(:not([disabled])[variant=contained]) [part~=base]:hover ::slotted(igc-icon),:host(:not(:disabled)[variant=contained]) [part~=base]:hover ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=contained]) [part~=base]:active,:host(:not(:disabled)[variant=contained]) [part~=base]:active{color:var(--active-foreground);background:var(--active-background);border-color:var(--active-border-color)}:host(:not([disabled])[variant=contained]) [part~=base]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=contained]) [part~=base]:active ::slotted(igc-icon){color:var(--active-foreground)}:host(:not([disabled])[variant=contained]) [part="base focused"],:host(:not(:disabled)[variant=contained]) [part="base focused"]{color:var(--focus-visible-foreground);background:var(--focus-visible-background);border-color:var(--focus-visible-border-color)}:host(:not([disabled])[variant=contained]) [part="base focused"]:hover,:host(:not(:disabled)[variant=contained]) [part="base focused"]:hover{color:var(--focus-hover-foreground);background:var(--focus-hover-background)}:host(:not([disabled])[variant=contained]) [part="base focused"]:active,:host(:not(:disabled)[variant=contained]) [part="base focused"]:active{color:var(--focus-foreground);background:var(--focus-background);border-color:var(--focus-border-color)}:host(:not([disabled])[variant=contained]) [part="base focused"]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=contained]) [part="base focused"]:active ::slotted(igc-icon){color:var(--focus-foreground)}:host(:not([disabled])[variant=fab]) [part~=base],:host(:not(:disabled)[variant=fab]) [part~=base]{color:var(--foreground);background:var(--background)}:host(:not([disabled])[variant=fab]) [part~=base] ::slotted(igc-icon),:host(:not(:disabled)[variant=fab]) [part~=base] ::slotted(igc-icon){color:var(--icon-color)}:host(:not([disabled])[variant=fab]) [part~=base]:hover,:host(:not(:disabled)[variant=fab]) [part~=base]:hover{color:var(--hover-foreground);background:var(--hover-background);border-color:var(--hover-border-color)}:host(:not([disabled])[variant=fab]) [part~=base]:hover ::slotted(igc-icon),:host(:not(:disabled)[variant=fab]) [part~=base]:hover ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=fab]) [part~=base]:active,:host(:not(:disabled)[variant=fab]) [part~=base]:active{color:var(--active-foreground);background:var(--active-background);border-color:var(--active-border-color)}:host(:not([disabled])[variant=fab]) [part~=base]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=fab]) [part~=base]:active ::slotted(igc-icon){color:var(--active-foreground)}:host(:not([disabled])[variant=fab]) [part="base focused"],:host(:not(:disabled)[variant=fab]) [part="base focused"]{color:var(--focus-visible-foreground);background:var(--focus-visible-background);border-color:var(--focus-visible-border-color)}:host(:not([disabled])[variant=fab]) [part="base focused"]:hover,:host(:not(:disabled)[variant=fab]) [part="base focused"]:hover{color:var(--focus-hover-foreground);background:var(--focus-hover-background)}:host(:not([disabled])[variant=fab]) [part="base focused"]:active,:host(:not(:disabled)[variant=fab]) [part="base focused"]:active{color:var(--focus-foreground);background:var(--focus-background);border-color:var(--focus-border-color)}:host(:not([disabled])[variant=fab]) [part="base focused"]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=fab]) [part="base focused"]:active ::slotted(igc-icon){color:var(--focus-foreground)}:host([disabled][variant=flat]) [part~=base],:host(:disabled[variant=flat]) [part~=base]{color:var(--disabled-foreground);background:var(--disabled-background);border-color:var(--disabled-border-color)}:host([disabled][variant=flat]) [part~=base] ::slotted(igc-icon),:host(:disabled[variant=flat]) [part~=base] ::slotted(igc-icon){color:var(--disabled-icon-color)}:host([disabled][variant=outlined]) [part~=base],:host(:disabled[variant=outlined]) [part~=base]{color:var(--disabled-foreground);background:var(--disabled-background);border-color:var(--disabled-border-color)}:host([disabled][variant=outlined]) [part~=base] ::slotted(igc-icon),:host(:disabled[variant=outlined]) [part~=base] ::slotted(igc-icon){color:var(--disabled-icon-color)}:host([disabled][variant=contained]) [part~=base],:host(:disabled[variant=contained]) [part~=base]{color:var(--disabled-foreground);background:var(--disabled-background);border-color:var(--disabled-border-color)}:host([disabled][variant=contained]) [part~=base] ::slotted(igc-icon),:host(:disabled[variant=contained]) [part~=base] ::slotted(igc-icon){color:var(--disabled-icon-color)}:host([disabled][variant=fab]) [part~=base],:host(:disabled[variant=fab]) [part~=base]{color:var(--disabled-foreground);background:var(--disabled-background);border-color:var(--disabled-border-color)}:host([disabled][variant=fab]) [part~=base] ::slotted(igc-icon),:host(:disabled[variant=fab]) [part~=base] ::slotted(igc-icon){color:var(--disabled-icon-color)}`, Qr = d`:host([variant=flat]){--shadow-color: var(--ig-flat-button-shadow-color, hsl(from var(--ig-primary-600) h s l/0.5));--disabled-background: var(--ig-flat-button-disabled-background, transparent);--disabled-foreground: var(--ig-flat-button-disabled-foreground, var(--ig-primary-200));--size: var(--ig-flat-button-size, max(var(--is-large, 1) * max(3rem, -1 * 3rem), var(--is-medium, 1) * max(2.375rem, -1 * 2.375rem), var(--is-small, 1) * max(2rem, -1 * 2rem)));--default-size: var(--ig-flat-button-default-size, 2);--focus-foreground: var(--ig-flat-button-focus-foreground, var(--ig-primary-800));--foreground: var(--ig-flat-button-foreground, var(--ig-primary-500));--hover-background: var(--ig-flat-button-hover-background, transparent);--hover-foreground: var(--ig-flat-button-hover-foreground, var(--ig-primary-600));--focus-background: var(--ig-flat-button-focus-background, transparent);--focus-hover-background: var(--ig-flat-button-focus-hover-background, transparent);--focus-hover-foreground: var(--ig-flat-button-focus-hover-foreground, var(--ig-primary-600));--focus-visible-background: var(--ig-flat-button-focus-visible-background, transparent);--focus-visible-foreground: var(--ig-flat-button-focus-visible-foreground, var(--ig-primary-500));--active-background: var(--ig-flat-button-active-background, transparent);--active-foreground: var(--ig-flat-button-active-foreground, var(--ig-primary-800));--ig-theme: bootstrap;--ig-theme-variant: dark}:host([variant=outlined]){--shadow-color: var(--ig-outlined-button-shadow-color, hsl(from var(--ig-primary-600) h s l/0.5));--border-color: var(--ig-outlined-button-border-color, var(--ig-primary-500));--hover-border-color: var(--ig-outlined-button-hover-border-color, var(--ig-primary-600));--focus-border-color: var(--ig-outlined-button-focus-border-color, var(--ig-primary-600));--focus-visible-border-color: var(--ig-outlined-button-focus-visible-border-color, var(--ig-primary-500));--active-border-color: var(--ig-outlined-button-active-border-color, var(--ig-primary-800));--disabled-border-color: var(--ig-outlined-button-disabled-border-color, var(--ig-primary-50));--disabled-background: var(--ig-outlined-button-disabled-background, transparent);--disabled-foreground: var(--ig-outlined-button-disabled-foreground, var(--ig-primary-200));--size: var(--ig-outlined-button-size, max(var(--is-large, 1) * max(3rem, -1 * 3rem), var(--is-medium, 1) * max(2.375rem, -1 * 2.375rem), var(--is-small, 1) * max(2rem, -1 * 2rem)));--default-size: var(--ig-outlined-button-default-size, 2);--focus-foreground: var(--ig-outlined-button-focus-foreground, var(--ig-primary-800-contrast));--foreground: var(--ig-outlined-button-foreground, var(--ig-primary-500));--hover-background: var(--ig-outlined-button-hover-background, var(--ig-primary-600));--hover-foreground: var(--ig-outlined-button-hover-foreground, var(--ig-primary-600-contrast));--focus-background: var(--ig-outlined-button-focus-background, var(--ig-primary-800));--focus-hover-background: var(--ig-outlined-button-focus-hover-background, var(--ig-primary-600));--focus-hover-foreground: var(--ig-outlined-button-focus-hover-foreground, var(--ig-primary-600-contrast));--focus-visible-background: var(--ig-outlined-button-focus-visible-background, var(--ig-primary-500));--focus-visible-foreground: var(--ig-outlined-button-focus-visible-foreground, var(--ig-primary-600-contrast));--active-background: var(--ig-outlined-button-active-background, var(--ig-primary-800));--active-foreground: var(--ig-outlined-button-active-foreground, var(--ig-primary-800-contrast));--ig-theme: bootstrap;--ig-theme-variant: dark}:host([variant=contained]){--shadow-color: var(--ig-contained-button-shadow-color, hsl(from var(--ig-primary-600) h s l/0.5));--disabled-background: var(--ig-contained-button-disabled-background, var(--ig-primary-50));--disabled-foreground: var(--ig-contained-button-disabled-foreground, var(--ig-primary-200));--size: var(--ig-contained-button-size, max(var(--is-large, 1) * max(3rem, -1 * 3rem), var(--is-medium, 1) * max(2.375rem, -1 * 2.375rem), var(--is-small, 1) * max(2rem, -1 * 2rem)));--default-size: var(--ig-contained-button-default-size, 2);--resting-elevation: var(--ig-contained-button-resting-elevation, var(--ig-elevation-0));--hover-elevation: var(--ig-contained-button-hover-elevation, var(--ig-elevation-0));--focus-elevation: var(--ig-contained-button-focus-elevation, var(--ig-elevation-0));--active-elevation: var(--ig-contained-button-active-elevation, var(--ig-elevation-0));--background: var(--ig-contained-button-background, var(--ig-primary-500));--active-background: var(--ig-contained-button-active-background, var(--ig-primary-800));--foreground: var(--ig-contained-button-foreground, var(--ig-primary-600-contrast));--hover-background: var(--ig-contained-button-hover-background, var(--ig-primary-600));--hover-foreground: var(--ig-contained-button-hover-foreground, var(--ig-primary-600-contrast));--focus-background: var(--ig-contained-button-focus-background, var(--ig-primary-800));--focus-hover-background: var(--ig-contained-button-focus-hover-background, var(--ig-primary-600));--focus-hover-foreground: var(--ig-contained-button-focus-hover-foreground, var(--ig-primary-600-contrast));--focus-foreground: var(--ig-contained-button-focus-foreground, var(--ig-primary-800-contrast));--focus-visible-background: var(--ig-contained-button-focus-visible-background, var(--ig-primary-500));--focus-visible-foreground: var(--ig-contained-button-focus-visible-foreground, var(--ig-primary-600-contrast));--active-foreground: var(--ig-contained-button-active-foreground, var(--ig-primary-800-contrast));--ig-theme: bootstrap;--ig-theme-variant: dark}:host([variant=fab]){--border-radius: var(--ig-fab-button-border-radius, clamp(0.75rem, calc(var(--ig-radius-factor, 0.5357142857) * 1.75rem), 1.75rem));--foreground: var(--ig-fab-button-foreground, var(--ig-primary-600-contrast));--hover-background: var(--ig-fab-button-hover-background, var(--ig-primary-600));--hover-foreground: var(--ig-fab-button-hover-foreground, var(--ig-primary-600-contrast));--focus-background: var(--ig-fab-button-focus-background, var(--ig-primary-800));--focus-hover-background: var(--ig-fab-button-focus-hover-background, var(--ig-primary-600));--focus-hover-foreground: var(--ig-fab-button-focus-hover-foreground, var(--ig-primary-600-contrast));--focus-foreground: var(--ig-fab-button-focus-foreground, var(--ig-primary-800-contrast));--focus-visible-background: var(--ig-fab-button-focus-visible-background, var(--ig-primary-500));--focus-visible-foreground: var(--ig-fab-button-focus-visible-foreground, var(--ig-primary-600-contrast));--active-foreground: var(--ig-fab-button-active-foreground, var(--ig-primary-800-contrast));--ig-theme: bootstrap;--ig-theme-variant: dark}`, $r = d`:host([variant=flat]){--focus-visible-border-color: var(--ig-flat-button-focus-visible-border-color, var(--ig-gray-400));--disabled-background: var(--ig-flat-button-disabled-background, transparent);--disabled-foreground: var(--ig-flat-button-disabled-foreground, var(--ig-gray-200));--size: var(--ig-flat-button-size, max(var(--is-large, 1) * max(2.375rem, -1 * 2.375rem), var(--is-medium, 1) * max(2rem, -1 * 2rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-flat-button-default-size, 2);--focus-foreground: var(--ig-flat-button-focus-foreground, var(--ig-gray-900));--border-radius: var(--ig-flat-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--foreground: var(--ig-flat-button-foreground, var(--ig-gray-900));--hover-background: var(--ig-flat-button-hover-background, var(--ig-gray-50));--hover-foreground: var(--ig-flat-button-hover-foreground, var(--ig-gray-900));--focus-background: var(--ig-flat-button-focus-background, var(--ig-gray-100));--active-background: var(--ig-flat-button-active-background, var(--ig-gray-100));--active-foreground: var(--ig-flat-button-active-foreground, var(--ig-gray-900));--focus-hover-background: var(--ig-flat-button-focus-hover-background, var(--ig-gray-50));--focus-hover-foreground: var(--ig-flat-button-focus-hover-foreground, var(--ig-gray-900));--focus-visible-foreground: var(--ig-flat-button-focus-visible-foreground, var(--ig-gray-900));--focus-visible-background: var(--ig-flat-button-focus-visible-background, transparent);--ig-theme: fluent;--ig-theme-variant: dark}:host([variant=outlined]){--border-color: var(--ig-outlined-button-border-color, var(--ig-gray-400));--hover-border-color: var(--ig-outlined-button-hover-border-color, var(--ig-gray-400));--focus-border-color: var(--ig-outlined-button-focus-border-color, var(--ig-gray-400));--focus-visible-border-color: var(--ig-outlined-button-focus-visible-border-color, var(--ig-gray-400));--active-border-color: var(--ig-outlined-button-active-border-color, var(--ig-gray-400));--disabled-border-color: var(--ig-outlined-button-disabled-border-color, var(--ig-gray-100));--disabled-background: var(--ig-outlined-button-disabled-background, var(--ig-gray-50));--disabled-foreground: var(--ig-outlined-button-disabled-foreground, var(--ig-gray-200));--size: var(--ig-outlined-button-size, max(var(--is-large, 1) * max(2.375rem, -1 * 2.375rem), var(--is-medium, 1) * max(2rem, -1 * 2rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-outlined-button-default-size, 2);--focus-foreground: var(--ig-outlined-button-focus-foreground, var(--ig-gray-900));--border-radius: var(--ig-outlined-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--foreground: var(--ig-outlined-button-foreground, var(--ig-gray-900));--hover-background: var(--ig-outlined-button-hover-background, var(--ig-gray-50));--hover-foreground: var(--ig-outlined-button-hover-foreground, var(--ig-gray-900));--focus-background: var(--ig-outlined-button-focus-background, var(--ig-gray-100));--active-background: var(--ig-outlined-button-active-background, var(--ig-gray-100));--active-foreground: var(--ig-outlined-button-active-foreground, var(--ig-gray-900));--focus-hover-background: var(--ig-outlined-button-focus-hover-background, var(--ig-gray-50));--focus-hover-foreground: var(--ig-outlined-button-focus-hover-foreground, var(--ig-gray-900));--focus-visible-foreground: var(--ig-outlined-button-focus-visible-foreground, var(--ig-gray-900));--focus-visible-background: var(--ig-outlined-button-focus-visible-background, transparent);--ig-theme: fluent;--ig-theme-variant: dark}:host([variant=contained]){--focus-visible-border-color: var(--ig-contained-button-focus-visible-border-color, var(--ig-primary-300-contrast));--disabled-background: var(--ig-contained-button-disabled-background, var(--ig-gray-50));--disabled-foreground: var(--ig-contained-button-disabled-foreground, var(--ig-gray-200));--size: var(--ig-contained-button-size, max(var(--is-large, 1) * max(2.375rem, -1 * 2.375rem), var(--is-medium, 1) * max(2rem, -1 * 2rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-contained-button-default-size, 2);--resting-elevation: var(--ig-contained-button-resting-elevation, var(--ig-elevation-0));--hover-elevation: var(--ig-contained-button-hover-elevation, var(--ig-elevation-0));--focus-elevation: var(--ig-contained-button-focus-elevation, var(--ig-elevation-0));--active-elevation: var(--ig-contained-button-active-elevation, var(--ig-elevation-0));--background: var(--ig-contained-button-background, var(--ig-primary-300));--active-background: var(--ig-contained-button-active-background, var(--ig-primary-100));--border-radius: var(--ig-contained-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--foreground: var(--ig-contained-button-foreground, var(--ig-primary-300-contrast));--hover-background: var(--ig-contained-button-hover-background, var(--ig-primary-200));--hover-foreground: var(--ig-contained-button-hover-foreground, var(--ig-primary-300-contrast));--focus-background: var(--ig-contained-button-focus-background, var(--ig-primary-100));--focus-foreground: var(--ig-contained-button-focus-foreground, var(--ig-primary-300-contrast));--active-foreground: var(--ig-contained-button-active-foreground, var(--ig-primary-300-contrast));--focus-hover-background: var(--ig-contained-button-focus-hover-background, var(--ig-primary-200));--focus-hover-foreground: var(--ig-contained-button-focus-hover-foreground, var(--ig-primary-300-contrast));--focus-visible-foreground: var(--ig-contained-button-focus-visible-foreground, var(--ig-primary-300-contrast));--focus-visible-background: var(--ig-contained-button-focus-visible-background, var(--ig-primary-300));--ig-theme: fluent;--ig-theme-variant: dark}:host([variant=fab]){--focus-visible-border-color: var(--ig-fab-button-focus-visible-border-color, var(--ig-primary-300-contrast));--disabled-background: var(--ig-fab-button-disabled-background, var(--ig-gray-50));--disabled-foreground: var(--ig-fab-button-disabled-foreground, var(--ig-gray-200));--foreground: var(--ig-fab-button-foreground, var(--ig-primary-300-contrast));--hover-background: var(--ig-fab-button-hover-background, var(--ig-primary-200));--hover-foreground: var(--ig-fab-button-hover-foreground, var(--ig-primary-300-contrast));--focus-background: var(--ig-fab-button-focus-background, var(--ig-primary-100));--focus-foreground: var(--ig-fab-button-focus-foreground, var(--ig-primary-300-contrast));--active-background: var(--ig-fab-button-active-background, var(--ig-primary-100));--active-foreground: var(--ig-fab-button-active-foreground, var(--ig-primary-300-contrast));--focus-hover-background: var(--ig-fab-button-focus-hover-background, var(--ig-primary-200));--focus-hover-foreground: var(--ig-fab-button-focus-hover-foreground, var(--ig-primary-300-contrast));--focus-visible-foreground: var(--ig-fab-button-focus-visible-foreground, var(--ig-primary-300-contrast));--focus-visible-background: var(--ig-fab-button-focus-visible-background, var(--ig-primary-300));--border-radius: var(--ig-fab-button-border-radius, clamp(0.75rem, calc(var(--ig-radius-factor, 0.5) * 1.75rem), 1.75rem));--background: var(--ig-fab-button-background, var(--ig-primary-300));--ig-theme: fluent;--ig-theme-variant: dark}`, ei = d`:host([variant=flat]){--shadow-color: var(--ig-flat-button-shadow-color, hsl(from var(--ig-primary-500-contrast) h s l/0.2));--icon-color: var(--ig-flat-button-icon-color, hsl(from currentColor h s l / 0.8));--disabled-background: var(--ig-flat-button-disabled-background, transparent);--disabled-foreground: var(--ig-flat-button-disabled-foreground, hsl(from var(--ig-primary-500-contrast) h s l/0.2));--size: var(--ig-flat-button-size, max(var(--is-large, 1) * max(2rem, -1 * 2rem), var(--is-medium, 1) * max(1.75rem, -1 * 1.75rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-flat-button-default-size, 2);--focus-foreground: var(--ig-flat-button-focus-foreground, var(--ig-primary-500-contrast));--border-radius: var(--ig-flat-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 1) * 2.5rem), 2.5rem));--foreground: var(--ig-flat-button-foreground, var(--ig-primary-500-contrast));--hover-background: var(--ig-flat-button-hover-background, hsl(from var(--ig-primary-500-contrast) h s l/0.1));--hover-foreground: var(--ig-flat-button-hover-foreground, var(--ig-primary-500-contrast));--focus-background: var(--ig-flat-button-focus-background, hsl(from var(--ig-primary-500-contrast) h s l/0.1));--focus-hover-background: var(--ig-flat-button-focus-hover-background, hsl(from var(--ig-primary-500-contrast) h s l/0.1));--focus-hover-foreground: var(--ig-flat-button-focus-hover-foreground, var(--ig-primary-500-contrast));--active-background: var(--ig-flat-button-active-background, hsl(from var(--ig-primary-500-contrast) h s l/0.1));--active-foreground: var(--ig-flat-button-active-foreground, var(--ig-primary-500-contrast));--focus-visible-background: var(--ig-flat-button-focus-visible-background, transparent);--focus-visible-foreground: var(--ig-flat-button-focus-visible-foreground, var(--ig-primary-500-contrast));--ig-theme: indigo;--ig-theme-variant: dark}:host([variant=outlined]){--shadow-color: var(--ig-outlined-button-shadow-color, hsl(from var(--ig-primary-500-contrast) h s l/0.2));--border-color: var(--ig-outlined-button-border-color, hsl(from var(--ig-primary-500-contrast) h s l/0.6));--hover-border-color: var(--ig-outlined-button-hover-border-color, hsl(from var(--ig-primary-500-contrast) h s l/0.8));--focus-border-color: var(--ig-outlined-button-focus-border-color, hsl(from var(--ig-primary-500-contrast) h s l/0.8));--focus-visible-border-color: var(--ig-outlined-button-focus-visible-border-color, hsl(from var(--ig-primary-500-contrast) h s l/0.6));--active-border-color: var(--ig-outlined-button-active-border-color, hsl(from var(--ig-primary-500-contrast) h s l/0.8));--disabled-border-color: var(--ig-outlined-button-disabled-border-color, hsl(from var(--ig-primary-500-contrast) h s l/0.2));--icon-color: var(--ig-outlined-button-icon-color, hsl(from currentColor h s l / 0.8));--disabled-background: var(--ig-outlined-button-disabled-background, transparent);--disabled-foreground: var(--ig-outlined-button-disabled-foreground, hsl(from var(--ig-primary-500-contrast) h s l/0.2));--size: var(--ig-outlined-button-size, max(var(--is-large, 1) * max(2rem, -1 * 2rem), var(--is-medium, 1) * max(1.75rem, -1 * 1.75rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-outlined-button-default-size, 2);--focus-foreground: var(--ig-outlined-button-focus-foreground, var(--ig-primary-500-contrast));--border-radius: var(--ig-outlined-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 1) * 2.5rem), 2.5rem));--foreground: var(--ig-outlined-button-foreground, var(--ig-primary-500-contrast));--hover-background: var(--ig-outlined-button-hover-background, hsl(from var(--ig-primary-500-contrast) h s l/0.1));--hover-foreground: var(--ig-outlined-button-hover-foreground, var(--ig-primary-500-contrast));--focus-background: var(--ig-outlined-button-focus-background, hsl(from var(--ig-primary-500-contrast) h s l/0.1));--focus-hover-background: var(--ig-outlined-button-focus-hover-background, hsl(from var(--ig-primary-500-contrast) h s l/0.1));--focus-hover-foreground: var(--ig-outlined-button-focus-hover-foreground, var(--ig-primary-500-contrast));--active-background: var(--ig-outlined-button-active-background, hsl(from var(--ig-primary-500-contrast) h s l/0.1));--active-foreground: var(--ig-outlined-button-active-foreground, var(--ig-primary-500-contrast));--focus-visible-background: var(--ig-outlined-button-focus-visible-background, transparent);--focus-visible-foreground: var(--ig-outlined-button-focus-visible-foreground, var(--ig-primary-500-contrast));--ig-theme: indigo;--ig-theme-variant: dark}:host([variant=contained]){--shadow-color: var(--ig-contained-button-shadow-color, hsl(from var(--ig-primary-400) h s l/0.5));--icon-color: var(--ig-contained-button-icon-color, hsl(from currentColor h s l / 0.8));--disabled-background: var(--ig-contained-button-disabled-background, hsl(from var(--ig-primary-400) h s l/0.5));--disabled-foreground: var(--ig-contained-button-disabled-foreground, hsl(from var(--ig-primary-500-contrast) h s l/0.2));--disabled-icon-color: var(--ig-contained-button-disabled-icon-color, hsl(from currentColor h s l / 0.3));--size: var(--ig-contained-button-size, max(var(--is-large, 1) * max(2rem, -1 * 2rem), var(--is-medium, 1) * max(1.75rem, -1 * 1.75rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-contained-button-default-size, 2);--resting-elevation: var(--ig-contained-button-resting-elevation, var(--ig-elevation-0));--hover-elevation: var(--ig-contained-button-hover-elevation, var(--ig-elevation-0));--focus-elevation: var(--ig-contained-button-focus-elevation, var(--ig-elevation-0));--active-elevation: var(--ig-contained-button-active-elevation, var(--ig-elevation-0));--background: var(--ig-contained-button-background, var(--ig-primary-500));--active-background: var(--ig-contained-button-active-background, var(--ig-primary-400));--border-radius: var(--ig-contained-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 1) * 2.5rem), 2.5rem));--foreground: var(--ig-contained-button-foreground, var(--ig-primary-500-contrast));--hover-background: var(--ig-contained-button-hover-background, var(--ig-primary-400));--hover-foreground: var(--ig-contained-button-hover-foreground, var(--ig-primary-500-contrast));--focus-background: var(--ig-contained-button-focus-background, var(--ig-primary-400));--focus-foreground: var(--ig-contained-button-focus-foreground, var(--ig-primary-500-contrast));--focus-hover-background: var(--ig-contained-button-focus-hover-background, var(--ig-primary-400));--focus-hover-foreground: var(--ig-contained-button-focus-hover-foreground, var(--ig-primary-500-contrast));--active-foreground: var(--ig-contained-button-active-foreground, var(--ig-primary-500-contrast));--focus-visible-background: var(--ig-contained-button-focus-visible-background, var(--ig-primary-500));--focus-visible-foreground: var(--ig-contained-button-focus-visible-foreground, var(--ig-primary-500-contrast));--ig-theme: indigo;--ig-theme-variant: dark}:host([variant=fab]){--icon-color: var(--ig-fab-button-icon-color, hsl(from currentColor h s l / 0.8));--disabled-foreground: var(--ig-fab-button-disabled-foreground, hsl(from var(--ig-primary-500-contrast) h s l/0.2));--size: var(--ig-fab-button-size, max(var(--is-large, 1) * max(2.25rem, -1 * 2.25rem), var(--is-medium, 1) * max(2rem, -1 * 2rem), var(--is-small, 1) * max(1.75rem, -1 * 1.75rem)));--foreground: var(--ig-fab-button-foreground, var(--ig-primary-500-contrast));--hover-background: var(--ig-fab-button-hover-background, var(--ig-primary-400));--hover-foreground: var(--ig-fab-button-hover-foreground, var(--ig-primary-500-contrast));--focus-background: var(--ig-fab-button-focus-background, var(--ig-primary-400));--focus-foreground: var(--ig-fab-button-focus-foreground, var(--ig-primary-500-contrast));--focus-hover-background: var(--ig-fab-button-focus-hover-background, var(--ig-primary-400));--focus-hover-foreground: var(--ig-fab-button-focus-hover-foreground, var(--ig-primary-500-contrast));--active-foreground: var(--ig-fab-button-active-foreground, var(--ig-primary-500-contrast));--focus-visible-background: var(--ig-fab-button-focus-visible-background, var(--ig-primary-500));--focus-visible-foreground: var(--ig-fab-button-focus-visible-foreground, var(--ig-primary-500-contrast));--border-radius: var(--ig-fab-button-border-radius, clamp(0.75rem, calc(var(--ig-radius-factor, 1) * 2.5rem), 2.5rem));--ig-theme: indigo;--ig-theme-variant: dark}`, ti = d`:host([variant=flat]){--disabled-background: var(--ig-flat-button-disabled-background, transparent);--focus-foreground: var(--ig-flat-button-focus-foreground, var(--ig-secondary-200));--foreground: var(--ig-flat-button-foreground, var(--ig-secondary-500));--hover-background: var(--ig-flat-button-hover-background, hsl(from var(--ig-secondary-500) h s l/0.08));--hover-foreground: var(--ig-flat-button-hover-foreground, var(--ig-secondary-300));--focus-background: var(--ig-flat-button-focus-background, hsl(from var(--ig-secondary-500) h s l/0.32));--focus-visible-background: var(--ig-flat-button-focus-visible-background, hsl(from var(--ig-secondary-500) h s l/0.16));--focus-hover-background: var(--ig-flat-button-focus-hover-background, hsl(from var(--ig-secondary-500) h s l/0.24));--focus-hover-foreground: var(--ig-flat-button-focus-hover-foreground, var(--ig-secondary-300));--focus-visible-foreground: var(--ig-flat-button-focus-visible-foreground, var(--ig-secondary-300));--active-background: var(--ig-flat-button-active-background, hsl(from var(--ig-secondary-500) h s l/0.16));--active-foreground: var(--ig-flat-button-active-foreground, var(--ig-secondary-300));--ig-theme: material;--ig-theme-variant: dark}:host([variant=outlined]){--border-color: var(--ig-outlined-button-border-color, var(--ig-secondary-500));--hover-border-color: var(--ig-outlined-button-hover-border-color, var(--ig-secondary-300));--focus-border-color: var(--ig-outlined-button-focus-border-color, var(--ig-secondary-200));--focus-visible-border-color: var(--ig-outlined-button-focus-visible-border-color, var(--ig-secondary-300));--active-border-color: var(--ig-outlined-button-active-border-color, var(--ig-secondary-300));--disabled-background: var(--ig-outlined-button-disabled-background, transparent);--focus-foreground: var(--ig-outlined-button-focus-foreground, var(--ig-secondary-200));--foreground: var(--ig-outlined-button-foreground, var(--ig-secondary-500));--hover-background: var(--ig-outlined-button-hover-background, hsl(from var(--ig-secondary-500) h s l/0.08));--hover-foreground: var(--ig-outlined-button-hover-foreground, var(--ig-secondary-300));--focus-background: var(--ig-outlined-button-focus-background, hsl(from var(--ig-secondary-500) h s l/0.32));--focus-visible-background: var(--ig-outlined-button-focus-visible-background, hsl(from var(--ig-secondary-500) h s l/0.16));--focus-hover-background: var(--ig-outlined-button-focus-hover-background, hsl(from var(--ig-secondary-500) h s l/0.24));--focus-hover-foreground: var(--ig-outlined-button-focus-hover-foreground, var(--ig-secondary-300));--focus-visible-foreground: var(--ig-outlined-button-focus-visible-foreground, var(--ig-secondary-300));--active-background: var(--ig-outlined-button-active-background, hsl(from var(--ig-secondary-500) h s l/0.16));--active-foreground: var(--ig-outlined-button-active-foreground, var(--ig-secondary-300));--ig-theme: material;--ig-theme-variant: dark}:host([variant=contained]){--disabled-background: var(--ig-contained-button-disabled-background, var(--ig-gray-100));--foreground: var(--ig-contained-button-foreground, var(--ig-secondary-400-contrast));--hover-background: var(--ig-contained-button-hover-background, var(--ig-secondary-400));--hover-foreground: var(--ig-contained-button-hover-foreground, var(--ig-secondary-400-contrast));--focus-background: var(--ig-contained-button-focus-background, var(--ig-secondary-300));--focus-foreground: var(--ig-contained-button-focus-foreground, var(--ig-secondary-300-contrast));--focus-hover-background: var(--ig-contained-button-focus-hover-background, var(--ig-secondary-400));--focus-hover-foreground: var(--ig-contained-button-focus-hover-foreground, var(--ig-secondary-400-contrast));--focus-visible-background: var(--ig-contained-button-focus-visible-background, var(--ig-secondary-300));--focus-visible-foreground: var(--ig-contained-button-focus-visible-foreground, var(--ig-secondary-300-contrast));--active-foreground: var(--ig-contained-button-active-foreground, var(--ig-secondary-300-contrast));--ig-theme: material;--ig-theme-variant: dark}:host([variant=fab]){--disabled-background: var(--ig-fab-button-disabled-background, var(--ig-gray-100));--border-radius: var(--ig-fab-button-border-radius, clamp(0.75rem, calc(var(--ig-radius-factor, 1) * 1.75rem), 1.75rem));--foreground: var(--ig-fab-button-foreground, var(--ig-secondary-400-contrast));--hover-background: var(--ig-fab-button-hover-background, var(--ig-secondary-400));--hover-foreground: var(--ig-fab-button-hover-foreground, var(--ig-secondary-400-contrast));--focus-background: var(--ig-fab-button-focus-background, var(--ig-secondary-300));--focus-foreground: var(--ig-fab-button-focus-foreground, var(--ig-secondary-300-contrast));--focus-hover-background: var(--ig-fab-button-focus-hover-background, var(--ig-secondary-400));--focus-hover-foreground: var(--ig-fab-button-focus-hover-foreground, var(--ig-secondary-400-contrast));--focus-visible-background: var(--ig-fab-button-focus-visible-background, var(--ig-secondary-300));--focus-visible-foreground: var(--ig-fab-button-focus-visible-foreground, var(--ig-secondary-300-contrast));--active-foreground: var(--ig-fab-button-active-foreground, var(--ig-secondary-300-contrast));--ig-theme: material;--ig-theme-variant: dark}`, ni = d`:host([variant=flat]){--shadow-color: var(--ig-flat-button-shadow-color, hsl(from var(--ig-primary-600) h s l/0.5));--disabled-background: var(--ig-flat-button-disabled-background, transparent);--disabled-foreground: var(--ig-flat-button-disabled-foreground, var(--ig-primary-200));--size: var(--ig-flat-button-size, max(var(--is-large, 1) * max(3rem, -1 * 3rem), var(--is-medium, 1) * max(2.375rem, -1 * 2.375rem), var(--is-small, 1) * max(2rem, -1 * 2rem)));--default-size: var(--ig-flat-button-default-size, 2);--focus-foreground: var(--ig-flat-button-focus-foreground, var(--ig-primary-800));--foreground: var(--ig-flat-button-foreground, var(--ig-primary-500));--hover-background: var(--ig-flat-button-hover-background, transparent);--hover-foreground: var(--ig-flat-button-hover-foreground, var(--ig-primary-600));--focus-background: var(--ig-flat-button-focus-background, transparent);--focus-hover-background: var(--ig-flat-button-focus-hover-background, transparent);--focus-hover-foreground: var(--ig-flat-button-focus-hover-foreground, var(--ig-primary-600));--focus-visible-background: var(--ig-flat-button-focus-visible-background, transparent);--focus-visible-foreground: var(--ig-flat-button-focus-visible-foreground, var(--ig-primary-500));--active-background: var(--ig-flat-button-active-background, transparent);--active-foreground: var(--ig-flat-button-active-foreground, var(--ig-primary-800));--ig-theme: bootstrap;--ig-theme-variant: light}:host([variant=outlined]){--shadow-color: var(--ig-outlined-button-shadow-color, hsl(from var(--ig-primary-600) h s l/0.5));--border-color: var(--ig-outlined-button-border-color, var(--ig-primary-500));--hover-border-color: var(--ig-outlined-button-hover-border-color, var(--ig-primary-600));--focus-border-color: var(--ig-outlined-button-focus-border-color, var(--ig-primary-600));--focus-visible-border-color: var(--ig-outlined-button-focus-visible-border-color, var(--ig-primary-500));--active-border-color: var(--ig-outlined-button-active-border-color, var(--ig-primary-800));--disabled-border-color: var(--ig-outlined-button-disabled-border-color, var(--ig-primary-50));--disabled-background: var(--ig-outlined-button-disabled-background, transparent);--disabled-foreground: var(--ig-outlined-button-disabled-foreground, var(--ig-primary-200));--size: var(--ig-outlined-button-size, max(var(--is-large, 1) * max(3rem, -1 * 3rem), var(--is-medium, 1) * max(2.375rem, -1 * 2.375rem), var(--is-small, 1) * max(2rem, -1 * 2rem)));--default-size: var(--ig-outlined-button-default-size, 2);--focus-foreground: var(--ig-outlined-button-focus-foreground, var(--ig-primary-800-contrast));--foreground: var(--ig-outlined-button-foreground, var(--ig-primary-500));--hover-background: var(--ig-outlined-button-hover-background, var(--ig-primary-600));--hover-foreground: var(--ig-outlined-button-hover-foreground, var(--ig-primary-600-contrast));--focus-background: var(--ig-outlined-button-focus-background, var(--ig-primary-800));--focus-hover-background: var(--ig-outlined-button-focus-hover-background, var(--ig-primary-600));--focus-hover-foreground: var(--ig-outlined-button-focus-hover-foreground, var(--ig-primary-600-contrast));--focus-visible-background: var(--ig-outlined-button-focus-visible-background, var(--ig-primary-500));--focus-visible-foreground: var(--ig-outlined-button-focus-visible-foreground, var(--ig-primary-600-contrast));--active-background: var(--ig-outlined-button-active-background, var(--ig-primary-800));--active-foreground: var(--ig-outlined-button-active-foreground, var(--ig-primary-800-contrast));--ig-theme: bootstrap;--ig-theme-variant: light}:host([variant=contained]){--shadow-color: var(--ig-contained-button-shadow-color, hsl(from var(--ig-primary-600) h s l/0.5));--disabled-background: var(--ig-contained-button-disabled-background, var(--ig-primary-50));--disabled-foreground: var(--ig-contained-button-disabled-foreground, var(--ig-primary-200));--size: var(--ig-contained-button-size, max(var(--is-large, 1) * max(3rem, -1 * 3rem), var(--is-medium, 1) * max(2.375rem, -1 * 2.375rem), var(--is-small, 1) * max(2rem, -1 * 2rem)));--default-size: var(--ig-contained-button-default-size, 2);--resting-elevation: var(--ig-contained-button-resting-elevation, var(--ig-elevation-0));--hover-elevation: var(--ig-contained-button-hover-elevation, var(--ig-elevation-0));--focus-elevation: var(--ig-contained-button-focus-elevation, var(--ig-elevation-0));--active-elevation: var(--ig-contained-button-active-elevation, var(--ig-elevation-0));--background: var(--ig-contained-button-background, var(--ig-primary-500));--active-background: var(--ig-contained-button-active-background, var(--ig-primary-800));--foreground: var(--ig-contained-button-foreground, var(--ig-primary-600-contrast));--hover-background: var(--ig-contained-button-hover-background, var(--ig-primary-600));--hover-foreground: var(--ig-contained-button-hover-foreground, var(--ig-primary-600-contrast));--focus-background: var(--ig-contained-button-focus-background, var(--ig-primary-800));--focus-hover-background: var(--ig-contained-button-focus-hover-background, var(--ig-primary-600));--focus-hover-foreground: var(--ig-contained-button-focus-hover-foreground, var(--ig-primary-600-contrast));--focus-foreground: var(--ig-contained-button-focus-foreground, var(--ig-primary-800-contrast));--focus-visible-background: var(--ig-contained-button-focus-visible-background, var(--ig-primary-500));--focus-visible-foreground: var(--ig-contained-button-focus-visible-foreground, var(--ig-primary-600-contrast));--active-foreground: var(--ig-contained-button-active-foreground, var(--ig-primary-800-contrast));--ig-theme: bootstrap;--ig-theme-variant: light}:host([variant=fab]){--border-radius: var(--ig-fab-button-border-radius, clamp(0.75rem, calc(var(--ig-radius-factor, 0.5357142857) * 1.75rem), 1.75rem));--foreground: var(--ig-fab-button-foreground, var(--ig-primary-600-contrast));--hover-background: var(--ig-fab-button-hover-background, var(--ig-primary-600));--hover-foreground: var(--ig-fab-button-hover-foreground, var(--ig-primary-600-contrast));--focus-background: var(--ig-fab-button-focus-background, var(--ig-primary-800));--focus-hover-background: var(--ig-fab-button-focus-hover-background, var(--ig-primary-600));--focus-hover-foreground: var(--ig-fab-button-focus-hover-foreground, var(--ig-primary-600-contrast));--focus-foreground: var(--ig-fab-button-focus-foreground, var(--ig-primary-800-contrast));--focus-visible-background: var(--ig-fab-button-focus-visible-background, var(--ig-primary-500));--focus-visible-foreground: var(--ig-fab-button-focus-visible-foreground, var(--ig-primary-600-contrast));--active-foreground: var(--ig-fab-button-active-foreground, var(--ig-primary-800-contrast));--ig-theme: bootstrap;--ig-theme-variant: light}`, ri = d`:host([variant=flat]){--focus-visible-border-color: var(--ig-flat-button-focus-visible-border-color, var(--ig-gray-700));--disabled-background: var(--ig-flat-button-disabled-background, transparent);--size: var(--ig-flat-button-size, max(var(--is-large, 1) * max(2.375rem, -1 * 2.375rem), var(--is-medium, 1) * max(2rem, -1 * 2rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-flat-button-default-size, 2);--focus-foreground: var(--ig-flat-button-focus-foreground, var(--ig-gray-900));--border-radius: var(--ig-flat-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--foreground: var(--ig-flat-button-foreground, var(--ig-gray-900));--hover-background: var(--ig-flat-button-hover-background, var(--ig-gray-200));--hover-foreground: var(--ig-flat-button-hover-foreground, var(--ig-gray-900));--focus-background: var(--ig-flat-button-focus-background, var(--ig-gray-300));--active-background: var(--ig-flat-button-active-background, var(--ig-gray-300));--active-foreground: var(--ig-flat-button-active-foreground, var(--ig-gray-900));--focus-hover-background: var(--ig-flat-button-focus-hover-background, var(--ig-gray-200));--focus-hover-foreground: var(--ig-flat-button-focus-hover-foreground, var(--ig-gray-900));--focus-visible-foreground: var(--ig-flat-button-focus-visible-foreground, var(--ig-gray-900));--focus-visible-background: var(--ig-flat-button-focus-visible-background, transparent);--ig-theme: fluent;--ig-theme-variant: light}:host([variant=outlined]){--border-color: var(--ig-outlined-button-border-color, var(--ig-gray-600));--hover-border-color: var(--ig-outlined-button-hover-border-color, var(--ig-gray-600));--focus-border-color: var(--ig-outlined-button-focus-border-color, var(--ig-gray-600));--focus-visible-border-color: var(--ig-outlined-button-focus-visible-border-color, var(--ig-gray-700));--active-border-color: var(--ig-outlined-button-active-border-color, var(--ig-gray-600));--disabled-background: var(--ig-outlined-button-disabled-background, var(--ig-gray-100));--size: var(--ig-outlined-button-size, max(var(--is-large, 1) * max(2.375rem, -1 * 2.375rem), var(--is-medium, 1) * max(2rem, -1 * 2rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-outlined-button-default-size, 2);--focus-foreground: var(--ig-outlined-button-focus-foreground, var(--ig-gray-900));--border-radius: var(--ig-outlined-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--foreground: var(--ig-outlined-button-foreground, var(--ig-gray-900));--hover-background: var(--ig-outlined-button-hover-background, var(--ig-gray-200));--hover-foreground: var(--ig-outlined-button-hover-foreground, var(--ig-gray-900));--focus-background: var(--ig-outlined-button-focus-background, var(--ig-gray-300));--active-background: var(--ig-outlined-button-active-background, var(--ig-gray-300));--active-foreground: var(--ig-outlined-button-active-foreground, var(--ig-gray-900));--focus-hover-background: var(--ig-outlined-button-focus-hover-background, var(--ig-gray-200));--focus-hover-foreground: var(--ig-outlined-button-focus-hover-foreground, var(--ig-gray-900));--focus-visible-foreground: var(--ig-outlined-button-focus-visible-foreground, var(--ig-gray-900));--focus-visible-background: var(--ig-outlined-button-focus-visible-background, transparent);--ig-theme: fluent;--ig-theme-variant: light}:host([variant=contained]){--focus-visible-border-color: var(--ig-contained-button-focus-visible-border-color, var(--ig-primary-900-contrast));--disabled-background: var(--ig-contained-button-disabled-background, var(--ig-gray-100));--size: var(--ig-contained-button-size, max(var(--is-large, 1) * max(2.375rem, -1 * 2.375rem), var(--is-medium, 1) * max(2rem, -1 * 2rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-contained-button-default-size, 2);--resting-elevation: var(--ig-contained-button-resting-elevation, var(--ig-elevation-0));--hover-elevation: var(--ig-contained-button-hover-elevation, var(--ig-elevation-0));--focus-elevation: var(--ig-contained-button-focus-elevation, var(--ig-elevation-0));--active-elevation: var(--ig-contained-button-active-elevation, var(--ig-elevation-0));--background: var(--ig-contained-button-background, var(--ig-primary-500));--active-background: var(--ig-contained-button-active-background, var(--ig-primary-800));--border-radius: var(--ig-contained-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--foreground: var(--ig-contained-button-foreground, var(--ig-primary-900-contrast));--hover-background: var(--ig-contained-button-hover-background, var(--ig-primary-600));--hover-foreground: var(--ig-contained-button-hover-foreground, var(--ig-primary-900-contrast));--focus-background: var(--ig-contained-button-focus-background, var(--ig-primary-800));--focus-foreground: var(--ig-contained-button-focus-foreground, var(--ig-primary-900-contrast));--active-foreground: var(--ig-contained-button-active-foreground, var(--ig-primary-900-contrast));--focus-hover-background: var(--ig-contained-button-focus-hover-background, var(--ig-primary-600));--focus-hover-foreground: var(--ig-contained-button-focus-hover-foreground, var(--ig-primary-900-contrast));--focus-visible-foreground: var(--ig-contained-button-focus-visible-foreground, var(--ig-primary-900-contrast));--focus-visible-background: var(--ig-contained-button-focus-visible-background, var(--ig-primary-500));--ig-theme: fluent;--ig-theme-variant: light}:host([variant=fab]){--foreground: var(--ig-fab-button-foreground, var(--ig-primary-900-contrast));--hover-background: var(--ig-fab-button-hover-background, var(--ig-primary-600));--hover-foreground: var(--ig-fab-button-hover-foreground, var(--ig-primary-900-contrast));--focus-background: var(--ig-fab-button-focus-background, var(--ig-primary-800));--focus-foreground: var(--ig-fab-button-focus-foreground, var(--ig-primary-900-contrast));--active-foreground: var(--ig-fab-button-active-foreground, var(--ig-primary-900-contrast));--focus-hover-background: var(--ig-fab-button-focus-hover-background, var(--ig-primary-600));--focus-hover-foreground: var(--ig-fab-button-focus-hover-foreground, var(--ig-primary-900-contrast));--focus-visible-foreground: var(--ig-fab-button-focus-visible-foreground, var(--ig-primary-900-contrast));--focus-visible-background: var(--ig-fab-button-focus-visible-background, var(--ig-primary-500));--border-radius: var(--ig-fab-button-border-radius, clamp(0.75rem, calc(var(--ig-radius-factor, 0.5) * 1.75rem), 1.75rem));--ig-theme: fluent;--ig-theme-variant: light}`, ii = d`:host([variant=flat]){--shadow-color: var(--ig-flat-button-shadow-color, hsl(from var(--ig-gray-900) h s l/0.15));--icon-color: var(--ig-flat-button-icon-color, oklch(from currentColor calc(l + 0.09) c h));--icon-color-hover: var(--ig-flat-button-icon-color-hover, oklch(from currentColor calc(l + 0.19) c h));--disabled-background: var(--ig-flat-button-disabled-background, transparent);--disabled-foreground: var(--ig-flat-button-disabled-foreground, hsl(from var(--ig-gray-900) h s l/0.2));--size: var(--ig-flat-button-size, max(var(--is-large, 1) * max(2rem, -1 * 2rem), var(--is-medium, 1) * max(1.75rem, -1 * 1.75rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-flat-button-default-size, 2);--focus-foreground: var(--ig-flat-button-focus-foreground, var(--ig-gray-900));--border-radius: var(--ig-flat-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 1) * 2.5rem), 2.5rem));--foreground: var(--ig-flat-button-foreground, var(--ig-gray-700));--hover-background: var(--ig-flat-button-hover-background, hsl(from var(--ig-gray-900) h s l/0.05));--hover-foreground: var(--ig-flat-button-hover-foreground, var(--ig-gray-900));--focus-background: var(--ig-flat-button-focus-background, hsl(from var(--ig-gray-900) h s l/0.05));--focus-hover-background: var(--ig-flat-button-focus-hover-background, hsl(from var(--ig-gray-900) h s l/0.05));--focus-hover-foreground: var(--ig-flat-button-focus-hover-foreground, var(--ig-gray-900));--active-background: var(--ig-flat-button-active-background, hsl(from var(--ig-gray-900) h s l/0.05));--active-foreground: var(--ig-flat-button-active-foreground, var(--ig-gray-900));--focus-visible-background: var(--ig-flat-button-focus-visible-background, transparent);--focus-visible-foreground: var(--ig-flat-button-focus-visible-foreground, var(--ig-gray-700));--ig-theme: indigo;--ig-theme-variant: light}:host([variant=outlined]){--shadow-color: var(--ig-outlined-button-shadow-color, hsl(from var(--ig-gray-900) h s l/0.15));--border-color: var(--ig-outlined-button-border-color, var(--ig-gray-500));--hover-border-color: var(--ig-outlined-button-hover-border-color, var(--ig-gray-600));--focus-border-color: var(--ig-outlined-button-focus-border-color, var(--ig-gray-600));--focus-visible-border-color: var(--ig-outlined-button-focus-visible-border-color, var(--ig-gray-500));--active-border-color: var(--ig-outlined-button-active-border-color, var(--ig-gray-600));--disabled-border-color: var(--ig-outlined-button-disabled-border-color, hsl(from var(--ig-gray-900) h s l/0.15));--icon-color: var(--ig-outlined-button-icon-color, oklch(from currentColor calc(l + 0.09) c h));--icon-color-hover: var(--ig-outlined-button-icon-color-hover, oklch(from currentColor calc(l + 0.19) c h));--disabled-background: var(--ig-outlined-button-disabled-background, transparent);--disabled-foreground: var(--ig-outlined-button-disabled-foreground, hsl(from var(--ig-gray-900) h s l/0.2));--size: var(--ig-outlined-button-size, max(var(--is-large, 1) * max(2rem, -1 * 2rem), var(--is-medium, 1) * max(1.75rem, -1 * 1.75rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-outlined-button-default-size, 2);--focus-foreground: var(--ig-outlined-button-focus-foreground, var(--ig-gray-900));--border-radius: var(--ig-outlined-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 1) * 2.5rem), 2.5rem));--foreground: var(--ig-outlined-button-foreground, var(--ig-gray-700));--hover-background: var(--ig-outlined-button-hover-background, hsl(from var(--ig-gray-900) h s l/0.05));--hover-foreground: var(--ig-outlined-button-hover-foreground, var(--ig-gray-900));--focus-background: var(--ig-outlined-button-focus-background, hsl(from var(--ig-gray-900) h s l/0.05));--focus-hover-background: var(--ig-outlined-button-focus-hover-background, hsl(from var(--ig-gray-900) h s l/0.05));--focus-hover-foreground: var(--ig-outlined-button-focus-hover-foreground, var(--ig-gray-900));--active-background: var(--ig-outlined-button-active-background, hsl(from var(--ig-gray-900) h s l/0.05));--active-foreground: var(--ig-outlined-button-active-foreground, var(--ig-gray-900));--focus-visible-background: var(--ig-outlined-button-focus-visible-background, transparent);--focus-visible-foreground: var(--ig-outlined-button-focus-visible-foreground, var(--ig-gray-700));--ig-theme: indigo;--ig-theme-variant: light}:host([variant=contained]){--shadow-color: var(--ig-contained-button-shadow-color, hsl(from var(--ig-primary-400) h s l/0.5));--icon-color: var(--ig-contained-button-icon-color, hsl(from currentColor h s l / 0.8));--icon-color-hover: var(--ig-contained-button-icon-color-hover, oklch(from currentColor calc(l + 0.19) c h));--disabled-background: var(--ig-contained-button-disabled-background, hsl(from var(--ig-primary-400) h s l/0.5));--disabled-foreground: var(--ig-contained-button-disabled-foreground, hsl(from var(--ig-primary-500-contrast) h s l/0.4));--disabled-icon-color: var(--ig-contained-button-disabled-icon-color, hsl(from currentColor h s l / 0.3));--size: var(--ig-contained-button-size, max(var(--is-large, 1) * max(2rem, -1 * 2rem), var(--is-medium, 1) * max(1.75rem, -1 * 1.75rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-contained-button-default-size, 2);--resting-elevation: var(--ig-contained-button-resting-elevation, var(--ig-elevation-0));--hover-elevation: var(--ig-contained-button-hover-elevation, var(--ig-elevation-0));--focus-elevation: var(--ig-contained-button-focus-elevation, var(--ig-elevation-0));--active-elevation: var(--ig-contained-button-active-elevation, var(--ig-elevation-0));--background: var(--ig-contained-button-background, var(--ig-primary-500));--active-background: var(--ig-contained-button-active-background, var(--ig-primary-400));--border-radius: var(--ig-contained-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 1) * 2.5rem), 2.5rem));--foreground: var(--ig-contained-button-foreground, var(--ig-primary-500-contrast));--hover-background: var(--ig-contained-button-hover-background, var(--ig-primary-400));--hover-foreground: var(--ig-contained-button-hover-foreground, var(--ig-primary-500-contrast));--focus-background: var(--ig-contained-button-focus-background, var(--ig-primary-400));--focus-foreground: var(--ig-contained-button-focus-foreground, var(--ig-primary-500-contrast));--focus-hover-background: var(--ig-contained-button-focus-hover-background, var(--ig-primary-400));--focus-hover-foreground: var(--ig-contained-button-focus-hover-foreground, var(--ig-primary-500-contrast));--active-foreground: var(--ig-contained-button-active-foreground, var(--ig-primary-500-contrast));--focus-visible-background: var(--ig-contained-button-focus-visible-background, var(--ig-primary-500));--focus-visible-foreground: var(--ig-contained-button-focus-visible-foreground, var(--ig-primary-500-contrast));--ig-theme: indigo;--ig-theme-variant: light}:host([variant=fab]){--size: var(--ig-fab-button-size, max(var(--is-large, 1) * max(2.25rem, -1 * 2.25rem), var(--is-medium, 1) * max(2rem, -1 * 2rem), var(--is-small, 1) * max(1.75rem, -1 * 1.75rem)));--foreground: var(--ig-fab-button-foreground, var(--ig-primary-500-contrast));--hover-background: var(--ig-fab-button-hover-background, var(--ig-primary-400));--hover-foreground: var(--ig-fab-button-hover-foreground, var(--ig-primary-500-contrast));--focus-background: var(--ig-fab-button-focus-background, var(--ig-primary-400));--focus-foreground: var(--ig-fab-button-focus-foreground, var(--ig-primary-500-contrast));--focus-hover-background: var(--ig-fab-button-focus-hover-background, var(--ig-primary-400));--focus-hover-foreground: var(--ig-fab-button-focus-hover-foreground, var(--ig-primary-500-contrast));--active-foreground: var(--ig-fab-button-active-foreground, var(--ig-primary-500-contrast));--focus-visible-background: var(--ig-fab-button-focus-visible-background, var(--ig-primary-500));--focus-visible-foreground: var(--ig-fab-button-focus-visible-foreground, var(--ig-primary-500-contrast));--border-radius: var(--ig-fab-button-border-radius, clamp(0.75rem, calc(var(--ig-radius-factor, 1) * 2.5rem), 2.5rem));--ig-theme: indigo;--ig-theme-variant: light}`, ai = d`:host([variant=flat]){--disabled-background: var(--ig-flat-button-disabled-background, transparent);--focus-foreground: var(--ig-flat-button-focus-foreground, var(--ig-secondary-900));--foreground: var(--ig-flat-button-foreground, var(--ig-secondary-500));--hover-background: var(--ig-flat-button-hover-background, hsl(from var(--ig-secondary-500) h s l/0.08));--hover-foreground: var(--ig-flat-button-hover-foreground, var(--ig-secondary-800));--focus-background: var(--ig-flat-button-focus-background, hsl(from var(--ig-secondary-500) h s l/0.32));--focus-visible-background: var(--ig-flat-button-focus-visible-background, hsl(from var(--ig-secondary-500) h s l/0.16));--focus-hover-background: var(--ig-flat-button-focus-hover-background, hsl(from var(--ig-secondary-500) h s l/0.24));--focus-hover-foreground: var(--ig-flat-button-focus-hover-foreground, var(--ig-secondary-800));--focus-visible-foreground: var(--ig-flat-button-focus-visible-foreground, var(--ig-secondary-800));--active-background: var(--ig-flat-button-active-background, hsl(from var(--ig-secondary-500) h s l/0.16));--active-foreground: var(--ig-flat-button-active-foreground, var(--ig-secondary-800));--ig-theme: material;--ig-theme-variant: light}:host([variant=outlined]){--border-color: var(--ig-outlined-button-border-color, var(--ig-secondary-500));--hover-border-color: var(--ig-outlined-button-hover-border-color, var(--ig-secondary-800));--focus-border-color: var(--ig-outlined-button-focus-border-color, var(--ig-secondary-900));--focus-visible-border-color: var(--ig-outlined-button-focus-visible-border-color, var(--ig-secondary-800));--active-border-color: var(--ig-outlined-button-active-border-color, var(--ig-secondary-800));--disabled-background: var(--ig-outlined-button-disabled-background, transparent);--focus-foreground: var(--ig-outlined-button-focus-foreground, var(--ig-secondary-900));--foreground: var(--ig-outlined-button-foreground, var(--ig-secondary-500));--hover-background: var(--ig-outlined-button-hover-background, hsl(from var(--ig-secondary-500) h s l/0.08));--hover-foreground: var(--ig-outlined-button-hover-foreground, var(--ig-secondary-800));--focus-background: var(--ig-outlined-button-focus-background, hsl(from var(--ig-secondary-500) h s l/0.32));--focus-visible-background: var(--ig-outlined-button-focus-visible-background, hsl(from var(--ig-secondary-500) h s l/0.16));--focus-hover-background: var(--ig-outlined-button-focus-hover-background, hsl(from var(--ig-secondary-500) h s l/0.24));--focus-hover-foreground: var(--ig-outlined-button-focus-hover-foreground, var(--ig-secondary-800));--focus-visible-foreground: var(--ig-outlined-button-focus-visible-foreground, var(--ig-secondary-800));--active-background: var(--ig-outlined-button-active-background, hsl(from var(--ig-secondary-500) h s l/0.16));--active-foreground: var(--ig-outlined-button-active-foreground, var(--ig-secondary-800));--ig-theme: material;--ig-theme-variant: light}:host([variant=contained]){--disabled-background: var(--ig-contained-button-disabled-background, var(--ig-gray-100));--foreground: var(--ig-contained-button-foreground, var(--ig-secondary-400-contrast));--hover-background: var(--ig-contained-button-hover-background, var(--ig-secondary-400));--hover-foreground: var(--ig-contained-button-hover-foreground, var(--ig-secondary-400-contrast));--focus-background: var(--ig-contained-button-focus-background, var(--ig-secondary-300));--focus-foreground: var(--ig-contained-button-focus-foreground, var(--ig-secondary-300-contrast));--focus-hover-background: var(--ig-contained-button-focus-hover-background, var(--ig-secondary-400));--focus-hover-foreground: var(--ig-contained-button-focus-hover-foreground, var(--ig-secondary-400-contrast));--focus-visible-background: var(--ig-contained-button-focus-visible-background, var(--ig-secondary-300));--focus-visible-foreground: var(--ig-contained-button-focus-visible-foreground, var(--ig-secondary-300-contrast));--active-foreground: var(--ig-contained-button-active-foreground, var(--ig-secondary-300-contrast));--ig-theme: material;--ig-theme-variant: light}:host([variant=fab]){--disabled-background: var(--ig-fab-button-disabled-background, var(--ig-gray-100));--border-radius: var(--ig-fab-button-border-radius, clamp(0.75rem, calc(var(--ig-radius-factor, 1) * 1.75rem), 1.75rem));--foreground: var(--ig-fab-button-foreground, var(--ig-secondary-400-contrast));--hover-background: var(--ig-fab-button-hover-background, var(--ig-secondary-400));--hover-foreground: var(--ig-fab-button-hover-foreground, var(--ig-secondary-400-contrast));--focus-background: var(--ig-fab-button-focus-background, var(--ig-secondary-300));--focus-foreground: var(--ig-fab-button-focus-foreground, var(--ig-secondary-300-contrast));--focus-hover-background: var(--ig-fab-button-focus-hover-background, var(--ig-secondary-400));--focus-hover-foreground: var(--ig-fab-button-focus-hover-foreground, var(--ig-secondary-400-contrast));--focus-visible-background: var(--ig-fab-button-focus-visible-background, var(--ig-secondary-300));--focus-visible-foreground: var(--ig-fab-button-focus-visible-foreground, var(--ig-secondary-300-contrast));--active-foreground: var(--ig-fab-button-active-foreground, var(--ig-secondary-300-contrast));--ig-theme: material;--ig-theme-variant: light}`, oi = d`:host([variant=flat]){--shadow-color: var(--ig-flat-button-shadow-color, transparent);--border-color: var(--ig-flat-button-border-color, transparent);--hover-border-color: var(--ig-flat-button-hover-border-color, transparent);--focus-border-color: var(--ig-flat-button-focus-border-color, transparent);--focus-visible-border-color: var(--ig-flat-button-focus-visible-border-color, transparent);--active-border-color: var(--ig-flat-button-active-border-color, transparent);--disabled-border-color: var(--ig-flat-button-disabled-border-color, transparent);--icon-color: var(--ig-flat-button-icon-color, currentColor);--icon-color-hover: var(--ig-flat-button-icon-color-hover, currentColor);--disabled-background: var(--ig-flat-button-disabled-background, var(--ig-gray-300));--disabled-foreground: var(--ig-flat-button-disabled-foreground, var(--ig-gray-500));--disabled-icon-color: var(--ig-flat-button-disabled-icon-color, currentColor);--size: var(--ig-flat-button-size, max(var(--is-large, 1) * max(2.25rem, -1 * 2.25rem), var(--is-medium, 1) * max(1.875rem, -1 * 1.875rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-flat-button-default-size, 3);--resting-elevation: var(--ig-flat-button-resting-elevation, var(--ig-elevation-0));--hover-elevation: var(--ig-flat-button-hover-elevation, var(--ig-elevation-0));--focus-elevation: var(--ig-flat-button-focus-elevation, var(--ig-elevation-0));--active-elevation: var(--ig-flat-button-active-elevation, var(--ig-elevation-0));--background: var(--ig-flat-button-background, transparent);--focus-foreground: var(--ig-flat-button-focus-foreground, var(--ig-secondary-500));--border-radius: var(--ig-flat-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.2) * 1.25rem), 1.25rem));--ig-theme-variant: light}:host([variant=outlined]){--shadow-color: var(--ig-outlined-button-shadow-color, transparent);--border-color: var(--ig-outlined-button-border-color, transparent);--hover-border-color: var(--ig-outlined-button-hover-border-color, transparent);--focus-border-color: var(--ig-outlined-button-focus-border-color, transparent);--focus-visible-border-color: var(--ig-outlined-button-focus-visible-border-color, transparent);--active-border-color: var(--ig-outlined-button-active-border-color, transparent);--disabled-border-color: var(--ig-outlined-button-disabled-border-color, var(--ig-gray-300));--icon-color: var(--ig-outlined-button-icon-color, currentColor);--icon-color-hover: var(--ig-outlined-button-icon-color-hover, currentColor);--disabled-background: var(--ig-outlined-button-disabled-background, var(--ig-gray-300));--disabled-foreground: var(--ig-outlined-button-disabled-foreground, var(--ig-gray-500));--disabled-icon-color: var(--ig-outlined-button-disabled-icon-color, currentColor);--size: var(--ig-outlined-button-size, max(var(--is-large, 1) * max(2.25rem, -1 * 2.25rem), var(--is-medium, 1) * max(1.875rem, -1 * 1.875rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-outlined-button-default-size, 3);--resting-elevation: var(--ig-outlined-button-resting-elevation, var(--ig-elevation-0));--hover-elevation: var(--ig-outlined-button-hover-elevation, var(--ig-elevation-0));--focus-elevation: var(--ig-outlined-button-focus-elevation, var(--ig-elevation-0));--active-elevation: var(--ig-outlined-button-active-elevation, var(--ig-elevation-0));--background: var(--ig-outlined-button-background, transparent);--focus-foreground: var(--ig-outlined-button-focus-foreground, var(--ig-secondary-500));--border-radius: var(--ig-outlined-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.2) * 1.25rem), 1.25rem));--ig-theme-variant: light}:host([variant=contained]){--shadow-color: var(--ig-contained-button-shadow-color, transparent);--border-color: var(--ig-contained-button-border-color, transparent);--hover-border-color: var(--ig-contained-button-hover-border-color, transparent);--focus-border-color: var(--ig-contained-button-focus-border-color, transparent);--focus-visible-border-color: var(--ig-contained-button-focus-visible-border-color, transparent);--active-border-color: var(--ig-contained-button-active-border-color, transparent);--disabled-border-color: var(--ig-contained-button-disabled-border-color, transparent);--icon-color: var(--ig-contained-button-icon-color, currentColor);--icon-color-hover: var(--ig-contained-button-icon-color-hover, currentColor);--disabled-background: var(--ig-contained-button-disabled-background, var(--ig-gray-300));--disabled-foreground: var(--ig-contained-button-disabled-foreground, var(--ig-gray-500));--disabled-icon-color: var(--ig-contained-button-disabled-icon-color, currentColor);--size: var(--ig-contained-button-size, max(var(--is-large, 1) * max(2.25rem, -1 * 2.25rem), var(--is-medium, 1) * max(1.875rem, -1 * 1.875rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--default-size: var(--ig-contained-button-default-size, 3);--resting-elevation: var(--ig-contained-button-resting-elevation, var(--ig-elevation-2));--hover-elevation: var(--ig-contained-button-hover-elevation, var(--ig-elevation-4));--focus-elevation: var(--ig-contained-button-focus-elevation, var(--ig-elevation-8));--active-elevation: var(--ig-contained-button-active-elevation, var(--ig-elevation-4));--background: var(--ig-contained-button-background, var(--ig-secondary-500));--active-background: var(--ig-contained-button-active-background, var(--ig-secondary-300));--border-radius: var(--ig-contained-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.2) * 1.25rem), 1.25rem));--ig-theme-variant: light}:host([variant=fab]){--shadow-color: var(--ig-fab-button-shadow-color, transparent);--border-color: var(--ig-fab-button-border-color, transparent);--hover-border-color: var(--ig-fab-button-hover-border-color, transparent);--focus-border-color: var(--ig-fab-button-focus-border-color, transparent);--focus-visible-border-color: var(--ig-fab-button-focus-visible-border-color, transparent);--active-border-color: var(--ig-fab-button-active-border-color, transparent);--disabled-border-color: var(--ig-fab-button-disabled-border-color, transparent);--icon-color: var(--ig-fab-button-icon-color, currentColor);--icon-color-hover: var(--ig-fab-button-icon-color-hover, currentColor);--disabled-background: var(--ig-fab-button-disabled-background, var(--ig-gray-300));--disabled-foreground: var(--ig-fab-button-disabled-foreground, var(--ig-gray-500));--disabled-icon-color: var(--ig-fab-button-disabled-icon-color, currentColor);--size: var(--ig-fab-button-size, max(var(--is-large, 1) * max(3rem, -1 * 3rem), var(--is-medium, 1) * max(2.5rem, -1 * 2.5rem), var(--is-small, 1) * max(2rem, -1 * 2rem)));--default-size: var(--ig-fab-button-default-size, 3);--resting-elevation: var(--ig-fab-button-resting-elevation, var(--ig-elevation-6));--hover-elevation: var(--ig-fab-button-hover-elevation, var(--ig-elevation-12));--focus-elevation: var(--ig-fab-button-focus-elevation, var(--ig-elevation-12));--active-elevation: var(--ig-fab-button-active-elevation, var(--ig-elevation-12));--background: var(--ig-fab-button-background, var(--ig-secondary-500));--active-background: var(--ig-fab-button-active-background, var(--ig-secondary-300));--border-radius: var(--ig-fab-button-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.2) * 1.25rem), 1.25rem));--ig-theme-variant: light}`, si = d`:host([variant=flat]){--component-size: var(--ig-size, var(--default-size))}:host([variant=outlined]){--component-size: var(--ig-size, var(--default-size))}:host([variant=contained]){--component-size: var(--ig-size, var(--default-size))}:host([variant=fab]){--component-size: var(--ig-size, var(--default-size))}:host(:not([disabled])[variant=flat]) [part="base focused"],:host(:not(:disabled)[variant=flat]) [part="base focused"]{box-shadow:0 0 0 .25rem var(--shadow-color)}:host(:not([disabled])[variant=outlined]) [part="base focused"],:host(:not(:disabled)[variant=outlined]) [part="base focused"]{box-shadow:0 0 0 .25rem var(--shadow-color)}:host(:not([disabled])[variant=outlined]) [part="base focused"] ::slotted(igc-icon),:host(:not(:disabled)[variant=outlined]) [part="base focused"] ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=contained]) [part="base focused"],:host(:not(:disabled)[variant=contained]) [part="base focused"]{box-shadow:0 0 0 .25rem var(--shadow-color)}:host(:not([disabled])[variant=fab]) [part="base focused"],:host(:not(:disabled)[variant=fab]) [part="base focused"]{box-shadow:0 0 0 .25rem var(--shadow-color)}`, ci = d`:host([variant=flat]){--component-size: var(--ig-size, var(--default-size))}:host([variant=outlined]){--component-size: var(--ig-size, var(--default-size))}:host([variant=contained]){--component-size: var(--ig-size, var(--default-size))}:host([variant=fab]){--component-size: var(--ig-size, var(--default-size))}:host([variant=fab]) [part~=base]::after{border-radius:calc(var(--border-radius) - 0.125rem)}[part~=base]{padding:0 max(var(--is-large, 1)*max(16px, -1 * 16px)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(12px, -1 * 12px)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(8px, -1 * 8px)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))));transition:all .1s ease-in-out}[part="base focused"]::after{content:"";position:absolute;inset-block-start:.125rem;inset-inline-start:.125rem;pointer-events:none;width:calc(100% - 0.125rem*2);height:calc(100% - 0.125rem*2)}:host(:not([disabled])[variant=flat]) [part="base focused"],:host(:not([disabled])[variant=flat]) [part="base focused"]:hover,:host(:not(:disabled)[variant=flat]) [part="base focused"],:host(:not(:disabled)[variant=flat]) [part="base focused"]:hover{border:.0625rem solid var(--active-border-color)}:host(:not([disabled])[variant=flat]) [part="base focused"]:active,:host(:not(:disabled)[variant=flat]) [part="base focused"]:active{border:.0625rem solid var(--focus-border-color)}:host(:not([disabled])[variant=flat]) [part="base focused"]::after,:host(:not(:disabled)[variant=flat]) [part="base focused"]::after{box-shadow:0 0 0 .0625rem var(--focus-visible-border-color)}:host(:not([disabled])[variant=outlined]) [part~=base],:host(:not(:disabled)[variant=outlined]) [part~=base]{border:.0625rem solid var(--border-color)}:host(:not([disabled])[variant=outlined]) [part~=base]:active,:host(:not(:disabled)[variant=outlined]) [part~=base]:active{border-color:var(--active-border-color)}:host(:not([disabled])[variant=outlined]) [part="base focused"],:host(:not([disabled])[variant=outlined]) [part="base focused"]:active,:host(:not(:disabled)[variant=outlined]) [part="base focused"],:host(:not(:disabled)[variant=outlined]) [part="base focused"]:active{border:.0625rem solid var(--focus-border-color)}:host(:not([disabled])[variant=outlined]) [part="base focused"]::after,:host(:not(:disabled)[variant=outlined]) [part="base focused"]::after{inset-block-start:.125rem;inset-inline-start:.125rem;width:calc(100% - 0.125rem*2);height:calc(100% - 0.125rem*2);box-shadow:0 0 0 .0625rem var(--focus-visible-border-color)}:host(:not([disabled])[variant=contained]) [part="base focused"],:host(:not(:disabled)[variant=contained]) [part="base focused"]{border:.0625rem solid var(--active-border-color);position:relative}:host(:not([disabled])[variant=contained]) [part="base focused"]::after,:host(:not(:disabled)[variant=contained]) [part="base focused"]::after{box-shadow:0 0 0 1px var(--focus-visible-border-color)}:host(:not([disabled])[variant=fab]) [part="base focused"],:host(:not(:disabled)[variant=fab]) [part="base focused"]{border:.0625rem solid var(--active-border-color);position:relative}:host(:not([disabled])[variant=fab]) [part="base focused"]::after,:host(:not(:disabled)[variant=fab]) [part="base focused"]::after{box-shadow:0 0 0 1px var(--focus-visible-border-color)}`, li = d`:host [part~=base]{min-width:1.75rem;padding:0 max(var(--is-large, 1)*max(24px, -1 * 24px)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(16px, -1 * 16px)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(10px, -1 * 10px)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))))}:host [part~=base] ::slotted(igc-icon){--component-size: var(--ig-size-medium) !important}:host([variant=flat]){--component-size: var(--ig-size, var(--default-size));--gap: max(var(--is-large, 1) * max(0.5rem, -1 * 0.5rem), var(--is-medium, 1) * max(0.5rem, -1 * 0.5rem), var(--is-small, 1) * max(0.25rem, -1 * 0.25rem))}:host([variant=outlined]){--component-size: var(--ig-size, var(--default-size));--gap: max(var(--is-large, 1) * max(0.5rem, -1 * 0.5rem), var(--is-medium, 1) * max(0.5rem, -1 * 0.5rem), var(--is-small, 1) * max(0.25rem, -1 * 0.25rem))}:host([variant=contained]){--component-size: var(--ig-size, var(--default-size));--gap: max(var(--is-large, 1) * max(0.5rem, -1 * 0.5rem), var(--is-medium, 1) * max(0.5rem, -1 * 0.5rem), var(--is-small, 1) * max(0.25rem, -1 * 0.25rem))}:host([variant=fab]){--component-size: var(--ig-size, var(--default-size))}:host([variant=fab]) [part~=base]{padding:0 max(var(--is-large, 1)*max(0.625rem, -1 * 0.625rem)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(0.5rem, -1 * 0.5rem)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(0.375rem, -1 * 0.375rem)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))))}:host([variant=flat]) [part~=base],:host([variant=contained]) [part~=base],:host([variant=outlined]) [part~=base]{border-width:.125rem}:host(:not([disabled])[variant=flat]) [part~=base]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=flat]) [part~=base]:active ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=flat]) [part="base focused"],:host(:not(:disabled)[variant=flat]) [part="base focused"]{box-shadow:0 0 0 .1875rem var(--shadow-color)}:host(:not([disabled])[variant=flat]) [part="base focused"] ::slotted(igc-icon),:host(:not(:disabled)[variant=flat]) [part="base focused"] ::slotted(igc-icon){color:var(--icon-color)}:host(:not([disabled])[variant=flat]) [part="base focused"]:hover ::slotted(igc-icon),:host(:not([disabled])[variant=flat]) [part="base focused"]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=flat]) [part="base focused"]:hover ::slotted(igc-icon),:host(:not(:disabled)[variant=flat]) [part="base focused"]:active ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=outlined]) [part~=base]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=outlined]) [part~=base]:active ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=outlined]) [part="base focused"],:host(:not(:disabled)[variant=outlined]) [part="base focused"]{box-shadow:0 0 0 .1875rem var(--shadow-color)}:host(:not([disabled])[variant=outlined]) [part="base focused"] ::slotted(igc-icon),:host(:not(:disabled)[variant=outlined]) [part="base focused"] ::slotted(igc-icon){color:var(--icon-color)}:host(:not([disabled])[variant=outlined]) [part="base focused"]:hover ::slotted(igc-icon),:host(:not(:disabled)[variant=outlined]) [part="base focused"]:hover ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=outlined]) [part="base focused"]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=outlined]) [part="base focused"]:active ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=contained]) [part~=base]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=contained]) [part~=base]:active ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=contained]) [part="base focused"],:host(:not(:disabled)[variant=contained]) [part="base focused"]{box-shadow:0 0 0 .1875rem var(--shadow-color)}:host(:not([disabled])[variant=contained]) [part="base focused"] ::slotted(igc-icon),:host(:not(:disabled)[variant=contained]) [part="base focused"] ::slotted(igc-icon){color:var(--icon-color)}:host(:not([disabled])[variant=contained]) [part="base focused"]:hover ::slotted(igc-icon),:host(:not(:disabled)[variant=contained]) [part="base focused"]:hover ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=contained]) [part="base focused"]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=contained]) [part="base focused"]:active ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=fab]) [part~=base],:host(:not(:disabled)[variant=fab]) [part~=base]{min-width:var(--size);min-height:var(--size)}:host(:not([disabled])[variant=fab]) [part~=base]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=fab]) [part~=base]:active ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=fab]) [part="base focused"],:host(:not(:disabled)[variant=fab]) [part="base focused"]{box-shadow:0 0 0 .1875rem var(--shadow-color)}:host(:not([disabled])[variant=fab]) [part="base focused"] ::slotted(igc-icon),:host(:not(:disabled)[variant=fab]) [part="base focused"] ::slotted(igc-icon){color:var(--icon-color)}:host(:not([disabled])[variant=fab]) [part="base focused"]:hover ::slotted(igc-icon),:host(:not(:disabled)[variant=fab]) [part="base focused"]:hover ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=fab]) [part="base focused"]:active ::slotted(igc-icon),:host(:not(:disabled)[variant=fab]) [part="base focused"]:active ::slotted(igc-icon){color:var(--icon-color-hover)}:host([disabled][variant=outlined]) [part~=base],:host(:disabled[variant=outlined]) [part~=base]{border-width:.125rem}`, ui = d`:host([variant=flat]){--component-size: var(--ig-size, var(--default-size))}:host([variant=outlined]){--component-size: var(--ig-size, var(--default-size))}:host([variant=contained]){--component-size: var(--ig-size, var(--default-size))}:host([variant=fab]){--component-size: var(--ig-size, var(--default-size))}[part~=base]{transition:all .1s ease-in-out}:host(:not([disabled])[variant=flat]) [part="base focused"] ::slotted(igc-icon),:host(:not(:disabled)[variant=flat]) [part="base focused"] ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=outlined]) [part="base focused"] ::slotted(igc-icon),:host(:not(:disabled)[variant=outlined]) [part="base focused"] ::slotted(igc-icon){color:var(--icon-color-hover)}:host(:not([disabled])[variant=contained]) [part~=base],:host(:not(:disabled)[variant=contained]) [part~=base]{box-shadow:var(--resting-elevation)}:host(:not([disabled])[variant=contained]) [part~=base]:hover,:host(:not(:disabled)[variant=contained]) [part~=base]:hover{box-shadow:var(--hover-elevation)}:host(:not([disabled])[variant=contained]) [part~=base]:active,:host(:not(:disabled)[variant=contained]) [part~=base]:active{box-shadow:var(--active-elevation)}:host(:not([disabled])[variant=contained]) [part="base focused"],:host(:not([disabled])[variant=contained]) [part="base focused"]:hover,:host(:not([disabled])[variant=contained]) [part="base focused"]:active,:host(:not(:disabled)[variant=contained]) [part="base focused"],:host(:not(:disabled)[variant=contained]) [part="base focused"]:hover,:host(:not(:disabled)[variant=contained]) [part="base focused"]:active{box-shadow:var(--focus-elevation)}:host(:not([disabled])[variant=fab]) [part~=base],:host(:not(:disabled)[variant=fab]) [part~=base]{box-shadow:var(--resting-elevation)}:host(:not([disabled])[variant=fab]) [part~=base]:hover,:host(:not(:disabled)[variant=fab]) [part~=base]:hover{box-shadow:var(--hover-elevation)}:host(:not([disabled])[variant=fab]) [part~=base]:active,:host(:not(:disabled)[variant=fab]) [part~=base]:active{box-shadow:var(--active-elevation)}:host(:not([disabled])[variant=fab]) [part="base focused"],:host(:not([disabled])[variant=fab]) [part="base focused"]:hover,:host(:not([disabled])[variant=fab]) [part="base focused"]:active,:host(:not(:disabled)[variant=fab]) [part="base focused"],:host(:not(:disabled)[variant=fab]) [part="base focused"]:hover,:host(:not(:disabled)[variant=fab]) [part="base focused"]:active{box-shadow:var(--focus-elevation)}`, di = {
	light: {
		shared: d`
    ${oi}
  `,
		bootstrap: d`
    ${si} ${ni}
  `,
		material: d`
    ${ui} ${ai}
  `,
		fluent: d`
    ${ci} ${ri}
  `,
		indigo: d`
    ${li} ${ii}
  `
	},
	dark: {
		shared: d`
    ${oi}
  `,
		bootstrap: d`
    ${si} ${Qr}
  `,
		material: d`
    ${ui} ${ti}
  `,
		fluent: d`
    ${ci} ${$r}
  `,
		indigo: d`
    ${li} ${ei}
  `
	}
}, fi = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, pi = class e extends I {
	static {
		this.tagName = "igc-button";
	}
	static {
		this.styles = [Xr, Zr];
	}
	static register() {
		M(e);
	}
	constructor() {
		super(), this.variant = "contained", Tt(this, di);
	}
	_renderContent() {
		return c`
      <slot name="prefix"></slot>
      <slot></slot>
      <slot name="suffix"></slot>
    `;
	}
};
fi([j({ reflect: !0 })], pi.prototype, "variant", void 0);
//#endregion
//#region node_modules/igniteui-webcomponents/internals/context.js
var mi = rt(Symbol("button-group-context")), hi = class {
	constructor(e, t) {
		this._snapshot = /* @__PURE__ */ new Map(), this._host = e, this._options = t, this._provider = new st(e, { context: t.context }), e.addController(this);
	}
	hostConnected() {
		this.publish();
	}
	hostUpdate() {
		this._options.watch?.some((e) => this._host[e] !== this._snapshot.get(e)) && this.publish();
	}
	publish() {
		for (let e of this._options.watch ?? []) this._snapshot.set(e, this._host[e]);
		this._provider.setValue(this._options.value.call(this._host), !0);
	}
};
function gi(e, t) {
	return new hi(e, t);
}
//#endregion
//#region node_modules/igniteui-webcomponents/components/button-group/themes/group.base.css.js
var _i = d`:host{--is-large: clamp(0, (var(--component-size, 1) + 1) - var(--ig-size-large, 3), 1);--is-medium: min( clamp(0, (var(--component-size, 1) + 1) - var(--ig-size-medium, 2), 1), clamp(0, var(--ig-size-large, 3) - var(--component-size, 1), 1) );--is-small: clamp(0, var(--ig-size-medium) - var(--component-size, 1), 1);position:relative;box-sizing:border-box;scrollbar-width:var(--ig-scrollbar-size, var(--sb-size));scrollbar-color:var(--ig-scrollbar-thumb-background, var(--sb-thumb-bg-color)) var(--ig-scrollbar-track-background, var(--sb-track-bg-color))}:host ::-webkit-scrollbar{width:var(--ig-scrollbar-size, var(--sb-size));height:var(--ig-scrollbar-size, var(--sb-size));background:var(--ig-scrollbar-track-background, var(--sb-track-bg-color))}:host ::-webkit-scrollbar-thumb{background:var(--ig-scrollbar-thumb-background, var(--sb-thumb-bg-color))}:host *,:host *::before,:host *::after{box-sizing:border-box}:host([hidden]),[hidden]{display:none !important}:host{max-width:100%}[part~=group]{display:grid;grid-auto-flow:row;grid-auto-columns:minmax(0, 1fr)}:host(:not([alignment=vertical])){--_negative-margin-horizontal: -0.0625rem}:host(:not([alignment=vertical])) [part~=group]{grid-auto-flow:column}:host([alignment=vertical]){--_negative-margin-vertical: -0.0625rem}:host([alignment=vertical]) [part~=group]{grid-auto-flow:row}`, vi = d`:host{--elevation: var(--ig-button-group-elevation, var(--ig-elevation-0));--idle-shadow-color: var(--ig-button-group-idle-shadow-color, hsl(from var(--ig-primary-600) h s l/0.5));--selected-shadow-color: var(--ig-button-group-selected-shadow-color, hsl(from var(--ig-primary-600) h s l/0.5));--item-text-color: var(--ig-button-group-item-text-color, var(--ig-primary-600-contrast));--item-background: var(--ig-button-group-item-background, var(--ig-primary-500));--item-border-color: var(--ig-button-group-item-border-color, var(--ig-primary-500));--item-hover-background: var(--ig-button-group-item-hover-background, var(--ig-primary-600));--item-hover-text-color: var(--ig-button-group-item-hover-text-color, var(--ig-primary-600-contrast));--item-focused-text-color: var(--ig-button-group-item-focused-text-color, var(--ig-primary-600-contrast));--item-focused-border-color: var(--ig-button-group-item-focused-border-color, var(--ig-primary-500));--item-focused-hover-text-color: var(--ig-button-group-item-focused-hover-text-color, var(--ig-primary-600-contrast));--item-focused-hover-border-color: var(--ig-button-group-item-focused-hover-border-color, var(--ig-primary-600));--item-focused-hover-background: var(--ig-button-group-item-focused-hover-background, var(--ig-primary-600));--item-selected-hover-text-color: var(--ig-button-group-item-selected-hover-text-color, var(--ig-primary-700-contrast));--item-selected-hover-icon-color: var(--ig-button-group-item-selected-hover-icon-color, var(--ig-primary-700-contrast));--item-selected-focus-background: var(--ig-button-group-item-selected-focus-background, var(--ig-primary-700));--item-selected-focus-hover-background: var(--ig-button-group-item-selected-focus-hover-background, var(--ig-primary-800));--item-selected-active-background: var(--ig-button-group-item-selected-active-background, var(--ig-primary-900));--item-active-border-color: var(--ig-button-group-item-active-border-color, var(--ig-primary-800));--item-selected-active-border-color: var(--ig-button-group-item-selected-active-border-color, var(--ig-primary-900));--disabled-background-color: var(--ig-button-group-disabled-background-color, var(--ig-primary-50));--border-radius: var(--ig-button-group-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.2) * 1.25rem), 1.25rem));--default-size: var(--ig-button-group-default-size, 2);--item-icon-color: var(--ig-button-group-item-icon-color, var(--ig-primary-600-contrast));--item-hover-border-color: var(--ig-button-group-item-hover-border-color, var(--ig-primary-600));--item-hover-icon-color: var(--ig-button-group-item-hover-icon-color, var(--ig-primary-600-contrast));--item-focused-background: var(--ig-button-group-item-focused-background, var(--ig-primary-500));--item-selected-background: var(--ig-button-group-item-selected-background, var(--ig-primary-700));--item-selected-text-color: var(--ig-button-group-item-selected-text-color, var(--ig-primary-700-contrast));--item-selected-icon-color: var(--ig-button-group-item-selected-icon-color, var(--ig-primary-700-contrast));--item-selected-border-color: var(--ig-button-group-item-selected-border-color, var(--ig-primary-700));--item-selected-hover-background: var(--ig-button-group-item-selected-hover-background, var(--ig-primary-800));--item-selected-hover-border-color: var(--ig-button-group-item-selected-hover-border-color, var(--ig-primary-800));--item-active-background: var(--ig-button-group-item-active-background, var(--ig-primary-800));--disabled-text-color: var(--ig-button-group-disabled-text-color, var(--ig-primary-200));--item-disabled-border: var(--ig-button-group-item-disabled-border, var(--ig-primary-50));--disabled-selected-background: var(--ig-button-group-disabled-selected-background, var(--ig-primary-100));--disabled-selected-text-color: var(--ig-button-group-disabled-selected-text-color, var(--ig-primary-200));--disabled-selected-icon-color: var(--ig-button-group-disabled-selected-icon-color, var(--ig-primary-200));--disabled-selected-border-color: var(--ig-button-group-disabled-selected-border-color, var(--ig-primary-100));--ig-theme: bootstrap;--ig-theme-variant: dark}`, yi = d`:host{--elevation: var(--ig-button-group-elevation, var(--ig-elevation-0));--idle-shadow-color: var(--ig-button-group-idle-shadow-color, transparent);--selected-shadow-color: var(--ig-button-group-selected-shadow-color, transparent);--item-text-color: var(--ig-button-group-item-text-color, var(--ig-gray-900));--item-background: var(--ig-button-group-item-background, var(--ig-gray-900-contrast));--item-border-color: var(--ig-button-group-item-border-color, var(--ig-gray-400));--item-hover-background: var(--ig-button-group-item-hover-background, var(--ig-gray-50));--item-hover-text-color: var(--ig-button-group-item-hover-text-color, var(--ig-gray-900));--item-focused-text-color: var(--ig-button-group-item-focused-text-color, var(--ig-gray-900));--item-focused-border-color: var(--ig-button-group-item-focused-border-color, var(--ig-gray-400));--item-focused-hover-text-color: var(--ig-button-group-item-focused-hover-text-color, var(--ig-gray-900));--item-focused-hover-border-color: var(--ig-button-group-item-focused-hover-border-color, var(--ig-gray-400));--item-focused-hover-background: var(--ig-button-group-item-focused-hover-background, var(--ig-gray-50));--item-selected-hover-text-color: var(--ig-button-group-item-selected-hover-text-color, var(--ig-gray-900));--item-selected-hover-icon-color: var(--ig-button-group-item-selected-hover-icon-color, var(--ig-gray-900));--item-selected-active-background: var(--ig-button-group-item-selected-active-background, var(--ig-gray-300));--item-active-border-color: var(--ig-button-group-item-active-border-color, var(--ig-gray-400));--item-selected-active-border-color: var(--ig-button-group-item-selected-active-border-color, var(--ig-gray-600));--disabled-background-color: var(--ig-button-group-disabled-background-color, var(--ig-gray-50));--border-radius: var(--ig-button-group-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--default-size: var(--ig-button-group-default-size, 2);--item-icon-color: var(--ig-button-group-item-icon-color, var(--ig-gray-900));--item-focused-background: var(--ig-button-group-item-focused-background, var(--ig-gray-900-contrast));--item-hover-icon-color: var(--ig-button-group-item-hover-icon-color, var(--ig-gray-900));--item-hover-border-color: var(--ig-button-group-item-hover-border-color, var(--ig-gray-400));--item-selected-text-color: var(--ig-button-group-item-selected-text-color, var(--ig-gray-900));--item-selected-icon-color: var(--ig-button-group-item-selected-icon-color, var(--ig-gray-900));--item-selected-border-color: var(--ig-button-group-item-selected-border-color, var(--ig-gray-600));--item-selected-hover-background: var(--ig-button-group-item-selected-hover-background, var(--ig-gray-200));--item-selected-hover-border-color: var(--ig-button-group-item-selected-hover-border-color, var(--ig-gray-600));--item-active-background: var(--ig-button-group-item-active-background, var(--ig-gray-100));--disabled-text-color: var(--ig-button-group-disabled-text-color, var(--ig-gray-300));--item-disabled-border: var(--ig-button-group-item-disabled-border, var(--ig-gray-400));--disabled-selected-text-color: var(--ig-button-group-disabled-selected-text-color, var(--ig-gray-300));--disabled-selected-icon-color: var(--ig-button-group-disabled-selected-icon-color, var(--ig-gray-300));--disabled-selected-background: var(--ig-button-group-disabled-selected-background, var(--ig-gray-100));--disabled-selected-border-color: var(--ig-button-group-disabled-selected-border-color, var(--ig-gray-400));--ig-theme: fluent;--ig-theme-variant: dark}`, bi = d`:host{--elevation: var(--ig-button-group-elevation, var(--ig-elevation-0));--idle-shadow-color: var(--ig-button-group-idle-shadow-color, hsl(from var(--ig-gray-50-contrast) h s l/0.2));--selected-shadow-color: var(--ig-button-group-selected-shadow-color, hsl(from var(--ig-primary-400) h s l/0.5));--item-text-color: var(--ig-button-group-item-text-color, hsl(from var(--ig-gray-50-contrast) h s l/0.8));--item-background: var(--ig-button-group-item-background, hsl(from var(--ig-gray-50-contrast) h s l/0.05));--item-hover-background: var(--ig-button-group-item-hover-background, hsl(from var(--ig-gray-50-contrast) h s l/0.1));--item-hover-text-color: var(--ig-button-group-item-hover-text-color, var(--ig-gray-50-contrast));--item-focused-text-color: var(--ig-button-group-item-focused-text-color, hsl(from var(--ig-gray-50-contrast) h s l/0.8));--item-focused-border-color: var(--ig-button-group-item-focused-border-color, var(--ig-gray-100));--item-focused-hover-text-color: var(--ig-button-group-item-focused-hover-text-color, var(--ig-gray-50-contrast));--item-focused-hover-border-color: var(--ig-button-group-item-focused-hover-border-color, var(--ig-gray-200));--item-focused-hover-background: var(--ig-button-group-item-focused-hover-background, hsl(from var(--ig-gray-50-contrast) h s l/0.1));--item-selected-hover-text-color: var(--ig-button-group-item-selected-hover-text-color, var(--ig-primary-500-contrast));--item-selected-hover-icon-color: var(--ig-button-group-item-selected-hover-icon-color, var(--ig-primary-500-contrast));--item-selected-focus-background: var(--ig-button-group-item-selected-focus-background, var(--ig-primary-500));--item-selected-focus-hover-background: var(--ig-button-group-item-selected-focus-hover-background, var(--ig-primary-400));--item-selected-active-background: var(--ig-button-group-item-selected-active-background, var(--ig-primary-400));--item-active-border-color: var(--ig-button-group-item-active-border-color, var(--ig-gray-200));--item-selected-active-border-color: var(--ig-button-group-item-selected-active-border-color, var(--ig-primary-400));--disabled-background-color: var(--ig-button-group-disabled-background-color, transparent);--border-radius: var(--ig-button-group-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.2) * 1.25rem), 1.25rem));--default-size: var(--ig-button-group-default-size, 2);--item-icon-color: var(--ig-button-group-item-icon-color, hsl(from var(--ig-gray-50-contrast) h s l/0.8));--item-hover-icon-color: var(--ig-button-group-item-hover-icon-color, var(--ig-gray-50-contrast));--item-focused-background: var(--ig-button-group-item-focused-background, hsl(from var(--ig-gray-50-contrast) h s l/0.05));--item-selected-background: var(--ig-button-group-item-selected-background, var(--ig-primary-500));--item-selected-text-color: var(--ig-button-group-item-selected-text-color, var(--ig-primary-500-contrast));--item-selected-icon-color: var(--ig-button-group-item-selected-icon-color, hsl(from var(--ig-primary-500-contrast) h s l/0.8));--item-selected-border-color: var(--ig-button-group-item-selected-border-color, var(--ig-primary-500));--item-selected-hover-background: var(--ig-button-group-item-selected-hover-background, var(--ig-primary-400));--item-selected-hover-border-color: var(--ig-button-group-item-selected-hover-border-color, var(--ig-primary-400));--item-active-background: var(--ig-button-group-item-active-background, hsl(from var(--ig-gray-50-contrast) h s l/0.1));--disabled-text-color: var(--ig-button-group-disabled-text-color, hsl(from var(--ig-gray-50-contrast) h s l/0.2));--item-disabled-border: var(--ig-button-group-item-disabled-border, var(--ig-gray-50));--disabled-selected-background: var(--ig-button-group-disabled-selected-background, hsl(from var(--ig-primary-400) h s l/0.5));--disabled-selected-text-color: var(--ig-button-group-disabled-selected-text-color, hsl(from var(--ig-primary-500-contrast) h s l/0.2));--disabled-selected-icon-color: var(--ig-button-group-disabled-selected-icon-color, hsl(from var(--ig-primary-500-contrast) h s l/0.2));--disabled-selected-border-color: var(--ig-button-group-disabled-selected-border-color, hsl(from var(--ig-primary-400) h s l/0.5));--ig-theme: indigo;--ig-theme-variant: dark}`, xi = d`:host{--elevation: var(--ig-button-group-elevation, var(--ig-elevation-2));--idle-shadow-color: var(--ig-button-group-idle-shadow-color, transparent);--selected-shadow-color: var(--ig-button-group-selected-shadow-color, transparent);--item-text-color: var(--ig-button-group-item-text-color, var(--ig-gray-700));--item-background: var(--ig-button-group-item-background, var(--ig-gray-50));--item-hover-background: var(--ig-button-group-item-hover-background, var(--ig-gray-100));--item-hover-text-color: var(--ig-button-group-item-hover-text-color, var(--ig-gray-800));--item-focused-text-color: var(--ig-button-group-item-focused-text-color, var(--ig-gray-800));--item-focused-hover-text-color: var(--ig-button-group-item-focused-hover-text-color, var(--ig-gray-800));--item-focused-hover-background: var(--ig-button-group-item-focused-hover-background, var(--ig-gray-100));--item-selected-hover-text-color: var(--ig-button-group-item-selected-hover-text-color, var(--ig-gray-900));--item-selected-hover-icon-color: var(--ig-button-group-item-selected-hover-icon-color, var(--ig-gray-900));--item-selected-active-background: var(--ig-button-group-item-selected-active-background, var(--ig-gray-200));--item-selected-active-border-color: var(--ig-button-group-item-selected-active-border-color, var(--ig-gray-500));--disabled-background-color: var(--ig-button-group-disabled-background-color, var(--ig-gray-50));--border-radius: var(--ig-button-group-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.2) * 1.25rem), 1.25rem));--default-size: var(--ig-button-group-default-size, 3);--item-icon-color: var(--ig-button-group-item-icon-color, var(--ig-gray-700));--item-hover-icon-color: var(--ig-button-group-item-hover-icon-color, var(--ig-gray-800));--item-focused-background: var(--ig-button-group-item-focused-background, var(--ig-gray-100));--item-selected-text-color: var(--ig-button-group-item-selected-text-color, var(--ig-gray-800));--item-selected-icon-color: var(--ig-button-group-item-selected-icon-color, var(--ig-gray-800));--item-selected-hover-background: var(--ig-button-group-item-selected-hover-background, var(--ig-gray-100));--item-active-background: var(--ig-button-group-item-active-background, var(--ig-gray-200));--disabled-text-color: var(--ig-button-group-disabled-text-color, var(--ig-gray-400));--disabled-selected-text-color: var(--ig-button-group-disabled-selected-text-color, var(--ig-gray-200));--disabled-selected-icon-color: var(--ig-button-group-disabled-selected-icon-color, var(--ig-gray-200));--disabled-selected-background: var(--ig-button-group-disabled-selected-background, var(--ig-gray-50));--ig-theme: material;--ig-theme-variant: dark}`, Si = d`:host{--item-border-color: var(--ig-button-group-item-border-color, var(--ig-gray-100));--item-hover-border-color: var(--ig-button-group-item-hover-border-color, var(--ig-gray-200));--item-focused-border-color: var(--ig-button-group-item-focused-border-color, var(--ig-gray-200));--item-focused-hover-border-color: var(--ig-button-group-item-focused-hover-border-color, var(--ig-gray-300));--item-selected-background: var(--ig-button-group-item-selected-background, var(--ig-gray-100));--item-selected-focus-background: var(--ig-button-group-item-selected-focus-background, var(--ig-gray-100));--item-selected-hover-background: var(--ig-button-group-item-selected-hover-background, hsl(from var(--ig-gray-300) h s l/0.8));--item-selected-focus-hover-background: var(--ig-button-group-item-selected-focus-hover-background, var(--ig-gray-200));--item-selected-border-color: var(--ig-button-group-item-selected-border-color, var(--ig-gray-300));--item-selected-hover-border-color: var(--ig-button-group-item-selected-hover-border-color, var(--ig-gray-500));--item-active-border-color: var(--ig-button-group-item-active-border-color, var(--ig-gray-100));--item-disabled-border: var(--ig-button-group-item-disabled-border, var(--ig-gray-100));--disabled-selected-border-color: var(--ig-button-group-disabled-selected-border-color, var(--ig-gray-100));--ig-theme-variant: dark}`, Ci = d`:host{--elevation: var(--ig-button-group-elevation, var(--ig-elevation-0));--idle-shadow-color: var(--ig-button-group-idle-shadow-color, hsl(from var(--ig-primary-600) h s l/0.5));--selected-shadow-color: var(--ig-button-group-selected-shadow-color, hsl(from var(--ig-primary-600) h s l/0.5));--item-text-color: var(--ig-button-group-item-text-color, var(--ig-primary-600-contrast));--item-background: var(--ig-button-group-item-background, var(--ig-primary-500));--item-border-color: var(--ig-button-group-item-border-color, var(--ig-primary-500));--item-hover-background: var(--ig-button-group-item-hover-background, var(--ig-primary-600));--item-hover-text-color: var(--ig-button-group-item-hover-text-color, var(--ig-primary-600-contrast));--item-focused-text-color: var(--ig-button-group-item-focused-text-color, var(--ig-primary-600-contrast));--item-focused-border-color: var(--ig-button-group-item-focused-border-color, var(--ig-primary-500));--item-focused-hover-text-color: var(--ig-button-group-item-focused-hover-text-color, var(--ig-primary-600-contrast));--item-focused-hover-border-color: var(--ig-button-group-item-focused-hover-border-color, var(--ig-primary-600));--item-focused-hover-background: var(--ig-button-group-item-focused-hover-background, var(--ig-primary-600));--item-selected-hover-text-color: var(--ig-button-group-item-selected-hover-text-color, var(--ig-primary-700-contrast));--item-selected-hover-icon-color: var(--ig-button-group-item-selected-hover-icon-color, var(--ig-primary-700-contrast));--item-selected-focus-background: var(--ig-button-group-item-selected-focus-background, var(--ig-primary-700));--item-selected-focus-hover-background: var(--ig-button-group-item-selected-focus-hover-background, var(--ig-primary-800));--item-selected-active-background: var(--ig-button-group-item-selected-active-background, var(--ig-primary-900));--item-active-border-color: var(--ig-button-group-item-active-border-color, var(--ig-primary-800));--item-selected-active-border-color: var(--ig-button-group-item-selected-active-border-color, var(--ig-primary-900));--disabled-background-color: var(--ig-button-group-disabled-background-color, var(--ig-primary-50));--item-icon-color: var(--ig-button-group-item-icon-color, var(--ig-primary-600-contrast));--item-hover-border-color: var(--ig-button-group-item-hover-border-color, var(--ig-primary-600));--item-hover-icon-color: var(--ig-button-group-item-hover-icon-color, var(--ig-primary-600-contrast));--item-focused-background: var(--ig-button-group-item-focused-background, var(--ig-primary-500));--item-selected-background: var(--ig-button-group-item-selected-background, var(--ig-primary-700));--item-selected-text-color: var(--ig-button-group-item-selected-text-color, var(--ig-primary-700-contrast));--item-selected-icon-color: var(--ig-button-group-item-selected-icon-color, var(--ig-primary-700-contrast));--item-selected-border-color: var(--ig-button-group-item-selected-border-color, var(--ig-primary-700));--item-selected-hover-background: var(--ig-button-group-item-selected-hover-background, var(--ig-primary-800));--item-selected-hover-border-color: var(--ig-button-group-item-selected-hover-border-color, var(--ig-primary-800));--item-active-background: var(--ig-button-group-item-active-background, var(--ig-primary-800));--disabled-text-color: var(--ig-button-group-disabled-text-color, var(--ig-primary-200));--item-disabled-border: var(--ig-button-group-item-disabled-border, var(--ig-primary-50));--disabled-selected-background: var(--ig-button-group-disabled-selected-background, var(--ig-primary-100));--disabled-selected-text-color: var(--ig-button-group-disabled-selected-text-color, var(--ig-primary-200));--disabled-selected-icon-color: var(--ig-button-group-disabled-selected-icon-color, var(--ig-primary-200));--disabled-selected-border-color: var(--ig-button-group-disabled-selected-border-color, var(--ig-primary-100));--ig-theme: bootstrap;--ig-theme-variant: light}`, wi = d`:host{--elevation: var(--ig-button-group-elevation, var(--ig-elevation-0));--item-text-color: var(--ig-button-group-item-text-color, var(--ig-gray-900));--item-background: var(--ig-button-group-item-background, var(--ig-gray-900-contrast));--item-border-color: var(--ig-button-group-item-border-color, var(--ig-gray-600));--item-focused-text-color: var(--ig-button-group-item-focused-text-color, var(--ig-gray-900));--item-focused-border-color: var(--ig-button-group-item-focused-border-color, var(--ig-gray-700));--item-focused-hover-border-color: var(--ig-button-group-item-focused-hover-border-color, var(--ig-gray-600));--item-active-border-color: var(--ig-button-group-item-active-border-color, var(--ig-gray-600));--border-radius: var(--ig-button-group-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--item-icon-color: var(--ig-button-group-item-icon-color, var(--ig-gray-900));--item-focused-background: var(--ig-button-group-item-focused-background, var(--ig-gray-900-contrast));--item-hover-icon-color: var(--ig-button-group-item-hover-icon-color, var(--ig-gray-900));--item-hover-border-color: var(--ig-button-group-item-hover-border-color, var(--ig-gray-600));--item-selected-background: var(--ig-button-group-item-selected-background, var(--ig-gray-300));--item-selected-text-color: var(--ig-button-group-item-selected-text-color, var(--ig-gray-900));--item-selected-icon-color: var(--ig-button-group-item-selected-icon-color, var(--ig-gray-900));--item-selected-border-color: var(--ig-button-group-item-selected-border-color, var(--ig-gray-600));--item-selected-hover-background: var(--ig-button-group-item-selected-hover-background, var(--ig-gray-400));--item-selected-hover-border-color: var(--ig-button-group-item-selected-hover-border-color, var(--ig-gray-600));--item-active-background: var(--ig-button-group-item-active-background, var(--ig-gray-300));--disabled-text-color: var(--ig-button-group-disabled-text-color, var(--ig-gray-500));--item-disabled-border: var(--ig-button-group-item-disabled-border, var(--ig-gray-600));--disabled-selected-text-color: var(--ig-button-group-disabled-selected-text-color, var(--ig-gray-500));--disabled-selected-icon-color: var(--ig-button-group-disabled-selected-icon-color, var(--ig-gray-500));--disabled-selected-background: var(--ig-button-group-disabled-selected-background, var(--ig-gray-200));--disabled-selected-border-color: var(--ig-button-group-disabled-selected-border-color, var(--ig-gray-600));--ig-theme: fluent;--ig-theme-variant: light}`, Ti = d`:host{--elevation: var(--ig-button-group-elevation, var(--ig-elevation-0));--idle-shadow-color: var(--ig-button-group-idle-shadow-color, hsl(from var(--ig-gray-900) h s l/0.15));--selected-shadow-color: var(--ig-button-group-selected-shadow-color, hsl(from var(--ig-primary-400) h s l/0.5));--item-focused-hover-border-color: var(--ig-button-group-item-focused-hover-border-color, var(--ig-gray-500));--item-selected-hover-text-color: var(--ig-button-group-item-selected-hover-text-color, var(--ig-primary-500-contrast));--item-selected-hover-icon-color: var(--ig-button-group-item-selected-hover-icon-color, var(--ig-primary-500-contrast));--item-selected-focus-background: var(--ig-button-group-item-selected-focus-background, var(--ig-primary-500));--item-selected-focus-hover-background: var(--ig-button-group-item-selected-focus-hover-background, var(--ig-primary-400));--item-selected-active-background: var(--ig-button-group-item-selected-active-background, var(--ig-primary-400));--item-selected-active-border-color: var(--ig-button-group-item-selected-active-border-color, var(--ig-primary-400));--disabled-background-color: var(--ig-button-group-disabled-background-color, var(--ig-gray-900-contrast));--item-icon-color: var(--ig-button-group-item-icon-color, var(--ig-gray-600));--item-hover-icon-color: var(--ig-button-group-item-hover-icon-color, var(--ig-gray-700));--item-hover-border-color: var(--ig-button-group-item-hover-border-color, var(--ig-gray-500));--item-focused-background: var(--ig-button-group-item-focused-background, var(--ig-gray-50));--item-selected-background: var(--ig-button-group-item-selected-background, var(--ig-primary-500));--item-selected-text-color: var(--ig-button-group-item-selected-text-color, var(--ig-primary-500-contrast));--item-selected-icon-color: var(--ig-button-group-item-selected-icon-color, hsl(from var(--ig-primary-500-contrast) h s l/0.8));--item-selected-border-color: var(--ig-button-group-item-selected-border-color, var(--ig-primary-500));--item-selected-hover-background: var(--ig-button-group-item-selected-hover-background, var(--ig-primary-400));--item-selected-hover-border-color: var(--ig-button-group-item-selected-hover-border-color, var(--ig-primary-400));--item-active-background: var(--ig-button-group-item-active-background, var(--ig-gray-200));--disabled-text-color: var(--ig-button-group-disabled-text-color, hsl(from var(--ig-gray-900) h s l/0.2));--item-disabled-border: var(--ig-button-group-item-disabled-border, var(--ig-gray-300));--disabled-selected-background: var(--ig-button-group-disabled-selected-background, hsl(from var(--ig-primary-400) h s l/0.5));--disabled-selected-text-color: var(--ig-button-group-disabled-selected-text-color, hsl(from var(--ig-primary-500-contrast) h s l/0.4));--disabled-selected-icon-color: var(--ig-button-group-disabled-selected-icon-color, hsl(from var(--ig-primary-500-contrast) h s l/0.3));--disabled-selected-border-color: var(--ig-button-group-disabled-selected-border-color, hsl(from var(--ig-primary-400) h s l/0.5));--ig-theme: indigo;--ig-theme-variant: light}`, Ei = d`:host{--item-hover-text-color: var(--ig-button-group-item-hover-text-color, var(--ig-gray-800));--item-focused-hover-text-color: var(--ig-button-group-item-focused-hover-text-color, var(--ig-gray-800));--item-focused-hover-background: var(--ig-button-group-item-focused-hover-background, var(--ig-gray-300));--default-size: var(--ig-button-group-default-size, 3);--item-icon-color: var(--ig-button-group-item-icon-color, var(--ig-gray-700));--item-hover-icon-color: var(--ig-button-group-item-hover-icon-color, var(--ig-gray-800));--item-hover-border-color: var(--ig-button-group-item-hover-border-color, var(--ig-gray-400));--item-focused-background: var(--ig-button-group-item-focused-background, var(--ig-gray-200));--item-selected-text-color: var(--ig-button-group-item-selected-text-color, var(--ig-gray-800));--item-selected-icon-color: var(--ig-button-group-item-selected-icon-color, var(--ig-gray-800));--item-selected-background: var(--ig-button-group-item-selected-background, var(--ig-gray-200));--item-selected-border-color: var(--ig-button-group-item-selected-border-color, var(--ig-gray-500));--item-selected-hover-border-color: var(--ig-button-group-item-selected-hover-border-color, var(--ig-gray-500));--item-selected-hover-background: var(--ig-button-group-item-selected-hover-background, var(--ig-gray-300));--item-active-background: var(--ig-button-group-item-active-background, var(--ig-gray-400));--disabled-text-color: var(--ig-button-group-disabled-text-color, var(--ig-gray-400));--item-disabled-border: var(--ig-button-group-item-disabled-border, var(--ig-gray-400));--disabled-selected-text-color: var(--ig-button-group-disabled-selected-text-color, var(--ig-gray-400));--disabled-selected-icon-color: var(--ig-button-group-disabled-selected-icon-color, var(--ig-gray-400));--disabled-selected-background: var(--ig-button-group-disabled-selected-background, var(--ig-gray-100));--disabled-selected-border-color: var(--ig-button-group-disabled-selected-border-color, var(--ig-gray-400));--ig-theme: material;--ig-theme-variant: light}`, Di = d`:host{--elevation: var(--ig-button-group-elevation, var(--ig-elevation-2));--idle-shadow-color: var(--ig-button-group-idle-shadow-color, transparent);--selected-shadow-color: var(--ig-button-group-selected-shadow-color, transparent);--item-text-color: var(--ig-button-group-item-text-color, var(--ig-gray-700));--item-background: var(--ig-button-group-item-background, var(--ig-gray-50));--item-border-color: var(--ig-button-group-item-border-color, var(--ig-gray-400));--item-hover-background: var(--ig-button-group-item-hover-background, var(--ig-gray-200));--item-hover-text-color: var(--ig-button-group-item-hover-text-color, var(--ig-gray-900));--item-focused-text-color: var(--ig-button-group-item-focused-text-color, var(--ig-gray-800));--item-focused-border-color: var(--ig-button-group-item-focused-border-color, var(--ig-gray-400));--item-focused-hover-text-color: var(--ig-button-group-item-focused-hover-text-color, var(--ig-gray-900));--item-focused-hover-border-color: var(--ig-button-group-item-focused-hover-border-color, var(--ig-gray-400));--item-focused-hover-background: var(--ig-button-group-item-focused-hover-background, var(--ig-gray-200));--item-selected-hover-text-color: var(--ig-button-group-item-selected-hover-text-color, var(--ig-gray-900));--item-selected-hover-icon-color: var(--ig-button-group-item-selected-hover-icon-color, var(--ig-gray-900));--item-selected-focus-background: var(--ig-button-group-item-selected-focus-background, var(--ig-gray-300));--item-selected-focus-hover-background: var(--ig-button-group-item-selected-focus-hover-background, var(--ig-gray-400));--item-selected-active-background: var(--ig-button-group-item-selected-active-background, var(--ig-gray-500));--item-active-border-color: var(--ig-button-group-item-active-border-color, var(--ig-gray-500));--item-selected-active-border-color: var(--ig-button-group-item-selected-active-border-color, var(--ig-gray-600));--disabled-background-color: var(--ig-button-group-disabled-background-color, var(--ig-gray-50));--border-radius: var(--ig-button-group-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.2) * 1.25rem), 1.25rem));--default-size: var(--ig-button-group-default-size, 2);--ig-theme-variant: light}`, Oi = d`:host{--component-size: var(--ig-size, var(--default-size))}`, ki = d`:host{--component-size: var(--ig-size, var(--default-size))}`, Ai = d`:host{--component-size: var(--ig-size, var(--default-size));--button-min-width: 2rem}`, ji = {
	light: {
		shared: d`
    ${Di}
  `,
		bootstrap: d`
    ${Oi} ${Ci}
  `,
		material: d`
    ${Ei}
  `,
		fluent: d`
    ${ki} ${wi}
  `,
		indigo: d`
    ${Ai} ${Ti}
  `
	},
	dark: {
		shared: d`
    ${Si}
  `,
		bootstrap: d`
    ${Oi} ${vi}
  `,
		material: d`
    ${xi}
  `,
		fluent: d`
    ${ki} ${yi}
  `,
		indigo: d`
    ${Ai} ${bi}
  `
	}
}, Mi = d`:host{--component-size: var(--ig-size, var(--default-size));--button-min-width: 2.625rem}[part~=group]{box-shadow:var(--elevation);border-radius:var(--border-radius)}:host([alignment=horizontal]){--horizontal-radius: var(--border-radius)}:host([alignment=vertical]){--vertical-radius: var(--border-radius)}`, Ni = class {
	constructor(e, t) {
		this._host = e, this._options = t, this._host.addController(this);
	}
	get value() {
		return this._consumer?.value;
	}
	async hostConnected() {
		this._consumer || (await this._host.updateComplete, this._consumer ??= new it(this._host, {
			context: this._options.context,
			callback: this._options.callback,
			subscribe: this._options.subscribe
		}));
	}
};
function Pi(e, t, n) {
	return new Ni(e, {
		context: t,
		callback: n,
		subscribe: !0
	});
}
//#endregion
//#region node_modules/igniteui-webcomponents/components/button-group/themes/button.base.css.js
var Fi = d`:host{--is-large: clamp(0, (var(--component-size, 1) + 1) - var(--ig-size-large, 3), 1);--is-medium: min( clamp(0, (var(--component-size, 1) + 1) - var(--ig-size-medium, 2), 1), clamp(0, var(--ig-size-large, 3) - var(--component-size, 1), 1) );--is-small: clamp(0, var(--ig-size-medium) - var(--component-size, 1), 1);position:relative;box-sizing:border-box;scrollbar-width:var(--ig-scrollbar-size, var(--sb-size));scrollbar-color:var(--ig-scrollbar-thumb-background, var(--sb-thumb-bg-color)) var(--ig-scrollbar-track-background, var(--sb-track-bg-color))}:host ::-webkit-scrollbar{width:var(--ig-scrollbar-size, var(--sb-size));height:var(--ig-scrollbar-size, var(--sb-size));background:var(--ig-scrollbar-track-background, var(--sb-track-bg-color))}:host ::-webkit-scrollbar-thumb{background:var(--ig-scrollbar-thumb-background, var(--sb-thumb-bg-color))}:host *,:host *::before,:host *::after{box-sizing:border-box}:host([hidden]),[hidden]{display:none !important}:host{--_toggle-button-border-size: 0.0625rem;font-family:var(--ig-button-font-family, var(--ig-font-family));font-size:var(--ig-button-font-size);font-weight:var(--ig-button-font-weight);font-style:var(--ig-button-font-style);line-height:var(--ig-button-line-height);letter-spacing:var(--ig-button-letter-spacing);text-transform:var(--ig-button-text-transform);margin-top:var(--ig-button-margin-top);margin-bottom:var(--ig-button-margin-bottom);font-family:var(--ig-font-family);display:flex;flex:1 0 0%;justify-content:center;align-items:center;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host [part~=toggle]{font-family:var(--ig-button-font-family, var(--ig-font-family));font-size:var(--ig-button-font-size);font-weight:var(--ig-button-font-weight);font-style:var(--ig-button-font-style);line-height:var(--ig-button-line-height);letter-spacing:var(--ig-button-letter-spacing);text-transform:var(--ig-button-text-transform);margin-top:var(--ig-button-margin-top);margin-bottom:var(--ig-button-margin-bottom);white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:pointer;flex:1;border-style:solid;border-width:var(--_toggle-button-border-size);box-shadow:none;background:rgba(0,0,0,0);color:inherit;max-width:100%;transition:all 140ms cubic-bezier(0.455, 0.03, 0.515, 0.955);position:relative;z-index:0;gap:max(var(--is-large, 1)*max(0.75rem, -1 * 0.75rem),var(--is-medium, 1)*max(0.5rem, -1 * 0.5rem),var(--is-small, 1)*max(0.25rem, -1 * 0.25rem))}:host [part~=toggle] ::slotted(*){max-width:100%}:host [part~=toggle] ::slotted(:not(igc-icon)){white-space:nowrap;text-overflow:ellipsis;overflow:hidden}:host(:disabled),:host([disabled]){cursor:default;pointer-events:none}:host-context(:disabled),:host-context([disabled]){cursor:default;pointer-events:none}:host(:focus-visible){outline:none}[part~=toggle]:focus-visible{outline:none}:host([selected]) [part~=toggle]{z-index:1}:host(:not(:first-child)){margin-inline-start:var(--_negative-margin-horizontal, 0);margin-block-start:var(--_negative-margin-vertical, 0)}:host(:not(:first-child) :not(:last-child)) [part~=toggle]{border-radius:0}:host(:first-child) [part~=toggle]{border-start-start-radius:var(--vertical-radius, var(--horizontal-radius, 0));border-end-start-radius:var(--horizontal-radius, 0);border-start-end-radius:var(--vertical-radius, 0)}:host(:last-child) [part~=toggle]{border-start-end-radius:var(--horizontal-radius, 0);border-end-end-radius:var(--vertical-radius, var(--horizontal-radius, 0));border-end-start-radius:var(--vertical-radius, 0)}`, Ii = d`:host{min-width:var(--button-min-width)}:host [part~=toggle]{min-height:max(var(--is-large, 1)*max(3rem, -1 * 3rem),var(--is-medium, 1)*max(2.375rem, -1 * 2.375rem),var(--is-small, 1)*max(2rem, -1 * 2rem));border-width:.0625rem;padding-block:max(var(--is-large, 1)*max(0.4375rem, -1 * 0.4375rem)*var(--ig-spacing-block-large, var(--ig-spacing-block, var(--ig-spacing))),var(--is-medium, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-block-medium, var(--ig-spacing-block, var(--ig-spacing))),var(--is-small, 1)*max(0.125rem, -1 * 0.125rem)*var(--ig-spacing-block-small, var(--ig-spacing-block, var(--ig-spacing))))}:host [part="toggle focused"]{box-shadow:0 0 0 .25rem var(--idle-shadow-color)}:host([selected]) [part="toggle focused"]{box-shadow:0 0 0 .25rem var(--selected-shadow-color)}`, Li = d`:host [part~=toggle]{min-height:max(var(--is-large, 1)*max(2.375rem, -1 * 2.375rem),var(--is-medium, 1)*max(2rem, -1 * 2rem),var(--is-small, 1)*max(1.5rem, -1 * 1.5rem));border-width:.0625rem}:host [part="toggle focused"]{border-color:var(--item-border-color)}:host [part="toggle focused"]::after{content:"";position:absolute;inset-block-start:.125rem;inset-inline-start:.125rem;pointer-events:none;width:calc(100% - 0.125rem*2);height:calc(100% - 0.125rem*2);box-shadow:0 0 0 .0625rem var(--item-focused-border-color)}`, Ri = d`:host{--button-icon: 1rem}:host [part~=toggle]{font-family:var(--ig-body-2-font-family, var(--ig-font-family));font-size:var(--ig-body-2-font-size);font-weight:var(--ig-body-2-font-weight);font-style:var(--ig-body-2-font-style);line-height:var(--ig-body-2-line-height);letter-spacing:var(--ig-body-2-letter-spacing);text-transform:var(--ig-body-2-text-transform);margin-top:var(--ig-body-2-margin-top);margin-bottom:var(--ig-body-2-margin-bottom);min-height:max(var(--is-large, 1)*max(2rem, -1 * 2rem),var(--is-medium, 1)*max(1.75rem, -1 * 1.75rem),var(--is-small, 1)*max(1.5rem, -1 * 1.5rem));border-width:.0625rem;padding-inline:max(var(--is-large, 1)*max(0.625rem, -1 * 0.625rem)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(0.5rem, -1 * 0.5rem)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(0.375rem, -1 * 0.375rem)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))))}:host ::slotted(igc-icon){--size: var(--button-icon) !important}:host [part="toggle focused"]{box-shadow:0 0 0 .1875rem var(--idle-shadow-color)}:host [part="toggle focused"] ::slotted(igc-icon){color:var(--item-icon-color)}:host(:hover) [part="toggle focused"] ::slotted(igc-icon),[part="toggle focused"]:active ::slotted(igc-icon){color:var(--item-hover-icon-color)}:host([selected]) [part="toggle focused"]{box-shadow:0 0 0 .1875rem var(--selected-shadow-color)}:host([selected]:disabled) [part~=toggle],:host([selected][disabled]) [part~=toggle]{border:none}`, zi = d`:host([selected]) [part="toggle focused"]{color:var(--item-selected-hover-text-color)}:host([selected]) [part="toggle focused"] ::slotted(igc-icon){color:var(--item-selected-hover-icon-color)}`, Bi = {
	light: {
		bootstrap: d`
    ${Ii}
  `,
		fluent: d`
    ${Li}
  `,
		indigo: d`
    ${Ri}
  `,
		material: d`
    ${zi}
  `
	},
	dark: {
		bootstrap: d`
    ${Ii}
  `,
		fluent: d`
    ${Li}
  `,
		indigo: d`
    ${Ri}
  `,
		material: d`
    ${zi}
  `
	}
}, Vi = d`:host [part~=toggle]{--ig-icon-size: 1.125rem;--igx-icon-size: 1.125rem;min-height:max(var(--is-large, 1)*max(2.25rem, -1 * 2.25rem),var(--is-medium, 1)*max(1.875rem, -1 * 1.875rem),var(--is-small, 1)*max(1.5rem, -1 * 1.5rem));min-width:var(--button-min-width);color:var(--item-text-color);background:var(--item-background);padding-inline:max(var(--is-large, 1)*max(1rem, -1 * 1rem)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(0.75rem, -1 * 0.75rem)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(0.5rem, -1 * 0.5rem)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))));padding-block:max(var(--is-large, 1)*max(0.375rem, -1 * 0.375rem)*var(--ig-spacing-block-large, var(--ig-spacing-block, var(--ig-spacing))),var(--is-medium, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-block-medium, var(--ig-spacing-block, var(--ig-spacing))),var(--is-small, 1)*max(0.0625rem, -1 * 0.0625rem)*var(--ig-spacing-block-small, var(--ig-spacing-block, var(--ig-spacing))));border-color:var(--item-border-color)}:host [part~=toggle] ::slotted(igc-icon){color:var(--item-icon-color)}:host [part="toggle focused"]{z-index:2;color:var(--item-focused-text-color);background:var(--item-focused-background);border-color:var(--item-focused-border-color)}:host [part="toggle focused"] ::slotted(igc-icon){color:var(--item-focused-text-color)}:host(:hover) [part~=toggle]{z-index:1;color:var(--item-hover-text-color);background:var(--item-hover-background);border-color:var(--item-hover-border-color)}:host(:hover) [part~=toggle] ::slotted(igc-icon){color:var(--item-hover-icon-color)}:host(:hover) [part="toggle focused"]{z-index:2;background:var(--item-focused-hover-background);border-color:var(--item-focused-hover-border-color);color:var(--item-focused-hover-text-color)}:host(:hover) [part="toggle focused"] ::slotted(igc-icon){color:var(--item-focused-hover-text-color)}:host(:active) [part~=toggle],[part~=toggle]:active{background:var(--item-active-background);border-color:var(--item-active-border-color);color:var(--item-hover-text-color)}:host(:active) [part~=toggle] ::slotted(igc-icon),[part~=toggle]:active ::slotted(igc-icon){color:var(--item-hover-icon-color)}:host(:active) [part=toggle-focused],[part="toggle focused"]:active{color:var(--item-focused-hover-text-color)}:host(:active) [part=toggle-focused] ::slotted(igc-icon),[part="toggle focused"]:active ::slotted(igc-icon){color:var(--item-focused-hover-text-color)}:host([selected]) [part~=toggle]{color:var(--item-selected-text-color);background:var(--item-selected-background);border-color:var(--item-selected-border-color);z-index:2}:host([selected]) [part~=toggle] ::slotted(igc-icon){color:var(--item-selected-icon-color)}:host([selected]) [part="toggle focused"]{background:var(--item-selected-focus-background);border-color:var(--item-selected-border-color)}:host([selected]:hover) [part~=toggle]{color:var(--item-selected-hover-text-color);background:var(--item-selected-hover-background);border-color:var(--item-selected-hover-border-color)}:host([selected]:hover) [part~=toggle] ::slotted(igc-icon){color:var(--item-selected-hover-icon-color)}:host([selected]:hover) [part="toggle focused"]{background:var(--item-selected-focus-hover-background);border-color:var(--item-selected-hover-border-color)}:host([selected]:active) [part~=toggle],:host([selected]) [part~=toggle]:active{background:var(--item-selected-active-background);color:var(--item-selected-hover-text-color);border-color:var(--item-selected-active-border-color)}:host([selected]:active) [part~=toggle] ::slotted(igc-icon),:host([selected]) [part~=toggle]:active ::slotted(igc-icon){color:var(--item-selected-hover-icon-color)}:host([disabled]) [part~=toggle],:host(:disabled) [part~=toggle]{color:var(--disabled-text-color);background:var(--disabled-background-color);border-color:var(--item-disabled-border)}:host([disabled]) ::slotted(igc-icon),:host(:disabled) ::slotted(igc-icon){color:var(--disabled-text-color)}:host-context([disabled]) [part~=toggle],:host-context(:disabled) [part~=toggle]{color:var(--disabled-text-color);background:var(--disabled-background-color);border-color:var(--item-disabled-border)}:host-context([disabled]) ::slotted(igc-icon),:host-context(:disabled) ::slotted(igc-icon){color:var(--disabled-text-color)}:host([selected]:disabled) [part~=toggle],:host([selected][disabled]) [part~=toggle]{color:var(--disabled-selected-text-color);background:var(--disabled-selected-background);border-color:var(--disabled-selected-border-color)}:host([selected]:disabled) ::slotted(igc-icon),:host([selected][disabled]) ::slotted(igc-icon){color:var(--disabled-selected-icon-color)}`, Hi = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Ui, Wi = class extends o {
	static {
		Ui = this;
	}
	static {
		this.styles = [Fi, Vi];
	}
	static {
		this.tagName = "igc-toggle-button";
	}
	static register() {
		M(Ui);
	}
	constructor() {
		super(), this._focusRingManager = zr(this), this._context = Pi(this, mi), this.selected = !1, this.disabled = !1, Tt(this, Bi);
	}
	updated(e) {
		e.has("selected") && this.selected && this._context.value?.syncSelection(this);
	}
	focus(e) {
		this._nativeButton?.focus(e);
	}
	blur() {
		this._nativeButton?.blur();
	}
	click() {
		this._nativeButton?.click();
	}
	render() {
		let e = this._context.value?.instance, t = e != null && e.selection !== "multiple", n = this.disabled || !!e?.disabled, r = this.selected ? "true" : "false";
		return c`
      <button
        part=${Lr({
			toggle: !0,
			focused: this._focusRingManager.focused
		})}
        type="button"
        role=${N(t ? "radio" : void 0)}
        ?disabled=${n}
        .ariaLabel=${this.ariaLabel}
        aria-checked=${N(t ? r : void 0)}
        aria-pressed=${N(t ? void 0 : r)}
        aria-disabled=${n}
      >
        <slot></slot>
      </button>
    `;
	}
};
Hi([Ze("[part~=\"toggle\"]", !0)], Wi.prototype, "_nativeButton", void 0), Hi([j()], Wi.prototype, "value", void 0), Hi([j({
	type: Boolean,
	reflect: !0
})], Wi.prototype, "selected", void 0), Hi([j({
	type: Boolean,
	reflect: !0
})], Wi.prototype, "disabled", void 0), Wi = Ui = Hi([Yr({ delegatesFocus: !0 })], Wi);
var Gi = Wi, Ki = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, qi = class e extends Zn(o) {
	static {
		this.tagName = "igc-button-group";
	}
	static {
		this.styles = [_i, Mi];
	}
	static register() {
		M(e, Gi);
	}
	get _buttons() {
		return this.hasUpdated ? this._slots.getAssignedElements("[default]", { selector: Gi.tagName }) : [];
	}
	get _isMultiple() {
		return this.selection === "multiple";
	}
	get _selectedButtons() {
		return this._buttons.filter((e) => e.selected);
	}
	get selectedItems() {
		return this._selectedButtons.map((e) => e.value).filter(It);
	}
	set selectedItems(e) {
		this._selectedItems = new Set(jt(e)), this._selectFromValues(this._selectedItems);
	}
	constructor() {
		super(), this._selectedItems = /* @__PURE__ */ new Set(), this._slots = Tn(this, {
			slots: En(),
			onChange: this._enforceSingleSelection
		}), this.disabled = !1, this.alignment = "horizontal", this.selection = "single", Tt(this, ji);
		let e = {
			instance: this,
			syncSelection: (e) => this._syncSelection(e)
		};
		gi(this, {
			context: mi,
			watch: ["selection", "disabled"],
			value: () => e
		});
	}
	willUpdate(e) {
		this.hasUpdated && e.has("selection") && (this._selectedItems.clear(), this._applySelection([]));
	}
	firstUpdated() {
		At(this._selectedButtons) ? this._selectFromValues(this._selectedItems) : this._enforceSingleSelection();
	}
	_applySelection(e) {
		let t = new Set(e);
		for (let e of this._buttons) e.selected = t.has(e);
	}
	_selectFromValues(e) {
		let t = this._buttons.filter((t) => e.has(t.value));
		this._applySelection(this._isMultiple ? t : t.slice(0, 1));
	}
	_enforceSingleSelection() {
		let e = this._selectedButtons;
		!this._isMultiple && e.length > 1 && this._applySelection([kt(e)]);
	}
	_syncSelection(e) {
		!this._isMultiple && this._buttons.includes(e) && this._applySelection([e]);
	}
	_handleClick(e) {
		if (this.disabled) return;
		let t = Dn(Gi.tagName, e);
		!t || !this._buttons.includes(t) || (this._isMultiple ? this._handleMultipleSelection(t) : this._handleSingleSelection(t));
	}
	_handleSingleSelection(e) {
		let t = this._selectedButtons.at(0);
		if (t === e) {
			this.selection !== "single-required" && this._emitDeselectEvent(e);
			return;
		}
		t && this._emitDeselectEvent(t), this._emitSelectEvent(e);
	}
	_handleMultipleSelection(e) {
		e.selected ? this._emitDeselectEvent(e) : this._emitSelectEvent(e);
	}
	_emitSelectEvent(e) {
		e.selected = !0, this.emitEvent("igcSelect", { detail: e.value });
	}
	_emitDeselectEvent(e) {
		e.selected = !1, this.emitEvent("igcDeselect", { detail: e.value });
	}
	render() {
		return c`
      <div
        part="group"
        role=${this._isMultiple ? "group" : "radiogroup"}
        aria-disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot></slot>
      </div>
    `;
	}
};
Ki([j({
	type: Boolean,
	reflect: !0
})], qi.prototype, "disabled", void 0), Ki([j({ reflect: !0 })], qi.prototype, "alignment", void 0), Ki([j({ reflect: !1 })], qi.prototype, "selection", void 0), Ki([j({
	attribute: "selected-items",
	type: Array,
	reflect: !1
})], qi.prototype, "selectedItems", null);
//#endregion
//#region ../../node_modules/lit-html/directives/style-map.js
var Ji = "important", Yi = " !" + Ji, Xi = p(class extends m {
	constructor(e) {
		if (super(e), e.type !== f.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
	}
	render(e) {
		return Object.keys(e).reduce((t, n) => {
			let r = e[n];
			return r == null ? t : t + `${n = n.includes("-") ? n : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
		}, "");
	}
	update(e, [t]) {
		let { style: r } = e.element;
		if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
		for (let e of this.ft) t[e] ?? (this.ft.delete(e), e.includes("-") ? r.removeProperty(e) : r[e] = null);
		for (let e in t) {
			let n = t[e];
			if (n != null) {
				this.ft.add(e);
				let t = typeof n == "string" && n.endsWith(Yi);
				e.includes("-") || t ? r.setProperty(e, t ? n.slice(0, -11) : n, t ? Ji : "") : r[e] = n;
			}
		}
		return n;
	}
}), Zi = {
	duration: 350,
	easing: Jn.Sine
}, Qi = (e = Zi) => Xn([{ opacity: 1 }, { opacity: 0 }], e);
//#endregion
//#region node_modules/igniteui-webcomponents/internals/timing.js
function $i(e, t = 0) {
	let n;
	return {
		get active() {
			return n !== void 0;
		},
		start(r = t) {
			clearTimeout(n), n = setTimeout(() => {
				n = void 0, e();
			}, r);
		},
		stop() {
			clearTimeout(n), n = void 0;
		}
	};
}
//#endregion
//#region node_modules/igniteui-webcomponents/animations/presets/scale/index.js
var ea = {
	duration: 350,
	easing: Jn.Quad
}, ta = (e = ea) => Xn([{
	transform: "scale(0)",
	opacity: 0
}, {
	transform: "scale(1)",
	opacity: 1
}], e);
//#endregion
//#region node_modules/igniteui-webcomponents/internals/decorators/coerced-property.js
function na(e) {
	let { transform: t, onChange: n } = e;
	return (e, r) => {
		let i = Object.getOwnPropertyDescriptor(e, r), a = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakSet(), s = i?.get ?? function() {
			return a.get(this);
		}, c = i?.set ?? function(e) {
			a.set(this, e);
		};
		Object.defineProperty(e, r, {
			get() {
				return s.call(this);
			},
			set(e) {
				let r = !o.has(this);
				o.add(this);
				let i = r ? void 0 : s.call(this), a = t ? t({
					value: e,
					host: this,
					previous: i
				}) : e;
				c.call(this, a), r || n?.({
					value: a,
					host: this,
					previous: i
				});
			},
			configurable: !0,
			enumerable: !0
		});
	};
}
//#endregion
//#region ../../node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var L = Math.min, R = Math.max, ra = Math.round, ia = Math.floor, z = (e) => ({
	x: e,
	y: e
}), aa = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function oa(e, t, n) {
	return R(e, L(t, n));
}
function B(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function V(e) {
	return e.split("-")[0];
}
function sa(e) {
	return e.split("-")[1];
}
function ca(e) {
	return e === "x" ? "y" : "x";
}
function la(e) {
	return e === "y" ? "height" : "width";
}
function H(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function ua(e) {
	return ca(H(e));
}
function da(e, t, n) {
	n === void 0 && (n = !1);
	let r = sa(e), i = ua(e), a = la(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = ba(o)), [o, ba(o)];
}
function fa(e) {
	let t = ba(e);
	return [
		pa(e),
		t,
		pa(t)
	];
}
function pa(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var ma = ["left", "right"], ha = ["right", "left"], ga = ["top", "bottom"], _a = ["bottom", "top"];
function va(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? ha : ma : t ? ma : ha;
		case "left":
		case "right": return t ? ga : _a;
		default: return [];
	}
}
function ya(e, t, n, r) {
	let i = sa(e), a = va(V(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(pa)))), a;
}
function ba(e) {
	let t = V(e);
	return aa[t] + e.slice(t.length);
}
function xa(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Sa(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : xa(e);
}
function U(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region ../../node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Ca(e, t, n) {
	let { reference: r, floating: i } = e, a = H(t), o = ua(t), s = la(o), c = V(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = sa(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function wa(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = B(t, e), p = Sa(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = U(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = U(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Ta = 50, Ea = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: wa
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Ca(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Ta && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Ca(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Da = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = B(e, t) || {};
		if (l == null) return {};
		let d = Sa(u), f = {
			x: n,
			y: r
		}, p = ua(i), m = la(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, ee = L(d[_], T), te = L(d[v], T), ne = C - h[m] - te, E = C / 2 - h[m] / 2 + w, re = oa(ee, E, ne), ie = !c.arrow && sa(i) != null && E !== re && a.reference[m] / 2 - (E < ee ? ee : te) - h[m] / 2 < 0, ae = ie ? E < ee ? E - ee : E - ne : 0;
		return {
			[p]: f[p] + ae,
			data: {
				[p]: re,
				centerOffset: E - re - ae,
				...ie && { alignmentOffset: ae }
			},
			reset: ie
		};
	}
}), Oa = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = B(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = V(r), _ = H(o), v = V(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [ba(o)] : fa(o)), x = p !== "none";
			!d && x && b.push(...ya(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = da(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== H(t)) || T.every((e) => H(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = H(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement":
						n = o;
						break;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function ka(e) {
	let t = L(...e.map((e) => e.left)), n = L(...e.map((e) => e.top)), r = R(...e.map((e) => e.right)), i = R(...e.map((e) => e.bottom));
	return {
		x: t,
		y: n,
		width: r - t,
		height: i - n
	};
}
function Aa(e) {
	let t = e.slice().sort((e, t) => e.y - t.y), n = [], r = null;
	for (let e = 0; e < t.length; e++) {
		let i = t[e];
		!r || i.y - r.y > r.height / 2 ? n.push([i]) : n[n.length - 1].push(i), r = i;
	}
	return n.map((e) => U(ka(e)));
}
var ja = function(e) {
	return e === void 0 && (e = {}), {
		name: "inline",
		options: e,
		async fn(t) {
			let { placement: n, elements: r, rects: i, platform: a, strategy: o } = t, { padding: s = 2, x: c, y: l } = B(e, t), u = Array.from(await (a.getClientRects == null ? void 0 : a.getClientRects(r.reference)) || []);
			if (!u.length) return {};
			let d = Aa(u), f = U(ka(u)), p = Sa(s);
			function m() {
				if (d.length === 2 && (d[0].left > d[1].right || d[1].left > d[0].right) && c != null && l != null) return d.find((e) => c > e.left - p.left && c < e.right + p.right && l > e.top - p.top && l < e.bottom + p.bottom) || f;
				if (d.length >= 2) {
					if (H(n) === "y") {
						let e = d[0], t = d[d.length - 1], r = V(n) === "top", i = e.top, a = t.bottom, o = r ? e.left : t.left;
						return U({
							x: o,
							y: i,
							width: (r ? e.right : t.right) - o,
							height: a - i
						});
					}
					let e = V(n) === "left", t = R(...d.map((e) => e.right)), r = L(...d.map((e) => e.left)), i = d.filter((n) => e ? n.left === r : n.right === t), a = i[0].top, o = i[i.length - 1].bottom;
					return U({
						x: r,
						y: a,
						width: t - r,
						height: o - a
					});
				}
				return f;
			}
			let h = await a.getElementRects({
				reference: { getBoundingClientRect: m },
				floating: r.floating,
				strategy: o
			});
			return i.reference.x !== h.reference.x || i.reference.y !== h.reference.y || i.reference.width !== h.reference.width || i.reference.height !== h.reference.height ? { reset: { rects: h } } : {};
		}
	};
}, Ma = /* @__PURE__ */ new Set(["left", "top"]);
async function Na(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = V(n), s = sa(n), c = H(n) === "y", l = Ma.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = B(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Pa = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Na(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Fa = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = B(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = H(i), p = ca(f), m = u[p], h = u[f], g = (e, t) => oa(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, Ia = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = B(e, t), u = {
				x: n,
				y: r
			}, d = H(i), f = ca(d), p = u[f], m = u[d], h = B(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Ma.has(V(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, La = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = B(e, t), c = await i.detectOverflow(t, s), l = V(n), u = sa(n), d = H(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = L(p - c[m], g), y = L(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * R(c.left, c.right) : S = p - 2 * R(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region ../../node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Ra() {
	return typeof window < "u";
}
function za(e) {
	return Ba(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function W(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function G(e) {
	return ((Ba(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Ba(e) {
	return Ra() ? e instanceof Node || e instanceof W(e).Node : !1;
}
function K(e) {
	return Ra() ? e instanceof Element || e instanceof W(e).Element : !1;
}
function Va(e) {
	return Ra() ? e instanceof HTMLElement || e instanceof W(e).HTMLElement : !1;
}
function Ha(e) {
	return !Ra() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof W(e).ShadowRoot;
}
function Ua(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = q(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Wa(e) {
	return /^(table|td|th)$/.test(za(e));
}
function Ga(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Ka = /transform|translate|scale|rotate|perspective|filter/, qa = /paint|layout|strict|content/, Ja = (e) => !!e && e !== "none", Ya;
function Xa(e) {
	let t = K(e) ? q(e) : e;
	return Ja(t.transform) || Ja(t.translate) || Ja(t.scale) || Ja(t.rotate) || Ja(t.perspective) || !Qa() && (Ja(t.backdropFilter) || Ja(t.filter)) || Ka.test(t.willChange || "") || qa.test(t.contain || "");
}
function Za(e) {
	let t = to(e);
	for (; Va(t) && !$a(t);) {
		if (Xa(t)) return t;
		if (Ga(t)) return null;
		t = to(t);
	}
	return null;
}
function Qa() {
	return Ya ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Ya;
}
function $a(e) {
	return /^(html|body|#document)$/.test(za(e));
}
function q(e) {
	return W(e).getComputedStyle(e);
}
function eo(e) {
	return K(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function to(e) {
	if (za(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Ha(e) && e.host || G(e);
	return Ha(t) ? t.host : t;
}
function no(e) {
	let t = to(e);
	return $a(t) ? (e.ownerDocument || e).body : Va(t) && Ua(t) ? t : no(t);
}
function ro(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = no(e), i = r === e.ownerDocument?.body, a = W(r);
	if (i) {
		let e = io(a);
		return t.concat(a, a.visualViewport || [], Ua(r) ? r : [], e && n ? ro(e) : []);
	} else return t.concat(r, ro(r, [], n));
}
function io(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region ../../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function ao(e) {
	let t = q(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Va(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = ra(n) !== a || ra(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function oo(e) {
	return K(e) ? e : e.contextElement;
}
function so(e) {
	let t = oo(e);
	if (!Va(t)) return z(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = ao(t), o = (a ? ra(n.width) : n.width) / r, s = (a ? ra(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var co = /* @__PURE__ */ z(0);
function lo(e) {
	let t = W(e);
	return !Qa() || !t.visualViewport ? co : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function uo(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === W(e);
}
function fo(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = oo(e), o = z(1);
	t && (r ? K(r) && (o = so(r)) : o = so(e));
	let s = uo(a, n, r) ? lo(a) : z(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = W(a), t = K(r) ? W(r) : r, n = e, i = io(n);
		for (; i && t !== n;) {
			let e = so(i), t = i.getBoundingClientRect(), r = q(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = W(i), i = io(n);
		}
	}
	return U({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function po(e, t) {
	let n = eo(e).scrollLeft;
	return t ? t.left + n : fo(G(e)).left + n;
}
function mo(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - po(e, n),
		y: n.top + t.scrollTop
	};
}
function ho(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = G(r), s = t ? Ga(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = z(1), u = z(0), d = Va(r);
	if ((d || !a) && ((za(r) !== "body" || Ua(o)) && (c = eo(r)), d)) {
		let e = fo(r);
		l = so(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? mo(o, c) : z(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function go(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function _o(e) {
	let t = eo(e), n = e.ownerDocument.body, r = R(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = R(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + po(e), o = -t.scrollTop;
	return q(n).direction === "rtl" && (a += R(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var vo = 25;
function yo(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = W(e), a = G(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Qa() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (po(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= vo && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function bo(e, t) {
	let n = fo(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = so(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function xo(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = yo(e, n, t);
	else if (t === "document") r = _o(G(e));
	else if (K(t)) r = bo(t, n);
	else {
		let n = lo(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return U(r);
}
function So(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = ro(e, [], !1).filter((e) => K(e) && za(e) !== "body"), i = null, a = q(e).position === "fixed", o = a ? to(e) : e;
	for (; K(o) && !$a(o);) {
		let e = q(o), t = Xa(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = to(o);
	}
	return t.set(e, r), r;
}
function Co(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Ga(t) ? [] : So(t, this._c) : [].concat(n), r], o = xo(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = xo(t, a[e], i);
		s = R(n.top, s), c = L(n.right, c), l = L(n.bottom, l), u = R(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function wo(e) {
	let { width: t, height: n } = ao(e);
	return {
		width: t,
		height: n
	};
}
function To(e, t, n) {
	let r = Va(t), i = G(t), a = n === "fixed", o = fo(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = z(0);
	if ((r || !a) && ((za(t) !== "body" || Ua(i)) && (s = eo(t)), r)) {
		let e = fo(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = po(i));
	let l = i && !r && !a ? mo(i, s) : z(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Eo(e) {
	return q(e).position === "static";
}
function Do(e, t) {
	if (!Va(e) || q(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return G(e) === n && (n = n.ownerDocument.body), n;
}
function Oo(e, t) {
	let n = W(e);
	if (Ga(e)) return n;
	if (!Va(e)) {
		let t = to(e);
		for (; t && !$a(t);) {
			if (K(t) && !Eo(t)) return t;
			t = to(t);
		}
		return n;
	}
	let r = Do(e, t);
	for (; r && Wa(r) && Eo(r);) r = Do(r, t);
	return r && $a(r) && Eo(r) && !Xa(r) ? n : r || Za(e) || n;
}
var ko = async function(e) {
	let t = this.getOffsetParent || Oo, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: To(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Ao(e) {
	return q(e).direction === "rtl";
}
var jo = {
	convertOffsetParentRelativeRectToViewportRelativeRect: ho,
	getDocumentElement: G,
	getClippingRect: Co,
	getOffsetParent: Oo,
	getElementRects: ko,
	getClientRects: go,
	getDimensions: wo,
	getScale: so,
	isElement: K,
	isRTL: Ao
};
function Mo(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function No(e, t, n) {
	let r = null, i, a = G(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = ia(d), h = ia(a.clientWidth - (u + f)), g = ia(a.clientHeight - (d + p)), _ = ia(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: R(0, L(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Mo(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = W(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Po(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = oo(e), u = i || a ? [...l ? ro(l) : [], ...t ? ro(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? No(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? fo(e) : null;
	c && g();
	function g() {
		let t = fo(e);
		h && !Mo(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Fo = Pa, Io = Fa, Lo = Oa, Ro = La, zo = Da, Bo = ja, Vo = Ia, Ho = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...jo,
		...i.platform,
		_c: r
	};
	return Ea(e, t, {
		...i,
		platform: a
	});
}, Uo = d`:host{--is-large: clamp(0, (var(--component-size, 1) + 1) - var(--ig-size-large, 3), 1);--is-medium: min( clamp(0, (var(--component-size, 1) + 1) - var(--ig-size-medium, 2), 1), clamp(0, var(--ig-size-large, 3) - var(--component-size, 1), 1) );--is-small: clamp(0, var(--ig-size-medium) - var(--component-size, 1), 1);position:relative;box-sizing:border-box;scrollbar-width:var(--ig-scrollbar-size, var(--sb-size));scrollbar-color:var(--ig-scrollbar-thumb-background, var(--sb-thumb-bg-color)) var(--ig-scrollbar-track-background, var(--sb-track-bg-color))}:host ::-webkit-scrollbar{width:var(--ig-scrollbar-size, var(--sb-size));height:var(--ig-scrollbar-size, var(--sb-size));background:var(--ig-scrollbar-track-background, var(--sb-track-bg-color))}:host ::-webkit-scrollbar-thumb{background:var(--ig-scrollbar-thumb-background, var(--sb-thumb-bg-color))}:host *,:host *::before,:host *::after{box-sizing:border-box}:host([hidden]),[hidden]{display:none !important}:host{display:contents}:popover-open{overflow:visible;isolation:isolate;height:-moz-fit-content;height:fit-content;inset:unset;border:none;padding:0;background:rgba(0,0,0,0)}`, J = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Wo = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Go = Object.keys(Wo), Y = class e extends o {
	constructor() {
		super(...arguments), this._positionId = 0, this._strategy = "absolute", this._slots = Tn(this, {
			slots: En("anchor"),
			onChange: this._handleSlotChange
		}), this.arrow = null, this.arrowOffset = 0, this.inline = !1, this.flip = !1, this.offset = 0, this.open = !1, this.placement = "bottom-start", this.sameWidth = !1, this.shift = !1, this.shiftPadding = 0;
	}
	static {
		this.tagName = "igc-popover";
	}
	static {
		this.styles = Uo;
	}
	static register() {
		M(e);
	}
	update(e) {
		this.hasUpdated && (this._middleware = void 0, e.has("sameWidth") && !this.sameWidth && $t(this._container, { width: "" }), e.has("open") || e.has("anchor") ? this._setOpenState(this.open) : this.open && this._updatePosition()), super.update(e);
	}
	firstUpdated() {
		this._setOpenState(this.open);
	}
	connectedCallback() {
		super.connectedCallback(), this.hasUpdated && this._setOpenState(this.open);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._setOpenState(!1);
	}
	_handleSlotChange({ isDefault: e }) {
		e || this.anchor || this._setOpenState(this.open);
	}
	_handleToggle() {
		en(this._container) || this._clearDispose();
	}
	_resolveTarget() {
		return Rt(this.anchor) ? Jt(this, this.anchor) ?? this._target : this.anchor ?? Ot(this._slots.getAssignedElements("anchor", { flatten: !0 }));
	}
	_setOpenState(e) {
		this._clearDispose(), e && (this._target = this._resolveTarget(), this._target && (this._strategy = tn(this._target) ? "fixed" : "absolute", this._dispose = Po(this._target, this._container, this._updatePosition.bind(this)))), this._setPopoverState(e);
	}
	_setPopoverState(e) {
		let t = this._container;
		if (!t) return;
		let n = e && this._target != null;
		n !== en(t) && (n ? t.showPopover() : t.hidePopover());
	}
	_clearDispose() {
		this._dispose?.(), this._dispose = void 0;
	}
	get _placement() {
		return this.placement ?? "bottom-start";
	}
	_createMiddleware() {
		let e = this.shift ? Io({
			padding: this.shiftPadding,
			limiter: Vo()
		}) : null, t = this.flip ? Lo() : null, n = this._placement.includes("-") ? [t, e] : [e, t];
		return [
			this.offset === 0 ? null : Fo(this.offset),
			this.inline ? Bo() : null,
			...n,
			this.sameWidth ? Ro({ apply: ({ rects: e }) => $t(this._container, { width: `${e.reference.width}px` }) }) : null,
			this.arrow ? zo({ element: this.arrow }) : null
		].filter((e) => e !== null);
	}
	async _updatePosition() {
		if (!this.open) return;
		if (!this._target?.isConnected) {
			this._target = void 0, this._clearDispose(), this._setPopoverState(!1);
			return;
		}
		let e = ++this._positionId, t = this._strategy, { x: n, y: r, middlewareData: i, placement: a } = await Ho(this._target, this._container, {
			placement: this._placement,
			middleware: this._middleware ??= this._createMiddleware(),
			strategy: t
		});
		e !== this._positionId || !this.open || ($t(this._container, {
			position: t,
			left: "0",
			top: "0",
			transform: `translate(${Qt(n)}px,${Qt(r)}px)`
		}), this._updateArrowPosition(a, i));
	}
	_updateArrowPosition(e, t) {
		let n = this.arrow;
		if (!(t.arrow && n)) return;
		let { x: r, y: i } = t.arrow, a = this.arrowOffset, [o] = e.split("-"), s = Wo[o];
		n.part.contains(o) || (n.part.remove(...Go), n.part.add(o));
		let c = s === "top" || s === "bottom" ? n.offsetHeight : n.offsetWidth, l = {
			top: i == null ? "" : `${Qt(i + a)}px`,
			right: "",
			bottom: "",
			left: r == null ? "" : `${Qt(r + a)}px`
		};
		l[s] = `${-c}px`, $t(n, l);
	}
	render() {
		return c`
      <slot name="anchor"></slot>
      <div
        id="container"
        part="container"
        popover="manual"
        @toggle=${this._handleToggle}
      >
        <slot></slot>
      </div>
    `;
	}
};
J([Ze("#container", !0)], Y.prototype, "_container", void 0), J([j()], Y.prototype, "anchor", void 0), J([j({ attribute: !1 })], Y.prototype, "arrow", void 0), J([j({
	type: Number,
	attribute: "arrow-offset"
})], Y.prototype, "arrowOffset", void 0), J([j({
	type: Boolean,
	reflect: !0
})], Y.prototype, "inline", void 0), J([j({
	type: Boolean,
	reflect: !0
})], Y.prototype, "flip", void 0), J([j({ type: Number })], Y.prototype, "offset", void 0), J([j({
	type: Boolean,
	reflect: !0
})], Y.prototype, "open", void 0), J([j()], Y.prototype, "placement", void 0), J([j({
	type: Boolean,
	reflect: !0,
	attribute: "same-width"
})], Y.prototype, "sameWidth", void 0), J([j({
	type: Boolean,
	reflect: !0
})], Y.prototype, "shift", void 0), J([j({
	type: Number,
	attribute: "shift-padding"
})], Y.prototype, "shiftPadding", void 0);
var Ko = new class {
	constructor() {
		this._collection = /* @__PURE__ */ new Map();
	}
	_syncListener() {
		At(this._collection) ? globalThis.removeEventListener("keydown", this) : globalThis.addEventListener("keydown", this);
	}
	add(e, t) {
		this._collection.has(e) || (this._collection.set(e, t), this._syncListener());
	}
	remove(e) {
		this._collection.delete(e) && this._syncListener();
	}
	async handleEvent(e) {
		e.key === "Escape" && await kt(Array.from(this._collection.values()))?.();
	}
}(), qo = class e {
	static {
		this._listeners = ["pointerenter", "pointerleave"];
	}
	get open() {
		return this._open;
	}
	set open(e) {
		this._open = e, this._open ? (this._addTooltipListeners(), Ko.add(this._host, this._options.onEscape)) : (this._isTransient && (this._isTransient = !1, this.setAnchor(this._initialAnchor?.deref())), this._hostAbortHandle.abort(), Ko.remove(this._host));
	}
	get anchor() {
		return this._anchor?.deref();
	}
	get hideTriggers() {
		return Array.from(this._hideTriggers).join();
	}
	set hideTriggers(e) {
		this._hideTriggers = Xo(e), this._anchorAbortHandle.abort(), this._addAnchorListeners();
	}
	get showTriggers() {
		return Array.from(this._showTriggers).join();
	}
	set showTriggers(e) {
		this._showTriggers = Xo(e), this._anchorAbortHandle.abort(), this._addAnchorListeners();
	}
	constructor(e, t) {
		this._hostAbortHandle = Dt(), this._anchorAbortHandle = Dt(), this._showTriggers = new Set(["pointerenter", "focusin"]), this._hideTriggers = new Set([
			"pointerleave",
			"click",
			"focusout"
		]), this._anchor = null, this._initialAnchor = null, this._describedElement = null, this._isTransient = !1, this._open = !1, this._host = e, this._options = t, this._host.addController(this);
	}
	_addAnchorListeners() {
		let e = this.anchor;
		if (!e) return;
		let { signal: t } = this._anchorAbortHandle;
		for (let n of this._showTriggers) On(e, n, this, {
			passive: !0,
			signal: t
		});
		for (let n of this._hideTriggers) On(e, n, this, {
			passive: !0,
			signal: t
		});
		!this._showTriggers.has("click") && !this._hideTriggers.has("click") && On(e, "click", this, {
			passive: !0,
			signal: t
		});
	}
	_addTooltipListeners() {
		let { signal: t } = this._hostAbortHandle;
		for (let n of e._listeners) this._host.addEventListener(n, this, {
			passive: !0,
			signal: t
		});
	}
	_syncAnchorARIA() {
		let e = this.anchor, t = this._describedElement?.deref();
		t !== e && (t && this._toggleDescribedBy(t, !1), this._describedElement = e ? new WeakRef(e) : null, e && this._toggleDescribedBy(e, !0));
	}
	_toggleDescribedBy(e, t) {
		let n = this._host.id ||= Jo(), r = new Set((e.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean));
		t ? r.add(n) : r.delete(n), r.size > 0 ? e.setAttribute("aria-describedby", Array.from(r).join(" ")) : e.removeAttribute("aria-describedby");
	}
	_handleTooltipEvent(e) {
		e.type === "pointerenter" ? this._options.onShow() : e.type === "pointerleave" && this._options.onHide();
	}
	_handleAnchorEvent(e) {
		let t = this._showTriggers.has(e.type), n = this._hideTriggers.has(e.type);
		if (!(t || n)) {
			e.type === "click" && this._options.onClick();
			return;
		}
		if (t && n) {
			this._open ? this._options.onHide() : this._options.onShow();
			return;
		}
		t ? this._options.onShow() : this._options.onHide();
	}
	handleEvent(e) {
		let t = e.currentTarget;
		t === this._host ? this._handleTooltipEvent(e) : t === this._anchor?.deref() ? this._handleAnchorEvent(e) : t === this._initialAnchor?.deref() && (this._options.onReset(), this._handleAnchorEvent(e));
	}
	_dispose() {
		this._anchorAbortHandle.abort(), this._hostAbortHandle.abort(), Ko.remove(this._host), this._anchor = null, this._initialAnchor = null, this._syncAnchorARIA();
	}
	setAnchor(e, t = !1) {
		let n = Rt(e) ? Jt(this._host, e) : e;
		this._anchor?.deref() !== n && (t && this._open && this._options.onReset(), this._anchor?.deref() !== this._initialAnchor?.deref() && this._anchorAbortHandle.abort(), this._anchor = n ? new WeakRef(n) : null, this._isTransient = t, this._addAnchorListeners(), this._syncAnchorARIA());
	}
	resolveAnchor(e) {
		let t = Rt(e) ? Jt(this._host, e) : e;
		this._initialAnchor = t ? new WeakRef(t) : null, this.setAnchor(t);
	}
	hostConnected() {
		this.resolveAnchor(this._host.anchor);
	}
	hostDisconnected() {
		this._dispose();
	}
}, Jo = Ir("igc-tooltip"), Yo = /[,\s]+/;
function Xo(e) {
	return new Set((e ?? "").split(Yo).filter((e) => e.trim()));
}
function Zo(e, t) {
	return new qo(e, t);
}
//#endregion
//#region node_modules/igniteui-webcomponents/components/tooltip/themes/shared/tooltip.common.css.js
var Qo = d`[part~=base]{background:var(--background);color:var(--text-color);border-radius:var(--border-radius);box-shadow:var(--elevation)}#arrow[part~=top],#arrow[part~=bottom]{border-left:.25rem solid rgba(0,0,0,0);border-right:.25rem solid rgba(0,0,0,0)}#arrow[part~=top]{border-top:.25rem solid var(--background)}#arrow[part~=bottom]{border-bottom:.25rem solid var(--background)}#arrow[part~=left],#arrow[part~=right]{border-top:.25rem solid rgba(0,0,0,0);border-bottom:.25rem solid rgba(0,0,0,0)}#arrow[part~=left]{border-left:.25rem solid var(--background)}#arrow[part~=right]{border-right:.25rem solid var(--background)}`, $o = d`:host{--background: var(--ig-tooltip-background, hsl(from var(--ig-gray-900) h s l/0.8));--text-color: var(--ig-tooltip-text-color, var(--ig-gray-900-contrast));--ig-theme: bootstrap;--ig-theme-variant: dark}`, es = d`:host{--background: var(--ig-tooltip-background, hsl(from var(--ig-gray-900) h s l/0.8));--text-color: var(--ig-tooltip-text-color, var(--ig-gray-900-contrast));--border-radius: var(--ig-tooltip-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.125) * 1rem), 1rem));--ig-theme: fluent;--ig-theme-variant: dark}`, ts = d`:host{--elevation: var(--ig-tooltip-elevation, var(--ig-elevation-8));--background: var(--ig-tooltip-background, hsl(from var(--ig-gray-300) h s l/0.9));--text-color: var(--ig-tooltip-text-color, var(--ig-gray-50-contrast));--ig-theme: indigo;--ig-theme-variant: dark}`, ns = d`:host{--ig-theme: material;--ig-theme-variant: dark}`, rs = d`:host{--background: var(--ig-tooltip-background, hsl(from var(--ig-gray-900) h s l/0.8));--text-color: var(--ig-tooltip-text-color, var(--ig-gray-900-contrast));--ig-theme: bootstrap;--ig-theme-variant: light}`, is = d`:host{--background: var(--ig-tooltip-background, hsl(from var(--ig-gray-900) h s l/0.8));--text-color: var(--ig-tooltip-text-color, var(--ig-gray-900-contrast));--border-radius: var(--ig-tooltip-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.125) * 1rem), 1rem));--ig-theme: fluent;--ig-theme-variant: light}`, as = d`:host{--elevation: var(--ig-tooltip-elevation, var(--ig-elevation-8));--background: var(--ig-tooltip-background, hsl(from var(--ig-gray-600) h s l/0.9));--ig-theme: indigo;--ig-theme-variant: light}`, os = d`:host{--ig-theme: material;--ig-theme-variant: light}`, ss = d`:host{--elevation: var(--ig-tooltip-elevation, var(--ig-elevation-0));--background: var(--ig-tooltip-background, hsl(from var(--ig-gray-700) h s l/0.9));--text-color: var(--ig-tooltip-text-color, var(--ig-gray-700-contrast));--border-radius: var(--ig-tooltip-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.25) * 1rem), 1rem));--ig-theme-variant: light}`, cs = d`[part~=base]{font-family:var(--ig-subtitle-2-font-family, var(--ig-font-family));font-size:var(--ig-subtitle-2-font-size);font-weight:var(--ig-subtitle-2-font-weight);font-style:var(--ig-subtitle-2-font-style);line-height:var(--ig-subtitle-2-line-height);letter-spacing:var(--ig-subtitle-2-letter-spacing);text-transform:var(--ig-subtitle-2-text-transform);margin-top:var(--ig-subtitle-2-margin-top);margin-bottom:var(--ig-subtitle-2-margin-bottom)}`, ls = {
	light: {
		shared: d`
    ${ss}
  `,
		bootstrap: d`
    ${rs}
  `,
		material: d`
    ${os}
  `,
		fluent: d`
    ${is}
  `,
		indigo: d`
    ${cs} ${as}
  `
	},
	dark: {
		shared: d`
    ${ss}
  `,
		bootstrap: d`
    ${$o}
  `,
		material: d`
    ${ns}
  `,
		fluent: d`
    ${es}
  `,
		indigo: d`
    ${cs} ${ts}
  `
	}
}, us = d`:host{--is-large: clamp(0, (var(--component-size, 1) + 1) - var(--ig-size-large, 3), 1);--is-medium: min( clamp(0, (var(--component-size, 1) + 1) - var(--ig-size-medium, 2), 1), clamp(0, var(--ig-size-large, 3) - var(--component-size, 1), 1) );--is-small: clamp(0, var(--ig-size-medium) - var(--component-size, 1), 1);position:relative;box-sizing:border-box;scrollbar-width:var(--ig-scrollbar-size, var(--sb-size));scrollbar-color:var(--ig-scrollbar-thumb-background, var(--sb-thumb-bg-color)) var(--ig-scrollbar-track-background, var(--sb-track-bg-color))}:host ::-webkit-scrollbar{width:var(--ig-scrollbar-size, var(--sb-size));height:var(--ig-scrollbar-size, var(--sb-size));background:var(--ig-scrollbar-track-background, var(--sb-track-bg-color))}:host ::-webkit-scrollbar-thumb{background:var(--ig-scrollbar-thumb-background, var(--sb-thumb-bg-color))}:host *,:host *::before,:host *::after{box-sizing:border-box}:host([hidden]),[hidden]{display:none !important}:host{position:fixed;display:flex;align-items:center;text-align:center}[part~=base]{font-family:var(--ig-body-2-font-family, var(--ig-font-family));font-size:var(--ig-body-2-font-size);font-weight:var(--ig-body-2-font-weight);font-style:var(--ig-body-2-font-style);line-height:var(--ig-body-2-line-height);letter-spacing:var(--ig-body-2-letter-spacing);text-transform:var(--ig-body-2-text-transform);margin-top:var(--ig-body-2-margin-top);margin-bottom:var(--ig-body-2-margin-bottom);padding:max(var(--is-large, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-block-large, var(--ig-spacing-block, var(--ig-spacing))),var(--is-medium, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-block-medium, var(--ig-spacing-block, var(--ig-spacing))),var(--is-small, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-block-small, var(--ig-spacing-block, var(--ig-spacing)))) max(var(--is-large, 1)*max(0.5rem, -1 * 0.5rem)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(0.5rem, -1 * 0.5rem)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(0.5rem, -1 * 0.5rem)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))));font-size:.625rem;font-weight:600;line-height:1rem;text-align:start;display:flex;align-items:flex-start;gap:.5rem;position:relative}[part~=simple-text]{max-width:200px}#arrow{position:absolute;width:0;height:0}igc-popover::part(container){background-color:rgba(0,0,0,0)}slot[name=close-button] button{display:flex;align-items:center;padding:0;border:none;background:none;color:inherit;cursor:pointer}slot[name=close-button] igc-icon{--component-size: 1}@media(forced-colors: active){:host [part~=base]{border:.0625rem solid CanvasText}}`, X = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, ds = 8, Z = class e extends Zn(o) {
	static {
		this.tagName = "igc-tooltip";
	}
	static {
		this.styles = [us, Qo];
	}
	static {
		this._delay = { transform: ({ value: e }) => Math.max(0, Ft(e)) };
	}
	static register() {
		M(e, Y, P);
	}
	get _arrowOffset() {
		let [e, t] = this.placement.split("-");
		if (!t) return 0;
		let n = t === "start" ? -ds : ds;
		return e === "left" || e === "right" || Gt(this) ? n : -n;
	}
	get _hasProjectedContent() {
		return this._slots.getAssignedNodes("[default]").some((e) => Yt(e) || e.nodeType === Node.TEXT_NODE && !!e.textContent?.trim());
	}
	set open(e) {
		this._requestedState = e, this._controller.open = e;
	}
	get open() {
		return this._controller.open;
	}
	set showTriggers(e) {
		this._controller.showTriggers = e;
	}
	get showTriggers() {
		return this._controller.showTriggers;
	}
	set hideTriggers(e) {
		this._controller.hideTriggers = e;
	}
	get hideTriggers() {
		return this._controller.hideTriggers;
	}
	constructor() {
		super(), this._controller = Zo(this, {
			onShow: () => this._showOnInteraction(),
			onHide: () => this._hideOnInteraction(),
			onEscape: () => this._hideOnEscape(),
			onClick: () => this._cancelTransition(),
			onReset: () => this._cancelTransition(!1)
		}), this._containerRef = zn(), this._player = Kn(this, this._containerRef), this._slots = Tn(this, { slots: En("close-button") }), this._showAnimation = ta({
			duration: 150,
			easing: Jn.Quad
		}), this._hideAnimation = Qi({
			duration: 75,
			easing: Jn.Sine
		}), this._transitionId = 0, this._animating = !1, this._requestedState = !1, this.withArrow = !1, this.offset = 6, this.placement = "bottom", this.showDelay = 200, this.hideDelay = 300, this.message = "", this.sticky = !1, Tt(this, ls), tt(this, {
			initialARIA: {
				role: "tooltip",
				ariaAtomic: "true",
				ariaLive: "polite"
			},
			aria: () => ({ role: this.sticky ? "status" : "tooltip" })
		});
	}
	firstUpdated() {
		this.open && this.updateComplete.then(() => {
			this._player.playExclusive(this._showAnimation);
		});
	}
	updated(e) {
		e.has("withArrow") && (this._popover.arrow = this.withArrow ? this._arrowElement : null);
	}
	willUpdate(e) {
		e.has("anchor") && this._controller.resolveAnchor(this.anchor);
	}
	_emitEvent(e) {
		return this.emitEvent(e, { cancelable: e === "igcOpening" || e === "igcClosing" });
	}
	_abortTransition() {
		let e = this._animating;
		return this._transitionId++, this._animating = !1, clearTimeout(this._pending?.timer), this._pending?.resolve(!1), this._pending = void 0, e;
	}
	_settleState(e, t) {
		this._requestedState = e, t && (this._player.cancelAll(), this.inert = !1), this.open !== e && (this.open = e);
	}
	_cancelTransition(e = this.open) {
		this._settleState(e, this._abortTransition());
	}
	async _applyTooltipState({ show: e, withDelay: t = !1, withEvents: n = !1 }) {
		if (e === this._requestedState) return !1;
		let r = this._abortTransition();
		if (this._requestedState = e, e === this.open && !r) return !1;
		if (n && !this._emitEvent(e ? "igcOpening" : "igcClosing")) return this._settleState(!e, r), !1;
		let i = this._transitionId, a = async () => {
			e && (this.open = !0), this.inert = !0, this._animating = !0;
			let t = await this._player.playExclusive(e ? this._showAnimation : this._hideAnimation);
			return i === this._transitionId ? (this._animating = !1, this.inert = !1, this.open = e, t && n && this._emitEvent(e ? "igcOpened" : "igcClosed"), t) : !1;
		};
		return t ? new Promise((t) => {
			this._pending = {
				timer: setTimeout(() => {
					this._pending = void 0, a().then(t);
				}, e ? this.showDelay : this.hideDelay),
				resolve: t
			};
		}) : a();
	}
	async show(e) {
		return e && (this._cancelTransition(), this._controller.setAnchor(e, !0)), await this._applyTooltipState({ show: !0 });
	}
	async hide() {
		return await this._applyTooltipState({ show: !1 });
	}
	async toggle() {
		return await (this.open ? this.hide() : this.show());
	}
	_showWithEvent() {
		return this._applyTooltipState({
			show: !0,
			withDelay: !0,
			withEvents: !0
		});
	}
	_hideWithEvent() {
		return this._applyTooltipState({
			show: !1,
			withDelay: !0,
			withEvents: !0
		});
	}
	_showOnInteraction() {
		this._cancelTransition(), this._showWithEvent();
	}
	_hideOnInteraction() {
		this.sticky || this._hideWithEvent();
	}
	_hideOnCloseClick() {
		this._applyTooltipState({
			show: !1,
			withEvents: !0
		});
	}
	async _hideOnEscape() {
		await this.hide() && this._emitEvent("igcClosed");
	}
	render() {
		let e = {
			base: !0,
			"simple-text": !this._hasProjectedContent
		};
		return c`
      <igc-popover
        .inert=${!this.open}
        .placement=${this.placement}
        .offset=${this.offset}
        .anchor=${this._controller.anchor ?? void 0}
        .arrowOffset=${this._arrowOffset}
        .shiftPadding=${8}
        ?open=${this.open}
        flip
        shift
      >
        <div ${Hn(this._containerRef)} part=${Lr(e)}>
          <slot>${this.message}</slot>
          ${this.sticky ? c`
                  <slot name="close-button" @click=${this._hideOnCloseClick}>
                    <button
                      type="button"
                      part="close-button"
                      aria-label="Close"
                    >
                      <igc-icon
                        name="input_clear"
                        collection="default"
                        aria-hidden="true"
                      ></igc-icon>
                    </button>
                  </slot>
                ` : l}
          ${this.withArrow ? c`<div id="arrow"></div>` : l}
        </div>
      </igc-popover>
    `;
	}
};
X([Ze("igc-popover", !0)], Z.prototype, "_popover", void 0), X([Ze("#arrow")], Z.prototype, "_arrowElement", void 0), X([j({
	type: Boolean,
	reflect: !0
})], Z.prototype, "open", null), X([j({
	type: Boolean,
	reflect: !0,
	attribute: "with-arrow"
})], Z.prototype, "withArrow", void 0), X([j({ type: Number })], Z.prototype, "offset", void 0), X([j()], Z.prototype, "placement", void 0), X([j()], Z.prototype, "anchor", void 0), X([j({ attribute: "show-triggers" })], Z.prototype, "showTriggers", null), X([j({ attribute: "hide-triggers" })], Z.prototype, "hideTriggers", null), X([j({
	attribute: "show-delay",
	type: Number
}), na(Z._delay)], Z.prototype, "showDelay", void 0), X([j({
	attribute: "hide-delay",
	type: Number
}), na(Z._delay)], Z.prototype, "hideDelay", void 0), X([j()], Z.prototype, "message", void 0), X([j({
	type: Boolean,
	reflect: !0
})], Z.prototype, "sticky", void 0);
//#endregion
//#region node_modules/igniteui-webcomponents/internals/mixins/forms/types.js
var fs = "igc-form-internal-invalid", ps = "igc-form-internal-reset", ms = d`:host{--input-prefix-background: var(--ig-input-group-input-prefix-background, var(--ig-gray-300));--input-prefix-color: var(--ig-input-group-input-prefix-color, var(--ig-gray-800));--input-prefix-background--filled: var(--ig-input-group-input-prefix-background--filled, var(--ig-gray-300));--input-prefix-background--focused: var(--ig-input-group-input-prefix-background--focused, var(--ig-gray-300));--input-suffix-background: var(--ig-input-group-input-suffix-background, var(--ig-gray-300));--input-suffix-color: var(--ig-input-group-input-suffix-color, var(--ig-gray-800));--input-suffix-background--filled: var(--ig-input-group-input-suffix-background--filled, var(--ig-gray-300));--input-suffix-background--focused: var(--ig-input-group-input-suffix-background--focused, var(--ig-gray-300));--disabled-text-color: var(--ig-input-group-disabled-text-color, var(--ig-gray-400));--focused-secondary-color: var(--ig-input-group-focused-secondary-color, hsl(from var(--ig-primary-500) h s l/0.38));--border-disabled-background: var(--ig-input-group-border-disabled-background, var(--ig-gray-100));--disabled-placeholder-color: var(--ig-input-group-disabled-placeholder-color, var(--ig-gray-400));--size: var(--ig-input-group-size, max(var(--is-large, 1) * max(3rem, -1 * 3rem), var(--is-medium, 1) * max(2.375rem, -1 * 2.375rem), var(--is-small, 1) * max(2rem, -1 * 2rem)));--search-resting-elevation: var(--ig-input-group-search-resting-elevation, var(--ig-elevation-0));--search-hover-elevation: var(--ig-input-group-search-hover-elevation, var(--ig-elevation-0));--search-disabled-elevation: var(--ig-input-group-search-disabled-elevation, var(--ig-elevation-0));--ig-theme: bootstrap;--ig-theme-variant: dark}`, hs = d`:host{--input-prefix-background: var(--ig-input-group-input-prefix-background, var(--ig-gray-50));--input-prefix-color: var(--ig-input-group-input-prefix-color, var(--ig-gray-400));--input-prefix-background--filled: var(--ig-input-group-input-prefix-background--filled, var(--ig-gray-50));--input-prefix-color--filled: var(--ig-input-group-input-prefix-color--filled, var(--ig-gray-400));--input-prefix-background--focused: var(--ig-input-group-input-prefix-background--focused, var(--ig-gray-50));--input-prefix-color--focused: var(--ig-input-group-input-prefix-color--focused, var(--ig-gray-400));--input-suffix-background: var(--ig-input-group-input-suffix-background, var(--ig-gray-50));--input-suffix-color: var(--ig-input-group-input-suffix-color, var(--ig-gray-400));--input-suffix-background--filled: var(--ig-input-group-input-suffix-background--filled, var(--ig-gray-50));--input-suffix-color--filled: var(--ig-input-group-input-suffix-color--filled, var(--ig-gray-400));--input-suffix-background--focused: var(--ig-input-group-input-suffix-background--focused, var(--ig-gray-50));--input-suffix-color--focused: var(--ig-input-group-input-suffix-color--focused, var(--ig-gray-400));--idle-text-color: var(--ig-input-group-idle-text-color, var(--ig-gray-900));--disabled-text-color: var(--ig-input-group-disabled-text-color, var(--ig-gray-300));--idle-secondary-color: var(--ig-input-group-idle-secondary-color, var(--ig-gray-800));--disabled-border-color: var(--ig-input-group-disabled-border-color, var(--ig-gray-100));--hover-border-color: var(--ig-input-group-hover-border-color, var(--ig-gray-800));--border-disabled-background: var(--ig-input-group-border-disabled-background, var(--ig-gray-100));--placeholder-color: var(--ig-input-group-placeholder-color, var(--ig-gray-400));--hover-placeholder-color: var(--ig-input-group-hover-placeholder-color, var(--ig-gray-400));--disabled-placeholder-color: var(--ig-input-group-disabled-placeholder-color, var(--ig-gray-300));--box-background: var(--ig-input-group-box-background, var(--ig-gray-100));--box-border-radius: var(--ig-input-group-box-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--border-border-radius: var(--ig-input-group-border-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--search-border-radius: var(--ig-input-group-search-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--size: var(--ig-input-group-size, max(var(--is-large, 1) * max(3rem, -1 * 3rem), var(--is-medium, 1) * max(2.5rem, -1 * 2.5rem), var(--is-small, 1) * max(2rem, -1 * 2rem)));--search-resting-elevation: var(--ig-input-group-search-resting-elevation, var(--ig-elevation-0));--search-hover-elevation: var(--ig-input-group-search-hover-elevation, var(--ig-elevation-0));--search-disabled-elevation: var(--ig-input-group-search-disabled-elevation, var(--ig-elevation-0));--ig-theme: fluent;--ig-theme-variant: dark}`, gs = d`:host{--helper-text-color: var(--ig-input-group-helper-text-color, hsl(from var(--ig-gray-50-contrast) h s l/0.8));--text-error-color: var(--ig-input-group-text-error-color, hsl(from var(--ig-gray-50-contrast) h s l/0.8));--input-prefix-color: var(--ig-input-group-input-prefix-color, hsl(from var(--ig-gray-50-contrast) h s l/0.6));--input-prefix-color--filled: var(--ig-input-group-input-prefix-color--filled, hsl(from var(--ig-gray-50-contrast) h s l/0.6));--input-prefix-color--focused: var(--ig-input-group-input-prefix-color--focused, hsl(from var(--ig-gray-50-contrast) h s l/0.6));--input-suffix-color: var(--ig-input-group-input-suffix-color, hsl(from var(--ig-gray-50-contrast) h s l/0.6));--input-suffix-color--filled: var(--ig-input-group-input-suffix-color--filled, hsl(from var(--ig-gray-50-contrast) h s l/0.6));--input-suffix-color--focused: var(--ig-input-group-input-suffix-color--focused, hsl(from var(--ig-gray-50-contrast) h s l/0.6));--idle-text-color: var(--ig-input-group-idle-text-color, hsl(from var(--ig-gray-50-contrast) h s l/0.8));--filled-text-color: var(--ig-input-group-filled-text-color, hsl(from var(--ig-gray-50-contrast) h s l/0.8));--filled-text-hover-color: var(--ig-input-group-filled-text-hover-color, var(--ig-gray-50-contrast));--focused-text-color: var(--ig-input-group-focused-text-color, var(--ig-gray-50-contrast));--disabled-text-color: var(--ig-input-group-disabled-text-color, hsl(from var(--ig-gray-50-contrast) h s l/0.2));--idle-secondary-color: var(--ig-input-group-idle-secondary-color, hsl(from var(--ig-gray-50-contrast) h s l/0.6));--focused-secondary-color: var(--ig-input-group-focused-secondary-color, hsl(from var(--ig-gray-50-contrast) h s l/0.6));--idle-bottom-line-color: var(--ig-input-group-idle-bottom-line-color, hsl(from var(--ig-gray-50-contrast) h s l/0.4));--hover-bottom-line-color: var(--ig-input-group-hover-bottom-line-color, hsl(from var(--ig-gray-50-contrast) h s l/0.8));--focused-bottom-line-color: var(--ig-input-group-focused-bottom-line-color, var(--ig-primary-400));--disabled-bottom-line-color: var(--ig-input-group-disabled-bottom-line-color, hsl(from var(--ig-gray-50-contrast) h s l/0.15));--hover-border-color: var(--ig-input-group-hover-border-color, var(--ig-gray-600));--focused-border-color: var(--ig-input-group-focused-border-color, var(--ig-primary-400));--search-disabled-background: var(--ig-input-group-search-disabled-background, transparent);--placeholder-color: var(--ig-input-group-placeholder-color, hsl(from var(--ig-gray-50-contrast) h s l/0.6));--hover-placeholder-color: var(--ig-input-group-hover-placeholder-color, hsl(from var(--ig-gray-50-contrast) h s l/0.8));--disabled-placeholder-color: var(--ig-input-group-disabled-placeholder-color, hsl(from var(--ig-gray-50-contrast) h s l/0.2));--box-background: var(--ig-input-group-box-background, transparent);--box-background-hover: var(--ig-input-group-box-background-hover, hsl(from var(--ig-gray-50-contrast) h s l/0.1));--box-background-focus: var(--ig-input-group-box-background-focus, hsl(from var(--ig-gray-50-contrast) h s l/0.1));--box-disabled-background: var(--ig-input-group-box-disabled-background, transparent);--box-border-radius: var(--ig-input-group-box-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0) * 1.25rem), 1.25rem));--border-border-radius: var(--ig-input-group-border-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0) * 1.25rem), 1.25rem));--search-border-radius: var(--ig-input-group-search-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--size: var(--ig-input-group-size, max(var(--is-large, 1) * max(2rem, -1 * 2rem), var(--is-medium, 1) * max(1.75rem, -1 * 1.75rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--search-resting-elevation: var(--ig-input-group-search-resting-elevation, var(--ig-elevation-0));--search-hover-elevation: var(--ig-input-group-search-hover-elevation, var(--ig-elevation-0));--search-disabled-elevation: var(--ig-input-group-search-disabled-elevation, var(--ig-elevation-0));--ig-theme: indigo;--ig-theme-variant: dark}`, _s = d`:host{--disabled-border-color: var(--ig-input-group-disabled-border-color, var(--ig-gray-500));--border-color: var(--ig-input-group-border-color, var(--ig-gray-500));--hover-border-color: var(--ig-input-group-hover-border-color, var(--ig-gray-800));--search-background: var(--ig-input-group-search-background, var(--ig-surface-500));--search-disabled-background: var(--ig-input-group-search-disabled-background, var(--ig-surface-500));--box-background: var(--ig-input-group-box-background, hsl(from var(--ig-gray-200) h s l/0.38));--box-background-hover: var(--ig-input-group-box-background-hover, hsl(from var(--ig-gray-200) h s l/0.38));--box-background-focus: var(--ig-input-group-box-background-focus, hsl(from var(--ig-gray-300) h s l/0.38));--search-resting-elevation: var(--ig-input-group-search-resting-elevation, var(--ig-elevation-1));--search-hover-elevation: var(--ig-input-group-search-hover-elevation, var(--ig-elevation-2));--search-disabled-elevation: var(--ig-input-group-search-disabled-elevation, var(--ig-elevation-1));--ig-theme: material;--ig-theme-variant: dark}`, vs = d`:host{--helper-text-color: var(--ig-input-group-helper-text-color, var(--ig-gray-700));--text-error-color: var(--ig-input-group-text-error-color, var(--ig-error-500));--icon-error-color: var(--ig-input-group-icon-error-color, var(--ig-error-500));--input-prefix-background: var(--ig-input-group-input-prefix-background, transparent);--input-prefix-color: var(--ig-input-group-input-prefix-color, var(--ig-gray-700));--input-prefix-background--filled: var(--ig-input-group-input-prefix-background--filled, inherit);--input-prefix-color--filled: var(--ig-input-group-input-prefix-color--filled, var(--ig-gray-900));--input-prefix-background--focused: var(--ig-input-group-input-prefix-background--focused, inherit);--input-prefix-color--focused: var(--ig-input-group-input-prefix-color--focused, var(--ig-gray-900));--input-suffix-background: var(--ig-input-group-input-suffix-background, transparent);--input-suffix-color: var(--ig-input-group-input-suffix-color, var(--ig-gray-700));--input-suffix-background--filled: var(--ig-input-group-input-suffix-background--filled, inherit);--input-suffix-color--filled: var(--ig-input-group-input-suffix-color--filled, var(--ig-gray-900));--input-suffix-background--focused: var(--ig-input-group-input-suffix-background--focused, inherit);--input-suffix-color--focused: var(--ig-input-group-input-suffix-color--focused, var(--ig-gray-900));--idle-text-color: var(--ig-input-group-idle-text-color, var(--ig-gray-700));--filled-text-color: var(--ig-input-group-filled-text-color, var(--ig-gray-900));--filled-text-hover-color: var(--ig-input-group-filled-text-hover-color, var(--ig-gray-900));--focused-text-color: var(--ig-input-group-focused-text-color, var(--ig-gray-900));--disabled-text-color: var(--ig-input-group-disabled-text-color, var(--ig-gray-500));--idle-secondary-color: var(--ig-input-group-idle-secondary-color, var(--ig-gray-700));--filled-secondary-color: var(--ig-input-group-filled-secondary-color, var(--ig-gray-600));--focused-secondary-color: var(--ig-input-group-focused-secondary-color, var(--ig-primary-500));--idle-bottom-line-color: var(--ig-input-group-idle-bottom-line-color, var(--ig-gray-500));--hover-bottom-line-color: var(--ig-input-group-hover-bottom-line-color, var(--ig-gray-800));--focused-bottom-line-color: var(--ig-input-group-focused-bottom-line-color, var(--ig-primary-500));--disabled-bottom-line-color: var(--ig-input-group-disabled-bottom-line-color, var(--ig-gray-500));--disabled-border-color: var(--ig-input-group-disabled-border-color, var(--ig-gray-300));--border-color: var(--ig-input-group-border-color, var(--ig-gray-400));--hover-border-color: var(--ig-input-group-hover-border-color, var(--ig-gray-900));--focused-border-color: var(--ig-input-group-focused-border-color, var(--ig-primary-500));--border-background: var(--ig-input-group-border-background, transparent);--border-disabled-background: var(--ig-input-group-border-disabled-background, transparent);--search-background: var(--ig-input-group-search-background, transparent);--search-disabled-background: var(--ig-input-group-search-disabled-background, var(--ig-gray-100));--success-secondary-color: var(--ig-input-group-success-secondary-color, var(--ig-success-500));--warning-secondary-color: var(--ig-input-group-warning-secondary-color, var(--ig-warn-500));--error-secondary-color: var(--ig-input-group-error-secondary-color, var(--ig-error-500));--placeholder-color: var(--ig-input-group-placeholder-color, var(--ig-gray-700));--hover-placeholder-color: var(--ig-input-group-hover-placeholder-color, var(--ig-gray-700));--disabled-placeholder-color: var(--ig-input-group-disabled-placeholder-color, var(--ig-gray-500));--box-background: var(--ig-input-group-box-background, var(--ig-gray-200));--box-background-hover: var(--ig-input-group-box-background-hover, var(--ig-gray-200));--box-background-focus: var(--ig-input-group-box-background-focus, var(--ig-gray-300));--box-disabled-background: var(--ig-input-group-box-disabled-background, var(--ig-gray-100));--box-border-radius: var(--ig-input-group-box-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.2) * 1.25rem), 1.25rem));--border-border-radius: var(--ig-input-group-border-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.2) * 1.25rem), 1.25rem));--search-border-radius: var(--ig-input-group-search-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.2) * 1.25rem), 1.25rem));--success-shadow-color: var(--ig-input-group-success-shadow-color, hsl(from var(--ig-success-500) h s l/0.38));--error-shadow-color: var(--ig-input-group-error-shadow-color, hsl(from var(--ig-error-500) h s l/0.38));--size: var(--ig-input-group-size, max(var(--is-large, 1) * max(3.5rem, -1 * 3.5rem), var(--is-medium, 1) * max(3rem, -1 * 3rem), var(--is-small, 1) * max(2.5rem, -1 * 2.5rem)));--default-size: var(--ig-input-group-default-size, 2);--ig-theme-variant: light;color-scheme:dark}`, ys = d`:host{--input-prefix-background: var(--ig-input-group-input-prefix-background, var(--ig-gray-300));--input-prefix-color: var(--ig-input-group-input-prefix-color, var(--ig-gray-800));--input-prefix-background--filled: var(--ig-input-group-input-prefix-background--filled, var(--ig-gray-300));--input-prefix-background--focused: var(--ig-input-group-input-prefix-background--focused, var(--ig-gray-300));--input-suffix-background: var(--ig-input-group-input-suffix-background, var(--ig-gray-300));--input-suffix-color: var(--ig-input-group-input-suffix-color, var(--ig-gray-800));--input-suffix-background--filled: var(--ig-input-group-input-suffix-background--filled, var(--ig-gray-300));--input-suffix-background--focused: var(--ig-input-group-input-suffix-background--focused, var(--ig-gray-300));--disabled-text-color: var(--ig-input-group-disabled-text-color, var(--ig-gray-400));--focused-secondary-color: var(--ig-input-group-focused-secondary-color, hsl(from var(--ig-primary-500) h s l/0.38));--border-disabled-background: var(--ig-input-group-border-disabled-background, var(--ig-gray-100));--disabled-placeholder-color: var(--ig-input-group-disabled-placeholder-color, var(--ig-gray-400));--size: var(--ig-input-group-size, max(var(--is-large, 1) * max(3rem, -1 * 3rem), var(--is-medium, 1) * max(2.375rem, -1 * 2.375rem), var(--is-small, 1) * max(2rem, -1 * 2rem)));--search-resting-elevation: var(--ig-input-group-search-resting-elevation, var(--ig-elevation-0));--search-hover-elevation: var(--ig-input-group-search-hover-elevation, var(--ig-elevation-0));--search-disabled-elevation: var(--ig-input-group-search-disabled-elevation, var(--ig-elevation-0));--ig-theme: bootstrap;--ig-theme-variant: light}`, bs = d`:host{--input-prefix-background: var(--ig-input-group-input-prefix-background, var(--ig-gray-100));--input-prefix-background--filled: var(--ig-input-group-input-prefix-background--filled, var(--ig-gray-100));--input-prefix-color--filled: var(--ig-input-group-input-prefix-color--filled, var(--ig-gray-700));--input-prefix-background--focused: var(--ig-input-group-input-prefix-background--focused, var(--ig-gray-100));--input-prefix-color--focused: var(--ig-input-group-input-prefix-color--focused, var(--ig-gray-700));--input-suffix-background: var(--ig-input-group-input-suffix-background, var(--ig-gray-100));--input-suffix-background--filled: var(--ig-input-group-input-suffix-background--filled, var(--ig-gray-100));--input-suffix-color--filled: var(--ig-input-group-input-suffix-color--filled, var(--ig-gray-700));--input-suffix-background--focused: var(--ig-input-group-input-suffix-background--focused, var(--ig-gray-100));--input-suffix-color--focused: var(--ig-input-group-input-suffix-color--focused, var(--ig-gray-700));--idle-text-color: var(--ig-input-group-idle-text-color, var(--ig-gray-900));--idle-secondary-color: var(--ig-input-group-idle-secondary-color, var(--ig-gray-900));--disabled-border-color: var(--ig-input-group-disabled-border-color, var(--ig-gray-100));--border-color: var(--ig-input-group-border-color, var(--ig-gray-700));--border-disabled-background: var(--ig-input-group-border-disabled-background, var(--ig-gray-100));--box-border-radius: var(--ig-input-group-box-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--border-border-radius: var(--ig-input-group-border-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--search-border-radius: var(--ig-input-group-search-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--size: var(--ig-input-group-size, max(var(--is-large, 1) * max(3rem, -1 * 3rem), var(--is-medium, 1) * max(2.5rem, -1 * 2.5rem), var(--is-small, 1) * max(2rem, -1 * 2rem)));--search-resting-elevation: var(--ig-input-group-search-resting-elevation, var(--ig-elevation-0));--search-hover-elevation: var(--ig-input-group-search-hover-elevation, var(--ig-elevation-0));--search-disabled-elevation: var(--ig-input-group-search-disabled-elevation, var(--ig-elevation-0));--ig-theme: fluent;--ig-theme-variant: light}`, xs = d`:host{--input-prefix-color: var(--ig-input-group-input-prefix-color, var(--ig-gray-600));--input-prefix-color--filled: var(--ig-input-group-input-prefix-color--filled, var(--ig-gray-600));--input-prefix-color--focused: var(--ig-input-group-input-prefix-color--focused, var(--ig-gray-600));--input-suffix-color: var(--ig-input-group-input-suffix-color, var(--ig-gray-600));--input-suffix-color--filled: var(--ig-input-group-input-suffix-color--filled, var(--ig-gray-600));--input-suffix-color--focused: var(--ig-input-group-input-suffix-color--focused, var(--ig-gray-600));--idle-text-color: var(--ig-input-group-idle-text-color, var(--ig-gray-800));--filled-text-color: var(--ig-input-group-filled-text-color, var(--ig-gray-800));--disabled-text-color: var(--ig-input-group-disabled-text-color, hsl(from var(--ig-gray-900) h s l/0.2));--idle-secondary-color: var(--ig-input-group-idle-secondary-color, var(--ig-gray-600));--focused-secondary-color: var(--ig-input-group-focused-secondary-color, var(--ig-gray-600));--idle-bottom-line-color: var(--ig-input-group-idle-bottom-line-color, var(--ig-gray-400));--hover-bottom-line-color: var(--ig-input-group-hover-bottom-line-color, var(--ig-gray-600));--focused-bottom-line-color: var(--ig-input-group-focused-bottom-line-color, var(--ig-primary-400));--disabled-bottom-line-color: var(--ig-input-group-disabled-bottom-line-color, hsl(from var(--ig-gray-900) h s l/0.05));--hover-border-color: var(--ig-input-group-hover-border-color, var(--ig-gray-600));--focused-border-color: var(--ig-input-group-focused-border-color, var(--ig-primary-400));--search-disabled-background: var(--ig-input-group-search-disabled-background, transparent);--placeholder-color: var(--ig-input-group-placeholder-color, var(--ig-gray-600));--disabled-placeholder-color: var(--ig-input-group-disabled-placeholder-color, hsl(from var(--ig-gray-900) h s l/0.2));--box-background: var(--ig-input-group-box-background, transparent);--box-background-hover: var(--ig-input-group-box-background-hover, hsl(from var(--ig-gray-900) h s l/0.05));--box-background-focus: var(--ig-input-group-box-background-focus, hsl(from var(--ig-gray-900) h s l/0.05));--box-disabled-background: var(--ig-input-group-box-disabled-background, transparent);--box-border-radius: var(--ig-input-group-box-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0) * 1.25rem), 1.25rem));--border-border-radius: var(--ig-input-group-border-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0) * 1.25rem), 1.25rem));--search-border-radius: var(--ig-input-group-search-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.1) * 1.25rem), 1.25rem));--size: var(--ig-input-group-size, max(var(--is-large, 1) * max(2rem, -1 * 2rem), var(--is-medium, 1) * max(1.75rem, -1 * 1.75rem), var(--is-small, 1) * max(1.5rem, -1 * 1.5rem)));--search-resting-elevation: var(--ig-input-group-search-resting-elevation, var(--ig-elevation-0));--search-hover-elevation: var(--ig-input-group-search-hover-elevation, var(--ig-elevation-0));--search-disabled-elevation: var(--ig-input-group-search-disabled-elevation, var(--ig-elevation-0));--ig-theme: indigo;--ig-theme-variant: light}`, Ss = d`:host{--disabled-border-color: var(--ig-input-group-disabled-border-color, var(--ig-gray-500));--border-color: var(--ig-input-group-border-color, var(--ig-gray-500));--hover-border-color: var(--ig-input-group-hover-border-color, var(--ig-gray-800));--search-background: var(--ig-input-group-search-background, var(--ig-surface-500));--search-disabled-background: var(--ig-input-group-search-disabled-background, var(--ig-surface-500));--search-resting-elevation: var(--ig-input-group-search-resting-elevation, var(--ig-elevation-1));--search-hover-elevation: var(--ig-input-group-search-hover-elevation, var(--ig-elevation-2));--search-disabled-elevation: var(--ig-input-group-search-disabled-elevation, var(--ig-elevation-1));--ig-theme: material;--ig-theme-variant: light}`, Cs = d`:host{--helper-text-color: var(--ig-input-group-helper-text-color, var(--ig-gray-700));--text-error-color: var(--ig-input-group-text-error-color, var(--ig-error-500));--icon-error-color: var(--ig-input-group-icon-error-color, var(--ig-error-500));--input-prefix-background: var(--ig-input-group-input-prefix-background, transparent);--input-prefix-color: var(--ig-input-group-input-prefix-color, var(--ig-gray-700));--input-prefix-background--filled: var(--ig-input-group-input-prefix-background--filled, inherit);--input-prefix-color--filled: var(--ig-input-group-input-prefix-color--filled, var(--ig-gray-900));--input-prefix-background--focused: var(--ig-input-group-input-prefix-background--focused, inherit);--input-prefix-color--focused: var(--ig-input-group-input-prefix-color--focused, var(--ig-gray-900));--input-suffix-background: var(--ig-input-group-input-suffix-background, transparent);--input-suffix-color: var(--ig-input-group-input-suffix-color, var(--ig-gray-700));--input-suffix-background--filled: var(--ig-input-group-input-suffix-background--filled, inherit);--input-suffix-color--filled: var(--ig-input-group-input-suffix-color--filled, var(--ig-gray-900));--input-suffix-background--focused: var(--ig-input-group-input-suffix-background--focused, inherit);--input-suffix-color--focused: var(--ig-input-group-input-suffix-color--focused, var(--ig-gray-900));--idle-text-color: var(--ig-input-group-idle-text-color, var(--ig-gray-700));--filled-text-color: var(--ig-input-group-filled-text-color, var(--ig-gray-900));--filled-text-hover-color: var(--ig-input-group-filled-text-hover-color, var(--ig-gray-900));--focused-text-color: var(--ig-input-group-focused-text-color, var(--ig-gray-900));--disabled-text-color: var(--ig-input-group-disabled-text-color, var(--ig-gray-500));--idle-secondary-color: var(--ig-input-group-idle-secondary-color, var(--ig-gray-700));--filled-secondary-color: var(--ig-input-group-filled-secondary-color, var(--ig-gray-600));--focused-secondary-color: var(--ig-input-group-focused-secondary-color, var(--ig-primary-500));--idle-bottom-line-color: var(--ig-input-group-idle-bottom-line-color, var(--ig-gray-500));--hover-bottom-line-color: var(--ig-input-group-hover-bottom-line-color, var(--ig-gray-800));--focused-bottom-line-color: var(--ig-input-group-focused-bottom-line-color, var(--ig-primary-500));--disabled-bottom-line-color: var(--ig-input-group-disabled-bottom-line-color, var(--ig-gray-500));--disabled-border-color: var(--ig-input-group-disabled-border-color, var(--ig-gray-300));--border-color: var(--ig-input-group-border-color, var(--ig-gray-400));--hover-border-color: var(--ig-input-group-hover-border-color, var(--ig-gray-900));--focused-border-color: var(--ig-input-group-focused-border-color, var(--ig-primary-500));--border-background: var(--ig-input-group-border-background, transparent);--border-disabled-background: var(--ig-input-group-border-disabled-background, transparent);--search-background: var(--ig-input-group-search-background, transparent);--search-disabled-background: var(--ig-input-group-search-disabled-background, var(--ig-gray-100));--success-secondary-color: var(--ig-input-group-success-secondary-color, var(--ig-success-500));--warning-secondary-color: var(--ig-input-group-warning-secondary-color, var(--ig-warn-500));--error-secondary-color: var(--ig-input-group-error-secondary-color, var(--ig-error-500));--placeholder-color: var(--ig-input-group-placeholder-color, var(--ig-gray-700));--hover-placeholder-color: var(--ig-input-group-hover-placeholder-color, var(--ig-gray-700));--disabled-placeholder-color: var(--ig-input-group-disabled-placeholder-color, var(--ig-gray-500));--box-background: var(--ig-input-group-box-background, var(--ig-gray-200));--box-background-hover: var(--ig-input-group-box-background-hover, var(--ig-gray-200));--box-background-focus: var(--ig-input-group-box-background-focus, var(--ig-gray-300));--box-disabled-background: var(--ig-input-group-box-disabled-background, var(--ig-gray-100));--box-border-radius: var(--ig-input-group-box-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.2) * 1.25rem), 1.25rem));--border-border-radius: var(--ig-input-group-border-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.2) * 1.25rem), 1.25rem));--search-border-radius: var(--ig-input-group-search-border-radius, clamp(0rem, calc(var(--ig-radius-factor, 0.2) * 1.25rem), 1.25rem));--success-shadow-color: var(--ig-input-group-success-shadow-color, hsl(from var(--ig-success-500) h s l/0.38));--error-shadow-color: var(--ig-input-group-error-shadow-color, hsl(from var(--ig-error-500) h s l/0.38));--size: var(--ig-input-group-size, max(var(--is-large, 1) * max(3.5rem, -1 * 3.5rem), var(--is-medium, 1) * max(3rem, -1 * 3rem), var(--is-small, 1) * max(2.5rem, -1 * 2.5rem)));--default-size: var(--ig-input-group-default-size, 2);--ig-theme-variant: light;color-scheme:light}`, ws = d`:host{--component-size: var(--ig-size, var(--default-size));--input-size: var(--component-size);--font: max(var(--is-large, 1) * max(1.25rem, -1 * 1.25rem), var(--is-medium, 1) * max(1rem, -1 * 1rem), var(--is-small, 1) * max(0.875rem, -1 * 0.875rem));--input-border-color: var(--border-color);--input-height: var(--size);--affix-padding: max(var(--is-large, 1) * max(0.875rem, -1 * 0.875rem) * var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))), var(--is-medium, 1) * max(0.625rem, -1 * 0.625rem) * var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))), var(--is-small, 1) * max(0.5rem, -1 * 0.5rem) * var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))))}:host ::part(helper-text){font-family:var(--ig-body-2-font-family, var(--ig-font-family));font-size:var(--ig-body-2-font-size);font-weight:var(--ig-body-2-font-weight);font-style:var(--ig-body-2-font-style);line-height:var(--ig-body-2-line-height);letter-spacing:var(--ig-body-2-letter-spacing);text-transform:var(--ig-body-2-text-transform);margin-top:var(--ig-body-2-margin-top);margin-bottom:var(--ig-body-2-margin-bottom);grid-auto-rows:minmax(1.25rem, auto);margin-block-start:max(var(--is-large, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-block-large, var(--ig-spacing-block, var(--ig-spacing))),var(--is-medium, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-block-medium, var(--ig-spacing-block, var(--ig-spacing))),var(--is-small, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-block-small, var(--ig-spacing-block, var(--ig-spacing))))}:host [part=prefix]{border-inline-start-width:0}:host [part=suffix]{border-inline-end-width:0}[part~=container]{border-radius:var(--border-border-radius);border-style:none;grid-template-columns:auto 1fr auto}[part~=container]::after{display:none}[part~=input]{font-family:var(--ig-body-1-font-family, var(--ig-font-family));font-size:var(--ig-body-1-font-size);font-weight:var(--ig-body-1-font-weight);font-style:var(--ig-body-1-font-style);line-height:var(--ig-body-1-line-height);letter-spacing:var(--ig-body-1-letter-spacing);text-transform:var(--ig-body-1-text-transform);margin-top:var(--ig-body-1-margin-top);margin-bottom:var(--ig-body-1-margin-bottom);border-radius:var(--border-border-radius);padding-inline:max(var(--is-large, 1)*max(14px, -1 * 14px)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(10px, -1 * 10px)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(8px, -1 * 8px)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))));padding-block:max(var(--is-large, 1)*max(8px, -1 * 8px)*var(--ig-spacing-block-large, var(--ig-spacing-block, var(--ig-spacing))),var(--is-medium, 1)*max(6px, -1 * 6px)*var(--ig-spacing-block-medium, var(--ig-spacing-block, var(--ig-spacing))),var(--is-small, 1)*max(4px, -1 * 4px)*var(--ig-spacing-block-small, var(--ig-spacing-block, var(--ig-spacing))));background:rgba(0,0,0,0);box-shadow:none;z-index:1;border:1px solid var(--border-color);transition:box-shadow .15s ease-out,border .15s ease-out;grid-area:1/2;background-clip:padding-box}[part~=input],[part~=container]{height:var(--size)}[part~=input][part~=prefixed]{border-start-start-radius:0;border-end-start-radius:0}[part~=input][part~=suffixed]{border-start-end-radius:0;border-end-end-radius:0}[part~=input]::-moz-placeholder{font-family:var(--ig-body-1-font-family, var(--ig-font-family));font-size:var(--ig-body-1-font-size);font-weight:var(--ig-body-1-font-weight);font-style:var(--ig-body-1-font-style);line-height:var(--ig-body-1-line-height);letter-spacing:var(--ig-body-1-letter-spacing);text-transform:var(--ig-body-1-text-transform);margin-top:var(--ig-body-1-margin-top);margin-bottom:var(--ig-body-1-margin-bottom)}[part~=label],[part~=input]::placeholder{font-family:var(--ig-body-1-font-family, var(--ig-font-family));font-size:var(--ig-body-1-font-size);font-weight:var(--ig-body-1-font-weight);font-style:var(--ig-body-1-font-style);line-height:var(--ig-body-1-line-height);letter-spacing:var(--ig-body-1-letter-spacing);text-transform:var(--ig-body-1-text-transform);margin-top:var(--ig-body-1-margin-top);margin-bottom:var(--ig-body-1-margin-bottom)}[part~=label]{margin-block-end:.25rem;color:var(--idle-secondary-color)}[part~=label]:empty{display:none}[name=prefix]::slotted(*),[name=suffix]::slotted(*){display:inline-flex;align-items:center;width:-moz-max-content;width:max-content;height:100%}[part=prefix],[part=suffix]{position:relative;border-radius:none;min-width:auto;transition:box-shadow .15s ease-out,border .15s ease-out;font-size:var(--font)}[part=prefix] ::slotted(*),[part=suffix] ::slotted(*){color:inherit}[part=prefix]{border-start-start-radius:inherit;border-end-start-radius:inherit;grid-area:1/1;border-style:solid;border-color:var(--border-color);border-inline-start-width:1px;border-inline-end-width:0;border-block-start-width:1px;border-block-end-width:1px}[part=suffix]{border-start-end-radius:inherit;border-end-end-radius:inherit;grid-area:1/3;border-style:solid;border-color:var(--border-color);border-inline-start-width:0;border-inline-end-width:1px;border-block-start-width:1px;border-block-end-width:1px}:host(:focus-within) [part~=input]{border-color:var(--focused-border-color);box-shadow:0 0 0 .25rem var(--focused-secondary-color)}[part~=prefixed] [part=prefix] ::slotted(*),[part~=suffixed] [part=suffix] ::slotted(*){color:inherit}:host(:not([data-haspopup=dialog],[data-role=combobox])[readonly]) [part=prefix],:host(:not([data-haspopup=dialog],[data-role=combobox])[readonly]) [part=suffix],:host(:not([data-haspopup=dialog],[data-role=combobox])[readonly]) [part~=container]{background:var(--border-disabled-background)}:host(:not([disabled],[readonly]):state(ig-invalid)) [part~=input],:host(:not([disabled])[data-role=combobox]:state(ig-invalid)) [part~=input]{border-color:var(--error-secondary-color)}:host(:not([disabled],[readonly]):state(ig-invalid):focus-within) [part~=input],:host(:not([disabled])[data-role=combobox]:state(ig-invalid):focus-within) [part~=input]{box-shadow:0 0 0 .25rem var(--error-shadow-color)}:host([type=search]) [part^=container]{background:var(--search-background);box-shadow:var(--search-resting-elevation)}:host([type=search]) [part^=container]:focus-within{background:var(--search-background)}:host(:disabled) [part=prefix],:host(:disabled) [part=suffix],:host(:disabled) [part~=input],:host([disabled]) [part=prefix],:host([disabled]) [part=suffix],:host([disabled]) [part~=input]{color:var(--disabled-text-color);background:var(--border-disabled-background);border-block-color:var(--disabled-border-color)}:host(:disabled) [part=prefix],:host([disabled]) [part=prefix]{border-inline-start-color:var(--disabled-border-color)}:host(:disabled) [part=suffix],:host([disabled]) [part=suffix]{border-inline-end-color:var(--disabled-border-color)}:host(:disabled) [part~=input],:host([disabled]) [part~=input]{border-color:var(--disabled-border-color)}:host(:disabled) [part=label],:host(:disabled) ::part(helper-text),:host([disabled]) [part=label],:host([disabled]) ::part(helper-text){color:var(--disabled-text-color)}:host(:not(:disabled,[data-role=combobox])) ::slotted([slot=suffix]),:host(:not([disabled],[data-role=combobox])) ::slotted([slot=suffix]){border-inline-end:.0625rem solid var(--border-color)}:host(:not(:disabled,[data-role=combobox])) ::slotted([slot=prefix]),:host(:not([disabled],[data-role=combobox])) ::slotted([slot=prefix]){border-inline-start:.0625rem solid var(--border-color)}:host(:disabled:not([data-role=combobox])) ::slotted([slot=suffix]),:host([disabled]:not([data-role=combobox])) ::slotted([slot=suffix]){border-inline-end:.0625rem solid var(--disabled-border-color)}:host(:disabled:not([data-role=combobox])) ::slotted([slot=prefix]),:host([disabled]:not([data-role=combobox])) ::slotted([slot=prefix]){border-inline-start:.0625rem solid var(--disabled-border-color)}`, Ts = d`:host{--component-size: var(--ig-size, var(--default-size));--input-size: var(--component-size);--helper-text-top-spacer: rem(5px);--input-border-size: 0.0625rem;--affix-padding: max(var(--is-large, 1) * max(0.875rem, -1 * 0.875rem) * var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))), var(--is-medium, 1) * max(0.625rem, -1 * 0.625rem) * var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))), var(--is-small, 1) * max(0.5rem, -1 * 0.5rem) * var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))))}:host [part=prefix],:host [part=suffix]{font-size:.875rem;z-index:0}:host [part=prefix] ::slotted(*),:host [part=suffix] ::slotted(*){color:inherit}:host ::part(helper-text){margin-block-start:.3125rem;grid-auto-rows:minmax(1.125rem, auto)}:host [name=prefix]::slotted(*),:host [name=suffix]::slotted(*){display:inline-flex;align-items:center;width:-moz-max-content;width:max-content;height:100%}:host [part=prefix]{grid-area:1/1}:host [part=suffix]{grid-area:1/3}:host [part=label]{font-family:var(--ig-subtitle-2-font-family, var(--ig-font-family));font-size:var(--ig-subtitle-2-font-size);font-weight:var(--ig-subtitle-2-font-weight);font-style:var(--ig-subtitle-2-font-style);line-height:var(--ig-subtitle-2-line-height);letter-spacing:var(--ig-subtitle-2-letter-spacing);text-transform:var(--ig-subtitle-2-text-transform);margin-top:var(--ig-subtitle-2-margin-top);margin-bottom:var(--ig-subtitle-2-margin-bottom);margin-block:0 .3125rem;color:var(--idle-secondary-color)}:host [part^=container]{height:var(--size);background:var(--border-background);border:var(--input-border-size) solid rgba(0,0,0,0);border-radius:var(--border-border-radius);transition:none;grid-template-columns:auto 1fr auto}:host [part^=container]::before{content:"";position:absolute;inset:calc(var(--input-border-size)*-1);width:calc(100% + var(--input-border-size)*2);height:calc(100% + var(--input-border-size)*2);color:var(--border-color);box-shadow:inset 0 0 0 var(--input-border-size);border-radius:var(--border-border-radius);-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:none;z-index:1}:host [part^=container] [part=prefix]:first-child{border-start-start-radius:calc(var(--border-border-radius) - .0625rem);border-end-start-radius:calc(var(--border-border-radius) - .0625rem)}:host [part^=container] [part=suffix]:last-child{border-start-end-radius:calc(var(--border-border-radius) - .0625rem);border-end-end-radius:calc(var(--border-border-radius) - .0625rem)}:host [part~=input]{background:initial;font-size:.875rem;padding-inline:max(var(--is-large, 1)*max(0.5rem, -1 * 0.5rem)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(0.5rem, -1 * 0.5rem)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(0.5rem, -1 * 0.5rem)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))));max-height:100%;border:none;grid-area:1/2}:host(:not([readonly],[disabled],:focus-within):hover) [part^=container]::before{color:var(--hover-border-color);box-shadow:inset 0 0 0 var(--input-border-size)}:host([data-role=combobox][readonly]:not(:focus-within):hover) [part^=container]::before{color:var(--hover-border-color);box-shadow:inset 0 0 0 var(--input-border-size)}:host([data-haspopup=dialog]:not([readonly],[disabled],:focus-within):hover) [part^=container]::before{color:var(--hover-border-color);box-shadow:inset 0 0 0 var(--input-border-size)}:host(:not([data-haspopup=dialog],[data-role=combobox])[readonly]) [part=prefix],:host(:not([data-haspopup=dialog],[data-role=combobox])[readonly]) [part=suffix]{background:rgba(0,0,0,0)}:host(:focus-within) [part^=container]::before{color:var(--focused-border-color);box-shadow:inset 0 0 0 calc(var(--input-border-size) + 0.0625rem)}:host(:focus-within) [name=prefix]::slotted(*),:host(:focus-within) [name=suffix]::slotted(*){padding-block:max(var(--is-large, 1)*max(10px, -1 * 10px)*var(--ig-spacing-block-large, var(--ig-spacing-block, var(--ig-spacing))),var(--is-medium, 1)*max(8px, -1 * 8px)*var(--ig-spacing-block-medium, var(--ig-spacing-block, var(--ig-spacing))),var(--is-small, 1)*max(6px, -1 * 6px)*var(--ig-spacing-block-small, var(--ig-spacing-block, var(--ig-spacing))))}:host([type=search]) [part=prefix]{background:var(--ig-input-group-input-prefix-background, transparent);color:var(--ig-input-group-input-prefix-color, var(--ig-primary-500))}:host([type=search]) [part=suffix]{background:var(--ig-input-group-input-suffix-background, transparent);color:var(--ig-input-group-input-suffix-color, var(--ig-primary-500))}:host([type=search]:focus-within) [part=prefix]{display:none}:host([type=search]:focus-within) [part=suffix]{color:var(--ig-input-group-input-suffix-color--focused, var(--ig-gray-900))}:host([readonly][type=search]:focus-within) [part=suffix]{color:var(--disabled-text-color)}:host([required]) [part=label]::after{color:var(--error-secondary-color)}:host(:not([disabled],[readonly]):state(ig-invalid)) [part~=container]::before,:host(:not([disabled],[readonly]):state(ig-invalid):hover) [part~=container]::before,:host(:not([disabled])[data-role=combobox]:state(ig-invalid)) [part~=container]::before,:host(:not([disabled])[data-role=combobox]:state(ig-invalid):hover) [part~=container]::before{box-shadow:inset 0 0 0 var(--input-border-size) var(--error-secondary-color)}:host(:not([disabled],[readonly]):state(ig-invalid):focus-within) [part~=container]::before,:host(:not([disabled])[data-role=combobox]:state(ig-invalid):focus-within) [part~=container]::before{box-shadow:inset 0 0 0 calc(var(--input-border-size) + 0.0625rem) var(--error-secondary-color)}:host(:disabled) [part~=container]::before,:host([disabled]) [part~=container]::before{box-shadow:inset 0 0 0 var(--input-border-size) var(--disabled-border-color)}:host(:disabled) [part^=container],:host(:disabled) [part=prefix],:host(:disabled) [part=suffix],:host([disabled]) [part^=container],:host([disabled]) [part=prefix],:host([disabled]) [part=suffix]{background:var(--border-disabled-background)}:host(:disabled) [part=prefix],:host(:disabled) [part=suffix],:host(:disabled) [part=label],:host(:disabled) [part=label]::after,:host(:disabled) [part~=input],:host(:disabled) ::part(helper-text),:host([disabled]) [part=prefix],:host([disabled]) [part=suffix],:host([disabled]) [part=label],:host([disabled]) [part=label]::after,:host([disabled]) [part~=input],:host([disabled]) ::part(helper-text){color:var(--disabled-text-color)}`, Es = d`:host [part=suffix] ::slotted(*),:host [part=prefix] ::slotted(*){position:relative;display:inline-flex;width:-moz-max-content;width:max-content;align-items:center;height:calc(100% - 0.0625rem)}:host{--component-size: var(--ig-size, var(--default-size));--input-size: var(--component-size);--input-icon: max(var(--is-large, 1) * max(1rem, -1 * 1rem), var(--is-medium, 1) * max(1rem, -1 * 1rem), var(--is-small, 1) * max(0.875rem, -1 * 0.875rem));--affix-padding: max(var(--is-large, 1) * max(0.375rem, -1 * 0.375rem) * var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))), var(--is-medium, 1) * max(0.25rem, -1 * 0.25rem) * var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))), var(--is-small, 1) * max(0.125rem, -1 * 0.125rem) * var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))))}:host ::slotted(igc-icon){--size: var(--input-icon) !important}:host ::part(helper-text){grid-auto-rows:minmax(0.9375rem, auto)}:host [part=prefix],:host [part=suffix]{transition-duration:0ms}:host [part=prefix] ::slotted(*),:host [part=suffix] ::slotted(*){height:100%;color:inherit;transition-duration:0ms}:host [part=prefix]{border-start-start-radius:var(--box-border-radius);grid-area:1/1}:host [part=suffix]{border-start-end-radius:var(--box-border-radius);grid-area:1/3}:host [part~=label]{font-family:var(--ig-caption-font-family, var(--ig-font-family));font-size:var(--ig-caption-font-size);font-weight:var(--ig-caption-font-weight);font-style:var(--ig-caption-font-style);line-height:var(--ig-caption-line-height);letter-spacing:var(--ig-caption-letter-spacing);text-transform:var(--ig-caption-text-transform);margin-top:var(--ig-caption-margin-top);margin-bottom:var(--ig-caption-margin-bottom);color:var(--idle-secondary-color);margin-block-end:.25rem}:host [part^=container]{border-radius:var(--box-border-radius);border-end-start-radius:0;border-end-end-radius:0;border-bottom:.0625rem solid var(--idle-bottom-line-color);transition:background .25s ease-out;grid-template-columns:auto 1fr auto;height:var(--size)}:host [part^=container]::after{position:absolute;content:"";width:100%;height:.0625rem;left:0;right:0;bottom:-1px;background:var(--focused-bottom-line-color);transform:scaleY(0);transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);transform-origin:bottom center}:host [part~=input]{font-family:var(--ig-body-2-font-family, var(--ig-font-family));font-size:var(--ig-body-2-font-size);font-weight:var(--ig-body-2-font-weight);font-style:var(--ig-body-2-font-style);line-height:var(--ig-body-2-line-height);letter-spacing:var(--ig-body-2-letter-spacing);text-transform:var(--ig-body-2-text-transform);margin-top:var(--ig-body-2-margin-top);margin-bottom:var(--ig-body-2-margin-bottom);font-size:.75rem;line-height:1rem;background:initial;padding-block:.375rem;padding-inline:max(var(--is-large, 1)*max(0.375rem, -1 * 0.375rem)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(0.125rem, -1 * 0.125rem)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))));border:none;grid-area:1/2;height:calc(var(--size) - 1px)}:host [part~=input]::-moz-placeholder{font-style:italic}:host [part~=input]::placeholder{font-style:italic}:host [part~=prefixed]{padding-inline-start:0}:host [part~=suffixed]{padding-inline-end:0}:host(:not([disabled],[readonly]):hover) [part^=container],:host(:not([disabled])[readonly][data-role=combobox]:hover) [part^=container]{background:var(--box-background-hover);border-color:var(--hover-bottom-line-color)}:host(:not([disabled],[readonly]):focus-within) [part^=container],:host(:not([disabled])[readonly][data-role=combobox]:focus-within) [part^=container]{background:var(--box-background-focus);caret-color:var(--focused-bottom-line-color)}:host(:focus-within) [part=prefix],:host(:focus-within) [part=suffix]{transition-duration:.25s}:host(:focus-within) [part^=container]::after{transform:scaleY(1)}:host(:focus-within) [part=label]{color:var(--focused-secondary-color)}:host(:not([data-haspopup=dialog],[data-role=combobox],[disabled])[readonly]) [part^=container]{border-color:var(--disabled-text-color)}:host(:not([disabled],[readonly]):state(ig-invalid)) [part^=container],:host(:not([disabled],[readonly]):state(ig-invalid):hover) [part^=container],:host(:not([disabled])[data-role=combobox]:state(ig-invalid)) [part^=container]{caret-color:initial;border-color:var(--error-secondary-color)}:host(:not([disabled],[readonly]):state(ig-invalid)) [part^=container]::after,:host(:not([disabled],[readonly]):state(ig-invalid):hover) [part^=container]::after,:host(:not([disabled])[data-role=combobox]:state(ig-invalid)) [part^=container]::after{background:var(--error-secondary-color)}:host(:not([disabled],[readonly]):state(ig-invalid)) ::part(helper-text),:host(:not([disabled],[readonly]):state(ig-invalid):hover) ::part(helper-text),:host(:not([disabled])[data-role=combobox]:state(ig-invalid)) ::part(helper-text){color:var(--helper-text-color)}:host([type=search]:not([disabled])) [part^=container]{background:var(--search-background);box-shadow:var(--search-resting-elevation)}:host([type=search]:not([disabled])) [part^=container]:hover{background:var(--box-background-hover)}:host([type=search]:not([disabled])) [part^=container]:focus-within,:host([type=search]:not([disabled])) [part^=container]:focus-within:hover{background:var(--box-background-focus)}:host([type=search]:not([disabled])):focus-within [part^=container],:host([type=search]:not([disabled])):focus-within:hover [part^=container]{background:var(--box-background-focus)}:host([type=search]:not([disabled])):host [part=prefix] ::slotted(*),:host([type=search]:not([disabled])):host [part=suffix] ::slotted(*){padding-inline:max(var(--is-large, 1)*max(0.625rem, -1 * 0.625rem)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(0.5rem, -1 * 0.5rem)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(0.375rem, -1 * 0.375rem)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))))}:host([type=search]:not([disabled])) [part~=input]{padding-inline:max(var(--is-large, 1)*max(0.625rem, -1 * 0.625rem)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(0.5rem, -1 * 0.5rem)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(0.375rem, -1 * 0.375rem)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))))}:host([type=search]:not([disabled])) [part~=prefixed]{padding-inline-start:0}:host([type=search]:not([disabled])) [part~=suffixed]{padding-inline-end:0}:host(:disabled) [part^=container],:host([disabled]) [part^=container]{border-color:var(--disabled-bottom-line-color)}:host(:disabled) [part=prefix],:host(:disabled) [part=suffix],:host(:disabled) [part=label],:host(:disabled) [part~=input],:host(:disabled) ::part(helper-text),:host([disabled]) [part=prefix],:host([disabled]) [part=suffix],:host([disabled]) [part=label],:host([disabled]) [part~=input],:host([disabled]) ::part(helper-text){color:var(--disabled-text-color)}@media(forced-colors: active){:host [part~=container]::after{content:unset}}`, Ds = d`:is(input:-moz-placeholder,input[type=date],input[type=time],input[type=datetime-local],input[type=week],input[type=month])+[part=notch] [part=label]{translate:0 -50%}:host([outlined]:not([readonly]):focus-within) [part=label],:is(input:placeholder-shown,input[type=date],input[type=time],input[type=datetime-local],input[type=week],input[type=month])+[part=notch] [part=label],[part~=filled]+[part=notch] [part=label]{translate:0 -50%}[part=end]>[part=suffix] ::slotted(*),[part=start]>[part=prefix] ::slotted(*){display:inline-flex;align-items:center;width:-moz-max-content;width:max-content;height:100%}:host{--component-size: var(--ig-size, var(--default-size));--input-size: var(--component-size);--affix-padding: max(var(--is-large, 1) * max(1rem, -1 * 1rem) * var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))), var(--is-medium, 1) * max(0.875rem, -1 * 0.875rem) * var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))), var(--is-small, 1) * max(0.75rem, -1 * 0.75rem) * var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))))}:host input:-moz-placeholder+[part=notch]{border-top:.0625rem solid rgba(0,0,0,0)}:host input:placeholder-shown+[part=notch]{border-top:.0625rem solid rgba(0,0,0,0)}:host ::part(helper-text){grid-auto-rows:minmax(1.125rem, auto);padding-inline:max(var(--is-large, 1)*max(1rem, -1 * 1rem)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(0.875rem, -1 * 0.875rem)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(0.75rem, -1 * 0.75rem)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))))}[part=prefix] ::slotted(*),[part=suffix] ::slotted(*){color:inherit}:is(input:-moz-placeholder,input[type=date],input[type=time],input[type=datetime-local],input[type=week],input[type=month])+[part=notch] [part=label]{font-family:var(--ig-caption-font-family, var(--ig-font-family));font-size:var(--ig-caption-font-size);font-weight:var(--ig-caption-font-weight);font-style:var(--ig-caption-font-style);line-height:var(--ig-caption-line-height);letter-spacing:var(--ig-caption-letter-spacing);text-transform:var(--ig-caption-text-transform);margin-top:var(--ig-caption-margin-top);margin-bottom:var(--ig-caption-margin-bottom)}:is(input:placeholder-shown,input[type=date],input[type=time],input[type=datetime-local],input[type=week],input[type=month])+[part=notch] [part=label],[part~=filled]+[part=notch] [part=label]{font-family:var(--ig-caption-font-family, var(--ig-font-family));font-size:var(--ig-caption-font-size);font-weight:var(--ig-caption-font-weight);font-style:var(--ig-caption-font-style);line-height:var(--ig-caption-line-height);letter-spacing:var(--ig-caption-letter-spacing);text-transform:var(--ig-caption-text-transform);margin-top:var(--ig-caption-margin-top);margin-bottom:var(--ig-caption-margin-bottom)}[part~=input]{background:rgba(0,0,0,0);padding:0 max(var(--is-large, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))));font-size:1rem;grid-area:1/2/span 1/span 2}[part~="input filled"]{--input-text-color: var(--filled-text-color);color:var(--input-text-color)}[part=label]{font-family:var(--ig-subtitle-1-font-family, var(--ig-font-family));font-size:var(--ig-subtitle-1-font-size);font-weight:var(--ig-subtitle-1-font-weight);font-style:var(--ig-subtitle-1-font-style);line-height:var(--ig-subtitle-1-line-height);letter-spacing:var(--ig-subtitle-1-letter-spacing);text-transform:var(--ig-subtitle-1-text-transform);margin-top:var(--ig-subtitle-1-margin-top);margin-bottom:var(--ig-subtitle-1-margin-bottom);color:var(--idle-secondary-color);transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),translate 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1),font-size 150ms cubic-bezier(0.4, 0, 0.2, 1);text-overflow:ellipsis;overflow:hidden;will-change:font-size,color,transform,translate}[part^=container]{grid-template-columns:auto auto 1fr auto}[part~=input],[part^=container]{height:var(--size)}[part=start]{border-start-start-radius:var(--box-border-radius);justify-content:flex-start;grid-area:1/1}[part=notch]{display:flex;align-items:center;width:auto;min-width:0;height:100%;grid-area:1/2;padding:0 max(var(--is-large, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(0.25rem, -1 * 0.25rem)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))));overflow:visible}[part=notch]:empty{display:none}[part=filler]{grid-area:1/3}[part=end]{border-start-end-radius:var(--box-border-radius);justify-content:flex-end;grid-area:1/4}[part=start],[part=end]{display:flex;min-width:max(var(--is-large, 1)*max(0.75rem, -1 * 0.75rem),var(--is-medium, 1)*max(0.625rem, -1 * 0.625rem),var(--is-small, 1)*max(0.5rem, -1 * 0.5rem));height:var(--size);overflow:hidden}:host(:focus-within) [part=label]{color:var(--focused-secondary-color)}:host(:not([readonly]):focus-within) [part=label]{font-family:var(--ig-caption-font-family, var(--ig-font-family));font-size:var(--ig-caption-font-size);font-weight:var(--ig-caption-font-weight);font-style:var(--ig-caption-font-style);line-height:var(--ig-caption-line-height);letter-spacing:var(--ig-caption-letter-spacing);text-transform:var(--ig-caption-text-transform);margin-top:var(--ig-caption-margin-top);margin-bottom:var(--ig-caption-margin-bottom);translate:0 -73%}:host([outlined]:not([readonly]):focus-within) [part=label]{align-self:start}:host([readonly]:not([outlined]):focus-within) :not([part~=filled]) input:not(:-moz-placeholder)+[part=notch] [part=label]{translate:0;font-size:initial}:host([readonly]:not([outlined]):focus-within) :not([part~=filled]) :is(input[type=date],input[type=time],input[type=datetime-local],input[type=week],input[type=month])+[part=notch] [part=label],:host([readonly]:not([outlined]):focus-within) :not([part~=filled]) input:not(:placeholder-shown)+[part=notch] [part=label]{translate:0;font-size:initial}:host(:not([outlined])) [part=prefix],:host(:not([outlined])) [part=suffix]{max-height:calc(100% - 0.0625rem)}:host(:not([outlined])) [part=label]{inset-inline-start:.125rem}:host(:not([outlined])) [part~=container]{background:var(--box-background);border-bottom:1px solid var(--idle-bottom-line-color);border-start-end-radius:var(--box-border-radius);border-start-start-radius:var(--box-border-radius);transition:border-bottom-width 150ms cubic-bezier(0.4, 0, 0.2, 1)}:host(:not([outlined])) [part~=container]::after{position:absolute;content:"";width:100%;height:.125rem;left:0;right:0;bottom:-1px;background:var(--idle-bottom-line-color);transform:scaleX(0);transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}:host(:not([outlined])) [part~=labelled] [part~=input]{padding-top:1.25rem;padding-bottom:.375rem}:host(:not([outlined])) :is(input:-moz-placeholder,input[type=date],input[type=time],input[type=datetime-local],input[type=week],input[type=month])+[part=notch] [part=label]{translate:0 -73%}:host(:not([outlined])) :is(input:placeholder-shown,input[type=date],input[type=time],input[type=datetime-local],input[type=week],input[type=month])+[part=notch] [part=label],:host(:not([outlined])) [part~=filled]+[part=notch] [part=label]{translate:0 -73%}:host(:not([outlined],[type=search],[data-haspopup=dialog],[data-role=combobox])[readonly]) [part~=container]{background:var(--box-background-focus)}:host(:not([outlined],[type=search],[data-haspopup=dialog],[data-role=combobox])[readonly]:hover) [part~=container]{background:var(--box-background-focus);border-bottom-color:var(--idle-bottom-line-color)}:host(:not([outlined],[type=search],[data-haspopup=dialog],[data-role=combobox])[readonly]:hover) [part~=container]::after{background:var(--idle-bottom-line-color)}:host(:not([outlined]):hover) [part~=container]{background:var(--box-background-hover);border-bottom-color:var(--hover-bottom-line-color)}:host(:not([outlined]):hover) [part~=container]::after{background:var(--hover-bottom-line-color)}:host(:not([outlined]):focus-within) [part~=container],:host(:not([outlined],[data-haspopup=dialog],[data-role=combobox])[readonly]:focus-within) [part~=container]{background:var(--box-background-focus);border-bottom-color:var(--focused-bottom-line-color)}:host(:not([outlined]):focus-within) [part~=container]::after,:host(:not([outlined],[data-haspopup=dialog],[data-role=combobox])[readonly]:focus-within) [part~=container]::after{background:var(--focused-bottom-line-color);transform:scaleX(1);opacity:1}:host(:not([outlined],[data-haspopup=dialog],[data-role=combobox])[readonly]:focus-within) [part=label]{font-family:var(--ig-caption-font-family, var(--ig-font-family));font-size:var(--ig-caption-font-size);font-weight:var(--ig-caption-font-weight);font-style:var(--ig-caption-font-style);line-height:var(--ig-caption-line-height);letter-spacing:var(--ig-caption-letter-spacing);text-transform:var(--ig-caption-text-transform);margin-top:var(--ig-caption-margin-top);margin-bottom:var(--ig-caption-margin-bottom);translate:0 -73%}:host(:not([outlined],[disabled],:disabled,[readonly]):state(ig-invalid)) [part~=container],:host(:not([outlined],[disabled],:disabled,[readonly]):state(ig-invalid):focus-within) [part~=container],:host(:not([disabled],:disabled,[outlined])[data-role=combobox]:state(ig-invalid)) [part~=container],:host(:not([disabled],:disabled,[outlined])[data-role=combobox]:state(ig-invalid):focus-within) [part~=container]{border-color:var(--error-secondary-color)}:host(:not([outlined],[disabled],:disabled,[readonly]):state(ig-invalid)) [part~=container]::after,:host(:not([outlined],[disabled],:disabled,[readonly]):state(ig-invalid):focus-within) [part~=container]::after,:host(:not([disabled],:disabled,[outlined])[data-role=combobox]:state(ig-invalid)) [part~=container]::after,:host(:not([disabled],:disabled,[outlined])[data-role=combobox]:state(ig-invalid):focus-within) [part~=container]::after{background:var(--error-secondary-color)}:host(:not([outlined])[disabled]) [part~=container],:host(:not([outlined]):disabled) [part~=container]{background:var(--box-disabled-background);border-block-end-color:var(--disabled-bottom-line-color);border-bottom-style:dashed}:host([type=search]) [part^=container]{background:var(--search-background);border-bottom:none;box-shadow:var(--search-resting-elevation);border-radius:var(--search-border-radius);overflow:hidden}:host([type=search]) [part^=container]:focus-within{background:var(--search-background)}:host([type=search]) [part^=container]:focus-within::after{display:none}:host([type=search]) [part=prefix],:host([type=search]) [part=suffix]{max-height:100%}:host(:not([readonly])[type=search]:hover) [part^=container],:host([type=search]:focus-within) [part^=container]{box-shadow:var(--search-hover-elevation);background:var(--search-background)}:host([readonly][type=search]:hover) [part^=container],:host([readonly][type=search]:focus-within) [part^=container]{background:var(--search-background)}:host([outlined][type=search]) [part~=labelled] [part~=input]{padding-top:max(var(--is-large, 1)*max(1.25rem, -1 * 1.25rem)*var(--ig-spacing-block-large, var(--ig-spacing-block, var(--ig-spacing))),var(--is-medium, 1)*max(1.25rem, -1 * 1.25rem)*var(--ig-spacing-block-medium, var(--ig-spacing-block, var(--ig-spacing))),var(--is-small, 1)*max(1.25rem, -1 * 1.25rem)*var(--ig-spacing-block-small, var(--ig-spacing-block, var(--ig-spacing))));padding-bottom:max(var(--is-large, 1)*max(0.375rem, -1 * 0.375rem)*var(--ig-spacing-block-large, var(--ig-spacing-block, var(--ig-spacing))),var(--is-medium, 1)*max(0.375rem, -1 * 0.375rem)*var(--ig-spacing-block-medium, var(--ig-spacing-block, var(--ig-spacing))),var(--is-small, 1)*max(0.375rem, -1 * 0.375rem)*var(--ig-spacing-block-small, var(--ig-spacing-block, var(--ig-spacing))))}:host([outlined][type=search]) [part=notch]{border:none}:host([outlined][type=search]:focus-within) [part=notch] [part=label]{translate:0 -73%}:host(:disabled[type=search]) [part^=container],:host([disabled][type=search]) [part^=container]{background:var(--search-disabled-background);box-shadow:var(--search-disabled-elevation);border:none}:host(:not([type=search])[outlined]) [part^=container]{border-radius:var(--border-border-radius);background:var(--border-background)}:host(:not([type=search])[outlined]) [part=start]{border-style:solid;border-color:var(--border-color);border-inline-start-width:.0625rem;border-inline-end-width:0;border-block-start-width:.0625rem;border-block-end-width:.0625rem;border-start-start-radius:var(--border-border-radius);border-end-start-radius:var(--border-border-radius)}:host(:not([type=search])[outlined]) [part=filler]{border-width:.0625rem;border-style:solid;border-color:var(--border-color);border-left:none;border-right:none}:host(:not([type=search])[outlined]) [part=end]{border-style:solid;border-color:var(--border-color);border-inline-start-width:0;border-inline-end-width:.0625rem;border-block-start-width:.0625rem;border-block-end-width:.0625rem;border-start-end-radius:var(--border-border-radius);border-end-end-radius:var(--border-border-radius)}:host([outlined]) [part=notch]{border-width:.0625rem;border-style:solid;border-color:var(--border-color);border-left:none;border-right:none}:host([outlined]) :is(input[type=date],input[type=time],input[type=datetime-local],input[type=week],input[type=month])+[part=notch],:host([outlined]) [part~=filled]+[part=notch]{border-top:.0625rem solid rgba(0,0,0,0)}:host([outlined]) :is(input[type=date],input[type=time],input[type=datetime-local],input[type=week],input[type=month])+[part=notch] [part=label],:host([outlined]) [part~=filled]+[part=notch] [part=label]{align-self:start}:host([outlined]) [part~=container]:has(input:-moz-placeholder) [part=label]{align-self:start}:host([outlined]) [part~=container]:has(input:placeholder-shown) [part=label]{align-self:start}:host(:not([data-haspopup=dialog],[data-role=combobox])[outlined][readonly]:hover) [part=notch],:host(:not([data-haspopup=dialog],[data-role=combobox])[outlined][readonly]:hover) [part=start],:host(:not([data-haspopup=dialog],[data-role=combobox])[outlined][readonly]:hover) [part=end],:host(:not([data-haspopup=dialog],[data-role=combobox])[outlined][readonly]:hover) [part=filler]{border-color:var(--border-color)}:host(:not([data-haspopup=dialog],[data-role=combobox])[outlined][readonly]:hover) [part~=filled]+[part=notch]{border-top:.0625rem solid rgba(0,0,0,0)}:host(:not([data-haspopup=dialog],[data-role=combobox])[outlined][readonly]:focus-within) [part=notch],:host(:not([data-haspopup=dialog],[data-role=combobox])[outlined][readonly]:focus-within) [part=start],:host(:not([data-haspopup=dialog],[data-role=combobox])[outlined][readonly]:focus-within) [part=end],:host(:not([data-haspopup=dialog],[data-role=combobox])[outlined][readonly]:focus-within) [part=filler]{border-color:var(--focused-border-color)}:host(:not([data-haspopup=dialog],[data-role=combobox])[outlined][readonly]:focus-within) [part=notch]{border-top:.0625rem solid rgba(0,0,0,0)}:host(:not(:state(ig-invalid),[type=search])[readonly][outlined]:focus-within) :not([part~=filled]) input:not(:-moz-placeholder)+[part=notch] [part=label]{translate:0;font-size:initial;align-self:center}:host(:not(:state(ig-invalid),[type=search])[readonly][outlined]:focus-within) :not([part~=filled]) input:not(:placeholder-shown)+[part=notch] [part=label]{translate:0;font-size:initial;align-self:center}:host(:not(:state(ig-invalid),[type=search])[readonly][outlined]:focus-within) :not([part~=filled]) input:not(:-moz-placeholder)+[part=notch]{border-width:.125rem;border-color:var(--focused-border-color)}:host(:not(:state(ig-invalid),[type=search])[readonly][outlined]:focus-within) :not([part~=filled]) input:not(:placeholder-shown)+[part=notch]{border-width:.125rem;border-color:var(--focused-border-color)}:host(:not([type=search])[outlined]:hover) [part=notch],:host(:not([type=search])[outlined]:hover) [part=start],:host(:not([type=search])[outlined]:hover) [part=end],:host(:not([type=search])[outlined]:hover) [part=filler]{border-color:var(--hover-border-color)}:host(:not([type=search])[outlined]:hover) input:-moz-placeholder+[part=notch]{border-top:.0625rem solid rgba(0,0,0,0)}:host(:not([type=search])[outlined]:hover) input:placeholder-shown+[part=notch],:host(:not([type=search])[outlined]:hover) [part~=filled]+[part=notch]{border-top:.0625rem solid rgba(0,0,0,0)}:host([outlined]:is([type=date],[type=time],[type=datetime-local],[type=week],[type=month])) [part=label]{transition:none}:host([outlined]:is([type=date],[type=time],[type=datetime-local],[type=week],[type=month])) [part=notch]{border-block-start-color:rgba(0,0,0,0) !important}:host(:not([type=search])[outlined]:focus-within) [part=start]{border-color:var(--focused-border-color);border-inline-start-width:.125rem;border-block-start-width:.125rem;border-block-end-width:.125rem}:host(:not([type=search])[outlined]:focus-within) [part=notch]{border-width:.125rem;border-color:var(--focused-border-color)}:host(:not([type=search])[outlined]:focus-within) input:-moz-placeholder+[part=notch]{border-width:.125rem;border-color:var(--focused-border-color);border-top:.0625rem solid rgba(0,0,0,0)}:host(:not([type=search])[outlined]:focus-within) input:placeholder-shown+[part=notch],:host(:not([type=search])[outlined]:focus-within) [part~=filled]+[part=notch]{border-width:.125rem;border-color:var(--focused-border-color);border-top:.0625rem solid rgba(0,0,0,0)}:host(:not([type=search])[outlined]:focus-within) [part=filler]{border-width:.125rem;border-color:var(--focused-border-color)}:host(:not([type=search])[outlined]:focus-within) [part=end]{border-color:var(--focused-border-color);border-inline-end-width:.125rem;border-block-start-width:.125rem;border-block-end-width:.125rem}:host(:not([type=search],[data-haspopup=dialog],[data-role=combobox])[outlined]:focus-within) [part=notch]{border-width:.125rem;border-color:var(--focused-border-color);border-top:.0625rem solid rgba(0,0,0,0)}:host(:not([type=search])[outlined]:focus) [part=suffix],:host(:not([type=search])[outlined]:focus-within) [part=suffix]{margin-inline-end:-0.0625rem}:host(:not([type=search])[outlined]:focus) [part=prefix],:host(:not([type=search])[outlined]:focus-within) [part=prefix]{margin-inline-start:-0.0625rem}:host(:not([type=search])[outlined]:focus) [part=suffix] ::slotted(*),:host(:not([type=search])[outlined]:focus) [part=prefix] ::slotted(*),:host(:not([type=search])[outlined]:focus-within) [part=suffix] ::slotted(*),:host(:not([type=search])[outlined]:focus-within) [part=prefix] ::slotted(*){padding-block:max(var(--is-large, 1)*max(0.875rem, -1 * 0.875rem)*var(--ig-spacing-block-large, var(--ig-spacing-block, var(--ig-spacing))),var(--is-medium, 1)*max(0.75rem, -1 * 0.75rem)*var(--ig-spacing-block-medium, var(--ig-spacing-block, var(--ig-spacing))),var(--is-small, 1)*max(0.625rem, -1 * 0.625rem)*var(--ig-spacing-block-small, var(--ig-spacing-block, var(--ig-spacing))))}:host(:not([type=search],[readonly],[disabled],:disabled)[outlined]:state(ig-invalid)) [part=start],:host(:not([type=search],[readonly],[disabled],:disabled)[outlined]:state(ig-invalid)) [part=notch],:host(:not([type=search],[readonly],[disabled],:disabled)[outlined]:state(ig-invalid)) [part=filler],:host(:not([type=search],[readonly],[disabled],:disabled)[outlined]:state(ig-invalid)) [part=end],:host(:not([type=search],[readonly],[disabled],:disabled)[outlined]:state(ig-invalid):focus-within) [part=start],:host(:not([type=search],[readonly],[disabled],:disabled)[outlined]:state(ig-invalid):focus-within) [part=notch],:host(:not([type=search],[readonly],[disabled],:disabled)[outlined]:state(ig-invalid):focus-within) [part=filler],:host(:not([type=search],[readonly],[disabled],:disabled)[outlined]:state(ig-invalid):focus-within) [part=end],:host(:not([disabled],:disabled)[data-role=combobox][outlined]:state(ig-invalid)) [part=start],:host(:not([disabled],:disabled)[data-role=combobox][outlined]:state(ig-invalid)) [part=notch],:host(:not([disabled],:disabled)[data-role=combobox][outlined]:state(ig-invalid)) [part=filler],:host(:not([disabled],:disabled)[data-role=combobox][outlined]:state(ig-invalid)) [part=end],:host(:not([disabled],:disabled)[data-role=combobox][outlined]:state(ig-invalid):focus-within) [part=start],:host(:not([disabled],:disabled)[data-role=combobox][outlined]:state(ig-invalid):focus-within) [part=notch],:host(:not([disabled],:disabled)[data-role=combobox][outlined]:state(ig-invalid):focus-within) [part=filler],:host(:not([disabled],:disabled)[data-role=combobox][outlined]:state(ig-invalid):focus-within) [part=end]{border-color:var(--error-secondary-color)}:host(:not([type=search],[readonly],[disabled],:disabled)[outlined]:state(ig-invalid)) input:-moz-placeholder+[part=notch], :host(:not([type=search],[readonly],[disabled],:disabled)[outlined]:state(ig-invalid):focus-within) input:-moz-placeholder+[part=notch], :host(:not([disabled],:disabled)[data-role=combobox][outlined]:state(ig-invalid)) input:-moz-placeholder+[part=notch], :host(:not([disabled],:disabled)[data-role=combobox][outlined]:state(ig-invalid):focus-within) input:-moz-placeholder+[part=notch]{border-color:var(--error-secondary-color);border-top:.0625rem solid rgba(0,0,0,0)}:host(:not([type=search],[readonly],[disabled],:disabled)[outlined]:state(ig-invalid)) input:placeholder-shown+[part=notch],:host(:not([type=search],[readonly],[disabled],:disabled)[outlined]:state(ig-invalid)) [part~=filled]+[part=notch],:host(:not([type=search],[readonly],[disabled],:disabled)[outlined]:state(ig-invalid):focus-within) input:placeholder-shown+[part=notch],:host(:not([type=search],[readonly],[disabled],:disabled)[outlined]:state(ig-invalid):focus-within) [part~=filled]+[part=notch],:host(:not([disabled],:disabled)[data-role=combobox][outlined]:state(ig-invalid)) input:placeholder-shown+[part=notch],:host(:not([disabled],:disabled)[data-role=combobox][outlined]:state(ig-invalid)) [part~=filled]+[part=notch],:host(:not([disabled],:disabled)[data-role=combobox][outlined]:state(ig-invalid):focus-within) input:placeholder-shown+[part=notch],:host(:not([disabled],:disabled)[data-role=combobox][outlined]:state(ig-invalid):focus-within) [part~=filled]+[part=notch]{border-color:var(--error-secondary-color);border-top:.0625rem solid rgba(0,0,0,0)}:host(:not([disabled])[data-role=combobox][outlined]:state(ig-invalid):focus-within) :not([part~=filled]) input:not(:-moz-placeholder)+[part=notch]{border-width:.125rem}:host(:not([disabled])[data-role=combobox][outlined]:state(ig-invalid):focus-within) :not([part~=filled]) input:not(:placeholder-shown)+[part=notch]{border-width:.125rem}:host(:not([type=search])[outlined]:state(ig-invalid):focus-within) [part=notch],:host([data-role=combobox][outlined]:state(ig-invalid):focus-within) [part=notch]{border-top:.0625rem solid rgba(0,0,0,0)}:host(:not([disabled],[readonly])[data-role=combobox][outlined]:focus-within) :not([part~=filled]) input:not(:-moz-placeholder)+[part=notch], :host(:not([disabled],[readonly])[data-role=combobox][outlined]:state(ig-invalid):focus-within) :not([part~=filled]) input:not(:-moz-placeholder)+[part=notch]{border-top:.0625rem solid rgba(0,0,0,0)}:host(:not([disabled],[readonly])[data-role=combobox][outlined]:focus-within) :not([part~=filled]) input:not(:placeholder-shown)+[part=notch],:host(:not([disabled],[readonly])[data-role=combobox][outlined]:state(ig-invalid):focus-within) :not([part~=filled]) input:not(:placeholder-shown)+[part=notch]{border-top:.0625rem solid rgba(0,0,0,0)}:host(:not([disabled],[readonly])[data-role=combobox][outlined]:focus-within) :not([part~=filled]) [part=notch],:host(:not([disabled],[readonly])[data-role=combobox][outlined]:state(ig-invalid):focus-within) :not([part~=filled]) [part=notch]{border-block-start-color:rgba(0,0,0,0)}:host(:not([disabled],:disabled,[readonly]):state(ig-invalid)) [part=label],:host(:not([disabled],:disabled)[data-role=combobox]:state(ig-invalid)) [part=label]{color:var(--error-secondary-color)}:host(:not([type=search]):disabled[outlined]) [part=start],:host(:not([type=search]):disabled[outlined]) [part=filler],:host(:not([type=search]):disabled[outlined]) [part=notch],:host(:not([type=search]):disabled[outlined]) [part=end],:host(:not([type=search])[disabled][outlined]) [part=start],:host(:not([type=search])[disabled][outlined]) [part=filler],:host(:not([type=search])[disabled][outlined]) [part=notch],:host(:not([type=search])[disabled][outlined]) [part=end]{border-color:var(--disabled-border-color)}:host(:not([type=search]):disabled[outlined]) [part~=container],:host(:not([type=search])[disabled][outlined]) [part~=container]{background:var(--border-disabled-background)}:host(:not([type=search]):disabled[outlined]) input:-moz-placeholder+[part=notch], :host(:not([type=search])[disabled][outlined]) input:-moz-placeholder+[part=notch]{border-top:.0625rem solid rgba(0,0,0,0)}:host(:not([type=search]):disabled[outlined]) input:placeholder-shown+[part=notch],:host(:not([type=search]):disabled[outlined]) [part~=filled]+[part=notch],:host(:not([type=search])[disabled][outlined]) input:placeholder-shown+[part=notch],:host(:not([type=search])[disabled][outlined]) [part~=filled]+[part=notch]{border-top:.0625rem solid rgba(0,0,0,0)}:host(:disabled) [part~=input],:host(:disabled) [part=label],:host(:disabled) [part=prefix],:host(:disabled) [part=suffix],:host(:disabled) ::part(helper-text),:host([disabled]) [part~=input],:host([disabled]) [part=label],:host([disabled]) [part=prefix],:host([disabled]) [part=suffix],:host([disabled]) ::part(helper-text){color:var(--disabled-text-color)}:host(:disabled) [part=start],:host(:disabled) [part=filler],:host(:disabled) [part=notch],:host(:disabled) [part=end],:host([disabled]) [part=start],:host([disabled]) [part=filler],:host([disabled]) [part=notch],:host([disabled]) [part=end]{color:var(--disabled-text-color)}:host(:disabled) [part~=filled]+[part=notch],:host([disabled]) [part~=filled]+[part=notch]{border-top:.0625rem solid rgba(0,0,0,0)}@media(forced-colors: active){:host(:not([outlined])) [part~=container] [part=notch]{border-top:none}:host(:not([outlined])) [part~=container]{outline:.0625rem solid CanvasText;border-bottom:none;border-radius:var(--box-border-radius)}:host(:not([outlined])) [part~=container]::after{content:unset}}`, Os = {
	light: {
		shared: d`
    ${Cs}
  `,
		bootstrap: d`
    ${ws} ${ys}
  `,
		material: d`
    ${Ds} ${Ss}
  `,
		fluent: d`
    ${Ts} ${bs}
  `,
		indigo: d`
    ${Es} ${xs}
  `
	},
	dark: {
		shared: d`
    ${vs}
  `,
		bootstrap: d`
    ${ws} ${ms}
  `,
		material: d`
    ${Ds} ${_s}
  `,
		fluent: d`
    ${Ts} ${hs}
  `,
		indigo: d`
    ${Es} ${gs}
  `
	}
}, ks = d`[part~=helper-text]{color:var(--helper-text-color);row-gap:.5rem}[part~=validation-icon]{color:var(--icon-error-color)}[part~=validation-message]{gap:.25rem;color:var(--text-error-color)}`, As = d`:host{--ig-size: 1;display:block;grid-row:2;grid-column:1/-1}:host ::slotted(*){margin-block:0}[part~=helper-text]{display:grid;row-gap:.5rem;align-items:center}[part~=validation-icon]{align-self:flex-start}[part~=validation-message]{display:flex;align-items:center}[part~=empty]{display:none !important}@media(forced-colors: active){:host [part~=validation-message]{color:GrayText}:host igc-icon{color:GrayText !important}}`, js = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Ms = [
	"badInput",
	"customError",
	"patternMismatch",
	"rangeOverflow",
	"rangeUnderflow",
	"stepMismatch",
	"tooLong",
	"tooShort",
	"typeMismatch",
	"valueMissing"
].map((e) => [e, Fr(e)]);
function* Ns(e) {
	e.valid || (yield "invalid");
	for (let [t, n] of Ms) e[t] && (yield n);
}
var Ps = class e extends o {
	static {
		this.tagName = "igc-validator";
	}
	static {
		this.styles = [As, ks];
	}
	static register() {
		M(e, P);
	}
	static create(e, t = {
		id: "helper-text",
		hasHelperText: !0
	}) {
		let n = t.hasHelperText ? c`<slot name="helper-text" slot="helper-text"></slot>` : l, r = e.hasUpdated ? Iterator.from(Ns(e.validity)).map((e) => c`<slot name=${e} slot=${e}></slot>`).toArray() : l;
		return c`
      <igc-validator
        id=${N(t.id)}
        part=${N(t.part)}
        slot=${N(t.slot)}
        ?invalid=${e.invalid}
        .target=${e}
        exportparts="helper-text, validation-message, validation-icon"
      >
        ${n}${r}
      </igc-validator>
    `;
	}
	set target(e) {
		if (this._target === e) return;
		this._abortHandle.abort();
		let { signal: t } = this._abortHandle;
		this._target = e, this._target.addEventListener(fs, this, { signal: t }), this._target.addEventListener(ps, this, { signal: t });
	}
	get target() {
		return this._target;
	}
	constructor() {
		super(), this._abortHandle = Dt(), this.invalid = !1, Tt(this, Os);
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return e.addEventListener("slotchange", this), e;
	}
	handleEvent(e) {
		switch (e.type) {
			case fs:
				this.invalid = !0;
				break;
			case ps:
				this.invalid = !1;
				break;
		}
		this.requestUpdate();
	}
	_collectProjectedSlots() {
		let e = /* @__PURE__ */ new Set();
		if (!this.hasUpdated) return {
			isProjectionEmpty: !1,
			validation: e
		};
		let t = !0;
		for (let n of this.renderRoot.querySelectorAll("slot")) At(n.assignedElements({ flatten: !0 })) || (t = !1, n.name !== "helper-text" && e.add(n.name));
		return {
			isProjectionEmpty: t,
			validation: e
		};
	}
	_renderValidationMessage(e, t) {
		let n = t.has(e), r = {
			"validation-message": !0,
			empty: !n
		}, i = n ? c`
          <igc-icon
            aria-hidden="true"
            name="error"
            part="validation-icon"
          ></igc-icon>
        ` : l;
		return c`<div part=${Lr(r)}>
      ${i}<slot name=${e}></slot>
    </div>`;
	}
	_renderHelper(e) {
		return this.invalid && e.size > 0 ? l : c`<slot name="helper-text"></slot>`;
	}
	firstUpdated() {
		this.invalid && this.target.requestUpdate();
	}
	render() {
		let { isProjectionEmpty: e, validation: t } = this._collectProjectedSlots(), n = this.hasUpdated && this.invalid ? Iterator.from(Ns(this.target.validity)).map((e) => this._renderValidationMessage(e, t)).toArray() : l;
		return c`
      <div
        part=${Lr({
			"helper-text": !0,
			empty: e
		})}
        aria-live="polite"
      >
        ${n}${this._renderHelper(t)}
      </div>
    `;
	}
};
js([j({ type: Boolean })], Ps.prototype, "invalid", void 0), js([j({ attribute: !1 })], Ps.prototype, "target", null);
//#endregion
//#region node_modules/igniteui-webcomponents/internals/mixins/forms/associated.js
var Fs = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Is = "ig-invalid", Ls = {
	bubbles: !1,
	composed: !1
};
function Rs(e) {
	e.dispatchEvent(new CustomEvent(fs, Ls));
}
function zs(e) {
	e.dispatchEvent(new CustomEvent(ps, Ls));
}
function Bs(e) {
	class t extends e {
		static {
			this.formAssociated = !0;
		}
		get _shouldApplyStyles() {
			return this._isExternalInvalid ? !0 : !this._disabled && this._invalid && this._touched && !this._isInternalValidation;
		}
		get __validators() {
			return [];
		}
		set disabled(e) {
			this._disabled = e, this.toggleAttribute("disabled", !!this._disabled), this.hasUpdated && this._setInvalidStyles();
		}
		get disabled() {
			return this._disabled;
		}
		set invalid(e) {
			this._isExternalInvalid = e, this._setInvalidStyles();
		}
		get invalid() {
			return this._shouldApplyStyles;
		}
		get form() {
			return this._internals.form;
		}
		get validity() {
			return this._internals.validity;
		}
		get validationMessage() {
			return this._internals.validationMessage;
		}
		get willValidate() {
			return this._internals.willValidate;
		}
		constructor(...e) {
			super(...e), this._internals = tt(this), this._isInternalValidation = !1, this._touched = !1, this._isExternalInvalid = !1, this._disabled = !1, this._invalid = !1, this._pristine = !0, kn(this, "invalid", this._handleInvalid);
		}
		connectedCallback() {
			super.connectedCallback(), this.hasUpdated || (this._pristine = !0, this._touched = !1), this._validate();
		}
		_handleEnterKeydown(e) {
			e.key !== "Enter" || e.repeat || this.form?.requestSubmit();
		}
		_handleInvalid(e) {
			e.preventDefault(), this._invalid = !0, this._isInternalValidation ? this._isInternalValidation = !1 : (this._setTouchedState(), Rs(this)), this._setInvalidStyles(), this.requestUpdate();
		}
		_setInvalidStyles() {
			this._internals.setState(Is, this._shouldApplyStyles);
		}
		_resolveInternalValidation() {
			this._isInternalValidation = !1;
		}
		__runValidators() {
			let e = {}, t = "";
			for (let n of this.__validators) {
				let r = n.isValid(this);
				if (e[n.key] = !r, !r && (t = Lt(n.message) ? n.message(this) : n.message, n.key === "valueMissing")) {
					e = { valueMissing: !0 };
					break;
				}
			}
			return {
				validity: e,
				message: t
			};
		}
		_validate(e) {
			let { validity: t, message: n } = this.__runValidators(), r = this.validity.customError, i = n;
			r && e === void 0 ? (t.customError = !0, i = this.validationMessage) : r && e === "" ? t.customError = !1 : e && e !== "" && (t.customError = !0, i = e), this._internals.setValidity(t, i), this._isInternalValidation = !0, this._invalid = !this._internals.checkValidity(), this._resolveInternalValidation(), this._setInvalidStyles();
		}
		_handleBlur() {
			this._setTouchedState(), this._validate();
		}
		_setTouchedState() {
			this._touched = !0;
		}
		_emitTouchedEvent(e, t) {
			return this._setTouchedState(), this.emitEvent(e, t);
		}
		_setDefaultValue(e) {
			this._formValue.defaultValue = e;
		}
		_restoreDefaultValue() {
			let e = this._formValue.value;
			this._formValue.setValueAndFormState(this._formValue.defaultValue), this.requestUpdate("value", e);
		}
		_setFormValue(e, t) {
			this._pristine = !1, this._internals.setFormValue(e, t), this._validate();
		}
		_renderValidationContainer(e) {
			return Ps.create(this, e);
		}
		formAssociatedCallback(e) {}
		formDisabledCallback(e) {
			this._disabled = e, this._setInvalidStyles(), this.requestUpdate();
		}
		formResetCallback() {
			this._restoreDefaultValue(), this._pristine = !0, this._touched = !1, this._invalid = !1, this._isExternalInvalid = !1, this._setInvalidStyles(), zs(this);
		}
		formStateRestoreCallback(e, t) {}
		reportValidity() {
			let e = this._internals.reportValidity();
			return this._invalid = !e, e;
		}
		checkValidity() {
			this._isInternalValidation = !0;
			let e = this._internals.checkValidity();
			return this._invalid = !e, this._resolveInternalValidation(), e;
		}
		setCustomValidity(e) {
			this._validate(e), this.requestUpdate();
		}
	}
	return Fs([j({ reflect: !0 })], t.prototype, "name", void 0), Fs([j({ type: Boolean })], t.prototype, "disabled", null), Fs([j({ type: Boolean })], t.prototype, "invalid", null), t;
}
function Vs(e) {
	class t extends Bs(e) {
		set defaultValue(e) {
			this._formValue.defaultValue = e, this._pristine && "value" in this && (this.value = this.defaultValue, this._pristine = !0, this._validate());
		}
		get defaultValue() {
			return this._formValue.defaultValue;
		}
		_restoreDefaultValue() {
			"value" in this ? this.value = this.defaultValue : super._restoreDefaultValue();
		}
		_commitValue(e, t) {
			return this._setTouchedState(), "value" in this ? (this.value = e, this.emitEvent(t, { detail: this.value })) : !1;
		}
		attributeChangedCallback(e, t, n) {
			super.attributeChangedCallback(e, t, n), e === "value" && this._setDefaultValue(n);
		}
	}
	return Fs([j({ attribute: !1 })], t.prototype, "defaultValue", null), t;
}
//#endregion
//#region node_modules/igniteui-webcomponents/internals/mixins/forms/form-transformers.js
var Hs = {
	setValue: (e) => e || "",
	getValue: (e) => e,
	setDefaultValue: (e) => e || "",
	getDefaultValue: (e) => e,
	setFormValue: (e, t) => e || null
}, Us = {
	setValue: Ft,
	setDefaultValue: Ft,
	setFormValue: (e) => e.toString()
}, Ws = class e {
	static {
		this.setFormValueKey = "_setFormValue";
	}
	constructor(t, n) {
		this._host = t, this._value = n.initialValue, this._defaultValue = n.initialDefaultValue ?? this._value, this._setFormValue = t[e.setFormValueKey], this._transformers = {
			...Hs,
			...n.transformers
		};
	}
	setValueAndFormState(e) {
		this.value = e, this._setFormValue.call(this._host, this._transformers.setFormValue(this.value, this._host));
	}
	set defaultValue(e) {
		this._defaultValue = this._transformers.setDefaultValue(e);
	}
	get defaultValue() {
		return this._transformers.getDefaultValue(this._defaultValue);
	}
	set value(e) {
		this._value = this._transformers.setValue(e);
	}
	get value() {
		return this._transformers.getValue(this._value);
	}
};
function Gs(e, t) {
	return new Ws(e, t);
}
//#endregion
//#region node_modules/igniteui-webcomponents/components/slider/themes/shared/slider.common.css.js
var Ks = d`[part=inactive]{background:var(--base-track-color)}[part=steps]{color:var(--track-step-color)}[part=fill]{background:var(--track-color)}[part=tick]{background:var(--tick-color)}[part~=thumb]{background:var(--thumb-color)}[part=thumb-label-inner]{color:var(--label-text-color);background:var(--label-background-color);padding:0 max(var(--is-large, 1)*max(0.5rem, -1 * 0.5rem)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(0.5rem, -1 * 0.5rem)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(0.5rem, -1 * 0.5rem)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))))}[part=thumb-label-inner]::after{border-top:.625rem solid var(--label-background-color)}:host([disabled]) [part~=thumb],:host(:disabled) [part~=thumb]{background:var(--disabled-thumb-color)}:host([disabled]) [part=inactive],:host(:disabled) [part=inactive]{background:var(--disabled-base-track-color)}`, qs = d`:host{--is-large: clamp(0, (var(--component-size, 1) + 1) - var(--ig-size-large, 3), 1);--is-medium: min( clamp(0, (var(--component-size, 1) + 1) - var(--ig-size-medium, 2), 1), clamp(0, var(--ig-size-large, 3) - var(--component-size, 1), 1) );--is-small: clamp(0, var(--ig-size-medium) - var(--component-size, 1), 1);position:relative;box-sizing:border-box;scrollbar-width:var(--ig-scrollbar-size, var(--sb-size));scrollbar-color:var(--ig-scrollbar-thumb-background, var(--sb-thumb-bg-color)) var(--ig-scrollbar-track-background, var(--sb-track-bg-color))}:host ::-webkit-scrollbar{width:var(--ig-scrollbar-size, var(--sb-size));height:var(--ig-scrollbar-size, var(--sb-size));background:var(--ig-scrollbar-track-background, var(--sb-track-bg-color))}:host ::-webkit-scrollbar-thumb{background:var(--ig-scrollbar-thumb-background, var(--sb-thumb-bg-color))}:host *,:host *::before,:host *::after{box-sizing:border-box}:host([hidden]),[hidden]{display:none !important}:host{display:block}slot{display:none}[part~=base]{display:flex;position:relative;flex-grow:1;align-items:center;height:3rem;transition:all .2s ease-out;font-family:var(--ig-font-family);touch-action:pan-y pinch-zoom}[part=track]{border-radius:clamp(0rem,calc(var(--ig-radius-factor, 1) * 2rem),2rem);position:relative;width:100%;overflow:hidden}[part=fill]{position:absolute;border-radius:inherit}[part=inactive]{position:absolute;width:100%;top:.0625rem;transition:background .2s ease-out;border-radius:inherit}[part=steps]{position:absolute;width:100%;height:.25rem;opacity:.85;transition:opacity .2s ease-out;top:50%;transform:translateY(-50%)}[part=steps] svg{clip-path:inset(0 0.1875rem 0 0.1875rem)}[part=steps] line{transform:translateY(25%);stroke:currentcolor;stroke-width:.1875rem;stroke-linecap:round}[part=ticks]{width:100%;display:flex;position:absolute;bottom:0;justify-content:space-between}[part=ticks]:first-child{bottom:auto;top:0;align-items:flex-end}[part=ticks]:first-child [part=tick-label]{top:auto;bottom:1.5rem}[part=tick-group]:first-of-type{margin-inline-start:-0.0625rem}[part=tick-group]:last-of-type{margin-inline-end:-0.0625rem}[part=tick]{height:.5rem;width:.125rem}[part=tick][data-primary=true]{height:1rem}[part=tick-label]{position:absolute;top:1.5rem;line-height:.7;opacity:1;transition:opacity .2s ease-in-out;font-family:var(--ig-caption-font-family, var(--ig-font-family));font-size:var(--ig-caption-font-size);font-weight:var(--ig-caption-font-weight);font-style:var(--ig-caption-font-style);line-height:var(--ig-caption-line-height);letter-spacing:var(--ig-caption-letter-spacing);text-transform:var(--ig-caption-text-transform);margin-top:var(--ig-caption-margin-top);margin-bottom:var(--ig-caption-margin-bottom)}[part=tick-label-inner]{margin-inline-start:-50%}[part=thumbs]{position:absolute;width:100%;height:0;cursor:default;inset-inline-start:0}[part~=thumb]{border-radius:clamp(0rem,calc(var(--ig-radius-factor, 1) * 0.625rem),0.625rem);position:absolute;display:flex;justify-content:center;align-items:center;flex-direction:column;outline-style:none;transition:transform .1s ease-out,border-radius .1s ease-out}[part=thumb-label]{position:absolute;top:calc((1.875rem + 1.25rem)*-1);pointer-events:none;height:1.875rem;display:flex}[part=thumb-label-inner]{font-family:var(--ig-caption-font-family, var(--ig-font-family));font-size:var(--ig-caption-font-size);font-weight:var(--ig-caption-font-weight);font-style:var(--ig-caption-font-style);line-height:var(--ig-caption-line-height);letter-spacing:var(--ig-caption-letter-spacing);text-transform:var(--ig-caption-text-transform);margin-top:var(--ig-caption-margin-top);margin-bottom:var(--ig-caption-margin-bottom);border-radius:clamp(0rem,calc(var(--ig-radius-factor, 1) * 0.125rem),0.125rem);display:flex;min-width:2.5rem;align-items:center;justify-content:center;white-space:nowrap;margin-inline-start:-50%;padding:0 max(var(--is-large, 1)*max(0.125rem, -1 * 0.125rem)*var(--ig-spacing-inline-large, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-medium, 1)*max(0.125rem, -1 * 0.125rem)*var(--ig-spacing-inline-medium, var(--ig-spacing-inline, var(--ig-spacing))),var(--is-small, 1)*max(0.125rem, -1 * 0.125rem)*var(--ig-spacing-inline-small, var(--ig-spacing-inline, var(--ig-spacing))))}[part=thumb-label-inner]::after{content:"";position:absolute;top:85%;border-left:.625rem solid rgba(0,0,0,0);border-right:.625rem solid rgba(0,0,0,0)}:host(:not([tick-label-rotation="0"])) [part=tick-label-inner]{writing-mode:vertical-rl;margin-inline-start:0;margin-block:-50%}:host([tick-label-rotation="-90"]) [part=tick-label-inner]{transform:rotate(180deg)}:host([disabled]),:host(:disabled){-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:none;cursor:initial}@media(forced-colors: active){[part=tick]{--tick-color: CanvasText}[part=track],[part=thumb],[part=thumb-label-inner]{border:.0625rem solid CanvasText}[part~=thumbs] [part~=thumb][part~=focused]{border-color:Highlight}[part~=thumbs] [part=thumb-label-inner]::after{border-top:none}:host(:disabled) [part=track],:host(:disabled) [part~=thumbs] [part=thumb]{border-color:GrayText}}`, Js = d`:host{--track-color: var(--ig-slider-track-color, var(--ig-gray-800));--track-hover-color: var(--ig-slider-track-hover-color, var(--ig-primary-500));--thumb-color: var(--ig-slider-thumb-color, var(--ig-primary-500));--thumb-border-color: var(--ig-slider-thumb-border-color, var(--ig-primary-500));--thumb-border-hover-color: var(--ig-slider-thumb-border-hover-color, var(--ig-primary-500));--thumb-border-focus-color: var(--ig-slider-thumb-border-focus-color, var(--ig-surface-500));--thumb-focus-color: var(--ig-slider-thumb-focus-color, var(--ig-primary-200));--disabled-thumb-color: var(--ig-slider-disabled-thumb-color, var(--ig-gray-400));--base-track-color: var(--ig-slider-base-track-color, hsl(from var(--ig-secondary-500) h s l/0.48));--base-track-hover-color: var(--ig-slider-base-track-hover-color, hsl(from var(--ig-secondary-500) h s l/0.48));--disabled-base-track-color: var(--ig-slider-disabled-base-track-color, var(--ig-gray-200));--disabled-fill-track-color: var(--ig-slider-disabled-fill-track-color, var(--ig-gray-500));--ig-theme: bootstrap;--ig-theme-variant: dark}`, Ys = d`:host{--track-color: var(--ig-slider-track-color, var(--ig-gray-600));--thumb-disabled-border-color: var(--ig-slider-thumb-disabled-border-color, var(--ig-gray-200));--label-background-color: var(--ig-slider-label-background-color, var(--ig-primary-500));--track-hover-color: var(--ig-slider-track-hover-color, var(--ig-primary-300));--thumb-color: var(--ig-slider-thumb-color, var(--ig-surface-500));--thumb-border-color: var(--ig-slider-thumb-border-color, var(--ig-gray-400));--thumb-border-hover-color: var(--ig-slider-thumb-border-hover-color, var(--ig-gray-400));--thumb-border-focus-color: var(--ig-slider-thumb-border-focus-color, var(--ig-gray-700));--thumb-focus-color: var(--ig-slider-thumb-focus-color, var(--ig-primary-100));--disabled-thumb-color: var(--ig-slider-disabled-thumb-color, var(--ig-surface-500));--base-track-color: var(--ig-slider-base-track-color, var(--ig-gray-300));--base-track-hover-color: var(--ig-slider-base-track-hover-color, var(--ig-gray-300));--disabled-base-track-color: var(--ig-slider-disabled-base-track-color, var(--ig-gray-100));--disabled-fill-track-color: var(--ig-slider-disabled-fill-track-color, var(--ig-gray-300));--ig-theme: fluent;--ig-theme-variant: dark}`, Xs = d`:host{--track-color: var(--ig-slider-track-color, var(--ig-primary-400));--track-step-color: var(--ig-slider-track-step-color, hsl(from var(--ig-gray-50-contrast) h s l/0.3));--track-step-size: var(--ig-slider-track-step-size, 0.125rem);--thumb-disabled-border-color: var(--ig-slider-thumb-disabled-border-color, var(--ig-primary-800));--label-background-color: var(--ig-slider-label-background-color, var(--ig-gray-300));--label-text-color: var(--ig-slider-label-text-color, var(--ig-gray-50-contrast));--tick-color: var(--ig-slider-tick-color, hsl(from var(--ig-gray-50-contrast) h s l/0.2));--tick-label-color: var(--ig-slider-tick-label-color, hsl(from var(--ig-gray-50-contrast) h s l/0.6));--base-track-color: var(--ig-slider-base-track-color, hsl(from var(--ig-gray-50-contrast) h s l/0.3));--base-track-hover-color: var(--ig-slider-base-track-hover-color, hsl(from var(--ig-gray-50-contrast) h s l/0.4));--track-hover-color: var(--ig-slider-track-hover-color, var(--ig-primary-300));--thumb-color: var(--ig-slider-thumb-color, var(--ig-surface-500));--thumb-border-color: var(--ig-slider-thumb-border-color, var(--ig-primary-400));--thumb-border-hover-color: var(--ig-slider-thumb-border-hover-color, var(--ig-primary-300));--thumb-border-focus-color: var(--ig-slider-thumb-border-focus-color, var(--ig-primary-500));--thumb-focus-color: var(--ig-slider-thumb-focus-color, hsl(from var(--ig-primary-400) h s l/0.5));--disabled-thumb-color: var(--ig-slider-disabled-thumb-color, var(--ig-surface-500));--disabled-base-track-color: var(--ig-slider-disabled-base-track-color, hsl(from var(--ig-gray-50-contrast) h s l/0.15));--disabled-fill-track-color: var(--ig-slider-disabled-fill-track-color, var(--ig-primary-800));--ig-theme: indigo;--ig-theme-variant: dark}`, Zs = d`:host{--track-step-color: var(--ig-slider-track-step-color, var(--ig-secondary-200));--thumb-color: var(--ig-slider-thumb-color, var(--ig-secondary-500));--thumb-border-color: var(--ig-slider-thumb-border-color, var(--ig-secondary-500));--thumb-border-hover-color: var(--ig-slider-thumb-border-hover-color, var(--ig-secondary-500));--thumb-border-focus-color: var(--ig-slider-thumb-border-focus-color, var(--ig-secondary-500));--track-hover-color: var(--ig-slider-track-hover-color, var(--ig-secondary-400));--thumb-focus-color: var(--ig-slider-thumb-focus-color, transparent);--disabled-thumb-color: var(--ig-slider-disabled-thumb-color, var(--ig-gray-400));--base-track-color: var(--ig-slider-base-track-color, hsl(from var(--ig-secondary-500) h s l/0.24));--base-track-hover-color: var(--ig-slider-base-track-hover-color, hsl(from var(--ig-secondary-500) h s l/0.24));--disabled-base-track-color: var(--ig-slider-disabled-base-track-color, var(--ig-gray-200));--disabled-fill-track-color: var(--ig-slider-disabled-fill-track-color, var(--ig-gray-400));--ig-theme: material;--ig-theme-variant: dark}`, Qs = d`:host{--track-color: var(--ig-slider-track-color, var(--ig-gray-800));--track-hover-color: var(--ig-slider-track-hover-color, var(--ig-primary-500));--thumb-color: var(--ig-slider-thumb-color, var(--ig-primary-500));--thumb-border-color: var(--ig-slider-thumb-border-color, var(--ig-primary-500));--thumb-border-hover-color: var(--ig-slider-thumb-border-hover-color, var(--ig-primary-500));--thumb-border-focus-color: var(--ig-slider-thumb-border-focus-color, var(--ig-surface-500));--thumb-focus-color: var(--ig-slider-thumb-focus-color, var(--ig-primary-200));--disabled-thumb-color: var(--ig-slider-disabled-thumb-color, var(--ig-gray-400));--base-track-color: var(--ig-slider-base-track-color, hsl(from var(--ig-secondary-500) h s l/0.24));--base-track-hover-color: var(--ig-slider-base-track-hover-color, hsl(from var(--ig-secondary-500) h s l/0.24));--disabled-base-track-color: var(--ig-slider-disabled-base-track-color, var(--ig-gray-200));--disabled-fill-track-color: var(--ig-slider-disabled-fill-track-color, var(--ig-gray-500));--ig-theme: bootstrap;--ig-theme-variant: light}`, $s = d`:host{--track-color: var(--ig-slider-track-color, var(--ig-gray-800));--label-background-color: var(--ig-slider-label-background-color, var(--ig-primary-500));--track-hover-color: var(--ig-slider-track-hover-color, var(--ig-primary-500));--thumb-color: var(--ig-slider-thumb-color, var(--ig-surface-500));--thumb-border-color: var(--ig-slider-thumb-border-color, var(--ig-gray-700));--thumb-border-hover-color: var(--ig-slider-thumb-border-hover-color, var(--ig-gray-700));--thumb-border-focus-color: var(--ig-slider-thumb-border-focus-color, var(--ig-gray-700));--thumb-focus-color: var(--ig-slider-thumb-focus-color, var(--ig-primary-700));--disabled-thumb-color: var(--ig-slider-disabled-thumb-color, var(--ig-surface-500));--base-track-color: var(--ig-slider-base-track-color, var(--ig-gray-600));--base-track-hover-color: var(--ig-slider-base-track-hover-color, var(--ig-gray-600));--disabled-base-track-color: var(--ig-slider-disabled-base-track-color, var(--ig-gray-100));--disabled-fill-track-color: var(--ig-slider-disabled-fill-track-color, var(--ig-gray-500));--ig-theme: fluent;--ig-theme-variant: light}`, ec = d`:host{--track-color: var(--ig-slider-track-color, var(--ig-primary-500));--track-step-color: var(--ig-slider-track-step-color, hsl(from var(--ig-gray-900) h s l/0.4));--track-step-size: var(--ig-slider-track-step-size, 0.125rem);--thumb-disabled-border-color: var(--ig-slider-thumb-disabled-border-color, var(--ig-primary-50));--label-background-color: var(--ig-slider-label-background-color, var(--ig-gray-600));--label-text-color: var(--ig-slider-label-text-color, var(--ig-gray-600-contrast));--tick-color: var(--ig-slider-tick-color, var(--ig-gray-300));--tick-label-color: var(--ig-slider-tick-label-color, var(--ig-gray-600));--base-track-color: var(--ig-slider-base-track-color, var(--ig-gray-400));--base-track-hover-color: var(--ig-slider-base-track-hover-color, var(--ig-gray-500));--track-hover-color: var(--ig-slider-track-hover-color, var(--ig-primary-400));--thumb-color: var(--ig-slider-thumb-color, var(--ig-gray-50));--thumb-border-color: var(--ig-slider-thumb-border-color, var(--ig-primary-500));--thumb-border-hover-color: var(--ig-slider-thumb-border-hover-color, var(--ig-primary-400));--thumb-border-focus-color: var(--ig-slider-thumb-border-focus-color, var(--ig-primary-500));--thumb-focus-color: var(--ig-slider-thumb-focus-color, hsl(from var(--ig-primary-400) h s l/0.5));--disabled-thumb-color: var(--ig-slider-disabled-thumb-color, var(--ig-gray-50));--disabled-base-track-color: var(--ig-slider-disabled-base-track-color, hsl(from var(--ig-gray-900) h s l/0.15));--disabled-fill-track-color: var(--ig-slider-disabled-fill-track-color, var(--ig-primary-50));--ig-theme: indigo;--ig-theme-variant: light}`, tc = d`:host{--track-step-color: var(--ig-slider-track-step-color, var(--ig-secondary-200));--thumb-color: var(--ig-slider-thumb-color, var(--ig-secondary-500));--thumb-border-color: var(--ig-slider-thumb-border-color, var(--ig-secondary-500));--thumb-border-hover-color: var(--ig-slider-thumb-border-hover-color, var(--ig-secondary-500));--thumb-border-focus-color: var(--ig-slider-thumb-border-focus-color, var(--ig-secondary-500));--track-hover-color: var(--ig-slider-track-hover-color, var(--ig-secondary-400));--thumb-focus-color: var(--ig-slider-thumb-focus-color, transparent);--disabled-thumb-color: var(--ig-slider-disabled-thumb-color, var(--ig-gray-400));--base-track-color: var(--ig-slider-base-track-color, hsl(from var(--ig-secondary-500) h s l/0.24));--base-track-hover-color: var(--ig-slider-base-track-hover-color, hsl(from var(--ig-secondary-500) h s l/0.24));--disabled-base-track-color: var(--ig-slider-disabled-base-track-color, var(--ig-gray-200));--disabled-fill-track-color: var(--ig-slider-disabled-fill-track-color, var(--ig-gray-400));--ig-theme: material;--ig-theme-variant: light}`, nc = d`:host{--track-color: var(--ig-slider-track-color, var(--ig-secondary-500));--track-step-color: var(--ig-slider-track-step-color, white);--track-step-size: var(--ig-slider-track-step-size, 0.1875rem);--thumb-disabled-border-color: var(--ig-slider-thumb-disabled-border-color, var(--ig-gray-400));--label-background-color: var(--ig-slider-label-background-color, var(--ig-gray-700));--label-text-color: var(--ig-slider-label-text-color, var(--ig-gray-700-contrast));--tick-color: var(--ig-slider-tick-color, var(--ig-gray-500));--tick-label-color: var(--ig-slider-tick-label-color, var(--ig-gray-500));--ig-theme-variant: light}`, rc = d`[part=track],[part=inactive]{height:.5rem}[part=fill]{display:none}[part~=thumb]{width:1rem;height:1rem;top:calc((1rem - calc(1rem / 2))*-1);margin-inline-start:calc((1rem - calc(1rem / 2))*-1)}[part~=thumb]:focus{border:.0625rem solid var(--thumb-border-focus-color);box-shadow:0 0 0 .1875rem var(--thumb-focus-color)}[part=tick-label]{color:var(--tick-label-color)}:host([disabled]) [part=tick],:host(:disabled) [part=tick]{background:var(--disabled-base-track-color)}:host([disabled]) [part=tick-label],:host(:disabled) [part=tick-label]{color:var(--disabled-base-track-color)}`, ic = d`:host(:hover) [part=fill]{background:var(--track-hover-color)}:host(:hover) [part~=thumb]{border-color:var(--thumb-focus-color)}[part~=focused]::after{position:absolute;content:"";left:50%;top:50%;transform:translate(-50%, -50%);box-shadow:0 0 0 .0625rem var(--thumb-border-focus-color);width:calc(1rem + 0.125rem*2);height:calc(1rem + 0.125rem*2)}[part=track],[part=fill],[part=inactive]{height:.25rem}[part=inactive]{top:initial}[part=tick-label]{color:var(--tick-label-color)}[part~=thumb]{border:.125rem solid var(--thumb-border-color);width:1rem;height:1rem;top:calc((1rem - 0.5rem)*-1);margin-inline-start:calc((1rem - 0.5rem)*-1)}:host([disabled]) [part=fill],:host(:disabled) [part=fill]{background:var(--disabled-fill-track-color)}:host([disabled]) [part~=thumb],:host(:disabled) [part~=thumb]{border-color:var(--thumb-disabled-border-color)}:host([disabled]) [part=tick-label],:host(:disabled) [part=tick-label]{color:var(--disabled-fill-track-color)}`, ac = d`[part=ticks]{bottom:.1875rem}[part=ticks]:first-child{top:.1875rem}[part=ticks]:first-child [part=tick-label]{top:auto;bottom:1.25rem}[part=thumb-label-inner]{font-family:var(--ig-subtitle-2-font-family, var(--ig-font-family));font-size:var(--ig-subtitle-2-font-size);font-weight:var(--ig-subtitle-2-font-weight);font-style:var(--ig-subtitle-2-font-style);line-height:var(--ig-subtitle-2-line-height);letter-spacing:var(--ig-subtitle-2-letter-spacing);text-transform:var(--ig-subtitle-2-text-transform);margin-top:var(--ig-subtitle-2-margin-top);margin-bottom:var(--ig-subtitle-2-margin-bottom);border-radius:clamp(0rem,calc(var(--ig-radius-factor, 1) * 0.1875rem),0.1875rem);min-width:2.25rem}[part=thumb-label-inner]::after{border-top:.75rem solid var(--label-background-color);top:1rem}[part=thumb-label]{top:calc((1.375rem + 1.125rem)*-1);height:1.375rem}[part=base]:hover [part=inactive]{background:var(--base-track-hover-color)}[part=base]:hover [part=fill]{background:var(--track-hover-color)}[part=track]{border-radius:clamp(0rem,calc(var(--ig-radius-factor, 1) * 0.25rem),0.25rem)}[part=track],[part=fill],[part=inactive]{height:.125rem;top:initial}[part=steps]{height:.125rem}[part=steps] line{transform:none;stroke-width:var(--track-step-size)}[part=tick-label]{font-family:var(--ig-body-2-font-family, var(--ig-font-family));font-size:var(--ig-body-2-font-size);font-weight:var(--ig-body-2-font-weight);font-style:var(--ig-body-2-font-style);line-height:var(--ig-body-2-line-height);letter-spacing:var(--ig-body-2-letter-spacing);text-transform:var(--ig-body-2-text-transform);margin-top:var(--ig-body-2-margin-top);margin-bottom:var(--ig-body-2-margin-bottom);top:1.25rem;color:var(--tick-label-color)}[part~=thumb]{border:.125rem solid var(--thumb-border-color);width:.75rem;height:.75rem;top:calc((0.75rem - 0.375rem)*-1);margin-inline-start:calc((0.75rem - 0.375rem)*-1)}[part~=thumb]:hover,[part~=thumb]:active{transform:scale(1.3333333333);border-color:var(--thumb-border-hover-color)}[part~=thumb]:focus{box-shadow:0 0 0 .1875rem var(--thumb-focus-color)}[part~=thumb]::after{display:none}:host([disabled]) [part=fill],:host(:disabled) [part=fill]{background:var(--disabled-fill-track-color)}:host([disabled]) [part=steps],:host(:disabled) [part=steps]{color:rgba(0,0,0,0)}:host([disabled]) [part=thumb],:host(:disabled) [part=thumb]{border-color:var(--thumb-disabled-border-color)}:host([disabled]) [part=tick],:host(:disabled) [part=tick]{background:var(--disabled-base-track-color)}:host([disabled]) [part=tick-label],:host(:disabled) [part=tick-label]{color:var(--disabled-base-track-color)}`, oc = d`[part=track]{height:.375rem}[part=fill]{height:.375rem}[part=inactive]{height:.25rem;top:.0625rem}[part~=thumb]{width:1.25rem;height:1.25rem;top:calc((1.25rem - 0.625rem)*-1);margin-inline-start:calc((1.25rem - 0.625rem)*-1)}[part~=thumb]::after{border-radius:clamp(0rem,calc(var(--ig-radius-factor, 1) * 1.25rem),1.25rem);position:absolute;content:"";width:2.5rem;height:2.5rem;background:var(--thumb-color);top:calc(50% - 1.25rem);inset-inline-start:calc(50% - 1.25rem);opacity:0;transform:scale(0);transform-origin:center center;transition:transform .1s ease-out,opacity .1s ease-out;overflow:hidden}[part~=thumb]:hover::after{opacity:.12;transform:scale(1)}[part~=thumb]:focus::after{opacity:.18;transform:scale(1)}[part~=thumb]:active::after{opacity:.24}[part=tick-label]{color:var(--tick-label-color)}:host([disabled]) [part=fill],:host([disabled]) [part=tick],:host(:disabled) [part=fill],:host(:disabled) [part=tick]{background:var(--disabled-fill-track-color)}:host([disabled]) [part=tick-label],:host(:disabled) [part=tick-label]{color:var(--disabled-fill-track-color)}@media(forced-colors: active){[part~=thumb][part~=focused]{border:.0625rem solid}}`, sc = {
	light: {
		shared: d`
    ${nc}
  `,
		bootstrap: d`
    ${rc} ${Qs}
  `,
		material: d`
    ${oc} ${tc}
  `,
		fluent: d`
    ${ic} ${$s}
  `,
		indigo: d`
    ${ac} ${ec}
  `
	},
	dark: {
		shared: d`
    ${nc}
  `,
		bootstrap: d`
    ${rc} ${Js}
  `,
		material: d`
    ${oc} ${Zs}
  `,
		fluent: d`
    ${ic} ${Ys}
  `,
		indigo: d`
    ${ac} ${Xs}
  `
	}
}, Q = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, $ = class extends o {
	static {
		this.styles = [qs, Ks];
	}
	get hasLabels() {
		return this.labels?.length > 0;
	}
	get distance() {
		return this.max - this.min;
	}
	set min(e) {
		!It(e) || e > this.max || (this._min = this.hasLabels ? 0 : e, It(this._lowerBound) && this._lowerBound < e && (this._lowerBound = e));
	}
	get min() {
		return this._min;
	}
	set max(e) {
		!It(e) || e < this._min || (this._max = this.hasLabels ? this.labels.length - 1 : e, It(this._upperBound) && this._upperBound > e && (this._upperBound = e));
	}
	get max() {
		return this._max;
	}
	set lowerBound(e) {
		It(e) && (this._lowerBound = Math.min(this._upperBound ?? e, e));
	}
	get lowerBound() {
		let e = this._lowerBound ?? this._min, t = Math.min(this._upperBound ?? this._max, this._max);
		return Pt(e, this._min, t);
	}
	set upperBound(e) {
		It(e) && (this._upperBound = Math.max(this._lowerBound ?? e, e));
	}
	get upperBound() {
		return Pt(this._upperBound ?? this._max, Math.max(this._lowerBound ?? this._min, this.min), this._max);
	}
	willUpdate(e) {
		(e.has("min") || e.has("max") || e.has("lowerBound") || e.has("upperBound") || e.has("step")) && this.normalizeValue();
	}
	constructor() {
		super(), this._min = 0, this._max = 100, this.pointerCaptured = !1, this._thumbLabelTimer = $i(() => {
			this.thumbLabelsVisible = !1;
		}, 750), this.thumbLabelsVisible = !1, this.labels = [], this.disabled = !1, this.discreteTrack = !1, this.hideTooltip = !1, this.step = 1, this.primaryTicks = 0, this.secondaryTicks = 0, this.tickOrientation = "end", this.hidePrimaryLabels = !1, this.hideSecondaryLabels = !1, this.locale = "en", this.tickLabelRotation = 0, Tt(this, sc), kn(this, "pointerdown", this.pointerDown), kn(this, "pointermove", this.pointerMove), kn(this, "lostpointercapture", this.lostPointerCapture), kn(this, "keyup", this.handleKeyUp), Sn(this, { skip: () => this.disabled }).set(nn, () => this.handleArrowKeys(Gt(this) ? -1 : 1)).set(rn, () => this.handleArrowKeys(Gt(this) ? 1 : -1)).set(an, () => this.handleArrowKeys(1)).set(on, () => this.handleArrowKeys(-1)).set(cn, () => this.handleKeyboardIncrement(this.lowerBound - this.activeValue)).set("End", () => this.handleKeyboardIncrement(this.upperBound - this.activeValue)).set(ln, () => this.handlePageKeys(1)).set(un, () => this.handlePageKeys(-1));
	}
	handleArrowKeys(e) {
		let t = this.step ? this.step : 1;
		this.handleKeyboardIncrement(t * e);
	}
	handlePageKeys(e) {
		let t = this.step ? this.step : 1;
		this.handleKeyboardIncrement(e * Math.max((this.upperBound - this.lowerBound) / 10, t));
	}
	handleKeyboardIncrement(e) {
		if (e) {
			let t = this.updateValue(e);
			this.showThumbLabels(), this.hideThumbLabels(), t && this.emitChangeEvent();
		}
	}
	handleKeyUp() {
		this.activeThumb?.part.add("focused");
	}
	handleSlotChange() {
		this.labels = this.labelElements.map((e) => e.textContent ?? ""), this.hasLabels && (this.min = 0, this.max = this.labels.length - 1, this.step = 1);
	}
	get activeValue() {
		return 0;
	}
	normalizeValue() {}
	getTrackStyle() {
		return {};
	}
	updateValue(e) {
		return !1;
	}
	renderThumbs() {
		return c``;
	}
	emitInputEvent() {}
	emitChangeEvent() {}
	validateValue(e) {
		return this.normalizeByStep(Pt(e, this.lowerBound, this.upperBound));
	}
	formatValue(e) {
		let t = e.toLocaleString(this.locale, this.valueFormatOptions);
		return this.valueFormat ? Nr(this.valueFormat, t) : t;
	}
	normalizeByStep(e) {
		return this.step ? e - (e - this.lowerBound) % this.step : e;
	}
	closestHandle(e) {
		return this.thumb;
	}
	totalTickCount() {
		let e = this.hasLabels ? this.primaryTicks > 0 ? this.labels.length : 0 : this.primaryTicks === 1 ? 2 : this.primaryTicks;
		return e > 0 ? (e - 1) * this.secondaryTicks + e : this.secondaryTicks > 0 ? this.secondaryTicks : 0;
	}
	tickValue(e) {
		let t = this.totalTickCount(), n = this.distance, r = (t > 1 ? n / (t - 1) : n) * e;
		return this.min + r;
	}
	isPrimary(e) {
		return this.primaryTicks <= 0 ? !1 : e % (this.secondaryTicks + 1) === 0;
	}
	showThumbLabels() {
		this.disabled || this.hideTooltip || (this._thumbLabelTimer.stop(), this.thumbLabelsVisible = !0);
	}
	hideThumbLabels() {
		this.pointerCaptured || !this.thumbLabelsVisible || this._thumbLabelTimer.start();
	}
	calculateTrackUpdate(e) {
		let { width: t, left: n } = this.activeThumb.getBoundingClientRect(), { width: r } = this.base.getBoundingClientRect(), i = n + t / 2, a = r / this.distance, o = Gt(this) ? e - i : i - e;
		if (this.step) {
			let e = a * this.step;
			return Math.abs(o) < e / 2 ? 0 : Math.round(o / e) * this.step;
		}
		return o / a;
	}
	updateSlider(e) {
		if (this.disabled || !this.activeThumb) return;
		let t = this.calculateTrackUpdate(e);
		t !== 0 && this.updateValue(t);
	}
	pointerDown(e) {
		this.closestHandle(e).focus(), this.startValue = this.activeValue, this.updateSlider(e.clientX), this.setPointerCapture(e.pointerId), this.pointerCaptured = !0, this.showThumbLabels(), e.preventDefault(), this.activeThumb?.part.remove("focused");
	}
	pointerMove(e) {
		this.pointerCaptured && this.updateSlider(e.clientX);
	}
	lostPointerCapture() {
		this.pointerCaptured = !1, this.hideThumbLabels(), this.startValue !== this.activeValue && this.emitChangeEvent(), this.startValue = void 0;
	}
	handleThumbFocus(e) {
		this.activeThumb = e.target;
	}
	_thumbAriaValueText(e) {}
	handleThumbBlur() {
		this.activeThumb?.part.remove("focused"), this.activeThumb = void 0;
	}
	*_renderTicks() {
		let e = this.totalTickCount(), t = this.secondaryTicks + 1;
		for (let n = 0; n < e; n++) {
			let e = this.isPrimary(n), r = e ? this.hidePrimaryLabels : this.hideSecondaryLabels, i = this.hasLabels ? e ? this.labels[Math.round(n / t)] : l : this.formatValue(this.tickValue(n));
			yield c`<div part="tick-group">
        <div part="tick" data-primary=${e}>
          ${r ? l : c`
                  <div part="tick-label">
                    <span part="tick-label-inner">${i}</span>
                  </div>
                `}
        </div>
      </div>`;
		}
	}
	renderTicks() {
		return c`<div part="ticks">${this._renderTicks()}</div>`;
	}
	renderThumb(e, t, n) {
		let r = `${Nt(e - this.min, this.distance)}%`, i = { insetInlineStart: r }, a = {
			insetInlineStart: r,
			opacity: this.thumbLabelsVisible ? 1 : 0
		}, o = this.hasLabels ? this.labels[e] : this.valueFormat || this.valueFormatOptions ? this.formatValue(e) : this._thumbAriaValueText(n);
		return c`
      <div
        part="thumb"
        id=${N(n)}
        tabindex=${this.disabled ? -1 : 0}
        style=${Xi(i)}
        role="slider"
        aria-valuemin=${this.lowerBound}
        aria-valuemax=${this.upperBound}
        aria-valuenow=${e}
        aria-valuetext=${N(o)}
        aria-label=${N(t)}
        aria-disabled=${this.disabled}
        @pointerenter=${this.showThumbLabels}
        @pointerleave=${this.hideThumbLabels}
        @focus=${this.handleThumbFocus}
        @blur=${this.handleThumbBlur}
      ></div>
      ${this.hideTooltip ? l : c`
              <div part="thumb-label" style=${Xi(a)}>
                <div part="thumb-label-inner">
                  ${this.hasLabels ? this.labels[e] : this.formatValue(e)}
                </div>
              </div>
            `}
    `;
	}
	renderSteps() {
		return !this.discreteTrack || !this.step ? l : c`
      <div part="steps">
        <svg width="100%" height="100%" style="display: flex">
          <line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="currentColor"
            stroke-dasharray="0, calc(${100 * Math.SQRT2 * this.step / this.distance}%)"
            stroke-linecap="round"
            stroke-width="2px"
          ></line>
        </svg>
      </div>
    `;
	}
	render() {
		let e = this.tickOrientation === "start", t = this.tickOrientation === "mirror";
		return c`
      <div part="base">
        ${e || t ? c`${this.renderTicks()}` : l}
        <div part="track">
          <div part="inactive"></div>
          <div part="fill" style=${Xi(this.getTrackStyle())}></div>
          ${this.renderSteps()}
        </div>
        ${e ? l : c`${this.renderTicks()}`}
        <div part="thumbs">${this.renderThumbs()}</div>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
	}
};
Q([Ze("[part~='thumb']")], $.prototype, "thumb", void 0), Q([Ze("[part='base']", !0)], $.prototype, "base", void 0), Q([Qe({ selector: "igc-slider-label" })], $.prototype, "labelElements", void 0), Q([Ye()], $.prototype, "thumbLabelsVisible", void 0), Q([Ye()], $.prototype, "labels", void 0), Q([j({ type: Number })], $.prototype, "min", null), Q([j({ type: Number })], $.prototype, "max", null), Q([j({
	type: Number,
	attribute: "lower-bound"
})], $.prototype, "lowerBound", null), Q([j({
	type: Number,
	attribute: "upper-bound"
})], $.prototype, "upperBound", null), Q([j({
	type: Boolean,
	reflect: !0
})], $.prototype, "disabled", void 0), Q([j({
	type: Boolean,
	attribute: "discrete-track"
})], $.prototype, "discreteTrack", void 0), Q([j({
	type: Boolean,
	attribute: "hide-tooltip"
})], $.prototype, "hideTooltip", void 0), Q([j({ type: Number }), na({ transform: ({ value: e, host: t, previous: n }) => t.hasLabels ? 1 : Ft(e, n ?? 1) })], $.prototype, "step", void 0), Q([j({
	type: Number,
	attribute: "primary-ticks"
})], $.prototype, "primaryTicks", void 0), Q([j({
	type: Number,
	attribute: "secondary-ticks"
})], $.prototype, "secondaryTicks", void 0), Q([j({ attribute: "tick-orientation" })], $.prototype, "tickOrientation", void 0), Q([j({
	type: Boolean,
	attribute: "hide-primary-labels"
})], $.prototype, "hidePrimaryLabels", void 0), Q([j({
	type: Boolean,
	attribute: "hide-secondary-labels"
})], $.prototype, "hideSecondaryLabels", void 0), Q([j()], $.prototype, "locale", void 0), Q([j({ attribute: "value-format" })], $.prototype, "valueFormat", void 0), Q([j({ attribute: !1 })], $.prototype, "valueFormatOptions", void 0), Q([j({
	type: Number,
	reflect: !0,
	attribute: "tick-label-rotation"
})], $.prototype, "tickLabelRotation", void 0), $ = Q([Jr], $);
//#endregion
//#region node_modules/igniteui-webcomponents/components/slider/slider-label.js
var cc = class e extends o {
	static {
		this.tagName = "igc-slider-label";
	}
	static {
		this.styles = d`
    :host {
      display: none;
    }
  `;
	}
	static register() {
		M(e);
	}
	createRenderRoot() {
		return this;
	}
}, lc = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, uc = class e extends Vs(Zn($)) {
	constructor() {
		super(...arguments), this._formValue = Gs(this, {
			initialValue: 0,
			transformers: Us
		});
	}
	static {
		this.tagName = "igc-slider";
	}
	static register() {
		M(e, cc);
	}
	set value(e) {
		this._formValue.setValueAndFormState(this.validateValue(Ft(e, this._formValue.value)));
	}
	get value() {
		return this._formValue.value;
	}
	get activeValue() {
		return this.value;
	}
	normalizeValue() {
		let e = this.validateValue(this.value);
		if (e === this.value) return;
		let t = this._pristine;
		this.value = e, this._pristine = t;
	}
	getTrackStyle() {
		return { width: `${Nt(this.value - this.min, this.distance)}%` };
	}
	updateValue(e) {
		let t = Pt(this.value + e, this.lowerBound, this.upperBound);
		return this.value === t ? !1 : (this.value = t, this.emitInputEvent(), !0);
	}
	emitInputEvent() {
		this._emitTouchedEvent("igcInput", { detail: this.value });
	}
	emitChangeEvent() {
		this._emitTouchedEvent("igcChange", { detail: this.value });
	}
	stepUp(e = 1) {
		this.value += e * this.step;
	}
	stepDown(e = 1) {
		this.value -= e * this.step;
	}
	renderThumbs() {
		return this.renderThumb(this.value, this.ariaLabel);
	}
};
lc([j({ type: Number })], uc.prototype, "value", null);
//#endregion
//#region node_modules/igniteui-webcomponents/internals/definitions/defineComponents.js
function dc(...e) {
	for (let t of e) t.register();
}
//#endregion
//#region src/elements/ignite.ts
var fc = "indigo", pc = matchMedia("(prefers-color-scheme: dark)"), mc = () => {
	let e = document.documentElement.dataset.theme;
	return e === "light" || e === "dark" ? e : pc.matches ? "dark" : "light";
}, hc = () => St(fc, mc());
hc(), pc.addEventListener("change", hc), new MutationObserver(hc).observe(document.documentElement, { attributeFilter: ["data-theme"] }), dc(pi, qi, uc, Gi, Z), t("ig-palette-scope", class extends HTMLElement {
	#e = {};
	set vars(e) {
		for (let t of Object.keys(this.#e)) (!e || !(t in e)) && this.style.removeProperty(t);
		this.#e = e ?? {};
		for (let [e, t] of Object.entries(this.#e)) this.style.setProperty(e, t);
	}
	get vars() {
		return this.#e;
	}
}), t("ig-verdict", class extends o {
	static properties = { findings: { attribute: !1 } };
	static styles = d`
    :host {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-family: var(--mono, ui-monospace, monospace);
      font-size: var(--text-sm, 13px);
    }

    .ok {
      color: var(--pass, currentColor);
    }

    .no {
      color: var(--fail, currentColor);
    }
  `;
	constructor() {
		super(), this.findings = [];
	}
	render() {
		return this.findings.map((e) => c`<span class=${e.ok ? "ok" : "no"}>${e.text}</span>`);
	}
});
//#endregion
export { w as S, ae as _, _e as a, ie as b, Se as c, De as d, Ce as f, fe as g, ne as h, Be as i, Ee as l, T as m, He as n, be as o, _ as p, ze as r, Te as s, Ge as t, xe as u, S as v, E as x, C as y };
