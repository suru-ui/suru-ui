import type { Preset } from "@unocss/core";

import {
  PRESET_NAME,
  DEFAULT_NAMESPACE,
  TW_UTILITIES_LAYER,
  SUI_UTILITIES_LAYER,
} from "./constants.js";
import { type CreateRulesOptions, createRules } from "./rules.js";

/**
 * `presetSuruUI` のオプションです。
 */
export type PresetSuruUIOptions = CreateRulesOptions;

/**
 * `@suru-ui/theme` のデザイントークンを UnoCSS のユーティリティーとして使うためのプリセットを返します。
 *
 * 生成されるユーティリティーは既定で `p-sui-2` のように `-sui-` を含む名前になり、`sui.utilities` レイヤーに出力されます。`namespace` に `false` を渡すと `-sui-` を外した名前になり、既存のルールを上書きできます。上書きするには `presetSuruUI` を他のプリセットより後に置いてください。`sui.utilities` を CSS カスケードレイヤーとして出力するには `outputToCssLayers` を有効にしてください。
 *
 * - 色: `bg-sui-canvas-1`、`text-sui-blue-60`、`border-sui-blue-solid-border-normal` など。
 * - 余白: `p-sui-2`、`gap-sui-4` など。
 * - 大きさ: `w-sui-sm`、`size-sui-8` など。
 * - 枠線: `border-sui-2` など。段階を省略すると `1` になり、`border-style` も併せて設定します。
 * - 角丸: `rounded-sui-2` など。段階を省略すると `1` になり、`corner-shape` も併せて設定します。
 * - フォント: `font-sui-sans`、`font-sui-mono` など。
 * - 文字スタイル: `text-sui-oln-md-m` など。
 *
 * ユーティリティーの値は `--sui-space()` などの CSS 関数を参照するため、`@suru-ui/theme/suru.css` を併せて読み込んでください。
 *
 * @param options プリセットのオプションです。
 * @returns `@suru-ui/theme` のトークンに対応する UnoCSS プリセットです。
 */
export function presetSuruUI(options: PresetSuruUIOptions = {}): Preset {
  const { namespace = DEFAULT_NAMESPACE } = options;

  return {
    name: PRESET_NAME,
    layer: namespace ? SUI_UTILITIES_LAYER : TW_UTILITIES_LAYER,
    rules: createRules(options),
  };
}
