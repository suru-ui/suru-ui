import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import type { Override, IComponent } from "../../types.js";
import type { PopoverHandle } from "../handle/popover.handle.js";
import type { PopoverContextSize, PopoverContextRadius } from "./popover.root.context.js";
import { PopoverContext } from "./popover.root.context.js";

/**
 * {@link PopoverRoot} を命令的に操作するためのオブジェクトです。
 */
export type PopoverRootActions = Popover.Root.Actions;

/**
 * {@link PopoverRoot} の開閉状態を変更するイベントの詳細です。
 */
export type PopoverRootChangeEventDetails = Popover.Root.ChangeEventDetails;

/**
 * {@link PopoverRoot} の開閉状態を変更する理由です。
 */
export type PopoverRootChangeEventReason = Popover.Root.ChangeEventReason;

/**
 * ポップオーバーの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type PopoverRootRadius = PopoverContextRadius;

/**
 * ポップオーバーの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type PopoverRootSize = PopoverContextSize;

/**
 * {@link PopoverRoot} が持つ状態です。
 */
export type PopoverRootState = Override<PopoverContext, Popover.Root.State>;

export namespace PopoverRootProps {
  export type Render = {};

  export type SuruUI<TPayload = any> = {
    /**
     * ポップオーバーとトリガー ({@link Trigger}) を関連付けるハンドルです。
     *
     * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
     */
    handle?: PopoverHandle<TPayload> | undefined;

    /**
     * ポップオーバーの周囲に枠線を表示するかどうかを指定します。
     *
     * @default true
     */
    outlined?: boolean | undefined;

    /**
     * ポップオーバーの角丸を指定します。
     *
     * 既定値は {@link PopoverRootProps.size|size} です。
     */
    radius?: PopoverRootRadius | undefined;

    /**
     * ポップオーバーの大きさを指定します。
     *
     * @default "md"
     */
    size?: PopoverRootSize | undefined;
  };

  export type BaseUI<TPayload = any> = Omit<
    Pick<
      React.ComponentProps<typeof Popover.Root<TPayload>>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // PopoverRootProps より :
      | "defaultOpen"
      | "open"
      | "onOpenChange"
      | "onOpenChangeComplete"
      | "actionsRef"
      | "modal"
      | "triggerId"
      | "defaultTriggerId"
      | "children"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof Popover.Root<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverRoot} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type PopoverRootProps<TPayload = any> = PopoverRootProps.Render &
  PopoverRootProps.SuruUI<TPayload> &
  PopoverRootProps.BaseUI<TPayload> &
  PopoverRootProps.HTML<TPayload>;

/**
 * {@link PopoverRoot} のコンポーネント型です。
 */
export interface IPopoverRoot extends IComponent<PopoverRootProps> {
  /**
   * @template TPayload トリガーから受け取るデータの型です。
   */
  <TPayload = any>(props: PopoverRootProps<TPayload>): IComponent.Return;
}

/**
 * ポップオーバーのルートです。
 *
 * ポップオーバーの開閉状態を管理し、各パーツをグループ化します。それ自身は HTML 要素をレンダリングしません。
 */
export const PopoverRoot: IPopoverRoot = <TPayload,>(props: PopoverRootProps<TPayload>) => {
  const { size = "md", handle, radius = size, outlined = true, ...otherProps } = props;
  const ctx = React.useMemo<PopoverContext>(
    () => ({
      size,
      radius,
      outlined,
    }),
    [size, radius, outlined],
  );

  return (
    <PopoverContext value={ctx}>
      <Popover.Root {...otherProps} handle={handle} />
    </PopoverContext>
  );
};

export { PopoverRoot as Root };
export namespace Root {
  export type State = PopoverRootState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = PopoverRootProps.Render;

    export type SuruUI<TPayload = any> = PopoverRootProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = PopoverRootProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = PopoverRootProps.HTML<TPayload>;
  }

  export type Actions = PopoverRootActions;

  export type ChangeEventDetails = PopoverRootChangeEventDetails;

  export type ChangeEventReason = PopoverRootChangeEventReason;

  export type Radius = PopoverRootRadius;

  export type Size = PopoverRootSize;
}
