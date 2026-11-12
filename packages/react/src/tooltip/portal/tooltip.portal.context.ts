import { TooltipContext, useTooltipContext } from "../root/tooltip.root.context.js";

// TooltipPortal は Context を変更・拡張しないため、親の TooltipContext をそのまま使う。
// Base UI の Tooltip.Portal.State を合成しない理由は 2 つある。
// 1 つ目は、Base UI の Portal.State が空であり、合成しても新たな状態が増えないため。
// 2 つ目は、Base UI の Portal が `render` をラッパー要素の描画にだけ使い、`children` を別の createPortal 口から配置するため、`render` 内側の Provider では子パーツに届かず、Portal 固有の Context を子へ透過できないため。
export {
  TooltipContext as PortalContext,
  TooltipContext as TooltipPortalContext,
  useTooltipContext as usePortalContext,
  useTooltipContext as useTooltipPortalContext,
};
