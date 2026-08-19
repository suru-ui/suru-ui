import { Button } from "@base-ui/react/button";
import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import { useActionGroupContext } from "../../layout/action-group/action-group.parts.jsx";
import type { IComponent, IUseContext } from "../../types.js";

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
  const context = React.use(ButtonContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "ButtonContext",
      providerName: "ButtonRoot",
    });
  }

  return context;
}

/**
 * {@link ButtonContext} を読み取るフックです。
 */
export const useButtonContext: IUseContext<ButtonContext> = useSuiButtonContext;

/**
 * {@link ButtonContext} です。
 */
export type Context = ButtonContext;

/**
 * {@link ButtonContext} です。
 */
export const Context: React.Context<ButtonContext | null> = ButtonContext;

/**
 * {@link useButtonContext} です。
 */
export const useContext: IUseContext<Context> = useButtonContext;

// Root
// ----

/**
 * ボタンの色です。
 */
export type ButtonRootColor = Color;

/**
 * ボタンの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type ButtonRootRadius = "none" | Size | "full";

/**
 * ボタンの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type ButtonRootSize = Size;

/**
 * ボタンの主な外観の種類です。
 *
 * - `"solid"`: 塗りつぶしスタイル
 * - `"naked"`: 背景のないテキストのみ
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ButtonRootVariant = ColorTemplate;

/**
 * {@link ButtonRoot} の状態です。
 */
export type ButtonRootState = Button.State;

/**
 * {@link ButtonRoot} に渡すプロパティーです。
 */
export type ButtonRootProps = React.ComponentProps<typeof Button> & {
  /**
   * ボタンの色を指定します。
   *
   * @default "grey"
   */
  color?: ButtonRootColor | undefined;

  /**
   * 背景色を控えめにします。
   *
   * @default false
   */
  muted?: boolean | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
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
   * ボタンの角丸を指定します。
   *
   * 既定値は {@link ButtonRootProps.size|size} です。
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
    muted: mutedProp = false,
    radius: radiusProp = sizeProp,
    pending = false,
    squared = false,
    variant: variantProp = "solid",
    disabled = false,
    outlined: outlinedProp = false,
    className,
    focusableWhenDisabled = !disabled && pending,
    ...otherProps
  } = props;
  const size = actionGroupCtx?.size ?? sizeProp;
  const color = actionGroupCtx?.color ?? colorProp;
  const muted = /* actionGroupCtx?.muted ?? */ mutedProp;
  const radius = actionGroupCtx?.radius ?? radiusProp;
  const variant = actionGroupCtx?.variant ?? variantProp;
  const outlined = actionGroupCtx?.outlined ?? outlinedProp;
  const context = React.useMemo(() => ({ pending }), [pending]);

  return (
    <Context value={context}>
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
      />
    </Context>
  );
};

/**
 * {@link ButtonRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link ButtonRootState} です。
   */
  export type State = ButtonRootState;

  /**
   * {@link ButtonRootProps} です。
   */
  export type Props = ButtonRootProps;

  /**
   * {@link ButtonRootColor} です。
   */
  export type Color = ButtonRootColor;

  /**
   * {@link ButtonRootRadius} です。
   */
  export type Radius = ButtonRootRadius;

  /**
   * {@link ButtonRootSize} です。
   */
  export type Size = ButtonRootSize;

  /**
   * {@link ButtonRootVariant} です。
   */
  export type Variant = ButtonRootVariant;
}

/**
 * {@link ButtonRoot} です。
 */
export const Root: IComponent<Root.Props> = ButtonRoot;

// Content
// -------

/**
 * {@link ButtonContent} の状態です。
 */
export type ButtonContentState = {};

/**
 * {@link ButtonContent} に渡すプロパティーです。
 */
export type ButtonContentProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<ButtonContentState>;

/**
 * ボタンのコンテンツを表示するコンポーネントです。
 */
export const ButtonContent: IComponent<ButtonContentProps> = function SuiButtonContent(props) {
  return useRender({
    defaultTagName: "span",
    props: [
      props,
      {
        className: "sui_button_content",
      },
    ],
  });
};

/**
 * {@link ButtonContent} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Content {
  /**
   * {@link ButtonContentState} です。
   */
  export type State = ButtonContentState;

  /**
   * {@link ButtonContentProps} です。
   */
  export type Props = ButtonContentProps;
}

/**
 * {@link ButtonContent} です。
 */
export const Content: IComponent<Content.Props> = ButtonContent;

// Pending
// -------

/**
 * ボタンが保留状態でないときの表示モードです。
 *
 * - `"hidden"`: 非表示にするがレイアウトは維持します。
 * - `"none"`: レイアウトから除去します。
 */
export type ButtonPendingVisibility = "hidden" | "none";

/**
 * {@link ButtonPending} の状態です。
 */
export type ButtonPendingState = {};

/**
 * {@link ButtonPending} に渡すプロパティーです。
 */
export type ButtonPendingProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<ButtonPendingState> & {
    /**
     * {@link ButtonRootProps.pending|pending} が `false` のときの表示モードを指定します。
     *
     * @default "none"
     */
    defaultVisibility?: ButtonPendingVisibility | undefined;

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
  const { pending } = useContext();
  const { overlay = false, defaultVisibility = "none", ...otherProps } = props;

  return useRender({
    defaultTagName: "span",
    enabled: pending || defaultVisibility === "hidden",
    props: [
      otherProps,
      {
        className: cn(
          "sui_button_pending",
          pending && "sui_button_pending-enabled",
          overlay && "sui_button_pending-overlay",
          !pending && defaultVisibility === "hidden" && "sui_button_pending-visibility_hidden",
        ),
      },
    ],
  });
};

/**
 * {@link ButtonPending} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Pending {
  /**
   * {@link ButtonPendingState} です。
   */
  export type State = ButtonPendingState;

  /**
   * {@link ButtonPendingProps} です。
   */
  export type Props = ButtonPendingProps;

  /**
   * {@link ButtonPendingVisibility} です。
   */
  export type Visibility = ButtonPendingVisibility;
}

/**
 * {@link ButtonPending} です。
 */
export const Pending: IComponent<Pending.Props> = ButtonPending;

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

/**
 * {@link ButtonCircularProgressContext} を読み取るフックです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
 */
function useSuiButtonCircularProgressContext(optional?: false): ButtonCircularProgressContext;
function useSuiButtonCircularProgressContext(
  optional?: boolean,
): ButtonCircularProgressContext | null;
function useSuiButtonCircularProgressContext(
  optional?: boolean,
): ButtonCircularProgressContext | null {
  const CircularProgressContext = React.use(ButtonCircularProgressContext);
  if (CircularProgressContext === null && !optional) {
    throw new ContextMissingError({
      contextName: "CircularProgressContext",
      providerName: "CircularProgress",
    });
  }

  return CircularProgressContext;
}

/**
 * {@link ButtonCircularProgressContext} を読み取るフックです。
 */
export const useButtonCircularProgressContext: IUseContext<ButtonCircularProgressContext> =
  useSuiButtonCircularProgressContext;

/**
 * {@link ButtonCircularProgressContext} です。
 */
export type CircularProgressContext = ButtonCircularProgressContext;

/**
 * {@link ButtonCircularProgressContext} です。
 */
export const CircularProgressContext: React.Context<ButtonCircularProgressContext | null> =
  ButtonCircularProgressContext;

/**
 * {@link useButtonCircularProgressContext} です。
 */
export const useCircularProgressContext: IUseContext<CircularProgressContext> =
  useButtonCircularProgressContext;

// CircularProgress
// ----------------

/**
 * {@link ButtonCircularProgress} の状態です。
 */
export type ButtonCircularProgressState = {};

/**
 * {@link ButtonCircularProgress} に渡すプロパティーです。
 */
export type ButtonCircularProgressProps = Omit<React.ComponentProps<"svg">, keyof RenderProps> &
  RenderProps<ButtonCircularProgressState> & {
    /**
     * プログレスバーを不定モードにするかどうかを指定します。
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
      ...otherProps
    } = props;
    const context = React.useMemo(
      () => ({ percentage, indeterminate }),
      [percentage, indeterminate],
    );
    const element = useRender({
      defaultTagName: "svg",
      props: [
        otherProps,
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

    return <CircularProgressContext value={context}>{element}</CircularProgressContext>;
  };

/**
 * {@link ButtonCircularProgress} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace CircularProgress {
  /**
   * {@link ButtonCircularProgressState} です。
   */
  export type State = ButtonCircularProgressState;

  /**
   * {@link ButtonCircularProgressProps} です。
   */
  export type Props = ButtonCircularProgressProps;
}

/**
 * {@link ButtonCircularProgress} です。
 */
export const CircularProgress: IComponent<CircularProgress.Props> = ButtonCircularProgress;

// CircularProgressTrack
// ---------------------

/**
 * {@link ButtonCircularProgressTrack} の状態です。
 */
export type ButtonCircularProgressTrackState = {};

/**
 * {@link ButtonCircularProgressTrack} に渡すプロパティーです。
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
    const {
      r,
      cx = "50%",
      cy = "50%",
      stroke = "currentColor",
      strokeWidth = 4,
      ...otherProps
    } = props;
    const strokeWidthCss = typeof strokeWidth === "number" ? strokeWidth + "px" : strokeWidth;

    return useRender({
      defaultTagName: "circle",
      props: [
        otherProps,
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

/**
 * {@link ButtonCircularProgressTrack} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace CircularProgressTrack {
  /**
   * {@link ButtonCircularProgressTrackState} です。
   */
  export type State = ButtonCircularProgressTrackState;

  /**
   * {@link ButtonCircularProgressTrackProps} です。
   */
  export type Props = ButtonCircularProgressTrackProps;
}

/**
 * {@link ButtonCircularProgressTrack} です。
 */
export const CircularProgressTrack: IComponent<CircularProgressTrack.Props> =
  ButtonCircularProgressTrack;

// CircularProgressFill
// --------------------

/**
 * {@link ButtonCircularProgressFill} の状態です。
 */
export type ButtonCircularProgressFillState = {};

/**
 * {@link ButtonCircularProgressFill} に渡すプロパティーです。
 */
export type ButtonCircularProgressFillProps = Omit<
  React.ComponentProps<"circle">,
  keyof RenderProps
> &
  RenderProps<ButtonCircularProgressFillState>;

/**
 * 円形プログレスバーのフィル（進捗を表す円弧）を描画するコンポーネントです。
 */
export const ButtonCircularProgressFill: IComponent<ButtonCircularProgressFillProps> =
  function SuiButtonCircularProgressFill(props) {
    const { percentage, indeterminate } = useCircularProgressContext();
    const {
      r,
      cx = "50%",
      cy = "50%",
      stroke = "currentColor",
      pathLength = "100",
      strokeWidth = 4,
      strokeLinecap = "round",
      strokeDasharray = "100 200",
      strokeDashoffset = 100 - (indeterminate || percentage === undefined ? 25 : percentage),
      ...otherProps
    } = props;
    const strokeWidthCss = typeof strokeWidth === "number" ? strokeWidth + "px" : strokeWidth;

    return useRender({
      defaultTagName: "circle",
      props: [
        otherProps,
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
          strokeDashoffset,
        },
      ],
    });
  };

/**
 * {@link ButtonCircularProgressFill} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace CircularProgressFill {
  /**
   * {@link ButtonCircularProgressFillState} です。
   */
  export type State = ButtonCircularProgressFillState;

  /**
   * {@link ButtonCircularProgressFillProps} です。
   */
  export type Props = ButtonCircularProgressFillProps;
}

/**
 * {@link ButtonCircularProgressFill} です。
 */
export const CircularProgressFill: IComponent<CircularProgressFill.Props> =
  ButtonCircularProgressFill;

// CircularProgressFillRotation
// ----------------------------

/**
 * {@link ButtonCircularProgressFillRotation} の状態です。
 */
export type ButtonCircularProgressFillRotationState = {};

/**
 * {@link ButtonCircularProgressFillRotation} に渡すプロパティーです。
 */
export type ButtonCircularProgressFillRotationProps = Omit<
  React.ComponentProps<"animateTransform">,
  keyof RenderProps
> &
  RenderProps<ButtonCircularProgressFillState>;

/**
 * 不定モード時に円形プログレスバーを回転させるアニメーションコンポーネントです。
 *
 * 不定モードの場合のみ有効になります。
 */
export const ButtonCircularProgressFillRotation: IComponent<ButtonCircularProgressFillRotationProps> =
  function SuiButtonCircularProgressFillRotation(props) {
    const { indeterminate } = useCircularProgressContext();
    const {
      dur = "0.75s",
      type = "rotate",
      values = "0;360",
      repeatCount = "indefinite",
      attributeName = "transform",
      ...otherProps
    } = props;

    return useRender({
      defaultTagName: "animateTransform",
      enabled: indeterminate,
      props: [
        otherProps,
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

/**
 * {@link ButtonCircularProgressFillRotation} のプロパティーをまとめた型名前空間です。
 */
export namespace CircularProgressFillRotation {
  /**
   * {@link ButtonCircularProgressFillRotationState} です。
   */
  export type State = ButtonCircularProgressFillRotationState;

  /**
   * {@link ButtonCircularProgressFillRotationProps} です。
   */
  export type Props = ButtonCircularProgressFillRotationProps;
}

/**
 * {@link ButtonCircularProgressFillRotation} です。
 */
export const CircularProgressFillRotation: IComponent<CircularProgressFillRotation.Props> =
  ButtonCircularProgressFillRotation;
