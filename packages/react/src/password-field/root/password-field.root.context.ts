import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";

/**
 * {@link PasswordFieldRoot} が子パーツへ提供する表示状態です。
 */
export type PasswordFieldContextState = {
  /**
   * パスワードを表示しているかどうかです。
   */
  readonly visible: boolean;
};

/**
 * {@link PasswordFieldRoot} が子パーツへ提供するコンテキストです。
 */
export type PasswordFieldContext = Readonly<
  Override<
    PasswordFieldContextState,
    {
      /**
       * パスワードの表示状態を更新します。
       *
       * 関数を渡すと、現在の表示状態から次の表示状態を計算できます。
       */
      readonly setVisible: (value: boolean | ((prevValue: boolean) => boolean)) => void;
    }
  >
>;

/**
 * PasswordField の表示状態を子パーツへ伝播するコンテキストです。
 */
export const PasswordFieldContext: React.Context<PasswordFieldContext | null> =
  React.createContext<PasswordFieldContext | null>(null);

export type IUsePasswordFieldContext = IUseContext<PasswordFieldContext>;

/**
 * {@link PasswordFieldContext} を読み取るフックです。
 */
export const usePasswordFieldContext: IUsePasswordFieldContext =
  function useSuiPasswordFieldContext(optional?: boolean): any {
    const ctx = React.use(PasswordFieldContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "PasswordFieldContext",
        providerName: "PasswordFieldRoot",
      });
    }

    return ctx;
  };

export { PasswordFieldContext as Context, usePasswordFieldContext as useContext };
