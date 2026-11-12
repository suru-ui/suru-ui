import { MenuContext, useMenuContext } from "../root/menu.root.context.js";

// MenuPortal は Context を変更・拡張しないため、親の MenuContext をそのまま使う。
// Base UI の Menu.Portal.State を合成しない理由は 2 つある。
// 1 つ目は、Base UI の Portal.State が空であり、合成しても新たな状態が増えないため。
// 2 つ目は、Base UI の Portal が `render` をラッパー要素の描画にだけ使い、`children` を別の createPortal 口から配置するため、`render` 内側の Provider では子パーツに届かず、Portal 固有の Context を子へ透過できないため。
export {
  MenuContext as PortalContext,
  MenuContext as MenuPortalContext,
  useMenuContext as usePortalContext,
  useMenuContext as useMenuPortalContext,
};
