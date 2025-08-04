import clsx from "clsx";
import type * as React from "react";
import composeRefs from "./compose-refs";
import type MemoMap from "./memo-map";

/**
 * 型 T から null および undefined を取り除き、もし結果が never になる場合は空のオブジェクト型 {} を返します。
 * これは、props が null または undefined の場合に安全にオブジェクトとして扱えるようにするためのユーティリティ型です。
 *
 * @template T 対象の型です。
 */
type NonNullable<T> = [T & {}] extends [never] ? {} : T;

/**
 * React のすべての HTML 属性と RefAttributes を含む、変更可能なプロパティーの型です。
 * これは、マージ処理中にプロパティーが変更される可能性があるため、部分的な型として使用されます。
 *
 * @template T HTML 要素です。
 */
type MutableAllProps<T = unknown> = React.RefAttributes<T> & React.AllHTMLAttributes<T>;

/**
 * React のすべての HTML 属性と RefAttributes を含む、読み取り専用のプロパティーです。
 *
 * @template T HTML 要素です。
 */
export type AllProps<T = unknown> = Readonly<MutableAllProps<T>>;

/**
 * `MemoMap` インターフェースから `get` メソッドのみを抽出した読み取り専用のキャッシュインターフェース。
 * `mergeProps` 関数がプロパティをキャッシュするために使用します。
 */
export interface PropsCache extends Readonly<Pick<MemoMap, "get">> {}

/**
 * 2 つの props オブジェクトを結合します。
 * 結合のロジックには、`ref`、`style`、`className`、およびイベントハンドラーの特別な処理が含まれます。
 * キャッシュメカニズムを通じて、不要な再計算を防ぎます。
 *
 * @param target 結合の対象となるベースの props オブジェクトです。
 * @param source 結合する新しい props オブジェクトです。`target` のプロパティを上書きする可能性があります。
 * @param cache キャッシュメカニズムを提供するオブジェクトです。主に `MemoMap` の `get` メソッドを使用します。
 * @returns 結合された props オブジェクトです。
 * @example
 * ```ts
 * // useMemoMap は MemoMap のインスタンスを返すカスタムフックを想定しています。
 * using cache = useMemoMap();
 * const mergedProps = mergeProps(target, source, cache);
 * ```
 */
export default function mergeProps<T, U>(
  target: T,
  source: U,
  cache?: PropsCache,
): NonNullable<T> & NonNullable<U>;

export default function mergeProps(
  target: AllProps | null | undefined,
  source: AllProps | null | undefined,
  cache: PropsCache = { get: (_1, factory, _2) => factory() }, // デフォルトでキャッシュ無し
): AllProps {
  if (target == null) {
    return source || {};
  }

  if (source == null) {
    return target;
  }

  const overrideProps: Partial<MutableAllProps> = { ...source };
  for (const name of Object.keys(source) as (keyof AllProps | "__proto__")[]) {
    if (name === "__proto__") {
      continue;
    }

    const slot = target[name];
    const child = source[name];
    switch (true) {
      case name === "ref":
        overrideProps[name] = cache.get(
          name,
          () => composeRefs(slot, child),
          [slot, child],
        );
        break;

      case name === "style":
        overrideProps[name] = cache.get(
          name,
          () => {
            if (typeof child !== "function" && typeof slot !== "function") {
              return slot && child
                ? { ...slot, ...child } // child を優先します。
                : (slot || child);
            }

            // style が関数の場合 (例: Remix, React-Router の NavLink)、
            // 両方の関数を呼び出し、その結果のスタイルオブジェクトを結合する新しい関数を返します。
            return function mergedStyle(...args: any[]) {
              const childStyle = typeof child === "function" ? child(...args) : child;
              const slotStyle = typeof slot === "function" ? slot(...args) : slot;
              return slotStyle && childStyle
                ? { ...slotStyle, ...childStyle } // child を優先します。
                : (slotStyle || childStyle);
            };
          },
          [slot, child],
        );
        break;

      case name === "className":
        overrideProps[name] = cache.get(
          name,
          (): any => {
            if (typeof slot !== "function" && typeof child !== "function") {
              return clsx(slot, child); // slot を先頭にします。
            }

            // className が関数の場合 (例: Remix, React-Router の NavLink)、
            // 両方の関数を呼び出し、その結果のクラス名を clsx で結合する新しい関数を返します。
            return function mergedClassName(...args: any[]) {
              const slotClassName = typeof slot === "function" ? slot(...args) : slot;
              const childClassName = typeof child === "function" ? child(...args) : child;
              return clsx(slotClassName, childClassName); // slot を先頭にします。
            };
          },
          [slot, child],
        );
        break;

      case isHandlerPropName(name):
        overrideProps[name] = cache.get(
          name,
          () =>
            slot && child
              ? function mergedHandler(this: unknown, ...args: unknown[]) {
                child.apply(this, args); // child を先に呼び出します。
                slot.apply(this, args);
              }
              : (slot || child),
          [slot, child],
        );
        break;
    }
  }

  return {
    ...target,
    ...overrideProps,
  };
}

/**
 * プロパティー名が React のイベントハンドラーの命名規則 (`on` で始まり、その後に大文字が続く) に従っているかどうかを判定します。
 *
 * @param name 検査するプロパティー名です。
 * @returns ハンドラーのプロパティー名なら `true`、そうでなければ `false` です。
 */
function isHandlerPropName(name: string): boolean {
  return (
    name.charCodeAt(0) === 111 // 'o' の ASCII コード
    && name.charCodeAt(1) === 110 // 'n' の ASCII コード
    && isUpperAlphabet(name.charCodeAt(2)) // 3 文字目 (インデックス 2) が大文字のアルファベットであること
  );
}

/**
 * 文字コードが大文字のアルファベットかどうかを判定します。
 *
 * @param code 文字コード (ASCII 値) です。
 * @returns 文字コードが大文字のアルファベット (A-Z) なら `true`、そうでなければ `false` です。
 */
function isUpperAlphabet(code: number): boolean {
  return code >= 65 && code <= 90; // ASCII codes for A-Z
}
