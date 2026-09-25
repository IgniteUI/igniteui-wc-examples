/**
 * nav.json — the navigation tree as a single static, cacheable asset.
 *
 * The sidebar is rendered client-side (src/scripts/nav.ts) from this file
 * instead of being baked into every page: with 980+ samples the tree is
 * ~190KB of HTML, which used to be duplicated into each of the 980+ pages.
 */
import { samplesFromGlobKeys, buildNavTree } from '../utils/samples';

const pkgModules = import.meta.glob('../../samples/**/package.json', {
  eager: true,
}) as Record<string, unknown>;

export function GET() {
  const groups = buildNavTree(samplesFromGlobKeys(Object.keys(pkgModules)));

  return new Response(JSON.stringify({ groups }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
