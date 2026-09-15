import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link PopoverArrow} が持つ状態です。
 */
export type PopoverArrowState = Popover.Arrow.State;

export namespace PopoverArrowProps {
  export type Render = RenderProps<PopoverArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Arrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverArrowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverArrow} に渡す props です。
 */
export type PopoverArrowProps = PopoverArrowProps.Render &
  PopoverArrowProps.SuruUI &
  PopoverArrowProps.BaseUI &
  PopoverArrowProps.HTML;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const PopoverArrow: IComponent<PopoverArrowProps> = function SuiPopoverArrow(props) {
  const { className, ...otherProps } = props;

  return (
    <Popover.Arrow
      {...otherProps}
      className={cn(
        className,
        "sui_popover_arrow",
        (state) => `sui_popover_arrow-side_${state.side}`,
      )}
    />
  );
};

export { PopoverArrow as Arrow };

export namespace Arrow {
  export type State = PopoverArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverArrowProps.Render;

    export type SuruUI = PopoverArrowProps.SuruUI;

    export type BaseUI = PopoverArrowProps.BaseUI;

    export type HTML = PopoverArrowProps.HTML;
  }
}
