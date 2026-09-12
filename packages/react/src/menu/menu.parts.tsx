import type { NativeButtonProps, NonNativeButtonProps } from "@base-ui/react/internals/types";
import { Menu } from "@base-ui/react/menu";
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
} from "./_menu.jsx";

import "./menu.css";

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
type MenuContextRadius = "none" | Size;

/**
 * ポップアップと項目の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
type MenuContextSize = Size;

/**
 * 項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
type MenuContextVariant = Button.Root.Variant;

/**
 * {@link MenuRoot} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuContext<TItem = any> = {
  /**
   * メニューの項目です。
   */
  readonly items: readonly TItem[];

  /**
   * ポップアップに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * ポップアップと項目の角丸です。
   */
  readonly radius: MenuContextRadius;

  /**
   * ポップアップと項目の大きさです。
   */
  readonly size: MenuContextSize;

  /**
   * 項目の主な外観です。
   */
  readonly variant: MenuContextVariant;
};

/**
 * メニューのスタイルを子要素へ伝播するコンテキストです。
 */
export const MenuContext: React.Context<MenuContext | null> =
  React.createContext<MenuContext | null>(null);

function useSuiMenuContext(optional?: false): MenuContext;
function useSuiMenuContext(optional?: boolean): MenuContext | null;
function useSuiMenuContext(optional?: boolean): MenuContext | null {
  const ctx = React.use(MenuContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuContext",
      providerName: "MenuRoot",
    });
  }

  return ctx;
}

/**
 * {@link MenuContext} を読み取るフックです。
 */
export const useMenuContext: IUseContext<MenuContext> = useSuiMenuContext;

export { MenuContext as Context, useMenuContext as useContext };

export namespace Context {
  export type Radius = MenuContextRadius;

  export type Size = MenuContextSize;

  export type Variant = MenuContextVariant;
}

// Handle
// ------

/**
 * メニューを制御するハンドルです。
 */
export type MenuHandle<TPayload = any> = Menu.Handle<TPayload>;

/**
 * メニューを制御するハンドルを新しく作成します。
 *
 * 作成したハンドルを {@link Root} と {@link Trigger} の `handle` props に渡すことで、トリガーとメニューの内容を関連付けます。
 */
export const createHandle: typeof Menu.createHandle = Menu.createHandle;

// Root
// ----

/**
 * {@link MenuRoot} を命令的に操作するためのオブジェクトです。
 */
export type MenuRootActions = Menu.Root.Actions;

/**
 * {@link MenuRoot} の開閉状態を変更されるイベントの詳細です。
 */
export type MenuRootChangeEventDetails = Menu.Root.ChangeEventDetails;

/**
 * {@link MenuRoot} の開閉状態が変更される理由です。
 */
export type MenuRootChangeEventReason = Menu.Root.ChangeEventReason;

/**
 * {@link MenuRoot} の向きです。
 */
export type MenuRootOrientation = Menu.Root.Orientation;

/**
 * {@link MenuRoot} の通常項目です。
 *
 * `label` を含み、その他の props は {@link MenuItem} に渡されます。
 * `items` を指定した場合はサブメニューとして描画されます。
 */
export type MenuRootActionItemObject = Omit<MenuItemProps, "children" | "label"> & {
  /**
   * 子項目です。
   *
   * 指定した場合はサブメニューとして描画されます。
   */
  readonly items?: readonly MenuRootItemObject[] | undefined;

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
 * {@link MenuRoot} のチェックボックス項目です。
 *
 * `label` を含み、その他の props は {@link MenuCheckboxItem} に渡されます。
 */
export type MenuRootCheckboxItemObject = Omit<MenuCheckboxItemProps, "children" | "label"> & {
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
 * {@link MenuRoot} のグループです。
 *
 * `label` と `items` を含み、その他の props は {@link MenuGroup} に渡されます。
 * `label` を指定した場合は {@link MenuGroupLabel} として描画されます。
 * 子項目には {@link MenuRootItemObject} を指定します。
 */
export type MenuRootGroupObject = Omit<MenuGroupProps, "children"> & {
  /**
   * 子項目です。
   */
  readonly items: readonly MenuRootItemObject[];

  /**
   * グループのラベルです。
   *
   * 指定した場合は {@link MenuGroupLabel} として描画されます。
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
 * {@link MenuRoot} のリンク項目です。
 *
 * `label` を含み、その他の props は {@link MenuLinkItem} に渡されます。
 */
export type MenuRootLinkItemObject = Omit<MenuLinkItemProps, "children" | "label"> & {
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
 * {@link MenuRoot} のラジオグループです。
 *
 * `items` を含み、その他の props は {@link MenuRadioGroup} に渡されます。
 * 子項目には {@link MenuRootRadioItemObject} を指定します。
 */
export type MenuRootRadioGroupObject = Omit<MenuRadioGroupProps, "children"> & {
  /**
   * ラジオ項目です。
   */
  readonly items: readonly MenuRootRadioItemObject[];

  /**
   * 項目の種類です。
   *
   * - `"radio-group"`: ラジオグループ
   */
  readonly type: "radio-group";
};

/**
 * {@link MenuRoot} のラジオ項目です。
 *
 * `label` と `value` を含み、その他の props は {@link MenuRadioItem} に渡されます。
 * 単体では選択状態を保持できないため、`items` ではなく {@link MenuRootRadioGroupObject} の子項目として指定します。
 */
export type MenuRootRadioItemObject = Omit<MenuRadioItemProps, "children" | "label"> & {
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
 * {@link MenuRoot} の区切り線です。
 *
 * その他の props は {@link MenuSeparator} に渡されます。
 */
export type MenuRootSeparatorObject = Omit<MenuSeparatorProps, "children"> & {
  /**
   * 項目の種類です。
   *
   * - `"separator"`: 区切り線
   */
  readonly type: "separator";
};

/**
 * {@link MenuRoot} の各項目です。
 *
 * `type` によって通常項目、チェックボックス項目、グループ、リンク項目、ラジオ項目、ラジオグループ、区切り線を使い分けます。
 * `type` を省略した場合は通常項目として描画されます。
 */
export type MenuRootItemObject =
  | MenuRootActionItemObject
  | MenuRootCheckboxItemObject
  | MenuRootGroupObject
  | MenuRootLinkItemObject
  | MenuRootRadioGroupObject
  | MenuRootRadioItemObject
  | MenuRootSeparatorObject;

/**
 * メニューの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type MenuRootRadius = "none" | Size;

/**
 * メニューの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type MenuRootSize = Size;

/**
 * メニューの項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuRootVariant = Button.Root.Variant;

/**
 * {@link MenuRoot} が持つ状態です。
 */
export type MenuRootState = Menu.Root.State;

export namespace MenuRootProps {
  export type Render = RenderProps<MenuRootState>;

  export type SuruUI<TPayload = any, TItem = any> = {
    /**
     * メニューとトリガー ({@link Trigger}) を関連付けるハンドルです。
     *
     * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
     */
    handle?: MenuHandle<TPayload> | undefined;

    /**
     * メニューの項目です。
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
     * 既定値は {@link MenuRootProps.size|size} です。
     */
    radius?: MenuRootRadius | undefined;

    /**
     * ポップアップと項目の大きさを指定します。
     *
     * @default "md"
     */
    size?: MenuRootSize | undefined;

    /**
     * 項目の主な外観を指定します。
     *
     * @default "naked"
     */
    variant?: MenuRootVariant | undefined;
  };

  export type BaseUI<TPayload = any> = Pick<
    Menu.Root.Props<TPayload>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuRootProps:
      | "defaultOpen"
      | "loopFocus"
      | "highlightItemOnHover"
      | "modal"
      | "onOpenChange"
      | "onOpenChangeComplete"
      | "open"
      | "orientation"
      | "disabled"
      | "closeParentOnEsc"
      | "actionsRef"
      | "triggerId"
      | "defaultTriggerId"
      | "handle"
      | "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    Menu.Root.Props<TPayload>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuRoot} に渡す props です。
 *
 * @template TPayload 開いたときに渡される値の型です。
 * @template TItem 項目の型です。
 */
export type MenuRootProps<TPayload = any, TItem = any> = MenuRootProps.Render &
  MenuRootProps.SuruUI<TPayload, TItem> &
  MenuRootProps.BaseUI<TPayload> &
  MenuRootProps.HTML<TPayload>;

interface IMenuRoot extends IComponent<MenuRootProps> {
  /**
   * @template TPayload 開いたときに渡される値の型です。
   * @template TItem 項目の型です。
   */
  <TPayload = any, TItem = any>(props: MenuRootProps<TPayload, TItem>): IComponent.Return;
}

/**
 * ボタンから開くメニューのルートです。
 *
 * 開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const MenuRoot: IMenuRoot = function SuiMenuRoot(props: MenuRootProps) {
  const {
    size = "md",
    items = [],
    radius = size,
    variant = "naked",
    outlined = false,
    ...otherProps
  } = props;
  const ctx = React.useMemo<MenuContext>(
    () => ({ size, items, radius, variant, outlined }),
    [size, items, radius, variant, outlined],
  );

  return (
    <MenuContext value={ctx}>
      <Menu.Root {...otherProps} />
    </MenuContext>
  );
};

export { MenuRoot as Root };

export namespace Root {
  export type State = MenuRootState;

  export type Props<TPayload = any, TItem = any> = Props.Render &
    Props.SuruUI<TPayload, TItem> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = MenuRootProps.Render;

    export type SuruUI<TPayload = any, TItem = any> = MenuRootProps.SuruUI<TPayload, TItem>;

    export type BaseUI<TPayload = any> = MenuRootProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = MenuRootProps.HTML<TPayload>;
  }

  export type ActionItemObject = MenuRootActionItemObject;

  export type Actions = MenuRootActions;

  export type ChangeEventDetails = MenuRootChangeEventDetails;

  export type ChangeEventReason = MenuRootChangeEventReason;

  export type CheckboxItemObject = MenuRootCheckboxItemObject;

  export type GroupObject = MenuRootGroupObject;

  export type ItemObject = MenuRootItemObject;

  export type LinkItemObject = MenuRootLinkItemObject;

  export type Orientation = MenuRootOrientation;

  export type RadioGroupObject = MenuRootRadioGroupObject;

  export type RadioItemObject = MenuRootRadioItemObject;

  export type Radius = MenuRootRadius;

  export type SeparatorObject = MenuRootSeparatorObject;

  export type Size = MenuRootSize;

  export type Variant = MenuRootVariant;
}

// Trigger
// -------

/**
 * {@link MenuTrigger} が持つ状態です。
 */
export type MenuTriggerState = Menu.Trigger.State;

export namespace MenuTriggerProps {
  export type Render = RenderProps<MenuTriggerState>;

  export type SuruUI<TPayload = any> = {
    /**
     * トリガーとしてレンダリングする要素です。
     *
     * {@link Menu.Trigger} の `render` props と同じ型で、そのまま `render` に渡されます。
     */
    children: NonNullable<Menu.Trigger.Props<TPayload>["render"]>;

    /**
     * メニュー ({@link Root}) を関連付けるハンドルです。
     *
     * {@link createHandle} で作成し、{@link Root} と共有します。Root 内に配置する場合は省略できます。
     */
    handle?: MenuHandle<TPayload> | undefined;
  };

  export type BaseUI<TPayload = any> = Pick<
    Menu.Trigger.Props<TPayload>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // MenuTriggerProps:
      | "disabled"
      | "payload"
      | "delay"
      | "closeDelay"
      | "openOnHover",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    Menu.Trigger.Props<TPayload>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuTrigger} に渡す props です。
 *
 * @template TPayload 開いたときに渡される値の型です。
 */
export type MenuTriggerProps<TPayload = any> = MenuTriggerProps.Render &
  MenuTriggerProps.SuruUI<TPayload> &
  MenuTriggerProps.BaseUI<TPayload> &
  MenuTriggerProps.HTML<TPayload>;

interface IMenuTrigger extends IComponent<MenuTriggerProps> {
  /**
   * @template TPayload 開いたときに渡される値の型です。
   */
  <TPayload = any>(props: MenuTriggerProps<TPayload>): IComponent.Return;
}

/**
 * メニューを開くトリガーです。
 *
 * 子要素は追加のラッパーなしで `button` 要素に表示されます。
 */
export const MenuTrigger: IMenuTrigger = function SuiMenuTrigger(props: MenuTriggerProps) {
  const { handle, children, className, ...otherProps } = props;

  return (
    <Menu.Trigger
      {...otherProps}
      handle={handle}
      render={children}
      className={cn(
        className,
        "sui_menu_trigger",
        (state) => state.open && "sui_menu_trigger-open",
        (state) => state.disabled && "sui_menu_trigger-disabled",
      )}
    />
  );
};

export { MenuTrigger as Trigger };

export namespace Trigger {
  export type State = MenuTriggerState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = MenuTriggerProps.Render;

    export type SuruUI<TPayload = any> = MenuTriggerProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = MenuTriggerProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = MenuTriggerProps.HTML<TPayload>;
  }
}

// Portal
// ------

/**
 * {@link MenuPortal} が持つ状態です。
 */
export type MenuPortalState = Menu.Portal.State;

export namespace MenuPortalProps {
  export type Render = RenderProps<MenuPortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuPortalProps:
      "keepMounted" | "container",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuPortal} に渡す props です。
 */
export type MenuPortalProps = MenuPortalProps.Render &
  MenuPortalProps.SuruUI &
  MenuPortalProps.BaseUI &
  MenuPortalProps.HTML;

/**
 * メニューを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const MenuPortal: IComponent<MenuPortalProps> = function SuiMenuPortal(props) {
  const ctx = useMenuContext();
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Menu.Portal
      {...otherProps}
      className={cn(
        className,
        "sui_menu_portal",
        `sui_menu_portal-size_${ctx.size}`,
        `sui_menu_portal-radius_${ctx.radius}`,
        ctx.outlined && "sui_menu_portal-outlined",
      )}
      data-scope={dataScope}
    />
  );
};

export { MenuPortal as Portal };

export namespace Portal {
  export type State = MenuPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuPortalProps.Render;

    export type SuruUI = MenuPortalProps.SuruUI;

    export type BaseUI = MenuPortalProps.BaseUI;

    export type HTML = MenuPortalProps.HTML;
  }
}

// Backdrop
// --------

/**
 * {@link MenuBackdrop} が持つ状態です。
 */
export type MenuBackdropState = Menu.Backdrop.State;

export namespace MenuBackdropProps {
  export type Render = RenderProps<MenuBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuBackdropProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuBackdrop} に渡す props です。
 */
export type MenuBackdropProps = MenuBackdropProps.Render &
  MenuBackdropProps.SuruUI &
  MenuBackdropProps.BaseUI &
  MenuBackdropProps.HTML;

/**
 * メニューの背後に表示されるオーバーレイ要素です。
 */
export const MenuBackdrop: IComponent<MenuBackdropProps> = function SuiMenuBackdrop(props) {
  const { className, ...otherProps } = props;

  return <Menu.Backdrop {...otherProps} className={cn(className, "sui_menu_backdrop")} />;
};

export { MenuBackdrop as Backdrop };

export namespace Backdrop {
  export type State = MenuBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuBackdropProps.Render;

    export type SuruUI = MenuBackdropProps.SuruUI;

    export type BaseUI = MenuBackdropProps.BaseUI;

    export type HTML = MenuBackdropProps.HTML;
  }
}

// Positioner
// ----------

/**
 * {@link MenuPositioner} が持つ状態です。
 */
export type MenuPositionerState = Menu.Positioner.State;

export namespace MenuPositionerProps {
  export type Render = RenderProps<MenuPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Positioner>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // UseAnchorPositioningSharedParameters:
      | "anchor"
      | "positionMethod"
      | "side"
      | "sideOffset"
      | "align"
      | "alignOffset"
      | "collisionBoundary"
      | "collisionPadding"
      | "sticky"
      | "arrowPadding"
      | "disableAnchorTracking"
      | "collisionAvoidance",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuPositioner} に渡す props です。
 */
export type MenuPositionerProps = MenuPositionerProps.Render &
  MenuPositionerProps.SuruUI &
  MenuPositionerProps.BaseUI &
  MenuPositionerProps.HTML;

/**
 * ポップアップをトリガーに位置合わせする要素です。
 */
export const MenuPositioner: IComponent<MenuPositionerProps> = function SuiMenuPositioner(props) {
  const { className, ...otherProps } = props;

  return <Menu.Positioner {...otherProps} className={cn(className, "sui_menu_positioner")} />;
};

export { MenuPositioner as Positioner };

export namespace Positioner {
  export type State = MenuPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuPositionerProps.Render;

    export type SuruUI = MenuPositionerProps.SuruUI;

    export type BaseUI = MenuPositionerProps.BaseUI;

    export type HTML = MenuPositionerProps.HTML;
  }
}

// Popup
// -----

/**
 * ポップアップの各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IMenuPopupItemRenderer<TItem = any> {
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
 * {@link MenuPopup} が持つ状態です。
 */
export type MenuPopupState = Menu.Popup.State;

export namespace MenuPopupProps {
  export type Render = RenderProps<MenuPopupState>;

  export type SuruUI = {
    /**
     * ポップアップの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link MenuRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IMenuPopupItemRenderer;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuPopupProps:
      "id" | "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuPopup} に渡す props です。
 */
export type MenuPopupProps = MenuPopupProps.Render &
  MenuPopupProps.SuruUI &
  MenuPopupProps.BaseUI &
  MenuPopupProps.HTML;

/**
 * メニュー項目を表示するポップアップ要素です。
 */
export const MenuPopup: IComponent<MenuPopupProps> = function SuiMenuPopup(props) {
  const ctx = useMenuContext();
  const { children = defaultPopupItemRenderer, className, ...otherProps } = props;

  return (
    <Menu.Popup
      {...otherProps}
      className={cn(
        className,
        "sui_menu_popup",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_menu_popup-transition_status_${state.transitionStatus}`,
      )}
    >
      {typeof children === "function" ? ctx.items.map(children) : children}
    </Menu.Popup>
  );
};

const defaultRadioItemRenderer: IMenuPopupItemRenderer = (item, index) => {
  if (!isRadioItemObject(item)) {
    return toReactNode(item);
  }

  const { type: _, label, ...otherItemProps } = item;

  return (
    <MenuRadioItem key={index} {...otherItemProps}>
      {toReactNode(label)}
      <MenuRadioItemIndicator>
        <CheckIcon />
      </MenuRadioItemIndicator>
    </MenuRadioItem>
  );
};

const defaultPopupItemRenderer: IMenuPopupItemRenderer = (item, index, items) => {
  if (isSeparatorObject(item)) {
    const { type: _, ...otherProps } = item;

    return <MenuSeparator key={index} {...otherProps} />;
  }

  if (isRadioGroupObject(item)) {
    const { type: _, items: radioItems, ...otherGroupProps } = item;

    return (
      <MenuRadioGroup key={index} {...otherGroupProps}>
        {radioItems.map(defaultRadioItemRenderer)}
      </MenuRadioGroup>
    );
  }

  if (isGroupObject(item)) {
    const { type: _, items: groupItems, label, ...otherGroupProps } = item;
    const labelNode = toReactNode(label);

    return (
      <MenuGroup key={index} {...otherGroupProps}>
        {labelNode === null ? null : <MenuGroupLabel>{labelNode}</MenuGroupLabel>}
        {groupItems.map(defaultPopupItemRenderer)}
      </MenuGroup>
    );
  }

  if (!isItemObject(item)) {
    return toReactNode(item);
  }

  if (isCheckboxItemObject(item)) {
    const { type: _, label, ...otherItemProps } = item;

    return (
      <MenuCheckboxItem key={index} {...otherItemProps}>
        {toReactNode(label)}
        <MenuCheckboxItemIndicator>
          <CheckIcon />
        </MenuCheckboxItemIndicator>
      </MenuCheckboxItem>
    );
  }

  if (isRadioItemObject(item)) {
    return defaultRadioItemRenderer(item, index, items);
  }

  if (isLinkItemObject(item)) {
    const { type: _, label, ...otherItemProps } = item;

    return (
      <MenuLinkItem key={index} {...otherItemProps}>
        {toReactNode(label)}
      </MenuLinkItem>
    );
  }

  const { type: _, items: subItems, label, ...otherItemProps } = item;
  if (!subItems) {
    return (
      <MenuItem key={index} {...otherItemProps}>
        {toReactNode(label)}
      </MenuItem>
    );
  }

  return (
    <MenuSubmenuRoot key={index}>
      <MenuSubmenuTrigger {...otherItemProps}>
        {toReactNode(label)}
        <ChevronRightIcon />
      </MenuSubmenuTrigger>
      <MenuPortal>
        <MenuPositioner>
          <MenuPopup>{subItems.map(defaultPopupItemRenderer)}</MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </MenuSubmenuRoot>
  );
};

export { MenuPopup as Popup };

export namespace Popup {
  export type State = MenuPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuPopupProps.Render;

    export type SuruUI = MenuPopupProps.SuruUI;

    export type BaseUI = MenuPopupProps.BaseUI;

    export type HTML = MenuPopupProps.HTML;
  }

  export type ItemObject = MenuRootItemObject;

  export interface IItemRenderer<TItem = any> extends IMenuPopupItemRenderer<TItem> {}
}

// Arrow
// -----

/**
 * {@link MenuArrow} が持つ状態です。
 */
export type MenuArrowState = Menu.Arrow.State;

export namespace MenuArrowProps {
  export type Render = RenderProps<MenuArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Arrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuArrowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuArrow} に渡す props です。
 */
export type MenuArrowProps = MenuArrowProps.Render &
  MenuArrowProps.SuruUI &
  MenuArrowProps.BaseUI &
  MenuArrowProps.HTML;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const MenuArrow: IComponent<MenuArrowProps> = function SuiMenuArrow(props) {
  const { className, ...otherProps } = props;

  return <Menu.Arrow {...otherProps} className={cn(className, "sui_menu_arrow")} />;
};

export { MenuArrow as Arrow };

export namespace Arrow {
  export type State = MenuArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuArrowProps.Render;

    export type SuruUI = MenuArrowProps.SuruUI;

    export type BaseUI = MenuArrowProps.BaseUI;

    export type HTML = MenuArrowProps.HTML;
  }
}

// Viewport
// --------

/**
 * {@link MenuViewport} が持つ状態です。
 */
export type MenuViewportState = Menu.Viewport.State;

export namespace MenuViewportProps {
  export type Render = RenderProps<MenuViewportState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Viewport>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuViewportProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuViewport} に渡す props です。
 */
export type MenuViewportProps = MenuViewportProps.Render &
  MenuViewportProps.SuruUI &
  MenuViewportProps.BaseUI &
  MenuViewportProps.HTML;

/**
 * トリガーの切り替えに伴うメニュー内容のアニメーション用ビューポートです。
 */
export const MenuViewport: IComponent<MenuViewportProps> = function SuiMenuViewport(props) {
  const { className, ...otherProps } = props;

  return <Menu.Viewport {...otherProps} className={cn(className, "sui_menu_viewport")} />;
};

export { MenuViewport as Viewport };

export namespace Viewport {
  export type State = MenuViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuViewportProps.Render;

    export type SuruUI = MenuViewportProps.SuruUI;

    export type BaseUI = MenuViewportProps.BaseUI;

    export type HTML = MenuViewportProps.HTML;
  }
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
 * メニューの操作項目の配色です。
 */
export type MenuItemColor = Button.Root.Color;

/**
 * メニューの操作項目の角丸です。
 */
export type MenuItemRadius = Button.Root.Radius;

/**
 * メニューの操作項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuItemVariant = Button.Root.Variant;

/**
 * {@link MenuItem} が持つ状態です。
 */
export type MenuItemState = Override<Button.Root.State, Menu.Item.State>;

export namespace MenuItemProps {
  export type Render = RenderProps<MenuItemState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: MenuItemColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link MenuRootProps.radius|radius} です。
     */
    radius?: MenuItemRadius | undefined;

    /**
     * チェック状態のときの外観を指定します。
     *
     * チェックされていないときは常に `"naked"` になります。
     *
     * 既定値は {@link MenuRootProps.variant|variant} です。
     */
    variant?: MenuItemVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Menu.Item>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // NonNativeButtonProps:
        | keyof NonNativeButtonProps
        // MenuItemProps:
        | "onClick"
        | "disabled"
        | "label"
        | "id"
        | "closeOnClick",
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Item>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuItem} に渡す props です。
 */
export type MenuItemProps = MenuItemProps.Render &
  MenuItemProps.SuruUI &
  MenuItemProps.BaseUI &
  MenuItemProps.HTML;

/**
 * メニューの操作項目です。
 */
export const MenuItem: IComponent<MenuItemProps> = function SuiMenuItem(props) {
  const ctx = useMenuContext();
  const {
    id,
    color = "grey",
    label,
    style,
    radius = ctx.radius,
    render,
    onClick,
    variant = ctx.variant,
    disabled,
    className,
    closeOnClick,
    nativeButton = false,
    focusableWhenDisabled,
    ...otherProps
  } = props;
  const baseuiProps: Required<MenuItemProps.BaseUI> = {
    id,
    label,
    onClick,
    disabled,
    closeOnClick,
    nativeButton,
    focusableWhenDisabled,
  };

  return (
    <Menu.Item
      {...otherProps}
      {...baseuiProps}
      render={(htmlProps: {}, state) => {
        const buttonRootProps: Required<
          Button.Root.Props.SuruUI &
            Button.Root.Props.BaseUI &
            Pick<Button.Root.Props.HTML, "disabled">
        > = {
          item: true,
          size: ctx.size,
          color,
          muted: undefined,
          radius,
          pending: undefined,
          squared: undefined,
          variant: getItemVariant(state, variant),
          disabled: state.disabled,
          outlined: undefined,
          nativeButton,
          focusableWhenDisabled,
        };

        return (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              buttonRootProps,
              proxyRenderProps(state, {
                style,
                render: render ?? <div />,
                className: cn(
                  className,
                  "sui_menu_item",
                  (state) => state.disabled && "sui_menu_item-disabled",
                  (state) => state.highlighted && "sui_menu_item-highlighted",
                ),
              }),
            ])}
          />
        );
      }}
    />
  );
};

export { MenuItem as Item };

export namespace Item {
  export type State = MenuItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuItemProps.Render;

    export type SuruUI = MenuItemProps.SuruUI;

    export type BaseUI = MenuItemProps.BaseUI;

    export type HTML = MenuItemProps.HTML;
  }

  export type Color = MenuItemColor;

  export type Radius = MenuItemRadius;

  export type Variant = MenuItemVariant;
}

// LinkItem
// --------

/**
 * メニューのリンク項目の配色です。
 */
export type MenuLinkItemColor = Button.Root.Color;

/**
 * メニューのリンク項目の角丸です。
 */
export type MenuLinkItemRadius = Button.Root.Radius;

/**
 * メニューのリンク項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuLinkItemVariant = Button.Root.Variant;

/**
 * {@link MenuLinkItem} が持つ状態です。
 */
export type MenuLinkItemState = Override<Button.Root.State, Menu.LinkItem.State>;

export namespace MenuLinkItemProps {
  export type Render = RenderProps<MenuLinkItemState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: MenuLinkItemColor | undefined;

    /**
     * リンクを無効にするかどうかを指定します。
     *
     * `true` の場合、リンク先へ遷移できなくなります。
     *
     * @default false
     */
    disabled?: boolean | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link MenuRootProps.radius|radius} です。
     */
    radius?: MenuLinkItemRadius | undefined;

    /**
     * チェック状態のときの外観を指定します。
     *
     * チェックされていないときは常に `"naked"` になります。
     *
     * 既定値は {@link MenuRootProps.variant|variant} です。
     */
    variant?: MenuLinkItemVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Menu.LinkItem>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // MenuLinkItemProps:
        "label" | "id" | "closeOnClick",
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.LinkItem>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuLinkItem} に渡す props です。
 */
export type MenuLinkItemProps = MenuLinkItemProps.Render &
  MenuLinkItemProps.SuruUI &
  MenuLinkItemProps.BaseUI &
  MenuLinkItemProps.HTML;

/**
 * 別のページやセクションへ移動するメニュー項目です。
 */
export const MenuLinkItem: IComponent<MenuLinkItemProps> = function SuiMenuLinkItem(props) {
  const ctx = useMenuContext();
  const {
    id,
    color = "grey",
    label,
    style,
    radius = ctx.radius,
    // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
    render = <a />,
    variant = ctx.variant,
    disabled,
    className,
    closeOnClick,
    nativeButton = false,
    focusableWhenDisabled,
    ...otherProps
  } = props;
  const baseuiProps: Required<MenuLinkItemProps.BaseUI> = {
    id,
    label,
    closeOnClick,
    nativeButton,
    focusableWhenDisabled,
  };

  return (
    <Menu.LinkItem
      {...otherProps}
      {...baseuiProps}
      render={(htmlProps: {}, state) => {
        const buttonRootProps: Required<
          Button.Root.Props.SuruUI &
            Button.Root.Props.BaseUI &
            Pick<Button.Root.Props.HTML, "disabled">
        > = {
          item: true,
          size: ctx.size,
          color,
          muted: undefined,
          radius,
          pending: undefined,
          squared: undefined,
          variant: getItemVariant(state, variant),
          outlined: undefined,
          disabled,
          nativeButton,
          focusableWhenDisabled,
        };

        return (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              buttonRootProps,
              proxyRenderProps(state, {
                style,
                // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
                render,
                className: cn(
                  className,
                  "sui_menu_item",
                  "sui_menu_link_item",
                  (state) => state.highlighted && "sui_menu_item-highlighted",
                ),
              }),
            ])}
          />
        );
      }}
    />
  );
};

export { MenuLinkItem as LinkItem };

export namespace LinkItem {
  export type State = MenuLinkItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuLinkItemProps.Render;

    export type SuruUI = MenuLinkItemProps.SuruUI;

    export type BaseUI = MenuLinkItemProps.BaseUI;

    export type HTML = MenuLinkItemProps.HTML;
  }

  export type Color = MenuLinkItemColor;

  export type Radius = MenuLinkItemRadius;

  export type Variant = MenuLinkItemVariant;
}

// SubmenuRoot
// -----------

/**
 * {@link MenuSubmenuRoot} の開閉状態を変更されるイベントの詳細です。
 */
export type MenuSubmenuRootChangeEventDetails = Menu.SubmenuRoot.ChangeEventDetails;

/**
 * {@link MenuSubmenuRoot} の開閉状態が変更される理由です。
 */
export type MenuSubmenuRootChangeEventReason = Menu.SubmenuRoot.ChangeEventReason;

/**
 * {@link MenuSubmenuRoot} が持つ状態です。
 */
export type MenuSubmenuRootState = Menu.SubmenuRoot.State;

export namespace MenuSubmenuRootProps {
  export type Render = RenderProps<MenuSubmenuRootState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.SubmenuRoot>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuSubmenuRootProps:
      | "defaultOpen"
      | "loopFocus"
      | "highlightItemOnHover"
      | "onOpenChangeComplete"
      | "open"
      | "orientation"
      | "disabled"
      | "closeParentOnEsc"
      | "actionsRef"
      | "onOpenChange",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.SubmenuRoot>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuSubmenuRoot} に渡す props です。
 */
export type MenuSubmenuRootProps = MenuSubmenuRootProps.Render &
  MenuSubmenuRootProps.SuruUI &
  MenuSubmenuRootProps.BaseUI &
  MenuSubmenuRootProps.HTML;

/**
 * サブメニューのルートです。
 *
 * それ自身は HTML 要素をレンダリングしません。
 */
export const MenuSubmenuRoot: IComponent<MenuSubmenuRootProps> = function SuiMenuSubmenuRoot(
  props,
) {
  return <Menu.SubmenuRoot {...props} />;
};

export { MenuSubmenuRoot as SubmenuRoot };

export namespace SubmenuRoot {
  export type State = MenuSubmenuRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuSubmenuRootProps.Render;

    export type SuruUI = MenuSubmenuRootProps.SuruUI;

    export type BaseUI = MenuSubmenuRootProps.BaseUI;

    export type HTML = MenuSubmenuRootProps.HTML;
  }

  export type ChangeEventDetails = MenuSubmenuRootChangeEventDetails;

  export type ChangeEventReason = MenuSubmenuRootChangeEventReason;
}

// SubmenuTrigger
// --------------

/**
 * サブメニュー項目の配色です。
 */
export type MenuSubmenuTriggerColor = Button.Root.Color;

/**
 * サブメニュー項目の角丸です。
 */
export type MenuSubmenuTriggerRadius = Button.Root.Radius;

/**
 * サブメニュー項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuSubmenuTriggerVariant = Button.Root.Variant;

/**
 * {@link MenuSubmenuTrigger} が持つ状態です。
 */
export type MenuSubmenuTriggerState = Override<Button.Root.State, Menu.SubmenuTrigger.State>;

export namespace MenuSubmenuTriggerProps {
  export type Render = RenderProps<MenuSubmenuTriggerState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: MenuSubmenuTriggerColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link MenuRootProps.radius|radius} です。
     */
    radius?: MenuSubmenuTriggerRadius | undefined;

    /**
     * チェック状態のときの外観を指定します。
     *
     * チェックされていないときは常に `"naked"` になります。
     *
     * 既定値は {@link MenuRootProps.variant|variant} です。
     */
    variant?: MenuSubmenuTriggerVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Menu.SubmenuTrigger>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // NonNativeButtonProps:
        | keyof NonNativeButtonProps
        // MenuSubmenuTriggerProps:
        | "onClick"
        | "label"
        | "id"
        | "disabled"
        | "delay"
        | "closeDelay"
        | "openOnHover",
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.SubmenuTrigger>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuSubmenuTrigger} に渡す props です。
 */
export type MenuSubmenuTriggerProps = MenuSubmenuTriggerProps.Render &
  MenuSubmenuTriggerProps.SuruUI &
  MenuSubmenuTriggerProps.BaseUI &
  MenuSubmenuTriggerProps.HTML;

/**
 * サブメニューを開くメニュー項目です。
 */
export const MenuSubmenuTrigger: IComponent<MenuSubmenuTriggerProps> =
  function SuiMenuSubmenuTrigger(props) {
    const ctx = useMenuContext();
    const {
      id,
      color = "grey",
      delay,
      label,
      style,
      radius = ctx.radius,
      render = <div />,
      onClick,
      variant = ctx.variant,
      disabled,
      className,
      closeDelay,
      openOnHover,
      nativeButton,
      focusableWhenDisabled,
      ...otherProps
    } = props;
    const baseuiProps: Required<MenuSubmenuTriggerProps.BaseUI> = {
      id,
      delay,
      label,
      onClick,
      disabled,
      closeDelay,
      openOnHover,
      nativeButton,
      focusableWhenDisabled,
    };

    return (
      <Menu.SubmenuTrigger
        {...otherProps}
        {...baseuiProps}
        render={(htmlProps: {}, state) => {
          const buttonRootProps: Required<
            Button.Root.Props.SuruUI &
              Button.Root.Props.BaseUI &
              Pick<Button.Root.Props.HTML, "disabled">
          > = {
            item: true,
            size: ctx.size,
            color,
            muted: undefined,
            radius,
            pending: undefined,
            squared: undefined,
            variant: getItemVariant(state, variant),
            disabled: state.disabled,
            outlined: undefined,
            nativeButton,
            focusableWhenDisabled,
          };

          return (
            <Button.Root
              {...mergeProps<typeof Button.Root>([
                htmlProps,
                buttonRootProps,
                proxyRenderProps(state, {
                  style,
                  render,
                  className: cn(
                    className,
                    "sui_menu_item",
                    "sui_menu_submenu_trigger",
                    (state) => state.disabled && "sui_menu_item-disabled",
                    (state) => state.highlighted && "sui_menu_item-highlighted",
                    (state) => state.open && "sui_menu_item-open",
                  ),
                }),
              ])}
            />
          );
        }}
      />
    );
  };

export { MenuSubmenuTrigger as SubmenuTrigger };

export namespace SubmenuTrigger {
  export type State = MenuSubmenuTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuSubmenuTriggerProps.Render;

    export type SuruUI = MenuSubmenuTriggerProps.SuruUI;

    export type BaseUI = MenuSubmenuTriggerProps.BaseUI;

    export type HTML = MenuSubmenuTriggerProps.HTML;
  }

  export type Color = MenuSubmenuTriggerColor;

  export type Radius = MenuSubmenuTriggerRadius;

  export type Variant = MenuSubmenuTriggerVariant;
}

// Group
// -----

/**
 * {@link MenuGroup} が持つ状態です。
 */
export type MenuGroupState = Menu.Group.State;

export namespace MenuGroupProps {
  export type Render = RenderProps<MenuGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Group>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuGroupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuGroup} に渡す props です。
 */
export type MenuGroupProps = MenuGroupProps.Render &
  MenuGroupProps.SuruUI &
  MenuGroupProps.BaseUI &
  MenuGroupProps.HTML;

/**
 * 関連するメニュー項目をまとめるグループ要素です。
 */
export const MenuGroup: IComponent<MenuGroupProps> = function SuiMenuGroup(props) {
  const { className, ...otherProps } = props;

  return <Menu.Group {...otherProps} className={cn(className, "sui_menu_group")} />;
};

export { MenuGroup as Group };

export namespace Group {
  export type State = MenuGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuGroupProps.Render;

    export type SuruUI = MenuGroupProps.SuruUI;

    export type BaseUI = MenuGroupProps.BaseUI;

    export type HTML = MenuGroupProps.HTML;
  }
}

// GroupLabel
// ----------

/**
 * {@link MenuGroupLabel} が持つ状態です。
 */
export type MenuGroupLabelState = Menu.GroupLabel.State;

export namespace MenuGroupLabelProps {
  export type Render = RenderProps<MenuGroupLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.GroupLabel>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuGroupLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.GroupLabel>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuGroupLabel} に渡す props です。
 */
export type MenuGroupLabelProps = MenuGroupLabelProps.Render &
  MenuGroupLabelProps.SuruUI &
  MenuGroupLabelProps.BaseUI &
  MenuGroupLabelProps.HTML;

/**
 * グループに自動的に対応付けられるラベル要素です。
 */
export const MenuGroupLabel: IComponent<MenuGroupLabelProps> = function SuiMenuGroupLabel(props) {
  const { className, ...otherProps } = props;

  return <Menu.GroupLabel {...otherProps} className={cn(className, "sui_menu_group_label")} />;
};

export { MenuGroupLabel as GroupLabel };

export namespace GroupLabel {
  export type State = MenuGroupLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuGroupLabelProps.Render;

    export type SuruUI = MenuGroupLabelProps.SuruUI;

    export type BaseUI = MenuGroupLabelProps.BaseUI;

    export type HTML = MenuGroupLabelProps.HTML;
  }
}

// RadioGroup
// ----------

/**
 * {@link MenuRadioGroup} の選択状態を変更されるイベントの詳細です。
 */
export type MenuRadioGroupChangeEventDetails = Menu.RadioGroup.ChangeEventDetails;

/**
 * {@link MenuRadioGroup} の選択状態が変更される理由です。
 */
export type MenuRadioGroupChangeEventReason = Menu.RadioGroup.ChangeEventReason;

/**
 * {@link MenuRadioGroup} が持つ状態です。
 */
export type MenuRadioGroupState = Menu.RadioGroup.State;

export namespace MenuRadioGroupProps {
  export type Render = RenderProps<MenuRadioGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.RadioGroup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuRadioGroupProps:
      "value" | "defaultValue" | "onValueChange" | "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.RadioGroup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuRadioGroup} に渡す props です。
 */
export type MenuRadioGroupProps = MenuRadioGroupProps.Render &
  MenuRadioGroupProps.SuruUI &
  MenuRadioGroupProps.BaseUI &
  MenuRadioGroupProps.HTML;

/**
 * ラジオ項目をまとめるグループ要素です。
 */
export const MenuRadioGroup: IComponent<MenuRadioGroupProps> = function SuiMenuRadioGroup(props) {
  const { className, ...otherProps } = props;

  return (
    <Menu.RadioGroup
      {...otherProps}
      className={cn(
        className,
        "sui_menu_radio_group",
        (state) => state.disabled && "sui_menu_radio_group-disabled",
      )}
    />
  );
};

export { MenuRadioGroup as RadioGroup };

export namespace RadioGroup {
  export type State = MenuRadioGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuRadioGroupProps.Render;

    export type SuruUI = MenuRadioGroupProps.SuruUI;

    export type BaseUI = MenuRadioGroupProps.BaseUI;

    export type HTML = MenuRadioGroupProps.HTML;
  }

  export type ChangeEventDetails = MenuRadioGroupChangeEventDetails;

  export type ChangeEventReason = MenuRadioGroupChangeEventReason;
}

// RadioItem
// ---------

/**
 * ラジオ項目の配色です。
 */
export type MenuRadioItemColor = Button.Root.Color;

/**
 * ラジオ項目の角丸です。
 */
export type MenuRadioItemRadius = Button.Root.Radius;

/**
 * ラジオ項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuRadioItemVariant = Button.Root.Variant;

/**
 * {@link MenuRadioItem} が持つ状態です。
 */
export type MenuRadioItemState = Override<Button.Root.State, Menu.RadioItem.State>;

export namespace MenuRadioItemProps {
  export type Render = RenderProps<MenuRadioItemState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: MenuRadioItemColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link MenuRootProps.radius|radius} です。
     */
    radius?: MenuRadioItemRadius | undefined;

    /**
     * チェック状態のときの外観を指定します。
     *
     * チェックされていないときは常に `"naked"` になります。
     *
     * 既定値は {@link MenuRootProps.variant|variant} です。
     */
    variant?: MenuRadioItemVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Menu.RadioItem>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // NonNativeButtonProps:
        | keyof NonNativeButtonProps
        // MenuRadioItemProps:
        | "value"
        | "onClick"
        | "disabled"
        | "label"
        | "id"
        | "closeOnClick",
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.RadioItem>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuRadioItem} に渡す props です。
 */
export type MenuRadioItemProps = MenuRadioItemProps.Render &
  MenuRadioItemProps.SuruUI &
  MenuRadioItemProps.BaseUI &
  MenuRadioItemProps.HTML;

/**
 * ラジオグループ内のメニュー項目です。
 */
export const MenuRadioItem: IComponent<MenuRadioItemProps> = function SuiMenuRadioItem(props) {
  const ctx = useMenuContext();
  const {
    id,
    color = "grey",
    label,
    style,
    value,
    radius = ctx.radius,
    render,
    onClick,
    variant = ctx.variant,
    disabled,
    className,
    closeOnClick,
    nativeButton = false,
    focusableWhenDisabled,
    ...otherProps
  } = props;
  const baseuiProps: Required<MenuRadioItemProps.BaseUI> = {
    id,
    label,
    value,
    onClick,
    disabled,
    closeOnClick,
    nativeButton,
    focusableWhenDisabled,
  };

  return (
    <Menu.RadioItem
      {...otherProps}
      {...baseuiProps}
      render={(htmlProps: {}, state) => {
        const buttonRootProps: Required<
          Button.Root.Props.SuruUI &
            Button.Root.Props.BaseUI &
            Pick<Button.Root.Props.HTML, "disabled">
        > = {
          item: true,
          size: ctx.size,
          color,
          muted: undefined,
          radius,
          pending: undefined,
          squared: undefined,
          variant: getItemVariant(state, variant),
          disabled: state.disabled,
          outlined: undefined,
          nativeButton,
          focusableWhenDisabled,
        };

        return (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              buttonRootProps,
              proxyRenderProps(state, {
                style,
                render: render ?? <div />,
                className: cn(
                  className,
                  "sui_menu_item",
                  "sui_menu_radio_item",
                  (state) => state.checked && "sui_menu_item-checked",
                  (state) => state.disabled && "sui_menu_item-disabled",
                  (state) => state.highlighted && "sui_menu_item-highlighted",
                ),
              }),
            ])}
          />
        );
      }}
    />
  );
};

export { MenuRadioItem as RadioItem };

export namespace RadioItem {
  export type State = MenuRadioItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuRadioItemProps.Render;

    export type SuruUI = MenuRadioItemProps.SuruUI;

    export type BaseUI = MenuRadioItemProps.BaseUI;

    export type HTML = MenuRadioItemProps.HTML;
  }

  export type Color = MenuRadioItemColor;

  export type Radius = MenuRadioItemRadius;

  export type Variant = MenuRadioItemVariant;
}

// RadioItemIndicator
// ------------------

/**
 * {@link MenuRadioItemIndicator} が持つ状態です。
 */
export type MenuRadioItemIndicatorState = Menu.RadioItemIndicator.State;

export namespace MenuRadioItemIndicatorProps {
  export type Render = RenderProps<MenuRadioItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.RadioItemIndicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuRadioItemIndicatorProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.RadioItemIndicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuRadioItemIndicator} に渡す props です。
 */
export type MenuRadioItemIndicatorProps = MenuRadioItemIndicatorProps.Render &
  MenuRadioItemIndicatorProps.SuruUI &
  MenuRadioItemIndicatorProps.BaseUI &
  MenuRadioItemIndicatorProps.HTML;

/**
 * 選択されたラジオ項目を示す要素です。
 */
export const MenuRadioItemIndicator: IComponent<MenuRadioItemIndicatorProps> =
  function SuiMenuRadioItemIndicator(props) {
    const { className, keepMounted = true, ...otherProps } = props;

    return (
      <Menu.RadioItemIndicator
        {...otherProps}
        className={cn(
          className,
          "sui_menu_item_indicator",
          "sui_menu_radio_item_indicator",
          (state) => !state.checked && "sui_menu_item_indicator-unchecked",
        )}
        keepMounted={keepMounted}
      />
    );
  };

export { MenuRadioItemIndicator as RadioItemIndicator };

export namespace RadioItemIndicator {
  export type State = MenuRadioItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuRadioItemIndicatorProps.Render;

    export type SuruUI = MenuRadioItemIndicatorProps.SuruUI;

    export type BaseUI = MenuRadioItemIndicatorProps.BaseUI;

    export type HTML = MenuRadioItemIndicatorProps.HTML;
  }
}

// CheckboxItem
// ------------

/**
 * {@link MenuCheckboxItem} のチェック状態を変更されるイベントの詳細です。
 */
export type MenuCheckboxItemChangeEventDetails = Menu.CheckboxItem.ChangeEventDetails;

/**
 * {@link MenuCheckboxItem} のチェック状態が変更される理由です。
 */
export type MenuCheckboxItemChangeEventReason = Menu.CheckboxItem.ChangeEventReason;

/**
 * チェックボックス項目の配色です。
 */
export type MenuCheckboxItemColor = Button.Root.Color;

/**
 * チェックボックス項目の角丸です。
 */
export type MenuCheckboxItemRadius = Button.Root.Radius;

/**
 * チェックボックス項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuCheckboxItemVariant = Button.Root.Variant;

/**
 * {@link MenuCheckboxItem} が持つ状態です。
 */
export type MenuCheckboxItemState = Override<Button.Root.State, Menu.CheckboxItem.State>;

export namespace MenuCheckboxItemProps {
  export type Render = RenderProps<MenuCheckboxItemState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: MenuCheckboxItemColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link MenuRootProps.radius|radius} です。
     */
    radius?: MenuCheckboxItemRadius | undefined;

    /**
     * チェック状態のときの外観を指定します。
     *
     * チェックされていないときは常に `"naked"` になります。
     *
     * 既定値は {@link MenuRootProps.variant|variant} です。
     */
    variant?: MenuCheckboxItemVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Menu.CheckboxItem>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // NonNativeButtonProps:
        | keyof NonNativeButtonProps
        // MenuCheckboxItemProps:
        | "checked"
        | "defaultChecked"
        | "onCheckedChange"
        | "onClick"
        | "disabled"
        | "label"
        | "id"
        | "closeOnClick",
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.CheckboxItem>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuCheckboxItem} に渡す props です。
 */
export type MenuCheckboxItemProps = MenuCheckboxItemProps.Render &
  MenuCheckboxItemProps.SuruUI &
  MenuCheckboxItemProps.BaseUI &
  MenuCheckboxItemProps.HTML;

/**
 * 設定をオンまたはオフにできるメニュー項目です。
 */
export const MenuCheckboxItem: IComponent<MenuCheckboxItemProps> = function SuiMenuCheckboxItem(
  props,
) {
  const ctx = useMenuContext();
  const {
    defaultChecked,
    id,
    onClick,
    color = "grey",
    label,
    style,
    radius = ctx.radius,
    render,
    checked,
    variant = ctx.variant,
    disabled,
    className,
    closeOnClick,
    nativeButton = false,
    onCheckedChange,
    focusableWhenDisabled,
    ...otherProps
  } = props;
  const baseuiProps: Required<MenuCheckboxItemProps.BaseUI> = {
    label,
    checked,
    disabled,
    closeOnClick,
    nativeButton,
    onCheckedChange,
    focusableWhenDisabled,
    defaultChecked,
    id,
    onClick,
  };

  return (
    <Menu.CheckboxItem
      {...otherProps}
      {...baseuiProps}
      render={(htmlProps: {}, state) => {
        const buttonRootProps: Required<
          Button.Root.Props.SuruUI &
            Button.Root.Props.BaseUI &
            Pick<Button.Root.Props.HTML, "disabled">
        > = {
          item: true,
          size: ctx.size,
          color,
          muted: undefined,
          radius,
          pending: undefined,
          squared: undefined,
          variant: getItemVariant(state, variant),
          disabled: state.disabled,
          outlined: undefined,
          nativeButton,
          focusableWhenDisabled,
        };

        return (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              buttonRootProps,
              proxyRenderProps(state, {
                style,
                render: render ?? <div />,
                className: cn(
                  className,
                  "sui_menu_item",
                  "sui_menu_checkbox_item",
                  (state) => state.checked && "sui_menu_item-checked",
                  (state) => state.disabled && "sui_menu_item-disabled",
                  (state) => state.highlighted && "sui_menu_item-highlighted",
                ),
              }),
            ])}
          />
        );
      }}
    />
  );
};

export { MenuCheckboxItem as CheckboxItem };

export namespace CheckboxItem {
  export type State = MenuCheckboxItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuCheckboxItemProps.Render;

    export type SuruUI = MenuCheckboxItemProps.SuruUI;

    export type BaseUI = MenuCheckboxItemProps.BaseUI;

    export type HTML = MenuCheckboxItemProps.HTML;
  }

  export type ChangeEventDetails = MenuCheckboxItemChangeEventDetails;

  export type ChangeEventReason = MenuCheckboxItemChangeEventReason;

  export type Color = MenuCheckboxItemColor;

  export type Radius = MenuCheckboxItemRadius;

  export type Variant = MenuCheckboxItemVariant;
}

// CheckboxItemIndicator
// ---------------------

/**
 * {@link MenuCheckboxItemIndicator} が持つ状態です。
 */
export type MenuCheckboxItemIndicatorState = Menu.CheckboxItemIndicator.State;

export namespace MenuCheckboxItemIndicatorProps {
  export type Render = RenderProps<MenuCheckboxItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.CheckboxItemIndicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuCheckboxItemIndicatorProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.CheckboxItemIndicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuCheckboxItemIndicator} に渡す props です。
 */
export type MenuCheckboxItemIndicatorProps = MenuCheckboxItemIndicatorProps.Render &
  MenuCheckboxItemIndicatorProps.SuruUI &
  MenuCheckboxItemIndicatorProps.BaseUI &
  MenuCheckboxItemIndicatorProps.HTML;

/**
 * チェックされた項目を示す要素です。
 */
export const MenuCheckboxItemIndicator: IComponent<MenuCheckboxItemIndicatorProps> =
  function SuiMenuCheckboxItemIndicator(props) {
    const { className, ...otherProps } = props;

    return (
      <Menu.CheckboxItemIndicator
        {...otherProps}
        className={cn(
          className,
          "sui_menu_item_indicator",
          "sui_menu_checkbox_item_indicator",
          (state) => !state.checked && "sui_menu_item_indicator-unchecked",
        )}
      />
    );
  };

export { MenuCheckboxItemIndicator as CheckboxItemIndicator };

export namespace CheckboxItemIndicator {
  export type State = MenuCheckboxItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuCheckboxItemIndicatorProps.Render;

    export type SuruUI = MenuCheckboxItemIndicatorProps.SuruUI;

    export type BaseUI = MenuCheckboxItemIndicatorProps.BaseUI;

    export type HTML = MenuCheckboxItemIndicatorProps.HTML;
  }
}

// Separator
// ---------

/**
 * {@link MenuSeparator} が持つ状態です。
 */
export type MenuSeparatorState = Menu.Separator.State;

export namespace MenuSeparatorProps {
  export type Render = RenderProps<MenuSeparatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Separator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SeparatorProps:
      "orientation",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Separator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuSeparator} に渡す props です。
 */
export type MenuSeparatorProps = MenuSeparatorProps.Render &
  MenuSeparatorProps.SuruUI &
  MenuSeparatorProps.BaseUI &
  MenuSeparatorProps.HTML;

/**
 * メニュー項目を区切る要素です。
 */
export const MenuSeparator: IComponent<MenuSeparatorProps> = function SuiMenuSeparator(props) {
  const { className, ...otherProps } = props;

  return <Menu.Separator {...otherProps} className={cn(className, "sui_menu_separator")} />;
};

export { MenuSeparator as Separator };

export namespace Separator {
  export type State = MenuSeparatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuSeparatorProps.Render;

    export type SuruUI = MenuSeparatorProps.SuruUI;

    export type BaseUI = MenuSeparatorProps.BaseUI;

    export type HTML = MenuSeparatorProps.HTML;
  }
}
