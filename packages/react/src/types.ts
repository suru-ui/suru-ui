import type * as React from "react";

export namespace IComponent {
  export type Return = React.ReactElement | null;

  export interface Attributes {
    displayName?: string | undefined;
  }
}

/**
 * Suru UI のコンポーネント型です。
 *
 * @template TProps コンポーネントのプロパティー型です。
 */
export interface IComponent<TProps = {}> extends IComponent.Attributes {
  (props: TProps): IComponent.Return;
}

/**
 * コンテキストを読み取るフックの型です。
 *
 * @template TContext コンテキストの型です。
 */
export interface IUseContext<TContext = unknown> {
  /**
   * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
   * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
   */
  (optional?: false): TContext;
  (optional?: boolean): TContext | null;
}

export type Override<T, U> = Omit<T, keyof U> & U;
