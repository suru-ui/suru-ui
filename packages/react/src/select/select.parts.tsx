import { Select as BaseSelect } from "@base-ui/react/select";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { getItemLabel, isLabeledItem } from "../_get-item-label.js";
import { CheckIcon } from "../_icons.jsx";
import toReactNode from "../_to-react-node.js";
import type { RenderProps } from "../_use-render.js";
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
  export type Radius = SelectContextRadius;

  export type Size = SelectContextSize;

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

export namespace SelectRootProps {
  export type Render = RenderProps<SelectRootState>;

  export type SuruUI<TValue = unknown> = {
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

  export type BaseUI<TValue = unknown, TMultiple extends boolean | undefined = false> = Omit<
    BaseSelect.Root.Props<TValue, TMultiple>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;
}

/**
 * {@link SelectRoot} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export type SelectRootProps<
  TValue = unknown,
  TMultiple extends boolean | undefined = false,
> = SelectRootProps.Render &
  SelectRootProps.SuruUI<TValue> &
  SelectRootProps.BaseUI<TValue, TMultiple> &
  SelectRootProps.HTML;

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
      size,
      items,
      radius,
      variant,
      outlined,
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
type BaseSelectItem = Extract<BaseSelectItems, readonly unknown[]>[number];

function getBaseItems<TValue>(
  items: SelectRootItems<TValue> | undefined,
): BaseSelectItems | undefined {
  if (!Array.isArray(items)) {
    return items;
  }

  if (items.length === 0) {
    return [];
  }

  return items.map((item) => {
    if (typeof item === "object" && item !== null) {
      if ("items" in item && Array.isArray((item as { items: unknown }).items)) {
        return item as BaseSelectItem;
      }

      if ("label" in item && "value" in item) {
        return item as BaseSelectItem;
      }
    }

    return { label: item as React.ReactNode, value: item } as BaseSelectItem;
  }) as BaseSelectItems;
}

export { SelectRoot as Root };

/**
 * {@link SelectRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  export type State = SelectRootState;

  export type Props<
    TValue = unknown,
    TMultiple extends boolean | undefined = false,
  > = Props.Render & Props.SuruUI<TValue> & Props.BaseUI<TValue, TMultiple> & Props.HTML;

  export namespace Props {
    export type Render = SelectRootProps.Render;

    export type SuruUI<TValue = unknown> = SelectRootProps.SuruUI<TValue>;

    export type BaseUI<
      TValue = unknown,
      TMultiple extends boolean | undefined = false,
    > = SelectRootProps.BaseUI<TValue, TMultiple>;

    export type HTML = SelectRootProps.HTML;
  }

  export type Actions = SelectRootActions;

  export type ChangeEventDetails = SelectRootChangeEventDetails;

  export type ChangeEventReason = SelectRootChangeEventReason;

  export type ItemGroup<TValue = unknown> = SelectRootItemGroup<TValue>;

  export type Items<TValue = unknown> = SelectRootItems<TValue>;

  export type Radius = SelectRootRadius;

  export type Size = SelectRootSize;

  export type Variant = SelectRootVariant;
}

// Label
// -----

/**
 * {@link SelectLabel} が持つ状態です。
 */
export type SelectLabelState = BaseSelect.Label.State;

export namespace SelectLabelProps {
  export type Render = RenderProps<SelectLabelState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.Label>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.Label>
  >;
}

/**
 * {@link SelectLabel} に渡す props です。
 */
export type SelectLabelProps = SelectLabelProps.Render &
  SelectLabelProps.SuruUI &
  SelectLabelProps.BaseUI &
  SelectLabelProps.HTML;

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
  export type State = SelectLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectLabelProps.Render;

    export type SuruUI = SelectLabelProps.SuruUI;

    export type BaseUI = SelectLabelProps.BaseUI;

    export type HTML = SelectLabelProps.HTML;
  }
}

// Trigger
// -------

/**
 * {@link SelectTrigger} が持つ状態です。
 */
export type SelectTriggerState = BaseSelect.Trigger.State;

export namespace SelectTriggerProps {
  export type Render = RenderProps<SelectTriggerState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.Trigger>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"button">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.Trigger>
  >;
}

/**
 * {@link SelectTrigger} に渡す props です。
 */
export type SelectTriggerProps = SelectTriggerProps.Render &
  SelectTriggerProps.SuruUI &
  SelectTriggerProps.BaseUI &
  SelectTriggerProps.HTML;

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
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
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
  export type State = SelectTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectTriggerProps.Render;

    export type SuruUI = SelectTriggerProps.SuruUI;

    export type BaseUI = SelectTriggerProps.BaseUI;

    export type HTML = SelectTriggerProps.HTML;
  }
}

// Value
// -----

/**
 * {@link SelectValue} が持つ状態です。
 */
export type SelectValueState = BaseSelect.Value.State;

export namespace SelectValueProps {
  export type Render = RenderProps<SelectValueState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.Value>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"span">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.Value>
  >;
}

/**
 * {@link SelectValue} に渡す props です。
 */
export type SelectValueProps = SelectValueProps.Render &
  SelectValueProps.SuruUI &
  SelectValueProps.BaseUI &
  SelectValueProps.HTML;

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
  export type State = SelectValueState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectValueProps.Render;

    export type SuruUI = SelectValueProps.SuruUI;

    export type BaseUI = SelectValueProps.BaseUI;

    export type HTML = SelectValueProps.HTML;
  }
}

// Icon
// ----

/**
 * {@link SelectIcon} が持つ状態です。
 */
export type SelectIconState = BaseSelect.Icon.State;

export namespace SelectIconProps {
  export type Render = RenderProps<SelectIconState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.Icon>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"span">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.Icon>
  >;
}

/**
 * {@link SelectIcon} に渡す props です。
 */
export type SelectIconProps = SelectIconProps.Render &
  SelectIconProps.SuruUI &
  SelectIconProps.BaseUI &
  SelectIconProps.HTML;

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
  export type State = SelectIconState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectIconProps.Render;

    export type SuruUI = SelectIconProps.SuruUI;

    export type BaseUI = SelectIconProps.BaseUI;

    export type HTML = SelectIconProps.HTML;
  }
}

// Portal
// ------

/**
 * {@link SelectPortal} が持つ状態です。
 */
export type SelectPortalState = BaseSelect.Portal.State;

export namespace SelectPortalProps {
  export type Render = RenderProps<SelectPortalState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.Portal>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.Portal>
  >;
}

/**
 * {@link SelectPortal} に渡す props です。
 */
export type SelectPortalProps = SelectPortalProps.Render &
  SelectPortalProps.SuruUI &
  SelectPortalProps.BaseUI &
  SelectPortalProps.HTML;

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const SelectPortal: IComponent<SelectPortalProps> = function SuiSelectPortal(props) {
  const ctx = useSelectContext();
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
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
  export type State = SelectPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectPortalProps.Render;

    export type SuruUI = SelectPortalProps.SuruUI;

    export type BaseUI = SelectPortalProps.BaseUI;

    export type HTML = SelectPortalProps.HTML;
  }
}

// Backdrop
// --------

/**
 * {@link SelectBackdrop} が持つ状態です。
 */
export type SelectBackdropState = BaseSelect.Backdrop.State;

export namespace SelectBackdropProps {
  export type Render = RenderProps<SelectBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.Backdrop>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.Backdrop>
  >;
}

/**
 * {@link SelectBackdrop} に渡す props です。
 */
export type SelectBackdropProps = SelectBackdropProps.Render &
  SelectBackdropProps.SuruUI &
  SelectBackdropProps.BaseUI &
  SelectBackdropProps.HTML;

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
  export type State = SelectBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectBackdropProps.Render;

    export type SuruUI = SelectBackdropProps.SuruUI;

    export type BaseUI = SelectBackdropProps.BaseUI;

    export type HTML = SelectBackdropProps.HTML;
  }
}

// Positioner
// ----------

/**
 * {@link SelectPositioner} が持つ状態です。
 */
export type SelectPositionerState = BaseSelect.Positioner.State;

export namespace SelectPositionerProps {
  export type Render = RenderProps<SelectPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.Positioner>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.Positioner>
  >;
}

/**
 * {@link SelectPositioner} に渡す props です。
 */
export type SelectPositionerProps = SelectPositionerProps.Render &
  SelectPositionerProps.SuruUI &
  SelectPositionerProps.BaseUI &
  SelectPositionerProps.HTML;

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
  export type State = SelectPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectPositionerProps.Render;

    export type SuruUI = SelectPositionerProps.SuruUI;

    export type BaseUI = SelectPositionerProps.BaseUI;

    export type HTML = SelectPositionerProps.HTML;
  }
}

// Popup
// -----

/**
 * {@link SelectPopup} が持つ状態です。
 */
export type SelectPopupState = BaseSelect.Popup.State;

export namespace SelectPopupProps {
  export type Render = RenderProps<SelectPopupState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.Popup>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.Popup>
  >;
}

/**
 * {@link SelectPopup} に渡す props です。
 */
export type SelectPopupProps = SelectPopupProps.Render &
  SelectPopupProps.SuruUI &
  SelectPopupProps.BaseUI &
  SelectPopupProps.HTML;

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
  export type State = SelectPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectPopupProps.Render;

    export type SuruUI = SelectPopupProps.SuruUI;

    export type BaseUI = SelectPopupProps.BaseUI;

    export type HTML = SelectPopupProps.HTML;
  }
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

export namespace SelectListProps {
  export type Render = RenderProps<SelectListState>;

  export type SuruUI<TValue = any> = {
    /**
     * リストの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link SelectRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | ISelectListItemRenderer<TValue>;
  };

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.List>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.List>
  >;
}

/**
 * {@link SelectList} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectListProps<TValue = any> = SelectListProps.Render &
  SelectListProps.SuruUI<TValue> &
  SelectListProps.BaseUI &
  SelectListProps.HTML;

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
  export type State = SelectListState;

  export type Props<TValue = any> = Props.Render & Props.SuruUI<TValue> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectListProps.Render;

    export type SuruUI<TValue = any> = SelectListProps.SuruUI<TValue>;

    export type BaseUI = SelectListProps.BaseUI;

    export type HTML = SelectListProps.HTML;
  }

  export type ItemGroup<TValue = unknown> = SelectRootItemGroup<TValue>;

  export interface IItemRenderer<TValue = any> extends ISelectListItemRenderer<TValue> {}
}

// Arrow
// -----

/**
 * {@link SelectArrow} が持つ状態です。
 */
export type SelectArrowState = BaseSelect.Arrow.State;

export namespace SelectArrowProps {
  export type Render = RenderProps<SelectArrowState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.Arrow>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.Arrow>
  >;
}

/**
 * {@link SelectArrow} に渡す props です。
 */
export type SelectArrowProps = SelectArrowProps.Render &
  SelectArrowProps.SuruUI &
  SelectArrowProps.BaseUI &
  SelectArrowProps.HTML;

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
  export type State = SelectArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectArrowProps.Render;

    export type SuruUI = SelectArrowProps.SuruUI;

    export type BaseUI = SelectArrowProps.BaseUI;

    export type HTML = SelectArrowProps.HTML;
  }
}

// Item
// ----

/**
 * {@link SelectItem} が持つ状態です。
 */
export type SelectItemState = BaseSelect.Item.State;

export namespace SelectItemProps {
  export type Render = RenderProps<SelectItemState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.Item>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.Item>
  >;
}

/**
 * {@link SelectItem} に渡す props です。
 */
export type SelectItemProps = SelectItemProps.Render &
  SelectItemProps.SuruUI &
  SelectItemProps.BaseUI &
  SelectItemProps.HTML;

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
  export type State = SelectItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectItemProps.Render;

    export type SuruUI = SelectItemProps.SuruUI;

    export type BaseUI = SelectItemProps.BaseUI;

    export type HTML = SelectItemProps.HTML;
  }
}

// ItemText
// --------

/**
 * {@link SelectItemText} が持つ状態です。
 */
export type SelectItemTextState = BaseSelect.ItemText.State;

export namespace SelectItemTextProps {
  export type Render = RenderProps<SelectItemTextState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.ItemText>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.ItemText>
  >;
}

/**
 * {@link SelectItemText} に渡す props です。
 */
export type SelectItemTextProps = SelectItemTextProps.Render &
  SelectItemTextProps.SuruUI &
  SelectItemTextProps.BaseUI &
  SelectItemTextProps.HTML;

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
  export type State = SelectItemTextState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectItemTextProps.Render;

    export type SuruUI = SelectItemTextProps.SuruUI;

    export type BaseUI = SelectItemTextProps.BaseUI;

    export type HTML = SelectItemTextProps.HTML;
  }
}

// ItemIndicator
// -------------

/**
 * {@link SelectItemIndicator} が持つ状態です。
 */
export type SelectItemIndicatorState = BaseSelect.ItemIndicator.State;

export namespace SelectItemIndicatorProps {
  export type Render = RenderProps<SelectItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.ItemIndicator>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"span">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.ItemIndicator>
  >;
}

/**
 * {@link SelectItemIndicator} に渡す props です。
 */
export type SelectItemIndicatorProps = SelectItemIndicatorProps.Render &
  SelectItemIndicatorProps.SuruUI &
  SelectItemIndicatorProps.BaseUI &
  SelectItemIndicatorProps.HTML;

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
  export type State = SelectItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectItemIndicatorProps.Render;

    export type SuruUI = SelectItemIndicatorProps.SuruUI;

    export type BaseUI = SelectItemIndicatorProps.BaseUI;

    export type HTML = SelectItemIndicatorProps.HTML;
  }
}

// ScrollUpArrow
// -------------

/**
 * {@link SelectScrollUpArrow} が持つ状態です。
 */
export type SelectScrollUpArrowState = BaseSelect.ScrollUpArrow.State;

export namespace SelectScrollUpArrowProps {
  export type Render = RenderProps<SelectScrollUpArrowState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.ScrollUpArrow>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.ScrollUpArrow>
  >;
}

/**
 * {@link SelectScrollUpArrow} に渡す props です。
 */
export type SelectScrollUpArrowProps = SelectScrollUpArrowProps.Render &
  SelectScrollUpArrowProps.SuruUI &
  SelectScrollUpArrowProps.BaseUI &
  SelectScrollUpArrowProps.HTML;

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
  export type State = SelectScrollUpArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectScrollUpArrowProps.Render;

    export type SuruUI = SelectScrollUpArrowProps.SuruUI;

    export type BaseUI = SelectScrollUpArrowProps.BaseUI;

    export type HTML = SelectScrollUpArrowProps.HTML;
  }
}

// ScrollDownArrow
// ---------------

/**
 * {@link SelectScrollDownArrow} が持つ状態です。
 */
export type SelectScrollDownArrowState = BaseSelect.ScrollDownArrow.State;

export namespace SelectScrollDownArrowProps {
  export type Render = RenderProps<SelectScrollDownArrowState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.ScrollDownArrow>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.ScrollDownArrow>
  >;
}

/**
 * {@link SelectScrollDownArrow} に渡す props です。
 */
export type SelectScrollDownArrowProps = SelectScrollDownArrowProps.Render &
  SelectScrollDownArrowProps.SuruUI &
  SelectScrollDownArrowProps.BaseUI &
  SelectScrollDownArrowProps.HTML;

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
  export type State = SelectScrollDownArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectScrollDownArrowProps.Render;

    export type SuruUI = SelectScrollDownArrowProps.SuruUI;

    export type BaseUI = SelectScrollDownArrowProps.BaseUI;

    export type HTML = SelectScrollDownArrowProps.HTML;
  }
}

// Group
// -----

/**
 * {@link SelectGroup} が持つ状態です。
 */
export type SelectGroupState = BaseSelect.Group.State;

export namespace SelectGroupProps {
  export type Render = RenderProps<SelectGroupState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.Group>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.Group>
  >;
}

/**
 * {@link SelectGroup} に渡す props です。
 */
export type SelectGroupProps = SelectGroupProps.Render &
  SelectGroupProps.SuruUI &
  SelectGroupProps.BaseUI &
  SelectGroupProps.HTML;

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
  export type State = SelectGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectGroupProps.Render;

    export type SuruUI = SelectGroupProps.SuruUI;

    export type BaseUI = SelectGroupProps.BaseUI;

    export type HTML = SelectGroupProps.HTML;
  }
}

// GroupLabel
// ----------

/**
 * {@link SelectGroupLabel} が持つ状態です。
 */
export type SelectGroupLabelState = BaseSelect.GroupLabel.State;

export namespace SelectGroupLabelProps {
  export type Render = RenderProps<SelectGroupLabelState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.GroupLabel>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.GroupLabel>
  >;
}

/**
 * {@link SelectGroupLabel} に渡す props です。
 */
export type SelectGroupLabelProps = SelectGroupLabelProps.Render &
  SelectGroupLabelProps.SuruUI &
  SelectGroupLabelProps.BaseUI &
  SelectGroupLabelProps.HTML;

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
  export type State = SelectGroupLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectGroupLabelProps.Render;

    export type SuruUI = SelectGroupLabelProps.SuruUI;

    export type BaseUI = SelectGroupLabelProps.BaseUI;

    export type HTML = SelectGroupLabelProps.HTML;
  }
}

// Separator
// ---------

/**
 * {@link SelectSeparator} が持つ状態です。
 */
export type SelectSeparatorState = BaseSelect.Separator.State;

export namespace SelectSeparatorProps {
  export type Render = RenderProps<SelectSeparatorState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseSelect.Separator>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof BaseSelect.Separator>
  >;
}

/**
 * {@link SelectSeparator} に渡す props です。
 */
export type SelectSeparatorProps = SelectSeparatorProps.Render &
  SelectSeparatorProps.SuruUI &
  SelectSeparatorProps.BaseUI &
  SelectSeparatorProps.HTML;

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
  export type State = SelectSeparatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectSeparatorProps.Render;

    export type SuruUI = SelectSeparatorProps.SuruUI;

    export type BaseUI = SelectSeparatorProps.BaseUI;

    export type HTML = SelectSeparatorProps.HTML;
  }
}
