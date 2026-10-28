import { o as e, s as t } from "./variants.js";
//#region src/sections/color/state.ts
var n = {
	preset: "material",
	theme: "light",
	pinned: null
}, r = (r) => {
	let i = new URLSearchParams(r.split("?")[1] ?? ""), a = i.get("preset"), o = i.get("theme");
	return {
		preset: e(a) ? a : n.preset,
		theme: t(o) ? o : n.theme,
		pinned: null
	};
}, i = (e, t) => {
	let [n, r = ""] = e.split("?"), i = new URLSearchParams(r);
	return i.set("preset", t.preset), i.set("theme", t.theme), `${n || "#/color"}?${i}`;
}, a = class {
	state;
	listeners = /* @__PURE__ */ new Set();
	constructor(e = {}, t) {
		this.onChange = t, this.state = {
			...n,
			...e
		};
	}
	get value() {
		return this.state;
	}
	set(e) {
		let t = {
			...this.state,
			...e
		};
		if (!(t.preset === this.state.preset && t.theme === this.state.theme && t.pinned === this.state.pinned)) {
			this.state = t, this.onChange?.(t);
			for (let e of this.listeners) e();
		}
	}
	subscribe(e) {
		return this.listeners.add(e), () => this.listeners.delete(e);
	}
}, o, s = () => (o ??= new a(r(location.hash), (e) => history.replaceState(null, "", i(location.hash, e))), o), c = class {
	host;
	listener = () => this.host.requestUpdate();
	bound;
	release;
	constructor(e) {
		this.host = e, e.addController(this);
	}
	get store() {
		return this.host.store ?? s();
	}
	get value() {
		return this.store.value;
	}
	set(e) {
		this.store.set(e);
	}
	bind() {
		let e = this.store;
		e !== this.bound && (this.release?.(), this.bound = e, this.release = e.subscribe(this.listener));
	}
	hostConnected() {
		this.bind();
	}
	hostUpdate() {
		this.bound && this.bind();
	}
	hostDisconnected() {
		this.release?.(), this.release = void 0, this.bound = void 0;
	}
};
//#endregion
export { a as n, c as t };
