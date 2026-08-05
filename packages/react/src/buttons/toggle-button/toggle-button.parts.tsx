import type { BaseUIEvent } from "@base-ui/react";
import { useControlled } from "@base-ui/utils/useControlled";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";
import * as Button from "../button/button.parts.jsx";
import { useToggleButtonGroupContext } from "../toggle-button-group/toggle-button-group.parts.jsx";

// Context
// -------

/**
 * {@link ToggleButtonContext} の値です。
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
 * {@link ToggleButtonContext} のエイリアスです。
 */
export type Context = ToggleButtonContext;

/**
 * {@link ToggleButtonContext} のエイリアスです。
 */
export const Context: React.Context<ToggleButtonContext | null> = ToggleButtonContext;

/**
 * {@link useToggleButtonContext} のエイリアスです。
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
 * {@link Root} の状態です。
 */
export type ToggleButtonRootState = Button.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type ToggleButtonRootProps = Omit<Button.Root.Props, "value"> & {
  /**
   * トグルボタンのアクティブ状態を制御します。
   *
   * `true` の場合、ボタンは押下状態（`aria-pressed` が `true`）になります。
   */
  active?: boolean | undefined;

  /**
   * アクティブ状態のときに適用するプロパティーです。
   *
   * アクティブ時と非アクティブ時で異なるスタイルや動作を指定したい場合に使用します。
   *
   * 指定しない場合は、通常のプロパティーがそのまま使用されます。
   */
  activeProps?: Button.Root.Props | undefined;

  /**
   * 初期状態でのアクティブ状態を指定します。
   *
   * 非制御（uncontrolled）モードで使用する場合の初期値です。
   *
   * @default false
   */
  defaultActive?: boolean | undefined;

  /**
   * {@link ToggleButtonGroup} 内で使用するときに、このボタンを識別する値です。
   *
   * グループ内の各 ToggleButton には一意の値を指定する必要があります。
   */
  value?: string | undefined;
};

/**
 * トグルボタンのルート要素です。
 *
 * Base UI の {@link Button.Root} をラップし、クリックごとにアクティブ状態を切り替えます。
 *
 * @example
 * ```tsx
 * <ToggleButtonParts.Root color="red" defaultActive>
 *   <ToggleButtonParts.Content>削除</ToggleButtonParts.Content>
 * </ToggleButtonParts.Root>
 * ```
 */
export const ToggleButtonRoot: Component<ToggleButtonRootProps> = function SuiToggleButtonRoot(
  props,
) {
  const { active: activeProp, activeProps = {}, defaultActive, value, ...buttonProps } = props;
  const group = useToggleButtonGroupContext(true);

  if (group != null) {
    buttonProps.size ??= group.size;
    buttonProps.color ??= group.color;
    buttonProps.radius ??= group.radius;
    buttonProps.variant ??= group.variant;
    buttonProps.outlined ??= group.outlined;
  } else {
    buttonProps.size ??= "md";
    buttonProps.color ??= "grey";
    buttonProps.radius ??= "rounded";
    buttonProps.variant ??= "liquid";
    buttonProps.outlined ??= false;
  }

  const isInGroup = group != null && value != null;

  const [localActive, setLocalActive] = useControlled({
    name: "ToggleButton",
    state: "active",
    default: defaultActive,
    controlled: activeProp,
  });

  const active = isInGroup ? group.selectedValues.has(value) : localActive;

  const { onClick, ...otherProps } = active ? { ...buttonProps, ...activeProps } : buttonProps;
  if (active) {
    if (buttonProps.color === "grey" && !("color" in activeProps)) {
      otherProps.color = "blue";
    }
    if (buttonProps.variant === "naked" && !("variant" in activeProps)) {
      otherProps.variant = "liquid";
    }
  }

  const handleClick = React.useCallback(
    (evt: BaseUIEvent<React.MouseEvent<HTMLButtonElement, MouseEvent>>) => {
      onClick?.(evt);
      if (evt.defaultPrevented) {
        return;
      }

      if (isInGroup) {
        group!.onSelectionChange(value!);
      } else {
        setLocalActive((prevActive) => !prevActive);
      }
    },
    [onClick, setLocalActive, isInGroup, group, value],
  );

  return <Button.Root {...otherProps} onClick={handleClick} aria-pressed={active} />;
};

export namespace Root {
  export type State = ToggleButtonRootState;
  export type Props = ToggleButtonRootProps;
}

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
export const ToggleButtonContent: Component<ToggleButtonContentProps> = Button.Content;

export namespace Content {
  export type State = ToggleButtonContentState;
  export type Props = ToggleButtonContentProps;
}

export const Content: Component<Content.Props> = ToggleButtonContent;

// Pending
// -------

/**
 * {@link Pending} の状態です。
 */
export type ToggleButtonPendingState = Button.Pending.State;

/**
 * {@link Pending} に渡すプロパティーです。
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
export const ToggleButtonPending: Component<ToggleButtonPendingProps> = Button.Pending;

export namespace Pending {
  export type State = ToggleButtonPendingState;
  export type Props = ToggleButtonPendingProps;
}

export const Pending: Component<Pending.Props> = ToggleButtonPending;

// CircularProgressContext
// -----------------------

/**
 * {@link CircularProgressContext} の値です。
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
 * {@link ToggleButtonCircularProgressContext} のエイリアスです。
 */
export type CircularProgressContext = ToggleButtonCircularProgressContext;

/**
 * {@link ToggleButtonCircularProgressContext} のエイリアスです。
 */
export const CircularProgressContext = ToggleButtonCircularProgressContext;

/**
 * {@link useToggleButtonCircularProgressContext} のエイリアスです。
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
  Button.CircularProgress;

export namespace CircularProgress {
  export type State = ToggleButtonCircularProgressState;
  export type Props = ToggleButtonCircularProgressProps;
}

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
  Button.CircularProgressTrack;

export namespace CircularProgressTrack {
  export type State = ToggleButtonCircularProgressTrackState;
  export type Props = ToggleButtonCircularProgressTrackProps;
}

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
  Button.CircularProgressFill;

export namespace CircularProgressFill {
  export type State = ToggleButtonCircularProgressFillState;
  export type Props = ToggleButtonCircularProgressFillProps;
}

export const CircularProgressFill: Component<CircularProgressFill.Props> =
  ToggleButtonCircularProgressFill;

// CircularProgressFillRotation
// ----------------------------

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
  Button.CircularProgressFillRotation;

export namespace CircularProgressFillRotation {
  export type Props = ToggleButtonCircularProgressFillRotationProps;
}

export const CircularProgressFillRotation: Component<CircularProgressFillRotation.Props> =
  ToggleButtonCircularProgressFillRotation;
