import * as React from "react";

import { XIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import * as Button from "../button/button.parts.js";
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
} from "./drawer.parts.js";

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

namespace DrawerProps {
  export type Drawer<TPayload = any> = {
    /**
     * ドロワーの本文です。
     */
    children?: DrawerBodyProps["children"] | undefined;

    /**
     * コントロールコンポーネントに表示する内容です。
     *
     * ドロワーの内側から順に配置されます。
     * {@link DrawerProps.Drawer.showCloseIconButton|showCloseIconButton} が `true` の場合、それが一番外側に配置されます。
     *
     * {@link DrawerProps.Drawer.controls|controls} か {@link DrawerProps.Drawer.showCloseIconButton|showCloseIconButton} を指定しない限り描画されません。
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
     *
     * {@link DrawerProps.Drawer.slotProps|slotProps.trigger} だけを指定しても描画されません。
     */
    trigger?: DrawerTriggerProps<TPayload>["children"] | undefined;
  };

  export type Root<TPayload = any> = Omit<DrawerRootProps<TPayload>, "children" | keyof Drawer>;
}

/**
 * {@link Drawer} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DrawerProps<TPayload = any> = DrawerProps.Drawer<TPayload> & DrawerProps.Root<TPayload>;

// API
// ---

/**
 * {@link Drawer} を構成する各パーツの props などを作成するための API です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export class DrawerAPI<TPayload = any> {
  private readonly drawerProps: Required<
    Omit<DrawerProps.Drawer<TPayload>, "slotProps" | "handle">
  >;

  private readonly slotProps: DrawerSlotProps<TPayload>;

  private readonly rootProps: Required<DrawerProps.Root<TPayload>>;

  private readonly handle: DrawerHandle<TPayload>;

  /**
   * @param props {@link Drawer} の props です。
   * @param handle トリガーとドロワーを関連付けるためのハンドルです。
   * @internal
   */
  public constructor(
    props: DrawerProps<TPayload>,
    handle: DrawerHandle<TPayload> = createDrawerHandle<TPayload>(),
  ) {
    const {
      title,
      footer,
      handle: handleProp,
      onClose,
      trigger,
      children,
      controls,
      slotProps = {},
      description,
      showCloseIconButton = true,
      ...otherProps
    } = props;
    const {
      open,
      modal,
      snapPoint,
      triggerId,
      actionsRef,
      snapPoints,
      defaultOpen,
      onOpenChange,
      swipeDirection,
      defaultSnapPoint,
      defaultTriggerId,
      onSnapPointChange,
      onOpenChangeComplete,
      snapToSequentialPoints,
      disablePointerDismissal,
    } = otherProps;
    this.drawerProps = {
      title,
      footer,
      onClose,
      trigger,
      children,
      controls,
      description,
      showCloseIconButton,
    };
    this.slotProps = slotProps;
    this.rootProps = {
      open,
      modal,
      snapPoint,
      triggerId,
      actionsRef,
      snapPoints,
      defaultOpen,
      onOpenChange,
      swipeDirection,
      defaultSnapPoint,
      defaultTriggerId,
      onSnapPointChange,
      onOpenChangeComplete,
      snapToSequentialPoints,
      disablePointerDismissal,
    };
    this.handle = handleProp ?? handle;
  }

  /**
   * 閉じるアイコンボタンに渡す props を返します。
   *
   * それを表示しないときは `null` を返します。
   */
  private getCloseIconButtonProps(): DrawerCloseProps | null {
    const { onClose, showCloseIconButton } = this.drawerProps;

    if (!showCloseIconButton) {
      return null;
    }

    const { close: props = {} } = this.slotProps;
    const { onClick, ...otherProps } = props;

    return {
      ...otherProps,
      onClick(evt) {
        onClick?.(evt);
        if (evt.defaultPrevented) {
          return;
        }

        onClose?.(evt);
      },
      children: (
        <Button.Root radius="full" squared variant="naked" aria-label="閉じる">
          <Button.Content>
            <XIcon />
          </Button.Content>
        </Button.Root>
      ),
    };
  }

  /**
   * {@link DrawerBackdrop} に渡す props を取得します。
   */
  public getBackdropProps(): DrawerBackdropProps {
    const { backdrop: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link DrawerBody} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getBodyProps(): DrawerBodyProps | null {
    const { body: props = {} } = this.slotProps;
    const { children } = this.drawerProps;

    if (isLikelyVisibleNode(children)) {
      return {
        ...props,
        children,
      };
    }

    return null;
  }

  /**
   * {@link DrawerClose} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getCloseProps(): DrawerCloseProps | null {
    return this.getCloseIconButtonProps();
  }

  /**
   * {@link DrawerContent} に渡す props を取得します。
   */
  public getContentProps(): Omit<DrawerContentProps, "children"> {
    const { content: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link DrawerControls} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getControlsProps(): DrawerControlsProps | null {
    const { controls: props = {} } = this.slotProps;
    const { controls } = this.drawerProps;
    const closeIconButtonProps = this.getCloseIconButtonProps();

    if (isLikelyVisibleNode(controls) || closeIconButtonProps !== null) {
      return {
        ...props,
        children: (
          <>
            {controls}
            {closeIconButtonProps && <DrawerClose {...closeIconButtonProps} />}
          </>
        ),
      };
    }

    return null;
  }

  /**
   * {@link DrawerDescription} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getDescriptionProps(): DrawerDescriptionProps | null {
    const { description: props = {} } = this.slotProps;
    const { description } = this.drawerProps;

    if (isLikelyVisibleNode(description)) {
      return {
        ...props,
        children: description,
      };
    }

    return null;
  }

  /**
   * {@link DrawerFooter} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getFooterProps(): DrawerFooterProps | null {
    const { footer: props = {} } = this.slotProps;
    const { footer } = this.drawerProps;

    if (isLikelyVisibleNode(footer)) {
      return {
        ...props,
        children: footer,
      };
    }

    return null;
  }

  /**
   * {@link DrawerHeader} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getHeaderProps(): Omit<DrawerHeaderProps, "children"> | null {
    const { header: props } = this.slotProps;
    const { title, controls, description, showCloseIconButton } = this.drawerProps;

    if (
      props !== undefined ||
      isLikelyVisibleNode(title) ||
      isLikelyVisibleNode(description) ||
      isLikelyVisibleNode(controls) ||
      showCloseIconButton
    ) {
      return props ?? {};
    }

    return null;
  }

  /**
   * {@link DrawerPopup} に渡す props を取得します。
   */
  public getPopupProps(): Omit<DrawerPopupProps, "children"> {
    const { popup: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link DrawerPortal} に渡す props を取得します。
   */
  public getPortalProps(): Omit<DrawerPortalProps, "children"> {
    const { portal: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link DrawerRoot} に渡す props を取得します。
   */
  public getRootProps(): Required<Omit<DrawerRootProps<TPayload>, "children">> {
    return {
      ...this.rootProps,
      handle: this.handle,
    };
  }

  /**
   * {@link DrawerSwipeArea} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getSwipeAreaProps(): DrawerSwipeAreaProps | null {
    const { swipeArea: props } = this.slotProps;

    return props ?? null;
  }

  /**
   * {@link DrawerTitle} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getTitleProps(): DrawerTitleProps | null {
    const { title: props = {} } = this.slotProps;
    const { title } = this.drawerProps;

    if (isLikelyVisibleNode(title)) {
      return {
        ...props,
        children: title,
      };
    }

    return null;
  }

  /**
   * {@link DrawerTrigger} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getTriggerProps(): DrawerTriggerProps<TPayload> | null {
    const { trigger: props = {} } = this.slotProps;
    const { trigger } = this.drawerProps;

    if (trigger) {
      return {
        ...props,
        handle: this.handle,
        children: trigger,
      };
    }

    return null;
  }

  /**
   * {@link DrawerViewport} に渡す props を取得します。
   */
  public getViewportProps(): Omit<DrawerViewportProps, "children"> {
    const { viewport: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link DrawerVirtualKeyboardProvider} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getVirtualKeyboardProviderProps(): Omit<
    DrawerVirtualKeyboardProviderProps,
    "children"
  > | null {
    const { virtualKeyboardProvider: props } = this.slotProps;

    return props ?? null;
  }
}

interface IUseDrawerAPI {
  /**
   * {@link DrawerAPI} を作成します。
   *
   * @template TPayload トリガーが送信するデータの型です。
   * @param props {@link Drawer} の props です。
   * @returns ドロワーの API です。
   */
  <TPayload = any>(props: DrawerProps<TPayload>): DrawerAPI<TPayload>;
}

/**
 * {@link DrawerAPI} を作成するフックです。
 */
export const useDrawerAPI: IUseDrawerAPI = function useSuiDrawerAPI<TPayload>(
  props: DrawerProps<TPayload>,
) {
  const handle = React.useMemo(
    () => props.handle ?? createDrawerHandle<TPayload>(),
    [props.handle],
  );

  return new DrawerAPI(props, handle);
};

export { DrawerAPI as API, useDrawerAPI as useAPI };

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
 *
 * 構成を細かく制御する場合は、{@link DrawerRoot|Root} を直接組み立てます。
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
