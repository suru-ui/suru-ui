import { Progress } from "@base-ui/react/progress";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { useProgressContext } from "../root/progress.root.context.js";
import { ProgressValueContext } from "./progress.value.context.js";

/** 値をレンダリングする関数のインターフェイスです。 */
export interface IProgressValueRenderer {
  /**
   * 進捗の現在値をレンダリングします。
   *
   * 不確定状態では `formattedValue` に `"indeterminate"` が渡されます。
   *
   * @param formattedValue 書式化された値です。
   * @param value 現在値です。
   *
   * @returns レンダリングする内容です。
   */
  (formattedValue: string | null, value: number | null): React.ReactNode;
}

/**
 * {@link ProgressValue} が持つ状態です。
 */
export type ProgressValueState = ProgressValueContext;

export namespace ProgressValueProps {
  export type Render = RenderProps<ProgressValueState>;

  export type SuruUI = {};

  export type BaseUI = Override<
    Omit<
      Pick<
        React.ComponentProps<typeof Progress.Value>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // ProgressValueProps より :
        "children"
      >,
      keyof Render | keyof SuruUI
    >,
    // Base UI の型を強化します。
    {
      children?: IProgressValueRenderer | React.ReactNode | undefined;
    }
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Progress.Value>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ProgressValue} に渡す props です。
 */
export type ProgressValueProps = ProgressValueProps.Render &
  ProgressValueProps.SuruUI &
  ProgressValueProps.BaseUI &
  ProgressValueProps.HTML;

export type IProgressValue = IComponent<ProgressValueProps>;

/**
 * 進捗の現在値を表示するコンポーネントです。
 *
 * 不確定状態では既定の表示が空になります。
 */
export const ProgressValue: IProgressValue = (props) => {
  const ctx = useProgressContext();
  const { style, render, children, className, ...otherProps } = props;
  let renderer;

  if (typeof children === "function") {
    renderer = children;
  } else if (children !== null && children !== undefined) {
    renderer = (): React.ReactNode => children;
  }

  return (
    <Progress.Value
      {...otherProps}
      {...proxyRenderProps<Progress.Value.State, ProgressValueState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <ProgressValueContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </ProgressValueContext>
          ),
          className: cn<ProgressValueState>(
            className,
            "sui_progress_value",
            (state) => `sui_progress_value-size_${state.size}`,
            (state) => `sui_progress_value-color_${state.color}`,
            (state) => `sui_progress_value-radius_${state.radius}`,
            (state) => `sui_progress_value-variant_${state.variant}`,
            (state) => state.outlined && "sui_progress_value-outlined",
            (state) => `sui_progress_value-status_${state.status}`,
          ),
        },
      )}
    >
      {renderer}
    </Progress.Value>
  );
};

export { ProgressValue as Value };
export namespace Value {
  export type State = ProgressValueState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ProgressValueProps.Render;

    export type SuruUI = ProgressValueProps.SuruUI;

    export type BaseUI = ProgressValueProps.BaseUI;

    export type HTML = ProgressValueProps.HTML;
  }

  export type IRenderer = IProgressValueRenderer;
}
