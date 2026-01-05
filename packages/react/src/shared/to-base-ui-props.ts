import composeRefs from "./_compose-refs.js";
import cn from "./cn.js";
import type MemoMap from "./memo-map.js";
import type { BaseUIEvent, ReactEvent, SuiEvent, UpperAlphabet } from "./types.js";

/**
 * 文字コードが大文字のアルファベットかどうかを判定します。
 *
 * @param code 文字コード (ASCII 値) です。
 * @returns 文字コードが大文字のアルファベット (A-Z) なら `true`、そうでなければ `false` です。
 */
function isUpperAlphabet(code: number): boolean {
  return code >= 65 && code <= 90;
}

/**
 * プロパティー名が React のイベントハンドラーの命名規則 (`on` で始まり、その後に大文字が続く) に従っているかどうかを判定します。
 *
 * @param key 検査するプロパティー名です。
 * @returns ハンドラーのプロパティー名なら `true`、そうでなければ `false` です。
 */
function isEventHandlerPropKey(key: string): boolean {
  return (
    key.charCodeAt(0) === 111 // 'o' の ASCII コード
    && key.charCodeAt(1) === 110 // 'n' の ASCII コード
    && isUpperAlphabet(key.charCodeAt(2)) // 3 文字目 (インデックス 2) が大文字のアルファベットであること
  );
}

/**
 * Base UI のイベントハンドラーからのイベントかどうか判定します。
 *
 * @param event Base UI のイベントと思われるオブジェクトです。
 * @returns 判定結果です。
 */
function isBaseUIEvent(event: unknown): event is BaseUIEvent<ReactEvent> {
  return !!event
    && typeof event === "object"
    && "preventBaseUiHandler" in event;
}

/**
 * Base UI のイベントを Suru UI のイベントに変換します。
 *
 * @param event Base UI のイベントです。
 * @returns 変換された Suru UI のイベントオブジェクトです。
 */
function toSuiEvent(event: BaseUIEvent<ReactEvent>): SuiEvent<BaseUIEvent<ReactEvent>> {
  const e = event as SuiEvent<BaseUIEvent<ReactEvent>>;
  e.preventSuiHandler = function preventSuiHandler() {
    // @ts-expect-error
    e.baseUIHandlerPrevented = true;
  };

  return e;
}

/**
 * `MemoMap` インターフェースから `get` メソッドのみを抽出した読み取り専用のキャッシュインターフェースです。
 *
 * `toBaseUiProps` 関数がプロパティをキャッシュするために使用します。
 */
export interface PropsCache extends Pick<MemoMap, "get"> {}

/**
 * キャッシュを使用しない場合のダミーの `PropsCache` 実装です。`factory` 関数を常に実行し、その結果を返します。
 */
const noCache: PropsCache = {
  get(_1, factory, _2) {
    return factory();
  },
};

/**
 * 基本となる props オブジェクトの型です。
 */
export type UnknownBaseUiProps = { readonly [key: string]: unknown };

/**
 * プロパティー型の中から、`undefined` が許容されている（つまり、オプショナルになり得る）プロパティーのキーを抽出します。
 *
 * @template TProps 処理対象のプロパティー型です。
 */
type OmitTarget<TProps extends UnknownBaseUiProps> = {
  [P in keyof TProps]: [Extract<TProps[P], undefined>] extends [never] ? never : P;
}[keyof TProps];

/**
 * 特定のプロパティーキーと値を受け取り、Base UI コンポーネントに渡すためのプロパティーの型に変換します。
 *
 * イベントハンドラーの場合、Suru UI のイベント (`SuiEvent`) を Base UI のイベント (`BaseUIEvent`) に戻す型変換を行います。
 *
 * @template TKey プロパティーキーです。
 * @template TValue プロパティーの値の型です。
 */
// dprint-ignore
type $ToBaseUiComponentProp<TKey extends PropertyKey, TValue> =
    TKey extends `on${UpperAlphabet}${string}`
  ? TValue extends (event: SuiEvent<infer TEvent extends BaseUIEvent<ReactEvent>>) => any
    ? (event: TEvent) => void // 型上は、イベントハンドラーは Suru UI イベントから Base UI イベントへ戻されます。
    : TValue
  : TValue

/**
 * Base UI に渡すためのプロパティーの具体的な実装型です。
 *
 *  `TTarget` で指定されたプロパティーはオプショナルになり、その他のプロパティーは必須となりますが、いずれも `ToBaseUiComponentProp` によって型が変換されます。
 *
 * @template TProps 元のプロパティー型です。
 * @template TTarget オプショナルとして扱われるプロパティーのキーのユニオン型です。
 */
type BaseUiPropsImpl<TProps extends UnknownBaseUiProps, TTarget extends keyof TProps> =
  & { -readonly [P in TTarget]?: $ToBaseUiComponentProp<P, Exclude<TProps[P], undefined>> }
  & { -readonly [P in Exclude<keyof TProps, TTarget>]: $ToBaseUiComponentProp<P, TProps[P]> };

/**
 * Suru UI のプロパティー型を Base UI に渡すためのプロパティー型に変換したものです。
 *
 * オプショナルなプロパティーを識別し、イベントハンドラーの型を Base UI の期待する型に変換します。
 *
 * @template TProps 元の Suru UI のプロパティー型です。
 */
export type BaseUiProps<TProps extends UnknownBaseUiProps> = BaseUiPropsImpl<
  TProps,
  OmitTarget<TProps>
>;

/**
 * Suru UI 用の props オブジェクトを Base UI 用の props オブジェクトに変換します。
 *
 * props オブジェクトを 2 つ指定した場合、それらを結合します。結合のロジックには、`ref`、`style`、`className`、およびイベントハンドラーの特別な処理が含まれます。
 *
 * キャッシュメカニズムを通じて、不要な再計算を防ぐこともできます。デフォルトではキャッシュが無効化されています。
 *
 * @param target 結合の対象となるベースの props オブジェクトです。
 * @param source 結合する新しい props オブジェクトです。`target` のプロパティを上書きする可能性があります。
 * @param cache キャッシュメカニズムを提供するオブジェクトです。主に `MemoMap` の `get` メソッドを使用します。
 * @returns 結合された props オブジェクトです。
 * @example
 * ```ts
 * const kvs = useSingleton(() => new Map());
 * using cache = new MemoMap(kvs);
 * const baseUIProps = toBaseUiProps(target, source, cache);
 * ```
 */
export default function toBaseUiProps<T extends UnknownBaseUiProps>(
  target: T | null | undefined,
  source?: null | undefined,
  cache?: PropsCache,
): BaseUiProps<T>;

/**
 * Suru UI 用の props オブジェクトを Base UI 用の props オブジェクトに変換します。
 *
 * props オブジェクトを 2 つ指定した場合、それらを結合します。結合のロジックには、`ref`、`style`、`className`、およびイベントハンドラーの特別な処理が含まれます。
 *
 * キャッシュメカニズムを通じて、不要な再計算を防ぐこともできます。デフォルトではキャッシュが無効化されています。
 *
 * @param target 結合の対象となるベースの props オブジェクトです。
 * @param source 結合する新しい props オブジェクトです。`target` のプロパティを上書きする可能性があります。
 * @param cache キャッシュメカニズムを提供するオブジェクトです。主に `MemoMap` の `get` メソッドを使用します。
 * @returns 結合された props オブジェクトです。
 * @example
 * ```ts
 * const kvs = useSingleton(() => new Map());
 * using cache = new MemoMap(kvs);
 * const baseUIProps = toBaseUiProps(target, source, cache);
 * ```
 */
export default function toBaseUiProps<T extends UnknownBaseUiProps>(
  target: null | undefined,
  source: T | null | undefined,
  cache?: PropsCache,
): BaseUiProps<T>;

/**
 * Suru UI 用の props オブジェクトを Base UI 用の props オブジェクトに変換します。
 *
 * props オブジェクトを 2 つ指定した場合、それらを結合します。結合のロジックには、`ref`、`style`、`className`、およびイベントハンドラーの特別な処理が含まれます。
 *
 * キャッシュメカニズムを通じて、不要な再計算を防ぐこともできます。デフォルトではキャッシュが無効化されています。
 *
 * @param target 結合の対象となるベースの props オブジェクトです。
 * @param source 結合する新しい props オブジェクトです。`target` のプロパティを上書きする可能性があります。
 * @param cache キャッシュメカニズムを提供するオブジェクトです。主に `MemoMap` の `get` メソッドを使用します。
 * @returns 結合された props オブジェクトです。
 * @example
 * ```ts
 * const kvs = useSingleton(() => new Map());
 * using cache = new MemoMap(kvs);
 * const baseUIProps = toBaseUiProps(target, source, cache);
 * ```
 */
export default function toBaseUiProps<T extends UnknownBaseUiProps, U extends UnknownBaseUiProps>(
  target: T | null | undefined,
  source?: U | null | undefined,
  cache?: PropsCache,
): BaseUiProps<T & U>;

export default function toBaseUiProps(
  target: UnknownBaseUiProps | null | undefined,
  source?: UnknownBaseUiProps | null | undefined,
  cache: PropsCache = noCache,
): any {
  const props: Record<string, any> = {};
  if ((target && !source) || (!target && source)) {
    // `target` または `source` のどちらか一方しかない場合は、イベントハンドラーだけ Suru UI 仕様に変更して返します。
    let hasEventHandler = false;
    const input = (target || source) as UnknownBaseUiProps;
    for (const key of Object.keys(input)) {
      if (isEventHandlerPropKey(key)) {
        hasEventHandler = true;
        const val: any = input[key];
        props[key] = cache.get(
          key,
          () => (
            function suiEventHandler(this: unknown, arg0: unknown, ...args: unknown[]) {
              if (isBaseUIEvent(arg0)) {
                arg0 = toSuiEvent(arg0);
              }

              val.apply(this, [arg0, ...args]);
            }
          ),
          [val],
        );
      } else {
        props[key] = input[key];
      }
    }

    return hasEventHandler
      ? props
      : input;
  }

  if (!target) {
    return source || {};
  }

  if (!source) {
    return target;
  }

  const keys = new Set([...Object.keys(target), ...Object.keys(source)]);
  for (const key of keys) {
    const tgt: any = target[key];
    const src: any = source[key];
    switch (true) {
      case key === "ref":
        props[key] = cache.get(key, () => composeRefs(tgt, src), [tgt, src]);
        break;

      case key === "style":
        props[key] = cache.get(
          key,
          () => {
            if (typeof src !== "function" && typeof tgt !== "function") {
              return tgt && src
                ? { ...tgt, ...src } // src を優先します。
                : (tgt || src);
            }

            return function mergedSuiStyle(...args: any[]) {
              const tgtStyle = typeof tgt === "function" ? tgt(...args) : tgt;
              const srcStyle = typeof src === "function" ? src(...args) : src;

              return tgtStyle && srcStyle
                ? { ...tgtStyle, ...srcStyle } // src を優先します。
                : (tgtStyle || srcStyle);
            };
          },
          [tgt, src],
        );
        break;

      case key === "className":
        props[key] = cache.get(
          key,
          () => {
            if (typeof src !== "function" && typeof tgt !== "function") {
              return tgt && src
                ? cn(src, tgt) // src を先頭にします。
                : (tgt || src);
            }

            return function mergedSuiClassName(...args: any[]) {
              const tgtClassName = typeof tgt === "function" ? tgt(...args) : tgt;
              const srcClassName = typeof src === "function" ? src(...args) : src;

              return tgtClassName && srcClassName
                ? cn(srcClassName, tgtClassName) // src を先頭にします。
                : (tgtClassName || srcClassName);
            };
          },
          [tgt, src],
        );
        break;

      case isEventHandlerPropKey(key):
        props[key] = cache.get(
          key,
          () => (
            tgt && src
              ? function mergedSuiEventHandler(this: unknown, arg0: unknown, ...args: unknown[]) {
                if (isBaseUIEvent(arg0)) {
                  arg0 = toSuiEvent(arg0);
                }

                src.apply(this, [arg0, ...args]); // src を先に呼び出します。
                tgt.apply(this, [arg0, ...args]);
              }
              : (tgt || src)
          ),
          [tgt, src],
        );
        break;

      case src !== undefined:
        props[key] = src;
        break;

      case tgt !== undefined:
        props[key] = tgt;
        break;
    }
  }

  return props;
}
