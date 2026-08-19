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
  createHandle,
  DrawerPortal,
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
   * {@link DrawerTrigger} に渡すプロパティーです。
   */
  readonly trigger?: Omit<DrawerTriggerProps, "handle"> | undefined;

  /**
   * {@link DrawerSwipeArea} に渡すプロパティーです。
   */
  readonly swipeArea?: DrawerSwipeAreaProps | undefined;

  /**
   * {@link DrawerVirtualKeyboardProvider} に渡すプロパティーです。
   */
  readonly virtualKeyboardProvider?: DrawerVirtualKeyboardProviderProps | undefined;

  /**
   * {@link DrawerPortal} に渡すプロパティーです。
   */
  readonly portal?: DrawerPortalProps | undefined;

  /**
   * {@link DrawerBackdrop} に渡すプロパティーです。
   */
  readonly backdrop?: DrawerBackdropProps | undefined;

  /**
   * {@link DrawerViewport} に渡すプロパティーです。
   */
  readonly viewport?: DrawerViewportProps | undefined;

  /**
   * {@link DrawerPopup} に渡すプロパティーです。
   */
  readonly popup?: DrawerPopupProps | undefined;

  /**
   * {@link DrawerContent} に渡すプロパティーです。
   */
  readonly content?: DrawerContentProps | undefined;

  /**
   * {@link DrawerTitle} に渡すプロパティーです。
   */
  readonly title?: DrawerTitleProps | undefined;

  /**
   * {@link DrawerDescription} に渡すプロパティーです。
   */
  readonly description?: DrawerDescriptionProps | undefined;

  /**
   * {@link DrawerClose}（右上の閉じるボタン）に渡すプロパティーです。
   */
  readonly headerClose?: Omit<DrawerCloseProps, "children"> | undefined;
};

/**
 * {@link Drawer} の状態です。
 */
export type DrawerState = DrawerRootState;

/**
 * {@link Drawer} コンポーネントのプロパティーです。
 *
 * {@link DrawerRoot|Root} から継承した `open` を指定すると開閉状態を制御でき、
 * `defaultOpen` は初期状態だけを指定します。
 */
export type DrawerProps = Omit<DrawerRootProps, "children" | "handle"> &
  Pick<DrawerContentProps, "children"> & {
    /**
     * ドロワーを開くトリガーに表示するコンテンツです。
     *
     * {@link DrawerTrigger|Trigger} の `render` プロパティーに渡されます。
     * 省略した場合、トリガーはレンダリングされません。
     */
    trigger?: DrawerTriggerProps["children"] | undefined;

    /**
     * ドロワーのタイトルです。
     * 省略した場合、タイトル要素はレンダリングされません。
     */
    title?: React.ReactNode | undefined;

    /**
     * ドロワーの説明文です。
     * 省略した場合、説明要素はレンダリングされません。
     */
    description?: React.ReactNode | undefined;

    /**
     * 右上の閉じるアイコンがクリックされたときに呼ばれるコールバックです。
     *
     * `slotProps.headerClose` の `onClick` が先に実行され、イベントが `preventDefault` されていない場合に呼ばれます。
     */
    onClose?: ((event: CloseClickEvent) => void) | undefined;

    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: DrawerSlotProps | undefined;
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
      trigger,
      title,
      description,
      onClose,
      children,
      slotProps: {
        trigger: triggerProps,
        swipeArea: swipeAreaProps,
        virtualKeyboardProvider: virtualKeyboardProviderProps,
        portal: portalProps,
        backdrop: backdropProps,
        viewport: viewportProps,
        popup: popupProps,
        content: contentProps,
        title: titleProps,
        description: descriptionProps,
        headerClose: headerCloseProps,
      } = {},
      ...rootProps
    } = props;

    return (
      <DrawerRoot {...rootProps} handle={handle}>
        {("trigger" in props || !!triggerProps) && (
          <DrawerTrigger children={trigger!} {...triggerProps} handle={handle} />
        )}
        {swipeAreaProps !== undefined && <DrawerSwipeArea {...swipeAreaProps} />}
        <DrawerVirtualKeyboardProvider {...virtualKeyboardProviderProps}>
          <DrawerPortal {...portalProps}>
            <DrawerBackdrop {...backdropProps} />
            <DrawerViewport {...viewportProps}>
              <DrawerPopup {...popupProps}>
                <DrawerClose
                  children={
                    <Button variant="naked" color="grey" squared aria-label="閉じる">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </Button>
                  }
                  {...mergeProps(headerCloseProps, {
                    onClick: onClose,
                    className: "sui_drawer_close_button",
                  })}
                />
                <DrawerContent {...contentProps}>
                  {("title" in props || !!titleProps) && (
                    <DrawerTitle {...{ children: title, ...titleProps }} />
                  )}
                  {("description" in props || !!descriptionProps) && (
                    <DrawerDescription {...{ children: description, ...descriptionProps }} />
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
