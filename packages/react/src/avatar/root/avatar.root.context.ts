import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AvatarRootState } from "./avatar.root.jsx";

/**
 * {@link AvatarRoot} が子パーツへ提供する状態です。
 */
export type AvatarRootContext = Readonly<AvatarRootState>;

/**
 * {@link AvatarRoot} が子パーツへ提供するコンテキストです。
 */
export const AvatarRootContext: React.Context<AvatarRootContext | null> =
  React.createContext<AvatarRootContext | null>(null);

export type IUseAvatarRootContext = IUseContext<AvatarRootContext>;

/**
 * {@link AvatarRootContext} を読み取るフックです。
 */
export const useAvatarRootContext: IUseAvatarRootContext = (optional): any => {
  const ctx = React.use(AvatarRootContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "AvatarRootContext",
      providerName: "AvatarRoot",
    });
  }

  return ctx;
};

export { AvatarRootContext as RootContext, useAvatarRootContext as useRootContext };
