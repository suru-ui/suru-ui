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
   * 折りたたみの方法です。
   *
   * {@link SidebarRoot} の内側ではその値が入ります。外側では `undefined` です。
   */
  readonly collapsible?: SidebarRootCollapsible | undefined;

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

export namespace SidebarProviderProps {
  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;

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
}

/**
 * {@link SidebarProvider} に渡すプロパティーです。
 */
export type SidebarProviderProps = SidebarProviderProps.Render &
  SidebarProviderProps.SuruUI &
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
  /**
   * {@link SidebarProviderState}
   */
  export type State = SidebarProviderState;

  /**
   * {@link SidebarProviderProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link SidebarProviderProps.HTML}
     */
    export type HTML = SidebarProviderProps.HTML;

    /**
     * {@link SidebarProviderProps.Render}
     */
    export type Render = SidebarProviderProps.Render;

    /**
     * {@link SidebarProviderProps.SuruUI}
     */
    export type SuruUI = SidebarProviderProps.SuruUI;
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
  export type HTML = Omit<React.ComponentProps<"aside">, keyof Render | keyof SuruUI>;

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
}

/**
 * {@link SidebarRoot} に渡すプロパティーです。
 */
export type SidebarRootProps = SidebarRootProps.Render &
  SidebarRootProps.SuruUI &
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
  /**
   * {@link SidebarRootState}
   */
  export type State = SidebarRootState;

  /**
   * {@link SidebarRootProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link SidebarRootProps.HTML}
     */
    export type HTML = SidebarRootProps.HTML;

    /**
     * {@link SidebarRootProps.Render}
     */
    export type Render = SidebarRootProps.Render;

    /**
     * {@link SidebarRootProps.SuruUI}
     */
    export type SuruUI = SidebarRootProps.SuruUI;
  }

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

export namespace SidebarHeaderProps {
  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<SidebarHeaderState>;

  export type SuruUI = {};
}

/**
 * {@link SidebarHeader} に渡すプロパティーです。
 */
export type SidebarHeaderProps = SidebarHeaderProps.Render &
  SidebarHeaderProps.SuruUI &
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
  /**
   * {@link SidebarHeaderState}
   */
  export type State = SidebarHeaderState;

  /**
   * {@link SidebarHeaderProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link SidebarHeaderProps.HTML}
     */
    export type HTML = SidebarHeaderProps.HTML;

    /**
     * {@link SidebarHeaderProps.Render}
     */
    export type Render = SidebarHeaderProps.Render;

    /**
     * {@link SidebarHeaderProps.SuruUI}
     */
    export type SuruUI = SidebarHeaderProps.SuruUI;
  }
}

// Content
// -------

/**
 * {@link SidebarContent} の状態です。
 */
export type SidebarContentState = {};

export namespace SidebarContentProps {
  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<SidebarContentState>;

  export type SuruUI = {};
}

/**
 * {@link SidebarContent} に渡すプロパティーです。
 */
export type SidebarContentProps = SidebarContentProps.Render &
  SidebarContentProps.SuruUI &
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
  /**
   * {@link SidebarContentState}
   */
  export type State = SidebarContentState;

  /**
   * {@link SidebarContentProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link SidebarContentProps.HTML}
     */
    export type HTML = SidebarContentProps.HTML;

    /**
     * {@link SidebarContentProps.Render}
     */
    export type Render = SidebarContentProps.Render;

    /**
     * {@link SidebarContentProps.SuruUI}
     */
    export type SuruUI = SidebarContentProps.SuruUI;
  }
}

// Footer
// ------

/**
 * {@link SidebarFooter} の状態です。
 */
export type SidebarFooterState = {};

export namespace SidebarFooterProps {
  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<SidebarFooterState>;

  export type SuruUI = {};
}

/**
 * {@link SidebarFooter} に渡すプロパティーです。
 */
export type SidebarFooterProps = SidebarFooterProps.Render &
  SidebarFooterProps.SuruUI &
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
  /**
   * {@link SidebarFooterState}
   */
  export type State = SidebarFooterState;

  /**
   * {@link SidebarFooterProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link SidebarFooterProps.HTML}
     */
    export type HTML = SidebarFooterProps.HTML;

    /**
     * {@link SidebarFooterProps.Render}
     */
    export type Render = SidebarFooterProps.Render;

    /**
     * {@link SidebarFooterProps.SuruUI}
     */
    export type SuruUI = SidebarFooterProps.SuruUI;
  }
}

// Group
// -----

/**
 * {@link SidebarGroup} の状態です。
 */
export type SidebarGroupState = {};

export namespace SidebarGroupProps {
  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<SidebarGroupState>;

  export type SuruUI = {};
}

/**
 * {@link SidebarGroup} に渡すプロパティーです。
 */
export type SidebarGroupProps = SidebarGroupProps.Render &
  SidebarGroupProps.SuruUI &
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
  /**
   * {@link SidebarGroupState}
   */
  export type State = SidebarGroupState;

  /**
   * {@link SidebarGroupProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link SidebarGroupProps.HTML}
     */
    export type HTML = SidebarGroupProps.HTML;

    /**
     * {@link SidebarGroupProps.Render}
     */
    export type Render = SidebarGroupProps.Render;

    /**
     * {@link SidebarGroupProps.SuruUI}
     */
    export type SuruUI = SidebarGroupProps.SuruUI;
  }
}

// GroupLabel
// ----------

/**
 * {@link SidebarGroupLabel} の状態です。
 */
export type SidebarGroupLabelState = {};

export namespace SidebarGroupLabelProps {
  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<SidebarGroupLabelState>;

  export type SuruUI = {};
}

/**
 * {@link SidebarGroupLabel} に渡すプロパティーです。
 */
export type SidebarGroupLabelProps = SidebarGroupLabelProps.Render &
  SidebarGroupLabelProps.SuruUI &
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
  /**
   * {@link SidebarGroupLabelState}
   */
  export type State = SidebarGroupLabelState;

  /**
   * {@link SidebarGroupLabelProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link SidebarGroupLabelProps.HTML}
     */
    export type HTML = SidebarGroupLabelProps.HTML;

    /**
     * {@link SidebarGroupLabelProps.Render}
     */
    export type Render = SidebarGroupLabelProps.Render;

    /**
     * {@link SidebarGroupLabelProps.SuruUI}
     */
    export type SuruUI = SidebarGroupLabelProps.SuruUI;
  }
}

// GroupContent
// ------------

/**
 * {@link SidebarGroupContent} の状態です。
 */
export type SidebarGroupContentState = {};

export namespace SidebarGroupContentProps {
  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<SidebarGroupContentState>;

  export type SuruUI = {};
}

/**
 * {@link SidebarGroupContent} に渡すプロパティーです。
 */
export type SidebarGroupContentProps = SidebarGroupContentProps.Render &
  SidebarGroupContentProps.SuruUI &
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
  /**
   * {@link SidebarGroupContentState}
   */
  export type State = SidebarGroupContentState;

  /**
   * {@link SidebarGroupContentProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link SidebarGroupContentProps.HTML}
     */
    export type HTML = SidebarGroupContentProps.HTML;

    /**
     * {@link SidebarGroupContentProps.Render}
     */
    export type Render = SidebarGroupContentProps.Render;

    /**
     * {@link SidebarGroupContentProps.SuruUI}
     */
    export type SuruUI = SidebarGroupContentProps.SuruUI;
  }
}

// Inset
// -----

/**
 * {@link SidebarInset} の状態です。
 */
export type SidebarInsetState = {};

export namespace SidebarInsetProps {
  export type HTML = Omit<React.ComponentProps<"main">, keyof Render>;

  export type Render = RenderProps<SidebarInsetState>;

  export type SuruUI = {};
}

/**
 * {@link SidebarInset} に渡すプロパティーです。
 */
export type SidebarInsetProps = SidebarInsetProps.Render &
  SidebarInsetProps.SuruUI &
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
  /**
   * {@link SidebarInsetState}
   */
  export type State = SidebarInsetState;

  /**
   * {@link SidebarInsetProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link SidebarInsetProps.HTML}
     */
    export type HTML = SidebarInsetProps.HTML;

    /**
     * {@link SidebarInsetProps.Render}
     */
    export type Render = SidebarInsetProps.Render;

    /**
     * {@link SidebarInsetProps.SuruUI}
     */
    export type SuruUI = SidebarInsetProps.SuruUI;
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
  export type HTML = Omit<React.ComponentProps<"button">, keyof Render>;

  export type Render = RenderProps<SidebarRailState>;

  export type SuruUI = {};
}

/**
 * {@link SidebarRail} に渡すプロパティーです。
 */
export type SidebarRailProps = SidebarRailProps.Render &
  SidebarRailProps.SuruUI &
  SidebarRailProps.HTML;

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
        type: "button",
        onClick: handleOnClick,
        children,
        className: cn<SidebarRailState>(
          "sui_sidebar_rail",
          (state) => state.state === "expanded" && "sui_sidebar_rail-expanded",
          (state) => state.state === "collapsed" && "sui_sidebar_rail-collapsed",
        ),
        "aria-label": "サイドバーを切り替える",
      },
    ],
    state: renderState,
    defaultTagName: "button",
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
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link SidebarRailProps.HTML}
     */
    export type HTML = SidebarRailProps.HTML;

    /**
     * {@link SidebarRailProps.Render}
     */
    export type Render = SidebarRailProps.Render;

    /**
     * {@link SidebarRailProps.SuruUI}
     */
    export type SuruUI = SidebarRailProps.SuruUI;
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
  export type HTML = Omit<React.ComponentProps<"button">, keyof Render>;

  export type Render = RenderProps<SidebarTriggerState>;

  export type SuruUI = {};
}

/**
 * {@link SidebarTrigger} に渡すプロパティーです。
 */
export type SidebarTriggerProps = SidebarTriggerProps.Render &
  SidebarTriggerProps.SuruUI &
  SidebarTriggerProps.HTML;

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
    disabled,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherButtonProps
  } = props;
  const triggerDisabled = disabled ?? ctx.collapsible === "none";
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        type: "button",
        onClick: handleOnClick,
        children: children ?? <DefaultTriggerIcon />,
        disabled: triggerDisabled || undefined,
        className: cn<SidebarTriggerState>(
          "sui_sidebar_trigger",
          (state) => `sui_sidebar_trigger-${state.state}`,
        ),
        ...(children === undefined ? { "aria-label": "サイドバーを切り替える" } : {}),
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
  /**
   * {@link SidebarTriggerState}
   */
  export type State = SidebarTriggerState;

  /**
   * {@link SidebarTriggerProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    /**
     * {@link SidebarTriggerProps.HTML}
     */
    export type HTML = SidebarTriggerProps.HTML;

    /**
     * {@link SidebarTriggerProps.Render}
     */
    export type Render = SidebarTriggerProps.Render;

    /**
     * {@link SidebarTriggerProps.SuruUI}
     */
    export type SuruUI = SidebarTriggerProps.SuruUI;
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
