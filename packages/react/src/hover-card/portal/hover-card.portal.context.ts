import { HoverCardContext, useHoverCardContext } from "../root/hover-card.root.context.js";

// HoverCardPortal は Context を変更・拡張しないため、親の HoverCardContext をそのまま使う。
// Base UI の PreviewCard.Portal.State を合成しない理由は 2 つある。
// 1 つ目は、Base UI の Portal.State が空であり、合成しても新たな状態が増えないため。
// 2 つ目は、Base UI の Portal が `render` をラッパー要素の描画にだけ使い、`children` を別の createPortal 口から配置するため、`render` 内側の Provider では子パーツに届かず、Portal 固有の Context を子へ透過できないため。
export {
  HoverCardContext as PortalContext,
  HoverCardContext as HoverCardPortalContext,
  useHoverCardContext as usePortalContext,
  useHoverCardContext as useHoverCardPortalContext,
};
