import { Toggle } from "@base-ui/react/toggle";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.jsx";
import type { Override, IComponent, IUseContext } from "../types.js";

// Context
// -------

/**
 * {@link Button.Context}
 */
export type ToggleButtonContext = Button.Context;

/**
 * {@link Button.Context}
 */
export const ToggleButtonContext: React.Context<ToggleButtonContext | null> = Button.Context;

/**
 * {@link Button.useContext}
 */
export const useToggleButtonContext: IUseContext<ToggleButtonContext> = Button.useContext;

export { ToggleButtonContext as Context, useToggleButtonContext as useContext };

// CircularProgressContext
// -----------------------

/**
 * {@link Button.CircularProgressContext}
 */
export type ToggleButtonCircularProgressContext = Button.CircularProgressContext;

/**
 * {@link Button.CircularProgressContext}
 */
export const ToggleButtonCircularProgressContext: React.Context<ToggleButtonCircularProgressContext | null> =
  Button.CircularProgressContext;

/**
 * {@link Button.useCircularProgressContext}
 */
export const useToggleButtonCircularProgressContext: IUseContext<ToggleButtonCircularProgressContext> =
  Button.useCircularProgressContext;

export {
  ToggleButtonCircularProgressContext as CircularProgressContext,
  useToggleButtonCircularProgressContext as useCircularProgressContext,
};

// Root
// ----

/**
 * トグルボタンの押下状態が変更されたイベントの詳細です。
 */
export type ToggleButtonRootChangeEventDetails = Toggle.ChangeEventDetails;

/**
 * トグルボタンの押下状態が変更された理由です。
 */
export type ToggleButtonRootChangeEventReason = Toggle.ChangeEventReason;

/**
 * トグルボタンの配色です。
 */
export type ToggleButtonRootColor = Button.Root.Color;

/**
 * トグルボタンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type ToggleButtonRootRadius = Button.Root.Radius;

/**
 * トグルボタンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ToggleButtonRootSize = Button.Root.Size;

/**
 * トグルボタンの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ToggleButtonRootVariant = "naked" | "liquid";

/**
 * {@link ToggleButtonRoot} が持つ状態です。
 */
export type ToggleButtonRootState = Override<Button.Root.State, Toggle.State>;

/**
 * {@link ToggleButtonRoot} に渡す props です。
 */
export type ToggleButtonRootProps = Override<
  Button.Root.Props,
  Override<React.ComponentProps<typeof Toggle>, RenderProps<ToggleButtonRootState>>
> & {
  /**
   * トグルボタンの配色を指定します。
   *
   * 押下状態でないときは grey で表示されます。
   *
   * @default "grey"
   */
  color?: ToggleButtonRootColor | undefined;

  /**
   * トグルボタンの角丸の大きさを指定します。
   *
   * 既定値は {@link ToggleButtonRootProps.size|size}
   */
  radius?: ToggleButtonRootRadius | undefined;

  /**
   * トグルボタンの大きさを指定します。
   *
   * @default "md"
   */
  size?: ToggleButtonRootSize | undefined;

  /**
   * トグルボタンの主な外観を指定します。
   *
   * 押下状態では solid で表示されます。
   *
   * @default "liquid"
   */
  variant?: ToggleButtonRootVariant | undefined;
};

/**
 * トグルボタンのルートコンポーネントです。
 */
export const ToggleButtonRoot: IComponent<ToggleButtonRootProps> = function SuiToggleButtonRoot(
  props,
) {
  const {
    size = "md",
    color = "grey",
    style,
    radius = size,
    render,
    pending = false,
    squared = false,
    variant = "liquid",
    disabled = false,
    outlined = false,
    className,
    nativeButton,
    focusableWhenDisabled = !disabled && pending,
    ...otherProps
  } = props;

  return (
    <Toggle
      {...otherProps}
      render={(htmlProps: {}, toggleState) => (
        <Button.Root
          {...mergeProps<typeof Button.Root>([
            htmlProps,
            {
              size,
              color: toggleState.pressed ? color : "grey",
              radius,
              pending,
              squared,
              variant: toggleState.pressed ? "solid" : variant,
              disabled,
              outlined,
              focusableWhenDisabled,
            },
            proxyRenderProps(toggleState, {
              style,
              render,
              className,
            }),
          ])}
          nativeButton={nativeButton}
        />
      )}
      disabled={disabled}
      nativeButton={nativeButton}
    />
  );
};

export { ToggleButtonRoot as Root };

export namespace Root {
  /**
   * {@link ToggleButtonRootState}
   */
  export type State = ToggleButtonRootState;

  /**
   * {@link ToggleButtonRootProps}
   */
  export type Props = ToggleButtonRootProps;

  /**
   * {@link ToggleButtonRootChangeEventDetails}
   */
  export type ChangeEventDetails = ToggleButtonRootChangeEventDetails;

  /**
   * {@link ToggleButtonRootChangeEventReason}
   */
  export type ChangeEventReason = ToggleButtonRootChangeEventReason;

  /**
   * {@link ToggleButtonRootColor}
   */
  export type Color = ToggleButtonRootColor;

  /**
   * {@link ToggleButtonRootRadius}
   */
  export type Radius = ToggleButtonRootRadius;

  /**
   * {@link ToggleButtonRootSize}
   */
  export type Size = ToggleButtonRootSize;

  /**
   * {@link ToggleButtonRootVariant}
   */
  export type Variant = ToggleButtonRootVariant;
}

// Content
// -------

/**
 * {@link ToggleButtonContent} が持つ状態です。
 */
export type ToggleButtonContentState = Button.Content.State;

/**
 * {@link ToggleButtonContent} に渡す props です。
 */
export type ToggleButtonContentProps = Button.Content.Props;

/**
 * トグルボタンのコンテンツを表示するコンポーネントです。
 */
export const ToggleButtonContent: IComponent<ToggleButtonContentProps> =
  function SuiToggleButtonContent(props) {
    return <Button.Content {...props} />;
  };

export { ToggleButtonContent as Content };

export namespace Content {
  /**
   * {@link ToggleButtonContentState}
   */
  export type State = ToggleButtonContentState;

  /**
   * {@link ToggleButtonContentProps}
   */
  export type Props = ToggleButtonContentProps;
}

// Pending
// -------

/**
 * {@link ToggleButtonPending} が持つ状態です。
 */
export type ToggleButtonPendingState = Button.Pending.State;

/**
 * {@link ToggleButtonPending} に渡す props です。
 */
export type ToggleButtonPendingProps = Button.Pending.Props;

/**
 * トグルボタンの保留状態を表示するコンポーネントです。
 *
 * 保留中のみ有効になります。
 */
export const ToggleButtonPending: IComponent<ToggleButtonPendingProps> =
  function SuiToggleButtonPending(props) {
    return <Button.Pending {...props} />;
  };

export { ToggleButtonPending as Pending };

export namespace Pending {
  /**
   * {@link ToggleButtonPendingState}
   */
  export type State = ToggleButtonPendingState;

  /**
   * {@link ToggleButtonPendingProps}
   */
  export type Props = ToggleButtonPendingProps;
}

// CircularProgress
// ----------------

/**
 * {@link ToggleButtonCircularProgress} が持つ状態です。
 */
export type ToggleButtonCircularProgressState = Button.CircularProgress.State;

/**
 * {@link ToggleButtonCircularProgress} に渡す props です。
 */
export type ToggleButtonCircularProgressProps = Button.CircularProgress.Props;

/**
 * 円形プログレスバーの SVG ルートコンポーネントです。
 */
export const ToggleButtonCircularProgress: IComponent<ToggleButtonCircularProgressProps> =
  function SuiToggleButtonCircularProgress(props) {
    return <Button.CircularProgress {...props} />;
  };

export { ToggleButtonCircularProgress as CircularProgress };

export namespace CircularProgress {
  /**
   * {@link ToggleButtonCircularProgressState}
   */
  export type State = ToggleButtonCircularProgressState;

  /**
   * {@link ToggleButtonCircularProgressProps}
   */
  export type Props = ToggleButtonCircularProgressProps;
}

// CircularProgressTrack
// ---------------------

/**
 * {@link ToggleButtonCircularProgressTrack} が持つ状態です。
 */
export type ToggleButtonCircularProgressTrackState = Button.CircularProgressTrack.State;

/**
 * {@link ToggleButtonCircularProgressTrack} に渡す props です。
 */
export type ToggleButtonCircularProgressTrackProps = Button.CircularProgressTrack.Props;

/**
 * 円形プログレスバーのトラック（背景の円弧）を描画するコンポーネントです。
 */
export const ToggleButtonCircularProgressTrack: IComponent<ToggleButtonCircularProgressTrackProps> =
  function SuiToggleButtonCircularProgressTrack(props) {
    return <Button.CircularProgressTrack {...props} />;
  };

export { ToggleButtonCircularProgressTrack as CircularProgressTrack };

export namespace CircularProgressTrack {
  /**
   * {@link ToggleButtonCircularProgressTrackState}
   */
  export type State = ToggleButtonCircularProgressTrackState;

  /**
   * {@link ToggleButtonCircularProgressTrackProps}
   */
  export type Props = ToggleButtonCircularProgressTrackProps;
}

// CircularProgressFill
// --------------------

/**
 * {@link ToggleButtonCircularProgressFill} が持つ状態です。
 */
export type ToggleButtonCircularProgressFillState = Button.CircularProgressFill.State;

/**
 * {@link ToggleButtonCircularProgressFill} に渡す props です。
 */
export type ToggleButtonCircularProgressFillProps = Button.CircularProgressFill.Props;

/**
 * 円形プログレスバーのフィル（進捗を表す円弧）を描画するコンポーネントです。
 */
export const ToggleButtonCircularProgressFill: IComponent<ToggleButtonCircularProgressFillProps> =
  function SuiToggleButtonCircularProgressFill(props) {
    return <Button.CircularProgressFill {...props} />;
  };

export { ToggleButtonCircularProgressFill as CircularProgressFill };

export namespace CircularProgressFill {
  /**
   * {@link ToggleButtonCircularProgressFillState}
   */
  export type State = ToggleButtonCircularProgressFillState;

  /**
   * {@link ToggleButtonCircularProgressFillProps}
   */
  export type Props = ToggleButtonCircularProgressFillProps;
}

// CircularProgressFillRotation
// ----------------------------

/**
 * {@link ToggleButtonCircularProgressFillRotation} が持つ状態です。
 */
export type ToggleButtonCircularProgressFillRotationState =
  Button.CircularProgressFillRotation.State;

/**
 * {@link ToggleButtonCircularProgressFillRotation} に渡す props です。
 */
export type ToggleButtonCircularProgressFillRotationProps =
  Button.CircularProgressFillRotation.Props;

/**
 * 不定モード時に円形プログレスバーを回転させるアニメーションコンポーネントです。
 *
 * 不定モードの場合のみ有効になります。
 */
export const ToggleButtonCircularProgressFillRotation: IComponent<ToggleButtonCircularProgressFillRotationProps> =
  function SuiToggleButtonCircularProgressFillRotation(props) {
    return <Button.CircularProgressFillRotation {...props} />;
  };

export { ToggleButtonCircularProgressFillRotation as CircularProgressFillRotation };

export namespace CircularProgressFillRotation {
  /**
   * {@link ToggleButtonCircularProgressFillRotationState}
   */
  export type State = ToggleButtonCircularProgressFillRotationState;

  /**
   * {@link ToggleButtonCircularProgressFillRotationProps}
   */
  export type Props = ToggleButtonCircularProgressFillRotationProps;
}
