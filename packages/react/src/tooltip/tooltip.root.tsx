import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import type { Override, IComponent } from "../types.js";
import type { TooltipContextSize, TooltipContextRadius } from "./tooltip.context.js";
import { TooltipContext } from "./tooltip.context.js";
import type { TooltipHandle } from "./tooltip.handle.js";

/**
 * {@link TooltipRoot} を命令的に操作するためのオブジェクトです。
 */
export type TooltipRootActions = Tooltip.Root.Actions;

/**
 * {@link TooltipRoot} の開閉状態を変更するイベントの詳細です。
 */
export type TooltipRootChangeEventDetails = Tooltip.Root.ChangeEventDetails;

/**
 * {@link TooltipRoot} の開閉状態を変更する理由です。
 */
export type TooltipRootChangeEventReason = Tooltip.Root.ChangeEventReason;

/**
 * ツールチップの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type TooltipRootRadius = TooltipContextRadius;

/**
 * ツールチップの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type TooltipRootSize = TooltipContextSize;

/**
 * {@link TooltipRoot} が持つ状態です。
 */
export type TooltipRootState = Override<TooltipContext, Tooltip.Root.State>;

export namespace TooltipRootProps {
  export type Render = {};

  export type SuruUI<TPayload = any> = {
    /**
     * ツールチップとトリガーを関連付けるハンドルです。
     *
     * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
     */
    handle?: TooltipHandle<TPayload> | undefined;

    /**
     * ツールチップに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * ツールチップの角丸を指定します。
     *
     * 既定値は {@link TooltipRootProps.size|size} です。
     */
    radius?: TooltipRootRadius | undefined;

    /**
     * ツールチップのサイズを指定します。
     *
     * @default "md"
     */
    size?: TooltipRootSize | undefined;
  };

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof Tooltip.Root<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TooltipRootProps:
      | "defaultOpen"
      | "open"
      | "onOpenChange"
      | "onOpenChangeComplete"
      | "disableHoverablePopup"
      | "trackCursorAxis"
      | "actionsRef"
      | "disabled"
      | "children"
      | "triggerId"
      | "defaultTriggerId",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof Tooltip.Root<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TooltipRoot} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type TooltipRootProps<TPayload = any> = TooltipRootProps.Render &
  TooltipRootProps.SuruUI<TPayload> &
  TooltipRootProps.BaseUI<TPayload> &
  TooltipRootProps.HTML<TPayload>;

/**
 * {@link TooltipRoot} のコンポーネント型です。
 */
export interface ITooltipRoot extends IComponent<TooltipRootProps> {
  /**
   * @template TPayload トリガーから受け取るデータの型です。
   */
  <TPayload = any>(props: TooltipRootProps<TPayload>): IComponent.Return;
}

/**
 * ツールチップのルートです。
 *
 * 開閉状態を管理し、トリガーとポップアップをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const TooltipRoot: ITooltipRoot = function SuiTooltipRoot<TPayload>(
  props: TooltipRootProps<TPayload>,
) {
  const { size = "md", handle, radius = size, outlined = false, ...otherProps } = props;
  const ctx = React.useMemo<TooltipContext>(
    () => ({ size, radius, outlined }),
    [size, radius, outlined],
  );

  return (
    <TooltipContext value={ctx}>
      <Tooltip.Root {...otherProps} handle={handle} />
    </TooltipContext>
  );
};

export { TooltipRoot as Root };

export namespace Root {
  export type State = TooltipRootState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = TooltipRootProps.Render;

    export type SuruUI<TPayload = any> = TooltipRootProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = TooltipRootProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = TooltipRootProps.HTML<TPayload>;
  }

  export type Actions = TooltipRootActions;

  export type ChangeEventDetails = TooltipRootChangeEventDetails;

  export type ChangeEventReason = TooltipRootChangeEventReason;

  export type Radius = TooltipRootRadius;

  export type Size = TooltipRootSize;
}
