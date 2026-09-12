import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import * as React from "react";

import toReactNode from "../_to-react-node.js";
import type { RenderProps } from "../_use-render.js";
import { Button } from "../button/button.jsx";
import cn from "../cn.js";
import { type MenuProps, Menu } from "../menu/menu.jsx";
import type { IComponent } from "../types.js";
import { isItemObject } from "./_menubar.jsx";

import "./menubar.css";

// Root
// ----

/**
 * メニューバーの項目を表すオブジェクトです。
 *
 * `label` を含み、その他のプロパティーは {@link Menu} に渡されます。
 * `trigger` を省略した場合は `label` を表示するボタンがトリガーになります。
 */
export type MenubarRootItemObject = Omit<MenuProps, "children" | "trigger"> & {
  /**
   * ポップアップに表示する内容です。
   */
  readonly children?: MenuProps["children"] | undefined;

  /**
   * トリガーに表示するラベルです。
   */
  readonly label: React.ReactNode;

  /**
   * メニューを開くトリガーに表示する要素です。
   *
   * 省略した場合は `label` を表示するボタンになります。
   */
  readonly trigger?: MenuProps["trigger"] | undefined;
};

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
 *
 * - `"horizontal"`: 水平方向
 * - `"vertical"`: 垂直方向
 */
export type MenubarRootOrientation = "horizontal" | "vertical";

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
    children?: React.ReactNode | IMenubarRootItemRenderer<TItem>;

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

interface IMenubarRoot extends IComponent<MenubarRootProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: MenubarRootProps<TItem>): IComponent.Return;
}

/**
 * メニューを横または縦に並べるルート要素です。
 *
 * 子要素には {@link Menu} を配置します。
 */
export const MenubarRoot: IMenubarRoot = function SuiMenubarRoot(props: MenubarRootProps) {
  const {
    items = [],
    children = defaultRootItemRenderer,
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
        `sui_menubar-orientation_${orientation}`,
        disabled && "sui_menubar-disabled",
      )}
      orientation={orientation}
      data-scope={dataScope}
    >
      {typeof children === "function" ? items.map(children) : children}
    </BaseMenubar>
  );
};

const defaultRootItemRenderer: IMenubarRootItemRenderer = (item, index) => {
  if (!isItemObject(item)) {
    return toReactNode(item);
  }

  const { label, trigger, children: popupChildren, ...otherMenuProps } = item;

  return (
    <Menu
      key={index}
      {...otherMenuProps}
      trigger={trigger ?? <Button variant="naked">{toReactNode(label)}</Button>}
    >
      {toReactNode(popupChildren)}
    </Menu>
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

  export type ItemObject = MenubarRootItemObject;

  export interface IItemRenderer<TItem = any> extends IMenubarRootItemRenderer<TItem> {}

  export type Orientation = MenubarRootOrientation;
}
