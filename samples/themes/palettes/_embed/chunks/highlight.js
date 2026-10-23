//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = [Object.freeze(JSON.parse("{\"displayName\":\"CSS\",\"name\":\"css\",\"patterns\":[{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"},{\"include\":\"#combinators\"},{\"include\":\"#selector\"},{\"include\":\"#at-rules\"},{\"include\":\"#rule-list\"}],\"repository\":{\"at-rules\":{\"patterns\":[{\"begin\":\"\\\\A\\\\uFEFF?(?i:(?=\\\\s*@charset\\\\b))\",\"end\":\";|(?=$)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.terminator.rule.css\"}},\"name\":\"meta.at-rule.charset.css\",\"patterns\":[{\"captures\":{\"1\":{\"name\":\"invalid.illegal.not-lowercase.charset.css\"},\"2\":{\"name\":\"invalid.illegal.leading-whitespace.charset.css\"},\"3\":{\"name\":\"invalid.illegal.no-whitespace.charset.css\"},\"4\":{\"name\":\"invalid.illegal.whitespace.charset.css\"},\"5\":{\"name\":\"invalid.illegal.not-double-quoted.charset.css\"},\"6\":{\"name\":\"invalid.illegal.unclosed-string.charset.css\"},\"7\":{\"name\":\"invalid.illegal.unexpected-characters.charset.css\"}},\"match\":\"\\\\G((?!@charset)@\\\\w+)|\\\\G(\\\\s+)|(@charset\\\\S[^;]*)|(?<=@charset)( {2,}|\\\\t+)|(?<=@charset )([^\\\";]+)|(\\\"[^\\\"]+)$|(?<=\\\")([^;]+)\"},{\"captures\":{\"1\":{\"name\":\"keyword.control.at-rule.charset.css\"},\"2\":{\"name\":\"punctuation.definition.keyword.css\"}},\"match\":\"((@)charset)(?=\\\\s)\"},{\"begin\":\"\\\"\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.css\"}},\"end\":\"\\\"|$\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.css\"}},\"name\":\"string.quoted.double.css\",\"patterns\":[{\"begin\":\"(?:\\\\G|^)(?=[^\\\"]+$)\",\"end\":\"$\",\"name\":\"invalid.illegal.unclosed.string.css\"}]}]},{\"begin\":\"(?i)((@)import)(?:\\\\s+|$|(?=[\\\"']|/\\\\*))\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.at-rule.import.css\"},\"2\":{\"name\":\"punctuation.definition.keyword.css\"}},\"end\":\";\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.terminator.rule.css\"}},\"name\":\"meta.at-rule.import.css\",\"patterns\":[{\"begin\":\"\\\\G\\\\s*(?=/\\\\*)\",\"end\":\"(?<=\\\\*/)\\\\s*\",\"patterns\":[{\"include\":\"#comment-block\"}]},{\"include\":\"#string\"},{\"include\":\"#url\"},{\"include\":\"#media-query-list\"}]},{\"begin\":\"(?i)((@)font-face)(?=\\\\s*|\\\\{|/\\\\*|$)\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.at-rule.font-face.css\"},\"2\":{\"name\":\"punctuation.definition.keyword.css\"}},\"end\":\"(?!\\\\G)\",\"name\":\"meta.at-rule.font-face.css\",\"patterns\":[{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"},{\"include\":\"#rule-list\"}]},{\"begin\":\"(?i)(@)page(?=[:{\\\\s]|/\\\\*|$)\",\"captures\":{\"0\":{\"name\":\"keyword.control.at-rule.page.css\"},\"1\":{\"name\":\"punctuation.definition.keyword.css\"}},\"end\":\"(?=\\\\s*($|[:;{]))\",\"name\":\"meta.at-rule.page.css\",\"patterns\":[{\"include\":\"#rule-list\"}]},{\"begin\":\"(?i)(?=@media([(\\\\s]|/\\\\*|$))\",\"end\":\"(?<=})(?!\\\\G)\",\"patterns\":[{\"begin\":\"(?i)\\\\G(@)media\",\"beginCaptures\":{\"0\":{\"name\":\"keyword.control.at-rule.media.css\"},\"1\":{\"name\":\"punctuation.definition.keyword.css\"}},\"end\":\"(?=\\\\s*[;{])\",\"name\":\"meta.at-rule.media.header.css\",\"patterns\":[{\"include\":\"#media-query-list\"}]},{\"begin\":\"\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.media.begin.bracket.curly.css\"}},\"end\":\"}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.media.end.bracket.curly.css\"}},\"name\":\"meta.at-rule.media.body.css\",\"patterns\":[{\"include\":\"$self\"}]}]},{\"begin\":\"(?i)(?=@counter-style([\\\"';{\\\\s]|/\\\\*|$))\",\"end\":\"(?<=})(?!\\\\G)\",\"patterns\":[{\"begin\":\"(?i)\\\\G(@)counter-style\",\"beginCaptures\":{\"0\":{\"name\":\"keyword.control.at-rule.counter-style.css\"},\"1\":{\"name\":\"punctuation.definition.keyword.css\"}},\"end\":\"(?=\\\\s*\\\\{)\",\"name\":\"meta.at-rule.counter-style.header.css\",\"patterns\":[{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"},{\"captures\":{\"0\":{\"patterns\":[{\"include\":\"#escapes\"}]}},\"match\":\"[-A-Z_a-z[^\\\\x00-\\\\x7F]](?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.))*\",\"name\":\"variable.parameter.style-name.css\"}]},{\"begin\":\"\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.property-list.begin.bracket.curly.css\"}},\"end\":\"}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.property-list.end.bracket.curly.css\"}},\"name\":\"meta.at-rule.counter-style.body.css\",\"patterns\":[{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"},{\"include\":\"#rule-list-innards\"}]}]},{\"begin\":\"(?i)(?=@document([\\\"';{\\\\s]|/\\\\*|$))\",\"end\":\"(?<=})(?!\\\\G)\",\"patterns\":[{\"begin\":\"(?i)\\\\G(@)document\",\"beginCaptures\":{\"0\":{\"name\":\"keyword.control.at-rule.document.css\"},\"1\":{\"name\":\"punctuation.definition.keyword.css\"}},\"end\":\"(?=\\\\s*[;{])\",\"name\":\"meta.at-rule.document.header.css\",\"patterns\":[{\"begin\":\"(?i)(?<![-\\\\w])(url-prefix|domain|regexp)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"support.function.document-rule.css\"},\"2\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"name\":\"meta.function.document-rule.css\",\"patterns\":[{\"include\":\"#string\"},{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"},{\"match\":\"[^\\\"')\\\\s]+\",\"name\":\"variable.parameter.document-rule.css\"}]},{\"include\":\"#url\"},{\"include\":\"#commas\"},{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"}]},{\"begin\":\"\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.document.begin.bracket.curly.css\"}},\"end\":\"}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.document.end.bracket.curly.css\"}},\"name\":\"meta.at-rule.document.body.css\",\"patterns\":[{\"include\":\"$self\"}]}]},{\"begin\":\"(?i)(?=@(?:-(?:webkit|moz|o|ms)-)?keyframes([\\\"';{\\\\s]|/\\\\*|$))\",\"end\":\"(?<=})(?!\\\\G)\",\"patterns\":[{\"begin\":\"(?i)\\\\G(@)(?:-(?:webkit|moz|o|ms)-)?keyframes\",\"beginCaptures\":{\"0\":{\"name\":\"keyword.control.at-rule.keyframes.css\"},\"1\":{\"name\":\"punctuation.definition.keyword.css\"}},\"end\":\"(?=\\\\s*\\\\{)\",\"name\":\"meta.at-rule.keyframes.header.css\",\"patterns\":[{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"},{\"captures\":{\"0\":{\"patterns\":[{\"include\":\"#escapes\"}]}},\"match\":\"[-A-Z_a-z[^\\\\x00-\\\\x7F]](?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.))*\",\"name\":\"variable.parameter.keyframe-list.css\"}]},{\"begin\":\"\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.keyframes.begin.bracket.curly.css\"}},\"end\":\"}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.keyframes.end.bracket.curly.css\"}},\"name\":\"meta.at-rule.keyframes.body.css\",\"patterns\":[{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"},{\"captures\":{\"1\":{\"name\":\"entity.other.keyframe-offset.css\"},\"2\":{\"name\":\"entity.other.keyframe-offset.percentage.css\"}},\"match\":\"(?i)(?<![-\\\\w])(from|to)(?![-\\\\w])|([-+]?(?:\\\\d+(?:\\\\.\\\\d+)?|\\\\.\\\\d+)%)\"},{\"include\":\"#rule-list\"}]}]},{\"begin\":\"(?i)(?=@supports([(\\\\s]|/\\\\*|$))\",\"end\":\"(?<=})(?!\\\\G)|(?=;)\",\"patterns\":[{\"begin\":\"(?i)\\\\G(@)supports\",\"beginCaptures\":{\"0\":{\"name\":\"keyword.control.at-rule.supports.css\"},\"1\":{\"name\":\"punctuation.definition.keyword.css\"}},\"end\":\"(?=\\\\s*[;{])\",\"name\":\"meta.at-rule.supports.header.css\",\"patterns\":[{\"include\":\"#feature-query-operators\"},{\"include\":\"#feature-query\"},{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"}]},{\"begin\":\"\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.supports.begin.bracket.curly.css\"}},\"end\":\"}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.supports.end.bracket.curly.css\"}},\"name\":\"meta.at-rule.supports.body.css\",\"patterns\":[{\"include\":\"$self\"}]}]},{\"begin\":\"(?i)((@)(-(ms|o)-)?viewport)(?=[\\\"';{\\\\s]|/\\\\*|$)\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.at-rule.viewport.css\"},\"2\":{\"name\":\"punctuation.definition.keyword.css\"}},\"end\":\"(?=\\\\s*[;@{])\",\"name\":\"meta.at-rule.viewport.css\",\"patterns\":[{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"}]},{\"begin\":\"(?i)((@)font-feature-values)(?=[\\\"';{\\\\s]|/\\\\*|$)\\\\s*\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.at-rule.font-feature-values.css\"},\"2\":{\"name\":\"punctuation.definition.keyword.css\"}},\"contentName\":\"variable.parameter.font-name.css\",\"end\":\"(?=\\\\s*[;@{])\",\"name\":\"meta.at-rule.font-features.css\",\"patterns\":[{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"}]},{\"include\":\"#font-features\"},{\"begin\":\"(?i)((@)namespace)(?=[\\\"';\\\\s]|/\\\\*|$)\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.at-rule.namespace.css\"},\"2\":{\"name\":\"punctuation.definition.keyword.css\"}},\"end\":\";|(?=[@{])\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.terminator.rule.css\"}},\"name\":\"meta.at-rule.namespace.css\",\"patterns\":[{\"include\":\"#url\"},{\"captures\":{\"1\":{\"patterns\":[{\"include\":\"#comment-block\"}]},\"2\":{\"name\":\"entity.name.function.namespace-prefix.css\",\"patterns\":[{\"include\":\"#escapes\"}]}},\"match\":\"(?i)(?:\\\\G|^|(?<=\\\\s))(?=(?<=\\\\s|^)[-A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\s*/\\\\*(?:[^*]|\\\\*[^/])*\\\\*/)(.*?)([-A-Z_a-z[^\\\\x00-\\\\x7F]](?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.))*)\"},{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"},{\"include\":\"#string\"}]},{\"begin\":\"(?i)(?=@[-\\\\w]+[^;]+;s*$)\",\"end\":\"(?<=;)(?!\\\\G)\",\"patterns\":[{\"begin\":\"(?i)\\\\G(@)[-\\\\w]+\",\"beginCaptures\":{\"0\":{\"name\":\"keyword.control.at-rule.css\"},\"1\":{\"name\":\"punctuation.definition.keyword.css\"}},\"end\":\";\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.terminator.rule.css\"}},\"name\":\"meta.at-rule.header.css\"}]},{\"begin\":\"(?i)(?=@[-\\\\w]+([({\\\\s]|/\\\\*|$))\",\"end\":\"(?<=})(?!\\\\G)\",\"patterns\":[{\"begin\":\"(?i)\\\\G(@)[-\\\\w]+\",\"beginCaptures\":{\"0\":{\"name\":\"keyword.control.at-rule.css\"},\"1\":{\"name\":\"punctuation.definition.keyword.css\"}},\"end\":\"(?=\\\\s*[;{])\",\"name\":\"meta.at-rule.header.css\"},{\"begin\":\"\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.begin.bracket.curly.css\"}},\"end\":\"}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.end.bracket.curly.css\"}},\"name\":\"meta.at-rule.body.css\",\"patterns\":[{\"include\":\"$self\"}]}]}]},\"color-keywords\":{\"patterns\":[{\"match\":\"(?i)(?<![-\\\\w])(aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)(?![-\\\\w])\",\"name\":\"support.constant.color.w3c-standard-color-name.css\"},{\"match\":\"(?i)(?<![-\\\\w])(aliceblue|antiquewhite|aquamarine|azure|beige|bisque|blanchedalmond|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|gainsboro|ghostwhite|gold|goldenrod|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|limegreen|linen|magenta|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|oldlace|olivedrab|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|rebeccapurple|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|thistle|tomato|transparent|turquoise|violet|wheat|whitesmoke|yellowgreen)(?![-\\\\w])\",\"name\":\"support.constant.color.w3c-extended-color-name.css\"},{\"match\":\"(?i)(?<![-\\\\w])currentColor(?![-\\\\w])\",\"name\":\"support.constant.color.current.css\"},{\"match\":\"(?i)(?<![-\\\\w])(ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonFace|ButtonHighlight|ButtonShadow|ButtonText|CaptionText|GrayText|Highlight|HighlightText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText)(?![-\\\\w])\",\"name\":\"invalid.deprecated.color.system.css\"}]},\"combinators\":{\"patterns\":[{\"match\":\"/deep/|>>>\",\"name\":\"invalid.deprecated.combinator.css\"},{\"match\":\">>|[+>~]\",\"name\":\"keyword.operator.combinator.css\"}]},\"commas\":{\"match\":\",\",\"name\":\"punctuation.separator.list.comma.css\"},\"comment-block\":{\"begin\":\"/\\\\*\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.begin.css\"}},\"end\":\"\\\\*/\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.end.css\"}},\"name\":\"comment.block.css\"},\"escapes\":{\"patterns\":[{\"match\":\"\\\\\\\\\\\\h{1,6}\",\"name\":\"constant.character.escape.codepoint.css\"},{\"begin\":\"\\\\\\\\$\\\\s*\",\"end\":\"^(?<!\\\\G)\",\"name\":\"constant.character.escape.newline.css\"},{\"match\":\"\\\\\\\\.\",\"name\":\"constant.character.escape.css\"}]},\"feature-query\":{\"begin\":\"\\\\(\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.condition.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.condition.end.bracket.round.css\"}},\"name\":\"meta.feature-query.css\",\"patterns\":[{\"include\":\"#feature-query-operators\"},{\"include\":\"#feature-query\"}]},\"feature-query-operators\":{\"patterns\":[{\"match\":\"(?i)(?<=[()\\\\s]|^|\\\\*/)(and|not|or)(?=[()\\\\s]|/\\\\*|$)\",\"name\":\"keyword.operator.logical.feature.$1.css\"},{\"include\":\"#rule-list-innards\"}]},\"font-features\":{\"begin\":\"(?i)((@)(annotation|character-variant|ornaments|styleset|stylistic|swash))(?=[\\\"';@{\\\\s]|/\\\\*|$)\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.at-rule.${3:/downcase}.css\"},\"2\":{\"name\":\"punctuation.definition.keyword.css\"}},\"end\":\"(?<=})\",\"name\":\"meta.at-rule.${3:/downcase}.css\",\"patterns\":[{\"begin\":\"\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.property-list.begin.bracket.curly.css\"}},\"end\":\"}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.property-list.end.bracket.curly.css\"}},\"name\":\"meta.property-list.font-feature.css\",\"patterns\":[{\"captures\":{\"0\":{\"patterns\":[{\"include\":\"#escapes\"}]}},\"match\":\"[-A-Z_a-z[^\\\\x00-\\\\x7F]](?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.))*\",\"name\":\"variable.font-feature.css\"},{\"include\":\"#rule-list-innards\"}]}]},\"functional-pseudo-classes\":{\"patterns\":[{\"begin\":\"(?i)((:)dir)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"entity.other.attribute-name.pseudo-class.css\"},\"2\":{\"name\":\"punctuation.definition.entity.css\"},\"3\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"patterns\":[{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"},{\"match\":\"(?i)(?<![-\\\\w])(ltr|rtl)(?![-\\\\w])\",\"name\":\"support.constant.text-direction.css\"},{\"include\":\"#property-values\"}]},{\"begin\":\"(?i)((:)lang)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"entity.other.attribute-name.pseudo-class.css\"},\"2\":{\"name\":\"punctuation.definition.entity.css\"},\"3\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"patterns\":[{\"match\":\"(?<=[(,\\\\s])[A-Za-z]+(-[0-9A-Za-z]*|\\\\\\\\(?:\\\\h{1,6}|.))*(?=[),\\\\s])\",\"name\":\"support.constant.language-range.css\"},{\"begin\":\"\\\"\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.css\"}},\"end\":\"\\\"\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.css\"}},\"name\":\"string.quoted.double.css\",\"patterns\":[{\"include\":\"#escapes\"},{\"match\":\"(?<=[\\\"\\\\s])[*A-Za-z]+(-[*0-9A-Za-z]*)*(?=[\\\"\\\\s])\",\"name\":\"support.constant.language-range.css\"}]},{\"begin\":\"'\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.css\"}},\"end\":\"'\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.css\"}},\"name\":\"string.quoted.single.css\",\"patterns\":[{\"include\":\"#escapes\"},{\"match\":\"(?<=['\\\\s])[*A-Za-z]+(-[*0-9A-Za-z]*)*(?=['\\\\s])\",\"name\":\"support.constant.language-range.css\"}]},{\"include\":\"#commas\"}]},{\"begin\":\"(?i)((:)(?:not|has|matches|where|is))(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"entity.other.attribute-name.pseudo-class.css\"},\"2\":{\"name\":\"punctuation.definition.entity.css\"},\"3\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"patterns\":[{\"include\":\"#selector-innards\"}]},{\"begin\":\"(?i)((:)nth-(?:last-)?(?:child|of-type))(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"entity.other.attribute-name.pseudo-class.css\"},\"2\":{\"name\":\"punctuation.definition.entity.css\"},\"3\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"patterns\":[{\"match\":\"(?i)[-+]?(\\\\d+n?|n)(\\\\s*[-+]\\\\s*\\\\d+)?\",\"name\":\"constant.numeric.css\"},{\"match\":\"(?i)even|odd\",\"name\":\"support.constant.parity.css\"}]}]},\"functions\":{\"patterns\":[{\"begin\":\"(?i)(?<![-\\\\w])(calc)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"support.function.calc.css\"},\"2\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"name\":\"meta.function.calc.css\",\"patterns\":[{\"match\":\"[*/]|(?<=\\\\s|^)[-+](?=\\\\s|$)\",\"name\":\"keyword.operator.arithmetic.css\"},{\"include\":\"#property-values\"}]},{\"begin\":\"(?i)(?<![-\\\\w])(rgba?|hsla?|hwb|lab|oklab|lch|oklch|color)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"support.function.misc.css\"},\"2\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"name\":\"meta.function.color.css\",\"patterns\":[{\"include\":\"#property-values\"}]},{\"begin\":\"(?i)(?<![-\\\\w])((?:-(?:webkit-|moz-|o-))?(?:repeating-)?(?:linear|radial|conic)-gradient)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"support.function.gradient.css\"},\"2\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"name\":\"meta.function.gradient.css\",\"patterns\":[{\"match\":\"(?i)(?<![-\\\\w])(from|to|at|in|hue)(?![-\\\\w])\",\"name\":\"keyword.operator.gradient.css\"},{\"include\":\"#property-values\"}]},{\"begin\":\"(?i)(?<![-\\\\w])(-webkit-gradient)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"invalid.deprecated.gradient.function.css\"},\"2\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"name\":\"meta.function.gradient.invalid.deprecated.gradient.css\",\"patterns\":[{\"begin\":\"(?i)(?<![-\\\\w])(from|to|color-stop)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"invalid.deprecated.function.css\"},\"2\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"patterns\":[{\"include\":\"#property-values\"}]},{\"include\":\"#property-values\"}]},{\"begin\":\"(?i)(?<![-\\\\w])(annotation|attr|blur|brightness|character-variant|clamp|contrast|counters?|cross-fade|drop-shadow|element|fit-content|format|grayscale|hue-rotate|color-mix|image-set|invert|local|max|min|minmax|opacity|ornaments|repeat|saturate|sepia|styleset|stylistic|swash|symbols|cos|sin|tan|acos|asin|atan2??|hypot|sqrt|pow|log|exp|abs|sign)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"support.function.misc.css\"},\"2\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"name\":\"meta.function.misc.css\",\"patterns\":[{\"match\":\"(?i)(?<=[\\\",\\\\s]|\\\\*/|^)\\\\d+x(?=[\\\"'),\\\\s]|/\\\\*|$)\",\"name\":\"constant.numeric.other.density.css\"},{\"include\":\"#property-values\"},{\"match\":\"[^\\\"'),\\\\s]+\",\"name\":\"variable.parameter.misc.css\"}]},{\"begin\":\"(?i)(?<![-\\\\w])(circle|ellipse|inset|polygon|rect)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"support.function.shape.css\"},\"2\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"name\":\"meta.function.shape.css\",\"patterns\":[{\"match\":\"(?i)(?<=\\\\s|^|\\\\*/)(at|round)(?=\\\\s|/\\\\*|$)\",\"name\":\"keyword.operator.shape.css\"},{\"include\":\"#property-values\"}]},{\"begin\":\"(?i)(?<![-\\\\w])(cubic-bezier|steps)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"support.function.timing-function.css\"},\"2\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"name\":\"meta.function.timing-function.css\",\"patterns\":[{\"match\":\"(?i)(?<![-\\\\w])(start|end)(?=\\\\s*\\\\)|$)\",\"name\":\"support.constant.step-direction.css\"},{\"include\":\"#property-values\"}]},{\"begin\":\"(?i)(?<![-\\\\w])((?:translate|scale|rotate)(?:[XYZ]|3D)?|matrix(?:3D)?|skew[XY]?|perspective)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"support.function.transform.css\"},\"2\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"patterns\":[{\"include\":\"#property-values\"}]},{\"include\":\"#url\"},{\"begin\":\"(?i)(?<![-\\\\w])(var)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"support.function.misc.css\"},\"2\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"name\":\"meta.function.variable.css\",\"patterns\":[{\"match\":\"--[-A-Z_a-z[^\\\\x00-\\\\x7F]](?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.))*\",\"name\":\"variable.argument.css\"},{\"include\":\"#property-values\"}]}]},\"media-feature-keywords\":{\"match\":\"(?i)(?<=^|[:\\\\s]|\\\\*/)(?:portrait|landscape|progressive|interlace|fullscreen|standalone|minimal-ui|browser|hover)(?=[)\\\\s]|$)\",\"name\":\"support.constant.property-value.css\"},\"media-features\":{\"captures\":{\"1\":{\"name\":\"support.type.property-name.media.css\"},\"2\":{\"name\":\"support.type.property-name.media.css\"},\"3\":{\"name\":\"support.type.vendored.property-name.media.css\"}},\"match\":\"(?i)(?<=^|[(\\\\s]|\\\\*/)(?:((?:m(?:in-|ax-))?(?:height|width|aspect-ratio|color|color-index|monochrome|resolution)|grid|scan|orientation|display-mode|hover)|((?:m(?:in-|ax-))?device-(?:height|width|aspect-ratio))|((?:[-_](?:webkit|apple|khtml|epub|moz|ms|o|xv|ah|rim|atsc|hp|tc|wap|ro)|(?:mso|prince))-[-\\\\w]+(?=\\\\s*(?:/\\\\*(?:[^*]|\\\\*[^/])*\\\\*/)?\\\\s*[):])))(?=\\\\s|$|[):<=>]|/\\\\*)\"},\"media-query\":{\"begin\":\"\\\\G\",\"end\":\"(?=\\\\s*[;{])\",\"patterns\":[{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"},{\"include\":\"#media-types\"},{\"match\":\"(?i)(?<=\\\\s|^|,|\\\\*/)(only|not)(?=[{\\\\s]|/\\\\*|$)\",\"name\":\"keyword.operator.logical.$1.media.css\"},{\"match\":\"(?i)(?<=\\\\s|^|\\\\*/|\\\\))and(?=\\\\s|/\\\\*|$)\",\"name\":\"keyword.operator.logical.and.media.css\"},{\"match\":\",(?:(?:\\\\s*,)+|(?=\\\\s*[);{]))\",\"name\":\"invalid.illegal.comma.css\"},{\"include\":\"#commas\"},{\"begin\":\"\\\\(\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.parameters.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.parameters.end.bracket.round.css\"}},\"patterns\":[{\"include\":\"#media-features\"},{\"include\":\"#media-feature-keywords\"},{\"match\":\":\",\"name\":\"punctuation.separator.key-value.css\"},{\"match\":\">=|<=|[<=>]\",\"name\":\"keyword.operator.comparison.css\"},{\"captures\":{\"1\":{\"name\":\"constant.numeric.css\"},\"2\":{\"name\":\"keyword.operator.arithmetic.css\"},\"3\":{\"name\":\"constant.numeric.css\"}},\"match\":\"(\\\\d+)\\\\s*(/)\\\\s*(\\\\d+)\",\"name\":\"meta.ratio.css\"},{\"include\":\"#numeric-values\"},{\"include\":\"#comment-block\"}]}]},\"media-query-list\":{\"begin\":\"(?=\\\\s*[^;{])\",\"end\":\"(?=\\\\s*[;{])\",\"patterns\":[{\"include\":\"#media-query\"}]},\"media-types\":{\"captures\":{\"1\":{\"name\":\"support.constant.media.css\"},\"2\":{\"name\":\"invalid.deprecated.constant.media.css\"}},\"match\":\"(?i)(?<=^|[,\\\\s]|\\\\*/)(?:(all|print|screen|speech)|(aural|braille|embossed|handheld|projection|tty|tv))(?=$|[,;{\\\\s]|/\\\\*)\"},\"numeric-values\":{\"patterns\":[{\"captures\":{\"1\":{\"name\":\"punctuation.definition.constant.css\"}},\"match\":\"(#)(?:\\\\h{3,4}|\\\\h{6}|\\\\h{8})\\\\b\",\"name\":\"constant.other.color.rgb-value.hex.css\"},{\"captures\":{\"1\":{\"name\":\"keyword.other.unit.percentage.css\"},\"2\":{\"name\":\"keyword.other.unit.${2:/downcase}.css\"}},\"match\":\"(?i)(?<![-\\\\w])[-+]?(?:[0-9]+(?:\\\\.[0-9]+)?|\\\\.[0-9]+)(?:(?<=[0-9])E[-+]?[0-9]+)?(?:(%)|(deg|grad|rad|turn|Hz|kHz|ch|cm|em|ex|fr|in|mm|mozmm|pc|pt|px|q|rem|rch|rex|rlh|ic|ric|rcap|vh|vw|vb|vi|svh|svw|svb|svi|dvh|dvw|dvb|dvi|lvh|lvw|lvb|lvi|vmax|vmin|cqw|cqi|cqh|cqb|cqmin|cqmax|dpi|dpcm|dppx|s|ms)\\\\b)?\",\"name\":\"constant.numeric.css\"}]},\"property-keywords\":{\"patterns\":[{\"match\":\"(?i)(?<![-\\\\w])(above|absolute|active|add|additive|after-edge|alias|all|all-petite-caps|all-scroll|all-small-caps|alpha|alphabetic|alternate|alternate-reverse|always|antialiased|auto|auto-fill|auto-fit|auto-pos|available|avoid|avoid-column|avoid-page|avoid-region|backwards|balance|baseline|before-edge|below|bevel|bidi-override|blink|block|block-axis|block-start|block-end|bold|bolder|border|border-box|both|bottom|bottom-outside|break-all|break-word|bullets|butt|capitalize|caption|cell|center|central|char|circle|clip|clone|close-quote|closest-corner|closest-side|col-resize|collapse|color|color-burn|color-dodge|column|column-reverse|common-ligatures|compact|condensed|contain|content|content-box|contents|context-menu|contextual|copy|cover|crisp-edges|crispEdges|crosshair|cyclic|dark|darken|dashed|decimal|default|dense|diagonal-fractions|difference|digits|disabled|disc|discretionary-ligatures|distribute|distribute-all-lines|distribute-letter|distribute-space|dot|dotted|double|double-circle|downleft|downright|e-resize|each-line|ease|ease-in|ease-in-out|ease-out|economy|ellipse|ellipsis|embed|end|evenodd|ew-resize|exact|exclude|exclusion|expanded|extends|extra-condensed|extra-expanded|fallback|farthest-corner|farthest-side|fill|fill-available|fill-box|filled|fit-content|fixed|flat|flex|flex-end|flex-start|flip|flow|flow-root|forwards|freeze|from-image|full-width|geometricPrecision|georgian|grab|grabbing|grayscale|grid|groove|hand|hanging|hard-light|help|hidden|hide|historical-forms|historical-ligatures|horizontal|horizontal-tb|hue|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|infinite|inherit|initial|inline|inline-axis|inline-block|inline-end|inline-flex|inline-grid|inline-list-item|inline-start|inline-table|inset|inside|inter-character|inter-ideograph|inter-word|intersect|invert|isolate|isolate-override|italic|jis04|jis78|jis83|jis90|justify|justify-all|kannada|keep-all|landscape|larger??|left|light|lighten|lighter|line|line-edge|line-through|linear|linearRGB|lining-nums|list-item|local|loose|lowercase|lr|lr-tb|ltr|luminance|luminosity|main-size|mandatory|manipulation|manual|margin-box|match-parent|match-source|mathematical|max-content|medium|menu|message-box|middle|min-content|miter|mixed|move|multiply|n-resize|narrower|ne-resize|nearest-neighbor|nesw-resize|newspaper|no-change|no-clip|no-close-quote|no-common-ligatures|no-contextual|no-discretionary-ligatures|no-drop|no-historical-ligatures|no-open-quote|no-repeat|none|nonzero|normal|not-allowed|nowrap|ns-resize|numbers|numeric|nw-resize|nwse-resize|oblique|oldstyle-nums|open|open-quote|optimizeLegibility|optimizeQuality|optimizeSpeed|optional|ordinal|outset|outside|over|overlay|overline|padding|padding-box|page|painted|pan-down|pan-left|pan-right|pan-up|pan-x|pan-y|paused|petite-caps|pixelated|plaintext|pointer|portrait|pre|pre-line|pre-wrap|preserve-3d|progress|progressive|proportional-nums|proportional-width|proximity|radial|recto|region|relative|remove|repeat|repeat-[xy]|reset-size|reverse|revert|revert-layer|ridge|right|rl|rl-tb|round|row|row-resize|row-reverse|row-severse|rtl|ruby|ruby-base|ruby-base-container|ruby-text|ruby-text-container|run-in|running|s-resize|saturation|scale-down|screen|scroll|scroll-position|se-resize|semi-condensed|semi-expanded|separate|sesame|show|sideways|sideways-left|sideways-lr|sideways-right|sideways-rl|simplified|slashed-zero|slice|small|small-caps|small-caption|smaller|smooth|soft-light|solid|space|space-around|space-between|space-evenly|spell-out|square|sRGB|stacked-fractions|start|static|status-bar|swap|step-end|step-start|sticky|stretch|strict|stroke|stroke-box|style|sub|subgrid|subpixel-antialiased|subtract|super|sw-resize|symbolic|table|table-caption|table-cell|table-column|table-column-group|table-footer-group|table-header-group|table-row|table-row-group|tabular-nums|tb|tb-rl|text|text-after-edge|text-before-edge|text-bottom|text-top|thick|thin|titling-caps|top|top-outside|touch|traditional|transparent|triangle|ultra-condensed|ultra-expanded|under|underline|unicase|unset|upleft|uppercase|upright|use-glyph-orientation|use-script|verso|vertical|vertical-ideographic|vertical-lr|vertical-rl|vertical-text|view-box|visible|visibleFill|visiblePainted|visibleStroke|w-resize|wait|wavy|weight|whitespace|wider|words|wrap|wrap-reverse|x|x-large|x-small|xx-large|xx-small|y|zero|zoom-in|zoom-out)(?![-\\\\w])\",\"name\":\"support.constant.property-value.css\"},{\"match\":\"(?i)(?<![-\\\\w])(arabic-indic|armenian|bengali|cambodian|circle|cjk-decimal|cjk-earthly-branch|cjk-heavenly-stem|cjk-ideographic|decimal|decimal-leading-zero|devanagari|disc|disclosure-closed|disclosure-open|ethiopic-halehame-am|ethiopic-halehame-ti-e[rt]|ethiopic-numeric|georgian|gujarati|gurmukhi|hangul|hangul-consonant|hebrew|hiragana|hiragana-iroha|japanese-formal|japanese-informal|kannada|katakana|katakana-iroha|khmer|korean-hangul-formal|korean-hanja-formal|korean-hanja-informal|lao|lower-alpha|lower-armenian|lower-greek|lower-latin|lower-roman|malayalam|mongolian|myanmar|oriya|persian|simp-chinese-formal|simp-chinese-informal|square|tamil|telugu|thai|tibetan|trad-chinese-formal|trad-chinese-informal|upper-alpha|upper-armenian|upper-latin|upper-roman|urdu)(?![-\\\\w])\",\"name\":\"support.constant.property-value.list-style-type.css\"},{\"match\":\"(?<![-\\\\w])(?i:-(?:ah|apple|atsc|epub|hp|khtml|moz|ms|o|rim|ro|tc|wap|webkit|xv)|(?:mso|prince))-[-A-Za-z]+\",\"name\":\"support.constant.vendored.property-value.css\"},{\"match\":\"(?<![-\\\\w])(?i:arial|century|comic|courier|garamond|georgia|helvetica|impact|lucida|symbol|system-ui|system|tahoma|times|trebuchet|ui-monospace|ui-rounded|ui-sans-serif|ui-serif|utopia|verdana|webdings|sans-serif|serif|monospace)(?![-\\\\w])\",\"name\":\"support.constant.font-name.css\"}]},\"property-names\":{\"patterns\":[{\"match\":\"(?i)(?<![-\\\\w])(?:accent-color|additive-symbols|align-content|align-items|align-self|all|animation|animation-delay|animation-direction|animation-duration|animation-fill-mode|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|aspect-ratio|backdrop-filter|backface-visibility|background|background-attachment|background-blend-mode|background-clip|background-color|background-image|background-origin|background-position|background-position-[xy]|background-repeat|background-size|bleed|block-size|border|border-block-end|border-block-end-color|border-block-end-style|border-block-end-width|border-block-start|border-block-start-color|border-block-start-style|border-block-start-width|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-end-end-radius|border-end-start-radius|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-inline-end|border-inline-end-color|border-inline-end-style|border-inline-end-width|border-inline-start|border-inline-start-color|border-inline-start-style|border-inline-start-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-start-end-radius|border-start-start-radius|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|bottom|box-decoration-break|box-shadow|box-sizing|break-after|break-before|break-inside|caption-side|caret-color|clear|clip|clip-path|clip-rule|color|color-adjust|color-interpolation-filters|color-scheme|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|contain|container|container-name|container-type|content|counter-increment|counter-reset|cursor|direction|display|empty-cells|enable-background|fallback|fill|fill-opacity|fill-rule|filter|flex|flex-basis|flex-direction|flex-flow|flex-grow|flex-shrink|flex-wrap|float|flood-color|flood-opacity|font|font-display|font-family|font-feature-settings|font-kerning|font-language-override|font-optical-sizing|font-size|font-size-adjust|font-stretch|font-style|font-synthesis|font-variant|font-variant-alternates|font-variant-caps|font-variant-east-asian|font-variant-ligatures|font-variant-numeric|font-variant-position|font-variation-settings|font-weight|gap|glyph-orientation-horizontal|glyph-orientation-vertical|grid|grid-area|grid-auto-columns|grid-auto-flow|grid-auto-rows|grid-column|grid-column-end|grid-column-gap|grid-column-start|grid-gap|grid-row|grid-row-end|grid-row-gap|grid-row-start|grid-template|grid-template-areas|grid-template-columns|grid-template-rows|hanging-punctuation|height|hyphens|image-orientation|image-rendering|image-resolution|ime-mode|initial-letter|initial-letter-align|inline-size|inset|inset-block|inset-block-end|inset-block-start|inset-inline|inset-inline-end|inset-inline-start|isolation|justify-content|justify-items|justify-self|kerning|left|letter-spacing|lighting-color|line-break|line-clamp|line-height|list-style|list-style-image|list-style-position|list-style-type|margin|margin-block|margin-block-end|margin-block-start|margin-bottom|margin-inline|margin-inline-end|margin-inline-start|margin-left|margin-right|margin-top|marker-end|marker-mid|marker-start|marks|mask|mask-border|mask-border-mode|mask-border-outset|mask-border-repeat|mask-border-slice|mask-border-source|mask-border-width|mask-clip|mask-composite|mask-image|mask-mode|mask-origin|mask-position|mask-repeat|mask-size|mask-type|max-block-size|max-height|max-inline-size|max-lines|max-width|max-zoom|min-block-size|min-height|min-inline-size|min-width|min-zoom|mix-blend-mode|negative|object-fit|object-position|offset|offset-anchor|offset-distance|offset-path|offset-position|offset-rotation|opacity|order|orientation|orphans|outline|outline-color|outline-offset|outline-style|outline-width|overflow|overflow-anchor|overflow-block|overflow-inline|overflow-wrap|overflow-[xy]|overscroll-behavior|overscroll-behavior-block|overscroll-behavior-inline|overscroll-behavior-[xy]|pad|padding|padding-block|padding-block-end|padding-block-start|padding-bottom|padding-inline|padding-inline-end|padding-inline-start|padding-left|padding-right|padding-top|page-break-after|page-break-before|page-break-inside|paint-order|perspective|perspective-origin|place-content|place-items|place-self|pointer-events|position|prefix|quotes|range|resize|right|rotate|row-gap|ruby-align|ruby-merge|ruby-position|scale|scroll-behavior|scroll-margin|scroll-margin-block|scroll-margin-block-end|scroll-margin-block-start|scroll-margin-bottom|scroll-margin-inline|scroll-margin-inline-end|scroll-margin-inline-start|scroll-margin-left|scroll-margin-right|scroll-margin-top|scroll-padding|scroll-padding-block|scroll-padding-block-end|scroll-padding-block-start|scroll-padding-bottom|scroll-padding-inline|scroll-padding-inline-end|scroll-padding-inline-start|scroll-padding-left|scroll-padding-right|scroll-padding-top|scroll-snap-align|scroll-snap-coordinate|scroll-snap-destination|scroll-snap-stop|scroll-snap-type|scrollbar-color|scrollbar-gutter|scrollbar-width|shape-image-threshold|shape-margin|shape-outside|shape-rendering|size|speak-as|src|stop-color|stop-opacity|stroke|stroke-dasharray|stroke-dashoffset|stroke-linecap|stroke-linejoin|stroke-miterlimit|stroke-opacity|stroke-width|suffix|symbols|system|tab-size|table-layout|text-align|text-align-last|text-anchor|text-combine-upright|text-decoration|text-decoration-color|text-decoration-line|text-decoration-skip|text-decoration-skip-ink|text-decoration-style|text-decoration-thickness|text-emphasis|text-emphasis-color|text-emphasis-position|text-emphasis-style|text-indent|text-justify|text-orientation|text-overflow|text-rendering|text-shadow|text-size-adjust|text-transform|text-underline-offset|text-underline-position|top|touch-action|transform|transform-box|transform-origin|transform-style|transition|transition-delay|transition-duration|transition-property|transition-timing-function|translate|unicode-bidi|unicode-range|user-select|user-zoom|vertical-align|visibility|white-space|widows|width|will-change|word-break|word-spacing|word-wrap|writing-mode|z-index|zoom|alignment-baseline|baseline-shift|clip-rule|color-interpolation|color-interpolation-filters|color-profile|color-rendering|cx|cy|dominant-baseline|enable-background|fill|fill-opacity|fill-rule|flood-color|flood-opacity|glyph-orientation-horizontal|glyph-orientation-vertical|height|kerning|lighting-color|marker-end|marker-mid|marker-start|rx??|ry|shape-rendering|stop-color|stop-opacity|stroke|stroke-dasharray|stroke-dashoffset|stroke-linecap|stroke-linejoin|stroke-miterlimit|stroke-opacity|stroke-width|text-anchor|width|[xy]|adjust|after|align|align-last|alignment|alignment-adjust|appearance|attachment|azimuth|background-break|balance|baseline|before|bidi|binding|bookmark|bookmark-label|bookmark-level|bookmark-target|border-length|bottom-color|bottom-left-radius|bottom-right-radius|bottom-style|bottom-width|box|box-align|box-direction|box-flex|box-flex-group|box-lines|box-ordinal-group|box-orient|box-pack|break|character|collapse|column|column-break-after|column-break-before|count|counter|crop|cue|cue-after|cue-before|decoration|decoration-break|delay|display-model|display-role|down|drop|drop-initial-after-adjust|drop-initial-after-align|drop-initial-before-adjust|drop-initial-before-align|drop-initial-size|drop-initial-value|duration|elevation|emphasis|family|fit|fit-position|flex-group|float-offset|gap|grid-columns|grid-rows|hanging-punctuation|header|hyphenate|hyphenate-after|hyphenate-before|hyphenate-character|hyphenate-lines|hyphenate-resource|icon|image|increment|indent|index|initial-after-adjust|initial-after-align|initial-before-adjust|initial-before-align|initial-size|initial-value|inline-box-align|iteration-count|justify|label|left-color|left-style|left-width|length|level|line|line-stacking|line-stacking-ruby|line-stacking-shift|line-stacking-strategy|lines|list|mark|mark-after|mark-before|marks|marquee|marquee-direction|marquee-play-count|marquee-speed|marquee-style|max|min|model|move-to|name|nav|nav-down|nav-index|nav-left|nav-right|nav-up|new|numeral|offset|ordinal-group|orient|origin|overflow-style|overhang|pack|page|page-policy|pause|pause-after|pause-before|phonemes|pitch|pitch-range|play-count|play-during|play-state|point|presentation|presentation-level|profile|property|punctuation|punctuation-trim|radius|rate|rendering-intent|repeat|replace|reset|resolution|resource|respond-to|rest|rest-after|rest-before|richness|right-color|right-style|right-width|role|rotation|rotation-point|rows|ruby|ruby-overhang|ruby-span|rule|rule-color|rule-style|rule-width|shadow|size|size-adjust|sizing|space|space-collapse|spacing|span|speak|speak-header|speak-numeral|speak-punctuation|speech|speech-rate|speed|stacking|stacking-ruby|stacking-shift|stacking-strategy|stress|stretch|string-set|style|style-image|style-position|style-type|target|target-name|target-new|target-position|text|text-height|text-justify|text-outline|text-replace|text-wrap|timing-function|top-color|top-left-radius|top-right-radius|top-style|top-width|trim|unicode|up|user-select|variant|voice|voice-balance|voice-duration|voice-family|voice-pitch|voice-pitch-range|voice-rate|voice-stress|voice-volume|volume|weight|white|white-space-collapse|word|wrap)(?![-\\\\w])\",\"name\":\"support.type.property-name.css\"},{\"match\":\"(?<![-\\\\w])(?i:-(?:ah|apple|atsc|epub|hp|khtml|moz|ms|o|rim|ro|tc|wap|webkit|xv)|(?:mso|prince))-[-A-Za-z]+\",\"name\":\"support.type.vendored.property-name.css\"}]},\"property-values\":{\"patterns\":[{\"include\":\"#commas\"},{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"},{\"include\":\"#functions\"},{\"include\":\"#property-keywords\"},{\"include\":\"#unicode-range\"},{\"include\":\"#numeric-values\"},{\"include\":\"#color-keywords\"},{\"include\":\"#string\"},{\"match\":\"!\\\\s*important(?![-\\\\w])\",\"name\":\"keyword.other.important.css\"}]},\"pseudo-classes\":{\"captures\":{\"1\":{\"name\":\"punctuation.definition.entity.css\"},\"2\":{\"name\":\"invalid.illegal.colon.css\"}},\"match\":\"(?i)(:)(:*)(?:active|any-link|checked|default|disabled|empty|enabled|first|(?:first|last|only)-(?:child|of-type)|focus|focus-visible|focus-within|fullscreen|host|hover|in-range|indeterminate|invalid|left|link|optional|out-of-range|read-only|read-write|required|right|root|scope|target|unresolved|valid|visited)(?![-\\\\w]|\\\\s*[;}])\",\"name\":\"entity.other.attribute-name.pseudo-class.css\"},\"pseudo-elements\":{\"captures\":{\"1\":{\"name\":\"punctuation.definition.entity.css\"},\"2\":{\"name\":\"punctuation.definition.entity.css\"}},\"match\":\"(?i)(?:(::?)(?:after|before|first-letter|first-line|(?:-(?:ah|apple|atsc|epub|hp|khtml|moz|ms|o|rim|ro|tc|wap|webkit|xv)|(?:mso|prince))-[-a-z]+)|(::)(?:backdrop|content|grammar-error|marker|placeholder|selection|shadow|spelling-error))(?![-\\\\w]|\\\\s*[;}])\",\"name\":\"entity.other.attribute-name.pseudo-element.css\"},\"rule-list\":{\"begin\":\"\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.property-list.begin.bracket.curly.css\"}},\"end\":\"}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.property-list.end.bracket.curly.css\"}},\"name\":\"meta.property-list.css\",\"patterns\":[{\"include\":\"#rule-list-innards\"}]},\"rule-list-innards\":{\"patterns\":[{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"},{\"include\":\"#font-features\"},{\"match\":\"(?<![-\\\\w])--[-A-Z_a-z[^\\\\x00-\\\\x7F]](?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.))*\",\"name\":\"variable.css\"},{\"begin\":\"(?<![-A-Za-z])(?=[-A-Za-z])\",\"end\":\"$|(?![-A-Za-z])\",\"name\":\"meta.property-name.css\",\"patterns\":[{\"include\":\"#property-names\"}]},{\"begin\":\"(:)\\\\s*\",\"beginCaptures\":{\"1\":{\"name\":\"punctuation.separator.key-value.css\"}},\"contentName\":\"meta.property-value.css\",\"end\":\"\\\\s*(;)|\\\\s*(?=[)}])\",\"endCaptures\":{\"1\":{\"name\":\"punctuation.terminator.rule.css\"}},\"patterns\":[{\"include\":\"#comment-block\"},{\"include\":\"#property-values\"}]},{\"match\":\";\",\"name\":\"punctuation.terminator.rule.css\"}]},\"selector\":{\"begin\":\"(?=\\\\|?(?:[-#*.:A-\\\\[_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.)))\",\"end\":\"(?=\\\\s*[)/@{])\",\"name\":\"meta.selector.css\",\"patterns\":[{\"include\":\"#selector-innards\"}]},\"selector-innards\":{\"patterns\":[{\"include\":\"#comment-block\"},{\"include\":\"#commas\"},{\"include\":\"#escapes\"},{\"include\":\"#combinators\"},{\"captures\":{\"1\":{\"name\":\"entity.other.namespace-prefix.css\"},\"2\":{\"name\":\"punctuation.separator.css\"}},\"match\":\"(?:^|(?<=[(,;}\\\\s]))(?![-*\\\\w]+\\\\|(?![-#*.:A-\\\\[_a-z[^\\\\x00-\\\\x7F]]))([-A-Z_a-z[^\\\\x00-\\\\x7F]](?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.))*|\\\\*)?(\\\\|)\"},{\"include\":\"#tag-names\"},{\"match\":\"\\\\*\",\"name\":\"entity.name.tag.wildcard.css\"},{\"captures\":{\"1\":{\"name\":\"punctuation.definition.entity.css\"},\"2\":{\"patterns\":[{\"include\":\"#escapes\"}]}},\"match\":\"(?<![-@\\\\w])([#.])((?:-?[0-9]|-(?=$|[#)+,.:>\\\\[{|~\\\\s]|/\\\\*)|(?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.))*(?:[]!\\\"%-(*;<?@^`|}]|/(?!\\\\*))+)(?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.))*)\",\"name\":\"invalid.illegal.bad-identifier.css\"},{\"captures\":{\"1\":{\"name\":\"punctuation.definition.entity.css\"},\"2\":{\"patterns\":[{\"include\":\"#escapes\"}]}},\"match\":\"(\\\\.)((?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.))+)(?=$|[#)+,.:>\\\\[{|~\\\\s]|/\\\\*)\",\"name\":\"entity.other.attribute-name.class.css\"},{\"captures\":{\"1\":{\"name\":\"punctuation.definition.entity.css\"},\"2\":{\"patterns\":[{\"include\":\"#escapes\"}]}},\"match\":\"(#)(-?(?![0-9])(?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.))+)(?=$|[#)+,.:>\\\\[{|~\\\\s]|/\\\\*)\",\"name\":\"entity.other.attribute-name.id.css\"},{\"begin\":\"\\\\[\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.entity.begin.bracket.square.css\"}},\"end\":\"]\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.entity.end.bracket.square.css\"}},\"name\":\"meta.attribute-selector.css\",\"patterns\":[{\"include\":\"#comment-block\"},{\"include\":\"#string\"},{\"captures\":{\"1\":{\"name\":\"storage.modifier.ignore-case.css\"}},\"match\":\"(?<=[\\\"'\\\\s]|^|\\\\*/)\\\\s*([Ii])\\\\s*(?=[]\\\\s]|/\\\\*|$)\"},{\"captures\":{\"1\":{\"name\":\"string.unquoted.attribute-value.css\",\"patterns\":[{\"include\":\"#escapes\"}]}},\"match\":\"(?<==)\\\\s*((?!/\\\\*)(?:[^]\\\"'\\\\\\\\\\\\s]|\\\\\\\\.)+)\"},{\"include\":\"#escapes\"},{\"match\":\"[$*^|~]?=\",\"name\":\"keyword.operator.pattern.css\"},{\"match\":\"\\\\|\",\"name\":\"punctuation.separator.css\"},{\"captures\":{\"1\":{\"name\":\"entity.other.namespace-prefix.css\",\"patterns\":[{\"include\":\"#escapes\"}]}},\"match\":\"(-?(?!\\\\d)(?:[-\\\\w[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.))+|\\\\*)(?=\\\\|(?![=\\\\s]|$|])(?:-?(?!\\\\d)|[-\\\\\\\\\\\\w[^\\\\x00-\\\\x7F]]))\"},{\"captures\":{\"1\":{\"name\":\"entity.other.attribute-name.css\",\"patterns\":[{\"include\":\"#escapes\"}]}},\"match\":\"(-?(?!\\\\d)(?>[-\\\\w[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.))+)\\\\s*(?=[]$*=^|~]|/\\\\*)\"}]},{\"include\":\"#pseudo-classes\"},{\"include\":\"#pseudo-elements\"},{\"include\":\"#functional-pseudo-classes\"},{\"match\":\"(?<![-@\\\\w])(?=[a-z]\\\\w*-)(?:(?![A-Z])[-\\\\w])+(?![-(\\\\w])\",\"name\":\"entity.name.tag.custom.css\"}]},\"string\":{\"patterns\":[{\"begin\":\"\\\"\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.css\"}},\"end\":\"\\\"|(?<!\\\\\\\\)(?=$|\\\\n)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.css\"}},\"name\":\"string.quoted.double.css\",\"patterns\":[{\"begin\":\"(?:\\\\G|^)(?=(?:[^\\\"\\\\\\\\]|\\\\\\\\.)+$)\",\"end\":\"$\",\"name\":\"invalid.illegal.unclosed.string.css\",\"patterns\":[{\"include\":\"#escapes\"}]},{\"include\":\"#escapes\"}]},{\"begin\":\"'\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.css\"}},\"end\":\"'|(?<!\\\\\\\\)(?=$|\\\\n)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.css\"}},\"name\":\"string.quoted.single.css\",\"patterns\":[{\"begin\":\"(?:\\\\G|^)(?=(?:[^'\\\\\\\\]|\\\\\\\\.)+$)\",\"end\":\"$\",\"name\":\"invalid.illegal.unclosed.string.css\",\"patterns\":[{\"include\":\"#escapes\"}]},{\"include\":\"#escapes\"}]}]},\"tag-names\":{\"match\":\"(?i)(?<![-:\\\\w])(?:a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|bgsound|big|blink|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|command|content|data|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|element|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h[1-6]|head|header|hgroup|hr|html|i|iframe|image|img|input|ins|isindex|kbd|keygen|label|legend|li|link|listing|main|map|mark|marquee|math|menu|menuitem|meta|meter|multicol|nav|nextid|nobr|noembed|noframes|noscript|object|ol|optgroup|option|output|p|param|picture|plaintext|pre|progress|q|rb|rp|rtc??|ruby|s|samp|script|section|select|shadow|slot|small|source|spacer|span|strike|strong|style|sub|summary|sup|table|tbody|td|template|textarea|tfoot|th|thead|time|title|tr|track|tt|ul??|var|video|wbr|xmp|altGlyph|altGlyphDef|altGlyphItem|animate|animateColor|animateMotion|animateTransform|circle|clipPath|color-profile|cursor|defs|desc|discard|ellipse|feBlend|feColorMatrix|feComponentTransfer|feComposite|feConvolveMatrix|feDiffuseLighting|feDisplacementMap|feDistantLight|feDropShadow|feFlood|feFuncA|feFuncB|feFuncG|feFuncR|feGaussianBlur|feImage|feMerge|feMergeNode|feMorphology|feOffset|fePointLight|feSpecularLighting|feSpotLight|feTile|feTurbulence|filter|font-face|font-face-format|font-face-name|font-face-src|font-face-uri|foreignObject|g|glyph|glyphRef|hatch|hatchpath|hkern|line|linearGradient|marker|mask|mesh|meshgradient|meshpatch|meshrow|metadata|missing-glyph|mpath|path|pattern|polygon|polyline|radialGradient|rect|set|solidcolor|stop|svg|switch|symbol|text|textPath|tref|tspan|use|view|vkern|annotation|annotation-xml|maction|maligngroup|malignmark|math|menclose|merror|mfenced|mfrac|mglyph|mi|mlabeledtr|mlongdiv|mmultiscripts|mn|mo|mover|mpadded|mphantom|mroot|mrow|ms|mscarries|mscarry|msgroup|msline|mspace|msqrt|msrow|mstack|mstyle|msub|msubsup|msup|mtable|mtd|mtext|mtr|munder|munderover|semantics)(?=[#)+,.:>\\\\[{|~\\\\s]|/\\\\*|$)\",\"name\":\"entity.name.tag.css\"},\"unicode-range\":{\"captures\":{\"0\":{\"name\":\"constant.other.unicode-range.css\"},\"1\":{\"name\":\"punctuation.separator.dash.unicode-range.css\"}},\"match\":\"(?<![-\\\\w])[Uu]\\\\+[?\\\\h]{1,6}(?:(-)\\\\h{1,6})?(?![-\\\\w])\"},\"url\":{\"begin\":\"(?i)(?<![-@\\\\w])(url)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"support.function.url.css\"},\"2\":{\"name\":\"punctuation.section.function.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.function.end.bracket.round.css\"}},\"name\":\"meta.function.url.css\",\"patterns\":[{\"match\":\"[^\\\"')\\\\s]+\",\"name\":\"variable.parameter.url.css\"},{\"include\":\"#string\"},{\"include\":\"#comment-block\"},{\"include\":\"#escapes\"}]}},\"scopeName\":\"source.css\"}"))], r = Object.freeze(JSON.parse("{\"displayName\":\"SCSS\",\"name\":\"scss\",\"patterns\":[{\"include\":\"#variable_setting\"},{\"include\":\"#at_rule_forward\"},{\"include\":\"#at_rule_use\"},{\"include\":\"#at_rule_include\"},{\"include\":\"#at_rule_import\"},{\"include\":\"#general\"},{\"include\":\"#flow_control\"},{\"include\":\"#rules\"},{\"include\":\"#property_list\"},{\"include\":\"#at_rule_mixin\"},{\"include\":\"#at_rule_media\"},{\"include\":\"#at_rule_function\"},{\"include\":\"#at_rule_charset\"},{\"include\":\"#at_rule_option\"},{\"include\":\"#at_rule_namespace\"},{\"include\":\"#at_rule_fontface\"},{\"include\":\"#at_rule_page\"},{\"include\":\"#at_rule_keyframes\"},{\"include\":\"#at_rule_at_root\"},{\"include\":\"#at_rule_supports\"},{\"match\":\";\",\"name\":\"punctuation.terminator.rule.css\"}],\"repository\":{\"at_rule_at_root\":{\"begin\":\"\\\\s*((@)(at-root))(\\\\s+|$)\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.at-rule.at-root.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*(?=\\\\{)\",\"name\":\"meta.at-rule.at-root.scss\",\"patterns\":[{\"include\":\"#function_attributes\"},{\"include\":\"#functions\"},{\"include\":\"#selectors\"}]},\"at_rule_charset\":{\"begin\":\"\\\\s*((@)charset)\\\\b\\\\s*\",\"captures\":{\"1\":{\"name\":\"keyword.control.at-rule.charset.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*((?=;|$))\",\"name\":\"meta.at-rule.charset.scss\",\"patterns\":[{\"include\":\"#variable\"},{\"include\":\"#string_single\"},{\"include\":\"#string_double\"}]},\"at_rule_content\":{\"begin\":\"\\\\s*((@)content)\\\\b\\\\s*\",\"captures\":{\"1\":{\"name\":\"keyword.control.content.scss\"}},\"end\":\"\\\\s*((?=;))\",\"name\":\"meta.content.scss\",\"patterns\":[{\"include\":\"#variable\"},{\"include\":\"#selectors\"},{\"include\":\"#property_values\"}]},\"at_rule_each\":{\"begin\":\"\\\\s*((@)each)\\\\b\\\\s*\",\"captures\":{\"1\":{\"name\":\"keyword.control.each.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*((?=}))\",\"name\":\"meta.at-rule.each.scss\",\"patterns\":[{\"match\":\"\\\\b(in|,)\\\\b\",\"name\":\"keyword.control.operator\"},{\"include\":\"#variable\"},{\"include\":\"#property_values\"},{\"include\":\"$self\"}]},\"at_rule_else\":{\"begin\":\"\\\\s*((@)else(\\\\s*(if)?))\\\\s*\",\"captures\":{\"1\":{\"name\":\"keyword.control.else.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*(?=\\\\{)\",\"name\":\"meta.at-rule.else.scss\",\"patterns\":[{\"include\":\"#conditional_operators\"},{\"include\":\"#variable\"},{\"include\":\"#property_values\"}]},\"at_rule_extend\":{\"begin\":\"\\\\s*((@)extend)\\\\b\\\\s*\",\"captures\":{\"1\":{\"name\":\"keyword.control.at-rule.extend.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*(?=;)\",\"name\":\"meta.at-rule.extend.scss\",\"patterns\":[{\"include\":\"#variable\"},{\"include\":\"#selectors\"},{\"include\":\"#property_values\"}]},\"at_rule_fontface\":{\"patterns\":[{\"begin\":\"^\\\\s*((@)font-face)\\\\b\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.at-rule.fontface.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*(?=\\\\{)\",\"name\":\"meta.at-rule.fontface.scss\",\"patterns\":[{\"include\":\"#function_attributes\"}]}]},\"at_rule_for\":{\"begin\":\"\\\\s*((@)for)\\\\b\\\\s*\",\"captures\":{\"1\":{\"name\":\"keyword.control.for.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*(?=\\\\{)\",\"name\":\"meta.at-rule.for.scss\",\"patterns\":[{\"match\":\"(==|!=|<=|>=|[<>]|from|to|through)\",\"name\":\"keyword.control.operator\"},{\"include\":\"#variable\"},{\"include\":\"#property_values\"},{\"include\":\"$self\"}]},\"at_rule_forward\":{\"begin\":\"\\\\s*((@)forward)\\\\b\\\\s*\",\"captures\":{\"1\":{\"name\":\"keyword.control.at-rule.forward.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*(?=;)\",\"name\":\"meta.at-rule.forward.scss\",\"patterns\":[{\"match\":\"\\\\b(as|hide|show)\\\\b\",\"name\":\"keyword.control.operator\"},{\"captures\":{\"1\":{\"name\":\"entity.other.attribute-name.module.scss\"},\"2\":{\"name\":\"punctuation.definition.wildcard.scss\"}},\"match\":\"\\\\b([-\\\\w]+)(\\\\*)\"},{\"match\":\"\\\\b[-\\\\w]+\\\\b\",\"name\":\"entity.name.function.scss\"},{\"include\":\"#variable\"},{\"include\":\"#string_single\"},{\"include\":\"#string_double\"},{\"include\":\"#comment_line\"},{\"include\":\"#comment_block\"}]},\"at_rule_function\":{\"patterns\":[{\"begin\":\"\\\\s*((@)function)\\\\b\\\\s*\",\"captures\":{\"1\":{\"name\":\"keyword.control.at-rule.function.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"},\"3\":{\"name\":\"entity.name.function.scss\"}},\"end\":\"\\\\s*(?=\\\\{)\",\"name\":\"meta.at-rule.function.scss\",\"patterns\":[{\"include\":\"#function_attributes\"}]},{\"captures\":{\"1\":{\"name\":\"keyword.control.at-rule.function.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"},\"3\":{\"name\":\"entity.name.function.scss\"}},\"match\":\"\\\\s*((@)function)\\\\b\\\\s*\",\"name\":\"meta.at-rule.function.scss\"}]},\"at_rule_if\":{\"begin\":\"\\\\s*((@)if)\\\\b\\\\s*\",\"captures\":{\"1\":{\"name\":\"keyword.control.if.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*(?=\\\\{)\",\"name\":\"meta.at-rule.if.scss\",\"patterns\":[{\"include\":\"#conditional_operators\"},{\"include\":\"#variable\"},{\"include\":\"#property_values\"}]},\"at_rule_import\":{\"begin\":\"\\\\s*((@)import)\\\\b\\\\s*\",\"captures\":{\"1\":{\"name\":\"keyword.control.at-rule.import.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*((?=;)|(?=}))\",\"name\":\"meta.at-rule.import.scss\",\"patterns\":[{\"include\":\"#variable\"},{\"include\":\"#string_single\"},{\"include\":\"#string_double\"},{\"include\":\"#functions\"},{\"include\":\"#comment_line\"}]},\"at_rule_include\":{\"patterns\":[{\"begin\":\"(?<=@include)\\\\s+(?:([-\\\\w]+)\\\\s*(\\\\.))?([-\\\\w]+)\\\\s*(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"variable.scss\"},\"2\":{\"name\":\"punctuation.access.module.scss\"},\"3\":{\"name\":\"entity.name.function.scss\"},\"4\":{\"name\":\"punctuation.definition.parameters.begin.bracket.round.scss\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.parameters.end.bracket.round.scss\"}},\"name\":\"meta.at-rule.include.scss\",\"patterns\":[{\"include\":\"#function_attributes\"}]},{\"captures\":{\"0\":{\"name\":\"meta.at-rule.include.scss\"},\"1\":{\"name\":\"variable.scss\"},\"2\":{\"name\":\"punctuation.access.module.scss\"},\"3\":{\"name\":\"entity.name.function.scss\"}},\"match\":\"(?<=@include)\\\\s+(?:([-\\\\w]+)\\\\s*(\\\\.))?([-\\\\w]+)\"},{\"captures\":{\"0\":{\"name\":\"meta.at-rule.include.scss\"},\"1\":{\"name\":\"keyword.control.at-rule.include.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"match\":\"((@)include)\\\\b\"}]},\"at_rule_keyframes\":{\"begin\":\"(?<=^|\\\\s)(@)(?:-(?:webkit|moz)-)?keyframes\\\\b\",\"beginCaptures\":{\"0\":{\"name\":\"keyword.control.at-rule.keyframes.scss\"},\"1\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"(?<=})\",\"name\":\"meta.at-rule.keyframes.scss\",\"patterns\":[{\"captures\":{\"1\":{\"name\":\"entity.name.function.scss\"}},\"match\":\"(?<=@keyframes)\\\\s+((?:[A-Z_a-z][-\\\\w]|-[A-Z_a-z])[-\\\\w]*)\"},{\"begin\":\"(?<=@keyframes)\\\\s+(\\\")\",\"beginCaptures\":{\"1\":{\"name\":\"punctuation.definition.string.begin.scss\"}},\"contentName\":\"entity.name.function.scss\",\"end\":\"\\\"\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.scss\"}},\"name\":\"string.quoted.double.scss\",\"patterns\":[{\"match\":\"\\\\\\\\(\\\\h{1,6}|.)\",\"name\":\"constant.character.escape.scss\"},{\"include\":\"#interpolation\"}]},{\"begin\":\"(?<=@keyframes)\\\\s+(')\",\"beginCaptures\":{\"1\":{\"name\":\"punctuation.definition.string.begin.scss\"}},\"contentName\":\"entity.name.function.scss\",\"end\":\"'\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.scss\"}},\"name\":\"string.quoted.single.scss\",\"patterns\":[{\"match\":\"\\\\\\\\(\\\\h{1,6}|.)\",\"name\":\"constant.character.escape.scss\"},{\"include\":\"#interpolation\"}]},{\"begin\":\"\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.keyframes.begin.scss\"}},\"end\":\"}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.keyframes.end.scss\"}},\"patterns\":[{\"match\":\"\\\\b(?:(?:100|[1-9]\\\\d|\\\\d)%|from|to)(?=\\\\s*\\\\{)\",\"name\":\"entity.other.attribute-name.scss\"},{\"include\":\"#flow_control\"},{\"include\":\"#interpolation\"},{\"include\":\"#property_list\"},{\"include\":\"#rules\"}]}]},\"at_rule_media\":{\"patterns\":[{\"begin\":\"^\\\\s*((@)media)\\\\b\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.at-rule.media.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*(?=\\\\{)\",\"name\":\"meta.at-rule.media.scss\",\"patterns\":[{\"include\":\"#comment_docblock\"},{\"include\":\"#comment_block\"},{\"include\":\"#comment_line\"},{\"match\":\"\\\\b(only)\\\\b\",\"name\":\"keyword.control.operator.css.scss\"},{\"begin\":\"\\\\(\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.media-query.begin.bracket.round.scss\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.media-query.end.bracket.round.scss\"}},\"name\":\"meta.property-list.media-query.scss\",\"patterns\":[{\"begin\":\"(?<![-a-z])(?=[-a-z])\",\"end\":\"$|(?![-a-z])\",\"name\":\"meta.property-name.media-query.scss\",\"patterns\":[{\"include\":\"source.css#media-features\"},{\"include\":\"source.css#property-names\"}]},{\"begin\":\"(:)\\\\s*(?!(\\\\s*\\\\{))\",\"beginCaptures\":{\"1\":{\"name\":\"punctuation.separator.key-value.scss\"}},\"contentName\":\"meta.property-value.media-query.scss\",\"end\":\"\\\\s*(;|(?=[)}]))\",\"endCaptures\":{\"1\":{\"name\":\"punctuation.terminator.rule.scss\"}},\"patterns\":[{\"include\":\"#general\"},{\"include\":\"#property_values\"}]}]},{\"include\":\"#variable\"},{\"include\":\"#conditional_operators\"},{\"include\":\"source.css#media-types\"}]}]},\"at_rule_mixin\":{\"patterns\":[{\"begin\":\"(?<=@mixin)\\\\s+([-\\\\w]+)\\\\s*(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"entity.name.function.scss\"},\"2\":{\"name\":\"punctuation.definition.parameters.begin.bracket.round.scss\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.parameters.end.bracket.round.scss\"}},\"name\":\"meta.at-rule.mixin.scss\",\"patterns\":[{\"include\":\"#function_attributes\"}]},{\"captures\":{\"1\":{\"name\":\"entity.name.function.scss\"}},\"match\":\"(?<=@mixin)\\\\s+([-\\\\w]+)\",\"name\":\"meta.at-rule.mixin.scss\"},{\"captures\":{\"1\":{\"name\":\"keyword.control.at-rule.mixin.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"match\":\"((@)mixin)\\\\b\",\"name\":\"meta.at-rule.mixin.scss\"}]},\"at_rule_namespace\":{\"patterns\":[{\"begin\":\"(?<=@namespace)\\\\s+(?=url)\",\"end\":\"(?=;|$)\",\"name\":\"meta.at-rule.namespace.scss\",\"patterns\":[{\"include\":\"#property_values\"},{\"include\":\"#string_single\"},{\"include\":\"#string_double\"}]},{\"begin\":\"(?<=@namespace)\\\\s+([-\\\\w]*)\",\"captures\":{\"1\":{\"name\":\"entity.name.namespace-prefix.scss\"}},\"end\":\"(?=;|$)\",\"name\":\"meta.at-rule.namespace.scss\",\"patterns\":[{\"include\":\"#variables\"},{\"include\":\"#property_values\"},{\"include\":\"#string_single\"},{\"include\":\"#string_double\"}]},{\"captures\":{\"1\":{\"name\":\"keyword.control.at-rule.namespace.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"match\":\"((@)namespace)\\\\b\",\"name\":\"meta.at-rule.namespace.scss\"}]},\"at_rule_option\":{\"captures\":{\"1\":{\"name\":\"keyword.control.at-rule.charset.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"match\":\"^\\\\s*((@)option)\\\\b\\\\s*\",\"name\":\"meta.at-rule.option.scss\"},\"at_rule_page\":{\"patterns\":[{\"begin\":\"^\\\\s*((@)page)(?=[:\\\\s])\\\\s*([-:\\\\w]*)\",\"captures\":{\"1\":{\"name\":\"keyword.control.at-rule.page.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"},\"3\":{\"name\":\"entity.name.function.scss\"}},\"end\":\"\\\\s*(?=\\\\{)\",\"name\":\"meta.at-rule.page.scss\"}]},\"at_rule_return\":{\"begin\":\"\\\\s*((@)(return))\\\\b\",\"captures\":{\"1\":{\"name\":\"keyword.control.return.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*((?=;))\",\"name\":\"meta.at-rule.return.scss\",\"patterns\":[{\"include\":\"#variable\"},{\"include\":\"#property_values\"}]},\"at_rule_supports\":{\"begin\":\"(?<=^|\\\\s)(@)supports\\\\b\",\"captures\":{\"0\":{\"name\":\"keyword.control.at-rule.supports.scss\"},\"1\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"(?=\\\\{)|$\",\"name\":\"meta.at-rule.supports.scss\",\"patterns\":[{\"include\":\"#logical_operators\"},{\"include\":\"#properties\"},{\"match\":\"\\\\(\",\"name\":\"punctuation.definition.condition.begin.bracket.round.scss\"},{\"match\":\"\\\\)\",\"name\":\"punctuation.definition.condition.end.bracket.round.scss\"}]},\"at_rule_use\":{\"begin\":\"\\\\s*((@)use)\\\\b\\\\s*\",\"captures\":{\"1\":{\"name\":\"keyword.control.at-rule.use.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*(?=;)\",\"name\":\"meta.at-rule.use.scss\",\"patterns\":[{\"match\":\"\\\\b(as|with)\\\\b\",\"name\":\"keyword.control.operator\"},{\"match\":\"\\\\b[-\\\\w]+\\\\b\",\"name\":\"variable.scss\"},{\"match\":\"\\\\*\",\"name\":\"variable.language.expanded-namespace.scss\"},{\"include\":\"#string_single\"},{\"include\":\"#string_double\"},{\"include\":\"#comment_line\"},{\"include\":\"#comment_block\"},{\"begin\":\"\\\\(\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.parameters.begin.bracket.round.scss\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.parameters.end.bracket.round.scss\"}},\"patterns\":[{\"include\":\"#function_attributes\"}]}]},\"at_rule_warn\":{\"begin\":\"\\\\s*((@)(warn|debug|error))\\\\b\\\\s*\",\"captures\":{\"1\":{\"name\":\"keyword.control.warn.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*(?=;)\",\"name\":\"meta.at-rule.warn.scss\",\"patterns\":[{\"include\":\"#variable\"},{\"include\":\"#string_double\"},{\"include\":\"#string_single\"}]},\"at_rule_while\":{\"begin\":\"\\\\s*((@)while)\\\\b\\\\s*\",\"captures\":{\"1\":{\"name\":\"keyword.control.while.scss\"},\"2\":{\"name\":\"punctuation.definition.keyword.scss\"}},\"end\":\"\\\\s*(?=})\",\"name\":\"meta.at-rule.while.scss\",\"patterns\":[{\"include\":\"#conditional_operators\"},{\"include\":\"#variable\"},{\"include\":\"#property_values\"},{\"include\":\"$self\"}]},\"comment_block\":{\"begin\":\"/\\\\*\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.scss\"}},\"end\":\"\\\\*/\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.scss\"}},\"name\":\"comment.block.scss\"},\"comment_docblock\":{\"begin\":\"///\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.scss\"}},\"end\":\"(?=$)\",\"name\":\"comment.block.documentation.scss\",\"patterns\":[{\"include\":\"source.sassdoc\"}]},\"comment_line\":{\"begin\":\"//\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.scss\"}},\"end\":\"\\\\n\",\"name\":\"comment.line.scss\"},\"comparison_operators\":{\"match\":\"==|!=|<=|>=|[<>]\",\"name\":\"keyword.operator.comparison.scss\"},\"conditional_operators\":{\"patterns\":[{\"include\":\"#comparison_operators\"},{\"include\":\"#logical_operators\"}]},\"constant_default\":{\"match\":\"!default\",\"name\":\"keyword.other.default.scss\"},\"constant_functions\":{\"begin\":\"(?:([-\\\\w]+)(\\\\.))?([-\\\\w]+)(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"variable.scss\"},\"2\":{\"name\":\"punctuation.access.module.scss\"},\"3\":{\"name\":\"support.function.misc.scss\"},\"4\":{\"name\":\"punctuation.section.function.scss\"}},\"end\":\"(\\\\))\",\"endCaptures\":{\"1\":{\"name\":\"punctuation.section.function.scss\"}},\"patterns\":[{\"include\":\"#parameters\"}]},\"constant_important\":{\"match\":\"!important\",\"name\":\"keyword.other.important.scss\"},\"constant_mathematical_symbols\":{\"match\":\"\\\\b([-*+/])\\\\b\",\"name\":\"support.constant.mathematical-symbols.scss\"},\"constant_optional\":{\"match\":\"!optional\",\"name\":\"keyword.other.optional.scss\"},\"constant_sass_functions\":{\"begin\":\"(headings|stylesheet-url|rgba?|hsla?|ie-hex-str|red|green|blue|alpha|opacity|hue|saturation|lightness|prefixed|prefix|-moz|-svg|-css2|-pie|-webkit|-ms|font-(?:files|url)|grid-image|image-(?:width|height|url|color)|sprites?|sprite-(?:map|map-name|file|url|position)|inline-(?:font-files|image)|opposite-position|grad-point|grad-end-position|color-stops|color-stops-in-percentages|grad-color-stops|(?:radial|linear)-(?:|svg-)gradient|opacify|fade-?in|transparentize|fade-?out|lighten|darken|saturate|desaturate|grayscale|adjust-(?:hue|lightness|saturation|color)|scale-(?:lightness|saturation|color)|change-color|spin|complement|invert|mix|-compass-(?:list|space-list|slice|nth|list-size)|blank|compact|nth|first-value-of|join|length|append|nest|append-selector|headers|enumerate|range|percentage|unitless|unit|if|type-of|comparable|elements-of-type|quote|unquote|escape|e|sin|cos|tan|abs|round|ceil|floor|pi|translate[XY])(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"support.function.misc.scss\"},\"2\":{\"name\":\"punctuation.section.function.scss\"}},\"end\":\"(\\\\))\",\"endCaptures\":{\"1\":{\"name\":\"punctuation.section.function.scss\"}},\"patterns\":[{\"include\":\"#parameters\"}]},\"flow_control\":{\"patterns\":[{\"include\":\"#at_rule_if\"},{\"include\":\"#at_rule_else\"},{\"include\":\"#at_rule_warn\"},{\"include\":\"#at_rule_for\"},{\"include\":\"#at_rule_while\"},{\"include\":\"#at_rule_each\"},{\"include\":\"#at_rule_return\"}]},\"function_attributes\":{\"patterns\":[{\"match\":\":\",\"name\":\"punctuation.separator.key-value.scss\"},{\"include\":\"#general\"},{\"include\":\"#property_values\"},{\"match\":\"[;=?@{}]\",\"name\":\"invalid.illegal.scss\"}]},\"functions\":{\"patterns\":[{\"begin\":\"([-\\\\w]+)(\\\\()\\\\s*\",\"beginCaptures\":{\"1\":{\"name\":\"support.function.misc.scss\"},\"2\":{\"name\":\"punctuation.section.function.scss\"}},\"end\":\"(\\\\))\",\"endCaptures\":{\"1\":{\"name\":\"punctuation.section.function.scss\"}},\"patterns\":[{\"include\":\"#parameters\"}]},{\"match\":\"([-\\\\w]+)\",\"name\":\"support.function.misc.scss\"}]},\"general\":{\"patterns\":[{\"include\":\"#variable\"},{\"include\":\"#comment_docblock\"},{\"include\":\"#comment_block\"},{\"include\":\"#comment_line\"}]},\"interpolation\":{\"begin\":\"#\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.interpolation.begin.bracket.curly.scss\"}},\"end\":\"}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.interpolation.end.bracket.curly.scss\"}},\"name\":\"variable.interpolation.scss\",\"patterns\":[{\"include\":\"#variable\"},{\"include\":\"#property_values\"}]},\"logical_operators\":{\"match\":\"\\\\b(not|or|and)\\\\b\",\"name\":\"keyword.operator.logical.scss\"},\"map\":{\"begin\":\"\\\\(\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.map.begin.bracket.round.scss\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.map.end.bracket.round.scss\"}},\"name\":\"meta.definition.variable.map.scss\",\"patterns\":[{\"include\":\"#comment_docblock\"},{\"include\":\"#comment_block\"},{\"include\":\"#comment_line\"},{\"captures\":{\"1\":{\"name\":\"support.type.map.key.scss\"},\"2\":{\"name\":\"punctuation.separator.key-value.scss\"}},\"match\":\"\\\\b([-\\\\w]+)\\\\s*(:)\"},{\"match\":\",\",\"name\":\"punctuation.separator.delimiter.scss\"},{\"include\":\"#map\"},{\"include\":\"#variable\"},{\"include\":\"#property_values\"}]},\"operators\":{\"match\":\"[-*+/](?!\\\\s*[-*+/])\",\"name\":\"keyword.operator.css\"},\"parameters\":{\"patterns\":[{\"include\":\"#variable\"},{\"begin\":\"\\\\(\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.begin.bracket.round.scss\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.end.bracket.round.scss\"}},\"patterns\":[{\"include\":\"#function_attributes\"}]},{\"include\":\"#property_values\"},{\"include\":\"#comment_block\"},{\"match\":\"[^\\\\t \\\"'),]+\",\"name\":\"variable.parameter.url.scss\"},{\"match\":\",\",\"name\":\"punctuation.separator.delimiter.scss\"}]},\"parent_selector_suffix\":{\"captures\":{\"1\":{\"name\":\"punctuation.definition.entity.css\"},\"2\":{\"patterns\":[{\"include\":\"#interpolation\"},{\"match\":\"\\\\\\\\(\\\\h{1,6}|.)\",\"name\":\"constant.character.escape.scss\"},{\"match\":\"[$}]\",\"name\":\"invalid.illegal.identifier.scss\"}]}},\"match\":\"(?<=&)((?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.)|#\\\\{|[$}])+)(?=$|[#)+,.:>\\\\[{|~\\\\s]|/\\\\*)\",\"name\":\"entity.other.attribute-name.parent-selector-suffix.css\"},\"properties\":{\"patterns\":[{\"begin\":\"(?<![-a-z])(?=[-a-z])\",\"end\":\"$|(?![-a-z])\",\"name\":\"meta.property-name.scss\",\"patterns\":[{\"include\":\"source.css#property-names\"},{\"include\":\"#at_rule_include\"}]},{\"begin\":\"(:)\\\\s*(?!(\\\\s*\\\\{))\",\"beginCaptures\":{\"1\":{\"name\":\"punctuation.separator.key-value.scss\"}},\"contentName\":\"meta.property-value.scss\",\"end\":\"\\\\s*(;|(?=[)}]))\",\"endCaptures\":{\"1\":{\"name\":\"punctuation.terminator.rule.scss\"}},\"patterns\":[{\"include\":\"#general\"},{\"include\":\"#property_values\"}]}]},\"property_list\":{\"begin\":\"\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.property-list.begin.bracket.curly.scss\"}},\"end\":\"}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.property-list.end.bracket.curly.scss\"}},\"name\":\"meta.property-list.scss\",\"patterns\":[{\"include\":\"#flow_control\"},{\"include\":\"#rules\"},{\"include\":\"#properties\"},{\"include\":\"$self\"}]},\"property_values\":{\"patterns\":[{\"include\":\"#string_single\"},{\"include\":\"#string_double\"},{\"include\":\"#constant_functions\"},{\"include\":\"#constant_sass_functions\"},{\"include\":\"#constant_important\"},{\"include\":\"#constant_default\"},{\"include\":\"#constant_optional\"},{\"include\":\"source.css#numeric-values\"},{\"include\":\"source.css#property-keywords\"},{\"include\":\"source.css#color-keywords\"},{\"include\":\"source.css#property-names\"},{\"include\":\"#constant_mathematical_symbols\"},{\"include\":\"#operators\"},{\"begin\":\"\\\\(\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.begin.bracket.round.scss\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.end.bracket.round.scss\"}},\"patterns\":[{\"include\":\"#general\"},{\"include\":\"#property_values\"}]}]},\"rules\":{\"patterns\":[{\"include\":\"#general\"},{\"include\":\"#at_rule_extend\"},{\"include\":\"#at_rule_content\"},{\"include\":\"#at_rule_include\"},{\"include\":\"#at_rule_media\"},{\"include\":\"#selectors\"}]},\"selector_attribute\":{\"captures\":{\"1\":{\"name\":\"punctuation.definition.attribute-selector.begin.bracket.square.scss\"},\"2\":{\"name\":\"entity.other.attribute-name.attribute.scss\",\"patterns\":[{\"include\":\"#interpolation\"},{\"match\":\"\\\\\\\\(\\\\h{1,6}|.)\",\"name\":\"constant.character.escape.scss\"},{\"match\":\"[$}]\",\"name\":\"invalid.illegal.scss\"}]},\"3\":{\"name\":\"keyword.operator.scss\"},\"4\":{\"name\":\"string.unquoted.attribute-value.scss\",\"patterns\":[{\"include\":\"#interpolation\"},{\"match\":\"\\\\\\\\(\\\\h{1,6}|.)\",\"name\":\"constant.character.escape.scss\"},{\"match\":\"[$}]\",\"name\":\"invalid.illegal.scss\"}]},\"5\":{\"name\":\"string.quoted.double.attribute-value.scss\"},\"6\":{\"name\":\"punctuation.definition.string.begin.scss\"},\"7\":{\"patterns\":[{\"include\":\"#interpolation\"},{\"match\":\"\\\\\\\\(\\\\h{1,6}|.)\",\"name\":\"constant.character.escape.scss\"},{\"match\":\"[$}]\",\"name\":\"invalid.illegal.scss\"}]},\"8\":{\"name\":\"punctuation.definition.string.end.scss\"},\"9\":{\"name\":\"string.quoted.single.attribute-value.scss\"},\"10\":{\"name\":\"punctuation.definition.string.begin.scss\"},\"11\":{\"patterns\":[{\"include\":\"#interpolation\"},{\"match\":\"\\\\\\\\(\\\\h{1,6}|.)\",\"name\":\"constant.character.escape.scss\"},{\"match\":\"[$}]\",\"name\":\"invalid.illegal.scss\"}]},\"12\":{\"name\":\"punctuation.definition.string.end.scss\"},\"13\":{\"name\":\"punctuation.definition.attribute-selector.end.bracket.square.scss\"}},\"match\":\"(?i)(\\\\[)\\\\s*((?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.)|#\\\\{|\\\\.?\\\\$|})+?)(?:\\\\s*([$*^|~]?=)\\\\s*(?:((?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.)|#\\\\{|\\\\.?\\\\$|})+)|((\\\")(.*?)(\\\"))|((')(.*?)('))))?\\\\s*(])\",\"name\":\"meta.attribute-selector.scss\"},\"selector_class\":{\"captures\":{\"1\":{\"name\":\"punctuation.definition.entity.css\"},\"2\":{\"patterns\":[{\"include\":\"#interpolation\"},{\"match\":\"\\\\\\\\(\\\\h{1,6}|.)\",\"name\":\"constant.character.escape.scss\"},{\"match\":\"[$}]\",\"name\":\"invalid.illegal.scss\"}]}},\"match\":\"(\\\\.)((?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.)|#\\\\{|\\\\.?\\\\$|})+)(?=$|[#)+,:>\\\\[{|~\\\\s]|\\\\.[^$]|/\\\\*|;)\",\"name\":\"entity.other.attribute-name.class.css\"},\"selector_custom\":{\"match\":\"\\\\b([0-9A-Za-z]+(-[0-9A-Za-z]+)+)(?=\\\\.|\\\\s++[^:]|\\\\s*[,\\\\[{]|:(link|visited|hover|active|focus|target|lang|disabled|enabled|checked|indeterminate|root|nth-((?:|last-)(?:child|of-type))|first-child|last-child|first-of-type|last-of-type|only-child|only-of-type|empty|not|valid|invalid)(\\\\([0-9A-Za-z]*\\\\))?)\",\"name\":\"entity.name.tag.custom.scss\"},\"selector_id\":{\"captures\":{\"1\":{\"name\":\"punctuation.definition.entity.css\"},\"2\":{\"patterns\":[{\"include\":\"#interpolation\"},{\"match\":\"\\\\\\\\(\\\\h{1,6}|.)\",\"name\":\"constant.character.escape.scss\"},{\"match\":\"[$}]\",\"name\":\"invalid.illegal.identifier.scss\"}]}},\"match\":\"(#)((?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.)|#\\\\{|\\\\.?\\\\$|})+)(?=$|[#)+,:>\\\\[{|~\\\\s]|\\\\.[^$]|/\\\\*)\",\"name\":\"entity.other.attribute-name.id.css\"},\"selector_placeholder\":{\"captures\":{\"1\":{\"name\":\"punctuation.definition.entity.css\"},\"2\":{\"patterns\":[{\"include\":\"#interpolation\"},{\"match\":\"\\\\\\\\(\\\\h{1,6}|.)\",\"name\":\"constant.character.escape.scss\"},{\"match\":\"[$}]\",\"name\":\"invalid.illegal.identifier.scss\"}]}},\"match\":\"(%)((?:[-0-9A-Z_a-z[^\\\\x00-\\\\x7F]]|\\\\\\\\(?:\\\\h{1,6}|.)|#\\\\{|\\\\.\\\\$|[$}])+)(?=;|$|[#)+,:>\\\\[{|~\\\\s]|\\\\.[^$]|/\\\\*)\",\"name\":\"entity.other.attribute-name.placeholder.css\"},\"selector_pseudo_class\":{\"patterns\":[{\"begin\":\"((:)\\\\bnth-(?:|last-)(?:child|of-type))(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"entity.other.attribute-name.pseudo-class.css\"},\"2\":{\"name\":\"punctuation.definition.entity.css\"},\"3\":{\"name\":\"punctuation.definition.pseudo-class.begin.bracket.round.css\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.pseudo-class.end.bracket.round.css\"}},\"patterns\":[{\"include\":\"#interpolation\"},{\"match\":\"\\\\d+\",\"name\":\"constant.numeric.css\"},{\"match\":\"(?:(?<=\\\\d)n|\\\\b(n|even|odd))\\\\b\",\"name\":\"constant.other.scss\"},{\"match\":\"\\\\w+\",\"name\":\"invalid.illegal.scss\"}]},{\"include\":\"source.css#pseudo-classes\"},{\"include\":\"source.css#pseudo-elements\"},{\"include\":\"source.css#functional-pseudo-classes\"}]},\"selectors\":{\"patterns\":[{\"include\":\"source.css#tag-names\"},{\"include\":\"#selector_custom\"},{\"include\":\"#selector_class\"},{\"include\":\"#selector_id\"},{\"include\":\"#selector_pseudo_class\"},{\"include\":\"#tag_wildcard\"},{\"include\":\"#tag_parent_reference\"},{\"include\":\"source.css#pseudo-elements\"},{\"include\":\"#selector_attribute\"},{\"include\":\"#selector_placeholder\"},{\"include\":\"#parent_selector_suffix\"}]},\"string_double\":{\"begin\":\"\\\"\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.scss\"}},\"end\":\"\\\"\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.scss\"}},\"name\":\"string.quoted.double.scss\",\"patterns\":[{\"match\":\"\\\\\\\\(\\\\h{1,6}|.)\",\"name\":\"constant.character.escape.scss\"},{\"include\":\"#interpolation\"}]},\"string_single\":{\"begin\":\"'\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.scss\"}},\"end\":\"'\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.scss\"}},\"name\":\"string.quoted.single.scss\",\"patterns\":[{\"match\":\"\\\\\\\\(\\\\h{1,6}|.)\",\"name\":\"constant.character.escape.scss\"},{\"include\":\"#interpolation\"}]},\"tag_parent_reference\":{\"match\":\"&\",\"name\":\"entity.name.tag.reference.scss\"},\"tag_wildcard\":{\"match\":\"\\\\*\",\"name\":\"entity.name.tag.wildcard.scss\"},\"variable\":{\"patterns\":[{\"include\":\"#variables\"},{\"include\":\"#interpolation\"}]},\"variable_setting\":{\"begin\":\"(?=\\\\$[-\\\\w]+\\\\s*:)\",\"contentName\":\"meta.definition.variable.scss\",\"end\":\";\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.terminator.rule.scss\"}},\"patterns\":[{\"match\":\"\\\\$[-\\\\w]+(?=\\\\s*:)\",\"name\":\"variable.scss\"},{\"begin\":\":\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.separator.key-value.scss\"}},\"end\":\"(?=;)\",\"patterns\":[{\"include\":\"#comment_docblock\"},{\"include\":\"#comment_block\"},{\"include\":\"#comment_line\"},{\"include\":\"#map\"},{\"include\":\"#property_values\"},{\"include\":\"#variable\"},{\"match\":\",\",\"name\":\"punctuation.separator.delimiter.scss\"}]}]},\"variables\":{\"patterns\":[{\"captures\":{\"1\":{\"name\":\"variable.scss\"},\"2\":{\"name\":\"punctuation.access.module.scss\"},\"3\":{\"name\":\"variable.scss\"}},\"match\":\"\\\\b([-\\\\w]+)(\\\\.)(\\\\$[-\\\\w]+)\\\\b\"},{\"match\":\"(\\\\$|--)[-0-9A-Z_a-z]+\\\\b\",\"name\":\"variable.scss\"}]}},\"scopeName\":\"source.css.scss\",\"embeddedLangs\":[\"css\"]}")), i = [...n, r], a = Object.freeze(JSON.parse("{\"colors\":{\"activityBar.activeBorder\":\"#f78166\",\"activityBar.background\":\"#0d1117\",\"activityBar.border\":\"#30363d\",\"activityBar.foreground\":\"#e6edf3\",\"activityBar.inactiveForeground\":\"#7d8590\",\"activityBarBadge.background\":\"#1f6feb\",\"activityBarBadge.foreground\":\"#ffffff\",\"badge.background\":\"#1f6feb\",\"badge.foreground\":\"#ffffff\",\"breadcrumb.activeSelectionForeground\":\"#7d8590\",\"breadcrumb.focusForeground\":\"#e6edf3\",\"breadcrumb.foreground\":\"#7d8590\",\"breadcrumbPicker.background\":\"#161b22\",\"button.background\":\"#238636\",\"button.foreground\":\"#ffffff\",\"button.hoverBackground\":\"#2ea043\",\"button.secondaryBackground\":\"#282e33\",\"button.secondaryForeground\":\"#c9d1d9\",\"button.secondaryHoverBackground\":\"#30363d\",\"checkbox.background\":\"#161b22\",\"checkbox.border\":\"#30363d\",\"debugConsole.errorForeground\":\"#ffa198\",\"debugConsole.infoForeground\":\"#8b949e\",\"debugConsole.sourceForeground\":\"#e3b341\",\"debugConsole.warningForeground\":\"#d29922\",\"debugConsoleInputIcon.foreground\":\"#bc8cff\",\"debugIcon.breakpointForeground\":\"#f85149\",\"debugTokenExpression.boolean\":\"#56d364\",\"debugTokenExpression.error\":\"#ffa198\",\"debugTokenExpression.name\":\"#79c0ff\",\"debugTokenExpression.number\":\"#56d364\",\"debugTokenExpression.string\":\"#a5d6ff\",\"debugTokenExpression.value\":\"#a5d6ff\",\"debugToolBar.background\":\"#161b22\",\"descriptionForeground\":\"#7d8590\",\"diffEditor.insertedLineBackground\":\"#23863626\",\"diffEditor.insertedTextBackground\":\"#3fb9504d\",\"diffEditor.removedLineBackground\":\"#da363326\",\"diffEditor.removedTextBackground\":\"#ff7b724d\",\"dropdown.background\":\"#161b22\",\"dropdown.border\":\"#30363d\",\"dropdown.foreground\":\"#e6edf3\",\"dropdown.listBackground\":\"#161b22\",\"editor.background\":\"#0d1117\",\"editor.findMatchBackground\":\"#9e6a03\",\"editor.findMatchHighlightBackground\":\"#f2cc6080\",\"editor.focusedStackFrameHighlightBackground\":\"#2ea04366\",\"editor.foldBackground\":\"#6e76811a\",\"editor.foreground\":\"#e6edf3\",\"editor.lineHighlightBackground\":\"#6e76811a\",\"editor.linkedEditingBackground\":\"#2f81f712\",\"editor.selectionHighlightBackground\":\"#3fb95040\",\"editor.stackFrameHighlightBackground\":\"#bb800966\",\"editor.wordHighlightBackground\":\"#6e768180\",\"editor.wordHighlightBorder\":\"#6e768199\",\"editor.wordHighlightStrongBackground\":\"#6e76814d\",\"editor.wordHighlightStrongBorder\":\"#6e768199\",\"editorBracketHighlight.foreground1\":\"#79c0ff\",\"editorBracketHighlight.foreground2\":\"#56d364\",\"editorBracketHighlight.foreground3\":\"#e3b341\",\"editorBracketHighlight.foreground4\":\"#ffa198\",\"editorBracketHighlight.foreground5\":\"#ff9bce\",\"editorBracketHighlight.foreground6\":\"#d2a8ff\",\"editorBracketHighlight.unexpectedBracket.foreground\":\"#7d8590\",\"editorBracketMatch.background\":\"#3fb95040\",\"editorBracketMatch.border\":\"#3fb95099\",\"editorCursor.foreground\":\"#2f81f7\",\"editorGroup.border\":\"#30363d\",\"editorGroupHeader.tabsBackground\":\"#010409\",\"editorGroupHeader.tabsBorder\":\"#30363d\",\"editorGutter.addedBackground\":\"#2ea04366\",\"editorGutter.deletedBackground\":\"#f8514966\",\"editorGutter.modifiedBackground\":\"#bb800966\",\"editorIndentGuide.activeBackground\":\"#e6edf33d\",\"editorIndentGuide.background\":\"#e6edf31f\",\"editorInlayHint.background\":\"#8b949e33\",\"editorInlayHint.foreground\":\"#7d8590\",\"editorInlayHint.paramBackground\":\"#8b949e33\",\"editorInlayHint.paramForeground\":\"#7d8590\",\"editorInlayHint.typeBackground\":\"#8b949e33\",\"editorInlayHint.typeForeground\":\"#7d8590\",\"editorLineNumber.activeForeground\":\"#e6edf3\",\"editorLineNumber.foreground\":\"#6e7681\",\"editorOverviewRuler.border\":\"#010409\",\"editorWhitespace.foreground\":\"#484f58\",\"editorWidget.background\":\"#161b22\",\"errorForeground\":\"#f85149\",\"focusBorder\":\"#1f6feb\",\"foreground\":\"#e6edf3\",\"gitDecoration.addedResourceForeground\":\"#3fb950\",\"gitDecoration.conflictingResourceForeground\":\"#db6d28\",\"gitDecoration.deletedResourceForeground\":\"#f85149\",\"gitDecoration.ignoredResourceForeground\":\"#6e7681\",\"gitDecoration.modifiedResourceForeground\":\"#d29922\",\"gitDecoration.submoduleResourceForeground\":\"#7d8590\",\"gitDecoration.untrackedResourceForeground\":\"#3fb950\",\"icon.foreground\":\"#7d8590\",\"input.background\":\"#0d1117\",\"input.border\":\"#30363d\",\"input.foreground\":\"#e6edf3\",\"input.placeholderForeground\":\"#6e7681\",\"keybindingLabel.foreground\":\"#e6edf3\",\"list.activeSelectionBackground\":\"#6e768166\",\"list.activeSelectionForeground\":\"#e6edf3\",\"list.focusBackground\":\"#388bfd26\",\"list.focusForeground\":\"#e6edf3\",\"list.highlightForeground\":\"#2f81f7\",\"list.hoverBackground\":\"#6e76811a\",\"list.hoverForeground\":\"#e6edf3\",\"list.inactiveFocusBackground\":\"#388bfd26\",\"list.inactiveSelectionBackground\":\"#6e768166\",\"list.inactiveSelectionForeground\":\"#e6edf3\",\"minimapSlider.activeBackground\":\"#8b949e47\",\"minimapSlider.background\":\"#8b949e33\",\"minimapSlider.hoverBackground\":\"#8b949e3d\",\"notificationCenterHeader.background\":\"#161b22\",\"notificationCenterHeader.foreground\":\"#7d8590\",\"notifications.background\":\"#161b22\",\"notifications.border\":\"#30363d\",\"notifications.foreground\":\"#e6edf3\",\"notificationsErrorIcon.foreground\":\"#f85149\",\"notificationsInfoIcon.foreground\":\"#2f81f7\",\"notificationsWarningIcon.foreground\":\"#d29922\",\"panel.background\":\"#010409\",\"panel.border\":\"#30363d\",\"panelInput.border\":\"#30363d\",\"panelTitle.activeBorder\":\"#f78166\",\"panelTitle.activeForeground\":\"#e6edf3\",\"panelTitle.inactiveForeground\":\"#7d8590\",\"peekViewEditor.background\":\"#6e76811a\",\"peekViewEditor.matchHighlightBackground\":\"#bb800966\",\"peekViewResult.background\":\"#0d1117\",\"peekViewResult.matchHighlightBackground\":\"#bb800966\",\"pickerGroup.border\":\"#30363d\",\"pickerGroup.foreground\":\"#7d8590\",\"progressBar.background\":\"#1f6feb\",\"quickInput.background\":\"#161b22\",\"quickInput.foreground\":\"#e6edf3\",\"scrollbar.shadow\":\"#484f5833\",\"scrollbarSlider.activeBackground\":\"#8b949e47\",\"scrollbarSlider.background\":\"#8b949e33\",\"scrollbarSlider.hoverBackground\":\"#8b949e3d\",\"settings.headerForeground\":\"#e6edf3\",\"settings.modifiedItemIndicator\":\"#bb800966\",\"sideBar.background\":\"#010409\",\"sideBar.border\":\"#30363d\",\"sideBar.foreground\":\"#e6edf3\",\"sideBarSectionHeader.background\":\"#010409\",\"sideBarSectionHeader.border\":\"#30363d\",\"sideBarSectionHeader.foreground\":\"#e6edf3\",\"sideBarTitle.foreground\":\"#e6edf3\",\"statusBar.background\":\"#0d1117\",\"statusBar.border\":\"#30363d\",\"statusBar.debuggingBackground\":\"#da3633\",\"statusBar.debuggingForeground\":\"#ffffff\",\"statusBar.focusBorder\":\"#1f6feb80\",\"statusBar.foreground\":\"#7d8590\",\"statusBar.noFolderBackground\":\"#0d1117\",\"statusBarItem.activeBackground\":\"#e6edf31f\",\"statusBarItem.focusBorder\":\"#1f6feb\",\"statusBarItem.hoverBackground\":\"#e6edf314\",\"statusBarItem.prominentBackground\":\"#6e768166\",\"statusBarItem.remoteBackground\":\"#30363d\",\"statusBarItem.remoteForeground\":\"#e6edf3\",\"symbolIcon.arrayForeground\":\"#f0883e\",\"symbolIcon.booleanForeground\":\"#58a6ff\",\"symbolIcon.classForeground\":\"#f0883e\",\"symbolIcon.colorForeground\":\"#79c0ff\",\"symbolIcon.constantForeground\":[\"#aff5b4\",\"#7ee787\",\"#56d364\",\"#3fb950\",\"#2ea043\",\"#238636\",\"#196c2e\",\"#0f5323\",\"#033a16\",\"#04260f\"],\"symbolIcon.constructorForeground\":\"#d2a8ff\",\"symbolIcon.enumeratorForeground\":\"#f0883e\",\"symbolIcon.enumeratorMemberForeground\":\"#58a6ff\",\"symbolIcon.eventForeground\":\"#6e7681\",\"symbolIcon.fieldForeground\":\"#f0883e\",\"symbolIcon.fileForeground\":\"#d29922\",\"symbolIcon.folderForeground\":\"#d29922\",\"symbolIcon.functionForeground\":\"#bc8cff\",\"symbolIcon.interfaceForeground\":\"#f0883e\",\"symbolIcon.keyForeground\":\"#58a6ff\",\"symbolIcon.keywordForeground\":\"#ff7b72\",\"symbolIcon.methodForeground\":\"#bc8cff\",\"symbolIcon.moduleForeground\":\"#ff7b72\",\"symbolIcon.namespaceForeground\":\"#ff7b72\",\"symbolIcon.nullForeground\":\"#58a6ff\",\"symbolIcon.numberForeground\":\"#3fb950\",\"symbolIcon.objectForeground\":\"#f0883e\",\"symbolIcon.operatorForeground\":\"#79c0ff\",\"symbolIcon.packageForeground\":\"#f0883e\",\"symbolIcon.propertyForeground\":\"#f0883e\",\"symbolIcon.referenceForeground\":\"#58a6ff\",\"symbolIcon.snippetForeground\":\"#58a6ff\",\"symbolIcon.stringForeground\":\"#79c0ff\",\"symbolIcon.structForeground\":\"#f0883e\",\"symbolIcon.textForeground\":\"#79c0ff\",\"symbolIcon.typeParameterForeground\":\"#79c0ff\",\"symbolIcon.unitForeground\":\"#58a6ff\",\"symbolIcon.variableForeground\":\"#f0883e\",\"tab.activeBackground\":\"#0d1117\",\"tab.activeBorder\":\"#0d1117\",\"tab.activeBorderTop\":\"#f78166\",\"tab.activeForeground\":\"#e6edf3\",\"tab.border\":\"#30363d\",\"tab.hoverBackground\":\"#0d1117\",\"tab.inactiveBackground\":\"#010409\",\"tab.inactiveForeground\":\"#7d8590\",\"tab.unfocusedActiveBorder\":\"#0d1117\",\"tab.unfocusedActiveBorderTop\":\"#30363d\",\"tab.unfocusedHoverBackground\":\"#6e76811a\",\"terminal.ansiBlack\":\"#484f58\",\"terminal.ansiBlue\":\"#58a6ff\",\"terminal.ansiBrightBlack\":\"#6e7681\",\"terminal.ansiBrightBlue\":\"#79c0ff\",\"terminal.ansiBrightCyan\":\"#56d4dd\",\"terminal.ansiBrightGreen\":\"#56d364\",\"terminal.ansiBrightMagenta\":\"#d2a8ff\",\"terminal.ansiBrightRed\":\"#ffa198\",\"terminal.ansiBrightWhite\":\"#ffffff\",\"terminal.ansiBrightYellow\":\"#e3b341\",\"terminal.ansiCyan\":\"#39c5cf\",\"terminal.ansiGreen\":\"#3fb950\",\"terminal.ansiMagenta\":\"#bc8cff\",\"terminal.ansiRed\":\"#ff7b72\",\"terminal.ansiWhite\":\"#b1bac4\",\"terminal.ansiYellow\":\"#d29922\",\"terminal.foreground\":\"#e6edf3\",\"textBlockQuote.background\":\"#010409\",\"textBlockQuote.border\":\"#30363d\",\"textCodeBlock.background\":\"#6e768166\",\"textLink.activeForeground\":\"#2f81f7\",\"textLink.foreground\":\"#2f81f7\",\"textPreformat.background\":\"#6e768166\",\"textPreformat.foreground\":\"#7d8590\",\"textSeparator.foreground\":\"#21262d\",\"titleBar.activeBackground\":\"#0d1117\",\"titleBar.activeForeground\":\"#7d8590\",\"titleBar.border\":\"#30363d\",\"titleBar.inactiveBackground\":\"#010409\",\"titleBar.inactiveForeground\":\"#7d8590\",\"tree.indentGuidesStroke\":\"#21262d\",\"welcomePage.buttonBackground\":\"#21262d\",\"welcomePage.buttonHoverBackground\":\"#30363d\"},\"displayName\":\"GitHub Dark Default\",\"name\":\"github-dark-default\",\"semanticHighlighting\":true,\"tokenColors\":[{\"scope\":[\"comment\",\"punctuation.definition.comment\",\"string.comment\"],\"settings\":{\"foreground\":\"#8b949e\"}},{\"scope\":[\"constant.other.placeholder\",\"constant.character\"],\"settings\":{\"foreground\":\"#ff7b72\"}},{\"scope\":[\"constant\",\"entity.name.constant\",\"variable.other.constant\",\"variable.other.enummember\",\"variable.language\",\"entity\"],\"settings\":{\"foreground\":\"#79c0ff\"}},{\"scope\":[\"entity.name\",\"meta.export.default\",\"meta.definition.variable\"],\"settings\":{\"foreground\":\"#ffa657\"}},{\"scope\":[\"variable.parameter.function\",\"meta.jsx.children\",\"meta.block\",\"meta.tag.attributes\",\"entity.name.constant\",\"meta.object.member\",\"meta.embedded.expression\"],\"settings\":{\"foreground\":\"#e6edf3\"}},{\"scope\":\"entity.name.function\",\"settings\":{\"foreground\":\"#d2a8ff\"}},{\"scope\":[\"entity.name.tag\",\"support.class.component\"],\"settings\":{\"foreground\":\"#7ee787\"}},{\"scope\":\"keyword\",\"settings\":{\"foreground\":\"#ff7b72\"}},{\"scope\":[\"storage\",\"storage.type\"],\"settings\":{\"foreground\":\"#ff7b72\"}},{\"scope\":[\"storage.modifier.package\",\"storage.modifier.import\",\"storage.type.java\"],\"settings\":{\"foreground\":\"#e6edf3\"}},{\"scope\":[\"string\",\"string punctuation.section.embedded source\"],\"settings\":{\"foreground\":\"#a5d6ff\"}},{\"scope\":\"support\",\"settings\":{\"foreground\":\"#79c0ff\"}},{\"scope\":\"meta.property-name\",\"settings\":{\"foreground\":\"#79c0ff\"}},{\"scope\":\"variable\",\"settings\":{\"foreground\":\"#ffa657\"}},{\"scope\":\"variable.other\",\"settings\":{\"foreground\":\"#e6edf3\"}},{\"scope\":\"invalid.broken\",\"settings\":{\"fontStyle\":\"italic\",\"foreground\":\"#ffa198\"}},{\"scope\":\"invalid.deprecated\",\"settings\":{\"fontStyle\":\"italic\",\"foreground\":\"#ffa198\"}},{\"scope\":\"invalid.illegal\",\"settings\":{\"fontStyle\":\"italic\",\"foreground\":\"#ffa198\"}},{\"scope\":\"invalid.unimplemented\",\"settings\":{\"fontStyle\":\"italic\",\"foreground\":\"#ffa198\"}},{\"scope\":\"carriage-return\",\"settings\":{\"background\":\"#ff7b72\",\"content\":\"^M\",\"fontStyle\":\"italic underline\",\"foreground\":\"#f0f6fc\"}},{\"scope\":\"message.error\",\"settings\":{\"foreground\":\"#ffa198\"}},{\"scope\":\"string variable\",\"settings\":{\"foreground\":\"#79c0ff\"}},{\"scope\":[\"source.regexp\",\"string.regexp\"],\"settings\":{\"foreground\":\"#a5d6ff\"}},{\"scope\":[\"string.regexp.character-class\",\"string.regexp constant.character.escape\",\"string.regexp source.ruby.embedded\",\"string.regexp string.regexp.arbitrary-repitition\"],\"settings\":{\"foreground\":\"#a5d6ff\"}},{\"scope\":\"string.regexp constant.character.escape\",\"settings\":{\"fontStyle\":\"bold\",\"foreground\":\"#7ee787\"}},{\"scope\":\"support.constant\",\"settings\":{\"foreground\":\"#79c0ff\"}},{\"scope\":\"support.variable\",\"settings\":{\"foreground\":\"#79c0ff\"}},{\"scope\":\"support.type.property-name.json\",\"settings\":{\"foreground\":\"#7ee787\"}},{\"scope\":\"meta.module-reference\",\"settings\":{\"foreground\":\"#79c0ff\"}},{\"scope\":\"punctuation.definition.list.begin.markdown\",\"settings\":{\"foreground\":\"#ffa657\"}},{\"scope\":[\"markup.heading\",\"markup.heading entity.name\"],\"settings\":{\"fontStyle\":\"bold\",\"foreground\":\"#79c0ff\"}},{\"scope\":\"markup.quote\",\"settings\":{\"foreground\":\"#7ee787\"}},{\"scope\":\"markup.italic\",\"settings\":{\"fontStyle\":\"italic\",\"foreground\":\"#e6edf3\"}},{\"scope\":\"markup.bold\",\"settings\":{\"fontStyle\":\"bold\",\"foreground\":\"#e6edf3\"}},{\"scope\":[\"markup.underline\"],\"settings\":{\"fontStyle\":\"underline\"}},{\"scope\":[\"markup.strikethrough\"],\"settings\":{\"fontStyle\":\"strikethrough\"}},{\"scope\":\"markup.inline.raw\",\"settings\":{\"foreground\":\"#79c0ff\"}},{\"scope\":[\"markup.deleted\",\"meta.diff.header.from-file\",\"punctuation.definition.deleted\"],\"settings\":{\"background\":\"#490202\",\"foreground\":\"#ffa198\"}},{\"scope\":[\"punctuation.section.embedded\"],\"settings\":{\"foreground\":\"#ff7b72\"}},{\"scope\":[\"markup.inserted\",\"meta.diff.header.to-file\",\"punctuation.definition.inserted\"],\"settings\":{\"background\":\"#04260f\",\"foreground\":\"#7ee787\"}},{\"scope\":[\"markup.changed\",\"punctuation.definition.changed\"],\"settings\":{\"background\":\"#5a1e02\",\"foreground\":\"#ffa657\"}},{\"scope\":[\"markup.ignored\",\"markup.untracked\"],\"settings\":{\"background\":\"#79c0ff\",\"foreground\":\"#161b22\"}},{\"scope\":\"meta.diff.range\",\"settings\":{\"fontStyle\":\"bold\",\"foreground\":\"#d2a8ff\"}},{\"scope\":\"meta.diff.header\",\"settings\":{\"foreground\":\"#79c0ff\"}},{\"scope\":\"meta.separator\",\"settings\":{\"fontStyle\":\"bold\",\"foreground\":\"#79c0ff\"}},{\"scope\":\"meta.output\",\"settings\":{\"foreground\":\"#79c0ff\"}},{\"scope\":[\"brackethighlighter.tag\",\"brackethighlighter.curly\",\"brackethighlighter.round\",\"brackethighlighter.square\",\"brackethighlighter.angle\",\"brackethighlighter.quote\"],\"settings\":{\"foreground\":\"#8b949e\"}},{\"scope\":\"brackethighlighter.unmatched\",\"settings\":{\"foreground\":\"#ffa198\"}},{\"scope\":[\"constant.other.reference.link\",\"string.other.link\"],\"settings\":{\"foreground\":\"#a5d6ff\"}}],\"type\":\"dark\"}")), o = class extends Error {
	constructor(e) {
		super(e), this.name = "ShikiError";
	}
};
//#endregion
//#region ../../node_modules/@shikijs/vscode-textmate/dist/index.js
function s(e) {
	return c(e);
}
function c(e) {
	return Array.isArray(e) ? l(e) : e instanceof RegExp ? e : typeof e == "object" ? u(e) : e;
}
function l(e) {
	let t = [];
	for (let n = 0, r = e.length; n < r; n++) t[n] = c(e[n]);
	return t;
}
function u(e) {
	let t = {};
	for (let n in e) t[n] = c(e[n]);
	return t;
}
function d(e, ...t) {
	return t.forEach((t) => {
		for (let n in t) e[n] = t[n];
	}), e;
}
function f(e) {
	let t = ~e.lastIndexOf("/") || ~e.lastIndexOf("\\");
	return t === 0 ? e : ~t === e.length - 1 ? f(e.substring(0, e.length - 1)) : e.substr(~t + 1);
}
var p = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/g, m = class {
	static hasCaptures(e) {
		return e === null ? !1 : (p.lastIndex = 0, p.test(e));
	}
	static replaceCaptures(e, t, n) {
		return e.replace(p, (e, r, i, a) => {
			let o = n[parseInt(r || i, 10)];
			if (o) {
				let e = t.substring(o.start, o.end);
				for (; e[0] === ".";) e = e.substring(1);
				switch (a) {
					case "downcase": return e.toLowerCase();
					case "upcase": return e.toUpperCase();
					default: return e;
				}
			} else return e;
		});
	}
};
function h(e, t) {
	return e < t ? -1 : e > t ? 1 : 0;
}
function g(e, t) {
	if (e === null && t === null) return 0;
	if (!e) return -1;
	if (!t) return 1;
	let n = e.length, r = t.length;
	if (n === r) {
		for (let r = 0; r < n; r++) {
			let n = h(e[r], t[r]);
			if (n !== 0) return n;
		}
		return 0;
	}
	return n - r;
}
function _(e) {
	return !!(/^#[0-9a-f]{6}$/i.test(e) || /^#[0-9a-f]{8}$/i.test(e) || /^#[0-9a-f]{3}$/i.test(e) || /^#[0-9a-f]{4}$/i.test(e));
}
function v(e) {
	return e.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
}
var ee = class {
	constructor(e) {
		this.fn = e;
	}
	cache = /* @__PURE__ */ new Map();
	get(e) {
		if (this.cache.has(e)) return this.cache.get(e);
		let t = this.fn(e);
		return this.cache.set(e, t), t;
	}
}, te = class {
	constructor(e, t, n) {
		this._colorMap = e, this._defaults = t, this._root = n;
	}
	static createFromRawTheme(e, t) {
		return this.createFromParsedTheme(oe(e), t);
	}
	static createFromParsedTheme(e, t) {
		return ce(e, t);
	}
	_cachedMatchRoot = new ee((e) => this._root.match(e));
	getColorMap() {
		return this._colorMap.getColorMap();
	}
	getDefaults() {
		return this._defaults;
	}
	match(e) {
		if (e === null) return this._defaults;
		let t = e.scopeName, n = this._cachedMatchRoot.get(t).find((t) => re(e.parent, t.parentScopes));
		return n ? new ae(n.fontStyle, n.foreground, n.background) : null;
	}
}, ne = class e {
	constructor(e, t) {
		this.parent = e, this.scopeName = t;
	}
	static push(t, n) {
		for (let r of n) t = new e(t, r);
		return t;
	}
	static from(...t) {
		let n = null;
		for (let r = 0; r < t.length; r++) n = new e(n, t[r]);
		return n;
	}
	push(t) {
		return new e(this, t);
	}
	getSegments() {
		let e = this, t = [];
		for (; e;) t.push(e.scopeName), e = e.parent;
		return t.reverse(), t;
	}
	toString() {
		return this.getSegments().join(" ");
	}
	extends(e) {
		return this === e ? !0 : this.parent === null ? !1 : this.parent.extends(e);
	}
	getExtensionIfDefined(e) {
		let t = [], n = this;
		for (; n && n !== e;) t.push(n.scopeName), n = n.parent;
		return n === e ? t.reverse() : void 0;
	}
};
function re(e, t) {
	if (t.length === 0) return !0;
	for (let n = 0; n < t.length; n++) {
		let r = t[n], i = !1;
		if (r === ">") {
			if (n === t.length - 1) return !1;
			r = t[++n], i = !0;
		}
		for (; e && !ie(e.scopeName, r);) {
			if (i) return !1;
			e = e.parent;
		}
		if (!e) return !1;
		e = e.parent;
	}
	return !0;
}
function ie(e, t) {
	return t === e || e.startsWith(t) && e[t.length] === ".";
}
var ae = class {
	constructor(e, t, n) {
		this.fontStyle = e, this.foregroundId = t, this.backgroundId = n;
	}
};
function oe(e) {
	if (!e || !e.settings || !Array.isArray(e.settings)) return [];
	let t = e.settings, n = [], r = 0;
	for (let e = 0, i = t.length; e < i; e++) {
		let i = t[e];
		if (!i.settings) continue;
		let a;
		if (typeof i.scope == "string") {
			let e = i.scope;
			e = e.replace(/^[,]+/, ""), e = e.replace(/[,]+$/, ""), a = e.split(",");
		} else a = Array.isArray(i.scope) ? i.scope : [""];
		let o = -1;
		if (typeof i.settings.fontStyle == "string") {
			o = 0;
			let e = i.settings.fontStyle.split(" ");
			for (let t = 0, n = e.length; t < n; t++) switch (e[t]) {
				case "italic":
					o |= 1;
					break;
				case "bold":
					o |= 2;
					break;
				case "underline":
					o |= 4;
					break;
				case "strikethrough":
					o |= 8;
					break;
			}
		}
		let s = null;
		typeof i.settings.foreground == "string" && _(i.settings.foreground) && (s = i.settings.foreground);
		let c = null;
		typeof i.settings.background == "string" && _(i.settings.background) && (c = i.settings.background);
		for (let t = 0, i = a.length; t < i; t++) {
			let i = a[t].trim().split(" "), l = i[i.length - 1], u = null;
			i.length > 1 && (u = i.slice(0, i.length - 1), u.reverse()), n[r++] = new se(l, u, e, o, s, c);
		}
	}
	return n;
}
var se = class {
	constructor(e, t, n, r, i, a) {
		this.scope = e, this.parentScopes = t, this.index = n, this.fontStyle = r, this.foreground = i, this.background = a;
	}
}, y = /* @__PURE__ */ ((e) => (e[e.NotSet = -1] = "NotSet", e[e.None = 0] = "None", e[e.Italic = 1] = "Italic", e[e.Bold = 2] = "Bold", e[e.Underline = 4] = "Underline", e[e.Strikethrough = 8] = "Strikethrough", e))(y || {});
function ce(e, t) {
	e.sort((e, t) => {
		let n = h(e.scope, t.scope);
		return n !== 0 || (n = g(e.parentScopes, t.parentScopes), n !== 0) ? n : e.index - t.index;
	});
	let n = 0, r = "#000000", i = "#ffffff";
	for (; e.length >= 1 && e[0].scope === "";) {
		let t = e.shift();
		t.fontStyle !== -1 && (n = t.fontStyle), t.foreground !== null && (r = t.foreground), t.background !== null && (i = t.background);
	}
	let a = new le(t), o = new ae(n, a.getId(r), a.getId(i)), s = new fe(new de(0, null, -1, 0, 0), []);
	for (let t = 0, n = e.length; t < n; t++) {
		let n = e[t];
		s.insert(0, n.scope, n.parentScopes, n.fontStyle, a.getId(n.foreground), a.getId(n.background));
	}
	return new te(a, o, s);
}
var le = class {
	_isFrozen;
	_lastColorId;
	_id2color;
	_color2id;
	constructor(e) {
		if (this._lastColorId = 0, this._id2color = [], this._color2id = /* @__PURE__ */ Object.create(null), Array.isArray(e)) {
			this._isFrozen = !0;
			for (let t = 0, n = e.length; t < n; t++) this._color2id[e[t]] = t, this._id2color[t] = e[t];
		} else this._isFrozen = !1;
	}
	getId(e) {
		if (e === null) return 0;
		e = e.toUpperCase();
		let t = this._color2id[e];
		if (t) return t;
		if (this._isFrozen) throw Error(`Missing color in color map - ${e}`);
		return t = ++this._lastColorId, this._color2id[e] = t, this._id2color[t] = e, t;
	}
	getColorMap() {
		return this._id2color.slice(0);
	}
}, ue = Object.freeze([]), de = class e {
	scopeDepth;
	parentScopes;
	fontStyle;
	foreground;
	background;
	constructor(e, t, n, r, i) {
		this.scopeDepth = e, this.parentScopes = t || ue, this.fontStyle = n, this.foreground = r, this.background = i;
	}
	clone() {
		return new e(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
	}
	static cloneArr(e) {
		let t = [];
		for (let n = 0, r = e.length; n < r; n++) t[n] = e[n].clone();
		return t;
	}
	acceptOverwrite(e, t, n, r) {
		this.scopeDepth > e ? console.log("how did this happen?") : this.scopeDepth = e, t !== -1 && (this.fontStyle = t), n !== 0 && (this.foreground = n), r !== 0 && (this.background = r);
	}
}, fe = class e {
	constructor(e, t = [], n = {}) {
		this._mainRule = e, this._children = n, this._rulesWithParentScopes = t;
	}
	_rulesWithParentScopes;
	static _cmpBySpecificity(e, t) {
		if (e.scopeDepth !== t.scopeDepth) return t.scopeDepth - e.scopeDepth;
		let n = 0, r = 0;
		for (; e.parentScopes[n] === ">" && n++, t.parentScopes[r] === ">" && r++, !(n >= e.parentScopes.length || r >= t.parentScopes.length);) {
			let i = t.parentScopes[r].length - e.parentScopes[n].length;
			if (i !== 0) return i;
			n++, r++;
		}
		return t.parentScopes.length - e.parentScopes.length;
	}
	match(t) {
		if (t !== "") {
			let e = t.indexOf("."), n, r;
			if (e === -1 ? (n = t, r = "") : (n = t.substring(0, e), r = t.substring(e + 1)), this._children.hasOwnProperty(n)) return this._children[n].match(r);
		}
		let n = this._rulesWithParentScopes.concat(this._mainRule);
		return n.sort(e._cmpBySpecificity), n;
	}
	insert(t, n, r, i, a, o) {
		if (n === "") {
			this._doInsertHere(t, r, i, a, o);
			return;
		}
		let s = n.indexOf("."), c, l;
		s === -1 ? (c = n, l = "") : (c = n.substring(0, s), l = n.substring(s + 1));
		let u;
		this._children.hasOwnProperty(c) ? u = this._children[c] : (u = new e(this._mainRule.clone(), de.cloneArr(this._rulesWithParentScopes)), this._children[c] = u), u.insert(t + 1, l, r, i, a, o);
	}
	_doInsertHere(e, t, n, r, i) {
		if (t === null) {
			this._mainRule.acceptOverwrite(e, n, r, i);
			return;
		}
		for (let a = 0, o = this._rulesWithParentScopes.length; a < o; a++) {
			let o = this._rulesWithParentScopes[a];
			if (g(o.parentScopes, t) === 0) {
				o.acceptOverwrite(e, n, r, i);
				return;
			}
		}
		n === -1 && (n = this._mainRule.fontStyle), r === 0 && (r = this._mainRule.foreground), i === 0 && (i = this._mainRule.background), this._rulesWithParentScopes.push(new de(e, t, n, r, i));
	}
}, b = class e {
	static toBinaryStr(e) {
		return e.toString(2).padStart(32, "0");
	}
	static print(t) {
		let n = e.getLanguageId(t), r = e.getTokenType(t), i = e.getFontStyle(t), a = e.getForeground(t), o = e.getBackground(t);
		console.log({
			languageId: n,
			tokenType: r,
			fontStyle: i,
			foreground: a,
			background: o
		});
	}
	static getLanguageId(e) {
		return (e & 255) >>> 0;
	}
	static getTokenType(e) {
		return (e & 768) >>> 8;
	}
	static containsBalancedBrackets(e) {
		return (e & 1024) != 0;
	}
	static getFontStyle(e) {
		return (e & 30720) >>> 11;
	}
	static getForeground(e) {
		return (e & 16744448) >>> 15;
	}
	static getBackground(e) {
		return (e & 4278190080) >>> 24;
	}
	static set(t, n, r, i, a, o, s) {
		let c = e.getLanguageId(t), l = e.getTokenType(t), u = e.containsBalancedBrackets(t) ? 1 : 0, d = e.getFontStyle(t), f = e.getForeground(t), p = e.getBackground(t);
		return n !== 0 && (c = n), r !== 8 && (l = me(r)), i !== null && (u = i ? 1 : 0), a !== -1 && (d = a), o !== 0 && (f = o), s !== 0 && (p = s), (c << 0 | l << 8 | u << 10 | d << 11 | f << 15 | p << 24) >>> 0;
	}
};
function pe(e) {
	return e;
}
function me(e) {
	return e;
}
function he(e, t) {
	let n = [], r = _e(e), i = r.next();
	for (; i !== null;) {
		let e = 0;
		if (i.length === 2 && i.charAt(1) === ":") {
			switch (i.charAt(0)) {
				case "R":
					e = 1;
					break;
				case "L":
					e = -1;
					break;
				default: console.log(`Unknown priority ${i} in scope selector`);
			}
			i = r.next();
		}
		let t = o();
		if (n.push({
			matcher: t,
			priority: e
		}), i !== ",") break;
		i = r.next();
	}
	return n;
	function a() {
		if (i === "-") {
			i = r.next();
			let e = a();
			return (t) => !!e && !e(t);
		}
		if (i === "(") {
			i = r.next();
			let e = s();
			return i === ")" && (i = r.next()), e;
		}
		if (ge(i)) {
			let e = [];
			do
				e.push(i), i = r.next();
			while (ge(i));
			return (n) => t(e, n);
		}
		return null;
	}
	function o() {
		let e = [], t = a();
		for (; t;) e.push(t), t = a();
		return (t) => e.every((e) => e(t));
	}
	function s() {
		let e = [], t = o();
		for (; t && (e.push(t), i === "|" || i === ",");) {
			do
				i = r.next();
			while (i === "|" || i === ",");
			t = o();
		}
		return (t) => e.some((e) => e(t));
	}
}
function ge(e) {
	return !!e && !!e.match(/[\w\.:]+/);
}
function _e(e) {
	let t = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g, n = t.exec(e);
	return { next: () => {
		if (!n) return null;
		let r = n[0];
		return n = t.exec(e), r;
	} };
}
function ve(e) {
	typeof e.dispose == "function" && e.dispose();
}
var ye = class {
	constructor(e) {
		this.scopeName = e;
	}
	toKey() {
		return this.scopeName;
	}
}, be = class {
	constructor(e, t) {
		this.scopeName = e, this.ruleName = t;
	}
	toKey() {
		return `${this.scopeName}#${this.ruleName}`;
	}
}, xe = class {
	_references = [];
	_seenReferenceKeys = /* @__PURE__ */ new Set();
	get references() {
		return this._references;
	}
	visitedRule = /* @__PURE__ */ new Set();
	add(e) {
		let t = e.toKey();
		this._seenReferenceKeys.has(t) || (this._seenReferenceKeys.add(t), this._references.push(e));
	}
}, Se = class {
	constructor(e, t) {
		this.repo = e, this.initialScopeName = t, this.seenFullScopeRequests.add(this.initialScopeName), this.Q = [new ye(this.initialScopeName)];
	}
	seenFullScopeRequests = /* @__PURE__ */ new Set();
	seenPartialScopeRequests = /* @__PURE__ */ new Set();
	Q;
	processQueue() {
		let e = this.Q;
		this.Q = [];
		let t = new xe();
		for (let n of e) Ce(n, this.initialScopeName, this.repo, t);
		for (let e of t.references) if (e instanceof ye) {
			if (this.seenFullScopeRequests.has(e.scopeName)) continue;
			this.seenFullScopeRequests.add(e.scopeName), this.Q.push(e);
		} else {
			if (this.seenFullScopeRequests.has(e.scopeName) || this.seenPartialScopeRequests.has(e.toKey())) continue;
			this.seenPartialScopeRequests.add(e.toKey()), this.Q.push(e);
		}
	}
};
function Ce(e, t, n, r) {
	let i = n.lookup(e.scopeName);
	if (!i) {
		if (e.scopeName === t) throw Error(`No grammar provided for <${t}>`);
		return;
	}
	let a = n.lookup(t);
	e instanceof ye ? Te({
		baseGrammar: a,
		selfGrammar: i
	}, r) : we(e.ruleName, {
		baseGrammar: a,
		selfGrammar: i,
		repository: i.repository
	}, r);
	let o = n.injections(e.scopeName);
	if (o) for (let e of o) r.add(new ye(e));
}
function we(e, t, n) {
	if (t.repository && t.repository[e]) {
		let r = t.repository[e];
		Ee([r], t, n);
	}
}
function Te(e, t) {
	e.selfGrammar.patterns && Array.isArray(e.selfGrammar.patterns) && Ee(e.selfGrammar.patterns, {
		...e,
		repository: e.selfGrammar.repository
	}, t), e.selfGrammar.injections && Ee(Object.values(e.selfGrammar.injections), {
		...e,
		repository: e.selfGrammar.repository
	}, t);
}
function Ee(e, t, n) {
	for (let r of e) {
		if (n.visitedRule.has(r)) continue;
		n.visitedRule.add(r);
		let e = r.repository ? d({}, t.repository, r.repository) : t.repository;
		Array.isArray(r.patterns) && Ee(r.patterns, {
			...t,
			repository: e
		}, n);
		let i = r.include;
		if (!i) continue;
		let a = Me(i);
		switch (a.kind) {
			case 0:
				Te({
					...t,
					selfGrammar: t.baseGrammar
				}, n);
				break;
			case 1:
				Te(t, n);
				break;
			case 2:
				we(a.ruleName, {
					...t,
					repository: e
				}, n);
				break;
			case 3:
			case 4:
				let r = a.scopeName === t.selfGrammar.scopeName ? t.selfGrammar : a.scopeName === t.baseGrammar.scopeName ? t.baseGrammar : void 0;
				if (r) {
					let i = {
						baseGrammar: t.baseGrammar,
						selfGrammar: r,
						repository: e
					};
					a.kind === 4 ? we(a.ruleName, i, n) : Te(i, n);
				} else a.kind === 4 ? n.add(new be(a.scopeName, a.ruleName)) : n.add(new ye(a.scopeName));
				break;
		}
	}
}
var De = class {
	kind = 0;
}, Oe = class {
	kind = 1;
}, ke = class {
	constructor(e) {
		this.ruleName = e;
	}
	kind = 2;
}, Ae = class {
	constructor(e) {
		this.scopeName = e;
	}
	kind = 3;
}, je = class {
	constructor(e, t) {
		this.scopeName = e, this.ruleName = t;
	}
	kind = 4;
};
function Me(e) {
	if (e === "$base") return new De();
	if (e === "$self") return new Oe();
	let t = e.indexOf("#");
	return t === -1 ? new Ae(e) : t === 0 ? new ke(e.substring(1)) : new je(e.substring(0, t), e.substring(t + 1));
}
var Ne = /\\(\d+)/, Pe = /\\(\d+)/g, Fe = -1, Ie = -2;
function Le(e) {
	return e;
}
function Re(e) {
	return e;
}
var ze = class {
	$location;
	id;
	_nameIsCapturing;
	_name;
	_contentNameIsCapturing;
	_contentName;
	constructor(e, t, n, r) {
		this.$location = e, this.id = t, this._name = n || null, this._nameIsCapturing = m.hasCaptures(this._name), this._contentName = r || null, this._contentNameIsCapturing = m.hasCaptures(this._contentName);
	}
	get debugName() {
		let e = this.$location ? `${f(this.$location.filename)}:${this.$location.line}` : "unknown";
		return `${this.constructor.name}#${this.id} @ ${e}`;
	}
	getName(e, t) {
		return !this._nameIsCapturing || this._name === null || e === null || t === null ? this._name : m.replaceCaptures(this._name, e, t);
	}
	getContentName(e, t) {
		return !this._contentNameIsCapturing || this._contentName === null ? this._contentName : m.replaceCaptures(this._contentName, e, t);
	}
}, Be = class extends ze {
	retokenizeCapturedWithRuleId;
	constructor(e, t, n, r, i) {
		super(e, t, n, r), this.retokenizeCapturedWithRuleId = i;
	}
	dispose() {}
	collectPatterns(e, t) {
		throw Error("Not supported!");
	}
	compile(e, t) {
		throw Error("Not supported!");
	}
	compileAG(e, t, n, r) {
		throw Error("Not supported!");
	}
}, Ve = class extends ze {
	_match;
	captures;
	_cachedCompiledPatterns;
	constructor(e, t, n, r, i) {
		super(e, t, n, null), this._match = new Ke(r, this.id), this.captures = i, this._cachedCompiledPatterns = null;
	}
	dispose() {
		this._cachedCompiledPatterns &&= (this._cachedCompiledPatterns.dispose(), null);
	}
	get debugMatchRegExp() {
		return `${this._match.source}`;
	}
	collectPatterns(e, t) {
		t.push(this._match);
	}
	compile(e, t) {
		return this._getCachedCompiledPatterns(e).compile(e);
	}
	compileAG(e, t, n, r) {
		return this._getCachedCompiledPatterns(e).compileAG(e, n, r);
	}
	_getCachedCompiledPatterns(e) {
		return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new qe(), this.collectPatterns(e, this._cachedCompiledPatterns)), this._cachedCompiledPatterns;
	}
}, He = class extends ze {
	hasMissingPatterns;
	patterns;
	_cachedCompiledPatterns;
	constructor(e, t, n, r, i) {
		super(e, t, n, r), this.patterns = i.patterns, this.hasMissingPatterns = i.hasMissingPatterns, this._cachedCompiledPatterns = null;
	}
	dispose() {
		this._cachedCompiledPatterns &&= (this._cachedCompiledPatterns.dispose(), null);
	}
	collectPatterns(e, t) {
		for (let n of this.patterns) e.getRule(n).collectPatterns(e, t);
	}
	compile(e, t) {
		return this._getCachedCompiledPatterns(e).compile(e);
	}
	compileAG(e, t, n, r) {
		return this._getCachedCompiledPatterns(e).compileAG(e, n, r);
	}
	_getCachedCompiledPatterns(e) {
		return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new qe(), this.collectPatterns(e, this._cachedCompiledPatterns)), this._cachedCompiledPatterns;
	}
}, Ue = class extends ze {
	_begin;
	beginCaptures;
	_end;
	endHasBackReferences;
	endCaptures;
	applyEndPatternLast;
	hasMissingPatterns;
	patterns;
	_cachedCompiledPatterns;
	constructor(e, t, n, r, i, a, o, s, c, l) {
		super(e, t, n, r), this._begin = new Ke(i, this.id), this.beginCaptures = a, this._end = new Ke(o || "￿", -1), this.endHasBackReferences = this._end.hasBackReferences, this.endCaptures = s, this.applyEndPatternLast = c || !1, this.patterns = l.patterns, this.hasMissingPatterns = l.hasMissingPatterns, this._cachedCompiledPatterns = null;
	}
	dispose() {
		this._cachedCompiledPatterns &&= (this._cachedCompiledPatterns.dispose(), null);
	}
	get debugBeginRegExp() {
		return `${this._begin.source}`;
	}
	get debugEndRegExp() {
		return `${this._end.source}`;
	}
	getEndWithResolvedBackReferences(e, t) {
		return this._end.resolveBackReferences(e, t);
	}
	collectPatterns(e, t) {
		t.push(this._begin);
	}
	compile(e, t) {
		return this._getCachedCompiledPatterns(e, t).compile(e);
	}
	compileAG(e, t, n, r) {
		return this._getCachedCompiledPatterns(e, t).compileAG(e, n, r);
	}
	_getCachedCompiledPatterns(e, t) {
		if (!this._cachedCompiledPatterns) {
			this._cachedCompiledPatterns = new qe();
			for (let t of this.patterns) e.getRule(t).collectPatterns(e, this._cachedCompiledPatterns);
			this.applyEndPatternLast ? this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end) : this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end);
		}
		return this._end.hasBackReferences && (this.applyEndPatternLast ? this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, t) : this._cachedCompiledPatterns.setSource(0, t)), this._cachedCompiledPatterns;
	}
}, We = class extends ze {
	_begin;
	beginCaptures;
	whileCaptures;
	_while;
	whileHasBackReferences;
	hasMissingPatterns;
	patterns;
	_cachedCompiledPatterns;
	_cachedCompiledWhilePatterns;
	constructor(e, t, n, r, i, a, o, s, c) {
		super(e, t, n, r), this._begin = new Ke(i, this.id), this.beginCaptures = a, this.whileCaptures = s, this._while = new Ke(o, Ie), this.whileHasBackReferences = this._while.hasBackReferences, this.patterns = c.patterns, this.hasMissingPatterns = c.hasMissingPatterns, this._cachedCompiledPatterns = null, this._cachedCompiledWhilePatterns = null;
	}
	dispose() {
		this._cachedCompiledPatterns &&= (this._cachedCompiledPatterns.dispose(), null), this._cachedCompiledWhilePatterns &&= (this._cachedCompiledWhilePatterns.dispose(), null);
	}
	get debugBeginRegExp() {
		return `${this._begin.source}`;
	}
	get debugWhileRegExp() {
		return `${this._while.source}`;
	}
	getWhileWithResolvedBackReferences(e, t) {
		return this._while.resolveBackReferences(e, t);
	}
	collectPatterns(e, t) {
		t.push(this._begin);
	}
	compile(e, t) {
		return this._getCachedCompiledPatterns(e).compile(e);
	}
	compileAG(e, t, n, r) {
		return this._getCachedCompiledPatterns(e).compileAG(e, n, r);
	}
	_getCachedCompiledPatterns(e) {
		if (!this._cachedCompiledPatterns) {
			this._cachedCompiledPatterns = new qe();
			for (let t of this.patterns) e.getRule(t).collectPatterns(e, this._cachedCompiledPatterns);
		}
		return this._cachedCompiledPatterns;
	}
	compileWhile(e, t) {
		return this._getCachedCompiledWhilePatterns(e, t).compile(e);
	}
	compileWhileAG(e, t, n, r) {
		return this._getCachedCompiledWhilePatterns(e, t).compileAG(e, n, r);
	}
	_getCachedCompiledWhilePatterns(e, t) {
		return this._cachedCompiledWhilePatterns || (this._cachedCompiledWhilePatterns = new qe(), this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while)), this._while.hasBackReferences && this._cachedCompiledWhilePatterns.setSource(0, t || "￿"), this._cachedCompiledWhilePatterns;
	}
}, Ge = class e {
	static createCaptureRule(e, t, n, r, i) {
		return e.registerRule((e) => new Be(t, e, n, r, i));
	}
	static getCompiledRuleId(t, n, r) {
		return t.id || n.registerRule((i) => {
			if (t.id = i, t.match) return new Ve(t.$vscodeTextmateLocation, t.id, t.name, t.match, e._compileCaptures(t.captures, n, r));
			if (t.begin === void 0) {
				t.repository && (r = d({}, r, t.repository));
				let i = t.patterns;
				return i === void 0 && t.include && (i = [{ include: t.include }]), new He(t.$vscodeTextmateLocation, t.id, t.name, t.contentName, e._compilePatterns(i, n, r));
			}
			return t.while ? new We(t.$vscodeTextmateLocation, t.id, t.name, t.contentName, t.begin, e._compileCaptures(t.beginCaptures || t.captures, n, r), t.while, e._compileCaptures(t.whileCaptures || t.captures, n, r), e._compilePatterns(t.patterns, n, r)) : new Ue(t.$vscodeTextmateLocation, t.id, t.name, t.contentName, t.begin, e._compileCaptures(t.beginCaptures || t.captures, n, r), t.end, e._compileCaptures(t.endCaptures || t.captures, n, r), t.applyEndPatternLast, e._compilePatterns(t.patterns, n, r));
		}), t.id;
	}
	static _compileCaptures(t, n, r) {
		let i = [];
		if (t) {
			let a = 0;
			for (let e in t) {
				if (e === "$vscodeTextmateLocation") continue;
				let t = parseInt(e, 10);
				t > a && (a = t);
			}
			for (let e = 0; e <= a; e++) i[e] = null;
			for (let a in t) {
				if (a === "$vscodeTextmateLocation") continue;
				let o = parseInt(a, 10), s = 0;
				t[a].patterns && (s = e.getCompiledRuleId(t[a], n, r)), i[o] = e.createCaptureRule(n, t[a].$vscodeTextmateLocation, t[a].name, t[a].contentName, s);
			}
		}
		return i;
	}
	static _compilePatterns(t, n, r) {
		let i = [];
		if (t) for (let a = 0, o = t.length; a < o; a++) {
			let o = t[a], s = -1;
			if (o.include) {
				let t = Me(o.include);
				switch (t.kind) {
					case 0:
					case 1:
						s = e.getCompiledRuleId(r[o.include], n, r);
						break;
					case 2:
						let i = r[t.ruleName];
						i && (s = e.getCompiledRuleId(i, n, r));
						break;
					case 3:
					case 4:
						let a = t.scopeName, c = t.kind === 4 ? t.ruleName : null, l = n.getExternalGrammar(a, r);
						if (l) if (c) {
							let t = l.repository[c];
							t && (s = e.getCompiledRuleId(t, n, l.repository));
						} else s = e.getCompiledRuleId(l.repository.$self, n, l.repository);
						break;
				}
			} else s = e.getCompiledRuleId(o, n, r);
			if (s !== -1) {
				let e = n.getRule(s), t = !1;
				if ((e instanceof He || e instanceof Ue || e instanceof We) && e.hasMissingPatterns && e.patterns.length === 0 && (t = !0), t) continue;
				i.push(s);
			}
		}
		return {
			patterns: i,
			hasMissingPatterns: (t ? t.length : 0) !== i.length
		};
	}
}, Ke = class e {
	source;
	ruleId;
	hasAnchor;
	hasBackReferences;
	_anchorCache;
	constructor(e, t) {
		if (e && typeof e == "string") {
			let t = e.length, n = 0, r = [], i = !1;
			for (let a = 0; a < t; a++) if (e.charAt(a) === "\\" && a + 1 < t) {
				let t = e.charAt(a + 1);
				t === "z" ? (r.push(e.substring(n, a)), r.push("$(?!\\n)(?<!\\n)"), n = a + 2) : (t === "A" || t === "G") && (i = !0), a++;
			}
			this.hasAnchor = i, n === 0 ? this.source = e : (r.push(e.substring(n, t)), this.source = r.join(""));
		} else this.hasAnchor = !1, this.source = e;
		this.hasAnchor ? this._anchorCache = this._buildAnchorCache() : this._anchorCache = null, this.ruleId = t, typeof this.source == "string" ? this.hasBackReferences = Ne.test(this.source) : this.hasBackReferences = !1;
	}
	clone() {
		return new e(this.source, this.ruleId);
	}
	setSource(e) {
		this.source !== e && (this.source = e, this.hasAnchor && (this._anchorCache = this._buildAnchorCache()));
	}
	resolveBackReferences(e, t) {
		if (typeof this.source != "string") throw Error("This method should only be called if the source is a string");
		let n = t.map((t) => e.substring(t.start, t.end));
		return Pe.lastIndex = 0, this.source.replace(Pe, (e, t) => v(n[parseInt(t, 10)] || ""));
	}
	_buildAnchorCache() {
		if (typeof this.source != "string") throw Error("This method should only be called if the source is a string");
		let e = [], t = [], n = [], r = [], i, a, o, s;
		for (i = 0, a = this.source.length; i < a; i++) o = this.source.charAt(i), e[i] = o, t[i] = o, n[i] = o, r[i] = o, o === "\\" && i + 1 < a && (s = this.source.charAt(i + 1), s === "A" ? (e[i + 1] = "￿", t[i + 1] = "￿", n[i + 1] = "A", r[i + 1] = "A") : s === "G" ? (e[i + 1] = "￿", t[i + 1] = "G", n[i + 1] = "￿", r[i + 1] = "G") : (e[i + 1] = s, t[i + 1] = s, n[i + 1] = s, r[i + 1] = s), i++);
		return {
			A0_G0: e.join(""),
			A0_G1: t.join(""),
			A1_G0: n.join(""),
			A1_G1: r.join("")
		};
	}
	resolveAnchors(e, t) {
		return !this.hasAnchor || !this._anchorCache || typeof this.source != "string" ? this.source : e ? t ? this._anchorCache.A1_G1 : this._anchorCache.A1_G0 : t ? this._anchorCache.A0_G1 : this._anchorCache.A0_G0;
	}
}, qe = class {
	_items;
	_hasAnchors;
	_cached;
	_anchorCache;
	constructor() {
		this._items = [], this._hasAnchors = !1, this._cached = null, this._anchorCache = {
			A0_G0: null,
			A0_G1: null,
			A1_G0: null,
			A1_G1: null
		};
	}
	dispose() {
		this._disposeCaches();
	}
	_disposeCaches() {
		this._cached &&= (this._cached.dispose(), null), this._anchorCache.A0_G0 && (this._anchorCache.A0_G0.dispose(), this._anchorCache.A0_G0 = null), this._anchorCache.A0_G1 && (this._anchorCache.A0_G1.dispose(), this._anchorCache.A0_G1 = null), this._anchorCache.A1_G0 && (this._anchorCache.A1_G0.dispose(), this._anchorCache.A1_G0 = null), this._anchorCache.A1_G1 && (this._anchorCache.A1_G1.dispose(), this._anchorCache.A1_G1 = null);
	}
	push(e) {
		this._items.push(e), this._hasAnchors = this._hasAnchors || e.hasAnchor;
	}
	unshift(e) {
		this._items.unshift(e), this._hasAnchors = this._hasAnchors || e.hasAnchor;
	}
	length() {
		return this._items.length;
	}
	setSource(e, t) {
		this._items[e].source !== t && (this._disposeCaches(), this._items[e].setSource(t));
	}
	compile(e) {
		return this._cached ||= new Je(e, this._items.map((e) => e.source), this._items.map((e) => e.ruleId)), this._cached;
	}
	compileAG(e, t, n) {
		return this._hasAnchors ? t ? n ? (this._anchorCache.A1_G1 || (this._anchorCache.A1_G1 = this._resolveAnchors(e, t, n)), this._anchorCache.A1_G1) : (this._anchorCache.A1_G0 || (this._anchorCache.A1_G0 = this._resolveAnchors(e, t, n)), this._anchorCache.A1_G0) : n ? (this._anchorCache.A0_G1 || (this._anchorCache.A0_G1 = this._resolveAnchors(e, t, n)), this._anchorCache.A0_G1) : (this._anchorCache.A0_G0 || (this._anchorCache.A0_G0 = this._resolveAnchors(e, t, n)), this._anchorCache.A0_G0) : this.compile(e);
	}
	_resolveAnchors(e, t, n) {
		return new Je(e, this._items.map((e) => e.resolveAnchors(t, n)), this._items.map((e) => e.ruleId));
	}
}, Je = class {
	constructor(e, t, n) {
		this.regExps = t, this.rules = n, this.scanner = e.createOnigScanner(t);
	}
	scanner;
	dispose() {
		typeof this.scanner.dispose == "function" && this.scanner.dispose();
	}
	toString() {
		let e = [];
		for (let t = 0, n = this.rules.length; t < n; t++) e.push("   - " + this.rules[t] + ": " + this.regExps[t]);
		return e.join("\n");
	}
	findNextMatchSync(e, t, n) {
		let r = this.scanner.findNextMatchSync(e, t, n);
		return r ? {
			ruleId: this.rules[r.index],
			captureIndices: r.captureIndices
		} : null;
	}
}, Ye = class {
	constructor(e, t) {
		this.languageId = e, this.tokenType = t;
	}
}, Xe = class e {
	_defaultAttributes;
	_embeddedLanguagesMatcher;
	constructor(e, t) {
		this._defaultAttributes = new Ye(e, 8), this._embeddedLanguagesMatcher = new Ze(Object.entries(t || {}));
	}
	getDefaultAttributes() {
		return this._defaultAttributes;
	}
	getBasicScopeAttributes(t) {
		return t === null ? e._NULL_SCOPE_METADATA : this._getBasicScopeAttributes.get(t);
	}
	static _NULL_SCOPE_METADATA = new Ye(0, 0);
	_getBasicScopeAttributes = new ee((e) => new Ye(this._scopeToLanguage(e), this._toStandardTokenType(e)));
	_scopeToLanguage(e) {
		return this._embeddedLanguagesMatcher.match(e) || 0;
	}
	_toStandardTokenType(t) {
		let n = t.match(e.STANDARD_TOKEN_TYPE_REGEXP);
		if (!n) return 8;
		switch (n[1]) {
			case "comment": return 1;
			case "string": return 2;
			case "regex": return 3;
			case "meta.embedded": return 0;
		}
		throw Error("Unexpected match for standard token type!");
	}
	static STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex|meta\.embedded)\b/;
}, Ze = class {
	values;
	scopesRegExp;
	constructor(e) {
		if (e.length === 0) this.values = null, this.scopesRegExp = null;
		else {
			this.values = new Map(e);
			let t = e.map(([e, t]) => v(e));
			t.sort(), t.reverse(), this.scopesRegExp = RegExp(`^((${t.join(")|(")}))($|\\.)`, "");
		}
	}
	match(e) {
		if (!this.scopesRegExp) return;
		let t = e.match(this.scopesRegExp);
		if (t) return this.values.get(t[1]);
	}
};
typeof process < "u" && process.env.VSCODE_TEXTMATE_DEBUG;
var Qe = !1, $e = class {
	constructor(e, t) {
		this.stack = e, this.stoppedEarly = t;
	}
};
function et(e, t, n, r, i, a, o, s) {
	let c = t.content.length, l = !1, u = -1;
	if (o) {
		let o = tt(e, t, n, r, i, a);
		i = o.stack, r = o.linePos, n = o.isFirstLine, u = o.anchorPosition;
	}
	let d = Date.now();
	for (; !l;) {
		if (s !== 0 && Date.now() - d > s) return new $e(i, !0);
		f();
	}
	return new $e(i, !1);
	function f() {
		let o = nt(e, t, n, r, i, u);
		if (!o) {
			a.produce(i, c), l = !0;
			return;
		}
		let s = o.captureIndices, d = o.matchedRuleId, f = s && s.length > 0 ? s[0].end > r : !1;
		if (d === Fe) {
			let o = i.getRule(e);
			a.produce(i, s[0].start), i = i.withContentNameScopesList(i.nameScopesList), ct(e, t, n, i, a, o.endCaptures, s), a.produce(i, s[0].end);
			let d = i;
			if (i = i.parent, u = d.getAnchorPos(), !f && d.getEnterPos() === r) {
				i = d, a.produce(i, c), l = !0;
				return;
			}
		} else {
			let o = e.getRule(d);
			a.produce(i, s[0].start);
			let p = i, m = o.getName(t.content, s), h = i.contentNameScopesList.pushAttributed(m, e);
			if (i = i.push(d, r, u, s[0].end === c, null, h, h), o instanceof Ue) {
				let r = o;
				ct(e, t, n, i, a, r.beginCaptures, s), a.produce(i, s[0].end), u = s[0].end;
				let d = r.getContentName(t.content, s), m = h.pushAttributed(d, e);
				if (i = i.withContentNameScopesList(m), r.endHasBackReferences && (i = i.withEndRule(r.getEndWithResolvedBackReferences(t.content, s))), !f && p.hasSameRuleAs(i)) {
					i = i.pop(), a.produce(i, c), l = !0;
					return;
				}
			} else if (o instanceof We) {
				let r = o;
				ct(e, t, n, i, a, r.beginCaptures, s), a.produce(i, s[0].end), u = s[0].end;
				let d = r.getContentName(t.content, s), m = h.pushAttributed(d, e);
				if (i = i.withContentNameScopesList(m), r.whileHasBackReferences && (i = i.withEndRule(r.getWhileWithResolvedBackReferences(t.content, s))), !f && p.hasSameRuleAs(i)) {
					i = i.pop(), a.produce(i, c), l = !0;
					return;
				}
			} else if (ct(e, t, n, i, a, o.captures, s), a.produce(i, s[0].end), i = i.pop(), !f) {
				i = i.safePop(), a.produce(i, c), l = !0;
				return;
			}
		}
		s[0].end > r && (r = s[0].end, n = !1);
	}
}
function tt(e, t, n, r, i, a) {
	let o = i.beginRuleCapturedEOL ? 0 : -1, s = [];
	for (let t = i; t; t = t.pop()) {
		let n = t.getRule(e);
		n instanceof We && s.push({
			rule: n,
			stack: t
		});
	}
	for (let c = s.pop(); c; c = s.pop()) {
		let { ruleScanner: s, findOptions: l } = ot(c.rule, e, c.stack.endRule, n, r === o), u = s.findNextMatchSync(t, r, l);
		if (u) {
			if (u.ruleId !== Ie) {
				i = c.stack.pop();
				break;
			}
			u.captureIndices && u.captureIndices.length && (a.produce(c.stack, u.captureIndices[0].start), ct(e, t, n, c.stack, a, c.rule.whileCaptures, u.captureIndices), a.produce(c.stack, u.captureIndices[0].end), o = u.captureIndices[0].end, u.captureIndices[0].end > r && (r = u.captureIndices[0].end, n = !1));
		} else {
			i = c.stack.pop();
			break;
		}
	}
	return {
		stack: i,
		linePos: r,
		anchorPosition: o,
		isFirstLine: n
	};
}
function nt(e, t, n, r, i, a) {
	let o = rt(e, t, n, r, i, a), s = e.getInjections();
	if (s.length === 0) return o;
	let c = it(s, e, t, n, r, i, a);
	if (!c) return o;
	if (!o) return c;
	let l = o.captureIndices[0].start, u = c.captureIndices[0].start;
	return u < l || c.priorityMatch && u === l ? c : o;
}
function rt(e, t, n, r, i, a) {
	let { ruleScanner: o, findOptions: s } = at(i.getRule(e), e, i.endRule, n, r === a), c = o.findNextMatchSync(t, r, s);
	return c ? {
		captureIndices: c.captureIndices,
		matchedRuleId: c.ruleId
	} : null;
}
function it(e, t, n, r, i, a, o) {
	let s = Number.MAX_VALUE, c = null, l, u = 0, d = a.contentNameScopesList.getScopeNames();
	for (let a = 0, f = e.length; a < f; a++) {
		let f = e[a];
		if (!f.matcher(d)) continue;
		let { ruleScanner: p, findOptions: m } = at(t.getRule(f.ruleId), t, null, r, i === o), h = p.findNextMatchSync(n, i, m);
		if (!h) continue;
		let g = h.captureIndices[0].start;
		if (!(g >= s) && (s = g, c = h.captureIndices, l = h.ruleId, u = f.priority, s === i)) break;
	}
	return c ? {
		priorityMatch: u === -1,
		captureIndices: c,
		matchedRuleId: l
	} : null;
}
function at(e, t, n, r, i) {
	return Qe ? {
		ruleScanner: e.compile(t, n),
		findOptions: st(r, i)
	} : {
		ruleScanner: e.compileAG(t, n, r, i),
		findOptions: 0
	};
}
function ot(e, t, n, r, i) {
	return Qe ? {
		ruleScanner: e.compileWhile(t, n),
		findOptions: st(r, i)
	} : {
		ruleScanner: e.compileWhileAG(t, n, r, i),
		findOptions: 0
	};
}
function st(e, t) {
	let n = 0;
	return e || (n |= 1), t || (n |= 4), n;
}
function ct(e, t, n, r, i, a, o) {
	if (a.length === 0) return;
	let s = t.content, c = Math.min(a.length, o.length), l = [], u = o[0].end;
	for (let t = 0; t < c; t++) {
		let c = a[t];
		if (c === null) continue;
		let d = o[t];
		if (d.length === 0) continue;
		if (d.start > u) break;
		for (; l.length > 0 && l[l.length - 1].endPos <= d.start;) i.produceFromScopes(l[l.length - 1].scopes, l[l.length - 1].endPos), l.pop();
		if (l.length > 0 ? i.produceFromScopes(l[l.length - 1].scopes, d.start) : i.produce(r, d.start), c.retokenizeCapturedWithRuleId) {
			let t = c.getName(s, o), a = r.contentNameScopesList.pushAttributed(t, e), l = c.getContentName(s, o), u = a.pushAttributed(l, e), f = r.push(c.retokenizeCapturedWithRuleId, d.start, -1, !1, null, a, u), p = e.createOnigString(s.substring(0, d.end));
			et(e, p, n && d.start === 0, d.start, f, i, !1, 0), ve(p);
			continue;
		}
		let f = c.getName(s, o);
		if (f !== null) {
			let t = (l.length > 0 ? l[l.length - 1].scopes : r.contentNameScopesList).pushAttributed(f, e);
			l.push(new lt(t, d.end));
		}
	}
	for (; l.length > 0;) i.produceFromScopes(l[l.length - 1].scopes, l[l.length - 1].endPos), l.pop();
}
var lt = class {
	scopes;
	endPos;
	constructor(e, t) {
		this.scopes = e, this.endPos = t;
	}
};
function ut(e, t, n, r, i, a, o, s) {
	return new mt(e, t, n, r, i, a, o, s);
}
function dt(e, t, n, r, i) {
	let a = he(t, ft), o = Ge.getCompiledRuleId(n, r, i.repository);
	for (let n of a) e.push({
		debugSelector: t,
		matcher: n.matcher,
		ruleId: o,
		grammar: i,
		priority: n.priority
	});
}
function ft(e, t) {
	if (t.length < e.length) return !1;
	let n = 0;
	return e.every((e) => {
		for (let r = n; r < t.length; r++) if (pt(t[r], e)) return n = r + 1, !0;
		return !1;
	});
}
function pt(e, t) {
	if (!e) return !1;
	if (e === t) return !0;
	let n = t.length;
	return e.length > n && e.substr(0, n) === t && e[n] === ".";
}
var mt = class {
	constructor(e, t, n, r, i, a, o, s) {
		if (this._rootScopeName = e, this.balancedBracketSelectors = a, this._onigLib = s, this._basicScopeAttributesProvider = new Xe(n, r), this._rootId = -1, this._lastRuleId = 0, this._ruleId2desc = [null], this._includedGrammars = {}, this._grammarRepository = o, this._grammar = ht(t, null), this._injections = null, this._tokenTypeMatchers = [], i) for (let e of Object.keys(i)) {
			let t = he(e, ft);
			for (let n of t) this._tokenTypeMatchers.push({
				matcher: n.matcher,
				type: i[e]
			});
		}
	}
	_rootId;
	_lastRuleId;
	_ruleId2desc;
	_includedGrammars;
	_grammarRepository;
	_grammar;
	_injections;
	_basicScopeAttributesProvider;
	_tokenTypeMatchers;
	get themeProvider() {
		return this._grammarRepository;
	}
	dispose() {
		for (let e of this._ruleId2desc) e && e.dispose();
	}
	createOnigScanner(e) {
		return this._onigLib.createOnigScanner(e);
	}
	createOnigString(e) {
		return this._onigLib.createOnigString(e);
	}
	getMetadataForScope(e) {
		return this._basicScopeAttributesProvider.getBasicScopeAttributes(e);
	}
	_collectInjections() {
		let e = {
			lookup: (e) => e === this._rootScopeName ? this._grammar : this.getExternalGrammar(e),
			injections: (e) => this._grammarRepository.injections(e)
		}, t = [], n = this._rootScopeName, r = e.lookup(n);
		if (r) {
			let e = r.injections;
			if (e) for (let n in e) dt(t, n, e[n], this, r);
			let i = this._grammarRepository.injections(n);
			i && i.forEach((e) => {
				let n = this.getExternalGrammar(e);
				if (n) {
					let e = n.injectionSelector;
					e && dt(t, e, n, this, n);
				}
			});
		}
		return t.sort((e, t) => e.priority - t.priority), t;
	}
	getInjections() {
		return this._injections === null && (this._injections = this._collectInjections()), this._injections;
	}
	registerRule(e) {
		let t = ++this._lastRuleId, n = e(Le(t));
		return this._ruleId2desc[t] = n, n;
	}
	getRule(e) {
		return this._ruleId2desc[Re(e)];
	}
	getExternalGrammar(e, t) {
		if (this._includedGrammars[e]) return this._includedGrammars[e];
		if (this._grammarRepository) {
			let n = this._grammarRepository.lookup(e);
			if (n) return this._includedGrammars[e] = ht(n, t && t.$base), this._includedGrammars[e];
		}
	}
	tokenizeLine(e, t, n = 0) {
		let r = this._tokenize(e, t, !1, n);
		return {
			tokens: r.lineTokens.getResult(r.ruleStack, r.lineLength),
			ruleStack: r.ruleStack,
			stoppedEarly: r.stoppedEarly
		};
	}
	tokenizeLine2(e, t, n = 0) {
		let r = this._tokenize(e, t, !0, n);
		return {
			tokens: r.lineTokens.getBinaryResult(r.ruleStack, r.lineLength),
			ruleStack: r.ruleStack,
			stoppedEarly: r.stoppedEarly
		};
	}
	_tokenize(e, t, n, r) {
		this._rootId === -1 && (this._rootId = Ge.getCompiledRuleId(this._grammar.repository.$self, this, this._grammar.repository), this.getInjections());
		let i;
		if (!t || t === _t.NULL) {
			i = !0;
			let e = this._basicScopeAttributesProvider.getDefaultAttributes(), n = this.themeProvider.getDefaults(), r = b.set(0, e.languageId, e.tokenType, null, n.fontStyle, n.foregroundId, n.backgroundId), a = this.getRule(this._rootId).getName(null, null), o;
			o = a ? gt.createRootAndLookUpScopeName(a, r, this) : gt.createRoot("unknown", r), t = new _t(null, this._rootId, -1, -1, !1, null, o, o);
		} else i = !1, t.reset();
		e += "\n";
		let a = this.createOnigString(e), o = a.content.length, s = new yt(n, e, this._tokenTypeMatchers, this.balancedBracketSelectors), c = et(this, a, i, 0, t, s, !0, r);
		return ve(a), {
			lineLength: o,
			lineTokens: s,
			ruleStack: c.stack,
			stoppedEarly: c.stoppedEarly
		};
	}
};
function ht(e, t) {
	return e = s(e), e.repository = e.repository || {}, e.repository.$self = {
		$vscodeTextmateLocation: e.$vscodeTextmateLocation,
		patterns: e.patterns,
		name: e.scopeName
	}, e.repository.$base = t || e.repository.$self, e;
}
var gt = class e {
	constructor(e, t, n) {
		this.parent = e, this.scopePath = t, this.tokenAttributes = n;
	}
	static fromExtension(t, n) {
		let r = t, i = t?.scopePath ?? null;
		for (let t of n) i = ne.push(i, t.scopeNames), r = new e(r, i, t.encodedTokenAttributes);
		return r;
	}
	static createRoot(t, n) {
		return new e(null, new ne(null, t), n);
	}
	static createRootAndLookUpScopeName(t, n, r) {
		let i = r.getMetadataForScope(t), a = new ne(null, t), o = r.themeProvider.themeMatch(a);
		return new e(null, a, e.mergeAttributes(n, i, o));
	}
	get scopeName() {
		return this.scopePath.scopeName;
	}
	toString() {
		return this.getScopeNames().join(" ");
	}
	equals(t) {
		return e.equals(this, t);
	}
	static equals(e, t) {
		do {
			if (e === t || !e && !t) return !0;
			if (!e || !t || e.scopeName !== t.scopeName || e.tokenAttributes !== t.tokenAttributes) return !1;
			e = e.parent, t = t.parent;
		} while (!0);
	}
	static mergeAttributes(e, t, n) {
		let r = -1, i = 0, a = 0;
		return n !== null && (r = n.fontStyle, i = n.foregroundId, a = n.backgroundId), b.set(e, t.languageId, t.tokenType, null, r, i, a);
	}
	pushAttributed(t, n) {
		if (t === null) return this;
		if (t.indexOf(" ") === -1) return e._pushAttributed(this, t, n);
		let r = t.split(/ /g), i = this;
		for (let t of r) i = e._pushAttributed(i, t, n);
		return i;
	}
	static _pushAttributed(t, n, r) {
		let i = r.getMetadataForScope(n), a = t.scopePath.push(n), o = r.themeProvider.themeMatch(a);
		return new e(t, a, e.mergeAttributes(t.tokenAttributes, i, o));
	}
	getScopeNames() {
		return this.scopePath.getSegments();
	}
	getExtensionIfDefined(e) {
		let t = [], n = this;
		for (; n && n !== e;) t.push({
			encodedTokenAttributes: n.tokenAttributes,
			scopeNames: n.scopePath.getExtensionIfDefined(n.parent?.scopePath ?? null)
		}), n = n.parent;
		return n === e ? t.reverse() : void 0;
	}
}, _t = class e {
	constructor(e, t, n, r, i, a, o, s) {
		this.parent = e, this.ruleId = t, this.beginRuleCapturedEOL = i, this.endRule = a, this.nameScopesList = o, this.contentNameScopesList = s, this.depth = this.parent ? this.parent.depth + 1 : 1, this._enterPos = n, this._anchorPos = r;
	}
	_stackElementBrand = void 0;
	static NULL = new e(null, 0, 0, 0, !1, null, null, null);
	_enterPos;
	_anchorPos;
	depth;
	equals(t) {
		return t === null ? !1 : e._equals(this, t);
	}
	static _equals(e, t) {
		return e === t ? !0 : this._structuralEquals(e, t) ? gt.equals(e.contentNameScopesList, t.contentNameScopesList) : !1;
	}
	static _structuralEquals(e, t) {
		do {
			if (e === t || !e && !t) return !0;
			if (!e || !t || e.depth !== t.depth || e.ruleId !== t.ruleId || e.endRule !== t.endRule) return !1;
			e = e.parent, t = t.parent;
		} while (!0);
	}
	clone() {
		return this;
	}
	static _reset(e) {
		for (; e;) e._enterPos = -1, e._anchorPos = -1, e = e.parent;
	}
	reset() {
		e._reset(this);
	}
	pop() {
		return this.parent;
	}
	safePop() {
		return this.parent ? this.parent : this;
	}
	push(t, n, r, i, a, o, s) {
		return new e(this, t, n, r, i, a, o, s);
	}
	getEnterPos() {
		return this._enterPos;
	}
	getAnchorPos() {
		return this._anchorPos;
	}
	getRule(e) {
		return e.getRule(this.ruleId);
	}
	toString() {
		let e = [];
		return this._writeString(e, 0), "[" + e.join(",") + "]";
	}
	_writeString(e, t) {
		return this.parent && (t = this.parent._writeString(e, t)), e[t++] = `(${this.ruleId}, ${this.nameScopesList?.toString()}, ${this.contentNameScopesList?.toString()})`, t;
	}
	withContentNameScopesList(e) {
		return this.contentNameScopesList === e ? this : this.parent.push(this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, this.endRule, this.nameScopesList, e);
	}
	withEndRule(t) {
		return this.endRule === t ? this : new e(this.parent, this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, t, this.nameScopesList, this.contentNameScopesList);
	}
	hasSameRuleAs(e) {
		let t = this;
		for (; t && t._enterPos === e._enterPos;) {
			if (t.ruleId === e.ruleId) return !0;
			t = t.parent;
		}
		return !1;
	}
	toStateStackFrame() {
		return {
			ruleId: Re(this.ruleId),
			beginRuleCapturedEOL: this.beginRuleCapturedEOL,
			endRule: this.endRule,
			nameScopesList: this.nameScopesList?.getExtensionIfDefined(this.parent?.nameScopesList ?? null) ?? [],
			contentNameScopesList: this.contentNameScopesList?.getExtensionIfDefined(this.nameScopesList) ?? []
		};
	}
	static pushFrame(t, n) {
		let r = gt.fromExtension(t?.nameScopesList ?? null, n.nameScopesList);
		return new e(t, Le(n.ruleId), n.enterPos ?? -1, n.anchorPos ?? -1, n.beginRuleCapturedEOL, n.endRule, r, gt.fromExtension(r, n.contentNameScopesList));
	}
}, vt = class {
	balancedBracketScopes;
	unbalancedBracketScopes;
	allowAny = !1;
	constructor(e, t) {
		this.balancedBracketScopes = e.flatMap((e) => e === "*" ? (this.allowAny = !0, []) : he(e, ft).map((e) => e.matcher)), this.unbalancedBracketScopes = t.flatMap((e) => he(e, ft).map((e) => e.matcher));
	}
	get matchesAlways() {
		return this.allowAny && this.unbalancedBracketScopes.length === 0;
	}
	get matchesNever() {
		return this.balancedBracketScopes.length === 0 && !this.allowAny;
	}
	match(e) {
		for (let t of this.unbalancedBracketScopes) if (t(e)) return !1;
		for (let t of this.balancedBracketScopes) if (t(e)) return !0;
		return this.allowAny;
	}
}, yt = class {
	constructor(e, t, n, r) {
		this.balancedBracketSelectors = r, this._emitBinaryTokens = e, this._tokenTypeOverrides = n, this._lineText = null, this._tokens = [], this._binaryTokens = [], this._lastTokenEndIndex = 0;
	}
	_emitBinaryTokens;
	_lineText;
	_tokens;
	_binaryTokens;
	_lastTokenEndIndex;
	_tokenTypeOverrides;
	produce(e, t) {
		this.produceFromScopes(e.contentNameScopesList, t);
	}
	produceFromScopes(e, t) {
		if (this._lastTokenEndIndex >= t) return;
		if (this._emitBinaryTokens) {
			let n = e?.tokenAttributes ?? 0, r = !1;
			if (this.balancedBracketSelectors?.matchesAlways && (r = !0), this._tokenTypeOverrides.length > 0 || this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever) {
				let t = e?.getScopeNames() ?? [];
				for (let e of this._tokenTypeOverrides) e.matcher(t) && (n = b.set(n, 0, pe(e.type), null, -1, 0, 0));
				this.balancedBracketSelectors && (r = this.balancedBracketSelectors.match(t));
			}
			if (r && (n = b.set(n, 0, 8, r, -1, 0, 0)), this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === n) {
				this._lastTokenEndIndex = t;
				return;
			}
			this._binaryTokens.push(this._lastTokenEndIndex), this._binaryTokens.push(n), this._lastTokenEndIndex = t;
			return;
		}
		let n = e?.getScopeNames() ?? [];
		this._tokens.push({
			startIndex: this._lastTokenEndIndex,
			endIndex: t,
			scopes: n
		}), this._lastTokenEndIndex = t;
	}
	getResult(e, t) {
		return this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === t - 1 && this._tokens.pop(), this._tokens.length === 0 && (this._lastTokenEndIndex = -1, this.produce(e, t), this._tokens[this._tokens.length - 1].startIndex = 0), this._tokens;
	}
	getBinaryResult(e, t) {
		this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === t - 1 && (this._binaryTokens.pop(), this._binaryTokens.pop()), this._binaryTokens.length === 0 && (this._lastTokenEndIndex = -1, this.produce(e, t), this._binaryTokens[this._binaryTokens.length - 2] = 0);
		let n = new Uint32Array(this._binaryTokens.length);
		for (let e = 0, t = this._binaryTokens.length; e < t; e++) n[e] = this._binaryTokens[e];
		return n;
	}
}, bt = class {
	constructor(e, t) {
		this._onigLib = t, this._theme = e;
	}
	_grammars = /* @__PURE__ */ new Map();
	_rawGrammars = /* @__PURE__ */ new Map();
	_injectionGrammars = /* @__PURE__ */ new Map();
	_theme;
	dispose() {
		for (let e of this._grammars.values()) e.dispose();
	}
	setTheme(e) {
		this._theme = e;
	}
	getColorMap() {
		return this._theme.getColorMap();
	}
	addGrammar(e, t) {
		this._rawGrammars.set(e.scopeName, e), t && this._injectionGrammars.set(e.scopeName, t);
	}
	lookup(e) {
		return this._rawGrammars.get(e);
	}
	injections(e) {
		return this._injectionGrammars.get(e);
	}
	getDefaults() {
		return this._theme.getDefaults();
	}
	themeMatch(e) {
		return this._theme.match(e);
	}
	grammarForScopeName(e, t, n, r, i) {
		if (!this._grammars.has(e)) {
			let a = this._rawGrammars.get(e);
			if (!a) return null;
			this._grammars.set(e, ut(e, a, t, n, r, i, this, this._onigLib));
		}
		return this._grammars.get(e);
	}
}, xt = class {
	_options;
	_syncRegistry;
	_ensureGrammarCache;
	constructor(e) {
		this._options = e, this._syncRegistry = new bt(te.createFromRawTheme(e.theme, e.colorMap), e.onigLib), this._ensureGrammarCache = /* @__PURE__ */ new Map();
	}
	dispose() {
		this._syncRegistry.dispose();
	}
	setTheme(e, t) {
		this._syncRegistry.setTheme(te.createFromRawTheme(e, t));
	}
	getColorMap() {
		return this._syncRegistry.getColorMap();
	}
	loadGrammarWithEmbeddedLanguages(e, t, n) {
		return this.loadGrammarWithConfiguration(e, t, { embeddedLanguages: n });
	}
	loadGrammarWithConfiguration(e, t, n) {
		return this._loadGrammar(e, t, n.embeddedLanguages, n.tokenTypes, new vt(n.balancedBracketSelectors || [], n.unbalancedBracketSelectors || []));
	}
	loadGrammar(e) {
		return this._loadGrammar(e, 0, null, null, null);
	}
	_loadGrammar(e, t, n, r, i) {
		let a = new Se(this._syncRegistry, e);
		for (; a.Q.length > 0;) a.Q.map((e) => this._loadSingleGrammar(e.scopeName)), a.processQueue();
		return this._grammarForScopeName(e, t, n, r, i);
	}
	_loadSingleGrammar(e) {
		this._ensureGrammarCache.has(e) || (this._doLoadSingleGrammar(e), this._ensureGrammarCache.set(e, !0));
	}
	_doLoadSingleGrammar(e) {
		let t = this._options.loadGrammar(e);
		if (t) {
			let n = typeof this._options.getInjections == "function" ? this._options.getInjections(e) : void 0;
			this._syncRegistry.addGrammar(t, n);
		}
	}
	addGrammar(e, t = [], n = 0, r = null) {
		return this._syncRegistry.addGrammar(e, t), this._grammarForScopeName(e.scopeName, n, r);
	}
	_grammarForScopeName(e, t = 0, n = null, r = null, i = null) {
		return this._syncRegistry.grammarForScopeName(e, t, n, r, i);
	}
}, St = _t.NULL;
//#endregion
//#region ../../node_modules/@shikijs/primitive/dist/index.mjs
function Ct(e, t) {
	let n = typeof e == "string" ? {} : { ...e.colorReplacements }, r = typeof e == "string" ? e : e.name;
	for (let [e, i] of Object.entries(t?.colorReplacements || {})) typeof i == "string" ? n[e] = i : e === r && Object.assign(n, i);
	return n;
}
function x(e, t) {
	return e && (t?.[e?.toLowerCase()] || e);
}
function wt(e) {
	return Array.isArray(e) ? e : [e];
}
async function Tt(e) {
	return Promise.resolve(typeof e == "function" ? e() : e).then((e) => e.default || e);
}
function Et(e) {
	return !e || [
		"plaintext",
		"txt",
		"text",
		"plain"
	].includes(e);
}
function Dt(e) {
	return e === "ansi" || Et(e);
}
function Ot(e) {
	return e === "none";
}
function kt(e) {
	return Ot(e);
}
var At = /(\r?\n)/g;
function jt(e, t = !1) {
	if (e.length === 0) return [["", 0]];
	let n = e.split(At), r = 0, i = [];
	for (let e = 0; e < n.length; e += 2) {
		let a = t ? n[e] + (n[e + 1] || "") : n[e];
		i.push([a, r]), r += n[e].length, r += n[e + 1]?.length || 0;
	}
	return i;
}
var Mt = {
	light: "#333333",
	dark: "#bbbbbb"
}, Nt = {
	light: "#fffffe",
	dark: "#1e1e1e"
}, Pt = "__shiki_resolved";
function Ft(e) {
	if (e?.[Pt]) return e;
	let t = { ...e };
	t.tokenColors && !t.settings && (t.settings = t.tokenColors, delete t.tokenColors), t.type ||= "dark", t.colorReplacements = { ...t.colorReplacements }, t.settings ||= [];
	let { bg: n, fg: r } = t;
	if (!n || !r) {
		let e = t.settings ? t.settings.find((e) => !e.name && !e.scope) : void 0;
		e?.settings?.foreground && (r = e.settings.foreground), e?.settings?.background && (n = e.settings.background), !r && t?.colors?.["editor.foreground"] && (r = t.colors["editor.foreground"]), !n && t?.colors?.["editor.background"] && (n = t.colors["editor.background"]), r ||= t.type === "light" ? Mt.light : Mt.dark, n ||= t.type === "light" ? Nt.light : Nt.dark, t.fg = r, t.bg = n;
	}
	t.settings[0] && t.settings[0].settings && !t.settings[0].scope || t.settings.unshift({ settings: {
		foreground: t.fg,
		background: t.bg
	} });
	let i = 0, a = /* @__PURE__ */ new Map();
	function o(e) {
		if (a.has(e)) return a.get(e);
		i += 1;
		let n = `#${i.toString(16).padStart(8, "0").toLowerCase()}`;
		return t.colorReplacements?.[`#${n}`] ? o(e) : (a.set(e, n), n);
	}
	t.settings = t.settings.map((e) => {
		let n = e.settings?.foreground && !e.settings.foreground.startsWith("#"), r = e.settings?.background && !e.settings.background.startsWith("#");
		if (!n && !r) return e;
		let i = {
			...e,
			settings: { ...e.settings }
		};
		if (n) {
			let n = o(e.settings.foreground);
			t.colorReplacements[n] = e.settings.foreground, i.settings.foreground = n;
		}
		if (r) {
			let n = o(e.settings.background);
			t.colorReplacements[n] = e.settings.background, i.settings.background = n;
		}
		return i;
	});
	for (let e of Object.keys(t.colors || {})) if ((e === "editor.foreground" || e === "editor.background" || e.startsWith("terminal.ansi")) && !t.colors[e]?.startsWith("#")) {
		let n = o(t.colors[e]);
		t.colorReplacements[n] = t.colors[e], t.colors[e] = n;
	}
	return Object.defineProperty(t, Pt, {
		enumerable: !1,
		writable: !1,
		value: !0
	}), t;
}
async function It(e) {
	return [...new Set((await Promise.all(e.filter((e) => !Dt(e)).map(async (e) => await Tt(e).then((e) => Array.isArray(e) ? e : [e])))).flat())];
}
async function Lt(e) {
	return (await Promise.all(e.map(async (e) => kt(e) ? null : Ft(await Tt(e))))).filter((e) => !!e);
}
function Rt(e, t) {
	if (!t) return e;
	if (t[e]) {
		let n = /* @__PURE__ */ new Set([e]);
		for (; t[e];) {
			if (e = t[e], n.has(e)) throw new o(`Circular alias \`${[...n].join(" -> ")} -> ${e}\``);
			n.add(e);
		}
	}
	return e;
}
var zt = class extends xt {
	_resolver;
	_themes;
	_langs;
	_alias;
	_resolvedThemes = /* @__PURE__ */ new Map();
	_resolvedGrammars = /* @__PURE__ */ new Map();
	_langMap = /* @__PURE__ */ new Map();
	_langGraph = /* @__PURE__ */ new Map();
	_textmateThemeCache = /* @__PURE__ */ new WeakMap();
	_loadedThemesCache = null;
	_loadedLanguagesCache = null;
	constructor(e, t, n, r = {}) {
		super(e), this._resolver = e, this._themes = t, this._langs = n, this._alias = r, this._themes.map((e) => this.loadTheme(e)), this.loadLanguages(this._langs);
	}
	getTheme(e) {
		return typeof e == "string" ? this._resolvedThemes.get(e) : this.loadTheme(e);
	}
	loadTheme(e) {
		let t = Ft(e);
		return t.name && (this._resolvedThemes.set(t.name, t), this._loadedThemesCache = null), t;
	}
	getLoadedThemes() {
		return this._loadedThemesCache ||= [...this._resolvedThemes.keys()], this._loadedThemesCache;
	}
	setTheme(e) {
		let t = this._textmateThemeCache.get(e);
		t || (t = te.createFromRawTheme(e), this._textmateThemeCache.set(e, t)), this._syncRegistry.setTheme(t);
	}
	getGrammar(e) {
		return e = Rt(e, this._alias), this._resolvedGrammars.get(e);
	}
	loadLanguage(e) {
		if (this.getGrammar(e.name)) return;
		let t = new Set([...this._langMap.values()].filter((t) => t.embeddedLangsLazy?.includes(e.name)));
		this._resolver.addLanguage(e);
		let n = {
			balancedBracketSelectors: e.balancedBracketSelectors || ["*"],
			unbalancedBracketSelectors: e.unbalancedBracketSelectors || []
		};
		this._syncRegistry._rawGrammars.set(e.scopeName, e);
		let r = this.loadGrammarWithConfiguration(e.scopeName, 1, n);
		if (r.name = e.name, this._resolvedGrammars.set(e.name, r), e.aliases && e.aliases.forEach((t) => {
			this._alias[t] = e.name;
		}), this._loadedLanguagesCache = null, t.size) for (let e of t) this._resolvedGrammars.delete(e.name), this._loadedLanguagesCache = null, this._syncRegistry?._injectionGrammars?.delete(e.scopeName), this._syncRegistry?._grammars?.delete(e.scopeName), this.loadLanguage(this._langMap.get(e.name));
	}
	dispose() {
		super.dispose(), this._resolvedThemes.clear(), this._resolvedGrammars.clear(), this._langMap.clear(), this._langGraph.clear(), this._loadedThemesCache = null;
	}
	loadLanguages(e) {
		for (let t of e) this.resolveEmbeddedLanguages(t);
		let t = [...this._langGraph.entries()], n = t.filter(([e, t]) => !t);
		if (n.length) {
			let e = t.filter(([e, t]) => t ? (t.embeddedLanguages || t.embeddedLangs)?.some((e) => n.map(([e]) => e).includes(e)) : !1).filter((e) => !n.includes(e));
			throw new o(`Missing languages ${n.map(([e]) => `\`${e}\``).join(", ")}, required by ${e.map(([e]) => `\`${e}\``).join(", ")}`);
		}
		for (let [e, n] of t) this._resolver.addLanguage(n);
		for (let [e, n] of t) this.loadLanguage(n);
	}
	getLoadedLanguages() {
		return this._loadedLanguagesCache ||= [.../* @__PURE__ */ new Set([...this._resolvedGrammars.keys(), ...Object.keys(this._alias)])], this._loadedLanguagesCache;
	}
	resolveEmbeddedLanguages(e) {
		this._langMap.set(e.name, e), this._langGraph.set(e.name, e);
		let t = e.embeddedLanguages ?? e.embeddedLangs;
		if (t) for (let e of t) this._langGraph.set(e, this._langMap.get(e));
	}
}, Bt = class {
	_langs = /* @__PURE__ */ new Map();
	_scopeToLang = /* @__PURE__ */ new Map();
	_injections = /* @__PURE__ */ new Map();
	_onigLib;
	constructor(e, t) {
		this._onigLib = {
			createOnigScanner: (t) => e.createScanner(t),
			createOnigString: (t) => e.createString(t)
		}, t.forEach((e) => this.addLanguage(e));
	}
	get onigLib() {
		return this._onigLib;
	}
	getLangRegistration(e) {
		return this._langs.get(e);
	}
	loadGrammar(e) {
		return this._scopeToLang.get(e);
	}
	addLanguage(e) {
		this._langs.set(e.name, e), e.aliases && e.aliases.forEach((t) => {
			this._langs.set(t, e);
		}), this._scopeToLang.set(e.scopeName, e), e.injectTo && e.injectTo.forEach((t) => {
			this._injections.get(t) || this._injections.set(t, []), this._injections.get(t).push(e.scopeName);
		});
	}
	getInjections(e) {
		let t = e.split("."), n = [];
		for (let e = 1; e <= t.length; e++) {
			let r = t.slice(0, e).join(".");
			n = [...n, ...this._injections.get(r) || []];
		}
		return n;
	}
}, Vt = 0;
function Ht(e) {
	Vt += 1, e.warnings !== !1 && Vt >= 10 && Vt % 10 == 0 && console.warn(`[Shiki] ${Vt} instances have been created. Shiki is supposed to be used as a singleton, consider refactoring your code to cache your highlighter instance; Or call \`highlighter.dispose()\` to release unused instances.`);
	let t = !1;
	if (!e.engine) throw new o("`engine` option is required for synchronous mode");
	let n = (e.langs || []).flat(1), r = (e.themes || []).flat(1).map(Ft), i = new zt(new Bt(e.engine, n), r, n, e.langAlias), a;
	function s(t) {
		return Rt(t, e.langAlias);
	}
	function c(e) {
		_();
		let t = i.getGrammar(typeof e == "string" ? e : e.name);
		if (!t) throw new o(`Language \`${e}\` not found, you may need to load it first`);
		return t;
	}
	function l(e) {
		if (e === "none") return {
			bg: "",
			fg: "",
			name: "none",
			settings: [],
			type: "dark"
		};
		_();
		let t = i.getTheme(e);
		if (!t) throw new o(`Theme \`${e}\` not found, you may need to load it first`);
		return t;
	}
	function u(e) {
		_();
		let t = l(e);
		return a !== e && (i.setTheme(t), a = e), {
			theme: t,
			colorMap: i.getColorMap()
		};
	}
	function d() {
		return _(), i.getLoadedThemes();
	}
	function f() {
		return _(), i.getLoadedLanguages();
	}
	function p(...e) {
		_(), i.loadLanguages(e.flat(1));
	}
	async function m(...e) {
		return p(await It(e));
	}
	function h(...e) {
		_();
		for (let t of e.flat(1)) i.loadTheme(t);
	}
	async function g(...e) {
		return _(), h(await Lt(e));
	}
	function _() {
		if (t) throw new o("Shiki instance has been disposed");
	}
	function v() {
		t || (t = !0, i.dispose(), --Vt);
	}
	return {
		setTheme: u,
		getTheme: l,
		getLanguage: c,
		getLoadedThemes: d,
		getLoadedLanguages: f,
		resolveLangAlias: s,
		loadLanguage: m,
		loadLanguageSync: p,
		loadTheme: g,
		loadThemeSync: h,
		dispose: v,
		[Symbol.dispose]: v
	};
}
async function Ut(e) {
	e.engine || console.warn("`engine` option is required. Use `createOnigurumaEngine` or `createJavaScriptRegexEngine` to create an engine.");
	let [t, n, r] = await Promise.all([
		Lt(e.themes || []),
		It(e.langs || []),
		e.engine
	]);
	return Ht({
		...e,
		themes: t,
		langs: n,
		engine: r
	});
}
var Wt = /* @__PURE__ */ new WeakMap();
function Gt(e, t) {
	Wt.set(e, t);
}
function Kt(e) {
	return Wt.get(e);
}
var qt = class e {
	_stacks = {};
	lang;
	get themes() {
		return Object.keys(this._stacks);
	}
	get theme() {
		return this.themes[0];
	}
	get _stack() {
		return this._stacks[this.theme];
	}
	static initial(t, n) {
		return new e(Object.fromEntries(wt(n).map((e) => [e, St])), t);
	}
	constructor(...e) {
		if (e.length === 2) {
			let [t, n] = e;
			this.lang = n, this._stacks = t;
		} else {
			let [t, n, r] = e;
			this.lang = n, this._stacks = { [r]: t };
		}
	}
	getInternalStack(e = this.theme) {
		return this._stacks[e];
	}
	getScopes(e = this.theme) {
		return Jt(this._stacks[e]);
	}
	toJSON() {
		return {
			lang: this.lang,
			theme: this.theme,
			themes: this.themes,
			scopes: this.getScopes()
		};
	}
};
function Jt(e) {
	let t = [], n = /* @__PURE__ */ new Set();
	function r(e) {
		if (n.has(e)) return;
		n.add(e);
		let i = e?.nameScopesList?.scopeName;
		i && t.push(i), e.parent && r(e.parent);
	}
	return r(e), t;
}
function Yt(e, t) {
	if (!(e instanceof qt)) throw new o("Invalid grammar state");
	return e.getInternalStack(t);
}
var Xt = /,/, Zt = / /;
function Qt(e, t, n = {}) {
	let { theme: r = e.getLoadedThemes()[0] } = n;
	if (Et(e.resolveLangAlias(n.lang || "text")) || Ot(r)) return jt(t).map((e) => [{
		content: e[0],
		offset: e[1]
	}]);
	let { theme: i, colorMap: a } = e.setTheme(r), s = e.getLanguage(n.lang || "text");
	if (n.grammarState) {
		if (n.grammarState.lang !== s.name) throw new o(`Grammar state language "${n.grammarState.lang}" does not match highlight language "${s.name}"`);
		if (!n.grammarState.themes.includes(i.name)) throw new o(`Grammar state themes "${n.grammarState.themes}" do not contain highlight theme "${i.name}"`);
	}
	return en(t, s, i, a, n);
}
function $t(...e) {
	if (e.length === 2) return Kt(e[1]);
	let [t, n, r = {}] = e, { lang: i = "text", theme: a = t.getLoadedThemes()[0] } = r;
	if (Et(i) || Ot(a)) throw new o("Plain language does not have grammar state");
	if (i === "ansi") throw new o("ANSI language does not have grammar state");
	let { theme: s, colorMap: c } = t.setTheme(a), l = t.getLanguage(i);
	return new qt(tn(n, l, s, c, r).stateStack, l.name, s.name);
}
function en(e, t, n, r, i) {
	let a = tn(e, t, n, r, i), o = new qt(a.stateStack, t.name, n.name);
	return Gt(a.tokens, o), a.tokens;
}
function tn(e, t, n, r, i) {
	let a = Ct(n, i), { tokenizeMaxLineLength: o = 0, tokenizeTimeLimit: s = 500, includeExplanation: c = !1 } = i, l = jt(e), u = i.grammarState ? Yt(i.grammarState, n.name) ?? St : i.grammarContextCode == null ? St : tn(i.grammarContextCode, t, n, r, {
		...i,
		grammarState: void 0,
		grammarContextCode: void 0
	}).stateStack, d = [], f = [];
	for (let e = 0, i = l.length; e < i; e++) {
		let [i, p] = l[e];
		if (i === "") {
			d = [], f.push([]);
			continue;
		}
		if (o > 0 && i.length >= o) {
			d = [], f.push([{
				content: i,
				offset: p,
				color: "",
				fontStyle: 0
			}]);
			continue;
		}
		let m, h, g;
		c && c !== "tokenType" && (m = t.tokenizeLine(i, u, s), h = m.tokens, g = 0);
		let _ = t.tokenizeLine2(i, u, s), v = _.tokens.length / 2;
		for (let e = 0; e < v; e++) {
			let t = _.tokens[2 * e], o = e + 1 < v ? _.tokens[2 * e + 2] : i.length;
			if (t === o) continue;
			let s = _.tokens[2 * e + 1], l = x(r[b.getForeground(s)], a), u = b.getFontStyle(s), f = {
				content: i.substring(t, o),
				offset: p + t,
				color: l,
				fontStyle: u
			};
			if (c === "tokenType") f.type = b.getTokenType(s);
			else if (c) {
				let e = [];
				if (c !== "scopeName") for (let t of n.settings) {
					let n;
					switch (typeof t.scope) {
						case "string":
							n = t.scope.split(Xt).map((e) => e.trim());
							break;
						case "object":
							n = t.scope;
							break;
						default: continue;
					}
					e.push({
						settings: t,
						selectors: n.map((e) => e.split(Zt))
					});
				}
				f.explanation = [];
				let r = 0;
				for (; t + r < o;) {
					let t = h[g], n = i.substring(t.startIndex, t.endIndex);
					r += n.length, f.explanation.push({
						content: n,
						scopes: c === "scopeName" ? nn(t.scopes) : rn(e, t.scopes)
					}), g += 1;
				}
			}
			d.push(f);
		}
		f.push(d), d = [], u = _.ruleStack;
	}
	return {
		tokens: f,
		stateStack: u
	};
}
function nn(e) {
	return e.map((e) => ({ scopeName: e }));
}
function rn(e, t) {
	let n = [];
	for (let r = 0, i = t.length; r < i; r++) {
		let i = t[r];
		n[r] = {
			scopeName: i,
			themeMatches: sn(e, i, t.slice(0, r))
		};
	}
	return n;
}
function an(e, t) {
	return e === t || t.substring(0, e.length) === e && t[e.length] === ".";
}
function on(e, t, n) {
	if (!an(e.at(-1), t)) return !1;
	let r = e.length - 2, i = n.length - 1;
	for (; r >= 0 && i >= 0;) an(e[r], n[i]) && --r, --i;
	return r === -1;
}
function sn(e, t, n) {
	let r = [];
	for (let { selectors: i, settings: a } of e) for (let e of i) if (on(e, t, n)) {
		r.push(a);
		break;
	}
	return r;
}
function cn(e, t, n, r = Qt) {
	let i = Object.entries(n.themes).filter((e) => e[1]).map((e) => ({
		color: e[0],
		theme: e[1]
	})), a = i.map((i) => {
		let a = r(e, t, {
			...n,
			theme: i.theme
		});
		return {
			tokens: a,
			state: Kt(a),
			theme: typeof i.theme == "string" ? i.theme : i.theme.name
		};
	}), o = ln(...a.map((e) => e.tokens)), s = o[0].map((e, t) => e.map((e, r) => {
		let a = {
			content: e.content,
			variants: {},
			offset: e.offset
		};
		return "includeExplanation" in n && n.includeExplanation && (a.explanation = e.explanation), o.forEach((e, n) => {
			let { content: o, explanation: s, offset: c, ...l } = e[t][r];
			a.variants[i[n].color] = l;
		}), a;
	})), c = a[0].state ? new qt(Object.fromEntries(a.map((e) => [e.theme, e.state?.getInternalStack(e.theme)])), a[0].state.lang) : void 0;
	return c && Gt(s, c), s;
}
function ln(...e) {
	let t = e.map(() => []), n = e.length;
	for (let r = 0; r < e[0].length; r++) {
		let i = e.map((e) => e[r]), a = t.map(() => []);
		t.forEach((e, t) => e.push(a[t]));
		let o = i.map(() => 0), s = i.map((e) => e[0]);
		for (; s.every((e) => e);) {
			let e = Math.min(...s.map((e) => e.content.length));
			for (let t = 0; t < n; t++) {
				let n = s[t];
				n.content.length === e ? (a[t].push(n), o[t] += 1, s[t] = i[t][o[t]]) : (a[t].push({
					...n,
					content: n.content.slice(0, e)
				}), s[t] = {
					...n,
					content: n.content.slice(e),
					offset: n.offset + e
				});
			}
		}
	}
	return t;
}
//#endregion
//#region ../../node_modules/html-void-elements/index.js
var un = [
	"area",
	"base",
	"basefont",
	"bgsound",
	"br",
	"col",
	"command",
	"embed",
	"frame",
	"hr",
	"image",
	"img",
	"input",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
], dn = class {
	constructor(e, t, n) {
		this.normal = t, this.property = e, n && (this.space = n);
	}
};
dn.prototype.normal = {}, dn.prototype.property = {}, dn.prototype.space = void 0;
//#endregion
//#region ../../node_modules/property-information/lib/util/merge.js
function fn(e, t) {
	let n = {}, r = {};
	for (let t of e) Object.assign(n, t.property), Object.assign(r, t.normal);
	return new dn(n, r, t);
}
//#endregion
//#region ../../node_modules/property-information/lib/normalize.js
function pn(e) {
	return e.toLowerCase();
}
//#endregion
//#region ../../node_modules/property-information/lib/util/info.js
var S = class {
	constructor(e, t) {
		this.attribute = t, this.property = e;
	}
};
S.prototype.attribute = "", S.prototype.booleanish = !1, S.prototype.boolean = !1, S.prototype.commaOrSpaceSeparated = !1, S.prototype.commaSeparated = !1, S.prototype.defined = !1, S.prototype.mustUseProperty = !1, S.prototype.number = !1, S.prototype.overloadedBoolean = !1, S.prototype.property = "", S.prototype.spaceSeparated = !1, S.prototype.space = void 0;
//#endregion
//#region ../../node_modules/property-information/lib/util/types.js
var mn = /* @__PURE__ */ t({
	boolean: () => C,
	booleanish: () => w,
	commaOrSpaceSeparated: () => O,
	commaSeparated: () => D,
	number: () => T,
	overloadedBoolean: () => gn,
	spaceSeparated: () => E
}), hn = 0, C = k(), w = k(), gn = k(), T = k(), E = k(), D = k(), O = k();
function k() {
	return 2 ** ++hn;
}
//#endregion
//#region ../../node_modules/property-information/lib/util/defined-info.js
var _n = Object.keys(mn), vn = class extends S {
	constructor(e, t, n, r) {
		let i = -1;
		if (super(e, t), yn(this, "space", r), typeof n == "number") for (; ++i < _n.length;) {
			let e = _n[i];
			yn(this, _n[i], (n & mn[e]) === mn[e]);
		}
	}
};
vn.prototype.defined = !0;
function yn(e, t, n) {
	n && (e[t] = n);
}
//#endregion
//#region ../../node_modules/property-information/lib/util/create.js
function A(e) {
	let t = {}, n = {};
	for (let [r, i] of Object.entries(e.properties)) {
		let a = new vn(r, e.transform(e.attributes || {}, r), i, e.space);
		e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[pn(r)] = r, n[pn(a.attribute)] = r;
	}
	return new dn(t, n, e.space);
}
//#endregion
//#region ../../node_modules/property-information/lib/aria.js
var bn = A({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: w,
		ariaAutoComplete: null,
		ariaBusy: w,
		ariaChecked: w,
		ariaColCount: T,
		ariaColIndex: T,
		ariaColSpan: T,
		ariaControls: E,
		ariaCurrent: null,
		ariaDescribedBy: E,
		ariaDetails: null,
		ariaDisabled: w,
		ariaDropEffect: E,
		ariaErrorMessage: null,
		ariaExpanded: w,
		ariaFlowTo: E,
		ariaGrabbed: w,
		ariaHasPopup: null,
		ariaHidden: w,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: E,
		ariaLevel: T,
		ariaLive: null,
		ariaModal: w,
		ariaMultiLine: w,
		ariaMultiSelectable: w,
		ariaOrientation: null,
		ariaOwns: E,
		ariaPlaceholder: null,
		ariaPosInSet: T,
		ariaPressed: w,
		ariaReadOnly: w,
		ariaRelevant: null,
		ariaRequired: w,
		ariaRoleDescription: E,
		ariaRowCount: T,
		ariaRowIndex: T,
		ariaRowSpan: T,
		ariaSelected: w,
		ariaSetSize: T,
		ariaSort: null,
		ariaValueMax: T,
		ariaValueMin: T,
		ariaValueNow: T,
		ariaValueText: null,
		role: null
	},
	transform(e, t) {
		return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
	}
});
//#endregion
//#region ../../node_modules/property-information/lib/util/case-sensitive-transform.js
function xn(e, t) {
	return t in e ? e[t] : t;
}
//#endregion
//#region ../../node_modules/property-information/lib/util/case-insensitive-transform.js
function Sn(e, t) {
	return xn(e, t.toLowerCase());
}
//#endregion
//#region ../../node_modules/property-information/lib/html.js
var Cn = A({
	attributes: {
		acceptcharset: "accept-charset",
		classname: "class",
		htmlfor: "for",
		httpequiv: "http-equiv"
	},
	mustUseProperty: [
		"checked",
		"multiple",
		"muted",
		"selected"
	],
	properties: {
		abbr: null,
		accept: D,
		acceptCharset: E,
		accessKey: E,
		action: null,
		allow: null,
		allowFullScreen: C,
		allowPaymentRequest: C,
		allowUserMedia: C,
		alpha: C,
		alt: null,
		as: null,
		async: C,
		autoCapitalize: null,
		autoComplete: E,
		autoFocus: C,
		autoPlay: C,
		blocking: E,
		capture: null,
		charSet: null,
		checked: C,
		cite: null,
		className: E,
		closedBy: null,
		colorSpace: null,
		cols: T,
		colSpan: T,
		command: null,
		commandFor: null,
		content: null,
		contentEditable: w,
		controls: C,
		controlsList: E,
		coords: T | D,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: C,
		defer: C,
		dir: null,
		dirName: null,
		disabled: C,
		download: gn,
		draggable: w,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: C,
		formTarget: null,
		headers: E,
		height: T,
		hidden: gn,
		high: T,
		href: null,
		hrefLang: null,
		htmlFor: E,
		httpEquiv: E,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: C,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: C,
		itemId: null,
		itemProp: E,
		itemRef: E,
		itemScope: C,
		itemType: E,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: C,
		low: T,
		manifest: null,
		max: null,
		maxLength: T,
		media: null,
		method: null,
		min: null,
		minLength: T,
		multiple: C,
		muted: C,
		name: null,
		nonce: null,
		noModule: C,
		noValidate: C,
		onAbort: null,
		onAfterPrint: null,
		onAuxClick: null,
		onBeforeMatch: null,
		onBeforePrint: null,
		onBeforeToggle: null,
		onBeforeUnload: null,
		onBlur: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onContextLost: null,
		onContextMenu: null,
		onContextRestored: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFormData: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLanguageChange: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadEnd: null,
		onLoadStart: null,
		onMessage: null,
		onMessageError: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRejectionHandled: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onScrollEnd: null,
		onSecurityPolicyViolation: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onSlotChange: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnhandledRejection: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onWheel: null,
		open: C,
		optimum: T,
		pattern: null,
		ping: E,
		placeholder: null,
		playsInline: C,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: C,
		referrerPolicy: null,
		rel: E,
		required: C,
		reversed: C,
		rows: T,
		rowSpan: T,
		sandbox: E,
		scope: null,
		scoped: C,
		seamless: C,
		selected: C,
		shadowRootClonable: C,
		shadowRootCustomElementRegistry: C,
		shadowRootDelegatesFocus: C,
		shadowRootMode: null,
		shadowRootSerializable: C,
		shape: null,
		size: T,
		sizes: null,
		slot: null,
		span: T,
		spellCheck: w,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: T,
		step: null,
		style: null,
		tabIndex: T,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: C,
		useMap: null,
		value: w,
		width: T,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: E,
		axis: null,
		background: null,
		bgColor: null,
		border: T,
		borderColor: null,
		bottomMargin: T,
		cellPadding: null,
		cellSpacing: null,
		char: null,
		charOff: null,
		classId: null,
		clear: null,
		code: null,
		codeBase: null,
		codeType: null,
		color: null,
		compact: C,
		declare: C,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: T,
		leftMargin: T,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: T,
		marginWidth: T,
		noResize: C,
		noHref: C,
		noShade: C,
		noWrap: C,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: T,
		rules: null,
		scheme: null,
		scrolling: w,
		standby: null,
		summary: null,
		text: null,
		topMargin: T,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: T,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		credentialless: C,
		disablePictureInPicture: C,
		disableRemotePlayback: C,
		exportParts: D,
		part: E,
		prefix: null,
		property: null,
		results: T,
		security: null,
		unselectable: null
	},
	space: "html",
	transform: Sn
}), wn = A({
	attributes: {
		accentHeight: "accent-height",
		alignmentBaseline: "alignment-baseline",
		arabicForm: "arabic-form",
		baselineShift: "baseline-shift",
		capHeight: "cap-height",
		className: "class",
		clipPath: "clip-path",
		clipRule: "clip-rule",
		colorInterpolation: "color-interpolation",
		colorInterpolationFilters: "color-interpolation-filters",
		colorProfile: "color-profile",
		colorRendering: "color-rendering",
		crossOrigin: "crossorigin",
		dataType: "datatype",
		dominantBaseline: "dominant-baseline",
		enableBackground: "enable-background",
		fillOpacity: "fill-opacity",
		fillRule: "fill-rule",
		floodColor: "flood-color",
		floodOpacity: "flood-opacity",
		fontFamily: "font-family",
		fontSize: "font-size",
		fontSizeAdjust: "font-size-adjust",
		fontStretch: "font-stretch",
		fontStyle: "font-style",
		fontVariant: "font-variant",
		fontWeight: "font-weight",
		glyphName: "glyph-name",
		glyphOrientationHorizontal: "glyph-orientation-horizontal",
		glyphOrientationVertical: "glyph-orientation-vertical",
		hrefLang: "hreflang",
		horizAdvX: "horiz-adv-x",
		horizOriginX: "horiz-origin-x",
		horizOriginY: "horiz-origin-y",
		imageRendering: "image-rendering",
		letterSpacing: "letter-spacing",
		lightingColor: "lighting-color",
		markerEnd: "marker-end",
		markerMid: "marker-mid",
		markerStart: "marker-start",
		maskType: "mask-type",
		navDown: "nav-down",
		navDownLeft: "nav-down-left",
		navDownRight: "nav-down-right",
		navLeft: "nav-left",
		navNext: "nav-next",
		navPrev: "nav-prev",
		navRight: "nav-right",
		navUp: "nav-up",
		navUpLeft: "nav-up-left",
		navUpRight: "nav-up-right",
		onAbort: "onabort",
		onActivate: "onactivate",
		onAfterPrint: "onafterprint",
		onBeforePrint: "onbeforeprint",
		onBegin: "onbegin",
		onCancel: "oncancel",
		onCanPlay: "oncanplay",
		onCanPlayThrough: "oncanplaythrough",
		onChange: "onchange",
		onClick: "onclick",
		onClose: "onclose",
		onCopy: "oncopy",
		onCueChange: "oncuechange",
		onCut: "oncut",
		onDblClick: "ondblclick",
		onDrag: "ondrag",
		onDragEnd: "ondragend",
		onDragEnter: "ondragenter",
		onDragExit: "ondragexit",
		onDragLeave: "ondragleave",
		onDragOver: "ondragover",
		onDragStart: "ondragstart",
		onDrop: "ondrop",
		onDurationChange: "ondurationchange",
		onEmptied: "onemptied",
		onEnd: "onend",
		onEnded: "onended",
		onError: "onerror",
		onFocus: "onfocus",
		onFocusIn: "onfocusin",
		onFocusOut: "onfocusout",
		onHashChange: "onhashchange",
		onInput: "oninput",
		onInvalid: "oninvalid",
		onKeyDown: "onkeydown",
		onKeyPress: "onkeypress",
		onKeyUp: "onkeyup",
		onLoad: "onload",
		onLoadedData: "onloadeddata",
		onLoadedMetadata: "onloadedmetadata",
		onLoadStart: "onloadstart",
		onMessage: "onmessage",
		onMouseDown: "onmousedown",
		onMouseEnter: "onmouseenter",
		onMouseLeave: "onmouseleave",
		onMouseMove: "onmousemove",
		onMouseOut: "onmouseout",
		onMouseOver: "onmouseover",
		onMouseUp: "onmouseup",
		onMouseWheel: "onmousewheel",
		onOffline: "onoffline",
		onOnline: "ononline",
		onPageHide: "onpagehide",
		onPageShow: "onpageshow",
		onPaste: "onpaste",
		onPause: "onpause",
		onPlay: "onplay",
		onPlaying: "onplaying",
		onPopState: "onpopstate",
		onProgress: "onprogress",
		onRateChange: "onratechange",
		onRepeat: "onrepeat",
		onReset: "onreset",
		onResize: "onresize",
		onScroll: "onscroll",
		onSeeked: "onseeked",
		onSeeking: "onseeking",
		onSelect: "onselect",
		onShow: "onshow",
		onStalled: "onstalled",
		onStorage: "onstorage",
		onSubmit: "onsubmit",
		onSuspend: "onsuspend",
		onTimeUpdate: "ontimeupdate",
		onToggle: "ontoggle",
		onUnload: "onunload",
		onVolumeChange: "onvolumechange",
		onWaiting: "onwaiting",
		onZoom: "onzoom",
		overlinePosition: "overline-position",
		overlineThickness: "overline-thickness",
		paintOrder: "paint-order",
		panose1: "panose-1",
		pointerEvents: "pointer-events",
		referrerPolicy: "referrerpolicy",
		renderingIntent: "rendering-intent",
		shapeRendering: "shape-rendering",
		stopColor: "stop-color",
		stopOpacity: "stop-opacity",
		strikethroughPosition: "strikethrough-position",
		strikethroughThickness: "strikethrough-thickness",
		strokeDashArray: "stroke-dasharray",
		strokeDashOffset: "stroke-dashoffset",
		strokeLineCap: "stroke-linecap",
		strokeLineJoin: "stroke-linejoin",
		strokeMiterLimit: "stroke-miterlimit",
		strokeOpacity: "stroke-opacity",
		strokeWidth: "stroke-width",
		tabIndex: "tabindex",
		textAnchor: "text-anchor",
		textDecoration: "text-decoration",
		textRendering: "text-rendering",
		transformOrigin: "transform-origin",
		typeOf: "typeof",
		underlinePosition: "underline-position",
		underlineThickness: "underline-thickness",
		unicodeBidi: "unicode-bidi",
		unicodeRange: "unicode-range",
		unitsPerEm: "units-per-em",
		vAlphabetic: "v-alphabetic",
		vHanging: "v-hanging",
		vIdeographic: "v-ideographic",
		vMathematical: "v-mathematical",
		vectorEffect: "vector-effect",
		vertAdvY: "vert-adv-y",
		vertOriginX: "vert-origin-x",
		vertOriginY: "vert-origin-y",
		wordSpacing: "word-spacing",
		writingMode: "writing-mode",
		xHeight: "x-height",
		playbackOrder: "playbackorder",
		timelineBegin: "timelinebegin"
	},
	properties: {
		about: O,
		accentHeight: T,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: T,
		amplitude: T,
		arabicForm: null,
		ascent: T,
		attributeName: null,
		attributeType: null,
		azimuth: T,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: T,
		by: null,
		calcMode: null,
		capHeight: T,
		className: E,
		clip: null,
		clipPath: null,
		clipPathUnits: null,
		clipRule: null,
		color: null,
		colorInterpolation: null,
		colorInterpolationFilters: null,
		colorProfile: null,
		colorRendering: null,
		content: null,
		contentScriptType: null,
		contentStyleType: null,
		crossOrigin: null,
		cursor: null,
		cx: null,
		cy: null,
		d: null,
		dataType: null,
		defaultAction: null,
		descent: T,
		diffuseConstant: T,
		direction: null,
		display: null,
		dur: null,
		divisor: T,
		dominantBaseline: null,
		download: C,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: T,
		enableBackground: null,
		end: null,
		event: null,
		exponent: T,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: T,
		fillRule: null,
		filter: null,
		filterRes: null,
		filterUnits: null,
		floodColor: null,
		floodOpacity: null,
		focusable: null,
		focusHighlight: null,
		fontFamily: null,
		fontSize: null,
		fontSizeAdjust: null,
		fontStretch: null,
		fontStyle: null,
		fontVariant: null,
		fontWeight: null,
		format: null,
		fr: null,
		from: null,
		fx: null,
		fy: null,
		g1: D,
		g2: D,
		glyphName: D,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: T,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: T,
		horizOriginX: T,
		horizOriginY: T,
		id: null,
		ideographic: T,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: T,
		k: T,
		k1: T,
		k2: T,
		k3: T,
		k4: T,
		kernelMatrix: O,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: T,
		local: null,
		markerEnd: null,
		markerMid: null,
		markerStart: null,
		markerHeight: null,
		markerUnits: null,
		markerWidth: null,
		mask: null,
		maskContentUnits: null,
		maskType: null,
		maskUnits: null,
		mathematical: null,
		max: null,
		media: null,
		mediaCharacterEncoding: null,
		mediaContentEncodings: null,
		mediaSize: T,
		mediaTime: null,
		method: null,
		min: null,
		mode: null,
		name: null,
		navDown: null,
		navDownLeft: null,
		navDownRight: null,
		navLeft: null,
		navNext: null,
		navPrev: null,
		navRight: null,
		navUp: null,
		navUpLeft: null,
		navUpRight: null,
		numOctaves: null,
		observer: null,
		offset: null,
		onAbort: null,
		onActivate: null,
		onAfterPrint: null,
		onBeforePrint: null,
		onBegin: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnd: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFocusIn: null,
		onFocusOut: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadStart: null,
		onMessage: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onMouseWheel: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRepeat: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onShow: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onZoom: null,
		opacity: null,
		operator: null,
		order: null,
		orient: null,
		orientation: null,
		origin: null,
		overflow: null,
		overlay: null,
		overlinePosition: T,
		overlineThickness: T,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: T,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: E,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: T,
		pointsAtY: T,
		pointsAtZ: T,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: O,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: O,
		rev: O,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: O,
		requiredFeatures: O,
		requiredFonts: O,
		requiredFormats: O,
		resource: null,
		restart: null,
		result: null,
		rotate: null,
		rx: null,
		ry: null,
		scale: null,
		seed: null,
		shapeRendering: null,
		side: null,
		slope: null,
		snapshotTime: null,
		specularConstant: T,
		specularExponent: T,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: T,
		strikethroughThickness: T,
		string: null,
		stroke: null,
		strokeDashArray: O,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: T,
		strokeOpacity: T,
		strokeWidth: null,
		style: null,
		surfaceScale: T,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: O,
		tabIndex: T,
		tableValues: null,
		target: null,
		targetX: T,
		targetY: T,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: O,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: T,
		underlineThickness: T,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: T,
		values: null,
		vAlphabetic: T,
		vMathematical: T,
		vectorEffect: null,
		vHanging: T,
		vIdeographic: T,
		version: null,
		vertAdvY: T,
		vertOriginX: T,
		vertOriginY: T,
		viewBox: null,
		viewTarget: null,
		visibility: null,
		width: null,
		widths: null,
		wordSpacing: null,
		writingMode: null,
		x: null,
		x1: null,
		x2: null,
		xChannelSelector: null,
		xHeight: T,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null
	},
	space: "svg",
	transform: xn
}), Tn = A({
	properties: {
		xLinkActuate: null,
		xLinkArcRole: null,
		xLinkHref: null,
		xLinkRole: null,
		xLinkShow: null,
		xLinkTitle: null,
		xLinkType: null
	},
	space: "xlink",
	transform(e, t) {
		return "xlink:" + t.slice(5).toLowerCase();
	}
}), En = A({
	attributes: { xmlnsxlink: "xmlns:xlink" },
	properties: {
		xmlnsXLink: null,
		xmlns: null
	},
	space: "xmlns",
	transform: Sn
}), Dn = A({
	properties: {
		xmlBase: null,
		xmlLang: null,
		xmlSpace: null
	},
	space: "xml",
	transform(e, t) {
		return "xml:" + t.slice(3).toLowerCase();
	}
}), On = /[A-Z]/g, kn = /-[a-z]/g, An = /^data[-\w.:]+$/i;
function jn(e, t) {
	let n = pn(t), r = t, i = S;
	if (n in e.normal) return e.property[e.normal[n]];
	if (n.length > 4 && n.slice(0, 4) === "data" && An.test(t)) {
		if (t.charAt(4) === "-") {
			let e = t.slice(5).replace(kn, Nn);
			r = "data" + e.charAt(0).toUpperCase() + e.slice(1);
		} else {
			let e = t.slice(4);
			if (!kn.test(e)) {
				let n = e.replace(On, Mn);
				n.charAt(0) !== "-" && (n = "-" + n), t = "data" + n;
			}
		}
		i = vn;
	}
	return new i(r, t);
}
function Mn(e) {
	return "-" + e.toLowerCase();
}
function Nn(e) {
	return e.charAt(1).toUpperCase();
}
//#endregion
//#region ../../node_modules/property-information/index.js
var Pn = fn([
	bn,
	Cn,
	Tn,
	En,
	Dn
], "html"), Fn = fn([
	bn,
	wn,
	Tn,
	En,
	Dn
], "svg"), In = {}.hasOwnProperty;
function Ln(e, t) {
	let n = t || {};
	function r(t, ...n) {
		let i = r.invalid, a = r.handlers;
		if (t && In.call(t, e)) {
			let n = String(t[e]);
			i = In.call(a, n) ? a[n] : r.unknown;
		}
		if (i) return i.call(this, t, ...n);
	}
	return r.handlers = n.handlers || {}, r.invalid = n.invalid, r.unknown = n.unknown, r;
}
//#endregion
//#region ../../node_modules/stringify-entities/lib/core.js
var Rn = /["&'<>`]/g, zn = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, Bn = /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g, Vn = /[|\\{}()[\]^$+*?.]/g, Hn = /* @__PURE__ */ new WeakMap();
function Un(e, t) {
	if (e = e.replace(t.subset ? Wn(t.subset) : Rn, r), t.subset || t.escapeOnly) return e;
	return e.replace(zn, n).replace(Bn, r);
	function n(e, n, r) {
		return t.format((e.charCodeAt(0) - 55296) * 1024 + e.charCodeAt(1) - 56320 + 65536, r.charCodeAt(n + 2), t);
	}
	function r(e, n, r) {
		return t.format(e.charCodeAt(0), r.charCodeAt(n + 1), t);
	}
}
function Wn(e) {
	let t = Hn.get(e);
	return t || (t = Gn(e), Hn.set(e, t)), t;
}
function Gn(e) {
	let t = [], n = -1;
	for (; ++n < e.length;) t.push(e[n].replace(Vn, "\\$&"));
	return RegExp("(?:" + t.join("|") + ")", "g");
}
//#endregion
//#region ../../node_modules/stringify-entities/lib/util/to-hexadecimal.js
var Kn = /[\dA-Fa-f]/;
function qn(e, t, n) {
	let r = "&#x" + e.toString(16).toUpperCase();
	return n && t && !Kn.test(String.fromCharCode(t)) ? r : r + ";";
}
//#endregion
//#region ../../node_modules/stringify-entities/lib/util/to-decimal.js
var Jn = /\d/;
function Yn(e, t, n) {
	let r = "&#" + String(e);
	return n && t && !Jn.test(String.fromCharCode(t)) ? r : r + ";";
}
//#endregion
//#region ../../node_modules/character-entities-legacy/index.js
var Xn = /* @__PURE__ */ "AElig.AMP.Aacute.Acirc.Agrave.Aring.Atilde.Auml.COPY.Ccedil.ETH.Eacute.Ecirc.Egrave.Euml.GT.Iacute.Icirc.Igrave.Iuml.LT.Ntilde.Oacute.Ocirc.Ograve.Oslash.Otilde.Ouml.QUOT.REG.THORN.Uacute.Ucirc.Ugrave.Uuml.Yacute.aacute.acirc.acute.aelig.agrave.amp.aring.atilde.auml.brvbar.ccedil.cedil.cent.copy.curren.deg.divide.eacute.ecirc.egrave.eth.euml.frac12.frac14.frac34.gt.iacute.icirc.iexcl.igrave.iquest.iuml.laquo.lt.macr.micro.middot.nbsp.not.ntilde.oacute.ocirc.ograve.ordf.ordm.oslash.otilde.ouml.para.plusmn.pound.quot.raquo.reg.sect.shy.sup1.sup2.sup3.szlig.thorn.times.uacute.ucirc.ugrave.uml.uuml.yacute.yen.yuml".split("."), Zn = {
	nbsp: "\xA0",
	iexcl: "¡",
	cent: "¢",
	pound: "£",
	curren: "¤",
	yen: "¥",
	brvbar: "¦",
	sect: "§",
	uml: "¨",
	copy: "©",
	ordf: "ª",
	laquo: "«",
	not: "¬",
	shy: "­",
	reg: "®",
	macr: "¯",
	deg: "°",
	plusmn: "±",
	sup2: "²",
	sup3: "³",
	acute: "´",
	micro: "µ",
	para: "¶",
	middot: "·",
	cedil: "¸",
	sup1: "¹",
	ordm: "º",
	raquo: "»",
	frac14: "¼",
	frac12: "½",
	frac34: "¾",
	iquest: "¿",
	Agrave: "À",
	Aacute: "Á",
	Acirc: "Â",
	Atilde: "Ã",
	Auml: "Ä",
	Aring: "Å",
	AElig: "Æ",
	Ccedil: "Ç",
	Egrave: "È",
	Eacute: "É",
	Ecirc: "Ê",
	Euml: "Ë",
	Igrave: "Ì",
	Iacute: "Í",
	Icirc: "Î",
	Iuml: "Ï",
	ETH: "Ð",
	Ntilde: "Ñ",
	Ograve: "Ò",
	Oacute: "Ó",
	Ocirc: "Ô",
	Otilde: "Õ",
	Ouml: "Ö",
	times: "×",
	Oslash: "Ø",
	Ugrave: "Ù",
	Uacute: "Ú",
	Ucirc: "Û",
	Uuml: "Ü",
	Yacute: "Ý",
	THORN: "Þ",
	szlig: "ß",
	agrave: "à",
	aacute: "á",
	acirc: "â",
	atilde: "ã",
	auml: "ä",
	aring: "å",
	aelig: "æ",
	ccedil: "ç",
	egrave: "è",
	eacute: "é",
	ecirc: "ê",
	euml: "ë",
	igrave: "ì",
	iacute: "í",
	icirc: "î",
	iuml: "ï",
	eth: "ð",
	ntilde: "ñ",
	ograve: "ò",
	oacute: "ó",
	ocirc: "ô",
	otilde: "õ",
	ouml: "ö",
	divide: "÷",
	oslash: "ø",
	ugrave: "ù",
	uacute: "ú",
	ucirc: "û",
	uuml: "ü",
	yacute: "ý",
	thorn: "þ",
	yuml: "ÿ",
	fnof: "ƒ",
	Alpha: "Α",
	Beta: "Β",
	Gamma: "Γ",
	Delta: "Δ",
	Epsilon: "Ε",
	Zeta: "Ζ",
	Eta: "Η",
	Theta: "Θ",
	Iota: "Ι",
	Kappa: "Κ",
	Lambda: "Λ",
	Mu: "Μ",
	Nu: "Ν",
	Xi: "Ξ",
	Omicron: "Ο",
	Pi: "Π",
	Rho: "Ρ",
	Sigma: "Σ",
	Tau: "Τ",
	Upsilon: "Υ",
	Phi: "Φ",
	Chi: "Χ",
	Psi: "Ψ",
	Omega: "Ω",
	alpha: "α",
	beta: "β",
	gamma: "γ",
	delta: "δ",
	epsilon: "ε",
	zeta: "ζ",
	eta: "η",
	theta: "θ",
	iota: "ι",
	kappa: "κ",
	lambda: "λ",
	mu: "μ",
	nu: "ν",
	xi: "ξ",
	omicron: "ο",
	pi: "π",
	rho: "ρ",
	sigmaf: "ς",
	sigma: "σ",
	tau: "τ",
	upsilon: "υ",
	phi: "φ",
	chi: "χ",
	psi: "ψ",
	omega: "ω",
	thetasym: "ϑ",
	upsih: "ϒ",
	piv: "ϖ",
	bull: "•",
	hellip: "…",
	prime: "′",
	Prime: "″",
	oline: "‾",
	frasl: "⁄",
	weierp: "℘",
	image: "ℑ",
	real: "ℜ",
	trade: "™",
	alefsym: "ℵ",
	larr: "←",
	uarr: "↑",
	rarr: "→",
	darr: "↓",
	harr: "↔",
	crarr: "↵",
	lArr: "⇐",
	uArr: "⇑",
	rArr: "⇒",
	dArr: "⇓",
	hArr: "⇔",
	forall: "∀",
	part: "∂",
	exist: "∃",
	empty: "∅",
	nabla: "∇",
	isin: "∈",
	notin: "∉",
	ni: "∋",
	prod: "∏",
	sum: "∑",
	minus: "−",
	lowast: "∗",
	radic: "√",
	prop: "∝",
	infin: "∞",
	ang: "∠",
	and: "∧",
	or: "∨",
	cap: "∩",
	cup: "∪",
	int: "∫",
	there4: "∴",
	sim: "∼",
	cong: "≅",
	asymp: "≈",
	ne: "≠",
	equiv: "≡",
	le: "≤",
	ge: "≥",
	sub: "⊂",
	sup: "⊃",
	nsub: "⊄",
	sube: "⊆",
	supe: "⊇",
	oplus: "⊕",
	otimes: "⊗",
	perp: "⊥",
	sdot: "⋅",
	lceil: "⌈",
	rceil: "⌉",
	lfloor: "⌊",
	rfloor: "⌋",
	lang: "〈",
	rang: "〉",
	loz: "◊",
	spades: "♠",
	clubs: "♣",
	hearts: "♥",
	diams: "♦",
	quot: "\"",
	amp: "&",
	lt: "<",
	gt: ">",
	OElig: "Œ",
	oelig: "œ",
	Scaron: "Š",
	scaron: "š",
	Yuml: "Ÿ",
	circ: "ˆ",
	tilde: "˜",
	ensp: " ",
	emsp: " ",
	thinsp: " ",
	zwnj: "‌",
	zwj: "‍",
	lrm: "‎",
	rlm: "‏",
	ndash: "–",
	mdash: "—",
	lsquo: "‘",
	rsquo: "’",
	sbquo: "‚",
	ldquo: "“",
	rdquo: "”",
	bdquo: "„",
	dagger: "†",
	Dagger: "‡",
	permil: "‰",
	lsaquo: "‹",
	rsaquo: "›",
	euro: "€"
}, Qn = [
	"cent",
	"copy",
	"divide",
	"gt",
	"lt",
	"not",
	"para",
	"times"
], $n = {}.hasOwnProperty, er = {}, tr;
for (tr in Zn) $n.call(Zn, tr) && (er[Zn[tr]] = tr);
var nr = /[^\dA-Za-z]/;
function rr(e, t, n, r) {
	let i = String.fromCharCode(e);
	if ($n.call(er, i)) {
		let e = er[i], a = "&" + e;
		return n && Xn.includes(e) && !Qn.includes(e) && (!r || t && t !== 61 && nr.test(String.fromCharCode(t))) ? a : a + ";";
	}
	return "";
}
//#endregion
//#region ../../node_modules/stringify-entities/lib/util/format-smart.js
function ir(e, t, n) {
	let r = qn(e, t, n.omitOptionalSemicolons), i;
	if ((n.useNamedReferences || n.useShortestReferences) && (i = rr(e, t, n.omitOptionalSemicolons, n.attribute)), (n.useShortestReferences || !i) && n.useShortestReferences) {
		let i = Yn(e, t, n.omitOptionalSemicolons);
		i.length < r.length && (r = i);
	}
	return i && (!n.useShortestReferences || i.length < r.length) ? i : r;
}
//#endregion
//#region ../../node_modules/stringify-entities/lib/index.js
function j(e, t) {
	return Un(e, Object.assign({ format: ir }, t));
}
//#endregion
//#region ../../node_modules/hast-util-to-html/lib/handle/comment.js
var ar = /^>|^->|<!--|-->|--!>|<!-$/g, or = [">"], sr = ["<", ">"];
function cr(e, t, n, r) {
	return r.settings.bogusComments ? "<?" + j(e.value, Object.assign({}, r.settings.characterReferences, { subset: or })) + ">" : "<!--" + e.value.replace(ar, i) + "-->";
	function i(e) {
		return j(e, Object.assign({}, r.settings.characterReferences, { subset: sr }));
	}
}
//#endregion
//#region ../../node_modules/hast-util-to-html/lib/handle/doctype.js
function lr(e, t, n, r) {
	return "<!" + (r.settings.upperDoctype ? "DOCTYPE" : "doctype") + (r.settings.tightDoctype ? "" : " ") + "html>";
}
//#endregion
//#region ../../node_modules/ccount/index.js
function ur(e, t) {
	let n = String(e);
	if (typeof t != "string") throw TypeError("Expected character");
	let r = 0, i = n.indexOf(t);
	for (; i !== -1;) r++, i = n.indexOf(t, i + t.length);
	return r;
}
//#endregion
//#region ../../node_modules/comma-separated-tokens/index.js
function dr(e, t) {
	let n = t || {};
	return (e[e.length - 1] === "" ? [...e, ""] : e).join((n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")).trim();
}
//#endregion
//#region ../../node_modules/space-separated-tokens/index.js
function fr(e) {
	return e.join(" ").trim();
}
//#endregion
//#region ../../node_modules/hast-util-whitespace/lib/index.js
var pr = /[ \t\n\f\r]/g;
function mr(e) {
	return typeof e == "object" ? e.type === "text" ? hr(e.value) : !1 : hr(e);
}
function hr(e) {
	return e.replace(pr, "") === "";
}
//#endregion
//#region ../../node_modules/hast-util-to-html/lib/omission/util/siblings.js
var M = vr(1), gr = vr(-1), _r = [];
function vr(e) {
	return t;
	function t(t, n, r) {
		let i = t ? t.children : _r, a = (n || 0) + e, o = i[a];
		if (!r) for (; o && mr(o);) a += e, o = i[a];
		return o;
	}
}
//#endregion
//#region ../../node_modules/hast-util-to-html/lib/omission/omission.js
var yr = {}.hasOwnProperty;
function br(e) {
	return t;
	function t(t, n, r) {
		return yr.call(e, t.tagName) && e[t.tagName](t, n, r);
	}
}
//#endregion
//#region ../../node_modules/hast-util-to-html/lib/omission/closing.js
var xr = br({
	body: wr,
	caption: Sr,
	colgroup: Sr,
	dd: Or,
	dt: Dr,
	head: Sr,
	html: Cr,
	li: Er,
	optgroup: Ar,
	option: jr,
	p: Tr,
	rp: kr,
	rt: kr,
	tbody: Nr,
	td: Ir,
	tfoot: Pr,
	th: Ir,
	thead: Mr,
	tr: Fr
});
function Sr(e, t, n) {
	let r = M(n, t, !0);
	return !r || r.type !== "comment" && !(r.type === "text" && mr(r.value.charAt(0)));
}
function Cr(e, t, n) {
	let r = M(n, t);
	return !r || r.type !== "comment";
}
function wr(e, t, n) {
	let r = M(n, t);
	return !r || r.type !== "comment";
}
function Tr(e, t, n) {
	let r = M(n, t);
	return r ? r.type === "element" && (r.tagName === "address" || r.tagName === "article" || r.tagName === "aside" || r.tagName === "blockquote" || r.tagName === "details" || r.tagName === "div" || r.tagName === "dl" || r.tagName === "fieldset" || r.tagName === "figcaption" || r.tagName === "figure" || r.tagName === "footer" || r.tagName === "form" || r.tagName === "h1" || r.tagName === "h2" || r.tagName === "h3" || r.tagName === "h4" || r.tagName === "h5" || r.tagName === "h6" || r.tagName === "header" || r.tagName === "hgroup" || r.tagName === "hr" || r.tagName === "main" || r.tagName === "menu" || r.tagName === "nav" || r.tagName === "ol" || r.tagName === "p" || r.tagName === "pre" || r.tagName === "section" || r.tagName === "table" || r.tagName === "ul") : !n || !(n.type === "element" && (n.tagName === "a" || n.tagName === "audio" || n.tagName === "del" || n.tagName === "ins" || n.tagName === "map" || n.tagName === "noscript" || n.tagName === "video"));
}
function Er(e, t, n) {
	let r = M(n, t);
	return !r || r.type === "element" && r.tagName === "li";
}
function Dr(e, t, n) {
	let r = M(n, t);
	return !!(r && r.type === "element" && (r.tagName === "dt" || r.tagName === "dd"));
}
function Or(e, t, n) {
	let r = M(n, t);
	return !r || r.type === "element" && (r.tagName === "dt" || r.tagName === "dd");
}
function kr(e, t, n) {
	let r = M(n, t);
	return !r || r.type === "element" && (r.tagName === "rp" || r.tagName === "rt");
}
function Ar(e, t, n) {
	let r = M(n, t);
	return !r || r.type === "element" && r.tagName === "optgroup";
}
function jr(e, t, n) {
	let r = M(n, t);
	return !r || r.type === "element" && (r.tagName === "option" || r.tagName === "optgroup");
}
function Mr(e, t, n) {
	let r = M(n, t);
	return !!(r && r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot"));
}
function Nr(e, t, n) {
	let r = M(n, t);
	return !r || r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot");
}
function Pr(e, t, n) {
	return !M(n, t);
}
function Fr(e, t, n) {
	let r = M(n, t);
	return !r || r.type === "element" && r.tagName === "tr";
}
function Ir(e, t, n) {
	let r = M(n, t);
	return !r || r.type === "element" && (r.tagName === "td" || r.tagName === "th");
}
//#endregion
//#region ../../node_modules/hast-util-to-html/lib/omission/opening.js
var Lr = br({
	body: Br,
	colgroup: Vr,
	head: zr,
	html: Rr,
	tbody: Hr
});
function Rr(e) {
	let t = M(e, -1);
	return !t || t.type !== "comment";
}
function zr(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.children) if (n.type === "element" && (n.tagName === "base" || n.tagName === "title")) {
		if (t.has(n.tagName)) return !1;
		t.add(n.tagName);
	}
	let n = e.children[0];
	return !n || n.type === "element";
}
function Br(e) {
	let t = M(e, -1, !0);
	return !t || t.type !== "comment" && !(t.type === "text" && mr(t.value.charAt(0))) && !(t.type === "element" && (t.tagName === "meta" || t.tagName === "link" || t.tagName === "script" || t.tagName === "style" || t.tagName === "template"));
}
function Vr(e, t, n) {
	let r = gr(n, t), i = M(e, -1, !0);
	return n && r && r.type === "element" && r.tagName === "colgroup" && xr(r, n.children.indexOf(r), n) ? !1 : !!(i && i.type === "element" && i.tagName === "col");
}
function Hr(e, t, n) {
	let r = gr(n, t), i = M(e, -1);
	return n && r && r.type === "element" && (r.tagName === "thead" || r.tagName === "tbody") && xr(r, n.children.indexOf(r), n) ? !1 : !!(i && i.type === "element" && i.tagName === "tr");
}
//#endregion
//#region ../../node_modules/hast-util-to-html/lib/handle/element.js
var Ur = {
	name: [["	\n\f\r &/=>".split(""), "	\n\f\r \"&'/=>`".split("")], ["\0	\n\f\r \"&'/<=>".split(""), "\0	\n\f\r \"&'/<=>`".split("")]],
	unquoted: [["	\n\f\r &>".split(""), "\0	\n\f\r \"&'<=>`".split("")], ["\0	\n\f\r \"&'<=>`".split(""), "\0	\n\f\r \"&'<=>`".split("")]],
	single: [["&'".split(""), "\"&'`".split("")], ["\0&'".split(""), "\0\"&'`".split("")]],
	double: [["\"&".split(""), "\"&'`".split("")], ["\0\"&".split(""), "\0\"&'`".split("")]]
};
function Wr(e, t, n, r) {
	let i = r.schema, a = i.space === "svg" ? !1 : r.settings.omitOptionalTags, o = i.space === "svg" ? r.settings.closeEmptyElements : r.settings.voids.includes(e.tagName.toLowerCase()), s = [], c;
	i.space === "html" && e.tagName === "svg" && (r.schema = Fn);
	let l = Gr(r, e.properties), u = r.all(i.space === "html" && e.tagName === "template" ? e.content : e);
	return r.schema = i, u && (o = !1), (l || !a || !Lr(e, t, n)) && (s.push("<", e.tagName, l ? " " + l : ""), o && (i.space === "svg" || r.settings.closeSelfClosing) && (c = l.charAt(l.length - 1), (!r.settings.tightSelfClosing || c === "/" || c && c !== "\"" && c !== "'") && s.push(" "), s.push("/")), s.push(">")), s.push(u), !o && (!a || !xr(e, t, n)) && s.push("</" + e.tagName + ">"), s.join("");
}
function Gr(e, t) {
	let n = [], r = -1, i;
	if (t) {
		for (i in t) if (t[i] !== null && t[i] !== void 0) {
			let r = Kr(e, i, t[i]);
			r && n.push(r);
		}
	}
	for (; ++r < n.length;) {
		let t = e.settings.tightAttributes ? n[r].charAt(n[r].length - 1) : void 0;
		r !== n.length - 1 && t !== "\"" && t !== "'" && (n[r] += " ");
	}
	return n.join("");
}
function Kr(e, t, n) {
	let r = jn(e.schema, t), i = e.settings.allowParseErrors && e.schema.space === "html" ? 0 : 1, a = e.settings.allowDangerousCharacters ? 0 : 1, o = e.quote, s;
	if (r.overloadedBoolean && (n === r.attribute || n === "") ? n = !0 : (r.boolean || r.overloadedBoolean) && (typeof n != "string" || n === r.attribute || n === "") && (n = !!n), n == null || n === !1 || typeof n == "number" && Number.isNaN(n)) return "";
	let c = j(r.attribute, Object.assign({}, e.settings.characterReferences, { subset: Ur.name[i][a] }));
	return n === !0 || (n = Array.isArray(n) ? (r.commaSeparated ? dr : fr)(n, { padLeft: !e.settings.tightCommaSeparatedLists }) : String(n), e.settings.collapseEmptyAttributes && !n) ? c : (e.settings.preferUnquoted && (s = j(n, Object.assign({}, e.settings.characterReferences, {
		attribute: !0,
		subset: Ur.unquoted[i][a]
	}))), s !== n && (e.settings.quoteSmart && ur(n, o) > ur(n, e.alternative) && (o = e.alternative), s = o + j(n, Object.assign({}, e.settings.characterReferences, {
		subset: (o === "'" ? Ur.single : Ur.double)[i][a],
		attribute: !0
	})) + o), c + (s && "=" + s));
}
//#endregion
//#region ../../node_modules/hast-util-to-html/lib/handle/text.js
var qr = ["<", "&"];
function Jr(e, t, n, r) {
	return n && n.type === "element" && (n.tagName === "script" || n.tagName === "style") ? e.value : j(e.value, Object.assign({}, r.settings.characterReferences, { subset: qr }));
}
//#endregion
//#region ../../node_modules/hast-util-to-html/lib/handle/raw.js
function Yr(e, t, n, r) {
	return r.settings.allowDangerousHtml ? e.value : Jr(e, t, n, r);
}
//#endregion
//#region ../../node_modules/hast-util-to-html/lib/handle/root.js
function Xr(e, t, n, r) {
	return r.all(e);
}
//#endregion
//#region ../../node_modules/hast-util-to-html/lib/handle/index.js
var Zr = Ln("type", {
	invalid: Qr,
	unknown: $r,
	handlers: {
		comment: cr,
		doctype: lr,
		element: Wr,
		raw: Yr,
		root: Xr,
		text: Jr
	}
});
function Qr(e) {
	throw Error("Expected node, not `" + e + "`");
}
function $r(e) {
	throw Error("Cannot compile unknown node `" + e.type + "`");
}
//#endregion
//#region ../../node_modules/hast-util-to-html/lib/index.js
var ei = {}, ti = {}, ni = [];
function ri(e, t) {
	let n = t || ei, r = n.quote || "\"", i = r === "\"" ? "'" : "\"";
	if (r !== "\"" && r !== "'") throw Error("Invalid quote `" + r + "`, expected `'` or `\"`");
	return {
		one: ii,
		all: ai,
		settings: {
			omitOptionalTags: n.omitOptionalTags || !1,
			allowParseErrors: n.allowParseErrors || !1,
			allowDangerousCharacters: n.allowDangerousCharacters || !1,
			quoteSmart: n.quoteSmart || !1,
			preferUnquoted: n.preferUnquoted || !1,
			tightAttributes: n.tightAttributes || !1,
			upperDoctype: n.upperDoctype || !1,
			tightDoctype: n.tightDoctype || !1,
			bogusComments: n.bogusComments || !1,
			tightCommaSeparatedLists: n.tightCommaSeparatedLists || !1,
			tightSelfClosing: n.tightSelfClosing || !1,
			collapseEmptyAttributes: n.collapseEmptyAttributes || !1,
			allowDangerousHtml: n.allowDangerousHtml || !1,
			voids: n.voids || un,
			characterReferences: n.characterReferences || ti,
			closeSelfClosing: n.closeSelfClosing || !1,
			closeEmptyElements: n.closeEmptyElements || !1
		},
		schema: n.space === "svg" ? Fn : Pn,
		quote: r,
		alternative: i
	}.one(Array.isArray(e) ? {
		type: "root",
		children: e
	} : e, void 0, void 0);
}
function ii(e, t, n) {
	return Zr(e, t, n, this);
}
function ai(e) {
	let t = [], n = e && e.children || ni, r = -1;
	for (; ++r < n.length;) t[r] = this.one(n[r], r, e);
	return t.join("");
}
//#endregion
//#region ../../node_modules/@shikijs/core/dist/index.mjs
var oi = /\s+/g;
function si(e, t) {
	if (!t) return e;
	e.properties ||= {}, e.properties.class ||= [], typeof e.properties.class == "string" && (e.properties.class = e.properties.class.split(oi)), Array.isArray(e.properties.class) || (e.properties.class = []);
	let n = Array.isArray(t) ? t : t.split(oi);
	for (let t of n) t && !e.properties.class.includes(t) && e.properties.class.push(t);
	return e;
}
function ci(e) {
	let t = jt(e, !0).map(([e]) => e);
	function n(n) {
		if (n === e.length) return {
			line: t.length - 1,
			character: t.at(-1).length
		};
		let r = n, i = 0;
		for (let e of t) {
			if (r < e.length) break;
			r -= e.length, i++;
		}
		return {
			line: i,
			character: r
		};
	}
	function r(e, n) {
		let r = 0;
		for (let n = 0; n < e; n++) r += t[n].length;
		return r += n, r;
	}
	return {
		lines: t,
		indexToPos: n,
		posToIndex: r
	};
}
var li = ["color", "background-color"];
function ui(e, t) {
	let n = 0, r = [];
	for (let i of t) i > n && r.push({
		...e,
		content: e.content.slice(n, i),
		offset: e.offset + n
	}), n = i;
	return n < e.content.length && r.push({
		...e,
		content: e.content.slice(n),
		offset: e.offset + n
	}), r;
}
function di(e, t) {
	let n = 0, r = e.length;
	for (; n < r;) {
		let i = n + (r - n >> 1);
		e[i] <= t ? n = i + 1 : r = i;
	}
	return n;
}
function fi(e, t) {
	let n = [...t instanceof Set ? t : new Set(t)].sort((e, t) => e - t);
	return n.length ? e.map((e) => e.flatMap((e) => {
		let t = e.offset + e.content.length, r = di(n, e.offset), i = r;
		for (; i < n.length && n[i] < t;) i++;
		if (r === i) return e;
		let a = n.slice(r, i);
		for (let t = 0; t < a.length; t++) a[t] -= e.offset;
		return ui(e, a);
	})) : e;
}
function pi(e, t, n, r, i = "css-vars") {
	let a = {
		content: e.content,
		explanation: e.explanation,
		offset: e.offset
	}, s = t.map((t) => mi(e.variants[t])), c = new Set(s.flatMap((e) => Object.keys(e))), l = {}, u = (e, r) => {
		let i = r === "color" ? "" : r === "background-color" ? "-bg" : `-${r}`;
		return n + t[e] + (r === "color" ? "" : i);
	};
	return s.forEach((e, n) => {
		for (let a of c) {
			let c = e[a] || "inherit";
			if (n === 0 && r && li.includes(a)) if (r === "light-dark()" && s.length > 1) {
				let e = t.findIndex((e) => e === "light"), r = t.findIndex((e) => e === "dark");
				if (e === -1 || r === -1) throw new o("When using `defaultColor: \"light-dark()\"`, you must provide both `light` and `dark` themes");
				l[a] = `light-dark(${s[e][a] || "inherit"}, ${s[r][a] || "inherit"})`, i === "css-vars" && (l[u(n, a)] = c);
			} else l[a] = c;
			else i === "css-vars" && (l[u(n, a)] = c);
		}
	}), a.htmlStyle = l, a;
}
function mi(e) {
	let t = {};
	if (e.color && (t.color = e.color), e.bgColor && (t["background-color"] = e.bgColor), e.fontStyle) {
		e.fontStyle & y.Italic && (t["font-style"] = "italic"), e.fontStyle & y.Bold && (t["font-weight"] = "bold");
		let n = [];
		e.fontStyle & y.Underline && n.push("underline"), e.fontStyle & y.Strikethrough && n.push("line-through"), n.length && (t["text-decoration"] = n.join(" "));
	}
	return t;
}
function hi(e) {
	return typeof e == "string" ? e : Object.entries(e).map(([e, t]) => `${e}:${t}`).join(";");
}
function gi() {
	let e = /* @__PURE__ */ new WeakMap();
	function t(t) {
		if (!e.has(t.meta)) {
			let n = ci(t.source);
			function r(e) {
				if (typeof e == "number") {
					if (e < 0 || e > t.source.length) throw new o(`Invalid decoration offset: ${e}. Code length: ${t.source.length}`);
					return {
						...n.indexToPos(e),
						offset: e
					};
				} else {
					let t = n.lines[e.line];
					if (t === void 0) throw new o(`Invalid decoration position ${JSON.stringify(e)}. Lines length: ${n.lines.length}`);
					let r = e.character;
					if (r < 0 && (r = t.length + r), r < 0 || r > t.length) throw new o(`Invalid decoration position ${JSON.stringify(e)}. Line ${e.line} length: ${t.length}`);
					return {
						...e,
						character: r,
						offset: n.posToIndex(e.line, r)
					};
				}
			}
			let i = (t.options.decorations || []).map((e) => ({
				...e,
				start: r(e.start),
				end: r(e.end)
			}));
			_i(i), e.set(t.meta, {
				decorations: i,
				converter: n,
				source: t.source
			});
		}
		return e.get(t.meta);
	}
	return {
		name: "shiki:decorations",
		tokens(e) {
			if (this.options.decorations?.length) return fi(e, t(this).decorations.flatMap((e) => [e.start.offset, e.end.offset]));
		},
		code(e) {
			if (!this.options.decorations?.length) return;
			let n = t(this), r = [...e.children].filter((e) => e.type === "element" && e.tagName === "span");
			if (r.length !== n.converter.lines.length) throw new o(`Number of lines in code element (${r.length}) does not match the number of lines in the source (${n.converter.lines.length}). Failed to apply decorations.`);
			function i(e, t, n, i) {
				let a = r[e], c = "", l = -1, u = -1;
				if (t === 0 && (l = 0), n === 0 && (u = 0), n === Infinity && (u = a.children.length), l === -1 || u === -1) for (let e = 0; e < a.children.length; e++) c += vi(a.children[e]), l === -1 && c.length === t && (l = e + 1), u === -1 && c.length === n && (u = e + 1);
				if (l === -1) throw new o(`Failed to find start index for decoration ${JSON.stringify(i.start)}`);
				if (u === -1) throw new o(`Failed to find end index for decoration ${JSON.stringify(i.end)}`);
				let d = a.children.slice(l, u);
				if (!i.alwaysWrap && d.length === a.children.length) s(a, i, "line");
				else if (!i.alwaysWrap && d.length === 1 && d[0].type === "element") s(d[0], i, "token");
				else {
					let e = {
						type: "element",
						tagName: "span",
						properties: {},
						children: d
					};
					s(e, i, "wrapper"), a.children.splice(l, d.length, e);
				}
			}
			function a(e, t) {
				r[e] = s(r[e], t, "line");
			}
			function s(e, t, n) {
				let r = t.properties || {}, i = t.transform || ((e) => e);
				return e.tagName = t.tagName || "span", e.properties = {
					...e.properties,
					...r,
					class: e.properties.class
				}, t.properties?.class && si(e, t.properties.class), e = i(e, n) || e, e;
			}
			let c = [], l = n.decorations.sort((e, t) => t.start.offset - e.start.offset || e.end.offset - t.end.offset);
			for (let e of l) {
				let { start: t, end: n } = e;
				if (t.line === n.line) i(t.line, t.character, n.character, e);
				else if (t.line < n.line) {
					i(t.line, t.character, Infinity, e);
					for (let r = t.line + 1; r < n.line; r++) c.unshift(() => a(r, e));
					i(n.line, 0, n.character, e);
				}
			}
			c.forEach((e) => e());
		}
	};
}
function _i(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (n.start.offset > n.end.offset) throw new o(`Invalid decoration range: ${JSON.stringify(n.start)} - ${JSON.stringify(n.end)}`);
		for (let r = t + 1; r < e.length; r++) {
			let t = e[r], i = n.start.offset <= t.start.offset && t.start.offset < n.end.offset, a = n.start.offset < t.end.offset && t.end.offset <= n.end.offset, s = t.start.offset <= n.start.offset && n.start.offset < t.end.offset, c = t.start.offset < n.end.offset && n.end.offset <= t.end.offset;
			if (i || a || s || c) {
				if (i && a || s && c || s && n.start.offset === n.end.offset || a && t.start.offset === t.end.offset) continue;
				throw new o(`Decorations ${JSON.stringify(n.start)} and ${JSON.stringify(t.start)} intersect.`);
			}
		}
	}
}
function vi(e) {
	return e.type === "text" ? e.value : e.type === "element" ? e.children.map(vi).join("") : "";
}
var yi = [/* @__PURE__ */ gi()];
function bi(e) {
	let t = xi(e.transformers || []);
	return [
		...t.pre,
		...t.normal,
		...t.post,
		...yi
	];
}
function xi(e) {
	let t = [], n = [], r = [];
	for (let i of e) switch (i.enforce) {
		case "pre":
			t.push(i);
			break;
		case "post":
			n.push(i);
			break;
		default: r.push(i);
	}
	return {
		pre: t,
		post: n,
		normal: r
	};
}
var N = [
	"black",
	"red",
	"green",
	"yellow",
	"blue",
	"magenta",
	"cyan",
	"white",
	"brightBlack",
	"brightRed",
	"brightGreen",
	"brightYellow",
	"brightBlue",
	"brightMagenta",
	"brightCyan",
	"brightWhite"
], Si = {
	1: "bold",
	2: "dim",
	3: "italic",
	4: "underline",
	7: "reverse",
	8: "hidden",
	9: "strikethrough"
};
function Ci(e, t) {
	let n = e.indexOf("\x1B", t);
	if (n !== -1 && e[n + 1] === "[") {
		let t = e.indexOf("m", n);
		if (t !== -1) return {
			sequence: e.substring(n + 2, t).split(";"),
			startPosition: n,
			position: t + 1
		};
	}
	return { position: e.length };
}
function wi(e) {
	let t = e.shift();
	if (t === "2") {
		let t = e.splice(0, 3).map((e) => Number.parseInt(e));
		return t.length !== 3 || t.some((e) => Number.isNaN(e)) ? void 0 : {
			type: "rgb",
			rgb: t
		};
	} else if (t === "5") {
		let t = e.shift();
		if (t) return {
			type: "table",
			index: Number(t)
		};
	}
}
function Ti(e) {
	let t = [];
	for (; e.length > 0;) {
		let n = e.shift();
		if (!n) continue;
		let r = Number.parseInt(n);
		if (!Number.isNaN(r)) if (r === 0) t.push({ type: "resetAll" });
		else if (r <= 9) Si[r] && t.push({
			type: "setDecoration",
			value: Si[r]
		});
		else if (r <= 29) {
			let e = Si[r - 20];
			e && (t.push({
				type: "resetDecoration",
				value: e
			}), e === "dim" && t.push({
				type: "resetDecoration",
				value: "bold"
			}));
		} else if (r <= 37) t.push({
			type: "setForegroundColor",
			value: {
				type: "named",
				name: N[r - 30]
			}
		});
		else if (r === 38) {
			let n = wi(e);
			n && t.push({
				type: "setForegroundColor",
				value: n
			});
		} else if (r === 39) t.push({ type: "resetForegroundColor" });
		else if (r <= 47) t.push({
			type: "setBackgroundColor",
			value: {
				type: "named",
				name: N[r - 40]
			}
		});
		else if (r === 48) {
			let n = wi(e);
			n && t.push({
				type: "setBackgroundColor",
				value: n
			});
		} else r === 49 ? t.push({ type: "resetBackgroundColor" }) : r === 53 ? t.push({
			type: "setDecoration",
			value: "overline"
		}) : r === 55 ? t.push({
			type: "resetDecoration",
			value: "overline"
		}) : r >= 90 && r <= 97 ? t.push({
			type: "setForegroundColor",
			value: {
				type: "named",
				name: N[r - 90 + 8]
			}
		}) : r >= 100 && r <= 107 && t.push({
			type: "setBackgroundColor",
			value: {
				type: "named",
				name: N[r - 100 + 8]
			}
		});
	}
	return t;
}
function Ei() {
	let e = null, t = null, n = /* @__PURE__ */ new Set();
	return { parse(r) {
		let i = [], a = 0;
		do {
			let o = Ci(r, a), s = o.sequence ? r.substring(a, o.startPosition) : r.substring(a);
			if (s.length > 0 && i.push({
				value: s,
				foreground: e,
				background: t,
				decorations: new Set(n)
			}), o.sequence) {
				let r = Ti(o.sequence);
				for (let i of r) i.type === "resetAll" ? (e = null, t = null, n.clear()) : i.type === "resetForegroundColor" ? e = null : i.type === "resetBackgroundColor" ? t = null : i.type === "resetDecoration" && n.delete(i.value);
				for (let i of r) i.type === "setForegroundColor" ? e = i.value : i.type === "setBackgroundColor" ? t = i.value : i.type === "setDecoration" && n.add(i.value);
			}
			a = o.position;
		} while (a < r.length);
		return i;
	} };
}
var Di = {
	black: "#000000",
	red: "#bb0000",
	green: "#00bb00",
	yellow: "#bbbb00",
	blue: "#0000bb",
	magenta: "#ff00ff",
	cyan: "#00bbbb",
	white: "#eeeeee",
	brightBlack: "#555555",
	brightRed: "#ff5555",
	brightGreen: "#00ff00",
	brightYellow: "#ffff55",
	brightBlue: "#5555ff",
	brightMagenta: "#ff55ff",
	brightCyan: "#55ffff",
	brightWhite: "#ffffff"
};
function Oi(e = Di) {
	function t(t) {
		return e[t];
	}
	function n(e) {
		return `#${e.map((e) => Math.max(0, Math.min(e, 255)).toString(16).padStart(2, "0")).join("")}`;
	}
	let r;
	function i() {
		if (r) return r;
		r = [];
		for (let e = 0; e < N.length; e++) r.push(t(N[e]));
		let e = [
			0,
			95,
			135,
			175,
			215,
			255
		];
		for (let t = 0; t < 6; t++) for (let i = 0; i < 6; i++) for (let a = 0; a < 6; a++) r.push(n([
			e[t],
			e[i],
			e[a]
		]));
		let i = 8;
		for (let e = 0; e < 24; e++, i += 10) r.push(n([
			i,
			i,
			i
		]));
		return r;
	}
	function a(e) {
		return i()[e];
	}
	function o(e) {
		switch (e.type) {
			case "named": return t(e.name);
			case "rgb": return n(e.rgb);
			case "table": return a(e.index);
		}
	}
	return { value: o };
}
var ki = /#([0-9a-f]{3,8})/i, Ai = /var\((--[\w-]+-ansi-[\w-]+)\)/, ji = {
	black: "#000000",
	red: "#cd3131",
	green: "#0DBC79",
	yellow: "#E5E510",
	blue: "#2472C8",
	magenta: "#BC3FBC",
	cyan: "#11A8CD",
	white: "#E5E5E5",
	brightBlack: "#666666",
	brightRed: "#F14C4C",
	brightGreen: "#23D18B",
	brightYellow: "#F5F543",
	brightBlue: "#3B8EEA",
	brightMagenta: "#D670D6",
	brightCyan: "#29B8DB",
	brightWhite: "#FFFFFF"
};
function Mi(e, t, n) {
	let r = Ct(e, n), i = jt(t), a = Oi(Object.fromEntries(N.map((t) => {
		let n = `terminal.ansi${t[0].toUpperCase()}${t.substring(1)}`;
		return [t, e.colors?.[n] || ji[t]];
	}))), o = Ei();
	return i.map((t) => o.parse(t[0]).map((n) => {
		let i, o;
		n.decorations.has("reverse") ? (i = n.background ? a.value(n.background) : e.bg, o = n.foreground ? a.value(n.foreground) : e.fg) : (i = n.foreground ? a.value(n.foreground) : e.fg, o = n.background ? a.value(n.background) : void 0), i = x(i, r), o = x(o, r), n.decorations.has("dim") && (i = Ni(i));
		let s = y.None;
		return n.decorations.has("bold") && (s |= y.Bold), n.decorations.has("italic") && (s |= y.Italic), n.decorations.has("underline") && (s |= y.Underline), n.decorations.has("strikethrough") && (s |= y.Strikethrough), {
			content: n.value,
			offset: t[1],
			color: i,
			bgColor: o,
			fontStyle: s
		};
	}));
}
function Ni(e) {
	let t = e.match(ki);
	if (t) {
		let e = t[1];
		if (e.length === 8) {
			let t = Math.round(Number.parseInt(e.slice(6, 8), 16) / 2).toString(16).padStart(2, "0");
			return `#${e.slice(0, 6)}${t}`;
		} else if (e.length === 6) return `#${e}80`;
		else if (e.length === 4) {
			let t = e[0], n = e[1], r = e[2], i = e[3];
			return `#${t}${t}${n}${n}${r}${r}${Math.round(Number.parseInt(`${i}${i}`, 16) / 2).toString(16).padStart(2, "0")}`;
		} else if (e.length === 3) {
			let t = e[0], n = e[1], r = e[2];
			return `#${t}${t}${n}${n}${r}${r}80`;
		}
	}
	let n = e.match(Ai);
	return n ? `var(${n[1]}-dim)` : e;
}
function Pi(e, t, n = {}) {
	let r = e.resolveLangAlias(n.lang || "text"), { theme: i = e.getLoadedThemes()[0] } = n;
	if (!Et(r) && !Ot(i) && r === "ansi") {
		let { theme: r } = e.setTheme(i);
		return Mi(r, t, n);
	}
	return Qt(e, t, n);
}
function Fi(e, t, n) {
	let r, i, a, s, c, l;
	if ("themes" in n) {
		let { defaultColor: u = "light", cssVariablePrefix: d = "--shiki-", colorsRendering: f = "css-vars" } = n, p = Object.entries(n.themes).filter((e) => e[1]).map((e) => ({
			color: e[0],
			theme: e[1]
		})).sort((e, t) => e.color === u ? -1 : t.color === u ? 1 : 0);
		if (p.length === 0) throw new o("`themes` option must not be empty");
		let m = cn(e, t, n, Pi);
		if (l = Kt(m), u && u !== "light-dark()" && !p.some((e) => e.color === u)) throw new o(`\`themes\` option must contain the defaultColor key \`${u}\``);
		let h = p.map((t) => e.getTheme(t.theme)), g = p.map((e) => e.color);
		a = m.map((e) => e.map((e) => pi(e, g, d, u, f))), l && Gt(a, l);
		let _ = p.map((e) => Ct(e.theme, n));
		i = Ii(p, h, _, d, u, "fg", f), r = Ii(p, h, _, d, u, "bg", f), s = `shiki-themes ${h.map((e) => e.name).join(" ")}`, c = u ? void 0 : [i, r].join(";");
	} else if ("theme" in n) {
		let o = Ct(n.theme, n);
		a = Pi(e, t, n);
		let c = e.getTheme(n.theme);
		r = x(c.bg, o), i = x(c.fg, o), s = c.name, l = Kt(a);
	} else throw new o("Invalid options, either `theme` or `themes` must be provided");
	return {
		tokens: a,
		fg: i,
		bg: r,
		themeName: s,
		rootStyle: c,
		grammarState: l
	};
}
function Ii(e, t, n, r, i, a, s) {
	return e.map((c, l) => {
		let u = x(t[l][a], n[l]) || "inherit", d = `${r + c.color}${a === "bg" ? "-bg" : ""}:${u}`;
		if (l === 0 && i) {
			if (i === "light-dark()" && e.length > 1) {
				let r = e.findIndex((e) => e.color === "light"), i = e.findIndex((e) => e.color === "dark");
				if (r === -1 || i === -1) throw new o("When using `defaultColor: \"light-dark()\"`, you must provide both `light` and `dark` themes");
				return `light-dark(${x(t[r][a], n[r]) || "inherit"}, ${x(t[i][a], n[i]) || "inherit"});${d}`;
			}
			return u;
		}
		return s === "css-vars" ? d : null;
	}).filter((e) => !!e).join(";");
}
var Li = /^\s+$/, Ri = /^(\s*)(.*?)(\s*)$/;
function zi(e, t, n, r = {
	meta: {},
	options: n,
	codeToHast: (t, n) => zi(e, t, n),
	codeToTokens: (t, n) => Fi(e, t, n)
}) {
	let i = t;
	for (let e of bi(n)) i = e.preprocess?.call(r, i, n) || i;
	let { tokens: a, fg: o, bg: s, themeName: c, rootStyle: l, grammarState: u } = Fi(e, i, n), { mergeWhitespaces: d = !0, mergeSameStyleTokens: f = !1 } = n;
	d === !0 ? a = Vi(a) : d === "never" && (a = Hi(a)), f && (a = Ui(a));
	let p = {
		...r,
		get source() {
			return i;
		}
	};
	for (let e of bi(n)) a = e.tokens?.call(p, a) || a;
	return Bi(a, {
		...n,
		fg: o,
		bg: s,
		themeName: c,
		rootStyle: n.rootStyle === !1 ? !1 : n.rootStyle ?? l
	}, p, u);
}
function Bi(e, t, n, r = Kt(e)) {
	let i = bi(t), a = [], o = {
		type: "root",
		children: []
	}, { structure: s = "classic", tabindex: c = "0" } = t, l = { class: `shiki ${t.themeName || ""}` };
	t.rootStyle !== !1 && (t.rootStyle == null ? l.style = `background-color:${t.bg};color:${t.fg}` : l.style = t.rootStyle), c !== !1 && c != null && (l.tabindex = c.toString());
	for (let [e, n] of Object.entries(t.meta || {})) e.startsWith("_") || (l[e] = n);
	let u = {
		type: "element",
		tagName: "pre",
		properties: l,
		children: [],
		data: t.data
	}, d = {
		type: "element",
		tagName: "code",
		properties: {},
		children: a
	}, f = [], p = {
		...n,
		structure: s,
		addClassToHast: si,
		get source() {
			return n.source;
		},
		get tokens() {
			return e;
		},
		get options() {
			return t;
		},
		get root() {
			return o;
		},
		get pre() {
			return u;
		},
		get code() {
			return d;
		},
		get lines() {
			return f;
		}
	};
	if (e.forEach((e, t) => {
		t && (s === "inline" ? o.children.push({
			type: "element",
			tagName: "br",
			properties: {},
			children: []
		}) : s === "classic" && a.push({
			type: "text",
			value: "\n"
		}));
		let n = {
			type: "element",
			tagName: "span",
			properties: { class: "line" },
			children: []
		}, r = 0;
		for (let a of e) {
			let e = {
				type: "element",
				tagName: "span",
				properties: { ...a.htmlAttrs },
				children: [{
					type: "text",
					value: a.content
				}]
			}, c = hi(a.htmlStyle || mi(a));
			c && (e.properties.style = c);
			for (let o of i) e = o?.span?.call(p, e, t + 1, r, n, a) || e;
			s === "inline" ? o.children.push(e) : s === "classic" && n.children.push(e), r += a.content.length;
		}
		if (s === "classic") {
			for (let e of i) n = e?.line?.call(p, n, t + 1) || n;
			f.push(n), a.push(n);
		} else s === "inline" && f.push(n);
	}), s === "classic") {
		for (let e of i) d = e?.code?.call(p, d) || d;
		u.children.push(d);
		for (let e of i) u = e?.pre?.call(p, u) || u;
		o.children.push(u);
	} else if (s === "inline") {
		let e = [], t = {
			type: "element",
			tagName: "span",
			properties: { class: "line" },
			children: []
		};
		for (let n of o.children) n.type === "element" && n.tagName === "br" ? (e.push(t), t = {
			type: "element",
			tagName: "span",
			properties: { class: "line" },
			children: []
		}) : (n.type === "element" || n.type === "text") && t.children.push(n);
		e.push(t);
		let n = {
			type: "element",
			tagName: "code",
			properties: {},
			children: e
		};
		for (let e of i) n = e?.code?.call(p, n) || n;
		o.children = [];
		for (let e = 0; e < n.children.length; e++) {
			e > 0 && o.children.push({
				type: "element",
				tagName: "br",
				properties: {},
				children: []
			});
			let t = n.children[e];
			t.type === "element" && o.children.push(...t.children);
		}
	}
	let m = o;
	for (let e of i) m = e?.root?.call(p, m) || m;
	return r && Gt(m, r), m;
}
function Vi(e) {
	return e.map((e) => {
		let t = [], n = "", r;
		return e.forEach((i, a) => {
			let o = !(i.fontStyle && (i.fontStyle & y.Underline || i.fontStyle & y.Strikethrough));
			o && Li.test(i.content) && e[a + 1] ? (r === void 0 && (r = i.offset), n += i.content) : n ? (o ? t.push({
				...i,
				offset: r,
				content: n + i.content
			}) : t.push({
				content: n,
				offset: r
			}, i), r = void 0, n = "") : t.push(i);
		}), t;
	});
}
function Hi(e) {
	return e.map((e) => e.flatMap((e) => {
		if (Li.test(e.content)) return e;
		let t = e.content.match(Ri);
		if (!t) return e;
		let [, n, r, i] = t;
		if (!n && !i) return e;
		let a = [{
			...e,
			offset: e.offset + n.length,
			content: r
		}];
		return n && a.unshift({
			content: n,
			offset: e.offset
		}), i && a.push({
			content: i,
			offset: e.offset + n.length + r.length
		}), a;
	}));
}
function Ui(e) {
	return e.map((e) => {
		let t = [];
		for (let n of e) {
			if (t.length === 0) {
				t.push({ ...n });
				continue;
			}
			let e = t.at(-1), r = hi(e.htmlStyle || mi(e)), i = hi(n.htmlStyle || mi(n)), a = e.fontStyle && (e.fontStyle & y.Underline || e.fontStyle & y.Strikethrough), o = n.fontStyle && (n.fontStyle & y.Underline || n.fontStyle & y.Strikethrough);
			!a && !o && r === i ? e.content += n.content : t.push({ ...n });
		}
		return t;
	});
}
var Wi = ri;
function Gi(e, t, n) {
	let r = {
		meta: {},
		options: n,
		codeToHast: (t, n) => zi(e, t, n),
		codeToTokens: (t, n) => Fi(e, t, n)
	}, i = Wi(zi(e, t, n, r));
	for (let e of bi(n)) i = e.postprocess?.call(r, i, n) || i;
	return i;
}
async function Ki(e) {
	let t = await Ut(e);
	return {
		getLastGrammarState: (...e) => $t(t, ...e),
		codeToTokensBase: (e, n) => Pi(t, e, n),
		codeToTokensWithThemes: (e, n) => cn(t, e, n),
		codeToTokens: (e, n) => Fi(t, e, n),
		codeToHast: (e, n) => zi(t, e, n),
		codeToHtml: (e, n) => Gi(t, e, n),
		getBundledLanguages: () => ({}),
		getBundledThemes: () => ({}),
		...t,
		getInternalContext: () => t
	};
}
//#endregion
//#region ../../node_modules/@shikijs/engine-javascript/dist/scanner-DX8LRFGE.mjs
var qi = 4294967295, Ji = class {
	patterns;
	options;
	regexps;
	constructor(e, t = {}) {
		this.patterns = e, this.options = t;
		let { forgiving: n = !1, cache: r, regexConstructor: i } = t;
		if (!i) throw Error("Option `regexConstructor` is not provided");
		this.regexps = e.map((e) => {
			if (typeof e != "string") return e;
			let t = r?.get(e);
			if (t) {
				if (t instanceof RegExp) return t;
				if (n) return null;
				throw t;
			}
			try {
				let t = i(e);
				return r?.set(e, t), t;
			} catch (t) {
				if (r?.set(e, t), n) return null;
				throw t;
			}
		});
	}
	findNextMatchSync(e, t, n) {
		let r = typeof e == "string" ? e : e.content, i = [];
		function a(e, t, n = 0) {
			return {
				index: e,
				captureIndices: t.indices.map((e) => e == null ? {
					start: qi,
					end: qi,
					length: 0
				} : {
					start: e[0] + n,
					end: e[1] + n,
					length: e[1] - e[0]
				})
			};
		}
		for (let e = 0; e < this.regexps.length; e++) {
			let n = this.regexps[e];
			if (n) try {
				n.lastIndex = t;
				let o = n.exec(r);
				if (!o) continue;
				if (o.index === t) return a(e, o, 0);
				i.push([
					e,
					o,
					0
				]);
			} catch (e) {
				if (this.options.forgiving) continue;
				throw e;
			}
		}
		if (i.length) {
			let e = Math.min(...i.map((e) => e[1].index));
			for (let [t, n, r] of i) if (n.index === e) return a(t, n, r);
		}
		return null;
	}
};
//#endregion
//#region ../../node_modules/oniguruma-parser/dist/utils.js
function P(e) {
	if ([...e].length !== 1) throw Error(`Expected "${e}" to be a single code point`);
	return e.codePointAt(0);
}
function Yi(e, t, n) {
	return e.has(t) || e.set(t, n), e.get(t);
}
var Xi = new Set([
	"alnum",
	"alpha",
	"ascii",
	"blank",
	"cntrl",
	"digit",
	"graph",
	"lower",
	"print",
	"punct",
	"space",
	"upper",
	"word",
	"xdigit"
]), F = String.raw;
function I(e, t) {
	if (e == null) throw Error(t ?? "Value expected");
	return e;
}
//#endregion
//#region ../../node_modules/oniguruma-parser/dist/tokenizer/tokenize.js
var Zi = F`\[\^?`, Qi = `c.? | C(?:-.?)?|${F`[pP]\{(?:\^?[-\x20_]*[A-Za-z][-\x20\w]*\})?`}|${F`x[89A-Fa-f]\p{AHex}(?:\\x[89A-Fa-f]\p{AHex})*`}|${F`u(?:\p{AHex}{4})? | x\{[^\}]*\}? | x\p{AHex}{0,2}`}|${F`o\{[^\}]*\}?`}|${F`\d{1,3}`}`, $i = /[?*+][?+]?|\{(?:\d+(?:,\d*)?|,\d+)\}\??/, ea = new RegExp(F`
  \\ (?:
    ${Qi}
    | [gk]<[^>]*>?
    | [gk]'[^']*'?
    | .
  )
  | \( (?:
    \? (?:
      [:=!>({]
      | <[=!]
      | <[^>]*>
      | '[^']*'
      | ~\|?
      | #(?:[^)\\]|\\.?)*
      | [^:)]*[:)]
    )?
    | \*[^\)]*\)?
  )?
  | (?:${$i.source})+
  | ${Zi}
  | .
`.replace(/\s+/g, ""), "gsu"), ta = new RegExp(F`
  \\ (?:
    ${Qi}
    | .
  )
  | \[:(?:\^?\p{Alpha}+|\^):\]
  | ${Zi}
  | &&
  | .
`.replace(/\s+/g, ""), "gsu");
function na(e, t = {}) {
	let n = {
		flags: "",
		...t,
		rules: {
			captureGroup: !1,
			singleline: !1,
			...t.rules
		}
	};
	if (typeof e != "string") throw Error("String expected as pattern");
	let r = ka(n.flags), i = [r.extended], a = {
		captureGroup: n.rules.captureGroup,
		getCurrentModX() {
			return i.at(-1);
		},
		numOpenGroups: 0,
		popModX() {
			i.pop();
		},
		pushModX(e) {
			i.push(e);
		},
		replaceCurrentModX(e) {
			i[i.length - 1] = e;
		},
		singleline: n.rules.singleline
	}, o = [], s;
	for (ea.lastIndex = 0; s = ea.exec(e);) {
		let t = ra(a, e, s[0], ea.lastIndex);
		t.tokens ? o.push(...t.tokens) : t.token && o.push(t.token), t.lastIndex !== void 0 && (ea.lastIndex = t.lastIndex);
	}
	let c = [], l = 0;
	o.filter((e) => e.type === "GroupOpen").forEach((e) => {
		e.kind === "capturing" ? e.number = ++l : e.raw === "(" && c.push(e);
	}), l || c.forEach((e, t) => {
		e.kind = "capturing", e.number = t + 1;
	});
	let u = l || c.length;
	return {
		tokens: o.map((e) => e.type === "EscapedNumber" ? ja(e, u) : e).flat(),
		flags: r
	};
}
function ra(e, t, n, r) {
	let [i, a] = n;
	if (n === "[" || n === "[^") {
		let e = ia(t, n, r);
		return {
			tokens: e.tokens,
			lastIndex: e.lastIndex
		};
	}
	if (i === "\\") {
		if ("AbBGyYzZ".includes(a)) return { token: ca(n, n) };
		if (/^\\g[<']/.test(n)) {
			if (!/^\\g(?:<[^>]+>|'[^']+')$/.test(n)) throw Error(`Invalid group name "${n}"`);
			return { token: ya(n) };
		}
		if (/^\\k[<']/.test(n)) {
			if (!/^\\k(?:<[^>]+>|'[^']+')$/.test(n)) throw Error(`Invalid group name "${n}"`);
			return { token: la(n) };
		}
		if (a === "K") return { token: ma("keep", n) };
		if (a === "N" || a === "R") return { token: R("newline", n, { negate: a === "N" }) };
		if (a === "O") return { token: R("any", n) };
		if (a === "X") return { token: R("text_segment", n) };
		let e = oa(n, { inCharClass: !1 });
		return Array.isArray(e) ? { tokens: e } : { token: e };
	}
	if (i === "(") {
		if (a === "*") return { token: wa(n) };
		if (n === "(?{") throw Error(`Unsupported callout "${n}"`);
		if (n.startsWith("(?#")) {
			if (t[r] !== ")") throw Error("Unclosed comment group \"(?#\"");
			return { lastIndex: r + 1 };
		}
		if (/^\(\?[-imx]+[:)]$/.test(n)) return { token: Ca(n, e) };
		if (e.pushModX(e.getCurrentModX()), e.numOpenGroups++, n === "(" && !e.captureGroup || n === "(?:") return { token: z("group", n) };
		if (n === "(?>") return { token: z("atomic", n) };
		if (n === "(?=" || n === "(?!" || n === "(?<=" || n === "(?<!") return { token: z(n[2] === "<" ? "lookbehind" : "lookahead", n, { negate: n.endsWith("!") }) };
		if (n === "(" && e.captureGroup || n.startsWith("(?<") && n.endsWith(">") || n.startsWith("(?'") && n.endsWith("'")) return { token: z("capturing", n, { ...n !== "(" && { name: n.slice(3, -1) } }) };
		if (n.startsWith("(?~")) {
			if (n === "(?~|") throw Error(`Unsupported absence function kind "${n}"`);
			return { token: z("absence_repeater", n) };
		}
		throw Error(n === "(?(" ? `Unsupported conditional "${n}"` : `Invalid or unsupported group option "${n}"`);
	}
	if (n === ")") {
		if (e.popModX(), e.numOpenGroups--, e.numOpenGroups < 0) throw Error("Unmatched \")\"");
		return { token: ga(n) };
	}
	if (e.getCurrentModX()) {
		if (n === "#") {
			let e = t.indexOf("\n", r);
			return { lastIndex: e === -1 ? t.length : e };
		}
		if (/^\s$/.test(n)) {
			let e = /\s+/y;
			return e.lastIndex = r, { lastIndex: e.exec(t) ? e.lastIndex : r };
		}
	}
	return n === "." ? { token: R("dot", n) } : n === "^" || n === "$" ? { token: ca(e.singleline ? {
		"^": F`\A`,
		$: F`\Z`
	}[n] : n, n) } : n === "|" ? { token: sa(n) } : $i.test(n) ? { tokens: Ma(n) } : { token: L(P(n), n) };
}
function ia(e, t, n) {
	let r = [pa(t[1] === "^", t)], i = 1, a;
	for (ta.lastIndex = n; a = ta.exec(e);) {
		let e = a[0];
		if (e[0] === "[" && e[1] !== ":") i++, r.push(pa(e[1] === "^", e));
		else if (e === "]") {
			if (r.at(-1).type === "CharacterClassOpen") r.push(L(93, e));
			else if (i--, r.push(ua(e)), !i) break;
		} else {
			let t = aa(e);
			Array.isArray(t) ? r.push(...t) : r.push(t);
		}
	}
	return {
		tokens: r,
		lastIndex: ta.lastIndex || e.length
	};
}
function aa(e) {
	if (e[0] === "\\") return oa(e, { inCharClass: !0 });
	if (e[0] === "[") {
		let t = /\[:(?<negate>\^?)(?<name>[a-z]+):\]/.exec(e);
		if (!t || !Xi.has(t.groups.name)) throw Error(`Invalid POSIX class "${e}"`);
		return R("posix", e, {
			value: t.groups.name,
			negate: !!t.groups.negate
		});
	}
	return e === "-" ? da(e) : e === "&&" ? fa(e) : L(P(e), e);
}
function oa(e, { inCharClass: t }) {
	let n = e[1];
	if (n === "c" || n === "C") return Sa(e);
	if ("dDhHsSwW".includes(n)) return Ea(e);
	if (e.startsWith(F`\o{`)) throw Error(`Incomplete, invalid, or unsupported octal code point "${e}"`);
	if (/^\\[pP]\{/.test(e)) {
		if (e.length === 3) throw Error(`Incomplete or invalid Unicode property "${e}"`);
		return Da(e);
	}
	if (/^\\x[89A-Fa-f]\p{AHex}/u.test(e)) try {
		let t = e.split(/\\x/).slice(1).map((e) => parseInt(e, 16)), n = new TextDecoder("utf-8", {
			ignoreBOM: !0,
			fatal: !0
		}).decode(new Uint8Array(t)), r = new TextEncoder();
		return [...n].map((e) => {
			let t = [...r.encode(e)].map((e) => `\\x${e.toString(16)}`).join("");
			return L(P(e), t);
		});
	} catch {
		throw Error(`Multibyte code "${e}" incomplete or invalid in Oniguruma`);
	}
	if (n === "u" || n === "x") return L(Aa(e), e);
	if (xa.has(n)) return L(xa.get(n), e);
	if (/\d/.test(n)) return ha(t, e);
	if (e === "\\") throw Error(F`Incomplete escape "\"`);
	if (n === "M") throw Error(`Unsupported meta "${e}"`);
	if ([...e].length === 2) return L(e.codePointAt(1), e);
	throw Error(`Unexpected escape "${e}"`);
}
function sa(e) {
	return {
		type: "Alternator",
		raw: e
	};
}
function ca(e, t) {
	return {
		type: "Assertion",
		kind: e,
		raw: t
	};
}
function la(e) {
	return {
		type: "Backreference",
		raw: e
	};
}
function L(e, t) {
	return {
		type: "Character",
		value: e,
		raw: t
	};
}
function ua(e) {
	return {
		type: "CharacterClassClose",
		raw: e
	};
}
function da(e) {
	return {
		type: "CharacterClassHyphen",
		raw: e
	};
}
function fa(e) {
	return {
		type: "CharacterClassIntersector",
		raw: e
	};
}
function pa(e, t) {
	return {
		type: "CharacterClassOpen",
		negate: e,
		raw: t
	};
}
function R(e, t, n = {}) {
	return {
		type: "CharacterSet",
		kind: e,
		...n,
		raw: t
	};
}
function ma(e, t, n = {}) {
	return e === "keep" ? {
		type: "Directive",
		kind: e,
		raw: t
	} : {
		type: "Directive",
		kind: e,
		flags: I(n.flags),
		raw: t
	};
}
function ha(e, t) {
	return {
		type: "EscapedNumber",
		inCharClass: e,
		raw: t
	};
}
function ga(e) {
	return {
		type: "GroupClose",
		raw: e
	};
}
function z(e, t, n = {}) {
	return {
		type: "GroupOpen",
		kind: e,
		...n,
		raw: t
	};
}
function _a(e, t, n, r) {
	return {
		type: "NamedCallout",
		kind: e,
		tag: t,
		arguments: n,
		raw: r
	};
}
function va(e, t, n, r) {
	return {
		type: "Quantifier",
		kind: e,
		min: t,
		max: n,
		raw: r
	};
}
function ya(e) {
	return {
		type: "Subroutine",
		raw: e
	};
}
var ba = new Set([
	"COUNT",
	"CMP",
	"ERROR",
	"FAIL",
	"MAX",
	"MISMATCH",
	"SKIP",
	"TOTAL_COUNT"
]), xa = new Map([
	["a", 7],
	["b", 8],
	["e", 27],
	["f", 12],
	["n", 10],
	["r", 13],
	["t", 9],
	["v", 11]
]);
function Sa(e) {
	let t = e[1] === "c" ? e[2] : e[3];
	if (!t || !/[A-Za-z]/.test(t)) throw Error(`Unsupported control character "${e}"`);
	return L(P(t.toUpperCase()) - 64, e);
}
function Ca(e, t) {
	let { on: n, off: r } = /^\(\?(?<on>[imx]*)(?:-(?<off>[-imx]*))?/.exec(e).groups;
	r ??= "";
	let i = (t.getCurrentModX() || n.includes("x")) && !r.includes("x"), a = Oa(n), o = Oa(r), s = {};
	if (a && (s.enable = a), o && (s.disable = o), e.endsWith(")")) return t.replaceCurrentModX(i), ma("flags", e, { flags: s });
	if (e.endsWith(":")) return t.pushModX(i), t.numOpenGroups++, z("group", e, { ...(a || o) && { flags: s } });
	throw Error(`Unexpected flag modifier "${e}"`);
}
function wa(e) {
	let t = /\(\*(?<name>[A-Za-z_]\w*)?(?:\[(?<tag>(?:[A-Za-z_]\w*)?)\])?(?:\{(?<args>[^}]*)\})?\)/.exec(e);
	if (!t) throw Error(`Incomplete or invalid named callout "${e}"`);
	let { name: n, tag: r, args: i } = t.groups;
	if (!n) throw Error(`Invalid named callout "${e}"`);
	if (r === "") throw Error(`Named callout tag with empty value not allowed "${e}"`);
	let a = i ? i.split(",").filter((e) => e !== "").map((e) => /^[+-]?\d+$/.test(e) ? +e : e) : [], [o, s, c] = a, l = ba.has(n) ? n.toLowerCase() : "custom";
	switch (l) {
		case "fail":
		case "mismatch":
		case "skip":
			if (a.length > 0) throw Error(`Named callout arguments not allowed "${a}"`);
			break;
		case "error":
			if (a.length > 1) throw Error(`Named callout allows only one argument "${a}"`);
			if (typeof o == "string") throw Error(`Named callout argument must be a number "${o}"`);
			break;
		case "max":
			if (!a.length || a.length > 2) throw Error(`Named callout must have one or two arguments "${a}"`);
			if (typeof o == "string" && !/^[A-Za-z_]\w*$/.test(o)) throw Error(`Named callout argument one must be a tag or number "${o}"`);
			if (a.length === 2 && (typeof s == "number" || !/^[<>X]$/.test(s))) throw Error(`Named callout optional argument two must be '<', '>', or 'X' "${s}"`);
			break;
		case "count":
		case "total_count":
			if (a.length > 1) throw Error(`Named callout allows only one argument "${a}"`);
			if (a.length === 1 && (typeof o == "number" || !/^[<>X]$/.test(o))) throw Error(`Named callout optional argument must be '<', '>', or 'X' "${o}"`);
			break;
		case "cmp":
			if (a.length !== 3) throw Error(`Named callout must have three arguments "${a}"`);
			if (typeof o == "string" && !/^[A-Za-z_]\w*$/.test(o)) throw Error(`Named callout argument one must be a tag or number "${o}"`);
			if (typeof s == "number" || !/^(?:[<>!=]=|[<>])$/.test(s)) throw Error(`Named callout argument two must be '==', '!=', '>', '<', '>=', or '<=' "${s}"`);
			if (typeof c == "string" && !/^[A-Za-z_]\w*$/.test(c)) throw Error(`Named callout argument three must be a tag or number "${c}"`);
			break;
		case "custom": throw Error(`Undefined callout name "${n}"`);
		default: throw Error(`Unexpected named callout kind "${l}"`);
	}
	return _a(l, r ?? null, i?.split(",") ?? null, e);
}
function Ta(e) {
	let t = null, n, r;
	if (e[0] === "{") {
		let { minStr: i, maxStr: a } = /^\{(?<minStr>\d*)(?:,(?<maxStr>\d*))?/.exec(e).groups, o = 1e5;
		if (+i > o || a && +a > o) throw Error("Quantifier value unsupported in Oniguruma");
		if (n = +i, r = a === void 0 ? +i : a === "" ? Infinity : +a, n > r && (t = "possessive", [n, r] = [r, n]), e.endsWith("?")) {
			if (t === "possessive") throw Error("Unsupported possessive interval quantifier chain with \"?\"");
			t = "lazy";
		} else t ||= "greedy";
	} else n = e[0] === "+" ? 1 : 0, r = e[0] === "?" ? 1 : Infinity, t = e[1] === "+" ? "possessive" : e[1] === "?" ? "lazy" : "greedy";
	return va(t, n, r, e);
}
function Ea(e) {
	let t = e[1].toLowerCase();
	return R({
		d: "digit",
		h: "hex",
		s: "space",
		w: "word"
	}[t], e, { negate: e[1] !== t });
}
function Da(e) {
	let { p: t, neg: n, value: r } = /^\\(?<p>[pP])\{(?<neg>\^?)(?<value>[^}]+)/.exec(e).groups;
	return R("property", e, {
		value: r,
		negate: t === "P" && !n || t === "p" && !!n
	});
}
function Oa(e) {
	let t = {};
	return e.includes("i") && (t.ignoreCase = !0), e.includes("m") && (t.dotAll = !0), e.includes("x") && (t.extended = !0), Object.keys(t).length ? t : null;
}
function ka(e) {
	let t = {
		ignoreCase: !1,
		dotAll: !1,
		extended: !1,
		digitIsAscii: !1,
		posixIsAscii: !1,
		spaceIsAscii: !1,
		wordIsAscii: !1,
		textSegmentMode: null
	};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (!"imxDPSWy".includes(r)) throw Error(`Invalid flag "${r}"`);
		if (r === "y") {
			if (!/^y{[gw]}/.test(e.slice(n))) throw Error("Invalid or unspecified flag \"y\" mode");
			t.textSegmentMode = e[n + 2] === "g" ? "grapheme" : "word", n += 3;
			continue;
		}
		t[{
			i: "ignoreCase",
			m: "dotAll",
			x: "extended",
			D: "digitIsAscii",
			P: "posixIsAscii",
			S: "spaceIsAscii",
			W: "wordIsAscii"
		}[r]] = !0;
	}
	return t;
}
function Aa(e) {
	if (/^(?:\\u(?!\p{AHex}{4})|\\x(?!\p{AHex}{1,2}|\{\p{AHex}{1,8}\}))/u.test(e)) throw Error(`Incomplete or invalid escape "${e}"`);
	let t = e[2] === "{" ? /^\\x\{\s*(?<hex>\p{AHex}+)/u.exec(e).groups.hex : e.slice(2);
	return parseInt(t, 16);
}
function ja(e, t) {
	let { raw: n, inCharClass: r } = e, i = n.slice(1);
	if (!r && (i !== "0" && i.length === 1 || i[0] !== "0" && +i <= t)) return [la(n)];
	let a = [], o = i.match(/^[0-7]+|\d/g);
	for (let e = 0; e < o.length; e++) {
		let t = o[e], r;
		if (e === 0 && t !== "8" && t !== "9") {
			if (r = parseInt(t, 8), r > 127) throw Error(F`Octal encoded byte above 177 unsupported "${n}"`);
		} else r = P(t);
		a.push(L(r, (e === 0 ? "\\" : "") + t));
	}
	return a;
}
function Ma(e) {
	let t = [], n = new RegExp($i, "gy"), r;
	for (; r = n.exec(e);) {
		let e = r[0];
		if (e[0] === "{") {
			let r = /^\{(?<min>\d+),(?<max>\d+)\}\??$/.exec(e);
			if (r) {
				let { min: i, max: a } = r.groups;
				if (+i > +a && e.endsWith("?")) {
					n.lastIndex--, t.push(Ta(e.slice(0, -1)));
					continue;
				}
			}
		}
		t.push(Ta(e));
	}
	return t;
}
//#endregion
//#region ../../node_modules/oniguruma-parser/dist/parser/node-utils.js
function Na(e, t) {
	if (!Array.isArray(e.body)) throw Error("Expected node with body array");
	if (e.body.length !== 1) return !1;
	let n = e.body[0];
	return !t || Object.keys(t).every((e) => t[e] === n[e]);
}
function Pa(e) {
	return Fa.has(e.type);
}
var Fa = new Set([
	"AbsenceFunction",
	"Backreference",
	"CapturingGroup",
	"Character",
	"CharacterClass",
	"CharacterSet",
	"Group",
	"Quantifier",
	"Subroutine"
]);
//#endregion
//#region ../../node_modules/oniguruma-parser/dist/parser/parse.js
function Ia(e, t = {}) {
	let n = {
		flags: "",
		normalizeUnknownPropertyNames: !1,
		skipBackrefValidation: !1,
		skipLookbehindValidation: !1,
		skipPropertyNameValidation: !1,
		unicodePropertyMap: null,
		...t,
		rules: {
			captureGroup: !1,
			singleline: !1,
			...t.rules
		}
	}, r = na(e, {
		flags: n.flags,
		rules: {
			captureGroup: n.rules.captureGroup,
			singleline: n.rules.singleline
		}
	}), i = (e, t) => {
		let n = r.tokens[a.nextIndex];
		switch (a.parent = e, a.nextIndex++, n.type) {
			case "Alternator": return B();
			case "Assertion": return La(n);
			case "Backreference": return Ra(n, a);
			case "Character": return Ya(n.value, { useLastValid: !!t.isCheckingRangeEnd });
			case "CharacterClassHyphen": return za(n, a, t);
			case "CharacterClassOpen": return Ba(n, a, t);
			case "CharacterSet": return Va(n, a);
			case "Directive": return $a(n.kind, { flags: n.flags });
			case "GroupOpen": return Ha(n, a, t);
			case "NamedCallout": return to(n.kind, n.tag, n.arguments);
			case "Quantifier": return Ua(n, a);
			case "Subroutine": return Wa(n, a);
			default: throw Error(`Unexpected token type "${n.type}"`);
		}
	}, a = {
		capturingGroups: [],
		hasNumberedRef: !1,
		namedGroupsByName: /* @__PURE__ */ new Map(),
		nextIndex: 0,
		normalizeUnknownPropertyNames: n.normalizeUnknownPropertyNames,
		parent: null,
		skipBackrefValidation: n.skipBackrefValidation,
		skipLookbehindValidation: n.skipLookbehindValidation,
		skipPropertyNameValidation: n.skipPropertyNameValidation,
		subroutines: [],
		tokens: r.tokens,
		unicodePropertyMap: n.unicodePropertyMap,
		walk: i
	}, o = io(eo(r.flags)), s = o.body[0];
	for (; a.nextIndex < r.tokens.length;) {
		let e = i(s, {});
		e.type === "Alternative" ? (o.body.push(e), s = e) : s.body.push(e);
	}
	let { capturingGroups: c, hasNumberedRef: l, namedGroupsByName: u, subroutines: d } = a;
	if (l && u.size && !n.rules.captureGroup) throw Error("Numbered backref/subroutine not allowed when using named capture");
	for (let { ref: e } of d) if (typeof e == "number") {
		if (e > c.length) throw Error("Subroutine uses a group number that's not defined");
		e && (c[e - 1].isSubroutined = !0);
	} else if (u.has(e)) {
		if (u.get(e).length > 1) throw Error(F`Subroutine uses a duplicate group name "\g<${e}>"`);
		u.get(e)[0].isSubroutined = !0;
	} else throw Error(F`Subroutine uses a group name that's not defined "\g<${e}>"`);
	return o;
}
function La({ kind: e }) {
	return Ka(I({
		"^": "line_start",
		$: "line_end",
		"\\A": "string_start",
		"\\b": "word_boundary",
		"\\B": "word_boundary",
		"\\G": "search_start",
		"\\y": "text_segment_boundary",
		"\\Y": "text_segment_boundary",
		"\\z": "string_end",
		"\\Z": "string_end_newline"
	}[e], `Unexpected assertion kind "${e}"`), { negate: e === F`\B` || e === F`\Y` });
}
function Ra({ raw: e }, t) {
	let n = /^\\k[<']/.test(e), r = n ? e.slice(3, -1) : e.slice(1), i = (n, r = !1) => {
		let i = t.capturingGroups.length, a = !1;
		if (n > i) if (t.skipBackrefValidation) a = !0;
		else throw Error(`Not enough capturing groups defined to the left "${e}"`);
		return t.hasNumberedRef = !0, qa(r ? i + 1 - n : n, { orphan: a });
	};
	if (n) {
		let n = /^(?<sign>-?)0*(?<num>[1-9]\d*)$/.exec(r);
		if (n) return i(+n.groups.num, !!n.groups.sign);
		if (/[-+]/.test(r)) throw Error(`Invalid backref name "${e}"`);
		if (!t.namedGroupsByName.has(r)) throw Error(`Group name not defined to the left "${e}"`);
		return qa(r);
	}
	return i(+r);
}
function za(e, t, n) {
	let { tokens: r, walk: i } = t, a = t.parent, o = a.body.at(-1), s = r[t.nextIndex];
	if (!n.isCheckingRangeEnd && o && o.type !== "CharacterClass" && o.type !== "CharacterClassRange" && s && s.type !== "CharacterClassOpen" && s.type !== "CharacterClassClose" && s.type !== "CharacterClassIntersector") {
		let e = i(a, {
			...n,
			isCheckingRangeEnd: !0
		});
		if (o.type === "Character" && e.type === "Character") return a.body.pop(), Za(o, e);
		throw Error("Invalid character class range");
	}
	return Ya(P("-"));
}
function Ba({ negate: e }, t, n) {
	let { tokens: r, walk: i } = t, a = [Xa()], o = r[t.nextIndex], s = go(o);
	for (; s.type !== "CharacterClassClose";) {
		if (s.type === "CharacterClassIntersector") a.push(Xa()), t.nextIndex++;
		else {
			let e = a.at(-1);
			e.body.push(i(e, n));
		}
		s = go(r[t.nextIndex], o);
	}
	let c = Xa({ negate: e });
	return a.length === 1 ? c.body = a[0].body : (c.kind = "intersection", c.body = a.map((e) => e.body.length === 1 ? e.body[0] : e)), t.nextIndex++, c;
}
function Va({ kind: e, negate: t, value: n }, r) {
	let { normalizeUnknownPropertyNames: i, skipPropertyNameValidation: a, unicodePropertyMap: o } = r;
	if (e === "property") {
		let r = ho(n);
		if (Xi.has(r) && !o?.has(r)) e = "posix", n = r;
		else return oo(n, {
			negate: t,
			normalizeUnknownPropertyNames: i,
			skipPropertyNameValidation: a,
			unicodePropertyMap: o
		});
	}
	return e === "posix" ? no(n, { negate: t }) : Qa(e, { negate: t });
}
function Ha(e, t, n) {
	let { tokens: r, capturingGroups: i, namedGroupsByName: a, skipLookbehindValidation: o, walk: s } = t, c = so(e), l = c.type === "AbsenceFunction", u = fo(c), d = u && c.negate;
	if (c.type === "CapturingGroup" && (i.push(c), c.name && Yi(a, c.name, []).push(c)), l && n.isInAbsenceFunction) throw Error("Nested absence function not supported by Oniguruma");
	let f = _o(r[t.nextIndex]);
	for (; f.type !== "GroupClose";) {
		if (f.type === "Alternator") c.body.push(B()), t.nextIndex++;
		else {
			let e = c.body.at(-1), t = s(e, {
				...n,
				isInAbsenceFunction: n.isInAbsenceFunction || l,
				isInLookbehind: n.isInLookbehind || u,
				isInNegLookbehind: n.isInNegLookbehind || d
			});
			if (e.body.push(t), (u || n.isInLookbehind) && !o) {
				let e = "Lookbehind includes a pattern not allowed by Oniguruma";
				if (d || n.isInNegLookbehind) {
					if (uo(t) || t.type === "CapturingGroup") throw Error(e);
				} else if (uo(t) || fo(t) && t.negate) throw Error(e);
			}
		}
		f = _o(r[t.nextIndex]);
	}
	return t.nextIndex++, c;
}
function Ua({ kind: e, min: t, max: n }, r) {
	let i = r.parent, a = i.body.at(-1);
	if (!a || !Pa(a)) throw Error("Quantifier requires a repeatable token");
	let o = ro(e, t, n, a);
	return i.body.pop(), o;
}
function Wa({ raw: e }, t) {
	let { capturingGroups: n, subroutines: r } = t, i = e.slice(3, -1), a = /^(?<sign>[-+]?)0*(?<num>[1-9]\d*)$/.exec(i);
	if (a) {
		let e = +a.groups.num, r = n.length;
		if (t.hasNumberedRef = !0, i = {
			"": e,
			"+": r + e,
			"-": r + 1 - e
		}[a.groups.sign], i < 1) throw Error("Invalid subroutine number");
	} else i === "0" && (i = 0);
	let o = ao(i);
	return r.push(o), o;
}
function Ga(e, t) {
	if (e !== "repeater") throw Error(`Unexpected absence function kind "${e}"`);
	return {
		type: "AbsenceFunction",
		kind: e,
		body: co(t?.body)
	};
}
function B(e) {
	return {
		type: "Alternative",
		body: lo(e?.body)
	};
}
function Ka(e, t) {
	let n = {
		type: "Assertion",
		kind: e
	};
	return (e === "word_boundary" || e === "text_segment_boundary") && (n.negate = !!t?.negate), n;
}
function qa(e, t) {
	let n = !!t?.orphan;
	return {
		type: "Backreference",
		ref: e,
		...n && { orphan: n }
	};
}
function Ja(e, t) {
	let n = {
		name: void 0,
		isSubroutined: !1,
		...t
	};
	if (n.name !== void 0 && !po(n.name)) throw Error(`Group name "${n.name}" invalid in Oniguruma`);
	return {
		type: "CapturingGroup",
		number: e,
		...n.name && { name: n.name },
		...n.isSubroutined && { isSubroutined: n.isSubroutined },
		body: co(t?.body)
	};
}
function Ya(e, t) {
	let n = {
		useLastValid: !1,
		...t
	};
	if (e > 1114111) {
		let t = e.toString(16);
		if (n.useLastValid) e = 1114111;
		else throw Error(e > 1310719 ? `Invalid code point out of range "\\x{${t}}"` : `Invalid code point out of range in JS "\\x{${t}}"`);
	}
	return {
		type: "Character",
		value: e
	};
}
function Xa(e) {
	let t = {
		kind: "union",
		negate: !1,
		...e
	};
	return {
		type: "CharacterClass",
		kind: t.kind,
		negate: t.negate,
		body: lo(e?.body)
	};
}
function Za(e, t) {
	if (t.value < e.value) throw Error("Character class range out of order");
	return {
		type: "CharacterClassRange",
		min: e,
		max: t
	};
}
function Qa(e, t) {
	let n = !!t?.negate, r = {
		type: "CharacterSet",
		kind: e
	};
	return (e === "digit" || e === "hex" || e === "newline" || e === "space" || e === "word") && (r.negate = n), (e === "text_segment" || e === "newline" && !n) && (r.variableLength = !0), r;
}
function $a(e, t = {}) {
	if (e === "keep") return {
		type: "Directive",
		kind: e
	};
	if (e === "flags") return {
		type: "Directive",
		kind: e,
		flags: I(t.flags)
	};
	throw Error(`Unexpected directive kind "${e}"`);
}
function eo(e) {
	return {
		type: "Flags",
		...e
	};
}
function V(e) {
	let t = e?.atomic, n = e?.flags;
	if (t && n) throw Error("Atomic group cannot have flags");
	return {
		type: "Group",
		...t && { atomic: t },
		...n && { flags: n },
		body: co(e?.body)
	};
}
function H(e) {
	let t = {
		behind: !1,
		negate: !1,
		...e
	};
	return {
		type: "LookaroundAssertion",
		kind: t.behind ? "lookbehind" : "lookahead",
		negate: t.negate,
		body: co(e?.body)
	};
}
function to(e, t, n) {
	return {
		type: "NamedCallout",
		kind: e,
		tag: t,
		arguments: n
	};
}
function no(e, t) {
	let n = !!t?.negate;
	if (!Xi.has(e)) throw Error(`Invalid POSIX class "${e}"`);
	return {
		type: "CharacterSet",
		kind: "posix",
		value: e,
		negate: n
	};
}
function ro(e, t, n, r) {
	if (t > n) throw Error("Invalid reversed quantifier range");
	return {
		type: "Quantifier",
		kind: e,
		min: t,
		max: n,
		body: r
	};
}
function io(e, t) {
	return {
		type: "Regex",
		body: co(t?.body),
		flags: e
	};
}
function ao(e) {
	return {
		type: "Subroutine",
		ref: e
	};
}
function oo(e, t) {
	let n = {
		negate: !1,
		normalizeUnknownPropertyNames: !1,
		skipPropertyNameValidation: !1,
		unicodePropertyMap: null,
		...t
	}, r = n.unicodePropertyMap?.get(ho(e));
	if (!r) {
		if (n.normalizeUnknownPropertyNames) r = mo(e);
		else if (n.unicodePropertyMap && !n.skipPropertyNameValidation) throw Error(F`Invalid Unicode property "\p{${e}}"`);
	}
	return {
		type: "CharacterSet",
		kind: "property",
		value: r ?? e,
		negate: n.negate
	};
}
function so({ flags: e, kind: t, name: n, negate: r, number: i }) {
	switch (t) {
		case "absence_repeater": return Ga("repeater");
		case "atomic": return V({ atomic: !0 });
		case "capturing": return Ja(i, { name: n });
		case "group": return V({ flags: e });
		case "lookahead":
		case "lookbehind": return H({
			behind: t === "lookbehind",
			negate: r
		});
		default: throw Error(`Unexpected group kind "${t}"`);
	}
}
function co(e) {
	if (e === void 0) e = [B()];
	else if (!Array.isArray(e) || !e.length || !e.every((e) => e.type === "Alternative")) throw Error("Invalid body; expected array of one or more Alternative nodes");
	return e;
}
function lo(e) {
	if (e === void 0) e = [];
	else if (!Array.isArray(e) || !e.every((e) => !!e.type)) throw Error("Invalid body; expected array of nodes");
	return e;
}
function uo(e) {
	return e.type === "LookaroundAssertion" && e.kind === "lookahead";
}
function fo(e) {
	return e.type === "LookaroundAssertion" && e.kind === "lookbehind";
}
function po(e) {
	return /^[\p{Alpha}\p{Pc}][^)]*$/u.test(e);
}
function mo(e) {
	return e.trim().replace(/[- _]+/g, "_").replace(/[A-Z][a-z]+(?=[A-Z])/g, "$&_").replace(/[A-Za-z]+/g, (e) => e[0].toUpperCase() + e.slice(1).toLowerCase());
}
function ho(e) {
	return e.replace(/[- _]+/g, "").toLowerCase();
}
function go(e, t) {
	let n = t;
	return I(e, `Unclosed character class${n?.type === "Character" && n.value === 93 && n.raw === "]" ? " (started with \"]\")" : ""}`);
}
function _o(e) {
	return I(e, "Unclosed group");
}
//#endregion
//#region ../../node_modules/oniguruma-parser/dist/traverser/traverse.js
function vo(e, t, n = null) {
	function r(e, t) {
		for (let n = 0; n < e.length; n++) {
			let r = i(e[n], t, n, e);
			n = Math.max(-1, n + r);
		}
	}
	function i(a, o = null, s = null, c = null) {
		let l = 0, u = !1, d = {
			node: a,
			parent: o,
			key: s,
			container: c,
			root: e,
			remove() {
				yo(c).splice(Math.max(0, bo(s) + l), 1), l--, u = !0;
			},
			removeAllNextSiblings() {
				return yo(c).splice(bo(s) + 1);
			},
			removeAllPrevSiblings() {
				let e = bo(s) + l;
				return l -= e, yo(c).splice(0, Math.max(0, e));
			},
			replaceWith(e, t = {}) {
				let n = !!t.traverse;
				c ? c[Math.max(0, bo(s) + l)] = e : I(o, "Can't replace root node")[s] = e, n && i(e, o, s, c), u = !0;
			},
			replaceWithMultiple(e, t = {}) {
				let n = !!t.traverse;
				if (yo(c).splice(Math.max(0, bo(s) + l), 1, ...e), l += e.length - 1, n) {
					let t = 0;
					for (let n = 0; n < e.length; n++) t += i(e[n], o, bo(s) + n + t, c);
				}
				u = !0;
			},
			skip() {
				u = !0;
			}
		}, { type: f } = a, p = t["*"], m = t[f], h = typeof p == "function" ? p : p?.enter, g = typeof m == "function" ? m : m?.enter;
		if (h?.(d, n), g?.(d, n), !u) switch (f) {
			case "AbsenceFunction":
			case "Alternative":
			case "CapturingGroup":
			case "CharacterClass":
			case "Group":
			case "LookaroundAssertion":
				r(a.body, a);
				break;
			case "Assertion":
			case "Backreference":
			case "Character":
			case "CharacterSet":
			case "Directive":
			case "Flags":
			case "NamedCallout":
			case "Subroutine": break;
			case "CharacterClassRange":
				i(a.min, a, "min"), i(a.max, a, "max");
				break;
			case "Quantifier":
				i(a.body, a, "body");
				break;
			case "Regex":
				r(a.body, a), i(a.flags, a, "flags");
				break;
			default: throw Error(`Unexpected node type "${f}"`);
		}
		return m?.exit?.(d, n), p?.exit?.(d, n), l;
	}
	return i(e), e;
}
function yo(e) {
	if (!Array.isArray(e)) throw Error("Container expected");
	return e;
}
function bo(e) {
	if (typeof e != "number") throw Error("Numeric key expected");
	return e;
}
//#endregion
//#region ../../node_modules/regex/src/utils-internals.js
var xo = String.raw`\(\?(?:[:=!>A-Za-z\-]|<[=!]|\(DEFINE\))`;
function So(e, t) {
	for (let n = 0; n < e.length; n++) e[n] >= t && e[n]++;
}
function Co(e, t, n, r) {
	return e.slice(0, t) + r + e.slice(t + n.length);
}
//#endregion
//#region ../../node_modules/regex-utilities/src/index.js
var U = Object.freeze({
	DEFAULT: "DEFAULT",
	CHAR_CLASS: "CHAR_CLASS"
});
function wo(e, t, n, r) {
	let i = new RegExp(String.raw`${t}|(?<$skip>\[\^?|\\?.)`, "gsu"), a = [!1], o = 0, s = "";
	for (let t of e.matchAll(i)) {
		let { 0: e, groups: { $skip: i } } = t;
		if (!i && (!r || r === U.DEFAULT == !o)) {
			n instanceof Function ? s += n(t, {
				context: o ? U.CHAR_CLASS : U.DEFAULT,
				negated: a[a.length - 1]
			}) : s += n;
			continue;
		}
		e[0] === "[" ? (o++, a.push(e[1] === "^")) : e === "]" && o && (o--, a.pop()), s += e;
	}
	return s;
}
function To(e, t, n, r) {
	wo(e, t, n, r);
}
function Eo(e, t, n = 0, r) {
	if (!new RegExp(t, "su").test(e)) return null;
	let i = RegExp(`${t}|(?<$skip>\\\\?.)`, "gsu");
	i.lastIndex = n;
	let a = 0, o;
	for (; o = i.exec(e);) {
		let { 0: e, groups: { $skip: t } } = o;
		if (!t && (!r || r === U.DEFAULT == !a)) return o;
		e === "[" ? a++ : e === "]" && a && a--, i.lastIndex == o.index && i.lastIndex++;
	}
	return null;
}
function Do(e, t, n) {
	return !!Eo(e, t, 0, n);
}
function Oo(e, t) {
	let n = /\\?./gsu;
	n.lastIndex = t;
	let r = e.length, i = 0, a = 1, o;
	for (; o = n.exec(e);) {
		let [e] = o;
		if (e === "[") i++;
		else if (i) e === "]" && i--;
		else if (e === "(") a++;
		else if (e === ")" && (a--, !a)) {
			r = o.index;
			break;
		}
	}
	return e.slice(t, r);
}
//#endregion
//#region ../../node_modules/regex/src/atomic.js
var ko = new RegExp(String.raw`(?<noncapturingStart>${xo})|(?<capturingStart>\((?:\?<[^>]+>)?)|\\?.`, "gsu");
function Ao(e, t) {
	let n = t?.hiddenCaptures ?? [], r = t?.captureTransfers ?? /* @__PURE__ */ new Map();
	if (!/\(\?>/.test(e)) return {
		pattern: e,
		captureTransfers: r,
		hiddenCaptures: n
	};
	let i = [0], a = [], o = 0, s = 0, c = NaN, l;
	do {
		l = !1;
		let t = 0, u = 0, d = !1, f;
		for (ko.lastIndex = Number.isNaN(c) ? 0 : c + 7; f = ko.exec(e);) {
			let { 0: p, index: m, groups: { capturingStart: h, noncapturingStart: g } } = f;
			if (p === "[") t++;
			else if (t) p === "]" && t--;
			else if (p === "(?>" && !d) c = m, d = !0;
			else if (d && g) u++;
			else if (h) d ? u++ : (o++, i.push(o + s));
			else if (p === ")" && d) {
				if (!u) {
					s++;
					let t = o + s;
					if (e = `${e.slice(0, c)}(?:(?=(${e.slice(c + 3, m)}))<$$${t}>)${e.slice(m + 1)}`, l = !0, a.push(t), So(n, t), r.size) {
						let e = /* @__PURE__ */ new Map();
						r.forEach((n, r) => {
							e.set(r >= t ? r + 1 : r, n.map((e) => e >= t ? e + 1 : e));
						}), r = e;
					}
					break;
				}
				u--;
			}
		}
	} while (l);
	return n.push(...a), e = wo(e, String.raw`\\(?<backrefNum>[1-9]\d*)|<\$\$(?<wrappedBackrefNum>\d+)>`, ({ 0: e, groups: { backrefNum: t, wrappedBackrefNum: n } }) => {
		if (t) {
			let n = +t;
			if (n > i.length - 1) throw Error(`Backref "${e}" greater than number of captures`);
			return `\\${i[n]}`;
		}
		return `\\${n}`;
	}, U.DEFAULT), {
		pattern: e,
		captureTransfers: r,
		hiddenCaptures: n
	};
}
var jo = String.raw`(?:[?*+]|\{\d+(?:,\d*)?\})`, Mo = new RegExp(String.raw`
\\(?: \d+
  | c[A-Za-z]
  | [gk]<[^>]+>
  | [pPu]\{[^\}]+\}
  | u[A-Fa-f\d]{4}
  | x[A-Fa-f\d]{2}
  )
| \((?: \? (?: [:=!>]
  | <(?:[=!]|[^>]+>)
  | [A-Za-z\-]+:
  | \(DEFINE\)
  ))?
| (?<qBase>${jo})(?<qMod>[?+]?)(?<invalidQ>[?*+\{]?)
| \\?.
`.replace(/\s+/g, ""), "gsu");
function No(e) {
	if (!RegExp(`${jo}\\+`).test(e)) return { pattern: e };
	let t = [], n = null, r = null, i = "", a = 0, o;
	for (Mo.lastIndex = 0; o = Mo.exec(e);) {
		let { 0: s, index: c, groups: { qBase: l, qMod: u, invalidQ: d } } = o;
		if (s === "[") a || (r = c), a++;
		else if (s === "]") a ? a-- : r = null;
		else if (!a) if (u === "+" && i && !i.startsWith("(")) {
			if (d) throw Error(`Invalid quantifier "${s}"`);
			let t = -1;
			if (/^\{\d+\}$/.test(l)) e = Co(e, c + l.length, u, "");
			else {
				if (i === ")" || i === "]") {
					let t = i === ")" ? n : r;
					if (t === null) throw Error(`Invalid unmatched "${i}"`);
					e = `${e.slice(0, t)}(?>${e.slice(t, c)}${l})${e.slice(c + s.length)}`;
				} else e = `${e.slice(0, c - i.length)}(?>${i}${l})${e.slice(c + s.length)}`;
				t += 4;
			}
			Mo.lastIndex += t;
		} else s[0] === "(" ? t.push(c) : s === ")" && (n = t.length ? t.pop() : null);
		i = s;
	}
	return { pattern: e };
}
//#endregion
//#region ../../node_modules/regex-recursion/src/index.js
var W = String.raw, Po = W`\(\?R=(?<rDepth>[^\)]+)\)|${W`\\g<(?<gRNameOrNum>[^>&]+)&R=(?<gRDepth>[^>]+)>`}`, Fo = W`\(\?<(?![=!])(?<captureName>[^>]+)>`, Io = W`${Fo}|(?<unnamed>\()(?!\?)`, G = new RegExp(W`${Fo}|${Po}|\(\?|\\?.`, "gsu"), Lo = "Cannot use multiple overlapping recursions";
function Ro(e, t) {
	let { hiddenCaptures: n, mode: r } = {
		hiddenCaptures: [],
		mode: "plugin",
		...t
	}, i = t?.captureTransfers ?? /* @__PURE__ */ new Map();
	if (!new RegExp(Po, "su").test(e)) return {
		pattern: e,
		captureTransfers: i,
		hiddenCaptures: n
	};
	if (r === "plugin" && Do(e, W`\(\?\(DEFINE\)`, U.DEFAULT)) throw Error("DEFINE groups cannot be used with recursion");
	let a = [], o = Do(e, W`\\[1-9]`, U.DEFAULT), s = /* @__PURE__ */ new Map(), c = [], l = !1, u = 0, d = 0, f;
	for (G.lastIndex = 0; f = G.exec(e);) {
		let { 0: t, groups: { captureName: p, rDepth: m, gRNameOrNum: h, gRDepth: g } } = f;
		if (t === "[") u++;
		else if (u) t === "]" && u--;
		else if (m) {
			if (zo(m), l) throw Error(Lo);
			if (o) throw Error(`${r === "external" ? "Backrefs" : "Numbered backrefs"} cannot be used with global recursion`);
			let t = e.slice(0, f.index), s = e.slice(G.lastIndex);
			if (Do(s, Po, U.DEFAULT)) throw Error(Lo);
			let c = m - 1;
			e = Bo(t, s, c, !1, n, a, d), i = Uo(i, t, c, a.length, 0, d);
			break;
		} else if (h) {
			zo(g);
			let u = !1;
			for (let e of c) if (e.name === h || e.num === +h) {
				if (u = !0, e.hasRecursedWithin) throw Error(Lo);
				break;
			}
			if (!u) throw Error(W`Recursive \g cannot be used outside the referenced group "${r === "external" ? h : W`\g<${h}&R=${g}>`}"`);
			let p = s.get(h), m = Oo(e, p);
			if (o && Do(m, W`${Fo}|\((?!\?)`, U.DEFAULT)) throw Error(`${r === "external" ? "Backrefs" : "Numbered backrefs"} cannot be used with recursion of capturing groups`);
			let _ = e.slice(p, f.index), v = m.slice(_.length + t.length), ee = a.length, te = g - 1, ne = Bo(_, v, te, !0, n, a, d);
			i = Uo(i, _, te, a.length - ee, ee, d), e = `${e.slice(0, p)}${ne}${e.slice(p + m.length)}`, G.lastIndex += ne.length - t.length - _.length - v.length, c.forEach((e) => e.hasRecursedWithin = !0), l = !0;
		} else if (p) d++, s.set(String(d), G.lastIndex), s.set(p, G.lastIndex), c.push({
			num: d,
			name: p
		});
		else if (t[0] === "(") {
			let e = t === "(";
			e && (d++, s.set(String(d), G.lastIndex)), c.push(e ? { num: d } : {});
		} else t === ")" && c.pop();
	}
	return n.push(...a), {
		pattern: e,
		captureTransfers: i,
		hiddenCaptures: n
	};
}
function zo(e) {
	let t = `Max depth must be integer between 2 and 100; used ${e}`;
	if (!/^[1-9]\d*$/.test(e) || (e = +e, e < 2 || e > 100)) throw Error(t);
}
function Bo(e, t, n, r, i, a, o) {
	let s = /* @__PURE__ */ new Set();
	r && To(e + t, Fo, ({ groups: { captureName: e } }) => {
		s.add(e);
	}, U.DEFAULT);
	let c = [
		n,
		r ? s : null,
		i,
		a,
		o
	];
	return `${e}${Vo(`(?:${e}`, "forward", ...c)}(?:)${Vo(`${t})`, "backward", ...c)}${t}`;
}
function Vo(e, t, n, r, i, a, o) {
	let s = (e) => t === "forward" ? e + 2 : n - e + 2 - 1, c = "";
	for (let t = 0; t < n; t++) {
		let n = s(t);
		c += wo(e, W`${Io}|\\k<(?<backref>[^>]+)>`, ({ 0: e, groups: { captureName: t, unnamed: s, backref: c } }) => {
			if (c && r && !r.has(c)) return e;
			let l = `_$${n}`;
			if (s || t) {
				let n = o + a.length + 1;
				return a.push(n), Ho(i, n), s ? e : `(?<${t}${l}>`;
			}
			return W`\k<${c}${l}>`;
		}, U.DEFAULT);
	}
	return c;
}
function Ho(e, t) {
	for (let n = 0; n < e.length; n++) e[n] >= t && e[n]++;
}
function Uo(e, t, n, r, i, a) {
	if (e.size && r) {
		let o = 0;
		To(t, Io, () => o++, U.DEFAULT);
		let s = a - o + i, c = /* @__PURE__ */ new Map();
		return e.forEach((e, t) => {
			let i = (r - o * n) / n, a = o * n, l = t > s + o ? t + r : t, u = [];
			for (let t of e) if (t <= s) u.push(t);
			else if (t > s + o + i) u.push(t + r);
			else if (t <= s + o) for (let e = 0; e <= n; e++) u.push(t + o * e);
			else for (let e = 0; e <= n; e++) u.push(t + a + i * e);
			c.set(l, u);
		}), c;
	}
	return e;
}
//#endregion
//#region ../../node_modules/oniguruma-to-es/dist/esm/index.js
var K = String.fromCodePoint, q = String.raw, J = {}, Wo = globalThis.RegExp;
J.flagGroups = (() => {
	try {
		new Wo("(?i:)");
	} catch {
		return !1;
	}
	return !0;
})(), J.unicodeSets = (() => {
	try {
		new Wo("[[]]", "v");
	} catch {
		return !1;
	}
	return !0;
})(), J.bugFlagVLiteralHyphenIsRange = J.unicodeSets ? (() => {
	try {
		new Wo(q`[\d\-a]`, "v");
	} catch {
		return !0;
	}
	return !1;
})() : !1, J.bugNestedClassIgnoresNegation = J.unicodeSets && new Wo("[[^a]]", "v").test("a");
function Go(e, { enable: t, disable: n }) {
	return {
		dotAll: !n?.dotAll && !!(t?.dotAll || e.dotAll),
		ignoreCase: !n?.ignoreCase && !!(t?.ignoreCase || e.ignoreCase)
	};
}
function Ko(e, t, n) {
	return e.has(t) || e.set(t, n), e.get(t);
}
function qo(e, t) {
	return Yo[e] >= Yo[t];
}
function Jo(e, t) {
	if (e == null) throw Error(t ?? "Value expected");
	return e;
}
var Yo = {
	ES2025: 2025,
	ES2024: 2024,
	ES2018: 2018
}, Xo = {
	auto: "auto",
	ES2025: "ES2025",
	ES2024: "ES2024",
	ES2018: "ES2018"
};
function Zo(e = {}) {
	if ({}.toString.call(e) !== "[object Object]") throw Error("Unexpected options");
	if (e.target !== void 0 && !Xo[e.target]) throw Error(`Unexpected target "${e.target}"`);
	let t = {
		accuracy: "default",
		avoidSubclass: !1,
		flags: "",
		global: !1,
		hasIndices: !1,
		lazyCompileLength: Infinity,
		target: "auto",
		verbose: !1,
		...e,
		rules: {
			allowOrphanBackrefs: !1,
			asciiWordBoundaries: !1,
			captureGroup: !1,
			recursionLimit: 20,
			singleline: !1,
			...e.rules
		}
	};
	return t.target === "auto" && (t.target = J.flagGroups ? "ES2025" : J.unicodeSets ? "ES2024" : "ES2018"), t;
}
var Qo = "[	-\r ]", $o = /* @__PURE__ */ new Set([K(304), K(305)]), Y = q`[\p{L}\p{M}\p{N}\p{Pc}]`;
function es(e) {
	if ($o.has(e)) return [e];
	let t = /* @__PURE__ */ new Set(), n = e.toLowerCase(), r = n.toUpperCase(), i = is.get(n), a = ns.get(n), o = rs.get(n);
	return [...r].length === 1 && t.add(r), o && t.add(o), i && t.add(i), t.add(n), a && t.add(a), [...t];
}
var ts = /* @__PURE__ */ new Map("C Other\nCc Control cntrl\nCf Format\nCn Unassigned\nCo Private_Use\nCs Surrogate\nL Letter\nLC Cased_Letter\nLl Lowercase_Letter\nLm Modifier_Letter\nLo Other_Letter\nLt Titlecase_Letter\nLu Uppercase_Letter\nM Mark Combining_Mark\nMc Spacing_Mark\nMe Enclosing_Mark\nMn Nonspacing_Mark\nN Number\nNd Decimal_Number digit\nNl Letter_Number\nNo Other_Number\nP Punctuation punct\nPc Connector_Punctuation\nPd Dash_Punctuation\nPe Close_Punctuation\nPf Final_Punctuation\nPi Initial_Punctuation\nPo Other_Punctuation\nPs Open_Punctuation\nS Symbol\nSc Currency_Symbol\nSk Modifier_Symbol\nSm Math_Symbol\nSo Other_Symbol\nZ Separator\nZl Line_Separator\nZp Paragraph_Separator\nZs Space_Separator\nASCII\nASCII_Hex_Digit AHex\nAlphabetic Alpha\nAny\nAssigned\nBidi_Control Bidi_C\nBidi_Mirrored Bidi_M\nCase_Ignorable CI\nCased\nChanges_When_Casefolded CWCF\nChanges_When_Casemapped CWCM\nChanges_When_Lowercased CWL\nChanges_When_NFKC_Casefolded CWKCF\nChanges_When_Titlecased CWT\nChanges_When_Uppercased CWU\nDash\nDefault_Ignorable_Code_Point DI\nDeprecated Dep\nDiacritic Dia\nEmoji\nEmoji_Component EComp\nEmoji_Modifier EMod\nEmoji_Modifier_Base EBase\nEmoji_Presentation EPres\nExtended_Pictographic ExtPict\nExtender Ext\nGrapheme_Base Gr_Base\nGrapheme_Extend Gr_Ext\nHex_Digit Hex\nIDS_Binary_Operator IDSB\nIDS_Trinary_Operator IDST\nID_Continue IDC\nID_Start IDS\nIdeographic Ideo\nJoin_Control Join_C\nLogical_Order_Exception LOE\nLowercase Lower\nMath\nNoncharacter_Code_Point NChar\nPattern_Syntax Pat_Syn\nPattern_White_Space Pat_WS\nQuotation_Mark QMark\nRadical\nRegional_Indicator RI\nSentence_Terminal STerm\nSoft_Dotted SD\nTerminal_Punctuation Term\nUnified_Ideograph UIdeo\nUppercase Upper\nVariation_Selector VS\nWhite_Space space\nXID_Continue XIDC\nXID_Start XIDS".split(/\s/).map((e) => [ho(e), e])), ns = /* @__PURE__ */ new Map([["s", K(383)], [K(383), "s"]]), rs = /* @__PURE__ */ new Map([
	[K(223), K(7838)],
	[K(107), K(8490)],
	[K(229), K(8491)],
	[K(969), K(8486)]
]), is = new Map([
	X(453),
	X(456),
	X(459),
	X(498),
	...ss(8072, 8079),
	...ss(8088, 8095),
	...ss(8104, 8111),
	X(8124),
	X(8140),
	X(8188)
]), as = /* @__PURE__ */ new Map([
	["alnum", q`[\p{Alpha}\p{Nd}]`],
	["alpha", q`\p{Alpha}`],
	["ascii", q`\p{ASCII}`],
	["blank", q`[\p{Zs}\t]`],
	["cntrl", q`\p{Cc}`],
	["digit", q`\p{Nd}`],
	["graph", q`[\P{space}&&\P{Cc}&&\P{Cn}&&\P{Cs}]`],
	["lower", q`\p{Lower}`],
	["print", q`[[\P{space}&&\P{Cc}&&\P{Cn}&&\P{Cs}]\p{Zs}]`],
	["punct", q`[\p{P}\p{S}]`],
	["space", q`\p{space}`],
	["upper", q`\p{Upper}`],
	["word", q`[\p{Alpha}\p{M}\p{Nd}\p{Pc}]`],
	["xdigit", q`\p{AHex}`]
]);
function os(e, t) {
	let n = [];
	for (let r = e; r <= t; r++) n.push(r);
	return n;
}
function X(e) {
	let t = K(e);
	return [t.toLowerCase(), t];
}
function ss(e, t) {
	return os(e, t).map((e) => X(e));
}
var cs = /* @__PURE__ */ new Set([
	"Lower",
	"Lowercase",
	"Upper",
	"Uppercase",
	"Ll",
	"Lowercase_Letter",
	"Lt",
	"Titlecase_Letter",
	"Lu",
	"Uppercase_Letter"
]);
function ls(e, t) {
	let n = {
		accuracy: "default",
		asciiWordBoundaries: !1,
		avoidSubclass: !1,
		bestEffortTarget: "ES2025",
		...t
	};
	ps(e);
	let r = {
		accuracy: n.accuracy,
		asciiWordBoundaries: n.asciiWordBoundaries,
		avoidSubclass: n.avoidSubclass,
		flagDirectivesByAlt: /* @__PURE__ */ new Map(),
		jsGroupNameMap: /* @__PURE__ */ new Map(),
		minTargetEs2024: qo(n.bestEffortTarget, "ES2024"),
		passedLookbehind: !1,
		strategy: null,
		subroutineRefMap: /* @__PURE__ */ new Map(),
		supportedGNodes: /* @__PURE__ */ new Set(),
		digitIsAscii: e.flags.digitIsAscii,
		spaceIsAscii: e.flags.spaceIsAscii,
		wordIsAscii: e.flags.wordIsAscii
	};
	vo(e, us, r);
	let i = {
		dotAll: e.flags.dotAll,
		ignoreCase: e.flags.ignoreCase
	}, a = {
		currentFlags: i,
		prevFlags: null,
		globalFlags: i,
		groupOriginByCopy: /* @__PURE__ */ new Map(),
		groupsByName: /* @__PURE__ */ new Map(),
		multiplexCapturesToLeftByRef: /* @__PURE__ */ new Map(),
		openRefs: /* @__PURE__ */ new Map(),
		reffedNodesByReferencer: /* @__PURE__ */ new Map(),
		subroutineRefMap: r.subroutineRefMap
	};
	return vo(e, ds, a), vo(e, fs, {
		groupsByName: a.groupsByName,
		highestOrphanBackref: 0,
		numCapturesToLeft: 0,
		reffedNodesByReferencer: a.reffedNodesByReferencer
	}), e._originMap = a.groupOriginByCopy, e._strategy = r.strategy, e;
}
var us = {
	AbsenceFunction({ node: e, parent: t, replaceWith: n }) {
		let { body: r, kind: i } = e;
		if (i === "repeater") {
			let e = V();
			e.body[0].body.push(H({
				negate: !0,
				body: r
			}), oo("Any"));
			let i = V();
			i.body[0].body.push(ro("greedy", 0, Infinity, e)), n($(i, t), { traverse: !0 });
		} else throw Error("Unsupported absence function \"(?~|\"");
	},
	Alternative: {
		enter({ node: e, parent: t, key: n }, { flagDirectivesByAlt: r }) {
			let i = e.body.filter((e) => e.kind === "flags");
			for (let e = n + 1; e < t.body.length; e++) {
				let n = t.body[e];
				Ko(r, n, []).push(...i);
			}
		},
		exit({ node: e }, { flagDirectivesByAlt: t }) {
			if (t.get(e)?.length) {
				let n = bs(t.get(e));
				if (n) {
					let t = V({ flags: n });
					t.body[0].body = e.body, e.body = [$(t, e)];
				}
			}
		}
	},
	Assertion({ node: e, parent: t, key: n, container: r, root: i, remove: a, replaceWith: o }, s) {
		let { kind: c, negate: l } = e, { asciiWordBoundaries: u, avoidSubclass: d, supportedGNodes: f, wordIsAscii: p } = s;
		if (c === "text_segment_boundary") throw Error(`Unsupported text segment boundary "\\${l ? "Y" : "y"}"`);
		if (c === "line_end") o($(H({ body: [B({ body: [Ka("string_end")] }), B({ body: [Ya(10)] })] }), t));
		else if (c === "line_start") o($(Z(q`(?<=\A|\n(?!\z))`, { skipLookbehindValidation: !0 }), t));
		else if (c === "search_start") if (f.has(e)) i.flags.sticky = !0, a();
		else {
			let e = r[n - 1];
			if (e && Es(e)) o($(H({ negate: !0 }), t));
			else if (d) throw Error(q`Uses "\G" in a way that requires a subclass`);
			else o(Q(Ka("string_start"), t)), s.strategy = "clip_search";
		}
		else if (!(c === "string_end" || c === "string_start")) if (c === "string_end_newline") o($(Z(q`(?=\n?\z)`), t));
		else if (c === "word_boundary") {
			if (!p && !u) {
				let e = `(?:(?<=${Y})(?!${Y})|(?<!${Y})(?=${Y}))`, n = `(?:(?<=${Y})(?=${Y})|(?<!${Y})(?!${Y}))`;
				o($(Z(l ? n : e), t));
			}
		} else throw Error(`Unexpected assertion kind "${c}"`);
	},
	Backreference({ node: e }, { jsGroupNameMap: t }) {
		let { ref: n } = e;
		typeof n == "string" && !Os(n) && (n = ys(n, t), e.ref = n);
	},
	CapturingGroup({ node: e }, { jsGroupNameMap: t, subroutineRefMap: n }) {
		let { name: r } = e;
		r && !Os(r) && (r = ys(r, t), e.name = r), n.set(e.number, e), r && n.set(r, e);
	},
	CharacterClassRange({ node: e, parent: t, replaceWith: n }) {
		t.kind === "intersection" && n($(Xa({ body: [e] }), t), { traverse: !0 });
	},
	CharacterSet({ node: e, parent: t, replaceWith: n }, { accuracy: r, minTargetEs2024: i, digitIsAscii: a, spaceIsAscii: o, wordIsAscii: s }) {
		let { kind: c, negate: l, value: u } = e;
		if (a && (c === "digit" || u === "digit")) {
			n(Q(Qa("digit", { negate: l }), t));
			return;
		}
		if (o && (c === "space" || u === "space")) {
			n($(ks(Z(Qo), l), t));
			return;
		}
		if (s && (c === "word" || u === "word")) {
			n(Q(Qa("word", { negate: l }), t));
			return;
		}
		if (c === "any") n(Q(oo("Any"), t));
		else if (c === "digit") n(Q(oo("Nd", { negate: l }), t));
		else if (c !== "dot") if (c === "text_segment") {
			if (r === "strict") throw Error(q`Use of "\X" requires non-strict accuracy`);
			let e = "\\p{Emoji}(?:\\p{EMod}|\\uFE0F\\u20E3?|[\\x{E0020}-\\x{E007E}]+\\x{E007F})?", a = q`\p{RI}{2}|${e}(?:\u200D${e})*`;
			n($(Z(q`(?>\r\n|${i ? q`\p{RGI_Emoji}` : a}|\P{M}\p{M}*)`, { skipPropertyNameValidation: !0 }), t));
		} else if (c === "hex") n(Q(oo("AHex", { negate: l }), t));
		else if (c === "newline") n($(Z(l ? "[^\n]" : "(?>\r\n?|[\n\v\f\u2028\u2029])"), t));
		else if (c === "posix") if (!i && (u === "graph" || u === "print")) {
			if (r === "strict") throw Error(`POSIX class "${u}" requires min target ES2024 or non-strict accuracy`);
			let e = {
				graph: "!-~",
				print: " -~"
			}[u];
			l && (e = `\0-${K(e.codePointAt(0) - 1)}${K(e.codePointAt(2) + 1)}-\u{10FFFF}`), n($(Z(`[${e}]`), t));
		} else n($(ks(Z(as.get(u)), l), t));
		else if (c === "property") ts.has(ho(u)) || (e.key = "sc");
		else if (c === "space") n(Q(oo("space", { negate: l }), t));
		else if (c === "word") n($(ks(Z(Y), l), t));
		else throw Error(`Unexpected character set kind "${c}"`);
	},
	Directive({ node: e, parent: t, root: n, remove: r, replaceWith: i, removeAllPrevSiblings: a, removeAllNextSiblings: o }) {
		let { kind: s, flags: c } = e;
		if (s === "flags") if (!c.enable && !c.disable) r();
		else {
			let e = V({ flags: c });
			e.body[0].body = o(), i($(e, t), { traverse: !0 });
		}
		else if (s === "keep") {
			let e = n.body[0], r = n.body.length === 1 && Na(e, { type: "Group" }) && e.body[0].body.length === 1 ? e.body[0] : n;
			if (t.parent !== r || r.body.length > 1) throw Error(q`Uses "\K" in a way that's unsupported`);
			let o = H({ behind: !0 });
			o.body[0].body = a(), i($(o, t));
		} else throw Error(`Unexpected directive kind "${s}"`);
	},
	Flags({ node: e, parent: t }) {
		if (e.posixIsAscii) throw Error("Unsupported flag \"P\"");
		if (e.textSegmentMode === "word") throw Error("Unsupported flag \"y{w}\"");
		[
			"digitIsAscii",
			"extended",
			"posixIsAscii",
			"spaceIsAscii",
			"wordIsAscii",
			"textSegmentMode"
		].forEach((t) => delete e[t]), Object.assign(e, {
			global: !1,
			hasIndices: !1,
			multiline: !1,
			sticky: e.sticky ?? !1
		}), t.options = {
			disable: {
				x: !0,
				n: !0
			},
			force: { v: !0 }
		};
	},
	Group({ node: e }) {
		if (!e.flags) return;
		let { enable: t, disable: n } = e.flags;
		t?.extended && delete t.extended, n?.extended && delete n.extended, t?.dotAll && n?.dotAll && delete t.dotAll, t?.ignoreCase && n?.ignoreCase && delete t.ignoreCase, t && !Object.keys(t).length && delete e.flags.enable, n && !Object.keys(n).length && delete e.flags.disable, !e.flags.enable && !e.flags.disable && delete e.flags;
	},
	LookaroundAssertion({ node: e }, t) {
		let { kind: n } = e;
		n === "lookbehind" && (t.passedLookbehind = !0);
	},
	NamedCallout({ node: e, parent: t, replaceWith: n }) {
		let { kind: r } = e;
		if (r === "fail") n($(H({ negate: !0 }), t));
		else throw Error(`Unsupported named callout "(*${r.toUpperCase()}"`);
	},
	Quantifier({ node: e }) {
		if (e.body.type === "Quantifier") {
			let t = V();
			t.body[0].body.push(e.body), e.body = $(t, e);
		}
	},
	Regex: {
		enter({ node: e }, { supportedGNodes: t }) {
			let n = [], r = !1, i = !1;
			for (let t of e.body) if (t.body.length === 1 && t.body[0].kind === "search_start") t.body.pop();
			else {
				let e = Cs(t.body);
				e ? (r = !0, Array.isArray(e) ? n.push(...e) : n.push(e)) : i = !0;
			}
			r && !i && n.forEach((e) => t.add(e));
		},
		exit(e, { accuracy: t, passedLookbehind: n, strategy: r }) {
			if (t === "strict" && n && r) throw Error(q`Uses "\G" in a way that requires non-strict accuracy`);
		}
	},
	Subroutine({ node: e }, { jsGroupNameMap: t }) {
		let { ref: n } = e;
		typeof n == "string" && !Os(n) && (n = ys(n, t), e.ref = n);
	}
}, ds = {
	Backreference({ node: e }, { multiplexCapturesToLeftByRef: t, reffedNodesByReferencer: n }) {
		let { orphan: r, ref: i } = e;
		r || n.set(e, [...t.get(i).map(({ node: e }) => e)]);
	},
	CapturingGroup: {
		enter({ node: e, parent: t, replaceWith: n, skip: r }, { groupOriginByCopy: i, groupsByName: a, multiplexCapturesToLeftByRef: o, openRefs: s, reffedNodesByReferencer: c }) {
			let l = i.get(e);
			if (l && s.has(e.number)) {
				let r = Q(_s(e.number), t);
				c.set(r, s.get(e.number)), n(r);
				return;
			}
			s.set(e.number, e), o.set(e.number, []), e.name && Ko(o, e.name, []);
			let u = o.get(e.name ?? e.number);
			for (let t = 0; t < u.length; t++) {
				let n = u[t];
				if (l === n.node || l && l === n.origin || e === n.origin) {
					u.splice(t, 1);
					break;
				}
			}
			if (o.get(e.number).push({
				node: e,
				origin: l
			}), e.name && o.get(e.name).push({
				node: e,
				origin: l
			}), e.name) {
				let t = Ko(a, e.name, /* @__PURE__ */ new Map()), n = !1;
				if (l) n = !0;
				else for (let e of t.values()) if (!e.hasDuplicateNameToRemove) {
					n = !0;
					break;
				}
				a.get(e.name).set(e, {
					node: e,
					hasDuplicateNameToRemove: n
				});
			}
		},
		exit({ node: e }, { openRefs: t }) {
			t.get(e.number) === e && t.delete(e.number);
		}
	},
	Group: {
		enter({ node: e }, t) {
			t.prevFlags = t.currentFlags, e.flags && (t.currentFlags = Go(t.currentFlags, e.flags));
		},
		exit(e, t) {
			t.currentFlags = t.prevFlags;
		}
	},
	Subroutine({ node: e, parent: t, replaceWith: n }, r) {
		let { isRecursive: i, ref: a } = e;
		if (i) {
			let n = t;
			for (; (n = n.parent) && !(n.type === "CapturingGroup" && (n.name === a || n.number === a)););
			r.reffedNodesByReferencer.set(e, n);
			return;
		}
		let o = r.subroutineRefMap.get(a), s = a === 0, c = s ? _s(0) : gs(o, r.groupOriginByCopy, null), l = c;
		if (!s) {
			let e = bs(vs(o, (e) => e.type === "Group" && !!e.flags)), t = e ? Go(r.globalFlags, e) : r.globalFlags;
			ms(t, r.currentFlags) || (l = V({ flags: xs(t) }), l.body[0].body.push(c));
		}
		n($(l, t), { traverse: !s });
	}
}, fs = {
	Backreference({ node: e, parent: t, replaceWith: n }, r) {
		if (e.orphan) {
			r.highestOrphanBackref = Math.max(r.highestOrphanBackref, e.ref);
			return;
		}
		let i = r.reffedNodesByReferencer.get(e).filter((t) => hs(t, e));
		i.length ? i.length > 1 ? n($(V({
			atomic: !0,
			body: i.reverse().map((e) => B({ body: [qa(e.number)] }))
		}), t)) : e.ref = i[0].number : n($(H({ negate: !0 }), t));
	},
	CapturingGroup({ node: e }, t) {
		e.number = ++t.numCapturesToLeft, e.name && t.groupsByName.get(e.name).get(e).hasDuplicateNameToRemove && delete e.name;
	},
	Regex: { exit({ node: e }, t) {
		let n = Math.max(t.highestOrphanBackref - t.numCapturesToLeft, 0);
		for (let t = 0; t < n; t++) {
			let t = Ja();
			e.body.at(-1).body.push(t);
		}
	} },
	Subroutine({ node: e }, t) {
		!e.isRecursive || e.ref === 0 || (e.ref = t.reffedNodesByReferencer.get(e).number);
	}
};
function ps(e) {
	vo(e, { "*"({ node: e, parent: t }) {
		e.parent = t;
	} });
}
function ms(e, t) {
	return e.dotAll === t.dotAll && e.ignoreCase === t.ignoreCase;
}
function hs(e, t) {
	let n = t;
	do {
		if (n.type === "Regex") return !1;
		if (n.type === "Alternative") continue;
		if (n === e) return !1;
		let t = Ss(n.parent);
		for (let r of t) {
			if (r === n) break;
			if (r === e || ws(r, e)) return !0;
		}
	} while (n = n.parent);
	throw Error("Unexpected path");
}
function gs(e, t, n, r) {
	let i = Array.isArray(e) ? [] : {};
	for (let [a, o] of Object.entries(e)) a === "parent" ? i.parent = Array.isArray(n) ? r : n : o && typeof o == "object" ? i[a] = gs(o, t, i, n) : (a === "type" && o === "CapturingGroup" && t.set(i, t.get(e) ?? e), i[a] = o);
	return i;
}
function _s(e) {
	let t = ao(e);
	return t.isRecursive = !0, t;
}
function vs(e, t) {
	let n = [];
	for (; e = e.parent;) (!t || t(e)) && n.push(e);
	return n;
}
function ys(e, t) {
	if (t.has(e)) return t.get(e);
	let n = `$${t.size}_${e.replace(/^[^$_\p{IDS}]|[^$\u200C\u200D\p{IDC}]/gu, "_")}`;
	return t.set(e, n), n;
}
function bs(e) {
	let t = ["dotAll", "ignoreCase"], n = {
		enable: {},
		disable: {}
	};
	return e.forEach(({ flags: e }) => {
		t.forEach((t) => {
			e.enable?.[t] && (delete n.disable[t], n.enable[t] = !0), e.disable?.[t] && (n.disable[t] = !0);
		});
	}), Object.keys(n.enable).length || delete n.enable, Object.keys(n.disable).length || delete n.disable, n.enable || n.disable ? n : null;
}
function xs({ dotAll: e, ignoreCase: t }) {
	let n = {};
	return (e || t) && (n.enable = {}, e && (n.enable.dotAll = !0), t && (n.enable.ignoreCase = !0)), (!e || !t) && (n.disable = {}, !e && (n.disable.dotAll = !0), !t && (n.disable.ignoreCase = !0)), n;
}
function Ss(e) {
	if (!e) throw Error("Node expected");
	let { body: t } = e;
	return Array.isArray(t) ? t : t ? [t] : null;
}
function Cs(e) {
	let t = e.find((e) => e.kind === "search_start" || Ds(e, { negate: !1 }) || !Ts(e));
	if (!t) return null;
	if (t.kind === "search_start") return t;
	if (t.type === "LookaroundAssertion") return t.body[0].body[0];
	if (t.type === "CapturingGroup" || t.type === "Group") {
		let e = [];
		for (let n of t.body) {
			let t = Cs(n.body);
			if (!t) return null;
			Array.isArray(t) ? e.push(...t) : e.push(t);
		}
		return e;
	}
	return null;
}
function ws(e, t) {
	let n = Ss(e) ?? [];
	for (let e of n) if (e === t || ws(e, t)) return !0;
	return !1;
}
function Ts({ type: e }) {
	return e === "Assertion" || e === "Directive" || e === "LookaroundAssertion";
}
function Es(e) {
	let t = [
		"Character",
		"CharacterClass",
		"CharacterSet"
	];
	return t.includes(e.type) || e.type === "Quantifier" && e.min && t.includes(e.body.type);
}
function Ds(e, t) {
	let n = {
		negate: null,
		...t
	};
	return e.type === "LookaroundAssertion" && (n.negate === null || e.negate === n.negate) && e.body.length === 1 && Na(e.body[0], {
		type: "Assertion",
		kind: "search_start"
	});
}
function Os(e) {
	return /^[$_\p{IDS}][$\u200C\u200D\p{IDC}]*$/u.test(e);
}
function Z(e, t) {
	let n = Ia(e, {
		...t,
		unicodePropertyMap: ts
	}).body;
	return n.length > 1 || n[0].body.length > 1 ? V({ body: n }) : n[0].body[0];
}
function ks(e, t) {
	return e.negate = t, e;
}
function Q(e, t) {
	return e.parent = t, e;
}
function $(e, t) {
	return ps(e), e.parent = t, e;
}
function As(e, t) {
	let n = Zo(t), r = qo(n.target, "ES2024"), i = qo(n.target, "ES2025"), a = n.rules.recursionLimit;
	if (!Number.isInteger(a) || a < 2 || a > 20) throw Error("Invalid recursionLimit; use 2-20");
	let o = null, s = null;
	if (!i) {
		let t = [e.flags.ignoreCase];
		vo(e, js, {
			getCurrentModI: () => t.at(-1),
			popModI() {
				t.pop();
			},
			pushModI(e) {
				t.push(e);
			},
			setHasCasedChar() {
				t.at(-1) ? o = !0 : s = !0;
			}
		});
	}
	let c = {
		dotAll: e.flags.dotAll,
		ignoreCase: !!((e.flags.ignoreCase || o) && !s)
	}, l = e, u = {
		accuracy: n.accuracy,
		appliedGlobalFlags: c,
		captureMap: /* @__PURE__ */ new Map(),
		currentFlags: {
			dotAll: e.flags.dotAll,
			ignoreCase: e.flags.ignoreCase
		},
		inCharClass: !1,
		lastNode: l,
		originMap: e._originMap,
		recursionLimit: a,
		useAppliedIgnoreCase: !!(!i && o && s),
		useFlagMods: i,
		useFlagV: r,
		verbose: n.verbose
	};
	function d(e) {
		return u.lastNode = l, l = e, Jo(Ms[e.type], `Unexpected node type "${e.type}"`)(e, u, d);
	}
	let f = {
		pattern: e.body.map(d).join("|"),
		flags: d(e.flags),
		options: { ...e.options }
	};
	return r || (delete f.options.force.v, f.options.disable.v = !0, f.options.unicodeSetsPlugin = null), f._captureTransfers = /* @__PURE__ */ new Map(), f._hiddenCaptures = [], u.captureMap.forEach((e, t) => {
		e.hidden && f._hiddenCaptures.push(t), e.transferTo && Ko(f._captureTransfers, e.transferTo, []).push(t);
	}), f;
}
var js = {
	"*": {
		enter({ node: e }, t) {
			if (Ws(e)) {
				let n = t.getCurrentModI();
				t.pushModI(e.flags ? Go({ ignoreCase: n }, e.flags).ignoreCase : n);
			}
		},
		exit({ node: e }, t) {
			Ws(e) && t.popModI();
		}
	},
	Backreference(e, t) {
		t.setHasCasedChar();
	},
	Character({ node: e }, t) {
		Rs(K(e.value)) && t.setHasCasedChar();
	},
	CharacterClassRange({ node: e, skip: t }, n) {
		t(), zs(e, { firstOnly: !0 }).length && n.setHasCasedChar();
	},
	CharacterSet({ node: e }, t) {
		e.kind === "property" && cs.has(e.value) && t.setHasCasedChar();
	}
}, Ms = {
	Alternative({ body: e }, t, n) {
		return e.map(n).join("");
	},
	Assertion({ kind: e, negate: t }) {
		if (e === "string_end") return "$";
		if (e === "string_start") return "^";
		if (e === "word_boundary") return t ? q`\B` : q`\b`;
		throw Error(`Unexpected assertion kind "${e}"`);
	},
	Backreference({ ref: e }, t) {
		if (typeof e != "number") throw Error("Unexpected named backref in transformed AST");
		if (!t.useFlagMods && t.accuracy === "strict" && t.currentFlags.ignoreCase && !t.captureMap.get(e).ignoreCase) throw Error("Use of case-insensitive backref to case-sensitive group requires target ES2025 or non-strict accuracy");
		return "\\" + e;
	},
	CapturingGroup(e, t, n) {
		let { body: r, name: i, number: a } = e, o = { ignoreCase: t.currentFlags.ignoreCase }, s = t.originMap.get(e);
		return s && (o.hidden = !0, a > s.number && (o.transferTo = s.number)), t.captureMap.set(a, o), `(${i ? `?<${i}>` : ""}${r.map(n).join("|")})`;
	},
	Character({ value: e }, t) {
		let n = K(e), r = Bs(e, {
			escDigit: t.lastNode.type === "Backreference",
			inCharClass: t.inCharClass,
			useFlagV: t.useFlagV
		});
		if (r !== n) return r;
		if (t.useAppliedIgnoreCase && t.currentFlags.ignoreCase && Rs(n)) {
			let e = es(n);
			return t.inCharClass ? e.join("") : e.length > 1 ? `[${e.join("")}]` : e[0];
		}
		return n;
	},
	CharacterClass(e, t, n) {
		let { kind: r, negate: i, parent: a } = e, { body: o } = e;
		if (r === "intersection" && !t.useFlagV) throw Error("Use of character class intersection requires min target ES2024");
		J.bugFlagVLiteralHyphenIsRange && t.useFlagV && o.some(Ks) && (o = [Ya(45), ...o.filter((e) => !Ks(e))]);
		let s = () => `[${i ? "^" : ""}${o.map(n).join(r === "intersection" ? "&&" : "")}]`;
		if (!t.inCharClass) {
			if ((!t.useFlagV || J.bugNestedClassIgnoresNegation) && !i) {
				let t = o.filter((e) => e.type === "CharacterClass" && e.kind === "union" && e.negate);
				if (t.length) {
					let r = V(), i = r.body[0];
					return r.parent = a, i.parent = r, o = o.filter((e) => !t.includes(e)), e.body = o, o.length ? (e.parent = i, i.body.push(e)) : r.body.pop(), t.forEach((e) => {
						let t = B({ body: [e] });
						e.parent = t, t.parent = r, r.body.push(t);
					}), n(r);
				}
			}
			t.inCharClass = !0;
			let r = s();
			return t.inCharClass = !1, r;
		}
		let c = o[0];
		if (r === "union" && !i && c && ((!t.useFlagV || !t.verbose) && a.kind === "union" && !(J.bugFlagVLiteralHyphenIsRange && t.useFlagV) || !t.verbose && a.kind === "intersection" && o.length === 1 && c.type !== "CharacterClassRange")) return o.map(n).join("");
		if (!t.useFlagV && a.type === "CharacterClass") throw Error("Uses nested character class in a way that requires min target ES2024");
		return s();
	},
	CharacterClassRange(e, t) {
		let n = e.min.value, r = e.max.value, i = {
			escDigit: !1,
			inCharClass: !0,
			useFlagV: t.useFlagV
		}, a = Bs(n, i), o = Bs(r, i), s = /* @__PURE__ */ new Set();
		return t.useAppliedIgnoreCase && t.currentFlags.ignoreCase && Vs(zs(e)).forEach((e) => {
			s.add(Array.isArray(e) ? `${Bs(e[0], i)}-${Bs(e[1], i)}` : Bs(e, i));
		}), `${a}-${o}${[...s].join("")}`;
	},
	CharacterSet({ kind: e, negate: t, value: n, key: r }, i) {
		if (e === "dot") return i.currentFlags.dotAll ? i.appliedGlobalFlags.dotAll || i.useFlagMods ? "." : "[^]" : q`[^\n]`;
		if (e === "digit") return t ? q`\D` : q`\d`;
		if (e === "property") {
			if (i.useAppliedIgnoreCase && i.currentFlags.ignoreCase && cs.has(n)) throw Error(`Unicode property "${n}" can't be case-insensitive when other chars have specific case`);
			return `${t ? q`\P` : q`\p`}{${r ? `${r}=` : ""}${n}}`;
		}
		if (e === "word") return t ? q`\W` : q`\w`;
		throw Error(`Unexpected character set kind "${e}"`);
	},
	Flags(e, t) {
		return (t.appliedGlobalFlags.ignoreCase ? "i" : "") + (e.dotAll ? "s" : "") + (e.sticky ? "y" : "");
	},
	Group({ atomic: e, body: t, flags: n, parent: r }, i, a) {
		let o = i.currentFlags;
		n && (i.currentFlags = Go(o, n));
		let s = t.map(a).join("|"), c = !i.verbose && t.length === 1 && r.type !== "Quantifier" && !e && (!i.useFlagMods || !n) ? s : `(?${Hs(e, n, i.useFlagMods)}${s})`;
		return i.currentFlags = o, c;
	},
	LookaroundAssertion({ body: e, kind: t, negate: n }, r, i) {
		return `(?${`${t === "lookahead" ? "" : "<"}${n ? "!" : "="}`}${e.map(i).join("|")})`;
	},
	Quantifier(e, t, n) {
		return n(e.body) + Us(e);
	},
	Subroutine({ isRecursive: e, ref: t }, n) {
		if (!e) throw Error("Unexpected non-recursive subroutine in transformed AST");
		let r = n.recursionLimit;
		return t === 0 ? `(?R=${r})` : q`\g<${t}&R=${r}>`;
	}
}, Ns = /* @__PURE__ */ new Set([
	"$",
	"(",
	")",
	"*",
	"+",
	".",
	"?",
	"[",
	"\\",
	"]",
	"^",
	"{",
	"|",
	"}"
]), Ps = /* @__PURE__ */ new Set([
	"-",
	"\\",
	"]",
	"^",
	"["
]), Fs = /* @__PURE__ */ new Set(/* @__PURE__ */ "()-/[\\]^{|}!#$%&*+,.:;<=>?@`~".split("")), Is = /* @__PURE__ */ new Map([
	[9, q`\t`],
	[10, q`\n`],
	[11, q`\v`],
	[12, q`\f`],
	[13, q`\r`],
	[8232, q`\u2028`],
	[8233, q`\u2029`],
	[65279, q`\uFEFF`]
]), Ls = /^\p{Cased}$/u;
function Rs(e) {
	return Ls.test(e);
}
function zs(e, t) {
	let n = !!t?.firstOnly, r = e.min.value, i = e.max.value, a = [];
	if (r < 65 && (i === 65535 || i >= 131071) || r === 65536 && i >= 131071) return a;
	for (let e = r; e <= i; e++) {
		let t = K(e);
		if (!Rs(t)) continue;
		let o = es(t).filter((e) => {
			let t = e.codePointAt(0);
			return t < r || t > i;
		});
		if (o.length && (a.push(...o), n)) break;
	}
	return a;
}
function Bs(e, { escDigit: t, inCharClass: n, useFlagV: r }) {
	if (Is.has(e)) return Is.get(e);
	if (e < 32 || e > 126 && e < 160 || e > 262143 || t && Gs(e)) return e > 255 ? `\\u{${e.toString(16).toUpperCase()}}` : `\\x${e.toString(16).toUpperCase().padStart(2, "0")}`;
	let i = n ? r ? Fs : Ps : Ns, a = K(e);
	return (i.has(a) ? "\\" : "") + a;
}
function Vs(e) {
	let t = e.map((e) => e.codePointAt(0)).sort((e, t) => e - t), n = [], r = null;
	for (let e = 0; e < t.length; e++) t[e + 1] === t[e] + 1 ? r ??= t[e] : r === null ? n.push(t[e]) : (n.push([r, t[e]]), r = null);
	return n;
}
function Hs(e, t, n) {
	if (e) return ">";
	let r = "";
	if (t && n) {
		let { enable: e, disable: n } = t;
		r = (e?.ignoreCase ? "i" : "") + (e?.dotAll ? "s" : "") + (n ? "-" : "") + (n?.ignoreCase ? "i" : "") + (n?.dotAll ? "s" : "");
	}
	return `${r}:`;
}
function Us({ kind: e, max: t, min: n }) {
	let r;
	return r = !n && t === 1 ? "?" : !n && t === Infinity ? "*" : n === 1 && t === Infinity ? "+" : n === t ? `{${n}}` : `{${n},${t === Infinity ? "" : t}}`, r + {
		greedy: "",
		lazy: "?",
		possessive: "+"
	}[e];
}
function Ws({ type: e }) {
	return e === "CapturingGroup" || e === "Group" || e === "LookaroundAssertion";
}
function Gs(e) {
	return e > 47 && e < 58;
}
function Ks({ type: e, value: t }) {
	return e === "Character" && t === 45;
}
var qs = class e extends RegExp {
	#e = /* @__PURE__ */ new Map();
	#t = null;
	#n;
	#r = null;
	#i = null;
	rawOptions = {};
	get source() {
		return this.#n || "(?:)";
	}
	constructor(t, n, r) {
		let i = !!r?.lazyCompile;
		if (t instanceof RegExp) {
			if (r) throw Error("Cannot provide options when copying a regexp");
			let i = t;
			super(i, n), this.#n = i.source, i instanceof e && (this.#e = i.#e, this.#r = i.#r, this.#i = i.#i, this.rawOptions = i.rawOptions);
		} else {
			let e = {
				hiddenCaptures: [],
				strategy: null,
				transfers: [],
				...r
			};
			super(i ? "" : t, n), this.#n = t, this.#e = Ys(e.hiddenCaptures, e.transfers), this.#i = e.strategy, this.rawOptions = r ?? {};
		}
		i || (this.#t = this);
	}
	exec(t) {
		if (!this.#t) {
			let { lazyCompile: t, ...n } = this.rawOptions;
			this.#t = new e(this.#n, this.flags, n);
		}
		let n = this.global || this.sticky, r = this.lastIndex;
		if (this.#i === "clip_search" && n && r) {
			this.lastIndex = 0;
			let e = this.#a(t.slice(r));
			return e && (Js(e, r, t, this.hasIndices), this.lastIndex += r), e;
		}
		return this.#a(t);
	}
	#a(e) {
		this.#t.lastIndex = this.lastIndex;
		let t = super.exec.call(this.#t, e);
		if (this.lastIndex = this.#t.lastIndex, !t || !this.#e.size) return t;
		let n = [...t];
		t.length = 1;
		let r;
		this.hasIndices && (r = [...t.indices], t.indices.length = 1);
		let i = [0];
		for (let e = 1; e < n.length; e++) {
			let { hidden: a, transferTo: o } = this.#e.get(e) ?? {};
			if (a ? i.push(null) : (i.push(t.length), t.push(n[e]), this.hasIndices && t.indices.push(r[e])), o && n[e] !== void 0) {
				let a = i[o];
				if (!a) throw Error(`Invalid capture transfer to "${a}"`);
				if (t[a] = n[e], this.hasIndices && (t.indices[a] = r[e]), t.groups) {
					this.#r ||= Xs(this.source);
					let i = this.#r.get(o);
					i && (t.groups[i] = n[e], this.hasIndices && (t.indices.groups[i] = r[e]));
				}
			}
		}
		return t;
	}
};
function Js(e, t, n, r) {
	if (e.index += t, e.input = n, r) {
		let n = e.indices;
		for (let e = 0; e < n.length; e++) {
			let r = n[e];
			r && (n[e] = [r[0] + t, r[1] + t]);
		}
		let r = n.groups;
		r && Object.keys(r).forEach((e) => {
			let n = r[e];
			n && (r[e] = [n[0] + t, n[1] + t]);
		});
	}
}
function Ys(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) n.set(t, { hidden: !0 });
	for (let [e, r] of t) for (let t of r) Ko(n, t, {}).transferTo = e;
	return n;
}
function Xs(e) {
	let t = /(?<capture>\((?:\?<(?![=!])(?<name>[^>]+)>|(?!\?)))|\\?./gsu, n = /* @__PURE__ */ new Map(), r = 0, i = 0, a;
	for (; a = t.exec(e);) {
		let { 0: e, groups: { capture: t, name: o } } = a;
		e === "[" ? r++ : r ? e === "]" && r-- : t && (i++, o && n.set(i, o));
	}
	return n;
}
function Zs(e, t) {
	let n = Qs(e, t);
	return n.options ? new qs(n.pattern, n.flags, n.options) : new RegExp(n.pattern, n.flags);
}
function Qs(e, t) {
	let n = Zo(t), r = ls(Ia(e, {
		flags: n.flags,
		normalizeUnknownPropertyNames: !0,
		rules: {
			captureGroup: n.rules.captureGroup,
			singleline: n.rules.singleline
		},
		skipBackrefValidation: n.rules.allowOrphanBackrefs,
		unicodePropertyMap: ts
	}), {
		accuracy: n.accuracy,
		asciiWordBoundaries: n.rules.asciiWordBoundaries,
		avoidSubclass: n.avoidSubclass,
		bestEffortTarget: n.target
	}), i = As(r, n), a = Ro(i.pattern, {
		captureTransfers: i._captureTransfers,
		hiddenCaptures: i._hiddenCaptures,
		mode: "external"
	}), o = Ao(No(a.pattern).pattern, {
		captureTransfers: a.captureTransfers,
		hiddenCaptures: a.hiddenCaptures
	}), s = {
		pattern: o.pattern,
		flags: `${n.hasIndices ? "d" : ""}${n.global ? "g" : ""}${i.flags}${i.options.disable.v ? "u" : "v"}`
	};
	if (n.avoidSubclass) {
		if (n.lazyCompileLength !== Infinity) throw Error("Lazy compilation requires subclass");
	} else {
		let e = o.hiddenCaptures.sort((e, t) => e - t), t = Array.from(o.captureTransfers), i = r._strategy, a = s.pattern.length >= n.lazyCompileLength;
		(e.length || t.length || i || a) && (s.options = {
			...e.length && { hiddenCaptures: e },
			...t.length && { transfers: t },
			...i && { strategy: i },
			...a && { lazyCompile: a }
		});
	}
	return s;
}
//#endregion
//#region ../../node_modules/@shikijs/engine-javascript/dist/engine-compile.mjs
function $s(e, t) {
	return Zs(e, {
		global: !0,
		hasIndices: !0,
		lazyCompileLength: 3e3,
		rules: {
			allowOrphanBackrefs: !0,
			asciiWordBoundaries: !0,
			captureGroup: !0,
			recursionLimit: 5,
			singleline: !0
		},
		...t
	});
}
function ec(e = {}) {
	let t = {
		target: "auto",
		cache: /* @__PURE__ */ new Map(),
		...e
	};
	return t.regexConstructor ||= (e) => $s(e, { target: t.target }), {
		createScanner(e) {
			return new Ji(e, t);
		},
		createString(e) {
			return { content: e };
		}
	};
}
//#endregion
//#region src/elements/highlight.ts
var tc = "github-dark-default", nc, rc = () => (nc ??= Ki({
	langs: [i],
	themes: [a],
	engine: ec()
}), nc), ic = async (e) => (await rc()).codeToHtml(e, {
	lang: "scss",
	theme: tc
});
//#endregion
export { ic as highlightSass };
