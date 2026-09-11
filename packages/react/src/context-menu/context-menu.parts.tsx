import { ContextMenu } from "@base-ui/react/context-menu";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { CheckIcon, ChevronRightIcon } from "../_icons.jsx";
import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import toReactNode from "../_to-react-node.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.jsx";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { Override, IComponent, IUseContext } from "../types.js";
import {
  isItemObject,
  isGroupObject,
  isLinkItemObject,
  isRadioItemObject,
  isSeparatorObject,
  isRadioGroupObject,
  isCheckboxItemObject,
} from "./_context-menu.jsx";

import "./context-menu.css";

// Context
// -------

/**
 * ポップアップと項目の角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
type ContextMenuContextRadius = "none" | Size;

/**
 * ポップアップと項目の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
type ContextMenuContextSize = Size;

/**
 * 項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
type ContextMenuContextVariant = Button.Root.Variant;

/**
 * {@link ContextMenuRoot} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuContext<TItem = any> = {
  /**
   * コンテキストメニューの項目です。
   */
  readonly items: readonly TItem[];

  /**
   * ポップアップに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * ポップアップと項目の角丸です。
   */
  readonly radius: ContextMenuContextRadius;

  /**
   * ポップアップと項目の大きさです。
   */
  readonly size: ContextMenuContextSize;

  /**
   * 項目の主な外観です。
   */
  readonly variant: ContextMenuContextVariant;
};

/**
 * コンテキストメニューのスタイルを子要素へ伝播するコンテキストです。
 */
export const ContextMenuContext: React.Context<ContextMenuContext | null> =
  React.createContext<ContextMenuContext | null>(null);

function useSuiContextMenuContext(optional?: false): ContextMenuContext;
function useSuiContextMenuContext(optional?: boolean): ContextMenuContext | null;
function useSuiContextMenuContext(optional?: boolean): ContextMenuContext | null {
  const ctx = React.use(ContextMenuContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ContextMenuContext",
      providerName: "ContextMenuRoot",
    });
  }

  return ctx;
}

/**
 * {@link ContextMenuContext} を読み取るフックです。
 */
export const useContextMenuContext: IUseContext<ContextMenuContext> = useSuiContextMenuContext;

export { ContextMenuContext as Context, useContextMenuContext as useContext };

export namespace Context {
  export type Radius = ContextMenuContextRadius;

  export type Size = ContextMenuContextSize;

  export type Variant = ContextMenuContextVariant;
}

// Root
// ----

/**
 * {@link ContextMenuRoot} を命令的に操作するためのオブジェクトです。
 */
export type ContextMenuRootActions = ContextMenu.Root.Actions;

/**
 * {@link ContextMenuRoot} の開閉状態を変更されるイベントの詳細です。
 */
export type ContextMenuRootChangeEventDetails = ContextMenu.Root.ChangeEventDetails;

/**
 * {@link ContextMenuRoot} の開閉状態が変更される理由です。
 */
export type ContextMenuRootChangeEventReason = ContextMenu.Root.ChangeEventReason;

/**
 * {@link ContextMenuRoot} の通常項目です。
 *
 * `label` を含み、その他のプロパティーは {@link ContextMenuItem} に渡されます。
 * `items` を指定した場合はサブメニューとして描画されます。
 */
export type ContextMenuRootActionItemObject = Omit<ContextMenuItemProps, "children" | "label"> & {
  /**
   * 子項目です。
   *
   * 指定した場合はサブメニューとして描画されます。
   */
  readonly items?: readonly ContextMenuRootItemObject[] | undefined;

  /**
   * 項目のラベルです。
   */
  readonly label: React.ReactNode;

  /**
   * 項目の種類です。
   *
   * - `"item"`: 通常項目
   * - `"submenu"`: サブメニュー
   */
  readonly type?: "item" | "submenu" | undefined;
};

/**
 * {@link ContextMenuRoot} のチェックボックス項目です。
 *
 * `label` を含み、その他のプロパティーは {@link ContextMenuCheckboxItem} に渡されます。
 */
export type ContextMenuRootCheckboxItemObject = Omit<
  ContextMenuCheckboxItemProps,
  "children" | "label"
> & {
  /**
   * 項目のラベルです。
   */
  readonly label: React.ReactNode;

  /**
   * 項目の種類です。
   *
   * - `"checkbox"`: チェックボックス項目
   */
  readonly type: "checkbox";
};

/**
 * {@link ContextMenuRoot} のグループです。
 *
 * `label` と `items` を含み、その他のプロパティーは {@link ContextMenuGroup} に渡されます。
 * `label` を指定した場合は {@link ContextMenuGroupLabel} として描画されます。
 * 子項目には {@link ContextMenuRootItemObject} を指定します。
 */
export type ContextMenuRootGroupObject = Omit<ContextMenuGroupProps, "children"> & {
  /**
   * 子項目です。
   */
  readonly items: readonly ContextMenuRootItemObject[];

  /**
   * グループのラベルです。
   *
   * 指定した場合は {@link ContextMenuGroupLabel} として描画されます。
   */
  readonly label?: React.ReactNode | undefined;

  /**
   * 項目の種類です。
   *
   * - `"group"`: グループ
   */
  readonly type: "group";
};

/**
 * {@link ContextMenuRoot} のリンク項目です。
 *
 * `label` を含み、その他のプロパティーは {@link ContextMenuLinkItem} に渡されます。
 */
export type ContextMenuRootLinkItemObject = Omit<ContextMenuLinkItemProps, "children" | "label"> & {
  /**
   * 項目のラベルです。
   */
  readonly label: React.ReactNode;

  /**
   * 項目の種類です。
   *
   * - `"link"`: リンク項目
   */
  readonly type: "link";
};

/**
 * {@link ContextMenuRoot} のラジオグループです。
 *
 * `items` を含み、その他のプロパティーは {@link ContextMenuRadioGroup} に渡されます。
 * 子項目には {@link ContextMenuRootRadioItemObject} を指定します。
 */
export type ContextMenuRootRadioGroupObject = Omit<ContextMenuRadioGroupProps, "children"> & {
  /**
   * ラジオ項目です。
   */
  readonly items: readonly ContextMenuRootRadioItemObject[];

  /**
   * 項目の種類です。
   *
   * - `"radio-group"`: ラジオグループ
   */
  readonly type: "radio-group";
};

/**
 * {@link ContextMenuRoot} のラジオ項目です。
 *
 * `label` と `value` を含み、その他のプロパティーは {@link ContextMenuRadioItem} に渡されます。
 * 単体では選択状態を保持できないため、`items` ではなく {@link ContextMenuRootRadioGroupObject} の子項目として指定します。
 */
export type ContextMenuRootRadioItemObject = Omit<
  ContextMenuRadioItemProps,
  "children" | "label"
> & {
  /**
   * 項目のラベルです。
   */
  readonly label: React.ReactNode;

  /**
   * 項目の種類です。
   *
   * - `"radio"`: ラジオ項目
   */
  readonly type: "radio";
};

/**
 * {@link ContextMenuRoot} の区切り線です。
 *
 * その他のプロパティーは {@link ContextMenuSeparator} に渡されます。
 */
export type ContextMenuRootSeparatorObject = Omit<ContextMenuSeparatorProps, "children"> & {
  /**
   * 項目の種類です。
   *
   * - `"separator"`: 区切り線
   */
  readonly type: "separator";
};

/**
 * {@link ContextMenuRoot} の各項目です。
 *
 * `type` によって通常項目、チェックボックス項目、グループ、リンク項目、ラジオ項目、ラジオグループ、区切り線を使い分けます。
 * `type` を省略した場合は通常項目として描画されます。
 */
export type ContextMenuRootItemObject =
  | ContextMenuRootActionItemObject
  | ContextMenuRootCheckboxItemObject
  | ContextMenuRootGroupObject
  | ContextMenuRootLinkItemObject
  | ContextMenuRootRadioGroupObject
  | ContextMenuRootRadioItemObject
  | ContextMenuRootSeparatorObject;

/**
 * コンテキストメニューの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ContextMenuRootRadius = "none" | Size;

/**
 * コンテキストメニューの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ContextMenuRootSize = Size;

/**
 * コンテキストメニューの項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ContextMenuRootVariant = Button.Root.Variant;

/**
 * {@link ContextMenuRoot} が持つ状態です。
 */
export type ContextMenuRootState = ContextMenu.Root.State;

export namespace ContextMenuRootProps {
  export type BaseUI<TItem = any> = Omit<
    React.ComponentProps<typeof ContextMenu.Root>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<ContextMenuRootState>;

  export type SuruUI<TItem = any> = {
    /**
     * コンテキストメニューの項目です。
     */
    items?: readonly TItem[] | undefined;

    /**
     * ポップアップに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * ポップアップと項目の角丸を指定します。
     *
     * 既定値は {@link ContextMenuRootProps.size|size} です。
     */
    radius?: ContextMenuRootRadius | undefined;

    /**
     * ポップアップと項目の大きさを指定します。
     *
     * @default "md"
     */
    size?: ContextMenuRootSize | undefined;

    /**
     * 項目の主な外観を指定します。
     *
     * @default "naked"
     */
    variant?: ContextMenuRootVariant | undefined;
  };
}

/**
 * {@link ContextMenuRoot} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuRootProps<TItem = any> = ContextMenuRootProps.Render &
  ContextMenuRootProps.SuruUI<TItem> &
  ContextMenuRootProps.BaseUI<TItem> &
  ContextMenuRootProps.HTML;

interface IContextMenuRoot extends IComponent<ContextMenuRootProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ContextMenuRootProps<TItem>): IComponent.Return;
}

/**
 * 右クリックまたは長押しで開くコンテキストメニューのルートです。
 *
 * 開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const ContextMenuRoot: IContextMenuRoot = function SuiContextMenuRoot(
  props: ContextMenuRootProps,
) {
  const {
    size = "md",
    items = [],
    radius = size,
    variant = "naked",
    outlined = false,
    ...otherProps
  } = props;
  const ctx = React.useMemo<ContextMenuContext>(
    () => ({ size, items, radius, variant, outlined }),
    [size, items, radius, variant, outlined],
  );

  return (
    <ContextMenuContext value={ctx}>
      <ContextMenu.Root {...otherProps} />
    </ContextMenuContext>
  );
};

export { ContextMenuRoot as Root };

export namespace Root {
  export type State = ContextMenuRootState;

  export type Props<TItem = any> = Props.Render &
    Props.SuruUI<TItem> &
    Props.BaseUI<TItem> &
    Props.HTML;

  export namespace Props {
    export type BaseUI<TItem = any> = ContextMenuRootProps.BaseUI<TItem>;

    export type HTML = ContextMenuRootProps.HTML;

    export type Render = ContextMenuRootProps.Render;

    export type SuruUI<TItem = any> = ContextMenuRootProps.SuruUI<TItem>;
  }

  export type ActionItemObject = ContextMenuRootActionItemObject;

  export type Actions = ContextMenuRootActions;

  export type ChangeEventDetails = ContextMenuRootChangeEventDetails;

  export type ChangeEventReason = ContextMenuRootChangeEventReason;

  export type CheckboxItemObject = ContextMenuRootCheckboxItemObject;

  export type GroupObject = ContextMenuRootGroupObject;

  export type ItemObject = ContextMenuRootItemObject;

  export type LinkItemObject = ContextMenuRootLinkItemObject;

  export type RadioGroupObject = ContextMenuRootRadioGroupObject;

  export type RadioItemObject = ContextMenuRootRadioItemObject;

  export type Radius = ContextMenuRootRadius;

  export type SeparatorObject = ContextMenuRootSeparatorObject;

  export type Size = ContextMenuRootSize;

  export type Variant = ContextMenuRootVariant;
}

// Trigger
// -------

/**
 * {@link ContextMenuTrigger} が持つ状態です。
 */
export type ContextMenuTriggerState = ContextMenu.Trigger.State;

export namespace ContextMenuTriggerProps {
  export type BaseUI = Omit<
    React.ComponentProps<typeof ContextMenu.Trigger>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof ContextMenu.Trigger>
  >;

  export type Render = RenderProps<ContextMenuTriggerState>;

  export type SuruUI = {
    /**
     * トリガーとしてレンダリングする要素です。
     *
     * {@link ContextMenu.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
     */
    children: NonNullable<React.ComponentProps<typeof ContextMenu.Trigger>["render"]>;
  };
}

/**
 * {@link ContextMenuTrigger} に渡す props です。
 */
export type ContextMenuTriggerProps = ContextMenuTriggerProps.Render &
  ContextMenuTriggerProps.SuruUI &
  ContextMenuTriggerProps.BaseUI &
  ContextMenuTriggerProps.HTML;

/**
 * 右クリックまたは長押しでコンテキストメニューを開く対象です。
 *
 * 子要素は追加のラッパーなしで `div` 要素に表示されます。
 */
export const ContextMenuTrigger: IComponent<ContextMenuTriggerProps> =
  function SuiContextMenuTrigger(props) {
    const { children, className, ...otherProps } = props;

    return (
      <ContextMenu.Trigger
        {...otherProps}
        render={children}
        className={cn(
          className,
          "sui_context_menu_trigger",
          (state) => state.open && "sui_context_menu_trigger-open",
        )}
      />
    );
  };

export { ContextMenuTrigger as Trigger };

export namespace Trigger {
  export type State = ContextMenuTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuTriggerProps.BaseUI;

    export type HTML = ContextMenuTriggerProps.HTML;

    export type Render = ContextMenuTriggerProps.Render;

    export type SuruUI = ContextMenuTriggerProps.SuruUI;
  }
}

// Portal
// ------

/**
 * {@link ContextMenuPortal} が持つ状態です。
 */
export type ContextMenuPortalState = ContextMenu.Portal.State;

export namespace ContextMenuPortalProps {
  export type BaseUI = Omit<React.ComponentProps<typeof ContextMenu.Portal>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof ContextMenu.Portal>
  >;

  export type Render = RenderProps<ContextMenuPortalState>;

  export type SuruUI = {};
}

/**
 * {@link ContextMenuPortal} に渡す props です。
 */
export type ContextMenuPortalProps = ContextMenuPortalProps.Render &
  ContextMenuPortalProps.SuruUI &
  ContextMenuPortalProps.BaseUI &
  ContextMenuPortalProps.HTML;

/**
 * コンテキストメニューを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const ContextMenuPortal: IComponent<ContextMenuPortalProps> = function SuiContextMenuPortal(
  props,
) {
  const { size, radius, outlined } = useContextMenuContext();
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <ContextMenu.Portal
      {...otherProps}
      className={cn(
        className,
        "sui_context_menu_portal",
        `sui_context_menu_portal-size_${size}`,
        `sui_context_menu_portal-radius_${radius}`,
        outlined && "sui_context_menu_portal-outlined",
      )}
      data-scope={dataScope}
    />
  );
};

export { ContextMenuPortal as Portal };

export namespace Portal {
  export type State = ContextMenuPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuPortalProps.BaseUI;

    export type HTML = ContextMenuPortalProps.HTML;

    export type Render = ContextMenuPortalProps.Render;

    export type SuruUI = ContextMenuPortalProps.SuruUI;
  }
}

// Backdrop
// --------

/**
 * {@link ContextMenuBackdrop} が持つ状態です。
 */
export type ContextMenuBackdropState = ContextMenu.Backdrop.State;

export namespace ContextMenuBackdropProps {
  export type BaseUI = Omit<React.ComponentProps<typeof ContextMenu.Backdrop>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof ContextMenu.Backdrop>
  >;

  export type Render = RenderProps<ContextMenuBackdropState>;

  export type SuruUI = {};
}

/**
 * {@link ContextMenuBackdrop} に渡す props です。
 */
export type ContextMenuBackdropProps = ContextMenuBackdropProps.Render &
  ContextMenuBackdropProps.SuruUI &
  ContextMenuBackdropProps.BaseUI &
  ContextMenuBackdropProps.HTML;

/**
 * コンテキストメニューの背後に表示されるオーバーレイ要素です。
 */
export const ContextMenuBackdrop: IComponent<ContextMenuBackdropProps> =
  function SuiContextMenuBackdrop(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.Backdrop
        {...otherProps}
        className={cn(className, "sui_context_menu_backdrop")}
      />
    );
  };

export { ContextMenuBackdrop as Backdrop };

export namespace Backdrop {
  export type State = ContextMenuBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuBackdropProps.BaseUI;

    export type HTML = ContextMenuBackdropProps.HTML;

    export type Render = ContextMenuBackdropProps.Render;

    export type SuruUI = ContextMenuBackdropProps.SuruUI;
  }
}

// Positioner
// ----------

/**
 * {@link ContextMenuPositioner} が持つ状態です。
 */
export type ContextMenuPositionerState = ContextMenu.Positioner.State;

export namespace ContextMenuPositionerProps {
  export type BaseUI = Omit<React.ComponentProps<typeof ContextMenu.Positioner>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof ContextMenu.Positioner>
  >;

  export type Render = RenderProps<ContextMenuPositionerState>;

  export type SuruUI = {};
}

/**
 * {@link ContextMenuPositioner} に渡す props です。
 */
export type ContextMenuPositionerProps = ContextMenuPositionerProps.Render &
  ContextMenuPositionerProps.SuruUI &
  ContextMenuPositionerProps.BaseUI &
  ContextMenuPositionerProps.HTML;

/**
 * ポップアップを右クリックまたは長押しした位置に合わせる要素です。
 */
export const ContextMenuPositioner: IComponent<ContextMenuPositionerProps> =
  function SuiContextMenuPositioner(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.Positioner
        {...otherProps}
        className={cn(className, "sui_context_menu_positioner")}
      />
    );
  };

export { ContextMenuPositioner as Positioner };

export namespace Positioner {
  export type State = ContextMenuPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuPositionerProps.BaseUI;

    export type HTML = ContextMenuPositionerProps.HTML;

    export type Render = ContextMenuPositionerProps.Render;

    export type SuruUI = ContextMenuPositionerProps.SuruUI;
  }
}

// Content
// -------

/**
 * ポップアップの各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IContextMenuContentItemRenderer<TItem = any> {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   * @returns レンダリングする内容です。
   */
  (item: TItem, index: number, items: readonly TItem[]): React.ReactNode;
}

/**
 * {@link ContextMenuContent} が持つ状態です。
 */
export type ContextMenuContentState = ContextMenu.Popup.State;

export namespace ContextMenuContentProps {
  export type BaseUI = Omit<
    React.ComponentProps<typeof ContextMenu.Popup>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof ContextMenu.Popup>
  >;

  export type Render = RenderProps<ContextMenuContentState>;

  export type SuruUI = {
    /**
     * ポップアップの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link ContextMenuRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IContextMenuContentItemRenderer;
  };
}

/**
 * {@link ContextMenuContent} に渡す props です。
 */
export type ContextMenuContentProps = ContextMenuContentProps.Render &
  ContextMenuContentProps.SuruUI &
  ContextMenuContentProps.BaseUI &
  ContextMenuContentProps.HTML;

/**
 * コンテキストメニュー項目を表示するコンテンツ要素です。
 */
export const ContextMenuContent: IComponent<ContextMenuContentProps> =
  function SuiContextMenuContent(props) {
    const ctx = useContextMenuContext();
    const { children = defaultContentItemRenderer, className, ...otherProps } = props;

    return (
      <ContextMenu.Popup
        {...otherProps}
        className={cn(
          className,
          "sui_context_menu_content",
          (state) =>
            state.transitionStatus !== undefined &&
            `sui_context_menu_content-transition_status_${state.transitionStatus}`,
        )}
      >
        {typeof children === "function" ? ctx.items.map(children) : children}
      </ContextMenu.Popup>
    );
  };

const defaultRadioItemRenderer: IContextMenuContentItemRenderer = (item, index) => {
  if (!isRadioItemObject(item)) {
    return toReactNode(item);
  }

  const { type: _, label, ...otherItemProps } = item;

  return (
    <ContextMenuRadioItem key={index} {...otherItemProps}>
      {toReactNode(label)}
      <ContextMenuRadioItemIndicator>
        <CheckIcon />
      </ContextMenuRadioItemIndicator>
    </ContextMenuRadioItem>
  );
};

const defaultContentItemRenderer: IContextMenuContentItemRenderer = (item, index, items) => {
  if (isSeparatorObject(item)) {
    const { type: _, ...otherProps } = item;

    return <ContextMenuSeparator key={index} {...otherProps} />;
  }

  if (isRadioGroupObject(item)) {
    const { type: _, items: radioItems, ...otherGroupProps } = item;

    return (
      <ContextMenuRadioGroup key={index} {...otherGroupProps}>
        {radioItems.map(defaultRadioItemRenderer)}
      </ContextMenuRadioGroup>
    );
  }

  if (isGroupObject(item)) {
    const { type: _, items: groupItems, label, ...otherGroupProps } = item;
    const labelNode = toReactNode(label);

    return (
      <ContextMenuGroup key={index} {...otherGroupProps}>
        {labelNode === null ? null : <ContextMenuGroupLabel>{labelNode}</ContextMenuGroupLabel>}
        {groupItems.map(defaultContentItemRenderer)}
      </ContextMenuGroup>
    );
  }

  if (!isItemObject(item)) {
    return toReactNode(item);
  }

  if (isCheckboxItemObject(item)) {
    const { type: _, label, ...otherItemProps } = item;

    return (
      <ContextMenuCheckboxItem key={index} {...otherItemProps}>
        {toReactNode(label)}
        <ContextMenuCheckboxItemIndicator>
          <CheckIcon />
        </ContextMenuCheckboxItemIndicator>
      </ContextMenuCheckboxItem>
    );
  }

  if (isRadioItemObject(item)) {
    return defaultRadioItemRenderer(item, index, items);
  }

  if (isLinkItemObject(item)) {
    const { type: _, label, ...otherItemProps } = item;

    return (
      <ContextMenuLinkItem key={index} {...otherItemProps}>
        {toReactNode(label)}
      </ContextMenuLinkItem>
    );
  }

  const { type: _, items: subItems, label, ...otherItemProps } = item;
  if (!subItems) {
    return (
      <ContextMenuItem key={index} {...otherItemProps}>
        {toReactNode(label)}
      </ContextMenuItem>
    );
  }

  return (
    <ContextMenuSubmenuRoot key={index}>
      <ContextMenuSubmenuTrigger {...otherItemProps}>
        {toReactNode(label)}
        <ChevronRightIcon />
      </ContextMenuSubmenuTrigger>
      <ContextMenuPortal>
        <ContextMenuPositioner>
          <ContextMenuContent>{subItems.map(defaultContentItemRenderer)}</ContextMenuContent>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenuSubmenuRoot>
  );
};

export { ContextMenuContent as Content };

export namespace Content {
  export type State = ContextMenuContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuContentProps.BaseUI;

    export type HTML = ContextMenuContentProps.HTML;

    export type Render = ContextMenuContentProps.Render;

    export type SuruUI = ContextMenuContentProps.SuruUI;
  }

  export type ItemObject = ContextMenuRootItemObject;

  export interface IItemRenderer<TItem = any> extends IContextMenuContentItemRenderer<TItem> {}
}

// Item
// ----

/**
 * 項目の状態に応じた外観を返します。
 *
 * チェックされている場合は指定された外観を返し、それ以外の場合は `"naked"` を返します。
 *
 * @param state 項目の状態です。
 * @param variant チェック状態のときの外観です。
 * @returns 適用する外観です。
 */
function getItemVariant(state: object, variant: Button.Root.Variant): Button.Root.Variant {
  if ("checked" in state && state.checked === true) {
    return variant;
  }

  return "naked";
}

/**
 * コンテキストメニューの操作項目の配色です。
 */
export type ContextMenuItemColor = Button.Root.Color;

/**
 * コンテキストメニューの操作項目の角丸です。
 */
export type ContextMenuItemRadius = Button.Root.Radius;

/**
 * コンテキストメニューの操作項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ContextMenuItemVariant = Button.Root.Variant;

/**
 * {@link ContextMenuItem} が持つ状態です。
 */
export type ContextMenuItemState = Override<Button.Root.State, ContextMenu.Item.State>;

export namespace ContextMenuItemProps {
  export type BaseUI = Omit<
    Override<
      Omit<Button.ButtonRootProps, "type">,
      Override<React.ComponentProps<typeof ContextMenu.Item>, RenderProps<ContextMenuItemState>>
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    | keyof Render
    | keyof SuruUI
    | keyof Override<
        Omit<Button.ButtonRootProps, "type">,
        Override<React.ComponentProps<typeof ContextMenu.Item>, RenderProps<ContextMenuItemState>>
      >
  >;

  export type Render = RenderProps<ContextMenuItemState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: ContextMenuItemColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link ContextMenuRootProps.radius|radius} です。
     */
    radius?: ContextMenuItemRadius | undefined;

    /**
     * チェック状態のときの外観を指定します。
     *
     * チェックされていないときは常に `"naked"` になります。
     *
     * 既定値は {@link ContextMenuRootProps.variant|variant} です。
     */
    variant?: ContextMenuItemVariant | undefined;
  };
}

/**
 * {@link ContextMenuItem} に渡す props です。
 */
export type ContextMenuItemProps = ContextMenuItemProps.Render &
  ContextMenuItemProps.SuruUI &
  ContextMenuItemProps.BaseUI &
  ContextMenuItemProps.HTML;

/**
 * コンテキストメニューの操作項目です。
 */
export const ContextMenuItem: IComponent<ContextMenuItemProps> = function SuiContextMenuItem(
  props,
) {
  const ctx = useContextMenuContext();
  const {
    size = ctx.size,
    color = "grey",
    style,
    radius = ctx.radius,
    render,
    variant = ctx.variant,
    className,
    ...otherProps
  } = props;

  return (
    <ContextMenu.Item
      {...otherProps}
      render={(htmlProps: {}, state) => (
        <Button.Root
          {...mergeProps<typeof Button.Root>([
            htmlProps,
            {
              item: true,
              size,
              color,
              radius,
              variant: getItemVariant(state, variant),
              disabled: state.disabled,
              nativeButton: false,
            },
            proxyRenderProps(state, {
              style,
              render: render ?? <div />,
              className: cn(
                className,
                "sui_context_menu_item",
                (state) => state.disabled && "sui_context_menu_item-disabled",
                (state) => state.highlighted && "sui_context_menu_item-highlighted",
              ),
            }),
          ])}
        />
      )}
    />
  );
};

export { ContextMenuItem as Item };

export namespace Item {
  export type State = ContextMenuItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuItemProps.BaseUI;

    export type HTML = ContextMenuItemProps.HTML;

    export type Render = ContextMenuItemProps.Render;

    export type SuruUI = ContextMenuItemProps.SuruUI;
  }

  export type Color = ContextMenuItemColor;

  export type Radius = ContextMenuItemRadius;

  export type Variant = ContextMenuItemVariant;
}

// LinkItem
// --------

/**
 * コンテキストメニューのリンク項目の配色です。
 */
export type ContextMenuLinkItemColor = Button.Root.Color;

/**
 * コンテキストメニューのリンク項目の角丸です。
 */
export type ContextMenuLinkItemRadius = Button.Root.Radius;

/**
 * コンテキストメニューのリンク項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ContextMenuLinkItemVariant = Button.Root.Variant;

/**
 * {@link ContextMenuLinkItem} が持つ状態です。
 */
export type ContextMenuLinkItemState = Override<Button.Root.State, ContextMenu.LinkItem.State>;

export namespace ContextMenuLinkItemProps {
  export type BaseUI = Omit<
    Override<
      Omit<Button.ButtonRootProps, "type">,
      Override<
        React.ComponentProps<typeof ContextMenu.LinkItem>,
        RenderProps<ContextMenuLinkItemState>
      >
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"a">,
    | keyof Render
    | keyof SuruUI
    | keyof Override<
        Omit<Button.ButtonRootProps, "type">,
        Override<
          React.ComponentProps<typeof ContextMenu.LinkItem>,
          RenderProps<ContextMenuLinkItemState>
        >
      >
  >;

  export type Render = RenderProps<ContextMenuLinkItemState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: ContextMenuLinkItemColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link ContextMenuRootProps.radius|radius} です。
     */
    radius?: ContextMenuLinkItemRadius | undefined;

    /**
     * チェック状態のときの外観を指定します。
     *
     * チェックされていないときは常に `"naked"` になります。
     *
     * 既定値は {@link ContextMenuRootProps.variant|variant} です。
     */
    variant?: ContextMenuLinkItemVariant | undefined;
  };
}

/**
 * {@link ContextMenuLinkItem} に渡す props です。
 */
export type ContextMenuLinkItemProps = ContextMenuLinkItemProps.Render &
  ContextMenuLinkItemProps.SuruUI &
  ContextMenuLinkItemProps.BaseUI &
  ContextMenuLinkItemProps.HTML;

/**
 * 別のページやセクションへ移動するコンテキストメニュー項目です。
 */
export const ContextMenuLinkItem: IComponent<ContextMenuLinkItemProps> =
  function SuiContextMenuLinkItem(props) {
    const ctx = useContextMenuContext();
    const {
      size = ctx.size,
      color = "grey",
      style,
      radius = ctx.radius,
      render,
      variant = ctx.variant,
      className,
      ...otherProps
    } = props;

    return (
      <ContextMenu.LinkItem
        {...otherProps}
        render={(htmlProps: {}, state) => (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              {
                item: true,
                size,
                color,
                radius,
                variant: getItemVariant(state, variant),
                nativeButton: false,
              },
              proxyRenderProps(state, {
                style,
                // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
                render: render ?? <a />,
                className: cn(
                  className,
                  "sui_context_menu_item",
                  "sui_context_menu_link_item",
                  (state) => state.highlighted && "sui_context_menu_item-highlighted",
                ),
              }),
            ])}
          />
        )}
      />
    );
  };

export { ContextMenuLinkItem as LinkItem };

export namespace LinkItem {
  export type State = ContextMenuLinkItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuLinkItemProps.BaseUI;

    export type HTML = ContextMenuLinkItemProps.HTML;

    export type Render = ContextMenuLinkItemProps.Render;

    export type SuruUI = ContextMenuLinkItemProps.SuruUI;
  }

  export type Color = ContextMenuLinkItemColor;

  export type Radius = ContextMenuLinkItemRadius;

  export type Variant = ContextMenuLinkItemVariant;
}

// SubmenuRoot
// -----------

/**
 * {@link ContextMenuSubmenuRoot} の開閉状態を変更されるイベントの詳細です。
 */
export type ContextMenuSubmenuRootChangeEventDetails = ContextMenu.SubmenuRoot.ChangeEventDetails;

/**
 * {@link ContextMenuSubmenuRoot} の開閉状態が変更される理由です。
 */
export type ContextMenuSubmenuRootChangeEventReason = ContextMenu.SubmenuRoot.ChangeEventReason;

/**
 * {@link ContextMenuSubmenuRoot} が持つ状態です。
 */
export type ContextMenuSubmenuRootState = ContextMenu.SubmenuRoot.State;

export namespace ContextMenuSubmenuRootProps {
  export type BaseUI = Omit<React.ComponentProps<typeof ContextMenu.SubmenuRoot>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof ContextMenu.SubmenuRoot>
  >;

  export type Render = RenderProps<ContextMenuSubmenuRootState>;

  export type SuruUI = {};
}

/**
 * {@link ContextMenuSubmenuRoot} に渡す props です。
 */
export type ContextMenuSubmenuRootProps = ContextMenuSubmenuRootProps.Render &
  ContextMenuSubmenuRootProps.SuruUI &
  ContextMenuSubmenuRootProps.BaseUI &
  ContextMenuSubmenuRootProps.HTML;

/**
 * サブメニューのルートです。
 *
 * それ自身は HTML 要素をレンダリングしません。
 */
export const ContextMenuSubmenuRoot: IComponent<ContextMenuSubmenuRootProps> =
  function SuiContextMenuSubmenuRoot(props) {
    return <ContextMenu.SubmenuRoot {...props} />;
  };

export { ContextMenuSubmenuRoot as SubmenuRoot };

export namespace SubmenuRoot {
  export type State = ContextMenuSubmenuRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuSubmenuRootProps.BaseUI;

    export type HTML = ContextMenuSubmenuRootProps.HTML;

    export type Render = ContextMenuSubmenuRootProps.Render;

    export type SuruUI = ContextMenuSubmenuRootProps.SuruUI;
  }

  export type ChangeEventDetails = ContextMenuSubmenuRootChangeEventDetails;

  export type ChangeEventReason = ContextMenuSubmenuRootChangeEventReason;
}

// SubmenuTrigger
// --------------

/**
 * サブメニュー項目の配色です。
 */
export type ContextMenuSubmenuTriggerColor = Button.Root.Color;

/**
 * サブメニュー項目の角丸です。
 */
export type ContextMenuSubmenuTriggerRadius = Button.Root.Radius;

/**
 * サブメニュー項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ContextMenuSubmenuTriggerVariant = Button.Root.Variant;

/**
 * {@link ContextMenuSubmenuTrigger} が持つ状態です。
 */
export type ContextMenuSubmenuTriggerState = Override<
  Button.Root.State,
  ContextMenu.SubmenuTrigger.State
>;

export namespace ContextMenuSubmenuTriggerProps {
  export type BaseUI = Omit<
    Override<
      Omit<Button.ButtonRootProps, "type">,
      Override<
        React.ComponentProps<typeof ContextMenu.SubmenuTrigger>,
        RenderProps<ContextMenuSubmenuTriggerState>
      >
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    | keyof Render
    | keyof SuruUI
    | keyof Override<
        Omit<Button.ButtonRootProps, "type">,
        Override<
          React.ComponentProps<typeof ContextMenu.SubmenuTrigger>,
          RenderProps<ContextMenuSubmenuTriggerState>
        >
      >
  >;

  export type Render = RenderProps<ContextMenuSubmenuTriggerState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: ContextMenuSubmenuTriggerColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link ContextMenuRootProps.radius|radius} です。
     */
    radius?: ContextMenuSubmenuTriggerRadius | undefined;

    /**
     * チェック状態のときの外観を指定します。
     *
     * チェックされていないときは常に `"naked"` になります。
     *
     * 既定値は {@link ContextMenuRootProps.variant|variant} です。
     */
    variant?: ContextMenuSubmenuTriggerVariant | undefined;
  };
}

/**
 * {@link ContextMenuSubmenuTrigger} に渡す props です。
 */
export type ContextMenuSubmenuTriggerProps = ContextMenuSubmenuTriggerProps.Render &
  ContextMenuSubmenuTriggerProps.SuruUI &
  ContextMenuSubmenuTriggerProps.BaseUI &
  ContextMenuSubmenuTriggerProps.HTML;

/**
 * サブメニューを開くコンテキストメニュー項目です。
 */
export const ContextMenuSubmenuTrigger: IComponent<ContextMenuSubmenuTriggerProps> =
  function SuiContextMenuSubmenuTrigger(props) {
    const ctx = useContextMenuContext();
    const {
      size = ctx.size,
      color = "grey",
      style,
      radius = ctx.radius,
      render,
      variant = ctx.variant,
      className,
      ...otherProps
    } = props;

    return (
      <ContextMenu.SubmenuTrigger
        {...otherProps}
        render={(htmlProps: {}, state) => (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              {
                item: true,
                size,
                color,
                radius,
                variant: getItemVariant(state, variant),
                disabled: state.disabled,
                nativeButton: false,
              },
              proxyRenderProps(state, {
                style,
                render: render ?? <div />,
                className: cn(
                  className,
                  "sui_context_menu_item",
                  "sui_context_menu_submenu_trigger",
                  (state) => state.disabled && "sui_context_menu_item-disabled",
                  (state) => state.highlighted && "sui_context_menu_item-highlighted",
                  (state) => state.open && "sui_context_menu_item-open",
                ),
              }),
            ])}
          />
        )}
      />
    );
  };

export { ContextMenuSubmenuTrigger as SubmenuTrigger };

export namespace SubmenuTrigger {
  export type State = ContextMenuSubmenuTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuSubmenuTriggerProps.BaseUI;

    export type HTML = ContextMenuSubmenuTriggerProps.HTML;

    export type Render = ContextMenuSubmenuTriggerProps.Render;

    export type SuruUI = ContextMenuSubmenuTriggerProps.SuruUI;
  }

  export type Color = ContextMenuSubmenuTriggerColor;

  export type Radius = ContextMenuSubmenuTriggerRadius;

  export type Variant = ContextMenuSubmenuTriggerVariant;
}

// Group
// -----

/**
 * {@link ContextMenuGroup} が持つ状態です。
 */
export type ContextMenuGroupState = ContextMenu.Group.State;

export namespace ContextMenuGroupProps {
  export type BaseUI = Omit<React.ComponentProps<typeof ContextMenu.Group>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof ContextMenu.Group>
  >;

  export type Render = RenderProps<ContextMenuGroupState>;

  export type SuruUI = {};
}

/**
 * {@link ContextMenuGroup} に渡す props です。
 */
export type ContextMenuGroupProps = ContextMenuGroupProps.Render &
  ContextMenuGroupProps.SuruUI &
  ContextMenuGroupProps.BaseUI &
  ContextMenuGroupProps.HTML;

/**
 * 関連するコンテキストメニュー項目をまとめるグループ要素です。
 */
export const ContextMenuGroup: IComponent<ContextMenuGroupProps> = function SuiContextMenuGroup(
  props,
) {
  const { className, ...otherProps } = props;

  return <ContextMenu.Group {...otherProps} className={cn(className, "sui_context_menu_group")} />;
};

export { ContextMenuGroup as Group };

export namespace Group {
  export type State = ContextMenuGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuGroupProps.BaseUI;

    export type HTML = ContextMenuGroupProps.HTML;

    export type Render = ContextMenuGroupProps.Render;

    export type SuruUI = ContextMenuGroupProps.SuruUI;
  }
}

// GroupLabel
// ----------

/**
 * {@link ContextMenuGroupLabel} が持つ状態です。
 */
export type ContextMenuGroupLabelState = ContextMenu.GroupLabel.State;

export namespace ContextMenuGroupLabelProps {
  export type BaseUI = Omit<React.ComponentProps<typeof ContextMenu.GroupLabel>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof ContextMenu.GroupLabel>
  >;

  export type Render = RenderProps<ContextMenuGroupLabelState>;

  export type SuruUI = {};
}

/**
 * {@link ContextMenuGroupLabel} に渡す props です。
 */
export type ContextMenuGroupLabelProps = ContextMenuGroupLabelProps.Render &
  ContextMenuGroupLabelProps.SuruUI &
  ContextMenuGroupLabelProps.BaseUI &
  ContextMenuGroupLabelProps.HTML;

/**
 * グループに自動的に対応付けられるラベル要素です。
 */
export const ContextMenuGroupLabel: IComponent<ContextMenuGroupLabelProps> =
  function SuiContextMenuGroupLabel(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.GroupLabel
        {...otherProps}
        className={cn(className, "sui_context_menu_group_label")}
      />
    );
  };

export { ContextMenuGroupLabel as GroupLabel };

export namespace GroupLabel {
  export type State = ContextMenuGroupLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuGroupLabelProps.BaseUI;

    export type HTML = ContextMenuGroupLabelProps.HTML;

    export type Render = ContextMenuGroupLabelProps.Render;

    export type SuruUI = ContextMenuGroupLabelProps.SuruUI;
  }
}

// RadioGroup
// ----------

/**
 * {@link ContextMenuRadioGroup} の選択状態を変更されるイベントの詳細です。
 */
export type ContextMenuRadioGroupChangeEventDetails = ContextMenu.RadioGroup.ChangeEventDetails;

/**
 * {@link ContextMenuRadioGroup} の選択状態が変更される理由です。
 */
export type ContextMenuRadioGroupChangeEventReason = ContextMenu.RadioGroup.ChangeEventReason;

/**
 * {@link ContextMenuRadioGroup} が持つ状態です。
 */
export type ContextMenuRadioGroupState = ContextMenu.RadioGroup.State;

export namespace ContextMenuRadioGroupProps {
  export type BaseUI = Omit<React.ComponentProps<typeof ContextMenu.RadioGroup>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof ContextMenu.RadioGroup>
  >;

  export type Render = RenderProps<ContextMenuRadioGroupState>;

  export type SuruUI = {};
}

/**
 * {@link ContextMenuRadioGroup} に渡す props です。
 */
export type ContextMenuRadioGroupProps = ContextMenuRadioGroupProps.Render &
  ContextMenuRadioGroupProps.SuruUI &
  ContextMenuRadioGroupProps.BaseUI &
  ContextMenuRadioGroupProps.HTML;

/**
 * ラジオ項目をまとめるグループ要素です。
 */
export const ContextMenuRadioGroup: IComponent<ContextMenuRadioGroupProps> =
  function SuiContextMenuRadioGroup(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.RadioGroup
        {...otherProps}
        className={cn(
          className,
          "sui_context_menu_radio_group",
          (state) => state.disabled && "sui_context_menu_radio_group-disabled",
        )}
      />
    );
  };

export { ContextMenuRadioGroup as RadioGroup };

export namespace RadioGroup {
  export type State = ContextMenuRadioGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuRadioGroupProps.BaseUI;

    export type HTML = ContextMenuRadioGroupProps.HTML;

    export type Render = ContextMenuRadioGroupProps.Render;

    export type SuruUI = ContextMenuRadioGroupProps.SuruUI;
  }

  export type ChangeEventDetails = ContextMenuRadioGroupChangeEventDetails;

  export type ChangeEventReason = ContextMenuRadioGroupChangeEventReason;
}

// RadioItem
// ---------

/**
 * ラジオ項目の配色です。
 */
export type ContextMenuRadioItemColor = Button.Root.Color;

/**
 * ラジオ項目の角丸です。
 */
export type ContextMenuRadioItemRadius = Button.Root.Radius;

/**
 * ラジオ項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ContextMenuRadioItemVariant = Button.Root.Variant;

/**
 * {@link ContextMenuRadioItem} が持つ状態です。
 */
export type ContextMenuRadioItemState = Override<Button.Root.State, ContextMenu.RadioItem.State>;

export namespace ContextMenuRadioItemProps {
  export type BaseUI = Omit<
    Override<
      Omit<Button.ButtonRootProps, "type">,
      Override<
        React.ComponentProps<typeof ContextMenu.RadioItem>,
        RenderProps<ContextMenuRadioItemState>
      >
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    | keyof Render
    | keyof SuruUI
    | keyof Override<
        Omit<Button.ButtonRootProps, "type">,
        Override<
          React.ComponentProps<typeof ContextMenu.RadioItem>,
          RenderProps<ContextMenuRadioItemState>
        >
      >
  >;

  export type Render = RenderProps<ContextMenuRadioItemState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: ContextMenuRadioItemColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link ContextMenuRootProps.radius|radius} です。
     */
    radius?: ContextMenuRadioItemRadius | undefined;

    /**
     * チェック状態のときの外観を指定します。
     *
     * チェックされていないときは常に `"naked"` になります。
     *
     * 既定値は {@link ContextMenuRootProps.variant|variant} です。
     */
    variant?: ContextMenuRadioItemVariant | undefined;
  };
}

/**
 * {@link ContextMenuRadioItem} に渡す props です。
 */
export type ContextMenuRadioItemProps = ContextMenuRadioItemProps.Render &
  ContextMenuRadioItemProps.SuruUI &
  ContextMenuRadioItemProps.BaseUI &
  ContextMenuRadioItemProps.HTML;

/**
 * ラジオグループ内のコンテキストメニュー項目です。
 */
export const ContextMenuRadioItem: IComponent<ContextMenuRadioItemProps> =
  function SuiContextMenuRadioItem(props) {
    const ctx = useContextMenuContext();
    const {
      size = ctx.size,
      color = "grey",
      style,
      radius = ctx.radius,
      render,
      variant = ctx.variant,
      className,
      ...otherProps
    } = props;

    return (
      <ContextMenu.RadioItem
        {...otherProps}
        render={(htmlProps: {}, state) => (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              {
                item: true,
                size,
                color,
                radius,
                variant: getItemVariant(state, variant),
                disabled: state.disabled,
                nativeButton: false,
              },
              proxyRenderProps(state, {
                style,
                render: render ?? <div />,
                className: cn(
                  className,
                  "sui_context_menu_item",
                  "sui_context_menu_radio_item",
                  (state) => state.checked && "sui_context_menu_item-checked",
                  (state) => state.highlighted && "sui_context_menu_item-highlighted",
                  (state) => state.disabled && "sui_context_menu_item-disabled",
                ),
              }),
            ])}
          />
        )}
      />
    );
  };

export { ContextMenuRadioItem as RadioItem };

export namespace RadioItem {
  export type State = ContextMenuRadioItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuRadioItemProps.BaseUI;

    export type HTML = ContextMenuRadioItemProps.HTML;

    export type Render = ContextMenuRadioItemProps.Render;

    export type SuruUI = ContextMenuRadioItemProps.SuruUI;
  }

  export type Color = ContextMenuRadioItemColor;

  export type Radius = ContextMenuRadioItemRadius;

  export type Variant = ContextMenuRadioItemVariant;
}

// RadioItemIndicator
// ------------------

/**
 * {@link ContextMenuRadioItemIndicator} が持つ状態です。
 */
export type ContextMenuRadioItemIndicatorState = ContextMenu.RadioItemIndicator.State;

export namespace ContextMenuRadioItemIndicatorProps {
  export type BaseUI = Omit<
    React.ComponentProps<typeof ContextMenu.RadioItemIndicator>,
    keyof Render
  >;

  export type HTML = Omit<
    React.ComponentProps<"span">,
    keyof Render | keyof React.ComponentProps<typeof ContextMenu.RadioItemIndicator>
  >;

  export type Render = RenderProps<ContextMenuRadioItemIndicatorState>;

  export type SuruUI = {};
}

/**
 * {@link ContextMenuRadioItemIndicator} に渡す props です。
 */
export type ContextMenuRadioItemIndicatorProps = ContextMenuRadioItemIndicatorProps.Render &
  ContextMenuRadioItemIndicatorProps.SuruUI &
  ContextMenuRadioItemIndicatorProps.BaseUI &
  ContextMenuRadioItemIndicatorProps.HTML;

/**
 * 選択されたラジオ項目を示す要素です。
 */
export const ContextMenuRadioItemIndicator: IComponent<ContextMenuRadioItemIndicatorProps> =
  function SuiContextMenuRadioItemIndicator(props) {
    const { className, keepMounted = true, ...otherProps } = props;

    return (
      <ContextMenu.RadioItemIndicator
        {...otherProps}
        className={cn(
          className,
          "sui_context_menu_item_indicator",
          "sui_context_menu_radio_item_indicator",
          (state) => !state.checked && "sui_context_menu_item_indicator-unchecked",
        )}
        keepMounted={keepMounted}
      />
    );
  };

export { ContextMenuRadioItemIndicator as RadioItemIndicator };

export namespace RadioItemIndicator {
  export type State = ContextMenuRadioItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuRadioItemIndicatorProps.BaseUI;

    export type HTML = ContextMenuRadioItemIndicatorProps.HTML;

    export type Render = ContextMenuRadioItemIndicatorProps.Render;

    export type SuruUI = ContextMenuRadioItemIndicatorProps.SuruUI;
  }
}

// CheckboxItem
// ------------

/**
 * {@link ContextMenuCheckboxItem} のチェック状態を変更されるイベントの詳細です。
 */
export type ContextMenuCheckboxItemChangeEventDetails = ContextMenu.CheckboxItem.ChangeEventDetails;

/**
 * {@link ContextMenuCheckboxItem} のチェック状態が変更される理由です。
 */
export type ContextMenuCheckboxItemChangeEventReason = ContextMenu.CheckboxItem.ChangeEventReason;

/**
 * チェックボックス項目の配色です。
 */
export type ContextMenuCheckboxItemColor = Button.Root.Color;

/**
 * チェックボックス項目の角丸です。
 */
export type ContextMenuCheckboxItemRadius = Button.Root.Radius;

/**
 * チェックボックス項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ContextMenuCheckboxItemVariant = Button.Root.Variant;

/**
 * {@link ContextMenuCheckboxItem} が持つ状態です。
 */
export type ContextMenuCheckboxItemState = Override<
  Button.Root.State,
  ContextMenu.CheckboxItem.State
>;

export namespace ContextMenuCheckboxItemProps {
  export type BaseUI = Omit<
    Override<
      Omit<Button.ButtonRootProps, "type">,
      Override<
        React.ComponentProps<typeof ContextMenu.CheckboxItem>,
        RenderProps<ContextMenuCheckboxItemState>
      >
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    | keyof Render
    | keyof SuruUI
    | keyof Override<
        Omit<Button.ButtonRootProps, "type">,
        Override<
          React.ComponentProps<typeof ContextMenu.CheckboxItem>,
          RenderProps<ContextMenuCheckboxItemState>
        >
      >
  >;

  export type Render = RenderProps<ContextMenuCheckboxItemState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: ContextMenuCheckboxItemColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link ContextMenuRootProps.radius|radius} です。
     */
    radius?: ContextMenuCheckboxItemRadius | undefined;

    /**
     * チェック状態のときの外観を指定します。
     *
     * チェックされていないときは常に `"naked"` になります。
     *
     * 既定値は {@link ContextMenuRootProps.variant|variant} です。
     */
    variant?: ContextMenuCheckboxItemVariant | undefined;
  };
}

/**
 * {@link ContextMenuCheckboxItem} に渡す props です。
 */
export type ContextMenuCheckboxItemProps = ContextMenuCheckboxItemProps.Render &
  ContextMenuCheckboxItemProps.SuruUI &
  ContextMenuCheckboxItemProps.BaseUI &
  ContextMenuCheckboxItemProps.HTML;

/**
 * 設定をオンまたはオフにできるコンテキストメニュー項目です。
 */
export const ContextMenuCheckboxItem: IComponent<ContextMenuCheckboxItemProps> =
  function SuiContextMenuCheckboxItem(props) {
    const ctx = useContextMenuContext();
    const {
      size = ctx.size,
      color = "grey",
      style,
      radius = ctx.radius,
      render,
      variant = ctx.variant,
      className,
      ...otherProps
    } = props;

    return (
      <ContextMenu.CheckboxItem
        {...otherProps}
        render={(htmlProps: {}, state) => (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              {
                item: true,
                size,
                color,
                radius,
                variant: getItemVariant(state, variant),
                disabled: state.disabled,
                nativeButton: false,
              },
              proxyRenderProps(state, {
                style,
                render: render ?? <div />,
                className: cn(
                  className,
                  "sui_context_menu_item",
                  "sui_context_menu_checkbox_item",
                  (state) => state.checked && "sui_context_menu_item-checked",
                  (state) => state.highlighted && "sui_context_menu_item-highlighted",
                  (state) => state.disabled && "sui_context_menu_item-disabled",
                ),
              }),
            ])}
          />
        )}
      />
    );
  };

export { ContextMenuCheckboxItem as CheckboxItem };

export namespace CheckboxItem {
  export type State = ContextMenuCheckboxItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuCheckboxItemProps.BaseUI;

    export type HTML = ContextMenuCheckboxItemProps.HTML;

    export type Render = ContextMenuCheckboxItemProps.Render;

    export type SuruUI = ContextMenuCheckboxItemProps.SuruUI;
  }

  export type ChangeEventDetails = ContextMenuCheckboxItemChangeEventDetails;

  export type ChangeEventReason = ContextMenuCheckboxItemChangeEventReason;

  export type Color = ContextMenuCheckboxItemColor;

  export type Radius = ContextMenuCheckboxItemRadius;

  export type Variant = ContextMenuCheckboxItemVariant;
}

// CheckboxItemIndicator
// ---------------------

/**
 * {@link ContextMenuCheckboxItemIndicator} が持つ状態です。
 */
export type ContextMenuCheckboxItemIndicatorState = ContextMenu.CheckboxItemIndicator.State;

export namespace ContextMenuCheckboxItemIndicatorProps {
  export type BaseUI = Omit<
    React.ComponentProps<typeof ContextMenu.CheckboxItemIndicator>,
    keyof Render
  >;

  export type HTML = Omit<
    React.ComponentProps<"span">,
    keyof Render | keyof React.ComponentProps<typeof ContextMenu.CheckboxItemIndicator>
  >;

  export type Render = RenderProps<ContextMenuCheckboxItemIndicatorState>;

  export type SuruUI = {};
}

/**
 * {@link ContextMenuCheckboxItemIndicator} に渡す props です。
 */
export type ContextMenuCheckboxItemIndicatorProps = ContextMenuCheckboxItemIndicatorProps.Render &
  ContextMenuCheckboxItemIndicatorProps.SuruUI &
  ContextMenuCheckboxItemIndicatorProps.BaseUI &
  ContextMenuCheckboxItemIndicatorProps.HTML;

/**
 * チェックされた項目を示す要素です。
 */
export const ContextMenuCheckboxItemIndicator: IComponent<ContextMenuCheckboxItemIndicatorProps> =
  function SuiContextMenuCheckboxItemIndicator(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.CheckboxItemIndicator
        {...otherProps}
        className={cn(
          className,
          "sui_context_menu_item_indicator",
          "sui_context_menu_checkbox_item_indicator",
          (state) => !state.checked && "sui_context_menu_item_indicator-unchecked",
        )}
      />
    );
  };

export { ContextMenuCheckboxItemIndicator as CheckboxItemIndicator };

export namespace CheckboxItemIndicator {
  export type State = ContextMenuCheckboxItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuCheckboxItemIndicatorProps.BaseUI;

    export type HTML = ContextMenuCheckboxItemIndicatorProps.HTML;

    export type Render = ContextMenuCheckboxItemIndicatorProps.Render;

    export type SuruUI = ContextMenuCheckboxItemIndicatorProps.SuruUI;
  }
}

// Separator
// ---------

/**
 * {@link ContextMenuSeparator} が持つ状態です。
 */
export type ContextMenuSeparatorState = ContextMenu.Separator.State;

export namespace ContextMenuSeparatorProps {
  export type BaseUI = Omit<React.ComponentProps<typeof ContextMenu.Separator>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof ContextMenu.Separator>
  >;

  export type Render = RenderProps<ContextMenuSeparatorState>;

  export type SuruUI = {};
}

/**
 * {@link ContextMenuSeparator} に渡す props です。
 */
export type ContextMenuSeparatorProps = ContextMenuSeparatorProps.Render &
  ContextMenuSeparatorProps.SuruUI &
  ContextMenuSeparatorProps.BaseUI &
  ContextMenuSeparatorProps.HTML;

/**
 * コンテキストメニュー項目を区切る要素です。
 */
export const ContextMenuSeparator: IComponent<ContextMenuSeparatorProps> =
  function SuiContextMenuSeparator(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.Separator
        {...otherProps}
        className={cn(className, "sui_context_menu_separator")}
      />
    );
  };

export { ContextMenuSeparator as Separator };

export namespace Separator {
  export type State = ContextMenuSeparatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ContextMenuSeparatorProps.BaseUI;

    export type HTML = ContextMenuSeparatorProps.HTML;

    export type Render = ContextMenuSeparatorProps.Render;

    export type SuruUI = ContextMenuSeparatorProps.SuruUI;
  }
}
