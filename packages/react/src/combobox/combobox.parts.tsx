import { Combobox } from "@base-ui/react/combobox";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./combobox.css";

// Context
// -------

/**
 * フォーカス時に枠線へ適用する配色です。
 */
type ComboboxContextColor = Color;

/**
 * 入力を含むグループ要素の角丸です。
 */
type ComboboxContextRadius = "none" | Size | "full";

/**
 * 入力欄とリスト項目のサイズです。
 */
type ComboboxContextSize = Size;

/**
 * 入力欄の主な外観です。
 */
type ComboboxContextVariant = "naked" | "liquid";

/**
 * {@link ComboboxRoot} が子パーツへ提供する状態です。
 */
export type ComboboxContext = {
  /**
   * フォーカス時に枠線へ適用する配色です。
   */
  readonly color: ComboboxContextColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 入力を含むグループ要素の角丸です。
   */
  readonly radius: ComboboxContextRadius;

  /**
   * 入力欄とリスト項目のサイズです。
   */
  readonly size: ComboboxContextSize;

  /**
   * 入力欄の主な外観です。
   */
  readonly variant: ComboboxContextVariant;
};

/**
 * コンボボックスのスタイルを子要素へ伝播するコンテキストです。
 */
export const ComboboxContext: React.Context<ComboboxContext | null> =
  React.createContext<ComboboxContext | null>(null);

function useSuiComboboxContext(optional?: false): ComboboxContext;
function useSuiComboboxContext(optional?: boolean): ComboboxContext | null;
function useSuiComboboxContext(optional?: boolean): ComboboxContext | null {
  const ctx = React.use(ComboboxContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ComboboxContext",
      providerName: "ComboboxRoot",
    });
  }

  return ctx;
}

/**
 * {@link ComboboxContext} を読み取るフックです。
 */
export const useComboboxContext: IUseContext<ComboboxContext> = useSuiComboboxContext;

export { ComboboxContext as Context, useComboboxContext as useContext };

/**
 * {@link Context} の型名前空間です。
 */
export namespace Context {
  /**
   * {@link ComboboxContextColor}
   */
  export type Color = ComboboxContextColor;

  /**
   * {@link ComboboxContextRadius}
   */
  export type Radius = ComboboxContextRadius;

  /**
   * {@link ComboboxContextSize}
   */
  export type Size = ComboboxContextSize;

  /**
   * {@link ComboboxContextVariant}
   */
  export type Variant = ComboboxContextVariant;
}

// Root
// ----

/**
 * {@link ComboboxRoot} を命令的に操作するためのオブジェクトです。
 */
export type ComboboxRootActions = Combobox.Root.Actions;

/**
 * {@link ComboboxRoot} の値が変更されたイベントの詳細です。
 */
export type ComboboxRootChangeEventDetails = Combobox.Root.ChangeEventDetails;

/**
 * {@link ComboboxRoot} の値が変更された理由です。
 */
export type ComboboxRootChangeEventReason = Combobox.Root.ChangeEventReason;

/**
 * {@link ComboboxRoot} の項目がハイライト表示またはハイライト解除されたイベントの詳細です。
 */
export type ComboboxRootHighlightEventDetails = Combobox.Root.HighlightEventDetails;

/**
 * {@link ComboboxRoot} の項目がハイライト表示またはハイライト解除された理由です。
 */
export type ComboboxRootHighlightEventReason = Combobox.Root.HighlightEventReason;

/**
 * コンボボックスの配色です。
 */
export type ComboboxRootColor = Color;

/**
 * コンボボックスに表示する項目の一覧です。
 *
 * - 平坦な項目の配列
 * - `items` を持つグループの配列。グループには任意で `label` を付けられます。
 */
export type ComboboxRootItems<TValue = unknown> =
  | readonly TValue[]
  | readonly {
      readonly items: readonly TValue[];
      readonly label?: React.ReactNode;
    }[];

/**
 * コンボボックスの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type ComboboxRootRadius = "none" | Size | "full";

/**
 * コンボボックスの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type ComboboxRootSize = Size;

/**
 * コンボボックスの主な外観の種類です。
 *
 * - `"naked"`: 背景のない入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ComboboxRootVariant = "naked" | "liquid";

/**
 * {@link ComboboxRoot} が持つ状態です。
 */
export type ComboboxRootState = Combobox.Root.State;

/**
 * {@link ComboboxRoot} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export type ComboboxRootProps<
  TValue = unknown,
  TMultiple extends boolean | undefined = false,
> = Omit<Combobox.Root.Props<TValue, TMultiple>, "items"> & {
  /**
   * フォーカス時に枠線へ適用する色を指定します。
   *
   * @default "grey"
   */
  color?: ComboboxRootColor | undefined;

  /**
   * リストに表示する項目の一覧です。
   *
   * グループの配列を指定するとグループごとに区切って表示します。
   */
  items?: ComboboxRootItems<TValue> | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * 入力を含むグループ要素の角丸を指定します。
   *
   * 既定値は {@link ComboboxRootProps.size|size} です。
   */
  radius?: ComboboxRootRadius | undefined;

  /**
   * 入力欄とリスト項目のサイズを指定します。
   *
   * @default "md"
   */
  size?: ComboboxRootSize | undefined;

  /**
   * 入力欄の主な外観を指定します。
   *
   * @default "liquid"
   */
  variant?: ComboboxRootVariant | undefined;
};

interface IComboboxRoot extends IComponent<ComboboxRootProps<unknown, boolean | undefined>> {
  /**
   * @template TValue 項目の値の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   */
  <TValue, TMultiple extends boolean | undefined = false>(
    props: ComboboxRootProps<TValue, TMultiple>,
  ): IComponent.Return;
}

/**
 * コンボボックスのルート要素です。
 *
 * 選択状態とポップアップの開閉状態を管理し、スタイルを子パーツへ伝播します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const ComboboxRoot: IComboboxRoot = function SuiComboboxRoot<
  TValue,
  TMultiple extends boolean | undefined = false,
>(props: ComboboxRootProps<TValue, TMultiple>) {
  const {
    size = "md",
    color = "grey",
    radius = size,
    variant = "liquid",
    outlined = false,
    ...otherProps
  } = props;
  const ctx = React.useMemo<ComboboxContext>(
    () => ({
      size,
      color,
      radius,
      variant,
      outlined,
    }),
    [size, color, radius, variant, outlined],
  );

  return (
    <ComboboxContext value={ctx}>
      <Combobox.Root {...otherProps} />
    </ComboboxContext>
  );
};

export { ComboboxRoot as Root };

/**
 * {@link ComboboxRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link ComboboxRootState}
   */
  export type State = ComboboxRootState;

  /**
   * {@link ComboboxRootProps}
   */
  export type Props<
    TValue = unknown,
    TMultiple extends boolean | undefined = false,
  > = ComboboxRootProps<TValue, TMultiple>;

  /**
   * {@link ComboboxRootActions}
   */
  export type Actions = ComboboxRootActions;

  /**
   * {@link ComboboxRootChangeEventDetails}
   */
  export type ChangeEventDetails = ComboboxRootChangeEventDetails;

  /**
   * {@link ComboboxRootChangeEventReason}
   */
  export type ChangeEventReason = ComboboxRootChangeEventReason;

  /**
   * {@link ComboboxRootColor}
   */
  export type Color = ComboboxRootColor;

  /**
   * {@link ComboboxRootHighlightEventDetails}
   */
  export type HighlightEventDetails = ComboboxRootHighlightEventDetails;

  /**
   * {@link ComboboxRootHighlightEventReason}
   */
  export type HighlightEventReason = ComboboxRootHighlightEventReason;

  /**
   * {@link ComboboxRootItems}
   */
  export type Items<TValue = unknown> = ComboboxRootItems<TValue>;

  /**
   * {@link ComboboxRootRadius}
   */
  export type Radius = ComboboxRootRadius;

  /**
   * {@link ComboboxRootSize}
   */
  export type Size = ComboboxRootSize;

  /**
   * {@link ComboboxRootVariant}
   */
  export type Variant = ComboboxRootVariant;
}

// Label
// -----

/**
 * {@link ComboboxLabel} が持つ状態です。
 */
export type ComboboxLabelState = Combobox.Label.State;

/**
 * {@link ComboboxLabel} に渡す props です。
 */
export type ComboboxLabelProps = React.ComponentProps<typeof Combobox.Label>;

/**
 * トリガーに対応する表示ラベルです。
 */
export const ComboboxLabel: IComponent<ComboboxLabelProps> = function SuiComboboxLabel(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Label {...otherProps} className={cn(className, "sui_combobox_label")} />;
};

export { ComboboxLabel as Label };

/**
 * {@link ComboboxLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Label {
  /**
   * {@link ComboboxLabelState}
   */
  export type State = ComboboxLabelState;

  /**
   * {@link ComboboxLabelProps}
   */
  export type Props = ComboboxLabelProps;
}

// InputGroup
// ----------

/**
 * {@link ComboboxInputGroup} が持つ状態です。
 */
export type ComboboxInputGroupState = Combobox.InputGroup.State;

/**
 * {@link ComboboxInputGroup} に渡す props です。
 */
export type ComboboxInputGroupProps = React.ComponentProps<typeof Combobox.InputGroup>;

/**
 * 入力欄と付属コントロールをまとめるグループ要素です。
 *
 * Root のスタイルプロパティーがこの要素へ適用されます。
 */
export const ComboboxInputGroup: IComponent<ComboboxInputGroupProps> =
  function SuiComboboxInputGroup(props) {
    const { size, color, radius, variant, outlined } = useComboboxContext();
    const { className, ...otherProps } = props;

    return (
      <Combobox.InputGroup
        {...otherProps}
        className={cn(
          className,
          "sui_combobox_input_group",
          `sui_combobox_input_group-size_${size}`,
          `sui_combobox_input_group-color_${color}`,
          `sui_combobox_input_group-radius_${radius}`,
          `sui_combobox_input_group-variant_${variant}`,
          outlined && "sui_combobox_input_group-outlined",
          (state) => state.disabled && "sui_combobox_input_group-disabled",
          (state) => state.valid === false && "sui_combobox_input_group-invalid",
        )}
        data-scope=""
      />
    );
  };

export { ComboboxInputGroup as InputGroup };

/**
 * {@link ComboboxInputGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace InputGroup {
  /**
   * {@link ComboboxInputGroupState}
   */
  export type State = ComboboxInputGroupState;

  /**
   * {@link ComboboxInputGroupProps}
   */
  export type Props = ComboboxInputGroupProps;
}

// Value
// -----

/**
 * {@link ComboboxValue} が持つ状態です。
 */
export type ComboboxValueState = Combobox.Value.State;

/**
 * {@link ComboboxValue} に渡す props です。
 */
export type ComboboxValueProps = React.ComponentProps<typeof Combobox.Value>;

/**
 * 現在の選択値を子要素へ反映する要素です。
 */
export const ComboboxValue: IComponent<ComboboxValueProps> = function SuiComboboxValue(props) {
  return <Combobox.Value {...props} />;
};

export { ComboboxValue as Value };

/**
 * {@link ComboboxValue} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Value {
  /**
   * {@link ComboboxValueState}
   */
  export type State = ComboboxValueState;

  /**
   * {@link ComboboxValueProps}
   */
  export type Props = ComboboxValueProps;
}

// Input
// -----

/**
 * {@link ComboboxInput} が持つ状態です。
 */
export type ComboboxInputState = Combobox.Input.State;

/**
 * {@link ComboboxInput} に渡す props です。
 */
export type ComboboxInputProps = React.ComponentProps<typeof Combobox.Input>;

/**
 * 候補を検索するテキスト入力欄です。
 */
export const ComboboxInput: IComponent<ComboboxInputProps> = function SuiComboboxInput(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Input {...otherProps} className={cn(className, "sui_combobox_input")} />;
};

export { ComboboxInput as Input };

/**
 * {@link ComboboxInput} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Input {
  /**
   * {@link ComboboxInputState}
   */
  export type State = ComboboxInputState;

  /**
   * {@link ComboboxInputProps}
   */
  export type Props = ComboboxInputProps;
}

// Trigger
// -------

/**
 * {@link ComboboxTrigger} が持つ状態です。
 */
export type ComboboxTriggerState = Combobox.Trigger.State;

/**
 * {@link ComboboxTrigger} に渡す props です。
 */
export type ComboboxTriggerProps = React.ComponentProps<typeof Combobox.Trigger>;

/**
 * 候補リストを開閉するボタン要素です。
 */
export const ComboboxTrigger: IComponent<ComboboxTriggerProps> = function SuiComboboxTrigger(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <Combobox.Trigger
      {...otherProps}
      className={cn(
        className,
        "sui_combobox_trigger",
        (state) => state.disabled && "sui_combobox_trigger-disabled",
      )}
    />
  );
};

export { ComboboxTrigger as Trigger };

/**
 * {@link ComboboxTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link ComboboxTriggerState}
   */
  export type State = ComboboxTriggerState;

  /**
   * {@link ComboboxTriggerProps}
   */
  export type Props = ComboboxTriggerProps;
}

// Icon
// ----

/**
 * {@link ComboboxIcon} が持つ状態です。
 */
export type ComboboxIconState = Combobox.Icon.State;

/**
 * {@link ComboboxIcon} に渡す props です。
 */
export type ComboboxIconProps = React.ComponentProps<typeof Combobox.Icon>;

/**
 * トリガーの操作を示すアイコンのラッパー要素です。
 */
export const ComboboxIcon: IComponent<ComboboxIconProps> = function SuiComboboxIcon(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Icon {...otherProps} className={cn(className, "sui_combobox_icon")} />;
};

export { ComboboxIcon as Icon };

/**
 * {@link ComboboxIcon} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Icon {
  /**
   * {@link ComboboxIconState}
   */
  export type State = ComboboxIconState;

  /**
   * {@link ComboboxIconProps}
   */
  export type Props = ComboboxIconProps;
}

// Clear
// -----

/**
 * {@link ComboboxClear} が持つ状態です。
 */
export type ComboboxClearState = Combobox.Clear.State;

/**
 * {@link ComboboxClear} に渡す props です。
 */
export type ComboboxClearProps = React.ComponentProps<typeof Combobox.Clear>;

/**
 * 選択値を消去するボタン要素です。
 */
export const ComboboxClear: IComponent<ComboboxClearProps> = function SuiComboboxClear(props) {
  const { className, ...otherProps } = props;

  return (
    <Combobox.Clear
      {...otherProps}
      className={cn(
        className,
        "sui_combobox_clear",
        (state) => state.disabled && "sui_combobox_clear-disabled",
      )}
    />
  );
};

export { ComboboxClear as Clear };

/**
 * {@link ComboboxClear} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Clear {
  /**
   * {@link ComboboxClearState}
   */
  export type State = ComboboxClearState;

  /**
   * {@link ComboboxClearProps}
   */
  export type Props = ComboboxClearProps;
}

// Chips
// -----

/**
 * {@link ComboboxChips} が持つ状態です。
 */
export type ComboboxChipsState = Combobox.Chips.State;

/**
 * {@link ComboboxChips} に渡す props です。
 */
export type ComboboxChipsProps = React.ComponentProps<typeof Combobox.Chips>;

/**
 * 複数選択した値を表示するチップのコンテナーです。
 */
export const ComboboxChips: IComponent<ComboboxChipsProps> = function SuiComboboxChips(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Chips {...otherProps} className={cn(className, "sui_combobox_chips")} />;
};

export { ComboboxChips as Chips };

/**
 * {@link ComboboxChips} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Chips {
  /**
   * {@link ComboboxChipsState}
   */
  export type State = ComboboxChipsState;

  /**
   * {@link ComboboxChipsProps}
   */
  export type Props = ComboboxChipsProps;
}

// Chip
// ----

/**
 * {@link ComboboxChip} が持つ状態です。
 */
export type ComboboxChipState = Combobox.Chip.State;

/**
 * {@link ComboboxChip} に渡す props です。
 */
export type ComboboxChipProps = React.ComponentProps<typeof Combobox.Chip>;

/**
 * 複数選択した値を表すチップ要素です。
 */
export const ComboboxChip: IComponent<ComboboxChipProps> = function SuiComboboxChip(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Chip {...otherProps} className={cn(className, "sui_combobox_chip")} />;
};

export { ComboboxChip as Chip };

/**
 * {@link ComboboxChip} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Chip {
  /**
   * {@link ComboboxChipState}
   */
  export type State = ComboboxChipState;

  /**
   * {@link ComboboxChipProps}
   */
  export type Props = ComboboxChipProps;
}

// ChipRemove
// ----------

/**
 * {@link ComboboxChipRemove} が持つ状態です。
 */
export type ComboboxChipRemoveState = Combobox.ChipRemove.State;

/**
 * {@link ComboboxChipRemove} に渡す props です。
 */
export type ComboboxChipRemoveProps = React.ComponentProps<typeof Combobox.ChipRemove>;

/**
 * チップを選択値から削除するボタン要素です。
 */
export const ComboboxChipRemove: IComponent<ComboboxChipRemoveProps> =
  function SuiComboboxChipRemove(props) {
    const { className, ...otherProps } = props;

    return (
      <Combobox.ChipRemove
        {...otherProps}
        className={cn(
          className,
          "sui_combobox_chip_remove",
          (state) => state.disabled && "sui_combobox_chip_remove-disabled",
        )}
      />
    );
  };

export { ComboboxChipRemove as ChipRemove };

/**
 * {@link ComboboxChipRemove} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ChipRemove {
  /**
   * {@link ComboboxChipRemoveState}
   */
  export type State = ComboboxChipRemoveState;

  /**
   * {@link ComboboxChipRemoveProps}
   */
  export type Props = ComboboxChipRemoveProps;
}

// List
// ----

/**
 * {@link ComboboxList} が持つ状態です。
 */
export type ComboboxListState = Combobox.List.State;

/**
 * {@link ComboboxList} に渡す props です。
 */
export type ComboboxListProps = React.ComponentProps<typeof Combobox.List>;

/**
 * 候補項目のリストを表示するコンテナー要素です。
 */
export const ComboboxList: IComponent<ComboboxListProps> = function SuiComboboxList(props) {
  const { className, ...otherProps } = props;

  return <Combobox.List {...otherProps} className={cn(className, "sui_combobox_list")} />;
};

export { ComboboxList as List };

/**
 * {@link ComboboxList} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace List {
  /**
   * {@link ComboboxListState}
   */
  export type State = ComboboxListState;

  /**
   * {@link ComboboxListProps}
   */
  export type Props = ComboboxListProps;
}

// Status
// ------

/**
 * {@link ComboboxStatus} が持つ状態です。
 */
export type ComboboxStatusState = Combobox.Status.State;

/**
 * {@link ComboboxStatus} に渡す props です。
 */
export type ComboboxStatusProps = React.ComponentProps<typeof Combobox.Status>;

/**
 * 非同期検索などの状態を読み上げる要素です。
 */
export const ComboboxStatus: IComponent<ComboboxStatusProps> = function SuiComboboxStatus(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Status {...otherProps} className={cn(className, "sui_combobox_status")} />;
};

export { ComboboxStatus as Status };

/**
 * {@link ComboboxStatus} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Status {
  /**
   * {@link ComboboxStatusState}
   */
  export type State = ComboboxStatusState;

  /**
   * {@link ComboboxStatusProps}
   */
  export type Props = ComboboxStatusProps;
}

// Portal
// ------

/**
 * {@link ComboboxPortal} が持つ状態です。
 */
export type ComboboxPortalState = Combobox.Portal.State;

/**
 * {@link ComboboxPortal} に渡す props です。
 */
export type ComboboxPortalProps = React.ComponentProps<typeof Combobox.Portal>;

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const ComboboxPortal: IComponent<ComboboxPortalProps> = function SuiComboboxPortal(props) {
  const { size, radius } = useComboboxContext();
  const { className, ...otherProps } = props;

  return (
    <Combobox.Portal
      {...otherProps}
      className={cn(
        className,
        "sui_combobox_portal",
        `sui_combobox_portal-size_${size}`,
        `sui_combobox_portal-radius_${radius}`,
      )}
      data-scope=""
    />
  );
};

export { ComboboxPortal as Portal };

/**
 * {@link ComboboxPortal} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  /**
   * {@link ComboboxPortalState}
   */
  export type State = ComboboxPortalState;

  /**
   * {@link ComboboxPortalProps}
   */
  export type Props = ComboboxPortalProps;
}

// Backdrop
// --------

/**
 * {@link ComboboxBackdrop} が持つ状態です。
 */
export type ComboboxBackdropState = Combobox.Backdrop.State;

/**
 * {@link ComboboxBackdrop} に渡す props です。
 */
export type ComboboxBackdropProps = React.ComponentProps<typeof Combobox.Backdrop>;

/**
 * ポップアップの背後に表示される要素です。
 */
export const ComboboxBackdrop: IComponent<ComboboxBackdropProps> = function SuiComboboxBackdrop(
  props,
) {
  const { className, ...otherProps } = props;

  return <Combobox.Backdrop {...otherProps} className={cn(className, "sui_combobox_backdrop")} />;
};

export { ComboboxBackdrop as Backdrop };

/**
 * {@link ComboboxBackdrop} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link ComboboxBackdropState}
   */
  export type State = ComboboxBackdropState;

  /**
   * {@link ComboboxBackdropProps}
   */
  export type Props = ComboboxBackdropProps;
}

// Positioner
// ----------

/**
 * {@link ComboboxPositioner} が持つ状態です。
 */
export type ComboboxPositionerState = Combobox.Positioner.State;

/**
 * {@link ComboboxPositioner} に渡す props です。
 */
export type ComboboxPositionerProps = React.ComponentProps<typeof Combobox.Positioner>;

/**
 * ポップアップを入力欄へ位置合わせする要素です。
 */
export const ComboboxPositioner: IComponent<ComboboxPositionerProps> =
  function SuiComboboxPositioner(props) {
    const { className, ...otherProps } = props;

    return (
      <Combobox.Positioner {...otherProps} className={cn(className, "sui_combobox_positioner")} />
    );
  };

export { ComboboxPositioner as Positioner };

/**
 * {@link ComboboxPositioner} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Positioner {
  /**
   * {@link ComboboxPositionerState}
   */
  export type State = ComboboxPositionerState;

  /**
   * {@link ComboboxPositionerProps}
   */
  export type Props = ComboboxPositionerProps;
}

// Popup
// -----

/**
 * {@link ComboboxPopup} が持つ状態です。
 */
export type ComboboxPopupState = Combobox.Popup.State;

/**
 * {@link ComboboxPopup} に渡す props です。
 */
export type ComboboxPopupProps = React.ComponentProps<typeof Combobox.Popup>;

/**
 * 候補項目を表示するポップアップ要素です。
 */
export const ComboboxPopup: IComponent<ComboboxPopupProps> = function SuiComboboxPopup(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Popup {...otherProps} className={cn(className, "sui_combobox_popup")} />;
};

export { ComboboxPopup as Popup };

/**
 * {@link ComboboxPopup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Popup {
  /**
   * {@link ComboboxPopupState}
   */
  export type State = ComboboxPopupState;

  /**
   * {@link ComboboxPopupProps}
   */
  export type Props = ComboboxPopupProps;
}

// Arrow
// -----

/**
 * {@link ComboboxArrow} が持つ状態です。
 */
export type ComboboxArrowState = Combobox.Arrow.State;

/**
 * {@link ComboboxArrow} に渡す props です。
 */
export type ComboboxArrowProps = React.ComponentProps<typeof Combobox.Arrow>;

/**
 * ポップアップと入力欄をつなぐ矢印要素です。
 */
export const ComboboxArrow: IComponent<ComboboxArrowProps> = function SuiComboboxArrow(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Arrow {...otherProps} className={cn(className, "sui_combobox_arrow")} />;
};

export { ComboboxArrow as Arrow };

/**
 * {@link ComboboxArrow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Arrow {
  /**
   * {@link ComboboxArrowState}
   */
  export type State = ComboboxArrowState;

  /**
   * {@link ComboboxArrowProps}
   */
  export type Props = ComboboxArrowProps;
}

// Group
// -----

/**
 * {@link ComboboxGroup} が持つ状態です。
 */
export type ComboboxGroupState = Combobox.Group.State;

/**
 * {@link ComboboxGroup} に渡す props です。
 */
export type ComboboxGroupProps = React.ComponentProps<typeof Combobox.Group>;

/**
 * 関連する候補項目をまとめるグループ要素です。
 */
export const ComboboxGroup: IComponent<ComboboxGroupProps> = function SuiComboboxGroup(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Group {...otherProps} className={cn(className, "sui_combobox_group")} />;
};

export { ComboboxGroup as Group };

/**
 * {@link ComboboxGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Group {
  /**
   * {@link ComboboxGroupState}
   */
  export type State = ComboboxGroupState;

  /**
   * {@link ComboboxGroupProps}
   */
  export type Props = ComboboxGroupProps;
}

// GroupLabel
// ----------

/**
 * {@link ComboboxGroupLabel} が持つ状態です。
 */
export type ComboboxGroupLabelState = Combobox.GroupLabel.State;

/**
 * {@link ComboboxGroupLabel} に渡す props です。
 */
export type ComboboxGroupLabelProps = React.ComponentProps<typeof Combobox.GroupLabel>;

/**
 * 候補グループの見出し要素です。
 */
export const ComboboxGroupLabel: IComponent<ComboboxGroupLabelProps> =
  function SuiComboboxGroupLabel(props) {
    const { className, ...otherProps } = props;

    return (
      <Combobox.GroupLabel {...otherProps} className={cn(className, "sui_combobox_group_label")} />
    );
  };

export { ComboboxGroupLabel as GroupLabel };

/**
 * {@link ComboboxGroupLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace GroupLabel {
  /**
   * {@link ComboboxGroupLabelState}
   */
  export type State = ComboboxGroupLabelState;

  /**
   * {@link ComboboxGroupLabelProps}
   */
  export type Props = ComboboxGroupLabelProps;
}

// Item
// ----

/**
 * {@link ComboboxItem} が持つ状態です。
 */
export type ComboboxItemState = Combobox.Item.State;

/**
 * {@link ComboboxItem} に渡す props です。
 */
export type ComboboxItemProps = React.ComponentProps<typeof Combobox.Item>;

/**
 * 候補リストの個々の項目要素です。
 */
export const ComboboxItem: IComponent<ComboboxItemProps> = function SuiComboboxItem(props) {
  const { className, ...otherProps } = props;

  return (
    <Combobox.Item
      {...otherProps}
      className={cn(
        className,
        "sui_combobox_item",
        (state) => state.disabled && "sui_combobox_item-disabled",
        (state) => state.highlighted && "sui_combobox_item-highlighted",
        (state) => state.selected && "sui_combobox_item-selected",
      )}
    />
  );
};

export { ComboboxItem as Item };

/**
 * {@link ComboboxItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link ComboboxItemState}
   */
  export type State = ComboboxItemState;

  /**
   * {@link ComboboxItemProps}
   */
  export type Props = ComboboxItemProps;
}

// ItemIndicator
// -------------

/**
 * {@link ComboboxItemIndicator} が持つ状態です。
 */
export type ComboboxItemIndicatorState = Combobox.ItemIndicator.State;

/**
 * {@link ComboboxItemIndicator} に渡す props です。
 */
export type ComboboxItemIndicatorProps = React.ComponentProps<typeof Combobox.ItemIndicator>;

/**
 * 項目が選択されていることを示す要素です。
 */
export const ComboboxItemIndicator: IComponent<ComboboxItemIndicatorProps> =
  function SuiComboboxItemIndicator(props) {
    const { className, ...otherProps } = props;

    return (
      <Combobox.ItemIndicator
        {...otherProps}
        className={cn(className, "sui_combobox_item_indicator")}
      />
    );
  };

export { ComboboxItemIndicator as ItemIndicator };

/**
 * {@link ComboboxItemIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ItemIndicator {
  /**
   * {@link ComboboxItemIndicatorState}
   */
  export type State = ComboboxItemIndicatorState;

  /**
   * {@link ComboboxItemIndicatorProps}
   */
  export type Props = ComboboxItemIndicatorProps;
}

// Row
// ---

/**
 * {@link ComboboxRow} が持つ状態です。
 */
export type ComboboxRowState = Combobox.Row.State;

/**
 * {@link ComboboxRow} に渡す props です。
 */
export type ComboboxRowProps = React.ComponentProps<typeof Combobox.Row>;

/**
 * グリッドリストの 1 行を表示する要素です。
 */
export const ComboboxRow: IComponent<ComboboxRowProps> = function SuiComboboxRow(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Row {...otherProps} className={cn(className, "sui_combobox_row")} />;
};

export { ComboboxRow as Row };

/**
 * {@link ComboboxRow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Row {
  /**
   * {@link ComboboxRowState}
   */
  export type State = ComboboxRowState;

  /**
   * {@link ComboboxRowProps}
   */
  export type Props = ComboboxRowProps;
}

// Collection
// ----------

/**
 * {@link ComboboxCollection} が持つ状態です。
 */
export type ComboboxCollectionState = Combobox.Collection.State;

/**
 * {@link ComboboxCollection} に渡す props です。
 */
export type ComboboxCollectionProps = React.ComponentProps<typeof Combobox.Collection>;

/**
 * フィルタリングされた項目を列挙する要素です。
 *
 * これ自身は HTML 要素をレンダリングしません。
 */
export const ComboboxCollection: IComponent<ComboboxCollectionProps> =
  function SuiComboboxCollection(props) {
    return <Combobox.Collection {...props} />;
  };

export { ComboboxCollection as Collection };

/**
 * {@link ComboboxCollection} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Collection {
  /**
   * {@link ComboboxCollectionState}
   */
  export type State = ComboboxCollectionState;

  /**
   * {@link ComboboxCollectionProps}
   */
  export type Props = ComboboxCollectionProps;
}

// Empty
// -----

/**
 * {@link ComboboxEmpty} が持つ状態です。
 */
export type ComboboxEmptyState = Combobox.Empty.State;

/**
 * {@link ComboboxEmpty} に渡す props です。
 */
export type ComboboxEmptyProps = React.ComponentProps<typeof Combobox.Empty>;

/**
 * 候補リストが空のときに内容を表示する要素です。
 */
export const ComboboxEmpty: IComponent<ComboboxEmptyProps> = function SuiComboboxEmpty(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Empty {...otherProps} className={cn(className, "sui_combobox_empty")} />;
};

export { ComboboxEmpty as Empty };

/**
 * {@link ComboboxEmpty} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Empty {
  /**
   * {@link ComboboxEmptyState}
   */
  export type State = ComboboxEmptyState;

  /**
   * {@link ComboboxEmptyProps}
   */
  export type Props = ComboboxEmptyProps;
}

// Separator
// ---------

/**
 * {@link ComboboxSeparator} が持つ状態です。
 */
export type ComboboxSeparatorState = Combobox.Separator.State;

/**
 * {@link ComboboxSeparator} に渡す props です。
 */
export type ComboboxSeparatorProps = React.ComponentProps<typeof Combobox.Separator>;

/**
 * 項目やグループを区切る要素です。
 */
export const ComboboxSeparator: IComponent<ComboboxSeparatorProps> = function SuiComboboxSeparator(
  props,
) {
  const { className, ...otherProps } = props;

  return <Combobox.Separator {...otherProps} className={cn(className, "sui_combobox_separator")} />;
};

export { ComboboxSeparator as Separator };

/**
 * {@link ComboboxSeparator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Separator {
  /**
   * {@link ComboboxSeparatorState}
   */
  export type State = ComboboxSeparatorState;

  /**
   * {@link ComboboxSeparatorProps}
   */
  export type Props = ComboboxSeparatorProps;
}

// useFilter
// ---------

/**
 * 項目を検索文字列と照合するフィルターです。
 */
export interface ComboboxFilter extends ReturnType<typeof Combobox.useFilter> {}

/**
 * {@link useComboboxFilter} のオプションです。
 */
export type IUseComboboxFilterOptions =
  Parameters<typeof Combobox.useFilter> extends readonly [arg0?: infer TArg0, ...never[]]
    ? NonNullable<TArg0>
    : unknown;

/**
 * {@link useComboboxFilter} の戻り値です。
 */
export interface IUseComboboxFilterReturn extends ComboboxFilter {}

/**
 * {@link useComboboxFilter} の型です。
 */
export interface IUseComboboxFilter {
  (options?: IUseComboboxFilterOptions): IUseComboboxFilterReturn;
}

/**
 * {@link IUseComboboxFilter} に対応する型名前空間です。
 */
export namespace IUseComboboxFilter {
  /**
   * {@link IUseComboboxFilterOptions}
   */
  export type Options = IUseComboboxFilterOptions;

  /**
   * {@link IUseComboboxFilterReturn}
   */
  export interface Return extends IUseComboboxFilterReturn {}
}

function useSuiComboboxFilter(options?: IUseComboboxFilterOptions): ComboboxFilter {
  return Combobox.useFilter(options);
}

/**
 * 項目を検索文字列と照合するフィルター関数を作るフックです。
 */
export const useComboboxFilter: IUseComboboxFilter = useSuiComboboxFilter;

/**
 * {@link useComboboxFilter}
 */
export const useFilter: IUseComboboxFilter = useComboboxFilter;

// useFilteredItems
// ----------------

/**
 * フィルタリングされた項目の一覧です。
 */
export type ComboboxFilteredItems<TValue = unknown> = readonly TValue[];

/**
 * {@link useComboboxFilteredItems} の戻り値です。
 */
export type IUseComboboxFilteredItemsReturn<TValue = unknown> = ComboboxFilteredItems<TValue>;

/**
 * {@link useComboboxFilteredItems} の型です。
 */
export interface IUseComboboxFilteredItems {
  <TValue = unknown>(): IUseComboboxFilteredItemsReturn<TValue>;
}

/**
 * {@link IUseComboboxFilteredItems} に対応する型名前空間です。
 */
export namespace IUseComboboxFilteredItems {
  /**
   * {@link IUseComboboxFilteredItemsReturn}
   */
  export type Return<TValue = unknown> = IUseComboboxFilteredItemsReturn<TValue>;
}

function useSuiComboboxFilteredItems(): ComboboxFilteredItems<any> {
  return Combobox.useFilteredItems();
}

/**
 * Root 内でフィルタリングされた項目の一覧を返すフックです。
 */
export const useComboboxFilteredItems: IUseComboboxFilteredItems = useSuiComboboxFilteredItems;

/**
 * {@link useComboboxFilteredItems}
 */
export const useFilteredItems: IUseComboboxFilteredItems = useComboboxFilteredItems;
