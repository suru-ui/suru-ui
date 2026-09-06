import { Button } from "@base-ui/react/button";
import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import { useActionGroupContext } from "../action-group/action-group.parts.jsx";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./button.css";

// Context
// -------

/**
 * {@link ButtonRoot} が子パーツへ提供するコンテキストです。
 */
export type ButtonContext = {
  /**
   * ボタンが保留状態かどうかです。
   */
  readonly pending: boolean;
};

/**
 * {@link ButtonRoot} が子パーツへ提供するコンテキストです。
 */
export const ButtonContext: React.Context<ButtonContext | null> =
  React.createContext<ButtonContext | null>(null);

function useSuiButtonContext(optional?: false): ButtonContext;
function useSuiButtonContext(optional?: boolean): ButtonContext | null;
function useSuiButtonContext(optional?: boolean): ButtonContext | null {
  const ctx = React.use(ButtonContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ButtonContext",
      providerName: "ButtonRoot",
    });
  }

  return ctx;
}

/**
 * {@link ButtonContext} を読み取るフックです。
 */
export const useButtonContext: IUseContext<ButtonContext> = useSuiButtonContext;

export { ButtonContext as Context, useButtonContext as useContext };

// CircularProgressContext
// -----------------------

/**
 * {@link ButtonCircularProgress} が子パーツへ提供するコンテキストです。
 */
export type ButtonCircularProgressContext = {
  /**
   * 不定モードで表示するかどうかです。
   */
  readonly indeterminate: boolean;

  /**
   * 進捗率です。
   */
  readonly percentage: number | undefined;
};

/**
 * {@link ButtonCircularProgress} が子パーツへ提供するコンテキストです。
 */
export const ButtonCircularProgressContext: React.Context<ButtonCircularProgressContext | null> =
  React.createContext<ButtonCircularProgressContext | null>(null);

function useSuiButtonCircularProgressContext(optional?: false): ButtonCircularProgressContext;
function useSuiButtonCircularProgressContext(
  optional?: boolean,
): ButtonCircularProgressContext | null;
function useSuiButtonCircularProgressContext(
  optional?: boolean,
): ButtonCircularProgressContext | null {
  const ctx = React.use(ButtonCircularProgressContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ButtonCircularProgressContext",
      providerName: "ButtonCircularProgress",
    });
  }

  return ctx;
}

/**
 * {@link ButtonCircularProgressContext} を読み取るフックです。
 */
export const useButtonCircularProgressContext: IUseContext<ButtonCircularProgressContext> =
  useSuiButtonCircularProgressContext;

export {
  ButtonCircularProgressContext as CircularProgressContext,
  useButtonCircularProgressContext as useCircularProgressContext,
};

// Root
// ----

/**
 * ボタンの配色です。
 */
export type ButtonRootColor = Color;

/**
 * ボタンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type ButtonRootRadius = "none" | Size | "full";

/**
 * ボタンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ButtonRootSize = Size;

/**
 * ボタンの主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ButtonRootVariant = ColorTemplate;

/**
 * {@link ButtonRoot} が持つ状態です。
 */
export type ButtonRootState = Button.State;

/**
 * {@link ButtonRoot} に渡す props です。
 */
export type ButtonRootProps = React.ComponentProps<typeof Button> & {
  /**
   * ボタンの配色を指定します。
   *
   * @default "grey"
   */
  color?: ButtonRootColor | undefined;

  /**
   * ボタンの背景色を控えめにします。
   *
   * @default false
   */
  muted?: boolean | undefined;

  /**
   * ボタンに枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * ボタンを保留状態にするかどうかを指定します。
   *
   * `true` の場合、ボタンの押下が無効化され、{@link ButtonPending} スロットが表示されます。`disabled` を `true` にしない限り、デフォルトでフォーカスが維持されます。
   *
   * @default false
   */
  pending?: boolean | undefined;

  /**
   * ボタンの角丸の大きさを指定します。
   *
   * 既定値は {@link ButtonRootProps.size|size}
   */
  radius?: ButtonRootRadius | undefined;

  /**
   * ボタンの大きさを指定します。
   *
   * @default "md"
   */
  size?: ButtonRootSize | undefined;

  /**
   * ボタンを正方形にするかどうかを指定します。
   *
   * `true` の場合、幅と高さが等しくなり、アイコンボタンなどに適した形状になります。
   *
   * @default false
   */
  squared?: boolean | undefined;

  /**
   * ボタンの主な外観を指定します。
   *
   * @default "solid"
   */
  variant?: ButtonRootVariant | undefined;
};

/**
 * ボタンのルートコンポーネントです。
 */
export const ButtonRoot: IComponent<ButtonRootProps> = function SuiButtonRoot(props) {
  const actionGroupCtx = useActionGroupContext(true);
  const {
    size: sizeProp = "md",
    type = "button",
    color: colorProp = "grey",
    muted = false,
    radius: radiusProp = sizeProp,
    pending = false,
    squared = false,
    variant: variantProp = "solid",
    disabled = false,
    outlined: outlinedProp = false,
    focusableWhenDisabled = !disabled && pending,
    className,
    ...otherProps
  } = props;
  const size = actionGroupCtx?.size ?? sizeProp;
  const color = actionGroupCtx?.color ?? colorProp;
  const radius = actionGroupCtx?.radius ?? radiusProp;
  const variant = actionGroupCtx?.variant ?? variantProp;
  const outlined = actionGroupCtx?.outlined ?? outlinedProp;
  const ctx = React.useMemo<ButtonContext>(() => ({ pending }), [pending]);

  return (
    <ButtonContext value={ctx}>
      <Button
        {...otherProps}
        type={type}
        disabled={disabled || pending}
        className={cn(
          className,
          "sui_button",
          "sui_action_group_item",
          `sui_button-size_${size}`,
          `sui_button-color_${color}`,
          `sui_button-radius_${radius}`,
          `sui_button-variant_${variant}`,
          muted && "sui_button-muted",
          pending && "sui_button-pending",
          squared && "sui_button-squared",
          outlined && "sui_button-outlined",
          disabled && "sui_button-disabled",
        )}
        focusableWhenDisabled={focusableWhenDisabled}
        data-scope=""
      />
    </ButtonContext>
  );
};

export { ButtonRoot as Root };

export namespace Root {
  /**
   * {@link ButtonRootState}
   */
  export type State = ButtonRootState;

  /**
   * {@link ButtonRootProps}
   */
  export type Props = ButtonRootProps;

  /**
   * {@link ButtonRootColor}
   */
  export type Color = ButtonRootColor;

  /**
   * {@link ButtonRootRadius}
   */
  export type Radius = ButtonRootRadius;

  /**
   * {@link ButtonRootSize}
   */
  export type Size = ButtonRootSize;

  /**
   * {@link ButtonRootVariant}
   */
  export type Variant = ButtonRootVariant;
}

// Content
// -------

/**
 * {@link ButtonContent} が持つ状態です。
 */
export type ButtonContentState = ButtonContext;

/**
 * {@link ButtonContent} に渡す props です。
 */
export type ButtonContentProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<ButtonContentState>;

/**
 * ボタンのコンテンツを表示するコンポーネントです。
 */
export const ButtonContent: IComponent<ButtonContentProps> = function SuiButtonContent(props) {
  const ctx = useButtonContext();

  return useRender({
    defaultTagName: "span",
    state: ctx,
    props: [
      props,
      {
        className: "sui_button_content",
      },
    ],
  });
};

export { ButtonContent as Content };

export namespace Content {
  /**
   * {@link ButtonContentState}
   */
  export type State = ButtonContentState;

  /**
   * {@link ButtonContentProps}
   */
  export type Props = ButtonContentProps;
}

// Pending
// -------

/**
 * {@link ButtonPending} が持つ状態です。
 */
export type ButtonPendingState = ButtonContext;

/**
 * {@link ButtonPending} に渡す props です。
 */
export type ButtonPendingProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<ButtonPendingState> & {
    /**
     * ボタンが保留状態でないときも DOM に保持するかどうかを指定します。
     *
     * @default false
     */
    keepMounted?: boolean | undefined;

    /**
     * 親要素を覆うオーバーレイとして表示するかどうかを指定します。
     *
     * @default false
     */
    overlay?: boolean | undefined;
  };

/**
 * ボタンの保留状態を表示するコンポーネントです。
 *
 * 保留中のみ有効になります。
 */
export const ButtonPending: IComponent<ButtonPendingProps> = function SuiButtonPending(props) {
  const ctx = useButtonContext();
  const { overlay = false, keepMounted = false, ...otherSpanProps } = props;

  return useRender({
    defaultTagName: "span",
    enabled: ctx.pending || keepMounted,
    state: ctx,
    props: [
      otherSpanProps,
      {
        className: cn(
          "sui_button_pending",
          overlay && "sui_button_pending-overlay",
          (state: ButtonPendingState) => state.pending && "sui_button_pending-enabled",
          (state: ButtonPendingState) =>
            !state.pending && keepMounted && "sui_button_pending-visibility_hidden",
        ),
      },
    ],
  });
};

export { ButtonPending as Pending };

export namespace Pending {
  /**
   * {@link ButtonPendingState}
   */
  export type State = ButtonPendingState;

  /**
   * {@link ButtonPendingProps}
   */
  export type Props = ButtonPendingProps;
}

// CircularProgress
// ----------------

/**
 * {@link ButtonCircularProgress} が持つ状態です。
 */
export type ButtonCircularProgressState = ButtonCircularProgressContext;

/**
 * {@link ButtonCircularProgress} に渡す props です。
 */
export type ButtonCircularProgressProps = Omit<React.ComponentProps<"svg">, keyof RenderProps> &
  RenderProps<ButtonCircularProgressState> & {
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
    const ctx = React.useMemo(() => ({ percentage, indeterminate }), [percentage, indeterminate]);
    const element = useRender({
      defaultTagName: "svg",
      state: ctx,
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
    });

    return <ButtonCircularProgressContext value={ctx}>{element}</ButtonCircularProgressContext>;
  };

export { ButtonCircularProgress as CircularProgress };

export namespace CircularProgress {
  /**
   * {@link ButtonCircularProgressState}
   */
  export type State = ButtonCircularProgressState;

  /**
   * {@link ButtonCircularProgressProps}
   */
  export type Props = ButtonCircularProgressProps;
}

// CircularProgressTrack
// ---------------------

/**
 * {@link ButtonCircularProgressTrack} が持つ状態です。
 */
export type ButtonCircularProgressTrackState = ButtonCircularProgressContext;

/**
 * {@link ButtonCircularProgressTrack} に渡す props です。
 */
export type ButtonCircularProgressTrackProps = Omit<
  React.ComponentProps<"circle">,
  keyof RenderProps
> &
  RenderProps<ButtonCircularProgressTrackState>;

/**
 * 円形プログレスバーのトラック（背景の円弧）を描画するコンポーネントです。
 */
export const ButtonCircularProgressTrack: IComponent<ButtonCircularProgressTrackProps> =
  function SuiButtonCircularProgressTrack(props) {
    const ctx = useButtonCircularProgressContext();
    const {
      r,
      cx = "50%",
      cy = "50%",
      stroke = "currentColor",
      strokeWidth = 4,
      ...otherCircleProps
    } = props;
    const strokeWidthCss = typeof strokeWidth === "number" ? strokeWidth + "px" : strokeWidth;

    return useRender({
      defaultTagName: "circle",
      state: ctx,
      props: [
        otherCircleProps,
        {
          r: r ?? `calc(50% - ${strokeWidthCss} / 2)`,
          cx,
          cy,
          stroke,
          className: "sui_button_circular_progress_track",
          strokeWidth: strokeWidthCss,
        },
      ],
    });
  };

export { ButtonCircularProgressTrack as CircularProgressTrack };

export namespace CircularProgressTrack {
  /**
   * {@link ButtonCircularProgressTrackState}
   */
  export type State = ButtonCircularProgressTrackState;

  /**
   * {@link ButtonCircularProgressTrackProps}
   */
  export type Props = ButtonCircularProgressTrackProps;
}

// CircularProgressFill
// --------------------

/**
 * {@link ButtonCircularProgressFill} が持つ状態です。
 */
export type ButtonCircularProgressFillState = ButtonCircularProgressContext;

/**
 * {@link ButtonCircularProgressFill} に渡す props です。
 */
export type ButtonCircularProgressFillProps = Omit<
  React.ComponentProps<"circle">,
  keyof RenderProps | "strokeDashoffset"
> &
  RenderProps<ButtonCircularProgressFillState> & {
    /**
     * 円弧の開始位置のずれです。
     *
     * 関数の場合は現在の状態から値を求めます。
     *
     * {@link https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/stroke-dashoffset|stroke-dashoffset}
     */
    strokeDashoffset?:
      | string
      | number
      | ((state: ButtonCircularProgressFillState) => string | number | undefined)
      | undefined;
  };

/**
 * 円形プログレスバーのフィル（進捗を表す円弧）を描画するコンポーネントです。
 */
export const ButtonCircularProgressFill: IComponent<ButtonCircularProgressFillProps> =
  function SuiButtonCircularProgressFill(props) {
    const ctx = useButtonCircularProgressContext();
    const {
      r,
      cx = "50%",
      cy = "50%",
      stroke = "currentColor",
      pathLength = "100",
      strokeWidth = 4,
      strokeLinecap = "round",
      strokeDasharray = "100 200",
      strokeDashoffset = (state) =>
        100 - (state.indeterminate || state.percentage === undefined ? 25 : state.percentage),
      ...otherCircleProps
    } = props;
    const strokeWidthCss = typeof strokeWidth === "number" ? strokeWidth + "px" : strokeWidth;

    return useRender({
      defaultTagName: "circle",
      state: ctx,
      props: [
        otherCircleProps,
        {
          r: r ?? `calc(50% - ${strokeWidthCss} / 2)`,
          cx,
          cy,
          stroke,
          className: "sui_button_circular_progress_fill",
          pathLength,
          strokeWidth: strokeWidthCss,
          strokeLinecap,
          strokeDasharray,
          strokeDashoffset:
            typeof strokeDashoffset === "function" ? strokeDashoffset(ctx) : strokeDashoffset,
        },
      ],
    });
  };

export { ButtonCircularProgressFill as CircularProgressFill };

export namespace CircularProgressFill {
  /**
   * {@link ButtonCircularProgressFillState}
   */
  export type State = ButtonCircularProgressFillState;

  /**
   * {@link ButtonCircularProgressFillProps}
   */
  export type Props = ButtonCircularProgressFillProps;
}

// CircularProgressFillRotation
// ----------------------------

/**
 * {@link ButtonCircularProgressFillRotation} が持つ状態です。
 */
export type ButtonCircularProgressFillRotationState = {};

/**
 * {@link ButtonCircularProgressFillRotation} に渡す props です。
 */
export type ButtonCircularProgressFillRotationProps = Omit<
  React.ComponentProps<"animateTransform">,
  keyof RenderProps
> &
  RenderProps<ButtonCircularProgressFillRotationState>;

/**
 * 不定モード時に円形プログレスバーを回転させるアニメーションコンポーネントです。
 *
 * 不定モードの場合のみ有効になります。
 */
export const ButtonCircularProgressFillRotation: IComponent<ButtonCircularProgressFillRotationProps> =
  function SuiButtonCircularProgressFillRotation(props) {
    const ctx = useButtonCircularProgressContext();
    const {
      dur = "0.75s",
      type = "rotate",
      values = "0;360",
      repeatCount = "indefinite",
      attributeName = "transform",
      ...otherAnimateTransformProps
    } = props;

    return useRender({
      defaultTagName: "animateTransform",
      enabled: ctx.indeterminate,
      props: [
        otherAnimateTransformProps,
        {
          dur,
          type,
          values,
          className: "sui_button_circular_progress_fill_rotation",
          repeatCount,
          attributeName,
        },
      ],
    });
  };

export { ButtonCircularProgressFillRotation as CircularProgressFillRotation };

export namespace CircularProgressFillRotation {
  /**
   * {@link ButtonCircularProgressFillRotationState}
   */
  export type State = ButtonCircularProgressFillRotationState;

  /**
   * {@link ButtonCircularProgressFillRotationProps}
   */
  export type Props = ButtonCircularProgressFillRotationProps;
}
