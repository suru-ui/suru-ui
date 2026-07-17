import { Button } from "@base-ui/react/button";
import {
  useRenderElement,
  type UseRenderElementComponentProps,
} from "@base-ui/react/internals/useRenderElement";
import type { Size, Color, ColorTemplate as Variant } from "@suru-ui/theme";
import * as React from "react";

import splitRenderProps from "../../_split-render-props.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";

import "./button.css";

// Context
// -------

export type ButtonContext = {
  readonly pending: boolean;
};

export const ButtonContext: React.Context<ButtonContext | null> =
  React.createContext<ButtonContext | null>(null);

export function useButtonContext(optional?: false): ButtonContext;
export function useButtonContext(optional?: boolean): ButtonContext | null;
export function useButtonContext(optional?: boolean): ButtonContext | null {
  const context = React.use(ButtonContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "ButtonContext",
      providerName: "ButtonRoot",
    });
  }

  return context;
}

export type Context = ButtonContext;

export const Context: React.Context<ButtonContext | null> = ButtonContext;

export function useContext(optional?: false): ButtonContext;
export function useContext(optional?: boolean): ButtonContext | null;
export function useContext(optional?: boolean): ButtonContext | null {
  return useButtonContext(optional);
}

// Root
// ----

export type ButtonRootState = Button.State;

export type ButtonRootProps = React.ComponentProps<typeof Button> & {
  /**
   * ボタンのスタイルバリエーションを指定します。
   *
   * - `"solid"`: 塗りつぶしスタイル
   * - `"naked"`: 背景のないテキストのみ
   * - `"liquid"`: 薄い塗りつぶし
   *
   * @default "solid"
   */
  variant?: Variant | undefined;

  /**
   * ボタンの色を指定します。
   *
   * @default "grey"
   */
  color?: Color | undefined;

  /**
   * ボタンのサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * ボタンの角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形（pills 状）
   *
   * @default "rounded"
   */
  radius?: "none" | "rounded" | "full" | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   */
  outlined?: boolean | undefined;

  /**
   * ボタンを保留状態（ローディング中）にするかどうかを指定します。
   *
   * `true` の場合、ボタンは無効化され、`Pending` スロットが表示されます。
   */
  pending?: boolean | undefined;

  /**
   * ボタンを正方形にするかどうかを指定します。
   *
   * `true` の場合、幅と高さが等しくなり、アイコンボタンなどに適した形状になります。
   */
  squared?: boolean | undefined;
};

/**
 * ボタンのルート要素です。
 *
 * Base UI の {@link Button} をラップし、テーマに基づくスタイルクラスを適用します。
 *
 * @example
 * ```tsx
 * <ButtonParts.Root color="red" pending>
 *   <ButtonParts.Content>削除</ButtonParts.Content>
 *   <ButtonParts.Pending>
 *     <ButtonParts.CircularProgress>...</ButtonParts.CircularProgress>
 *   </ButtonParts.Pending>
 * </ButtonParts.Root>
 * ```
 */
export const ButtonRoot: Component<ButtonRootProps> = function SuiButtonRoot(props) {
  const {
    size = "md",
    type = "button",
    color = "grey",
    radius = "rounded",
    pending = false,
    squared = false,
    variant = "solid",
    disabled = false,
    outlined = false,
    className,
    focusableWhenDisabled = !disabled && pending,
    ...otherProps
  } = props;
  const context = React.useMemo(
    () => ({
      pending,
    }),
    [pending],
  );

  return (
    <Context value={context}>
      <Button
        {...otherProps}
        type={type}
        disabled={disabled || pending}
        className={cn(
          className,
          "sui_button",
          `sui_button-size_${size}`,
          `sui_button-color_${color}`,
          `sui_button-radius_${radius}`,
          `sui_button-variant_${variant}`,
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

export namespace Root {
  export type State = ButtonRootState;
  export type Props = ButtonRootProps;
}

export const Root: Component<Root.Props> = ButtonRoot;

// Content
// -------

export type ButtonContentState = {};

/**
 * {@link Content} に渡すプロパティーです。
 */
export type ButtonContentProps = Omit<
  React.ComponentProps<"span">,
  keyof UseRenderElementComponentProps<{}>
> &
  UseRenderElementComponentProps<ButtonContentState>;

/**
 * ボタンのコンテンツを表示するラッパー要素です。
 *
 * @example
 * ```tsx
 * <ButtonParts.Content>ラベル</ButtonParts.Content>
 * ```
 */
export const ButtonContent: Component<ButtonContentProps> = function SuiButtonContent(props) {
  const [renderProps, componentProps] = splitRenderProps(props);
  const { ref, ...elementProps } = componentProps;

  return useRenderElement("span", renderProps, {
    ref,
    props: [
      elementProps,
      {
        className: "sui_button_content",
      },
    ],
  });
};

export namespace Content {
  export type State = ButtonContentState;
  export type Props = ButtonContentProps;
}

export const Content: Component<Content.Props> = ButtonContent;

// Pending
// -------

export type ButtonPendingState = {};

/**
 * {@link Pending} に渡すプロパティーです。
 */
export type ButtonPendingProps = Omit<
  React.ComponentProps<"span">,
  keyof UseRenderElementComponentProps<{}>
> &
  UseRenderElementComponentProps<ButtonPendingState> & {
    /**
     * `pending` が `false` のときの表示モードを指定します。
     *
     * - `"hidden"`: 非表示にするがレイアウトは維持する（`visibility: hidden`）
     * - `"none"`: レイアウトから除去する（`display: none`）
     *
     * @default "none"
     */
    defaultVisibility?: "hidden" | "none" | undefined;

    /**
     * 親要素を覆うオーバーレイとして表示するかどうかを指定します。
     *
     * @default false
     */
    overlay?: boolean | undefined;
  };

/**
 * ボタンの保留状態（ローディング中）を表示する要素です。
 *
 * コンテキストから `pending` の状態を読み取り、有効時のみ表示します。
 *
 * @example
 * ```tsx
 * <ButtonParts.Pending overlay>
 *   読み込み中…
 * </ButtonParts.Pending>
 * ```
 */
export const ButtonPending: Component<ButtonPendingProps> = function SuiButtonPending(props) {
  const { pending } = useContext();
  const [renderProps, componentProps] = splitRenderProps(props);
  const { ref, overlay = false, defaultVisibility = "none", ...elementProps } = componentProps;

  return useRenderElement("span", renderProps, {
    ref,
    props: [
      elementProps,
      {
        className: cn(
          "sui_button_pending",
          pending && "sui_button_pending-enabled",
          overlay && "sui_button_pending-overlay",
          defaultVisibility === "hidden" && "sui_button_pending-visibility_hidden",
        ),
      },
    ],
    enabled: pending || defaultVisibility === "hidden",
  });
};

export namespace Pending {
  export type State = ButtonPendingState;
  export type Props = ButtonPendingProps;
}

export const Pending: Component<Pending.Props> = ButtonPending;

// CircularProgressContext
// -----------------------

export type ButtonCircularProgressContext = {
  readonly indeterminate: boolean;

  readonly percentage: number | undefined;
};

export const ButtonCircularProgressContext: React.Context<ButtonCircularProgressContext | null> =
  React.createContext<ButtonCircularProgressContext | null>(null);

export function useButtonCircularProgressContext(optional?: false): ButtonCircularProgressContext;
export function useButtonCircularProgressContext(
  optional?: boolean,
): ButtonCircularProgressContext | null;
export function useButtonCircularProgressContext(
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

export type CircularProgressContext = ButtonCircularProgressContext;

export const CircularProgressContext: React.Context<ButtonCircularProgressContext | null> =
  ButtonCircularProgressContext;

export function useCircularProgressContext(optional?: false): ButtonCircularProgressContext;
export function useCircularProgressContext(
  optional?: boolean,
): ButtonCircularProgressContext | null;
export function useCircularProgressContext(
  optional?: boolean,
): ButtonCircularProgressContext | null {
  return useButtonCircularProgressContext(optional);
}

// CircularProgress
// ----------------

export type ButtonCircularProgressState = {};

/**
 * {@link CircularProgress} に渡すプロパティーです。
 */
export type ButtonCircularProgressProps = Omit<
  React.ComponentProps<"svg">,
  keyof UseRenderElementComponentProps<{}>
> &
  UseRenderElementComponentProps<ButtonCircularProgressState> & {
    /**
     * プログレスバーを不定モード（回転するアニメーション）にするかどうかを指定します。
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
 * 円形プログレスバーの SVG ルート要素です。
 *
 * コンテキストを通じて子パーツに進捗状態を伝播します。
 *
 * @example 不定モード
 * ```tsx
 * <ButtonParts.CircularProgress indeterminate>
 *   <circle />
 * </ButtonParts.CircularProgress>
 * ```
 */
export const ButtonCircularProgress: Component<ButtonCircularProgressProps> =
  function SuiButtonCircularProgress(props) {
    const [renderProps, componentProps] = splitRenderProps(props);
    const {
      ref,
      fill = "none",
      width = "100%",
      xmlns = "http://www.w3.org/2000/svg",
      height = "100%",
      viewBox = "0 0 24 24",
      percentage,
      indeterminate = percentage === undefined || percentage < 0,
      ...elementProps
    } = componentProps;
    const context = React.useMemo(
      () => ({ percentage, indeterminate }),
      [percentage, indeterminate],
    );
    const element = useRenderElement("svg", renderProps, {
      ref,
      props: [
        elementProps,
        {
          fill,
          xmlns,
          width,
          height,
          viewBox,
          className: "sui_button_circular_progress",
        },
      ],
    });

    return <CircularProgressContext value={context}>{element}</CircularProgressContext>;
  };

export namespace CircularProgress {
  export type State = ButtonCircularProgressState;
  export type Props = ButtonCircularProgressProps;
}

export const CircularProgress: Component<CircularProgress.Props> = ButtonCircularProgress;

// CircularProgressTrack
// ---------------------

export type ButtonCircularProgressTrackState = {};

/**
 * {@link CircularProgressTrack} に渡すプロパティーです。
 */
export type ButtonCircularProgressTrackProps = Omit<
  React.ComponentProps<"circle">,
  keyof UseRenderElementComponentProps<{}>
> &
  UseRenderElementComponentProps<ButtonCircularProgressTrackState>;

/**
 * 円形プログレスバーのトラック（背景の円弧）を描画する要素です。
 *
 * @example
 * ```tsx
 * <ButtonParts.CircularProgressTrack strokeWidth={4} />
 * ```
 */
export const ButtonCircularProgressTrack: Component<ButtonCircularProgressTrackProps> =
  function SuiButtonCircularProgressTrack(props) {
    const [renderProps, componentProps] = splitRenderProps(props);
    const {
      r,
      cx = "50%",
      cy = "50%",
      ref,
      stroke = "currentColor",
      strokeWidth = 4,
      ...elementProps
    } = componentProps;
    const strokeWidthCss = typeof strokeWidth === "number" ? strokeWidth + "px" : strokeWidth;

    return useRenderElement("circle", renderProps, {
      ref,
      props: {
        ...elementProps,
        r: r ?? `calc(50% - ${strokeWidthCss} / 2)`,
        cx,
        cy,
        stroke,
        className: "sui_button_circular_progress_track",
        strokeWidth: strokeWidthCss,
      },
    });
  };

export namespace CircularProgressTrack {
  export type State = ButtonCircularProgressTrackState;
  export type Props = ButtonCircularProgressTrackProps;
}

export const CircularProgressTrack: Component<CircularProgressTrack.Props> =
  ButtonCircularProgressTrack;

// CircularProgressFill
// --------------------

export type ButtonCircularProgressFillState = {};

/**
 * {@link CircularProgressFill} に渡すプロパティーです。
 */
export type ButtonCircularProgressFillProps = Omit<
  React.ComponentProps<"circle">,
  keyof UseRenderElementComponentProps<{}>
> &
  UseRenderElementComponentProps<ButtonCircularProgressFillState>;

/**
 * 円形プログレスバーのフィル（進捗を表す円弧）を描画する要素です。
 *
 * コンテキストから `percentage` と `indeterminate` を読み取り、
 * `strokeDashoffset` を自動計算して進捗を表現します。
 *
 * @example
 * ```tsx
 * <ButtonParts.CircularProgressFill strokeWidth={4} strokeLinecap="round" />
 * ```
 */
export const ButtonCircularProgressFill: Component<ButtonCircularProgressFillProps> =
  function SuiButtonCircularProgressFill(props) {
    const { percentage, indeterminate } = useCircularProgressContext();
    const [renderProps, componentProps] = splitRenderProps(props);
    const {
      r,
      cx = "50%",
      cy = "50%",
      ref,
      stroke = "currentColor",
      pathLength = "100",
      strokeWidth = 4,
      strokeLinecap = "round",
      strokeDasharray = "100 200",
      strokeDashoffset = 100 - (indeterminate || percentage === undefined ? 25 : percentage),
      ...elementProps
    } = componentProps;
    const strokeWidthCss = typeof strokeWidth === "number" ? strokeWidth + "px" : strokeWidth;

    return useRenderElement("circle", renderProps, {
      ref,
      props: {
        ...elementProps,
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
    });
  };

export namespace CircularProgressFill {
  export type State = ButtonCircularProgressFillState;
  export type Props = ButtonCircularProgressFillProps;
}

export const CircularProgressFill: Component<CircularProgressFill.Props> =
  ButtonCircularProgressFill;

// CircularProgressFillRotation
// ----------------------------

export type ButtonCircularProgressFillRotationState = {};

/**
 * {@link CircularProgressFillRotation} に渡すプロパティーです。
 */
export type ButtonCircularProgressFillRotationProps = Omit<
  React.ComponentProps<"animateTransform">,
  keyof UseRenderElementComponentProps<{}>
> &
  UseRenderElementComponentProps<ButtonCircularProgressFillState>;

/**
 * 不定モード時に円形プログレスバーを回転させるアニメーション要素です。
 *
 * コンテキストから `indeterminate` を読み取り、不定モードの場合のみ有効になります。
 *
 * @example
 * ```tsx
 * <ButtonParts.CircularProgressFillRotation dur="0.75s" />
 * ```
 */
export const ButtonCircularProgressFillRotation: Component<ButtonCircularProgressFillRotationProps> =
  function SuiButtonCircularProgressFillRotation(props) {
    const { indeterminate } = useCircularProgressContext();
    const [renderProps, componentProps] = splitRenderProps(props);
    const {
      dur = "0.75s",
      type = "rotate",
      values = "0;360",
      repeatCount = "indefinite",
      attributeName = "transform",
      ...elementProps
    } = componentProps;

    return useRenderElement("animateTransform", renderProps, {
      enabled: indeterminate,
      props: {
        ...elementProps,
        dur,
        type,
        values,
        className: "sui_button_circular_progress_fill_rotation",
        repeatCount,
        attributeName,
      },
    });
  };

export namespace CircularProgressFillRotation {
  export type Props = ButtonCircularProgressFillRotationProps;
}

export const CircularProgressFillRotation: Component<CircularProgressFillRotation.Props> =
  ButtonCircularProgressFillRotation;
