import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type SidebarContext,
  type SidebarOpenState,
  type SidebarContextState,
  SidebarContext as SidebarContextProvider,
  useSidebarContext,
} from "./sidebar.root.context.js";

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
export type SidebarRootState = Override<
  SidebarContextState,
  {
    /**
     * 折りたたみの方法です。
     */
    readonly collapsible: SidebarRootCollapsible;

    /**
     * 配置する辺です。
     */
    readonly side: SidebarRootSide;

    /**
     * 外観バリアントです。
     */
    readonly variant: SidebarRootVariant;
  }
>;

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

export type ISidebarRoot = IComponent<SidebarRootProps>;

/**
 * サイドバー本体の要素です。
 *
 * 子要素には {@link SidebarHeader}、{@link SidebarContent}、{@link SidebarFooter}、
 * {@link SidebarGroup}、{@link SidebarRail} を配置します。
 */
export const SidebarRoot: ISidebarRoot = function SuiSidebarRoot(props) {
  const ctx = useSidebarContext();
  const {
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherAsideProps
  } = props;
  const state: SidebarOpenState = ctx.open ? "expanded" : "collapsed";
  const renderState = React.useMemo<SidebarRootState>(
    () => ({ open: ctx.open, side, state, variant, collapsible }),
    [collapsible, ctx.open, side, state, variant],
  );
  // collapsible・side・variant は Root の内側でだけ確定するため、子孫へ伝えます。
  const childCtx = React.useMemo<SidebarContext>(
    () => ({ ...ctx, side, variant, collapsible }),
    [collapsible, ctx, side, variant],
  );

  const element = useRender({
    props: [
      otherAsideProps,
      {
        className: cn<SidebarRootState>(
          "sui_sidebar",
          (state) => `sui_sidebar-side_${state.side}`,
          (state) => `sui_sidebar-variant_${state.variant}`,
          (state) => `sui_sidebar-collapsible_${state.collapsible}`,
          (state) => `sui_sidebar-${state.state}`,
          (state) => state.open && "sui_sidebar-open",
        ),
        "data-scope": dataScope,
      },
    ],
    state: renderState,
    defaultTagName: "aside",
  });

  return <SidebarContextProvider value={childCtx}>{element}</SidebarContextProvider>;
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
