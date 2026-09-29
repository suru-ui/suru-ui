import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SelectPositioner} が持つ状態です。
 */
export type SelectPositionerState = BaseSelect.Positioner.State;

export namespace SelectPositionerProps {
  export type Render = RenderProps<SelectPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Positioner>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // UseAnchorPositioningSharedParameters:
      | "anchor"
      | "positionMethod"
      | "side"
      | "sideOffset"
      | "align"
      | "alignOffset"
      | "collisionBoundary"
      | "collisionPadding"
      | "sticky"
      | "arrowPadding"
      | "disableAnchorTracking"
      | "collisionAvoidance"
      // SelectPositionerProps:
      | "alignItemWithTrigger",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectPositioner} に渡す props です。
 */
export type SelectPositionerProps = SelectPositionerProps.Render &
  SelectPositionerProps.SuruUI &
  SelectPositionerProps.BaseUI &
  SelectPositionerProps.HTML;

export type ISelectPositioner = IComponent<SelectPositionerProps>;

/**
 * ポップアップをトリガーへ位置合わせする要素です。
 */
export const SelectPositioner: ISelectPositioner = function SuiSelectPositioner(props) {
  const { className, ...otherProps } = props;

  return (
    <BaseSelect.Positioner {...otherProps} className={cn(className, "sui_select_positioner")} />
  );
};

export { SelectPositioner as Positioner };

export namespace Positioner {
  export type State = SelectPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectPositionerProps.Render;

    export type SuruUI = SelectPositionerProps.SuruUI;

    export type BaseUI = SelectPositionerProps.BaseUI;

    export type HTML = SelectPositionerProps.HTML;
  }
}
