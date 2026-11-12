import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { useStatContext } from "../root/stat.root.context.js";
import type { StatRootState } from "../root/stat.root.jsx";

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
export type StatTrendState = Override<
  StatRootState,
  {
    /** 変化の方向です。 */
    readonly direction: StatTrendDirection;
  }
>;

export namespace StatTrendProps {
  export type Render = RenderProps<StatTrendState>;

  export type SuruUI = {
    /**
     * 変化の方向を指定します。
     *
     * 方向に応じた矢印が値の前に表示され、色が変わります。
     *
     * 省略した場合は内容の先頭にある数値の符号から推測し、判断できないときは `"flat"` として扱います。
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

export type IStatTrend = IComponent<StatTrendProps>;

function getTrendDirectionFromNumber(value: number): StatTrendDirection {
  // 数値の符号から方向を求めます。
  if (value === 0) {
    return "flat";
  }

  return value < 0 ? "down" : "up";
}

const TREND_DIRECTION_NUMBER = /(?<sign>[+\-−]?)[^\d\n+\-−]*?(?<digits>[\d,]+(?:\.\d+)?)/u;

function getTrendDirectionFromString(value: string): StatTrendDirection | null {
  // 文字列の先頭にある数値の符号から方向を求めます。
  const match = TREND_DIRECTION_NUMBER.exec(value.normalize("NFKC"));

  if (match === null) {
    return null;
  }

  const { sign = "", digits = "" } = match.groups ?? {};
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
  // 内容から方向を推測します。数値以外は変化なしとして扱います。
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
export const StatTrend: IStatTrend = (props) => {
  const ctx = useStatContext();
  const { children, direction = getDefaultTrendDirection(children), ...otherDdProps } = props;
  const state = React.useMemo<StatTrendState>(
    () => ({
      ...ctx,
      direction,
    }),
    [ctx, direction],
  );

  return useRender({
    props: [
      otherDdProps,
      {
        children,
        className: cn<StatTrendState>(
          "sui_stat_trend",
          (currentState) => `sui_stat_trend-size_${currentState.size}`,
          (currentState) => `sui_stat_trend-direction_${currentState.direction}`,
        ),
      },
    ],
    state,
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
