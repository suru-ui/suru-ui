import {
  type ErrorMeta,
  type ErrorOptions,
  setErrorMessage,
  ErrorBase as CoreErrorBase,
} from "@suru-ui/core";

export type { ErrorMeta, ErrorOptions };
export { setErrorMessage };

/**
 * Suru UI のエラー基底クラスです。
 *
 * {@link CoreErrorBase|@suru-ui/core#ErrorBase} を拡張し、メタデータと多言語対応のエラーメッセージ生成をサポートします。
 *
 * @template TMeta エラーに付与するメタデータの型です。
 */
export class ErrorBase<
  TMeta extends ErrorMeta | undefined = ErrorMeta | undefined,
> extends CoreErrorBase<TMeta> {}

/**
 * {@link ContextMissingError} に付与されるメタデータです。
 */
export type ContextMissingErrorMeta = {
  /**
   * 欠落しているコンテキストの名前です。
   */
  readonly contextName: string;

  /**
   * コンテキストを提供するプロバイダーコンポーネントの名前です。
   */
  readonly providerName: string;
};

/**
 * {@link ContextMissingError} のコンストラクター引数です。
 */
export type ContextMissingErrorArgs = ErrorOptions & {
  /**
   * 欠落しているコンテキストの名前です。
   */
  readonly contextName: string;

  /**
   * コンテキストを提供するプロバイダーコンポーネントの名前です。
   *
   * 省略時は `contextName` と同じ値が使われます。
   */
  readonly providerName?: string | undefined;
};

/**
 * 必要な React コンテキストが見つからなかった場合にスローされるエラーです。
 *
 * @example
 * ```ts
 * throw new ContextMissingError({
 *   contextName: "ButtonContext",
 *   providerName: "ButtonRoot",
 * });
 * ```
 */
export class ContextMissingError extends ErrorBase<ContextMissingErrorMeta> {
  static {
    this.prototype.name = "SuiContextMissingError";
  }

  public constructor(args: ContextMissingErrorArgs) {
    const { contextName, providerName = contextName, ...options } = args;
    super(
      { contextName, providerName },
      ({ contextName, providerName }) =>
        `${contextName} is missing. Must be placed within <${providerName}>`,
      options,
    );
  }
}

/*#__PURE__*/ setErrorMessage(
  ContextMissingError,
  ({ contextName, providerName }) =>
    `${contextName} がありません、<${providerName}> 配下に配置してください`,
  "ja",
);
