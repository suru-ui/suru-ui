import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxPositioner} が持つ状態です。
 */
export type ComboboxPositionerState = Combobox.Positioner.State;

export namespace ComboboxPositionerProps {
  export type Render = RenderProps<ComboboxPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Positioner>,
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
      | "collisionAvoidance",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxPositioner} に渡す props です。
 */
export type ComboboxPositionerProps = ComboboxPositionerProps.Render &
  ComboboxPositionerProps.SuruUI &
  ComboboxPositionerProps.BaseUI &
  ComboboxPositionerProps.HTML;

/**
 * ポップアップを入力欄へ位置合わせする要素です。
 */
export const ComboboxPositioner: IComponent<ComboboxPositionerProps> =
  function SuiComboboxPositioner(props) {
    const { className, ...otherProps } = props;

    return (
      <Combobox.Positioner {...otherProps} className={cn(className, "sui_combobox_positioner")} />
    );
  };

export { ComboboxPositioner as Positioner };

export namespace Positioner {
  export type State = ComboboxPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxPositionerProps.Render;

    export type SuruUI = ComboboxPositionerProps.SuruUI;

    export type BaseUI = ComboboxPositionerProps.BaseUI;

    export type HTML = ComboboxPositionerProps.HTML;
  }
}
