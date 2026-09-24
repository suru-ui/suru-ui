import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AutocompletePositioner} の状態です。
 */
export type AutocompletePositionerState = Autocomplete.Positioner.State;

export namespace AutocompletePositionerProps {
  export type Render = RenderProps<AutocompletePositionerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Positioner>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // UseAnchorPositioningSharedParameters:
      | "align"
      | "alignOffset"
      | "anchor"
      | "arrowPadding"
      | "collisionAvoidance"
      | "collisionBoundary"
      | "collisionPadding"
      | "disableAnchorTracking"
      | "positionMethod"
      | "side"
      | "sideOffset"
      | "sticky",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompletePositioner} に渡す props です。
 */
export type AutocompletePositionerProps = AutocompletePositionerProps.Render &
  AutocompletePositionerProps.SuruUI &
  AutocompletePositionerProps.BaseUI &
  AutocompletePositionerProps.HTML;

export type IAutocompletePositioner = IComponent<AutocompletePositionerProps>;

/**
 * ポップアップを入力欄に位置合わせする要素です。
 */
export const AutocompletePositioner: IAutocompletePositioner = function SuiAutocompletePositioner(
  props,
) {
  const { side = "bottom", align = "start", className, sideOffset = 8, ...otherProps } = props;

  return (
    <Autocomplete.Positioner
      {...otherProps}
      side={side}
      align={align}
      className={cn(
        className,
        "sui_autocomplete_positioner",
        (state) => state.open && "sui_autocomplete_positioner-open",
        (state) => `sui_autocomplete_positioner-side_${state.side.replaceAll("-", "_")}`,
        (state) => `sui_autocomplete_positioner-align_${state.align}`,
        (state) => state.anchorHidden && "sui_autocomplete_positioner-anchorhidden",
        (state) => state.empty && "sui_autocomplete_positioner-empty",
      )}
      sideOffset={sideOffset}
    />
  );
};

export { AutocompletePositioner as Positioner };

export namespace Positioner {
  export type State = AutocompletePositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompletePositionerProps.Render;

    export type SuruUI = AutocompletePositionerProps.SuruUI;

    export type BaseUI = AutocompletePositionerProps.BaseUI;

    export type HTML = AutocompletePositionerProps.HTML;
  }
}
