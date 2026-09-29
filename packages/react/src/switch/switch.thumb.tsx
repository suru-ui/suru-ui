import { Switch } from "@base-ui/react/switch";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SwitchThumb} が持つ状態です。
 */
export type SwitchThumbState = Switch.Thumb.State;

export namespace SwitchThumbProps {
  export type Render = RenderProps<SwitchThumbState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Switch.Thumb>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SwitchThumbProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Switch.Thumb>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SwitchThumb} に渡す props です。
 */
export type SwitchThumbProps = SwitchThumbProps.Render &
  SwitchThumbProps.SuruUI &
  SwitchThumbProps.BaseUI &
  SwitchThumbProps.HTML;

export type ISwitchThumb = IComponent<SwitchThumbProps>;

/**
 * スイッチのつまみコンポーネントです。
 *
 * オンとオフの状態を示し、選択状態に応じて移動します。
 */
export const SwitchThumb: ISwitchThumb = function SuiSwitchThumb(props) {
  const { className, ...otherProps } = props;

  return <Switch.Thumb {...otherProps} className={cn(className, "sui_switch_thumb")} />;
};

export { SwitchThumb as Thumb };

export namespace Thumb {
  export type State = SwitchThumbState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SwitchThumbProps.Render;

    export type SuruUI = SwitchThumbProps.SuruUI;

    export type BaseUI = SwitchThumbProps.BaseUI;

    export type HTML = SwitchThumbProps.HTML;
  }
}
