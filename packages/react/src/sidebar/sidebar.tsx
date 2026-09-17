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
} from "./sidebar.parts.js";

// Types
// -----

export type SidebarCollapsible = SidebarRootCollapsible;

export type SidebarSide = SidebarRootSide;

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
   * サイドバーの内容です。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
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
   * {@link SidebarContext} を読み取るフックです。
   */
  readonly useContext: IUseContext<SidebarContext>;
}

export const Sidebar: ISidebar = /*#__PURE__*/ Object.assign(
  function SuiSidebar(props: SidebarProps) {
    const api = useSidebarAPI(props);

    return <SidebarProvider {...api.getProviderProps()} />;
  },
  {
    Rail: SidebarRail,
    Root: SidebarRoot,
    Group: SidebarGroup,
    Inset: SidebarInset,
    Footer: SidebarFooter,
    Header: SidebarHeader,
    Content: SidebarContent,
    Trigger: SidebarTrigger,
    Provider: SidebarProvider,
    GroupLabel: SidebarGroupLabel,
    useContext: useSidebarContext,
    GroupContent: SidebarGroupContent,
  },
);

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
   * {@link SidebarSlotProps} です。
   */
  export type SlotProps = SidebarSlotProps;

  export type Context = SidebarContext;

  export type Collapsible = SidebarCollapsible;

  export type OpenState = SidebarOpenState;

  export type Side = SidebarSide;

  export type Variant = SidebarVariant;

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
}
