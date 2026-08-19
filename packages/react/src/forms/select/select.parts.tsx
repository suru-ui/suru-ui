import { Select as BaseSelect } from "@base-ui/react/select";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import { useActionGroupContext } from "../../layout/action-group/action-group.parts.jsx";
import { ScrollArea } from "../../navigation/scroll-area/index.js";
import type { IComponent, IUseContext } from "../../types.js";

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
  readonly radius: SelectRootRadius;

  /**
   * 選択欄とリスト項目のサイズです。
   */
  readonly size: SelectRootSize;

  /**
   * 選択欄のスタイルバリエーションです。
   */
  readonly variant: SelectRootVariant;
};

/**
 * Select のスタイルを子パーツへ伝播するコンテキストです。
 */
export const SelectContext: React.Context<SelectContext | null> =
  React.createContext<SelectContext | null>(null);

function useSuiSelectContext(optional?: false): SelectContext;
function useSuiSelectContext(optional?: boolean): SelectContext | null;
function useSuiSelectContext(optional?: boolean): SelectContext | null {
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
 * {@link SelectContext} を読み取るフックです。
 */
export const useSelectContext: IUseContext<SelectContext> = useSuiSelectContext;

/**
 * {@link SelectContext} です。
 */
export type Context = SelectContext;

/**
 * {@link SelectContext} です。
 */
export const Context: React.Context<SelectContext | null> = SelectContext;

/**
 * {@link useSelectContext} です。
 */
export const useContext: IUseContext<Context> = useSelectContext;

// Root
// ----

/**
 * 選択欄の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"rounded"`: 標準的な角丸
 * - `"full"`: 完全な丸形
 */
export type SelectRootRadius = "none" | "rounded" | "full";

/**
 * 選択欄の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type SelectRootSize = Size;

/**
 * 選択欄の主な外観の種類です。
 *
 * - `"naked"`: 背景のない選択欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type SelectRootVariant = "naked" | "liquid";

/**
 * Select のグループ項目です。
 */
export type SelectRootItemGroup<Value = unknown> = {
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
 *
 * - `Record<string, React.ReactNode>`: 値と表示内容を対応付けたオブジェクト
 * - `readonly (Value | { label: React.ReactNode; value: Value })[]`: 平坦な項目の配列
 * - `readonly SelectRootItemGroup<Value>[]`: グループ化した項目の配列
 */
export type SelectRootItems<Value = unknown> =
  | Record<string, React.ReactNode>
  | readonly (Value | { readonly label: React.ReactNode; readonly value: Value })[]
  | readonly SelectRootItemGroup<Value>[];

/**
 * {@link SelectRoot} の状態です。
 */
export type SelectRootState = BaseSelect.Root.State;

/**
 * {@link SelectRoot} に渡すプロパティーです。
 */
export type SelectRootProps<Value = unknown, Multiple extends boolean | undefined = false> = Omit<
  BaseSelect.Root.Props<Value, Multiple>,
  "items"
> & {
  /**
   * リストに表示する項目の一覧です。
   */
  items?: SelectRootItems<Value> | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   */
  outlined?: boolean | undefined;

  /**
   * 選択欄とリスト項目の角丸を指定します。
   */
  radius?: SelectRootRadius | undefined;

  /**
   * 選択欄とリスト項目のサイズを指定します。
   */
  size?: SelectRootSize | undefined;

  /**
   * 選択欄のスタイルバリエーションを指定します。
   */
  variant?: SelectRootVariant | undefined;
};

/**
 * {@link SelectRoot} のコンポーネント型です。
 */
export interface SelectRootComponent extends IComponent<
  SelectRootProps<unknown, boolean | undefined>
> {
  <Value, Multiple extends boolean | undefined = false>(
    props: SelectRootProps<Value, Multiple>,
  ): React.ReactElement | null;
}

/**
 * 選択状態とポップアップの開閉状態を管理する Select のルートです。
 *
 * それ自身は HTML 要素をレンダリングせず、スタイルを子パーツへ伝播します。
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

function getBaseItems<Value>(
  items: SelectRootItems<Value> | undefined,
): BaseSelectItems | undefined {
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
   * {@link SelectRootState} です。
   */
  export type State = SelectRootState;

  /**
   * {@link SelectRootProps} です。
   */
  export type Props<
    Value = unknown,
    Multiple extends boolean | undefined = false,
  > = SelectRootProps<Value, Multiple>;

  /**
   * {@link SelectRootRadius} です。
   */
  export type Radius = SelectRootRadius;

  /**
   * {@link SelectRootSize} です。
   */
  export type Size = SelectRootSize;

  /**
   * {@link SelectRootVariant} です。
   */
  export type Variant = SelectRootVariant;

  /**
   * {@link SelectRootItemGroup} です。
   */
  export type ItemGroup<Value = unknown> = SelectRootItemGroup<Value>;

  /**
   * {@link SelectRootItems} です。
   */
  export type Items<Value = unknown> = SelectRootItems<Value>;
}

/**
 * {@link SelectRoot} です。
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
 */
export const SelectLabel: IComponent<SelectLabelProps> = function SuiSelectLabel(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Label {...otherProps} className={cn(className, "sui_select_label")} />;
};

/**
 * {@link SelectLabel} に対応する型名前空間です。
 */
export namespace Label {
  /**
   * {@link SelectLabelState} です。
   */
  export type State = SelectLabelState;

  /**
   * {@link SelectLabelProps} です。
   */
  export type Props = SelectLabelProps;
}

/**
 * {@link SelectLabel} です。
 */
export const Label: IComponent<Label.Props> = SelectLabel;

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
 */
export const SelectTrigger: IComponent<SelectTriggerProps> = function SuiSelectTrigger(props) {
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
   * {@link SelectTriggerState} です。
   */
  export type State = SelectTriggerState;

  /**
   * {@link SelectTriggerProps} です。
   */
  export type Props = SelectTriggerProps;
}

/**
 * {@link SelectTrigger} です。
 */
export const Trigger: IComponent<Trigger.Props> = SelectTrigger;

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
 */
export const SelectValue: IComponent<SelectValueProps> = function SuiSelectValue(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Value {...otherProps} className={cn(className, "sui_select_value")} />;
};

/**
 * {@link SelectValue} に対応する型名前空間です。
 */
export namespace Value {
  /**
   * {@link SelectValueState} です。
   */
  export type State = SelectValueState;

  /**
   * {@link SelectValueProps} です。
   */
  export type Props = SelectValueProps;
}

/**
 * {@link SelectValue} です。
 */
export const Value: IComponent<Value.Props> = SelectValue;

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
 */
export const SelectIcon: IComponent<SelectIconProps> = function SuiSelectIcon(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Icon {...otherProps} className={cn(className, "sui_select_icon")} />;
};

/**
 * {@link SelectIcon} に対応する型名前空間です。
 */
export namespace Icon {
  /**
   * {@link SelectIconState} です。
   */
  export type State = SelectIconState;

  /**
   * {@link SelectIconProps} です。
   */
  export type Props = SelectIconProps;
}

/**
 * {@link SelectIcon} です。
 */
export const Icon: IComponent<Icon.Props> = SelectIcon;

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
 */
export const SelectPortal: IComponent<SelectPortalProps> = function SuiSelectPortal(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Portal {...otherProps} className={cn(className, "sui_select_portal")} />;
};

/**
 * {@link SelectPortal} に対応する型名前空間です。
 */
export namespace Portal {
  /**
   * {@link SelectPortalState} です。
   */
  export type State = SelectPortalState;

  /**
   * {@link SelectPortalProps} です。
   */
  export type Props = SelectPortalProps;
}

/**
 * {@link SelectPortal} です。
 */
export const Portal: IComponent<Portal.Props> = SelectPortal;

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
 */
export const SelectBackdrop: IComponent<SelectBackdropProps> = function SuiSelectBackdrop(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Backdrop {...otherProps} className={cn(className, "sui_select_backdrop")} />;
};

/**
 * {@link SelectBackdrop} に対応する型名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link SelectBackdropState} です。
   */
  export type State = SelectBackdropState;

  /**
   * {@link SelectBackdropProps} です。
   */
  export type Props = SelectBackdropProps;
}

/**
 * {@link SelectBackdrop} です。
 */
export const Backdrop: IComponent<Backdrop.Props> = SelectBackdrop;

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
 */
export const SelectPositioner: IComponent<SelectPositionerProps> = function SuiSelectPositioner(
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
   * {@link SelectPositionerState} です。
   */
  export type State = SelectPositionerState;

  /**
   * {@link SelectPositionerProps} です。
   */
  export type Props = SelectPositionerProps;
}

/**
 * {@link SelectPositioner} です。
 */
export const Positioner: IComponent<Positioner.Props> = SelectPositioner;

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
 */
export const SelectPopup: IComponent<SelectPopupProps> = function SuiSelectPopup(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Popup {...otherProps} className={cn(className, "sui_select_popup")} />;
};

/**
 * {@link SelectPopup} に対応する型名前空間です。
 */
export namespace Popup {
  /**
   * {@link SelectPopupState} です。
   */
  export type State = SelectPopupState;

  /**
   * {@link SelectPopupProps} です。
   */
  export type Props = SelectPopupProps;
}

/**
 * {@link SelectPopup} です。
 */
export const Popup: IComponent<Popup.Props> = SelectPopup;

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
 */
export const SelectList: IComponent<SelectListProps> = function SuiSelectList(props) {
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
   * {@link SelectListState} です。
   */
  export type State = SelectListState;

  /**
   * {@link SelectListProps} です。
   */
  export type Props = SelectListProps;
}

/**
 * {@link SelectList} です。
 */
export const List: IComponent<List.Props> = SelectList;

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
 */
export const SelectArrow: IComponent<SelectArrowProps> = function SuiSelectArrow(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Arrow {...otherProps} className={cn(className, "sui_select_arrow")} />;
};

/**
 * {@link SelectArrow} に対応する型名前空間です。
 */
export namespace Arrow {
  /**
   * {@link SelectArrowState} です。
   */
  export type State = SelectArrowState;

  /**
   * {@link SelectArrowProps} です。
   */
  export type Props = SelectArrowProps;
}

/**
 * {@link SelectArrow} です。
 */
export const Arrow: IComponent<Arrow.Props> = SelectArrow;

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
 */
export const SelectItem: IComponent<SelectItemProps> = function SuiSelectItem(props) {
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
   * {@link SelectItemState} です。
   */
  export type State = SelectItemState;

  /**
   * {@link SelectItemProps} です。
   */
  export type Props = SelectItemProps;
}

/**
 * {@link SelectItem} です。
 */
export const Item: IComponent<Item.Props> = SelectItem;

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
 */
export const SelectItemText: IComponent<SelectItemTextProps> = function SuiSelectItemText(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.ItemText {...otherProps} className={cn(className, "sui_select_item_text")} />;
};

/**
 * {@link SelectItemText} に対応する型名前空間です。
 */
export namespace ItemText {
  /**
   * {@link SelectItemTextState} です。
   */
  export type State = SelectItemTextState;

  /**
   * {@link SelectItemTextProps} です。
   */
  export type Props = SelectItemTextProps;
}

/**
 * {@link SelectItemText} です。
 */
export const ItemText: IComponent<ItemText.Props> = SelectItemText;

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
 */
export const SelectItemIndicator: IComponent<SelectItemIndicatorProps> =
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
   * {@link SelectItemIndicatorState} です。
   */
  export type State = SelectItemIndicatorState;

  /**
   * {@link SelectItemIndicatorProps} です。
   */
  export type Props = SelectItemIndicatorProps;
}

/**
 * {@link SelectItemIndicator} です。
 */
export const ItemIndicator: IComponent<ItemIndicator.Props> = SelectItemIndicator;

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
 */
export const SelectScrollUpArrow: IComponent<SelectScrollUpArrowProps> =
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
   * {@link SelectScrollUpArrowState} です。
   */
  export type State = SelectScrollUpArrowState;

  /**
   * {@link SelectScrollUpArrowProps} です。
   */
  export type Props = SelectScrollUpArrowProps;
}

/**
 * {@link SelectScrollUpArrow} です。
 */
export const ScrollUpArrow: IComponent<ScrollUpArrow.Props> = SelectScrollUpArrow;

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
 */
export const SelectScrollDownArrow: IComponent<SelectScrollDownArrowProps> =
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
   * {@link SelectScrollDownArrowState} です。
   */
  export type State = SelectScrollDownArrowState;

  /**
   * {@link SelectScrollDownArrowProps} です。
   */
  export type Props = SelectScrollDownArrowProps;
}

/**
 * {@link SelectScrollDownArrow} です。
 */
export const ScrollDownArrow: IComponent<ScrollDownArrow.Props> = SelectScrollDownArrow;

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
 */
export const SelectGroup: IComponent<SelectGroupProps> = function SuiSelectGroup(props) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Group {...otherProps} className={cn(className, "sui_select_group")} />;
};

/**
 * {@link SelectGroup} に対応する型名前空間です。
 */
export namespace Group {
  /**
   * {@link SelectGroupState} です。
   */
  export type State = SelectGroupState;

  /**
   * {@link SelectGroupProps} です。
   */
  export type Props = SelectGroupProps;
}

/**
 * {@link SelectGroup} です。
 */
export const Group: IComponent<Group.Props> = SelectGroup;

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
 */
export const SelectGroupLabel: IComponent<SelectGroupLabelProps> = function SuiSelectGroupLabel(
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
   * {@link SelectGroupLabelState} です。
   */
  export type State = SelectGroupLabelState;

  /**
   * {@link SelectGroupLabelProps} です。
   */
  export type Props = SelectGroupLabelProps;
}

/**
 * {@link SelectGroupLabel} です。
 */
export const GroupLabel: IComponent<GroupLabel.Props> = SelectGroupLabel;

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
 */
export const SelectSeparator: IComponent<SelectSeparatorProps> = function SuiSelectSeparator(
  props,
) {
  const { className, ...otherProps } = props;
  return <BaseSelect.Separator {...otherProps} className={cn(className, "sui_select_separator")} />;
};

/**
 * {@link SelectSeparator} に対応する型名前空間です。
 */
export namespace Separator {
  /**
   * {@link SelectSeparatorState} です。
   */
  export type State = SelectSeparatorState;

  /**
   * {@link SelectSeparatorProps} です。
   */
  export type Props = SelectSeparatorProps;
}

/**
 * {@link SelectSeparator} です。
 */
export const Separator: IComponent<Separator.Props> = SelectSeparator;
