import { ContextMenu } from "@base-ui/react/context-menu";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import renderer from "../_renderer.js";
import toReactNode from "../_to-react-node.js";
import { ButtonRoot } from "../button/button.parts.jsx";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";
import { isItemObject } from "./_context-menu.jsx";

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
 * - `"full"`: 完全な丸形
 */
type ContextMenuContextRadius = "none" | Size | "full";

/**
 * ポップアップと項目の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
type ContextMenuContextSize = Size;

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
  /**
   * {@link ContextMenuContextRadius}
   */
  export type Radius = ContextMenuContextRadius;

  /**
   * {@link ContextMenuContextSize}
   */
  export type Size = ContextMenuContextSize;
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
 * コンテキストメニューの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 完全な丸形
 */
export type ContextMenuRootRadius = "none" | Size | "full";

/**
 * コンテキストメニューの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ContextMenuRootSize = Size;

/**
 * {@link ContextMenuRoot} の各項目です。
 *
 * `label` を含み、その他のプロパティーは {@link ContextMenuItem} に渡されます。
 * `items` を指定した場合はサブメニューとして描画されます。
 */
export type ContextMenuRootItemObject = Omit<ContextMenuItemProps, "children" | "label"> & {
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
};

/**
 * {@link ContextMenuRoot} が持つ状態です。
 */
export type ContextMenuRootState = ContextMenu.Root.State;

/**
 * {@link ContextMenuRoot} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuRootProps<TItem = any> = React.ComponentProps<typeof ContextMenu.Root> & {
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
};

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
  const { size = "md", items = [], radius = size, outlined = false, ...otherProps } = props;
  const ctx = React.useMemo<ContextMenuContext>(
    () => ({ size, items, radius, outlined }),
    [size, items, radius, outlined],
  );

  return (
    <ContextMenuContext value={ctx}>
      <ContextMenu.Root {...otherProps} />
    </ContextMenuContext>
  );
};

export { ContextMenuRoot as Root };

export namespace Root {
  /**
   * {@link ContextMenuRootState}
   */
  export type State = ContextMenuRootState;

  /**
   * {@link ContextMenuRootProps}
   */
  export type Props<TItem = any> = ContextMenuRootProps<TItem>;

  /**
   * {@link ContextMenuRootActions}
   */
  export type Actions = ContextMenuRootActions;

  /**
   * {@link ContextMenuRootChangeEventDetails}
   */
  export type ChangeEventDetails = ContextMenuRootChangeEventDetails;

  /**
   * {@link ContextMenuRootChangeEventReason}
   */
  export type ChangeEventReason = ContextMenuRootChangeEventReason;

  /**
   * {@link ContextMenuRootItemObject}
   */
  export type ItemObject = ContextMenuRootItemObject;

  /**
   * {@link ContextMenuRootRadius}
   */
  export type Radius = ContextMenuRootRadius;

  /**
   * {@link ContextMenuRootSize}
   */
  export type Size = ContextMenuRootSize;
}

// Trigger
// -------

/**
 * {@link ContextMenuTrigger} が持つ状態です。
 */
export type ContextMenuTriggerState = ContextMenu.Trigger.State;

/**
 * {@link ContextMenuTrigger} に渡す props です。
 */
export type ContextMenuTriggerProps = Omit<
  React.ComponentProps<typeof ContextMenu.Trigger>,
  "children" | "render"
> & {
  /**
   * トリガーとしてレンダリングする要素です。
   *
   * {@link ContextMenu.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<React.ComponentProps<typeof ContextMenu.Trigger>["render"]>;
};

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
        className={cn(className, "sui_context_menu_trigger")}
      />
    );
  };

export { ContextMenuTrigger as Trigger };

export namespace Trigger {
  /**
   * {@link ContextMenuTriggerState}
   */
  export type State = ContextMenuTriggerState;

  /**
   * {@link ContextMenuTriggerProps}
   */
  export type Props = ContextMenuTriggerProps;
}

// Portal
// ------

/**
 * {@link ContextMenuPortal} が持つ状態です。
 */
export type ContextMenuPortalState = ContextMenu.Portal.State;

/**
 * {@link ContextMenuPortal} に渡す props です。
 */
export type ContextMenuPortalProps = React.ComponentProps<typeof ContextMenu.Portal>;

/**
 * コンテキストメニューを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const ContextMenuPortal: IComponent<ContextMenuPortalProps> = function SuiContextMenuPortal(
  props,
) {
  const { size, radius, outlined } = useContextMenuContext();
  const { className, ...otherProps } = props;

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
      data-scope=""
    />
  );
};

export { ContextMenuPortal as Portal };

export namespace Portal {
  /**
   * {@link ContextMenuPortalState}
   */
  export type State = ContextMenuPortalState;

  /**
   * {@link ContextMenuPortalProps}
   */
  export type Props = ContextMenuPortalProps;
}

// Backdrop
// --------

/**
 * {@link ContextMenuBackdrop} が持つ状態です。
 */
export type ContextMenuBackdropState = ContextMenu.Backdrop.State;

/**
 * {@link ContextMenuBackdrop} に渡す props です。
 */
export type ContextMenuBackdropProps = React.ComponentProps<typeof ContextMenu.Backdrop>;

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
  /**
   * {@link ContextMenuBackdropState}
   */
  export type State = ContextMenuBackdropState;

  /**
   * {@link ContextMenuBackdropProps}
   */
  export type Props = ContextMenuBackdropProps;
}

// Positioner
// ----------

/**
 * {@link ContextMenuPositioner} が持つ状態です。
 */
export type ContextMenuPositionerState = ContextMenu.Positioner.State;

/**
 * {@link ContextMenuPositioner} に渡す props です。
 */
export type ContextMenuPositionerProps = React.ComponentProps<typeof ContextMenu.Positioner>;

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
  /**
   * {@link ContextMenuPositionerState}
   */
  export type State = ContextMenuPositionerState;

  /**
   * {@link ContextMenuPositionerProps}
   */
  export type Props = ContextMenuPositionerProps;
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

/**
 * {@link ContextMenuContent} に渡す props です。
 */
export type ContextMenuContentProps = Omit<
  React.ComponentProps<typeof ContextMenu.Popup>,
  "children"
> & {
  /**
   * ポップアップの内容、または各項目をレンダリングする関数です。
   *
   * 関数を指定した場合は {@link ContextMenuRootProps.items|items} の各項目が引数として渡されます。
   */
  children?: React.ReactNode | IContextMenuContentItemRenderer;
};

/**
 * コンテキストメニュー項目を表示するコンテンツ要素です。
 */
export const ContextMenuContent: IComponent<ContextMenuContentProps> =
  function SuiContextMenuContent(props) {
    const ctx = useSuiContextMenuContext();
    const { children = defaultContentItemRenderer, className, ...otherProps } = props;

    return (
      <ContextMenu.Popup {...otherProps} className={cn(className, "sui_context_menu_content")}>
        {typeof children === "function" ? ctx.items.map(children) : children}
      </ContextMenu.Popup>
    );
  };

const defaultContentItemRenderer: IContextMenuContentItemRenderer = (item, index) => {
  if (!isItemObject(item)) {
    return toReactNode(item);
  }

  const { label, items: subItems, ...otherItemProps } = item;
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
  /**
   * {@link ContextMenuContentState}
   */
  export type State = ContextMenuContentState;

  /**
   * {@link ContextMenuContentProps}
   */
  export type Props = ContextMenuContentProps;

  /**
   * {@link ContextMenuRootItemObject}
   */
  export type ItemObject = ContextMenuRootItemObject;

  /**
   * {@link IContextMenuContentItemRenderer}
   */
  export interface IItemRenderer<TItem = any> extends IContextMenuContentItemRenderer<TItem> {}
}

// Item
// ----

/**
 * {@link ContextMenuItem} が持つ状態です。
 */
export type ContextMenuItemState = ContextMenu.Item.State;

/**
 * {@link ContextMenuItem} に渡す props です。
 */
export type ContextMenuItemProps = React.ComponentProps<typeof ContextMenu.Item>;

/**
 * コンテキストメニューの操作項目です。
 */
export const ContextMenuItem: IComponent<ContextMenuItemProps> = function SuiContextMenuItem(
  props,
) {
  const ctx = useContextMenuContext();
  const { render = <div />, className, ...otherProps } = props;

  return (
    <ContextMenu.Item
      {...otherProps}
      render={(htmlProps: {}, state) => (
        <ButtonRoot
          {...htmlProps}
          item
          size={ctx.size}
          color="grey"
          render={renderer(render, state)}
          variant="naked"
          disabled={state.disabled}
          nativeButton={false}
        />
      )}
      className={cn(className, "sui_context_menu_item")}
    />
  );
};

export { ContextMenuItem as Item };

export namespace Item {
  /**
   * {@link ContextMenuItemState}
   */
  export type State = ContextMenuItemState;

  /**
   * {@link ContextMenuItemProps}
   */
  export type Props = ContextMenuItemProps;
}

// LinkItem
// --------

/**
 * {@link ContextMenuLinkItem} が持つ状態です。
 */
export type ContextMenuLinkItemState = ContextMenu.LinkItem.State;

/**
 * {@link ContextMenuLinkItem} に渡す props です。
 */
export type ContextMenuLinkItemProps = React.ComponentProps<typeof ContextMenu.LinkItem>;

/**
 * 別のページやセクションへ移動するコンテキストメニュー項目です。
 */
export const ContextMenuLinkItem: IComponent<ContextMenuLinkItemProps> =
  function SuiContextMenuLinkItem(props) {
    const ctx = useContextMenuContext();
    // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
    const { render = <a />, className, ...otherProps } = props;

    return (
      <ContextMenu.LinkItem
        {...otherProps}
        render={(htmlProps: {}, state) => (
          <ButtonRoot
            {...htmlProps}
            item
            size={ctx.size}
            color="grey"
            render={renderer(render, state)}
            variant="naked"
            nativeButton={false}
          />
        )}
        className={cn(className, "sui_context_menu_item", "sui_context_menu_link_item")}
      />
    );
  };

export { ContextMenuLinkItem as LinkItem };

export namespace LinkItem {
  /**
   * {@link ContextMenuLinkItemState}
   */
  export type State = ContextMenuLinkItemState;

  /**
   * {@link ContextMenuLinkItemProps}
   */
  export type Props = ContextMenuLinkItemProps;
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

/**
 * {@link ContextMenuSubmenuRoot} に渡す props です。
 */
export type ContextMenuSubmenuRootProps = React.ComponentProps<typeof ContextMenu.SubmenuRoot>;

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
  /**
   * {@link ContextMenuSubmenuRootState}
   */
  export type State = ContextMenuSubmenuRootState;

  /**
   * {@link ContextMenuSubmenuRootProps}
   */
  export type Props = ContextMenuSubmenuRootProps;

  /**
   * {@link ContextMenuSubmenuRootChangeEventDetails}
   */
  export type ChangeEventDetails = ContextMenuSubmenuRootChangeEventDetails;

  /**
   * {@link ContextMenuSubmenuRootChangeEventReason}
   */
  export type ChangeEventReason = ContextMenuSubmenuRootChangeEventReason;
}

// SubmenuTrigger
// --------------

/**
 * {@link ContextMenuSubmenuTrigger} が持つ状態です。
 */
export type ContextMenuSubmenuTriggerState = ContextMenu.SubmenuTrigger.State;

/**
 * {@link ContextMenuSubmenuTrigger} に渡す props です。
 */
export type ContextMenuSubmenuTriggerProps = React.ComponentProps<
  typeof ContextMenu.SubmenuTrigger
>;

/**
 * サブメニューを開くコンテキストメニュー項目です。
 */
export const ContextMenuSubmenuTrigger: IComponent<ContextMenuSubmenuTriggerProps> =
  function SuiContextMenuSubmenuTrigger(props) {
    const ctx = useContextMenuContext();
    const { render = <div />, className, ...otherProps } = props;

    return (
      <ContextMenu.SubmenuTrigger
        {...otherProps}
        render={(htmlProps: {}, state) => (
          <ButtonRoot
            {...htmlProps}
            item
            size={ctx.size}
            color="grey"
            render={renderer(render, state)}
            variant="naked"
            disabled={state.disabled}
            nativeButton={false}
          />
        )}
        className={cn(className, "sui_context_menu_item", "sui_context_menu_submenu_trigger")}
      />
    );
  };

export { ContextMenuSubmenuTrigger as SubmenuTrigger };

export namespace SubmenuTrigger {
  /**
   * {@link ContextMenuSubmenuTriggerState}
   */
  export type State = ContextMenuSubmenuTriggerState;

  /**
   * {@link ContextMenuSubmenuTriggerProps}
   */
  export type Props = ContextMenuSubmenuTriggerProps;
}

// Group
// -----

/**
 * {@link ContextMenuGroup} が持つ状態です。
 */
export type ContextMenuGroupState = ContextMenu.Group.State;

/**
 * {@link ContextMenuGroup} に渡す props です。
 */
export type ContextMenuGroupProps = React.ComponentProps<typeof ContextMenu.Group>;

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
  /**
   * {@link ContextMenuGroupState}
   */
  export type State = ContextMenuGroupState;

  /**
   * {@link ContextMenuGroupProps}
   */
  export type Props = ContextMenuGroupProps;
}

// GroupLabel
// ----------

/**
 * {@link ContextMenuGroupLabel} が持つ状態です。
 */
export type ContextMenuGroupLabelState = ContextMenu.GroupLabel.State;

/**
 * {@link ContextMenuGroupLabel} に渡す props です。
 */
export type ContextMenuGroupLabelProps = React.ComponentProps<typeof ContextMenu.GroupLabel>;

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
  /**
   * {@link ContextMenuGroupLabelState}
   */
  export type State = ContextMenuGroupLabelState;

  /**
   * {@link ContextMenuGroupLabelProps}
   */
  export type Props = ContextMenuGroupLabelProps;
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

/**
 * {@link ContextMenuRadioGroup} に渡す props です。
 */
export type ContextMenuRadioGroupProps = React.ComponentProps<typeof ContextMenu.RadioGroup>;

/**
 * ラジオ項目をまとめるグループ要素です。
 */
export const ContextMenuRadioGroup: IComponent<ContextMenuRadioGroupProps> =
  function SuiContextMenuRadioGroup(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.RadioGroup
        {...otherProps}
        className={cn(className, "sui_context_menu_radio_group")}
      />
    );
  };

export { ContextMenuRadioGroup as RadioGroup };

export namespace RadioGroup {
  /**
   * {@link ContextMenuRadioGroupState}
   */
  export type State = ContextMenuRadioGroupState;

  /**
   * {@link ContextMenuRadioGroupProps}
   */
  export type Props = ContextMenuRadioGroupProps;

  /**
   * {@link ContextMenuRadioGroupChangeEventDetails}
   */
  export type ChangeEventDetails = ContextMenuRadioGroupChangeEventDetails;

  /**
   * {@link ContextMenuRadioGroupChangeEventReason}
   */
  export type ChangeEventReason = ContextMenuRadioGroupChangeEventReason;
}

// RadioItem
// ---------

/**
 * {@link ContextMenuRadioItem} が持つ状態です。
 */
export type ContextMenuRadioItemState = ContextMenu.RadioItem.State;

/**
 * {@link ContextMenuRadioItem} に渡す props です。
 */
export type ContextMenuRadioItemProps = React.ComponentProps<typeof ContextMenu.RadioItem>;

/**
 * ラジオグループ内のコンテキストメニュー項目です。
 */
export const ContextMenuRadioItem: IComponent<ContextMenuRadioItemProps> =
  function SuiContextMenuRadioItem(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.RadioItem
        {...otherProps}
        className={cn(className, "sui_context_menu_item", "sui_context_menu_radio_item")}
      />
    );
  };

export { ContextMenuRadioItem as RadioItem };

export namespace RadioItem {
  /**
   * {@link ContextMenuRadioItemState}
   */
  export type State = ContextMenuRadioItemState;

  /**
   * {@link ContextMenuRadioItemProps}
   */
  export type Props = ContextMenuRadioItemProps;
}

// RadioItemIndicator
// ------------------

/**
 * {@link ContextMenuRadioItemIndicator} が持つ状態です。
 */
export type ContextMenuRadioItemIndicatorState = ContextMenu.RadioItemIndicator.State;

/**
 * {@link ContextMenuRadioItemIndicator} に渡す props です。
 */
export type ContextMenuRadioItemIndicatorProps = React.ComponentProps<
  typeof ContextMenu.RadioItemIndicator
>;

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
        )}
        keepMounted={keepMounted}
      />
    );
  };

export { ContextMenuRadioItemIndicator as RadioItemIndicator };

export namespace RadioItemIndicator {
  /**
   * {@link ContextMenuRadioItemIndicatorState}
   */
  export type State = ContextMenuRadioItemIndicatorState;

  /**
   * {@link ContextMenuRadioItemIndicatorProps}
   */
  export type Props = ContextMenuRadioItemIndicatorProps;
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
 * {@link ContextMenuCheckboxItem} が持つ状態です。
 */
export type ContextMenuCheckboxItemState = ContextMenu.CheckboxItem.State;

/**
 * {@link ContextMenuCheckboxItem} に渡す props です。
 */
export type ContextMenuCheckboxItemProps = React.ComponentProps<typeof ContextMenu.CheckboxItem>;

/**
 * 設定をオンまたはオフにできるコンテキストメニュー項目です。
 */
export const ContextMenuCheckboxItem: IComponent<ContextMenuCheckboxItemProps> =
  function SuiContextMenuCheckboxItem(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.CheckboxItem
        {...otherProps}
        className={cn(className, "sui_context_menu_item", "sui_context_menu_checkbox_item")}
      />
    );
  };

export { ContextMenuCheckboxItem as CheckboxItem };

export namespace CheckboxItem {
  /**
   * {@link ContextMenuCheckboxItemState}
   */
  export type State = ContextMenuCheckboxItemState;

  /**
   * {@link ContextMenuCheckboxItemProps}
   */
  export type Props = ContextMenuCheckboxItemProps;

  /**
   * {@link ContextMenuCheckboxItemChangeEventDetails}
   */
  export type ChangeEventDetails = ContextMenuCheckboxItemChangeEventDetails;

  /**
   * {@link ContextMenuCheckboxItemChangeEventReason}
   */
  export type ChangeEventReason = ContextMenuCheckboxItemChangeEventReason;
}

// CheckboxItemIndicator
// ---------------------

/**
 * {@link ContextMenuCheckboxItemIndicator} が持つ状態です。
 */
export type ContextMenuCheckboxItemIndicatorState = ContextMenu.CheckboxItemIndicator.State;

/**
 * {@link ContextMenuCheckboxItemIndicator} に渡す props です。
 */
export type ContextMenuCheckboxItemIndicatorProps = React.ComponentProps<
  typeof ContextMenu.CheckboxItemIndicator
>;

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
        )}
      />
    );
  };

export { ContextMenuCheckboxItemIndicator as CheckboxItemIndicator };

export namespace CheckboxItemIndicator {
  /**
   * {@link ContextMenuCheckboxItemIndicatorState}
   */
  export type State = ContextMenuCheckboxItemIndicatorState;

  /**
   * {@link ContextMenuCheckboxItemIndicatorProps}
   */
  export type Props = ContextMenuCheckboxItemIndicatorProps;
}

// Separator
// ---------

/**
 * {@link ContextMenuSeparator} が持つ状態です。
 */
export type ContextMenuSeparatorState = ContextMenu.Separator.State;

/**
 * {@link ContextMenuSeparator} に渡す props です。
 */
export type ContextMenuSeparatorProps = React.ComponentProps<typeof ContextMenu.Separator>;

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
  /**
   * {@link ContextMenuSeparatorState}
   */
  export type State = ContextMenuSeparatorState;

  /**
   * {@link ContextMenuSeparatorProps}
   */
  export type Props = ContextMenuSeparatorProps;
}
