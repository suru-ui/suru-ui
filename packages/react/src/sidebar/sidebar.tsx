import * as React from "react";

import type { IComponent, IUseContext } from "../types.js";
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

// Types
// -----

/**
 * {@link SidebarRootCollapsible}
 */
export type SidebarCollapsible = SidebarRootCollapsible;

/**
 * {@link SidebarRootSide}
 */
export type SidebarSide = SidebarRootSide;

/**
 * {@link SidebarRootVariant}
 */
export type SidebarVariant = SidebarRootVariant;

/**
 * {@link Sidebar} が持つ状態です。
 */
export type SidebarState = SidebarProviderState;

/**
 * {@link Sidebar} の各パーツに渡す props です。
 */
export type SidebarSlotProps = {
  /**
   * {@link SidebarProvider} に渡す props です。
   */
  readonly provider?: Omit<SidebarProviderProps, "children"> | undefined;
};

/**
 * {@link Sidebar} に渡す props です。
 */
export type SidebarProps = Omit<SidebarProviderProps, "children"> & {
  /**
   * サイドバーとメインコンテンツです。
   */
  readonly children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   *
   * 各パーツの props が優先されます。
   */
  slotProps?: SidebarSlotProps | undefined;
};

// API
// ---

/**
 * {@link Sidebar} を構成する各パーツの props を作成するための API です。
 */
export interface SidebarAPI {
  /**
   * {@link SidebarProvider} に渡す props を取得します。
   */
  getProviderProps(): SidebarProviderProps;
}

interface IUseSidebarAPI {
  /**
   * {@link SidebarAPI} を作成します。
   *
   * @param props {@link Sidebar} の props です。
   * @returns サイドバーの API です
   */
  (props: SidebarProps): SidebarAPI;
}

/**
 * {@link SidebarAPI} を作成するフックです。
 */
export const useSidebarAPI: IUseSidebarAPI = function useSuiSidebarAPI(props) {
  const { slotProps: { provider: providerProps = {} } = {}, ...otherProviderProps } = props;

  return {
    getProviderProps() {
      return {
        ...otherProviderProps,
        ...providerProps,
      };
    },
  };
};

export { type SidebarAPI as API, useSidebarAPI as useAPI };

// Component
// ---------

/**
 * サイドバーを表示するコンポーネントです。
 *
 * 呼び出しは {@link Sidebar.Provider} と同じです。子要素には
 * {@link Sidebar.Root}、{@link Sidebar.Trigger}、{@link Sidebar.Inset} を配置します。
 */
interface ISidebar extends IComponent<SidebarProps> {
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
   * {@link useSidebarContext}
   */
  readonly useContext: IUseContext<SidebarContext>;
}

export const Sidebar: ISidebar = /*#__PURE__*/ Object.assign(
  function SuiSidebar(props: SidebarProps) {
    const api = useSidebarAPI(props);

    return <SidebarProvider {...api.getProviderProps()} />;
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
   * {@link SidebarState}
   */
  export type State = SidebarState;

  /**
   * {@link SidebarProps}
   */
  export type Props = SidebarProps;

  /**
   * {@link SidebarSlotProps}
   */
  export type SlotProps = SidebarSlotProps;

  /**
   * {@link SidebarContext}
   */
  export type Context = SidebarContext;

  /**
   * {@link SidebarCollapsible}
   */
  export type Collapsible = SidebarCollapsible;

  /**
   * {@link SidebarOpenState}
   */
  export type OpenState = SidebarOpenState;

  /**
   * {@link SidebarSide}
   */
  export type Side = SidebarSide;

  /**
   * {@link SidebarVariant}
   */
  export type Variant = SidebarVariant;

  /**
   * スクロール領域の状態やプロパティーをまとめた型名前空間です。
   */
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

  /**
   * 下部固定領域の状態やプロパティーをまとめた型名前空間です。
   */
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

  /**
   * グループの状態やプロパティーをまとめた型名前空間です。
   */
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

  /**
   * グループ内容の状態やプロパティーをまとめた型名前空間です。
   */
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

  /**
   * グループラベルの状態やプロパティーをまとめた型名前空間です。
   */
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

  /**
   * 上部固定領域の状態やプロパティーをまとめた型名前空間です。
   */
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

  /**
   * メインコンテンツ領域の状態やプロパティーをまとめた型名前空間です。
   */
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

  /**
   * プロバイダーの状態やプロパティーをまとめた型名前空間です。
   */
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

  /**
   * レールの状態やプロパティーをまとめた型名前空間です。
   */
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

  /**
   * 本体要素の状態やプロパティーをまとめた型名前空間です。
   */
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

  /**
   * トリガーの状態やプロパティーをまとめた型名前空間です。
   */
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
}
