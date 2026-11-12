import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { usePopoverPopupContext } from "../popup/popover.popup.context.js";
import { PopoverDescriptionContext } from "./popover.description.context.js";

/**
 * {@link PopoverDescription} が持つ状態です。
 */
export type PopoverDescriptionState = PopoverDescriptionContext;

export namespace PopoverDescriptionProps {
  export type Render = RenderProps<PopoverDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Popover.Description>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // PopoverDescriptionProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Description>,
    keyof Render | keyof SuruUI
  >;
}

/**
 * {@link PopoverDescription} に渡す props です。
 */
export type PopoverDescriptionProps = PopoverDescriptionProps.Render &
  PopoverDescriptionProps.SuruUI &
  PopoverDescriptionProps.BaseUI &
  PopoverDescriptionProps.HTML;

export type IPopoverDescription = IComponent<PopoverDescriptionProps>;

/** ポップオーバーの説明文を表示する段落要素です。 */
export const PopoverDescription: IPopoverDescription = (props) => {
  const ctx = usePopoverPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Popover.Description
      {...otherProps}
      {...proxyRenderProps<Popover.Description.State, PopoverDescriptionState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <PopoverDescriptionContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="p"
              />
            </PopoverDescriptionContext>
          ),
          className: cn<PopoverDescriptionState>(
            className,
            "sui_popover_description",
            (state) => `sui_popover_description-size_${state.size}`,
            (state) => `sui_popover_description-radius_${state.radius}`,
            (state) => state.outlined && "sui_popover_description-outlined",
            (state) => state.open && "sui_popover_description-open",
            (state) => state.anchorHidden && "sui_popover_description-anchor_hidden",
            (state) => state.instant && "sui_popover_description-instant",
            (state) => `sui_popover_description-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_popover_description-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_popover_description-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    />
  );
};

export { PopoverDescription as Description };
export namespace Description {
  export type State = PopoverDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverDescriptionProps.Render;

    export type SuruUI = PopoverDescriptionProps.SuruUI;

    export type BaseUI = PopoverDescriptionProps.BaseUI;

    export type HTML = PopoverDescriptionProps.HTML;
  }
}
