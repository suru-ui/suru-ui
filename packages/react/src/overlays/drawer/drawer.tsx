import * as React from "react";

import { Button } from "../../buttons/button/index.js";
import cn from "../../cn.js";
import type { Component } from "../../types.js";
import * as DrawerParts from "./drawer.parts.jsx";

/**
 * {@link Drawer} コンポーネントのプロパティーです。
 *
 * {@link DrawerParts.Root|Root} から継承した `open` を指定すると開閉状態を制御でき、
 * `defaultOpen` は初期状態だけを指定します。
 */
export type DrawerProps = Omit<DrawerParts.Root.Props, "children" | "handle" | "swipeDirection"> & {
  /**
   * ドロワーが表示され、スワイプで閉じられる方向です。
   *
   * - `"up"`: 上端から表示する
   * - `"down"`: 下端から表示する
   * - `"left"`: 左端から表示する
   * - `"right"`: 右端から表示する
   *
   * @default "left"
   */
  swipeDirection?: DrawerParts.DrawerSwipeDirection | undefined;

  /**
   * ドロワーを開くトリガーに表示するコンテンツです。
   *
   * {@link DrawerParts.Trigger|Trigger} の `render` プロパティーに渡されます。
   * 省略した場合、トリガーはレンダリングされません。
   */
  trigger?: DrawerParts.Trigger.Props["render"] | undefined;

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
   * ドロワーの本文に表示するコンテンツです。
   */
  children?: React.ReactNode | undefined;

  /**
   * 右上の閉じるアイコンがクリックされたときに呼ばれるコールバックです。
   *
   * `slotProps.headerClose` の `onClick` が先に実行され、イベントが `preventDefault` されていない場合に呼ばれます。
   */
  onClose?: ((event: CloseClickEvent) => void) | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?: DrawerSlotProps | undefined;
};

/**
 * {@link Drawer} の各パーツに渡すプロパティーです。
 */
export type DrawerSlotProps = {
  /**
   * {@link DrawerParts.Trigger|Trigger} に渡すプロパティーです。
   */
  readonly trigger?: Omit<DrawerParts.Trigger.Props, "handle" | "children"> | undefined;

  /**
   * {@link DrawerParts.SwipeArea|SwipeArea} に渡すプロパティーです。
   */
  readonly swipeArea?: DrawerParts.SwipeArea.Props | undefined;

  /**
   * {@link DrawerParts.VirtualKeyboardProvider|VirtualKeyboardProvider} に渡すプロパティーです。
   */
  readonly virtualKeyboardProvider?: DrawerParts.VirtualKeyboardProvider.Props | undefined;

  /**
   * {@link DrawerParts.Portal|Portal} に渡すプロパティーです。
   */
  readonly portal?: DrawerParts.Portal.Props | undefined;

  /**
   * {@link DrawerParts.Backdrop|Backdrop} に渡すプロパティーです。
   */
  readonly backdrop?: DrawerParts.Backdrop.Props | undefined;

  /**
   * {@link DrawerParts.Viewport|Viewport} に渡すプロパティーです。
   */
  readonly viewport?: DrawerParts.Viewport.Props | undefined;

  /**
   * {@link DrawerParts.Popup|Popup} に渡すプロパティーです。
   */
  readonly popup?: DrawerParts.Popup.Props | undefined;

  /**
   * {@link DrawerParts.Content|Content} に渡すプロパティーです。
   */
  readonly content?: DrawerParts.Content.Props | undefined;

  /**
   * {@link DrawerParts.Title|Title} に渡すプロパティーです。
   */
  readonly title?: DrawerParts.Title.Props | undefined;

  /**
   * {@link DrawerParts.Description|Description} に渡すプロパティーです。
   */
  readonly description?: DrawerParts.Description.Props | undefined;

  /**
   * {@link DrawerParts.Close|Close}（右上の閉じるボタン）に渡すプロパティーです。
   */
  readonly headerClose?: Omit<DrawerParts.Close.Props, "children"> | undefined;
};

type CloseClickHandler = DrawerParts.Close.Props["onClick"];
type CloseClickEvent = Parameters<NonNullable<CloseClickHandler>>[0];

interface DrawerComponentType extends Component<DrawerProps> {
  /**
   * ドロワーを制御するハンドルを新しく作成します。
   *
   * 作成したハンドルは {@link DrawerParts.Root} と {@link DrawerParts.Trigger} の `handle` プロパティーに渡します。
   */
  readonly createHandle: typeof DrawerParts.createHandle;
}

function createCloseClickHandler(
  onClick: CloseClickHandler | undefined,
  callback: ((event: CloseClickEvent) => void) | undefined,
): CloseClickHandler {
  if (onClick === undefined && callback === undefined) {
    return undefined;
  }

  return (event) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      callback?.(event);
    }
  };
}

/**
 * 画面端からスライドして表示されるドロワーを表示するコンポーネントです。
 *
 * トリガー、タイトル、説明文、本文、閉じるアイコンからドロワーを組み立てます。
 * 構成を細かく制御したい場合は、{@link DrawerParts.Root|Root} を直接組み立てます。
 *
 * @example 基本
 * ```tsx
 * import { Button } from "@suru-ui/react/button";
 * import { Drawer } from "@suru-ui/react/drawer";
 *
 * <Drawer
 *   trigger={<Button>通知を見る</Button>}
 *   title="通知"
 *   description="新しい通知はありません。"
 * />
 * ```
 */
export const Drawer: DrawerComponentType = /*#__PURE__*/ Object.assign(
  function SuiDrawer(props: DrawerProps) {
    const [handle] = React.useState(DrawerParts.createHandle);
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
      <DrawerParts.Root {...rootProps} handle={handle}>
        {trigger !== undefined && (
          <DrawerParts.Trigger {...triggerProps} handle={handle} render={trigger} />
        )}
        {swipeAreaProps !== undefined && <DrawerParts.SwipeArea {...swipeAreaProps} />}
        <DrawerParts.VirtualKeyboardProvider {...virtualKeyboardProviderProps}>
          <DrawerParts.Portal {...portalProps}>
            <DrawerParts.Backdrop {...backdropProps} />
            <DrawerParts.Viewport {...viewportProps}>
              <DrawerParts.Popup {...popupProps}>
                <DrawerParts.Close
                  {...headerCloseProps}
                  className={cn("sui_drawer_close_button", headerCloseProps?.className)}
                  onClick={createCloseClickHandler(headerCloseProps?.onClick, onClose)}
                  render={
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
                />
                <DrawerParts.Content {...contentProps}>
                  {title !== undefined && (
                    <DrawerParts.Title {...titleProps}>{title}</DrawerParts.Title>
                  )}
                  {description !== undefined && (
                    <DrawerParts.Description {...descriptionProps}>
                      {description}
                    </DrawerParts.Description>
                  )}
                  {children}
                </DrawerParts.Content>
              </DrawerParts.Popup>
            </DrawerParts.Viewport>
          </DrawerParts.Portal>
        </DrawerParts.VirtualKeyboardProvider>
      </DrawerParts.Root>
    );
  },
  { createHandle: DrawerParts.createHandle },
);
