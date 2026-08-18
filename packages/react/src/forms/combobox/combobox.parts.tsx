import { Combobox } from "@base-ui/react/combobox";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import { ScrollArea } from "../../navigation/scroll-area/index.js";
import type { IComponent, IUseContext } from "../../types.js";

import "./combobox.css";

// Types
// -----

/**
 * コンボボックスの色です。
 */
export type ComboboxColor = Color;

/**
 * コンボボックスの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"rounded"`: 標準的な角丸
 * - `"full"`: 完全な丸形
 */
export type ComboboxRadius = "none" | "rounded" | "full";

/**
 * コンボボックスの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type ComboboxSize = Size;

/**
 * コンボボックスの主な外観の種類です。
 *
 * - `"naked"`: 背景のない入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ComboboxVariant = "naked" | "liquid";

/**
 * コンボボックスに表示する項目の一覧です。
 *
 * - `readonly Value[]`: 平坦な項目の配列
 * - `readonly { label?: React.ReactNode; items: readonly Value[] }[]`: `items` を持つグループの配列
 */
export type ComboboxItems<Value = unknown> =
  | readonly Value[]
  | readonly {
      readonly label?: React.ReactNode;
      readonly items: readonly Value[];
    }[];

// Context
// -------

/**
 * {@link ComboboxRoot} が子パーツへ提供する状態です。
 */
export type ComboboxContext = {
  /**
   * フォーカス時に枠線へ適用するアクセントカラーです。
   */
  readonly accentColor: ComboboxColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 入力を含むグループ要素の角丸です。
   */
  readonly radius: ComboboxRadius;

  /**
   * 入力欄とリスト項目のサイズです。
   */
  readonly size: ComboboxSize;

  /**
   * 入力欄のスタイルバリエーションです。
   */
  readonly variant: ComboboxVariant;
};

/**
 * コンボボックスのスタイルを子要素へ伝播するコンテキストです。
 */
export const ComboboxContext: React.Context<ComboboxContext | null> =
  React.createContext<ComboboxContext | null>(null);

function useSuiComboboxContext(optional?: false): ComboboxContext;
function useSuiComboboxContext(optional?: boolean): ComboboxContext | null;
function useSuiComboboxContext(optional?: boolean): ComboboxContext | null {
  const context = React.use(ComboboxContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "ComboboxContext",
      providerName: "ComboboxRoot",
    });
  }

  return context;
}

/**
 * {@link ComboboxContext} です。
 */
export type Context = ComboboxContext;

/**
 * {@link ComboboxContext} です。
 */
export const Context: React.Context<ComboboxContext | null> = ComboboxContext;

/**
 * {@link ComboboxContext} を読み取るフックです。
 */
export const useComboboxContext: IUseContext<ComboboxContext> = useSuiComboboxContext;

/**
 * {@link useComboboxContext} です。
 */
export const useContext: IUseContext<Context> = useComboboxContext;

// Root
// ----

/**
 * {@link ComboboxRoot} の状態です。
 */
export type ComboboxRootState = Combobox.Root.State;

/**
 * {@link ComboboxRoot} に渡すプロパティーです。
 */
export type ComboboxRootProps<Value = unknown, Multiple extends boolean | undefined = false> = Omit<
  Combobox.Root.Props<Value, Multiple>,
  "items"
> & {
  /**
   * リストに表示する項目の一覧です。
   */
  items?: ComboboxItems<Value> | undefined;

  /**
   * フォーカス時に枠線へ適用するアクセントカラーを指定します。
   *
   * @default "grey"
   */
  accentColor?: ComboboxColor | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   * 省略時は `variant` が `"naked"` の場合に有効になります。
   */
  outlined?: boolean | undefined;

  /**
   * 入力欄とリスト項目のサイズを指定します。
   *
   * @default "md"
   */
  size?: ComboboxSize | undefined;

  /**
   * 入力欄のスタイルバリエーションを指定します。
   *
   * @default "naked"
   */
  variant?: ComboboxVariant | undefined;

  /**
   * 入力を含むグループ要素の角丸を指定します。
   *
   * @default "rounded"
   */
  radius?: ComboboxRadius | undefined;
};

/**
 * {@link ComboboxRoot} のコンポーネント型です。
 */
export interface ComboboxRootComponent extends IComponent<
  ComboboxRootProps<unknown, boolean | undefined>
> {
  <Value, Multiple extends boolean | undefined = false>(
    props: ComboboxRootProps<Value, Multiple>,
  ): React.ReactElement | null;
}

/**
 * コンボボックスのルート要素です。
 *
 * 選択状態とポップアップの開閉状態を管理し、スタイルを子パーツへ伝播します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const ComboboxRoot: ComboboxRootComponent = function SuiComboboxRoot<
  Value,
  Multiple extends boolean | undefined = false,
>(props: ComboboxRootProps<Value, Multiple>) {
  const {
    size: sizeProp = "md",
    radius: radiusProp = "rounded",
    variant: variantProp = "naked",
    outlined: outlinedProp = variantProp === "naked",
    accentColor: accentColorProp = "grey",
    ...otherProps
  } = props;
  const context = React.useMemo<ComboboxContext>(
    () => ({
      size: sizeProp,
      radius: radiusProp,
      variant: variantProp,
      outlined: outlinedProp,
      accentColor: accentColorProp,
    }),
    [accentColorProp, outlinedProp, radiusProp, sizeProp, variantProp],
  );

  return (
    <Context value={context}>
      <Combobox.Root {...otherProps} />
    </Context>
  );
};

/**
 * {@link ComboboxRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link ComboboxRootState} の別名です。
   */
  export type State = ComboboxRootState;

  /**
   * {@link ComboboxRootProps} の別名です。
   */
  export type Props<
    Value = unknown,
    Multiple extends boolean | undefined = false,
  > = ComboboxRootProps<Value, Multiple>;
}

/**
 * {@link ComboboxRoot} の別名です。
 */
export const Root: ComboboxRootComponent = ComboboxRoot;

// Label
// -----

/**
 * {@link Label} の状態です。
 */
export type ComboboxLabelState = Combobox.Label.State;

/**
 * {@link Label} に渡すプロパティーです。
 */
export type ComboboxLabelProps = React.ComponentProps<typeof Combobox.Label>;

/**
 * トリガーに対応する表示ラベルです。
 */
export const ComboboxLabel: IComponent<ComboboxLabelProps> = function SuiComboboxLabel(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Label {...otherProps} className={cn(className, "sui_combobox_label")} />;
};

/**
 * {@link ComboboxLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Label {
  /**
   * {@link ComboboxLabelState} の別名です。
   */
  export type State = ComboboxLabelState;

  /**
   * {@link ComboboxLabelProps} の別名です。
   */
  export type Props = ComboboxLabelProps;
}

/**
 * {@link ComboboxLabel} の別名です。
 */
export const Label: IComponent<Label.Props> = ComboboxLabel;

// Value
// -----

/**
 * {@link Value} の状態です。
 */
export type ComboboxValueState = Combobox.Value.State;

/**
 * {@link Value} に渡すプロパティーです。
 */
export type ComboboxValueProps = React.ComponentProps<typeof Combobox.Value>;

/**
 * 現在の選択値を子要素へ反映する要素です。
 */
export const ComboboxValue: IComponent<ComboboxValueProps> = function SuiComboboxValue(props) {
  return <Combobox.Value {...props} />;
};

/**
 * {@link ComboboxValue} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Value {
  /**
   * {@link ComboboxValueState} の別名です。
   */
  export type State = ComboboxValueState;

  /**
   * {@link ComboboxValueProps} の別名です。
   */
  export type Props = ComboboxValueProps;
}

/**
 * {@link ComboboxValue} の別名です。
 */
export const Value: IComponent<Value.Props> = ComboboxValue;

// Input
// -----

/**
 * {@link Input} の状態です。
 */
export type ComboboxInputState = Combobox.Input.State;

/**
 * {@link Input} に渡すプロパティーです。
 */
export type ComboboxInputProps = React.ComponentProps<typeof Combobox.Input>;

/**
 * 候補を検索するテキスト入力欄です。
 */
export const ComboboxInput: IComponent<ComboboxInputProps> = function SuiComboboxInput(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Input {...otherProps} className={cn(className, "sui_combobox_input")} />;
};

/**
 * {@link ComboboxInput} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Input {
  /**
   * {@link ComboboxInputState} の別名です。
   */
  export type State = ComboboxInputState;

  /**
   * {@link ComboboxInputProps} の別名です。
   */
  export type Props = ComboboxInputProps;
}

/**
 * {@link ComboboxInput} の別名です。
 */
export const Input: IComponent<Input.Props> = ComboboxInput;

// InputGroup
// ----------

/**
 * {@link InputGroup} の状態です。
 */
export type ComboboxInputGroupState = Combobox.InputGroup.State;

/**
 * {@link InputGroup} に渡すプロパティーです。
 */
export type ComboboxInputGroupProps = React.ComponentProps<typeof Combobox.InputGroup>;

/**
 * 入力欄と付属コントロールをまとめるグループ要素です。
 *
 * Root のスタイルプロパティーがこの要素へ適用されます。
 */
export const ComboboxInputGroup: IComponent<ComboboxInputGroupProps> =
  function SuiComboboxInputGroup(props) {
    const context = useComboboxContext(true);
    const { className, ...otherProps } = props;
    const size = context?.size ?? "md";
    const radius = context?.radius ?? "rounded";
    const variant = context?.variant ?? "naked";
    const outlined = context?.outlined ?? variant === "naked";
    const accentColor = context?.accentColor ?? "grey";

    return (
      <Combobox.InputGroup
        {...otherProps}
        className={cn(
          className,
          "sui_combobox",
          "sui_combobox_input_group",
          `sui_combobox-size_${size}`,
          `sui_combobox-variant_${variant}`,
          `sui_combobox-radius_${radius}`,
          `sui_combobox-accent_color_${accentColor}`,
          outlined && "sui_combobox-outlined",
          (state) => state.disabled && "sui_combobox-disabled",
        )}
      />
    );
  };

/**
 * {@link ComboboxInputGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace InputGroup {
  /**
   * {@link ComboboxInputGroupState} の別名です。
   */
  export type State = ComboboxInputGroupState;

  /**
   * {@link ComboboxInputGroupProps} の別名です。
   */
  export type Props = ComboboxInputGroupProps;
}

/**
 * {@link ComboboxInputGroup} の別名です。
 */
export const InputGroup: IComponent<InputGroup.Props> = ComboboxInputGroup;

// Trigger
// -------

/**
 * {@link Trigger} の状態です。
 */
export type ComboboxTriggerState = Combobox.Trigger.State;

/**
 * {@link Trigger} に渡すプロパティーです。
 */
export type ComboboxTriggerProps = React.ComponentProps<typeof Combobox.Trigger>;

/**
 * 候補リストを開閉するボタン要素です。
 */
export const ComboboxTrigger: IComponent<ComboboxTriggerProps> = function SuiComboboxTrigger(
  props,
) {
  const { className, ...otherProps } = props;

  return <Combobox.Trigger {...otherProps} className={cn(className, "sui_combobox_trigger")} />;
};

/**
 * {@link ComboboxTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link ComboboxTriggerState} の別名です。
   */
  export type State = ComboboxTriggerState;

  /**
   * {@link ComboboxTriggerProps} の別名です。
   */
  export type Props = ComboboxTriggerProps;
}

/**
 * {@link ComboboxTrigger} の別名です。
 */
export const Trigger: IComponent<Trigger.Props> = ComboboxTrigger;

// Icon
// ----

/**
 * {@link Icon} の状態です。
 */
export type ComboboxIconState = Combobox.Icon.State;

/**
 * {@link Icon} に渡すプロパティーです。
 */
export type ComboboxIconProps = React.ComponentProps<typeof Combobox.Icon>;

/**
 * トリガーの操作を示すアイコンのラッパー要素です。
 */
export const ComboboxIcon: IComponent<ComboboxIconProps> = function SuiComboboxIcon(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Icon {...otherProps} className={cn(className, "sui_combobox_icon")} />;
};

/**
 * {@link ComboboxIcon} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Icon {
  /**
   * {@link ComboboxIconState} の別名です。
   */
  export type State = ComboboxIconState;

  /**
   * {@link ComboboxIconProps} の別名です。
   */
  export type Props = ComboboxIconProps;
}

/**
 * {@link ComboboxIcon} の別名です。
 */
export const Icon: IComponent<Icon.Props> = ComboboxIcon;

// Clear
// -----

/**
 * {@link Clear} の状態です。
 */
export type ComboboxClearState = Combobox.Clear.State;

/**
 * {@link Clear} に渡すプロパティーです。
 */
export type ComboboxClearProps = React.ComponentProps<typeof Combobox.Clear>;

/**
 * 選択値を消去するボタン要素です。
 */
export const ComboboxClear: IComponent<ComboboxClearProps> = function SuiComboboxClear(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Clear {...otherProps} className={cn(className, "sui_combobox_clear")} />;
};

/**
 * {@link ComboboxClear} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Clear {
  /**
   * {@link ComboboxClearState} の別名です。
   */
  export type State = ComboboxClearState;

  /**
   * {@link ComboboxClearProps} の別名です。
   */
  export type Props = ComboboxClearProps;
}

/**
 * {@link ComboboxClear} の別名です。
 */
export const Clear: IComponent<Clear.Props> = ComboboxClear;

// Chips
// -----

/**
 * {@link Chips} の状態です。
 */
export type ComboboxChipsState = Combobox.Chips.State;

/**
 * {@link Chips} に渡すプロパティーです。
 */
export type ComboboxChipsProps = React.ComponentProps<typeof Combobox.Chips>;

/**
 * 複数選択した値を表示するチップのコンテナーです。
 */
export const ComboboxChips: IComponent<ComboboxChipsProps> = function SuiComboboxChips(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Chips {...otherProps} className={cn(className, "sui_combobox_chips")} />;
};

/**
 * {@link ComboboxChips} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Chips {
  /**
   * {@link ComboboxChipsState} の別名です。
   */
  export type State = ComboboxChipsState;

  /**
   * {@link ComboboxChipsProps} の別名です。
   */
  export type Props = ComboboxChipsProps;
}

/**
 * {@link ComboboxChips} の別名です。
 */
export const Chips: IComponent<Chips.Props> = ComboboxChips;

// Chip
// ----

/**
 * {@link Chip} の状態です。
 */
export type ComboboxChipState = Combobox.Chip.State;

/**
 * {@link Chip} に渡すプロパティーです。
 */
export type ComboboxChipProps = React.ComponentProps<typeof Combobox.Chip>;

/**
 * 複数選択した値を表すチップ要素です。
 */
export const ComboboxChip: IComponent<ComboboxChipProps> = function SuiComboboxChip(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Chip {...otherProps} className={cn(className, "sui_combobox_chip")} />;
};

/**
 * {@link ComboboxChip} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Chip {
  /**
   * {@link ComboboxChipState} の別名です。
   */
  export type State = ComboboxChipState;

  /**
   * {@link ComboboxChipProps} の別名です。
   */
  export type Props = ComboboxChipProps;
}

/**
 * {@link ComboboxChip} の別名です。
 */
export const Chip: IComponent<Chip.Props> = ComboboxChip;

// ChipRemove
// ----------

/**
 * {@link ChipRemove} の状態です。
 */
export type ComboboxChipRemoveState = Combobox.ChipRemove.State;

/**
 * {@link ChipRemove} に渡すプロパティーです。
 */
export type ComboboxChipRemoveProps = React.ComponentProps<typeof Combobox.ChipRemove>;

/**
 * チップを選択値から削除するボタン要素です。
 */
export const ComboboxChipRemove: IComponent<ComboboxChipRemoveProps> =
  function SuiComboboxChipRemove(props) {
    const { className, ...otherProps } = props;

    return (
      <Combobox.ChipRemove {...otherProps} className={cn(className, "sui_combobox_chip_remove")} />
    );
  };

/**
 * {@link ComboboxChipRemove} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ChipRemove {
  /**
   * {@link ComboboxChipRemoveState} の別名です。
   */
  export type State = ComboboxChipRemoveState;

  /**
   * {@link ComboboxChipRemoveProps} の別名です。
   */
  export type Props = ComboboxChipRemoveProps;
}

/**
 * {@link ComboboxChipRemove} の別名です。
 */
export const ChipRemove: IComponent<ChipRemove.Props> = ComboboxChipRemove;

// List
// ----

/**
 * {@link List} の状態です。
 */
export type ComboboxListState = Combobox.List.State;

/**
 * {@link List} に渡すプロパティーです。
 */
export type ComboboxListProps = React.ComponentProps<typeof Combobox.List>;

/**
 * 候補項目のリストを表示するコンテナー要素です。
 */
export const ComboboxList: IComponent<ComboboxListProps> = function SuiComboboxList(props) {
  const { className, ...otherProps } = props;

  return (
    <ScrollArea className="sui_combobox_scroll_area">
      <Combobox.List {...otherProps} className={cn(className, "sui_combobox_list")} />
    </ScrollArea>
  );
};

/**
 * {@link ComboboxList} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace List {
  /**
   * {@link ComboboxListState} の別名です。
   */
  export type State = ComboboxListState;

  /**
   * {@link ComboboxListProps} の別名です。
   */
  export type Props = ComboboxListProps;
}

/**
 * {@link ComboboxList} の別名です。
 */
export const List: IComponent<List.Props> = ComboboxList;

// Status
// ------

/**
 * {@link Status} の状態です。
 */
export type ComboboxStatusState = Combobox.Status.State;

/**
 * {@link Status} に渡すプロパティーです。
 */
export type ComboboxStatusProps = React.ComponentProps<typeof Combobox.Status>;

/**
 * 非同期検索などの状態を読み上げる要素です。
 */
export const ComboboxStatus: IComponent<ComboboxStatusProps> = function SuiComboboxStatus(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Status {...otherProps} className={cn(className, "sui_combobox_status")} />;
};

/**
 * {@link ComboboxStatus} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Status {
  /**
   * {@link ComboboxStatusState} の別名です。
   */
  export type State = ComboboxStatusState;

  /**
   * {@link ComboboxStatusProps} の別名です。
   */
  export type Props = ComboboxStatusProps;
}

/**
 * {@link ComboboxStatus} の別名です。
 */
export const Status: IComponent<Status.Props> = ComboboxStatus;

// Portal
// ------

/**
 * {@link Portal} の状態です。
 */
export type ComboboxPortalState = Combobox.Portal.State;

/**
 * {@link Portal} に渡すプロパティーです。
 */
export type ComboboxPortalProps = React.ComponentProps<typeof Combobox.Portal>;

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 */
export const ComboboxPortal: IComponent<ComboboxPortalProps> = function SuiComboboxPortal(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Portal {...otherProps} className={cn(className, "sui_combobox_portal")} />;
};

/**
 * {@link ComboboxPortal} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  /**
   * {@link ComboboxPortalState} の別名です。
   */
  export type State = ComboboxPortalState;

  /**
   * {@link ComboboxPortalProps} の別名です。
   */
  export type Props = ComboboxPortalProps;
}

/**
 * {@link ComboboxPortal} の別名です。
 */
export const Portal: IComponent<Portal.Props> = ComboboxPortal;

// Backdrop
// --------

/**
 * {@link Backdrop} の状態です。
 */
export type ComboboxBackdropState = Combobox.Backdrop.State;

/**
 * {@link Backdrop} に渡すプロパティーです。
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

/**
 * {@link ComboboxBackdrop} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link ComboboxBackdropState} の別名です。
   */
  export type State = ComboboxBackdropState;

  /**
   * {@link ComboboxBackdropProps} の別名です。
   */
  export type Props = ComboboxBackdropProps;
}

/**
 * {@link ComboboxBackdrop} の別名です。
 */
export const Backdrop: IComponent<Backdrop.Props> = ComboboxBackdrop;

// Positioner
// ----------

/**
 * {@link Positioner} の状態です。
 */
export type ComboboxPositionerState = Combobox.Positioner.State;

/**
 * {@link Positioner} に渡すプロパティーです。
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

/**
 * {@link ComboboxPositioner} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Positioner {
  /**
   * {@link ComboboxPositionerState} の別名です。
   */
  export type State = ComboboxPositionerState;

  /**
   * {@link ComboboxPositionerProps} の別名です。
   */
  export type Props = ComboboxPositionerProps;
}

/**
 * {@link ComboboxPositioner} の別名です。
 */
export const Positioner: IComponent<Positioner.Props> = ComboboxPositioner;

// Popup
// -----

/**
 * {@link Popup} の状態です。
 */
export type ComboboxPopupState = Combobox.Popup.State;

/**
 * {@link Popup} に渡すプロパティーです。
 */
export type ComboboxPopupProps = React.ComponentProps<typeof Combobox.Popup>;

/**
 * 候補項目を表示するポップアップ要素です。
 */
export const ComboboxPopup: IComponent<ComboboxPopupProps> = function SuiComboboxPopup(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Popup {...otherProps} className={cn(className, "sui_combobox_popup")} />;
};

/**
 * {@link ComboboxPopup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Popup {
  /**
   * {@link ComboboxPopupState} の別名です。
   */
  export type State = ComboboxPopupState;

  /**
   * {@link ComboboxPopupProps} の別名です。
   */
  export type Props = ComboboxPopupProps;
}

/**
 * {@link ComboboxPopup} の別名です。
 */
export const Popup: IComponent<Popup.Props> = ComboboxPopup;

// Arrow
// -----

/**
 * {@link Arrow} の状態です。
 */
export type ComboboxArrowState = Combobox.Arrow.State;

/**
 * {@link Arrow} に渡すプロパティーです。
 */
export type ComboboxArrowProps = React.ComponentProps<typeof Combobox.Arrow>;

/**
 * ポップアップと入力欄をつなぐ矢印要素です。
 */
export const ComboboxArrow: IComponent<ComboboxArrowProps> = function SuiComboboxArrow(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Arrow {...otherProps} className={cn(className, "sui_combobox_arrow")} />;
};

/**
 * {@link ComboboxArrow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Arrow {
  /**
   * {@link ComboboxArrowState} の別名です。
   */
  export type State = ComboboxArrowState;

  /**
   * {@link ComboboxArrowProps} の別名です。
   */
  export type Props = ComboboxArrowProps;
}

/**
 * {@link ComboboxArrow} の別名です。
 */
export const Arrow: IComponent<Arrow.Props> = ComboboxArrow;

// Group
// -----

/**
 * {@link Group} の状態です。
 */
export type ComboboxGroupState = Combobox.Group.State;

/**
 * {@link Group} に渡すプロパティーです。
 */
export type ComboboxGroupProps = React.ComponentProps<typeof Combobox.Group>;

/**
 * 関連する候補項目をまとめるグループ要素です。
 */
export const ComboboxGroup: IComponent<ComboboxGroupProps> = function SuiComboboxGroup(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Group {...otherProps} className={cn(className, "sui_combobox_group")} />;
};

/**
 * {@link ComboboxGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Group {
  /**
   * {@link ComboboxGroupState} の別名です。
   */
  export type State = ComboboxGroupState;

  /**
   * {@link ComboboxGroupProps} の別名です。
   */
  export type Props = ComboboxGroupProps;
}

/**
 * {@link ComboboxGroup} の別名です。
 */
export const Group: IComponent<Group.Props> = ComboboxGroup;

// GroupLabel
// ----------

/**
 * {@link GroupLabel} の状態です。
 */
export type ComboboxGroupLabelState = Combobox.GroupLabel.State;

/**
 * {@link GroupLabel} に渡すプロパティーです。
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

/**
 * {@link ComboboxGroupLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace GroupLabel {
  /**
   * {@link ComboboxGroupLabelState} の別名です。
   */
  export type State = ComboboxGroupLabelState;

  /**
   * {@link ComboboxGroupLabelProps} の別名です。
   */
  export type Props = ComboboxGroupLabelProps;
}

/**
 * {@link ComboboxGroupLabel} の別名です。
 */
export const GroupLabel: IComponent<GroupLabel.Props> = ComboboxGroupLabel;

// Item
// ----

/**
 * {@link Item} の状態です。
 */
export type ComboboxItemState = Combobox.Item.State;

/**
 * {@link Item} に渡すプロパティーです。
 */
export type ComboboxItemProps = React.ComponentProps<typeof Combobox.Item>;

/**
 * 候補リストの個々の項目要素です。
 */
export const ComboboxItem: IComponent<ComboboxItemProps> = function SuiComboboxItem(props) {
  const context = useComboboxContext(true);
  const { className, ...otherProps } = props;
  const size = context?.size ?? "md";

  return (
    <Combobox.Item
      {...otherProps}
      className={cn(className, "sui_combobox_item", `sui_combobox-size_${size}`)}
    />
  );
};

/**
 * {@link ComboboxItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link ComboboxItemState} の別名です。
   */
  export type State = ComboboxItemState;

  /**
   * {@link ComboboxItemProps} の別名です。
   */
  export type Props = ComboboxItemProps;
}

/**
 * {@link ComboboxItem} の別名です。
 */
export const Item: IComponent<Item.Props> = ComboboxItem;

// ItemIndicator
// -------------

/**
 * {@link ItemIndicator} の状態です。
 */
export type ComboboxItemIndicatorState = Combobox.ItemIndicator.State;

/**
 * {@link ItemIndicator} に渡すプロパティーです。
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

/**
 * {@link ComboboxItemIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ItemIndicator {
  /**
   * {@link ComboboxItemIndicatorState} の別名です。
   */
  export type State = ComboboxItemIndicatorState;

  /**
   * {@link ComboboxItemIndicatorProps} の別名です。
   */
  export type Props = ComboboxItemIndicatorProps;
}

/**
 * {@link ComboboxItemIndicator} の別名です。
 */
export const ItemIndicator: IComponent<ItemIndicator.Props> = ComboboxItemIndicator;

// Row
// ---

/**
 * {@link Row} の状態です。
 */
export type ComboboxRowState = Combobox.Row.State;

/**
 * {@link Row} に渡すプロパティーです。
 */
export type ComboboxRowProps = React.ComponentProps<typeof Combobox.Row>;

/**
 * グリッドリストの 1 行を表示する要素です。
 */
export const ComboboxRow: IComponent<ComboboxRowProps> = function SuiComboboxRow(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Row {...otherProps} className={cn(className, "sui_combobox_row")} />;
};

/**
 * {@link ComboboxRow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Row {
  /**
   * {@link ComboboxRowState} の別名です。
   */
  export type State = ComboboxRowState;

  /**
   * {@link ComboboxRowProps} の別名です。
   */
  export type Props = ComboboxRowProps;
}

/**
 * {@link ComboboxRow} の別名です。
 */
export const Row: IComponent<Row.Props> = ComboboxRow;

// Collection
// ----------

/**
 * {@link Collection} の状態です。
 */
export type ComboboxCollectionState = Combobox.Collection.State;

/**
 * {@link Collection} に渡すプロパティーです。
 */
export type ComboboxCollectionProps = React.ComponentProps<typeof Combobox.Collection>;

/**
 * フィルタリングされた項目を列挙する要素です。
 */
export const ComboboxCollection: IComponent<ComboboxCollectionProps> =
  function SuiComboboxCollection(props) {
    return <Combobox.Collection {...props} />;
  };

/**
 * {@link ComboboxCollection} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Collection {
  /**
   * {@link ComboboxCollectionState} の別名です。
   */
  export type State = ComboboxCollectionState;

  /**
   * {@link ComboboxCollectionProps} の別名です。
   */
  export type Props = ComboboxCollectionProps;
}

/**
 * {@link ComboboxCollection} の別名です。
 */
export const Collection: IComponent<Collection.Props> = ComboboxCollection;

// Empty
// -----

/**
 * {@link Empty} の状態です。
 */
export type ComboboxEmptyState = Combobox.Empty.State;

/**
 * {@link Empty} に渡すプロパティーです。
 */
export type ComboboxEmptyProps = React.ComponentProps<typeof Combobox.Empty>;

/**
 * 候補リストが空のときに内容を表示する要素です。
 */
export const ComboboxEmpty: IComponent<ComboboxEmptyProps> = function SuiComboboxEmpty(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Empty {...otherProps} className={cn(className, "sui_combobox_empty")} />;
};

/**
 * {@link ComboboxEmpty} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Empty {
  /**
   * {@link ComboboxEmptyState} の別名です。
   */
  export type State = ComboboxEmptyState;

  /**
   * {@link ComboboxEmptyProps} の別名です。
   */
  export type Props = ComboboxEmptyProps;
}

/**
 * {@link ComboboxEmpty} の別名です。
 */
export const Empty: IComponent<Empty.Props> = ComboboxEmpty;

// Separator
// ---------

/**
 * {@link Separator} の状態です。
 */
export type ComboboxSeparatorState = Combobox.Separator.State;

/**
 * {@link Separator} に渡すプロパティーです。
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

/**
 * {@link ComboboxSeparator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Separator {
  /**
   * {@link ComboboxSeparatorState} の別名です。
   */
  export type State = ComboboxSeparatorState;

  /**
   * {@link ComboboxSeparatorProps} の別名です。
   */
  export type Props = ComboboxSeparatorProps;
}

/**
 * {@link ComboboxSeparator} の別名です。
 */
export const Separator: IComponent<Separator.Props> = ComboboxSeparator;

// useFilter
// ---------

/**
 * 項目を検索文字列と照合するフィルター関数を作るフックです。
 */
export const useFilter = Combobox.useFilter;

// useFilteredItems
// ----------------

/**
 * Root 内でフィルタリングされた項目の一覧を返すフックです。
 */
export const useFilteredItems = Combobox.useFilteredItems;
