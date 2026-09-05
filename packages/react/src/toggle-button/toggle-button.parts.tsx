import { Toggle } from "@base-ui/react/toggle";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import {
  type ButtonContentProps,
  type ButtonContentState,
  type ButtonPendingProps,
  type ButtonPendingState,
  type ButtonCircularProgressProps,
  type ButtonCircularProgressState,
  type ButtonCircularProgressFillProps,
  type ButtonCircularProgressFillState,
  type ButtonCircularProgressTrackProps,
  type ButtonCircularProgressTrackState,
  type ButtonCircularProgressFillRotationProps,
  type ButtonCircularProgressFillRotationState,
  ButtonRoot,
  ButtonContent,
  ButtonContext,
  ButtonPending,
  useButtonContext,
  ButtonCircularProgress,
  ButtonCircularProgressFill,
  ButtonCircularProgressTrack,
  ButtonCircularProgressContext,
  useButtonCircularProgressContext,
  ButtonCircularProgressFillRotation,
} from "../button/button.parts.jsx";
import type { IComponent, IUseContext } from "../types.js";

// Context
// -------

/**
 * {@link ButtonContext}
 */
export type ToggleButtonContext = ButtonContext;

/**
 * {@link ButtonContext}
 */
export const ToggleButtonContext: React.Context<ToggleButtonContext | null> = ButtonContext;

/**
 * {@link useButtonContext}
 */
export const useToggleButtonContext: IUseContext<ToggleButtonContext> = useButtonContext;

export { ToggleButtonContext as Context, useToggleButtonContext as useContext };

// Root
// ----

/**
 * トグルボタンの配配色です。
 */
export type ToggleButtonRootColor = Color;

/**
 * トグルボタンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type ToggleButtonRootRadius = "none" | Size | "full";

/**
 * トグルボタンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ToggleButtonRootSize = Size;

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
export type ToggleButtonRootState = Toggle.State;

/**
 * {@link ToggleButtonRoot} に渡す props です。
 */
export type ToggleButtonRootProps = React.ComponentProps<typeof Toggle> & {
  /**
   * トグルボタンの配色を指定します。
   *
   * 押下状態でないときは grey で表示されます。
   *
   * @default "grey"
   */
  color?: ToggleButtonRootColor | undefined;

  /**
   * トグルボタンが無効になっている場合でも、フォーカス可能かどうかを指定します。
   */
  focusableWhenDisabled?: boolean | undefined;

  /**
   * トグルボタンに枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * トグルボタンを保留状態にするかどうかを指定します。
   *
   * `true` の場合、トグルボタンの押下が無効化され、{@link ToggleButtonPending} スロットが表示されます。`disabled` を `true` にしない限り、デフォルトでフォーカスが維持されます。
   *
   * @default false
   */
  pending?: boolean | undefined;

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
   * トグルボタンを正方形にするかどうかを指定します。
   *
   * `true` の場合、幅と高さが等しくなり、アイコンボタンなどに適した形状になります。
   *
   * @default false
   */
  squared?: boolean | undefined;

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
    radius = size,
    pending = false,
    squared = false,
    variant = "liquid",
    disabled = false,
    outlined,
    focusableWhenDisabled,
    ...toggleButtonProps
  } = props;
  const { render, ...otherToggleButtonProps } = toggleButtonProps;

  return (
    <Toggle
      {...otherToggleButtonProps}
      render={(props, state) => (
        <ButtonRoot
          {...props}
          size={size}
          color={state.pressed ? color : "grey"}
          radius={radius}
          render={typeof render === "function" ? render(props, state) : render}
          pending={pending}
          squared={squared}
          variant={state.pressed ? "solid" : variant}
          disabled={disabled}
          outlined={outlined}
          focusableWhenDisabled={focusableWhenDisabled}
        />
      )}
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
export type ToggleButtonContentState = ButtonContentState;

/**
 * {@link ToggleButtonContent} に渡す props です。
 */
export type ToggleButtonContentProps = ButtonContentProps;

/**
 * トグルボタンのコンテンツを表示するコンポーネントです。
 */
export const ToggleButtonContent: IComponent<ToggleButtonContentProps> =
  function SuiToggleButtonContent(props) {
    return <ButtonContent {...props} />;
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
export type ToggleButtonPendingState = ButtonPendingState;

/**
 * {@link ToggleButtonPending} に渡す props です。
 */
export type ToggleButtonPendingProps = ButtonPendingProps;

/**
 * トグルボタンの保留状態を表示するコンポーネントです。
 *
 * 保留中のみ有効になります。
 */
export const ToggleButtonPending: IComponent<ToggleButtonPendingProps> =
  function SuiToggleButtonPending(props) {
    return <ButtonPending {...props} />;
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

// CircularProgressContext
// -----------------------

/**
 * {@link ButtonCircularProgressContext}
 */
export type ToggleButtonCircularProgressContext = ButtonCircularProgressContext;

/**
 * {@link ButtonCircularProgressContext}
 */
export const ToggleButtonCircularProgressContext: React.Context<ToggleButtonCircularProgressContext | null> =
  ButtonCircularProgressContext;

/**
 * {@link useButtonCircularProgressContext}
 */
export const useToggleButtonCircularProgressContext: IUseContext<ToggleButtonCircularProgressContext> =
  useButtonCircularProgressContext;

export {
  ToggleButtonCircularProgressContext as CircularProgressContext,
  useToggleButtonCircularProgressContext as useCircularProgressContext,
};

// CircularProgress
// ----------------

/**
 * {@link ToggleButtonCircularProgress} が持つ状態です。
 */
export type ToggleButtonCircularProgressState = ButtonCircularProgressState;

/**
 * {@link ToggleButtonCircularProgress} に渡す props です。
 */
export type ToggleButtonCircularProgressProps = ButtonCircularProgressProps;

/**
 * 円形プログレスバーの SVG ルートコンポーネントです。
 */
export const ToggleButtonCircularProgress: IComponent<ToggleButtonCircularProgressProps> =
  function SuiToggleButtonCircularProgress(props) {
    return <ButtonCircularProgress {...props} />;
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
export type ToggleButtonCircularProgressTrackState = ButtonCircularProgressTrackState;

/**
 * {@link ToggleButtonCircularProgressTrack} に渡す props です。
 */
export type ToggleButtonCircularProgressTrackProps = ButtonCircularProgressTrackProps;

/**
 * 円形プログレスバーのトラック（背景の円弧）を描画するコンポーネントです。
 */
export const ToggleButtonCircularProgressTrack: IComponent<ToggleButtonCircularProgressTrackProps> =
  function SuiToggleButtonCircularProgressTrack(props) {
    return <ButtonCircularProgressTrack {...props} />;
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
export type ToggleButtonCircularProgressFillState = ButtonCircularProgressFillState;

/**
 * {@link ToggleButtonCircularProgressFill} に渡す props です。
 */
export type ToggleButtonCircularProgressFillProps = ButtonCircularProgressFillProps;

/**
 * 円形プログレスバーのフィル（進捗を表す円弧）を描画するコンポーネントです。
 */
export const ToggleButtonCircularProgressFill: IComponent<ToggleButtonCircularProgressFillProps> =
  function SuiToggleButtonCircularProgressFill(props) {
    return <ButtonCircularProgressFill {...props} />;
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
export type ToggleButtonCircularProgressFillRotationState = ButtonCircularProgressFillRotationState;

/**
 * {@link ToggleButtonCircularProgressFillRotation} に渡す props です。
 */
export type ToggleButtonCircularProgressFillRotationProps = ButtonCircularProgressFillRotationProps;

/**
 * 不定モード時に円形プログレスバーを回転させるアニメーションコンポーネントです。
 *
 * 不定モードの場合のみ有効になります。
 */
export const ToggleButtonCircularProgressFillRotation: IComponent<ToggleButtonCircularProgressFillRotationProps> =
  function SuiToggleButtonCircularProgressFillRotation(props) {
    return <ButtonCircularProgressFillRotation {...props} />;
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
