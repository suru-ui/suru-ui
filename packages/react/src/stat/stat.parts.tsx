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
  /**
   * {@link StatContextSize}
   */
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
  export type HTML = Omit<React.ComponentProps<"dl">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<StatRootState>;

  export type SuruUI = {
    /**
     * 統計の大きさを指定します。
     *
     * @default "md"
     */
    size?: StatRootSize | undefined;
  };
}

/**
 * {@link StatRoot} に渡す props です。
 */
export type StatRootProps = StatRootProps.Render & StatRootProps.SuruUI & StatRootProps.HTML;

/**
 * ラベルと値の組で統計を表示するルートコンポーネントです。
 *
 * `dl` 要素を描画し、大きさをコンテキストで子パーツへ伝えます。
 */
export const StatRoot: IComponent<StatRootProps> = function SuiStatRoot(props) {
  const {
    size = "md",
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDlProps
  } = props;
  const ctx = React.useMemo<StatContext>(() => ({ size }), [size]);
  const element = useRender({
    props: [
      otherDlProps,
      {
        className: cn(className, "sui_stat", `sui_stat-size_${size}`),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "dl",
  });

  return <StatContext value={ctx}>{element}</StatContext>;
};

export { StatRoot as Root };

export namespace Root {
  /**
   * {@link StatRootState}
   */
  export type State = StatRootState;

  /**
   * {@link StatRootProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link StatRootProps.HTML}
     */
    export type HTML = StatRootProps.HTML;

    /**
     * {@link StatRootProps.Render}
     */
    export type Render = StatRootProps.Render;

    /**
     * {@link StatRootProps.SuruUI}
     */
    export type SuruUI = StatRootProps.SuruUI;
  }

  /**
   * {@link StatRootSize}
   */
  export type Size = StatRootSize;
}

// Label
// -----

/**
 * 統計ラベルの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type StatLabelSize = Size;

/**
 * {@link StatLabel} が持つ状態です。
 */
export type StatLabelState = {};

export namespace StatLabelProps {
  export type HTML = Omit<React.ComponentProps<"dt">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<StatLabelState>;

  export type SuruUI = {
    /**
     * 統計ラベルの大きさを指定します。
     *
     * 親 {@link StatRoot} 内では {@link StatRootProps.size|size} が優先されます。
     */
    size?: StatLabelSize | undefined;
  };
}

/**
 * {@link StatLabel} に渡す props です。
 */
export type StatLabelProps = StatLabelProps.Render & StatLabelProps.SuruUI & StatLabelProps.HTML;

/**
 * 統計のラベルを表すコンポーネントです。
 *
 * `dt` 要素を描画します。
 */
export const StatLabel: IComponent<StatLabelProps> = function SuiStatLabel(props) {
  const ctx = useSuiStatContext(true);
  const { size: sizeProp, className, ...otherDtProps } = props;
  const size = ctx?.size ?? sizeProp ?? "md";

  return useRender({
    props: [
      otherDtProps,
      {
        className: cn(className, "sui_stat_label", `sui_stat_label-size_${size}`),
      },
    ],
    defaultTagName: "dt",
  });
};

export { StatLabel as Label };

export namespace Label {
  /**
   * {@link StatLabelState}
   */
  export type State = StatLabelState;

  /**
   * {@link StatLabelProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link StatLabelProps.HTML}
     */
    export type HTML = StatLabelProps.HTML;

    /**
     * {@link StatLabelProps.Render}
     */
    export type Render = StatLabelProps.Render;

    /**
     * {@link StatLabelProps.SuruUI}
     */
    export type SuruUI = StatLabelProps.SuruUI;
  }

  /**
   * {@link StatLabelSize}
   */
  export type Size = StatLabelSize;
}

// Value
// -----

/**
 * 統計値の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type StatValueSize = Size;

/**
 * {@link StatValue} が持つ状態です。
 */
export type StatValueState = {};

export namespace StatValueProps {
  export type HTML = Omit<React.ComponentProps<"dd">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<StatValueState>;

  export type SuruUI = {
    /**
     * 統計値の大きさを指定します。
     *
     * 親 {@link StatRoot} 内では {@link StatRootProps.size|size} が優先されます。
     */
    size?: StatValueSize | undefined;
  };
}

/**
 * {@link StatValue} に渡す props です。
 */
export type StatValueProps = StatValueProps.Render & StatValueProps.SuruUI & StatValueProps.HTML;

/**
 * 統計の値を表すコンポーネントです。
 *
 * `dd` 要素を描画します。変化の方向を示すときは、内側に {@link StatChange} を配置します。
 */
export const StatValue: IComponent<StatValueProps> = function SuiStatValue(props) {
  const ctx = useSuiStatContext(true);
  const { size: sizeProp, className, ...otherDdProps } = props;
  const size = ctx?.size ?? sizeProp ?? "md";

  return useRender({
    props: [
      otherDdProps,
      {
        className: cn(className, "sui_stat_value", `sui_stat_value-size_${size}`),
      },
    ],
    defaultTagName: "dd",
  });
};

export { StatValue as Value };

export namespace Value {
  /**
   * {@link StatValueState}
   */
  export type State = StatValueState;

  /**
   * {@link StatValueProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link StatValueProps.HTML}
     */
    export type HTML = StatValueProps.HTML;

    /**
     * {@link StatValueProps.Render}
     */
    export type Render = StatValueProps.Render;

    /**
     * {@link StatValueProps.SuruUI}
     */
    export type SuruUI = StatValueProps.SuruUI;
  }

  /**
   * {@link StatValueSize}
   */
  export type Size = StatValueSize;
}

// Change
// ------

/**
 * 統計の変化の方向です。
 *
 * - `"up"`: 増加を示します
 * - `"down"`: 減少を示します
 * - `"flat"`: 変化なしを示します
 */
export type StatChangeDirection = "up" | "down" | "flat";

/**
 * {@link StatChange} が持つ状態です。
 */
export type StatChangeState = {};

export namespace StatChangeProps {
  export type HTML = Omit<React.ComponentProps<"span">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<StatChangeState>;

  export type SuruUI = {
    /**
     * 変化の方向を指定します。
     *
     * 方向に応じた矢印が値の前に表示され、色が変わります。
     *
     * @default "up"
     */
    direction?: StatChangeDirection | undefined;
  };
}

/**
 * {@link StatChange} に渡す props です。
 */
export type StatChangeProps = StatChangeProps.Render &
  StatChangeProps.SuruUI &
  StatChangeProps.HTML;

/**
 * 統計値の変化を示すインジケーターコンポーネントです。
 *
 * {@link StatValue} の内側に配置して、前回からの増減を矢印と色で示します。
 */
export const StatChange: IComponent<StatChangeProps> = function SuiStatChange(props) {
  const { className, direction = "up", ...otherSpanProps } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        className: cn(className, "sui_stat_change", `sui_stat_change-direction_${direction}`),
      },
    ],
    defaultTagName: "span",
  });
};

export { StatChange as Change };

export namespace Change {
  /**
   * {@link StatChangeState}
   */
  export type State = StatChangeState;

  /**
   * {@link StatChangeProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link StatChangeProps.HTML}
     */
    export type HTML = StatChangeProps.HTML;

    /**
     * {@link StatChangeProps.Render}
     */
    export type Render = StatChangeProps.Render;

    /**
     * {@link StatChangeProps.SuruUI}
     */
    export type SuruUI = StatChangeProps.SuruUI;
  }

  /**
   * {@link StatChangeDirection}
   */
  export type Direction = StatChangeDirection;
}

// Description
// -----------

/**
 * 統計の説明文の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type StatDescriptionSize = Size;

/**
 * {@link StatDescription} が持つ状態です。
 */
export type StatDescriptionState = {};

export namespace StatDescriptionProps {
  export type HTML = Omit<React.ComponentProps<"dd">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<StatDescriptionState>;

  export type SuruUI = {
    /**
     * 統計の説明文の大きさを指定します。
     *
     * 親 {@link StatRoot} 内では {@link StatRootProps.size|size} が優先されます。
     */
    size?: StatDescriptionSize | undefined;
  };
}

/**
 * {@link StatDescription} に渡す props です。
 */
export type StatDescriptionProps = StatDescriptionProps.Render &
  StatDescriptionProps.SuruUI &
  StatDescriptionProps.HTML;

/**
 * 統計の補足説明を表すコンポーネントです。
 *
 * `dd` 要素を描画します。
 */
export const StatDescription: IComponent<StatDescriptionProps> = function SuiStatDescription(
  props,
) {
  const ctx = useSuiStatContext(true);
  const { size: sizeProp, className, ...otherDdProps } = props;
  const size = ctx?.size ?? sizeProp ?? "md";

  return useRender({
    props: [
      otherDdProps,
      {
        className: cn(className, "sui_stat_description", `sui_stat_description-size_${size}`),
      },
    ],
    defaultTagName: "dd",
  });
};

export { StatDescription as Description };

export namespace Description {
  /**
   * {@link StatDescriptionState}
   */
  export type State = StatDescriptionState;

  /**
   * {@link StatDescriptionProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link StatDescriptionProps.HTML}
     */
    export type HTML = StatDescriptionProps.HTML;

    /**
     * {@link StatDescriptionProps.Render}
     */
    export type Render = StatDescriptionProps.Render;

    /**
     * {@link StatDescriptionProps.SuruUI}
     */
    export type SuruUI = StatDescriptionProps.SuruUI;
  }

  /**
   * {@link StatDescriptionSize}
   */
  export type Size = StatDescriptionSize;
}
