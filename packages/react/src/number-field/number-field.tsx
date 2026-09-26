import * as React from "react";

import { CursorGrowIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { IComponent } from "../types.js";
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
  type IUseNumberFieldContext,
  type NumberFieldRootVariant,
  type NumberFieldDecrementProps,
  type NumberFieldIncrementProps,
  type NumberFieldScrubAreaProps,
  type NumberFieldScrubAreaCursorProps,
  type NumberFieldRootChangeEventReason,
  type NumberFieldRootCommitEventReason,
  type NumberFieldRootChangeEventDetails,
  type NumberFieldRootCommitEventDetails,
  NumberFieldRoot,
  NumberFieldAddon,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldScrubArea,
  useNumberFieldContext,
  NumberFieldScrubAreaCursor,
} from "./number-field.parts.js";

// Types
// -----

export type NumberFieldColor = NumberFieldRootColor;

export type NumberFieldRadius = NumberFieldRootRadius;

export type NumberFieldSize = NumberFieldRootSize;

export type NumberFieldVariant = NumberFieldRootVariant;

export type NumberFieldChangeEventReason = NumberFieldRootChangeEventReason;

export type NumberFieldChangeEventDetails = NumberFieldRootChangeEventDetails;

export type NumberFieldCommitEventReason = NumberFieldRootCommitEventReason;

export type NumberFieldCommitEventDetails = NumberFieldRootCommitEventDetails;

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
   *
   * `children` を指定しないときは既定のカーソルアイコンを表示します。
   */
  readonly scrubAreaCursor?: NumberFieldScrubAreaCursorProps | undefined;
};

/**
 * {@link NumberField} が持つ状態です。
 */
export type NumberFieldState = NumberFieldRootState;

namespace NumberFieldProps {
  export type NumberField = {
    /**
     * 値を減らすボタンを表示します。
     *
     * `true` を指定すると既定のマイナスアイコンで表示し、表示内容を指定するとその内容で表示します。
     */
    decrement?: NumberFieldDecrementProps["children"] | undefined;

    /**
     * 入力欄の末尾に表示する内容です。
     */
    endAddons?: Iterable<React.ReactNode> | undefined;

    /**
     * 値を増やすボタンを表示します。
     *
     * `true` を指定すると既定のプラスアイコンで表示し、表示内容を指定するとその内容で表示します。
     */
    increment?: NumberFieldIncrementProps["children"] | undefined;

    /**
     * ドラッグで値を変更できる領域に表示する内容です。
     *
     * スクラブ中は既定のカーソルと組み合わせて表示します。
     */
    scrubArea?: NumberFieldScrubAreaProps["children"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: NumberFieldSlotProps | undefined;

    /**
     * 入力欄の先頭に表示する内容です。
     */
    startAddons?: Iterable<React.ReactNode> | undefined;
  };

  export type Input = Pick<NumberFieldInputProps, "placeholder">;

  export type Root = Omit<NumberFieldRootProps, "children" | keyof NumberField | keyof Input>;
}

/**
 * {@link NumberField} に渡す props です。
 */
export type NumberFieldProps = NumberFieldProps.NumberField &
  NumberFieldProps.Root &
  NumberFieldProps.Input;

// API
// ---

/**
 * {@link NumberField} を構成する各パーツの props などを作成するための API です。
 */
export class NumberFieldAPI {
  private readonly numberFieldProps: Required<Omit<NumberFieldProps.NumberField, "slotProps">>;

  private readonly inputProps: Required<NumberFieldProps.Input>;

  private readonly slotProps: NumberFieldSlotProps;

  private readonly rootProps: Omit<NumberFieldRootProps, "children">;

  /**
   * @param props {@link NumberField} の props です。
   * @internal
   */
  public constructor(props: NumberFieldProps) {
    const {
      decrement,
      endAddons = [],
      increment,
      scrubArea,
      slotProps = {},
      placeholder,
      startAddons = [],
      ...rootProps
    } = props;
    this.numberFieldProps = {
      decrement,
      endAddons,
      increment,
      scrubArea,
      startAddons,
    };
    this.inputProps = { placeholder };
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  /**
   * {@link NumberFieldDecrement} に渡す props を取得します。
   *
   * 値を減らすボタンを表示しないときは `null` を返します。
   */
  public getDecrementProps(): NumberFieldDecrementProps | null {
    const { decrement } = this.numberFieldProps;
    const { decrement: props = {} } = this.slotProps;

    if (decrement === true || isLikelyVisibleNode(decrement) || Object.keys(props).length > 0) {
      return {
        ...props,
        children: decrement === true ? undefined : decrement,
      };
    }

    return null;
  }

  /**
   * 末尾の {@link NumberFieldAddon} に渡す props の一覧を取得します。
   */
  public getEndAddonsPropsList(): readonly NumberFieldAddonProps[] {
    const { endAddons } = this.numberFieldProps;
    const { addon: props = {} } = this.slotProps;

    return (
      React.Children.map(endAddons, (addon) => ({
        ...props,
        children: addon,
      })) ?? []
    );
  }

  /**
   * {@link NumberFieldGroup} に渡す props を取得します。
   */
  public getGroupProps(): Omit<NumberFieldGroupProps, "children"> {
    const { group: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link NumberFieldIncrement} に渡す props を取得します。
   *
   * 値を増やすボタンを表示しないときは `null` を返します。
   */
  public getIncrementProps(): NumberFieldIncrementProps | null {
    const { increment } = this.numberFieldProps;
    const { increment: props = {} } = this.slotProps;

    if (increment === true || isLikelyVisibleNode(increment) || Object.keys(props).length > 0) {
      return {
        ...props,
        children: increment === true ? undefined : increment,
      };
    }

    return null;
  }

  /**
   * {@link NumberFieldInput} に渡す props を取得します。
   */
  public getInputProps(): NumberFieldInputProps {
    const { placeholder: defaultPlaceholder } = this.inputProps;
    const { input: props = {} } = this.slotProps;
    const { placeholder = defaultPlaceholder, ...otherProps } = props;

    return {
      ...otherProps,
      placeholder,
    };
  }

  /**
   * {@link NumberFieldRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<NumberFieldRootProps, "children"> {
    return this.rootProps;
  }

  /**
   * {@link NumberFieldScrubAreaCursor} に渡す props を取得します。
   */
  public getScrubAreaCursorProps(): NumberFieldScrubAreaCursorProps {
    const { scrubAreaCursor: props = {} } = this.slotProps;

    return {
      children: <CursorGrowIcon />,
      ...props,
    };
  }

  /**
   * {@link NumberFieldScrubArea} に渡す props を取得します。
   *
   * ドラッグで値を変更できる領域を表示しないときは `null` を返します。
   */
  public getScrubAreaProps(): NumberFieldScrubAreaProps | null {
    const { scrubArea } = this.numberFieldProps;
    const { scrubArea: props = {}, scrubAreaCursor: cursorProps = {} } = this.slotProps;

    if (
      isLikelyVisibleNode(scrubArea) ||
      Object.keys(props).length > 0 ||
      Object.keys(cursorProps).length > 0
    ) {
      return {
        ...props,
        children: (
          <>
            {scrubArea}
            <NumberFieldScrubAreaCursor {...this.getScrubAreaCursorProps()} />
          </>
        ),
      };
    }

    return null;
  }

  /**
   * 先頭の {@link NumberFieldAddon} に渡す props の一覧を取得します。
   */
  public getStartAddonsPropsList(): readonly NumberFieldAddonProps[] {
    const { startAddons } = this.numberFieldProps;
    const { addon: props = {} } = this.slotProps;

    return (
      React.Children.map(startAddons, (addon) => ({
        ...props,
        children: addon,
      })) ?? []
    );
  }
}

export interface IUseNumberFieldAPI {
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
  return new NumberFieldAPI(props);
};

export { NumberFieldAPI as API, useNumberFieldAPI as useAPI };

// Component
// ---------

export interface INumberField extends IComponent<NumberFieldProps> {
  readonly useContext: IUseNumberFieldContext;
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
  export type State = NumberFieldState;

  export type Props = NumberFieldProps;

  export type SlotProps = NumberFieldSlotProps;

  export type Context = NumberFieldContext;

  export type ChangeEventDetails = NumberFieldChangeEventDetails;

  export type ChangeEventReason = NumberFieldChangeEventReason;

  export type Color = NumberFieldColor;

  export type CommitEventDetails = NumberFieldCommitEventDetails;

  export type CommitEventReason = NumberFieldCommitEventReason;

  export type Radius = NumberFieldRadius;

  export type Size = NumberFieldSize;

  export type Variant = NumberFieldVariant;
}
