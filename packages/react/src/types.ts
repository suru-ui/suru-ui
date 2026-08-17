import type * as React from "react";

/**
 * Suru UI のコンポーネント型です。
 *
 * @template TProps コンポーネントのプロパティー型です。
 */
export interface Component<TProps = {}> {
  (props: TProps): React.ReactElement | null;

  displayName?: string | undefined;
}
