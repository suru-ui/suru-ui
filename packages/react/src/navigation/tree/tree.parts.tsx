import type { Size } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { IComponent, IUseContext } from "../../types.js";

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
   */
  readonly getItemId: (itemId: string) => string;

  /**
   * ノードの識別子から選択状態を変更する関数です。
   *
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
   */
  readonly setActive: (itemId: string) => void;

  /**
   * ノードの展開状態を切り替える関数です。
   *
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
  const context = React.use(TreeContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "TreeContext",
      providerName: "TreeRoot",
    });
  }

  return context;
}

/**
 * {@link TreeContext} を読み取るフックです。
 */
export const useTreeContext: IUseContext<TreeContext> = useSuiTreeContext;

/**
 * {@link TreeContext} です。
 */
export type Context = TreeContext;

/**
 * {@link TreeContext} です。
 */
export const Context: React.Context<Context | null> = TreeContext;

/**
 * {@link useTreeContext} です。
 */
export const useContext: IUseContext<Context> = useTreeContext;

// Root
// ----

/**
 * ツリーのノードです。
 */
export type TreeNode = {
  /**
   * 子ノードです。
   */
  readonly children?: readonly TreeNode[] | undefined;

  /**
   * ノードを無効にするかどうかを指定します。
   *
   * @default false
   */
  readonly disabled?: boolean | undefined;

  /**
   * ノードの一意な識別子です。
   */
  readonly id: string;

  /**
   * ノードのラベルです。
   */
  readonly label: React.ReactNode;
};

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
export type TreeRootProps = Omit<
  React.ComponentProps<"div"> & RenderProps<TreeRootState>,
  "children"
> & {
  /**
   * ツリーの子要素です。
   *
   * {@link TreeItem} を配置します。関数を指定すると、表示中のノードごとに子要素を描画できます。
   *
   * @param node 対応するノードです。
   * @param level ノードの深さです。ルートの直接の子が `1` です。
   * @param posInSet 同じ深さの中での位置です。1 起点です。
   * @param setSize 同じ深さの項目数です。
   */
  children?:
    | React.ReactNode
    | ((
        node: Readonly<TreeNode>,
        level: number,
        posInSet: number,
        setSize: number,
      ) => React.ReactNode)
    | undefined;

  /**
   * ツリーのノードデータです。
   *
   * `children` に関数を指定したとき、展開状態に応じて表示中のノードだけが順に関数へ渡されます。
   */
  data?: readonly TreeNode[] | undefined;

  /**
   * 初期状態で展開するノードの識別子の一覧を指定します。
   */
  defaultExpandedValue?: readonly string[] | undefined;

  /**
   * 初期状態で選択するノードの識別子の一覧を指定します。
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
   * 展開状態が変化したときに呼び出されます。
   *
   * @param event 変化のきっかけになったイベントです。
   */
  onExpandedValueChange?:
    | ((value: readonly string[], event: React.SyntheticEvent) => void)
    | undefined;

  /**
   * 選択状態が変化したときに呼び出されます。
   *
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

const EMPTY_NODES: readonly TreeNode[] = [];

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
    onKeyDown: onKeyDownProp,
    onFocus: onFocusProp,
    children,
    data = EMPTY_NODES,
    value: valueProp,
    defaultValue = EMPTY,
    expandedValue: expandedValueProp,
    defaultExpandedValue = EMPTY,
    expandOnClick = true,
    onValueChange,
    onExpandedValueChange,
    radius = "md",
    selectionMode = "none",
    size = "md",
    className,
    ...otherProps
  } = props;

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [valueState, setValueState] = React.useState<readonly string[]>(defaultValue);
  const [expandedState, setExpandedState] = React.useState<readonly string[]>(defaultExpandedValue);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const value = valueProp ?? valueState;
  const expandedValue = expandedValueProp ?? expandedState;
  const selected = React.useMemo(() => new Set(value), [value]);
  const expanded = React.useMemo(() => new Set(expandedValue), [expandedValue]);
  const baseId = React.useId();

  const visibleNodes = React.useMemo(() => {
    const result: {
      level: number;
      node: Readonly<TreeNode>;
      posInSet: number;
      setSize: number;
    }[] = [];

    const walk = (nodes: readonly TreeNode[], level: number): void => {
      for (const [index, node] of nodes.entries()) {
        const hasChildren = node.children != null && node.children.length > 0;

        result.push({ node, level, posInSet: index + 1, setSize: nodes.length });
        if (hasChildren && expanded.has(node.id) && node.children != null) {
          walk(node.children, level + 1);
        }
      }
    };
    walk(data, 1);

    return result;
  }, [data, expanded]);

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

      if (valueProp == null) {
        setValueState(nextValue);
      }
      onValueChange?.(nextValue, event);
    },
    [onValueChange, selected, selectionMode, value, valueProp],
  );

  const toggleExpansion = React.useCallback(
    (itemId: string, event: React.SyntheticEvent) => {
      const nextValue = expanded.has(itemId)
        ? expandedValue.filter((id) => id !== itemId)
        : [...expandedValue, itemId];

      if (expandedValueProp == null) {
        setExpandedState(nextValue);
      }
      onExpandedValueChange?.(nextValue, event);
    },
    [expanded, expandedValue, expandedValueProp, onExpandedValueChange],
  );

  const context = React.useMemo<TreeContext>(
    () => ({
      activeId,
      expandOnClick,
      expanded,
      focus,
      getItemId,
      select,
      selected,
      setActive: setActiveId,
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

  const setRef = (element: HTMLDivElement | null) => {
    rootRef.current = element;
  };

  return (
    <Context value={context}>
      {useRender<HTMLDivElement, {}>({
        defaultTagName: "div",
        props: [
          otherProps,
          {
            "aria-activedescendant": activeId != null ? getItemId(activeId) : undefined,
            "aria-multiselectable": selectionMode === "multiple" ? true : undefined,
            children:
              typeof children === "function"
                ? visibleNodes.map(({ node, level, posInSet, setSize }) => (
                    <React.Fragment key={node.id}>
                      {children(node, level, posInSet, setSize)}
                    </React.Fragment>
                  ))
                : children,
            className: cn(
              className,
              "sui_tree",
              `sui_tree-radius_${radius}`,
              `sui_tree-size_${size}`,
            ),
            onFocus: handleFocus,
            onKeyDown: handleKeyDown,
            ref: setRef,
            role: "tree",
            tabIndex: 0,
          },
        ],
      })}
    </Context>
  );
};

/**
 * {@link TreeRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link TreeRootState} です。
   */
  export type State = TreeRootState;

  /**
   * {@link TreeRootProps} です。
   */
  export type Props = TreeRootProps;

  /**
   * {@link TreeRootRadius} です。
   */
  export type Radius = TreeRootRadius;

  /**
   * {@link TreeRootSelectionMode} です。
   */
  export type SelectionMode = TreeRootSelectionMode;

  /**
   * {@link TreeRootSize} です。
   */
  export type Size = TreeRootSize;
}

/**
 * {@link TreeRoot} です。
 */
export const Root: IComponent<Root.Props> = TreeRoot;

// Item
// ----

/**
 * {@link TreeItem} の状態です。
 */
export type TreeItemState = {};

/**
 * {@link TreeItem} のインラインスタイルです。
 *
 * インデントの計算に使う CSS 変数を含みます。
 */
type TreeItemStyle = React.CSSProperties & {
  "--sui_tree_item-level"?: number;
};

/**
 * {@link TreeItem} に渡すプロパティーです。
 */
export type TreeItemProps = Omit<
  React.ComponentProps<"div"> & RenderProps<TreeItemState>,
  "children"
> & {
  /**
   * 項目の内容です。
   */
  children?: React.ReactNode | undefined;

  /**
   * 項目を無効にするかどうかを指定します。
   *
   * @default false
   */
  disabled?: boolean | undefined;

  /**
   * 子ノードを持つかどうかを指定します。
   *
   * @default false
   */
  hasChildren?: boolean | undefined;

  /**
   * 対応するノードの識別子です。
   *
   * `data` プロパティーから描画した項目には自動的に渡されます。
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
   * `data` プロパティーから描画した項目には自動的に渡されます。
   */
  level: number;

  /**
   * 同じ深さの中での位置です。1 起点です。
   *
   * `data` プロパティーから描画した項目には自動的に渡されます。
   */
  posInSet?: number | undefined;

  /**
   * 同じ深さの項目数です。
   *
   * `data` プロパティーから描画した項目には自動的に渡されます。
   */
  setSize?: number | undefined;
};

/**
 * ツリーの項目要素です。
 *
 * {@link TreeRoot} の中で配置します。
 */
export const TreeItem: IComponent<TreeItemProps> = function SuiTreeItem(props) {
  const context = useSuiTreeContext(true);
  const {
    id: itemId,
    level,
    setSize,
    posInSet,
    hasChildren = false,
    disabled = false,
    label,
    children,
    className,
    onClick: onClickProp,
    ...otherProps
  } = props;

  const domId = context?.getItemId(itemId) ?? itemId;
  const expanded = context?.expanded.has(itemId) ?? false;
  const selected = context?.selectionMode !== "none" && (context?.selected.has(itemId) ?? false);
  const active = context?.activeId === itemId;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClickProp?.(event);
    if (context == null || disabled || event.defaultPrevented) {
      return;
    }

    context.setActive(itemId);
    context.focus();

    const target = event.target instanceof Element ? event.target : null;
    const indicatorClicked = target?.closest("[data-sui_tree_item_indicator]") != null;
    if (hasChildren && (indicatorClicked || context.expandOnClick)) {
      context.toggleExpansion(itemId, event);
    }
    if (context.selectionMode !== "none") {
      const additive = event.metaKey || event.ctrlKey;
      context.select(
        itemId,
        context.selectionMode === "multiple" && additive ? "toggle" : "only",
        event,
      );
    }
  };

  return useRender({
    defaultTagName: "div",
    props: [
      otherProps,
      {
        "aria-disabled": disabled || undefined,
        "aria-expanded": hasChildren ? expanded : undefined,
        "aria-level": level,
        "aria-posinset": posInSet,
        "aria-selected": context?.selectionMode !== "none" ? selected : undefined,
        "aria-setsize": setSize,
        children: children ?? (label != null ? <TreeItemLabel>{label}</TreeItemLabel> : null),
        className: cn(
          className,
          "sui_tree_item",
          expanded && "sui_tree_item-expanded",
          selected && "sui_tree_item-selected",
          active && "sui_tree_item-active",
          disabled && "sui_tree_item-disabled",
        ),
        "data-id": itemId,
        id: domId,
        onClick: handleClick,
        role: "treeitem",
        style: { "--sui_tree_item-level": level - 1 } as TreeItemStyle,
      },
    ],
  });
};

/**
 * {@link TreeItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link TreeItemState} です。
   */
  export type State = TreeItemState;

  /**
   * {@link TreeItemProps} です。
   */
  export type Props = TreeItemProps;
}

/**
 * {@link TreeItem} です。
 */
export const Item: IComponent<Item.Props> = TreeItem;

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
  const {
    visible = true,
    className,
    children = <SuiTreeChevronRightIcon />,
    ...otherProps
  } = props;

  return useRender({
    defaultTagName: "span",
    props: [
      { ...otherProps, children },
      {
        "data-sui_tree_item_indicator": "",
        className: cn(
          className,
          "sui_tree_item_indicator",
          !visible && "sui_tree_item_indicator-hidden",
        ),
      },
    ],
  });
};

/**
 * {@link TreeItemIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link TreeItemIndicatorState} です。
   */
  export type State = TreeItemIndicatorState;

  /**
   * {@link TreeItemIndicatorProps} です。
   */
  export type Props = TreeItemIndicatorProps;
}

/**
 * {@link TreeItemIndicator} です。
 */
export const Indicator: IComponent<Indicator.Props> = TreeItemIndicator;

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
    defaultTagName: "span",
    props: [
      props,
      {
        className: "sui_tree_item_label",
      },
    ],
  });
};

/**
 * {@link TreeItemLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Label {
  /**
   * {@link TreeItemLabelState} です。
   */
  export type State = TreeItemLabelState;

  /**
   * {@link TreeItemLabelProps} です。
   */
  export type Props = TreeItemLabelProps;
}

/**
 * {@link TreeItemLabel} です。
 */
export const Label: IComponent<Label.Props> = TreeItemLabel;

// SuiTreeChevronRightIcon
// -----------------------

function SuiTreeChevronRightIcon() {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      focusable="false"
      aria-hidden="true"
    >
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
