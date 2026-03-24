/**
 * samples.ts — pure build-time helper utilities
 *
 * IMPORTANT: This file contains NO import.meta.glob calls.
 * All globs live in the .astro files where Astro's Vite plugin handles them.
 * This file only exports pure, stateless functions and types.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SampleInfo {
  /** e.g. "grids/grid/overview" */
  slug: string;
  /** e.g. "grids" */
  group: string;
  /** e.g. "grid" */
  component: string;
  /** e.g. "overview" */
  name: string;
  /** Humanised name, e.g. "Overview" */
  displayName: string;
  /** Humanised component name, e.g. "Grid" */
  componentName: string;
  /** Humanised group name, e.g. "Grids" */
  groupName: string;
}

export interface NavGroup {
  id: string;
  displayName: string;
  components: NavComponent[];
}

export interface NavComponent {
  id: string;
  displayName: string;
  samples: NavSample[];
}

export interface NavSample {
  name: string;
  displayName: string;
  slug: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert a kebab-case folder name to Title Case, e.g. "overview" → "Overview" */
export function toTitleCase(str: string): string {
  return str
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Extract the renderable body content from a sample's raw index.html string.
 * - Takes everything between <body>…</body>
 * - Strips the outer <div id="root"> that the standalone samples include
 */
export function extractSampleHtml(rawHtml: string): string {
  const bodyStart = rawHtml.indexOf('<body>');
  const bodyEnd   = rawHtml.lastIndexOf('</body>');
  let body = bodyStart >= 0 && bodyEnd > bodyStart
    ? rawHtml.slice(bodyStart + 6, bodyEnd).trim()
    : rawHtml;

  const rootIdx = body.indexOf('<div id="root">');
  if (rootIdx >= 0) {
    body = body.slice(rootIdx + '<div id="root">'.length);
    const closeIdx = body.lastIndexOf('</div>');
    if (closeIdx >= 0) body = body.slice(0, closeIdx);
  }

  return body.trim();
}

// ---------------------------------------------------------------------------
// Slug / path utilities
// ---------------------------------------------------------------------------

/** Glob key → slug, e.g. "../../../../samples/grids/grid/overview/package.json" → "grids/grid/overview" */
export function keyToSlug(key: string, prefix: string, suffix: string): string | null {
  if (!key.startsWith(prefix) || !key.endsWith(suffix)) return null;
  return key.slice(prefix.length, key.length - suffix.length);
}

/**
 * Derive SampleInfo from a slug.
 * slug must be in the form "group/component/name".
 */
export function slugToInfo(slug: string): SampleInfo | null {
  const parts = slug.split('/');
  if (parts.length !== 3) return null;
  const [group, component, name] = parts;
  return {
    slug,
    group,
    component,
    name,
    displayName:   toTitleCase(name),
    componentName: toTitleCase(component),
    groupName:     toTitleCase(group),
  };
}

/** Build the three-level navigation tree from the flat sample list */
export function buildNavTree(samples: SampleInfo[]): NavGroup[] {
  const groupMap = new Map<string, NavGroup>();

  for (const s of samples) {
    if (!groupMap.has(s.group)) {
      groupMap.set(s.group, { id: s.group, displayName: s.groupName, components: [] });
    }
    const group = groupMap.get(s.group)!;

    let comp = group.components.find(c => c.id === s.component);
    if (!comp) {
      comp = { id: s.component, displayName: s.componentName, samples: [] };
      group.components.push(comp);
    }

    comp.samples.push({ name: s.name, displayName: s.displayName, slug: s.slug });
  }

  return [...groupMap.values()];
}
