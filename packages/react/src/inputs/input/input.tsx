import { Input as BuiInput } from "@base-ui/react/input";
import type { Height } from "@suru-ui/theme";
import type * as React from "react";
import type { SuiComponentProps } from "../../shared/types.js";
import useBaseUiProps from "../../shared/use-base-ui-props.js";

import "./input.css";

/**
 * 入力コンポーネントの状態を表す型定義です。
 */
export type InputState = {
  /**
   * 値が変更されたかどうかを示します。
   */
  dirty: boolean;

  /**
   * 無効化されているかどうかを示します。
   */
  disabled: boolean;

  /**
   * 値が入力されているかどうかを示します。
   */
  filled: boolean;

  /**
   * フォーカスされているかどうかを示します。
   */
  focused: boolean;

  /**
   * ユーザーが操作（タッチ）したかどうかを示します。
   */
  touched: boolean;

  /**
   * 入力内容が妥当かどうかを示します。
   */
  valid: boolean | null;
};

/**
 * 大きさです。
 */
export type InputSizing = Height;

/**
 * 外観のバリエーションです。
 */
export type InputVariant = "outlined" | "underlined";

/**
 * 入力値の変更イベントに関する詳細情報の型定義です。
 */
export type InputValueChangeEventDetails = {
  /**
   * イベントが発生した理由です。
   */
  reason: "none";

  /**
   * このカスタムイベントに関連付けられたネイティブイベントです。
   */
  event: Event;

  /**
   * Base UI によるイベント処理をキャンセルします。
   */
  cancel(): void;

  /**
   * Base UI がイベントの伝播を停止させるケースにおいて、伝播を許可します。
   */
  allowPropagation(): void;

  /**
   * イベントがキャンセルされたかどうかを示します。
   */
  isCanceled: boolean;

  /**
   * イベントの伝播が許可されているかどうかを示します。
   */
  isPropagationAllowed: boolean;

  /**
   * イベントを発生させた要素（該当する場合のみ）です。
   */
  trigger: Element | undefined;
};

/**
 * 入力値が変更された際に呼び出されるハンドラーの型定義です。
 */
export interface InputValueChangeHandler {
  /**
   * @param value 変更後の入力値です。
   * @param details イベントの詳細情報です。
   */
  (value: string, details: InputValueChangeEventDetails): void;
}

/**
 * Input コンポーネントに渡すプロパティーの型定義です。
 */
type SuiInputProps = {
  /**
   * デフォルト値です。
   */
  defaultValue?: string | number | readonly string[] | undefined;

  /**
   * 大きさです。
   *
   * @default "md"
   */
  sizing?: InputSizing | undefined;

  /**
   * 外観のバリエーションです。
   *
   * @default "outlined"
   */
  variant?: InputVariant | undefined;

  /**
   * 値が変更されたときに発火するコールバック関数です。
   */
  onValueChange?: InputValueChangeHandler | undefined;
};

/**
 * Input コンポーネントに渡すプロパティーの型定義です。
 */
export type InputProps =
  & Omit<SuiComponentProps<"input", InputState>, keyof SuiInputProps>
  & SuiInputProps;

/**
 * テキスト入力を受け付けるための基本的な入力コンポーネントです。
 */
export default function Input(props: InputProps): React.ReactElement {
  const {
    type = "text",
    sizing = "md",
    variant = "outlined",
    ...other
  } = props;

  return (
    <BuiInput
      {...useBaseUiProps(other, {
        className: `sui_input sui_input-size_${sizing} sui_input-variant_${variant}`,
      })}
      type={type}
    />
  );
}
