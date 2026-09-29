import { Field } from "@base-ui/react/field";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

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
  export type Render = RenderProps<FieldRootState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Field.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // FieldRootProps:
      | "disabled"
      | "name"
      | "validate"
      | "validationMode"
      | "validationDebounceTime"
      | "invalid"
      | "dirty"
      | "touched"
      | "actionsRef",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Field.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FieldRoot} に渡す props です。
 */
export type FieldRootProps = FieldRootProps.Render &
  FieldRootProps.SuruUI &
  FieldRootProps.BaseUI &
  FieldRootProps.HTML;

export type IFieldRoot = IComponent<FieldRootProps>;

/**
 * フィールドのルートコンポーネントです。
 *
 * ラベル、入力欄、エラーメッセージ、説明文をグループ化し、検証状態を管理します。
 */
export const FieldRoot: IFieldRoot = function SuiFieldRoot(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Field.Root
      {...otherProps}
      className={cn(
        className,
        "sui_field",
        (state) => state.disabled && "sui_field-disabled",
        (state) => state.touched && "sui_field-touched",
        (state) => state.dirty && "sui_field-dirty",
        (state) => state.valid === false && "sui_field-invalid",
        (state) => state.valid === true && "sui_field-valid",
        (state) => state.valid === null && "sui_field-unverified",
        (state) => state.filled && "sui_field-filled",
        (state) => state.focused && "sui_field-focused",
      )}
      data-scope={dataScope}
    />
  );
};

export { FieldRoot as Root };

export namespace Root {
  export type State = FieldRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FieldRootProps.Render;

    export type SuruUI = FieldRootProps.SuruUI;

    export type BaseUI = FieldRootProps.BaseUI;

    export type HTML = FieldRootProps.HTML;
  }

  export type Actions = FieldRootActions;

  export type ValidityData = FieldRootValidityData;
}
