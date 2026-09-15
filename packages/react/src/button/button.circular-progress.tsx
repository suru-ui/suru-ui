import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { ButtonCircularProgressContext } from "./button.circular-progress.context.js";

/**
 * {@link ButtonCircularProgress} が持つ状態です。
 */
export type ButtonCircularProgressState = ButtonCircularProgressContext;

export namespace ButtonCircularProgressProps {
  export type Render = RenderProps<ButtonCircularProgressState>;

  export type SuruUI = {
    /**
     * 不定モードで表示するかどうかを指定します。
     *
     * @default false
     */
    indeterminate?: boolean | undefined;

    /**
     * 進行状況をパーセンテージ（0〜100）で指定します。
     *
     * 未定義または負の値の場合は不定モードになります。
     */
    percentage?: number | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"svg", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ButtonCircularProgress} に渡す props です。
 */
export type ButtonCircularProgressProps = ButtonCircularProgressProps.Render &
  ButtonCircularProgressProps.SuruUI &
  ButtonCircularProgressProps.BaseUI &
  ButtonCircularProgressProps.HTML;

/**
 * 円形プログレスバーの SVG ルートコンポーネントです。
 */
export const ButtonCircularProgress: IComponent<ButtonCircularProgressProps> =
  function SuiButtonCircularProgress(props) {
    const {
      fill = "none",
      width = "100%",
      xmlns = "http://www.w3.org/2000/svg",
      height = "100%",
      viewBox = "0 0 24 24",
      percentage,
      indeterminate = percentage === undefined || percentage < 0,
      ...otherSvgProps
    } = props;
    const ctx = React.useMemo<ButtonCircularProgressContext>(
      () => ({ percentage, indeterminate }),
      [percentage, indeterminate],
    );
    const element = useRender({
      props: [
        otherSvgProps,
        {
          fill,
          width,
          xmlns,
          height,
          viewBox,
          className: "sui_button_circular_progress",
        },
      ],
      state: ctx,
      defaultTagName: "svg",
    });

    return <ButtonCircularProgressContext value={ctx}>{element}</ButtonCircularProgressContext>;
  };

export { ButtonCircularProgress as CircularProgress };

export namespace CircularProgress {
  export type State = ButtonCircularProgressState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ButtonCircularProgressProps.Render;

    export type SuruUI = ButtonCircularProgressProps.SuruUI;

    export type BaseUI = ButtonCircularProgressProps.BaseUI;

    export type HTML = ButtonCircularProgressProps.HTML;
  }
}
