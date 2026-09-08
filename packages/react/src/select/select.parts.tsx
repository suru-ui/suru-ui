import { Select as BaseSelect } from "@base-ui/react/select";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { getItemLabel, isLabeledItem } from "../_get-item-label.js";
import { CheckIcon } from "../_icons.jsx";
import toReactNode from "../_to-react-node.js";
import { useActionGroupContext } from "../action-group/action-group.parts.jsx";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import { ScrollArea } from "../scroll-area/index.js";
import type { IComponent, IUseContext } from "../types.js";

import "./select.css";

// Context
// -------

/**
 * 選択欄とリスト項目の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
type SelectContextRadius = "none" | Size | "full";

/**
 * 選択欄とリスト項目のサイズです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
type SelectContextSize = Size;

/**
 * 選択欄の主な外観です。
 *
 * - `"naked"`: 背景のない選択欄
 * - `"liquid"`: 薄い塗りつぶし
 */
type SelectContextVariant = "naked" | "liquid";

/**
 * {@link SelectRoot} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectContext<TValue = any> = {
  /**
   * リストに表示する項目の一覧です。
   */
  readonly items: SelectRootItems<TValue> | undefined;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 選択欄とリスト項目の角丸です。
   */
  readonly radius: SelectContextRadius;

  /**
   * 選択欄とリスト項目のサイズです。
   */
  readonly size: SelectContextSize;

  /**
   * 選択欄の主な外観です。
   */
  readonly variant: SelectContextVariant;
};

/**
 * Select のスタイルと項目を子パーツへ伝播するコンテキストです。
 */
export const SelectContext: React.Context<SelectContext | null> =
  React.createContext<SelectContext | null>(null);

function useSuiSelectContext(optional?: false): SelectContext;
function useSuiSelectContext(optional?: boolean): SelectContext | null;
function useSuiSelectContext(optional?: boolean): SelectContext | null {
  const ctx = React.use(SelectContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SelectContext",
      providerName: "SelectRoot",
    });
  }

  return ctx;
}

/**
 * {@link SelectContext} を読み取るフックです。
 */
export const useSelectContext: IUseContext<SelectContext> = useSuiSelectContext;

export { SelectContext as Context, useSelectContext as useContext };

/**
 * {@link Context} の型名前空間です。
 */
export namespace Context {
  /**
   * {@link SelectContextRadius}
   */
  export type Radius = SelectContextRadius;

  /**
   * {@link SelectContextSize}
   */
  export type Size = SelectContextSize;

  /**
   * {@link SelectContextVariant}
   */
  export type Variant = SelectContextVariant;
}

// Root
// ----

/**
 * 選択欄の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type SelectRootRadius = "none" | Size | "full";

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
 * {@link SelectRoot} のアクションです。
 */
export type SelectRootActions = BaseSelect.Root.Actions;

/**
 * {@link SelectRoot} の値が変更するイベントの詳細です。
 */
export type SelectRootChangeEventDetails = BaseSelect.Root.ChangeEventDetails;

/**
 * {@link SelectRoot} の値が変更する理由です。
 */
export type SelectRootChangeEventReason = BaseSelect.Root.ChangeEventReason;

/**
 * Select のグループ項目です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectRootItemGroup<TValue = unknown> = {
  /**
   * グループに含まれる項目です。
   */
  readonly items: readonly TValue[];

  /**
   * グループの見出しです。
   */
  readonly label?: React.ReactNode | undefined;

  readonly [key: string]: unknown;
};

/**
 * Select の項目一覧です。
 *
 * - `Record<string, React.ReactNode>`: 値と表示内容を対応付けたオブジェクト
 * - `readonly (TValue | { label: React.ReactNode; value: TValue })[]`: 平坦な項目の配列
 * - `readonly SelectRootItemGroup<TValue>[]`: グループ化した項目の配列
 *
 * @template TValue 項目の値の型です。
 */
export type SelectRootItems<TValue = unknown> =
  | Record<string, React.ReactNode>
  | readonly (TValue | { readonly label: React.ReactNode; readonly value: TValue })[]
  | readonly SelectRootItemGroup<TValue>[];

/**
 * {@link SelectRoot} が持つ状態です。
 */
export type SelectRootState = BaseSelect.Root.State;

/**
 * {@link SelectRoot} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export type SelectRootProps<TValue = unknown, TMultiple extends boolean | undefined = false> = Omit<
  BaseSelect.Root.Props<TValue, TMultiple>,
  "items"
> & {
  /**
   * リストに表示する項目の一覧です。
   *
   * グループの配列を指定するとグループごとに区切って表示します。
   * 平坦な値の配列を指定した場合は {@link List} が既定の描画で表示します。
   */
  items?: SelectRootItems<TValue> | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * 既定値は {@link SelectRootProps.variant|variant} です。
   */
  outlined?: boolean | undefined;

  /**
   * 選択欄とリスト項目の角丸を指定します。
   *
   * 既定値は {@link SelectRootProps.size|size} です。
   */
  radius?: SelectRootRadius | undefined;

  /**
   * 選択欄とリスト項目のサイズを指定します。
   *
   * @default "md"
   */
  size?: SelectRootSize | undefined;

  /**
   * 選択欄の主な外観を指定します。
   *
   * @default "naked"
   */
  variant?: SelectRootVariant | undefined;
};

interface ISelectRoot extends IComponent<SelectRootProps<unknown, boolean | undefined>> {
  /**
   * @template TValue 項目の値の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   */
  <TValue, TMultiple extends boolean | undefined = false>(
    props: SelectRootProps<TValue, TMultiple>,
  ): IComponent.Return;
}

/**
 * 選択状態とポップアップの開閉状態を管理する Select のルートです。
 *
 * それ自身は HTML 要素をレンダリングせず、スタイルと項目を子パーツへ伝播します。
 */
export const SelectRoot: ISelectRoot = function SuiSelectRoot<
  TValue,
  TMultiple extends boolean | undefined = false,
>(props: SelectRootProps<TValue, TMultiple>) {
  const {
    size = "md",
    items,
    radius = size,
    variant = "naked",
    outlined = variant === "naked",
    ...otherProps
  } = props;
  const ctx = React.useMemo<SelectContext>(
    () => ({
      items,
      outlined,
      radius,
      size,
      variant,
    }),
    [items, outlined, radius, size, variant],
  );

  return (
    <SelectContext value={ctx}>
      <BaseSelect.Root {...otherProps} items={getBaseItems(items)} />
    </SelectContext>
  );
};

type BaseSelectItems = NonNullable<BaseSelect.Root.Props<unknown>["items"]>;

function getBaseItems<TValue>(
  items: SelectRootItems<TValue> | undefined,
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

export { SelectRoot as Root };

/**
 * {@link SelectRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link SelectRootState}
   */
  export type State = SelectRootState;

  /**
   * {@link SelectRootProps}
   */
  export type Props<
    TValue = unknown,
    TMultiple extends boolean | undefined = false,
  > = SelectRootProps<TValue, TMultiple>;

  /**
   * {@link SelectRootActions}
   */
  export type Actions = SelectRootActions;

  /**
   * {@link SelectRootChangeEventDetails}
   */
  export type ChangeEventDetails = SelectRootChangeEventDetails;

  /**
   * {@link SelectRootChangeEventReason}
   */
  export type ChangeEventReason = SelectRootChangeEventReason;

  /**
   * {@link SelectRootItemGroup}
   */
  export type ItemGroup<TValue = unknown> = SelectRootItemGroup<TValue>;

  /**
   * {@link SelectRootItems}
   */
  export type Items<TValue = unknown> = SelectRootItems<TValue>;

  /**
   * {@link SelectRootRadius}
   */
  export type Radius = SelectRootRadius;

  /**
   * {@link SelectRootSize}
   */
  export type Size = SelectRootSize;

  /**
   * {@link SelectRootVariant}
   */
  export type Variant = SelectRootVariant;
}

// Label
// -----

/**
 * {@link SelectLabel} が持つ状態です。
 */
export type SelectLabelState = BaseSelect.Label.State;

/**
 * {@link SelectLabel} に渡す props です。
 */
export type SelectLabelProps = React.ComponentProps<typeof BaseSelect.Label>;

/**
 * 選択欄に対応する表示ラベルです。
 */
export const SelectLabel: IComponent<SelectLabelProps> = function SuiSelectLabel(props) {
  const { className, ...otherProps } = props;

  return <BaseSelect.Label {...otherProps} className={cn(className, "sui_select_label")} />;
};

export { SelectLabel as Label };

/**
 * {@link SelectLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Label {
  /**
   * {@link SelectLabelState}
   */
  export type State = SelectLabelState;

  /**
   * {@link SelectLabelProps}
   */
  export type Props = SelectLabelProps;
}

// Trigger
// -------

/**
 * {@link SelectTrigger} が持つ状態です。
 */
export type SelectTriggerState = BaseSelect.Trigger.State;

/**
 * {@link SelectTrigger} に渡す props です。
 */
export type SelectTriggerProps = React.ComponentProps<typeof BaseSelect.Trigger>;

/**
 * Select ポップアップを開閉するボタン要素です。
 *
 * Root のスタイルプロパティーがこの要素へ適用されます。
 * キーボードでは `Enter` や `Space`、`ArrowDown` で開きます。
 */
export const SelectTrigger: IComponent<SelectTriggerProps> = function SuiSelectTrigger(props) {
  const actionGroup = useActionGroupContext(true);
  const ctx = useSelectContext(true);
  const {
    // @ts-expect-error
    "data-scope": dataScope = "",
    className,
    ...otherProps
  } = props;
  const size = actionGroup?.size ?? ctx?.size ?? "md";
  const radius = actionGroup?.radius ?? ctx?.radius ?? "md";
  const variant = actionGroup?.variant ?? ctx?.variant ?? "naked";
  const outlined = actionGroup?.outlined ?? ctx?.outlined ?? variant === "naked";

  return (
    <BaseSelect.Trigger
      {...otherProps}
      className={cn(
        className,
        "sui_select",
        "sui_action_group_item",
        `sui_select-size_${size}`,
        `sui_select-radius_${radius}`,
        `sui_select-variant_${variant}`,
        outlined && "sui_select-outlined",
        (state) => state.disabled && "sui_select-disabled",
        (state) => state.valid === false && "sui_select-invalid",
        (state) => state.open && "sui_select-open",
      )}
      data-scope={dataScope}
    />
  );
};

export { SelectTrigger as Trigger };

/**
 * {@link SelectTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link SelectTriggerState}
   */
  export type State = SelectTriggerState;

  /**
   * {@link SelectTriggerProps}
   */
  export type Props = SelectTriggerProps;
}

// Value
// -----

/**
 * {@link SelectValue} が持つ状態です。
 */
export type SelectValueState = BaseSelect.Value.State;

/**
 * {@link SelectValue} に渡す props です。
 */
export type SelectValueProps = React.ComponentProps<typeof BaseSelect.Value>;

/**
 * 現在の選択値またはプレースホルダーを表示する要素です。
 */
export const SelectValue: IComponent<SelectValueProps> = function SuiSelectValue(props) {
  const { className, ...otherProps } = props;

  return (
    <BaseSelect.Value
      {...otherProps}
      className={cn(
        className,
        "sui_select_value",
        (state) => state.placeholder && "sui_select_value-placeholder",
      )}
    />
  );
};

export { SelectValue as Value };

/**
 * {@link SelectValue} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Value {
  /**
   * {@link SelectValueState}
   */
  export type State = SelectValueState;

  /**
   * {@link SelectValueProps}
   */
  export type Props = SelectValueProps;
}

// Icon
// ----

/**
 * {@link SelectIcon} が持つ状態です。
 */
export type SelectIconState = BaseSelect.Icon.State;

/**
 * {@link SelectIcon} に渡す props です。
 */
export type SelectIconProps = React.ComponentProps<typeof BaseSelect.Icon>;

/**
 * ポップアップの開閉を示すアイコンのラッパー要素です。
 */
export const SelectIcon: IComponent<SelectIconProps> = function SuiSelectIcon(props) {
  const { className, ...otherProps } = props;

  return <BaseSelect.Icon {...otherProps} className={cn(className, "sui_select_icon")} />;
};

export { SelectIcon as Icon };

/**
 * {@link SelectIcon} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Icon {
  /**
   * {@link SelectIconState}
   */
  export type State = SelectIconState;

  /**
   * {@link SelectIconProps}
   */
  export type Props = SelectIconProps;
}

// Portal
// ------

/**
 * {@link SelectPortal} が持つ状態です。
 */
export type SelectPortalState = BaseSelect.Portal.State;

/**
 * {@link SelectPortal} に渡す props です。
 */
export type SelectPortalProps = React.ComponentProps<typeof BaseSelect.Portal>;

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const SelectPortal: IComponent<SelectPortalProps> = function SuiSelectPortal(props) {
  const ctx = useSelectContext();
  const {
    // @ts-expect-error
    "data-scope": dataScope = "",
    className,
    ...otherProps
  } = props;

  return (
    <BaseSelect.Portal
      {...otherProps}
      className={cn(
        className,
        "sui_select_portal",
        `sui_select_portal-size_${ctx.size}`,
        `sui_select_portal-radius_${ctx.radius}`,
        ctx.outlined && "sui_select_portal-outlined",
      )}
      data-scope={dataScope}
    />
  );
};

export { SelectPortal as Portal };

/**
 * {@link SelectPortal} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  /**
   * {@link SelectPortalState}
   */
  export type State = SelectPortalState;

  /**
   * {@link SelectPortalProps}
   */
  export type Props = SelectPortalProps;
}

// Backdrop
// --------

/**
 * {@link SelectBackdrop} が持つ状態です。
 */
export type SelectBackdropState = BaseSelect.Backdrop.State;

/**
 * {@link SelectBackdrop} に渡す props です。
 */
export type SelectBackdropProps = React.ComponentProps<typeof BaseSelect.Backdrop>;

/**
 * ポップアップの背後に表示される要素です。
 */
export const SelectBackdrop: IComponent<SelectBackdropProps> = function SuiSelectBackdrop(props) {
  const { className, ...otherProps } = props;

  return (
    <BaseSelect.Backdrop
      {...otherProps}
      className={cn(
        className,
        "sui_select_backdrop",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_select_backdrop-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { SelectBackdrop as Backdrop };

/**
 * {@link SelectBackdrop} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link SelectBackdropState}
   */
  export type State = SelectBackdropState;

  /**
   * {@link SelectBackdropProps}
   */
  export type Props = SelectBackdropProps;
}

// Positioner
// ----------

/**
 * {@link SelectPositioner} が持つ状態です。
 */
export type SelectPositionerState = BaseSelect.Positioner.State;

/**
 * {@link SelectPositioner} に渡す props です。
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

export { SelectPositioner as Positioner };

/**
 * {@link SelectPositioner} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Positioner {
  /**
   * {@link SelectPositionerState}
   */
  export type State = SelectPositionerState;

  /**
   * {@link SelectPositionerProps}
   */
  export type Props = SelectPositionerProps;
}

// Popup
// -----

/**
 * {@link SelectPopup} が持つ状態です。
 */
export type SelectPopupState = BaseSelect.Popup.State;

/**
 * {@link SelectPopup} に渡す props です。
 */
export type SelectPopupProps = React.ComponentProps<typeof BaseSelect.Popup>;

/**
 * 選択項目を表示するポップアップ要素です。
 */
export const SelectPopup: IComponent<SelectPopupProps> = function SuiSelectPopup(props) {
  const { className, ...otherProps } = props;

  return (
    <BaseSelect.Popup
      {...otherProps}
      className={cn(
        className,
        "sui_select_popup",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_select_popup-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { SelectPopup as Popup };

/**
 * {@link SelectPopup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Popup {
  /**
   * {@link SelectPopupState}
   */
  export type State = SelectPopupState;

  /**
   * {@link SelectPopupProps}
   */
  export type Props = SelectPopupProps;
}

// List
// ----

/**
 * リストの各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TValue 項目の値の型です。
 */
export interface ISelectListItemRenderer<TValue = any> {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   * @returns レンダリングする内容です。
   */
  (item: TValue, index: number, items: readonly TValue[]): React.ReactNode;
}

/**
 * {@link SelectList} が持つ状態です。
 */
export type SelectListState = BaseSelect.List.State;

/**
 * {@link SelectList} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectListProps<TValue = any> = Omit<
  React.ComponentProps<typeof BaseSelect.List>,
  "children"
> & {
  /**
   * リストの内容、または各項目をレンダリングする関数です。
   *
   * 関数を指定した場合は {@link SelectRootProps.items|items} の各項目が引数として渡されます。
   */
  children?: React.ReactNode | ISelectListItemRenderer<TValue>;
};

/**
 * 選択項目を列挙するリスト要素です。
 *
 * {@link SelectRoot} の `items` を読み取り、関数子を受け取った場合は各項目に適用します。
 */
export const SelectList: IComponent<SelectListProps> = function SuiSelectList(props) {
  const ctx = useSelectContext(true);
  const { children = defaultListItemRenderer, className, ...otherProps } = props;
  const items = ctx?.items;

  return (
    <ScrollArea className="sui_select_scroll_area">
      <BaseSelect.List {...otherProps} className={cn(className, "sui_select_list")}>
        {typeof children === "function"
          ? items !== undefined
            ? renderListItems(items, children)
            : null
          : children}
      </BaseSelect.List>
    </ScrollArea>
  );
};

function renderListItems<TValue>(
  items: SelectRootItems<TValue>,
  renderItem: ISelectListItemRenderer<TValue>,
): React.ReactNode {
  if (!Array.isArray(items)) {
    const entries = Object.entries(items);

    if (renderItem === (defaultListItemRenderer as ISelectListItemRenderer<TValue>)) {
      return entries.map(([value, label], index) => (
        <SelectItem key={index} value={value as TValue}>
          <SelectItemIndicator>
            <CheckIcon />
          </SelectItemIndicator>
          <SelectItemText>{toReactNode(label, value)}</SelectItemText>
        </SelectItem>
      ));
    }

    const values = entries.map(([value]) => value as TValue);

    return values.map((value, index) => renderItem(value, index, values));
  }

  return items.map((entry, index, all) => renderItem(entry as TValue, index, all as TValue[]));
}

const defaultListItemRenderer: ISelectListItemRenderer = (item, index, items) => {
  if (isListGroup(item)) {
    const { items: groupItems, label } = item;
    const labelNode = toReactNode(label);

    return (
      <React.Fragment key={index}>
        <SelectGroup>
          {labelNode === null ? null : <SelectGroupLabel>{labelNode}</SelectGroupLabel>}
          {groupItems.map((groupItem: unknown, groupIndex: number) =>
            defaultListItemRenderer(groupItem, groupIndex, groupItems as unknown[]),
          )}
        </SelectGroup>
        {index < items.length - 1 && <SelectSeparator />}
      </React.Fragment>
    );
  }

  if (!isListItemValue(item)) {
    return toReactNode(item);
  }

  if (isLabeledItem(item)) {
    return (
      <SelectItem key={index} value={item.value}>
        <SelectItemIndicator>
          <CheckIcon />
        </SelectItemIndicator>
        <SelectItemText>{toReactNode(item.label, getItemLabel(item))}</SelectItemText>
      </SelectItem>
    );
  }

  return (
    <SelectItem key={index} value={item}>
      <SelectItemIndicator>
        <CheckIcon />
      </SelectItemIndicator>
      <SelectItemText>{toReactNode(getItemLabel(item))}</SelectItemText>
    </SelectItem>
  );
};

function isListGroup(item: unknown): item is SelectRootItemGroup<unknown> {
  return typeof item === "object" && item !== null && "items" in item && Array.isArray(item.items);
}

function isListItemValue(item: unknown): boolean {
  if (item === null || item === undefined) {
    return false;
  }

  if (typeof item === "object" && "items" in item) {
    return false;
  }

  return true;
}

export { SelectList as List };

/**
 * {@link SelectList} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace List {
  /**
   * {@link SelectListState}
   */
  export type State = SelectListState;

  /**
   * {@link SelectListProps}
   */
  export type Props<TValue = any> = SelectListProps<TValue>;

  /**
   * {@link SelectRootItemGroup}
   */
  export type ItemGroup<TValue = unknown> = SelectRootItemGroup<TValue>;

  /**
   * {@link ISelectListItemRenderer}
   */
  export interface IItemRenderer<TValue = any> extends ISelectListItemRenderer<TValue> {}
}

// Arrow
// -----

/**
 * {@link SelectArrow} が持つ状態です。
 */
export type SelectArrowState = BaseSelect.Arrow.State;

/**
 * {@link SelectArrow} に渡す props です。
 */
export type SelectArrowProps = React.ComponentProps<typeof BaseSelect.Arrow>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const SelectArrow: IComponent<SelectArrowProps> = function SuiSelectArrow(props) {
  const { className, ...otherProps } = props;

  return <BaseSelect.Arrow {...otherProps} className={cn(className, "sui_select_arrow")} />;
};

export { SelectArrow as Arrow };

/**
 * {@link SelectArrow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Arrow {
  /**
   * {@link SelectArrowState}
   */
  export type State = SelectArrowState;

  /**
   * {@link SelectArrowProps}
   */
  export type Props = SelectArrowProps;
}

// Item
// ----

/**
 * {@link SelectItem} が持つ状態です。
 */
export type SelectItemState = BaseSelect.Item.State;

/**
 * {@link SelectItem} に渡す props です。
 */
export type SelectItemProps = React.ComponentProps<typeof BaseSelect.Item>;

/**
 * 選択肢の個々の項目です。
 *
 * `highlighted` はキーボードやポインターによる注目を表し、`selected` は選択状態を表します。
 */
export const SelectItem: IComponent<SelectItemProps> = function SuiSelectItem(props) {
  const ctx = useSelectContext(true);
  const { className, ...otherProps } = props;
  const size = ctx?.size ?? "md";

  return (
    <BaseSelect.Item
      {...otherProps}
      className={cn(
        className,
        "sui_select_item",
        `sui_select_item-size_${size}`,
        (state) => state.disabled && "sui_select_item-disabled",
        (state) => state.highlighted && "sui_select_item-highlighted",
        (state) => state.selected && "sui_select_item-selected",
      )}
    />
  );
};

export { SelectItem as Item };

/**
 * {@link SelectItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link SelectItemState}
   */
  export type State = SelectItemState;

  /**
   * {@link SelectItemProps}
   */
  export type Props = SelectItemProps;
}

// ItemText
// --------

/**
 * {@link SelectItemText} が持つ状態です。
 */
export type SelectItemTextState = BaseSelect.ItemText.State;

/**
 * {@link SelectItemText} に渡す props です。
 */
export type SelectItemTextProps = React.ComponentProps<typeof BaseSelect.ItemText>;

/**
 * 選択肢の表示テキストを包む要素です。
 */
export const SelectItemText: IComponent<SelectItemTextProps> = function SuiSelectItemText(props) {
  const { className, ...otherProps } = props;

  return <BaseSelect.ItemText {...otherProps} className={cn(className, "sui_select_item_text")} />;
};

export { SelectItemText as ItemText };

/**
 * {@link SelectItemText} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ItemText {
  /**
   * {@link SelectItemTextState}
   */
  export type State = SelectItemTextState;

  /**
   * {@link SelectItemTextProps}
   */
  export type Props = SelectItemTextProps;
}

// ItemIndicator
// -------------

/**
 * {@link SelectItemIndicator} が持つ状態です。
 */
export type SelectItemIndicatorState = BaseSelect.ItemIndicator.State;

/**
 * {@link SelectItemIndicator} に渡す props です。
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
        className={cn(className, "sui_select_item_indicator")}
        keepMounted={keepMounted}
      />
    );
  };

export { SelectItemIndicator as ItemIndicator };

/**
 * {@link SelectItemIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ItemIndicator {
  /**
   * {@link SelectItemIndicatorState}
   */
  export type State = SelectItemIndicatorState;

  /**
   * {@link SelectItemIndicatorProps}
   */
  export type Props = SelectItemIndicatorProps;
}

// ScrollUpArrow
// -------------

/**
 * {@link SelectScrollUpArrow} が持つ状態です。
 */
export type SelectScrollUpArrowState = BaseSelect.ScrollUpArrow.State;

/**
 * {@link SelectScrollUpArrow} に渡す props です。
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

export { SelectScrollUpArrow as ScrollUpArrow };

/**
 * {@link SelectScrollUpArrow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ScrollUpArrow {
  /**
   * {@link SelectScrollUpArrowState}
   */
  export type State = SelectScrollUpArrowState;

  /**
   * {@link SelectScrollUpArrowProps}
   */
  export type Props = SelectScrollUpArrowProps;
}

// ScrollDownArrow
// ---------------

/**
 * {@link SelectScrollDownArrow} が持つ状態です。
 */
export type SelectScrollDownArrowState = BaseSelect.ScrollDownArrow.State;

/**
 * {@link SelectScrollDownArrow} に渡す props です。
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

export { SelectScrollDownArrow as ScrollDownArrow };

/**
 * {@link SelectScrollDownArrow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ScrollDownArrow {
  /**
   * {@link SelectScrollDownArrowState}
   */
  export type State = SelectScrollDownArrowState;

  /**
   * {@link SelectScrollDownArrowProps}
   */
  export type Props = SelectScrollDownArrowProps;
}

// Group
// -----

/**
 * {@link SelectGroup} が持つ状態です。
 */
export type SelectGroupState = BaseSelect.Group.State;

/**
 * {@link SelectGroup} に渡す props です。
 */
export type SelectGroupProps = React.ComponentProps<typeof BaseSelect.Group>;

/**
 * 関連する選択肢をまとめるグループ要素です。
 */
export const SelectGroup: IComponent<SelectGroupProps> = function SuiSelectGroup(props) {
  const { className, ...otherProps } = props;

  return <BaseSelect.Group {...otherProps} className={cn(className, "sui_select_group")} />;
};

export { SelectGroup as Group };

/**
 * {@link SelectGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Group {
  /**
   * {@link SelectGroupState}
   */
  export type State = SelectGroupState;

  /**
   * {@link SelectGroupProps}
   */
  export type Props = SelectGroupProps;
}

// GroupLabel
// ----------

/**
 * {@link SelectGroupLabel} が持つ状態です。
 */
export type SelectGroupLabelState = BaseSelect.GroupLabel.State;

/**
 * {@link SelectGroupLabel} に渡す props です。
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

export { SelectGroupLabel as GroupLabel };

/**
 * {@link SelectGroupLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace GroupLabel {
  /**
   * {@link SelectGroupLabelState}
   */
  export type State = SelectGroupLabelState;

  /**
   * {@link SelectGroupLabelProps}
   */
  export type Props = SelectGroupLabelProps;
}

// Separator
// ---------

/**
 * {@link SelectSeparator} が持つ状態です。
 */
export type SelectSeparatorState = BaseSelect.Separator.State;

/**
 * {@link SelectSeparator} に渡す props です。
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

export { SelectSeparator as Separator };

/**
 * {@link SelectSeparator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Separator {
  /**
   * {@link SelectSeparatorState}
   */
  export type State = SelectSeparatorState;

  /**
   * {@link SelectSeparatorProps}
   */
  export type Props = SelectSeparatorProps;
}
