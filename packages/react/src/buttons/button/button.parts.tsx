import type { Size, Color, ColorTemplate as Variant } from "@suru-ui/theme";
import * as React from "react";
import { type RenderProps, composeRenderProps } from "react-aria-components";
import { type ButtonRenderProps, Button } from "react-aria-components/Button";
import { type ProgressBarRenderProps, ProgressBar } from "react-aria-components/ProgressBar";

import cn from "../../shared/cn.js";
import type { $OverrideProps, ReactComponent } from "../../shared/types.js";
import useMemoizeRecord from "../../shared/use-memoize-record.js";
import useRender from "../../shared/use-render.jsx";

import "./button.css";

// Context
// -------

/**
 * ボタンコンテキストの値です。
 *
 * ボタンの描画状態（ホバー、フォーカス、プレス、無効など）に加え、スタイル情報（`color`、`size`、`variant`）を提供します。
 */
export type ButtonContextValue = Readonly<
  ButtonRenderProps & {
    /**
     * ボタンの色です。
     */
    color: Color;

    /**
     * ボタンのサイズです。
     */
    size: Size;

    /**
     * ボタンの外観です。
     */
    variant: Variant;
  }
>;

export const ButtonContext = /*#__PURE__*/ React.createContext<ButtonContextValue | null>(null);

export const Context = ButtonContext;

// Root
// ----

/**
 * ボタンのルート要素のプロパティーです。
 */
export type ButtonRootProps = $OverrideProps<
  React.ComponentProps<typeof Button>,
  {
    /**
     * ボタンの色です。
     */
    color?: Color | undefined;

    /**
     * アウトラインドスタイルにするかどうかです。
     */
    isOutlined?: boolean | undefined;

    /**
     * 角を四角くするかどうかです。
     */
    isSquared?: boolean | undefined;

    /**
     * 角丸の種類です。
     *
     * - `"none"`: 角を丸めません。
     * - `"rounded"`: 標準の角丸にします。
     * - `"full"`: 完全な円形にします。
     */
    radius?: "none" | "rounded" | "full" | undefined;

    /**
     * ボタンのサイズです。
     */
    size?: Size | undefined;

    /**
     * ボタンの外観です。
     */
    variant?: Variant | undefined;
  }
>;

/**
 * スタイル付きボタンのルートコンポーネントです。
 *
 * @example デフォルトのボタン
 * ```tsx
 * <ButtonRoot>クリック</ButtonRoot>
 * ```
 *
 * @example サイズとカラーを指定
 * ```tsx
 * <ButtonRoot size="lg" color="blue" variant="soft">
 *   送信
 * </ButtonRoot>
 * ```
 */
export const ButtonRoot: ReactComponent<ButtonRootProps> = function SuiButtonRoot(props) {
  const {
    size = "md",
    type = "button",
    color = "grey",
    radius = "rounded",
    variant = "solid",
    children,
    isSquared = false,
    isOutlined = false,
    className,
    ...otherProps
  } = props;
  const memoizeRecord = useMemoizeRecord();

  return (
    <Button
      {...otherProps}
      type={type}
      className={cn(
        className,
        "sui_button",
        `sui_button-size_${size}`,
        `sui_button-color_${color}`,
        `sui_button-radius_${radius}`,
        `sui_button-variant_${variant}`,
        isSquared && "sui_button-squared",
        isOutlined && "sui_button-outlined",
        ({ isDisabled }) => isDisabled && "sui_button-disabled",
      )}
    >
      {composeRenderProps(children, (children, values) => {
        const contextValue = memoizeRecord({ ...values, size, color, variant }, [
          "size",
          "color",
          "variant",
          "isFocused",
          "isHovered",
          "isPending",
          "isPressed",
          "isDisabled",
          "isFocusVisible",
        ]);

        return <ButtonContext value={contextValue}>{children}</ButtonContext>;
      })}
    </Button>
  );
};

export namespace Root {
  export type ContextValue = ButtonContextValue;
  export type Props = ButtonRootProps;
}

export const Root: ReactComponent<Root.Props> = ButtonRoot;

// Content
// -------

/**
 * ボタンの content 領域のプロパティーです。
 */
export type ButtonContentProps = $OverrideProps<
  React.ComponentProps<"div">,
  RenderProps<ButtonRenderProps, "div"> & {
    /**
     * 子要素の並び方向です。
     *
     * - `"row"`: 横並びに配置します。
     * - `"column"`: 縦並びに配置します。
     */
    direction?: "row" | "column" | undefined;
  }
>;

/**
 * ボタンの子要素をラップする content コンポーネントです。
 *
 * ボタンコンテキストから描画状態を取得し、data 属性として展開します。
 */
export const ButtonContent: ReactComponent<ButtonContentProps> = function SuiButtonContent(props) {
  const {
    size,
    color,
    variant,
    isFocused,
    isHovered,
    isPending,
    isPressed,
    isDisabled,
    isFocusVisible,
  } = React.use(ButtonContext)!;
  const { render, className, direction = "row", ...otherProps } = props;

  return useRender({
    defaultTagName: "div",
    render,
    values: {
      isFocused,
      isHovered,
      isPending,
      isPressed,
      isDisabled,
      isFocusVisible,
    },
    props: {
      ...otherProps,
      className: cn(
        className,
        "sui_button_content",
        `sui_button_content-size_${size}`,
        `sui_button_content-color_${color}`,
        `sui_button_content-variant_${variant}`,
        `sui_button_content-direction_${direction}`,
        isDisabled && "sui_button_content-disabled",
      ),
      "data-focused": isFocused,
      "data-hovered": isHovered,
      "data-pending": isPending,
      "data-pressed": isPressed,
      "data-disabled": isDisabled,
      "data-focus-visible": isFocusVisible,
    },
  });
};

export namespace Content {
  export type Props = ButtonContentProps;
}

export const Content: ReactComponent<Content.Props> = ButtonContent;

// ProgressContext
// ---------------

/**
 * プログレスバーコンテキストの値です。
 *
 * 現在の進捗率（`percentage`）と不確定状態（`isIndeterminate`）を提供します。
 */
export type ButtonProgressContextValue = Readonly<
  Pick<ProgressBarRenderProps, "percentage" | "isIndeterminate">
>;

export const ButtonProgressContext =
  /*#__PURE__*/ React.createContext<ButtonProgressContextValue | null>(null);

export const ProgressContext = ButtonProgressContext;

// Progress
// --------

/**
 * ボタン内のプログレスバーのプロパティーです。
 *
 * 内部で `react-aria-components/ProgressBar` を使用します。
 */
export type ButtonProgressProps = React.ComponentProps<typeof ProgressBar>;

/**
 * ボタンのプログレスバーコンポーネントです。
 *
 * ボタンが pending 状態の場合にのみプログレスバーを表示します。
 */
export const ButtonProgress: ReactComponent<ButtonProgressProps, React.JSX.Element | null> =
  function SuiButtonProgress(props) {
    const {
      size,
      color,
      variant,
      isFocused,
      isHovered,
      isPending,
      isPressed,
      isDisabled,
      isFocusVisible,
    } = React.use(ButtonContext)!;
    if (!isPending) {
      return null;
    }

    const { children, className, ...otherProps } = props;
    const memoizeRecord = useMemoizeRecord();

    return (
      <ProgressBar
        {...otherProps}
        className={cn(
          className,
          "sui_button_progress",
          `sui_button_progress-size_${size}`,
          `sui_button_progress-color_${color}`,
          `sui_button_progress-variant_${variant}`,
          isDisabled && "sui_button_progress-disabled",
        )}
        data-focused={isFocused}
        data-hovered={isHovered}
        data-pressed={isPressed}
        data-disabled={isDisabled}
        data-focus-visible={isFocusVisible}
      >
        {composeRenderProps(children, (children, values) => {
          const contextValue = memoizeRecord(values, ["percentage", "isIndeterminate"]);

          return <ProgressContext value={contextValue}>{children}</ProgressContext>;
        })}
      </ProgressBar>
    );
  };

export namespace Progress {
  export type Props = ButtonProgressProps;
}

export const Progress: ReactComponent<Progress.Props, React.JSX.Element | null> = ButtonProgress;

// CircularProgress
// ----------------

/**
 * 円形プログレスインジケーターの svg ラッパーのプロパティーです。
 */
export type ButtonCircularProgressProps = $OverrideProps<
  React.ComponentProps<"svg">,
  RenderProps<ButtonProgressContextValue, "svg">
>;

/**
 * 円形プログレスインジケーターの svg コンポーネントです。
 */
export const ButtonCircularProgress: ReactComponent<ButtonCircularProgressProps> =
  function SuiButtonCircularProgress(props) {
    const {
      size,
      color,
      variant,
      isFocused,
      isHovered,
      isPending,
      isPressed,
      isDisabled,
      isFocusVisible,
    } = React.use(ButtonContext)!;

    const {
      fill = "none",
      width = "100%",
      xmlns = "http://www.w3.org/2000/svg",
      height = "100%",
      render,
      viewBox = "0 0 24 24",
      className,
      ...otherProps
    } = props;

    return useRender({
      defaultTagName: "svg",
      render,
      values: React.use(ButtonProgressContext)!,
      props: {
        ...otherProps,
        fill,
        xmlns,
        width,
        height,
        viewBox,
        className: cn(
          className,
          "sui_button_circular_progress",
          `sui_button_circular_progress-size_${size}`,
          `sui_button_circular_progress-color_${color}`,
          `sui_button_circular_progress-variant_${variant}`,
          isDisabled && "sui_button_circular_progress-disabled",
        ),
        "data-focused": isFocused,
        "data-hovered": isHovered,
        "data-pending": isPending,
        "data-pressed": isPressed,
        "data-disabled": isDisabled,
        "data-focus-visible": isFocusVisible,
      },
    });
  };

export namespace CircularProgress {
  export type Props = ButtonCircularProgressProps;
}

export const CircularProgress: ReactComponent<CircularProgress.Props> = ButtonCircularProgress;

// CircularProgressTrack
// ---------------------

/**
 * 円形プログレスのトラック（背景円）のプロパティーです。
 */
export type ButtonCircularProgressTrackProps = $OverrideProps<
  React.ComponentProps<"circle">,
  RenderProps<ButtonProgressContextValue, "circle">
>;

/**
 * 円形プログレスのトラック（背景円）コンポーネントです。
 */
export const ButtonCircularProgressTrack: ReactComponent<ButtonCircularProgressTrackProps> =
  function SuiButtonCircularProgressTrack(props) {
    const {
      size,
      color,
      variant,
      isFocused,
      isHovered,
      isPending,
      isPressed,
      isDisabled,
      isFocusVisible,
    } = React.use(ButtonContext)!;

    const {
      r,
      cx = "50%",
      cy = "50%",
      render,
      stroke = "currentColor",
      className,
      strokeWidth = 4,
      ...otherProps
    } = props;

    return useRender({
      defaultTagName: "circle",
      render,
      values: React.use(ButtonProgressContext)!,
      props: {
        ...otherProps,
        r:
          r ??
          `calc(50% - ${typeof strokeWidth === "number" ? strokeWidth + "px" : strokeWidth} / 2)`,
        cx,
        cy,
        stroke,
        className: cn(
          className,
          "sui_button_circular_progress_track",
          `sui_button_circular_progress_track-size_${size}`,
          `sui_button_circular_progress_track-color_${color}`,
          `sui_button_circular_progress_track-variant_${variant}`,
          isDisabled && "sui_button_circular_progress_track-disabled",
        ),
        strokeWidth,
        "data-focused": isFocused,
        "data-hovered": isHovered,
        "data-pending": isPending,
        "data-pressed": isPressed,
        "data-disabled": isDisabled,
        "data-focus-visible": isFocusVisible,
      },
    });
  };

export namespace CircularProgressTrack {
  export type Props = ButtonCircularProgressTrackProps;
}

export const CircularProgressTrack: ReactComponent<CircularProgressTrack.Props> =
  ButtonCircularProgressTrack;

// CircularProgressFill
// --------------------

/**
 * 円形プログレスのフィル（進捗を示す円弧）のプロパティーです。
 */
export type ButtonCircularProgressFillProps = $OverrideProps<
  React.ComponentProps<"circle">,
  RenderProps<ButtonProgressContextValue, "circle">
>;

/**
 * 円形プログレスのフィル（進捗を示す円弧）コンポーネントです。
 *
 * `percentage` と `isIndeterminate` に応じて stroke-dashoffset を調整します。
 */
export const ButtonCircularProgressFill: ReactComponent<ButtonCircularProgressFillProps> =
  function SuiButtonCircularProgressFill(props) {
    const {
      size,
      color,
      variant,
      isFocused,
      isHovered,
      isPending,
      isPressed,
      isDisabled,
      isFocusVisible,
    } = React.use(ButtonContext)!;

    const { percentage, isIndeterminate } = React.use(ButtonProgressContext)!;

    const {
      r,
      cx = "50%",
      cy = "50%",
      render,
      stroke = "currentColor",
      className,
      pathLength = "100",
      strokeWidth = 4,
      strokeLinecap = "round",
      strokeDasharray = "100 200",
      strokeDashoffset = 100 - (isIndeterminate || percentage == null ? 25 : percentage),
      ...otherProps
    } = props;

    return useRender({
      defaultTagName: "circle",
      render,
      values: {
        percentage,
        isIndeterminate,
      },
      props: {
        ...otherProps,
        r:
          r ??
          `calc(50% - ${typeof strokeWidth === "number" ? strokeWidth + "px" : strokeWidth} / 2)`,
        cx,
        cy,
        stroke,
        className: cn(
          className,
          "sui_button_circular_progress_fill",
          `sui_button_circular_progress_fill-size_${size}`,
          `sui_button_circular_progress_fill-color_${color}`,
          `sui_button_circular_progress_fill-variant_${variant}`,
          isDisabled && "sui_button_circular_progress_fill-disabled",
        ),
        pathLength,
        strokeWidth,
        strokeLinecap,
        strokeDasharray,
        strokeDashoffset,
        "data-focused": isFocused,
        "data-hovered": isHovered,
        "data-pending": isPending,
        "data-pressed": isPressed,
        "data-disabled": isDisabled,
        "data-focus-visible": isFocusVisible,
      },
    });
  };

export namespace CircularProgressFill {
  export type Props = ButtonCircularProgressFillProps;
}

export const CircularProgressFill: ReactComponent<CircularProgressFill.Props> =
  ButtonCircularProgressFill;

// CircularProgressFillAnimation
// -----------------------------

/**
 * 円形プログレスのフィルアニメーション（不確定状態の回転）のプロパティーです。
 */
export type ButtonCircularProgressFillAnimationProps = $OverrideProps<
  React.ComponentProps<"animateTransform">,
  RenderProps<ButtonProgressContextValue>
>;

/**
 * 円形プログレスのフィルアニメーションコンポーネントです。
 *
 * `isIndeterminate` が `true` の場合のみ回転アニメーションを描画します。
 */
export const ButtonCircularProgressFillAnimation: ReactComponent<
  ButtonCircularProgressFillAnimationProps,
  React.JSX.Element | null
> = function SuiButtonCircularProgressFillAnimation(props) {
  const { isIndeterminate } = React.use(ButtonProgressContext)!;
  if (!isIndeterminate) {
    return null;
  }

  const {
    dur = "0.75s",
    type = "rotate",
    render,
    values = "0;360",
    className,
    repeatCount = "indefinite",
    attributeName = "transform",
    ...otherProps
  } = props;

  return useRender({
    defaultTagName: "animateTransform",
    render,
    values: React.use(ButtonProgressContext)!,
    props: {
      ...otherProps,
      dur,
      type,
      values,
      className: cn(className, "sui_button_circular_progress_fill_animation"),
      repeatCount,
      attributeName,
    },
  });
};

export namespace CircularProgressFillAnimation {
  export type Props = ButtonCircularProgressFillAnimationProps;
}

export const CircularProgressFillAnimation: ReactComponent<
  CircularProgressFillAnimation.Props,
  React.JSX.Element | null
> = ButtonCircularProgressFillAnimation;
