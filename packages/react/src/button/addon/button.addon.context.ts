import { ButtonContext, useButtonContext } from "../root/button.root.context.js";

// ButtonAddon は Context を変更・拡張しないため、親の ButtonContext をそのまま使う。
export {
  ButtonContext as AddonContext,
  ButtonContext as ButtonAddonContext,
  useButtonContext as useAddonContext,
  useButtonContext as useButtonAddonContext,
};
