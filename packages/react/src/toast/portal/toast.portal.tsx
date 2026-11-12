import { Toast } from "@base-ui/react/toast";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link ToastPortal} が持つ状態です。
 */
export type ToastPortalState = Toast.Portal.State;

export namespace ToastPortalProps {
  export type Render = RenderProps<ToastPortalState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Toast.Portal>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ToastPortalProps より :
      "container"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Toast.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ToastPortal} に渡す props です。
 */
export type ToastPortalProps = ToastPortalProps.Render &
  ToastPortalProps.SuruUI &
  ToastPortalProps.BaseUI &
  ToastPortalProps.HTML;

export type IToastPortal = IComponent<ToastPortalProps>;

/**
 * 通知の表示領域を DOM の別の場所へ移動する要素です。
 *
 * 既定では表示領域を `<body>` の末尾に配置します。
 */
export const ToastPortal: IToastPortal = (props) => {
  const {
    className,
    // @ts-expect-error data-scope は Base UI のコンポーネント型に含まれないため。
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Toast.Portal
      {...otherProps}
      className={cn(className, "sui_toast_portal")}
      data-scope={dataScope}
    />
  );
};

export { ToastPortal as Portal };
export namespace Portal {
  export type State = ToastPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastPortalProps.Render;

    export type SuruUI = ToastPortalProps.SuruUI;

    export type BaseUI = ToastPortalProps.BaseUI;

    export type HTML = ToastPortalProps.HTML;
  }
}
