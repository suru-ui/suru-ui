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

export namespace ToggleButtonRootProps {
  export type BaseUI = Omit<
    Override<
      Button.ButtonRootProps,
      Override<React.ComponentProps<typeof Toggle>, RenderProps<ToggleButtonRootState>>
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<React.ComponentProps<"button">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<ToggleButtonRootState>;

  export type SuruUI = {
    /**
     * トグルボタンの配色を指定します。
     *
     * 押下状態でないときは grey で表示されます。
     *
     * @default "grey"
     */
    color?: ToggleButtonRootColor | undefined;

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
}

/**
 * {@link ToggleButtonRoot} に渡す props です。
 */
export type ToggleButtonRootProps = ToggleButtonRootProps.Render &
  ToggleButtonRootProps.SuruUI &
  ToggleButtonRootProps.BaseUI &
  ToggleButtonRootProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToggleButtonRootProps.BaseUI}
     */
    export type BaseUI = ToggleButtonRootProps.BaseUI;

    /**
     * {@link ToggleButtonRootProps.HTML}
     */
    export type HTML = ToggleButtonRootProps.HTML;

    /**
     * {@link ToggleButtonRootProps.Render}
     */
    export type Render = ToggleButtonRootProps.Render;

    /**
     * {@link ToggleButtonRootProps.SuruUI}
     */
    export type SuruUI = ToggleButtonRootProps.SuruUI;
  }

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

export namespace ToggleButtonContentProps {
  export type BaseUI = Omit<
    Button.Content.Props,
    keyof Render | keyof React.ComponentProps<"span">
  >;

  export type HTML = Omit<React.ComponentProps<"span">, keyof Render>;

  export type Render = RenderProps<ToggleButtonContentState>;

  export type SuruUI = {};
}

/**
 * {@link ToggleButtonContent} に渡す props です。
 */
export type ToggleButtonContentProps = ToggleButtonContentProps.Render &
  ToggleButtonContentProps.SuruUI &
  ToggleButtonContentProps.BaseUI &
  ToggleButtonContentProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToggleButtonContentProps.BaseUI}
     */
    export type BaseUI = ToggleButtonContentProps.BaseUI;

    /**
     * {@link ToggleButtonContentProps.HTML}
     */
    export type HTML = ToggleButtonContentProps.HTML;

    /**
     * {@link ToggleButtonContentProps.Render}
     */
    export type Render = ToggleButtonContentProps.Render;

    /**
     * {@link ToggleButtonContentProps.SuruUI}
     */
    export type SuruUI = ToggleButtonContentProps.SuruUI;
  }
}

// Pending
// -------

/**
 * {@link ToggleButtonPending} が持つ状態です。
 */
export type ToggleButtonPendingState = Button.Pending.State;

export namespace ToggleButtonPendingProps {
  export type BaseUI = Omit<
    Button.Pending.Props,
    keyof Render | keyof React.ComponentProps<"span">
  >;

  export type HTML = Omit<React.ComponentProps<"span">, keyof Render>;

  export type Render = RenderProps<ToggleButtonPendingState>;

  export type SuruUI = {};
}

/**
 * {@link ToggleButtonPending} に渡す props です。
 */
export type ToggleButtonPendingProps = ToggleButtonPendingProps.Render &
  ToggleButtonPendingProps.SuruUI &
  ToggleButtonPendingProps.BaseUI &
  ToggleButtonPendingProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToggleButtonPendingProps.BaseUI}
     */
    export type BaseUI = ToggleButtonPendingProps.BaseUI;

    /**
     * {@link ToggleButtonPendingProps.HTML}
     */
    export type HTML = ToggleButtonPendingProps.HTML;

    /**
     * {@link ToggleButtonPendingProps.Render}
     */
    export type Render = ToggleButtonPendingProps.Render;

    /**
     * {@link ToggleButtonPendingProps.SuruUI}
     */
    export type SuruUI = ToggleButtonPendingProps.SuruUI;
  }
}

// CircularProgress
// ----------------

/**
 * {@link ToggleButtonCircularProgress} が持つ状態です。
 */
export type ToggleButtonCircularProgressState = Button.CircularProgress.State;

export namespace ToggleButtonCircularProgressProps {
  export type BaseUI = Omit<
    Button.CircularProgress.Props,
    keyof Render | keyof React.ComponentProps<"svg">
  >;

  export type HTML = Omit<React.ComponentProps<"svg">, keyof Render>;

  export type Render = RenderProps<ToggleButtonCircularProgressState>;

  export type SuruUI = {};
}

/**
 * {@link ToggleButtonCircularProgress} に渡す props です。
 */
export type ToggleButtonCircularProgressProps = ToggleButtonCircularProgressProps.Render &
  ToggleButtonCircularProgressProps.SuruUI &
  ToggleButtonCircularProgressProps.BaseUI &
  ToggleButtonCircularProgressProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToggleButtonCircularProgressProps.BaseUI}
     */
    export type BaseUI = ToggleButtonCircularProgressProps.BaseUI;

    /**
     * {@link ToggleButtonCircularProgressProps.HTML}
     */
    export type HTML = ToggleButtonCircularProgressProps.HTML;

    /**
     * {@link ToggleButtonCircularProgressProps.Render}
     */
    export type Render = ToggleButtonCircularProgressProps.Render;

    /**
     * {@link ToggleButtonCircularProgressProps.SuruUI}
     */
    export type SuruUI = ToggleButtonCircularProgressProps.SuruUI;
  }
}

// CircularProgressTrack
// ---------------------

/**
 * {@link ToggleButtonCircularProgressTrack} が持つ状態です。
 */
export type ToggleButtonCircularProgressTrackState = Button.CircularProgressTrack.State;

export namespace ToggleButtonCircularProgressTrackProps {
  export type BaseUI = Omit<
    Button.CircularProgressTrack.Props,
    keyof Render | keyof React.ComponentProps<"circle">
  >;

  export type HTML = Omit<React.ComponentProps<"circle">, keyof Render>;

  export type Render = RenderProps<ToggleButtonCircularProgressTrackState>;

  export type SuruUI = {};
}

/**
 * {@link ToggleButtonCircularProgressTrack} に渡す props です。
 */
export type ToggleButtonCircularProgressTrackProps = ToggleButtonCircularProgressTrackProps.Render &
  ToggleButtonCircularProgressTrackProps.SuruUI &
  ToggleButtonCircularProgressTrackProps.BaseUI &
  ToggleButtonCircularProgressTrackProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToggleButtonCircularProgressTrackProps.BaseUI}
     */
    export type BaseUI = ToggleButtonCircularProgressTrackProps.BaseUI;

    /**
     * {@link ToggleButtonCircularProgressTrackProps.HTML}
     */
    export type HTML = ToggleButtonCircularProgressTrackProps.HTML;

    /**
     * {@link ToggleButtonCircularProgressTrackProps.Render}
     */
    export type Render = ToggleButtonCircularProgressTrackProps.Render;

    /**
     * {@link ToggleButtonCircularProgressTrackProps.SuruUI}
     */
    export type SuruUI = ToggleButtonCircularProgressTrackProps.SuruUI;
  }
}

// CircularProgressFill
// --------------------

/**
 * {@link ToggleButtonCircularProgressFill} が持つ状態です。
 */
export type ToggleButtonCircularProgressFillState = Button.CircularProgressFill.State;

export namespace ToggleButtonCircularProgressFillProps {
  export type BaseUI = Omit<
    Button.CircularProgressFill.Props,
    keyof Render | keyof React.ComponentProps<"circle">
  >;

  export type HTML = Omit<React.ComponentProps<"circle">, keyof Render>;

  export type Render = RenderProps<ToggleButtonCircularProgressFillState>;

  export type SuruUI = {};
}

/**
 * {@link ToggleButtonCircularProgressFill} に渡す props です。
 */
export type ToggleButtonCircularProgressFillProps = ToggleButtonCircularProgressFillProps.Render &
  ToggleButtonCircularProgressFillProps.SuruUI &
  ToggleButtonCircularProgressFillProps.BaseUI &
  ToggleButtonCircularProgressFillProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToggleButtonCircularProgressFillProps.BaseUI}
     */
    export type BaseUI = ToggleButtonCircularProgressFillProps.BaseUI;

    /**
     * {@link ToggleButtonCircularProgressFillProps.HTML}
     */
    export type HTML = ToggleButtonCircularProgressFillProps.HTML;

    /**
     * {@link ToggleButtonCircularProgressFillProps.Render}
     */
    export type Render = ToggleButtonCircularProgressFillProps.Render;

    /**
     * {@link ToggleButtonCircularProgressFillProps.SuruUI}
     */
    export type SuruUI = ToggleButtonCircularProgressFillProps.SuruUI;
  }
}

// CircularProgressFillRotation
// ----------------------------

/**
 * {@link ToggleButtonCircularProgressFillRotation} が持つ状態です。
 */
export type ToggleButtonCircularProgressFillRotationState =
  Button.CircularProgressFillRotation.State;

export namespace ToggleButtonCircularProgressFillRotationProps {
  export type BaseUI = Omit<
    Button.CircularProgressFillRotation.Props,
    keyof Render | keyof React.ComponentProps<"animateTransform">
  >;

  export type HTML = Omit<React.ComponentProps<"animateTransform">, keyof Render>;

  export type Render = RenderProps<ToggleButtonCircularProgressFillRotationState>;

  export type SuruUI = {};
}

/**
 * {@link ToggleButtonCircularProgressFillRotation} に渡す props です。
 */
export type ToggleButtonCircularProgressFillRotationProps =
  ToggleButtonCircularProgressFillRotationProps.Render &
    ToggleButtonCircularProgressFillRotationProps.SuruUI &
    ToggleButtonCircularProgressFillRotationProps.BaseUI &
    ToggleButtonCircularProgressFillRotationProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link ToggleButtonCircularProgressFillRotationProps.BaseUI}
     */
    export type BaseUI = ToggleButtonCircularProgressFillRotationProps.BaseUI;

    /**
     * {@link ToggleButtonCircularProgressFillRotationProps.HTML}
     */
    export type HTML = ToggleButtonCircularProgressFillRotationProps.HTML;

    /**
     * {@link ToggleButtonCircularProgressFillRotationProps.Render}
     */
    export type Render = ToggleButtonCircularProgressFillRotationProps.Render;

    /**
     * {@link ToggleButtonCircularProgressFillRotationProps.SuruUI}
     */
    export type SuruUI = ToggleButtonCircularProgressFillRotationProps.SuruUI;
  }
}
