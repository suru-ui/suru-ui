import * as React from "react";

type RejectUndef<T> = undefined extends T ? never : unknown;

/**
 * コンテキストを作成するためのパラメーター。
 *
 * @template T 値の型 (undefined 以外を許容)
 */
export type CreateContextParams<T extends RejectUndef<T>> = {
  /**
   * コンテキストの名前、アッパーキャメルケースの形式。
   */
  readonly name: string;
  /**
   * デフォルト値。
   */
  readonly default?: T;
};

export type UseContextOptions = {
  readonly optional?: boolean | undefined;
};

export interface UseContext<T extends RejectUndef<T>> {
  /**
   * コンテキストを使う。
   *
   * @param options オプション
   * @returns コンテキストの値
   */
  (options?: { readonly optional?: false | undefined } | undefined): T;
  /**
   * コンテキストを使う。
   *
   * @param options オプション
   * @returns コンテキストの値
   */
  (options: { readonly optional: boolean | undefined }): T | undefined;
}

/**
 * コンテキストを作成するためのヘルパー関数。
 *
 * @template T 値の型 (undefined 以外を許容)
 * @param params
 * @returns コンテクストとそれ専用のフック
 */
export default function createContext<T extends RejectUndef<T>>(params: CreateContextParams<T>): [
  Context: React.Context<T>,
  useContext: UseContext<T>,
] {
  const {
    name,
    default: defaultValue,
  } = params;
  const Context = React.createContext<T>(defaultValue!);

  if (__DEV__) {
    Context.displayName = name;
  }

  function useContext(options: UseContextOptions | undefined = {}): T {
    const ctx = React.use(Context);

    if (ctx === undefined && !options.optional) {
      const ctx = `${name}Context`;
      const err = new Error(
        `suru-ui(suru/${ctx}): use${ctx} が \`undefined\` を返しました。<${ctx} /> で囲う必要があります。`,
      );
      Error.captureStackTrace?.(err, useContext);
      throw err;
    }

    if (__DEV__) {
      React.useDebugValue(ctx);
    }

    return ctx;
  }

  return [Context, useContext];
}
