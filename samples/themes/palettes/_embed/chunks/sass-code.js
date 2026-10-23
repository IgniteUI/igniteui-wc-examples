//#region src/sass-code.ts
var e = (e) => t(String(Number(e.toFixed(3)))), t = (e) => ({
	kind: "raw",
	text: String(e)
}), n = (...e) => ({
	kind: "list",
	items: e.map((e) => typeof e == "object" ? e : t(e))
}), r = (e) => ({
	kind: "map",
	entries: e
}), i = (e, t) => ({
	kind: "call",
	name: e,
	args: t
}), a = (e) => Object.entries(e).filter((e) => e[1] !== void 0), o = 64, s = (e) => {
	switch (e.kind) {
		case "raw": return e.text;
		case "quoted": return `'${e.text}'`;
		case "list": return e.items.map(s).join(" ");
		case "map": return `(${e.entries.map(([e, t]) => `${e}: ${s(t)}`).join(", ")})`;
		case "call": return `${e.name}(${e.args.map(([e, t]) => `${e}: ${s(t)}`).join(", ")})`;
	}
}, c = (e, t) => {
	if (e.kind !== "map" && e.kind !== "call") return s(e);
	let n = s(e);
	if (n.length + t * 4 <= o) return n;
	let r = e.kind === "map" ? e.entries : e.args, i = "    ".repeat(t + 1), a = e.kind === "map" ? "," : "", l = r.map(([e, n], o) => `${i}${e}: ${c(n, t + 1)}${o === r.length - 1 ? a : ","}`).join("\n"), u = "    ".repeat(t);
	return e.kind === "map" ? `(\n${l}\n${u})` : `${e.name}(\n${l}\n${u})`;
}, l = (e, t) => `$${e}: ${c(t, 0)};`;
//#endregion
export { e as a, r as i, a as n, t as o, n as r, l as s, i as t };
