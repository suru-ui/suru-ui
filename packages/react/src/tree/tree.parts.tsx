import { useControlled } from "@base-ui/utils/useControlled";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ChevronRightIcon } from "../_icons.jsx";
import toReactNode from "../_to-react-node.js";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./tree.css";

// Context
// -------

/**
 * {@link TreeRoot} の選択モードです。
 *
 * - `"none"`: 選択できない
 * - `"single"`: 1 つだけ選択できる
 * - `"multiple"`: 複数選択できる
 */
export type TreeRootSelectionMode = "none" | "single" | "multiple";

/**
 * 項目の選択を変更するアクションです。
 *
 * - `"only"`: 指定した項目だけを選択する
 * - `"toggle"`: 指定した項目の選択を切り替える
 */
export type TreeSelectAction = "only" | "toggle";

/**
 * {@link TreeRoot} が子パーツへ提供するコンテキストです。
 */
export type TreeContext = {
  /**
   * キーボードフォーカスの対象になっているノードの識別子です。
   */
  readonly activeId: string | null;

  /**
   * 項目のクリックで展開を切り替えるかどうかです。
   */
  readonly expandOnClick: boolean;

  /**
   * 展開されているノードの識別子の集合です。
   */
  readonly expanded: ReadonlySet<string>;

  /**
   * ツリーのルート要素へフォーカスを移動する関数です。
   */
  readonly focus: () => void;

  /**
   * ノードの識別子から項目要素の DOM ID を作る関数です。
   *
   * @param itemId ノードの識別子です。
   */
  readonly getItemId: (itemId: string) => string;

  /**
   * ノードの識別子から選択状態を変更する関数です。
   *
   * @param itemId 選択状態を変更するノードの識別子です。
   * @param action 選択の変更方法です。
   * @param event 選択のきっかけになったイベントです。
   */
  readonly select: (itemId: string, action: TreeSelectAction, event: React.SyntheticEvent) => void;

  /**
   * 選択されているノードの識別子の集合です。
   */
  readonly selected: ReadonlySet<string>;

  /**
   * 選択モードです。
   */
  readonly selectionMode: TreeRootSelectionMode;

  /**
   * キーボードフォーカスの対象にするノードを変更する関数です。
   *
   * @param itemId フォーカス対象にするノードの識別子です。
   */
  readonly setActive: (itemId: string) => void;

  /**
   * ノードの展開状態を切り替える関数です。
   *
   * @param itemId 展開状態を切り替えるノードの識別子です。
   * @param event 展開のきっかけになったイベントです。
   */
  readonly toggleExpansion: (itemId: string, event: React.SyntheticEvent) => void;
};

/**
 * {@link TreeContext} です。
 */
export const TreeContext: React.Context<TreeContext | null> =
  React.createContext<TreeContext | null>(null);

function useSuiTreeContext(optional?: false): TreeContext;
function useSuiTreeContext(optional?: boolean): TreeContext | null;
function useSuiTreeContext(optional?: boolean): TreeContext | null {
  const ctx = React.use(TreeContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "TreeContext",
      providerName: "TreeRoot",
    });
  }

  return ctx;
}

/**
 * {@link TreeContext} を読み取るフックです。
 */
export const useTreeContext: IUseContext<TreeContext> = useSuiTreeContext;

export { TreeContext as Context, useTreeContext as useContext };

export namespace Context {
  /**
   * {@link TreeSelectAction}
   */
  export type SelectAction = TreeSelectAction;

  /**
   * {@link TreeRootSelectionMode}
   */
  export type SelectionMode = TreeRootSelectionMode;
}

// Root
// ----

/**
 * {@link TreeRoot} の項目を表すオブジェクトです。
 */
export type TreeRootItemObject = {
  /**
   * 子ノードの一覧です。
   *
   * 空でない場合に展開可能な分岐として扱います。
   */
  readonly children?: readonly TreeRootItemObject[] | undefined;

  /**
   * ノードを無効にするかどうかを指定します。
   *
   * @default false
   */
  readonly disabled?: boolean | undefined;

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
};

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
 * ツリーの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 */
export type TreeRootRadius = "none" | Size;

/**
 * ツリーの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type TreeRootSize = Size;

/**
 * {@link TreeRoot} の状態です。
 */
export type TreeRootState = {
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
};

/**
 * {@link TreeRoot} に渡すプロパティーです。
 */
export type TreeRootProps = Omit<React.ComponentProps<"div">, keyof RenderProps | "children"> &
  RenderProps<TreeRootState> & {
    /**
     * ツリーの内容、または各ノードをレンダリングする関数です。
     *
     * 関数を指定した場合は {@link TreeRootProps.items|items} のうち表示中のノードが順に引数として渡されます。
     */
    children?: React.ReactNode | ITreeRootItemRenderer | undefined;

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
     * 子を持つ項目のクリックで展開を切り替えるかどうかを指定します。
     *
     * インジケーターのクリックは常に展開を切り替えます。
     *
     * @default true
     */
    expandOnClick?: boolean | undefined;

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
     * 項目のハイライトの角丸を指定します。
     *
     * 既定値は {@link TreeRootProps.size|size} です。
     */
    radius?: TreeRootRadius | undefined;

    /**
     * 選択モードを指定します。
     *
     * @default "none"
     */
    selectionMode?: TreeRootSelectionMode | undefined;

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
  };

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
export const TreeRoot: IComponent<TreeRootProps> = function SuiTreeRoot(props) {
  const {
    size = "md",
    items = EMPTY_NODES,
    value: valueProp,
    radius = size,
    onFocus: onFocusProp,
    children = defaultRootItemRenderer,
    onKeyDown: onKeyDownProp,
    defaultValue = EMPTY,
    expandOnClick = true,
    expandedValue: expandedValueProp,
    onValueChange,
    selectionMode = "none",
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
        const hasChildren = node.children != null && node.children.length > 0;

        result.push({ node, level, setSize: nodes.length, posInSet: index + 1 });
        if (hasChildren && expanded.has(node.id) && node.children != null) {
          walk(node.children, level + 1);
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

  const select = React.useCallback(
    (itemId: string, action: TreeSelectAction, event: React.SyntheticEvent) => {
      if (selectionMode === "none") {
        return;
      }

      let nextValue: readonly string[];
      if (action === "toggle" || selectionMode === "multiple") {
        nextValue = selected.has(itemId) ? value.filter((id) => id !== itemId) : [...value, itemId];
        if (selectionMode === "single") {
          nextValue = [itemId];
        }
      } else {
        nextValue = [itemId];
      }

      setValue(nextValue);
      onValueChange?.(nextValue, event);
    },
    [onValueChange, selected, selectionMode, setValue, value],
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
      focus,
      select,
      activeId,
      expanded,
      selected,
      getItemId,
      setActive: setActiveId,
      expandOnClick,
      selectionMode,
      toggleExpansion,
    }),
    [
      activeId,
      expandOnClick,
      expanded,
      focus,
      getItemId,
      select,
      selected,
      selectionMode,
      toggleExpansion,
    ],
  );

  const activateElement = React.useCallback((element: HTMLElement) => {
    const itemId = element.dataset["id"] ?? null;
    setActiveId(itemId);
    element.scrollIntoView({ block: "nearest" });
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
        if (currentElement != null && currentItemId != null && selectionMode !== "none") {
          event.preventDefault();
          select(currentItemId, selectionMode === "multiple" ? "toggle" : "only", event);
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

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
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

  return (
    <TreeContext value={ctx}>
      {useRender<HTMLDivElement, {}>({
        props: [
          otherDivProps,
          {
            ref: rootRef,
            role: "tree",
            onFocus: handleFocus,
            children:
              typeof children === "function"
                ? visibleNodes.map(({ node, level, setSize, posInSet }) => (
                    <React.Fragment key={node.id}>
                      {children(node, level, posInSet, setSize)}
                    </React.Fragment>
                  ))
                : toReactNode(children),
            tabIndex: 0,
            className: cn("sui_tree", `sui_tree-radius_${radius}`, `sui_tree-size_${size}`),
            onKeyDown: handleKeyDown,
            "aria-multiselectable": selectionMode === "multiple" ? true : undefined,
            "aria-activedescendant": activeId != null ? getItemId(activeId) : undefined,
            "data-scope": dataScope,
          },
        ],
        defaultTagName: "div",
      })}
    </TreeContext>
  );
};

const defaultRootItemRenderer: ITreeRootItemRenderer = (node, level, posInSet, setSize) => {
  if (!isItemObject(node)) {
    return toReactNode(node);
  }

  const hasChildren = node.children != null && node.children.length > 0;

  return (
    <TreeItem
      id={node.id}
      key={node.id}
      label={node.label}
      level={level}
      setSize={setSize}
      disabled={node.disabled}
      posInSet={posInSet}
      hasChildren={hasChildren}
    >
      <TreeItemIndicator visible={hasChildren} />
      <TreeItemLabel>{toReactNode(node.label)}</TreeItemLabel>
    </TreeItem>
  );
};

function isItemObject(item: unknown): item is TreeRootItemObject {
  return typeof item === "object" && item !== null && "id" in item && "label" in item;
}

/**
 * {@link TreeRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link TreeRootState}
   */
  export type State = TreeRootState;

  /**
   * {@link TreeRootProps}
   */
  export type Props = TreeRootProps;

  /**
   * {@link TreeRootItemObject}
   */
  export type ItemObject = TreeRootItemObject;

  /**
   * {@link ITreeRootItemRenderer}
   */
  export interface IItemRenderer extends ITreeRootItemRenderer {}

  /**
   * {@link TreeRootRadius}
   */
  export type Radius = TreeRootRadius;

  /**
   * {@link TreeRootSelectionMode}
   */
  export type SelectionMode = TreeRootSelectionMode;

  /**
   * {@link TreeRootSize}
   */
  export type Size = TreeRootSize;
}

export { TreeRoot as Root };

// Item
// ----

/**
 * {@link TreeItem} の状態です。
 */
export type TreeItemState = {};

/**
 * {@link TreeItem} に渡すプロパティーです。
 */
export type TreeItemProps = Omit<React.ComponentProps<"div">, keyof RenderProps | "children"> &
  RenderProps<TreeItemState> & {
    /**
     * 項目の内容です。
     */
    children?: React.ReactNode | undefined;

    /**
     * 項目を無効にするかどうかを指定します。
     *
     * `true` の場合、選択と展開の操作ができなくなります。
     *
     * @default false
     */
    disabled?: boolean | undefined;

    /**
     * 子ノードを持つかどうかを指定します。
     *
     * `true` の場合、展開可能な分岐として描画します。
     *
     * @default false
     */
    hasChildren?: boolean | undefined;

    /**
     * 対応するノードの識別子です。
     *
     * `items` プロパティーから描画した項目には自動的に渡されます。
     */
    id: string;

    /**
     * 項目のラベルです。
     *
     * `children` を指定しないとき、{@link TreeItemLabel} として描画されます。
     */
    label?: React.ReactNode | undefined;

    /**
     * ノードの深さです。ルートの直接の子が `1` です。
     *
     * `items` プロパティーから描画した項目には自動的に渡されます。
     */
    level: number;

    /**
     * 同じ深さの中での位置です。1 起点です。
     *
     * `items` プロパティーから描画した項目には自動的に渡されます。
     */
    posInSet?: number | undefined;

    /**
     * 同じ深さの項目数です。
     *
     * `items` プロパティーから描画した項目には自動的に渡されます。
     */
    setSize?: number | undefined;
  };

/**
 * ツリーの項目要素です。
 */
export const TreeItem: IComponent<TreeItemProps> = function SuiTreeItem(props) {
  const ctx = useSuiTreeContext(true);
  const {
    id: itemId,
    label,
    level,
    setSize,
    children = label != null ? <TreeItemLabel>{label}</TreeItemLabel> : null,
    disabled = false,
    posInSet,
    hasChildren = false,
    onClick: onClickProp,
    ...otherDivProps
  } = props;

  const domId = ctx?.getItemId(itemId) ?? itemId;
  const expanded = ctx?.expanded.has(itemId) ?? false;
  const selected = ctx?.selectionMode !== "none" && (ctx?.selected.has(itemId) ?? false);
  const active = ctx?.activeId === itemId;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClickProp?.(event);
    if (ctx == null || disabled || event.defaultPrevented) {
      return;
    }

    ctx.setActive(itemId);
    ctx.focus();

    const target = event.target instanceof Element ? event.target : null;
    const indicatorClicked = target?.closest("[data-sui_tree_item_indicator]") != null;
    if (hasChildren && (indicatorClicked || ctx.expandOnClick)) {
      ctx.toggleExpansion(itemId, event);
    }
    if (ctx.selectionMode !== "none") {
      const additive = event.metaKey || event.ctrlKey;
      ctx.select(itemId, ctx.selectionMode === "multiple" && additive ? "toggle" : "only", event);
    }
  };

  return useRender({
    props: [
      otherDivProps,
      {
        id: domId,
        role: "treeitem",
        style: { "--sui_tree_item-level": level - 1 },
        onClick: handleClick,
        children,
        className: cn<TreeItemState>(
          "sui_tree_item",
          expanded && "sui_tree_item-expanded",
          selected && "sui_tree_item-selected",
          active && "sui_tree_item-active",
          disabled && "sui_tree_item-disabled",
        ),
        "aria-level": level,
        "aria-setsize": setSize,
        "aria-disabled": disabled || undefined,
        "aria-expanded": hasChildren ? expanded : undefined,
        "aria-posinset": posInSet,
        "aria-selected": ctx?.selectionMode !== "none" ? selected : undefined,
        "data-id": itemId,
      },
    ],
    defaultTagName: "div",
  });
};

export { TreeItem as Item };

export namespace Item {
  /**
   * {@link TreeItemState}
   */
  export type State = TreeItemState;

  /**
   * {@link TreeItemProps}
   */
  export type Props = TreeItemProps;
}

// Indicator
// ---------

/**
 * {@link TreeItemIndicator} の状態です。
 */
export type TreeItemIndicatorState = {};

/**
 * {@link TreeItemIndicator} に渡すプロパティーです。
 */
export type TreeItemIndicatorProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<TreeItemIndicatorState> & {
    /**
     * 展開インジケーターを表示するかどうかを指定します。
     *
     * `false` の場合、ラベルの桁を揃えるためのスペースのみを確保します。
     *
     * @default true
     */
    visible?: boolean | undefined;
  };

/**
 * ツリーの項目の展開状態を示すアイコン要素です。
 *
 * 既定では右向きのシェブロンアイコンを表示し、展開時には下向きに回転します。
 */
export const TreeItemIndicator: IComponent<TreeItemIndicatorProps> = function SuiTreeItemIndicator(
  props,
) {
  const { visible = true, children = <ChevronRightIcon />, ...otherSpanProps } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        children,
        className: cn<TreeItemIndicatorState>(
          "sui_tree_item_indicator",
          !visible && "sui_tree_item_indicator-hidden",
        ),
        "data-sui_tree_item_indicator": "",
      },
    ],
    defaultTagName: "span",
  });
};

export { TreeItemIndicator as Indicator };

export namespace Indicator {
  /**
   * {@link TreeItemIndicatorState}
   */
  export type State = TreeItemIndicatorState;

  /**
   * {@link TreeItemIndicatorProps}
   */
  export type Props = TreeItemIndicatorProps;
}

// Label
// -----

/**
 * {@link TreeItemLabel} の状態です。
 */
export type TreeItemLabelState = {};

/**
 * {@link TreeItemLabel} に渡すプロパティーです。
 */
export type TreeItemLabelProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<TreeItemLabelState>;

/**
 * ツリーの項目のラベルを表示する要素です。
 */
export const TreeItemLabel: IComponent<TreeItemLabelProps> = function SuiTreeItemLabel(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_tree_item_label",
      },
    ],
    defaultTagName: "span",
  });
};

export { TreeItemLabel as Label };

export namespace Label {
  /**
   * {@link TreeItemLabelState}
   */
  export type State = TreeItemLabelState;

  /**
   * {@link TreeItemLabelProps}
   */
  export type Props = TreeItemLabelProps;
}
