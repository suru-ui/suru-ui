import type * as React from "react";

/**
 * Suru UI のコンポーネント型です。
 *
 * @template TProps コンポーネントのプロパティー型です。
 */
export interface IComponent<TProps = {}> {
  (props: TProps): React.ReactElement | null;

  displayName?: string | undefined;
}

export interface IUseContext<TContext = unknown> {
  /**
   * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
   * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
   */
  (optional?: false): TContext;
  (optional?: boolean): TContext | null;
}
