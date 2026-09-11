import { Toggle } from "@base-ui/react/toggle";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.jsx";
import type { Override, IComponent, IUseContext } from "../types.js";

// Context
// -------

export type ToggleButtonContext = Button.Context;

export const ToggleButtonContext: React.Context<ToggleButtonContext | null> = Button.Context;

export const useToggleButtonContext: IUseContext<ToggleButtonContext> = Button.useContext;

export { ToggleButtonContext as Context, useToggleButtonContext as useContext };

// CircularProgressContext
// -----------------------

export type ToggleButtonCircularProgressContext = Button.CircularProgressContext;

export const ToggleButtonCircularProgressContext: React.Context<ToggleButtonCircularProgressContext | null> =
  Button.CircularProgressContext;

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
  export type State = ToggleButtonRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ToggleButtonRootProps.BaseUI;

    export type HTML = ToggleButtonRootProps.HTML;

    export type Render = ToggleButtonRootProps.Render;

    export type SuruUI = ToggleButtonRootProps.SuruUI;
  }

  export type ChangeEventDetails = ToggleButtonRootChangeEventDetails;

  export type ChangeEventReason = ToggleButtonRootChangeEventReason;

  export type Color = ToggleButtonRootColor;

  export type Radius = ToggleButtonRootRadius;

  export type Size = ToggleButtonRootSize;

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
  export type State = ToggleButtonContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ToggleButtonContentProps.BaseUI;

    export type HTML = ToggleButtonContentProps.HTML;

    export type Render = ToggleButtonContentProps.Render;

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
  export type State = ToggleButtonPendingState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ToggleButtonPendingProps.BaseUI;

    export type HTML = ToggleButtonPendingProps.HTML;

    export type Render = ToggleButtonPendingProps.Render;

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
  export type State = ToggleButtonCircularProgressState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ToggleButtonCircularProgressProps.BaseUI;

    export type HTML = ToggleButtonCircularProgressProps.HTML;

    export type Render = ToggleButtonCircularProgressProps.Render;

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
  export type State = ToggleButtonCircularProgressTrackState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ToggleButtonCircularProgressTrackProps.BaseUI;

    export type HTML = ToggleButtonCircularProgressTrackProps.HTML;

    export type Render = ToggleButtonCircularProgressTrackProps.Render;

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
  export type State = ToggleButtonCircularProgressFillState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ToggleButtonCircularProgressFillProps.BaseUI;

    export type HTML = ToggleButtonCircularProgressFillProps.HTML;

    export type Render = ToggleButtonCircularProgressFillProps.Render;

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
  export type State = ToggleButtonCircularProgressFillRotationState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ToggleButtonCircularProgressFillRotationProps.BaseUI;

    export type HTML = ToggleButtonCircularProgressFillRotationProps.HTML;

    export type Render = ToggleButtonCircularProgressFillRotationProps.Render;

    export type SuruUI = ToggleButtonCircularProgressFillRotationProps.SuruUI;
  }
}
