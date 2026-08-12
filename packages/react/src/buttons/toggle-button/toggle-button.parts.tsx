import { Toggle } from "@base-ui/react/toggle";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";
import * as Button from "../button/button.parts.jsx";

// Context
// -------

/**
 * {@link ToggleButtonRoot} が子パーツへ提供する状態です。
 */
export type ToggleButtonContext = Button.Context;

/**
 * トグルボタンの状態を子要素に伝播するコンテキストです。
 *
 * このコンテキストは内部で {@link Button.Context} をそのまま利用します。
 * トグルボタンは Button の Root に委譲するため、Button と同じコンテキストが利用可能です。
 */
export const ToggleButtonContext: React.Context<ToggleButtonContext | null> = Button.Context;

/**
 * {@link ToggleButtonContext} を読み取るフックです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useToggleButtonContext(optional?: false): ToggleButtonContext;
export function useToggleButtonContext(optional?: boolean): ToggleButtonContext | null;
export function useToggleButtonContext(optional?: boolean): ToggleButtonContext | null {
  const context = React.use(ToggleButtonContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "ToggleButtonContext",
      providerName: "ToggleButtonRoot",
    });
  }

  return context;
}

/**
 * {@link ToggleButtonContext} の別名です。
 */
export type Context = ToggleButtonContext;

/**
 * {@link ToggleButtonContext} の別名です。
 */
export const Context: React.Context<ToggleButtonContext | null> = ToggleButtonContext;

/**
 * {@link useToggleButtonContext} の別名です。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useContext(optional?: false): ToggleButtonContext;
export function useContext(optional?: boolean): ToggleButtonContext | null;
export function useContext(optional?: boolean): ToggleButtonContext | null {
  return useToggleButtonContext(optional);
}

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
 * トグルボタンのルート要素です。
 *
 * @example
 * ```tsx
 * <ToggleButtonParts.Root color="red" defaultPressed>
 *   <ToggleButtonParts.Content>削除</ToggleButtonParts.Content>
 * </ToggleButtonParts.Root>
 * ```
 */
export const ToggleButtonRoot: Component<ToggleButtonRootProps> = function SuiToggleButtonRoot(
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
      render={
        render ||
        ((props, state) => (
          <Button.Root
            {...props}
            size={size}
            color={state.pressed ? color : "grey"}
            radius={radius}
            pending={pending}
            squared={squared}
            variant={state.pressed ? "solid" : variant}
            disabled={disabled}
            outlined={outlined}
            focusableWhenDisabled={focusableWhenDisabled}
          />
        ))
      }
    />
  );
};

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
 * {@link ToggleButtonRoot} の別名です。
 */
export const Root: Component<Root.Props> = ToggleButtonRoot;

// Content
// -------

/**
 * {@link Content} の状態です。
 */
export type ToggleButtonContentState = Button.Content.State;

/**
 * {@link Content} に渡すプロパティーです。
 */
export type ToggleButtonContentProps = Button.Content.Props;

/**
 * トグルボタンのコンテンツを表示するラッパー要素です。
 *
 * @example
 * ```tsx
 * <ToggleButtonParts.Content>ラベル</ToggleButtonParts.Content>
 * ```
 */
export const ToggleButtonContent: Component<ToggleButtonContentProps> =
  function SuiToggleButtonContent(props) {
    return <Button.Content {...props} />;
  };

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
 * {@link ToggleButtonContent} の別名です。
 */
export const Content: Component<Content.Props> = ToggleButtonContent;

// Pending
// -------

/**
 * {@link ToggleButtonPending} の状態です。
 */
export type ToggleButtonPendingState = Button.Pending.State;

/**
 * {@link ToggleButtonPending} に渡すプロパティーです。
 */
export type ToggleButtonPendingProps = Button.Pending.Props;

/**
 * トグルボタンの保留状態（ローディング中）を表示する要素です。
 *
 * @example
 * ```tsx
 * <ToggleButtonParts.Pending overlay>
 *   読み込み中…
 * </ToggleButtonParts.Pending>
 * ```
 */
export const ToggleButtonPending: Component<ToggleButtonPendingProps> =
  function SuiToggleButtonPending(props) {
    return <Button.Pending {...props} />;
  };

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
 * {@link ToggleButtonPending} の別名です。
 */
export const Pending: Component<Pending.Props> = ToggleButtonPending;

// CircularProgressContext
// -----------------------

/**
 * {@link ToggleButtonCircularProgress} が子パーツへ提供する状態です。
 */
export type ToggleButtonCircularProgressContext = Button.CircularProgressContext;

/**
 * 円形プログレスバーの状態を子要素に伝播するコンテキストです。
 *
 * このコンテキストは内部で {@link Button.CircularProgressContext} をそのまま利用します。
 */
export const ToggleButtonCircularProgressContext = Button.CircularProgressContext;

/**
 * {@link ToggleButtonCircularProgressContext} を読み取るフックです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useToggleButtonCircularProgressContext(
  optional?: false,
): Button.CircularProgressContext;
export function useToggleButtonCircularProgressContext(
  optional?: boolean,
): Button.CircularProgressContext | null;
export function useToggleButtonCircularProgressContext(
  optional?: boolean,
): Button.CircularProgressContext | null {
  return Button.useCircularProgressContext(optional);
}

/**
 * {@link ToggleButtonCircularProgressContext} の別名です。
 */
export type CircularProgressContext = ToggleButtonCircularProgressContext;

/**
 * {@link ToggleButtonCircularProgressContext} の別名です。
 */
export const CircularProgressContext = ToggleButtonCircularProgressContext;

/**
 * {@link useToggleButtonCircularProgressContext} の別名です。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useCircularProgressContext(optional?: false): Button.CircularProgressContext;
export function useCircularProgressContext(
  optional?: boolean,
): Button.CircularProgressContext | null;
export function useCircularProgressContext(
  optional?: boolean,
): Button.CircularProgressContext | null {
  return useToggleButtonCircularProgressContext(optional);
}

// CircularProgress
// ----------------

/**
 * {@link CircularProgress} の状態です。
 */
export type ToggleButtonCircularProgressState = Button.CircularProgress.State;

/**
 * {@link CircularProgress} に渡すプロパティーです。
 */
export type ToggleButtonCircularProgressProps = Button.CircularProgress.Props;

/**
 * 円形プログレスバーの SVG ルート要素です。
 *
 * @example 不定モード
 * ```tsx
 * <ToggleButtonParts.CircularProgress indeterminate>
 *   <circle />
 * </ToggleButtonParts.CircularProgress>
 * ```
 */
export const ToggleButtonCircularProgress: Component<ToggleButtonCircularProgressProps> =
  function SuiToggleButtonCircularProgress(props) {
    return <Button.CircularProgress {...props} />;
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
 * {@link ToggleButtonCircularProgress} の別名です。
 */
export const CircularProgress: Component<CircularProgress.Props> = ToggleButtonCircularProgress;

// CircularProgressTrack
// ---------------------

/**
 * {@link CircularProgressTrack} の状態です。
 */
export type ToggleButtonCircularProgressTrackState = Button.CircularProgressTrack.State;

/**
 * {@link CircularProgressTrack} に渡すプロパティーです。
 */
export type ToggleButtonCircularProgressTrackProps = Button.CircularProgressTrack.Props;

/**
 * 円形プログレスバーのトラック（背景の円弧）を描画する要素です。
 *
 * @example
 * ```tsx
 * <ToggleButtonParts.CircularProgressTrack strokeWidth={4} />
 * ```
 */
export const ToggleButtonCircularProgressTrack: Component<ToggleButtonCircularProgressTrackProps> =
  function SuiToggleButtonCircularProgressTrack(props) {
    return <Button.CircularProgressTrack {...props} />;
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
 * {@link ToggleButtonCircularProgressTrack} の別名です。
 */
export const CircularProgressTrack: Component<CircularProgressTrack.Props> =
  ToggleButtonCircularProgressTrack;

// CircularProgressFill
// --------------------

/**
 * {@link CircularProgressFill} の状態です。
 */
export type ToggleButtonCircularProgressFillState = Button.CircularProgressFill.State;

/**
 * {@link CircularProgressFill} に渡すプロパティーです。
 */
export type ToggleButtonCircularProgressFillProps = Button.CircularProgressFill.Props;

/**
 * 円形プログレスバーのフィル（進捗を表す円弧）を描画する要素です。
 *
 * @example
 * ```tsx
 * <ToggleButtonParts.CircularProgressFill strokeWidth={4} strokeLinecap="round" />
 * ```
 */
export const ToggleButtonCircularProgressFill: Component<ToggleButtonCircularProgressFillProps> =
  function SuiToggleButtonCircularProgressFill(props) {
    return <Button.CircularProgressFill {...props} />;
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
 * {@link ToggleButtonCircularProgressFill} の別名です。
 */
export const CircularProgressFill: Component<CircularProgressFill.Props> =
  ToggleButtonCircularProgressFill;

// CircularProgressFillRotation
// ----------------------------

/**
 * {@link CircularProgressFillRotation} の状態です。
 */
export type ToggleButtonCircularProgressFillRotationState =
  Button.CircularProgressFillRotation.State;

/**
 * {@link CircularProgressFillRotation} に渡すプロパティーです。
 */
export type ToggleButtonCircularProgressFillRotationProps =
  Button.CircularProgressFillRotation.Props;

/**
 * 不定モード時に円形プログレスバーを回転させるアニメーション要素です。
 *
 * @example
 * ```tsx
 * <ToggleButtonParts.CircularProgressFillRotation dur="0.75s" />
 * ```
 */
export const ToggleButtonCircularProgressFillRotation: Component<ToggleButtonCircularProgressFillRotationProps> =
  function SuiToggleButtonCircularProgressFillRotation(props) {
    return <Button.CircularProgressFillRotation {...props} />;
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
 * {@link ToggleButtonCircularProgressFillRotation} の別名です。
 */
export const CircularProgressFillRotation: Component<CircularProgressFillRotation.Props> =
  ToggleButtonCircularProgressFillRotation;
