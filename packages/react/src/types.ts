import type * as React from "react";

/**
 * Suru UI のコンポーネント型です。
 *
 * @template TProps コンポーネントのプロパティー型です。
 * @template TRednerNode コンポーネントが返す React ノードの型です。
 */
export interface Component<
  TProps = {},
  TRednerNode extends ReturnType<React.FC<TProps>> = React.ReactElement | null,
> {
  (props: TProps): TRednerNode;

  displayName?: string | undefined;
}
