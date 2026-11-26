/**
 * nav.json — the navigation tree as a single static, cacheable asset.
 *
 * The sidebar is rendered client-side (src/scripts/nav.ts) from this file
 * instead of being baked into every page: with 980+ samples the tree is
 * ~190KB of HTML, which used to be duplicated into each of the 980+ pages.
 */
import { samplesFromGlobKeys, buildNavTree } from '../utils/samples';

// Only the keys are used. `?raw` keeps the sample modules from being evaluated.
const sampleEntries = import.meta.glob('../../samples/**/src/index.ts', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export function GET() {
  const groups = buildNavTree(samplesFromGlobKeys(Object.keys(sampleEntries)));

  return new Response(JSON.stringify({ groups }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
