import * as React from "react";

import { CursorGrowIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { IComponent, IUseContext } from "../types.js";
import {
  type NumberFieldContext,
  type NumberFieldRootSize,
  type NumberFieldRootColor,
  type NumberFieldRootProps,
  type NumberFieldRootState,
  type NumberFieldAddonProps,
  type NumberFieldGroupProps,
  type NumberFieldInputProps,
  type NumberFieldRootRadius,
  type NumberFieldRootVariant,
  type NumberFieldDecrementProps,
  type NumberFieldIncrementProps,
  type NumberFieldScrubAreaProps,
  type NumberFieldScrubAreaCursorProps,
  type NumberFieldRootChangeEventReason,
  type NumberFieldRootChangeEventDetails,
  NumberFieldRoot,
  NumberFieldAddon,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldScrubArea,
  useNumberFieldContext,
  NumberFieldScrubAreaCursor,
} from "./number-field.parts.jsx";

// Types
// -----

/**
 * {@link NumberFieldRootColor}
 */
export type NumberFieldColor = NumberFieldRootColor;

/**
 * {@link NumberFieldRootRadius}
 */
export type NumberFieldRadius = NumberFieldRootRadius;

/**
 * {@link NumberFieldRootSize}
 */
export type NumberFieldSize = NumberFieldRootSize;

/**
 * {@link NumberFieldRootVariant}
 */
export type NumberFieldVariant = NumberFieldRootVariant;

/**
 * {@link NumberFieldRootChangeEventReason}
 */
export type NumberFieldChangeEventReason = NumberFieldRootChangeEventReason;

/**
 * {@link NumberFieldRootChangeEventDetails}
 */
export type NumberFieldChangeEventDetails = NumberFieldRootChangeEventDetails;

/**
 * {@link NumberField} の各パーツに渡す props です。
 */
export type NumberFieldSlotProps = {
  /**
   * {@link NumberFieldAddon} に渡す props です。
   */
  readonly addon?: Omit<NumberFieldAddonProps, "children"> | undefined;

  /**
   * {@link NumberFieldDecrement} に渡す props です。
   */
  readonly decrement?: Omit<NumberFieldDecrementProps, "children"> | undefined;

  /**
   * {@link NumberFieldGroup} に渡す props です。
   */
  readonly group?: Omit<NumberFieldGroupProps, "children"> | undefined;

  /**
   * {@link NumberFieldIncrement} に渡す props です。
   */
  readonly increment?: Omit<NumberFieldIncrementProps, "children"> | undefined;

  /**
   * {@link NumberFieldInput} に渡す props です。
   */
  readonly input?: NumberFieldInputProps | undefined;

  /**
   * {@link NumberFieldScrubArea} に渡す props です。
   */
  readonly scrubArea?: Omit<NumberFieldScrubAreaProps, "children"> | undefined;

  /**
   * {@link NumberFieldScrubAreaCursor} に渡す props です。
   */
  readonly scrubAreaCursor?: Omit<NumberFieldScrubAreaCursorProps, "children"> | undefined;
};

/**
 * {@link NumberField} が持つ状態です。
 */
export type NumberFieldState = NumberFieldRootState;

/**
 * {@link NumberField} に渡す props です。
 */
export type NumberFieldProps = Omit<NumberFieldRootProps, "children"> &
  Pick<NumberFieldInputProps, "placeholder"> & {
    /**
     * 値を減らすボタンを表示します。
     *
     * `true` を指定すると、既定のマイナスアイコンで表示します。
     */
    decrement?: NumberFieldDecrementProps["children"] | undefined;

    /**
     * 入力欄の末尾に表示する内容です。
     */
    endAddons?: Iterable<React.ReactNode> | undefined;

    /**
     * 値を増やすボタンを表示します。
     *
     * `true` を指定すると、既定のプラスアイコンで表示します。
     */
    increment?: NumberFieldIncrementProps["children"] | undefined;

    /**
     * ドラッグで値を変更できる領域に表示する内容です。
     */
    scrubArea?: NumberFieldScrubAreaProps["children"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     *
     * 各パーツの props が優先されます。
     */
    slotProps?: NumberFieldSlotProps | undefined;

    /**
     * 入力欄の先頭に表示する内容です。
     */
    startAddons?: Iterable<React.ReactNode> | undefined;
  };

// API
// ---

/**
 * {@link NumberField} を構成する各パーツの props を作成するための API です。
 */
export interface NumberFieldAPI {
  /**
   * {@link NumberFieldDecrement} に渡す props を取得します。
   */
  getDecrementProps(): NumberFieldDecrementProps | null;

  /**
   * 末尾の {@link NumberFieldAddon} に渡す props の一覧を取得します。
   */
  getEndAddonsPropsList(): readonly NumberFieldAddonProps[];

  /**
   * {@link NumberFieldGroup} に渡す props を取得します。
   */
  getGroupProps(): Omit<NumberFieldGroupProps, "children">;

  /**
   * {@link NumberFieldIncrement} に渡す props を取得します。
   */
  getIncrementProps(): NumberFieldIncrementProps | null;

  /**
   * {@link NumberFieldInput} に渡す props を取得します。
   */
  getInputProps(): NumberFieldInputProps;

  /**
   * {@link NumberFieldRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<NumberFieldRootProps, "children">;

  /**
   * {@link NumberFieldScrubAreaCursor} に渡す props を取得します。
   */
  getScrubAreaCursorProps(): NumberFieldScrubAreaCursorProps;

  /**
   * {@link NumberFieldScrubArea} に渡す props を取得します。
   */
  getScrubAreaProps(): NumberFieldScrubAreaProps | null;

  /**
   * 先頭の {@link NumberFieldAddon} に渡す props の一覧を取得します。
   */
  getStartAddonsPropsList(): readonly NumberFieldAddonProps[];
}

interface IUseNumberFieldAPI {
  /**
   * {@link NumberFieldAPI} を作成します。
   *
   * @param props {@link NumberField} の props です。
   * @returns 数値入力欄の API です
   */
  (props: NumberFieldProps): NumberFieldAPI;
}

/**
 * {@link NumberFieldAPI} を作成するフックです。
 */
export const useNumberFieldAPI: IUseNumberFieldAPI = function useSuiNumberFieldAPI(props) {
  const {
    decrement,
    increment,
    endAddons = [],
    placeholder,
    scrubArea,
    startAddons = [],
    slotProps: {
      addon: addonProps = {},
      group: groupProps = {},
      input: inputProps = {},
      decrement: decrementProps = {},
      increment: incrementProps = {},
      scrubArea: scrubAreaProps = {},
      scrubAreaCursor: scrubAreaCursorProps = {},
    } = {},
    ...otherRootProps
  } = props;
  const showDecrement =
    ("decrement" in props && (decrement === true || isLikelyVisibleNode(decrement))) ||
    Object.keys(decrementProps).length > 0;
  const showIncrement =
    ("increment" in props && (increment === true || isLikelyVisibleNode(increment))) ||
    Object.keys(incrementProps).length > 0;
  const showScrubArea =
    isLikelyVisibleNode(scrubArea) ||
    Object.keys(scrubAreaProps).length > 0 ||
    Object.keys(scrubAreaCursorProps).length > 0;
  const scrubAreaCursor: NumberFieldScrubAreaCursorProps = {
    children: <CursorGrowIcon />,
    ...scrubAreaCursorProps,
  };

  return {
    getRootProps() {
      return otherRootProps;
    },
    getGroupProps() {
      return groupProps;
    },
    getInputProps() {
      return {
        placeholder,
        ...inputProps,
      };
    },
    getDecrementProps() {
      if (!showDecrement) {
        return null;
      }

      return {
        ...decrementProps,
        children: decrement === true ? undefined : decrement,
      };
    },
    getIncrementProps() {
      if (!showIncrement) {
        return null;
      }

      return {
        ...incrementProps,
        children: increment === true ? undefined : increment,
      };
    },
    getScrubAreaProps() {
      if (!showScrubArea) {
        return null;
      }

      return {
        ...scrubAreaProps,
        children: (
          <>
            {scrubArea}
            <NumberFieldScrubAreaCursor {...scrubAreaCursor} />
          </>
        ),
      };
    },
    getEndAddonsPropsList() {
      return (
        React.Children.map(endAddons, (addon) => ({
          ...addonProps,
          children: addon,
        })) ?? []
      );
    },
    getScrubAreaCursorProps() {
      return scrubAreaCursor;
    },
    getStartAddonsPropsList() {
      return (
        React.Children.map(startAddons, (addon) => ({
          ...addonProps,
          children: addon,
        })) ?? []
      );
    },
  };
};

export { type NumberFieldAPI as API, useNumberFieldAPI as useAPI };

// Component
// ---------

interface INumberField extends IComponent<NumberFieldProps> {
  /**
   * {@link useNumberFieldContext}
   */
  readonly useContext: IUseContext<NumberFieldContext>;
}

/**
 * 数値入力欄を表示するコンポーネントです。
 *
 * 矢印キーで値を増減でき、ステッパーボタンやドラッグ操作にも対応します。
 */
export const NumberField: INumberField = /*#__PURE__*/ Object.assign(
  function SuiNumberField(props: NumberFieldProps) {
    const api = useNumberFieldAPI(props);
    const scrubAreaProps = api.getScrubAreaProps();
    const decrementProps = api.getDecrementProps();
    const incrementProps = api.getIncrementProps();

    return (
      <NumberFieldRoot {...api.getRootProps()}>
        {scrubAreaProps && <NumberFieldScrubArea {...scrubAreaProps} />}
        <NumberFieldGroup {...api.getGroupProps()}>
          {api.getStartAddonsPropsList().map((addonProps, index) => (
            <NumberFieldAddon key={index} {...addonProps} />
          ))}
          <NumberFieldInput {...api.getInputProps()} />
          {api.getEndAddonsPropsList().map((addonProps, index) => (
            <NumberFieldAddon key={index} {...addonProps} />
          ))}
          {decrementProps && (
            <NumberFieldAddon disableFocusOnClick>
              <NumberFieldDecrement {...decrementProps} />
            </NumberFieldAddon>
          )}
          {incrementProps && (
            <NumberFieldAddon disableFocusOnClick>
              <NumberFieldIncrement {...incrementProps} />
            </NumberFieldAddon>
          )}
        </NumberFieldGroup>
      </NumberFieldRoot>
    );
  },
  {
    useContext: useNumberFieldContext,
  },
);

export namespace NumberField {
  /**
   * {@link NumberFieldState}
   */
  export type State = NumberFieldState;

  /**
   * {@link NumberFieldProps}
   */
  export type Props = NumberFieldProps;

  /**
   * {@link NumberFieldContext}
   */
  export type Context = NumberFieldContext;

  /**
   * {@link NumberFieldSlotProps}
   */
  export type SlotProps = NumberFieldSlotProps;

  /**
   * {@link NumberFieldChangeEventDetails}
   */
  export type ChangeEventDetails = NumberFieldChangeEventDetails;

  /**
   * {@link NumberFieldChangeEventReason}
   */
  export type ChangeEventReason = NumberFieldChangeEventReason;

  /**
   * {@link NumberFieldColor}
   */
  export type Color = NumberFieldColor;

  /**
   * {@link NumberFieldRadius}
   */
  export type Radius = NumberFieldRadius;

  /**
   * {@link NumberFieldSize}
   */
  export type Size = NumberFieldSize;

  /**
   * {@link NumberFieldVariant}
   */
  export type Variant = NumberFieldVariant;
}
