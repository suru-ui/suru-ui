import type { NativeButtonProps, BaseUIComponentProps } from "@base-ui/react/internals/types";
import { NumberField } from "@base-ui/react/number-field";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { PlusIcon, MinusIcon } from "../_icons.jsx";
import useRender, { type RenderProps } from "../_use-render.js";
import { useActionGroupContext } from "../action-group/action-group.parts.jsx";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./number-field.css";

// Context
// -------

/**
 * 数値入力欄の配色です。
 */
type NumberFieldContextColor = Color;

/**
 * 数値入力欄の角丸です。
 */
type NumberFieldContextRadius = "none" | Size | "full";

/**
 * 数値入力欄のサイズです。
 */
type NumberFieldContextSize = Size;

/**
 * 数値入力欄の主な外観です。
 */
type NumberFieldContextVariant = "naked" | "liquid";

/**
 * {@link NumberFieldRoot} が子パーツへ提供するスタイルです。
 */
export type NumberFieldContext = {
  /**
   * 数値入力欄の配色です。
   */
  readonly color: NumberFieldContextColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 数値入力欄の角丸です。
   */
  readonly radius: NumberFieldContextRadius;

  /**
   * 数値入力欄のサイズです。
   */
  readonly size: NumberFieldContextSize;

  /**
   * 数値入力欄の主な外観です。
   */
  readonly variant: NumberFieldContextVariant;
};

/**
 * NumberField のスタイルを子パーツへ伝播するコンテキストです。
 */
export const NumberFieldContext: React.Context<NumberFieldContext | null> =
  React.createContext<NumberFieldContext | null>(null);

function useSuiNumberFieldContext(optional?: false): NumberFieldContext;
function useSuiNumberFieldContext(optional?: boolean): NumberFieldContext | null;
function useSuiNumberFieldContext(optional?: boolean): NumberFieldContext | null {
  const ctx = React.use(NumberFieldContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "NumberFieldContext",
      providerName: "NumberFieldRoot",
    });
  }

  return ctx;
}

/**
 * {@link NumberFieldContext} を読み取るフックです。
 */
export const useNumberFieldContext: IUseContext<NumberFieldContext> = useSuiNumberFieldContext;

export { NumberFieldContext as Context, useNumberFieldContext as useContext };

export namespace Context {
  export type Color = NumberFieldContextColor;

  export type Radius = NumberFieldContextRadius;

  export type Size = NumberFieldContextSize;

  export type Variant = NumberFieldContextVariant;
}

// Root
// ----

/**
 * {@link NumberFieldRoot} の値が変更されたイベントの詳細です。
 */
export type NumberFieldRootChangeEventDetails = NumberField.Root.ChangeEventDetails;

/**
 * {@link NumberFieldRoot} の値が変更された理由です。
 */
export type NumberFieldRootChangeEventReason = NumberField.Root.ChangeEventReason;

/**
 * {@link NumberFieldRoot} の値が確定されたイベントの詳細です。
 */
export type NumberFieldRootCommitEventDetails = NumberField.Root.CommitEventDetails;

/**
 * {@link NumberFieldRoot} の値が確定された理由です。
 */
export type NumberFieldRootCommitEventReason = NumberField.Root.CommitEventReason;

/**
 * 数値入力欄の配色です。
 */
export type NumberFieldRootColor = Color;

/**
 * 数値入力欄の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type NumberFieldRootRadius = "none" | Size | "full";

/**
 * 数値入力欄の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type NumberFieldRootSize = Size;

/**
 * 数値入力欄の主な外観の種類です。
 *
 * - `"naked"`: 背景のない数値入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type NumberFieldRootVariant = "naked" | "liquid";

/**
 * {@link NumberFieldRoot} が持つ状態です。
 */
export type NumberFieldRootState = NumberField.Root.State;

export namespace NumberFieldRootProps {
  export type Render = RenderProps<NumberFieldRootState>;

  export type SuruUI = {
    /**
     * フォーカス時に枠線へ適用する色を指定します。
     *
     * @default "grey"
     */
    color?: NumberFieldRootColor | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * 数値入力欄の角丸を指定します。
     *
     * 既定値は {@link NumberFieldRootProps.size|size}
     */
    radius?: NumberFieldRootRadius | undefined;

    /**
     * 数値入力欄のサイズを指定します。
     *
     * @default "md"
     */
    size?: NumberFieldRootSize | undefined;

    /**
     * 数値入力欄の主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: NumberFieldRootVariant | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof NumberField.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NumberFieldRootProps:
      | "id"
      | "min"
      | "max"
      | "allowOutOfRange"
      | "smallStep"
      | "step"
      | "largeStep"
      | "required"
      | "disabled"
      | "readOnly"
      | "name"
      | "form"
      | "value"
      | "defaultValue"
      | "allowWheelScrub"
      | "snapOnStep"
      | "format"
      | "onValueChange"
      | "onValueCommitted"
      | "locale"
      | "inputRef",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof NumberField.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldRoot} に渡す props です。
 */
export type NumberFieldRootProps = NumberFieldRootProps.Render &
  NumberFieldRootProps.SuruUI &
  NumberFieldRootProps.BaseUI &
  NumberFieldRootProps.HTML;

/**
 * 数値入力欄のルートコンポーネントです。
 */
export const NumberFieldRoot: IComponent<NumberFieldRootProps> = function SuiNumberFieldRoot(
  props,
) {
  const actionGroupCtx = useActionGroupContext(true);
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = sizeProp,
    variant: variantProp = "liquid",
    outlined: outlinedProp = false,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const size = actionGroupCtx?.size ?? sizeProp;
  const color = actionGroupCtx?.color ?? colorProp;
  const radius = actionGroupCtx?.radius ?? radiusProp;
  const variant =
    (actionGroupCtx?.variant === "solid" ? null : actionGroupCtx?.variant) ?? variantProp;
  const outlined = actionGroupCtx?.outlined ?? outlinedProp;
  const ctx = React.useMemo<NumberFieldContext>(
    () => ({ size, color, radius, variant, outlined }),
    [size, color, radius, variant, outlined],
  );

  return (
    <NumberFieldContext value={ctx}>
      <NumberField.Root
        {...otherProps}
        className={cn(
          className,
          "sui_number_field",
          "sui_action_group_item",
          `sui_number_field-size_${size}`,
          `sui_number_field-color_${color}`,
          `sui_number_field-radius_${radius}`,
          `sui_number_field-variant_${variant}`,
          outlined && "sui_number_field-outlined",
          (state) => state.disabled && "sui_number_field-disabled",
        )}
        data-scope={dataScope}
      />
    </NumberFieldContext>
  );
};

export { NumberFieldRoot as Root };

export namespace Root {
  export type State = NumberFieldRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldRootProps.Render;

    export type SuruUI = NumberFieldRootProps.SuruUI;

    export type BaseUI = NumberFieldRootProps.BaseUI;

    export type HTML = NumberFieldRootProps.HTML;
  }

  export type ChangeEventDetails = NumberFieldRootChangeEventDetails;

  export type ChangeEventReason = NumberFieldRootChangeEventReason;

  export type Color = NumberFieldRootColor;

  export type CommitEventDetails = NumberFieldRootCommitEventDetails;

  export type CommitEventReason = NumberFieldRootCommitEventReason;

  export type Radius = NumberFieldRootRadius;

  export type Size = NumberFieldRootSize;

  export type Variant = NumberFieldRootVariant;
}

// ScrubArea
// ---------

/**
 * {@link NumberFieldScrubArea} が持つ状態です。
 */
export type NumberFieldScrubAreaState = NumberField.ScrubArea.State;

export namespace NumberFieldScrubAreaProps {
  export type Render = RenderProps<NumberFieldScrubAreaState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof NumberField.ScrubArea>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NumberFieldScrubAreaProps:
      "direction" | "pixelSensitivity" | "teleportDistance",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof NumberField.ScrubArea>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldScrubArea} に渡す props です。
 */
export type NumberFieldScrubAreaProps = NumberFieldScrubAreaProps.Render &
  NumberFieldScrubAreaProps.SuruUI &
  NumberFieldScrubAreaProps.BaseUI &
  NumberFieldScrubAreaProps.HTML;

/**
 * ドラッグで値を変更できる領域を提供するコンポーネントです。
 */
export const NumberFieldScrubArea: IComponent<NumberFieldScrubAreaProps> =
  function SuiNumberFieldScrubArea(props) {
    const { className, ...otherProps } = props;

    return (
      <NumberField.ScrubArea
        {...otherProps}
        className={cn(className, "sui_number_field_scrub_area")}
      />
    );
  };

export { NumberFieldScrubArea as ScrubArea };

export namespace ScrubArea {
  export type State = NumberFieldScrubAreaState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldScrubAreaProps.Render;

    export type SuruUI = NumberFieldScrubAreaProps.SuruUI;

    export type BaseUI = NumberFieldScrubAreaProps.BaseUI;

    export type HTML = NumberFieldScrubAreaProps.HTML;
  }
}

// ScrubAreaCursor
// ---------------

/**
 * {@link NumberFieldScrubAreaCursor} が持つ状態です。
 */
export type NumberFieldScrubAreaCursorState = NumberField.ScrubAreaCursor.State;

export namespace NumberFieldScrubAreaCursorProps {
  export type Render = RenderProps<NumberFieldScrubAreaCursorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof NumberField.ScrubAreaCursor>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NumberFieldScrubAreaCursorProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof NumberField.ScrubAreaCursor>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldScrubAreaCursor} に渡す props です。
 */
export type NumberFieldScrubAreaCursorProps = NumberFieldScrubAreaCursorProps.Render &
  NumberFieldScrubAreaCursorProps.SuruUI &
  NumberFieldScrubAreaCursorProps.BaseUI &
  NumberFieldScrubAreaCursorProps.HTML;

/**
 * スクラブ中にネイティブカーソルの代わりに表示する要素です。
 */
export const NumberFieldScrubAreaCursor: IComponent<NumberFieldScrubAreaCursorProps> =
  function SuiNumberFieldScrubAreaCursor(props) {
    const { className, ...otherProps } = props;

    return (
      <NumberField.ScrubAreaCursor
        {...otherProps}
        className={cn(className, "sui_number_field_scrub_area_cursor")}
      />
    );
  };

export { NumberFieldScrubAreaCursor as ScrubAreaCursor };

export namespace ScrubAreaCursor {
  export type State = NumberFieldScrubAreaCursorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldScrubAreaCursorProps.Render;

    export type SuruUI = NumberFieldScrubAreaCursorProps.SuruUI;

    export type BaseUI = NumberFieldScrubAreaCursorProps.BaseUI;

    export type HTML = NumberFieldScrubAreaCursorProps.HTML;
  }
}

// Group
// -----

/**
 * {@link NumberFieldGroup} が持つ状態です。
 */
export type NumberFieldGroupState = NumberField.Group.State;

export namespace NumberFieldGroupProps {
  export type Render = RenderProps<NumberFieldGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof NumberField.Group>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NumberFieldGroupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof NumberField.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldGroup} に渡す props です。
 */
export type NumberFieldGroupProps = NumberFieldGroupProps.Render &
  NumberFieldGroupProps.SuruUI &
  NumberFieldGroupProps.BaseUI &
  NumberFieldGroupProps.HTML;

const DISABLE_FOCUS_ON_CLICK_DATA = "data-suinumberfielddisablefocusonclick";

/**
 * 入力欄と増減ボタンをまとめるグループ要素です。
 */
export const NumberFieldGroup: IComponent<NumberFieldGroupProps> = function SuiNumberFieldGroup(
  props,
) {
  const { onClick, className, ...otherProps } = props;
  const handleClick: NonNullable<NumberFieldGroupProps["onClick"]> = (evt) => {
    onClick?.(evt);
    if (evt.defaultPrevented || !(evt.target instanceof Element)) {
      return;
    }

    if (
      evt.target.closest(".sui_number_field_input") !== null ||
      evt.target.closest(`[${DISABLE_FOCUS_ON_CLICK_DATA}="true"]`) !== null
    ) {
      return;
    }

    const input = evt.currentTarget.querySelector<HTMLInputElement>(".sui_number_field_input");
    if (input !== null && !input.disabled) {
      input.focus();
    }
  };

  return (
    <NumberField.Group
      {...otherProps}
      onClick={handleClick}
      className={cn(className, "sui_number_field_group")}
    />
  );
};

export { NumberFieldGroup as Group };

export namespace Group {
  export type State = NumberFieldGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldGroupProps.Render;

    export type SuruUI = NumberFieldGroupProps.SuruUI;

    export type BaseUI = NumberFieldGroupProps.BaseUI;

    export type HTML = NumberFieldGroupProps.HTML;
  }
}

// Input
// -----

/**
 * {@link NumberFieldInput} が持つ状態です。
 */
export type NumberFieldInputState = NumberField.Input.State;

export namespace NumberFieldInputProps {
  export type Render = RenderProps<NumberFieldInputState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof NumberField.Input>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NumberFieldInputProps:
      "aria-roledescription",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof NumberField.Input>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldInput} に渡す props です。
 */
export type NumberFieldInputProps = NumberFieldInputProps.Render &
  NumberFieldInputProps.SuruUI &
  NumberFieldInputProps.BaseUI &
  NumberFieldInputProps.HTML;

/**
 * 数値の入力欄です。
 */
export const NumberFieldInput: IComponent<NumberFieldInputProps> = function SuiNumberFieldInput(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <NumberField.Input
      {...otherProps}
      className={cn(
        className,
        "sui_number_field_input",
        (state) => state.valid === true && "sui_number_field_input-valid",
        (state) => state.valid === false && "sui_number_field_input-invalid",
        (state) => state.valid === null && "sui_number_field_input-unverified",
      )}
    />
  );
};

export { NumberFieldInput as Input };

export namespace Input {
  export type State = NumberFieldInputState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldInputProps.Render;

    export type SuruUI = NumberFieldInputProps.SuruUI;

    export type BaseUI = NumberFieldInputProps.BaseUI;

    export type HTML = NumberFieldInputProps.HTML;
  }
}

// Addon
// -----

/**
 * {@link NumberFieldAddon} が持つ状態です。
 */
export type NumberFieldAddonState = {};

export namespace NumberFieldAddonProps {
  export type Render = RenderProps<NumberFieldAddonState>;

  export type SuruUI = {
    /**
     * クリック時の入力欄への自動フォーカスを無効にするかどうかを指定します。
     *
     * @default false
     */
    disableFocusOnClick?: boolean | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldAddon} に渡す props です。
 */
export type NumberFieldAddonProps = NumberFieldAddonProps.Render &
  NumberFieldAddonProps.SuruUI &
  NumberFieldAddonProps.BaseUI &
  NumberFieldAddonProps.HTML;

/**
 * 入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const NumberFieldAddon: IComponent<NumberFieldAddonProps> = function SuiNumberFieldAddon(
  props,
) {
  const { disableFocusOnClick = false, ...otherSpanProps } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        className: "sui_number_field_addon",
        [DISABLE_FOCUS_ON_CLICK_DATA]: disableFocusOnClick ? "true" : undefined,
      },
    ],
    defaultTagName: "span",
  });
};

export { NumberFieldAddon as Addon };

export namespace Addon {
  export type State = NumberFieldAddonState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldAddonProps.Render;

    export type SuruUI = NumberFieldAddonProps.SuruUI;

    export type BaseUI = NumberFieldAddonProps.BaseUI;

    export type HTML = NumberFieldAddonProps.HTML;
  }
}

// Decrement
// ---------

/**
 * {@link NumberFieldDecrement} が持つ状態です。
 */
export type NumberFieldDecrementState = NumberField.Decrement.State;

export namespace NumberFieldDecrementProps {
  export type Render = RenderProps<NumberFieldDecrementState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof NumberField.Decrement>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // NumberFieldDecrementProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof NumberField.Decrement>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldDecrement} に渡す props です。
 */
export type NumberFieldDecrementProps = NumberFieldDecrementProps.Render &
  NumberFieldDecrementProps.SuruUI &
  NumberFieldDecrementProps.BaseUI &
  NumberFieldDecrementProps.HTML;

/**
 * 値を減らすボタンです。
 */
export const NumberFieldDecrement: IComponent<NumberFieldDecrementProps> =
  function SuiNumberFieldDecrement(props) {
    const { children = <MinusIcon />, className, ...otherProps } = props;

    return (
      <NumberField.Decrement
        {...otherProps}
        className={cn(className, "sui_number_field_stepper", "sui_number_field_decrement")}
      >
        {children}
      </NumberField.Decrement>
    );
  };

export { NumberFieldDecrement as Decrement };

export namespace Decrement {
  export type State = NumberFieldDecrementState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldDecrementProps.Render;

    export type SuruUI = NumberFieldDecrementProps.SuruUI;

    export type BaseUI = NumberFieldDecrementProps.BaseUI;

    export type HTML = NumberFieldDecrementProps.HTML;
  }
}

// Increment
// ---------

/**
 * {@link NumberFieldIncrement} が持つ状態です。
 */
export type NumberFieldIncrementState = NumberField.Increment.State;

export namespace NumberFieldIncrementProps {
  export type Render = RenderProps<NumberFieldIncrementState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof NumberField.Increment>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // NumberFieldIncrementProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof NumberField.Increment>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldIncrement} に渡す props です。
 */
export type NumberFieldIncrementProps = NumberFieldIncrementProps.Render &
  NumberFieldIncrementProps.SuruUI &
  NumberFieldIncrementProps.BaseUI &
  NumberFieldIncrementProps.HTML;

/**
 * 値を増やすボタンです。
 */
export const NumberFieldIncrement: IComponent<NumberFieldIncrementProps> =
  function SuiNumberFieldIncrement(props) {
    const { children = <PlusIcon />, className, ...otherProps } = props;

    return (
      <NumberField.Increment
        {...otherProps}
        className={cn(className, "sui_number_field_stepper", "sui_number_field_increment")}
      >
        {children}
      </NumberField.Increment>
    );
  };

export { NumberFieldIncrement as Increment };

export namespace Increment {
  export type State = NumberFieldIncrementState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldIncrementProps.Render;

    export type SuruUI = NumberFieldIncrementProps.SuruUI;

    export type BaseUI = NumberFieldIncrementProps.BaseUI;

    export type HTML = NumberFieldIncrementProps.HTML;
  }
}
