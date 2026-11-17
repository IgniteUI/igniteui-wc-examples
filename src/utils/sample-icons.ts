/**
 * sample-icons.ts
 *
 * Gives sample icons their theme-specific look while the docs host re-themes
 * this samples browser (see sample-theme.ts).
 *
 * Samples register and use their icons as usual. For each entry below, the
 * icon a sample uses is pointed at the icon Ignite UI bundles for the active
 * theme, through the same icon reference mechanism the components use for
 * their own icons. Outside the browser (exported or standalone samples) the
 * sample keeps its own icon.
 */

import type { IconMeta, setIconRef } from 'igniteui-webcomponents';

interface ThemeIcon extends IconMeta {
  // Theme name -> icon to show in that theme.
  themes: Record<string, IconMeta>;
}

// igniteui-webcomponents registers the icons its components use in the
// `internal` collection, with an `indigo_` prefix for the Indigo versions.
const THEME_ICONS: ThemeIcon[] = [
  {
    name: 'arrow_upward',
    collection: 'material',
    themes: {
      indigo: { name: 'indigo_arrow_upward', collection: 'internal' },
    },
  },
];

/**
 * `setIconRef` comes from the caller, which already loads igniteui-webcomponents
 * on demand, so this module doesn't pull it onto pages that never use it.
 */
export function applyThemeIcons(theme: string, setRef: typeof setIconRef): void {
  for (const { name, collection, themes } of THEME_ICONS) {
    // A reference can't be removed, so themes without an override point the
    // icon back at the one the sample registered.
    setRef(name, collection, themes[theme] ?? { name, collection });
  }
}
