import type { IComponent } from "../types.js";
import {
  type PopoverRootProps,
  type PopoverRootState,
  type PopoverArrowProps,
  type PopoverPopupProps,
  type PopoverPortalProps,
  type PopoverTriggerProps,
  type PopoverBackdropProps,
  type PopoverPositionerProps,
  PopoverRoot,
  PopoverArrow,
  PopoverPopup,
  createHandle,
  PopoverPortal,
  PopoverTrigger,
  PopoverBackdrop,
  PopoverPositioner,
} from "./popover.parts.jsx";
/**
 * {@link Popover} の各パーツに渡すプロパティーです。
 */
export type PopoverSlotProps = {
  /**
   * {@link PopoverArrow} に渡すプロパティーです。
   */
  readonly arrow?: PopoverArrowProps | undefined;

  /**
   * {@link PopoverBackdrop} に渡すプロパティーです。
   */
  readonly backdrop?: PopoverBackdropProps | undefined;

  /**
   * {@link PopoverPopup} に渡すプロパティーです。
   */
  readonly popup?: Omit<PopoverPopupProps, "children"> | undefined;

  /**
   * {@link PopoverPortal} に渡すプロパティーです。
   */
  readonly portal?: PopoverPortalProps | undefined;

  /**
   * {@link PopoverPositioner} に渡すプロパティーです。
   */
  readonly positioner?: PopoverPositionerProps | undefined;

  /**
   * {@link PopoverTrigger} に渡すプロパティーです。
   */
  readonly trigger?: Omit<PopoverTriggerProps, "handle"> | undefined;
};

/**
 * {@link Popover} の状態です。
 */
export type PopoverState = PopoverRootState;

/**
 * {@link Popover} コンポーネントのプロパティーです。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type PopoverProps<TPayload = unknown> = Omit<
  PopoverRootProps<TPayload>,
  "children" | "handle"
> & {
  /**
   * ポップアップに表示する内容です。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: PopoverSlotProps | undefined;

  /**
   * ポップオーバーを開く対象です。
   *
   * {@link PopoverTrigger|Trigger} の子要素として直接渡され、`render` に設定されます。
   * `trigger` 未指定で `slotProps.trigger` のみ指定した場合は、トリガーは描画されません。
   */
  trigger?: PopoverTriggerProps["children"] | undefined;
};

/**
 * {@link Popover} の各パーツに渡すプロパティーです。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type PopoverPartsProps<TPayload = unknown> = {
  /**
   * {@link PopoverBackdrop} に渡すプロパティーです。
   */
  readonly backdrop: PopoverBackdropProps | undefined;

  /**
   * {@link PopoverPopup} に渡すプロパティーです。
   *
   * `slotProps.arrow` を指定すると、`children` の先頭に {@link PopoverArrow} が設定されます。
   */
  readonly popup: PopoverPopupProps;

  /**
   * {@link PopoverPortal} に渡すプロパティーです。
   */
  readonly portal: PopoverPortalProps | undefined;

  /**
   * {@link PopoverPositioner} に渡すプロパティーです。
   */
  readonly positioner: PopoverPositionerProps;

  /**
   * {@link PopoverRoot} に渡すプロパティーです。
   */
  readonly root: PopoverRootProps<TPayload>;

  /**
   * {@link PopoverTrigger} に渡すプロパティーです。
   *
   * トリガーを表示しないときは null になります。
   */
  readonly trigger: Omit<PopoverTriggerProps, "handle"> | null;
};

/**
 * {@link Popover} の各パーツに渡すプロパティーを作るフックです。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export function usePopover<TPayload>(props: PopoverProps<TPayload>): PopoverPartsProps<TPayload> {
  const {
    trigger,
    children,
    slotProps: {
      arrow: arrowProps,
      backdrop: backdropProps,
      popup: popupProps,
      portal: portalProps,
      positioner: positionerProps,
      trigger: triggerProps,
    } = {},
    ...rootProps
  } = props;
  const {
    side = "bottom",
    align = "start",
    sideOffset = 8,
    ...otherPositionerProps
  } = positionerProps ?? {};

  return {
    root: rootProps as PopoverRootProps<TPayload>,
    trigger:
      !!trigger || !!triggerProps
        ? {
            children: trigger!,
            ...triggerProps,
          }
        : null,
    portal: portalProps,
    backdrop: backdropProps,
    positioner: {
      ...otherPositionerProps,
      side,
      align,
      sideOffset,
    },
    popup: {
      ...popupProps,
      children: (
        <>
          {arrowProps && <PopoverArrow {...arrowProps} />}
          {children}
        </>
      ),
    },
  };
}

interface PopoverComponentType extends IComponent<PopoverProps> {
  /**
   * ポップオーバーを制御するハンドルを新しく作成します。
   *
   * 作成したハンドルは {@link PopoverRoot|Root} と {@link PopoverTrigger|Trigger} の `handle` プロパティーに渡します。
   */
  readonly createHandle: typeof createHandle;
}

/**
 * トリガーとポップアップを組み立てたポップオーバーです。
 *
 * タイトルや説明、閉じるボタンなどの構成を細かく制御する場合は、{@link PopoverRoot|Root} を直接組み立てます。
 */
export const Popover: PopoverComponentType = /*#__PURE__*/ Object.assign(
  function SuiPopover(props: PopoverProps) {
    const partsProps = usePopover(props);

    return (
      <PopoverRoot {...partsProps.root}>
        {partsProps.trigger && <PopoverTrigger {...partsProps.trigger} />}
        <PopoverPortal {...partsProps.portal}>
          <PopoverBackdrop {...partsProps.backdrop} />
          <PopoverPositioner {...partsProps.positioner}>
            <PopoverPopup {...partsProps.popup} />
          </PopoverPositioner>
        </PopoverPortal>
      </PopoverRoot>
    );
  },
  { createHandle },
);

/**
 * {@link Popover} の状態やプロパティーをまとめた型名前空間です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export namespace Popover {
  /**
   * {@link PopoverState} です。
   */
  export type State = PopoverState;

  /**
   * {@link PopoverProps} です。
   *
   * @template TPayload トリガーから受け取るデータの型です。
   */
  export type Props<TPayload = unknown> = PopoverProps<TPayload>;

  /**
   * {@link PopoverSlotProps} です。
   */
  export type SlotProps = PopoverSlotProps;
}
