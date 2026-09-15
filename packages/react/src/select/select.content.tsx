import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SelectContent} が持つ状態です。
 */
export type SelectContentState = BaseSelect.Popup.State;

export namespace SelectContentProps {
  export type Render = RenderProps<SelectContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectContentProps:
      "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectContent} に渡す props です。
 */
export type SelectContentProps = SelectContentProps.Render &
  SelectContentProps.SuruUI &
  SelectContentProps.BaseUI &
  SelectContentProps.HTML;

/**
 * 選択項目を表示するポップアップ要素です。
 */
export const SelectContent: IComponent<SelectContentProps> = function SuiSelectContent(props) {
  const { className, ...otherProps } = props;

  return (
    <BaseSelect.Popup
      {...otherProps}
      className={cn(
        className,
        "sui_select_content",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_select_content-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { SelectContent as Content };

/**
 * {@link SelectContent} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Content {
  export type State = SelectContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectContentProps.Render;

    export type SuruUI = SelectContentProps.SuruUI;

    export type BaseUI = SelectContentProps.BaseUI;

    export type HTML = SelectContentProps.HTML;
  }
}
