import { Field } from "@base-ui/react/field";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./field.css";

// Root
// ----

/**
 * {@link FieldRoot} を命令的に操作するためのオブジェクトです。
 */
export type FieldRootActions = Field.Root.Actions;

/**
 * {@link FieldRoot} の妥当性の詳細です。
 */
export type FieldRootValidityData = Field.ValidityData;

/**
 * {@link FieldRoot} が持つ状態です。
 */
export type FieldRootState = Field.Root.State;

export namespace FieldRootProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Field.Root>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof Field.Root>
  >;

  export type Render = RenderProps<FieldRootState>;

  export type SuruUI = {};
}

/**
 * {@link FieldRoot} に渡す props です。
 */
export type FieldRootProps = FieldRootProps.Render &
  FieldRootProps.SuruUI &
  FieldRootProps.BaseUI &
  FieldRootProps.HTML;

/**
 * フィールドのルートコンポーネントです。
 *
 * ラベル、入力欄、エラーメッセージ、説明文をグループ化し、検証状態を管理します。
 */
export const FieldRoot: IComponent<FieldRootProps> = function SuiFieldRoot(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Field.Root
      {...otherProps}
      className={cn(className, "sui_field", (state) => state.disabled && "sui_field-disabled")}
      data-scope={dataScope}
    />
  );
};

export { FieldRoot as Root };

/**
 * {@link FieldRoot} の状態や props をまとめた型名前空間です。
 */
export namespace Root {
  export type State = FieldRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = FieldRootProps.BaseUI;

    export type HTML = FieldRootProps.HTML;

    export type Render = FieldRootProps.Render;

    export type SuruUI = FieldRootProps.SuruUI;
  }

  export type Actions = FieldRootActions;

  export type ValidityData = FieldRootValidityData;
}

// Label
// -----

/**
 * {@link FieldLabel} が持つ状態です。
 */
export type FieldLabelState = Field.Label.State;

export namespace FieldLabelProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Field.Label>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"label">,
    keyof Render | keyof React.ComponentProps<typeof Field.Label>
  >;

  export type Render = RenderProps<FieldLabelState>;

  export type SuruUI = {};
}

/**
 * {@link FieldLabel} に渡す props です。
 */
export type FieldLabelProps = FieldLabelProps.Render &
  FieldLabelProps.SuruUI &
  FieldLabelProps.BaseUI &
  FieldLabelProps.HTML;

/**
 * フィールドのラベルコンポーネントです。
 *
 * 自動的に入力欄と関連付けられ、クリックで入力欄にフォーカスされます。
 */
export const FieldLabel: IComponent<FieldLabelProps> = function SuiFieldLabel(props) {
  const { className, ...otherProps } = props;

  return <Field.Label {...otherProps} className={cn(className, "sui_field_label")} />;
};

export { FieldLabel as Label };

/**
 * {@link FieldLabel} の状態や props をまとめた型名前空間です。
 */
export namespace Label {
  export type State = FieldLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = FieldLabelProps.BaseUI;

    export type HTML = FieldLabelProps.HTML;

    export type Render = FieldLabelProps.Render;

    export type SuruUI = FieldLabelProps.SuruUI;
  }
}

// Control
// -------

/**
 * {@link FieldControl} の値が変更されたイベントの詳細です。
 */
export type FieldControlChangeEventDetails = Field.Control.ChangeEventDetails;

/**
 * {@link FieldControl} の値が変更された理由です。
 */
export type FieldControlChangeEventReason = Field.Control.ChangeEventReason;

/**
 * {@link FieldControl} が持つ状態です。
 */
export type FieldControlState = Field.Control.State;

export namespace FieldControlProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Field.Control>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"input">,
    keyof Render | keyof React.ComponentProps<typeof Field.Control>
  >;

  export type Render = RenderProps<FieldControlState>;

  export type SuruUI = {};
}

/**
 * {@link FieldControl} に渡す props です。
 */
export type FieldControlProps = FieldControlProps.Render &
  FieldControlProps.SuruUI &
  FieldControlProps.BaseUI &
  FieldControlProps.HTML;

/**
 * フィールドの入力欄コンポーネントです。
 */
export const FieldControl: IComponent<FieldControlProps> = function SuiFieldControl(props) {
  const { className, ...otherProps } = props;

  return <Field.Control {...otherProps} className={cn(className, "sui_field_control")} />;
};

export { FieldControl as Control };

/**
 * {@link FieldControl} の状態や props をまとめた型名前空間です。
 */
export namespace Control {
  export type State = FieldControlState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = FieldControlProps.BaseUI;

    export type HTML = FieldControlProps.HTML;

    export type Render = FieldControlProps.Render;

    export type SuruUI = FieldControlProps.SuruUI;
  }

  export type ChangeEventDetails = FieldControlChangeEventDetails;

  export type ChangeEventReason = FieldControlChangeEventReason;
}

// Description
// -----------

/**
 * {@link FieldDescription} が持つ状態です。
 */
export type FieldDescriptionState = Field.Description.State;

export namespace FieldDescriptionProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Field.Description>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"p">,
    keyof Render | keyof React.ComponentProps<typeof Field.Description>
  >;

  export type Render = RenderProps<FieldDescriptionState>;

  export type SuruUI = {};
}

/**
 * {@link FieldDescription} に渡す props です。
 */
export type FieldDescriptionProps = FieldDescriptionProps.Render &
  FieldDescriptionProps.SuruUI &
  FieldDescriptionProps.BaseUI &
  FieldDescriptionProps.HTML;

/**
 * フィールドの補足説明コンポーネントです。
 *
 * 入力欄の補助情報を表示します。
 */
export const FieldDescription: IComponent<FieldDescriptionProps> = function SuiFieldDescription(
  props,
) {
  const { className, ...otherProps } = props;

  return <Field.Description {...otherProps} className={cn(className, "sui_field_description")} />;
};

export { FieldDescription as Description };

/**
 * {@link FieldDescription} の状態や props をまとめた型名前空間です。
 */
export namespace Description {
  export type State = FieldDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = FieldDescriptionProps.BaseUI;

    export type HTML = FieldDescriptionProps.HTML;

    export type Render = FieldDescriptionProps.Render;

    export type SuruUI = FieldDescriptionProps.SuruUI;
  }
}

// Error
// -----

/**
 * {@link FieldError} が持つ状態です。
 */
export type FieldErrorState = Field.Error.State;

export namespace FieldErrorProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Field.Error>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof Field.Error>
  >;

  export type Render = RenderProps<FieldErrorState>;

  export type SuruUI = {};
}

/**
 * {@link FieldError} に渡す props です。
 */
export type FieldErrorProps = FieldErrorProps.Render &
  FieldErrorProps.SuruUI &
  FieldErrorProps.BaseUI &
  FieldErrorProps.HTML;

/**
 * フィールドのエラーメッセージコンポーネントです。
 *
 * 検証に失敗したときに表示されます。
 */
export const FieldError: IComponent<FieldErrorProps> = function SuiFieldError(props) {
  const { className, ...otherProps } = props;

  return <Field.Error {...otherProps} className={cn(className, "sui_field_error")} />;
};

export { FieldError as Error };

/**
 * {@link FieldError} の状態や props をまとめた型名前空間です。
 */
export namespace Error {
  export type State = FieldErrorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = FieldErrorProps.BaseUI;

    export type HTML = FieldErrorProps.HTML;

    export type Render = FieldErrorProps.Render;

    export type SuruUI = FieldErrorProps.SuruUI;
  }
}

// Item
// ----

/**
 * {@link FieldItem} が持つ状態です。
 */
export type FieldItemState = Field.Item.State;

export namespace FieldItemProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Field.Item>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof Field.Item>
  >;

  export type Render = RenderProps<FieldItemState>;

  export type SuruUI = {};
}

/**
 * {@link FieldItem} に渡す props です。
 */
export type FieldItemProps = FieldItemProps.Render &
  FieldItemProps.SuruUI &
  FieldItemProps.BaseUI &
  FieldItemProps.HTML;

/**
 * チェックボックスグループやラジオグループの個別項目をグループ化するコンポーネントです。
 *
 * ラベルと説明文をラップして 1 つの項目としてまとめます。
 */
export const FieldItem: IComponent<FieldItemProps> = function SuiFieldItem(props) {
  const { className, ...otherProps } = props;

  return <Field.Item {...otherProps} className={cn(className, "sui_field_item")} />;
};

export { FieldItem as Item };

/**
 * {@link FieldItem} の状態や props をまとめた型名前空間です。
 */
export namespace Item {
  export type State = FieldItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = FieldItemProps.BaseUI;

    export type HTML = FieldItemProps.HTML;

    export type Render = FieldItemProps.Render;

    export type SuruUI = FieldItemProps.SuruUI;
  }
}

// Validity
// --------

/**
 * {@link FieldValidity} が持つ状態です。
 */
export type FieldValidityState = Field.Validity.State;

export namespace FieldValidityProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Field.Validity>, keyof Render>;

  export type HTML = {};

  export type Render = RenderProps<FieldValidityState>;

  export type SuruUI = {};
}

/**
 * {@link FieldValidity} に渡す props です。
 */
export type FieldValidityProps = FieldValidityProps.Render &
  FieldValidityProps.SuruUI &
  FieldValidityProps.BaseUI &
  FieldValidityProps.HTML;

/**
 * フィールドの検証状態に応じてカスタムメッセージを表示するコンポーネントです。
 *
 * `children` には検証状態を受け取る関数を指定します。
 */
export const FieldValidity: IComponent<FieldValidityProps> = function SuiFieldValidity(props) {
  return <Field.Validity {...props} />;
};

export { FieldValidity as Validity };

/**
 * {@link FieldValidity} の状態や props をまとめた型名前空間です。
 */
export namespace Validity {
  export type State = FieldValidityState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = FieldValidityProps.BaseUI;

    export type HTML = FieldValidityProps.HTML;

    export type Render = FieldValidityProps.Render;

    export type SuruUI = FieldValidityProps.SuruUI;
  }
}
