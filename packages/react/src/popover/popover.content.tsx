import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link PopoverContent} が持つ状態です。
 */
export type PopoverContentState = Popover.Popup.State;

export namespace PopoverContentProps {
  export type Render = RenderProps<PopoverContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverContentProps:
      "initialFocus" | "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverContent} に渡す props です。
 */
export type PopoverContentProps = PopoverContentProps.Render &
  PopoverContentProps.SuruUI &
  PopoverContentProps.BaseUI &
  PopoverContentProps.HTML;

/**
 * ポップオーバーの内容を表示するポップアップ要素です。
 */
export const PopoverContent: IComponent<PopoverContentProps> = function SuiPopoverContent(props) {
  const { className, ...otherProps } = props;

  return (
    <Popover.Popup
      {...otherProps}
      className={cn(
        className,
        "sui_popover_content",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_popover_content-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { PopoverContent as Content };

export namespace Content {
  export type State = PopoverContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverContentProps.Render;

    export type SuruUI = PopoverContentProps.SuruUI;

    export type BaseUI = PopoverContentProps.BaseUI;

    export type HTML = PopoverContentProps.HTML;
  }
}
