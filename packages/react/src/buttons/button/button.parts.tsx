import { Button } from "@base-ui/react/button";
import type { Size, Color, ColorTemplate as Variant } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";
import { useButtonGroupContext } from "../button-group/button-group.parts.jsx";

import "./button.css";

// Context
// -------

/**
 * {@link ButtonRoot} が子パーツへ提供する状態です。
 */
export type ButtonContext = {
  /**
   * ボタンが保留状態かどうかです。
   */
  readonly pending: boolean;
};

/**
 * {@link ButtonRoot} が提供するボタン状態の Context です。
 *
 * 通常は {@link useButtonContext} または {@link useContext} を使用してください。
 */
export const ButtonContext: React.Context<ButtonContext | null> =
  React.createContext<ButtonContext | null>(null);

/**
 * 直近の {@link ButtonRoot} が提供する状態を取得します。
 *
 * `optional` が `true` の場合、Provider の外では `null` を返します。
 * `optional` を指定しない場合、Provider の外で呼び出すとエラーになります。
 */
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

/**
 * ボタン Context の別名です。
 */
export type Context = ButtonContext;

/**
 * {@link ButtonContext} の別名です。
 */
export const Context: React.Context<ButtonContext | null> = ButtonContext;

/**
 * {@link useButtonContext} の別名です。
 */
export function useContext(optional?: false): ButtonContext;
export function useContext(optional?: boolean): ButtonContext | null;
export function useContext(optional?: boolean): ButtonContext | null {
  return useButtonContext(optional);
}

// Root
// ----

/**
 * {@link ButtonRoot} の状態です。
 */
export type ButtonRootState = Button.State;

/**
 * {@link ButtonRoot} に渡すプロパティーです。
 */
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
  const group = useButtonGroupContext(true);
  const {
    size: sizeProp = "md",
    type = "button",
    color: colorProp = "grey",
    radius: radiusProp = "rounded",
    pending = false,
    squared = false,
    variant: variantProp = "solid",
    disabled = false,
    outlined: outlinedProp = false,
    className,
    focusableWhenDisabled = !disabled && pending,
    ...otherProps
  } = props;
  const size = group?.size ?? sizeProp;
  const color = group?.color ?? colorProp;
  const radius = group?.radius ?? radiusProp;
  const variant = group?.variant ?? variantProp;
  const outlined = group?.outlined ?? outlinedProp;
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

/**
 * {@link ButtonRoot} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link ButtonRoot} の状態型です。
   */
  export type State = ButtonRootState;

  /**
   * {@link ButtonRoot} のプロパティー型です。
   */
  export type Props = ButtonRootProps;
}

/**
 * {@link ButtonRoot} の別名です。
 */
export const Root: Component<Root.Props> = ButtonRoot;

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
 * ボタンのコンテンツを表示するラッパー要素です。
 *
 * @example
 * ```tsx
 * <ButtonParts.Content>ラベル</ButtonParts.Content>
 * ```
 */
export const ButtonContent: Component<ButtonContentProps> = function SuiButtonContent(props) {
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
 * {@link ButtonContent} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Content {
  /**
   * {@link ButtonContent} の状態型です。
   */
  export type State = ButtonContentState;

  /**
   * {@link ButtonContent} のプロパティー型です。
   */
  export type Props = ButtonContentProps;
}

/**
 * {@link ButtonContent} の別名です。
 */
export const Content: Component<Content.Props> = ButtonContent;

// Pending
// -------

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
 * {@link ButtonPending} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Pending {
  /**
   * {@link ButtonPending} の状態型です。
   */
  export type State = ButtonPendingState;

  /**
   * {@link ButtonPending} のプロパティー型です。
   */
  export type Props = ButtonPendingProps;
}

/**
 * {@link ButtonPending} の別名です。
 */
export const Pending: Component<Pending.Props> = ButtonPending;

// CircularProgressContext
// -----------------------

/**
 * {@link ButtonCircularProgress} が子パーツへ提供する進捗状態です。
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
 * {@link ButtonCircularProgress} が提供する進捗状態の Context です。
 *
 * 通常は {@link useCircularProgressContext} または {@link useContext} を使用してください。
 */
export const ButtonCircularProgressContext: React.Context<ButtonCircularProgressContext | null> =
  React.createContext<ButtonCircularProgressContext | null>(null);

/**
 * 直近の {@link ButtonCircularProgress} が提供する進捗状態を取得します。
 *
 * `optional` が `true` の場合、Provider の外では `null` を返します。
 * `optional` を指定しない場合、Provider の外で呼び出すとエラーになります。
 */
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

/**
 * {@link ButtonCircularProgressContext} の別名です。
 */
export type CircularProgressContext = ButtonCircularProgressContext;

/**
 * {@link ButtonCircularProgressContext} の別名です。
 */
export const CircularProgressContext: React.Context<ButtonCircularProgressContext | null> =
  ButtonCircularProgressContext;

/**
 * {@link useButtonCircularProgressContext} の別名です。
 */
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
 * {@link ButtonCircularProgress} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace CircularProgress {
  /**
   * {@link ButtonCircularProgress} の状態型です。
   */
  export type State = ButtonCircularProgressState;

  /**
   * {@link ButtonCircularProgress} のプロパティー型です。
   */
  export type Props = ButtonCircularProgressProps;
}

/**
 * {@link ButtonCircularProgress} の別名です。
 */
export const CircularProgress: Component<CircularProgress.Props> = ButtonCircularProgress;

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
 * 円形プログレスバーのトラック（背景の円弧）を描画する要素です。
 *
 * @example
 * ```tsx
 * <ButtonParts.CircularProgressTrack strokeWidth={4} />
 * ```
 */
export const ButtonCircularProgressTrack: Component<ButtonCircularProgressTrackProps> =
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
 * {@link ButtonCircularProgressTrack} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace CircularProgressTrack {
  /**
   * {@link ButtonCircularProgressTrack} の状態型です。
   */
  export type State = ButtonCircularProgressTrackState;

  /**
   * {@link ButtonCircularProgressTrack} のプロパティー型です。
   */
  export type Props = ButtonCircularProgressTrackProps;
}

/**
 * {@link ButtonCircularProgressTrack} の別名です。
 */
export const CircularProgressTrack: Component<CircularProgressTrack.Props> =
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
 * {@link ButtonCircularProgressFill} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace CircularProgressFill {
  /**
   * {@link ButtonCircularProgressFill} の状態型です。
   */
  export type State = ButtonCircularProgressFillState;

  /**
   * {@link ButtonCircularProgressFill} のプロパティー型です。
   */
  export type Props = ButtonCircularProgressFillProps;
}

/**
 * {@link ButtonCircularProgressFill} の別名です。
 */
export const CircularProgressFill: Component<CircularProgressFill.Props> =
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
   * {@link ButtonCircularProgressFillRotation} のプロパティー型です。
   */
  export type Props = ButtonCircularProgressFillRotationProps;
}

/**
 * {@link ButtonCircularProgressFillRotation} の別名です。
 */
export const CircularProgressFillRotation: Component<CircularProgressFillRotation.Props> =
  ButtonCircularProgressFillRotation;
