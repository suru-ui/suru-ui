/**
 * ブラウザーが `sibling-index()` / `sibling-count()` を解決できるかを判定します。
 * 未対応のブラウザーでは重なり順の反転が効かないため、重なり順の検証をスキップする目的で使用します。
 *
 * @returns `sibling-index()` を解決できる場合は `true` です。
 */
export default function supportsSiblingIndex(): boolean {
  return CSS.supports("z-index", "sibling-index()");
}
