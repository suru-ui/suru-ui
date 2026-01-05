import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";
import partialize from "../../shared/partialize.js";
import useSingleton from "../../shared/use-singleton.js";
import Context from "./tooltip-group-context.js";

/**
 * TooltipGroup コンポーネントに渡すプロパティーの型定義です。
 */
export type TooltipGroupProps = {
  /**
   * コンポーネントの子要素です。
   */
  children?: React.ReactNode | undefined;

  /**
   * ツールチップを閉じるまでの待機時間です。ミリ秒単位で指定します。
   */
  closeDelay?: number | undefined;

  /**
   * ツールチップを開くまでの待機時間です。ミリ秒単位で指定します。
   */
  delay?: number | undefined;

  /**
   * 前のツールチップが閉じられてからこの時間内に新しいツールチップがトリガーされた場合、待機時間なしで即座に表示されます。ミリ秒単位で指定します。
   *
   * @default 400
   */
  timeout?: number | undefined;
};

/**
 * 複数のツールチップ間で状態や遅延設定を共有するためのグループコンポーネントです。
 */
export default function TooltipGroup(props: TooltipGroupProps): React.ReactElement {
  const {
    children,
    ...other
  } = props;
  const handle = useSingleton(() => Tooltip.createHandle());
  const context = React.useMemo(() => ({ handle }), [handle]);

  return (
    <Tooltip.Provider {...partialize(other)}>
      <Context value={context}>
        {children}
      </Context>
    </Tooltip.Provider>
  );
}
