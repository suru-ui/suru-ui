import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { getSelectAction } from "./_tree.jsx";
import { useTreeContext } from "./tree.context.js";

/**
 * ツリーの項目の配色です。
 */
export type TreeItemColor = Button.Root.Color;

/**
 * ツリーの項目の角丸です。
 */
export type TreeItemRadius = Button.Root.Radius;

/**
 * ツリーの項目の大きさです。
 */
export type TreeItemSize = Button.Root.Size;

/**
 * ツリーの項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 */
export type TreeItemVariant = "liquid" | "solid";

/**
 * {@link TreeItem} の状態です。
 */
export type TreeItemState = {};

export namespace TreeItemProps {
  export type Render = RenderProps<TreeItemState>;

  export type SuruUI = {
    /**
     * 対応するノードの識別子です。
     *
     * `items` プロパティーから描画した項目には自動的に渡されます。
     */
    id: string;

    /**
     * ノードの深さです。ルートの直接の子が `1` です。
     *
     * `items` プロパティーから描画した項目には自動的に渡されます。
     */
    level: number;

    /**
     * 項目の配色を指定します。
     *
     * 選択されていないときは常に `"grey"` になります。
     *
     * 既定値は {@link TreeRootProps.color|color} です。
     */
    color?: TreeItemColor | undefined;

    /**
     * 子ノードを持つかどうかを指定します。
     *
     * `true` の場合、展開可能な分岐として描画します。
     *
     * @default false
     */
    hasItems?: boolean | undefined;

    /**
     * 項目の背景色を控えめにするかどうかを指定します。
     *
     * 既定値は {@link TreeRootProps.muted|muted} です。
     */
    muted?: boolean | undefined;

    /**
     * 項目に枠線を表示するかどうかを指定します。
     *
     * 選択されていないときは常に枠線なしになります。
     *
     * 既定値は {@link TreeRootProps.outlined|outlined} です。
     */
    outlined?: boolean | undefined;

    /**
     * 同じ深さの中での位置です。1 起点です。
     *
     * `items` プロパティーから描画した項目には自動的に渡されます。
     */
    posInSet?: number | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link TreeRootProps.radius|radius} です。
     */
    radius?: TreeItemRadius | undefined;

    /**
     * 同じ深さの項目数です。
     *
     * `items` プロパティーから描画した項目には自動的に渡されます。
     */
    setSize?: number | undefined;

    /**
     * 項目の大きさを指定します。
     *
     * 既定値は {@link TreeRootProps.size|size} です。
     */
    size?: TreeItemSize | undefined;

    /**
     * 項目の主な外観を指定します。
     *
     * 選択されていないときは常に `"naked"` になります。
     *
     * 既定値は {@link TreeRootProps.variant|variant} です。
     */
    variant?: TreeItemVariant | undefined;
  };

  export type BaseUI = Omit<Button.Root.Props.BaseUI, keyof Render | keyof SuruUI>;

  export type HTML = Omit<
    React.ComponentProps<"button">,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TreeItem} に渡すプロパティーです。
 */
export type TreeItemProps = TreeItemProps.Render &
  TreeItemProps.SuruUI &
  TreeItemProps.BaseUI &
  TreeItemProps.HTML;

/**
 * ツリーの項目要素です。
 */
export const TreeItem: IComponent<TreeItemProps> = function SuiTreeItem(props) {
  const ctx = useTreeContext();
  const {
    id: itemId,
    role = "treeitem",
    size = ctx.size ?? "md",
    color = ctx.color ?? "grey",
    level,
    muted = ctx.muted ?? false,
    radius = ctx.radius ?? size,
    render = <div />,
    onClick: onClickProp,
    setSize,
    variant = ctx.variant ?? "liquid",
    disabled = false,
    hasItems = false,
    outlined = ctx.outlined ?? false,
    posInSet,
    className,
    nativeButton = false,
    ...otherProps
  } = props;

  const domId = ctx.getItemId(itemId);
  const expanded = ctx.expanded.has(itemId);
  const selected = ctx.selected.has(itemId);

  const handleClick: NonNullable<TreeItemProps["onClick"]> = (event) => {
    onClickProp?.(event);
    if (disabled || event.defaultPrevented) {
      return;
    }

    ctx.setActive(itemId);
    if (event.detail !== 0) {
      ctx.focus();
    }

    if (hasItems && !event.shiftKey && !event.ctrlKey && !event.metaKey) {
      ctx.toggleExpansion(itemId, event);
    }
    ctx.select(itemId, getSelectAction(event), event);
  };

  return (
    <Button.Root
      {...otherProps}
      id={domId}
      item
      role={role}
      size={size}
      color={selected ? color : "grey"}
      muted={muted}
      radius={radius}
      render={render}
      onClick={handleClick}
      variant={selected ? variant : "naked"}
      disabled={disabled}
      outlined={selected && outlined}
      className={cn(className, "sui_tree_item", expanded && "sui_tree_item-expanded")}
      nativeButton={nativeButton}
      aria-level={level}
      aria-setsize={setSize}
      aria-expanded={hasItems ? expanded : undefined}
      aria-posinset={posInSet}
      aria-selected={selected}
      data-id={itemId}
    />
  );
};

export { TreeItem as Item };

export namespace Item {
  export type State = TreeItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TreeItemProps.Render;

    export type SuruUI = TreeItemProps.SuruUI;

    export type BaseUI = TreeItemProps.BaseUI;

    export type HTML = TreeItemProps.HTML;
  }

  export type Color = TreeItemColor;

  export type Radius = TreeItemRadius;

  export type Size = TreeItemSize;

  export type Variant = TreeItemVariant;
}
