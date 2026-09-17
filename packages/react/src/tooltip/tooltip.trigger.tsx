import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import type { TooltipHandle } from "./tooltip.handle.js";

/**
 * {@link TooltipTrigger} が持つ状態です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type TooltipTriggerState = Tooltip.Trigger.State;

export namespace TooltipTriggerProps {
  export type Render = RenderProps<TooltipTriggerState>;

  export type SuruUI<TPayload = any> = {
    /**
     * トリガーとしてレンダリングする要素です。
     *
     * {@link Tooltip.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
     */
    children: NonNullable<Tooltip.Trigger.Props<TPayload>["render"]>;

    /**
     * ツールチップを関連付けるハンドルです。
     *
     * {@link createHandle} で作成し、{@link Root} と共有します。Root 内に配置する場合は省略できます。
     */
    handle?: TooltipHandle<TPayload> | undefined;

    /**
     * このトリガーがクリックされたときにツールチップを開いたままにするかどうかを指定します。
     *
     * @default false
     */
    keepOpenOnClick?: boolean | undefined;
  };

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof Tooltip.Trigger<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // `handle` は SuruUI、`closeOnClick` は `keepOpenOnClick` で制御するため除きます。
      // TooltipTriggerProps:
      "payload" | "delay" | "closeDelay" | "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof Tooltip.Trigger<TPayload>>,
    // `closeOnClick` は `keepOpenOnClick` から求めるため公開しません。
    keyof Render | keyof SuruUI | keyof BaseUI | "closeOnClick"
  >;
}

/**
 * {@link TooltipTrigger} に渡す props です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type TooltipTriggerProps<TPayload = any> = TooltipTriggerProps.Render &
  TooltipTriggerProps.SuruUI<TPayload> &
  TooltipTriggerProps.BaseUI<TPayload> &
  TooltipTriggerProps.HTML<TPayload>;

/**
 * {@link TooltipTrigger} のコンポーネント型です。
 */
export interface ITooltipTrigger extends IComponent<TooltipTriggerProps> {
  /**
   * @template TPayload トリガーから渡すデータの型です。
   */
  <TPayload = any>(props: TooltipTriggerProps<TPayload>): IComponent.Return;
}

/**
 * ツールチップを開くトリガー要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link Tooltip.Trigger} の `render` プロパティーに渡されます。
 */
export const TooltipTrigger: ITooltipTrigger = function SuiTooltipTrigger<TPayload>(
  props: TooltipTriggerProps<TPayload>,
) {
  const { handle, children, className, keepOpenOnClick = false, ...otherProps } = props;

  return (
    <Tooltip.Trigger
      {...otherProps}
      handle={handle}
      render={children}
      className={cn(className, "sui_tooltip_trigger")}
      closeOnClick={!keepOpenOnClick}
    />
  );
};

export { TooltipTrigger as Trigger };

export namespace Trigger {
  export type State = TooltipTriggerState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = TooltipTriggerProps.Render;

    export type SuruUI<TPayload = any> = TooltipTriggerProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = TooltipTriggerProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = TooltipTriggerProps.HTML<TPayload>;
  }
}
