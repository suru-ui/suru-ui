import { Combobox } from "@base-ui/react/combobox";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import { ScrollArea } from "../../navigation/scroll-area/index.js";
import type { Component } from "../../types.js";

import "./combobox.css";

// Context
// -------

/**
 * {@link ComboboxContext} の値です。
 */
export type ComboboxContext = {
  /**
   * フォーカス時に枠線へ適用するアクセントカラーです。
   */
  readonly accentColor: Color;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 入力を含むグループ要素の角丸です。
   */
  readonly radius: "none" | "rounded" | "full";

  /**
   * 入力欄とリスト項目のサイズです。
   */
  readonly size: Size;

  /**
   * 入力欄のスタイルバリエーションです。
   */
  readonly variant: "naked" | "liquid";
};

/**
 * コンボボックスのスタイルを子要素へ伝播するコンテキストです。
 */
export const ComboboxContext: React.Context<ComboboxContext | null> =
  React.createContext<ComboboxContext | null>(null);

/**
 * {@link ComboboxContext} を読み取るフックです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useComboboxContext(optional?: false): ComboboxContext;
export function useComboboxContext(optional?: boolean): ComboboxContext | null;
export function useComboboxContext(optional?: boolean): ComboboxContext | null {
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
 * {@link ComboboxContext} のエイリアスです。
 */
export type Context = ComboboxContext;

/**
 * {@link ComboboxContext} のエイリアスです。
 */
export const Context: React.Context<ComboboxContext | null> = ComboboxContext;

/**
 * {@link useComboboxContext} のエイリアスです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useContext(optional?: false): ComboboxContext;
export function useContext(optional?: boolean): ComboboxContext | null;
export function useContext(optional?: boolean): ComboboxContext | null {
  return useComboboxContext(optional);
}

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type ComboboxRootState = Combobox.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type ComboboxRootProps<Value = unknown, Multiple extends boolean | undefined = false> = Omit<
  Combobox.Root.Props<Value, Multiple>,
  "items"
> & {
  /**
   * リストに表示する項目の一覧です。
   *
   * 平坦な配列か、`items` を持つグループの配列を指定します。
   */
  items?:
    | readonly Value[]
    | readonly {
        readonly label?: React.ReactNode;
        readonly items: readonly Value[];
      }[]
    | undefined;

  /**
   * フォーカス時に枠線へ適用するアクセントカラーを指定します。
   *
   * @default "grey"
   */
  accentColor?: Color | undefined;

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
  size?: Size | undefined;

  /**
   * 入力欄のスタイルバリエーションを指定します。
   *
   * - `"naked"`: 背景のない入力欄
   * - `"liquid"`: 薄い塗りつぶし
   *
   * @default "naked"
   */
  variant?: "naked" | "liquid" | undefined;

  /**
   * 入力を含むグループ要素の角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
   *
   * @default "rounded"
   */
  radius?: "none" | "rounded" | "full" | undefined;
};

/**
 * {@link ComboboxRoot} のコンポーネント型です。
 */
export interface ComboboxRootComponent {
  <Value, Multiple extends boolean | undefined = false>(
    props: ComboboxRootProps<Value, Multiple>,
  ): React.ReactElement | null;

  displayName?: string | undefined;
}

/**
 * コンボボックスのルート要素です。
 *
 * 選択状態とポップアップの開閉状態を管理し、スタイルを子パーツへ伝播します。
 * それ自身は HTML 要素をレンダリングしません。
 *
 * @example
 * ```tsx
 * <ComboboxParts.Root items={["りんご", "ばなな"]}>
 *   <ComboboxParts.InputGroup>
 *     <ComboboxParts.Input />
 *     <ComboboxParts.Trigger />
 *   </ComboboxParts.InputGroup>
 * </ComboboxParts.Root>
 * ```
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
 * {@link ComboboxRoot} に対応する型名前空間です。
 */
export namespace Root {
  /** {@link ComboboxRootState} の別名です。 */
  export type State = ComboboxRootState;
  /** {@link ComboboxRootProps} の別名です。 */
  export type Props<
    Value = unknown,
    Multiple extends boolean | undefined = false,
  > = ComboboxRootProps<Value, Multiple>;
}

/**
 * {@link ComboboxRoot} の短い名前です。
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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Label>果物</ComboboxParts.Label>
 * ```
 */
export const ComboboxLabel: Component<ComboboxLabelProps> = function SuiComboboxLabel(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Label {...otherProps} className={cn(className, "sui_combobox_label")} />;
};

/**
 * {@link ComboboxLabel} に対応する型名前空間です。
 */
export namespace Label {
  /** {@link ComboboxLabelState} の別名です。 */
  export type State = ComboboxLabelState;
  /** {@link ComboboxLabelProps} の別名です。 */
  export type Props = ComboboxLabelProps;
}

/**
 * {@link ComboboxLabel} の短い名前です。
 */
export const Label: Component<Label.Props> = ComboboxLabel;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Value placeholder="選択してください" />
 * ```
 */
export const ComboboxValue: Component<ComboboxValueProps> = function SuiComboboxValue(props) {
  return <Combobox.Value {...props} />;
};

/**
 * {@link ComboboxValue} に対応する型名前空間です。
 */
export namespace Value {
  /** {@link ComboboxValueState} の別名です。 */
  export type State = ComboboxValueState;
  /** {@link ComboboxValueProps} の別名です。 */
  export type Props = ComboboxValueProps;
}

/**
 * {@link ComboboxValue} の短い名前です。
 */
export const Value: Component<Value.Props> = ComboboxValue;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Input placeholder="検索" />
 * ```
 */
export const ComboboxInput: Component<ComboboxInputProps> = function SuiComboboxInput(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Input {...otherProps} className={cn(className, "sui_combobox_input")} />;
};

/**
 * {@link ComboboxInput} に対応する型名前空間です。
 */
export namespace Input {
  /** {@link ComboboxInputState} の別名です。 */
  export type State = ComboboxInputState;
  /** {@link ComboboxInputProps} の別名です。 */
  export type Props = ComboboxInputProps;
}

/**
 * {@link ComboboxInput} の短い名前です。
 */
export const Input: Component<Input.Props> = ComboboxInput;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.InputGroup>
 *   <ComboboxParts.Input />
 *   <ComboboxParts.Trigger />
 * </ComboboxParts.InputGroup>
 * ```
 */
export const ComboboxInputGroup: Component<ComboboxInputGroupProps> =
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
 * {@link ComboboxInputGroup} に対応する型名前空間です。
 */
export namespace InputGroup {
  /** {@link ComboboxInputGroupState} の別名です。 */
  export type State = ComboboxInputGroupState;
  /** {@link ComboboxInputGroupProps} の別名です。 */
  export type Props = ComboboxInputGroupProps;
}

/**
 * {@link ComboboxInputGroup} の短い名前です。
 */
export const InputGroup: Component<InputGroup.Props> = ComboboxInputGroup;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Trigger aria-label="候補を開く" />
 * ```
 */
export const ComboboxTrigger: Component<ComboboxTriggerProps> = function SuiComboboxTrigger(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Trigger {...otherProps} className={cn(className, "sui_combobox_trigger")} />;
};

/**
 * {@link ComboboxTrigger} に対応する型名前空間です。
 */
export namespace Trigger {
  /** {@link ComboboxTriggerState} の別名です。 */
  export type State = ComboboxTriggerState;
  /** {@link ComboboxTriggerProps} の別名です。 */
  export type Props = ComboboxTriggerProps;
}

/**
 * {@link ComboboxTrigger} の短い名前です。
 */
export const Trigger: Component<Trigger.Props> = ComboboxTrigger;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Icon>⌄</ComboboxParts.Icon>
 * ```
 */
export const ComboboxIcon: Component<ComboboxIconProps> = function SuiComboboxIcon(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Icon {...otherProps} className={cn(className, "sui_combobox_icon")} />;
};

/**
 * {@link ComboboxIcon} に対応する型名前空間です。
 */
export namespace Icon {
  /** {@link ComboboxIconState} の別名です。 */
  export type State = ComboboxIconState;
  /** {@link ComboboxIconProps} の別名です。 */
  export type Props = ComboboxIconProps;
}

/**
 * {@link ComboboxIcon} の短い名前です。
 */
export const Icon: Component<Icon.Props> = ComboboxIcon;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Clear aria-label="クリア">×</ComboboxParts.Clear>
 * ```
 */
export const ComboboxClear: Component<ComboboxClearProps> = function SuiComboboxClear(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Clear {...otherProps} className={cn(className, "sui_combobox_clear")} />;
};

/**
 * {@link ComboboxClear} に対応する型名前空間です。
 */
export namespace Clear {
  /** {@link ComboboxClearState} の別名です。 */
  export type State = ComboboxClearState;
  /** {@link ComboboxClearProps} の別名です。 */
  export type Props = ComboboxClearProps;
}

/**
 * {@link ComboboxClear} の短い名前です。
 */
export const Clear: Component<Clear.Props> = ComboboxClear;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Chips>
 *   <ComboboxParts.Value />
 * </ComboboxParts.Chips>
 * ```
 */
export const ComboboxChips: Component<ComboboxChipsProps> = function SuiComboboxChips(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Chips {...otherProps} className={cn(className, "sui_combobox_chips")} />;
};

/**
 * {@link ComboboxChips} に対応する型名前空間です。
 */
export namespace Chips {
  /** {@link ComboboxChipsState} の別名です。 */
  export type State = ComboboxChipsState;
  /** {@link ComboboxChipsProps} の別名です。 */
  export type Props = ComboboxChipsProps;
}

/**
 * {@link ComboboxChips} の短い名前です。
 */
export const Chips: Component<Chips.Props> = ComboboxChips;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Chip>TypeScript</ComboboxParts.Chip>
 * ```
 */
export const ComboboxChip: Component<ComboboxChipProps> = function SuiComboboxChip(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Chip {...otherProps} className={cn(className, "sui_combobox_chip")} />;
};

/**
 * {@link ComboboxChip} に対応する型名前空間です。
 */
export namespace Chip {
  /** {@link ComboboxChipState} の別名です。 */
  export type State = ComboboxChipState;
  /** {@link ComboboxChipProps} の別名です。 */
  export type Props = ComboboxChipProps;
}

/**
 * {@link ComboboxChip} の短い名前です。
 */
export const Chip: Component<Chip.Props> = ComboboxChip;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.ChipRemove aria-label="削除">×</ComboboxParts.ChipRemove>
 * ```
 */
export const ComboboxChipRemove: Component<ComboboxChipRemoveProps> =
  function SuiComboboxChipRemove(props) {
    const { className, ...otherProps } = props;

    return (
      <Combobox.ChipRemove {...otherProps} className={cn(className, "sui_combobox_chip_remove")} />
    );
  };

/**
 * {@link ComboboxChipRemove} に対応する型名前空間です。
 */
export namespace ChipRemove {
  /** {@link ComboboxChipRemoveState} の別名です。 */
  export type State = ComboboxChipRemoveState;
  /** {@link ComboboxChipRemoveProps} の別名です。 */
  export type Props = ComboboxChipRemoveProps;
}

/**
 * {@link ComboboxChipRemove} の短い名前です。
 */
export const ChipRemove: Component<ChipRemove.Props> = ComboboxChipRemove;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.List>
 *   {(item, index) => <ComboboxParts.Item key={index} value={item} />}
 * </ComboboxParts.List>
 * ```
 */
export const ComboboxList: Component<ComboboxListProps> = function SuiComboboxList(props) {
  const { className, ...otherProps } = props;

  return (
    <ScrollArea className="sui_combobox_scroll_area">
      <Combobox.List {...otherProps} className={cn(className, "sui_combobox_list")} />
    </ScrollArea>
  );
};

/**
 * {@link ComboboxList} に対応する型名前空間です。
 */
export namespace List {
  /** {@link ComboboxListState} の別名です。 */
  export type State = ComboboxListState;
  /** {@link ComboboxListProps} の別名です。 */
  export type Props = ComboboxListProps;
}

/**
 * {@link ComboboxList} の短い名前です。
 */
export const List: Component<List.Props> = ComboboxList;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Status>検索中</ComboboxParts.Status>
 * ```
 */
export const ComboboxStatus: Component<ComboboxStatusProps> = function SuiComboboxStatus(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Status {...otherProps} className={cn(className, "sui_combobox_status")} />;
};

/**
 * {@link ComboboxStatus} に対応する型名前空間です。
 */
export namespace Status {
  /** {@link ComboboxStatusState} の別名です。 */
  export type State = ComboboxStatusState;
  /** {@link ComboboxStatusProps} の別名です。 */
  export type Props = ComboboxStatusProps;
}

/**
 * {@link ComboboxStatus} の短い名前です。
 */
export const Status: Component<Status.Props> = ComboboxStatus;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Portal><ComboboxParts.Popup /></ComboboxParts.Portal>
 * ```
 */
export const ComboboxPortal: Component<ComboboxPortalProps> = function SuiComboboxPortal(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Portal {...otherProps} className={cn(className, "sui_combobox_portal")} />;
};

/**
 * {@link ComboboxPortal} に対応する型名前空間です。
 */
export namespace Portal {
  /** {@link ComboboxPortalState} の別名です。 */
  export type State = ComboboxPortalState;
  /** {@link ComboboxPortalProps} の別名です。 */
  export type Props = ComboboxPortalProps;
}

/**
 * {@link ComboboxPortal} の短い名前です。
 */
export const Portal: Component<Portal.Props> = ComboboxPortal;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Backdrop />
 * ```
 */
export const ComboboxBackdrop: Component<ComboboxBackdropProps> = function SuiComboboxBackdrop(
  props,
) {
  const { className, ...otherProps } = props;

  return <Combobox.Backdrop {...otherProps} className={cn(className, "sui_combobox_backdrop")} />;
};

/**
 * {@link ComboboxBackdrop} に対応する型名前空間です。
 */
export namespace Backdrop {
  /** {@link ComboboxBackdropState} の別名です。 */
  export type State = ComboboxBackdropState;
  /** {@link ComboboxBackdropProps} の別名です。 */
  export type Props = ComboboxBackdropProps;
}

/**
 * {@link ComboboxBackdrop} の短い名前です。
 */
export const Backdrop: Component<Backdrop.Props> = ComboboxBackdrop;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Positioner side="bottom" align="start"><ComboboxParts.Popup /></ComboboxParts.Positioner>
 * ```
 */
export const ComboboxPositioner: Component<ComboboxPositionerProps> =
  function SuiComboboxPositioner(props) {
    const { className, ...otherProps } = props;

    return (
      <Combobox.Positioner {...otherProps} className={cn(className, "sui_combobox_positioner")} />
    );
  };

/**
 * {@link ComboboxPositioner} に対応する型名前空間です。
 */
export namespace Positioner {
  /** {@link ComboboxPositionerState} の別名です。 */
  export type State = ComboboxPositionerState;
  /** {@link ComboboxPositionerProps} の別名です。 */
  export type Props = ComboboxPositionerProps;
}

/**
 * {@link ComboboxPositioner} の短い名前です。
 */
export const Positioner: Component<Positioner.Props> = ComboboxPositioner;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Popup><ComboboxParts.List /></ComboboxParts.Popup>
 * ```
 */
export const ComboboxPopup: Component<ComboboxPopupProps> = function SuiComboboxPopup(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Popup {...otherProps} className={cn(className, "sui_combobox_popup")} />;
};

/**
 * {@link ComboboxPopup} に対応する型名前空間です。
 */
export namespace Popup {
  /** {@link ComboboxPopupState} の別名です。 */
  export type State = ComboboxPopupState;
  /** {@link ComboboxPopupProps} の別名です。 */
  export type Props = ComboboxPopupProps;
}

/**
 * {@link ComboboxPopup} の短い名前です。
 */
export const Popup: Component<Popup.Props> = ComboboxPopup;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Arrow />
 * ```
 */
export const ComboboxArrow: Component<ComboboxArrowProps> = function SuiComboboxArrow(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Arrow {...otherProps} className={cn(className, "sui_combobox_arrow")} />;
};

/**
 * {@link ComboboxArrow} に対応する型名前空間です。
 */
export namespace Arrow {
  /** {@link ComboboxArrowState} の別名です。 */
  export type State = ComboboxArrowState;
  /** {@link ComboboxArrowProps} の別名です。 */
  export type Props = ComboboxArrowProps;
}

/**
 * {@link ComboboxArrow} の短い名前です。
 */
export const Arrow: Component<Arrow.Props> = ComboboxArrow;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Group items={["りんご"]}><ComboboxParts.GroupLabel>果物</ComboboxParts.GroupLabel></ComboboxParts.Group>
 * ```
 */
export const ComboboxGroup: Component<ComboboxGroupProps> = function SuiComboboxGroup(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Group {...otherProps} className={cn(className, "sui_combobox_group")} />;
};

/**
 * {@link ComboboxGroup} に対応する型名前空間です。
 */
export namespace Group {
  /** {@link ComboboxGroupState} の別名です。 */
  export type State = ComboboxGroupState;
  /** {@link ComboboxGroupProps} の別名です。 */
  export type Props = ComboboxGroupProps;
}

/**
 * {@link ComboboxGroup} の短い名前です。
 */
export const Group: Component<Group.Props> = ComboboxGroup;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.GroupLabel>果物</ComboboxParts.GroupLabel>
 * ```
 */
export const ComboboxGroupLabel: Component<ComboboxGroupLabelProps> =
  function SuiComboboxGroupLabel(props) {
    const { className, ...otherProps } = props;

    return (
      <Combobox.GroupLabel {...otherProps} className={cn(className, "sui_combobox_group_label")} />
    );
  };

/**
 * {@link ComboboxGroupLabel} に対応する型名前空間です。
 */
export namespace GroupLabel {
  /** {@link ComboboxGroupLabelState} の別名です。 */
  export type State = ComboboxGroupLabelState;
  /** {@link ComboboxGroupLabelProps} の別名です。 */
  export type Props = ComboboxGroupLabelProps;
}

/**
 * {@link ComboboxGroupLabel} の短い名前です。
 */
export const GroupLabel: Component<GroupLabel.Props> = ComboboxGroupLabel;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Item value="りんご">りんご</ComboboxParts.Item>
 * ```
 */
export const ComboboxItem: Component<ComboboxItemProps> = function SuiComboboxItem(props) {
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
 * {@link ComboboxItem} に対応する型名前空間です。
 */
export namespace Item {
  /** {@link ComboboxItemState} の別名です。 */
  export type State = ComboboxItemState;
  /** {@link ComboboxItemProps} の別名です。 */
  export type Props = ComboboxItemProps;
}

/**
 * {@link ComboboxItem} の短い名前です。
 */
export const Item: Component<Item.Props> = ComboboxItem;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.ItemIndicator>✓</ComboboxParts.ItemIndicator>
 * ```
 */
export const ComboboxItemIndicator: Component<ComboboxItemIndicatorProps> =
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
 * {@link ComboboxItemIndicator} に対応する型名前空間です。
 */
export namespace ItemIndicator {
  /** {@link ComboboxItemIndicatorState} の別名です。 */
  export type State = ComboboxItemIndicatorState;
  /** {@link ComboboxItemIndicatorProps} の別名です。 */
  export type Props = ComboboxItemIndicatorProps;
}

/**
 * {@link ComboboxItemIndicator} の短い名前です。
 */
export const ItemIndicator: Component<ItemIndicator.Props> = ComboboxItemIndicator;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Row><ComboboxParts.Item value="a">a</ComboboxParts.Item></ComboboxParts.Row>
 * ```
 */
export const ComboboxRow: Component<ComboboxRowProps> = function SuiComboboxRow(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Row {...otherProps} className={cn(className, "sui_combobox_row")} />;
};

/**
 * {@link ComboboxRow} に対応する型名前空間です。
 */
export namespace Row {
  /** {@link ComboboxRowState} の別名です。 */
  export type State = ComboboxRowState;
  /** {@link ComboboxRowProps} の別名です。 */
  export type Props = ComboboxRowProps;
}

/**
 * {@link ComboboxRow} の短い名前です。
 */
export const Row: Component<Row.Props> = ComboboxRow;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Collection>{(item, index) => <ComboboxParts.Item key={index} value={item} />}</ComboboxParts.Collection>
 * ```
 */
export const ComboboxCollection: Component<ComboboxCollectionProps> =
  function SuiComboboxCollection(props) {
    return <Combobox.Collection {...props} />;
  };

/**
 * {@link ComboboxCollection} に対応する型名前空間です。
 */
export namespace Collection {
  /** {@link ComboboxCollectionState} の別名です。 */
  export type State = ComboboxCollectionState;
  /** {@link ComboboxCollectionProps} の別名です。 */
  export type Props = ComboboxCollectionProps;
}

/**
 * {@link ComboboxCollection} の短い名前です。
 */
export const Collection: Component<Collection.Props> = ComboboxCollection;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Empty>候補がありません</ComboboxParts.Empty>
 * ```
 */
export const ComboboxEmpty: Component<ComboboxEmptyProps> = function SuiComboboxEmpty(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Empty {...otherProps} className={cn(className, "sui_combobox_empty")} />;
};

/**
 * {@link ComboboxEmpty} に対応する型名前空間です。
 */
export namespace Empty {
  /** {@link ComboboxEmptyState} の別名です。 */
  export type State = ComboboxEmptyState;
  /** {@link ComboboxEmptyProps} の別名です。 */
  export type Props = ComboboxEmptyProps;
}

/**
 * {@link ComboboxEmpty} の短い名前です。
 */
export const Empty: Component<Empty.Props> = ComboboxEmpty;

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
 *
 * @example
 * ```tsx
 * <ComboboxParts.Separator />
 * ```
 */
export const ComboboxSeparator: Component<ComboboxSeparatorProps> = function SuiComboboxSeparator(
  props,
) {
  const { className, ...otherProps } = props;

  return <Combobox.Separator {...otherProps} className={cn(className, "sui_combobox_separator")} />;
};

/**
 * {@link ComboboxSeparator} に対応する型名前空間です。
 */
export namespace Separator {
  /** {@link ComboboxSeparatorState} の別名です。 */
  export type State = ComboboxSeparatorState;
  /** {@link ComboboxSeparatorProps} の別名です。 */
  export type Props = ComboboxSeparatorProps;
}

/**
 * {@link ComboboxSeparator} の短い名前です。
 */
export const Separator: Component<Separator.Props> = ComboboxSeparator;

// useFilter
// ---------

/**
 * 項目を検索文字列と照合するフィルター関数を作るフックです。
 *
 * @example
 * ```tsx
 * const filter = ComboboxParts.useFilter();
 * ```
 */
export const useFilter = Combobox.useFilter;

// useFilteredItems
// ----------------

/**
 * Root 内でフィルタリングされた項目の一覧を返すフックです。
 *
 * @example
 * ```tsx
 * const items = ComboboxParts.useFilteredItems();
 * ```
 */
export const useFilteredItems = Combobox.useFilteredItems;
