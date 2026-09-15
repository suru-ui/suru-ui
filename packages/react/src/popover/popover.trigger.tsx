import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { type PopoverHandle } from "./popover.handle.js";

/**
 * {@link PopoverTrigger} が持つ状態です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type PopoverTriggerState = Popover.Trigger.State;

export namespace PopoverTriggerProps {
  export type Render = RenderProps<PopoverTriggerState>;

  export type SuruUI<TPayload = any> = {
    /**
     * ボタンとしてレンダリングする要素です。
     *
     * {@link Popover.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
     */
    children: NonNullable<React.ComponentProps<typeof Popover.Trigger>["render"]>;

    /**
     * ポップオーバー ({@link Root}) を関連付けるハンドルです。
     *
     * {@link createHandle} で作成し、{@link Root} と共有します。Root 内に配置する場合は省略できます。
     */
    handle?: PopoverHandle<TPayload> | undefined;
  };

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof Popover.Trigger<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // PopoverTriggerProps:
      | "payload"
      | "id"
      | "openOnHover"
      | "delay"
      | "closeDelay",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof Popover.Trigger<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverTrigger} に渡す props です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type PopoverTriggerProps<TPayload = any> = PopoverTriggerProps.Render &
  PopoverTriggerProps.SuruUI<TPayload> &
  PopoverTriggerProps.BaseUI<TPayload> &
  PopoverTriggerProps.HTML<TPayload>;

/**
 * {@link PopoverTrigger} のコンポーネント型です。
 */
interface IPopoverTrigger extends IComponent<PopoverTriggerProps> {
  /**
   * @template TPayload トリガーから渡すデータの型です。
   */
  <TPayload = any>(props: PopoverTriggerProps<TPayload>): IComponent.Return;
}

/**
 * ポップオーバーを開くトリガー要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link Popover.Trigger} の `render` プロパティーに渡されます。
 */
export const PopoverTrigger: IPopoverTrigger = function SuiPopoverTrigger<TPayload>(
  props: PopoverTriggerProps<TPayload>,
) {
  const { handle, children, className, ...otherProps } = props;

  return (
    <Popover.Trigger
      {...otherProps}
      handle={handle}
      render={children}
      className={cn(className, "sui_popover_trigger")}
    />
  );
};

export { PopoverTrigger as Trigger };

export namespace Trigger {
  export type State = PopoverTriggerState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = PopoverTriggerProps.Render;

    export type SuruUI<TPayload = any> = PopoverTriggerProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = PopoverTriggerProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = PopoverTriggerProps.HTML<TPayload>;
  }
}
