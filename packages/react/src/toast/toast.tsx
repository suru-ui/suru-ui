import * as React from "react";

import isLikelyVisibleNode, { type LikelyVisibleNode } from "../_is-likely-visible-node.js";
import mergeProps from "../_merge-props.js";
import toReactNode from "../_to-react-node.js";
import { type AlertRootColor } from "../alert/alert.parts.jsx";
import type { Override, IComponent } from "../types.js";
import {
  type IToastClient,
  type IToastManager,
  type ToastRootProps,
  type ToastRootState,
  type ToastCloseProps,
  type ToastTitleProps,
  type ToastActionProps,
  type ToastContentSize,
  type ToastPortalProps,
  type ToastPortalState,
  type ToastActionsProps,
  type ToastContentColor,
  type ToastContentProps,
  type ToastContentRadius,
  type ToastProviderProps,
  type ToastProviderState,
  type ToastViewportProps,
  type ToastContentVariant,
  type ToastRootToastObject,
  type ToastDescriptionProps,
  ToastRoot,
  ToastClose,
  ToastTitle,
  ToastAction,
  ToastPortal,
  ToastActions,
  ToastContent,
  ToastProvider,
  ToastViewport,
  useToastClient,
  ToastDescription,
  createToastManager,
} from "./toast.parts.jsx";

// Types
// -----

export type ToastColor = ToastContentColor;

export type ToastRadius = ToastContentRadius;

export type ToastSize = ToastContentSize;

export type ToastVariant = ToastContentVariant;

export type ToastToastObject<TData extends object = any> = ToastRootToastObject<TData>;

/**
 * {@link Toast} の各パーツに渡す props です。
 */
export type ToastSlotProps = {
  /**
   * {@link ToastAction} に渡す props です。
   */
  readonly action?: ToastActionProps | undefined;

  /**
   * {@link ToastActions} に渡す props です。
   */
  readonly actions?: Omit<ToastActionsProps, "children"> | undefined;

  /**
   * {@link ToastClose} に渡す props です。
   */
  readonly close?: Omit<ToastCloseProps, "children"> | undefined;

  /**
   * {@link ToastContent} に渡す props です。
   */
  readonly content?: Omit<ToastContentProps, "children" | keyof ToastPropsContent> | undefined;

  /**
   * {@link ToastDescription} に渡す props です。
   */
  readonly description?: Omit<ToastDescriptionProps, "children"> | undefined;

  /**
   * {@link ToastTitle} に渡す props です。
   */
  readonly title?: Omit<ToastTitleProps, "children"> | undefined;
};

/**
 * {@link Toast} が持つ状態です。
 */
export type ToastState = ToastRootState;

type ToastPropsContent = Pick<
  ToastContentProps,
  "size" | "color" | "radius" | "variant" | "outlined"
>;

/**
 * {@link Toast} に渡す props です。
 */
export type ToastProps<TData extends object = any> = Override<
  Omit<ToastRootProps<TData>, "children">,
  ToastPropsContent & {
    /**
     * 表示する通知オブジェクトです。
     */
    toast: ToastToastObject<TData>;

    /**
     * 通知のアクションです。
     */
    action?: ToastActionProps["children"] | undefined;

    /**
     * 通知を閉じるボタンです。
     */
    close?: ToastCloseProps["children"] | undefined;

    /**
     * 通知の説明文です。
     */
    description?: ToastDescriptionProps["children"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: ToastSlotProps | undefined;

    /**
     * 通知の見出しです。
     */
    title?: ToastTitleProps["children"] | undefined;
  }
>;

/**
 * {@link ToastList} の各パーツに渡す props です。
 */
export type ToastListSlotProps = {
  /**
   * {@link ToastViewport} に渡す props です。
   */
  readonly viewport?: Omit<ToastViewportProps, "children"> | undefined;
};

/**
 * {@link ToastList} が持つ状態です。
 */
export type ToastListState = ToastPortalState;

/**
 * {@link ToastList} の子要素を描画する関数です。
 */
export interface IToastListRenderer<TData extends object = any> {
  /**
   * @param toast 表示する通知オブジェクトです。
   * @param index 通知の位置です。
   */
  (toast: ToastToastObject<TData>, index: number): React.ReactNode;
}

/**
 * {@link ToastList} に渡す props です。
 */
export type ToastListProps<TData extends object = any> = Omit<ToastPortalProps, "children"> & {
  /**
   * 内容、または各通知をレンダリングする関数です。
   *
   * 関数を指定した場合は通知一覧の各通知が引数として渡されます。
   */
  children?: React.ReactNode | IToastListRenderer<TData> | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: ToastListSlotProps | undefined;
};

// API
// ---

/**
 * {@link Toast} を構成する各パーツの props を作成するための API です。
 */
export interface ToastAPI {
  /**
   * {@link ToastAction} に渡す props を取得します。
   */
  getActionProps(): ToastActionProps | null;

  /**
   * {@link ToastActions} に渡す props を取得します。
   */
  getActionsProps(): Omit<ToastActionsProps, "children"> | null;

  /**
   * {@link ToastClose} に渡す props を取得します。
   */
  getCloseProps(): ToastCloseProps | null;

  /**
   * {@link ToastContent} に渡す props を取得します。
   */
  getContentProps(): Omit<ToastContentProps, "children">;

  /**
   * {@link ToastDescription} に渡す props を取得します。
   */
  getDescriptionProps(): ToastDescriptionProps | null;

  /**
   * {@link ToastRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<ToastRootProps, "children">;

  /**
   * {@link ToastTitle} に渡す props を取得します。
   */
  getTitleProps(): ToastTitleProps | null;
}

interface IUseToastAPI {
  /**
   * {@link ToastAPI} を作成します。
   *
   * @param props {@link Toast} の props です。
   * @returns トーストの API です
   */
  <TData extends object = any>(props: ToastProps<TData>): ToastAPI;
}

/**
 * {@link ToastAPI} を作成するフックです。
 */
export const useToastAPI: IUseToastAPI = function useSuiToastAPI(props) {
  const {
    size,
    close = "閉じる",
    color,
    title,
    toast,
    action,
    radius,
    variant,
    outlined,
    slotProps: {
      close: closeProps = {},
      title: titleProps = {},
      action: actionProps = {},
      actions: actionsProps = {},
      content: contentProps = {},
      description: descriptionProps = {},
    } = {},
    description,
    ...otherRootProps
  } = props;

  return {
    getRootProps() {
      return {
        ...otherRootProps,
        toast,
      };
    },
    getCloseProps() {
      if (isLikelyVisibleNode(close)) {
        return {
          ...closeProps,
          size: closeProps.size ?? size,
          children: close,
        };
      }

      return null;
    },
    getTitleProps() {
      if (isLikelyVisibleNode(toast.title)) {
        return {
          ...titleProps,
          children: toast.title,
        };
      }
      if (isLikelyVisibleNode(title)) {
        return {
          ...titleProps,
          children: title,
        };
      }

      return null;
    },
    getActionProps() {
      if (isLikelyVisibleNode(toast.actionProps?.children)) {
        return mergeProps([
          actionProps,
          toast.actionProps,
          {
            size: actionProps.size ?? size,
          },
        ]);
      }
      if (isLikelyVisibleNode(action)) {
        return {
          ...actionProps,
          size: actionProps.size ?? size,
          children: action,
        };
      }

      return null;
    },
    getActionsProps() {
      if (this.getActionProps() || this.getCloseProps()) {
        return actionsProps;
      }

      return null;
    },
    getContentProps() {
      const toastContentProps: Required<ToastPropsContent> = {
        size,
        color: color ?? toAlertColor(toast.type),
        radius,
        variant,
        outlined,
      };

      return {
        ...contentProps,
        ...toastContentProps,
      };
    },
    getDescriptionProps() {
      if (isLikelyVisibleNode(toast.description)) {
        return {
          ...descriptionProps,
          children: toast.description,
        };
      }
      if (isLikelyVisibleNode(description)) {
        return {
          ...descriptionProps,
          children: description,
        };
      }

      return null;
    },
  };
};

export { type ToastAPI as API, useToastAPI as useAPI };

/**
 * {@link ToastList} を構成する各パーツの props を作成するための API です。
 */
export interface ToastListAPI {
  /**
   * {@link ToastPortal} に渡す props を取得します。
   */
  getPortalProps(): Omit<ToastPortalProps, "children">;

  /**
   * {@link ToastViewport} に渡す props を取得します。
   */
  getViewportProps(): Omit<ToastViewportProps, "children"> & {
    children: LikelyVisibleNode;
  };
}

interface IUseToastListAPI {
  /**
   * {@link ToastListAPI} を作成します。
   *
   * @param props {@link ToastList} の props です。
   * @returns トースト一覧の API です
   */
  <TData extends object = any>(props: ToastListProps<TData>): ToastListAPI;
}

/**
 * {@link ToastListAPI} を作成するフックです。
 */
export const useToastListAPI: IUseToastListAPI = function useSuiToastListAPI(props) {
  const { children, slotProps: { viewport: viewportProps = {} } = {}, ...otherPortalProps } = props;
  const { toasts } = useToastClient();

  return {
    getPortalProps() {
      return otherPortalProps;
    },
    getViewportProps() {
      return {
        ...viewportProps,
        children:
          typeof children === "function"
            ? toasts.map(children)
            : (toReactNode(children) ?? toasts.map((t) => <Toast key={t.id} toast={t} />)),
      };
    },
  };
};

export { type ToastListAPI as ListAPI, useToastListAPI as useListAPI };

// Component
// ---------

interface IToastList extends IComponent<ToastListProps> {
  /**
   * @template TData 通知に含める追加データの型です。
   */
  <TData extends object = any>(props: ToastListProps<TData>): IComponent.Return;
}

/**
 * 通知一覧を描画するコンポーネントです。
 */
const ToastList: IToastList = function SuiToastList(props: ToastListProps) {
  const api = useToastListAPI(props);

  return (
    <ToastPortal {...api.getPortalProps()}>
      <ToastViewport {...api.getViewportProps()} />
    </ToastPortal>
  );
};

interface IToast extends IComponent<ToastProps> {
  /**
   * @template TData 通知に含める追加データの型です。
   */
  <TData extends object = any>(props: ToastProps<TData>): IComponent.Return;

  readonly List: typeof ToastList;

  readonly Provider: typeof ToastProvider;

  readonly createManager: <TData extends object = any>() => IToastManager<TData>;

  readonly useClient: <TData extends object = any>() => IToastClient<TData>;
}

/**
 * 個別の通知を表示するコンポーネントです。
 */
export const Toast: IToast = /*#__PURE__*/ Object.assign(
  function SuiToast(props: ToastProps) {
    const api = useToastAPI(props);
    const titleProps = api.getTitleProps();
    const descriptionProps = api.getDescriptionProps();
    const actionsProps = api.getActionsProps();
    const actionProps = api.getActionProps();
    const closeProps = api.getCloseProps();

    return (
      <ToastRoot {...api.getRootProps()}>
        <ToastContent {...api.getContentProps()}>
          {titleProps && <ToastTitle {...titleProps} />}
          {descriptionProps && <ToastDescription {...descriptionProps} />}
          {actionsProps && (
            <ToastActions {...actionsProps}>
              {actionProps && <ToastAction {...actionProps} />}
              {closeProps && <ToastClose {...closeProps} />}
            </ToastActions>
          )}
        </ToastContent>
      </ToastRoot>
    );
  },
  {
    List: ToastList,
    Provider: ToastProvider,
    useClient: useToastClient,
    createManager: createToastManager,
  },
);

export namespace Toast {
  export type State = ToastState;

  export type Props<TData extends object = any> = ToastProps<TData>;

  export type SlotProps = ToastSlotProps;

  export type API = ToastAPI;

  export type Color = ToastColor;

  export type Radius = ToastRadius;

  export type Size = ToastSize;

  export type ToastObject<TData extends object = any> = ToastToastObject<TData>;

  export type Variant = ToastVariant;

  export namespace List {
    export type State = ToastListState;

    export type Props<TData extends object = any> = ToastListProps<TData>;

    export type SlotProps = ToastListSlotProps;

    export interface IRenderer<TData extends object = any> extends IToastListRenderer<TData> {}
  }

  export namespace Provider {
    export type State = ToastProviderState;

    export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

    export namespace Props {
      export type Render = ToastProviderProps.Render;

      export type SuruUI = ToastProviderProps.SuruUI;

      export type BaseUI = ToastProviderProps.BaseUI;

      export type HTML = ToastProviderProps.HTML;
    }
  }
}

/**
 * 通知の種類をアラートの配色に変換します。
 *
 * @param type 通知の種類です。
 * @returns アラートの配色です
 */
function toAlertColor(type: string | undefined): AlertRootColor {
  switch (type?.toLowerCase()) {
    // 成功
    case "ok":
    case "done":
    case "okay":
    case "pass":
    case "passed":
    case "success":
    case "complete":
    case "completed":
    case "successful":
      return "green";

    // 警告
    case "warn":
    case "caution":
    case "warning":
    case "attention":
      return "yellow";

    // エラー・重大な問題
    case "err":
    case "crit":
    case "fail":
    case "alert":
    case "error":
    case "fatal":
    case "danger":
    case "failed":
    case "severe":
    case "failure":
    case "critical":
    case "dangerous":
    case "emergency":
      return "red";

    // 情報
    case "info":
    case "notice":
    case "message":
    case "information":
    case "informational":
      return "blue";

    default:
      return "grey";
  }
}
