import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { TextFieldAddonState } from "../../text-field/text-field.parts.js";
import type { Override, IUseContext } from "../../types.js";
import type { PasswordFieldContextState } from "../root/password-field.root.context.js";

/**
 * {@link PasswordFieldAddon} が子パーツへ提供する状態です。
 */
export type PasswordFieldAddonContext = Readonly<
  Override<PasswordFieldContextState, TextFieldAddonState>
>;

/**
 * {@link PasswordFieldAddon} が子パーツへ提供するコンテキストです。
 */
export const PasswordFieldAddonContext: React.Context<PasswordFieldAddonContext | null> =
  React.createContext<PasswordFieldAddonContext | null>(null);

export type IUsePasswordFieldAddonContext = IUseContext<PasswordFieldAddonContext>;

/**
 * {@link PasswordFieldAddonContext} を読み取るフックです。
 */
export const usePasswordFieldAddonContext: IUsePasswordFieldAddonContext =
  function useSuiPasswordFieldAddonContext(optional): any {
    const ctx = React.use(PasswordFieldAddonContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "PasswordFieldAddonContext",
        providerName: "PasswordFieldAddon",
      });
    }

    return ctx;
  };

export {
  PasswordFieldAddonContext as AddonContext,
  usePasswordFieldAddonContext as useAddonContext,
};
