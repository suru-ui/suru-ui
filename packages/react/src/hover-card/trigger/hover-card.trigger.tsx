import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import type { HoverCardHandle } from "../handle/hover-card.handle.js";
import { type HoverCardContext, useHoverCardContext } from "../root/hover-card.root.context.js";
import { HoverCardTriggerContext } from "./hover-card.trigger.context.js";

/**
 * {@link HoverCardTrigger} が持つ状態です。
 */
export type HoverCardTriggerState = Override<HoverCardContext, PreviewCard.Trigger.State>;

export namespace HoverCardTriggerProps {
  export type Render = Omit<RenderProps<HoverCardTriggerState>, "render">;

  export type SuruUI<TPayload = any> = {
    /**
     * ホバーの反応対象としてレンダリングする要素です。
     *
     * Base UI の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
     */
    children: NonNullable<RenderProps<HoverCardTriggerState>["render"]>;

    /**
     * ホバーカード ({@link Root}) を関連付けるハンドルです。
     *
     * {@link createHandle} で作成し、{@link Root} と共有します。Root 内に配置する場合は省略できます。
     */
    handle?: HoverCardHandle<TPayload> | undefined;
  };

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof PreviewCard.Trigger<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardTriggerProps:
      "payload" | "delay" | "closeDelay",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof PreviewCard.Trigger<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardTrigger} に渡す props です。
 *
 * @template TPayload トリガーから渡すデータの型です。
 */
export type HoverCardTriggerProps<TPayload = any> = HoverCardTriggerProps.Render &
  HoverCardTriggerProps.SuruUI<TPayload> &
  HoverCardTriggerProps.BaseUI<TPayload> &
  HoverCardTriggerProps.HTML<TPayload>;

/**
 * {@link HoverCardTrigger} のコンポーネント型です。
 */
export interface IHoverCardTrigger extends IComponent<HoverCardTriggerProps> {
  /**
   * @template TPayload トリガーから渡すデータの型です。
   */
  <TPayload = any>(props: HoverCardTriggerProps<TPayload>): IComponent.Return;
}

/**
 * ホバーカードを開くトリガー要素です。
 *
 * 要素にマウスカーソルを重ねると、遅延の後にホバーカードが開きます。
 * 子要素は何にもラップされず、そのまま Base UI の `render` プロパティーに渡されます。
 */
export const HoverCardTrigger: IHoverCardTrigger = function SuiHoverCardTrigger<TPayload>(
  props: HoverCardTriggerProps<TPayload>,
) {
  const ctx = useHoverCardContext(true);
  const { style, handle, children, className, ...otherProps } = props;

  return (
    <PreviewCard.Trigger
      {...otherProps}
      handle={handle}
      {...proxyRenderProps<PreviewCard.Trigger.State, HoverCardTriggerState>(
        (state) => ({ size: "md", radius: "md", outlined: false, ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <HoverCardTriggerContext value={state}>
              <RenderElement
                state={state}
                render={children}
                htmlProps={htmlProps}
                defaultTagName="button"
              />
            </HoverCardTriggerContext>
          ),
          className: cn<HoverCardTriggerState>(
            className,
            "sui_hover_card_trigger",
            (state) => `sui_hover_card_trigger-size_${state.size}`,
            (state) => `sui_hover_card_trigger-radius_${state.radius}`,
            (state) => state.outlined && "sui_hover_card_trigger-outlined",
            (state) => state.open && "sui_hover_card_trigger-open",
          ),
        },
      )}
    />
  );
};

export { HoverCardTrigger as Trigger };

export namespace Trigger {
  export type State = HoverCardTriggerState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = HoverCardTriggerProps.Render;

    export type SuruUI<TPayload = any> = HoverCardTriggerProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = HoverCardTriggerProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = HoverCardTriggerProps.HTML<TPayload>;
  }
}
