import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./stat.css";

// Context
// -------

/**
 * 統計の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
type StatContextSize = Size;

/**
 * {@link StatRoot} が子パーツへ提供するコンテキストです。
 */
export type StatContext = {
  /**
   * 統計の大きさです。
   */
  readonly size: StatContextSize;
};

/**
 * {@link StatRoot} が子パーツへ提供するコンテキストです。
 */
export const StatContext: React.Context<StatContext | null> =
  React.createContext<StatContext | null>(null);

function useSuiStatContext(optional?: false): StatContext;
function useSuiStatContext(optional?: boolean): StatContext | null;
function useSuiStatContext(optional?: boolean): StatContext | null {
  const ctx = React.use(StatContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "StatContext",
      providerName: "StatRoot",
    });
  }

  return ctx;
}

/**
 * {@link StatContext} を読み取るフックです。
 */
export const useStatContext: IUseContext<StatContext> = useSuiStatContext;

export { StatContext as Context, useStatContext as useContext };

export namespace Context {
  export type Size = StatContextSize;
}

// Root
// ----

/**
 * 統計の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type StatRootSize = Size;

/**
 * {@link StatRoot} が持つ状態です。
 */
export type StatRootState = {};

export namespace StatRootProps {
  export type Render = RenderProps<StatRootState>;

  export type SuruUI = {
    /**
     * 統計の大きさを指定します。
     *
     * @default "md"
     */
    size?: StatRootSize | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"dl", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link StatRoot} に渡す props です。
 */
export type StatRootProps = StatRootProps.Render &
  StatRootProps.SuruUI &
  StatRootProps.BaseUI &
  StatRootProps.HTML;

/**
 * ラベルと値の組で統計を表示するルートコンポーネントです。
 *
 * `dl` 要素を描画し、大きさをコンテキストで子パーツへ伝えます。
 */
export const StatRoot: IComponent<StatRootProps> = function SuiStatRoot(props) {
  const {
    size = "md",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDlProps
  } = props;
  const ctx = React.useMemo<StatContext>(() => ({ size }), [size]);
  const element = useRender({
    props: [
      otherDlProps,
      {
        className: cn("sui_stat", `sui_stat-size_${size}`),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "dl",
  });

  return <StatContext value={ctx}>{element}</StatContext>;
};

export { StatRoot as Root };

export namespace Root {
  export type State = StatRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = StatRootProps.Render;

    export type SuruUI = StatRootProps.SuruUI;

    export type BaseUI = StatRootProps.BaseUI;

    export type HTML = StatRootProps.HTML;
  }

  export type Size = StatRootSize;
}

// Label
// -----

/**
 * {@link StatLabel} が持つ状態です。
 */
export type StatLabelState = {};

export namespace StatLabelProps {
  export type Render = RenderProps<StatLabelState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"dt", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link StatLabel} に渡す props です。
 */
export type StatLabelProps = StatLabelProps.Render &
  StatLabelProps.SuruUI &
  StatLabelProps.BaseUI &
  StatLabelProps.HTML;

/**
 * 統計のラベルを表すコンポーネントです。
 *
 * `dt` 要素を描画します。
 */
export const StatLabel: IComponent<StatLabelProps> = function SuiStatLabel(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_stat_label",
      },
    ],
    defaultTagName: "dt",
  });
};

export { StatLabel as Label };

export namespace Label {
  export type State = StatLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = StatLabelProps.Render;

    export type SuruUI = StatLabelProps.SuruUI;

    export type BaseUI = StatLabelProps.BaseUI;

    export type HTML = StatLabelProps.HTML;
  }
}

// Value
// -----

/**
 * {@link StatValue} が持つ状態です。
 */
export type StatValueState = {};

export namespace StatValueProps {
  export type Render = RenderProps<StatValueState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"dd", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link StatValue} に渡す props です。
 */
export type StatValueProps = StatValueProps.Render &
  StatValueProps.SuruUI &
  StatValueProps.BaseUI &
  StatValueProps.HTML;

/**
 * 統計の値を表すコンポーネントです。
 *
 * `dd` 要素を描画します。
 */
export const StatValue: IComponent<StatValueProps> = function SuiStatValue(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_stat_value",
      },
    ],
    defaultTagName: "dd",
  });
};

export { StatValue as Value };

export namespace Value {
  export type State = StatValueState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = StatValueProps.Render;

    export type SuruUI = StatValueProps.SuruUI;

    export type BaseUI = StatValueProps.BaseUI;

    export type HTML = StatValueProps.HTML;
  }
}

// ValueUnit
// ---------

/**
 * {@link StatValueUnit} が持つ状態です。
 */
export type StatValueUnitState = {};

export namespace StatValueUnitProps {
  export type Render = RenderProps<StatValueUnitState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link StatValueUnit} に渡す props です。
 */
export type StatValueUnitProps = StatValueUnitProps.Render &
  StatValueUnitProps.SuruUI &
  StatValueUnitProps.BaseUI &
  StatValueUnitProps.HTML;

/**
 * 統計の値の単位を表すコンポーネントです。
 *
 * `span` 要素を描画し、{@link StatValue} の子として使用します。
 */
export const StatValueUnit: IComponent<StatValueUnitProps> = function SuiStatValueUnit(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_stat_value_unit",
      },
    ],
    defaultTagName: "span",
  });
};

export { StatValueUnit as ValueUnit };

export namespace ValueUnit {
  export type State = StatValueUnitState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = StatValueUnitProps.Render;

    export type SuruUI = StatValueUnitProps.SuruUI;

    export type BaseUI = StatValueUnitProps.BaseUI;

    export type HTML = StatValueUnitProps.HTML;
  }
}

// Trend
// -----

/**
 * 統計の変化の方向です。
 *
 * - `"up"`: 増加を示します
 * - `"down"`: 減少を示します
 * - `"flat"`: 変化なしを示します
 */
export type StatTrendDirection = "up" | "down" | "flat";

/**
 * {@link StatTrend} が持つ状態です。
 */
export type StatTrendState = {};

export namespace StatTrendProps {
  export type Render = RenderProps<StatTrendState>;

  export type SuruUI = {
    /**
     * 変化の方向を指定します。
     *
     * 方向に応じた矢印が値の前に表示され、色が変わります。
     *
     * @default "up"
     */
    direction?: StatTrendDirection | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"dd", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link StatTrend} に渡す props です。
 */
export type StatTrendProps = StatTrendProps.Render &
  StatTrendProps.SuruUI &
  StatTrendProps.BaseUI &
  StatTrendProps.HTML;

function getTrendDirectionFromNumber(value: number): StatTrendDirection {
  if (value === 0) {
    return "flat";
  }

  return value < 0 ? "down" : "up";
}

const TREND_DIRECTION_NUMBER = /([+\-−]?)[^\d\n+\-−]*?([\d,]+(?:\.\d+)?)/;

function getTrendDirectionFromString(value: string): StatTrendDirection | null {
  const match = TREND_DIRECTION_NUMBER.exec(value.normalize("NFKC"));
  if (match === null) {
    return null;
  }

  const [, sign = "", digits = ""] = match;
  const magnitude = Number(digits.replaceAll(",", ""));
  if (!Number.isFinite(magnitude)) {
    return null;
  }

  if (magnitude === 0) {
    return "flat";
  }

  return sign === "-" || sign === "−" ? "down" : "up";
}

function getDefaultTrendDirection(value: React.ReactNode): StatTrendDirection {
  if (typeof value === "number" && Number.isFinite(value)) {
    return getTrendDirectionFromNumber(value);
  }
  if (typeof value === "string") {
    return getTrendDirectionFromString(value) ?? "flat";
  }

  return "flat";
}

/**
 * 統計値の変化を示すインジケーターコンポーネントです。
 *
 * `dd` 要素を描画し、前回からの増減を矢印と色で示します。
 */
export const StatTrend: IComponent<StatTrendProps> = function SuiStatTrend(props) {
  const { children, direction = getDefaultTrendDirection(children), ...otherDdProps } = props;

  return useRender({
    props: [
      otherDdProps,
      {
        children,
        className: cn("sui_stat_trend", `sui_stat_trend-direction_${direction}`),
      },
    ],
    defaultTagName: "dd",
  });
};

export { StatTrend as Trend };

export namespace Trend {
  export type State = StatTrendState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = StatTrendProps.Render;

    export type SuruUI = StatTrendProps.SuruUI;

    export type BaseUI = StatTrendProps.BaseUI;

    export type HTML = StatTrendProps.HTML;
  }

  export type Direction = StatTrendDirection;
}

// Description
// -----------

/**
 * {@link StatDescription} が持つ状態です。
 */
export type StatDescriptionState = {};

export namespace StatDescriptionProps {
  export type Render = RenderProps<StatDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"dd", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link StatDescription} に渡す props です。
 */
export type StatDescriptionProps = StatDescriptionProps.Render &
  StatDescriptionProps.SuruUI &
  StatDescriptionProps.BaseUI &
  StatDescriptionProps.HTML;

/**
 * 統計の補足説明を表すコンポーネントです。
 *
 * `dd` 要素を描画します。
 */
export const StatDescription: IComponent<StatDescriptionProps> = function SuiStatDescription(
  props,
) {
  return useRender({
    props: [
      props,
      {
        className: "sui_stat_description",
      },
    ],
    defaultTagName: "dd",
  });
};

export { StatDescription as Description };

export namespace Description {
  export type State = StatDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = StatDescriptionProps.Render;

    export type SuruUI = StatDescriptionProps.SuruUI;

    export type BaseUI = StatDescriptionProps.BaseUI;

    export type HTML = StatDescriptionProps.HTML;
  }
}
