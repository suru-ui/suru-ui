import * as React from "react";

import { XIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import * as Button from "../button/button.parts.jsx";
import type { IComponent } from "../types.js";
import {
  type DrawerHandle,
  type DrawerRootProps,
  type DrawerRootState,
  type DrawerCloseProps,
  type DrawerPopupProps,
  type DrawerTitleProps,
  type DrawerPortalProps,
  type DrawerRootActions,
  type DrawerContentProps,
  type DrawerTriggerProps,
  type DrawerBackdropProps,
  type DrawerRootSnapPoint,
  type DrawerViewportProps,
  type DrawerSwipeAreaProps,
  type DrawerDescriptionProps,
  type DrawerRootChangeEventReason,
  type DrawerRootChangeEventDetails,
  type DrawerVirtualKeyboardProviderProps,
  type DrawerRootSnapPointChangeEventReason,
  type DrawerRootSnapPointChangeEventDetails,
  DrawerRoot,
  DrawerClose,
  DrawerPopup,
  DrawerTitle,
  DrawerPortal,
  DrawerContent,
  DrawerTrigger,
  DrawerBackdrop,
  DrawerViewport,
  DrawerSwipeArea,
  DrawerDescription,
  createDrawerHandle,
  DrawerVirtualKeyboardProvider,
} from "./drawer.parts.jsx";

// Types
// -----

/**
 * {@link DrawerRootActions}
 */
export type DrawerActions = DrawerRootActions;

/**
 * {@link DrawerRootChangeEventDetails}
 */
export type DrawerChangeEventDetails = DrawerRootChangeEventDetails;

/**
 * {@link DrawerRootChangeEventReason}
 */
export type DrawerChangeEventReason = DrawerRootChangeEventReason;

/**
 * {@link DrawerRootSnapPoint}
 */
export type DrawerSnapPoint = DrawerRootSnapPoint;

/**
 * {@link DrawerRootSnapPointChangeEventDetails}
 */
export type DrawerSnapPointChangeEventDetails = DrawerRootSnapPointChangeEventDetails;

/**
 * {@link DrawerRootSnapPointChangeEventReason}
 */
export type DrawerSnapPointChangeEventReason = DrawerRootSnapPointChangeEventReason;

/**
 * {@link Drawer} の各パーツに渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DrawerSlotProps<TPayload = any> = {
  /**
   * {@link DrawerBackdrop} に渡す props です。
   */
  readonly backdrop?: DrawerBackdropProps | undefined;

  /**
   * {@link DrawerClose} に渡す props です。
   */
  readonly close?: Omit<DrawerCloseProps, "children"> | undefined;

  /**
   * {@link DrawerContent} に渡す props です。
   */
  readonly content?: Omit<DrawerContentProps, "children"> | undefined;

  /**
   * {@link DrawerDescription} に渡す props です。
   */
  readonly description?: Omit<DrawerDescriptionProps, "children"> | undefined;

  /**
   * {@link DrawerPopup} に渡す props です。
   */
  readonly popup?: Omit<DrawerPopupProps, "children"> | undefined;

  /**
   * {@link DrawerPortal} に渡す props です。
   */
  readonly portal?: Omit<DrawerPortalProps, "children"> | undefined;

  /**
   * {@link DrawerSwipeArea} に渡す props です。
   */
  readonly swipeArea?: DrawerSwipeAreaProps | undefined;

  /**
   * {@link DrawerTitle} に渡す props です。
   */
  readonly title?: Omit<DrawerTitleProps, "children"> | undefined;

  /**
   * {@link DrawerTrigger} に渡す props です。
   */
  readonly trigger?: Omit<DrawerTriggerProps<TPayload>, "children" | "handle"> | undefined;

  /**
   * {@link DrawerViewport} に渡す props です。
   */
  readonly viewport?: Omit<DrawerViewportProps, "children"> | undefined;

  /**
   * {@link DrawerVirtualKeyboardProvider} に渡す props です。
   */
  readonly virtualKeyboardProvider?:
    | Omit<DrawerVirtualKeyboardProviderProps, "children">
    | undefined;
};

/**
 * {@link Drawer} の状態です。
 */
export type DrawerState = DrawerRootState;

type DrawerPropsMain<TPayload = any> = {
  /**
   * ドロワーの本文です。
   */
  children?: DrawerContentProps["children"] | undefined;

  /**
   * ドロワーの説明文です。
   */
  description?: React.ReactNode | undefined;

  /**
   * トリガーとドロワーに関連付けるためのハンドルです。
   */
  handle?: DrawerHandle<TPayload> | undefined;

  /**
   * 閉じるボタンがクリックされたときに呼ばれるコールバックです。
   */
  onClose?: DrawerCloseProps["onClick"] | undefined;

  /**
   * ドロワーを閉じるアイコンボタンを表示するかどうかを指定します。
   *
   * @default true
   */
  showCloseIconButton?: boolean | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   *
   * 各パーツの props が優先されます。
   */
  slotProps?: DrawerSlotProps<TPayload> | undefined;

  /**
   * ドロワーの見出しです。
   */
  title?: React.ReactNode | undefined;

  /**
   * ドロワーを開くトリガーです。
   */
  trigger?: DrawerTriggerProps<TPayload>["children"] | undefined;
};

type DrawerPropsRoot<TPayload = any> = Omit<
  DrawerRootProps<TPayload>,
  "children" | keyof DrawerPropsMain
>;

/**
 * {@link Drawer} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DrawerProps<TPayload = any> = DrawerPropsMain<TPayload> & DrawerPropsRoot<TPayload>;

// API
// ---

/**
 * {@link Drawer} を構成する各パーツの props などを作成するための API です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export interface DrawerAPI<TPayload = any> {
  /**
   * {@link DrawerBackdrop} に渡す props を取得します。
   */
  getBackdropProps(): DrawerBackdropProps;

  /**
   * {@link DrawerClose} に渡す props を取得します。
   */
  getCloseProps(): DrawerCloseProps | null;

  /**
   * {@link DrawerContent} に渡す props を取得します。
   */
  getContentProps(): DrawerContentProps;

  /**
   * {@link DrawerDescription} に渡す props を取得します。
   */
  getDescriptionProps(): DrawerDescriptionProps | null;

  /**
   * {@link DrawerPopup} に渡す props を取得します。
   */
  getPopupProps(): Omit<DrawerPopupProps, "children">;

  /**
   * {@link DrawerPortal} に渡す props を取得します。
   */
  getPortalProps(): Omit<DrawerPortalProps, "children">;

  /**
   * {@link DrawerRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<DrawerRootProps<TPayload>, "children">;

  /**
   * {@link DrawerSwipeArea} に渡す props を取得します。
   */
  getSwipeAreaProps(): DrawerSwipeAreaProps | null;

  /**
   * {@link DrawerTitle} に渡す props を取得します。
   */
  getTitleProps(): DrawerTitleProps | null;

  /**
   * {@link DrawerTrigger} に渡す props を取得します。
   */
  getTriggerProps(): DrawerTriggerProps<TPayload> | null;

  /**
   * {@link DrawerViewport} に渡す props を取得します。
   */
  getViewportProps(): Omit<DrawerViewportProps, "children">;

  /**
   * {@link DrawerVirtualKeyboardProvider} に渡す props を取得します。
   */
  getVirtualKeyboardProviderProps(): Omit<DrawerVirtualKeyboardProviderProps, "children"> | null;
}

interface IUseDrawerAPI {
  /**
   * {@link DrawerAPI} を作成します。
   *
   * @template TPayload トリガーが送信するデータの型です。
   * @param props {@link Drawer} の props です。
   * @returns ドロワーの API です
   */
  <TPayload = any>(props: DrawerProps<TPayload>): DrawerAPI<TPayload>;
}

/**
 * {@link DrawerAPI} を作成するフックです。
 */
export const useDrawerAPI: IUseDrawerAPI = function useSuiDrawerAPI(props) {
  const {
    title,
    handle: handleProp,
    onClose,
    trigger,
    children,
    description,
    slotProps: {
      close: closeProps = {},
      popup: popupProps = {},
      title: titleProps = {},
      portal: portalProps = {},
      content: contentProps = {},
      trigger: triggerProps = {},
      backdrop: backdropProps = {},
      viewport: viewportProps = {},
      swipeArea: swipeAreaProp,
      description: descriptionProps = {},
      virtualKeyboardProvider: virtualKeyboardProviderProp,
    } = {},
    showCloseIconButton = true,
    ...otherRootProps
  } = props;
  const handle = React.useMemo(() => handleProp ?? createDrawerHandle(), [handleProp]);

  return {
    getRootProps() {
      return {
        ...otherRootProps,
        handle,
      };
    },
    getCloseProps() {
      if (!showCloseIconButton) {
        return null;
      }

      const { onClick, ...otherCloseProps } = closeProps;

      return {
        ...otherCloseProps,
        children: (
          <Button.Root radius="full" squared variant="naked">
            <Button.Content>
              <XIcon />
            </Button.Content>
          </Button.Root>
        ),
        onClick(evt) {
          onClick?.(evt);
          if (evt.defaultPrevented) {
            return;
          }

          onClose?.(evt);
        },
      };
    },
    getPopupProps() {
      return popupProps;
    },
    getTitleProps() {
      if (isLikelyVisibleNode(title)) {
        return {
          ...titleProps,
          children: title,
        };
      }

      return null;
    },
    getPortalProps() {
      return portalProps;
    },
    getContentProps() {
      return {
        ...contentProps,
        children,
      };
    },
    getTriggerProps() {
      if (trigger) {
        return {
          ...triggerProps,
          handle,
          children: trigger,
        };
      }

      return null;
    },
    getBackdropProps() {
      return backdropProps;
    },
    getViewportProps() {
      return viewportProps;
    },
    getSwipeAreaProps() {
      return swipeAreaProp ?? null;
    },
    getDescriptionProps() {
      if (isLikelyVisibleNode(description)) {
        return {
          ...descriptionProps,
          children: description,
        };
      }

      return null;
    },
    getVirtualKeyboardProviderProps() {
      return virtualKeyboardProviderProp ?? null;
    },
  };
};

export { type DrawerAPI as API, useDrawerAPI as useAPI };

// Component
// ---------

interface IDrawer extends IComponent<DrawerProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: DrawerProps<TPayload>): IComponent.Return;

  /**
   * {@link DrawerHandle} を作成する関数です。
   */
  readonly createHandle: typeof createDrawerHandle;
}

/**
 * 画面端からスライドして表示されるドロワーを表示するコンポーネントです。
 */
export const Drawer: IDrawer = /*#__PURE__*/ Object.assign(
  function SuiDrawer(props: DrawerProps) {
    const api = useDrawerAPI(props);
    const closeProps = api.getCloseProps();
    const titleProps = api.getTitleProps();
    const contentProps = api.getContentProps();
    const triggerProps = api.getTriggerProps();
    const swipeAreaProps = api.getSwipeAreaProps();
    const descriptionProps = api.getDescriptionProps();
    const virtualKeyboardProviderProps = api.getVirtualKeyboardProviderProps();
    const { children, ...otherContentProps } = contentProps;

    const portal = (
      <DrawerPortal {...api.getPortalProps()}>
        <DrawerBackdrop {...api.getBackdropProps()} />
        <DrawerViewport {...api.getViewportProps()}>
          <DrawerPopup {...api.getPopupProps()}>
            {closeProps && <DrawerClose {...closeProps} />}
            <DrawerContent {...otherContentProps}>
              {titleProps && <DrawerTitle {...titleProps} />}
              {descriptionProps && <DrawerDescription {...descriptionProps} />}
              {children}
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    );

    return (
      <DrawerRoot {...api.getRootProps()}>
        {triggerProps && <DrawerTrigger {...triggerProps} />}
        {swipeAreaProps && <DrawerSwipeArea {...swipeAreaProps} />}
        {!virtualKeyboardProviderProps ? (
          portal
        ) : (
          <DrawerVirtualKeyboardProvider {...virtualKeyboardProviderProps}>
            {portal}
          </DrawerVirtualKeyboardProvider>
        )}
      </DrawerRoot>
    );
  },
  {
    createHandle: createDrawerHandle,
  },
);

export namespace Drawer {
  /**
   * {@link DrawerState}
   */
  export type State = DrawerState;

  /**
   * {@link DrawerProps}
   */
  export type Props<TPayload = any> = DrawerProps<TPayload>;

  /**
   * {@link DrawerSlotProps}
   */
  export type SlotProps<TPayload = any> = DrawerSlotProps<TPayload>;

  /**
   * {@link DrawerActions}
   */
  export type Actions = DrawerActions;

  /**
   * {@link DrawerChangeEventDetails}
   */
  export type ChangeEventDetails = DrawerChangeEventDetails;

  /**
   * {@link DrawerChangeEventReason}
   */
  export type ChangeEventReason = DrawerChangeEventReason;

  /**
   * {@link DrawerSnapPoint}
   */
  export type SnapPoint = DrawerSnapPoint;

  /**
   * {@link DrawerSnapPointChangeEventDetails}
   */
  export type SnapPointChangeEventDetails = DrawerSnapPointChangeEventDetails;

  /**
   * {@link DrawerSnapPointChangeEventReason}
   */
  export type SnapPointChangeEventReason = DrawerSnapPointChangeEventReason;
}
