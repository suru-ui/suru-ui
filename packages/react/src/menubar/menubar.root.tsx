import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import * as React from "react";

import { getItemKey } from "../_item.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { Menu } from "../menu/menu.jsx";
import type { Override, IComponent } from "../types.js";
import { isItemObject } from "./_menubar.jsx";

/**
 * メニューバーの項目を表すオブジェクトです。
 *
 * `items` と `trigger` を含み、その他のプロパティーは {@link Menu} に渡されます。
 */
export type MenubarRootItemObject = Override<
  Omit<Menu.Props<Menu.ItemObject>, "children">,
  {
    /**
     * ポップアップに表示する内容です。
     */
    readonly items: NonNullable<Menu.Props<Menu.ItemObject>["items"]>;

    /**
     * メニューを開くトリガーに表示する要素です。
     */
    readonly trigger: NonNullable<Menu.Props<Menu.ItemObject>["trigger"]>;
  }
>;

/**
 * メニューバーの各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IMenubarRootItemRenderer<TItem = any> {
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
 * メニューバーの向きです。
 */
export type MenubarRootOrientation = MenubarRootState["orientation"];

/**
 * {@link MenubarRoot} が持つ状態です。
 */
export type MenubarRootState = BaseMenubar.State;

export namespace MenubarRootProps {
  export type Render = RenderProps<MenubarRootState>;

  export type SuruUI<TItem = any> = {
    /**
     * メニューバーの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link MenubarRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IMenubarRootItemRenderer<TItem> | undefined;

    /**
     * メニューバーの項目です。
     *
     * `children` に関数を指定した場合、この配列の各項目が引数として渡されます。
     */
    items?: readonly TItem[] | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseMenubar>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenubarProps:
      "modal" | "disabled" | "orientation" | "loopFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseMenubar>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenubarRoot} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type MenubarRootProps<TItem = any> = MenubarRootProps.Render &
  MenubarRootProps.SuruUI<TItem> &
  MenubarRootProps.BaseUI &
  MenubarRootProps.HTML;

export interface IMenubarRoot extends IComponent<MenubarRootProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: MenubarRootProps<TItem>): IComponent.Return;
}

/**
 * メニューを横または縦に並べるルート要素です。
 */
export const MenubarRoot: IMenubarRoot = function SuiMenubarRoot(props: MenubarRootProps) {
  const defaultItemRenderer: IMenubarRootItemRenderer = (item, index) => {
    switch (true) {
      case isItemObject(item):
        return <Menu {...item} key={getItemKey(item) ?? index} />;

      default:
        return <React.Fragment key={getItemKey(item) ?? index}>{item}</React.Fragment>;
    }
  };

  const {
    items = [],
    children = defaultItemRenderer,
    disabled = false,
    className,
    orientation = "horizontal",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <BaseMenubar
      {...otherProps}
      disabled={disabled}
      className={cn(
        className,
        "sui_menubar",
        (state) => `sui_menubar-orientation_${state.orientation}`,
        (state) => state.modal && "sui_menubar-modal",
        (state) => state.hasSubmenuOpen && "sui_menubar-has_submenu_open",
        disabled && "sui_menubar-disabled",
      )}
      orientation={orientation}
      data-scope={dataScope}
    >
      {typeof children === "function" ? items.map(children) : children}
    </BaseMenubar>
  );
};

export { MenubarRoot as Root };

export namespace Root {
  export type State = MenubarRootState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenubarRootProps.Render;

    export type SuruUI<TItem = any> = MenubarRootProps.SuruUI<TItem>;

    export type BaseUI = MenubarRootProps.BaseUI;

    export type HTML = MenubarRootProps.HTML;
  }

  export type IItemRenderer<TItem = any> = IMenubarRootItemRenderer<TItem>;

  export type ItemObject = MenubarRootItemObject;

  export type Orientation = MenubarRootOrientation;
}
