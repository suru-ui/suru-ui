import { Select as BaseSelect } from "@base-ui/react/select";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import { useActionGroupContext } from "../../layout/action-group/action-group.parts.jsx";
import { ScrollArea } from "../../navigation/scroll-area/index.js";
import type { Component } from "../../types.js";

import "./select.css";

// Context
// -------

/**
 * {@link SelectContext} の値です。
 */
export type SelectContext = {
  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 選択欄とリスト項目の角丸です。
   */
  readonly radius: "none" | "rounded" | "full";

  /**
   * 選択欄とリスト項目のサイズです。
   */
  readonly size: Size;

  /**
   * 選択欄のスタイルバリエーションです。
   */
  readonly variant: "naked" | "liquid";
};

/**
 * Select のスタイルを子パーツへ伝播するコンテキストです。
 */
export const SelectContext: React.Context<SelectContext | null> =
  React.createContext<SelectContext | null>(null);

/**
 * {@link SelectContext} を読み取るフックです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useSelectContext(optional?: false): SelectContext;
export function useSelectContext(optional?: boolean): SelectContext | null;
export function useSelectContext(optional?: boolean): SelectContext | null {
  const context = React.use(SelectContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "SelectContext",
      providerName: "SelectRoot",
    });
  }

  return context;
}

/**
 * {@link SelectContext} のエイリアスです。
 */
export type Context = SelectContext;

/**
 * {@link SelectContext} のエイリアスです。
 */
export const Context: React.Context<SelectContext | null> = SelectContext;

/**
 * {@link useSelectContext} のエイリアスです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useContext(optional?: false): SelectContext;
export function useContext(optional?: boolean): SelectContext | null;
export function useContext(optional?: boolean): SelectContext | null {
  return useSelectContext(optional);
}

// Root
// ----

/**
 * Select のグループ項目です。
 */
export type SelectItemGroup<Value = unknown> = {
  /**
   * グループの見出しです。
   */
  readonly label?: React.ReactNode;

  /**
   * グループに含まれる項目です。
   */
  readonly items: readonly Value[];
  readonly [key: string]: unknown;
};

/**
 * Select の項目一覧です。
 */
export type SelectItems<Value = unknown> =
  | Record<string, React.ReactNode>
  | readonly (Value | { readonly label: React.ReactNode; readonly value: Value })[]
  | readonly SelectItemGroup<Value>[];

/**
 * {@link Root} の状態です。
 */
export type SelectRootState = BaseSelect.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type SelectRootProps<Value = unknown, Multiple extends boolean | undefined = false> = Omit<
  BaseSelect.Root.Props<Value, Multiple>,
  "items"
> & {
  /**
   * リストに表示する項目の一覧です。
   */
  items?: SelectItems<Value> | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   */
  outlined?: boolean | undefined;

  /**
   * 選択欄とリスト項目のサイズを指定します。
   */
  size?: Size | undefined;

  /**
   * 選択欄のスタイルバリエーションを指定します。
   */
  variant?: "naked" | "liquid" | undefined;

  /**
   * 選択欄とリスト項目の角丸を指定します。
   */
  radius?: "none" | "rounded" | "full" | undefined;
};

/**
 * {@link SelectRoot} のコンポーネント型です。
 */
export interface SelectRootComponent {
  <Value, Multiple extends boolean | undefined = false>(
    props: SelectRootProps<Value, Multiple>,
  ): React.ReactElement | null;

  displayName?: string | undefined;
}

/**
 * 選択状態とポップアップの開閉状態を管理する Select のルートです。
 *
 * それ自身は HTML 要素をレンダリングせず、スタイルを子パーツへ伝播します。
 *
 * @example
 * ```tsx
 * <SelectParts.Root items={["りんご", "ばなな"]}>
 *   <SelectParts.Trigger>
 *     <SelectParts.Value placeholder="選択してください" />
 *     <SelectParts.Icon>⌄</SelectParts.Icon>
 *   </SelectParts.Trigger>
 * </SelectParts.Root>
 * ```
 */
export const SelectRoot: SelectRootComponent = function SuiSelectRoot<
  Value,
  Multiple extends boolean | undefined = false,
>(props: SelectRootProps<Value, Multiple>) {
  const {
    items,
    radius: radiusProp = "rounded",
    size: sizeProp = "md",
    variant: variantProp = "naked",
    outlined: outlinedProp = variantProp === "naked",
    ...otherProps
  } = props;
  const context = React.useMemo<SelectContext>(
    () => ({
      outlined: outlinedProp,
      radius: radiusProp,
      size: sizeProp,
      variant: variantProp,
    }),
    [outlinedProp, radiusProp, sizeProp, variantProp],
  );

  return (
    <Context value={context}>
      <BaseSelect.Root {...otherProps} items={getBaseItems(items)} />
    </Context>
  );
};

type BaseSelectItems = NonNullable<BaseSelect.Root.Props<unknown>["items"]>;

function getBaseItems<Value>(items: SelectItems<Value> | undefined): BaseSelectItems | undefined {
  if (!Array.isArray(items)) {
    return items;
  }

  const first = items[0];
  if (
    typeof first === "object" &&
    first !== null &&
    (("items" in first && Array.isArray(first.items)) || ("label" in first && "value" in first))
  ) {
    return items as BaseSelectItems;
  }

  return undefined;
}

/**
 * {@link SelectRoot} に対応する型名前空間です。
 */
export namespace Root {
  /**
   * {@link SelectRoot} の状態型です。
   */
  export type State = SelectRootState;

  /**
   * {@link SelectRoot} のプロパティー型です。
   */
  export type Props<
    Value = unknown,
    Multiple extends boolean | undefined = false,
  > = SelectRootProps<Value, Multiple>;
}

/**
 * {@link SelectRoot} の短い名前です。
 */
export const Root: SelectRootComponent = SelectRoot;

// Label
// -----

/**
 * {@link Label} の状態です。
 */
export type SelectLabelState = BaseSelect.Label.State;

/**
 * {@link Label} に渡すプロパティーです。
 */
export type SelectLabelProps = React.ComponentProps<typeof BaseSelect.Label>;

/**
 * 選択欄に対応する表示ラベルです。
 *
 * @example
 * ```tsx
 * <SelectParts.Label>果物</SelectParts.Label>
 * ```
 */
export const SelectLabel: Component<SelectLabelProps> = function SuiSelectLabel(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Label {...otherProps} className={cn(className, "sui_select_label")} />;
};

/**
 * {@link SelectLabel} に対応する型名前空間です。
 */
export namespace Label {
  /**
   * {@link SelectLabel} の状態型です。
   */
  export type State = SelectLabelState;

  /**
   * {@link SelectLabel} のプロパティー型です。
   */
  export type Props = SelectLabelProps;
}

/**
 * {@link SelectLabel} の短い名前です。
 */
export const Label: Component<Label.Props> = SelectLabel;

// Trigger
// -------

/**
 * {@link Trigger} の状態です。
 */
export type SelectTriggerState = BaseSelect.Trigger.State;

/**
 * {@link Trigger} に渡すプロパティーです。
 */
export type SelectTriggerProps = React.ComponentProps<typeof BaseSelect.Trigger>;

/**
 * Select ポップアップを開閉するボタン要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.Trigger aria-label="果物を選択">
 *   <SelectParts.Value />
 *   <SelectParts.Icon>⌄</SelectParts.Icon>
 * </SelectParts.Trigger>
 * ```
 */
export const SelectTrigger: Component<SelectTriggerProps> = function SuiSelectTrigger(props) {
  const actionGroup = useActionGroupContext(true);
  const context = useSelectContext(true);
  const { className, ...otherProps } = props;
  const size = actionGroup?.size ?? context?.size ?? "md";
  const radius = actionGroup?.radius ?? context?.radius ?? "rounded";
  const variant = actionGroup?.variant ?? context?.variant ?? "naked";
  const outlined = actionGroup?.outlined ?? context?.outlined ?? variant === "naked";

  return (
    <BaseSelect.Trigger
      {...otherProps}
      className={cn(
        className,
        "sui_select",
        "sui_action_group_item",
        `sui_select-size_${size}`,
        `sui_select-variant_${variant}`,
        `sui_select-radius_${radius}`,
        outlined && "sui_select-outlined",
        (state) => state.disabled && "sui_select-disabled",
      )}
    />
  );
};

/**
 * {@link SelectTrigger} に対応する型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link SelectTrigger} の状態型です。
   */
  export type State = SelectTriggerState;

  /**
   * {@link SelectTrigger} のプロパティー型です。
   */
  export type Props = SelectTriggerProps;
}

/**
 * {@link SelectTrigger} の短い名前です。
 */
export const Trigger: Component<Trigger.Props> = SelectTrigger;

// Value
// -----

/**
 * {@link Value} の状態です。
 */
export type SelectValueState = BaseSelect.Value.State;

/**
 * {@link Value} に渡すプロパティーです。
 */
export type SelectValueProps = React.ComponentProps<typeof BaseSelect.Value>;

/**
 * 現在の選択値またはプレースホルダーを表示する要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.Value placeholder="選択してください" />
 * ```
 */
export const SelectValue: Component<SelectValueProps> = function SuiSelectValue(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Value {...otherProps} className={cn(className, "sui_select_value")} />;
};

/**
 * {@link SelectValue} に対応する型名前空間です。
 */
export namespace Value {
  /**
   * {@link SelectValue} の状態型です。
   */
  export type State = SelectValueState;

  /**
   * {@link SelectValue} のプロパティー型です。
   */
  export type Props = SelectValueProps;
}

/**
 * {@link SelectValue} の短い名前です。
 */
export const Value: Component<Value.Props> = SelectValue;

// Icon
// ----

/**
 * {@link Icon} の状態です。
 */
export type SelectIconState = BaseSelect.Icon.State;

/**
 * {@link Icon} に渡すプロパティーです。
 */
export type SelectIconProps = React.ComponentProps<typeof BaseSelect.Icon>;

/**
 * ポップアップの開閉を示すアイコンのラッパー要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.Icon>⌄</SelectParts.Icon>
 * ```
 */
export const SelectIcon: Component<SelectIconProps> = function SuiSelectIcon(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Icon {...otherProps} className={cn(className, "sui_select_icon")} />;
};

/**
 * {@link SelectIcon} に対応する型名前空間です。
 */
export namespace Icon {
  /**
   * {@link SelectIcon} の状態型です。
   */
  export type State = SelectIconState;

  /**
   * {@link SelectIcon} のプロパティー型です。
   */
  export type Props = SelectIconProps;
}

/**
 * {@link SelectIcon} の短い名前です。
 */
export const Icon: Component<Icon.Props> = SelectIcon;

// Portal
// ------

/**
 * {@link Portal} の状態です。
 */
export type SelectPortalState = BaseSelect.Portal.State;

/**
 * {@link Portal} に渡すプロパティーです。
 */
export type SelectPortalProps = React.ComponentProps<typeof BaseSelect.Portal>;

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.Portal><SelectParts.Popup /></SelectParts.Portal>
 * ```
 */
export const SelectPortal: Component<SelectPortalProps> = function SuiSelectPortal(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Portal {...otherProps} className={cn(className, "sui_select_portal")} />;
};

/**
 * {@link SelectPortal} に対応する型名前空間です。
 */
export namespace Portal {
  /**
   * {@link SelectPortal} の状態型です。
   */
  export type State = SelectPortalState;

  /**
   * {@link SelectPortal} のプロパティー型です。
   */
  export type Props = SelectPortalProps;
}

/**
 * {@link SelectPortal} の短い名前です。
 */
export const Portal: Component<Portal.Props> = SelectPortal;

// Backdrop
// --------

/**
 * {@link Backdrop} の状態です。
 */
export type SelectBackdropState = BaseSelect.Backdrop.State;

/**
 * {@link Backdrop} に渡すプロパティーです。
 */
export type SelectBackdropProps = React.ComponentProps<typeof BaseSelect.Backdrop>;

/**
 * ポップアップの背後に表示される要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.Backdrop />
 * ```
 */
export const SelectBackdrop: Component<SelectBackdropProps> = function SuiSelectBackdrop(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Backdrop {...otherProps} className={cn(className, "sui_select_backdrop")} />;
};

/**
 * {@link SelectBackdrop} に対応する型名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link SelectBackdrop} の状態型です。
   */
  export type State = SelectBackdropState;

  /**
   * {@link SelectBackdrop} のプロパティー型です。
   */
  export type Props = SelectBackdropProps;
}

/**
 * {@link SelectBackdrop} の短い名前です。
 */
export const Backdrop: Component<Backdrop.Props> = SelectBackdrop;

// Positioner
// ----------

/**
 * {@link Positioner} の状態です。
 */
export type SelectPositionerState = BaseSelect.Positioner.State;

/**
 * {@link Positioner} に渡すプロパティーです。
 */
export type SelectPositionerProps = React.ComponentProps<typeof BaseSelect.Positioner>;

/**
 * ポップアップをトリガーへ位置合わせする要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.Positioner side="bottom" align="start"><SelectParts.Popup /></SelectParts.Positioner>
 * ```
 */
export const SelectPositioner: Component<SelectPositionerProps> = function SuiSelectPositioner(
  props,
) {
  const { className, ...otherProps } = props;
  return (
    <BaseSelect.Positioner {...otherProps} className={cn(className, "sui_select_positioner")} />
  );
};

/**
 * {@link SelectPositioner} に対応する型名前空間です。
 */
export namespace Positioner {
  /**
   * {@link SelectPositioner} の状態型です。
   */
  export type State = SelectPositionerState;

  /**
   * {@link SelectPositioner} のプロパティー型です。
   */
  export type Props = SelectPositionerProps;
}

/**
 * {@link SelectPositioner} の短い名前です。
 */
export const Positioner: Component<Positioner.Props> = SelectPositioner;

// Popup
// -----

/**
 * {@link Popup} の状態です。
 */
export type SelectPopupState = BaseSelect.Popup.State;

/**
 * {@link Popup} に渡すプロパティーです。
 */
export type SelectPopupProps = React.ComponentProps<typeof BaseSelect.Popup>;

/**
 * 選択項目を表示するポップアップ要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.Popup><SelectParts.List /></SelectParts.Popup>
 * ```
 */
export const SelectPopup: Component<SelectPopupProps> = function SuiSelectPopup(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Popup {...otherProps} className={cn(className, "sui_select_popup")} />;
};

/**
 * {@link SelectPopup} に対応する型名前空間です。
 */
export namespace Popup {
  /**
   * {@link SelectPopup} の状態型です。
   */
  export type State = SelectPopupState;

  /**
   * {@link SelectPopup} のプロパティー型です。
   */
  export type Props = SelectPopupProps;
}

/**
 * {@link SelectPopup} の短い名前です。
 */
export const Popup: Component<Popup.Props> = SelectPopup;

// List
// ----

/**
 * {@link List} の状態です。
 */
export type SelectListState = BaseSelect.List.State;

/**
 * {@link List} に渡すプロパティーです。
 */
export type SelectListProps = React.ComponentProps<typeof BaseSelect.List>;

/**
 * 選択項目を列挙するリスト要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.List><SelectParts.Item value="りんご">りんご</SelectParts.Item></SelectParts.List>
 * ```
 */
export const SelectList: Component<SelectListProps> = function SuiSelectList(props) {
  const { className, ...otherProps } = props;
  return (
    <ScrollArea className="sui_select_scroll_area">
      <BaseSelect.List {...otherProps} className={cn(className, "sui_select_list")} />
    </ScrollArea>
  );
};

/**
 * {@link SelectList} に対応する型名前空間です。
 */
export namespace List {
  /**
   * {@link SelectList} の状態型です。
   */
  export type State = SelectListState;

  /**
   * {@link SelectList} のプロパティー型です。
   */
  export type Props = SelectListProps;
}

/**
 * {@link SelectList} の短い名前です。
 */
export const List: Component<List.Props> = SelectList;

// Arrow
// -----

/**
 * {@link Arrow} の状態です。
 */
export type SelectArrowState = BaseSelect.Arrow.State;

/**
 * {@link Arrow} に渡すプロパティーです。
 */
export type SelectArrowProps = React.ComponentProps<typeof BaseSelect.Arrow>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.Arrow />
 * ```
 */
export const SelectArrow: Component<SelectArrowProps> = function SuiSelectArrow(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Arrow {...otherProps} className={cn(className, "sui_select_arrow")} />;
};

/**
 * {@link SelectArrow} に対応する型名前空間です。
 */
export namespace Arrow {
  /**
   * {@link SelectArrow} の状態型です。
   */
  export type State = SelectArrowState;

  /**
   * {@link SelectArrow} のプロパティー型です。
   */
  export type Props = SelectArrowProps;
}

/**
 * {@link SelectArrow} の短い名前です。
 */
export const Arrow: Component<Arrow.Props> = SelectArrow;

// Item
// ----

/**
 * {@link Item} の状態です。
 */
export type SelectItemState = BaseSelect.Item.State;

/**
 * {@link Item} に渡すプロパティーです。
 */
export type SelectItemProps = React.ComponentProps<typeof BaseSelect.Item>;

/**
 * 選択肢の個々の項目です。
 *
 * @example
 * ```tsx
 * <SelectParts.Item value="りんご">りんご</SelectParts.Item>
 * ```
 */
export const SelectItem: Component<SelectItemProps> = function SuiSelectItem(props) {
  const context = useSelectContext(true);
  const { className, ...otherProps } = props;
  const size = context?.size ?? "md";

  return (
    <BaseSelect.Item
      {...otherProps}
      className={cn(className, "sui_select_item", `sui_select-size_${size}`)}
    />
  );
};

/**
 * {@link SelectItem} に対応する型名前空間です。
 */
export namespace Item {
  /**
   * {@link SelectItem} の状態型です。
   */
  export type State = SelectItemState;

  /**
   * {@link SelectItem} のプロパティー型です。
   */
  export type Props = SelectItemProps;
}

/**
 * {@link SelectItem} の短い名前です。
 */
export const Item: Component<Item.Props> = SelectItem;

// ItemText
// --------

/**
 * {@link ItemText} の状態です。
 */
export type SelectItemTextState = BaseSelect.ItemText.State;

/**
 * {@link ItemText} に渡すプロパティーです。
 */
export type SelectItemTextProps = React.ComponentProps<typeof BaseSelect.ItemText>;

/**
 * 選択肢の表示テキストを包む要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.ItemText>りんご</SelectParts.ItemText>
 * ```
 */
export const SelectItemText: Component<SelectItemTextProps> = function SuiSelectItemText(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.ItemText {...otherProps} className={cn(className, "sui_select_item_text")} />;
};

/**
 * {@link SelectItemText} に対応する型名前空間です。
 */
export namespace ItemText {
  /**
   * {@link SelectItemText} の状態型です。
   */
  export type State = SelectItemTextState;

  /**
   * {@link SelectItemText} のプロパティー型です。
   */
  export type Props = SelectItemTextProps;
}

/**
 * {@link SelectItemText} の短い名前です。
 */
export const ItemText: Component<ItemText.Props> = SelectItemText;

// ItemIndicator
// -------------

/**
 * {@link ItemIndicator} の状態です。
 */
export type SelectItemIndicatorState = BaseSelect.ItemIndicator.State;

/**
 * {@link ItemIndicator} に渡すプロパティーです。
 */
export type SelectItemIndicatorProps = React.ComponentProps<typeof BaseSelect.ItemIndicator>;

/**
 * 選択された項目を示す要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.ItemIndicator>✓</SelectParts.ItemIndicator>
 * ```
 */
export const SelectItemIndicator: Component<SelectItemIndicatorProps> =
  function SuiSelectItemIndicator(props) {
    const { className, keepMounted = true, ...otherProps } = props;
    return (
      <BaseSelect.ItemIndicator
        {...otherProps}
        keepMounted={keepMounted}
        className={cn(className, "sui_select_item_indicator")}
      />
    );
  };

/**
 * {@link SelectItemIndicator} に対応する型名前空間です。
 */
export namespace ItemIndicator {
  /**
   * {@link SelectItemIndicator} の状態型です。
   */
  export type State = SelectItemIndicatorState;

  /**
   * {@link SelectItemIndicator} のプロパティー型です。
   */
  export type Props = SelectItemIndicatorProps;
}

/**
 * {@link SelectItemIndicator} の短い名前です。
 */
export const ItemIndicator: Component<ItemIndicator.Props> = SelectItemIndicator;

// ScrollUpArrow
// -------------

/**
 * {@link ScrollUpArrow} の状態です。
 */
export type SelectScrollUpArrowState = BaseSelect.ScrollUpArrow.State;

/**
 * {@link ScrollUpArrow} に渡すプロパティーです。
 */
export type SelectScrollUpArrowProps = React.ComponentProps<typeof BaseSelect.ScrollUpArrow>;

/**
 * 上方向へスクロールできることを示す要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.ScrollUpArrow>⌃</SelectParts.ScrollUpArrow>
 * ```
 */
export const SelectScrollUpArrow: Component<SelectScrollUpArrowProps> =
  function SuiSelectScrollUpArrow(props) {
    const { className, ...otherProps } = props;
    return (
      <BaseSelect.ScrollUpArrow
        {...otherProps}
        className={cn(className, "sui_select_scroll_up_arrow")}
      />
    );
  };

/**
 * {@link SelectScrollUpArrow} に対応する型名前空間です。
 */
export namespace ScrollUpArrow {
  /**
   * {@link SelectScrollUpArrow} の状態型です。
   */
  export type State = SelectScrollUpArrowState;

  /**
   * {@link SelectScrollUpArrow} のプロパティー型です。
   */
  export type Props = SelectScrollUpArrowProps;
}

/**
 * {@link SelectScrollUpArrow} の短い名前です。
 */
export const ScrollUpArrow: Component<ScrollUpArrow.Props> = SelectScrollUpArrow;

// ScrollDownArrow
// ---------------

/**
 * {@link ScrollDownArrow} の状態です。
 */
export type SelectScrollDownArrowState = BaseSelect.ScrollDownArrow.State;

/**
 * {@link ScrollDownArrow} に渡すプロパティーです。
 */
export type SelectScrollDownArrowProps = React.ComponentProps<typeof BaseSelect.ScrollDownArrow>;

/**
 * 下方向へスクロールできることを示す要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.ScrollDownArrow>⌄</SelectParts.ScrollDownArrow>
 * ```
 */
export const SelectScrollDownArrow: Component<SelectScrollDownArrowProps> =
  function SuiSelectScrollDownArrow(props) {
    const { className, ...otherProps } = props;
    return (
      <BaseSelect.ScrollDownArrow
        {...otherProps}
        className={cn(className, "sui_select_scroll_down_arrow")}
      />
    );
  };

/**
 * {@link SelectScrollDownArrow} に対応する型名前空間です。
 */
export namespace ScrollDownArrow {
  /**
   * {@link SelectScrollDownArrow} の状態型です。
   */
  export type State = SelectScrollDownArrowState;

  /**
   * {@link SelectScrollDownArrow} のプロパティー型です。
   */
  export type Props = SelectScrollDownArrowProps;
}

/**
 * {@link SelectScrollDownArrow} の短い名前です。
 */
export const ScrollDownArrow: Component<ScrollDownArrow.Props> = SelectScrollDownArrow;

// Group
// -----

/**
 * {@link Group} の状態です。
 */
export type SelectGroupState = BaseSelect.Group.State;

/**
 * {@link Group} に渡すプロパティーです。
 */
export type SelectGroupProps = React.ComponentProps<typeof BaseSelect.Group>;

/**
 * 関連する選択肢をまとめるグループ要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.Group><SelectParts.GroupLabel>果物</SelectParts.GroupLabel></SelectParts.Group>
 * ```
 */
export const SelectGroup: Component<SelectGroupProps> = function SuiSelectGroup(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Group {...otherProps} className={cn(className, "sui_select_group")} />;
};

/**
 * {@link SelectGroup} に対応する型名前空間です。
 */
export namespace Group {
  /**
   * {@link SelectGroup} の状態型です。
   */
  export type State = SelectGroupState;

  /**
   * {@link SelectGroup} のプロパティー型です。
   */
  export type Props = SelectGroupProps;
}

/**
 * {@link SelectGroup} の短い名前です。
 */
export const Group: Component<Group.Props> = SelectGroup;

// GroupLabel
// ----------

/**
 * {@link GroupLabel} の状態です。
 */
export type SelectGroupLabelState = BaseSelect.GroupLabel.State;

/**
 * {@link GroupLabel} に渡すプロパティーです。
 */
export type SelectGroupLabelProps = React.ComponentProps<typeof BaseSelect.GroupLabel>;

/**
 * 選択肢グループの見出し要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.GroupLabel>果物</SelectParts.GroupLabel>
 * ```
 */
export const SelectGroupLabel: Component<SelectGroupLabelProps> = function SuiSelectGroupLabel(
  props,
) {
  const { className, ...otherProps } = props;
  return (
    <BaseSelect.GroupLabel {...otherProps} className={cn(className, "sui_select_group_label")} />
  );
};

/**
 * {@link SelectGroupLabel} に対応する型名前空間です。
 */
export namespace GroupLabel {
  /**
   * {@link SelectGroupLabel} の状態型です。
   */
  export type State = SelectGroupLabelState;

  /**
   * {@link SelectGroupLabel} のプロパティー型です。
   */
  export type Props = SelectGroupLabelProps;
}

/**
 * {@link SelectGroupLabel} の短い名前です。
 */
export const GroupLabel: Component<GroupLabel.Props> = SelectGroupLabel;

// Separator
// ---------

/**
 * {@link Separator} の状態です。
 */
export type SelectSeparatorState = BaseSelect.Separator.State;

/**
 * {@link Separator} に渡すプロパティーです。
 */
export type SelectSeparatorProps = React.ComponentProps<typeof BaseSelect.Separator>;

/**
 * 項目やグループを区切る要素です。
 *
 * @example
 * ```tsx
 * <SelectParts.Separator />
 * ```
 */
export const SelectSeparator: Component<SelectSeparatorProps> = function SuiSelectSeparator(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Separator {...otherProps} className={cn(className, "sui_select_separator")} />;
};

/**
 * {@link SelectSeparator} に対応する型名前空間です。
 */
export namespace Separator {
  /**
   * {@link SelectSeparator} の状態型です。
   */
  export type State = SelectSeparatorState;

  /**
   * {@link SelectSeparator} のプロパティー型です。
   */
  export type Props = SelectSeparatorProps;
}

/**
 * {@link SelectSeparator} の短い名前です。
 */
export const Separator: Component<Separator.Props> = SelectSeparator;
