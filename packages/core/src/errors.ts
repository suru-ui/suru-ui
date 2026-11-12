import { type ErrorMeta, type ErrorOptions, I18nErrorBase, setErrorMessage } from "i18n-error-base";

export type { ErrorMeta, ErrorOptions };
export { setErrorMessage };

/**
 * このパッケージにおけるエラークラスの基底です。
 *
 * @example
 * ```
 * import { type ErrorOptions, ErrorBase, setErrorMessage } from "@suru-ui/core";
 *
 * type XyzErrorMeta = {
 *   readonly code: number;
 * };
 *
 * type XyzErrorArgs = ErrorOptions & XyzErrorMeta;
 *
 * class XyzError extends ErrorBase<XyzErrorArgs> {
 *   static {
 *     this.prototype.name = "SuruXyzError"
 *   }
 *
 *   public constructor(args: XyzErrorArgs) {
 *     const { code, ...options } = args;
 *     const meta = { code };
 *     super(meta, ({ code }) => `Error code: ${code}`, options);
 *   }
 * }
 *
 * setErrorMessage(XyzError, ({ code }) => `エラーコード: ${code}`);
 * ```
 */
export class ErrorBase<
  TMeta extends ErrorMeta | undefined = ErrorMeta | undefined,
> extends I18nErrorBase<TMeta> {}
