import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SelectBackdrop} が持つ状態です。
 */
export type SelectBackdropState = BaseSelect.Backdrop.State;

export namespace SelectBackdropProps {
  export type Render = RenderProps<SelectBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectBackdropProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectBackdrop} に渡す props です。
 */
export type SelectBackdropProps = SelectBackdropProps.Render &
  SelectBackdropProps.SuruUI &
  SelectBackdropProps.BaseUI &
  SelectBackdropProps.HTML;

/**
 * ポップアップの背後に表示される要素です。
 */
export const SelectBackdrop: IComponent<SelectBackdropProps> = function SuiSelectBackdrop(props) {
  const { className, ...otherProps } = props;

  return (
    <BaseSelect.Backdrop
      {...otherProps}
      className={cn(
        className,
        "sui_select_backdrop",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_select_backdrop-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { SelectBackdrop as Backdrop };

/**
 * {@link SelectBackdrop} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Backdrop {
  export type State = SelectBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectBackdropProps.Render;

    export type SuruUI = SelectBackdropProps.SuruUI;

    export type BaseUI = SelectBackdropProps.BaseUI;

    export type HTML = SelectBackdropProps.HTML;
  }
}
