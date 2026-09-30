import type { TextFieldContext } from "./text-field.context.js";

/**
 * 入力欄への自動フォーカスを無効にする要素を示すデータ属性です。
 *
 * {@link TextFieldAddon} が付与し、{@link TextFieldRoot} が参照します。
 */
export const DISABLE_FOCUS_ON_CLICK_DATA = "data-suitextfielddisablefocusonclick";

/**
 * {@link TextFieldRoot} の外側で使うパーツへ渡す既定のスタイルです。
 */
export const DEFAULT_TEXT_FIELD_CONTEXT: TextFieldContext = {
  size: "md",
  color: "grey",
  radius: "md",
  variant: "liquid",
  outlined: false,
};
