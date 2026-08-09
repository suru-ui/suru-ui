import type { BaseUIEvent } from "@base-ui/react";
import * as React from "react";

interface DefaultPreventedEvent {
  readonly defaultPrevented: boolean;
}

/**
 * {@link useFocusType} に渡すプロパティーです。
 */
export type UseFocusTypeProps<
  TBlurEvent extends DefaultPreventedEvent = React.FocusEvent<HTMLElement>,
  TFocusEvent extends DefaultPreventedEvent = React.FocusEvent<HTMLElement>,
  TPointerDownEvent extends DefaultPreventedEvent = React.PointerEvent<HTMLElement>,
> = {
  /**
   * フォーカスが外れたときに呼び出すイベントハンドラーです。
   */
  onBlur?: ((event: TBlurEvent) => void) | undefined;

  /**
   * フォーカスされたときに呼び出すイベントハンドラーです。
   */
  onFocus?: ((event: TFocusEvent) => void) | undefined;

  /**
   * ポインターが押されたときに呼び出すイベントハンドラーです。
   */
  onPointerDown?: ((event: TPointerDownEvent) => void) | undefined;
};

/**
 * フォーカスのきっかけを判定するフックです。
 *
 * ポインター操作の直後にフォーカスされた場合は `"pointer"` を返し、それ以外のフォーカスでは `"keyboard"` を返します。
 *
 * @example イベント型を変更する
 * ```tsx
 * useFocusType<HTMLElement>({
 *   onBlur: handleBlur,
 *   onFocus: handleFocus,
 *   onPointerDown: handlePointerDown,
 * });
 * ```
 *
 * @example イベント型を変更する
 * ```tsx
 * useFocusType<BlurEvent, FocusEvent, PointerDownEvent>({
 *   onBlur: handleBlur,
 *   onFocus: handleFocus,
 *   onPointerDown: handlePointerDown,
 * });
 * ```
 */
function useFocusType<TElement extends Element = Element>(
  props: UseFocusTypeProps<
    BaseUIEvent<React.FocusEvent<TElement>>,
    BaseUIEvent<React.FocusEvent<TElement>>,
    BaseUIEvent<React.PointerEvent<TElement>>
  >,
): {
  focusType: "pointer" | "keyboard" | undefined;
  onBlur: (event: BaseUIEvent<React.FocusEvent<TElement>>) => void;
  onFocus: (event: BaseUIEvent<React.FocusEvent<TElement>>) => void;
  onPointerDown: (event: BaseUIEvent<React.PointerEvent<TElement>>) => void;
};

function useFocusType<
  TBlurEvent extends DefaultPreventedEvent = BaseUIEvent<React.FocusEvent<Element>>,
  TFocusEvent extends DefaultPreventedEvent = BaseUIEvent<React.FocusEvent<Element>>,
  TPointerDownEvent extends DefaultPreventedEvent = BaseUIEvent<React.PointerEvent<Element>>,
>(
  props: UseFocusTypeProps<TBlurEvent, TFocusEvent, TPointerDownEvent>,
): {
  focusType: "pointer" | "keyboard" | undefined;
  onBlur: (event: TBlurEvent) => void;
  onFocus: (event: TFocusEvent) => void;
  onPointerDown: (event: TPointerDownEvent) => void;
};

function useFocusType<
  TBlurEvent extends DefaultPreventedEvent,
  TFocusEvent extends DefaultPreventedEvent,
  TPointerDownEvent extends DefaultPreventedEvent,
>(props: UseFocusTypeProps<TBlurEvent, TFocusEvent, TPointerDownEvent>) {
  const { onBlur, onFocus, onPointerDown } = props;
  const [focusType, setFocusType] = React.useState<"pointer" | "keyboard">();
  const focusTypeRef = React.useRef<"pointer" | undefined>(undefined);

  return {
    focusType,
    onBlur: (event: TBlurEvent) => {
      onBlur?.(event);
      if (event.defaultPrevented) {
        return;
      }

      focusTypeRef.current = undefined;
      setFocusType(undefined);
    },
    onFocus: (event: TFocusEvent) => {
      onFocus?.(event);
      if (event.defaultPrevented) {
        return;
      }

      setFocusType(focusTypeRef.current ?? "keyboard");
    },
    onPointerDown: (event: TPointerDownEvent) => {
      onPointerDown?.(event);
      if (event.defaultPrevented) {
        return;
      }

      focusTypeRef.current = "pointer";
    },
  };
}

export default useFocusType;
