import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import { useControlled } from "@base-ui/utils/useControlled";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { type SidebarContextState, SidebarContext } from "../root/sidebar.root.context.js";

/**
 * {@link SidebarProvider} の状態です。
 */
export type SidebarProviderState = SidebarContextState;

export namespace SidebarProviderProps {
  export type Render = RenderProps<SidebarProviderState>;

  export type SuruUI = {
    /**
     * 初期の開閉状態を指定します。
     *
     * `open` を指定した場合は無視されます。
     *
     * @default true
     */
    defaultOpen?: boolean | undefined;

    /**
     * サイドバーの開閉状態が変化したときに呼ばれます。
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

export type ISidebarProvider = IComponent<SidebarProviderProps>;

/**
 * サイドバーとその内容を包むルート要素です。
 *
 * 子要素には {@link SidebarRoot}、{@link SidebarTrigger}、{@link SidebarInset} を配置します。
 */
export const SidebarProvider: ISidebarProvider = function SuiSidebarProvider(props) {
  const {
    open: openProp,
    defaultOpen = true,
    onOpenChange,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDivProps
  } = props;
  const [open, setOpenState] = useControlled<boolean>({
    name: "Sidebar",
    state: "open",
    default: defaultOpen,
    controlled: openProp,
  });
  const state = open ? "expanded" : "collapsed";
  const openRef = React.useRef(open);
  openRef.current = open;
  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      openRef.current = nextOpen;
      setOpenState(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [onOpenChange, setOpenState],
  );
  const toggle = React.useCallback(() => {
    setOpen(openProp === undefined ? !openRef.current : !openProp);
  }, [openProp, setOpen]);
  const renderState = React.useMemo<SidebarProviderState>(() => ({ open, state }), [open, state]);
  const ctx = React.useMemo<SidebarContext>(
    () => ({ open, state, toggle, setOpen }),
    [open, setOpen, state, toggle],
  );

  const element = useRender({
    props: [
      otherDivProps,
      {
        className: cn<SidebarProviderState>(
          "sui_sidebar_provider",
          (state) => `sui_sidebar_provider-${state.state}`,
          (state) => state.open && "sui_sidebar_provider-open",
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
