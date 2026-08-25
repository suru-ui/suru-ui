import { RadioGroup } from "@base-ui/react/radio-group";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { RadioRootRadius, RadioRootVariant } from "../radio/radio.parts.jsx";
import type { IComponent, IUseContext } from "../types.js";

import "./radio-group.css";

// Context
// -------

/**
 * ラジオボタンの色です。
 */
type RadioGroupContextColor = Color;

/**
 * ラジオボタンの角丸です。
 */
type RadioGroupContextRadius = "none" | Size | "full";

/**
 * ラジオボタンのサイズです。
 */
type RadioGroupContextSize = Size;

/**
 * ラジオボタンの主な外観です。
 */
type RadioGroupContextVariant = "naked" | "liquid";

/**
 * {@link RadioGroupRoot} が子パーツへ提供する状態です。
 */
export type RadioGroupContext = {
  /**
   * ラジオボタンの色です。
   */
  readonly color: RadioGroupContextColor;

  /**
   * グループ全体を無効にするかどうかです。
   */
  readonly disabled: boolean | undefined;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * ラジオボタンの角丸です。
   */
  readonly radius: RadioGroupContextRadius;

  /**
   * ラジオボタンのサイズです。
   */
  readonly size: RadioGroupContextSize;

  /**
   * ラジオボタンの主な外観です。
   */
  readonly variant: RadioGroupContextVariant;
};

/**
 * ラジオボタングループのスタイルを子要素へ伝播するコンテキストです。
 */
export const RadioGroupContext: React.Context<RadioGroupContext | null> =
  React.createContext<RadioGroupContext | null>(null);

function useSuiRadioGroupContext(optional?: false): RadioGroupContext;
function useSuiRadioGroupContext(optional?: boolean): RadioGroupContext | null;
function useSuiRadioGroupContext(optional?: boolean): RadioGroupContext | null {
  const context = React.use(RadioGroupContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "RadioGroupContext",
      providerName: "RadioGroupRoot",
    });
  }

  return context;
}

/**
 * {@link RadioGroupContext} を読み取るフックです。
 */
export const useRadioGroupContext: IUseContext<RadioGroupContext> = useSuiRadioGroupContext;

/**
 * {@link RadioGroupContext} です。
 */
export type Context = RadioGroupContext;

/**
 * {@link RadioGroupContext} です。
 */
export const Context: React.Context<Context | null> = RadioGroupContext;

/**
 * {@link Context} の型名前空間です。
 */
export namespace Context {
  /**
   * {@link RadioGroupContextColor} です。
   */
  export type Color = RadioGroupContextColor;

  /**
   * {@link RadioGroupContextRadius} です。
   */
  export type Radius = RadioGroupContextRadius;

  /**
   * {@link RadioGroupContextSize} です。
   */
  export type Size = RadioGroupContextSize;

  /**
   * {@link RadioGroupContextVariant} です。
   */
  export type Variant = RadioGroupContextVariant;
}

/**
 * {@link useRadioGroupContext} です。
 */
export const useContext: IUseContext<Context> = useRadioGroupContext;

// Root
// ----

/**
 * ラジオボタングループの色です。
 */
export type RadioGroupRootColor = Color;

/**
 * ラジオボタングループの向きです。
 *
 * - `"horizontal"`: 横並び
 * - `"vertical"`: 縦並び
 */
export type RadioGroupRootOrientation = "horizontal" | "vertical";

/**
 * ラジオボタングループの角丸です。
 */
export type RadioGroupRootRadius = RadioRootRadius;

/**
 * ラジオボタングループの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type RadioGroupRootSize = Size;

/**
 * ラジオボタングループの主な外観です。
 */
export type RadioGroupRootVariant = RadioRootVariant;

/**
 * {@link RadioGroupRoot} の状態です。
 */
export type RadioGroupRootState = RadioGroup.State;

/**
 * {@link RadioGroupRoot} に渡すプロパティーです。
 *
 * グループに指定したスタイルプロパティーは、子要素のラジオボタン指定より優先されます。
 * 指定後に値を変更すると、グループと子要素のスタイルも更新されます。
 */
export type RadioGroupRootProps = React.ComponentProps<typeof RadioGroup> & {
  /**
   * ラジオボタンの色を指定します。
   *
   * {@link RadioGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のラジオボタンも更新されます。
   *
   * @default "grey"
   */
  color?: RadioGroupRootColor | undefined;

  /**
   * ラジオボタン群の向きを指定します。
   *
   * 値を変更すると、グループのレイアウトと `aria-orientation` が更新されます。
   * `aria-orientation` を指定した場合は、その値が `orientation` より優先されます。
   *
   * @default "vertical"
   */
  orientation?: RadioGroupRootOrientation | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * {@link RadioGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のラジオボタンも更新されます。
   */
  outlined?: boolean | undefined;

  /**
   * ラジオボタンの角丸を指定します。
   *
   * {@link RadioGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のラジオボタンも更新されます。
   *
   * @default "full"
   */
  radius?: RadioGroupRootRadius | undefined;

  /**
   * ラジオボタンのサイズを指定します。
   *
   * {@link RadioGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のラジオボタンも更新されます。
   *
   * @default "md"
   */
  size?: RadioGroupRootSize | undefined;

  /**
   * ラジオボタンの主な外観を指定します。
   *
   * {@link RadioGroupRoot} の子要素に指定した値より優先されます。
   * 値を変更すると、グループ内のラジオボタンも更新されます。
   *
   * @default "naked"
   */
  variant?: RadioGroupRootVariant | undefined;
};

/**
 * ラジオボタングループのルート要素です。
 *
 * 選択状態を管理し、子要素のラジオボタンにスタイルを伝播します。
 * スタイル値が変わらない再レンダーでは、コンテキストの値を再生成しません。
 */
export const RadioGroupRoot: IComponent<RadioGroupRootProps> = function SuiRadioGroupRoot(props) {
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = "full",
    variant: variantProp = "naked",
    disabled,
    outlined = variantProp === "naked",
    className,
    orientation = "vertical",
    "aria-orientation": ariaOrientation = orientation,
    ...otherProps
  } = props;
  const context = React.useMemo<RadioGroupContext>(
    () => ({
      size: sizeProp,
      color: colorProp,
      radius: radiusProp,
      variant: variantProp,
      disabled,
      outlined,
    }),
    [colorProp, disabled, outlined, radiusProp, sizeProp, variantProp],
  );

  return (
    <Context value={context}>
      <RadioGroup
        {...otherProps}
        disabled={disabled}
        className={cn(className, "sui_radio_group", `sui_radio_group-orientation_${orientation}`)}
        aria-orientation={ariaOrientation}
      />
    </Context>
  );
};

/**
 * {@link RadioGroupRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link RadioGroupRootState} です。
   */
  export type State = RadioGroupRootState;

  /**
   * {@link RadioGroupRootProps} です。
   */
  export type Props = RadioGroupRootProps;

  /**
   * {@link RadioGroupRootColor} です。
   */
  export type Color = RadioGroupRootColor;

  /**
   * {@link RadioGroupRootOrientation} です。
   */
  export type Orientation = RadioGroupRootOrientation;

  /**
   * {@link RadioGroupRootRadius} です。
   */
  export type Radius = RadioGroupRootRadius;

  /**
   * {@link RadioGroupRootSize} です。
   */
  export type Size = RadioGroupRootSize;

  /**
   * {@link RadioGroupRootVariant} です。
   */
  export type Variant = RadioGroupRootVariant;
}

/**
 * {@link RadioGroupRoot} です。
 */
export const Root: IComponent<Root.Props> = RadioGroupRoot;
