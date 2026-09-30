import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import { useControlled } from "@base-ui/utils/useControlled";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import toReactNode from "../_to-react-node.js";
import useRender, { type RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { isItemObject, getSelectAction } from "./_tree.jsx";
import { type TreeContextState, type TreeSelectAction, TreeContext } from "./tree.context.js";
import { TreeItemIndicator } from "./tree.indicator.jsx";
import { type TreeItemProps, TreeItem } from "./tree.item.jsx";
import { decomposeItemObject } from "./tree.utils.js";

/**
 * {@link TreeRoot} の項目を表すオブジェクトです。
 *
 * `id` と `label` と `items` を含み、その他のプロパティーは {@link TreeItem} に渡されます。
 */
export type TreeRootItemObject = Override<
  Omit<TreeItemProps, "children" | "hasItems" | "level" | "posInSet" | "setSize">,
  {
    /**
     * ノードの一意な識別子です。
     *
     * 展開や選択の状態管理に使います。
     */
    readonly id: string;

    /**
     * ノードのラベルです。
     */
    readonly label: React.ReactNode;

    /**
     * 子ノードの一覧です。
     *
     * 空でない場合に展開可能な分岐として扱います。
     */
    readonly items?: readonly TreeRootItemObject[] | undefined;
  }
>;

/**
 * {@link TreeRoot} の各ノードをレンダリングする関数のインターフェイスです。
 */
export interface ITreeRootItemRenderer {
  /**
   * ノードをレンダリングします。
   *
   * @param node 描画対象のノードです。
   * @param level ノードの深さです。ルートの直接の子が `1` です。
   * @param posInSet 同じ深さの中での位置です。1 起点です。
   * @param setSize 同じ深さの項目数です。
   * @returns レンダリングする内容です。
   */
  (
    node: Readonly<TreeRootItemObject>,
    level: number,
    posInSet: number,
    setSize: number,
  ): React.ReactNode;
}

/**
 * ツリーの項目の配色です。
 */
export type TreeRootColor = Button.Root.Color;

/**
 * ツリーの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 丸形
 */
export type TreeRootRadius = "none" | Size | "full";

/**
 * ツリーの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type TreeRootSize = Size;

/**
 * ツリーの項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type TreeRootVariant = "liquid" | "solid";

/**
 * {@link TreeRoot} の状態です。
 */
export type TreeRootState = Override<
  TreeContextState,
  {
    /**
     * キーボードフォーカスの対象になっているノードの識別子です。
     */
    readonly activeId: string | null;

    /**
     * 展開されているノードの識別子の一覧です。
     */
    readonly expanded: readonly string[];

    /**
     * 選択されているノードの識別子の一覧です。
     */
    readonly value: readonly string[];
  }
>;

export namespace TreeRootProps {
  export type Render = RenderProps<TreeRootState>;

  export type SuruUI = {
    /**
     * ツリーの内容、または各ノードをレンダリングする関数です。
     *
     * 関数を指定した場合は {@link TreeRootProps.items|items} のうち表示中のノードが順に引数として渡されます。
     */
    children?: React.ReactNode | ITreeRootItemRenderer | undefined;

    /**
     * 選択されている項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: TreeRootColor | undefined;

    /**
     * 初期状態で展開するノードの識別子の一覧を指定します。
     *
     * 非制御で利用する場合の初期値です。
     */
    defaultExpandedValue?: readonly string[] | undefined;

    /**
     * 初期状態で選択するノードの識別子の一覧を指定します。
     *
     * 非制御で利用する場合の初期値です。
     */
    defaultValue?: readonly string[] | undefined;

    /**
     * 展開されているノードの識別子の一覧を指定します。
     *
     * 指定すると展開状態がこの値に固定され、{@link TreeRootProps.onExpandedValueChange|onExpandedValueChange} でのみ変化します。
     */
    expandedValue?: readonly string[] | undefined;

    /**
     * ツリーの項目です。
     *
     * `children` に関数を指定した場合、展開状態に応じて表示中のノードだけが順に関数へ渡されます。
     */
    items?: readonly TreeRootItemObject[] | undefined;

    /**
     * 項目の背景色を控えめにするかどうかを指定します。
     *
     * @default false
     */
    muted?: boolean | undefined;

    /**
     * 展開状態が変化したときに呼び出されます。
     *
     * @param value 変更後の識別子の一覧です。
     * @param event 変化のきっかけになったイベントです。
     */
    onExpandedValueChange?:
      | ((value: readonly string[], event: React.SyntheticEvent) => void)
      | undefined;

    /**
     * 選択状態が変化したときに呼び出されます。
     *
     * @param value 変更後の識別子の一覧です。
     * @param event 変化のきっかけになったイベントです。
     */
    onValueChange?: ((value: readonly string[], event: React.SyntheticEvent) => void) | undefined;

    /**
     * 選択されている項目に枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * 項目のハイライトの角丸を指定します。
     *
     * 既定値は {@link TreeRootProps.size|size} です。
     */
    radius?: TreeRootRadius | undefined;

    /**
     * ツリーの大きさを指定します。
     *
     * @default "md"
     */
    size?: TreeRootSize | undefined;

    /**
     * 選択されているノードの識別子の一覧を指定します。
     *
     * 指定すると選択状態がこの値に固定され、{@link TreeRootProps.onValueChange|onValueChange} でのみ変化します。
     */
    value?: readonly string[] | undefined;

    /**
     * 選択されている項目の主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: TreeRootVariant | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TreeRoot} に渡すプロパティーです。
 */
export type TreeRootProps = TreeRootProps.Render &
  TreeRootProps.SuruUI &
  TreeRootProps.BaseUI &
  TreeRootProps.HTML;

export type ITreeRoot = IComponent<TreeRootProps>;

const EMPTY: readonly string[] = [];

const EMPTY_NODES: readonly TreeRootItemObject[] = [];

function isBranchElement(element: Element): boolean {
  return element.getAttribute("aria-expanded") != null;
}

/**
 * ツリーのルート要素です。
 *
 * WAI-ARIA tree パターンに従い、キーボード操作と選択と展開の状態を管理します。
 */
export const TreeRoot: ITreeRoot = function SuiTreeRoot(props) {
  const {
    size = "md",
    color = "grey",
    items = EMPTY_NODES,
    muted = false,
    value: valueProp,
    radius = size,
    onFocus: onFocusProp,
    variant = "liquid",
    children = defaultRootItemRenderer,
    outlined = false,
    onKeyDown: onKeyDownProp,
    defaultValue = EMPTY,
    expandedValue: expandedValueProp,
    onValueChange,
    defaultExpandedValue = EMPTY,
    onExpandedValueChange,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDivProps
  } = props;

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useControlled<readonly string[]>({
    name: "Tree",
    state: "value",
    default: defaultValue,
    controlled: valueProp,
  });
  const [expandedValue, setExpandedValue] = useControlled<readonly string[]>({
    name: "Tree",
    state: "expandedValue",
    default: defaultExpandedValue,
    controlled: expandedValueProp,
  });
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const selected = React.useMemo(() => new Set(value), [value]);
  const expanded = React.useMemo(() => new Set(expandedValue), [expandedValue]);
  const baseId = React.useId();

  const visibleNodes = React.useMemo(() => {
    const result: {
      level: number;
      node: Readonly<TreeRootItemObject>;
      posInSet: number;
      setSize: number;
    }[] = [];

    const walk = (nodes: readonly TreeRootItemObject[], level: number): void => {
      for (const [index, node] of nodes.entries()) {
        const hasItems = node.items != null && node.items.length > 0;

        result.push({ node, level, setSize: nodes.length, posInSet: index + 1 });
        if (hasItems && expanded.has(node.id) && node.items != null) {
          walk(node.items, level + 1);
        }
      }
    };
    walk(items, 1);

    return result;
  }, [items, expanded]);

  const getItemId = React.useCallback((itemId: string) => `${baseId}-${itemId}`, [baseId]);

  const focus = React.useCallback(() => {
    rootRef.current?.focus();
  }, []);

  const anchorRef = React.useRef<string | null>(null);

  const select = React.useCallback(
    (itemId: string, action: TreeSelectAction, event: React.SyntheticEvent) => {
      let nextValue: readonly string[];
      if (action === "toggle") {
        anchorRef.current = itemId;
        nextValue = selected.has(itemId) ? value.filter((id) => id !== itemId) : [...value, itemId];
      } else if (action === "range" || action === "add-range") {
        const ids = visibleNodes.map(({ node }) => node.id);
        const anchorId = anchorRef.current;
        const fromIndex = anchorId != null ? ids.indexOf(anchorId) : -1;
        const toIndex = ids.indexOf(itemId);
        if (fromIndex < 0 || toIndex < 0) {
          anchorRef.current = itemId;
          nextValue = [itemId];
        } else {
          const [start, end] = fromIndex <= toIndex ? [fromIndex, toIndex] : [toIndex, fromIndex];
          const range = visibleNodes
            .slice(start, end + 1)
            .filter(({ node }) => !node.disabled)
            .map(({ node }) => node.id);
          if (action === "add-range") {
            nextValue = [...new Set([...value, ...range])];
          } else {
            nextValue = range;
          }
        }
      } else {
        anchorRef.current = itemId;
        nextValue = [itemId];
      }

      setValue(nextValue);
      onValueChange?.(nextValue, event);
    },
    [onValueChange, selected, setValue, value, visibleNodes],
  );

  const toggleExpansion = React.useCallback(
    (itemId: string, event: React.SyntheticEvent) => {
      const nextValue = expanded.has(itemId)
        ? expandedValue.filter((id) => id !== itemId)
        : [...expandedValue, itemId];

      setExpandedValue(nextValue);
      onExpandedValueChange?.(nextValue, event);
    },
    [expanded, expandedValue, onExpandedValueChange, setExpandedValue],
  );

  const ctx = React.useMemo<TreeContext>(
    () => ({
      size,
      color,
      focus,
      muted,
      radius,
      select,
      variant,
      activeId,
      expanded,
      outlined,
      selected,
      getItemId,
      setActive: setActiveId,
      toggleExpansion,
    }),
    [
      activeId,
      color,
      expanded,
      focus,
      getItemId,
      muted,
      outlined,
      radius,
      select,
      selected,
      size,
      toggleExpansion,
      variant,
    ],
  );

  const state = React.useMemo<TreeRootState>(
    () => ({
      size,
      color,
      muted,
      value,
      radius,
      variant,
      activeId,
      expanded: expandedValue,
      outlined,
      selected,
    }),
    [activeId, color, expandedValue, muted, outlined, radius, selected, size, value, variant],
  );

  const activateElement = React.useCallback((element: HTMLElement) => {
    const itemId = element.dataset["id"] ?? null;
    setActiveId(itemId);
    element.scrollIntoView({ block: "nearest" });
  }, []);

  const handleKeyDown: NonNullable<TreeRootProps["onKeyDown"]> = (event) => {
    onKeyDownProp?.(event);
    if (event.defaultPrevented || !event.currentTarget.contains(event.target as Node)) {
      return;
    }
    const elements = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[role="treeitem"]'),
    );
    if (elements.length < 1) {
      return;
    }
    const currentIndex = elements.findIndex(
      (element) => element.id === (activeId != null ? getItemId(activeId) : ""),
    );

    const findEnabled = (start: number, step: number): number => {
      for (let i = start; i >= 0 && i < elements.length; i += step) {
        const element = elements[i];
        if (element != null && element.getAttribute("aria-disabled") !== "true") {
          return i;
        }
      }

      return -1;
    };
    const moveTo = (index: number) => {
      const step = index >= currentIndex ? 1 : -1;
      const enabled = findEnabled(index, step);
      if (enabled >= 0) {
        activateElement(elements[enabled]!);
      }
    };
    const currentElement = currentIndex >= 0 ? elements[currentIndex] : null;
    const currentItemId = currentElement?.dataset["id"] ?? null;

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        moveTo(currentIndex < 0 ? findEnabled(0, 1) : currentIndex + 1);
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        moveTo(currentIndex < 0 ? findEnabled(elements.length - 1, -1) : currentIndex - 1);
        break;
      }
      case "Home": {
        event.preventDefault();
        moveTo(findEnabled(0, 1));
        break;
      }
      case "End": {
        event.preventDefault();
        moveTo(findEnabled(elements.length - 1, -1));
        break;
      }
      case "ArrowRight": {
        if (currentElement == null || currentItemId == null) {
          moveTo(findEnabled(0, 1));
          break;
        }
        event.preventDefault();
        if (isBranchElement(currentElement) && !expanded.has(currentItemId)) {
          toggleExpansion(currentItemId, event);
        } else if (isBranchElement(currentElement)) {
          moveTo(currentIndex + 1);
        }
        break;
      }
      case "ArrowLeft": {
        if (currentElement == null || currentItemId == null) {
          moveTo(findEnabled(0, 1));
          break;
        }
        event.preventDefault();
        if (isBranchElement(currentElement) && expanded.has(currentItemId)) {
          toggleExpansion(currentItemId, event);
        } else {
          const level = Number(currentElement.getAttribute("aria-level"));
          for (let i = currentIndex - 1; i >= 0; i--) {
            const element = elements[i];
            if (element == null) {
              continue;
            }
            if (Number(element.getAttribute("aria-level")) === level - 1) {
              activateElement(element);
              break;
            }
          }
        }
        break;
      }
      case "Enter":
      case " ": {
        if (currentElement != null && currentItemId != null) {
          event.preventDefault();
          select(currentItemId, getSelectAction(event), event);
        }
        break;
      }
      case "*": {
        event.preventDefault();
        const collapsedIds = elements
          .filter((element) => element.getAttribute("aria-expanded") === "false")
          .map((element) => element.dataset["id"] ?? "")
          .filter((itemId) => itemId !== "" && !expanded.has(itemId));
        if (collapsedIds.length > 0) {
          const nextValue = [...expandedValue, ...collapsedIds];
          setExpandedValue(nextValue);
          onExpandedValueChange?.(nextValue, event);
        }
        break;
      }
      default:
        break;
    }
  };

  const handleFocus: NonNullable<TreeRootProps["onFocus"]> = (event) => {
    onFocusProp?.(event);
    if (activeId == null) {
      const first = event.currentTarget.querySelector<HTMLElement>(
        '[role="treeitem"]:not([aria-disabled="true"])',
      );
      if (first != null) {
        activateElement(first);
      }
    }
  };

  const element = useRender({
    props: [
      otherDivProps,
      {
        ref: rootRef,
        role: "tree",
        onFocus: handleFocus,
        children:
          typeof children !== "function"
            ? children
            : visibleNodes.map(({ node, level, setSize, posInSet }) => (
                <React.Fragment key={node.id}>
                  {children(node, level, posInSet, setSize)}
                </React.Fragment>
              )),
        tabIndex: 0,
        className: cn<TreeRootState>(
          "sui_tree",
          (state) => `sui_tree-radius_${state.radius}`,
          (state) => `sui_tree-size_${state.size}`,
        ),
        onKeyDown: handleKeyDown,
        "aria-multiselectable": true,
        "aria-activedescendant": activeId != null ? getItemId(activeId) : undefined,
        "data-scope": dataScope,
      },
    ],
    state,
    defaultTagName: "div",
  });

  return <TreeContext value={ctx}>{element}</TreeContext>;
};

const defaultRootItemRenderer: ITreeRootItemRenderer = (node, level, posInSet, setSize) => {
  if (!isItemObject(node)) {
    return toReactNode(node);
  }

  const { id, items, label, itemProps } = decomposeItemObject(node);
  const hasItems = items != null && items.length > 0;

  return (
    <TreeItem
      {...itemProps}
      id={id}
      key={id}
      level={level}
      setSize={setSize}
      hasItems={hasItems}
      posInSet={posInSet}
    >
      <TreeItemIndicator visible={hasItems} />
      {toReactNode(label)}
    </TreeItem>
  );
};

/**
 * {@link TreeRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  export type State = TreeRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TreeRootProps.Render;

    export type SuruUI = TreeRootProps.SuruUI;

    export type BaseUI = TreeRootProps.BaseUI;

    export type HTML = TreeRootProps.HTML;
  }

  export type Color = TreeRootColor;

  export type IItemRenderer = ITreeRootItemRenderer;

  export type ItemObject = TreeRootItemObject;

  export type Radius = TreeRootRadius;

  export type Size = TreeRootSize;

  export type Variant = TreeRootVariant;
}

export { TreeRoot as Root };
