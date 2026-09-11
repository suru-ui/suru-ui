import * as React from "react";

import { XIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import * as Button from "../button/button.parts.jsx";
import type { IComponent } from "../types.js";
import {
  type DrawerHandle,
  type DrawerBodyProps,
  type DrawerRootProps,
  type DrawerRootState,
  type DrawerCloseProps,
  type DrawerPopupProps,
  type DrawerTitleProps,
  type DrawerFooterProps,
  type DrawerHeaderProps,
  type DrawerPortalProps,
  type DrawerRootActions,
  type DrawerContentProps,
  type DrawerTriggerProps,
  type DrawerBackdropProps,
  type DrawerControlsProps,
  type DrawerRootSnapPoint,
  type DrawerViewportProps,
  type DrawerSwipeAreaProps,
  type DrawerDescriptionProps,
  type DrawerRootChangeEventReason,
  type DrawerRootChangeEventDetails,
  type DrawerVirtualKeyboardProviderProps,
  type DrawerRootSnapPointChangeEventReason,
  type DrawerRootSnapPointChangeEventDetails,
  DrawerBody,
  DrawerRoot,
  DrawerClose,
  DrawerPopup,
  DrawerTitle,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerContent,
  DrawerTrigger,
  DrawerBackdrop,
  DrawerControls,
  DrawerViewport,
  DrawerSwipeArea,
  DrawerDescription,
  createDrawerHandle,
  DrawerVirtualKeyboardProvider,
} from "./drawer.parts.jsx";

// Types
// -----

export type DrawerActions = DrawerRootActions;

export type DrawerChangeEventDetails = DrawerRootChangeEventDetails;

export type DrawerChangeEventReason = DrawerRootChangeEventReason;

export type DrawerSnapPoint = DrawerRootSnapPoint;

export type DrawerSnapPointChangeEventDetails = DrawerRootSnapPointChangeEventDetails;

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
   * {@link DrawerBody} に渡す props です。
   */
  readonly body?: Omit<DrawerBodyProps, "children"> | undefined;

  /**
   * {@link DrawerClose} に渡す props です。
   */
  readonly close?: Omit<DrawerCloseProps, "children"> | undefined;

  /**
   * {@link DrawerContent} に渡す props です。
   */
  readonly content?: Omit<DrawerContentProps, "children"> | undefined;

  /**
   * {@link DrawerControls} に渡す props です。
   */
  readonly controls?: Omit<DrawerControlsProps, "children"> | undefined;

  /**
   * {@link DrawerDescription} に渡す props です。
   */
  readonly description?: Omit<DrawerDescriptionProps, "children"> | undefined;

  /**
   * {@link DrawerFooter} に渡す props です。
   */
  readonly footer?: Omit<DrawerFooterProps, "children"> | undefined;

  /**
   * {@link DrawerHeader} に渡す props です。
   */
  readonly header?: Omit<DrawerHeaderProps, "children"> | undefined;

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
  children?: DrawerBodyProps["children"] | undefined;

  /**
   * コントロールコンポーネントに表示する内容です。
   *
   * ドロワーの内側から順に配置されます。
   * {@link DrawerPropsMain.showCloseIconButton|showCloseIconButton} が `true` の場合、それが一番外側に配置されます。
   */
  controls?: DrawerControlsProps["children"] | undefined;

  /**
   * ドロワーの説明文です。
   */
  description?: React.ReactNode | undefined;

  /**
   * ドロワーのフッターです。
   */
  footer?: React.ReactNode | undefined;

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
   * {@link DrawerBody} に渡す props を取得します。
   */
  getBodyProps(): DrawerBodyProps | null;

  /**
   * {@link DrawerClose} に渡す props を取得します。
   */
  getCloseProps(): DrawerCloseProps | null;

  /**
   * {@link DrawerContent} に渡す props を取得します。
   */
  getContentProps(): Omit<DrawerContentProps, "children">;

  /**
   * {@link DrawerControls} に渡す props を取得します。
   */
  getControlsProps(): DrawerControlsProps | null;

  /**
   * {@link DrawerDescription} に渡す props を取得します。
   */
  getDescriptionProps(): DrawerDescriptionProps | null;

  /**
   * {@link DrawerFooter} に渡す props を取得します。
   */
  getFooterProps(): DrawerFooterProps | null;

  /**
   * {@link DrawerHeader} に渡す props を取得します。
   */
  getHeaderProps(): Omit<DrawerHeaderProps, "children"> | null;

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
    footer,
    handle: handleProp,
    onClose,
    trigger,
    children,
    controls,
    slotProps: {
      body: bodyProps = {},
      close: closeProps = {},
      popup: popupProps = {},
      title: titleProps = {},
      footer: footerProps = {},
      header: headerProps = {},
      portal: portalProps = {},
      content: contentProps = {},
      trigger: triggerProps = {},
      backdrop: backdropProps = {},
      controls: controlsProps = {},
      viewport: viewportProps = {},
      swipeArea: swipeAreaProp,
      description: descriptionProps = {},
      virtualKeyboardProvider: virtualKeyboardProviderProp,
    } = {},
    description,
    showCloseIconButton = true,
    ...otherRootProps
  } = props;
  const handle = React.useMemo(() => handleProp ?? createDrawerHandle(), [handleProp]);

  function buildCloseProps(): DrawerCloseProps | null {
    if (!showCloseIconButton) {
      return null;
    }

    const { onClick, ...otherCloseProps } = closeProps;

    return {
      ...otherCloseProps,
      onClick(evt) {
        onClick?.(evt);
        if (evt.defaultPrevented) {
          return;
        }

        onClose?.(evt);
      },
      children: (
        <Button.Root radius="full" squared variant="naked">
          <Button.Content>
            <XIcon />
          </Button.Content>
        </Button.Root>
      ),
    };
  }

  return {
    getBodyProps() {
      if (isLikelyVisibleNode(children)) {
        return {
          ...bodyProps,
          children,
        };
      }

      return null;
    },
    getRootProps() {
      return {
        ...otherRootProps,
        handle,
      };
    },
    getCloseProps() {
      return buildCloseProps();
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
    getFooterProps() {
      if (isLikelyVisibleNode(footer)) {
        return {
          ...footerProps,
          children: footer,
        };
      }

      return null;
    },
    getHeaderProps() {
      if (
        isLikelyVisibleNode(title) ||
        isLikelyVisibleNode(description) ||
        isLikelyVisibleNode(controls) ||
        showCloseIconButton
      ) {
        return headerProps;
      }

      return null;
    },
    getPortalProps() {
      return portalProps;
    },
    getContentProps() {
      return contentProps;
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
    getControlsProps() {
      if (isLikelyVisibleNode(controls) || showCloseIconButton) {
        const iconButtonProps = buildCloseProps();

        return {
          ...controlsProps,
          children: (
            <>
              {controls}
              {iconButtonProps && <DrawerClose {...iconButtonProps} />}
            </>
          ),
        };
      }

      return null;
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
    const triggerProps = api.getTriggerProps();
    const swipeAreaProps = api.getSwipeAreaProps();
    const headerProps = api.getHeaderProps();
    const titleProps = api.getTitleProps();
    const descriptionProps = api.getDescriptionProps();
    const controlsProps = api.getControlsProps();
    const bodyProps = api.getBodyProps();
    const footerProps = api.getFooterProps();
    const virtualKeyboardProviderProps = api.getVirtualKeyboardProviderProps();

    const portal = (
      <DrawerPortal {...api.getPortalProps()}>
        <DrawerBackdrop {...api.getBackdropProps()} />
        <DrawerViewport {...api.getViewportProps()}>
          <DrawerPopup {...api.getPopupProps()}>
            <DrawerContent {...api.getContentProps()}>
              {headerProps && (
                <DrawerHeader {...headerProps}>
                  {titleProps && <DrawerTitle {...titleProps} />}
                  {descriptionProps && <DrawerDescription {...descriptionProps} />}
                  {controlsProps && <DrawerControls {...controlsProps} />}
                </DrawerHeader>
              )}
              {bodyProps && <DrawerBody {...bodyProps} />}
              {footerProps && <DrawerFooter {...footerProps} />}
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
  export type State = DrawerState;

  export type Props<TPayload = any> = DrawerProps<TPayload>;

  export type SlotProps<TPayload = any> = DrawerSlotProps<TPayload>;

  export type Actions = DrawerActions;

  export type ChangeEventDetails = DrawerChangeEventDetails;

  export type ChangeEventReason = DrawerChangeEventReason;

  export type SnapPoint = DrawerSnapPoint;

  export type SnapPointChangeEventDetails = DrawerSnapPointChangeEventDetails;

  export type SnapPointChangeEventReason = DrawerSnapPointChangeEventReason;
}
