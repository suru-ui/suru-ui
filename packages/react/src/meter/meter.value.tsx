import { Meter } from "@base-ui/react/meter";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";

/**
 * 値をレンダリングする関数のインターフェイスです。
 */
export interface IMeterValueRenderer {
  /**
   * 値をレンダリングします。
   *
   * @param formattedValue 書式化された値です。
   * @param value 現在値です。
   * @returns レンダリングする内容です。
   */
  (formattedValue: string, value: number): React.ReactNode;
}

/**
 * {@link MeterValue} が持つ状態です。
 */
export type MeterValueState = Meter.Value.State;

export namespace MeterValueProps {
  export type Render = RenderProps<MeterValueState>;

  export type SuruUI = {};

  export type BaseUI = Override<
    Pick<
      React.ComponentProps<typeof Meter.Value>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // MeterValueProps:
        "children",
        keyof Render | keyof SuruUI
      >
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

/**
 * メーターの現在値を表示するコンポーネントです。
 */
export const MeterValue: IMeterValue = function SuiMeterValue(props) {
  const { children, className, ...otherProps } = props;
  const renderer =
    typeof children === "function" ? children : children != null ? () => children : undefined;

  return (
    <Meter.Value {...otherProps} className={cn(className, "sui_meter_value")}>
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
