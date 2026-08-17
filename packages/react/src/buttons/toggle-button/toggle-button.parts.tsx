import { Toggle } from "@base-ui/react/toggle";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { IComponent, IUseContext } from "../../types.js";
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

// Context
// -------

/**
 * {@link ButtonContext} です。
 */
export type ToggleButtonContext = ButtonContext;

/**
 * {@link ButtonContext} です。
 */
export const ToggleButtonContext: React.Context<ToggleButtonContext | null> = ButtonContext;

/**
 * {@link useButtonContext} です。
 */
export const useToggleButtonContext: IUseContext<ToggleButtonContext> = useButtonContext;

/**
 * {@link ToggleButtonContext} です。
 */
export type Context = ToggleButtonContext;

/**
 * {@link ToggleButtonContext} です。
 */
export const Context: React.Context<ToggleButtonContext | null> = ToggleButtonContext;

/**
 * {@link useToggleButtonContext} です。
 */
export const useContext: IUseContext<Context> = useToggleButtonContext;

// Root
// ----

/**
 * {@link ToggleButtonRoot} の状態です。
 */
export type ToggleButtonRootState = Toggle.State;

/**
 * {@link ToggleButtonRoot} に渡すプロパティーです。
 */
export type ToggleButtonRootProps = React.ComponentProps<typeof Toggle> & {
  /**
   * トグルボタンの色を指定します。
   *
   * @default "grey"
   */
  color?: Color | undefined;

  /**
   * ボタンが無効になっている場合でも、フォーカス可能かどうかを指定します。
   */
  focusableWhenDisabled?: boolean | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * トグルボタンを保留状態にするかどうかを指定します。
   *
   * `true` の場合、ボタンの押下が無効化され、{@link ToggleButtonPending} スロットが表示されます。`disabled` を `true` にしない限り、デフォルトでフォーカスが維持されます。
   *
   * @default false
   */
  pending?: boolean | undefined;

  /**
   * トグルボタンの角丸を指定します。
   *
   * デフォルト値は {@link ToggleButtonRootProps.size|size} です。
   *
   * - `"none"`: 角を直角にする
   * - `"sm"`: 小さい角丸
   * - `"md"`: 標準的な角丸
   * - `"lg"`: 大きい角丸
   * - `"full"`: 完全な丸形
   */
  radius?: "none" | Size | "full" | undefined;

  /**
   * トグルボタンのサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * トグルボタンを正方形にするかどうかを指定します。
   *
   * `true` の場合、幅と高さが等しくなり、アイコンボタンなどに適した形状になります。
   */
  squared?: boolean | undefined;

  /**
   * トグルボタンのスタイルバリエーションを指定します。
   *
   * - `"naked"`: 背景のないテキストのみ
   * - `"liquid"`: 薄い塗りつぶし
   *
   * @default "liquid"
   */
  variant?: "naked" | "liquid" | undefined;
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

/**
 * {@link ToggleButtonRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link ToggleButtonRoot} の状態型です。
   */
  export type State = ToggleButtonRootState;

  /**
   * {@link ToggleButtonRoot} のプロパティー型です。
   */
  export type Props = ToggleButtonRootProps;
}

/**
 * {@link ToggleButtonRoot} です。
 */
export const Root: IComponent<Root.Props> = ToggleButtonRoot;

// Content
// -------

/**
 * {@link ToggleButtonContent} の状態です。
 */
export type ToggleButtonContentState = ButtonContentState;

/**
 * {@link ToggleButtonContent} に渡すプロパティーです。
 */
export type ToggleButtonContentProps = ButtonContentProps;

/**
 * トグルボタンのコンテンツを表示するコンポーネントです。
 */
export const ToggleButtonContent: IComponent<ToggleButtonContentProps> =
  function SuiToggleButtonContent(props) {
    return <ButtonContent {...props} />;
  };

/**
 * {@link ToggleButtonContent} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Content {
  /**
   * {@link ToggleButtonContent} の状態型です。
   */
  export type State = ToggleButtonContentState;

  /**
   * {@link ToggleButtonContent} のプロパティー型です。
   */
  export type Props = ToggleButtonContentProps;
}

/**
 * {@link ToggleButtonContent} です。
 */
export const Content: IComponent<Content.Props> = ToggleButtonContent;

// Pending
// -------

/**
 * {@link ToggleButtonPending} の状態です。
 */
export type ToggleButtonPendingState = ButtonPendingState;

/**
 * {@link ToggleButtonPending} に渡すプロパティーです。
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

/**
 * {@link ToggleButtonPending} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Pending {
  /**
   * {@link ToggleButtonPending} の状態型です。
   */
  export type State = ToggleButtonPendingState;

  /**
   * {@link ToggleButtonPending} のプロパティー型です。
   */
  export type Props = ToggleButtonPendingProps;
}

/**
 * {@link ToggleButtonPending} です。
 */
export const Pending: IComponent<Pending.Props> = ToggleButtonPending;

// CircularProgressContext
// -----------------------

/**
 * {@link ButtonCircularProgressContext} です。
 */
export type ToggleButtonCircularProgressContext = ButtonCircularProgressContext;

/**
 * {@link ButtonCircularProgressContext} です。
 */
export const ToggleButtonCircularProgressContext = ButtonCircularProgressContext;

/**
 * {@link useButtonContext} です。
 */
export const useToggleButtonCircularProgressContext: IUseContext<ToggleButtonCircularProgressContext> =
  useButtonCircularProgressContext;

/**
 * {@link ToggleButtonCircularProgressContext} です。
 */
export type CircularProgressContext = ToggleButtonCircularProgressContext;

/**
 * {@link ToggleButtonCircularProgressContext} です。
 */
export const CircularProgressContext = ToggleButtonCircularProgressContext;

/**
 * {@link useToggleButtonCircularProgressContext} です。
 */
export const useCircularProgressContext: IUseContext<CircularProgressContext> =
  useToggleButtonCircularProgressContext;

// CircularProgress
// ----------------

/**
 * {@link CircularProgress} の状態です。
 */
export type ToggleButtonCircularProgressState = ButtonCircularProgressState;

/**
 * {@link CircularProgress} に渡すプロパティーです。
 */
export type ToggleButtonCircularProgressProps = ButtonCircularProgressProps;

/**
 * 円形プログレスバーの SVG ルートコンポーネントです。
 */
export const ToggleButtonCircularProgress: IComponent<ToggleButtonCircularProgressProps> =
  function SuiToggleButtonCircularProgress(props) {
    return <ButtonCircularProgress {...props} />;
  };

export namespace CircularProgress {
  /**
   * {@link ToggleButtonCircularProgress} の状態型です。
   */
  export type State = ToggleButtonCircularProgressState;

  /**
   * {@link ToggleButtonCircularProgress} のプロパティー型です。
   */
  export type Props = ToggleButtonCircularProgressProps;
}

/**
 * {@link ToggleButtonCircularProgress} です。
 */
export const CircularProgress: IComponent<CircularProgress.Props> = ToggleButtonCircularProgress;

// CircularProgressTrack
// ---------------------

/**
 * {@link CircularProgressTrack} の状態です。
 */
export type ToggleButtonCircularProgressTrackState = ButtonCircularProgressTrackState;

/**
 * {@link CircularProgressTrack} に渡すプロパティーです。
 */
export type ToggleButtonCircularProgressTrackProps = ButtonCircularProgressTrackProps;

/**
 * 円形プログレスバーのトラック（背景の円弧）を描画するコンポーネントです。
 */
export const ToggleButtonCircularProgressTrack: IComponent<ToggleButtonCircularProgressTrackProps> =
  function SuiToggleButtonCircularProgressTrack(props) {
    return <ButtonCircularProgressTrack {...props} />;
  };

export namespace CircularProgressTrack {
  /**
   * {@link ToggleButtonCircularProgressTrack} の状態型です。
   */
  export type State = ToggleButtonCircularProgressTrackState;

  /**
   * {@link ToggleButtonCircularProgressTrack} のプロパティー型です。
   */
  export type Props = ToggleButtonCircularProgressTrackProps;
}

/**
 * {@link ToggleButtonCircularProgressTrack} です。
 */
export const CircularProgressTrack: IComponent<CircularProgressTrack.Props> =
  ToggleButtonCircularProgressTrack;

// CircularProgressFill
// --------------------

/**
 * {@link CircularProgressFill} の状態です。
 */
export type ToggleButtonCircularProgressFillState = ButtonCircularProgressFillState;

/**
 * {@link CircularProgressFill} に渡すプロパティーです。
 */
export type ToggleButtonCircularProgressFillProps = ButtonCircularProgressFillProps;

/**
 * 円形プログレスバーのフィル（進捗を表す円弧）を描画するコンポーネントです。
 */
export const ToggleButtonCircularProgressFill: IComponent<ToggleButtonCircularProgressFillProps> =
  function SuiToggleButtonCircularProgressFill(props) {
    return <ButtonCircularProgressFill {...props} />;
  };

export namespace CircularProgressFill {
  /**
   * {@link ToggleButtonCircularProgressFill} の状態型です。
   */
  export type State = ToggleButtonCircularProgressFillState;

  /**
   * {@link ToggleButtonCircularProgressFill} のプロパティー型です。
   */
  export type Props = ToggleButtonCircularProgressFillProps;
}

/**
 * {@link ToggleButtonCircularProgressFill} です。
 */
export const CircularProgressFill: IComponent<CircularProgressFill.Props> =
  ToggleButtonCircularProgressFill;

// CircularProgressFillRotation
// ----------------------------

/**
 * {@link CircularProgressFillRotation} の状態です。
 */
export type ToggleButtonCircularProgressFillRotationState = ButtonCircularProgressFillRotationState;

/**
 * {@link CircularProgressFillRotation} に渡すプロパティーです。
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

export namespace CircularProgressFillRotation {
  /**
   * {@link ToggleButtonCircularProgressFillRotation} の状態型です。
   */
  export type State = ToggleButtonCircularProgressFillRotationState;

  /**
   * {@link ToggleButtonCircularProgressFillRotation} のプロパティー型です。
   */
  export type Props = ToggleButtonCircularProgressFillRotationProps;
}

/**
 * {@link ToggleButtonCircularProgressFillRotation} です。
 */
export const CircularProgressFillRotation: IComponent<CircularProgressFillRotation.Props> =
  ToggleButtonCircularProgressFillRotation;
