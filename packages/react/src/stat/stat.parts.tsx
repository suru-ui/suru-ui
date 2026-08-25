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
 * 統計のサイズです。
 */
type StatContextSize = Size;

/**
 * {@link StatRoot} が子要素へ提供するスタイルです。
 */
export type StatContext = {
  /**
   * 統計のサイズです。
   */
  readonly size: StatContextSize;
};

/**
 * {@link StatRoot} のスタイルを子要素へ伝播するコンテキストです。
 */
export const StatContext: React.Context<StatContext | null> =
  React.createContext<StatContext | null>(null);

function useSuiStatContext(optional?: false): StatContext;
function useSuiStatContext(optional?: boolean): StatContext | null;
function useSuiStatContext(optional?: boolean): StatContext | null {
  const context = React.use(StatContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "StatContext",
      providerName: "StatRoot",
    });
  }

  return context;
}

/**
 * {@link StatContext} を読み取るフックです。
 */
export const useStatContext: IUseContext<StatContext> = useSuiStatContext;

/**
 * {@link StatContext} です。
 */
export type Context = StatContext;

/**
 * {@link StatContext} です。
 */
export const Context: React.Context<Context | null> = StatContext;

/**
 * {@link Context} の型名前空間です。
 */
export namespace Context {
  /**
   * {@link StatContextSize} です。
   */
  export type Size = StatContextSize;
}

/**
 * {@link useStatContext} です。
 */
export const useContext: IUseContext<Context> = useStatContext;

// Root
// ----

/**
 * 統計の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type StatRootSize = Size;

/**
 * {@link StatRoot} の状態です。
 */
export type StatRootState = {};

/**
 * {@link StatRoot} に渡すプロパティーです。
 *
 * ルートに指定したスタイルプロパティーは、子要素の指定より優先されます。
 */
export type StatRootProps = Omit<React.ComponentProps<"dl">, keyof RenderProps> &
  RenderProps<StatRootState> & {
    /**
     * 統計のサイズを指定します。
     *
     * @default "md"
     */
    size?: StatRootSize | undefined;
  };

/**
 * ラベルと値の組で統計を表示するルート要素です。
 *
 * `dl` 要素を描画し、スタイルプロパティーをコンテキストで子パーツへ伝播します。
 */
export const StatRoot: IComponent<StatRootProps> = function SuiStatRoot(props) {
  const { size = "md", ...otherProps } = props;
  const context = React.useMemo<StatContext>(() => ({ size }), [size]);
  const element = useRender({
    defaultTagName: "dl",
    props: [
      otherProps,
      {
        className: cn("sui_stat", `sui_stat-size_${size}`),
      },
    ],
  });

  return <Context value={context}>{element}</Context>;
};

/**
 * {@link StatRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link StatRootState} です。
   */
  export type State = StatRootState;

  /**
   * {@link StatRootProps} です。
   */
  export type Props = StatRootProps;

  /**
   * {@link StatRootSize} です。
   */
  export type Size = StatRootSize;
}

/**
 * {@link StatRoot} です。
 */
export const Root: IComponent<Root.Props> = StatRoot;

// Label
// -----

/**
 * 統計ラベルの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type StatLabelSize = Size;

/**
 * {@link StatLabel} の状態です。
 */
export type StatLabelState = {};

/**
 * {@link StatLabel} に渡すプロパティーです。
 *
 * 親 {@link StatRoot} 内で使うときは、サイズを省略するとルートの値を使用します。
 */
export type StatLabelProps = Omit<React.ComponentProps<"dt">, keyof RenderProps> &
  RenderProps<StatLabelState> & {
    /**
     * 統計ラベルのサイズを指定します。
     *
     * 親 {@link StatRoot} 内では、ルートに指定した値が優先されます。
     */
    size?: StatLabelSize | undefined;
  };

/**
 * 統計のラベルを表す要素です。
 *
 * `dt` 要素を描画します。
 */
export const StatLabel: IComponent<StatLabelProps> = function SuiStatLabel(props) {
  const group = useSuiStatContext(true);
  const { className, size: sizeProp, ...otherProps } = props;
  const size = group?.size ?? sizeProp ?? "md";

  return useRender({
    defaultTagName: "dt",
    props: [
      otherProps,
      {
        className: cn(className, "sui_stat_label", `sui_stat_label-size_${size}`),
      },
    ],
  });
};

/**
 * {@link StatLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Label {
  /**
   * {@link StatLabelState} です。
   */
  export type State = StatLabelState;

  /**
   * {@link StatLabelProps} です。
   */
  export type Props = StatLabelProps;

  /**
   * {@link StatLabelSize} です。
   */
  export type Size = StatLabelSize;
}

/**
 * {@link StatLabel} です。
 */
export const Label: IComponent<Label.Props> = StatLabel;

// Value
// -----

/**
 * 統計値の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type StatValueSize = Size;

/**
 * {@link StatValue} の状態です。
 */
export type StatValueState = {};

/**
 * {@link StatValue} に渡すプロパティーです。
 *
 * 親 {@link StatRoot} 内で使うときは、サイズを省略するとルートの値を使用します。
 */
export type StatValueProps = Omit<React.ComponentProps<"dd">, keyof RenderProps> &
  RenderProps<StatValueState> & {
    /**
     * 統計値のサイズを指定します。
     *
     * 親 {@link StatRoot} 内では、ルートに指定した値が優先されます。
     */
    size?: StatValueSize | undefined;
  };

/**
 * 統計の値を表す要素です。
 *
 * `dd` 要素を描画します。変化の方向を示すときは、内側に {@link StatChange} を配置します。
 */
export const StatValue: IComponent<StatValueProps> = function SuiStatValue(props) {
  const group = useSuiStatContext(true);
  const { className, size: sizeProp, ...otherProps } = props;
  const size = group?.size ?? sizeProp ?? "md";

  return useRender({
    defaultTagName: "dd",
    props: [
      otherProps,
      {
        className: cn(className, "sui_stat_value", `sui_stat_value-size_${size}`),
      },
    ],
  });
};

/**
 * {@link StatValue} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Value {
  /**
   * {@link StatValueState} です。
   */
  export type State = StatValueState;

  /**
   * {@link StatValueProps} です。
   */
  export type Props = StatValueProps;

  /**
   * {@link StatValueSize} です。
   */
  export type Size = StatValueSize;
}

/**
 * {@link StatValue} です。
 */
export const Value: IComponent<Value.Props> = StatValue;

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
 * {@link StatChange} の状態です。
 */
export type StatChangeState = {};

/**
 * {@link StatChange} に渡すプロパティーです。
 */
export type StatChangeProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<StatChangeState> & {
    /**
     * 変化の方向を指定します。
     *
     * 方向に応じた矢印が値の前に表示され、色が変わります。
     *
     * @default "up"
     */
    direction?: StatChangeDirection | undefined;
  };

/**
 * 統計値の変化を示すインジケーターコンポーネントです。
 *
 * {@link StatValue} の内側に配置して、前回からの増減を矢印と色で示します。
 */
export const StatChange: IComponent<StatChangeProps> = function SuiStatChange(props) {
  const { direction = "up", className, ...otherProps } = props;

  return useRender({
    defaultTagName: "span",
    props: [
      otherProps,
      {
        className: cn(className, "sui_stat_change", `sui_stat_change-direction_${direction}`),
      },
    ],
  });
};

/**
 * {@link StatChange} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Change {
  /**
   * {@link StatChangeState} です。
   */
  export type State = StatChangeState;

  /**
   * {@link StatChangeProps} です。
   */
  export type Props = StatChangeProps;

  /**
   * {@link StatChangeDirection} です。
   */
  export type Direction = StatChangeDirection;
}

/**
 * {@link StatChange} です。
 */
export const Change: IComponent<Change.Props> = StatChange;

// Description
// -----------

/**
 * 統計の説明文の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type StatDescriptionSize = Size;

/**
 * {@link StatDescription} の状態です。
 */
export type StatDescriptionState = {};

/**
 * {@link StatDescription} に渡すプロパティーです。
 *
 * 親 {@link StatRoot} 内で使うときは、サイズを省略するとルートの値を使用します。
 */
export type StatDescriptionProps = Omit<React.ComponentProps<"dd">, keyof RenderProps> &
  RenderProps<StatDescriptionState> & {
    /**
     * 統計の説明文のサイズを指定します。
     *
     * 親 {@link StatRoot} 内では、ルートに指定した値が優先されます。
     */
    size?: StatDescriptionSize | undefined;
  };

/**
 * 統計の補足説明を表す要素です。
 *
 * `dd` 要素を描画します。
 */
export const StatDescription: IComponent<StatDescriptionProps> = function SuiStatDescription(
  props,
) {
  const group = useSuiStatContext(true);
  const { className, size: sizeProp, ...otherProps } = props;
  const size = group?.size ?? sizeProp ?? "md";

  return useRender({
    defaultTagName: "dd",
    props: [
      otherProps,
      {
        className: cn(className, "sui_stat_description", `sui_stat_description-size_${size}`),
      },
    ],
  });
};

/**
 * {@link StatDescription} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Description {
  /**
   * {@link StatDescriptionState} です。
   */
  export type State = StatDescriptionState;

  /**
   * {@link StatDescriptionProps} です。
   */
  export type Props = StatDescriptionProps;

  /**
   * {@link StatDescriptionSize} です。
   */
  export type Size = StatDescriptionSize;
}

/**
 * {@link StatDescription} です。
 */
export const Description: IComponent<Description.Props> = StatDescription;
