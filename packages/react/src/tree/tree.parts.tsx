import { useControlled } from "@base-ui/utils/useControlled";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ChevronRightIcon } from "../_icons.jsx";
import toReactNode from "../_to-react-node.js";
import useRender, { type RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.jsx";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./tree.css";

// Context
// -------

/**
 * 項目の選択を変更するアクションです。
 *
 * - `"only"`: 指定した項目だけを選択する
 * - `"toggle"`: 指定した項目の選択を切り替える
 * - `"range"`: 起点から指定した項目までの表示中の項目を選択する
 * - `"add-range"`: 起点から指定した項目までの表示中の項目を選択状態に追加する
 */
export type TreeSelectAction = "only" | "toggle" | "range" | "add-range";

/**
 * {@link TreeRoot} が子パーツへ提供するコンテキストです。
 */
export type TreeContext = {
  /**
   * キーボードフォーカスの対象になっているノードの識別子です。
   */
  readonly activeId: string | null;

  /**
   * 項目の配色です。
   */
  readonly color: TreeRootColor;

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
   * 項目の背景色を控えめにするかどうかです。
   */
  readonly muted: boolean;

  /**
   * 項目に枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 項目の角丸です。
   */
  readonly radius: TreeRootRadius;

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
   * キーボードフォーカスの対象にするノードを変更する関数です。
   *
   * @param itemId フォーカス対象にするノードの識別子です。
   */
  readonly setActive: (itemId: string) => void;

  /**
   * 項目の大きさです。
   */
  readonly size: TreeRootSize;

  /**
   * ノードの展開状態を切り替える関数です。
   *
   * @param itemId 展開状態を切り替えるノードの識別子です。
   * @param event 展開のきっかけになったイベントです。
   */
  readonly toggleExpansion: (itemId: string, event: React.SyntheticEvent) => void;

  /**
   * 項目の主な外観です。
   */
  readonly variant: TreeRootVariant;
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
}

// Root
// ----

/**
 * {@link TreeRoot} の項目を表すオブジェクトです。
 *
 * `id` と `label` と `items` を含み、その他のプロパティーは {@link TreeItem} に渡されます。
 */
export type TreeRootItemObject = Omit<
  TreeItemProps,
  "children" | "hasItems" | "id" | "level" | "posInSet" | "setSize"
> & {
  /**
   * ノードの一意な識別子です。
   *
   * 展開や選択の状態管理に使います。
   */
  readonly id: string;

  /**
   * 子ノードの一覧です。
   *
   * 空でない場合に展開可能な分岐として扱います。
   */
  readonly items?: readonly TreeRootItemObject[] | undefined;

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

const EMPTY: readonly string[] = [];

const EMPTY_NODES: readonly TreeRootItemObject[] = [];

function isBranchElement(element: Element): boolean {
  return element.getAttribute("aria-expanded") != null;
}

function getSelectAction(event: React.SyntheticEvent): TreeSelectAction {
  const native = event.nativeEvent as MouseEvent | KeyboardEvent;
  const additive = native.ctrlKey || native.metaKey;
  const ranged = native.shiftKey;
  if (ranged && additive) {
    return "add-range";
  }
  if (ranged) {
    return "range";
  }
  if (additive) {
    return "toggle";
  }

  return "only";
}

/**
 * ツリーのルート要素です。
 *
 * WAI-ARIA tree パターンに従い、キーボード操作と選択と展開の状態を管理します。
 */
export const TreeRoot: IComponent<TreeRootProps> = function SuiTreeRoot(props) {
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
              typeof children !== "function"
                ? children
                : visibleNodes.map(({ node, level, setSize, posInSet }) => (
                    <React.Fragment key={node.id}>
                      {children(node, level, posInSet, setSize)}
                    </React.Fragment>
                  )),
            tabIndex: 0,
            className: cn("sui_tree", `sui_tree-radius_${radius}`, `sui_tree-size_${size}`),
            onKeyDown: handleKeyDown,
            "aria-multiselectable": true,
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

  const { id, items, label, ...otherItemProps } = node;
  const hasItems = items != null && items.length > 0;

  return (
    <TreeItem
      {...otherItemProps}
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
   * {@link TreeRootColor}
   */
  export type Color = TreeRootColor;

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
   * {@link TreeRootSize}
   */
  export type Size = TreeRootSize;

  /**
   * {@link TreeRootVariant}
   */
  export type Variant = TreeRootVariant;
}

export { TreeRoot as Root };

// Item
// ----

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

/**
 * {@link TreeItem} に渡すプロパティーです。
 */
export type TreeItemProps = React.ComponentProps<typeof Button.Root> & {
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

/**
 * ツリーの項目要素です。
 */
export const TreeItem: IComponent<TreeItemProps> = function SuiTreeItem(props) {
  const ctx = useSuiTreeContext();
  const {
    id: itemId,
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
    ...otherButtonProps
  } = props;

  const domId = ctx.getItemId(itemId);
  const expanded = ctx.expanded.has(itemId);
  const selected = ctx.selected.has(itemId);

  const handleClick: NonNullable<TreeItemProps["onClick"]> = (event) => {
    onClickProp?.(event);
    if (ctx == null || disabled || event.defaultPrevented) {
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
      {...otherButtonProps}
      id={domId}
      item
      role="treeitem"
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
      nativeButton={false}
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
  /**
   * {@link TreeItemState}
   */
  export type State = TreeItemState;

  /**
   * {@link TreeItemProps}
   */
  export type Props = TreeItemProps;

  /**
   * {@link TreeItemColor}
   */
  export type Color = TreeItemColor;

  /**
   * {@link TreeItemRadius}
   */
  export type Radius = TreeItemRadius;

  /**
   * {@link TreeItemSize}
   */
  export type Size = TreeItemSize;

  /**
   * {@link TreeItemVariant}
   */
  export type Variant = TreeItemVariant;
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
