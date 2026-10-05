/**
 * ブラウザーが `@function` によるデザイントークンを解決できるかを判定します。
 * 未対応のブラウザーではトークンを使った余白などが無効値になり、見た目の検証ができないため、
 * トークン依存の検証をスキップする目的で使用します。
 *
 * @returns `@function` を解決できる場合は `true` です。
 */
export default function supportsCustomFunctions(): boolean {
  const probe = document.createElement("div");
  probe.style.borderStyle = "solid";
  probe.style.borderTopWidth = "--sui-border_width(1)";
  document.body.append(probe);
  const borderWidth = Number.parseFloat(getComputedStyle(probe).borderTopWidth);
  probe.remove();

  return borderWidth < 2;
}
