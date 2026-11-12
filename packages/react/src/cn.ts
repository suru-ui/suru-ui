import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

type BaseUIClassName<TState> = BaseUIComponentProps<any, TState>["className"];

type Falsy = 0 | null | false | undefined;

/** 文字列または falsy な値をとるクラス名です。 */
export type PrimitiveClassName = string | Falsy;

/**
 * コンポーネントの状態に応じてクラス名を返す関数です。
 *
 * @template TState コンポーネントの状態の型です。
 */
export interface ClassNameFunction<TState> {
  (state: TState): PrimitiveClassName;
}

/**
 * 静的なクラス名または状態に応じた動的なクラス名を表します。
 *
 * @template TState コンポーネントの状態の型です。
 */
export type ClassName<TState> = PrimitiveClassName | ClassNameFunction<TState>;

/**
 * クラス名を結合するユーティリティーです。
 *
 * 引数に文字列と falsy 値のほか、Base UI の Render Props に対応した関数を受け取ることができます。関数が含まれる場合、レンダリング時に状態が渡されて動的にクラス名が解決されます。
 *
 * @template TState コンポーネントの状態の型です。
 *
 * @example 静的なクラス名
 * ```ts
 * cn("foo", "bar") // "foo bar"
 * cn("foo", false && "bar") // "foo"
 * ```
 *
 * @example Render Props との併用
 * ```tsx
 * cn(className, (state) => state.disabled && "disabled")
 * ```
 */
function cn(...classNames: PrimitiveClassName[]): string | undefined;
function cn<TState>(...classNames: ClassName<TState>[]): BaseUIClassName<TState>;
function cn<TState>(...classNames: ClassName<TState>[]): BaseUIClassName<TState> {
  const parts: Exclude<ClassName<TState>, Falsy>[] = [];
  let classNameBuffer = "";
  let containsFunction = false;

  function flush(): void {
    if (classNameBuffer) {
      parts.push(classNameBuffer);
      classNameBuffer = "";
    }
  }

  for (let i = 0, n = classNames.length, part; i < n; i++) {
    part = classNames[i];
    if (part === undefined || part === null || part === false || part === 0) {
      continue;
    }

    switch (typeof part) {
      case "string":
        classNameBuffer += (classNameBuffer && " ") + part;
        break;

      case "function":
        flush();
        parts.push(part);
        containsFunction = true;
        break;

      default:
        part satisfies never;
    }
  }

  if (!containsFunction) {
    return classNameBuffer || undefined;
  }

  flush();

  return function className(state) {
    let result = "";

    for (const part of parts) {
      let temp = "";
      let returns: unknown;

      switch (typeof part) {
        case "string":
          temp = part;
          break;

        case "function":
          returns = part(state);
          if (typeof returns === "string" && returns) {
            temp = returns;
          }

          break;

        default:
          part satisfies never;
      }

      if (temp) {
        result += (result && " ") + temp;
      }
    }

    return result || undefined;
  };
}

export default cn;
