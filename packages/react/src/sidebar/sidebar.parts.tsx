import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./sidebar.css";

// Context
// -------

/**
 * サイドバーの開閉状態です。
 *
 * - `"expanded"`: 展開しています。
 * - `"collapsed"`: 折りたたまれています。
 */
export type SidebarOpenState = "expanded" | "collapsed";

/**
 * {@link SidebarProvider} が子パーツへ提供するコンテキストの型です。
 */
export type SidebarContext = {
  /**
   * サイドバーが開いているかどうかです。
   */
  readonly open: boolean;

  /**
   * サイドバーの開閉状態を設定します。
   */
  readonly setOpen: (open: boolean) => void;

  /**
   * サイドバーの開閉状態です。
   */
  readonly state: SidebarOpenState;

  /**
   * サイドバーの開閉状態を切り替えます。
   */
  readonly toggle: () => void;

  /**
   * 折りたたみの方法です。
   *
   * {@link SidebarRoot} の内側ではその値が入ります。外側では `undefined` です。
   */
  readonly collapsible?: SidebarRootCollapsible | undefined;
};

/**
 * {@link SidebarProvider} が子パーツへ提供するコンテキストです。
 */
export const SidebarContext: React.Context<SidebarContext | null> =
  React.createContext<SidebarContext | null>(null);

function useSuiSidebarContext(optional?: false): SidebarContext;
function useSuiSidebarContext(optional?: boolean): SidebarContext | null;
function useSuiSidebarContext(optional?: boolean): SidebarContext | null {
  const ctx = React.use(SidebarContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SidebarContext",
      providerName: "SidebarProvider",
    });
  }

  return ctx;
}

/**
 * {@link SidebarContext} を読み取るフックです。
 */
export const useSidebarContext: IUseContext<SidebarContext> = useSuiSidebarContext;

export { SidebarContext as Context, useSidebarContext as useContext };

// Provider
// --------

/**
 * {@link SidebarProvider} の状態です。
 */
export type SidebarProviderState = {
  /**
   * サイドバーの開閉状態です。
   */
  readonly state: SidebarOpenState;
};

export namespace SidebarProviderProps {
  export type Render = RenderProps<SidebarProviderState>;

  export type SuruUI = {
    /**
     * 初期の開閉状態を指定します。`open` を指定すると無視されます。
     *
     * @default true
     */
    defaultOpen?: boolean | undefined;

    /**
     * サイドバーの開閉状態が変化したときに呼び出されます。
     */
    onOpenChange?: ((open: boolean) => void) | undefined;

    /**
     * サイドバーが開いているかどうかを制御します。
     */
    open?: boolean | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarProvider} に渡す props です。
 */
export type SidebarProviderProps = SidebarProviderProps.Render &
  SidebarProviderProps.SuruUI &
  SidebarProviderProps.BaseUI &
  SidebarProviderProps.HTML;

/**
 * サイドバーとその内容を包むルート要素です。
 *
 * 子要素には {@link SidebarRoot}、{@link SidebarTrigger}、{@link SidebarInset} を配置します。
 */
export const SidebarProvider: IComponent<SidebarProviderProps> = function SuiSidebarProvider(
  props,
) {
  const {
    open: openProp,
    defaultOpen = true,
    onOpenChange,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDivProps
  } = props;
  const [openState, setOpenState] = React.useState(defaultOpen);
  const open = openProp ?? openState;
  const openRef = React.useRef(open);
  React.useEffect(() => {
    openRef.current = open;
  }, [open]);
  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (openProp === undefined) {
        setOpenState(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [openProp, onOpenChange],
  );
  const toggle = React.useCallback(() => {
    setOpen(!openRef.current);
  }, [setOpen]);
  const openStateValue: SidebarOpenState = open ? "expanded" : "collapsed";
  const renderState = React.useMemo<SidebarProviderState>(
    () => ({ state: openStateValue }),
    [openStateValue],
  );
  const ctx = React.useMemo<SidebarContext>(
    () => ({ open, state: openStateValue, toggle, setOpen }),
    [open, openStateValue, setOpen, toggle],
  );

  const element = useRender({
    props: [
      otherDivProps,
      {
        className: cn<SidebarProviderState>(
          "sui_sidebar_provider",
          (state) => state.state === "expanded" && "sui_sidebar_provider-expanded",
          (state) => state.state === "collapsed" && "sui_sidebar_provider-collapsed",
        ),
        "data-scope": dataScope,
      },
    ],
    state: renderState,
    defaultTagName: "div",
  });

  return <SidebarContext value={ctx}>{element}</SidebarContext>;
};

export { SidebarProvider as Provider };

export namespace Provider {
  export type State = SidebarProviderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarProviderProps.Render;

    export type SuruUI = SidebarProviderProps.SuruUI;

    export type BaseUI = SidebarProviderProps.BaseUI;

    export type HTML = SidebarProviderProps.HTML;
  }
}

// Root
// ----

/**
 * サイドバーを配置する辺です。
 *
 * - `"left"`: 左側に配置します。
 * - `"right"`: 右側に配置します。
 */
export type SidebarRootSide = "left" | "right";

/**
 * サイドバーの外観バリアントです。
 *
 * - `"sidebar"`: コンテンツを押し出す従来の固定サイドバーです。
 * - `"floating"`: 周囲に余白と枠、角丸を持つ浮遊パネルです。
 * - `"inset"`: {@link SidebarInset} の側を押し込んだ外観にします。
 */
export type SidebarRootVariant = "sidebar" | "floating" | "inset";

/**
 * 折りたたみの方法です。
 *
 * - `"offcanvas"`: 画面の端からスライドして完全に隠れます。
 * - `"icon"`: アイコン列の幅まで折りたたみます。
 * - `"none"`: 折りたためません。
 */
export type SidebarRootCollapsible = "offcanvas" | "icon" | "none";

/**
 * {@link SidebarRoot} の状態です。
 */
export type SidebarRootState = {
  /**
   * 折りたたみの方法です。
   */
  readonly collapsible: SidebarRootCollapsible;

  /**
   * サイドバーが開いているかどうかです。
   */
  readonly open: boolean;

  /**
   * 配置する辺です。
   */
  readonly side: SidebarRootSide;

  /**
   * サイドバーの開閉状態です。
   */
  readonly state: SidebarOpenState;

  /**
   * 外観バリアントです。
   */
  readonly variant: SidebarRootVariant;
};

export namespace SidebarRootProps {
  export type Render = RenderProps<SidebarRootState>;

  export type SuruUI = {
    /**
     * 折りたたみの方法です。
     *
     * @default "offcanvas"
     */
    collapsible?: SidebarRootCollapsible | undefined;

    /**
     * 配置する辺です。
     *
     * @default "left"
     */
    side?: SidebarRootSide | undefined;

    /**
     * 外観バリアントです。
     *
     * @default "sidebar"
     */
    variant?: SidebarRootVariant | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"aside", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarRoot} に渡す props です。
 */
export type SidebarRootProps = SidebarRootProps.Render &
  SidebarRootProps.SuruUI &
  SidebarRootProps.BaseUI &
  SidebarRootProps.HTML;

/**
 * サイドバー本体の要素です。
 *
 * 子要素には {@link SidebarHeader}、{@link SidebarContent}、{@link SidebarFooter}、
 * {@link SidebarGroup}、{@link SidebarRail} を配置します。
 */
export const SidebarRoot: IComponent<SidebarRootProps> = function SuiSidebarRoot(props) {
  const ctx = useSuiSidebarContext(true);
  const {
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherAsideProps
  } = props;
  const open = ctx?.open ?? true;
  const state: SidebarOpenState = open ? "expanded" : "collapsed";
  const renderState = React.useMemo<SidebarRootState>(
    () => ({ open, side, state, variant, collapsible }),
    [collapsible, open, side, state, variant],
  );
  const childCtx = React.useMemo<SidebarContext>(
    () => ({ ...(ctx ?? { open, state, toggle: () => {}, setOpen: () => {} }), collapsible }),
    [collapsible, ctx, open, state],
  );

  const element = useRender({
    props: [
      otherAsideProps,
      {
        className: cn<SidebarRootState>(
          "sui_sidebar",
          `sui_sidebar-side_${side}`,
          `sui_sidebar-variant_${variant}`,
          `sui_sidebar-collapsible_${collapsible}`,
          (state) => `sui_sidebar-${state.state}`,
        ),
        "data-scope": dataScope,
      },
    ],
    state: renderState,
    defaultTagName: "aside",
  });

  return <SidebarContext value={childCtx}>{element}</SidebarContext>;
};

export { SidebarRoot as Root };

export namespace Root {
  export type State = SidebarRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarRootProps.Render;

    export type SuruUI = SidebarRootProps.SuruUI;

    export type BaseUI = SidebarRootProps.BaseUI;

    export type HTML = SidebarRootProps.HTML;
  }

  export type Collapsible = SidebarRootCollapsible;

  export type Side = SidebarRootSide;

  export type Variant = SidebarRootVariant;
}

// Header
// ------

/**
 * {@link SidebarHeader} の状態です。
 */
export type SidebarHeaderState = {};

export namespace SidebarHeaderProps {
  export type Render = RenderProps<SidebarHeaderState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarHeader} に渡す props です。
 */
export type SidebarHeaderProps = SidebarHeaderProps.Render &
  SidebarHeaderProps.SuruUI &
  SidebarHeaderProps.BaseUI &
  SidebarHeaderProps.HTML;

/**
 * サイドバー上部に固定される領域です。
 *
 * ブランドやワークスペースの切り替えなどを配置します。
 */
export const SidebarHeader: IComponent<SidebarHeaderProps> = function SuiSidebarHeader(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_sidebar_header",
      },
    ],
    defaultTagName: "div",
  });
};

export { SidebarHeader as Header };

export namespace Header {
  export type State = SidebarHeaderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarHeaderProps.Render;

    export type SuruUI = SidebarHeaderProps.SuruUI;

    export type BaseUI = SidebarHeaderProps.BaseUI;

    export type HTML = SidebarHeaderProps.HTML;
  }
}

// Content
// -------

/**
 * {@link SidebarContent} の状態です。
 */
export type SidebarContentState = {};

export namespace SidebarContentProps {
  export type Render = RenderProps<SidebarContentState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarContent} に渡す props です。
 */
export type SidebarContentProps = SidebarContentProps.Render &
  SidebarContentProps.SuruUI &
  SidebarContentProps.BaseUI &
  SidebarContentProps.HTML;

/**
 * サイドバーのスクロール領域です。
 *
 * {@link SidebarGroup} などの内容を配置します。
 */
export const SidebarContent: IComponent<SidebarContentProps> = function SuiSidebarContent(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_sidebar_content",
      },
    ],
    defaultTagName: "div",
  });
};

export { SidebarContent as Content };

export namespace Content {
  export type State = SidebarContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarContentProps.Render;

    export type SuruUI = SidebarContentProps.SuruUI;

    export type BaseUI = SidebarContentProps.BaseUI;

    export type HTML = SidebarContentProps.HTML;
  }
}

// Footer
// ------

/**
 * {@link SidebarFooter} の状態です。
 */
export type SidebarFooterState = {};

export namespace SidebarFooterProps {
  export type Render = RenderProps<SidebarFooterState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarFooter} に渡す props です。
 */
export type SidebarFooterProps = SidebarFooterProps.Render &
  SidebarFooterProps.SuruUI &
  SidebarFooterProps.BaseUI &
  SidebarFooterProps.HTML;

/**
 * サイドバー下部に固定される領域です。
 *
 * ユーザーメニューなどを配置します。
 */
export const SidebarFooter: IComponent<SidebarFooterProps> = function SuiSidebarFooter(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_sidebar_footer",
      },
    ],
    defaultTagName: "div",
  });
};

export { SidebarFooter as Footer };

export namespace Footer {
  export type State = SidebarFooterState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarFooterProps.Render;

    export type SuruUI = SidebarFooterProps.SuruUI;

    export type BaseUI = SidebarFooterProps.BaseUI;

    export type HTML = SidebarFooterProps.HTML;
  }
}

// Group
// -----

/**
 * {@link SidebarGroup} の状態です。
 */
export type SidebarGroupState = {};

export namespace SidebarGroupProps {
  export type Render = RenderProps<SidebarGroupState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarGroup} に渡す props です。
 */
export type SidebarGroupProps = SidebarGroupProps.Render &
  SidebarGroupProps.SuruUI &
  SidebarGroupProps.BaseUI &
  SidebarGroupProps.HTML;

/**
 * サイドバー内のセクションです。
 *
 * 子要素には {@link SidebarGroupLabel} と {@link SidebarGroupContent} を配置します。
 */
export const SidebarGroup: IComponent<SidebarGroupProps> = function SuiSidebarGroup(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_sidebar_group",
      },
    ],
    defaultTagName: "div",
  });
};

export { SidebarGroup as Group };

export namespace Group {
  export type State = SidebarGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarGroupProps.Render;

    export type SuruUI = SidebarGroupProps.SuruUI;

    export type BaseUI = SidebarGroupProps.BaseUI;

    export type HTML = SidebarGroupProps.HTML;
  }
}

// GroupLabel
// ----------

/**
 * {@link SidebarGroupLabel} の状態です。
 */
export type SidebarGroupLabelState = {};

export namespace SidebarGroupLabelProps {
  export type Render = RenderProps<SidebarGroupLabelState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarGroupLabel} に渡す props です。
 */
export type SidebarGroupLabelProps = SidebarGroupLabelProps.Render &
  SidebarGroupLabelProps.SuruUI &
  SidebarGroupLabelProps.BaseUI &
  SidebarGroupLabelProps.HTML;

/**
 * グループのラベルです。
 */
export const SidebarGroupLabel: IComponent<SidebarGroupLabelProps> = function SuiSidebarGroupLabel(
  props,
) {
  return useRender({
    props: [
      props,
      {
        className: "sui_sidebar_group_label",
      },
    ],
    defaultTagName: "div",
  });
};

export { SidebarGroupLabel as GroupLabel };

export namespace GroupLabel {
  export type State = SidebarGroupLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarGroupLabelProps.Render;

    export type SuruUI = SidebarGroupLabelProps.SuruUI;

    export type BaseUI = SidebarGroupLabelProps.BaseUI;

    export type HTML = SidebarGroupLabelProps.HTML;
  }
}

// GroupContent
// ------------

/**
 * {@link SidebarGroupContent} の状態です。
 */
export type SidebarGroupContentState = {};

export namespace SidebarGroupContentProps {
  export type Render = RenderProps<SidebarGroupContentState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarGroupContent} に渡す props です。
 */
export type SidebarGroupContentProps = SidebarGroupContentProps.Render &
  SidebarGroupContentProps.SuruUI &
  SidebarGroupContentProps.BaseUI &
  SidebarGroupContentProps.HTML;

/**
 * グループの内容です。
 *
 * ナビゲーションの項目などを配置します。
 */
export const SidebarGroupContent: IComponent<SidebarGroupContentProps> =
  function SuiSidebarGroupContent(props) {
    return useRender({
      props: [
        props,
        {
          className: "sui_sidebar_group_content",
        },
      ],
      defaultTagName: "div",
    });
  };

export { SidebarGroupContent as GroupContent };

export namespace GroupContent {
  export type State = SidebarGroupContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarGroupContentProps.Render;

    export type SuruUI = SidebarGroupContentProps.SuruUI;

    export type BaseUI = SidebarGroupContentProps.BaseUI;

    export type HTML = SidebarGroupContentProps.HTML;
  }
}

// Inset
// -----

/**
 * {@link SidebarInset} の状態です。
 */
export type SidebarInsetState = {};

export namespace SidebarInsetProps {
  export type Render = RenderProps<SidebarInsetState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"main", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarInset} に渡す props です。
 */
export type SidebarInsetProps = SidebarInsetProps.Render &
  SidebarInsetProps.SuruUI &
  SidebarInsetProps.BaseUI &
  SidebarInsetProps.HTML;

/**
 * メインコンテンツの領域です。
 *
 * {@link SidebarRoot} に `variant="inset"` を指定すると、押し込まれた外観になります。
 */
export const SidebarInset: IComponent<SidebarInsetProps> = function SuiSidebarInset(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_sidebar_inset",
      },
    ],
    defaultTagName: "main",
  });
};

export { SidebarInset as Inset };

export namespace Inset {
  export type State = SidebarInsetState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarInsetProps.Render;

    export type SuruUI = SidebarInsetProps.SuruUI;

    export type BaseUI = SidebarInsetProps.BaseUI;

    export type HTML = SidebarInsetProps.HTML;
  }
}

// Rail
// ----

/**
 * {@link SidebarRail} の状態です。
 */
export type SidebarRailState = {
  /**
   * サイドバーの開閉状態です。
   */
  readonly state: SidebarOpenState;
};

export namespace SidebarRailProps {
  export type Render = RenderProps<SidebarRailState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"button", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarRail} に渡す props です。
 */
export type SidebarRailProps = SidebarRailProps.Render &
  SidebarRailProps.SuruUI &
  SidebarRailProps.BaseUI &
  SidebarRailProps.HTML;

/**
 * サイドバーの内側の端で開閉を切り替える細い帯です。
 *
 * {@link SidebarRoot} の内側に配置します。折りたたみ不可のサイドバーでは表示されません。
 */
export const SidebarRail: IComponent<SidebarRailProps> = function SuiSidebarRail(props) {
  const ctx = useSuiSidebarContext();
  const {
    type = "button",
    onClick,
    children,
    "aria-label": ariaLabel = "サイドバーを切り替える",
    ...otherButtonProps
  } = props;
  const handleOnClick: NonNullable<SidebarRailProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && ctx.collapsible !== "none") {
      ctx.toggle();
    }
  };
  const renderState = React.useMemo<SidebarRailState>(() => ({ state: ctx.state }), [ctx.state]);

  if (ctx.collapsible === "none") {
    return null;
  }

  return useRender({
    props: [
      otherButtonProps,
      {
        type,
        onClick: handleOnClick,
        children,
        className: cn<SidebarRailState>(
          "sui_sidebar_rail",
          (state) => state.state === "expanded" && "sui_sidebar_rail-expanded",
          (state) => state.state === "collapsed" && "sui_sidebar_rail-collapsed",
        ),
        "aria-label": ariaLabel,
      },
    ],
    state: renderState,
    defaultTagName: "button",
  });
};

export { SidebarRail as Rail };

export namespace Rail {
  export type State = SidebarRailState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarRailProps.Render;

    export type SuruUI = SidebarRailProps.SuruUI;

    export type BaseUI = SidebarRailProps.BaseUI;

    export type HTML = SidebarRailProps.HTML;
  }
}

// Trigger
// -------

/**
 * {@link SidebarTrigger} の状態です。
 */
export type SidebarTriggerState = {
  /**
   * サイドバーの開閉状態です。
   */
  readonly state: SidebarOpenState;
};

export namespace SidebarTriggerProps {
  export type Render = RenderProps<SidebarTriggerState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"button", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarTrigger} に渡す props です。
 */
export type SidebarTriggerProps = SidebarTriggerProps.Render &
  SidebarTriggerProps.SuruUI &
  SidebarTriggerProps.BaseUI &
  SidebarTriggerProps.HTML;

/**
 * サイドバーの開閉を切り替えるボタンです。
 *
 * 子要素を省略すると既定のアイコンが表示されます。
 */
export const SidebarTrigger: IComponent<SidebarTriggerProps> = function SuiSidebarTrigger(props) {
  const ctx = useSuiSidebarContext();
  const {
    type = "button",
    onClick,
    children,
    disabled,
    "aria-label": ariaLabelProp,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherButtonProps
  } = props;
  const triggerDisabled = disabled ?? ctx.collapsible === "none";
  const ariaLabel =
    ariaLabelProp ?? (children === undefined ? "サイドバーを切り替える" : undefined);
  const handleOnClick: NonNullable<SidebarTriggerProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !triggerDisabled) {
      ctx.toggle();
    }
  };
  const renderState = React.useMemo<SidebarTriggerState>(() => ({ state: ctx.state }), [ctx.state]);

  return useRender({
    props: [
      otherButtonProps,
      {
        type,
        onClick: handleOnClick,
        children: children ?? <DefaultTriggerIcon />,
        disabled: triggerDisabled || undefined,
        className: cn<SidebarTriggerState>(
          "sui_sidebar_trigger",
          (state) => `sui_sidebar_trigger-${state.state}`,
        ),
        "aria-label": ariaLabel,
        "aria-expanded": ctx.open,
        "data-scope": dataScope,
      },
    ],
    state: renderState,
    defaultTagName: "button",
  });
};

export { SidebarTrigger as Trigger };

export namespace Trigger {
  export type State = SidebarTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarTriggerProps.Render;

    export type SuruUI = SidebarTriggerProps.SuruUI;

    export type BaseUI = SidebarTriggerProps.BaseUI;

    export type HTML = SidebarTriggerProps.HTML;
  }
}

const DefaultTriggerIcon: IComponent = function SuiDefaultTriggerIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      focusable="false"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" rx="2" width="18" height="18" />
      <path d="M9 3v18" />
    </svg>
  );
};
