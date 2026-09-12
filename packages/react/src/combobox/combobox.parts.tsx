import { Combobox } from "@base-ui/react/combobox";
import type { NativeButtonProps, NonNativeButtonProps } from "@base-ui/react/internals/types";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.jsx";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { Override, IComponent, IUseContext } from "../types.js";

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
  export type Color = ComboboxContextColor;

  export type Radius = ComboboxContextRadius;

  export type Size = ComboboxContextSize;

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
export type ComboboxRootItems<TValue = any> =
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

export namespace ComboboxRootProps {
  export type Render = RenderProps<ComboboxRootState>;

  export type SuruUI<TValue = any> = {
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

  export type BaseUI<TValue = any, TMultiple extends boolean | undefined = false> = Pick<
    Combobox.Root.Props<TValue, TMultiple>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxRootProps:
      | "children"
      | "name"
      | "form"
      | "id"
      | "required"
      | "readOnly"
      | "disabled"
      | "defaultOpen"
      | "open"
      | "onOpenChangeComplete"
      | "openOnInputClick"
      | "loopFocus"
      | "inputValue"
      | "defaultInputValue"
      | "inputRef"
      | "grid"
      | "filteredItems"
      | "filter"
      | "virtualized"
      | "inline"
      | "modal"
      | "limit"
      | "locale"
      | "multiple"
      | "autoComplete"
      | "autoHighlight"
      | "highlightItemOnHover"
      | "itemToStringLabel"
      | "itemToStringValue"
      | "isItemEqualToValue"
      | "defaultValue"
      | "actionsRef"
      | "onOpenChange"
      | "onInputValueChange"
      | "onItemHighlighted"
      | "value"
      | "onValueChange",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TValue = any, TMultiple extends boolean | undefined = false> = Omit<
    Combobox.Root.Props<TValue, TMultiple>,
    keyof Render | keyof SuruUI | keyof BaseUI<TValue, TMultiple>
  >;
}

/**
 * {@link ComboboxRoot} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export type ComboboxRootProps<
  TValue = any,
  TMultiple extends boolean | undefined = false,
> = ComboboxRootProps.Render &
  ComboboxRootProps.SuruUI<TValue> &
  ComboboxRootProps.BaseUI<TValue, TMultiple> &
  ComboboxRootProps.HTML<TValue, TMultiple>;

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
  export type State = ComboboxRootState;

  export type Props<TValue = any, TMultiple extends boolean | undefined = false> = Props.Render &
    Props.SuruUI<TValue> &
    Props.BaseUI<TValue, TMultiple> &
    Props.HTML<TValue, TMultiple>;

  export namespace Props {
    export type Render = ComboboxRootProps.Render;

    export type SuruUI<TValue = any> = ComboboxRootProps.SuruUI<TValue>;

    export type BaseUI<
      TValue = any,
      TMultiple extends boolean | undefined = false,
    > = ComboboxRootProps.BaseUI<TValue, TMultiple>;

    export type HTML<
      TValue = any,
      TMultiple extends boolean | undefined = false,
    > = ComboboxRootProps.HTML<TValue, TMultiple>;
  }

  export type Actions = ComboboxRootActions;

  export type ChangeEventDetails = ComboboxRootChangeEventDetails;

  export type ChangeEventReason = ComboboxRootChangeEventReason;

  export type Color = ComboboxRootColor;

  export type HighlightEventDetails = ComboboxRootHighlightEventDetails;

  export type HighlightEventReason = ComboboxRootHighlightEventReason;

  export type Items<TValue = any> = ComboboxRootItems<TValue>;

  export type Radius = ComboboxRootRadius;

  export type Size = ComboboxRootSize;

  export type Variant = ComboboxRootVariant;
}

// Label
// -----

/**
 * {@link ComboboxLabel} が持つ状態です。
 */
export type ComboboxLabelState = Combobox.Label.State;

export namespace ComboboxLabelProps {
  export type Render = RenderProps<ComboboxLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Label>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Label>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxLabel} に渡す props です。
 */
export type ComboboxLabelProps = ComboboxLabelProps.Render &
  ComboboxLabelProps.SuruUI &
  ComboboxLabelProps.BaseUI &
  ComboboxLabelProps.HTML;

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
  export type State = ComboboxLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxLabelProps.Render;

    export type SuruUI = ComboboxLabelProps.SuruUI;

    export type BaseUI = ComboboxLabelProps.BaseUI;

    export type HTML = ComboboxLabelProps.HTML;
  }
}

// InputGroup
// ----------

/**
 * {@link ComboboxInputGroup} が持つ状態です。
 */
export type ComboboxInputGroupState = Combobox.InputGroup.State;

export namespace ComboboxInputGroupProps {
  export type Render = RenderProps<ComboboxInputGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.InputGroup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxInputGroupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.InputGroup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxInputGroup} に渡す props です。
 */
export type ComboboxInputGroupProps = ComboboxInputGroupProps.Render &
  ComboboxInputGroupProps.SuruUI &
  ComboboxInputGroupProps.BaseUI &
  ComboboxInputGroupProps.HTML;

/**
 * 入力欄と付属コントロールをまとめるグループ要素です。
 *
 * Root のスタイルプロパティーがこの要素へ適用されます。
 */
export const ComboboxInputGroup: IComponent<ComboboxInputGroupProps> =
  function SuiComboboxInputGroup(props) {
    const { size, color, radius, variant, outlined } = useComboboxContext();
    const {
      className,
      // @ts-expect-error
      "data-scope": dataScope = "",
      ...otherProps
    } = props;

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
        data-scope={dataScope}
      />
    );
  };

export { ComboboxInputGroup as InputGroup };

/**
 * {@link ComboboxInputGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace InputGroup {
  export type State = ComboboxInputGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxInputGroupProps.Render;

    export type SuruUI = ComboboxInputGroupProps.SuruUI;

    export type BaseUI = ComboboxInputGroupProps.BaseUI;

    export type HTML = ComboboxInputGroupProps.HTML;
  }
}

// Value
// -----

/**
 * {@link ComboboxValue} が持つ状態です。
 */
export type ComboboxValueState = Combobox.Value.State;

export namespace ComboboxValueProps {
  export type Render = RenderProps<ComboboxValueState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Value>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxValueProps:
      "children" | "placeholder",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Value>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxValue} に渡す props です。
 */
export type ComboboxValueProps = ComboboxValueProps.Render &
  ComboboxValueProps.SuruUI &
  ComboboxValueProps.BaseUI &
  ComboboxValueProps.HTML;

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
  export type State = ComboboxValueState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxValueProps.Render;

    export type SuruUI = ComboboxValueProps.SuruUI;

    export type BaseUI = ComboboxValueProps.BaseUI;

    export type HTML = ComboboxValueProps.HTML;
  }
}

// Input
// -----

/**
 * {@link ComboboxInput} が持つ状態です。
 */
export type ComboboxInputState = Combobox.Input.State;

export namespace ComboboxInputProps {
  export type Render = RenderProps<ComboboxInputState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Input>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxInputProps:
      "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Input>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxInput} に渡す props です。
 */
export type ComboboxInputProps = ComboboxInputProps.Render &
  ComboboxInputProps.SuruUI &
  ComboboxInputProps.BaseUI &
  ComboboxInputProps.HTML;

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
  export type State = ComboboxInputState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxInputProps.Render;

    export type SuruUI = ComboboxInputProps.SuruUI;

    export type BaseUI = ComboboxInputProps.BaseUI;

    export type HTML = ComboboxInputProps.HTML;
  }
}

// Trigger
// -------

/**
 * {@link ComboboxTrigger} が持つ状態です。
 */
export type ComboboxTriggerState = Combobox.Trigger.State;

export namespace ComboboxTriggerProps {
  export type Render = RenderProps<ComboboxTriggerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Trigger>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // ComboboxTriggerProps:
      | "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Trigger>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxTrigger} に渡す props です。
 */
export type ComboboxTriggerProps = ComboboxTriggerProps.Render &
  ComboboxTriggerProps.SuruUI &
  ComboboxTriggerProps.BaseUI &
  ComboboxTriggerProps.HTML;

/**
 * 候補リストを開閉するボタン要素です。
 */
export const ComboboxTrigger: IComponent<ComboboxTriggerProps> = function SuiComboboxTrigger(
  props,
) {
  const { className, ...otherProps } = props;

  return <Combobox.Trigger {...otherProps} className={cn(className, "sui_combobox_trigger")} />;
};

export { ComboboxTrigger as Trigger };

/**
 * {@link ComboboxTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  export type State = ComboboxTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxTriggerProps.Render;

    export type SuruUI = ComboboxTriggerProps.SuruUI;

    export type BaseUI = ComboboxTriggerProps.BaseUI;

    export type HTML = ComboboxTriggerProps.HTML;
  }
}

// Icon
// ----

/**
 * {@link ComboboxIcon} が持つ状態です。
 */
export type ComboboxIconState = Combobox.Icon.State;

export namespace ComboboxIconProps {
  export type Render = RenderProps<ComboboxIconState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Icon>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxIconProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Icon>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxIcon} に渡す props です。
 */
export type ComboboxIconProps = ComboboxIconProps.Render &
  ComboboxIconProps.SuruUI &
  ComboboxIconProps.BaseUI &
  ComboboxIconProps.HTML;

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
  export type State = ComboboxIconState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxIconProps.Render;

    export type SuruUI = ComboboxIconProps.SuruUI;

    export type BaseUI = ComboboxIconProps.BaseUI;

    export type HTML = ComboboxIconProps.HTML;
  }
}

// Clear
// -----

/**
 * {@link ComboboxClear} が持つ状態です。
 */
export type ComboboxClearState = Combobox.Clear.State;

export namespace ComboboxClearProps {
  export type Render = RenderProps<ComboboxClearState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Clear>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // ComboboxClearProps:
      | "disabled"
      | "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Clear>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxClear} に渡す props です。
 */
export type ComboboxClearProps = ComboboxClearProps.Render &
  ComboboxClearProps.SuruUI &
  ComboboxClearProps.BaseUI &
  ComboboxClearProps.HTML;

/**
 * 選択値を消去するボタン要素です。
 */
export const ComboboxClear: IComponent<ComboboxClearProps> = function SuiComboboxClear(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Clear {...otherProps} className={cn(className, "sui_combobox_clear")} />;
};

export { ComboboxClear as Clear };

/**
 * {@link ComboboxClear} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Clear {
  export type State = ComboboxClearState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxClearProps.Render;

    export type SuruUI = ComboboxClearProps.SuruUI;

    export type BaseUI = ComboboxClearProps.BaseUI;

    export type HTML = ComboboxClearProps.HTML;
  }
}

// Chips
// -----

/**
 * {@link ComboboxChips} が持つ状態です。
 */
export type ComboboxChipsState = Combobox.Chips.State;

export namespace ComboboxChipsProps {
  export type Render = RenderProps<ComboboxChipsState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Chips>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxChipsProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Chips>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxChips} に渡す props です。
 */
export type ComboboxChipsProps = ComboboxChipsProps.Render &
  ComboboxChipsProps.SuruUI &
  ComboboxChipsProps.BaseUI &
  ComboboxChipsProps.HTML;

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
  export type State = ComboboxChipsState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxChipsProps.Render;

    export type SuruUI = ComboboxChipsProps.SuruUI;

    export type BaseUI = ComboboxChipsProps.BaseUI;

    export type HTML = ComboboxChipsProps.HTML;
  }
}

// Chip
// ----

/**
 * {@link ComboboxChip} が持つ状態です。
 */
export type ComboboxChipState = Combobox.Chip.State;

export namespace ComboboxChipProps {
  export type Render = RenderProps<ComboboxChipState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Chip>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxChipProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Chip>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxChip} に渡す props です。
 */
export type ComboboxChipProps = ComboboxChipProps.Render &
  ComboboxChipProps.SuruUI &
  ComboboxChipProps.BaseUI &
  ComboboxChipProps.HTML;

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
  export type State = ComboboxChipState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxChipProps.Render;

    export type SuruUI = ComboboxChipProps.SuruUI;

    export type BaseUI = ComboboxChipProps.BaseUI;

    export type HTML = ComboboxChipProps.HTML;
  }
}

// ChipRemove
// ----------

/**
 * {@link ComboboxChipRemove} が持つ状態です。
 */
export type ComboboxChipRemoveState = Combobox.ChipRemove.State;

export namespace ComboboxChipRemoveProps {
  export type Render = RenderProps<ComboboxChipRemoveState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.ChipRemove>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // ComboboxChipRemoveProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.ChipRemove>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxChipRemove} に渡す props です。
 */
export type ComboboxChipRemoveProps = ComboboxChipRemoveProps.Render &
  ComboboxChipRemoveProps.SuruUI &
  ComboboxChipRemoveProps.BaseUI &
  ComboboxChipRemoveProps.HTML;

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

export { ComboboxChipRemove as ChipRemove };

/**
 * {@link ComboboxChipRemove} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ChipRemove {
  export type State = ComboboxChipRemoveState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxChipRemoveProps.Render;

    export type SuruUI = ComboboxChipRemoveProps.SuruUI;

    export type BaseUI = ComboboxChipRemoveProps.BaseUI;

    export type HTML = ComboboxChipRemoveProps.HTML;
  }
}

// List
// ----

/**
 * {@link ComboboxList} が持つ状態です。
 */
export type ComboboxListState = Combobox.List.State;

export namespace ComboboxListProps {
  export type Render = RenderProps<ComboboxListState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.List>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxListProps:
      "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.List>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxList} に渡す props です。
 */
export type ComboboxListProps = ComboboxListProps.Render &
  ComboboxListProps.SuruUI &
  ComboboxListProps.BaseUI &
  ComboboxListProps.HTML;

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
  export type State = ComboboxListState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxListProps.Render;

    export type SuruUI = ComboboxListProps.SuruUI;

    export type BaseUI = ComboboxListProps.BaseUI;

    export type HTML = ComboboxListProps.HTML;
  }
}

// Status
// ------

/**
 * {@link ComboboxStatus} が持つ状態です。
 */
export type ComboboxStatusState = Combobox.Status.State;

export namespace ComboboxStatusProps {
  export type Render = RenderProps<ComboboxStatusState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Status>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxStatusProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Status>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxStatus} に渡す props です。
 */
export type ComboboxStatusProps = ComboboxStatusProps.Render &
  ComboboxStatusProps.SuruUI &
  ComboboxStatusProps.BaseUI &
  ComboboxStatusProps.HTML;

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
  export type State = ComboboxStatusState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxStatusProps.Render;

    export type SuruUI = ComboboxStatusProps.SuruUI;

    export type BaseUI = ComboboxStatusProps.BaseUI;

    export type HTML = ComboboxStatusProps.HTML;
  }
}

// Portal
// ------

/**
 * {@link ComboboxPortal} が持つ状態です。
 */
export type ComboboxPortalState = Combobox.Portal.State;

export namespace ComboboxPortalProps {
  export type Render = RenderProps<ComboboxPortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxPortalProps:
      "keepMounted" | "container",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxPortal} に渡す props です。
 */
export type ComboboxPortalProps = ComboboxPortalProps.Render &
  ComboboxPortalProps.SuruUI &
  ComboboxPortalProps.BaseUI &
  ComboboxPortalProps.HTML;

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const ComboboxPortal: IComponent<ComboboxPortalProps> = function SuiComboboxPortal(props) {
  const { size, radius } = useComboboxContext();
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Combobox.Portal
      {...otherProps}
      className={cn(
        className,
        "sui_combobox_portal",
        `sui_combobox_portal-size_${size}`,
        `sui_combobox_portal-radius_${radius}`,
      )}
      data-scope={dataScope}
    />
  );
};

export { ComboboxPortal as Portal };

/**
 * {@link ComboboxPortal} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  export type State = ComboboxPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxPortalProps.Render;

    export type SuruUI = ComboboxPortalProps.SuruUI;

    export type BaseUI = ComboboxPortalProps.BaseUI;

    export type HTML = ComboboxPortalProps.HTML;
  }
}

// Backdrop
// --------

/**
 * {@link ComboboxBackdrop} が持つ状態です。
 */
export type ComboboxBackdropState = Combobox.Backdrop.State;

export namespace ComboboxBackdropProps {
  export type Render = RenderProps<ComboboxBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxBackdropProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxBackdrop} に渡す props です。
 */
export type ComboboxBackdropProps = ComboboxBackdropProps.Render &
  ComboboxBackdropProps.SuruUI &
  ComboboxBackdropProps.BaseUI &
  ComboboxBackdropProps.HTML;

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
  export type State = ComboboxBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxBackdropProps.Render;

    export type SuruUI = ComboboxBackdropProps.SuruUI;

    export type BaseUI = ComboboxBackdropProps.BaseUI;

    export type HTML = ComboboxBackdropProps.HTML;
  }
}

// Positioner
// ----------

/**
 * {@link ComboboxPositioner} が持つ状態です。
 */
export type ComboboxPositionerState = Combobox.Positioner.State;

export namespace ComboboxPositionerProps {
  export type Render = RenderProps<ComboboxPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Positioner>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // UseAnchorPositioningSharedParameters:
      | "anchor"
      | "positionMethod"
      | "side"
      | "sideOffset"
      | "align"
      | "alignOffset"
      | "collisionBoundary"
      | "collisionPadding"
      | "sticky"
      | "arrowPadding"
      | "disableAnchorTracking"
      | "collisionAvoidance",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxPositioner} に渡す props です。
 */
export type ComboboxPositionerProps = ComboboxPositionerProps.Render &
  ComboboxPositionerProps.SuruUI &
  ComboboxPositionerProps.BaseUI &
  ComboboxPositionerProps.HTML;

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
  export type State = ComboboxPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxPositionerProps.Render;

    export type SuruUI = ComboboxPositionerProps.SuruUI;

    export type BaseUI = ComboboxPositionerProps.BaseUI;

    export type HTML = ComboboxPositionerProps.HTML;
  }
}

// Popup
// -----

/**
 * {@link ComboboxPopup} が持つ状態です。
 */
export type ComboboxPopupState = Combobox.Popup.State;

export namespace ComboboxPopupProps {
  export type Render = RenderProps<ComboboxPopupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxPopupProps:
      "initialFocus" | "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxPopup} に渡す props です。
 */
export type ComboboxPopupProps = ComboboxPopupProps.Render &
  ComboboxPopupProps.SuruUI &
  ComboboxPopupProps.BaseUI &
  ComboboxPopupProps.HTML;

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
  export type State = ComboboxPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxPopupProps.Render;

    export type SuruUI = ComboboxPopupProps.SuruUI;

    export type BaseUI = ComboboxPopupProps.BaseUI;

    export type HTML = ComboboxPopupProps.HTML;
  }
}

// Arrow
// -----

/**
 * {@link ComboboxArrow} が持つ状態です。
 */
export type ComboboxArrowState = Combobox.Arrow.State;

export namespace ComboboxArrowProps {
  export type Render = RenderProps<ComboboxArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Arrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxArrowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxArrow} に渡す props です。
 */
export type ComboboxArrowProps = ComboboxArrowProps.Render &
  ComboboxArrowProps.SuruUI &
  ComboboxArrowProps.BaseUI &
  ComboboxArrowProps.HTML;

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
  export type State = ComboboxArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxArrowProps.Render;

    export type SuruUI = ComboboxArrowProps.SuruUI;

    export type BaseUI = ComboboxArrowProps.BaseUI;

    export type HTML = ComboboxArrowProps.HTML;
  }
}

// Group
// -----

/**
 * {@link ComboboxGroup} が持つ状態です。
 */
export type ComboboxGroupState = Combobox.Group.State;

export namespace ComboboxGroupProps {
  export type Render = RenderProps<ComboboxGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Group>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxGroupProps:
      "items",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxGroup} に渡す props です。
 */
export type ComboboxGroupProps = ComboboxGroupProps.Render &
  ComboboxGroupProps.SuruUI &
  ComboboxGroupProps.BaseUI &
  ComboboxGroupProps.HTML;

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
  export type State = ComboboxGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxGroupProps.Render;

    export type SuruUI = ComboboxGroupProps.SuruUI;

    export type BaseUI = ComboboxGroupProps.BaseUI;

    export type HTML = ComboboxGroupProps.HTML;
  }
}

// GroupLabel
// ----------

/**
 * {@link ComboboxGroupLabel} が持つ状態です。
 */
export type ComboboxGroupLabelState = Combobox.GroupLabel.State;

export namespace ComboboxGroupLabelProps {
  export type Render = RenderProps<ComboboxGroupLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.GroupLabel>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxGroupLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.GroupLabel>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxGroupLabel} に渡す props です。
 */
export type ComboboxGroupLabelProps = ComboboxGroupLabelProps.Render &
  ComboboxGroupLabelProps.SuruUI &
  ComboboxGroupLabelProps.BaseUI &
  ComboboxGroupLabelProps.HTML;

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
  export type State = ComboboxGroupLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxGroupLabelProps.Render;

    export type SuruUI = ComboboxGroupLabelProps.SuruUI;

    export type BaseUI = ComboboxGroupLabelProps.BaseUI;

    export type HTML = ComboboxGroupLabelProps.HTML;
  }
}

// Item
// ----

/**
 * {@link ComboboxItem} が持つ状態です。
 */
export type ComboboxItemState = Override<Button.Root.State, Combobox.Item.State>;

export namespace ComboboxItemProps {
  export type Render = RenderProps<ComboboxItemState>;

  export type SuruUI = {};

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Combobox.Item>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // NonNativeButtonProps:
        | keyof NonNativeButtonProps
        // ComboboxItemProps:
        | "children"
        | "onClick"
        | "index"
        | "value"
        | "disabled",
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Item>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxItem} に渡す props です。
 */
export type ComboboxItemProps = ComboboxItemProps.Render &
  ComboboxItemProps.SuruUI &
  ComboboxItemProps.BaseUI &
  ComboboxItemProps.HTML;

/**
 * 候補リストの個々の項目要素です。
 */
export const ComboboxItem: IComponent<ComboboxItemProps> = function SuiComboboxItem(props) {
  const ctx = useComboboxContext();
  const {
    index,
    style,
    value,
    render = <div />,
    onClick,
    children,
    disabled,
    className,
    nativeButton = false,
    focusableWhenDisabled,
    ...otherProps
  } = props;
  const baseuiProps: Required<ComboboxItemProps.BaseUI> = {
    index,
    value,
    onClick,
    children,
    disabled,
    nativeButton,
    focusableWhenDisabled,
  };

  return (
    <Combobox.Item
      {...otherProps}
      {...baseuiProps}
      render={(htmlProps: {}, state) => {
        const buttonRootProps: Required<
          Button.Root.Props.SuruUI &
            Button.Root.Props.BaseUI &
            Pick<Button.Root.Props.HTML, "disabled">
        > = {
          item: true,
          size: ctx.size,
          color: "grey",
          muted: undefined,
          radius: undefined,
          pending: undefined,
          squared: undefined,
          variant: "naked",
          disabled: state.disabled,
          outlined: undefined,
          nativeButton,
          focusableWhenDisabled,
        };

        return (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              buttonRootProps,
              proxyRenderProps(state, {
                style,
                render,
                className: cn(
                  className,
                  "sui_combobox_item",
                  (state) => state.disabled && "sui_combobox_item-disabled",
                  (state) => state.selected && "sui_combobox_item-selected",
                  (state) => state.highlighted && "sui_combobox_item-highlighted",
                ),
              }),
            ])}
          />
        );
      }}
    />
  );
};

export { ComboboxItem as Item };

/**
 * {@link ComboboxItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  export type State = ComboboxItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxItemProps.Render;

    export type SuruUI = ComboboxItemProps.SuruUI;

    export type BaseUI = ComboboxItemProps.BaseUI;

    export type HTML = ComboboxItemProps.HTML;
  }
}

// ItemIndicator
// -------------

/**
 * {@link ComboboxItemIndicator} が持つ状態です。
 */
export type ComboboxItemIndicatorState = Combobox.ItemIndicator.State;

export namespace ComboboxItemIndicatorProps {
  export type Render = RenderProps<ComboboxItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.ItemIndicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxItemIndicatorProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.ItemIndicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxItemIndicator} に渡す props です。
 */
export type ComboboxItemIndicatorProps = ComboboxItemIndicatorProps.Render &
  ComboboxItemIndicatorProps.SuruUI &
  ComboboxItemIndicatorProps.BaseUI &
  ComboboxItemIndicatorProps.HTML;

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
  export type State = ComboboxItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxItemIndicatorProps.Render;

    export type SuruUI = ComboboxItemIndicatorProps.SuruUI;

    export type BaseUI = ComboboxItemIndicatorProps.BaseUI;

    export type HTML = ComboboxItemIndicatorProps.HTML;
  }
}

// Row
// ---

/**
 * {@link ComboboxRow} が持つ状態です。
 */
export type ComboboxRowState = Combobox.Row.State;

export namespace ComboboxRowProps {
  export type Render = RenderProps<ComboboxRowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Row>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxRowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Row>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxRow} に渡す props です。
 */
export type ComboboxRowProps = ComboboxRowProps.Render &
  ComboboxRowProps.SuruUI &
  ComboboxRowProps.BaseUI &
  ComboboxRowProps.HTML;

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
  export type State = ComboboxRowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxRowProps.Render;

    export type SuruUI = ComboboxRowProps.SuruUI;

    export type BaseUI = ComboboxRowProps.BaseUI;

    export type HTML = ComboboxRowProps.HTML;
  }
}

// Collection
// ----------

/**
 * {@link ComboboxCollection} が持つ状態です。
 */
export type ComboboxCollectionState = Combobox.Collection.State;

export namespace ComboboxCollectionProps {
  export type Render = RenderProps<ComboboxCollectionState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Collection>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxCollectionProps:
      "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Collection>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxCollection} に渡す props です。
 */
export type ComboboxCollectionProps = ComboboxCollectionProps.Render &
  ComboboxCollectionProps.SuruUI &
  ComboboxCollectionProps.BaseUI &
  ComboboxCollectionProps.HTML;

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
  export type State = ComboboxCollectionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxCollectionProps.Render;

    export type SuruUI = ComboboxCollectionProps.SuruUI;

    export type BaseUI = ComboboxCollectionProps.BaseUI;

    export type HTML = ComboboxCollectionProps.HTML;
  }
}

// Empty
// -----

/**
 * {@link ComboboxEmpty} が持つ状態です。
 */
export type ComboboxEmptyState = Combobox.Empty.State;

export namespace ComboboxEmptyProps {
  export type Render = RenderProps<ComboboxEmptyState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Empty>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxEmptyProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Empty>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxEmpty} に渡す props です。
 */
export type ComboboxEmptyProps = ComboboxEmptyProps.Render &
  ComboboxEmptyProps.SuruUI &
  ComboboxEmptyProps.BaseUI &
  ComboboxEmptyProps.HTML;

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
  export type State = ComboboxEmptyState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxEmptyProps.Render;

    export type SuruUI = ComboboxEmptyProps.SuruUI;

    export type BaseUI = ComboboxEmptyProps.BaseUI;

    export type HTML = ComboboxEmptyProps.HTML;
  }
}

// Separator
// ---------

/**
 * {@link ComboboxSeparator} が持つ状態です。
 */
export type ComboboxSeparatorState = Combobox.Separator.State;

export namespace ComboboxSeparatorProps {
  export type Render = RenderProps<ComboboxSeparatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Separator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxSeparatorProps:
      "orientation",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Separator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxSeparator} に渡す props です。
 */
export type ComboboxSeparatorProps = ComboboxSeparatorProps.Render &
  ComboboxSeparatorProps.SuruUI &
  ComboboxSeparatorProps.BaseUI &
  ComboboxSeparatorProps.HTML;

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
  export type State = ComboboxSeparatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxSeparatorProps.Render;

    export type SuruUI = ComboboxSeparatorProps.SuruUI;

    export type BaseUI = ComboboxSeparatorProps.BaseUI;

    export type HTML = ComboboxSeparatorProps.HTML;
  }
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
  export type Options = IUseComboboxFilterOptions;

  export interface Return extends IUseComboboxFilterReturn {}
}

function useSuiComboboxFilter(options?: IUseComboboxFilterOptions): ComboboxFilter {
  return Combobox.useFilter(options);
}

/**
 * 項目を検索文字列と照合するフィルター関数を作るフックです。
 */
export const useComboboxFilter: IUseComboboxFilter = useSuiComboboxFilter;

export const useFilter: IUseComboboxFilter = useComboboxFilter;

// useFilteredItems
// ----------------

/**
 * フィルタリングされた項目の一覧です。
 */
export type ComboboxFilteredItems<TValue = any> = readonly TValue[];

/**
 * {@link useComboboxFilteredItems} の戻り値です。
 */
export type IUseComboboxFilteredItemsReturn<TValue = any> = ComboboxFilteredItems<TValue>;

/**
 * {@link useComboboxFilteredItems} の型です。
 */
export interface IUseComboboxFilteredItems {
  <TValue = any>(): IUseComboboxFilteredItemsReturn<TValue>;
}

/**
 * {@link IUseComboboxFilteredItems} に対応する型名前空間です。
 */
export namespace IUseComboboxFilteredItems {
  export type Return<TValue = any> = IUseComboboxFilteredItemsReturn<TValue>;
}

function useSuiComboboxFilteredItems(): ComboboxFilteredItems<any> {
  return Combobox.useFilteredItems();
}

/**
 * Root 内でフィルタリングされた項目の一覧を返すフックです。
 */
export const useComboboxFilteredItems: IUseComboboxFilteredItems = useSuiComboboxFilteredItems;

export const useFilteredItems: IUseComboboxFilteredItems = useComboboxFilteredItems;
