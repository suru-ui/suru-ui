import { mergeProps } from "@base-ui/react";
import * as React from "react";

import { Button } from "../../buttons/button/index.js";
import type { IComponent } from "../../types.js";
import {
  type DrawerRootProps,
  type DrawerRootState,
  type DrawerCloseProps,
  type DrawerPopupProps,
  type DrawerTitleProps,
  type DrawerPortalProps,
  type DrawerContentProps,
  type DrawerTriggerProps,
  type DrawerBackdropProps,
  type DrawerViewportProps,
  type DrawerSwipeAreaProps,
  type DrawerDescriptionProps,
  type DrawerVirtualKeyboardProviderProps,
  DrawerRoot,
  DrawerClose,
  DrawerPopup,
  DrawerTitle,
  DrawerPortal,
  createHandle,
  DrawerContent,
  DrawerTrigger,
  DrawerBackdrop,
  DrawerViewport,
  DrawerSwipeArea,
  DrawerDescription,
  DrawerVirtualKeyboardProvider,
} from "./drawer.parts.jsx";

/**
 * {@link Drawer} の各パーツに渡すプロパティーです。
 */
export type DrawerSlotProps = {
  /**
   * {@link DrawerBackdrop} に渡すプロパティーです。
   */
  readonly backdrop?: DrawerBackdropProps | undefined;

  /**
   * {@link DrawerContent} に渡すプロパティーです。
   */
  readonly content?: DrawerContentProps | undefined;

  /**
   * {@link DrawerDescription} に渡すプロパティーです。
   */
  readonly description?: DrawerDescriptionProps | undefined;

  /**
   * {@link DrawerClose}（右上の閉じるボタン）に渡すプロパティーです。
   */
  readonly headerClose?: Omit<DrawerCloseProps, "children"> | undefined;

  /**
   * {@link DrawerPopup} に渡すプロパティーです。
   */
  readonly popup?: DrawerPopupProps | undefined;

  /**
   * {@link DrawerPortal} に渡すプロパティーです。
   */
  readonly portal?: DrawerPortalProps | undefined;

  /**
   * {@link DrawerSwipeArea} に渡すプロパティーです。
   */
  readonly swipeArea?: DrawerSwipeAreaProps | undefined;

  /**
   * {@link DrawerTitle} に渡すプロパティーです。
   */
  readonly title?: DrawerTitleProps | undefined;

  /**
   * {@link DrawerTrigger} に渡すプロパティーです。
   */
  readonly trigger?: Omit<DrawerTriggerProps, "handle"> | undefined;

  /**
   * {@link DrawerViewport} に渡すプロパティーです。
   */
  readonly viewport?: DrawerViewportProps | undefined;

  /**
   * {@link DrawerVirtualKeyboardProvider} に渡すプロパティーです。
   */
  readonly virtualKeyboardProvider?: DrawerVirtualKeyboardProviderProps | undefined;
};

/**
 * {@link Drawer} の状態です。
 */
export type DrawerState = DrawerRootState;

/**
 * {@link Drawer} コンポーネントのプロパティーです。
 *
 * {@link DrawerRoot|Root} から継承した `open` を指定すると開閉状態を制御でき、`defaultOpen` は初期状態だけを指定します。
 */
export type DrawerProps = Omit<DrawerRootProps, "children" | "handle"> &
  Pick<DrawerContentProps, "children"> & {
    /**
     * ドロワーの説明文です。
     * 省略した場合、説明要素はレンダリングされません。
     */
    description?: React.ReactNode | undefined;

    /**
     * 右上の閉じるアイコンがクリックされたときに呼ばれるコールバックです。
     *
     * `slotProps.headerClose` の `onClick` が先に実行され、`preventBaseUIHandler()` が呼ばれていない場合に呼ばれます。
     */
    onClose?: ((event: CloseClickEvent) => void) | undefined;

    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: DrawerSlotProps | undefined;

    /**
     * ドロワーのタイトルです。
     * 省略した場合、タイトル要素はレンダリングされません。
     */
    title?: React.ReactNode | undefined;

    /**
     * ドロワーを開くトリガーに表示するコンテンツです。
     *
     * {@link DrawerTrigger|Trigger} の `render` プロパティーに渡されます。
     * 省略した場合、トリガーはレンダリングされません。
     */
    trigger?: DrawerTriggerProps["children"] | undefined;
  };

type CloseClickHandler = DrawerCloseProps["onClick"];
type CloseClickEvent = Parameters<NonNullable<CloseClickHandler>>[0];

interface DrawerComponentType extends IComponent<DrawerProps> {
  /**
   * ドロワーを制御するハンドルを新しく作成します。
   *
   * 作成したハンドルは {@link DrawerRoot} と {@link DrawerTrigger} の `handle` プロパティーに渡します。
   */
  readonly createHandle: typeof createHandle;
}

/**
 * 画面端からスライドして表示されるドロワーを表示するコンポーネントです。
 *
 * トリガー、タイトル、説明文、本文、閉じるアイコンからドロワーを組み立てます。
 * 構成を細かく制御したい場合は、{@link DrawerRoot|Root} を直接組み立てます。
 */
export const Drawer: DrawerComponentType = /*#__PURE__*/ Object.assign(
  function SuiDrawer(props: DrawerProps) {
    const [handle] = React.useState(createHandle);
    const {
      title,
      onClose,
      trigger,
      children,
      slotProps: {
        popup: popupProps,
        title: titleProps,
        portal: portalProps,
        content: contentProps,
        trigger: triggerProps,
        backdrop: backdropProps,
        viewport: viewportProps,
        swipeArea: swipeAreaProps,
        description: descriptionProps,
        headerClose: headerCloseProps,
        virtualKeyboardProvider: virtualKeyboardProviderProps,
      } = {},
      description,
      ...rootProps
    } = props;

    return (
      <DrawerRoot {...rootProps} handle={handle}>
        {trigger !== undefined && (
          <DrawerTrigger handle={handle} children={trigger} {...triggerProps} />
        )}
        {swipeAreaProps !== undefined && <DrawerSwipeArea {...swipeAreaProps} />}
        <DrawerVirtualKeyboardProvider {...virtualKeyboardProviderProps}>
          <DrawerPortal {...portalProps}>
            <DrawerBackdrop {...backdropProps} />
            <DrawerViewport {...viewportProps}>
              <DrawerPopup {...popupProps}>
                <DrawerClose
                  children={
                    <Button color="grey" squared variant="naked" aria-label="閉じる">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        focusable="false"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </Button>
                  }
                  {...mergeProps(
                    {
                      onClick: onClose,
                      className: "sui_drawer_close_button",
                    },
                    headerCloseProps,
                  )}
                />
                <DrawerContent {...contentProps}>
                  {("title" in props || !!titleProps) && (
                    <DrawerTitle children={title} {...titleProps} />
                  )}
                  {("description" in props || !!descriptionProps) && (
                    <DrawerDescription children={description} {...descriptionProps} />
                  )}
                  {children}
                </DrawerContent>
              </DrawerPopup>
            </DrawerViewport>
          </DrawerPortal>
        </DrawerVirtualKeyboardProvider>
      </DrawerRoot>
    );
  },
  { createHandle },
);

/**
 * {@link Drawer} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Drawer {
  /**
   * {@link DrawerState} です。
   */
  export type State = DrawerState;

  /**
   * {@link DrawerProps} です。
   */
  export type Props = DrawerProps;

  /**
   * {@link DrawerSlotProps} です。
   */
  export type SlotProps = DrawerSlotProps;
}
