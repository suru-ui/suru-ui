import * as React from "react";

import isLikelyVisibleNode, { type LikelyVisibleNode } from "../_is-likely-visible-node.js";
import toReactNode from "../_to-react-node.js";
import type { AlertRootColor } from "../alert/alert.parts.js";
import type { IComponent } from "../types.js";
import {
  type IToastClient,
  type IToastManager,
  type IToastProvider,
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
} from "./toast.parts.js";

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
  readonly content?: Omit<ToastContentProps, "children" | keyof ToastProps.Content> | undefined;

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

namespace ToastProps {
  export type Content = Pick<
    ToastContentProps,
    "size" | "color" | "radius" | "variant" | "outlined"
  >;

  export type Root<TData extends object = any> = Omit<
    ToastRootProps<TData>,
    "children" | keyof Toast | keyof Content
  >;

  export type Toast = {
    /**
     * 通知のアクションです。
     *
     * 通知オブジェクトの `actionProps` に内容がある場合はそちらを優先します。
     */
    action?: ToastActionProps["children"] | undefined;

    /**
     * 通知を閉じるボタンです。
     *
     * 既定値は `"閉じる"` です。
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
  };
}

/**
 * {@link Toast} に渡す props です。
 *
 * @template TData 通知に含める追加データの型です。
 */
export type ToastProps<TData extends object = any> = ToastProps.Toast &
  ToastProps.Root<TData> &
  ToastProps.Content;

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

namespace ToastListProps {
  export type List<TData extends object = any> = {
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

  export type Portal = Omit<ToastPortalProps, keyof List>;
}

/**
 * {@link ToastList} に渡す props です。
 *
 * @template TData 通知に含める追加データの型です。
 */
export type ToastListProps<TData extends object = any> = ToastListProps.List<TData> &
  ToastListProps.Portal;

export interface IUseToastAPI {
  /**
   * {@link ToastAPI} を作成します。
   *
   * @template TData 通知に含める追加データの型です。
   * @param props {@link Toast} の props です。
   * @returns トーストの API です
   */
  <TData extends object = any>(props: ToastProps<TData>): ToastAPI<TData>;
}

export interface IUseToastListAPI {
  /**
   * {@link ToastListAPI} を作成します。
   *
   * @template TData 通知に含める追加データの型です。
   * @param props {@link ToastList} の props です。
   * @returns トースト一覧の API です
   */
  <TData extends object = any>(props: ToastListProps<TData>): ToastListAPI<TData>;
}

// API
// ---

/**
 * {@link Toast} を構成する各パーツの props を作成するための API です。
 *
 * @template TData 通知に含める追加データの型です。
 */
export class ToastAPI<TData extends object = any> {
  private readonly toastProps: Required<Omit<ToastProps.Toast, "slotProps">>;

  private readonly slotProps: ToastSlotProps;

  private readonly rootProps: ToastProps.Root<TData>;

  private readonly contentProps: ToastProps.Content;

  /**
   * @param props {@link Toast} の props です。
   * @internal
   */
  public constructor(props: ToastProps<TData>) {
    const {
      size,
      close,
      color,
      title,
      action,
      radius,
      variant,
      outlined,
      slotProps = {},
      description,
      ...rootProps
    } = props;
    this.toastProps = { close, title, action, description };
    this.slotProps = slotProps;
    this.rootProps = rootProps;
    this.contentProps = { size, color, radius, variant, outlined };
  }

  /**
   * {@link ToastAction} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getActionProps(): ToastActionProps | null {
    const { action: toastAction } = this.toastProps;
    const { action: props = {} } = this.slotProps;
    const { toast } = this.rootProps;
    const size = props.size ?? this.contentProps.size;

    if (isLikelyVisibleNode(toast.actionProps?.children)) {
      // 通知オブジェクトの actionProps は ToastAction が内部で合成するため、ここでは重ねません。
      return {
        ...props,
        size,
      };
    }
    if (isLikelyVisibleNode(toastAction)) {
      return {
        ...props,
        size,
        children: toastAction,
      };
    }

    return null;
  }

  /**
   * {@link ToastActions} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getActionsProps(): Omit<ToastActionsProps, "children"> | null {
    if (this.getActionProps() !== null || this.getCloseProps() !== null) {
      const { actions: props = {} } = this.slotProps;

      return props;
    }

    return null;
  }

  /**
   * {@link ToastClose} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getCloseProps(): ToastCloseProps | null {
    const { close = "閉じる" } = this.toastProps;
    const { close: props = {} } = this.slotProps;

    if (isLikelyVisibleNode(close)) {
      return {
        ...props,
        size: props.size ?? this.contentProps.size,
        children: close,
      };
    }

    return null;
  }

  /**
   * {@link ToastContent} に渡す props を取得します。
   */
  public getContentProps(): Omit<ToastContentProps, "children"> {
    const { content: props = {} } = this.slotProps;
    const { toast } = this.rootProps;

    return {
      ...props,
      ...this.contentProps,
      color: this.contentProps.color ?? toAlertColor(toast.type),
    };
  }

  /**
   * {@link ToastDescription} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getDescriptionProps(): ToastDescriptionProps | null {
    const { description: toastDescription } = this.toastProps;
    const { description: props = {} } = this.slotProps;
    const { toast } = this.rootProps;

    if (isLikelyVisibleNode(toast.description)) {
      return {
        ...props,
        children: toast.description,
      };
    }
    if (isLikelyVisibleNode(toastDescription)) {
      return {
        ...props,
        children: toastDescription,
      };
    }

    return null;
  }

  /**
   * {@link ToastRoot} に渡す props を取得します。
   */
  public getRootProps(): ToastRootProps<TData> {
    return this.rootProps;
  }

  /**
   * {@link ToastTitle} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getTitleProps(): ToastTitleProps | null {
    const { title: toastTitle } = this.toastProps;
    const { title: props = {} } = this.slotProps;
    const { toast } = this.rootProps;

    if (isLikelyVisibleNode(toast.title)) {
      return {
        ...props,
        children: toast.title,
      };
    }
    if (isLikelyVisibleNode(toastTitle)) {
      return {
        ...props,
        children: toastTitle,
      };
    }

    return null;
  }
}

/**
 * {@link ToastAPI} を作成するフックです。
 */
export const useToastAPI: IUseToastAPI = function useSuiToastAPI<TData extends object = any>(
  props: ToastProps<TData>,
) {
  return new ToastAPI(props);
};

export { ToastAPI as API, useToastAPI as useAPI };

/**
 * {@link ToastList} を構成する各パーツの props を作成するための API です。
 *
 * @template TData 通知に含める追加データの型です。
 */
export class ToastListAPI<TData extends object = any> {
  private readonly children: React.ReactNode | IToastListRenderer<TData> | undefined;

  private readonly slotProps: ToastListSlotProps;

  private readonly portalProps: ToastListProps.Portal;

  private readonly toasts: readonly ToastToastObject<TData>[];

  /**
   * @param props {@link ToastList} の props です。
   * @param toasts 表示する通知の一覧です。
   * @internal
   */
  public constructor(props: ToastListProps<TData>, toasts: readonly ToastToastObject<TData>[]) {
    const { children, slotProps = {}, ...portalProps } = props;
    this.children = children;
    this.slotProps = slotProps;
    this.portalProps = portalProps;
    this.toasts = toasts;
  }

  /**
   * {@link ToastPortal} に渡す props を取得します。
   */
  public getPortalProps(): Omit<ToastPortalProps, "children"> {
    return this.portalProps;
  }

  /**
   * {@link ToastViewport} に渡す props を取得します。
   */
  public getViewportProps(): Omit<ToastViewportProps, "children"> & {
    children: LikelyVisibleNode;
  } {
    const { toasts, children, slotProps } = this;
    const { viewport: props = {} } = slotProps;

    return {
      ...props,
      children:
        typeof children === "function"
          ? toasts.map(children)
          : (toReactNode(children) ?? toasts.map((t) => <Toast key={t.id} toast={t} />)),
    };
  }
}

/**
 * {@link ToastListAPI} を作成するフックです。
 */
export const useToastListAPI: IUseToastListAPI = function useSuiToastListAPI<
  TData extends object = any,
>(props: ToastListProps<TData>) {
  const { toasts } = useToastClient<TData>();

  return new ToastListAPI(props, toasts);
};

export { ToastListAPI as ListAPI, useToastListAPI as useListAPI };

// Component
// ---------

export interface IToastList extends IComponent<ToastListProps> {
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

export interface IToast extends IComponent<ToastProps> {
  /**
   * @template TData 通知に含める追加データの型です。
   */
  <TData extends object = any>(props: ToastProps<TData>): IComponent.Return;

  readonly List: IToastList;

  readonly Provider: IToastProvider;

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

    export type API = ToastListAPI;

    export type IRenderer<TData extends object = any> = IToastListRenderer<TData>;
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
