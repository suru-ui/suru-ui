import { ButtonContext, useButtonContext } from "../root/button.root.context.js";

// ButtonPending は Context を変更・拡張しないため、親の ButtonContext をそのまま使う。
export {
  ButtonContext as PendingContext,
  useButtonContext as usePendingContext,
  ButtonContext as ButtonPendingContext,
  useButtonContext as useButtonPendingContext,
};
