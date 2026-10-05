import { ButtonContext, useButtonContext } from "../root/button.root.context.js";

// ButtonContent は Context を変更・拡張しないため、親の ButtonContext をそのまま使う。
export {
  ButtonContext as ContentContext,
  useButtonContext as useContentContext,
  ButtonContext as ButtonContentContext,
  useButtonContext as useButtonContentContext,
};
