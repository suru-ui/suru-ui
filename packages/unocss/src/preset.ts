import type { Preset } from "@unocss/core";

import { rules } from "./rules.js";

/**
 * 生成したユーティリティーを出力する CSS カスケードレイヤーです。
 *
 * `@suru-ui/theme` が宣言するレイヤー順のうち、コンポーネントのスタイルより前になります。
 */
export const SUI_UTILITIES_LAYER = "sui.utilities";

/**
 * `@suru-ui/theme` のデザイントークンを UnoCSS のユーティリティーとして使うためのプリセットを返します。
 *
 * 生成されるユーティリティーはすべて `sui-` を含む名前になり、`sui.utilities` レイヤーに出力されます。`sui.utilities` を CSS カスケードレイヤーとして出力するには `outputToCssLayers` を有効にしてください。
 *
 * - 色: `bg-sui-canvas-1`、`text-sui-blue-60`、`border-sui-blue-solid-border-normal` など。
 * - 余白: `p-sui-2`、`gap-sui-4` など。
 * - 大きさ: `w-sui-sm`、`size-sui-8` など。
 * - 角丸: `rounded-sui-2` など。
 * - フォント: `font-sui-sans`、`font-sui-mono`。
 * - 文字スタイル: `text-sui-oln-md-m` など。
 *
 * ユーティリティーの値は `--sui-space()` などの CSS 関数を参照するため、`@suru-ui/theme/suru.css` を併せて読み込んでください。
 *
 * @returns `@suru-ui/theme` のトークンに対応する UnoCSS プリセットです。
 */
export function presetSuruUI(): Preset {
  return {
    name: "@suru-ui/unocss",
    layer: SUI_UTILITIES_LAYER,
    rules,
  };
}
