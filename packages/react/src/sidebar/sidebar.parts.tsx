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
  const context = React.use(SidebarContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "SidebarContext",
      providerName: "SidebarProvider",
    });
  }

  return context;
}

/**
 * {@link SidebarContext} を読み取るフックです。
 */
export const useSidebarContext: IUseContext<SidebarContext> = useSuiSidebarContext;

/**
 * {@link SidebarContext} です。
 */
export type Context = SidebarContext;

/**
 * {@link SidebarContext} です。
 */
export const Context: React.Context<Context | null> = SidebarContext;

/**
 * {@link useSidebarContext} です。
 */
export const useContext: IUseContext<Context> = useSidebarContext;

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
  const { ref, defaultOpen = true, open: openProp, onOpenChange, className, ...otherProps } = props;
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
  const context = React.useMemo<SidebarContext>(
    () => ({ open, setOpen, state: openStateValue, toggle }),
    [open, openStateValue, setOpen, toggle],
  );

  const element = useRender({
    defaultTagName: "div",
    ref,
    state: renderState,
    props: {
      ...otherProps,
      className: cn(className, "sui_sidebar_provider"),
      "data-open": open,
      "data-state": openStateValue,
    },
  });

  return <Context value={context}>{element}</Context>;
};

/**
 * {@link SidebarProvider} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Provider {
  /**
   * {@link SidebarProviderState} です。
   */
  export type State = SidebarProviderState;

  /**
   * {@link SidebarProviderProps} です。
   */
  export type Props = SidebarProviderProps;
}

/**
 * {@link SidebarProvider} です。
 */
export const Provider: IComponent<Provider.Props> = SidebarProvider;

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
  const group = useSuiSidebarContext(true);
  const {
    ref,
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    ...otherProps
  } = props;
  const open = group?.open ?? true;
  const state: SidebarOpenState = open ? "expanded" : "collapsed";
  const renderState = React.useMemo<SidebarRootState>(
    () => ({ collapsible, open, side, state, variant }),
    [collapsible, open, side, state, variant],
  );

  return useRender({
    defaultTagName: "aside",
    ref,
    state: renderState,
    props: {
      ...otherProps,
      className: cn(
        className,
        "sui_sidebar",
        `sui_sidebar-side_${side}`,
        `sui_sidebar-variant_${variant}`,
        `sui_sidebar-collapsible_${collapsible}`,
      ),
      "data-collapsible": collapsible,
      "data-open": open,
      "data-side": side,
      "data-state": state,
      "data-variant": variant,
    },
  });
};

/**
 * {@link SidebarRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link SidebarRootState} です。
   */
  export type State = SidebarRootState;

  /**
   * {@link SidebarRootProps} です。
   */
  export type Props = SidebarRootProps;

  /**
   * {@link SidebarRootCollapsible} です。
   */
  export type Collapsible = SidebarRootCollapsible;

  /**
   * {@link SidebarRootSide} です。
   */
  export type Side = SidebarRootSide;

  /**
   * {@link SidebarRootVariant} です。
   */
  export type Variant = SidebarRootVariant;
}

/**
 * {@link SidebarRoot} です。
 */
export const Root: IComponent<Root.Props> = SidebarRoot;

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

/**
 * {@link SidebarHeader} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Header {
  /**
   * {@link SidebarHeaderState} です。
   */
  export type State = SidebarHeaderState;

  /**
   * {@link SidebarHeaderProps} です。
   */
  export type Props = SidebarHeaderProps;
}

/**
 * {@link SidebarHeader} です。
 */
export const Header: IComponent<Header.Props> = SidebarHeader;

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

/**
 * {@link SidebarContent} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Content {
  /**
   * {@link SidebarContentState} です。
   */
  export type State = SidebarContentState;

  /**
   * {@link SidebarContentProps} です。
   */
  export type Props = SidebarContentProps;
}

/**
 * {@link SidebarContent} です。
 */
export const Content: IComponent<Content.Props> = SidebarContent;

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

/**
 * {@link SidebarFooter} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Footer {
  /**
   * {@link SidebarFooterState} です。
   */
  export type State = SidebarFooterState;

  /**
   * {@link SidebarFooterProps} です。
   */
  export type Props = SidebarFooterProps;
}

/**
 * {@link SidebarFooter} です。
 */
export const Footer: IComponent<Footer.Props> = SidebarFooter;

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

/**
 * {@link SidebarGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Group {
  /**
   * {@link SidebarGroupState} です。
   */
  export type State = SidebarGroupState;

  /**
   * {@link SidebarGroupProps} です。
   */
  export type Props = SidebarGroupProps;
}

/**
 * {@link SidebarGroup} です。
 */
export const Group: IComponent<Group.Props> = SidebarGroup;

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

/**
 * {@link SidebarGroupLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace GroupLabel {
  /**
   * {@link SidebarGroupLabelState} です。
   */
  export type State = SidebarGroupLabelState;

  /**
   * {@link SidebarGroupLabelProps} です。
   */
  export type Props = SidebarGroupLabelProps;
}

/**
 * {@link SidebarGroupLabel} です。
 */
export const GroupLabel: IComponent<GroupLabel.Props> = SidebarGroupLabel;

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

/**
 * {@link SidebarGroupContent} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace GroupContent {
  /**
   * {@link SidebarGroupContentState} です。
   */
  export type State = SidebarGroupContentState;

  /**
   * {@link SidebarGroupContentProps} です。
   */
  export type Props = SidebarGroupContentProps;
}

/**
 * {@link SidebarGroupContent} です。
 */
export const GroupContent: IComponent<GroupContent.Props> = SidebarGroupContent;

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

/**
 * {@link SidebarInset} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Inset {
  /**
   * {@link SidebarInsetState} です。
   */
  export type State = SidebarInsetState;

  /**
   * {@link SidebarInsetProps} です。
   */
  export type Props = SidebarInsetProps;
}

/**
 * {@link SidebarInset} です。
 */
export const Inset: IComponent<Inset.Props> = SidebarInset;

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
  const { state: openState, toggle } = useSuiSidebarContext();
  const { ref, onClick, children, className, ...otherProps } = props;
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      toggle();
    }
  };
  const renderState = React.useMemo<SidebarRailState>(() => ({ state: openState }), [openState]);

  return useRender({
    defaultTagName: "button",
    ref,
    state: renderState,
    props: [
      {
        type: "button",
        "aria-label": "サイドバーを切り替える",
        onClick: handleOnClick,
        className: cn(className, "sui_sidebar_rail"),
      },
      otherProps,
      { children },
    ],
  });
};

/**
 * {@link SidebarRail} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Rail {
  /**
   * {@link SidebarRailState} です。
   */
  export type State = SidebarRailState;

  /**
   * {@link SidebarRailProps} です。
   */
  export type Props = SidebarRailProps;
}

/**
 * {@link SidebarRail} です。
 */
export const Rail: IComponent<Rail.Props> = SidebarRail;

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
  const { open, state: openState, toggle } = useSuiSidebarContext();
  const { ref, onClick, children, className, ...otherProps } = props;
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      toggle();
    }
  };
  const renderState = React.useMemo<SidebarTriggerState>(() => ({ state: openState }), [openState]);

  return useRender({
    defaultTagName: "button",
    ref,
    state: renderState,
    props: [
      {
        type: "button",
        ...(children === undefined ? { "aria-label": "サイドバーを切り替える" } : {}),
        "aria-expanded": open,
        onClick: handleOnClick,
        className: cn(className, "sui_sidebar_trigger"),
      },
      otherProps,
      { children: children ?? <DefaultTriggerIcon /> },
    ],
  });
};

/**
 * {@link SidebarTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link SidebarTriggerState} です。
   */
  export type State = SidebarTriggerState;

  /**
   * {@link SidebarTriggerProps} です。
   */
  export type Props = SidebarTriggerProps;
}

/**
 * {@link SidebarTrigger} です。
 */
export const Trigger: IComponent<Trigger.Props> = SidebarTrigger;

function DefaultTriggerIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className="sui_sidebar_trigger_icon"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" rx="2" width="18" height="18" />
      <path d="M9 3v18" />
    </svg>
  );
}
