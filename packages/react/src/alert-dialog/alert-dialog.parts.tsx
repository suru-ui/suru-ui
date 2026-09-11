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

export namespace AlertDialogRootProps {
  export type BaseUI<TPayload = any> = Omit<
    React.ComponentProps<typeof AlertDialog.Root>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = {};

  export type Render = RenderProps<AlertDialogRootState>;

  export type SuruUI<TPayload = any> = {
    /**
     * トリガーとアラートダイアログに関連付けるためのハンドルです。
     */
    handle: AlertDialogHandle<TPayload>;
  };
}

/**
 * {@link AlertDialogRoot} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type AlertDialogRootProps<TPayload = any> = AlertDialogRootProps.Render &
  AlertDialogRootProps.SuruUI<TPayload> &
  AlertDialogRootProps.BaseUI<TPayload> &
  AlertDialogRootProps.HTML;

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
  export type State = AlertDialogRootState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML;

  export namespace Props {
    export type BaseUI<TPayload = any> = AlertDialogRootProps.BaseUI<TPayload>;

    export type HTML = AlertDialogRootProps.HTML;

    export type Render = AlertDialogRootProps.Render;

    export type SuruUI<TPayload = any> = AlertDialogRootProps.SuruUI<TPayload>;
  }

  export type Actions = AlertDialogRootActions;

  export type ChangeEventDetails = AlertDialogRootChangeEventDetails;

  export type ChangeEventReason = AlertDialogRootChangeEventReason;
}

// ToggleTrigger
// -------------

/**
 * {@link AlertDialogToggleTrigger} が持つ状態です。
 */
export type AlertDialogToggleTriggerState = AlertDialog.Trigger.State;

export namespace AlertDialogToggleTriggerProps {
  export type BaseUI<TPayload = any> = Omit<
    React.ComponentProps<typeof AlertDialog.Trigger>,
    keyof Render | keyof SuruUI | "render"
  >;

  export type HTML = Omit<
    React.ComponentProps<"button">,
    | keyof Render
    | keyof SuruUI
    | keyof Omit<React.ComponentProps<typeof AlertDialog.Trigger>, "handle" | "children" | "render">
  >;

  export type Render = RenderProps<AlertDialogToggleTriggerState>;

  export type SuruUI<TPayload = any> = {
    /**
     * ボタンとしてレンダリングする要素です。
     */
    children: NonNullable<React.ComponentProps<typeof AlertDialog.Trigger>["render"]>;

    /**
     * トリガーとアラートダイアログに関連付けるためのハンドルです。
     */
    handle: AlertDialogHandle<TPayload>;
  };
}

/**
 * {@link AlertDialogToggleTrigger} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type AlertDialogToggleTriggerProps<TPayload = any> = AlertDialogToggleTriggerProps.Render &
  AlertDialogToggleTriggerProps.SuruUI<TPayload> &
  AlertDialogToggleTriggerProps.BaseUI<TPayload> &
  AlertDialogToggleTriggerProps.HTML;

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
  export type State = AlertDialogToggleTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI<TPayload = any> = AlertDialogToggleTriggerProps.BaseUI<TPayload>;

    export type HTML = AlertDialogToggleTriggerProps.HTML;

    export type Render = AlertDialogToggleTriggerProps.Render;

    export type SuruUI<TPayload = any> = AlertDialogToggleTriggerProps.SuruUI<TPayload>;
  }
}

// Portal
// ------

/**
 * {@link AlertDialogPortal} が持つ状態です。
 */
export type AlertDialogPortalState = AlertDialog.Portal.State;

export namespace AlertDialogPortalProps {
  export type BaseUI = Omit<React.ComponentProps<typeof AlertDialog.Portal>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof AlertDialog.Portal>
  >;

  export type Render = RenderProps<AlertDialogPortalState>;

  export type SuruUI = {};
}

/**
 * {@link AlertDialogPortal} に渡す props です。
 */
export type AlertDialogPortalProps = AlertDialogPortalProps.Render &
  AlertDialogPortalProps.SuruUI &
  AlertDialogPortalProps.BaseUI &
  AlertDialogPortalProps.HTML;

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
  export type State = AlertDialogPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = AlertDialogPortalProps.BaseUI;

    export type HTML = AlertDialogPortalProps.HTML;

    export type Render = AlertDialogPortalProps.Render;

    export type SuruUI = AlertDialogPortalProps.SuruUI;
  }
}

// Backdrop
// --------

/**
 * {@link AlertDialogBackdrop} が持つ状態です。
 */
export type AlertDialogBackdropState = AlertDialog.Backdrop.State;

export namespace AlertDialogBackdropProps {
  export type BaseUI = Omit<React.ComponentProps<typeof AlertDialog.Backdrop>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof AlertDialog.Backdrop>
  >;

  export type Render = RenderProps<AlertDialogBackdropState>;

  export type SuruUI = {};
}

/**
 * {@link AlertDialogBackdrop} に渡す props です。
 */
export type AlertDialogBackdropProps = AlertDialogBackdropProps.Render &
  AlertDialogBackdropProps.SuruUI &
  AlertDialogBackdropProps.BaseUI &
  AlertDialogBackdropProps.HTML;

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
  export type State = AlertDialogBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = AlertDialogBackdropProps.BaseUI;

    export type HTML = AlertDialogBackdropProps.HTML;

    export type Render = AlertDialogBackdropProps.Render;

    export type SuruUI = AlertDialogBackdropProps.SuruUI;
  }
}

// Viewport
// --------

/**
 * {@link AlertDialogViewport} が持つ状態です。
 */
export type AlertDialogViewportState = AlertDialog.Viewport.State;

export namespace AlertDialogViewportProps {
  export type BaseUI = Omit<React.ComponentProps<typeof AlertDialog.Viewport>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof AlertDialog.Viewport>
  >;

  export type Render = RenderProps<AlertDialogViewportState>;

  export type SuruUI = {};
}

/**
 * {@link AlertDialogViewport} に渡す props です。
 */
export type AlertDialogViewportProps = AlertDialogViewportProps.Render &
  AlertDialogViewportProps.SuruUI &
  AlertDialogViewportProps.BaseUI &
  AlertDialogViewportProps.HTML;

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
  export type State = AlertDialogViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = AlertDialogViewportProps.BaseUI;

    export type HTML = AlertDialogViewportProps.HTML;

    export type Render = AlertDialogViewportProps.Render;

    export type SuruUI = AlertDialogViewportProps.SuruUI;
  }
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

export namespace AlertDialogContentProps {
  export type BaseUI = Omit<
    React.ComponentProps<typeof AlertDialog.Popup>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof AlertDialog.Popup>
  >;

  export type Render = RenderProps<AlertDialogContentState>;

  export type SuruUI = {
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
}

/**
 * {@link AlertDialogContent} に渡す props です。
 */
export type AlertDialogContentProps = AlertDialogContentProps.Render &
  AlertDialogContentProps.SuruUI &
  AlertDialogContentProps.BaseUI &
  AlertDialogContentProps.HTML;

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
  export type State = AlertDialogContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = AlertDialogContentProps.BaseUI;

    export type HTML = AlertDialogContentProps.HTML;

    export type Render = AlertDialogContentProps.Render;

    export type SuruUI = AlertDialogContentProps.SuruUI;
  }

  export type Radius = AlertDialogContentRadius;

  export type Variant = AlertDialogContentVariant;
}

// Controls
// --------

/**
 * {@link AlertDialogControls} が持つ状態です。
 */
export type AlertDialogControlsState = {};

export namespace AlertDialogControlsProps {
  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<AlertDialogControlsState>;

  export type SuruUI = {
    /**
     * 絶対位置として配置するかを指定します。
     *
     * @default false
     */
    absolute?: boolean | undefined;
  };
}

/**
 * {@link AlertDialogControls} に渡す props です。
 */
export type AlertDialogControlsProps = AlertDialogControlsProps.Render &
  AlertDialogControlsProps.SuruUI &
  AlertDialogControlsProps.HTML;

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
  export type State = AlertDialogControlsState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type HTML = AlertDialogControlsProps.HTML;

    export type Render = AlertDialogControlsProps.Render;

    export type SuruUI = AlertDialogControlsProps.SuruUI;
  }
}

// Header
// ------

/**
 * {@link AlertDialogHeader} が持つ状態です。
 */
export type AlertDialogHeaderState = {};

export namespace AlertDialogHeaderProps {
  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<AlertDialogHeaderState>;

  export type SuruUI = {};
}

/**
 * {@link AlertDialogHeader} に渡す props です。
 */
export type AlertDialogHeaderProps = AlertDialogHeaderProps.Render &
  AlertDialogHeaderProps.SuruUI &
  AlertDialogHeaderProps.HTML;

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
  export type State = AlertDialogHeaderState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type HTML = AlertDialogHeaderProps.HTML;

    export type Render = AlertDialogHeaderProps.Render;

    export type SuruUI = AlertDialogHeaderProps.SuruUI;
  }
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

export namespace AlertDialogIconProps {
  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<AlertDialogIconState>;

  export type SuruUI = {
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
}

/**
 * {@link AlertDialogIcon} に渡す props です。
 */
export type AlertDialogIconProps = AlertDialogIconProps.Render &
  AlertDialogIconProps.SuruUI &
  AlertDialogIconProps.HTML;

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
  export type State = AlertDialogIconState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type HTML = AlertDialogIconProps.HTML;

    export type Render = AlertDialogIconProps.Render;

    export type SuruUI = AlertDialogIconProps.SuruUI;
  }

  export type Color = AlertDialogIconColor;

  export type Radius = AlertDialogIconRadius;

  export type Size = AlertDialogIconSize;

  export type Variant = AlertDialogIconVariant;
}

// Title
// -----

/**
 * {@link AlertDialogTitle} が持つ状態です。
 */
export type AlertDialogTitleState = AlertDialog.Title.State;

export namespace AlertDialogTitleProps {
  export type BaseUI = Omit<React.ComponentProps<typeof AlertDialog.Title>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"h2">,
    keyof Render | keyof React.ComponentProps<typeof AlertDialog.Title>
  >;

  export type Render = RenderProps<AlertDialogTitleState>;

  export type SuruUI = {};
}

/**
 * {@link AlertDialogTitle} に渡す props です。
 */
export type AlertDialogTitleProps = AlertDialogTitleProps.Render &
  AlertDialogTitleProps.SuruUI &
  AlertDialogTitleProps.BaseUI &
  AlertDialogTitleProps.HTML;

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
  export type State = AlertDialogTitleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = AlertDialogTitleProps.BaseUI;

    export type HTML = AlertDialogTitleProps.HTML;

    export type Render = AlertDialogTitleProps.Render;

    export type SuruUI = AlertDialogTitleProps.SuruUI;
  }
}

// Description
// -----------

/**
 * {@link AlertDialogDescription} が持つ状態です。
 */
export type AlertDialogDescriptionState = AlertDialog.Description.State;

export namespace AlertDialogDescriptionProps {
  export type BaseUI = Omit<React.ComponentProps<typeof AlertDialog.Description>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"p">,
    keyof Render | keyof React.ComponentProps<typeof AlertDialog.Description>
  >;

  export type Render = RenderProps<AlertDialogDescriptionState>;

  export type SuruUI = {};
}

/**
 * {@link AlertDialogDescription} に渡す props です。
 */
export type AlertDialogDescriptionProps = AlertDialogDescriptionProps.Render &
  AlertDialogDescriptionProps.SuruUI &
  AlertDialogDescriptionProps.BaseUI &
  AlertDialogDescriptionProps.HTML;

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
  export type State = AlertDialogDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = AlertDialogDescriptionProps.BaseUI;

    export type HTML = AlertDialogDescriptionProps.HTML;

    export type Render = AlertDialogDescriptionProps.Render;

    export type SuruUI = AlertDialogDescriptionProps.SuruUI;
  }
}

// Body
// ----

/**
 * {@link AlertDialogBody} が持つ状態です。
 */
export type AlertDialogBodyState = {};

export namespace AlertDialogBodyProps {
  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<AlertDialogBodyState>;

  export type SuruUI = {};
}

/**
 * {@link AlertDialogBody} に渡す props です。
 */
export type AlertDialogBodyProps = AlertDialogBodyProps.Render &
  AlertDialogBodyProps.SuruUI &
  AlertDialogBodyProps.HTML;

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
  export type State = AlertDialogBodyState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type HTML = AlertDialogBodyProps.HTML;

    export type Render = AlertDialogBodyProps.Render;

    export type SuruUI = AlertDialogBodyProps.SuruUI;
  }
}

// Footer
// ------

/**
 * {@link AlertDialogFooter} が持つ状態です。
 */
export type AlertDialogFooterState = {};

export namespace AlertDialogFooterProps {
  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<AlertDialogFooterState>;

  export type SuruUI = {};
}

/**
 * {@link AlertDialogFooter} に渡す props です。
 */
export type AlertDialogFooterProps = AlertDialogFooterProps.Render &
  AlertDialogFooterProps.SuruUI &
  AlertDialogFooterProps.HTML;

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
  export type State = AlertDialogFooterState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type HTML = AlertDialogFooterProps.HTML;

    export type Render = AlertDialogFooterProps.Render;

    export type SuruUI = AlertDialogFooterProps.SuruUI;
  }
}

// CloseTrigger
// ------------

/**
 * {@link AlertDialogCloseTrigger} が持つ状態です。
 */
export type AlertDialogCloseTriggerState = AlertDialog.Close.State;

export namespace AlertDialogCloseTriggerProps {
  export type BaseUI = Omit<
    React.ComponentProps<typeof AlertDialog.Close>,
    keyof Render | keyof SuruUI | "render"
  >;

  export type HTML = Omit<
    React.ComponentProps<"button">,
    | keyof Render
    | keyof SuruUI
    | keyof Omit<React.ComponentProps<typeof AlertDialog.Close>, "children" | "render">
  >;

  export type Render = RenderProps<AlertDialogCloseTriggerState>;

  export type SuruUI = {
    /**
     * ボタンとしてレンダリングする要素です。
     */
    children: NonNullable<React.ComponentProps<typeof AlertDialog.Close>["render"]>;
  };
}

/**
 * {@link AlertDialogCloseTrigger} に渡す props です。
 */
export type AlertDialogCloseTriggerProps = AlertDialogCloseTriggerProps.Render &
  AlertDialogCloseTriggerProps.SuruUI &
  AlertDialogCloseTriggerProps.BaseUI &
  AlertDialogCloseTriggerProps.HTML;

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
  export type State = AlertDialogCloseTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = AlertDialogCloseTriggerProps.BaseUI;

    export type HTML = AlertDialogCloseTriggerProps.HTML;

    export type Render = AlertDialogCloseTriggerProps.Render;

    export type SuruUI = AlertDialogCloseTriggerProps.SuruUI;
  }
}
