import { AlertDialog } from "@base-ui/react/alert-dialog";
import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./alert-dialog.css";

// Context
// -------

/**
 * アラートダイアログの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AlertDialogContentContextRadius = "none" | Size;

/**
 * {@link AlertDialogContent} が子パーツへ提供するコンテキストです。
 */
export type AlertDialogContentContext = {
  /**
   * アラートダイアログの角丸の大きさです。
   */
  readonly radius: AlertDialogContentContextRadius;
};

/**
 * {@link AlertDialogContent} が子パーツへ提供するコンテキストです。
 */
export const AlertDialogContentContext: React.Context<AlertDialogContentContext | null> =
  React.createContext<AlertDialogContentContext | null>(null);

function useSuiAlertDialogContentContext(optional?: false): AlertDialogContentContext;
function useSuiAlertDialogContentContext(optional?: boolean): AlertDialogContentContext | null;
function useSuiAlertDialogContentContext(optional?: boolean): AlertDialogContentContext | null {
  const ctx = React.use(AlertDialogContentContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "AlertDialogContentContext",
      providerName: "AlertDialogContent",
    });
  }

  return ctx;
}

/**
 * {@link AlertDialogContentContext} を読み取るフックです。
 */
export const useAlertDialogContentContext: IUseContext<AlertDialogContentContext> =
  useSuiAlertDialogContentContext;

export {
  AlertDialogContentContext as ContentContext,
  useAlertDialogContentContext as useContentContext,
};

export namespace ContentContext {
  /**
   * {@link AlertDialogContentContextRadius}
   */
  export type Radius = AlertDialogContentContextRadius;
}

// Handle
// ------

/**
 * アラートダイアログを命令的に制御するハンドルです。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export interface AlertDialogHandle<TPayload = any> extends AlertDialog.Handle<TPayload> {}

interface ICreateHandle {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   * @returns アラートダイアログを命令的に制御するハンドルです。
   */
  <TPayload = any>(): AlertDialogHandle<TPayload>;
}

/**
 * {@link AlertDialogHandle} を作成する関数です。
 */
export const createAlertDialogHandle: ICreateHandle = function createSuiAlertDialogHandle() {
  return AlertDialog.createHandle();
};

export { type AlertDialogHandle as Handle, createAlertDialogHandle as createHandle };

// Root
// ----

/**
 * アラートダイアログを命令的に操作するためのオブジェクトです。
 */
export type AlertDialogRootActions = AlertDialog.Root.Actions;

/**
 * アラートダイアログの開閉状態を変更されるイベントの詳細です。
 */
export type AlertDialogRootChangeEventDetails = AlertDialog.Root.ChangeEventDetails;

/**
 * アラートダイアログの開閉状態が変更される理由です。
 */
export type AlertDialogRootChangeEventReason = AlertDialog.Root.ChangeEventReason;

/**
 * {@link AlertDialogRoot} が持つ状態です。
 */
export type AlertDialogRootState = AlertDialog.Root.State;

/**
 * {@link AlertDialogRoot} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type AlertDialogRootProps<TPayload = any> = Omit<
  React.ComponentProps<typeof AlertDialog.Root>,
  "handle"
> & {
  /**
   * トリガーとアラートダイアログに関連付けるためのハンドルです。
   */
  handle: AlertDialogHandle<TPayload>;
};

interface IAlertDialogRoot extends IComponent<AlertDialogRootProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: AlertDialogRootProps<TPayload>): IComponent.Return;
}

/**
 * アラートダイアログのルートコンポーネントです。
 *
 * ダイアログの開閉状態を管理し、各パーツをグループ化します。それ自身は HTML 要素をレンダリングしません。
 */
export const AlertDialogRoot: IAlertDialogRoot = function SuiAlertDialogRoot(
  props: AlertDialogRootProps,
) {
  return <AlertDialog.Root {...props} />;
};

export { AlertDialogRoot as Root };

export namespace Root {
  /**
   * {@link AlertDialogRootState}
   */
  export type State = AlertDialogRootState;

  /**
   * {@link AlertDialogRootProps}
   */
  export type Props<TPayload = any> = AlertDialogRootProps<TPayload>;

  /**
   * {@link AlertDialogRootActions}
   */
  export type Actions = AlertDialogRootActions;

  /**
   * {@link AlertDialogRootChangeEventDetails}
   */
  export type ChangeEventDetails = AlertDialogRootChangeEventDetails;

  /**
   * {@link AlertDialogRootChangeEventReason}
   */
  export type ChangeEventReason = AlertDialogRootChangeEventReason;
}

// ToggleTrigger
// -------------

/**
 * {@link AlertDialogToggleTrigger} が持つ状態です。
 */
export type AlertDialogToggleTriggerState = AlertDialog.Trigger.State;

/**
 * {@link AlertDialogToggleTrigger} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type AlertDialogToggleTriggerProps<TPayload = any> = Omit<
  React.ComponentProps<typeof AlertDialog.Trigger>,
  "handle" | "children" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   */
  children: NonNullable<React.ComponentProps<typeof AlertDialog.Trigger>["render"]>;

  /**
   * トリガーとアラートダイアログに関連付けるためのハンドルです。
   */
  handle: AlertDialogHandle<TPayload>;
};

/**
 * アラートダイアログを開くボタンコンポーネントです。
 */
export const AlertDialogToggleTrigger: IComponent<AlertDialogToggleTriggerProps> =
  function SuiAlertDialogToggleTrigger(props) {
    const { handle, children, className, ...otherProps } = props;

    return (
      <AlertDialog.Trigger
        {...otherProps}
        handle={handle}
        render={children}
        className={cn(className, "sui_alert_dialog_trigger")}
      />
    );
  };

export { AlertDialogToggleTrigger as ToggleTrigger };

export namespace ToggleTrigger {
  /**
   * {@link AlertDialogToggleTriggerState}
   */
  export type State = AlertDialogToggleTriggerState;

  /**
   * {@link AlertDialogToggleTriggerProps}
   */
  export type Props = AlertDialogToggleTriggerProps;
}

// Portal
// ------

/**
 * {@link AlertDialogPortal} が持つ状態です。
 */
export type AlertDialogPortalState = AlertDialog.Portal.State;

/**
 * {@link AlertDialogPortal} に渡す props です。
 */
export type AlertDialogPortalProps = React.ComponentProps<typeof AlertDialog.Portal>;

/**
 * アラートダイアログを DOM の別の場所に配置するコンポーネントです。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const AlertDialogPortal: IComponent<AlertDialogPortalProps> = function SuiAlertDialogPortal(
  props,
) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <AlertDialog.Portal
      {...otherProps}
      className={cn(className, "sui_alert_dialog_portal")}
      data-scope={dataScope}
    />
  );
};

export { AlertDialogPortal as Portal };

export namespace Portal {
  /**
   * {@link AlertDialogPortalState}
   */
  export type State = AlertDialogPortalState;

  /**
   * {@link AlertDialogPortalProps}
   */
  export type Props = AlertDialogPortalProps;
}

// Backdrop
// --------

/**
 * {@link AlertDialogBackdrop} が持つ状態です。
 */
export type AlertDialogBackdropState = AlertDialog.Backdrop.State;

/**
 * {@link AlertDialogBackdrop} に渡す props です。
 */
export type AlertDialogBackdropProps = React.ComponentProps<typeof AlertDialog.Backdrop>;

/**
 * ポップアップの背後に表示されるオーバーレイコンポーネントです。
 */
export const AlertDialogBackdrop: IComponent<AlertDialogBackdropProps> =
  function SuiAlertDialogBackdrop(props) {
    const { className, ...otherProps } = props;

    return (
      <AlertDialog.Backdrop
        {...otherProps}
        className={cn(className, "sui_alert_dialog_backdrop")}
      />
    );
  };

export { AlertDialogBackdrop as Backdrop };

export namespace Backdrop {
  /**
   * {@link AlertDialogBackdropState}
   */
  export type State = AlertDialogBackdropState;

  /**
   * {@link AlertDialogBackdropProps}
   */
  export type Props = AlertDialogBackdropProps;
}

// Viewport
// --------

/**
 * {@link AlertDialogViewport} が持つ状態です。
 */
export type AlertDialogViewportState = AlertDialog.Viewport.State;

/**
 * {@link AlertDialogViewport} に渡す props です。
 */
export type AlertDialogViewportProps = React.ComponentProps<typeof AlertDialog.Viewport>;

/**
 * ポップアップの配置コンテナーコンポーネントです。
 *
 * スクロール可能なオーバーレイを作り、ポップアップを中央に配置します。
 */
export const AlertDialogViewport: IComponent<AlertDialogViewportProps> =
  function SuiAlertDialogViewport(props) {
    const { className, ...otherProps } = props;

    return (
      <AlertDialog.Viewport
        {...otherProps}
        className={cn(className, "sui_alert_dialog_viewport")}
      />
    );
  };

export { AlertDialogViewport as Viewport };

export namespace Viewport {
  /**
   * {@link AlertDialogViewportState}
   */
  export type State = AlertDialogViewportState;

  /**
   * {@link AlertDialogViewportProps}
   */
  export type Props = AlertDialogViewportProps;
}

// Content
// -------

/**
 * アラートダイアログの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AlertDialogContentRadius = "none" | Size;

/**
 * アラートダイアログの主な外観です。
 *
 * - `"default"`: 規定のスタイル
 * - `"stacked"`: 積み重なっているスタイル
 */
export type AlertDialogContentVariant = "default" | "stacked";

/**
 * {@link AlertDialogContent} が持つ状態です。
 */
export type AlertDialogContentState = AlertDialog.Popup.State;

/**
 * {@link AlertDialogContent} に渡す props です。
 */
export type AlertDialogContentProps = React.ComponentProps<typeof AlertDialog.Popup> & {
  /**
   * アラートダイアログに枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * アラートダイアログの角丸の大きさを指定します。
   *
   * @default "md"
   */
  radius?: AlertDialogContentRadius | undefined;

  /**
   * アラートダイアログの主な外観を指定します。
   *
   * @default "default"
   */
  variant?: AlertDialogContentVariant | undefined;
};

/**
 * アラートダイアログを表示するコンポーネントです。
 */
export const AlertDialogContent: IComponent<AlertDialogContentProps> =
  function SuiAlertDialogContent(props) {
    const {
      radius = "md",
      variant = "default",
      outlined = false,
      className,
      ...otherProps
    } = props;
    const ctx = React.useMemo<AlertDialogContentContext>(() => ({ radius }), [radius]);

    return (
      <AlertDialogContentContext value={ctx}>
        <AlertDialog.Popup
          {...otherProps}
          className={cn(
            className,
            "sui_alert_dialog_content",
            `sui_alert_dialog_content-radius_${radius}`,
            `sui_alert_dialog_content-variant_${variant}`,
            outlined && "sui_alert_dialog_content-outlined",
          )}
        />
      </AlertDialogContentContext>
    );
  };

export { AlertDialogContent as Content };

export namespace Content {
  /**
   * {@link AlertDialogContentState}
   */
  export type State = AlertDialogContentState;

  /**
   * {@link AlertDialogContentProps}
   */
  export type Props = AlertDialogContentProps;

  /**
   * {@link AlertDialogContentRadius}
   */
  export type Radius = AlertDialogContentRadius;

  /**
   * {@link AlertDialogContentVariant}
   */
  export type Variant = AlertDialogContentVariant;
}

// Controls
// --------

/**
 * {@link AlertDialogControls} が持つ状態です。
 */
export type AlertDialogControlsState = {};

/**
 * {@link AlertDialogControls} に渡す props です。
 */
export type AlertDialogControlsProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<AlertDialogControlsState> & {
    /**
     * 絶対位置として配置するかを指定します。
     *
     * @default false
     */
    absolute?: boolean | undefined;
  };

/**
 * アラートダイアログのコントロールコンポーネントです。
 */
export const AlertDialogControls: IComponent<AlertDialogControlsProps> =
  function SuiAlertDialogControls(props) {
    const { absolute = false, ...htmlProps } = props;

    return useRender({
      props: [
        htmlProps,
        {
          className: cn(
            "sui_alert_dialog_controls",
            absolute && "sui_alert_dialog_controls-absolute",
            !absolute && "sui_alert_dialog_controls-relative",
          ),
        },
      ],
      defaultTagName: "div",
    });
  };

export { AlertDialogControls as Controls };

export namespace Controls {
  /**
   * {@link AlertDialogControlsState}
   */
  export type State = AlertDialogControlsState;

  /**
   * {@link AlertDialogControlsProps}
   */
  export type Props = AlertDialogControlsProps;
}

// Header
// ------

/**
 * {@link AlertDialogHeader} が持つ状態です。
 */
export type AlertDialogHeaderState = {};

/**
 * {@link AlertDialogHeader} に渡す props です。
 */
export type AlertDialogHeaderProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<AlertDialogHeaderState>;

/**
 * アラートダイアログのヘッダーコンポーネントです。
 */
export const AlertDialogHeader: IComponent<AlertDialogHeaderProps> = function SuiAlertDialogHeader(
  htmlProps,
) {
  return useRender({
    props: [
      htmlProps,
      {
        className: "sui_alert_dialog_header",
      },
    ],
    defaultTagName: "div",
  });
};

export { AlertDialogHeader as Header };

export namespace Header {
  /**
   * {@link AlertDialogHeaderState}
   */
  export type State = AlertDialogHeaderState;

  /**
   * {@link AlertDialogHeaderProps}
   */
  export type Props = AlertDialogHeaderProps;
}

// Icon
// ----

/**
 * アラートダイアログのアイコンの配色です。
 */
export type AlertDialogIconColor = Color;

/**
 * アラートダイアログのアイコンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type AlertDialogIconRadius = "none" | Size | "full";

/**
 * アラートダイアログのアイコンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AlertDialogIconSize = Size;

/**
 * アラートダイアログのアイコンの主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AlertDialogIconVariant = ColorTemplate;

/**
 * {@link AlertDialogIcon} が持つ状態です。
 */
export type AlertDialogIconState = {};

/**
 * {@link AlertDialogIcon} に渡す props です。
 */
export type AlertDialogIconProps = Omit<React.ComponentProps<"div">, keyof RenderProps | "color"> &
  RenderProps<AlertDialogIconState> & {
    /**
     * アラートダイアログのアイコンの配色を指定します。
     *
     * @default "grey"
     */
    color?: AlertDialogIconColor | undefined;

    /**
     * アラートダイアログのアイコンの背景色を控えめにします。
     *
     * @default false
     */
    muted?: boolean | undefined;

    /**
     * アラートダイアログのアイコンに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * アラートダイアログのアイコンの角丸の大きさを指定します。
     *
     * 既定値は {@link AlertDialogIconProps.size|size}
     */
    radius?: AlertDialogIconRadius | undefined;

    /**
     * アラートダイアログのアイコンの大きさを指定します。
     *
     * @default "md"
     */
    size?: AlertDialogIconSize | undefined;

    /**
     * アラートダイアログのアイコンの主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: AlertDialogIconVariant | undefined;
  };

/**
 * アラートダイアログのアイコンコンポーネントです。
 */
export const AlertDialogIcon: IComponent<AlertDialogIconProps> = function SuiAlertDialogIcon(
  props,
) {
  const {
    size = "md",
    color = "grey",
    muted = false,
    radius = size,
    variant = "liquid",
    outlined = false,
    ...otherHtmlProps
  } = props;

  return useRender({
    props: [
      otherHtmlProps,
      {
        className: cn(
          "sui_alert_dialog_icon",
          `sui_alert_dialog_icon-size_${size}`,
          `sui_alert_dialog_icon-color_${color}`,
          `sui_alert_dialog_icon-radius_${radius}`,
          `sui_alert_dialog_icon-variant_${variant}`,
          muted && "sui_alert_dialog_icon-muted",
          outlined && "sui_alert_dialog_icon-outlined",
        ),
      },
    ],
    defaultTagName: "div",
  });
};

export { AlertDialogIcon as Icon };

export namespace Icon {
  /**
   * {@link AlertDialogIconState}
   */
  export type State = AlertDialogIconState;

  /**
   * {@link AlertDialogIconProps}
   */
  export type Props = AlertDialogIconProps;

  /**
   * {@link AlertDialogIconColor}
   */
  export type Color = AlertDialogIconColor;

  /**
   * {@link AlertDialogIconRadius}
   */
  export type Radius = AlertDialogIconRadius;

  /**
   * {@link AlertDialogIconSize}
   */
  export type Size = AlertDialogIconSize;

  /**
   * {@link AlertDialogIconVariant}
   */
  export type Variant = AlertDialogIconVariant;
}

// Title
// -----

/**
 * {@link AlertDialogTitle} が持つ状態です。
 */
export type AlertDialogTitleState = AlertDialog.Title.State;

/**
 * {@link AlertDialogTitle} に渡す props です。
 */
export type AlertDialogTitleProps = React.ComponentProps<typeof AlertDialog.Title>;

/**
 * アラートダイアログの見出しを表示するコンポーネントです。
 */
export const AlertDialogTitle: IComponent<AlertDialogTitleProps> = function SuiAlertDialogTitle(
  props,
) {
  const { className, ...otherProps } = props;

  return <AlertDialog.Title {...otherProps} className={cn(className, "sui_alert_dialog_title")} />;
};

export { AlertDialogTitle as Title };

export namespace Title {
  /**
   * {@link AlertDialogTitleState}
   */
  export type State = AlertDialogTitleState;

  /**
   * {@link AlertDialogTitleProps}
   */
  export type Props = AlertDialogTitleProps;
}

// Description
// -----------

/**
 * {@link AlertDialogDescription} が持つ状態です。
 */
export type AlertDialogDescriptionState = AlertDialog.Description.State;

/**
 * {@link AlertDialogDescription} に渡す props です。
 */
export type AlertDialogDescriptionProps = React.ComponentProps<typeof AlertDialog.Description>;

/**
 * アラートダイアログの内容を表示するコンポーネントです。
 */
export const AlertDialogDescription: IComponent<AlertDialogDescriptionProps> =
  function SuiAlertDialogDescription(props) {
    const { className, ...otherProps } = props;

    return (
      <AlertDialog.Description
        {...otherProps}
        className={cn(className, "sui_alert_dialog_description")}
      />
    );
  };

export { AlertDialogDescription as Description };

export namespace Description {
  /**
   * {@link AlertDialogDescriptionState}
   */
  export type State = AlertDialogDescriptionState;

  /**
   * {@link AlertDialogDescriptionProps}
   */
  export type Props = AlertDialogDescriptionProps;
}

// Body
// ----

/**
 * {@link AlertDialogBody} が持つ状態です。
 */
export type AlertDialogBodyState = {};

/**
 * {@link AlertDialogBody} に渡す props です。
 */
export type AlertDialogBodyProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<AlertDialogBodyState>;

/**
 * アラートダイアログのボディーコンポーネントです。
 */
export const AlertDialogBody: IComponent<AlertDialogBodyProps> = function SuiAlertDialogBody(
  props,
) {
  return useRender({
    props: [
      props,
      {
        className: "sui_alert_dialog_body",
      },
    ],
    defaultTagName: "div",
  });
};

export { AlertDialogBody as Body };

export namespace Body {
  /**
   * {@link AlertDialogBodyState}
   */
  export type State = AlertDialogBodyState;

  /**
   * {@link AlertDialogBodyProps}
   */
  export type Props = AlertDialogBodyProps;
}

// Footer
// ------

/**
 * {@link AlertDialogFooter} が持つ状態です。
 */
export type AlertDialogFooterState = {};

/**
 * {@link AlertDialogFooter} に渡す props です。
 */
export type AlertDialogFooterProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<AlertDialogFooterState>;

/**
 * アラートダイアログのフッターコンポーネントです。
 */
export const AlertDialogFooter: IComponent<AlertDialogFooterProps> = function SuiAlertDialogFooter(
  props,
) {
  return useRender({
    props: [
      props,
      {
        className: "sui_alert_dialog_footer",
      },
    ],
    defaultTagName: "div",
  });
};

export { AlertDialogFooter as Footer };

export namespace Footer {
  /**
   * {@link AlertDialogFooterState}
   */
  export type State = AlertDialogFooterState;

  /**
   * {@link AlertDialogFooterProps}
   */
  export type Props = AlertDialogFooterProps;
}

// CloseTrigger
// ------------

/**
 * {@link AlertDialogCloseTrigger} が持つ状態です。
 */
export type AlertDialogCloseTriggerState = AlertDialog.Close.State;

/**
 * {@link AlertDialogCloseTrigger} に渡す props です。
 */
export type AlertDialogCloseTriggerProps = Omit<
  React.ComponentProps<typeof AlertDialog.Close>,
  "children" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   */
  children: NonNullable<React.ComponentProps<typeof AlertDialog.Close>["render"]>;
};

/**
 * アラートダイアログを閉じるボタンコンポーネントです。
 */
export const AlertDialogCloseTrigger: IComponent<AlertDialogCloseTriggerProps> =
  function SuiAlertDialogCloseTrigger(props) {
    const { children, className, ...otherProps } = props;

    return (
      <AlertDialog.Close
        {...otherProps}
        render={children}
        className={cn(className, "sui_alert_dialog_close")}
      />
    );
  };

export { AlertDialogCloseTrigger as CloseTrigger };

export namespace CloseTrigger {
  /**
   * {@link AlertDialogCloseTriggerState}
   */
  export type State = AlertDialogCloseTriggerState;

  /**
   * {@link AlertDialogCloseTriggerProps}
   */
  export type Props = AlertDialogCloseTriggerProps;
}
