import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { type SidebarOpenState, SidebarContext } from "./sidebar.context.js";

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
