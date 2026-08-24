import * as React from "react";

import type { IComponent, IUseContext } from "../../types.js";
import {
  type SidebarContext,
  type SidebarRootSide,
  type SidebarOpenState,
  type SidebarRailProps,
  type SidebarRailState,
  type SidebarRootProps,
  type SidebarRootState,
  type SidebarGroupProps,
  type SidebarGroupState,
  type SidebarInsetProps,
  type SidebarInsetState,
  type SidebarFooterProps,
  type SidebarFooterState,
  type SidebarHeaderProps,
  type SidebarHeaderState,
  type SidebarRootVariant,
  type SidebarContentProps,
  type SidebarContentState,
  type SidebarTriggerProps,
  type SidebarTriggerState,
  type SidebarProviderProps,
  type SidebarProviderState,
  type SidebarGroupLabelProps,
  type SidebarGroupLabelState,
  type SidebarRootCollapsible,
  type SidebarGroupContentProps,
  type SidebarGroupContentState,
  SidebarRail,
  SidebarRoot,
  SidebarGroup,
  SidebarInset,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarProvider,
  SidebarGroupLabel,
  useSidebarContext,
  SidebarGroupContent,
} from "./sidebar.parts.jsx";

/**
 * {@link SidebarRootCollapsible} です。
 */
export type SidebarCollapsible = SidebarRootCollapsible;

/**
 * {@link SidebarRootSide} です。
 */
export type SidebarSide = SidebarRootSide;

/**
 * {@link SidebarRootVariant} です。
 */
export type SidebarVariant = SidebarRootVariant;

/**
 * {@link Sidebar} の状態です。
 */
export type SidebarState = SidebarRootState;

/**
 * {@link Sidebar} コンポーネントのプロパティーです。
 */
export type SidebarProps = Omit<SidebarProviderProps, "children"> & {
  /**
   * サイドバーとメインコンテンツです。
   */
  readonly children?: React.ReactNode | undefined;
};

/**
 * サイドバーを表示するコンポーネントです。
 *
 * 呼び出しは {@link Sidebar.Provider} と同じです。子要素には
 * {@link Sidebar.Root}、{@link Sidebar.Trigger}、{@link Sidebar.Inset} を配置します。
 */
interface SidebarType extends IComponent<SidebarProps> {
  /**
   * サイドバーのスクロール領域です。
   */
  readonly Content: IComponent<SidebarContentProps>;

  /**
   * サイドバー下部に固定される領域です。
   */
  readonly Footer: IComponent<SidebarFooterProps>;

  /**
   * サイドバー内のセクションです。
   */
  readonly Group: IComponent<SidebarGroupProps>;

  /**
   * グループの内容です。
   */
  readonly GroupContent: IComponent<SidebarGroupContentProps>;

  /**
   * グループのラベルです。
   */
  readonly GroupLabel: IComponent<SidebarGroupLabelProps>;

  /**
   * サイドバー上部に固定される領域です。
   */
  readonly Header: IComponent<SidebarHeaderProps>;

  /**
   * メインコンテンツの領域です。
   */
  readonly Inset: IComponent<SidebarInsetProps>;

  /**
   * サイドバーとその内容を包むルート要素です。
   */
  readonly Provider: IComponent<SidebarProviderProps>;

  /**
   * サイドバーの内側の端で開閉を切り替える細い帯です。
   */
  readonly Rail: IComponent<SidebarRailProps>;

  /**
   * サイドバー本体の要素です。
   */
  readonly Root: IComponent<SidebarRootProps>;

  /**
   * サイドバーの開閉を切り替えるボタンです。
   */
  readonly Trigger: IComponent<SidebarTriggerProps>;

  /**
   * {@link useSidebarContext} です。
   */
  readonly useContext: IUseContext<SidebarContext>;
}

export const Sidebar: SidebarType = /*#__PURE__*/ Object.assign(
  function SuiSidebar(props: SidebarProps) {
    return <SidebarProvider {...props} />;
  },
  {
    Content: SidebarContent,
    Footer: SidebarFooter,
    Group: SidebarGroup,
    GroupContent: SidebarGroupContent,
    GroupLabel: SidebarGroupLabel,
    Header: SidebarHeader,
    Inset: SidebarInset,
    Provider: SidebarProvider,
    Rail: SidebarRail,
    Root: SidebarRoot,
    Trigger: SidebarTrigger,
    useContext: useSidebarContext,
  },
);

/**
 * {@link Sidebar} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Sidebar {
  /**
   * {@link SidebarState} です。
   */
  export type State = SidebarState;

  /**
   * {@link SidebarProps} です。
   */
  export type Props = SidebarProps;

  /**
   * {@link SidebarContext} です。
   */
  export type Context = SidebarContext;

  /**
   * {@link SidebarCollapsible} です。
   */
  export type Collapsible = SidebarCollapsible;

  /**
   * {@link SidebarOpenState} です。
   */
  export type OpenState = SidebarOpenState;

  /**
   * {@link SidebarSide} です。
   */
  export type Side = SidebarSide;

  /**
   * {@link SidebarVariant} です。
   */
  export type Variant = SidebarVariant;

  /**
   * スクロール領域の状態やプロパティーをまとめた型名前空間です。
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
   * 下部固定領域の状態やプロパティーをまとめた型名前空間です。
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
   * グループの状態やプロパティーをまとめた型名前空間です。
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
   * グループ内容の状態やプロパティーをまとめた型名前空間です。
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
   * グループラベルの状態やプロパティーをまとめた型名前空間です。
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
   * 上部固定領域の状態やプロパティーをまとめた型名前空間です。
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
   * メインコンテンツ領域の状態やプロパティーをまとめた型名前空間です。
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
   * プロバイダーの状態やプロパティーをまとめた型名前空間です。
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
   * レールの状態やプロパティーをまとめた型名前空間です。
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
   * 本体要素の状態やプロパティーをまとめた型名前空間です。
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
   * トリガーの状態やプロパティーをまとめた型名前空間です。
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
}
