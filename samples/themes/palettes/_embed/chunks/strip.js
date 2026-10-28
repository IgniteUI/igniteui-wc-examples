import { i as e, p as t, r as n, t as r, u as i } from "./variants.js";
import { S as a, _ as o, g as s, h as c, m as l, v as u, y as d } from "./elements.js";
//#region src/preset-model.ts
var f = 1.005, p = [
	{
		key: "primary",
		label: "Primary"
	},
	{
		key: "secondary",
		label: "Secondary"
	},
	{
		key: "info",
		label: "Info"
	},
	{
		key: "success",
		label: "Success"
	},
	{
		key: "warn",
		label: "Warn"
	},
	{
		key: "error",
		label: "Error"
	}
], m = (e, t, n, r, i) => {
	let a = l(u(n), r);
	return {
		key: t,
		token: `--ig-${e}-${t}`,
		rgb: a,
		ratio: c(a, r),
		hex: o(a),
		against: i,
		clipped: !s(h(n)),
		same: []
	};
}, h = (e) => {
	let [t, n, r] = d(e);
	return [
		t,
		n,
		r
	];
}, g = (e) => {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = t.get(n.hex) ?? [];
		e.push(n), t.set(n.hex, e);
	}
	for (let e of t.values()) if (!(e.length < 2)) for (let t of e) t.same = e.filter((e) => e !== t).map((e) => e.key);
}, _ = ({ side: e, label: t, family: n, keys: r, against: i, againstLabel: a, probeable: o = !1 }) => {
	let s = r.map((t) => m(n, t, e.values[`${n}-${t}`], i, a));
	return g(s), {
		vars: e.vars,
		label: t,
		swatches: s,
		probeable: o
	};
}, v = [
	255,
	255,
	255
], y = (t, n, r) => _({
	side: t,
	label: n,
	family: r,
	keys: e,
	against: v,
	againstLabel: "white",
	probeable: !0
}), b = (t) => {
	let i = t.seeds.surface, o = a(i), s = (e, t, n, r, i) => _({
		side: e,
		label: t,
		family: n,
		keys: r,
		against: v,
		againstLabel: "white",
		probeable: i
	}), d = (t, n, r) => _({
		side: t,
		label: n,
		family: r,
		keys: e,
		against: o,
		againstLabel: `the page ${i}`,
		probeable: !0
	}), m = p.map(({ key: n, label: i }) => ({
		key: n,
		label: i,
		seed: t.seeds[n],
		shades: [s(t.legacy, "legacy", n, e, !0), s(t.fitted, "fitted", n, e, !0)],
		accents: [s(t.legacy, "legacy accent", n, r, !1), s(t.fitted, "fitted accent", n, r, !1)]
	})), h = n.map((e) => {
		let n = t.fitted.values[`surface-${e}`], r = c(l(u(n), o), o);
		return {
			key: e,
			away: r,
			collapsed: r < f
		};
	});
	return {
		key: t.key,
		label: t.label,
		theme: t.theme,
		bg: i,
		families: m,
		surface: {
			bg: i,
			seed: t.seeds.gray,
			fittedVars: t.fitted.vars,
			legacySurface: d(t.legacy, "legacy", "surface"),
			roles: h,
			grays: [d(t.legacy, "legacy", "gray"), d(t.fitted, "fitted", "gray")]
		}
	};
}, x = [
	[7, "AAA"],
	[4.5, "AA"],
	[3, "UI"]
], S = (e) => x.find(([t]) => e >= t)?.[1] ?? null, C = (e) => `${e.toFixed(1)}:1`, w = (e) => e.length > 1 ? `${e.slice(0, -1).join(", ")} and ${e.at(-1)}` : e[0], T = (e, t, n) => {
	let r = [`${e.token}  ${e.hex}`];
	return r.push(t ? `${n.toFixed(2)}:1 against ${t} · ${S(n) ?? "below 3:1, no grade"}` : `${n.toFixed(2)}:1 against ${e.against}`), e.same.length && r.push(`same color as ${w(e.same)}`), e.clipped && r.push("asked for a color the screen cannot show, so it was clipped"), r.join("   ");
}, E = /* @__PURE__ */ new WeakMap(), D = (e) => {
	let t = e.getRootNode(), n = t instanceof ShadowRoot ? t : document.body, r = E.get(n);
	return r || (r = document.createElement("igc-tooltip"), r.setAttribute("placement", "bottom"), r.setAttribute("show-delay", "120"), r.setAttribute("hide-delay", "0"), n.append(r), E.set(n, r)), r;
}, O = (e, n, r, a) => {
	let o = r?.key === e.key, s = r && !o ? c(e.rgb, r.rgb) : e.ratio, l = r && !o ? r.key : null, u = l ? S(s) : null, d = (t) => {
		let n = t.currentTarget, r = D(n);
		r.textContent = T(e, l, s), r.show(n);
	}, f = (e) => D(e.currentTarget).hide();
	return t`
    <button
      type="button"
      role="radio"
      aria-checked=${o}
      tabindex=${e.key === a ? 0 : -1}
      data-key=${e.key}
      class=${[
		"swatch",
		o ? "is-reference" : "",
		l && !u ? "is-short" : ""
	].join(" ")}
      style=${`background:var(${e.token});color:var(${e.token}-contrast)`}
      @click=${() => n.pin(o ? null : e.key)}
      @pointerenter=${d}
      @focus=${d}
      @pointerleave=${f}
      @blur=${f}
    >
      <span class="swatch-key">${e.key}</span>
      <span class="swatch-ratio">
        ${o ? t`<span aria-hidden="true">ref</span
                ><span class="visually-hidden">reference</span>` : C(s)}
      </span>
      ${u ? t`<span class="grade">${u}</span>` : i}
      ${e.same.length ? t`<span class="twin" aria-hidden="true">=</span
              ><span class="visually-hidden">same color as ${w(e.same)}</span>` : i}
    </button>
  `;
}, k = (e, n) => {
	let r = e.probeable && n.pinned ? e.swatches.find((e) => e.key === n.pinned) ?? null : null, i = r?.key ?? e.swatches[0].key;
	return t`
    <ig-palette-scope class="row" .vars=${e.vars}>
      <span class="who">${e.label}</span>
      <div
        class="strip"
        role="radiogroup"
        aria-label=${`${e.label} shades. Pick one to compare the others against it.`}
        @keydown=${(t) => {
		if (t.key === "Escape") {
			n.pin(null);
			return;
		}
		let r = e.swatches.map((e) => e.key), a = r.indexOf(t.target.dataset.key ?? i), o = {
			ArrowLeft: a - 1,
			ArrowRight: a + 1,
			Home: 0,
			End: r.length - 1
		}[t.key];
		if (o === void 0) return;
		t.preventDefault();
		let s = r[Math.min(r.length - 1, Math.max(0, o))];
		n.pin(s);
		let c = t.currentTarget;
		requestAnimationFrame(() => c.querySelector(`[data-key="${s}"]`)?.focus({ preventScroll: !0 }));
	}}
      >
        ${e.swatches.map((e) => O(e, n, r, i))}
      </div>
    </ig-palette-scope>
  `;
}, A = (e, { against: n, rows: r }) => t`
  <div class="keyline">
    ${e.pinned ? t`
          <span
            >Every shade is now measured against its own <b>${e.pinned}</b>. AAA needs
            7:1, AA needs 4.5:1, and 3:1 is enough for things like borders and icons.</span
          >
          <button type="button" class="clear" @click=${() => e.pin(null)}>
            Clear
          </button>
        ` : t`<span
            >Click any shade to measure every other shade in its row against it. Until
            then, each ratio is against <b>${n}</b>.</span
          >`}
    ${r.some((e) => e.swatches.some((e) => e.same.length > 0)) ? t`<span
            ><span class="key-twin" aria-hidden="true">=</span>the same color as another
            shade in the row</span
          >` : i}
  </div>
`;
//#endregion
export { y as i, k as n, b as r, A as t };
