import { Meter } from "@base-ui/react/meter";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { useMeterContext } from "../root/meter.root.context.js";
import { MeterValueContext } from "./meter.value.context.js";

/** 値をレンダリングする関数のインターフェイスです。 */
export interface IMeterValueRenderer {
  /**
   * 値をレンダリングします。
   *
   * @param formattedValue 書式化された値です。
   * @param value 現在値です。
   *
   * @returns レンダリングする内容です。
   */
  (formattedValue: string, value: number): React.ReactNode;
}

/**
 * {@link MeterValue} が持つ状態です。
 */
export type MeterValueState = MeterValueContext;

export namespace MeterValueProps {
  export type Render = RenderProps<MeterValueState>;

  export type SuruUI = {};

  export type BaseUI = Override<
    Omit<
      Pick<
        React.ComponentProps<typeof Meter.Value>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // MeterValueProps より :
        "children"
      >,
      keyof Render | keyof SuruUI
    >,
    {
      children?: IMeterValueRenderer | React.ReactNode | undefined;
    }
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Meter.Value>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MeterValue} に渡す props です。
 */
export type MeterValueProps = MeterValueProps.Render &
  MeterValueProps.SuruUI &
  MeterValueProps.BaseUI &
  MeterValueProps.HTML;

export type IMeterValue = IComponent<MeterValueProps>;

/** メーターの現在値を表示するコンポーネントです。 */
export const MeterValue: IMeterValue = (props) => {
  const ctx = useMeterContext();
  const { style, render, children, className, ...otherProps } = props;
  let renderer;

  if (typeof children === "function") {
    renderer = children;
  } else if (children !== null && children !== undefined) {
    renderer = (): React.ReactNode => children;
  }

  return (
    <Meter.Value
      {...otherProps}
      {...proxyRenderProps<Meter.Value.State, MeterValueState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <MeterValueContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </MeterValueContext>
          ),
          className: cn<MeterValueState>(
            className,
            "sui_meter_value",
            (state) => `sui_meter_value-size_${state.size}`,
            (state) => `sui_meter_value-color_${state.color}`,
            (state) => `sui_meter_value-radius_${state.radius}`,
            (state) => `sui_meter_value-variant_${state.variant}`,
            (state) => state.outlined && "sui_meter_value-outlined",
          ),
        },
      )}
    >
      {renderer}
    </Meter.Value>
  );
};

export { MeterValue as Value };
export namespace Value {
  export type State = MeterValueState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MeterValueProps.Render;

    export type SuruUI = MeterValueProps.SuruUI;

    export type BaseUI = MeterValueProps.BaseUI;

    export type HTML = MeterValueProps.HTML;
  }

  export type IRenderer = IMeterValueRenderer;
}
