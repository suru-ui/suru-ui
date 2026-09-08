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

/**
 * {@link SidebarProvider} に渡すプロパティーです。
 */
export type SidebarProviderProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<SidebarProviderState> & {
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
    setOpen(!open);
  }, [open, setOpen]);
  const openStateValue: SidebarOpenState = open ? "expanded" : "collapsed";
  const renderState = React.useMemo<SidebarProviderState>(
    () => ({ state: openStateValue }),
    [openStateValue],
  );
  const ctx = React.useMemo<SidebarContext>(
    () => ({ open, setOpen, state: openStateValue, toggle }),
    [open, openStateValue, setOpen, toggle],
  );

  const element = useRender({
    defaultTagName: "div",
    state: renderState,
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
  });

  return <SidebarContext value={ctx}>{element}</SidebarContext>;
};

export { SidebarProvider as Provider };

export namespace Provider {
  /**
   * {@link SidebarProviderState}
   */
  export type State = SidebarProviderState;

  /**
   * {@link SidebarProviderProps}
   */
  export type Props = SidebarProviderProps;
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

/**
 * {@link SidebarRoot} に渡すプロパティーです。
 */
export type SidebarRootProps = Omit<React.ComponentProps<"aside">, keyof RenderProps> &
  RenderProps<SidebarRootState> & {
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
    () => ({ collapsible, open, side, state, variant }),
    [collapsible, open, side, state, variant],
  );

  return useRender({
    defaultTagName: "aside",
    state: renderState,
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
  });
};

export { SidebarRoot as Root };

export namespace Root {
  /**
   * {@link SidebarRootState}
   */
  export type State = SidebarRootState;

  /**
   * {@link SidebarRootProps}
   */
  export type Props = SidebarRootProps;

  /**
   * {@link SidebarRootCollapsible}
   */
  export type Collapsible = SidebarRootCollapsible;

  /**
   * {@link SidebarRootSide}
   */
  export type Side = SidebarRootSide;

  /**
   * {@link SidebarRootVariant}
   */
  export type Variant = SidebarRootVariant;
}

// Header
// ------

/**
 * {@link SidebarHeader} の状態です。
 */
export type SidebarHeaderState = {};

/**
 * {@link SidebarHeader} に渡すプロパティーです。
 */
export type SidebarHeaderProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<SidebarHeaderState>;

/**
 * サイドバー上部に固定される領域です。
 *
 * ブランドやワークスペースの切り替えなどを配置します。
 */
export const SidebarHeader: IComponent<SidebarHeaderProps> = function SuiSidebarHeader(props) {
  return useRender({
    defaultTagName: "div",
    props: [
      props,
      {
        className: "sui_sidebar_header",
      },
    ],
  });
};

export { SidebarHeader as Header };

export namespace Header {
  /**
   * {@link SidebarHeaderState}
   */
  export type State = SidebarHeaderState;

  /**
   * {@link SidebarHeaderProps}
   */
  export type Props = SidebarHeaderProps;
}

// Content
// -------

/**
 * {@link SidebarContent} の状態です。
 */
export type SidebarContentState = {};

/**
 * {@link SidebarContent} に渡すプロパティーです。
 */
export type SidebarContentProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<SidebarContentState>;

/**
 * サイドバーのスクロール領域です。
 *
 * {@link SidebarGroup} などの内容を配置します。
 */
export const SidebarContent: IComponent<SidebarContentProps> = function SuiSidebarContent(props) {
  return useRender({
    defaultTagName: "div",
    props: [
      props,
      {
        className: "sui_sidebar_content",
      },
    ],
  });
};

export { SidebarContent as Content };

export namespace Content {
  /**
   * {@link SidebarContentState}
   */
  export type State = SidebarContentState;

  /**
   * {@link SidebarContentProps}
   */
  export type Props = SidebarContentProps;
}

// Footer
// ------

/**
 * {@link SidebarFooter} の状態です。
 */
export type SidebarFooterState = {};

/**
 * {@link SidebarFooter} に渡すプロパティーです。
 */
export type SidebarFooterProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<SidebarFooterState>;

/**
 * サイドバー下部に固定される領域です。
 *
 * ユーザーメニューなどを配置します。
 */
export const SidebarFooter: IComponent<SidebarFooterProps> = function SuiSidebarFooter(props) {
  return useRender({
    defaultTagName: "div",
    props: [
      props,
      {
        className: "sui_sidebar_footer",
      },
    ],
  });
};

export { SidebarFooter as Footer };

export namespace Footer {
  /**
   * {@link SidebarFooterState}
   */
  export type State = SidebarFooterState;

  /**
   * {@link SidebarFooterProps}
   */
  export type Props = SidebarFooterProps;
}

// Group
// -----

/**
 * {@link SidebarGroup} の状態です。
 */
export type SidebarGroupState = {};

/**
 * {@link SidebarGroup} に渡すプロパティーです。
 */
export type SidebarGroupProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<SidebarGroupState>;

/**
 * サイドバー内のセクションです。
 *
 * 子要素には {@link SidebarGroupLabel} と {@link SidebarGroupContent} を配置します。
 */
export const SidebarGroup: IComponent<SidebarGroupProps> = function SuiSidebarGroup(props) {
  return useRender({
    defaultTagName: "div",
    props: [
      props,
      {
        className: "sui_sidebar_group",
      },
    ],
  });
};

export { SidebarGroup as Group };

export namespace Group {
  /**
   * {@link SidebarGroupState}
   */
  export type State = SidebarGroupState;

  /**
   * {@link SidebarGroupProps}
   */
  export type Props = SidebarGroupProps;
}

// GroupLabel
// ----------

/**
 * {@link SidebarGroupLabel} の状態です。
 */
export type SidebarGroupLabelState = {};

/**
 * {@link SidebarGroupLabel} に渡すプロパティーです。
 */
export type SidebarGroupLabelProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<SidebarGroupLabelState>;

/**
 * グループのラベルです。
 */
export const SidebarGroupLabel: IComponent<SidebarGroupLabelProps> = function SuiSidebarGroupLabel(
  props,
) {
  return useRender({
    defaultTagName: "div",
    props: [
      props,
      {
        className: "sui_sidebar_group_label",
      },
    ],
  });
};

export { SidebarGroupLabel as GroupLabel };

export namespace GroupLabel {
  /**
   * {@link SidebarGroupLabelState}
   */
  export type State = SidebarGroupLabelState;

  /**
   * {@link SidebarGroupLabelProps}
   */
  export type Props = SidebarGroupLabelProps;
}

// GroupContent
// ------------

/**
 * {@link SidebarGroupContent} の状態です。
 */
export type SidebarGroupContentState = {};

/**
 * {@link SidebarGroupContent} に渡すプロパティーです。
 */
export type SidebarGroupContentProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<SidebarGroupContentState>;

/**
 * グループの内容です。
 *
 * ナビゲーションの項目などを配置します。
 */
export const SidebarGroupContent: IComponent<SidebarGroupContentProps> =
  function SuiSidebarGroupContent(props) {
    return useRender({
      defaultTagName: "div",
      props: [
        props,
        {
          className: "sui_sidebar_group_content",
        },
      ],
    });
  };

export { SidebarGroupContent as GroupContent };

export namespace GroupContent {
  /**
   * {@link SidebarGroupContentState}
   */
  export type State = SidebarGroupContentState;

  /**
   * {@link SidebarGroupContentProps}
   */
  export type Props = SidebarGroupContentProps;
}

// Inset
// -----

/**
 * {@link SidebarInset} の状態です。
 */
export type SidebarInsetState = {};

/**
 * {@link SidebarInset} に渡すプロパティーです。
 */
export type SidebarInsetProps = Omit<React.ComponentProps<"main">, keyof RenderProps> &
  RenderProps<SidebarInsetState>;

/**
 * メインコンテンツの領域です。
 *
 * {@link SidebarRoot} に `variant="inset"` を指定すると、押し込まれた外観になります。
 */
export const SidebarInset: IComponent<SidebarInsetProps> = function SuiSidebarInset(props) {
  return useRender({
    defaultTagName: "main",
    props: [
      props,
      {
        className: "sui_sidebar_inset",
      },
    ],
  });
};

export { SidebarInset as Inset };

export namespace Inset {
  /**
   * {@link SidebarInsetState}
   */
  export type State = SidebarInsetState;

  /**
   * {@link SidebarInsetProps}
   */
  export type Props = SidebarInsetProps;
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

/**
 * {@link SidebarRail} に渡すプロパティーです。
 */
export type SidebarRailProps = Omit<React.ComponentProps<"button">, keyof RenderProps> &
  RenderProps<SidebarRailState>;

/**
 * サイドバーの内側の端で開閉を切り替える細い帯です。
 *
 * {@link SidebarRoot} の内側に配置します。折りたたみ不可のサイドバーでは表示されません。
 */
export const SidebarRail: IComponent<SidebarRailProps> = function SuiSidebarRail(props) {
  const ctx = useSuiSidebarContext();
  const { onClick, children, ...otherButtonProps } = props;
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      ctx.toggle();
    }
  };
  const renderState = React.useMemo<SidebarRailState>(() => ({ state: ctx.state }), [ctx.state]);

  return useRender({
    defaultTagName: "button",
    state: renderState,
    props: [
      otherButtonProps,
      {
        type: "button",
        "aria-label": "サイドバーを切り替える",
        onClick: handleOnClick,
        children,
        className: cn<SidebarRailState>(
          "sui_sidebar_rail",
          (state) => state.state === "expanded" && "sui_sidebar_rail-expanded",
          (state) => state.state === "collapsed" && "sui_sidebar_rail-collapsed",
        ),
      },
    ],
  });
};

export { SidebarRail as Rail };

export namespace Rail {
  /**
   * {@link SidebarRailState}
   */
  export type State = SidebarRailState;

  /**
   * {@link SidebarRailProps}
   */
  export type Props = SidebarRailProps;
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

/**
 * {@link SidebarTrigger} に渡すプロパティーです。
 */
export type SidebarTriggerProps = Omit<React.ComponentProps<"button">, keyof RenderProps> &
  RenderProps<SidebarTriggerState>;

/**
 * サイドバーの開閉を切り替えるボタンです。
 *
 * 子要素を省略すると既定のアイコンが表示されます。
 */
export const SidebarTrigger: IComponent<SidebarTriggerProps> = function SuiSidebarTrigger(props) {
  const ctx = useSuiSidebarContext();
  const {
    onClick,
    children,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherButtonProps
  } = props;
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      ctx.toggle();
    }
  };
  const renderState = React.useMemo<SidebarTriggerState>(() => ({ state: ctx.state }), [ctx.state]);

  return useRender({
    defaultTagName: "button",
    state: renderState,
    props: [
      otherButtonProps,
      {
        type: "button",
        onClick: handleOnClick,
        children: children ?? <DefaultTriggerIcon />,
        className: cn<SidebarTriggerState>(
          "sui_sidebar_trigger",
          (state) => `sui_sidebar_trigger-${state.state}`,
        ),
        ...(children === undefined ? { "aria-label": "サイドバーを切り替える" } : {}),
        "aria-expanded": ctx.open,
        "data-scope": dataScope,
      },
    ],
  });
};

export { SidebarTrigger as Trigger };

export namespace Trigger {
  /**
   * {@link SidebarTriggerState}
   */
  export type State = SidebarTriggerState;

  /**
   * {@link SidebarTriggerProps}
   */
  export type Props = SidebarTriggerProps;
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
