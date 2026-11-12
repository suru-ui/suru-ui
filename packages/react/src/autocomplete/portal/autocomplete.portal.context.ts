import { AutocompleteContext, useAutocompleteContext } from "../root/autocomplete.root.context.js";

// AutocompletePortal は Context を変更・拡張しないため、親の AutocompleteContext をそのまま使う。
// Base UI の Autocomplete.Portal.State を合成しない理由は 2 つある。
// 1 つ目は、Base UI の Portal.State が空であり、合成しても新たな状態が増えないため。
// 2 つ目は、Base UI の Portal が `render` をラッパー要素の描画にだけ使い、`children` を別の createPortal 口から配置するため、`render` 内側の Provider では子パーツに届かず、Portal 固有の Context を子へ透過できないため。
export {
  AutocompleteContext as PortalContext,
  AutocompleteContext as AutocompletePortalContext,
  useAutocompleteContext as usePortalContext,
  useAutocompleteContext as useAutocompletePortalContext,
};
