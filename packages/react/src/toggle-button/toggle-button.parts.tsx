import type { NativeButtonProps } from "@base-ui/react/internals/types";
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
export type ToggleButtonRootState = Override<Button.ButtonRootState, Toggle.State>;

export namespace ToggleButtonRootProps {
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

  export type BaseUI<TValue extends string = string> = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Toggle<TValue>>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // NativeButtonProps:
        | keyof NativeButtonProps
        // ToggleProps:
        | "pressed"
        | "defaultPressed"
        | "disabled"
        | "onPressedChange"
        | "value",
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML<TValue extends string = string> = Omit<
    React.ComponentProps<typeof Toggle<TValue>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ToggleButtonRoot} に渡す props です。
 */
export type ToggleButtonRootProps<TValue extends string = string> = ToggleButtonRootProps.Render &
  ToggleButtonRootProps.SuruUI &
  ToggleButtonRootProps.BaseUI<TValue> &
  ToggleButtonRootProps.HTML<TValue>;

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
    value,
    radius = size,
    render,
    pending = false,
    pressed,
    squared = false,
    variant = "liquid",
    disabled,
    outlined = false,
    className,
    nativeButton,
    defaultPressed,
    onPressedChange,
    focusableWhenDisabled = !disabled && pending,
    ...otherProps
  } = props;
  const baseuiProps: Required<ToggleButtonRootProps.BaseUI> = {
    value,
    pressed,
    disabled,
    nativeButton,
    defaultPressed,
    onPressedChange,
    focusableWhenDisabled,
  };

  return (
    <Toggle
      {...otherProps}
      {...baseuiProps}
      render={(htmlProps: {}, toggleState) => {
        const buttonRootProps: Required<
          Button.ButtonRootProps.SuruUI & Button.ButtonRootProps.BaseUI
        > &
          Pick<Button.ButtonRootProps.HTML, "disabled"> = {
          item: false,
          size,
          color: toggleState.pressed ? color : "grey",
          muted: undefined,
          radius,
          pending,
          squared,
          variant: toggleState.pressed ? "solid" : variant,
          disabled,
          outlined,
          nativeButton,
          focusableWhenDisabled,
        };

        return (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              buttonRootProps,
              proxyRenderProps(toggleState, {
                style,
                render,
                className,
              }),
            ])}
          />
        );
      }}
    />
  );
};

export { ToggleButtonRoot as Root };

export namespace Root {
  export type State = ToggleButtonRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToggleButtonRootProps.Render;

    export type SuruUI = ToggleButtonRootProps.SuruUI;

    export type BaseUI = ToggleButtonRootProps.BaseUI;

    export type HTML = ToggleButtonRootProps.HTML;
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
  export type Render = RenderProps<ToggleButtonContentState>;

  export type SuruUI = Button.Content.Props.SuruUI;

  export type BaseUI = Button.Content.Props.BaseUI;

  export type HTML = Button.Content.Props.HTML;
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
    export type Render = ToggleButtonContentProps.Render;

    export type SuruUI = ToggleButtonContentProps.SuruUI;

    export type BaseUI = ToggleButtonContentProps.BaseUI;

    export type HTML = ToggleButtonContentProps.HTML;
  }
}

// Pending
// -------

/**
 * {@link ToggleButtonPending} が持つ状態です。
 */
export type ToggleButtonPendingState = Button.Pending.State;

export namespace ToggleButtonPendingProps {
  export type Render = RenderProps<ToggleButtonPendingState>;

  export type SuruUI = Button.Pending.Props.SuruUI;

  export type BaseUI = Button.Pending.Props.BaseUI;

  export type HTML = Button.Pending.Props.HTML;
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
    export type Render = ToggleButtonPendingProps.Render;

    export type SuruUI = ToggleButtonPendingProps.SuruUI;

    export type BaseUI = ToggleButtonPendingProps.BaseUI;

    export type HTML = ToggleButtonPendingProps.HTML;
  }
}

// CircularProgress
// ----------------

/**
 * {@link ToggleButtonCircularProgress} が持つ状態です。
 */
export type ToggleButtonCircularProgressState = Button.CircularProgress.State;

export namespace ToggleButtonCircularProgressProps {
  export type Render = RenderProps<ToggleButtonCircularProgressState>;

  export type SuruUI = Button.CircularProgress.Props.SuruUI;

  export type BaseUI = Button.CircularProgress.Props.BaseUI;

  export type HTML = Button.CircularProgress.Props.HTML;
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
    export type Render = ToggleButtonCircularProgressProps.Render;

    export type SuruUI = ToggleButtonCircularProgressProps.SuruUI;

    export type BaseUI = ToggleButtonCircularProgressProps.BaseUI;

    export type HTML = ToggleButtonCircularProgressProps.HTML;
  }
}

// CircularProgressTrack
// ---------------------

/**
 * {@link ToggleButtonCircularProgressTrack} が持つ状態です。
 */
export type ToggleButtonCircularProgressTrackState = Button.CircularProgressTrack.State;

export namespace ToggleButtonCircularProgressTrackProps {
  export type Render = RenderProps<ToggleButtonCircularProgressTrackState>;

  export type SuruUI = Button.CircularProgressTrack.Props.SuruUI;

  export type BaseUI = Button.CircularProgressTrack.Props.BaseUI;

  export type HTML = Button.CircularProgressTrack.Props.HTML;
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
    export type Render = ToggleButtonCircularProgressTrackProps.Render;

    export type SuruUI = ToggleButtonCircularProgressTrackProps.SuruUI;

    export type BaseUI = ToggleButtonCircularProgressTrackProps.BaseUI;

    export type HTML = ToggleButtonCircularProgressTrackProps.HTML;
  }
}

// CircularProgressFill
// --------------------

/**
 * {@link ToggleButtonCircularProgressFill} が持つ状態です。
 */
export type ToggleButtonCircularProgressFillState = Button.CircularProgressFill.State;

export namespace ToggleButtonCircularProgressFillProps {
  export type Render = RenderProps<ToggleButtonCircularProgressFillState>;

  export type SuruUI = Button.CircularProgressFill.Props.SuruUI;

  export type BaseUI = Button.CircularProgressFill.Props.BaseUI;

  export type HTML = Button.CircularProgressFill.Props.HTML;
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
    export type Render = ToggleButtonCircularProgressFillProps.Render;

    export type SuruUI = ToggleButtonCircularProgressFillProps.SuruUI;

    export type BaseUI = ToggleButtonCircularProgressFillProps.BaseUI;

    export type HTML = ToggleButtonCircularProgressFillProps.HTML;
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
  export type Render = RenderProps<ToggleButtonCircularProgressFillRotationState>;

  export type SuruUI = Button.CircularProgressFillRotation.Props.SuruUI;

  export type BaseUI = Button.CircularProgressFillRotation.Props.BaseUI;

  export type HTML = Button.CircularProgressFillRotation.Props.HTML;
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
    export type Render = ToggleButtonCircularProgressFillRotationProps.Render;

    export type SuruUI = ToggleButtonCircularProgressFillRotationProps.SuruUI;

    export type BaseUI = ToggleButtonCircularProgressFillRotationProps.BaseUI;

    export type HTML = ToggleButtonCircularProgressFillRotationProps.HTML;
  }
}
