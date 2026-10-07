import { ComboboxContext, useComboboxContext } from "../root/combobox.root.context.js";

// ComboboxPortal は Context を変更・拡張しないため、親の ComboboxContext をそのまま使う。
// Base UI の Combobox.Portal.State を合成しない理由は2つある。
// 1つ目は、Base UI の Portal.State が空であり、合成しても新たな状態が増えないため。
// 2つ目は、Base UI の Portal が `render` をラッパー要素の描画にだけ使い、
// `children` を別の createPortal 口から配置するため、`render` 内側の Provider では子パーツに届かず、
// Portal 固有の Context を子へ透過できないため。
export {
  ComboboxContext as PortalContext,
  useComboboxContext as usePortalContext,
  ComboboxContext as ComboboxPortalContext,
  useComboboxContext as useComboboxPortalContext,
};
